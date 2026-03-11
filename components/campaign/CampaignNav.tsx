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
          <div className="group relative overflow-hidden rounded-[1.15rem] border border-[color:var(--brand-primary)]/30 bg-white/78 shadow-[0_16px_40px_-22px_rgba(37,93,241,0.72)]">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 bg-[radial-gradient(88%_180%_at_0%_0%,rgba(37,93,241,0.22),transparent_62%),linear-gradient(95deg,rgba(37,93,241,0.06)_0%,rgba(63,124,255,0.14)_36%,rgba(255,255,255,0.16)_100%)]"
            />
            <div className="relative flex items-center justify-center gap-2 border-b border-[color:var(--brand-primary)]/12 px-4 py-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-[color:var(--brand-primary)]/65" />
              <p className="font-mono text-[10px] font-medium uppercase tracking-[0.2em] text-[color:var(--brand-primary)]/80">
                Campaign Message
              </p>
              <span className="h-1.5 w-1.5 rounded-full bg-[color:var(--brand-primary)]/65" />
            </div>
            <div className="relative px-4 py-3 text-center md:px-7 md:py-3.5">
              <p className="text-sm font-semibold tracking-[0.02em] text-[#123171] md:text-[1.06rem] md:tracking-[0.035em]">
                {primaryMessage}
              </p>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
