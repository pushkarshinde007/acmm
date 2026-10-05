import React from 'react'
import refImage from '@/assets/acm_reference.jpg'

interface HeroEnvironmentProps {
  scrollProgress: number
  mouseOffset: { x: number; y: number }
  prefersReducedMotion: boolean
}

export const HeroEnvironment: React.FC<HeroEnvironmentProps> = ({
  scrollProgress,
  mouseOffset,
  prefersReducedMotion,
}) => {
  // Parallax calculations (Background moves slower, midground normal, foreground faster)
  const bgScale = prefersReducedMotion ? 1 : 1.05 + scrollProgress * 0.12
  const bgTranslateX = prefersReducedMotion ? 0 : mouseOffset.x * -12 + scrollProgress * 15
  const bgTranslateY = prefersReducedMotion ? 0 : mouseOffset.y * -8 + scrollProgress * -25

  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none bg-[#FAF7EF]">
      {/* 1. Cinematic Background Layer: Skyline, Clouds, Sky & Morning Sun */}
      <div
        className="absolute inset-0 w-full h-full transition-transform duration-700 ease-out will-change-transform"
        style={{
          transform: `scale(${bgScale}) translate3d(${bgTranslateX}px, ${bgTranslateY}px, 0)`,
        }}
      >
        <img
          src={refImage}
          alt="ACM NMIET Futuristic Academic Campus"
          className="w-full h-full object-cover object-[58%_45%]"
          loading="eager"
          decoding="async"
        />

        {/* Soft editorial gradient wash on left side for crisp text contrast */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#FAF7EF]/95 via-[#FAF7EF]/75 to-transparent w-full md:w-[72%] lg:w-[56%]" />

        {/* Morning warm sunlight flare overlay in upper-left */}
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-[radial-gradient(ellipse_at_top_left,rgba(255,244,214,0.45),transparent_70%)] pointer-events-none mix-blend-screen" />

        {/* Bottom edge gentle fade to paper cream */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#FAF7EF] via-[#FAF7EF]/40 to-transparent" />
      </div>

      {/* 2. Architectural linework and grid overlay */}
      <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#071B34_1px,transparent_1px),linear-gradient(to_bottom,#071B34_1px,transparent_1px)] bg-[size:40px_40px]" />
    </div>
  )
}
