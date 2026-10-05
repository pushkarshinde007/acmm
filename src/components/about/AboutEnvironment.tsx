import React from 'react'
import heroImage from '@/assets/acm_reference.jpg'
import atriumReference from '@/assets/about_atrium_reference.jpg'
import { AboutGlobe } from '@/components/about/AboutGlobe'
import { AboutWaterFeature } from '@/components/about/AboutWaterFeature'

interface AboutEnvironmentProps {
  progress: number // 0 to 1
  mouseOffset: { x: number; y: number }
  prefersReducedMotion: boolean
}

export const AboutEnvironment: React.FC<AboutEnvironmentProps> = ({
  progress,
  mouseOffset,
  prefersReducedMotion,
}) => {
  // Parallax and camera tracking motion:
  // Camera moves forward, slightly rises, and shifts laterally to reveal the atrium
  const scale = prefersReducedMotion ? 1 : 1.04 + progress * 0.12
  const translateX = prefersReducedMotion ? 0 : mouseOffset.x * -14 + progress * -26
  const translateY = prefersReducedMotion ? 0 : mouseOffset.y * -8 + progress * -18

  // Environmental dissolve mapping:
  // 0.00 - 0.20: Home Walkway / Bridge approach
  // 0.20 - 0.65: Gradual environmental reveal of the Community Atrium
  // 0.65 - 1.00: Full Community Atrium environment
  const atriumOpacity = Math.min(Math.max((progress - 0.18) / 0.45, 0), 1)

  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none bg-[#FAF7EF]">
      {/* 1. Base Layer: Home Walkway & Skybridge Approach */}
      <div
        className="absolute inset-0 w-full h-full transition-transform duration-700 ease-out will-change-transform"
        style={{
          transform: `scale(${scale}) translate3d(${translateX}px, ${translateY}px, 0)`,
        }}
      >
        <img
          src={heroImage}
          alt="Campus Walkway Approach"
          className="w-full h-full object-cover object-[60%_48%]"
        />
      </div>

      {/* 2. Transition Layer: Community Atrium Reference Artwork */}
      <div
        className="absolute inset-0 w-full h-full transition-opacity duration-1000 ease-out will-change-transform"
        style={{
          opacity: atriumOpacity,
          transform: `scale(${scale}) translate3d(${translateX}px, ${translateY}px, 0)`,
        }}
      >
        <img
          src={atriumReference}
          alt="ACM NMIET Community Atrium"
          className="w-full h-full object-cover object-[54%_42%]"
          loading="eager"
        />
      </div>

      {/* 3. Subtle Digital Computational Globe in Atrium Center */}
      <AboutGlobe progress={progress} prefersReducedMotion={prefersReducedMotion} />

      {/* 4. Reflective Pool & Waterfall Water Feature Shimmer */}
      <AboutWaterFeature progress={progress} prefersReducedMotion={prefersReducedMotion} />

      {/* 5. Soft Editorial Gradient Overlay for Text Readability on Desktop (Left 35–40%) */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#FAF7EF]/95 via-[#FAF7EF]/82 to-transparent w-full md:w-[72%] lg:w-[54%]" />

      {/* 6. Natural Morning Sunlight Flare (Upper-Left Continuous Lighting) */}
      <div className="absolute top-0 left-0 w-[550px] h-[550px] bg-[radial-gradient(ellipse_at_top_left,rgba(255,244,214,0.42),transparent_70%)] pointer-events-none mix-blend-screen" />

      {/* 7. Architectural Grid Linework Overlay (Subtle 3% opacity) */}
      <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#071B34_1px,transparent_1px),linear-gradient(to_bottom,#071B34_1px,transparent_1px)] bg-[size:40px_40px]" />

      {/* 8. Foreground Foliage Parallax Silhouette Accent in Lower Corners */}
      <div
        className="absolute bottom-0 left-0 w-64 h-48 pointer-events-none opacity-20 transition-transform duration-700 ease-out"
        style={{
          transform: `translate3d(${mouseOffset.x * 12 + progress * -35}px, ${mouseOffset.y * 8}px, 0)`,
        }}
      >
        <svg viewBox="0 0 200 150" className="w-full h-full fill-[#071B34]">
          <path d="M0 150 Q40 100 80 120 Q120 70 160 110 Q140 140 200 150 Z" />
        </svg>
      </div>

      {/* 9. Edge Blending Gradients */}
      <div className="absolute top-0 left-0 right-0 h-28 bg-gradient-to-b from-[#FAF7EF] via-[#FAF7EF]/40 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-28 bg-gradient-to-t from-[#FAF7EF] via-[#FAF7EF]/40 to-transparent" />
    </div>
  )
}
