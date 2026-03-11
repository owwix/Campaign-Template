import path from 'path'
import { webpackBundler } from '@payloadcms/bundler-webpack'
import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { slateEditor } from '@payloadcms/richtext-slate'
import { buildConfig } from 'payload/config'
import { Media } from './collections/Media'
import { VolunteerSubmissions } from './collections/VolunteerSubmissions'
import { CampaignPage } from './globals/CampaignPage'
import { siteConfig } from './utils/siteConfig'

export default buildConfig({
  upload: {
    safeFileNames: /[^a-zA-Z0-9._-]/g,
    preserveExtension: true,
    uriDecodeFileNames: true,
    createParentPath: true,
  },
  db: mongooseAdapter({
    url: process.env.MONGODB_URI ?? '',
  }),
  editor: slateEditor({}),
  serverURL: process.env.PAYLOAD_PUBLIC_SERVER_URL ?? 'http://localhost:3000',
  admin: {
    bundler: webpackBundler(),
    user: 'users',
    css: path.resolve(process.cwd(), 'src/admin/admin.css'),
    meta: {
      titleSuffix: ` · ${siteConfig.cmsTitle}`,
      favicon: '/ao-icon.svg',
      ogImage: '/ao-icon.svg',
    },
  },
  collections: [
    Media,
    VolunteerSubmissions,
    {
      slug: 'users',
      labels: {
        singular: 'Editor',
        plural: 'Editors',
      },
      auth: true,
      admin: {
        useAsTitle: 'email',
        group: 'Site',
      },
      fields: [],
    },
  ],
  globals: [CampaignPage],
  typescript: {
    outputFile: path.resolve(__dirname, 'payload-types.ts'),
  },
  graphQL: {
    schemaOutputFile: path.resolve(__dirname, 'generated-schema.graphql'),
  },
})
