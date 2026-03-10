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
      name: 'campaignInfo',
      label: 'Campaign Info',
      type: 'group',
      fields: [
        { name: 'candidateName', type: 'text', required: true, defaultValue: 'Jordan Ellis' },
        { name: 'officeTitle', type: 'text', required: true, defaultValue: 'Law School President' },
        { name: 'organizationName', type: 'text', required: true, defaultValue: 'Blackstone Law Society' },
        { name: 'electionDate', type: 'date', required: true, defaultValue: '2026-04-18T17:00:00.000Z' },
        { name: 'slogan', type: 'text', defaultValue: 'Practical Leadership. Transparent Advocacy. Student-First Results.' },
      ],
    },
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
      name: 'footerText',
      type: 'text',
      defaultValue: 'Paid for by Students for Jordan Ellis. Built with transparency and purpose.',
    },
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
    {
      name: 'theme',
      label: 'Theme Options',
      type: 'group',
      fields: [
        {
          name: 'accentColor',
          type: 'text',
          defaultValue: '#9f7a46',
          admin: {
            description: 'Use a hex color like #9f7a46.',
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
}
