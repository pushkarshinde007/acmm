import React from 'react'

interface NmietCharacterProps {
  progress: number // 0 to 1 through Nmiet transition
  prefersReducedMotion: boolean
  mouseOffset: { x: number; y: number }
}

export const NmietCharacter: React.FC<NmietCharacterProps> = ({
  progress,
  prefersReducedMotion,
  mouseOffset,
}) => {
  // Movement stages:
  // 0% - 40%: walking forward along the landscaped walkway
  // 40% - 65%: walking slows down (deceleration)
  // 65% - 100%: student pauses naturally, looking up at the Innovation Landmark
  const isWalking = progress < 0.55 && !prefersReducedMotion
  const isSlowing = progress >= 0.35 && progress < 0.55
  const isPausedLookingUp = progress >= 0.65

  // Position: Desktop X: 52–58% (starts around 56%, settles at ~54%)
  const posX = prefersReducedMotion ? 55 : 56 - progress * 3
  const forwardStep = prefersReducedMotion ? 60 : progress * 110
  const perspectiveScale = prefersReducedMotion ? 0.76 : Math.max(0.85 - progress * 0.15, 0.70)

  const mouseParallaxX = prefersReducedMotion ? 0 : mouseOffset.x * -7
  const mouseParallaxY = prefersReducedMotion ? 0 : mouseOffset.y * -5

  // Walking bob animation
  const walkClass = isWalking
    ? isSlowing
      ? 'animate-walk opacity-95 [animation-duration:1.1s]'
      : 'animate-walk [animation-duration:0.65s]'
    : ''

  return (
    <div
      className="hidden md:block absolute z-20 pointer-events-none select-none transition-transform duration-500 ease-out will-change-transform"
      style={{
        left: `${posX}%`,
        bottom: '8%',
        transform: `translate3d(calc(-50% + ${mouseParallaxX}px), calc(-${forwardStep}px + ${mouseParallaxY}px), 0) scale(${perspectiveScale})`,
      }}
    >
      {/* Student Character - Same proportions, navy jacket, trousers, backpack */}
      <div className={`relative w-44 h-80 ${walkClass}`}>
        {/* Soft ground contact shadow */}
        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-32 h-6 bg-[#071B34]/25 rounded-full blur-[4px]" />

        {isPausedLookingUp ? (
          /* Stance Paused Looking Up at the Monumental Landmark */
          <svg viewBox="0 0 160 300" className="w-full h-full drop-shadow-md transition-all duration-700" fill="none">
            {/* Head tilted slightly upward toward the tower (silhouette) */}
            <ellipse cx="78" cy="35" rx="15" ry="17" fill="#0B1B2B" />
            <path
              d="M64 33 Q78 16 92 30 Q90 44 78 48 Q66 46 64 33 Z"
              fill="#07121D"
            />
            {/* Neck */}
            <path d="M72 47 L80 47 L78 56 L70 56 Z" fill="#D8C9B4" />

            {/* Navy Hoodie / Jacket */}
            <path
              d="M50 56 Q78 50 106 58 L114 150 Q78 156 42 148 Z"
              fill="#0B2D55"
              stroke="#071B34"
              strokeWidth="2.5"
              strokeLinejoin="round"
            />

            {/* Backpack (Charcoal & Navy with Cobalt accent) */}
            <rect
              x="46"
              y="66"
              width="42"
              height="58"
              rx="9"
              fill="#102033"
              stroke="#071B34"
              strokeWidth="2"
            />
            <path
              d="M50 74 V132"
              stroke="#071B34"
              strokeWidth="2"
              strokeDasharray="4 2"
            />
            <rect
              x="52"
              y="92"
              width="30"
              height="26"
              rx="4"
              fill="#182A40"
              stroke="#071B34"
              strokeWidth="1.5"
            />
            <line
              x1="56"
              y1="100"
              x2="78"
              y2="100"
              stroke="#1457A6"
              strokeWidth="1.5"
              strokeLinecap="round"
            />

            {/* Dark Navy Trousers */}
            <path
              d="M52 148 L58 250 L74 250 L77 150 Z"
              fill="#0A1E35"
              stroke="#071B34"
              strokeWidth="2"
              strokeLinejoin="round"
            />
            <path
              d="M82 150 L86 250 L102 250 L106 148 Z"
              fill="#08182B"
              stroke="#071B34"
              strokeWidth="2"
              strokeLinejoin="round"
            />

            {/* Ivory Sneakers */}
            <ellipse cx="66" cy="254" rx="10" ry="6" fill="#FAF7EF" stroke="#071B34" strokeWidth="1.5" />
            <rect x="58" y="250" width="16" height="5" fill="#FAF7EF" rx="2" />
            <path d="M60 256 H72" stroke="#1457A6" strokeWidth="1.5" />

            <ellipse cx="94" cy="254" rx="10" ry="6" fill="#FAF7EF" stroke="#071B34" strokeWidth="1.5" />
            <rect x="86" y="250" width="16" height="5" fill="#FAF7EF" rx="2" />
            <path d="M88 256 H100" stroke="#1457A6" strokeWidth="1.5" />
          </svg>
        ) : (
          /* Walking Forward along the Landscaped Path */
          <svg viewBox="0 0 160 300" className="w-full h-full drop-shadow-md transition-all duration-700" fill="none">
            <ellipse cx="80" cy="38" rx="16" ry="18" fill="#0B1B2B" />
            <path
              d="M64 36 Q80 18 96 36 Q94 48 80 50 Q66 48 64 36 Z"
              fill="#07121D"
            />
            <rect x="74" y="50" width="12" height="8" fill="#D8C9B4" rx="2" />

            <path
              d="M52 58 Q80 52 108 58 L118 150 Q80 156 42 150 Z"
              fill="#0B2D55"
              stroke="#071B34"
              strokeWidth="2.5"
              strokeLinejoin="round"
            />

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

            <path
              d="M54 148 L58 250 L74 250 L77 150 Z"
              fill="#0A1E35"
              stroke="#071B34"
              strokeWidth="2"
              strokeLinejoin="round"
            />
            <path
              d="M83 150 L86 250 L102 250 L106 148 Z"
              fill="#08182B"
              stroke="#071B34"
              strokeWidth="2"
              strokeLinejoin="round"
            />

            <ellipse cx="66" cy="254" rx="10" ry="6" fill="#FAF7EF" stroke="#071B34" strokeWidth="1.5" />
            <rect x="58" y="250" width="16" height="5" fill="#FAF7EF" rx="2" />
            <path d="M60 256 H72" stroke="#1457A6" strokeWidth="1.5" />

            <ellipse cx="94" cy="254" rx="10" ry="6" fill="#FAF7EF" stroke="#071B34" strokeWidth="1.5" />
            <rect x="86" y="250" width="16" height="5" fill="#FAF7EF" rx="2" />
            <path d="M88 256 H100" stroke="#1457A6" strokeWidth="1.5" />
          </svg>
        )}
      </div>
    </div>
  )
}
