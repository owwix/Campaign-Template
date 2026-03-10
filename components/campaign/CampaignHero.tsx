import Image from 'next/image'
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

  return (
    <section className="section grid gap-8 lg:grid-cols-[1.1fr_0.9fr]" id="hero">
      <div>
        <p className="eyebrow">{hero?.heroBadge || 'Student Election Campaign'}</p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight md:text-5xl">{hero?.heroHeadline || 'Campaign Headline'}</h1>
        <p className="mt-4 max-w-copy text-lg leading-relaxed text-soft">{hero?.heroSubheadline || 'Campaign subheadline goes here.'}</p>

        <div className="mt-6 grid gap-3 rounded-xl border border-line bg-white/70 p-4 md:grid-cols-2">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-soft">Candidate</p>
            <p className="mt-1 font-medium">{campaignInfo?.candidateName || 'Candidate Name'}</p>
          </div>
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-soft">Election Date</p>
            <p className="mt-1 font-medium">{electionDate || 'TBD'}</p>
          </div>
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-soft">Office</p>
            <p className="mt-1 font-medium">{campaignInfo?.officeTitle || 'Office Sought'}</p>
          </div>
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-soft">Organization</p>
            <p className="mt-1 font-medium">{campaignInfo?.organizationName || 'Law Student Association'}</p>
          </div>
        </div>

        {campaignInfo?.slogan ? <p className="mt-4 text-base font-medium text-[color:var(--accent)]">{campaignInfo.slogan}</p> : null}

        <div className="mt-7">
          <CampaignCTA
            primaryHref={cta?.href}
            primaryLabel={cta?.label}
            secondaryHref={cta?.secondaryHref}
            secondaryLabel={cta?.secondaryLabel}
          />
        </div>
      </div>

      <div className="space-y-4">
        <div className="relative overflow-hidden rounded-2xl border border-line bg-white/80">
          {heroImage.src ? (
            <Image alt={heroImage.alt} className="h-[340px] w-full object-cover" height={760} src={heroImage.src} width={620} />
          ) : (
            <div className="flex h-[340px] items-center justify-center bg-slate-200/60 text-sm text-soft">Add hero image in Payload CMS.</div>
          )}
        </div>

        {hero?.heroStats?.length ? (
          <div className="grid gap-3 sm:grid-cols-3">
            {hero.heroStats.map((stat, index) => (
              <div className="rounded-xl border border-line bg-white/75 p-4" key={`${stat?.label}-${index}`}>
                <p className="text-2xl font-semibold tracking-tight">{stat?.value || '--'}</p>
                <p className="mt-1 text-sm text-soft">{stat?.label || 'Metric'}</p>
              </div>
            ))}
          </div>
        ) : null}
      </div>
    </section>
  )
}
