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
    <header className="sticky top-0 z-40 border-b border-line bg-[color:var(--bg)] backdrop-blur-md">
      <div className="mx-auto w-[min(1120px,92vw)] py-3.5 md:py-4">
        <div className="flex justify-center">
          <div className="rounded-2xl border border-[color:var(--brand-primary)]/25 bg-gradient-to-r from-[color:var(--brand-primary)] to-[#3f7cff] px-4 py-3 text-center text-sm font-semibold tracking-[0.08em] text-white shadow-md shadow-blue-300/40 md:px-6 md:py-3.5 md:text-base md:tracking-[0.11em]">
            {primaryMessage}
          </div>
        </div>
      </div>
    </header>
  )
}
