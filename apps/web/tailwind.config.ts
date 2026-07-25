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
        // Ministry brand colors per specification
        'rc-bg': '#F8F6F2', // Warm off-white background
        'rc-text': '#202124', // Very dark charcoal for primary text
        'rc-text-secondary': '#8B8680', // Muted warm grey
        'rc-accent': '#0F766E', // Deep restorative teal
        'rc-gold': '#D4A574', // Warm gold - grace, warmth, humanity
        'rc-gold-light': '#E8DCC8', // Light gold for accents
        'rc-warm-gray': '#E8E3DC', // Warm gray for subtle contrast
      },
      fontFamily: {
        'rc-serif': ['Georgia', 'Garamond', 'serif'],
        'rc-sans': ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      animation: {
        'subtle-pulse': 'subtle-pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'gentle-float': 'gentle-float 6s ease-in-out infinite',
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
      },
    },
  },
  plugins: [],
};

export default config;
