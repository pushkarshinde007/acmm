import React from 'react'

interface DomainsCharacterProps {
  progress: number // 0 to 1 through Domains section
  prefersReducedMotion: boolean
  mouseOffset: { x: number; y: number }
  activeDomainId: string
}

export const DomainsCharacter: React.FC<DomainsCharacterProps> = ({
  progress,
  prefersReducedMotion,
  mouseOffset,
  activeDomainId,
}) => {
  // Movement stages:
  // 0% - 35%: student walks forward into the open plaza of the Innovation District
  // 35% - 50%: student decelerates to a walking stop
  // 50% - 100%: student pauses in an explorer stance facing the central Knowledge Nexus and five domain paths
  const isWalking = progress < 0.45 && !prefersReducedMotion
  const isSlowing = progress >= 0.30 && progress < 0.45
  const isExplorerPaused = progress >= 0.45

  // Position: Desktop X centered ~58% matching the path in the reference artwork
  const posX = prefersReducedMotion ? 58 : 58 + (progress * 2 - 1)
  const forwardStep = prefersReducedMotion ? 55 : Math.min(progress * 105, 75)
  const perspectiveScale = prefersReducedMotion ? 0.78 : Math.max(0.86 - progress * 0.12, 0.74)

  const mouseParallaxX = prefersReducedMotion ? 0 : mouseOffset.x * -8
  const mouseParallaxY = prefersReducedMotion ? 0 : mouseOffset.y * -5

  // Directional lean towards active domain:
  // technology (-2deg), management (-0.5deg), design (+2.5deg), competitive-coding (-3deg), research (+1deg)
  const domainAngle: Record<string, number> = {
    technology: -2.2,
    management: -0.5,
    design: 2.5,
    'competitive-coding': -3.0,
    research: 1.0,
  }
  const currentAngle = isExplorerPaused ? domainAngle[activeDomainId] || 0 : 0

  const walkClass = isWalking
    ? isSlowing
      ? 'animate-walk opacity-95 [animation-duration:1.1s]'
      : 'animate-walk [animation-duration:0.65s]'
    : ''

  return (
    <div
      className="hidden md:block absolute z-20 pointer-events-none select-none transition-transform duration-700 ease-out will-change-transform"
      style={{
        left: `${posX}%`,
        bottom: '7%',
        transform: `translate3d(calc(-50% + ${mouseParallaxX}px), calc(-${forwardStep}px + ${mouseParallaxY}px), 0) scale(${perspectiveScale}) rotate(${currentAngle}deg)`,
      }}
    >
      {/* Student Protagonist Container */}
      <div className={`relative w-44 h-80 ${walkClass}`}>
        {/* Soft ground contact shadow on reflective pavement */}
        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-36 h-6 bg-[#071B34]/30 rounded-full blur-[4px]" />

        {isExplorerPaused ? (
          /* Stance: Explorer standing confidently on the plaza choosing an innovation path */
          <svg viewBox="0 0 160 300" className="w-full h-full drop-shadow-md transition-all duration-700" fill="none">
            {/* Head silhouette viewed slightly from behind */}
            <ellipse cx="78" cy="36" rx="14.5" ry="16.5" fill="#0B1B2B" />
            <path
              d="M65 34 Q78 18 91 32 Q89 45 78 49 Q67 47 65 34 Z"
              fill="#07121D"
            />
            {/* Neck */}
            <path d="M73 48 L81 48 L79 57 L71 57 Z" fill="#D8C9B4" />

            {/* Navy Hoodie / Jacket */}
            <path
              d="M48 57 Q78 51 108 59 L115 152 Q78 158 41 150 Z"
              fill="#0B2D55"
              stroke="#071B34"
              strokeWidth="2.5"
              strokeLinejoin="round"
            />

            {/* Backpack (Charcoal & Navy with Cobalt accent) */}
            <rect
              x="46"
              y="68"
              width="43"
              height="60"
              rx="9"
              fill="#102033"
              stroke="#071B34"
              strokeWidth="2"
            />
            <path
              d="M51 76 V134"
              stroke="#071B34"
              strokeWidth="2"
              strokeDasharray="4 2"
            />
            <rect
              x="53"
              y="94"
              width="30"
              height="28"
              rx="4"
              fill="#182A40"
              stroke="#071B34"
              strokeWidth="1.5"
            />
            {/* Cobalt zipper line accent */}
            <line
              x1="57"
              y1="102"
              x2="79"
              y2="102"
              stroke="#2D75C9"
              strokeWidth="2"
            />

            {/* Left Arm slightly relaxed */}
            <path
              d="M46 64 Q32 100 37 136 Q42 144 46 138"
              stroke="#071B34"
              strokeWidth="13"
              strokeLinecap="round"
            />
            <path
              d="M46 64 Q32 100 37 136 Q42 144 46 138"
              stroke="#0B2D55"
              strokeWidth="9"
              strokeLinecap="round"
            />

            {/* Right Arm slightly lifted towards district paths */}
            <path
              d="M108 66 Q122 104 117 138 Q114 146 109 140"
              stroke="#071B34"
              strokeWidth="13"
              strokeLinecap="round"
            />
            <path
              d="M108 66 Q122 104 117 138 Q114 146 109 140"
              stroke="#0B2D55"
              strokeWidth="9"
              strokeLinecap="round"
            />

            {/* Dark Trousers */}
            <path
              d="M46 150 L42 245 L67 245 L73 175 L81 175 L87 245 L112 245 L108 150 Z"
              fill="#0A1E35"
              stroke="#071B34"
              strokeWidth="2"
            />
            <line
              x1="77"
              y1="172"
              x2="77"
              y2="245"
              stroke="#071B34"
              strokeWidth="1.5"
            />

            {/* White / Ivory Sneakers with subtle navy trim */}
            <path
              d="M40 245 Q36 257 39 261 Q45 264 65 264 Q68 258 66 245 Z"
              fill="#FAF7EF"
              stroke="#071B34"
              strokeWidth="2"
            />
            <path
              d="M87 245 Q85 258 88 264 Q108 264 114 261 Q117 257 113 245 Z"
              fill="#FAF7EF"
              stroke="#071B34"
              strokeWidth="2"
            />
            <line x1="42" y1="258" x2="63" y2="258" stroke="#1457A6" strokeWidth="1.5" />
            <line x1="90" y1="258" x2="111" y2="258" stroke="#1457A6" strokeWidth="1.5" />
          </svg>
        ) : (
          /* Stance: Walking Forward toward Innovation Plaza */
          <svg viewBox="0 0 160 300" className="w-full h-full drop-shadow-md" fill="none">
            {/* Head Silhouette */}
            <ellipse cx="78" cy="38" rx="14" ry="16" fill="#0B1B2B" />
            <path
              d="M66 36 Q78 20 90 34 Q88 47 78 51 Q68 49 66 36 Z"
              fill="#07121D"
            />
            <path d="M73 50 L81 50 L79 59 L71 59 Z" fill="#D8C9B4" />

            {/* Navy Hoodie */}
            <path
              d="M48 58 Q78 52 108 60 L114 153 Q78 159 42 151 Z"
              fill="#0B2D55"
              stroke="#071B34"
              strokeWidth="2.5"
              strokeLinejoin="round"
            />

            {/* Backpack */}
            <rect
              x="46"
              y="69"
              width="43"
              height="60"
              rx="9"
              fill="#102033"
              stroke="#071B34"
              strokeWidth="2"
            />
            <line
              x1="57"
              y1="103"
              x2="79"
              y2="103"
              stroke="#2D75C9"
              strokeWidth="2"
            />

            {/* Arms walking */}
            <path
              d="M46 65 Q33 100 40 134 Q45 142 49 136"
              stroke="#071B34"
              strokeWidth="13"
              strokeLinecap="round"
            />
            <path
              d="M46 65 Q33 100 40 134 Q45 142 49 136"
              stroke="#0B2D55"
              strokeWidth="9"
              strokeLinecap="round"
            />
            <path
              d="M108 67 Q121 102 114 136 Q111 144 107 138"
              stroke="#071B34"
              strokeWidth="13"
              strokeLinecap="round"
            />
            <path
              d="M108 67 Q121 102 114 136 Q111 144 107 138"
              stroke="#0B2D55"
              strokeWidth="9"
              strokeLinecap="round"
            />

            {/* Trousers */}
            <path
              d="M46 151 L40 248 L65 248 L73 176 L81 176 L89 248 L114 248 L108 151 Z"
              fill="#0A1E35"
              stroke="#071B34"
              strokeWidth="2"
            />

            {/* Sneakers */}
            <path
              d="M38 248 Q34 260 37 264 Q43 267 63 267 Q66 261 64 248 Z"
              fill="#FAF7EF"
              stroke="#071B34"
              strokeWidth="2"
            />
            <path
              d="M89 248 Q87 261 90 267 Q110 267 116 264 Q119 260 115 248 Z"
              fill="#FAF7EF"
              stroke="#071B34"
              strokeWidth="2"
            />
          </svg>
        )}
      </div>
    </div>
  )
}
