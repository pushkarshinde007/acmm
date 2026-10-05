/**
 * ACM NMIET Color Tokens — Exact Phase 1 Specification
 * Dominant visual relationship: Blue + Warm Ivory
 * NO cyber neons, NO pure black UI, NO purple/magenta gradients.
 */

export const colors = {
  // Primary Dark Blue Tones
  deepNavy: '#071B34',
  navyBlue: '#0B2D55',
  cobalt: '#1457A6',
  architecturalBlue: '#2D75C9',
  skyBlue: '#69BCE8',
  lightBlue: '#B9DDF2',

  // Light Ivory & Paper Tones
  warmIvory: '#F5F0E6',
  paperCream: '#FAF7EF',
  pureWhite: '#FFFFFF',

  // Supporting Neutrals & Text
  mutedBlueGray: '#536273',
  darkText: '#102033',

  // Semantic mappings
  text: {
    primary: '#102033',
    secondary: '#536273',
    accent: '#1457A6',
    inverse: '#FAF7EF',
  },
  surface: {
    paper: '#FAF7EF',
    ivory: '#F5F0E6',
    card: 'rgba(250, 247, 239, 0.88)',
    overlay: 'rgba(7, 27, 52, 0.4)',
    border: 'rgba(7, 27, 52, 0.12)',
    borderActive: 'rgba(20, 87, 166, 0.35)',
  },
} as const

export type ColorTokens = typeof colors
