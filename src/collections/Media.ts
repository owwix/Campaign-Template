import path from 'path'
import type { CollectionConfig } from 'payload/types'

export const Media: CollectionConfig = {
  slug: 'media',
  labels: {
    singular: 'Media Asset',
    plural: 'Media Library',
  },
  access: {
    read: () => true,
  },
  upload: {
    staticDir: process.env.PAYLOAD_MEDIA_DIR
      ? path.resolve(process.env.PAYLOAD_MEDIA_DIR)
      : path.resolve(process.cwd(), 'src/media'),
    staticURL: process.env.PAYLOAD_MEDIA_URL || '/media',
    adminThumbnail: 'thumbnail',
    imageSizes: [
      {
        name: 'thumbnail',
        width: 400,
        height: 300,
        fit: 'cover',
      },
      {
        name: 'card',
        width: 800,
        height: 520,
        fit: 'cover',
      },
      {
        name: 'og',
        width: 1200,
        height: 630,
        fit: 'cover',
      },
    ],
    mimeTypes: ['image/*', 'application/pdf'],
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
      admin: {
        description: 'Short accessible description for screen readers.',
      },
    },
    {
      name: 'credit',
      type: 'text',
      admin: {
        description: 'Optional source or photographer credit.',
      },
    },
    {
      name: 'rotation',
      label: 'Image Rotation',
      type: 'select',
      defaultValue: '0',
      options: [
        { label: '0° (No Rotation)', value: '0' },
        { label: '90° Clockwise', value: '90' },
        { label: '180°', value: '180' },
        { label: '270° Clockwise', value: '270' },
      ],
      admin: {
        description: 'Rotate this image in the frontend without re-uploading.',
      },
    },
  ],
}
