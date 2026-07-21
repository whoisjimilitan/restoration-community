/**
 * Design Tokens for Restoration Community
 *
 * Philosophy: Clarity first, polish second
 * Inspired by: Linear, Stripe, Notion, GitHub
 *
 * Core Principles:
 * 1. Typography excellence - hierarchy, rhythm, legibility
 * 2. Strict spacing scale - everything aligns to 8px base
 * 3. Component consistency - predictable, reliable
 * 4. Subtle interactions - 150-200ms transitions only
 * 5. Clear information hierarchy - what matters is obvious
 * 6. Warm tone - "We're glad you're here" (not "Here's your dashboard")
 */

// ============================================================================
// COLORS
// ============================================================================
// Minimal, meaningful palette. Add colors only when they communicate something.

export const colors = {
  // Neutral foundation - the backbone of clarity
  white: '#FFFFFF',
  black: '#000000',
  gray: {
    50: '#FAFAFA',
    100: '#F3F3F3',
    200: '#ECECEC',
    300: '#D9D9D9',
    400: '#A8A8A8',
    500: '#707070',
    600: '#4A4A4A',
    700: '#2D2D2D',
    800: '#1A1A1A',
    900: '#0F0F0F',
  },

  // Primary: Teal - restoration, hope, primary actions
  teal: {
    50: '#F0FDFB',
    100: '#DFFAF5',
    200: '#B3F0E8',
    300: '#87E5DA',
    400: '#34D7C5',
    500: '#1AB8A3', // Primary
    600: '#129B88',
    700: '#0D7E70',
    800: '#0A6359',
    900: '#084844',
  },

  // Orange - warm encouragement, secondary CTAs
  orange: {
    50: '#FEF8F0',
    100: '#FCEEE1',
    200: '#F8D8BC',
    300: '#F4C197',
    400: '#F0A86E',
    500: '#E88D3F',
    600: '#D17A2A',
    700: '#B8651E',
    800: '#9E5318',
    900: '#7D4213',
  },

  // Semantic: Only when they have clear meaning
  success: '#10B981',
  warning: '#F59E0B',
  error: '#EF4444',
};

// ============================================================================
// TYPOGRAPHY
// ============================================================================
// System font for speed and native feel. Generous line-height for legibility.

export const typography = {
  fontFamily:
    '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", sans-serif',

  // Scale: Breathing room, clear hierarchy
  // Everything based on generous defaults
  fontSize: {
    xs: '12px',
    sm: '14px',
    base: '16px',
    lg: '18px',
    xl: '20px',
    '2xl': '24px',
    '3xl': '30px',
    '4xl': '36px',
  },

  lineHeight: {
    tight: 1.2, // For headings
    snug: 1.375, // For subheadings
    normal: 1.5, // For body
    relaxed: 1.625, // For long-form
    loose: 2, // For emphasis
  },

  letterSpacing: {
    tight: '-0.02em',
    normal: '0em',
    wide: '0.02em',
  },

  fontWeight: {
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },
};

// ============================================================================
// SPACING
// ============================================================================
// Strict 8px base unit. Everything aligns to this scale.

export const spacing = {
  0: '0px',
  1: '4px', // Small gaps
  2: '8px', // Default gap
  3: '12px',
  4: '16px', // Default padding
  6: '24px',
  8: '32px',
  12: '48px',
  16: '64px',
};

// ============================================================================
// SHADOWS
// ============================================================================
// Minimal elevation. Shadows only for cards and modals.

export const shadows = {
  none: 'none',
  sm: '0 1px 2px rgba(0, 0, 0, 0.05)',
  md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
  lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
};

// ============================================================================
// BORDER RADIUS
// ============================================================================
// Subtle. 6px is the standard.

export const borderRadius = {
  none: '0px',
  sm: '4px',
  base: '6px',
  md: '8px',
  lg: '12px',
  full: '9999px',
};

// ============================================================================
// TRANSITIONS
// ============================================================================
// Subtle, purposeful. 150-200ms for most things.

export const transitions = {
  fast: '150ms ease-out',
  base: '200ms ease-out',
  slow: '300ms ease-out',
};
