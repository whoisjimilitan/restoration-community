import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Burak-inspired premium brand palette (navy + yellow + off-white)
        'rc-bg': '#F5F5F5', // Off-white background (breathing room)
        'rc-text': '#1A1F2E', // Deep navy/charcoal (primary text)
        'rc-text-secondary': '#6B7280', // Muted gray (secondary text)
        'rc-text-tertiary': '#9CA3AF', // Lighter gray (tertiary text)
        'rc-accent': '#FFEB3B', // Bright yellow (primary CTA, identity)
        'rc-accent-dark': '#F9D923', // Darker yellow for hover
        'rc-accent-light': '#FFFACD', // Light yellow for accents
        'rc-navy': '#1A1F2E', // Deep navy (primary)
        'rc-navy-light': '#2D3748', // Lighter navy for backgrounds
        'rc-border': '#E5E7EB', // Subtle borders
        'rc-warm-white': '#FAFAF7', // Warm white for cards
      },
      fontFamily: {
        'rc-serif': ['Georgia', 'Garamond', 'serif'],
        'rc-sans': ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'sans-serif'],
      },
      animation: {
        'fade-rise': 'fade-rise 0.9s ease-out both',
        'fade-rise-delay': 'fade-rise 0.9s ease-out 0.2s both',
        'fade-rise-delay-2': 'fade-rise 0.9s ease-out 0.4s both',
        'fade-rise-delay-3': 'fade-rise 0.9s ease-out 0.6s both',
        'glow-pulse': 'glow-pulse 2.5s ease-in-out infinite',
        'gentle-float': 'gentle-float 6s ease-in-out infinite',
        'float-up': 'float-up 0.8s ease-out forwards',
        'slide-in-left': 'slide-in-left 0.6s ease-out forwards',
      },
      keyframes: {
        'fade-rise': {
          '0%': { opacity: '0', transform: 'translateY(28px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'glow-pulse': {
          '0%, 100%': { boxShadow: '0 0 20px rgba(255, 235, 59, 0.4)' },
          '50%': { boxShadow: '0 0 40px rgba(255, 235, 59, 0.6)' },
        },
        'gentle-float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        'float-up': {
          '0%': { opacity: '0', transform: 'translateY(40px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'slide-in-left': {
          '0%': { opacity: '0', transform: 'translateX(-40px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
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
