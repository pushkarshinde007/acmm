import React from 'react'

interface AboutGlobeProps {
  progress: number
  prefersReducedMotion: boolean
}

export const AboutGlobe: React.FC<AboutGlobeProps> = ({ progress, prefersReducedMotion }) => {
  // Digital globe in atrium glass pavilion:
  // Becomes visible as atrium opens (progress > 0.40)
  const opacity = Math.min(Math.max((progress - 0.35) / 0.3, 0), 1)

  return (
    <div
      className="absolute pointer-events-none select-none transition-opacity duration-700 ease-out z-10"
      style={{
        left: '50%',
        top: '52%',
        transform: 'translate(-50%, -50%)',
        opacity,
      }}
    >
      {/* Subtle Blue Digital Computational Globe */}
      <div className="relative w-36 h-36 sm:w-48 sm:h-48 md:w-56 md:h-56 flex items-center justify-center">
        {/* Soft Blue Atmospheric Glow behind globe (subtle, non-neon) */}
        <div className="absolute inset-0 rounded-full bg-[#1457A6]/15 blur-xl pointer-events-none" />

        {/* Rotating SVG Computational Wireframe Sphere */}
        <svg
          viewBox="0 0 200 200"
          className={`w-full h-full opacity-80 ${
            prefersReducedMotion ? '' : 'animate-[spin_40s_linear_infinite]'
          }`}
          fill="none"
        >
          {/* Outer circle boundary */}
          <circle cx="100" cy="100" r="88" stroke="#1457A6" strokeWidth="1.2" strokeOpacity="0.5" />

          {/* Latitude Arcs */}
          <ellipse cx="100" cy="100" rx="88" ry="24" stroke="#38B6FF" strokeWidth="0.9" strokeOpacity="0.45" />
          <ellipse cx="100" cy="100" rx="88" ry="54" stroke="#2D75C9" strokeWidth="0.8" strokeOpacity="0.35" />
          <ellipse cx="100" cy="65" rx="72" ry="18" stroke="#69BCE8" strokeWidth="0.7" strokeOpacity="0.3" />
          <ellipse cx="100" cy="135" rx="72" ry="18" stroke="#69BCE8" strokeWidth="0.7" strokeOpacity="0.3" />

          {/* Longitude Arcs */}
          <ellipse cx="100" cy="100" rx="28" ry="88" stroke="#38B6FF" strokeWidth="0.9" strokeOpacity="0.4" />
          <ellipse cx="100" cy="100" rx="60" ry="88" stroke="#2D75C9" strokeWidth="0.8" strokeOpacity="0.35" />
          <line x1="100" y1="12" x2="100" y2="188" stroke="#1457A6" strokeWidth="1" strokeOpacity="0.4" />
          <line x1="12" y1="100" x2="188" y2="100" stroke="#1457A6" strokeWidth="1" strokeOpacity="0.4" />

          {/* Data Points / Node Clusters */}
          <circle cx="100" cy="100" r="2.5" fill="#38B6FF" />
          <circle cx="70" cy="80" r="2" fill="#69BCE8" />
          <circle cx="130" cy="120" r="2" fill="#69BCE8" />
          <circle cx="120" cy="65" r="1.8" fill="#38B6FF" />
          <circle cx="85" cy="135" r="1.8" fill="#2D75C9" />
          <circle cx="50" cy="110" r="1.5" fill="#38B6FF" />
          <circle cx="150" cy="90" r="1.5" fill="#69BCE8" />
        </svg>

        {/* Inner Counter-Rotating Core Ring */}
        <div
          className={`absolute w-3/4 h-3/4 rounded-full border border-[#69BCE8]/25 border-dashed ${
            prefersReducedMotion ? '' : 'animate-[spin_25s_linear_infinite_reverse]'
          }`}
        />
      </div>
    </div>
  )
}
