const normalizeUrl = (value?: string): string => {
  if (!value) return 'https://example.edu'
  return value.replace(/\/$/, '')
}

const env: Record<string, string | undefined> = typeof process !== 'undefined' ? process.env : {}

const createMonogram = (value: string): string => {
  const words = String(value || '')
    .trim()
    .split(/\s+/)
    .filter(Boolean)

  if (!words.length) return 'CM'
  if (words.length === 1) return words[0].slice(0, 2).toUpperCase()
  return `${words[0][0] || ''}${words[1][0] || ''}`.toUpperCase()
}

export const siteConfig = {
  siteUrl: normalizeUrl(env.SITE_URL || env.NEXT_PUBLIC_SITE_URL || env.PAYLOAD_PUBLIC_SERVER_URL),
  organizationName: env.SITE_ORGANIZATION_NAME || env.NEXT_PUBLIC_SITE_ORGANIZATION_NAME || 'Law Student Association',
  cmsTitle: env.CMS_TITLE || env.NEXT_PUBLIC_CMS_TITLE || 'Campaign CMS',
  cmsSubtitle: env.CMS_SUBTITLE || env.NEXT_PUBLIC_CMS_SUBTITLE || 'Election Content Control Center',
  cmsMonogram:
    env.CMS_MONOGRAM ||
    env.NEXT_PUBLIC_CMS_MONOGRAM ||
    createMonogram(env.SITE_ORGANIZATION_NAME || env.NEXT_PUBLIC_SITE_ORGANIZATION_NAME || 'Campaign CMS'),
}

export const siteMetadata = {
  title: 'Law School Campaign',
  description:
    'Professional election campaign website template for law school candidates, powered by Payload CMS and Next.js.',
}
