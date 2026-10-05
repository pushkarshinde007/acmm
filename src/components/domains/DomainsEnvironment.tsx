import React from 'react'
import domainsRefImg from '@/assets/domains_reference.jpg'

interface DomainsEnvironmentProps {
  progress: number
  mouseOffset: { x: number; y: number }
  prefersReducedMotion: boolean
}

export const DomainsEnvironment: React.FC<DomainsEnvironmentProps> = ({
  progress,
  mouseOffset,
  prefersReducedMotion,
}) => {
  // Parallax calculations
  const parallaxX = prefersReducedMotion ? 0 : mouseOffset.x * 12
  const parallaxY = prefersReducedMotion ? 0 : mouseOffset.y * 8

  // Environmental zoom & elevation: Camera gradually lifts and widens into the district
  // Progress 0.00-0.45: Camera moves forward through entry bridge
  // Progress 0.45-1.00: Camera establishes wide view of the five domain installations
  const baseScale = prefersReducedMotion ? 1.05 : 1.12 - progress * 0.07
  const translateY = prefersReducedMotion ? 0 : (1 - progress) * 20



  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none select-none">
      {/* 1. Primary Environmental Artwork: Innovation District Reference Image */}
      <div
        className="absolute -inset-[5%] w-[110%] h-[110%] transition-transform duration-700 ease-out will-change-transform"
        style={{
          transform: `translate3d(${parallaxX}px, calc(${translateY}px + ${parallaxY}px), 0) scale(${baseScale})`,
        }}
      >
        <img
          src={domainsRefImg}
          alt="ACM NMIET Innovation District — Multi-level architecture, glass research pavilions, and cascading terraces"
          className="w-full h-full object-cover object-center filter saturate-[1.04] contrast-[1.02]"
          loading="eager"
        />

        {/* 2. Architectural Ink & Watercolor Wash Overlay */}
        <div
          className="absolute inset-0 mix-blend-multiply opacity-20 pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(circle at 50% 40%, rgba(20, 87, 166, 0.08) 0%, rgba(7, 27, 52, 0.3) 100%)`,
          }}
        />

        {/* 3. Warm Cinematic Daylight Highlights */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse 65% 50% at 25% 15%, rgba(255, 248, 230, 0.4) 0%, rgba(245, 240, 230, 0) 70%)',
          }}
        />

        {/* 4. Water Architecture Shimmer on Pools and Waterfall Channels */}
        <div
          className="absolute bottom-0 left-0 w-full h-[38%] pointer-events-none opacity-40 mix-blend-screen"
          style={{
            background:
              'linear-gradient(180deg, transparent 0%, rgba(105, 188, 232, 0.22) 40%, rgba(45, 117, 201, 0.15) 100%)',
          }}
        />

        {/* 5. Cascading Waterfall Sheen on Left Terraces */}
        <div
          className="absolute bottom-[22%] left-[30%] w-[10%] h-[18%] pointer-events-none opacity-30 mix-blend-overlay animate-pulse"
          style={{
            background: 'linear-gradient(180deg, rgba(255,255,255,0.7) 0%, rgba(105,188,232,0.3) 100%)',
          }}
        />



        {/* 7. Bottom & Edge Gradients for Text Contrast */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'linear-gradient(90deg, rgba(250, 247, 239, 0.92) 0%, rgba(250, 247, 239, 0.72) 36%, rgba(250, 247, 239, 0.15) 60%, rgba(250, 247, 239, 0.4) 100%)',
          }}
        />

        <div
          className="absolute bottom-0 inset-x-0 h-32 pointer-events-none"
          style={{
            background: 'linear-gradient(to top, rgba(250, 247, 239, 0.95), transparent)',
          }}
        />
      </div>
    </div>
  )
}
