const LOCAL_BASE_URL = `http://127.0.0.1:${process.env.PORT || 3000}`
const BASE_URL = process.env.PAYLOAD_INTERNAL_SERVER_URL || LOCAL_BASE_URL

const normalizeBase = (url: string): string => String(url || '').replace(/\/$/, '')

export type CampaignData = {
  campaignInfo?: {
    candidateName?: string
    officeTitle?: string
    organizationName?: string
    electionDate?: string
    slogan?: string
  }
  hero?: {
    heroBadge?: string
    heroHeadline?: string
    heroSubheadline?: string
    heroImage?: MediaField
    heroStats?: Array<{ label?: string; value?: string }>
  }
  about?: {
    aboutTitle?: string
    aboutBody?: string
    bioHighlights?: Array<{ label?: string; value?: string }>
  }
  platform?: {
    platformItems?: Array<{ icon?: string; title?: string; description?: string }>
  }
  vision?: {
    visionTitle?: string
    visionBody?: string
    platformPdf?: MediaField
  }
  endorsements?: Array<{
    quote?: string
    name?: string
    role?: string
    image?: MediaField
  }>
  events?: Array<{
    title?: string
    date?: string
    time?: string
    location?: string
    description?: string
    cta?: string
  }>
  faq?: {
    faqItems?: Array<{ question?: string; answer?: string }>
  }
  contact?: {
    contactTitle?: string
    contactBody?: string
    email?: string
    socials?: Array<{ label?: string; url?: string }>
  }
  campaignCta?: {
    label?: string
    href?: string
    secondaryLabel?: string
    secondaryHref?: string
  }
  announcement?: {
    enabled?: boolean
    text?: string
  }
  footerText?: string
  seo?: {
    metaTitle?: string
    metaDescription?: string
    ogImage?: MediaField
  }
  theme?: {
    accentColor?: string
    showSectionGradients?: boolean
  }
}

export type MediaField =
  | string
  | {
      url?: string
      alt?: string
      filename?: string
      sizes?: {
        card?: { url?: string }
        og?: { url?: string }
      }
    }

function toMediaUrl(media?: MediaField): string {
  if (!media || typeof media === 'string') return ''
  return media.url || media.sizes?.card?.url || media.sizes?.og?.url || ''
}

function toMediaAlt(media?: MediaField, fallback = ''): string {
  if (!media || typeof media === 'string') return fallback
  return media.alt || fallback
}

export function resolveMedia(media?: MediaField, fallbackAlt = ''): { src: string; alt: string } {
  return {
    src: toMediaUrl(media),
    alt: toMediaAlt(media, fallbackAlt),
  }
}

type FetchOptions = {
  timeoutMs?: number
} & RequestInit

async function fetchCMS<T = unknown>(path: string, options: FetchOptions = {}): Promise<T> {
  const { timeoutMs = 8000, ...rest } = options
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), timeoutMs)

  const res = await fetch(`${normalizeBase(BASE_URL)}${path}`, {
    cache: 'no-store',
    signal: controller.signal,
    ...rest,
  }).finally(() => {
    clearTimeout(timer)
  })

  if (!res.ok) {
    throw new Error(`CMS request failed (${res.status}): ${path}`)
  }

  return res.json() as Promise<T>
}

export async function fetchCampaignPage<T = CampaignData>(): Promise<T> {
  return fetchCMS<T>('/api/globals/campaign-page?depth=2')
}
