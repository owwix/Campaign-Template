type CampaignNavProps = {
  candidateName?: string
  officeTitle?: string
  organizationName?: string
  header?: {
    message?: string
    ctaLabel?: string
    ctaHref?: string
  }
}

const applyHeaderTokens = (template: string, values: { candidateName: string; officeTitle: string; organizationName: string }) => {
  const firstName = values.candidateName.trim().split(/\s+/)[0] || values.candidateName
  return template
    .replaceAll('{{candidateName}}', values.candidateName)
    .replaceAll('{{firstName}}', firstName)
    .replaceAll('{{officeTitle}}', values.officeTitle)
    .replaceAll('{{organizationName}}', values.organizationName)
}

export default function CampaignNav({ candidateName, officeTitle, organizationName, header }: CampaignNavProps) {
  const tokenValues = {
    candidateName: candidateName || 'Pablo Gonzales',
    officeTitle: officeTitle || 'Law School President',
    organizationName: organizationName || 'Blackstone Law Society',
  }
  const rawMessage = applyHeaderTokens(header?.message || 'VOTE {{candidateName}} FOR PRESIDENT', tokenValues)
  const primaryMessage = rawMessage.replace(/VICE\s+PRESIDENT/gi, 'PRESIDENT')

  return (
    <header className="sticky top-0 z-40 border-b border-line/70 bg-[color:var(--bg)]/88 backdrop-blur-xl">
      <div className="mx-auto w-[min(1120px,92vw)] py-3 md:py-4">
        <div className="mx-auto w-full max-w-[760px]">
          <div className="group relative overflow-hidden rounded-[1.15rem] border border-[#2b4f93]/78 bg-gradient-to-r from-[#0f2348] via-[#17386d] to-[#1f4a93] shadow-[0_24px_56px_-22px_rgba(10,28,64,0.92)] ring-1 ring-white/20 outline outline-1 outline-[#07152e]/52 outline-offset-[2px]">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 bg-[radial-gradient(70%_200%_at_0%_0%,rgba(255,255,255,0.24),transparent_60%),linear-gradient(110deg,rgba(255,255,255,0.06)_0%,rgba(255,255,255,0.02)_55%,rgba(6,14,35,0.26)_100%)]"
            />
            <div className="relative flex items-center justify-center gap-2 border-b border-white/16 px-4 py-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-sky-100/80" />
              <p className="font-mono text-[10px] font-medium uppercase tracking-[0.2em] text-sky-100/92">
                Campaign Message
              </p>
              <span className="h-1.5 w-1.5 rounded-full bg-sky-100/80" />
            </div>
            <div className="relative px-4 py-3 text-center md:px-7 md:py-3.5">
              <p className="text-sm font-semibold tracking-[0.028em] text-white md:text-[1.06rem] md:tracking-[0.04em]">
                {primaryMessage}
              </p>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
