/**
 * ACM NMIET Motion Tokens
 * Cinematic camera movement, student walk cycle transitions, smooth scroll interpolation
 */

export const motion = {
  easings: {
    smoothGlide: 'power3.out',
    cinematic: 'power4.inOut',
    inkDraw: 'power2.inOut',
    architectural: 'cubic-bezier(0.19, 1, 0.22, 1)',
  },
  durations: {
    instant: 0.2,
    fast: 0.35,
    normal: 0.6,
    slow: 1.0,
    cinematic: 1.8,
  },
  scroll: {
    lerpFactor: 0.08, // Smooth damping factor for 60fps tracking
    maxScrollOffset: 1200, // Normalized distance for hero journey
  },
} as const
