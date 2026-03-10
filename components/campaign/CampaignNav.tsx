'use client'

import { useEffect, useMemo, useState } from 'react'

const NAV_ITEMS = [
  { id: 'hero', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'platform', label: 'Platform' },
  { id: 'vision', label: 'Vision' },
  { id: 'endorsements', label: 'Endorsements' },
  { id: 'events', label: 'Events' },
  { id: 'faq', label: 'FAQ' },
  { id: 'contact', label: 'Get Involved' },
]

type CampaignNavProps = {
  candidateName?: string
  officeTitle?: string
  organizationName?: string
}

export default function CampaignNav({ candidateName, officeTitle, organizationName }: CampaignNavProps) {
  const [activeSection, setActiveSection] = useState<string>('hero')

  const ids = useMemo(() => NAV_ITEMS.map((item) => item.id), [])

  useEffect(() => {
    const elements = ids.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[]
    if (!elements.length) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)

        if (visible[0]?.target?.id) {
          setActiveSection(visible[0].target.id)
        }
      },
      {
        rootMargin: '-35% 0px -55% 0px',
        threshold: [0.1, 0.3, 0.6],
      },
    )

    elements.forEach((element) => observer.observe(element))
    return () => observer.disconnect()
  }, [ids])

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-[color:var(--bg)] backdrop-blur-md">
      <div className="mx-auto w-[min(1120px,92vw)] py-3.5 md:py-4">
        <div className="flex items-center justify-between gap-4">
          <a className="min-w-0 rounded-lg px-1 py-1 transition hover:bg-white/40" href="#hero">
            <p className="truncate text-[0.95rem] font-semibold tracking-tight md:text-base">{candidateName || 'Candidate Name'}</p>
            <p className="truncate font-mono text-[10px] uppercase tracking-[0.12em] text-soft">
              {officeTitle || 'Office Sought'}
            </p>
            <p className="truncate text-[11px] text-soft">{organizationName || 'McGeorge School of Law'}</p>
          </a>

          <nav aria-label="Section navigation" className="hidden items-center gap-1 rounded-xl border border-line bg-white/60 p-1.5 md:flex">
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.id
              return (
                <a
                  className={`rounded-lg px-3.5 py-2 text-sm font-medium transition ${
                    isActive
                      ? 'bg-[color:var(--brand-primary-soft)] text-[color:var(--brand-primary)] shadow-sm'
                      : 'text-soft hover:bg-white hover:text-ink'
                  }`}
                  href={`#${item.id}`}
                  key={item.id}
                >
                  {item.label}
                </a>
              )
            })}
          </nav>

          <a className="button-primary !px-4 !py-2 !text-xs md:!px-5 md:!py-2.5 md:!text-sm" href="#contact">
            Volunteer
          </a>
        </div>

        <nav aria-label="Mobile section navigation" className="mt-3 flex gap-2 overflow-x-auto pb-0.5 md:hidden">
          {NAV_ITEMS.map((item) => {
            const isActive = activeSection === item.id
            return (
              <a
                className={`shrink-0 rounded-lg border px-3 py-1.5 text-xs font-medium transition ${
                  isActive
                    ? 'border-[color:var(--brand-primary)] bg-[color:var(--brand-primary-soft)] text-[color:var(--brand-primary)]'
                    : 'border-line bg-white/70 text-soft'
                }`}
                href={`#${item.id}`}
                key={`mobile-${item.id}`}
              >
                {item.label}
              </a>
            )
          })}
        </nav>
      </div>
    </header>
  )
}
