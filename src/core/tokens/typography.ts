/**
 * ACM NMIET Typography Tokens
 * Sora, Manrope, Plus Jakarta Sans, Cinzel
 */

export const typography = {
  fonts: {
    headline: "'Sora', sans-serif",
    display: "'Sora', sans-serif",
    subheading: "'Manrope', sans-serif",
    body: "'Plus Jakarta Sans', sans-serif",
    editorial: "'Cinzel', serif",
  },
  weights: {
    regular: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
    extrabold: '800',
  },
  heroHeadline: {
    fontSize: 'clamp(4rem, 7vw, 7.5rem)',
    fontWeight: '800',
    lineHeight: '0.94',
    letterSpacing: '-0.035em',
  },
  heroEyebrow: {
    fontSize: '0.8125rem',
    fontWeight: '700',
    letterSpacing: '0.14em',
    textTransform: 'uppercase',
  },
  heroSupporting: {
    fontSize: 'clamp(1rem, 1.25vw, 1.1875rem)',
    lineHeight: '1.65',
    maxWidth: '480px',
  },
} as const

export type TypographyTokens = typeof typography
