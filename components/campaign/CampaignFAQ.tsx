import type { CampaignData } from '../../lib/cms'

type CampaignFAQProps = {
  faq: CampaignData['faq']
}

export default function CampaignFAQ({ faq }: CampaignFAQProps) {
  return (
    <section className="section" id="faq">
      <p className="eyebrow">FAQ</p>
      <h2 className="section-title mt-3">Frequently Asked Questions</h2>

      <div className="mt-6 space-y-3">
        {(faq?.faqItems || []).map((item, index) => (
          <details className="rounded-xl border border-line bg-white/70 p-4 open:border-[color:var(--accent)]" key={`${item?.question}-${index}`}>
            <summary className="cursor-pointer list-none pr-6 text-base font-medium">
              <span>{item?.question || 'Question'}</span>
            </summary>
            <p className="mt-3 text-sm leading-relaxed text-soft">{item?.answer || 'Answer'}</p>
          </details>
        ))}
      </div>
    </section>
  )
}
