'use client'

import { FormEvent, useState } from 'react'
import type { CampaignData } from '../../lib/cms'

type CampaignContactProps = {
  contact: CampaignData['contact']
}

export default function CampaignContact({ contact }: CampaignContactProps) {
  const [submitState, setSubmitState] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  const [submitError, setSubmitError] = useState('')

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const form = event.currentTarget
    const formData = new FormData(form)
    const fullName = String(formData.get('name') || '').trim()
    const email = String(formData.get('email') || '').trim()
    const interest = String(formData.get('interest') || '').trim()

    if (!fullName || !email || !interest) {
      setSubmitError('Please complete all required fields.')
      setSubmitState('error')
      return
    }

    setSubmitError('')
    setSubmitState('submitting')

    try {
      const sourcePath = typeof window !== 'undefined' ? window.location.pathname : '/'
      const res = await fetch('/api/volunteer-submissions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fullName,
          email,
          interest,
          sourcePath,
        }),
      })

      if (!res.ok) {
        const payload = await res.json().catch(() => null)
        const message =
          payload?.errors?.[0]?.message ||
          payload?.message ||
          'Unable to submit right now. Please try again in a moment.'
        throw new Error(message)
      }

      form.reset()
      setSubmitState('success')
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : 'Unable to submit right now. Please try again.')
      setSubmitState('error')
    }
  }

  return (
    <section className="section" id="contact">
      <p className="eyebrow" />
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
            How can I help you?
          </label>
          <textarea
            className="min-h-28 w-full rounded-lg border border-line bg-white px-3 py-2 text-sm outline-none transition focus:border-[color:var(--accent)]"
            id="interest"
            name="interest"
            placeholder="Outreach, events, class representative network, digital support..."
            required
          />

          <button className="button-primary w-full disabled:cursor-not-allowed disabled:opacity-70" disabled={submitState === 'submitting'} type="submit">
            {submitState === 'submitting' ? 'Submitting...' : 'Submit Concerns'}
          </button>

          {submitState === 'success' ? (
            <p className="text-sm text-soft">
              Thank you. Your volunteer interest was submitted successfully. You can also email{' '}
              <a className="font-medium text-[color:var(--accent)]" href={`mailto:${contact?.email || ''}`}>
                {contact?.email || 'the campaign team'}
              </a>{' '}
              so the team can follow up directly.
            </p>
          ) : null}

          {submitState === 'error' ? <p className="text-sm text-red-700">{submitError}</p> : null}
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
