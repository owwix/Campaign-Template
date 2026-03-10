import Link from 'next/link'
import type { CampaignData } from '../../lib/cms'
import { resolveMedia } from '../../lib/cms'

type CampaignVisionProps = {
  vision: CampaignData['vision']
}

export default function CampaignVision({ vision }: CampaignVisionProps) {
  const pdf = resolveMedia(vision?.platformPdf)

  return (
    <section className="section" id="vision">
      <p className="eyebrow">Vision</p>
      <h2 className="section-title mt-3">{vision?.visionTitle || 'Campaign Vision'}</h2>
      <p className="section-subtitle">{vision?.visionBody || 'Vision statement goes here.'}</p>

      {pdf.src ? (
        <div className="mt-6">
          <Link className="button-secondary" href={pdf.src} target="_blank">
            Download Full Platform PDF
          </Link>
        </div>
      ) : null}
    </section>
  )
}
