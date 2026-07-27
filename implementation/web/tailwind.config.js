/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // Semantic color palette based on governance
        'rc-teal': '#0F766E',
        'rc-teal-dark': '#0a5c59',
        'rc-charcoal': '#202124',
        'rc-warm-gray': '#8B8680',
        'rc-medium-gray': '#555555',
        'rc-cream': '#F5F3F0',
        'rc-cream-light': '#FAFAF9',
        'rc-beige': '#F9F8F7',
        'rc-border': '#E8E6E1',
      },
      fontFamily: {
        serif: ['Georgia', 'Garamond', 'serif'],
        sans: [
          'system-ui',
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          'sans-serif',
        ],
      },
      fontSize: {
        // Semantic sizing for typography
        eyebrow: ['0.8125rem', { lineHeight: '1.5', letterSpacing: '0.12em' }],
        'body-lg': ['1.125rem', { lineHeight: '1.7', letterSpacing: '-0.005em' }],
        'body-md': ['1rem', { lineHeight: '1.6', letterSpacing: '-0.005em' }],
        'body-sm': ['0.95rem', { lineHeight: '1.5' }],
        'headline-lg': ['3.5rem', { lineHeight: '1.15', letterSpacing: '-0.02em' }],
        'headline-md': ['2.5rem', { lineHeight: '1.2', letterSpacing: '-0.01em' }],
        'headline-sm': ['2rem', { lineHeight: '1.2', letterSpacing: '-0.01em' }],
        'card-title': ['1.5rem', { lineHeight: '1.3', fontWeight: '700' }],
      },
      spacing: {
        // Semantic spacing
        gutter: '2rem',
        section: '5rem',
      },
      animation: {
        'gentle-float': 'gentle-float 3s ease-in-out infinite',
      },
      keyframes: {
        'gentle-float': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
      },
    },
  },
  plugins: [],
};
