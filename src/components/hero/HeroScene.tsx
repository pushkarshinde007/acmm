import React, { useState, useEffect } from 'react'
import { HeroEnvironment } from '@/components/hero/HeroEnvironment'
import { HeroContent } from '@/components/hero/HeroContent'
import { HeroCanvas3D } from '@/components/3d/canvas/HeroCanvas3D'
import { useExperience } from '@/core/context/ExperienceContext'

export const HeroScene: React.FC = () => {
  const { smoothScrollProgress, prefersReducedMotion } = useExperience()
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 })
  const [isLoaded, setIsLoaded] = useState(false)

  // Initial load transition sequence
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true)
    }, 100)
    return () => clearTimeout(timer)
  }, [])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (prefersReducedMotion) return
    const { clientX, clientY, currentTarget } = e
    const { width, height, left, top } = currentTarget.getBoundingClientRect()
    const x = (clientX - left) / width - 0.5
    const y = (clientY - top) / height - 0.5
    setMouseOffset({ x, y })
  }

  return (
    <section
      id="home"
      onMouseMove={handleMouseMove}
      className="relative w-full min-h-[100svh] flex flex-col justify-between overflow-hidden bg-[#FAF7EF] select-none"
    >
      {/* 1. Environmental Layer (Reference Artwork + Atmospheric Gradients) */}
      <HeroEnvironment
        scrollProgress={smoothScrollProgress}
        mouseOffset={mouseOffset}
        prefersReducedMotion={prefersReducedMotion}
      />

      {/* 2. Three.js / R3F 3D Canvas Layer (Lighting, Camera tracking, Dust Particles) */}
      <HeroCanvas3D
        scrollProgress={smoothScrollProgress}
        mouseOffset={mouseOffset}
      />

      {/* 3. Foreground Hero Content & Editorial Typography */}
      <div className="relative z-30 w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 h-full min-h-[100svh] flex items-center">
        <div
          className={`transition-all duration-700 ease-out ${
            isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <HeroContent scrollProgress={smoothScrollProgress} />
        </div>
      </div>
    </section>
  )
}
