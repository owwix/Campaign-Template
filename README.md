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
