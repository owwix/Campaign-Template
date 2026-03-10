import type { CampaignData } from '../../lib/cms'

type CampaignPlatformProps = {
  platform: CampaignData['platform']
}

export default function CampaignPlatform({ platform }: CampaignPlatformProps) {
  return (
    <section className="section" id="platform">
      <p className="eyebrow">Platform</p>
      <h2 className="section-title mt-3">Priorities for the Next Term</h2>
      <p className="section-subtitle">Focused commitments designed for practical impact across academics, career outcomes, and student wellbeing.</p>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {(platform?.platformItems || []).map((item, index) => (
          <article className="card" key={`${item?.title}-${index}`}>
            {item?.icon ? <p className="font-mono text-xs uppercase tracking-[0.13em] text-[color:var(--accent)]">{item.icon}</p> : null}
            <h3 className="mt-2 text-lg font-medium">{item?.title || 'Priority Title'}</h3>
            <p className="mt-2 text-sm leading-relaxed text-soft">{item?.description || 'Priority details appear here.'}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
