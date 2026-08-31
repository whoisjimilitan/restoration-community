import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Premium ministry brand palette
        'rc-bg': '#FAFAF7', // Ultra-refined off-white (luxury paper)
        'rc-text': '#1A1A18', // Premium deep charcoal (ink color, light-page body text — not a background)
        'rc-canvas': '#0A342D', // Deep teal canvas — the site's dark section background, brand-specific rather than generic black
        'rc-text-secondary': '#8A8A80', // Sophisticated muted gray
        'rc-text-tertiary': '#A8A8A0', // Lighter secondary text
        'rc-accent': '#0D5E57', // Refined deep teal (restoration)
        'rc-accent-light': '#1B7A6F', // Medium teal for hover states
        'rc-gold': '#C9925A', // Refined warm gold (grace, humanity)
        'rc-gold-light': '#E5D5C0', // Soft gold for accents
        'rc-warm-gray': '#EBE7E0', // Refined warm gray
        'rc-border': '#E0D9D0', // Premium border color
        // Testimony aesthetic palette (Samuel's deliverance)
        'testimony-dark': '#0F0F0F', // Deep cinematic black
        'testimony-accent': '#daedfc', // Soft reverent light blue
        'testimony-gold': '#D4A574', // Warm gold-rust accent
      },
      fontFamily: {
        'rc-serif': [
          'var(--font-fraunces)',
          'Georgia',
          'Garamond',
          'serif',
        ],
        'rc-sans': ['system-ui', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'sans-serif'],
      },
      animation: {
        'subtle-pulse': 'subtle-pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'gentle-float': 'gentle-float 6s ease-in-out infinite',
        'fade-in-up': 'fade-in-up 600ms cubic-bezier(0.4, 0, 0.2, 1)',
      },
      keyframes: {
        'subtle-pulse': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.8' },
        },
        'gentle-float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        'fade-in-up': {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      spacing: {
        'section-sm': '64px',
        'section-md': '96px',
        'section-lg': '128px',
      },
    },
  },
  plugins: [],
};

export default config;
