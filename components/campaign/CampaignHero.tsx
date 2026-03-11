import type { CampaignData } from '../../lib/cms'
import { resolveMedia } from '../../lib/cms'
import CampaignCTA from './CampaignCTA'

type CampaignHeroProps = {
  campaignInfo: CampaignData['campaignInfo']
  hero: CampaignData['hero']
  cta: CampaignData['campaignCta']
}

function formatElectionDate(value?: string): string {
  if (!value) return ''
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return ''

  return date.toLocaleDateString(undefined, {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'UTC',
  })
}

export default function CampaignHero({ campaignInfo, hero, cta }: CampaignHeroProps) {
  const heroImage = resolveMedia(hero?.heroImage, `${campaignInfo?.candidateName || 'Candidate'} campaign portrait`)
  const electionDate = formatElectionDate(campaignInfo?.electionDate)
  const hasRotation = heroImage.rotation !== 0

  const infoItems = [
    { label: 'Candidate', value: campaignInfo?.candidateName || 'Candidate Name', icon: 'CN' },
    { label: 'Office', value: campaignInfo?.officeTitle || 'Office Sought', icon: 'OF' },
    { label: 'Election Date', value: electionDate || 'TBD', icon: 'ED' },
    { label: 'Organization', value: campaignInfo?.organizationName || 'Law Student Association', icon: 'OR' },
  ]

  return (
    <section className="section grid gap-8 py-8 md:py-9 lg:grid-cols-[1.02fr_0.98fr] lg:gap-16" id="hero">
      <div className="max-w-[38.5rem]">
        <p className="eyebrow">{hero?.heroBadge || 'Student Election Campaign'}</p>
        <h1 className="mt-4 max-w-[13.4ch] text-[2.75rem] font-semibold tracking-[-0.03em] leading-[0.97] md:text-[4.25rem]">
          {hero?.heroHeadline || 'Campaign Headline'}
        </h1>
        <p className="mt-6 max-w-[47ch] text-[1.05rem] leading-[1.62] text-soft md:text-[1.18rem]">
          {hero?.heroSubheadline || 'Campaign subheadline goes here.'}
        </p>

        <div className="mt-7 rounded-2xl border border-line bg-[color:var(--surface-strong)] p-4 md:p-5">
          <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-[color:var(--accent)]">Campaign Information</p>
          <div className="mt-3.5 grid gap-3.5 md:grid-cols-2 md:gap-4">
            {infoItems.map((item) => (
              <div className="flex items-start gap-2.5" key={item.label}>
                <span className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-line bg-white text-[9px] font-mono tracking-[0.08em] text-[color:var(--brand-primary)]">
                  {item.icon}
                </span>
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-soft">{item.label}</p>
                  <p className="mt-0.5 text-[1.02rem] font-semibold leading-snug md:text-[1.05rem]">{item.value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {campaignInfo?.slogan ? <p className="mt-6 text-[0.98rem] font-semibold text-[color:var(--accent)]">{campaignInfo.slogan}</p> : null}

        <div className="mt-6">
          <CampaignCTA
            primaryHref={cta?.href}
            primaryLabel={cta?.label}
            secondaryHref={cta?.secondaryHref}
            secondaryLabel={cta?.secondaryLabel}
          />
        </div>
      </div>

      <div className="self-start lg:-mt-2 lg:self-start">
        <div className="mx-auto w-full max-w-[22rem] space-y-4 sm:max-w-[24rem] md:space-y-5 lg:max-w-[27rem]">
          {heroImage.src ? (
            <div className="relative aspect-[9/10] overflow-hidden rounded-2xl border border-line bg-[color:var(--surface-strong)] shadow-sm">
              <img
                alt={heroImage.alt}
                className={`block h-full w-full ${hasRotation ? 'object-contain' : 'object-cover'}`}
                loading="eager"
                src={heroImage.src}
                style={hasRotation ? { transform: `rotate(${heroImage.rotation}deg)` } : undefined}
              />
            </div>
          ) : (
            <div className="flex aspect-[9/10] w-full items-center justify-center rounded-2xl border border-line bg-slate-200/60 text-sm text-soft">
              Add hero image in Payload CMS.
            </div>
          )}

        </div>
      </div>
    </section>
  )
}
