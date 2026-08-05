import type { Config } from 'tailwindcss';

// Note: In production with internet access, use:
// import { Fraunces } from 'next/font/google';
// const fraunces = Fraunces({
//   subsets: ['latin'],
//   weight: ['400', '600', '700'],
//   variable: '--font-fraunces',
//   display: 'swap',
// });

// Fallback for offline environments: using Garamond (premium serif alternative)
const frauncesFontClass = 'fraunces-fallback';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Premium ministry brand palette
        'rc-bg': '#FAFAF7', // Ultra-refined off-white (luxury paper)
        'rc-text': '#1A1A18', // Premium deep charcoal
        'rc-text-secondary': '#8A8A80', // Sophisticated muted gray
        'rc-text-tertiary': '#A8A8A0', // Lighter secondary text
        'rc-accent': '#0D5E57', // Refined deep teal (restoration)
        'rc-accent-light': '#1B7A6F', // Medium teal for hover states
        'rc-gold': '#C9925A', // Refined warm gold (grace, humanity)
        'rc-gold-light': '#E5D5C0', // Soft gold for accents
        'rc-warm-gray': '#EBE7E0', // Refined warm gray
        'rc-border': '#E0D9D0', // Premium border color
        // Testimony aesthetic palette (transformation proof)
        'testimony-dark': '#0F0F0F', // Deep cinematic black
        'testimony-cyan': '#00D9FF', // Bright transformation cyan
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
export { frauncesFontClass };
