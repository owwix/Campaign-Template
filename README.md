# Campaign Template (Payload + Next.js)

Production-ready law school campaign starter with:
- Payload CMS for editor-managed campaign content
- Next.js App Router for the public single-page site
- TypeScript and modular campaign components
- Tailwind CSS with a restrained, professional visual system

## Includes

- Sticky single-page anchor navigation
- Hero + campaign stats + CTA actions
- About, platform, vision, endorsements, events, FAQ
- Get involved/contact section with volunteer form UI
- SEO metadata + Open Graph image support
- Editable global `campaign-page` model in Payload

## Quick Start

1. Copy environment variables:

```bash
cp .env.example .env
```

2. Install dependencies:

```bash
npm install
```

3. Start MongoDB (example):

```bash
docker run --name campaign-template-mongo -p 27017:27017 -d mongo:7
```

4. Run locally:

```bash
npm run dev
```

5. Open admin and seed/update content:

- <http://localhost:3000/admin>
- Edit `Globals -> Campaign Page`

## Environment Variables

- `PORT`
- `MONGODB_URI`
- `PAYLOAD_SECRET`
- `PAYLOAD_PUBLIC_SERVER_URL`
- `PAYLOAD_INTERNAL_SERVER_URL`
- `PAYLOAD_MEDIA_DIR`
- `PAYLOAD_MEDIA_URL`
- `SITE_URL`
- `SITE_ORGANIZATION_NAME`
- `CMS_TITLE`
- `CMS_SUBTITLE`
- `CMS_MONOGRAM`
- `BACKUP_MONGODB_URI` (optional, defaults to `MONGODB_URI`)
- `BACKUP_DIR` (default `backups/mongodb`)
- `BACKUP_FILE_PREFIX` (default `payload`)
- `BACKUP_RETENTION_DAYS` (default `14`)
- `BACKUP_UPLOAD_COMMAND` (optional, for offsite copy)

## Build

```bash
npm run build
npm start
```

For CI environments where admin build must be skipped:

```bash
SKIP_PAYLOAD_ADMIN_BUILD=1 npm run build:railway
```

## Migrate Local MongoDB to Production

This repo includes a guarded migration script:

```bash
npm run migrate:mongo -- --dry-run --confirm
```

Run a real migration:

```bash
PRODUCTION_MONGODB_URI='mongodb+srv://<user>:<pass>@<cluster>/<db>' \
LOCAL_MONGODB_URI='mongodb://127.0.0.1:27018/campaign-template' \
npm run migrate:mongo -- --drop --confirm
```

Notes:
- `--confirm` is required for any run.
- `--drop` replaces destination collections before restore.
- Script refuses local destination URIs unless `--allow-local-target` is passed.
- Requires `mongodump` and `mongorestore` (MongoDB Database Tools).

## Migrate Database + Uploaded Media

Use the full migration script when you need both MongoDB content and uploaded files moved:

```bash
npm run migrate:all -- --dry-run --confirm
```

Full run example (remote media host):

```bash
PRODUCTION_MONGODB_URI='mongodb+srv://<user>:<pass>@<cluster>/<db>' \
PRODUCTION_MEDIA_RSYNC_DEST='deploy@server:/var/www/app/media' \
LOCAL_MONGODB_URI='mongodb://127.0.0.1:27018/campaign-template' \
LOCAL_MEDIA_DIR='src/media' \
npm run migrate:all -- --drop --confirm
```

Local media destination example:

```bash
PRODUCTION_MONGODB_URI='mongodb+srv://<user>:<pass>@<cluster>/<db>' \
PRODUCTION_MEDIA_DIR='/data/media' \
npm run migrate:all -- --drop --confirm
```

Useful flags:
- `--db-only`: migrate DB only
- `--media-only`: migrate media files only
- `--delete-media`: mirror source exactly (deletes extra files on destination)
- `--allow-local-target`: allow local DB URI destination

## Automatic MongoDB Backups

This repo includes an automated backup script:

```bash
npm run backup:mongo
```

Dry run:

```bash
npm run backup:mongo -- --dry-run
```

The script:
- Creates timestamped compressed archives with `mongodump`
- Writes checksum files (`.sha256`) when hash tools are available
- Prunes local files older than `BACKUP_RETENTION_DAYS`
- Can run an optional upload command for offsite storage

Example upload to S3-compatible storage:

```bash
BACKUP_UPLOAD_COMMAND='aws s3 cp "$BACKUP_FILE_PATH" "s3://my-backup-bucket/mongo/$BACKUP_FILE_NAME"' \
npm run backup:mongo
```

### Railway Scheduler Setup

1. Add backup environment variables to your Railway production service:
   - `BACKUP_MONGODB_URI=${{MONGODB_URI}}` (or explicit production URI)
   - `BACKUP_RETENTION_DAYS=14`
   - `BACKUP_UPLOAD_COMMAND=...` (recommended for offsite backups)
2. Create a Railway Cron/Scheduled Job in production.
3. Set command to:

```bash
npm run backup:mongo
```

4. Choose frequency (common default: daily at off-peak hours).

Important:
- Keep at least one offsite target (`BACKUP_UPLOAD_COMMAND`) so backups survive container restarts.
- Ensure `mongodump` is available in your runtime image.
