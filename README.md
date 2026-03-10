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
