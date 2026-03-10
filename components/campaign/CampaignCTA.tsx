import Link from 'next/link'

type CampaignCTAProps = {
  primaryLabel?: string
  primaryHref?: string
  secondaryLabel?: string
  secondaryHref?: string
}

export default function CampaignCTA({ primaryLabel, primaryHref, secondaryLabel, secondaryHref }: CampaignCTAProps) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center md:flex-nowrap">
      <Link className="button-primary !px-5 !py-2.5 whitespace-nowrap" href={primaryHref || '#contact'}>
        {primaryLabel || 'Get Involved'}
      </Link>
      <Link className="button-secondary !px-5 !py-2.5 whitespace-nowrap" href={secondaryHref || '#platform'}>
        {secondaryLabel || 'Read Platform'}
      </Link>
    </div>
  )
}
