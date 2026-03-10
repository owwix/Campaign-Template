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
}

export default function CampaignNav({ candidateName, officeTitle }: CampaignNavProps) {
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
    <header className="sticky top-0 z-40 border-b border-line bg-[color:var(--bg)] backdrop-blur-sm">
      <div className="mx-auto flex w-[min(1120px,92vw)] items-center justify-between gap-4 py-3">
        <a className="min-w-0" href="#hero">
          <p className="truncate text-sm font-semibold tracking-tight">{candidateName || 'Candidate Name'}</p>
          <p className="truncate font-mono text-[10px] uppercase tracking-[0.12em] text-soft">{officeTitle || 'Office Sought'}</p>
        </a>

        <nav aria-label="Section navigation" className="hidden gap-1 md:flex">
          {NAV_ITEMS.map((item) => {
            const isActive = activeSection === item.id
            return (
              <a
                className={`rounded-lg px-3 py-2 text-sm transition ${isActive ? 'bg-white text-ink shadow-sm' : 'text-soft hover:text-ink'}`}
                href={`#${item.id}`}
                key={item.id}
              >
                {item.label}
              </a>
            )
          })}
        </nav>

        <a className="button-primary !px-4 !py-2 !text-xs md:!text-sm" href="#contact">
          Volunteer
        </a>
      </div>
    </header>
  )
}
