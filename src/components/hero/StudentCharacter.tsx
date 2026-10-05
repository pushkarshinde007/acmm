import React from 'react'

interface StudentCharacterProps {
  scrollProgress: number
  isWalking: boolean
  prefersReducedMotion: boolean
  mouseOffset: { x: number; y: number }
}

export const StudentCharacter: React.FC<StudentCharacterProps> = ({
  scrollProgress,
  isWalking,
  prefersReducedMotion,
  mouseOffset,
}) => {
  // Movement as user scrolls: student steps forward into the campus scene (scaling down slightly for perspective depth and moving up)
  const forwardStep = prefersReducedMotion ? 0 : scrollProgress * 120
  const perspectiveScale = prefersReducedMotion ? 1 : Math.max(1 - scrollProgress * 0.28, 0.72)
  const mouseParallaxX = prefersReducedMotion ? 0 : mouseOffset.x * -8
  const mouseParallaxY = prefersReducedMotion ? 0 : mouseOffset.y * -6

  return (
    <div
      className="hidden md:block absolute z-20 pointer-events-none select-none transition-transform duration-500 ease-out will-change-transform"
      style={{
        left: '58%',
        bottom: '8%',
        transform: `translate3d(calc(-50% + ${mouseParallaxX}px), calc(-${forwardStep}px + ${mouseParallaxY}px), 0) scale(${perspectiveScale})`,
      }}
    >
      {/* Student SVG Character View from Behind */}
      <div className={`relative w-44 h-80 ${isWalking && !prefersReducedMotion ? 'animate-walk' : ''}`}>
        {/* Soft ground contact shadow */}
        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-32 h-6 bg-[#071B34]/25 rounded-full blur-[4px]" />

        <svg viewBox="0 0 160 300" className="w-full h-full drop-shadow-md" fill="none">
          {/* Head / Dark Hair Silhouette from Behind */}
          <ellipse cx="80" cy="38" rx="16" ry="18" fill="#0B1B2B" />
          <path
            d="M64 36 Q80 18 96 36 Q94 48 80 50 Q66 48 64 36 Z"
            fill="#07121D"
          />
          {/* Neck */}
          <rect x="74" y="50" width="12" height="8" fill="#D8C9B4" rx="2" />

          {/* Hoodie / Navy Jacket Body */}
          <path
            d="M52 58 Q80 52 108 58 L118 150 Q80 156 42 150 Z"
            fill="#0B2D55"
            stroke="#071B34"
            strokeWidth="2.5"
            strokeLinejoin="round"
          />

          {/* Backpack (Dark Charcoal & Navy) */}
          <rect
            x="58"
            y="68"
            width="44"
            height="58"
            rx="10"
            fill="#102033"
            stroke="#071B34"
            strokeWidth="2"
          />
          {/* Backpack Top Handle & Straps */}
          <path
            d="M72 68 V62 Q80 60 88 62 V68"
            stroke="#102033"
            strokeWidth="3.5"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M62 76 V134"
            stroke="#071B34"
            strokeWidth="2"
            strokeDasharray="4 2"
          />
          <path
            d="M98 76 V134"
            stroke="#071B34"
            strokeWidth="2"
            strokeDasharray="4 2"
          />
          {/* Backpack Zipper Pocket */}
          <rect
            x="64"
            y="94"
            width="32"
            height="26"
            rx="5"
            fill="#182A40"
            stroke="#071B34"
            strokeWidth="1.5"
          />
          <line
            x1="68"
            y1="102"
            x2="92"
            y2="102"
            stroke="#1457A6"
            strokeWidth="1.5"
            strokeLinecap="round"
          />

          {/* Dark Navy Trousers / Legs */}
          {/* Left Leg */}
          <path
            d="M54 148 L58 250 L74 250 L77 150 Z"
            fill="#0A1E35"
            stroke="#071B34"
            strokeWidth="2"
            strokeLinejoin="round"
          />
          {/* Right Leg */}
          <path
            d="M83 150 L86 250 L102 250 L106 148 Z"
            fill="#08182B"
            stroke="#071B34"
            strokeWidth="2"
            strokeLinejoin="round"
          />

          {/* White / Ivory Sneakers viewed from heel */}
          {/* Left Shoe */}
          <ellipse cx="66" cy="254" rx="10" ry="6" fill="#FAF7EF" stroke="#071B34" strokeWidth="1.5" />
          <rect x="58" y="250" width="16" height="5" fill="#FAF7EF" rx="2" />
          <path d="M60 256 H72" stroke="#1457A6" strokeWidth="1.5" />

          {/* Right Shoe */}
          <ellipse cx="94" cy="254" rx="10" ry="6" fill="#FAF7EF" stroke="#071B34" strokeWidth="1.5" />
          <rect x="86" y="250" width="16" height="5" fill="#FAF7EF" rx="2" />
          <path d="M88 256 H100" stroke="#1457A6" strokeWidth="1.5" />
        </svg>
      </div>
    </div>
  )
}
