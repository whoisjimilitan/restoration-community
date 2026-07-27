/**
 * Design Tokens for Brother Jimi - Restoration Community
 * Burak-inspired premium design system with generous spacing
 * Navy + Yellow color identity + space-centric balance
 */

export const colors = {
  // Primary palette (Burak-inspired)
  background: '#F5F5F5', // Off-white (breathing room)
  text: '#1A1F2E', // Deep navy (primary)
  textSecondary: '#6B7280', // Muted gray
  textTertiary: '#9CA3AF', // Light gray

  // Identity colors
  accent: '#FFEB3B', // Bright yellow (CTA, primary accent)
  accentDark: '#F9D923', // Hover state
  accentLight: '#FFFACD', // Accents, highlights

  // Navy palette
  navy: '#1A1F2E', // Primary navy
  navyLight: '#2D3748', // Lighter navy

  // Utility colors
  border: '#E5E7EB', // Subtle borders
  warmWhite: '#FAFAF7', // Card backgrounds

  // Semantic
  success: '#10B981',
  warning: '#F59E0B',
  error: '#EF4444',
  info: '#3B82F6',
};

export const typography = {
  // Font families
  serif: ['Georgia', 'Garamond', 'serif'],
  sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'sans-serif'],

  // Sizes (px)
  sizes: {
    xs: '12px',
    sm: '14px',
    base: '16px',
    lg: '18px',
    xl: '20px',
    '2xl': '24px',
    '3xl': '30px',
    '4xl': '36px',
    '5xl': '48px',
    '6xl': '60px',
    '7xl': '72px',
  },

  // Weights
  weights: {
    light: 300,
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    extrabold: 800,
  },

  // Line heights
  lineHeights: {
    tight: 1.2,
    snug: 1.3,
    normal: 1.5,
    relaxed: 1.6,
    loose: 1.8,
  },
};

export const spacing = {
  // 8px base unit grid
  xs: '4px',
  sm: '8px',
  md: '16px',
  lg: '24px',
  xl: '32px',
  '2xl': '48px',
  '3xl': '64px',
  '4xl': '96px',
  '5xl': '128px',
};

export const borderRadius = {
  none: '0px',
  sm: '4px',
  md: '8px',
  lg: '12px',
  xl: '16px',
  full: '9999px',
};

export const shadows = {
  none: 'none',
  sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  md: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
  lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
  xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
};

export const animations = {
  fadeRiseDuration: '900ms',
  glowPulseDuration: '2500ms',
  standardEasing: 'cubic-bezier(0.4, 0, 0.2, 1)',
};

export const breakpoints = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
};

/**
 * Component-specific tokens
 */
export const components = {
  button: {
    primaryBg: colors.accent,
    primaryText: colors.navy,
    primaryHover: colors.accentDark,
    padding: `${spacing.md} ${spacing.lg}`,
    borderRadius: borderRadius.lg,
    fontSize: typography.sizes.base,
    fontWeight: typography.weights.medium,
  },

  card: {
    bg: colors.warmWhite,
    border: colors.border,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    shadow: shadows.md,
  },

  hero: {
    minHeight: '100vh',
    paddingTop: spacing['3xl'],
    paddingBottom: spacing['2xl'],
  },

  section: {
    paddingVertical: spacing['3xl'],
    maxWidth: '1152px', // 72rem
  },

  text: {
    headingSize: typography.sizes['5xl'],
    headingWeight: typography.weights.bold,
    bodySize: typography.sizes.lg,
    bodyWeight: typography.weights.normal,
  },
};

/**
 * Premium spacing scale (space-centric approach)
 * More generous than standard to create breathing room
 */
export const spacingScale = {
  sectionTop: spacing['3xl'], // 64px
  sectionBottom: spacing['3xl'], // 64px
  elementVertical: spacing.lg, // 24px
  elementHorizontal: spacing.lg, // 24px
  innerPadding: spacing.lg, // 24px
};
