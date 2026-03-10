'use client'

import { FormEvent, useState } from 'react'
import type { CampaignData } from '../../lib/cms'

type CampaignContactProps = {
  contact: CampaignData['contact']
}

export default function CampaignContact({ contact }: CampaignContactProps) {
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setSubmitted(true)
  }

  return (
    <section className="section" id="contact">
      <p className="eyebrow">Get Involved</p>
      <h2 className="section-title mt-3">{contact?.contactTitle || 'Get Involved'}</h2>
      <p className="section-subtitle">{contact?.contactBody || 'Volunteer, share ideas, and support the campaign.'}</p>

      <div className="mt-6 grid gap-5 lg:grid-cols-[1fr_0.9fr]">
        <form className="card space-y-3" onSubmit={handleSubmit}>
          <label className="block text-sm font-medium" htmlFor="name">
            Full name
          </label>
          <input
            className="w-full rounded-lg border border-line bg-white px-3 py-2 text-sm outline-none transition focus:border-[color:var(--accent)]"
            id="name"
            name="name"
            required
            type="text"
          />

          <label className="block text-sm font-medium" htmlFor="email">
            Email
          </label>
          <input
            className="w-full rounded-lg border border-line bg-white px-3 py-2 text-sm outline-none transition focus:border-[color:var(--accent)]"
            id="email"
            name="email"
            required
            type="email"
          />

          <label className="block text-sm font-medium" htmlFor="interest">
            How would you like to help?
          </label>
          <textarea
            className="min-h-28 w-full rounded-lg border border-line bg-white px-3 py-2 text-sm outline-none transition focus:border-[color:var(--accent)]"
            id="interest"
            name="interest"
            placeholder="Outreach, events, class representative network, digital support..."
            required
          />

          <button className="button-primary w-full" type="submit">
            Submit Volunteer Interest
          </button>

          {submitted ? (
            <p className="text-sm text-soft">
              Thank you. Please email{' '}
              <a className="font-medium text-[color:var(--accent)]" href={`mailto:${contact?.email || ''}`}>
                {contact?.email || 'the campaign team'}
              </a>{' '}
              so the team can follow up directly.
            </p>
          ) : null}
        </form>

        <aside className="card space-y-4">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-soft">Campaign Email</p>
            <a className="mt-1 block text-sm font-medium hover:text-[color:var(--accent)]" href={`mailto:${contact?.email || ''}`}>
              {contact?.email || 'campaign@lawschool.edu'}
            </a>
          </div>

          {contact?.socials?.length ? (
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-soft">Social Channels</p>
              <div className="mt-2 space-y-2">
                {contact.socials.map((social, index) => (
                  <a
                    className="block text-sm hover:text-[color:var(--accent)]"
                    href={social?.url || '#'}
                    key={`${social?.label}-${index}`}
                    rel="noreferrer"
                    target="_blank"
                  >
                    {social?.label || 'Social'}
                  </a>
                ))}
              </div>
            </div>
          ) : null}
        </aside>
      </div>
    </section>
  )
}
