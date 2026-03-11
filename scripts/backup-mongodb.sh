#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

load_env_file() {
  local env_file="$1"
  [[ -f "$env_file" ]] || return 0

  while IFS= read -r line || [[ -n "$line" ]]; do
    [[ -z "$line" || "$line" == \#* ]] && continue
    [[ "$line" != *=* ]] && continue

    local key="${line%%=*}"
    local value="${line#*=}"
    key="$(echo "$key" | xargs)"
    [[ -z "$key" ]] && continue
    export "$key=$value"
  done < "$env_file"
}

load_env_file "$ROOT_DIR/.env"

usage() {
  cat <<USAGE
Usage:
  scripts/backup-mongodb.sh [--dry-run]

Environment variables:
  BACKUP_MONGODB_URI        MongoDB URI to back up (default: MONGODB_URI)
  BACKUP_DIR                Local output directory (default: backups/mongodb)
  BACKUP_FILE_PREFIX        Backup filename prefix (default: payload)
  BACKUP_RETENTION_DAYS     Local retention period in days (default: 14)
  BACKUP_UPLOAD_COMMAND     Optional post-backup upload command
                            (use BACKUP_FILE_PATH and BACKUP_FILE_NAME in command)

Examples:
  npm run backup:mongo

  BACKUP_UPLOAD_COMMAND='aws s3 cp "$BACKUP_FILE_PATH" "s3://my-bucket/mongo/$BACKUP_FILE_NAME"' \
  npm run backup:mongo
USAGE
}

require_tool() {
  local name="$1"
  if ! command -v "$name" >/dev/null 2>&1; then
    echo "Error: '$name' is not installed or not in PATH."
    exit 1
  fi
}

extract_db_name() {
  local uri="$1"
  local cleaned
  cleaned="${uri%%\?*}"
  cleaned="${cleaned%/}"
  local db
  db="${cleaned##*/}"
  if [[ -z "$db" || "$db" == *":"* || "$db" == *"@"* ]]; then
    echo ""
  else
    echo "$db"
  fi
}

DRY_RUN=0

while [[ $# -gt 0 ]]; do
  case "$1" in
    --dry-run)
      DRY_RUN=1
      shift
      ;;
    -h|--help)
      usage
      exit 0
      ;;
    *)
      echo "Unknown option: $1"
      usage
      exit 1
      ;;
  esac
done

MONGO_URI="${BACKUP_MONGODB_URI:-${MONGODB_URI:-}}"
BACKUP_DIR="${BACKUP_DIR:-$ROOT_DIR/backups/mongodb}"
BACKUP_FILE_PREFIX="${BACKUP_FILE_PREFIX:-payload}"
BACKUP_RETENTION_DAYS="${BACKUP_RETENTION_DAYS:-14}"
BACKUP_UPLOAD_COMMAND="${BACKUP_UPLOAD_COMMAND:-}"

if [[ -z "$MONGO_URI" ]]; then
  echo "Error: BACKUP_MONGODB_URI is missing (or MONGODB_URI in .env)."
  exit 1
fi

if ! [[ "$BACKUP_RETENTION_DAYS" =~ ^[0-9]+$ ]]; then
  echo "Error: BACKUP_RETENTION_DAYS must be a non-negative integer."
  exit 1
fi

DB_NAME="$(extract_db_name "$MONGO_URI")"
if [[ -z "$DB_NAME" ]]; then
  echo "Error: Could not infer database name from BACKUP_MONGODB_URI."
  echo "Ensure URI ends with '/database-name'."
  exit 1
fi

TIMESTAMP="$(date -u +%Y-%m-%dT%H-%M-%SZ)"
BACKUP_FILE_NAME="${BACKUP_FILE_PREFIX}-${DB_NAME}-${TIMESTAMP}.archive.gz"
BACKUP_FILE_PATH="$BACKUP_DIR/$BACKUP_FILE_NAME"
CHECKSUM_FILE_PATH="$BACKUP_FILE_PATH.sha256"

echo "Backup plan"
echo "  Database URI:      $MONGO_URI"
echo "  Database name:     $DB_NAME"
echo "  Output directory:  $BACKUP_DIR"
echo "  Backup file:       $BACKUP_FILE_NAME"
echo "  Retention (days):  $BACKUP_RETENTION_DAYS"
echo "  Upload command:    $([[ -n "$BACKUP_UPLOAD_COMMAND" ]] && echo configured || echo not-set)"
echo "  Dry run:           $([[ "$DRY_RUN" -eq 1 ]] && echo yes || echo no)"

if [[ "$DRY_RUN" -eq 1 ]]; then
  echo "Dry run enabled. No backup file created."
  exit 0
fi

require_tool mongodump
mkdir -p "$BACKUP_DIR"

echo "Running mongodump..."
mongodump --uri="$MONGO_URI" --db="$DB_NAME" --archive="$BACKUP_FILE_PATH" --gzip >/dev/null

if command -v shasum >/dev/null 2>&1; then
  shasum -a 256 "$BACKUP_FILE_PATH" > "$CHECKSUM_FILE_PATH"
elif command -v sha256sum >/dev/null 2>&1; then
  sha256sum "$BACKUP_FILE_PATH" > "$CHECKSUM_FILE_PATH"
fi

if [[ -n "$BACKUP_UPLOAD_COMMAND" ]]; then
  echo "Running upload command..."
  env BACKUP_FILE_PATH="$BACKUP_FILE_PATH" BACKUP_FILE_NAME="$BACKUP_FILE_NAME" \
    sh -c "$BACKUP_UPLOAD_COMMAND"
fi

if [[ "$BACKUP_RETENTION_DAYS" -gt 0 ]]; then
  echo "Pruning local backups older than $BACKUP_RETENTION_DAYS days..."
  find "$BACKUP_DIR" -type f \( -name '*.archive.gz' -o -name '*.archive.gz.sha256' \) -mtime +"$BACKUP_RETENTION_DAYS" -delete
fi

echo "Backup completed: $BACKUP_FILE_PATH"
