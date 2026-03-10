import Link from 'next/link'

type CampaignCTAProps = {
  primaryLabel?: string
  primaryHref?: string
  secondaryLabel?: string
  secondaryHref?: string
}

export default function CampaignCTA({ primaryLabel, primaryHref, secondaryLabel, secondaryHref }: CampaignCTAProps) {
  return (
    <div className="flex flex-wrap gap-3">
      <Link className="button-primary" href={primaryHref || '#contact'}>
        {primaryLabel || 'Get Involved'}
      </Link>
      <Link className="button-secondary" href={secondaryHref || '#platform'}>
        {secondaryLabel || 'Read Platform'}
      </Link>
    </div>
  )
}
