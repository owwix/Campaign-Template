import Image from 'next/image'
import type { CampaignData } from '../../lib/cms'
import { resolveMedia } from '../../lib/cms'

type CampaignEndorsementsProps = {
  endorsements: CampaignData['endorsements']
}

export default function CampaignEndorsements({ endorsements }: CampaignEndorsementsProps) {
  return (
    <section className="section" id="endorsements">
      <p className="eyebrow">Endorsements</p>
      <h2 className="section-title mt-3">What Community Leaders Are Saying</h2>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {(endorsements || []).map((entry, index) => {
          const photo = resolveMedia(entry?.image, `${entry?.name || 'Supporter'} portrait`)

          return (
            <article className="card" key={`${entry?.name}-${index}`}>
              <p className="text-sm leading-relaxed text-soft">&ldquo;{entry?.quote || 'Endorsement quote'}&rdquo;</p>
              <div className="mt-4 flex items-center gap-3">
                {photo.src ? (
                  <Image
                    alt={photo.alt}
                    className="h-11 w-11 rounded-full object-cover"
                    height={44}
                    src={photo.src}
                    style={{ transform: `rotate(${photo.rotation}deg)` }}
                    width={44}
                  />
                ) : (
                  <div aria-hidden="true" className="h-11 w-11 rounded-full bg-slate-300/70" />
                )}
                <div>
                  <p className="text-sm font-medium">{entry?.name || 'Supporter Name'}</p>
                  <p className="text-xs text-soft">{entry?.role || 'Role'}</p>
                </div>
              </div>
            </article>
          )
        })}
      </div>
    </section>
  )
}
