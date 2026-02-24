/**
 * Zoo design tokens.
 *
 * Palette: greens, science-oriented. Aligns with Zoo Labs Foundation brand.
 */

export const colors = {
  // Primary — Zoo green
  primary: '#10B981',
  primaryDark: '#059669',
  primaryLight: '#34D399',

  // Secondary — science / research accent
  secondary: '#6EE7B7',
  accent: '#22D3EE',

  // Surfaces
  bg: '#0A0F0D',
  surface: '#0F1613',
  surfaceAlt: '#1A2421',
  border: '#1F2E29',

  // Text
  fg: '#E8F5E9',
  fgMuted: '#A7C4B4',
  fgSubtle: '#6B8A7A',

  // Status
  success: '#10B981',
  warning: '#F59E0B',
  danger: '#EF4444',
  info: '#22D3EE',
} as const

export const typography = {
  fontFamily: {
    sans: '"Inter", system-ui, -apple-system, sans-serif',
    mono: '"JetBrains Mono", ui-monospace, monospace',
  },
  fontSize: {
    xs: '0.75rem',
    sm: '0.875rem',
    base: '1rem',
    lg: '1.125rem',
    xl: '1.25rem',
    '2xl': '1.5rem',
    '3xl': '1.875rem',
    '4xl': '2.25rem',
  },
} as const

export const spacing = {
  xs: '0.25rem',
  sm: '0.5rem',
  md: '1rem',
  lg: '1.5rem',
  xl: '2rem',
  '2xl': '3rem',
  '3xl': '4rem',
} as const

export const radius = {
  sm: '0.25rem',
  md: '0.5rem',
  lg: '0.75rem',
  xl: '1rem',
  full: '9999px',
} as const
