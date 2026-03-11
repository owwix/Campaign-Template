import type { CollectionConfig } from 'payload/types'

export const VolunteerSubmissions: CollectionConfig = {
  slug: 'volunteer-submissions',
  labels: {
    singular: 'Volunteer Submission',
    plural: 'Volunteer Submissions',
  },
  admin: {
    useAsTitle: 'fullName',
    group: 'Campaign',
    defaultColumns: ['fullName', 'email', 'status', 'createdAt'],
    description: 'Submissions from the public "Get Involved" form.',
  },
  access: {
    create: () => true,
    read: ({ req }) => Boolean(req.user),
    update: ({ req }) => Boolean(req.user),
    delete: ({ req }) => Boolean(req.user),
  },
  hooks: {
    beforeChange: [
      ({ data, req, operation }) => {
        if (operation !== 'create' || req.user) return data

        return {
          ...data,
          status: 'new',
          adminNotes: undefined,
        }
      },
    ],
  },
  fields: [
    {
      name: 'fullName',
      label: 'Full Name',
      type: 'text',
      required: true,
      maxLength: 120,
    },
    {
      name: 'email',
      type: 'email',
      required: true,
    },
    {
      name: 'interest',
      label: 'How They Want to Help',
      type: 'textarea',
      required: true,
      maxLength: 2000,
    },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'new',
      options: [
        { label: 'New', value: 'new' },
        { label: 'Reviewed', value: 'reviewed' },
        { label: 'Contacted', value: 'contacted' },
        { label: 'Archived', value: 'archived' },
      ],
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'sourcePath',
      label: 'Source Path',
      type: 'text',
      admin: {
        readOnly: true,
        description: 'Page route where the submission originated.',
        position: 'sidebar',
      },
    },
    {
      name: 'adminNotes',
      label: 'Admin Notes',
      type: 'textarea',
      admin: {
        description: 'Internal follow-up notes.',
      },
      access: {
        create: ({ req }) => Boolean(req.user),
        update: ({ req }) => Boolean(req.user),
        read: ({ req }) => Boolean(req.user),
      },
    },
  ],
  timestamps: true,
}
