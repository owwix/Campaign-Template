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
  scripts/migrate-local-to-production.sh [--dry-run] [--drop] [--allow-local-target] --confirm

Environment variables:
  LOCAL_MONGODB_URI       Source URI (default: MONGODB_URI from .env)
  PRODUCTION_MONGODB_URI  Destination URI (required)

Options:
  --dry-run              Print plan without running dump/restore
  --drop                 Drop destination collections before restore
  --allow-local-target   Allow destination URI to be localhost/127.0.0.1
  --confirm              Required safety flag to run migration
  -h, --help             Show this message

Example:
  PRODUCTION_MONGODB_URI='mongodb+srv://.../campaign-template' \
  LOCAL_MONGODB_URI='mongodb://127.0.0.1:27018/campaign-template' \
  scripts/migrate-local-to-production.sh --drop --confirm
USAGE
}

require_tool() {
  local name="$1"
  if ! command -v "$name" >/dev/null 2>&1; then
    echo "Error: '$name' is not installed or not in PATH."
    echo "Install MongoDB Database Tools: https://www.mongodb.com/try/download/database-tools"
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

is_local_uri() {
  local uri="$1"
  [[ "$uri" == *"localhost"* || "$uri" == *"127.0.0.1"* ]]
}

DRY_RUN=0
DROP_FLAG=0
ALLOW_LOCAL_TARGET=0
CONFIRM=0

while [[ $# -gt 0 ]]; do
  case "$1" in
    --dry-run)
      DRY_RUN=1
      shift
      ;;
    --drop)
      DROP_FLAG=1
      shift
      ;;
    --allow-local-target)
      ALLOW_LOCAL_TARGET=1
      shift
      ;;
    --confirm)
      CONFIRM=1
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

if [[ "$CONFIRM" -ne 1 ]]; then
  echo "Error: --confirm is required to run migration."
  usage
  exit 1
fi

LOCAL_URI="${LOCAL_MONGODB_URI:-${MONGODB_URI:-}}"
PROD_URI="${PRODUCTION_MONGODB_URI:-}"

if [[ -z "$LOCAL_URI" ]]; then
  echo "Error: LOCAL_MONGODB_URI is missing (or MONGODB_URI in .env)."
  exit 1
fi

if [[ -z "$PROD_URI" ]]; then
  echo "Error: PRODUCTION_MONGODB_URI is required."
  exit 1
fi

if is_local_uri "$PROD_URI" && [[ "$ALLOW_LOCAL_TARGET" -ne 1 ]]; then
  echo "Error: destination URI looks local. Refusing to run."
  echo "Pass --allow-local-target only if this is intentional."
  exit 1
fi

SOURCE_DB="$(extract_db_name "$LOCAL_URI")"
TARGET_DB="$(extract_db_name "$PROD_URI")"

if [[ -z "$SOURCE_DB" || -z "$TARGET_DB" ]]; then
  echo "Error: Could not infer source/target database names from URIs."
  echo "Make sure each URI ends with '/database-name'."
  exit 1
fi

if [[ "$SOURCE_DB" == "admin" || "$SOURCE_DB" == "local" || "$SOURCE_DB" == "config" ]]; then
  echo "Error: refusing to migrate reserved MongoDB database '$SOURCE_DB'."
  exit 1
fi

echo "Migration plan"
echo "  Source URI:      $LOCAL_URI"
echo "  Source DB:       $SOURCE_DB"
echo "  Destination URI: $PROD_URI"
echo "  Destination DB:  $TARGET_DB"
echo "  Drop first:      $([[ "$DROP_FLAG" -eq 1 ]] && echo yes || echo no)"
echo "  Dry run:         $([[ "$DRY_RUN" -eq 1 ]] && echo yes || echo no)"

if [[ "$DRY_RUN" -eq 1 ]]; then
  echo "Dry run enabled. No changes made."
  exit 0
fi

require_tool mongodump
require_tool mongorestore

TMP_DIR="$(mktemp -d)"
ARCHIVE_PATH="$TMP_DIR/migration.archive.gz"
trap 'rm -rf "$TMP_DIR"' EXIT

echo "Running mongodump..."
mongodump --uri="$LOCAL_URI" --db="$SOURCE_DB" --archive="$ARCHIVE_PATH" --gzip >/dev/null

echo "Running mongorestore..."
RESTORE_CMD=(
  mongorestore
  --uri="$PROD_URI"
  --archive="$ARCHIVE_PATH"
  --gzip
  --nsFrom="$SOURCE_DB.*"
  --nsTo="$TARGET_DB.*"
)

if [[ "$DROP_FLAG" -eq 1 ]]; then
  RESTORE_CMD+=(--drop)
fi

"${RESTORE_CMD[@]}" >/dev/null

echo "Migration completed successfully."
