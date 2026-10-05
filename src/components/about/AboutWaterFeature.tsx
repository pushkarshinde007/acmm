import React from 'react'

interface AboutWaterFeatureProps {
  progress: number
  prefersReducedMotion: boolean
}

export const AboutWaterFeature: React.FC<AboutWaterFeatureProps> = ({
  progress,
  prefersReducedMotion,
}) => {
  // Becomes visible in mid-to-late atrium transition
  const opacity = Math.min(Math.max((progress - 0.4) / 0.35, 0), 0.85)

  return (
    <div
      className="absolute bottom-6 left-[18%] sm:left-[24%] md:left-[28%] w-48 sm:w-64 md:w-80 h-20 sm:h-28 pointer-events-none select-none z-10 transition-opacity duration-700"
      style={{ opacity }}
    >
      {/* Shallow Reflective Pool Surface Shimmer */}
      <div className="relative w-full h-full overflow-hidden rounded-md">
        {/* Subtle Water Reflection Highlight */}
        <div
          className={`absolute inset-0 bg-gradient-to-r from-transparent via-[#69BCE8]/15 to-transparent ${
            prefersReducedMotion ? '' : 'animate-pulse'
          }`}
          style={{ animationDuration: '4s' }}
        />

        {/* Small Waterfall Cascade Effect near amphitheatre edge */}
        <div className="absolute top-0 left-4 w-12 h-8 bg-gradient-to-b from-white/30 to-transparent blur-[1px] opacity-60" />

        {/* Sunlight Caustics Ripple Linework */}
        <svg viewBox="0 0 200 60" className="w-full h-full opacity-35" fill="none">
          <path
            d="M10 20 Q50 14 90 20 T170 20"
            stroke="#B9DDF2"
            strokeWidth="0.8"
            strokeDasharray="6 4"
          />
          <path
            d="M30 35 Q70 28 110 35 T190 35"
            stroke="#69BCE8"
            strokeWidth="0.7"
            strokeDasharray="8 5"
          />
          <path
            d="M20 48 Q60 42 100 48 T180 48"
            stroke="#2D75C9"
            strokeWidth="0.6"
            strokeDasharray="4 4"
          />
        </svg>
      </div>
    </div>
  )
}
