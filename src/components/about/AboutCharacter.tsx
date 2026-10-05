import React from 'react'

interface AboutCharacterProps {
  progress: number // 0 to 1 through About transition
  prefersReducedMotion: boolean
  mouseOffset: { x: number; y: number }
}

export const AboutCharacter: React.FC<AboutCharacterProps> = ({
  progress,
  prefersReducedMotion,
  mouseOffset,
}) => {
  // Story progression:
  // 0.00 - 0.35: Walking forward through transitional walkway/canopy
  // 0.35 - 0.60: Walking slows down (deceleration)
  // 0.60 - 1.00: Student stops naturally in atrium, looking around at curved architecture & digital globe
  const isWalking = progress < 0.55 && !prefersReducedMotion
  const isSlowing = progress >= 0.35 && progress < 0.55
  const isThreeQuarter = progress >= 0.65

  // Position: Desktop X: 52–58% (starts around 57%, settles at ~54%)
  const posX = prefersReducedMotion ? 55 : 57 - progress * 4
  const forwardStep = prefersReducedMotion ? 60 : progress * 115
  const perspectiveScale = prefersReducedMotion ? 0.78 : Math.max(0.86 - progress * 0.14, 0.72)

  const mouseParallaxX = prefersReducedMotion ? 0 : mouseOffset.x * -7
  const mouseParallaxY = prefersReducedMotion ? 0 : mouseOffset.y * -5

  // Walking bob speed slows down in deceleration phase
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
        bottom: '10%',
        transform: `translate3d(calc(-50% + ${mouseParallaxX}px), calc(-${forwardStep}px + ${mouseParallaxY}px), 0) scale(${perspectiveScale})`,
      }}
    >
      {/* Student Character - Same proportions, navy jacket, trousers, backpack */}
      <div className={`relative w-44 h-80 ${walkClass}`}>
        {/* Soft ground contact shadow */}
        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-32 h-6 bg-[#071B34]/25 rounded-full blur-[4px]" />

        {isThreeQuarter ? (
          /* Three-Quarter View looking toward the atrium architecture and digital globe */
          <svg viewBox="0 0 160 300" className="w-full h-full drop-shadow-md transition-all duration-700" fill="none">
            {/* Head in slight 3/4 turn (minimal facial identity, faceless silhouette) */}
            <ellipse cx="76" cy="38" rx="15" ry="18" fill="#0B1B2B" />
            <path
              d="M62 36 Q76 18 90 32 Q88 46 76 50 Q64 48 62 36 Z"
              fill="#07121D"
            />
            {/* Subtle neck & jawline contour */}
            <path d="M70 50 L78 50 L75 58 L68 58 Z" fill="#D8C9B4" />

            {/* Jacket Body in Three-Quarter Angle */}
            <path
              d="M48 58 Q76 52 104 60 L112 150 Q76 156 40 148 Z"
              fill="#0B2D55"
              stroke="#071B34"
              strokeWidth="2.5"
              strokeLinejoin="round"
            />

            {/* Backpack angled on back */}
            <rect
              x="44"
              y="68"
              width="40"
              height="58"
              rx="9"
              fill="#102033"
              stroke="#071B34"
              strokeWidth="2"
              transform="rotate(-4 64 97)"
            />
            {/* Backpack Details */}
            <path
              d="M48 76 V132"
              stroke="#071B34"
              strokeWidth="2"
              strokeDasharray="4 2"
            />
            <rect
              x="50"
              y="94"
              width="28"
              height="26"
              rx="4"
              fill="#182A40"
              stroke="#071B34"
              strokeWidth="1.5"
            />
            <line
              x1="54"
              y1="102"
              x2="74"
              y2="102"
              stroke="#1457A6"
              strokeWidth="1.5"
              strokeLinecap="round"
            />

            {/* Right Arm slightly relaxed at side */}
            <path
              d="M102 62 Q112 90 108 136"
              stroke="#0B2D55"
              strokeWidth="14"
              strokeLinecap="round"
            />
            <path
              d="M102 62 Q112 90 108 136"
              stroke="#071B34"
              strokeWidth="2"
              fill="none"
            />

            {/* Dark Navy Trousers */}
            <path
              d="M50 148 L56 250 L72 250 L75 150 Z"
              fill="#0A1E35"
              stroke="#071B34"
              strokeWidth="2"
              strokeLinejoin="round"
            />
            <path
              d="M80 150 L84 250 L100 250 L104 148 Z"
              fill="#08182B"
              stroke="#071B34"
              strokeWidth="2"
              strokeLinejoin="round"
            />

            {/* Ivory Sneakers */}
            <ellipse cx="64" cy="254" rx="10" ry="6" fill="#FAF7EF" stroke="#071B34" strokeWidth="1.5" />
            <rect x="56" y="250" width="16" height="5" fill="#FAF7EF" rx="2" />
            <path d="M58 256 H70" stroke="#1457A6" strokeWidth="1.5" />

            <ellipse cx="92" cy="254" rx="10" ry="6" fill="#FAF7EF" stroke="#071B34" strokeWidth="1.5" />
            <rect x="84" y="250" width="16" height="5" fill="#FAF7EF" rx="2" />
            <path d="M86 256 H98" stroke="#1457A6" strokeWidth="1.5" />
          </svg>
        ) : (
          /* Rear View Walking into Atrium */
          <svg viewBox="0 0 160 300" className="w-full h-full drop-shadow-md transition-all duration-700" fill="none">
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

            {/* Dark Navy Trousers */}
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

            {/* Ivory Sneakers */}
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
