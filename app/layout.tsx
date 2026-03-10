import type { Metadata } from 'next'
import { IBM_Plex_Mono, Space_Grotesk } from 'next/font/google'
import type { ReactNode } from 'react'
import { siteConfig, siteMetadata } from '../src/utils/siteConfig'
import './globals.css'

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-sans',
})

const plexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  weight: ['400', '500'],
})

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.siteUrl),
  title: siteMetadata.title,
  description: siteMetadata.description,
  alternates: {
    canonical: '/',
  },
  icons: {
    icon: [{ url: '/ao-icon.svg', type: 'image/svg+xml' }],
    shortcut: '/ao-icon.svg',
    apple: '/ao-icon.svg',
  },
  openGraph: {
    title: siteMetadata.title,
    description: siteMetadata.description,
    url: siteConfig.siteUrl,
    siteName: `${siteConfig.organizationName} Campaign`,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: siteMetadata.title,
    description: siteMetadata.description,
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html className={`${spaceGrotesk.variable} ${plexMono.variable}`} lang="en">
      <body>{children}</body>
    </html>
  )
}
