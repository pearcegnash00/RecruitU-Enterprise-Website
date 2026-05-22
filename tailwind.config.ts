import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'dark':       '#111810',
        'dark-alt':   '#0a0f0c',
        'beige':      '#f0ede8',
        'beige-dim':  '#e8e5e0',
        'teal':       '#0f6e56',
        'teal-bright':'#13896a',
        'amber':      '#ba7517',
        'amber-bright':'#d4891e',
        'chartreuse': '#8dc83c',
        'near-black': '#111110',
        'mid-gray':   '#555550',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'Helvetica Neue', 'Arial', 'sans-serif'],
        mono: ['var(--font-mono)', 'IBM Plex Mono', 'Courier New', 'monospace'],
      },
      letterSpacing: {
        tightest: '-0.04em',
        tighter:  '-0.025em',
        tight:    '-0.015em',
        mono:     '0.06em',
        wide:     '0.1em',
        widest:   '0.14em',
      },
      maxWidth: {
        content: '1100px',
      },
    },
  },
  plugins: [],
}

export default config
