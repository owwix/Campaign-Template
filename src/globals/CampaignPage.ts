import type { GlobalConfig } from 'payload/types'

export const CampaignPage: GlobalConfig = {
  slug: 'campaign-page',
  label: 'Campaign Page',
  admin: {
    group: 'Site',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Campaign Info',
          fields: [
            {
              name: 'campaignInfo',
              label: 'Campaign Info',
              type: 'group',
              fields: [
                { name: 'candidateName', type: 'text', required: true, defaultValue: 'Pablo Gonzalez' },
                { name: 'officeTitle', type: 'text', required: true, defaultValue: 'Law School President' },
                {
                  name: 'organizationName',
                  type: 'text',
                  required: true,
                  defaultValue: 'University of the Pacific McGeorge School of Law',
                },
                { name: 'electionDate', type: 'date', required: true, defaultValue: '2026-04-18T17:00:00.000Z' },
                { name: 'slogan', type: 'text', defaultValue: 'Practical Leadership. Transparent Advocacy. Student-First Results.' },
              ],
            },
            {
              name: 'header',
              label: 'Header',
              type: 'group',
              fields: [
                {
                  name: 'message',
                  type: 'text',
                  defaultValue: 'VOTE {{candidateName}} FOR PRESIDENT',
                  admin: {
                    description:
                      'Main center banner message. Supports {{candidateName}}, {{firstName}}, {{officeTitle}}, and {{organizationName}}.',
                  },
                },
                {
                  name: 'ctaLabel',
                  type: 'text',
                  defaultValue: 'Support {{firstName}}',
                  admin: {
                    description: 'Right-side header button label. Supports the same tokens.',
                  },
                },
                {
                  name: 'ctaHref',
                  type: 'text',
                  defaultValue: '#contact',
                  admin: {
                    description: 'Right-side header button link (anchor or full URL).',
                  },
                },
              ],
            },
            {
              name: 'announcement',
              label: 'Announcement Banner',
              type: 'group',
              fields: [
                { name: 'enabled', type: 'checkbox', defaultValue: true },
                { name: 'text', type: 'text', defaultValue: 'Election Day is April 18, 2026. Polls open 9:00 AM.' },
              ],
            },
            {
              name: 'campaignCta',
              label: 'Primary Campaign CTA',
              type: 'group',
              fields: [
                { name: 'label', type: 'text', defaultValue: 'Volunteer with the Campaign' },
                { name: 'href', type: 'text', defaultValue: '#contact' },
                { name: 'secondaryLabel', type: 'text', defaultValue: 'View Platform Priorities' },
                { name: 'secondaryHref', type: 'text', defaultValue: '#platform' },
              ],
            },
          ],
        },
        {
          label: 'Hero',
          fields: [
            {
              name: 'hero',
              label: 'Hero',
              type: 'group',
              fields: [
                {
                  name: 'heroBadge',
                  type: 'text',
                  defaultValue: '2026 Student Bar Association Election',
                },
                {
                  name: 'heroHeadline',
                  type: 'text',
                  required: true,
                  defaultValue: 'Building a law school that works for every student, every week.',
                },
                {
                  name: 'heroSubheadline',
                  type: 'textarea',
                  required: true,
                  defaultValue:
                    'I am running for Law School President to improve academic support, career access, and student wellness through consistent, transparent action.',
                },
                {
                  name: 'heroImage',
                  type: 'upload',
                  relationTo: 'media',
                  required: true,
                },
                {
                  name: 'heroStats',
                  type: 'array',
                  labels: {
                    singular: 'Hero Stat',
                    plural: 'Hero Stats',
                  },
                  defaultValue: [
                    { label: 'Student Forums Hosted', value: '18' },
                    { label: 'Clinic Seats Added', value: '42' },
                    { label: 'Wellness Initiatives Led', value: '7' },
                  ],
                  fields: [
                    { name: 'label', type: 'text', required: true },
                    { name: 'value', type: 'text', required: true },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: 'Campaign Tape',
          fields: [
            {
              name: 'campaignTape',
              label: 'Campaign Tape',
              type: 'group',
              fields: [
                {
                  name: 'enabled',
                  type: 'checkbox',
                  defaultValue: true,
                },
                {
                  name: 'tapeText',
                  type: 'text',
                  required: true,
                  defaultValue: 'VOTE PABLO GONZALES FOR VICE PRESIDENT',
                },
                {
                  name: 'repeatedText',
                  type: 'text',
                  admin: {
                    description:
                      'Optional visual override for each repeated unit (for example "VOTE PABLO GONZALES •"). Leave blank to auto-repeat tape text.',
                  },
                },
                {
                  name: 'themeVariant',
                  type: 'select',
                  defaultValue: 'brand',
                  options: [
                    { label: 'Brand Blue', value: 'brand' },
                    { label: 'Dark Ink', value: 'dark' },
                    { label: 'Sky Light', value: 'light' },
                    { label: 'Custom Colors', value: 'custom' },
                  ],
                },
                {
                  name: 'backgroundColor',
                  type: 'text',
                  defaultValue: '#255DF1',
                  admin: {
                    description: 'Hex color used when theme variant is Custom Colors (example: #255DF1).',
                    condition: (_, siblingData) => siblingData?.themeVariant === 'custom',
                  },
                },
                {
                  name: 'textColor',
                  type: 'text',
                  defaultValue: '#FFFFFF',
                  admin: {
                    description: 'Hex color used when theme variant is Custom Colors (example: #FFFFFF).',
                    condition: (_, siblingData) => siblingData?.themeVariant === 'custom',
                  },
                },
                {
                  name: 'speed',
                  type: 'number',
                  defaultValue: 26,
                  min: 8,
                  max: 90,
                  admin: {
                    step: 1,
                    description: 'Marquee duration in seconds. Lower value = faster movement.',
                  },
                },
                {
                  name: 'angle',
                  type: 'number',
                  defaultValue: -2,
                  min: -10,
                  max: 10,
                  admin: {
                    step: 0.5,
                    description: 'Tape slant angle in degrees. Use 0 for a straight band.',
                  },
                },
                {
                  name: 'linkHref',
                  type: 'text',
                  admin: {
                    description: 'Optional link target (anchor like #contact or full URL).',
                  },
                },
                {
                  name: 'linkLabel',
                  type: 'text',
                  defaultValue: 'Learn more about this campaign',
                  admin: {
                    description: 'Accessible label used when link URL is set.',
                  },
                },
                {
                  name: 'topSpacing',
                  type: 'number',
                  defaultValue: 8,
                  min: 0,
                  max: 120,
                  admin: {
                    step: 1,
                    description: 'Space above tape in pixels.',
                  },
                },
                {
                  name: 'bottomSpacing',
                  type: 'number',
                  defaultValue: 22,
                  min: 0,
                  max: 120,
                  admin: {
                    step: 1,
                    description: 'Space below tape in pixels.',
                  },
                },
              ],
            },
          ],
        },
        {
          label: 'About',
          fields: [
            {
              name: 'about',
              label: 'About',
              type: 'group',
              fields: [
                { name: 'aboutTitle', type: 'text', required: true, defaultValue: 'About the Candidate' },
                {
                  name: 'aboutBody',
                  type: 'textarea',
                  required: true,
                  defaultValue:
                    'Jordan Ellis is a second-year law student focused on student advocacy, practical reform, and transparent leadership. After serving as 1L Representative and Academic Affairs Liaison, Jordan has worked across student organizations and administration teams to improve communication, reduce process friction, and ensure student feedback leads to action.',
                },
                {
                  name: 'bioHighlights',
                  type: 'array',
                  defaultValue: [
                    { label: 'Current Role', value: 'Academic Affairs Liaison' },
                    { label: 'Prior Leadership', value: '1L Class Representative' },
                    { label: 'Focus Areas', value: 'Advocacy, wellness, and career equity' },
                  ],
                  fields: [
                    { name: 'label', type: 'text', required: true },
                    { name: 'value', type: 'text', required: true },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: 'Platform',
          fields: [
            {
              name: 'platform',
              label: 'Platform',
              type: 'group',
              fields: [
                {
                  name: 'platformItems',
                  type: 'array',
                  required: true,
                  defaultValue: [
                    {
                      icon: 'Scales',
                      title: 'Transparent Student Government',
                      description: 'Publish monthly updates, voting records, and action timelines so every student can track progress.',
                    },
                    {
                      icon: 'BookOpen',
                      title: 'Academic Success Support',
                      description: 'Expand bar prep planning, peer review sessions, and office-hour coordination during high-stakes periods.',
                    },
                    {
                      icon: 'Briefcase',
                      title: 'Career Access for All',
                      description: 'Improve employer outreach and mentorship opportunities for students across every practice interest.',
                    },
                    {
                      icon: 'HeartPulse',
                      title: 'Wellness That Is Actionable',
                      description: 'Strengthen wellness programming with practical scheduling changes and better mental-health resource visibility.',
                    },
                  ],
                  fields: [
                    { name: 'icon', type: 'text', defaultValue: 'Scales' },
                    { name: 'title', type: 'text', required: true },
                    { name: 'description', type: 'textarea', required: true },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: 'Vision',
          fields: [
            {
              name: 'vision',
              label: 'Vision',
              type: 'group',
              fields: [
                { name: 'visionTitle', type: 'text', required: true, defaultValue: 'Campaign Vision' },
                {
                  name: 'visionBody',
                  type: 'textarea',
                  required: true,
                  defaultValue:
                    'Our law school should be rigorous, supportive, and genuinely responsive to student needs. This campaign is centered on building stronger bridges between students, faculty, and administration, so policy changes are practical, measurable, and designed around the daily realities of legal education.',
                },
                {
                  name: 'platformPdf',
                  type: 'upload',
                  relationTo: 'media',
                  admin: {
                    description: 'Optional upload for a downloadable campaign platform PDF.',
                  },
                },
              ],
            },
          ],
        },
        {
          label: 'Endorsements',
          fields: [
            {
              name: 'endorsements',
              label: 'Endorsements',
              type: 'array',
              defaultValue: [
                {
                  quote:
                    'Jordan listens first, follows through, and consistently keeps students informed. That combination is exactly what this office needs.',
                  name: 'Avery Chen',
                  role: '3L, Moot Court Board',
                },
                {
                  quote:
                    'I have seen Jordan bring faculty and students into the same conversation and produce outcomes quickly and respectfully.',
                  name: 'Priya Raman',
                  role: 'Professor of Legal Writing',
                },
              ],
              fields: [
                { name: 'quote', type: 'textarea', required: true },
                { name: 'name', type: 'text', required: true },
                { name: 'role', type: 'text', required: true },
                { name: 'image', type: 'upload', relationTo: 'media' },
              ],
            },
          ],
        },
        {
          label: 'Events',
          fields: [
            {
              name: 'events',
              label: 'Events',
              type: 'array',
              defaultValue: [
                {
                  title: 'Student Listening Session',
                  date: '2026-03-20T19:00:00.000Z',
                  time: '12:00 PM - 1:00 PM',
                  location: 'Student Commons, Room 204',
                  description: 'Bring your priorities and concerns. This session is focused on direct student feedback and immediate action planning.',
                  cta: 'RSVP by email',
                },
                {
                  title: 'Platform Q&A Town Hall',
                  date: '2026-03-28T00:00:00.000Z',
                  time: '5:30 PM - 6:30 PM',
                  location: 'Auburn Lecture Hall',
                  description: 'Open Q&A on campaign priorities, budget transparency, and implementation timeline.',
                  cta: 'Submit a question',
                },
              ],
              fields: [
                { name: 'title', type: 'text', required: true },
                { name: 'date', type: 'date', required: true },
                { name: 'time', type: 'text' },
                { name: 'location', type: 'text' },
                { name: 'description', type: 'textarea', required: true },
                { name: 'cta', type: 'text' },
              ],
            },
          ],
        },
        {
          label: 'FAQ',
          fields: [
            {
              name: 'faq',
              label: 'FAQ',
              type: 'group',
              fields: [
                {
                  name: 'faqItems',
                  type: 'array',
                  defaultValue: [
                    {
                      question: 'How will you keep students informed after election season?',
                      answer: 'I will publish monthly updates with clear progress reporting and host open office hours every two weeks.',
                    },
                    {
                      question: 'What is your top day-one priority?',
                      answer:
                        'Launch a transparent issue tracker so students can submit concerns, view status, and see which stakeholders are responsible.',
                    },
                    {
                      question: 'How can students get involved right now?',
                      answer: 'You can volunteer, attend campaign forums, share priorities, or help with outreach through the Get Involved section.',
                    },
                  ],
                  fields: [
                    { name: 'question', type: 'text', required: true },
                    { name: 'answer', type: 'textarea', required: true },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: 'Contact',
          fields: [
            {
              name: 'contact',
              label: 'Contact',
              type: 'group',
              fields: [
                { name: 'contactTitle', type: 'text', defaultValue: 'Get Involved' },
                {
                  name: 'contactBody',
                  type: 'textarea',
                  defaultValue:
                    'Join the campaign as a volunteer, host representative, or outreach lead. Every role helps us build a stronger student voice.',
                },
                { name: 'email', type: 'email', required: true, defaultValue: 'jordan.ellis@lawschool.edu' },
                {
                  name: 'socials',
                  type: 'array',
                  defaultValue: [
                    { label: 'Instagram', url: 'https://instagram.com/jordanforpresident' },
                    { label: 'LinkedIn', url: 'https://linkedin.com/in/jordanellis' },
                  ],
                  fields: [
                    { name: 'label', type: 'text', required: true },
                    { name: 'url', type: 'text', required: true },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: 'Visibility',
          fields: [
            {
              name: 'sectionVisibility',
              label: 'Section Visibility',
              type: 'group',
              fields: [
                { name: 'showHeader', type: 'checkbox', defaultValue: true, label: 'Show Header Message' },
                { name: 'showAnnouncement', type: 'checkbox', defaultValue: true, label: 'Show Election Update' },
                { name: 'showHero', type: 'checkbox', defaultValue: true, label: 'Show Hero Section' },
                { name: 'showCampaignTape', type: 'checkbox', defaultValue: true, label: 'Show Campaign Tape' },
                { name: 'showAbout', type: 'checkbox', defaultValue: true, label: 'Show About Section' },
                { name: 'showPlatform', type: 'checkbox', defaultValue: true, label: 'Show Platform Section' },
                { name: 'showVision', type: 'checkbox', defaultValue: true, label: 'Show Vision Section' },
                { name: 'showEndorsements', type: 'checkbox', defaultValue: true, label: 'Show Endorsements Section' },
                { name: 'showEvents', type: 'checkbox', defaultValue: true, label: 'Show Events Section' },
                { name: 'showFAQ', type: 'checkbox', defaultValue: true, label: 'Show FAQ Section' },
                { name: 'showContact', type: 'checkbox', defaultValue: true, label: 'Show Contact Section' },
                { name: 'showFooter', type: 'checkbox', defaultValue: true, label: 'Show Footer' },
              ],
            },
          ],
        },
        {
          label: 'Footer',
          fields: [
            {
              name: 'footerText',
              label: 'Footer Left Text',
              type: 'text',
              defaultValue: 'Paid for by Students for Jordan Ellis. Built with transparency and purpose.',
            },
            {
              name: 'footerCopyright',
              label: 'Footer Right Text',
              type: 'text',
              defaultValue: '© {{year}} {{candidateName}}',
              admin: {
                description: 'Supports {{year}} and {{candidateName}} tokens.',
              },
            },
          ],
        },
        {
          label: 'SEO',
          fields: [
            {
              name: 'seo',
              label: 'SEO',
              type: 'group',
              fields: [
                { name: 'metaTitle', type: 'text', defaultValue: 'Jordan Ellis for Law School President' },
                {
                  name: 'metaDescription',
                  type: 'textarea',
                  defaultValue:
                    'Official campaign website for Jordan Ellis, candidate for Law School President. Learn about the platform, events, endorsements, and ways to get involved.',
                },
                {
                  name: 'ogImage',
                  type: 'upload',
                  relationTo: 'media',
                },
              ],
            },
          ],
        },
        {
          label: 'Theme',
          fields: [
            {
              name: 'theme',
              label: 'Theme Options',
              type: 'group',
              fields: [
                {
                  name: 'accentColor',
                  type: 'text',
                  defaultValue: '#AF8A54',
                  admin: {
                    description: 'Use a hex color like #AF8A54.',
                  },
                },
                {
                  name: 'showSectionGradients',
                  type: 'checkbox',
                  defaultValue: true,
                },
              ],
            },
          ],
        },
      ],
    },
  ],
}
