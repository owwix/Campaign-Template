import type { CampaignData } from '../../lib/cms'

type CampaignEventsProps = {
  events: CampaignData['events']
}

function formatEventDate(value?: string): string {
  if (!value) return 'Date TBA'
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return 'Date TBA'

  return date.toLocaleDateString(undefined, {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'UTC',
  })
}

export default function CampaignEvents({ events }: CampaignEventsProps) {
  return (
    <section className="section" id="events">
      <p className="eyebrow">Events</p>
      <h2 className="section-title mt-3">Campaign Timeline</h2>

      <div className="mt-6 space-y-4">
        {(events || []).map((event, index) => (
          <article className="card" key={`${event?.title}-${index}`}>
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <h3 className="text-lg font-medium">{event?.title || 'Campaign Event'}</h3>
                <p className="mt-1 text-sm text-soft">{formatEventDate(event?.date)}</p>
              </div>
              <span className="rounded-full border border-line px-3 py-1 text-xs text-soft">{event?.time || 'Time TBA'}</span>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-soft">{event?.description || 'Event details here.'}</p>
            <p className="mt-3 text-sm">
              <strong className="font-medium">Location:</strong> {event?.location || 'Location TBA'}
            </p>
            {event?.cta ? <p className="mt-3 text-sm font-medium text-[color:var(--accent)]">{event.cta}</p> : null}
          </article>
        ))}
      </div>
    </section>
  )
}
