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
import CampaignTape from '../components/campaign/CampaignTape'
import CampaignVision from '../components/campaign/CampaignVision'
import { type CampaignData, fetchCampaignPage, resolveMedia } from '../lib/cms'
import { siteConfig } from '../src/utils/siteConfig'

export const dynamic = 'force-dynamic'

const fallbackData: CampaignData = {
  campaignInfo: {
    candidateName: 'Jordan Ellis',
    officeTitle: 'Law School President',
    organizationName: 'University of the Pacific McGeorge School of Law',
    slogan: 'Practical Leadership. Transparent Advocacy. Student-First Results.',
  },
  header: {
    message: 'VOTE {{candidateName}} FOR PRESIDENT',
    ctaLabel: 'Support {{firstName}}',
    ctaHref: '#contact',
  },
  campaignTape: {
    enabled: true,
    tapeText: 'VOTE PABLO GONZALES FOR VICE PRESIDENT',
    themeVariant: 'brand',
    speed: 26,
    angle: -2,
    topSpacing: 8,
    bottomSpacing: 22,
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

  const legacyAccent = (campaign?.theme?.accentColor || '').toLowerCase()
  const accentColor =
    legacyAccent === '#af8a54' || legacyAccent === '#9f7a46'
      ? '#3A76F8'
      : campaign?.theme?.accentColor || '#3A76F8'
  const showBanner = campaign?.announcement?.enabled !== false && campaign?.announcement?.text
  const showSectionGradients = campaign?.theme?.showSectionGradients !== false

  return (
    <>
      <CampaignNav
        candidateName={campaign?.campaignInfo?.candidateName}
        header={campaign?.header}
        organizationName={campaign?.campaignInfo?.organizationName}
        officeTitle={campaign?.campaignInfo?.officeTitle}
      />

      <main className="shell space-y-7 md:space-y-8" style={{ ['--accent' as string]: accentColor }}>
        {showBanner ? (
          <section
            className="relative overflow-hidden rounded-2xl border border-[color:var(--brand-primary)]/28 bg-white/78 shadow-[0_16px_44px_-28px_rgba(37,93,241,0.78)]"
            role="status"
          >
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 bg-[radial-gradient(90%_220%_at_12%_0%,rgba(37,93,241,0.16),transparent_65%),linear-gradient(100deg,rgba(37,93,241,0.02)_0%,rgba(63,124,255,0.09)_40%,rgba(255,255,255,0.24)_100%)]"
            />
            <div className="relative flex flex-wrap items-center justify-center gap-2.5 px-5 py-3.5 md:gap-3 md:px-6 md:py-4">
              <span className="inline-flex items-center rounded-full border border-[color:var(--brand-primary)]/20 bg-[color:var(--brand-primary-soft)] px-2.5 py-1 font-mono text-[10px] font-medium uppercase tracking-[0.14em] text-[color:var(--brand-primary)]">
                Election Update
              </span>
              <p className="text-center text-sm font-semibold tracking-[0.01em] text-[#122b5f] md:text-[0.98rem]">
                {campaign.announcement?.text}
              </p>
            </div>
          </section>
        ) : null}

        <CampaignHero campaignInfo={campaign?.campaignInfo} cta={campaign?.campaignCta} hero={campaign?.hero} />
        <CampaignTape tape={campaign?.campaignTape} />

        <div
          className="space-y-6"
          style={
            showSectionGradients
              ? {
                  background:
                    'linear-gradient(180deg, rgba(37,93,241,0.1) 0%, rgba(237,244,255,0.2) 36%, rgba(255,255,255,0.78) 100%)',
                  borderRadius: '1rem',
                  padding: '0.35rem',
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
        footerCopyright={campaign?.footerCopyright}
        footerText={campaign?.footerText}
      />
    </>
  )
}
