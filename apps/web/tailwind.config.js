/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Apple-inspired palette
        'gallery-white': '#ffffff',
        'studio-mist': '#f5f5f7',
        'paper-frost': '#fafafc',
        'hairline-silver': '#d6d6d6',
        'control-gray': '#e6e6e8',
        'ink': '#1d1d1f',
        'slate': '#707070',
        'steel': '#86868b',
        'apple-blue': '#0066cc',
        'pricing-blue': '#0071e3',
        'launch-orange': '#b64400',

        // Brother Jimi accent (choose one)
        'accent': '#d4af37', // Deep Gold
        // 'accent': '#6b8e6f', // Deep Sage
        // 'accent': '#800020', // Deep Burgundy
      },

      fontFamily: {
        'sf-pro-display': [
          'SF Pro Display',
          'ui-sans-serif',
          'system-ui',
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          'Roboto',
          'sans-serif'
        ],
        'sf-pro-text': [
          'SF Pro Text',
          'ui-sans-serif',
          'system-ui',
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          'Roboto',
          'sans-serif'
        ],
        'serif': [
          'Fraunces',
          'Georgia',
          'serif'
        ],
        'sans': [
          'Inter',
          'ui-sans-serif',
          'system-ui',
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          'Roboto',
          'sans-serif'
        ],
      },

      fontSize: {
        'global-nav': ['12px', { lineHeight: '1', letterSpacing: '-0.12px' }],
        'compact-control': ['12px', { lineHeight: '1.33', letterSpacing: '-0.12px' }],
        'body-small': ['14px', { lineHeight: '1.29', letterSpacing: '-0.224px' }],
        'body': ['17px', { lineHeight: '1.47', letterSpacing: '-0.374px' }],
        'feature-copy': ['17px', { lineHeight: '1.24', letterSpacing: '-0.374px' }],
        'product-nav-title': ['19px', { lineHeight: '1.21', letterSpacing: '0.228px' }],
        'product-kicker': ['21px', { lineHeight: '1', letterSpacing: '0.231px' }],
        'feature-heading': ['40px', { lineHeight: '1', letterSpacing: '0px' }],
        'hero-display': ['80px', { lineHeight: '1.05', letterSpacing: '-1.2px' }],
      },

      spacing: {
        '4': '4px',
        '8': '8px',
        '12': '12px',
        '16': '16px',
        '20': '20px',
        '24': '24px',
        '28': '28px',
        '32': '32px',
        '40': '40px',
        '48': '48px',
        '52': '52px',
        '64': '64px',
        '76': '76px',
        '80': '80px',
        '128': '128px',
        '144': '144px',
      },

      borderRadius: {
        'sm': '4px',
        'md': '10px',
        'lg': '20px',
        'xl': '28px',
        '2xl': '32px',
        '3xl': '36px',
        'full': '120px',
        'pill': '9999px',
      },

      boxShadow: {
        'none': 'none',
        'subtle': 'rgb(230, 230, 232) 0px 0px 0px 1px',
        'subtle-2': 'rgb(134, 134, 139) 0px 0px 0px 1px',
      },

      gap: {
        'section': '90px',
        'element': '20px',
      },

      padding: {
        'card': '28px',
      },
    },
  },
  plugins: [],
}