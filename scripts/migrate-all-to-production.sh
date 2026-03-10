#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
DB_SCRIPT="$ROOT_DIR/scripts/migrate-local-to-production.sh"

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
  scripts/migrate-all-to-production.sh [options] --confirm

Options:
  --dry-run               Show plan only (no DB/media writes)
  --drop                  Drop destination DB collections before restore
  --db-only               Migrate database only
  --media-only            Migrate media files only
  --delete-media          Delete files on destination not present locally (rsync --delete)
  --allow-local-target    Allow local destination for DB migration
  --confirm               Required safety flag
  -h, --help              Show usage

Environment variables:
  LOCAL_MONGODB_URI             Source Mongo URI (defaults to MONGODB_URI)
  PRODUCTION_MONGODB_URI        Destination Mongo URI (required unless --media-only)

  LOCAL_MEDIA_DIR               Source media directory (default: PAYLOAD_MEDIA_DIR or src/media)
  PRODUCTION_MEDIA_DIR          Destination media directory on local filesystem
  PRODUCTION_MEDIA_RSYNC_DEST   Destination rsync target (e.g. user@host:/var/app/media)

Examples:
  # Full migration (DB + media to remote host)
  PRODUCTION_MONGODB_URI='mongodb+srv://.../campaign-template' \
  PRODUCTION_MEDIA_RSYNC_DEST='deploy@myserver:/var/www/app/media' \
  scripts/migrate-all-to-production.sh --drop --confirm

  # Media only to local production mount
  PRODUCTION_MEDIA_DIR='/data/media' \
  scripts/migrate-all-to-production.sh --media-only --confirm
USAGE
}

require_tool() {
  local name="$1"
  if ! command -v "$name" >/dev/null 2>&1; then
    echo "Error: '$name' is not installed or not in PATH."
    exit 1
  fi
}

protect_path() {
  local p="$1"
  if [[ -z "$p" || "$p" == "/" || "$p" == "." ]]; then
    echo "Error: unsafe destination path '$p'."
    exit 1
  fi
}

DRY_RUN=0
DROP_FLAG=0
DB_ONLY=0
MEDIA_ONLY=0
DELETE_MEDIA=0
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
    --db-only)
      DB_ONLY=1
      shift
      ;;
    --media-only)
      MEDIA_ONLY=1
      shift
      ;;
    --delete-media)
      DELETE_MEDIA=1
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
  echo "Error: --confirm is required."
  usage
  exit 1
fi

if [[ "$DB_ONLY" -eq 1 && "$MEDIA_ONLY" -eq 1 ]]; then
  echo "Error: --db-only and --media-only cannot be used together."
  exit 1
fi

RUN_DB=1
RUN_MEDIA=1
if [[ "$DB_ONLY" -eq 1 ]]; then
  RUN_MEDIA=0
fi
if [[ "$MEDIA_ONLY" -eq 1 ]]; then
  RUN_DB=0
fi

LOCAL_MEDIA_DIR="${LOCAL_MEDIA_DIR:-${PAYLOAD_MEDIA_DIR:-$ROOT_DIR/src/media}}"
PROD_MEDIA_DIR="${PRODUCTION_MEDIA_DIR:-}"
PROD_MEDIA_RSYNC_DEST="${PRODUCTION_MEDIA_RSYNC_DEST:-}"

if [[ "$RUN_MEDIA" -eq 1 ]]; then
  if [[ ! -d "$LOCAL_MEDIA_DIR" ]]; then
    echo "Error: local media directory does not exist: $LOCAL_MEDIA_DIR"
    exit 1
  fi

  if [[ -z "$PROD_MEDIA_DIR" && -z "$PROD_MEDIA_RSYNC_DEST" ]]; then
    echo "Error: set PRODUCTION_MEDIA_DIR or PRODUCTION_MEDIA_RSYNC_DEST for media migration."
    exit 1
  fi
fi

echo "Migration plan"
echo "  Run DB migration:    $([[ "$RUN_DB" -eq 1 ]] && echo yes || echo no)"
echo "  Run media migration: $([[ "$RUN_MEDIA" -eq 1 ]] && echo yes || echo no)"
echo "  Dry run:             $([[ "$DRY_RUN" -eq 1 ]] && echo yes || echo no)"

if [[ "$RUN_DB" -eq 1 ]]; then
  if [[ -z "${PRODUCTION_MONGODB_URI:-}" ]]; then
    echo "Error: PRODUCTION_MONGODB_URI is required for DB migration."
    exit 1
  fi
  echo "  DB destination URI:  $PRODUCTION_MONGODB_URI"
fi

if [[ "$RUN_MEDIA" -eq 1 ]]; then
  echo "  Local media source:  $LOCAL_MEDIA_DIR"
  [[ -n "$PROD_MEDIA_DIR" ]] && echo "  Media target dir:    $PROD_MEDIA_DIR"
  [[ -n "$PROD_MEDIA_RSYNC_DEST" ]] && echo "  Media rsync target:  $PROD_MEDIA_RSYNC_DEST"
  echo "  Delete extra media:  $([[ "$DELETE_MEDIA" -eq 1 ]] && echo yes || echo no)"
fi

if [[ "$RUN_DB" -eq 1 ]]; then
  DB_ARGS=(--confirm)
  [[ "$DRY_RUN" -eq 1 ]] && DB_ARGS+=(--dry-run)
  [[ "$DROP_FLAG" -eq 1 ]] && DB_ARGS+=(--drop)
  [[ "$ALLOW_LOCAL_TARGET" -eq 1 ]] && DB_ARGS+=(--allow-local-target)

  echo "Running DB migration..."
  "$DB_SCRIPT" "${DB_ARGS[@]}"
fi

if [[ "$RUN_MEDIA" -eq 1 ]]; then
  require_tool rsync
  RSYNC_ARGS=(-a --human-readable --progress)
  [[ "$DRY_RUN" -eq 1 ]] && RSYNC_ARGS+=(--dry-run)
  [[ "$DELETE_MEDIA" -eq 1 ]] && RSYNC_ARGS+=(--delete)

  if [[ -n "$PROD_MEDIA_DIR" ]]; then
    protect_path "$PROD_MEDIA_DIR"
    mkdir -p "$PROD_MEDIA_DIR"
    echo "Syncing media to local directory..."
    rsync "${RSYNC_ARGS[@]}" "$LOCAL_MEDIA_DIR/" "$PROD_MEDIA_DIR/"
  fi

  if [[ -n "$PROD_MEDIA_RSYNC_DEST" ]]; then
    echo "Syncing media to rsync destination..."
    rsync "${RSYNC_ARGS[@]}" "$LOCAL_MEDIA_DIR/" "$PROD_MEDIA_RSYNC_DEST/"
  fi
fi

echo "All requested migration steps completed."
