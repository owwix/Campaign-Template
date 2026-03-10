type CampaignFooterProps = {
  footerText?: string
  footerCopyright?: string
  candidateName?: string
}

function renderFooterText(template: string, year: number, candidateName: string): string {
  return String(template || '')
    .replace(/\{\{\s*year\s*\}\}/gi, String(year))
    .replace(/\{\{\s*candidateName\s*\}\}/gi, candidateName)
}

export default function CampaignFooter({ footerText, footerCopyright, candidateName }: CampaignFooterProps) {
  const year = new Date().getFullYear()
  const safeCandidateName = candidateName || 'Campaign'
  const rightText = renderFooterText(footerCopyright || '© {{year}} {{candidateName}}', year, safeCandidateName)

  return (
    <footer className="mt-8 border-t border-line py-6">
      <div className="mx-auto flex w-[min(1120px,92vw)] flex-col gap-2 text-sm text-soft md:flex-row md:items-center md:justify-between">
        <p>{footerText || 'Campaign footer text managed in Payload CMS.'}</p>
        <p>{rightText}</p>
      </div>
    </footer>
  )
}
