import type { Metadata } from 'next'
import CampaignAbout from '../components/campaign/CampaignAbout'
import CampaignContact from '../components/campaign/CampaignContact'
import CampaignEndorsements from '../components/campaign/CampaignEndorsements'
import CampaignEvents from '../components/campaign/CampaignEvents'
import CampaignFAQ from '../components/campaign/CampaignFAQ'
import CampaignFooter from '../components/campaign/CampaignFooter'
import CampaignHero from '../components/campaign/CampaignHero'
import CampaignNav from '../components/campaign/CampaignNav'
import CampaignPlatform from '../components/campaign/CampaignPlatform'
import CampaignVision from '../components/campaign/CampaignVision'
import { type CampaignData, fetchCampaignPage, resolveMedia } from '../lib/cms'
import { siteConfig } from '../src/utils/siteConfig'

export const dynamic = 'force-dynamic'

const fallbackData: CampaignData = {
  campaignInfo: {
    candidateName: 'Jordan Ellis',
    officeTitle: 'Law School President',
    organizationName: 'Blackstone Law Society',
    slogan: 'Practical Leadership. Transparent Advocacy. Student-First Results.',
  },
  hero: {
    heroBadge: '2026 Student Bar Association Election',
    heroHeadline: 'Building a law school that works for every student, every week.',
    heroSubheadline:
      'I am running for Law School President to improve academic support, career access, and student wellness through consistent, transparent action.',
  },
}

export async function generateMetadata(): Promise<Metadata> {
  try {
    const campaign = await fetchCampaignPage<CampaignData>()
    const og = resolveMedia(campaign?.seo?.ogImage)

    return {
      title: campaign?.seo?.metaTitle || `${campaign?.campaignInfo?.candidateName || 'Candidate'} for ${campaign?.campaignInfo?.officeTitle || 'Office'}`,
      description:
        campaign?.seo?.metaDescription ||
        'Official campaign website featuring the platform, endorsements, events, and contact information.',
      openGraph: {
        title: campaign?.seo?.metaTitle || 'Law School Campaign',
        description: campaign?.seo?.metaDescription || 'Official campaign website.',
        url: siteConfig.siteUrl,
        images: og.src ? [{ url: og.src, alt: og.alt || 'Campaign share image' }] : undefined,
      },
      twitter: {
        card: 'summary_large_image',
        title: campaign?.seo?.metaTitle || 'Law School Campaign',
        description: campaign?.seo?.metaDescription || 'Official campaign website.',
        images: og.src ? [og.src] : undefined,
      },
    }
  } catch {
    return {
      title: 'Law School Campaign',
      description: 'Official campaign website',
    }
  }
}

export default async function HomePage() {
  let campaign: CampaignData = fallbackData

  try {
    campaign = await fetchCampaignPage<CampaignData>()
  } catch (error) {
    console.error(error)
  }

  const accentColor = campaign?.theme?.accentColor || '#9f7a46'
  const showBanner = campaign?.announcement?.enabled !== false && campaign?.announcement?.text
  const showSectionGradients = campaign?.theme?.showSectionGradients !== false

  return (
    <>
      <CampaignNav
        candidateName={campaign?.campaignInfo?.candidateName}
        officeTitle={campaign?.campaignInfo?.officeTitle}
      />

      <main className="shell space-y-6" style={{ ['--accent' as string]: accentColor }}>
        {showBanner ? (
          <section className="rounded-xl border border-line bg-[color:var(--accent)] px-4 py-3 text-center text-sm font-medium text-white" role="status">
            {campaign.announcement?.text}
          </section>
        ) : null}

        <CampaignHero campaignInfo={campaign?.campaignInfo} cta={campaign?.campaignCta} hero={campaign?.hero} />

        <div
          className="space-y-6"
          style={
            showSectionGradients
              ? {
                  background:
                    'linear-gradient(180deg, rgba(159,122,70,0.08) 0%, rgba(244,241,234,0) 28%, rgba(26,39,51,0.05) 100%)',
                  borderRadius: '1rem',
                  padding: '0.25rem',
                }
              : undefined
          }
        >
          <CampaignAbout about={campaign?.about} />
          <CampaignPlatform platform={campaign?.platform} />
          <CampaignVision vision={campaign?.vision} />
          <CampaignEndorsements endorsements={campaign?.endorsements} />
          <CampaignEvents events={campaign?.events} />
          <CampaignFAQ faq={campaign?.faq} />
          <CampaignContact contact={campaign?.contact} />
        </div>
      </main>

      <CampaignFooter
        candidateName={campaign?.campaignInfo?.candidateName}
        footerText={campaign?.footerText}
      />
    </>
  )
}
