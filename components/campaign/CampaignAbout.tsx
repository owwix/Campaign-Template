import type { CampaignData } from '../../lib/cms'

type CampaignAboutProps = {
  about: CampaignData['about']
}

export default function CampaignAbout({ about }: CampaignAboutProps) {
  return (
    <section className="section" id="about">
      <p className="eyebrow">Candidate Profile</p>
      <h2 className="section-title mt-3">{about?.aboutTitle || 'About the Candidate'}</h2>
      <p className="section-subtitle">{about?.aboutBody || 'Candidate biography goes here.'}</p>

      {about?.bioHighlights?.length ? (
        <div className="mt-6 grid gap-3 md:grid-cols-3">
          {about.bioHighlights.map((item, index) => (
            <article className="card" key={`${item?.label}-${index}`}>
              <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-soft">{item?.label || 'Highlight'}</p>
              <p className="mt-2 text-sm leading-relaxed">{item?.value || 'Add highlight value in CMS.'}</p>
            </article>
          ))}
        </div>
      ) : null}
    </section>
  )
}
