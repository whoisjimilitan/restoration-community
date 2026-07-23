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
      },
      fontFamily: {
        'rc-serif': ['Georgia', 'Garamond', 'serif'],
        'rc-sans': ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

export default config;
