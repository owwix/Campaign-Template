type CampaignFooterProps = {
  footerText?: string
  candidateName?: string
}

export default function CampaignFooter({ footerText, candidateName }: CampaignFooterProps) {
  const year = new Date().getFullYear()

  return (
    <footer className="mt-8 border-t border-line py-6">
      <div className="mx-auto flex w-[min(1120px,92vw)] flex-col gap-2 text-sm text-soft md:flex-row md:items-center md:justify-between">
        <p>{footerText || 'Campaign footer text managed in Payload CMS.'}</p>
        <p>
          &copy; {year} {candidateName || 'Campaign'}
        </p>
      </div>
    </footer>
  )
}
