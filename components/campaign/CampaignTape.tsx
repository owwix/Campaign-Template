import type { CSSProperties } from 'react'

type CampaignTapeData = {
  enabled?: boolean
  tapeText?: string
  repeatedText?: string
  themeVariant?: 'brand' | 'dark' | 'light' | 'custom'
  backgroundColor?: string
  textColor?: string
  speed?: number
  angle?: number
  linkHref?: string
  linkLabel?: string
  topSpacing?: number
  bottomSpacing?: number
}

type CampaignTapeProps = {
  tape?: CampaignTapeData
}

const TAPE_VARIANTS: Record<NonNullable<CampaignTapeData['themeVariant']>, { background: string; text: string }> = {
  brand: { background: '#255DF1', text: '#FFFFFF' },
  dark: { background: '#0F172A', text: '#E2E8F0' },
  light: { background: '#DDEBFF', text: '#1E3A8A' },
  custom: { background: '#255DF1', text: '#FFFFFF' },
}

const clamp = (value: number, min: number, max: number): number => Math.min(Math.max(value, min), max)

export default function CampaignTape({ tape }: CampaignTapeProps) {
  if (tape?.enabled === false) return null

  const tapeText = (tape?.tapeText || 'VOTE PABLO GONZALES FOR VICE PRESIDENT').trim()
  if (!tapeText) return null

  const repeatedText = (tape?.repeatedText || '').trim()
  const visiblePhrase = repeatedText || `${tapeText} •`
  const variant = tape?.themeVariant || 'brand'
  const preset = TAPE_VARIANTS[variant]

  const background = variant === 'custom' ? tape?.backgroundColor || preset.background : preset.background
  const text = variant === 'custom' ? tape?.textColor || preset.text : preset.text
  const speed = clamp(Number(tape?.speed ?? 26), 8, 90)
  const angle = clamp(Number(tape?.angle ?? -2), -10, 10)
  const topSpacing = clamp(Number(tape?.topSpacing ?? 8), 0, 120)
  const bottomSpacing = clamp(Number(tape?.bottomSpacing ?? 22), 0, 120)
  const linkHref = (tape?.linkHref || '').trim()
  const linkLabel = (tape?.linkLabel || 'Learn more about this campaign').trim()

  const style = {
    ['--tape-bg' as string]: background,
    ['--tape-text' as string]: text,
    ['--tape-speed' as string]: `${speed}s`,
    ['--tape-angle' as string]: `${angle}deg`,
    ['--tape-top' as string]: `${topSpacing}px`,
    ['--tape-bottom' as string]: `${bottomSpacing}px`,
  } as CSSProperties

  const phrases = Array.from({ length: 8 }, (_, index) => (
    <span className="campaign-tape__phrase" key={index}>
      {visiblePhrase}
    </span>
  ))

  const content = (
    <>
      <div aria-hidden="true" className="campaign-tape__track">
        <div className="campaign-tape__group">{phrases}</div>
        <div className="campaign-tape__group">{phrases}</div>
      </div>
      <span className="sr-only">{tapeText}</span>
    </>
  )

  return (
    <section aria-label="Campaign message tape" className="campaign-tape" style={style}>
      <div className="campaign-tape__slant">
        {linkHref ? (
          <a aria-label={linkLabel} className="campaign-tape__surface campaign-tape__surface--link" href={linkHref}>
            {content}
          </a>
        ) : (
          <div className="campaign-tape__surface">{content}</div>
        )}
      </div>
    </section>
  )
}
