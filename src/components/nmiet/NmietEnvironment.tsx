import React from 'react'
import atriumImage from '@/assets/about_atrium_reference.jpg'
import landmarkReference from '@/assets/nmiet_landmark_reference.jpg'

interface NmietEnvironmentProps {
  progress: number // 0 to 1
  mouseOffset: { x: number; y: number }
  prefersReducedMotion: boolean
}

export const NmietEnvironment: React.FC<NmietEnvironmentProps> = ({
  progress,
  mouseOffset,
  prefersReducedMotion,
}) => {
  // Parallax and camera tracking motion:
  // Camera elevates slightly and tilts upward to establish the monumental height of the Landmark
  const scale = prefersReducedMotion ? 1 : 1.04 + progress * 0.12
  const translateX = prefersReducedMotion ? 0 : mouseOffset.x * -14 + progress * -20
  const translateY = prefersReducedMotion ? 0 : mouseOffset.y * -8 + progress * -22

  // Environmental dissolve mapping:
  // 0.00 - 0.20: Community Atrium / Bridge exit
  // 0.20 - 0.65: Gradual environmental reveal of the Innovation District & Landmark
  // 0.65 - 1.00: Full Monumental NMIET Innovation Landmark
  const landmarkOpacity = Math.min(Math.max((progress - 0.18) / 0.45, 0), 1)

  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none bg-[#FAF7EF]">
      {/* 1. Base Layer: Community Atrium & Skybridge Exit */}
      <div
        className="absolute inset-0 w-full h-full transition-transform duration-700 ease-out will-change-transform"
        style={{
          transform: `scale(${scale}) translate3d(${translateX}px, ${translateY}px, 0)`,
        }}
      >
        <img
          src={atriumImage}
          alt="Campus Path Approach"
          className="w-full h-full object-cover object-[55%_45%]"
        />
      </div>

      {/* 2. Transition Layer: Monumental NMIET Innovation Landmark */}
      <div
        className="absolute inset-0 w-full h-full transition-opacity duration-1000 ease-out will-change-transform"
        style={{
          opacity: landmarkOpacity,
          transform: `scale(${scale}) translate3d(${translateX}px, ${translateY}px, 0)`,
        }}
      >
        <img
          src={landmarkReference}
          alt="NMIET Innovation Landmark"
          className="w-full h-full object-cover object-[52%_40%]"
          loading="eager"
        />
      </div>

      {/* 3. Soft Editorial Gradient Overlay for Text Readability on Desktop (Left 35–40%) */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#FAF7EF]/95 via-[#FAF7EF]/82 to-transparent w-full md:w-[72%] lg:w-[54%]" />

      {/* 4. Natural Daylight Sunlight Flare from Upper Left */}
      <div className="absolute top-0 left-0 w-[550px] h-[550px] bg-[radial-gradient(ellipse_at_top_left,rgba(255,244,214,0.42),transparent_70%)] pointer-events-none mix-blend-screen" />

      {/* 5. Architectural Grid Linework Overlay (Subtle 3% opacity) */}
      <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#071B34_1px,transparent_1px),linear-gradient(to_bottom,#071B34_1px,transparent_1px)] bg-[size:40px_40px]" />

      {/* 6. Foreground Landscaped Foliage Parallax Silhouette Accent in Lower Corners */}
      <div
        className="absolute bottom-0 left-0 w-72 h-52 pointer-events-none opacity-25 transition-transform duration-700 ease-out"
        style={{
          transform: `translate3d(${mouseOffset.x * 12 + progress * -35}px, ${mouseOffset.y * 8}px, 0)`,
        }}
      >
        <svg viewBox="0 0 200 150" className="w-full h-full fill-[#071B34]">
          <path d="M0 150 Q40 90 80 115 Q120 65 170 110 Q145 140 200 150 Z" />
        </svg>
      </div>

      {/* 7. Edge Blending Gradients */}
      <div className="absolute top-0 left-0 right-0 h-28 bg-gradient-to-b from-[#FAF7EF] via-[#FAF7EF]/40 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-28 bg-gradient-to-t from-[#FAF7EF] via-[#FAF7EF]/40 to-transparent" />
    </div>
  )
}
