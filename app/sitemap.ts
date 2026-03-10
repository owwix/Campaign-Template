import type { MetadataRoute } from 'next'
import { siteConfig } from '../src/utils/siteConfig'

function toAbsolute(path: string): string {
  if (path.startsWith('http://') || path.startsWith('https://')) return path
  return `${siteConfig.siteUrl}${path}`
}

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: toAbsolute('/'),
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
  ]
}
