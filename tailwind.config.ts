import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Hero / dark surfaces
        'dark':        '#111810',
        'dark-alt':    '#0a0f0c',
        'beige':       '#f0ede8',
        'beige-dim':   '#e8e5e0',
        'chartreuse':  '#8dc83c',
        'amber':       '#ba7517',
        'amber-bright':'#d4891e',
        // Legacy teal (hero canvas only)
        'teal':        '#0f6e56',
        'teal-bright': '#13896a',
        // Light sections palette
        'off-white':   '#F5F2EC',
        'ink':         '#1A1A18',
        'ink-mid':     '#6b6a65',
        'forest':      '#1A6B3C',
        // Legacy tokens still referenced in light sections
        'near-black':  '#111110',
        'mid-gray':    '#555550',
      },
      fontFamily: {
        sans:    ['var(--font-inter)',         'Helvetica Neue', 'Arial', 'sans-serif'],
        display: ['var(--font-space-grotesk)', 'Helvetica Neue', 'Arial', 'sans-serif'],
        mono:    ['var(--font-inter)',         'Arial',          'sans-serif'],
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
