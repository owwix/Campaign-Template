import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: 'var(--ink)',
        soft: 'var(--ink-soft)',
        line: 'var(--line)',
        accent: 'var(--accent)',
        bg: 'var(--bg)',
        surface: 'var(--surface)',
      },
      boxShadow: {
        card: '0 12px 40px -24px rgba(2, 18, 33, 0.45), inset 0 1px 0 rgba(255,255,255,0.08)',
      },
      maxWidth: {
        container: '1120px',
        copy: '72ch',
      },
      fontFamily: {
        sans: ['var(--font-sans)'],
        mono: ['var(--font-mono)'],
      },
    },
  },
  plugins: [],
}

export default config
