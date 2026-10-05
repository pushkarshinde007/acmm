import React, { useRef, useState, useEffect } from 'react'
import { NmietEnvironment } from '@/components/nmiet/NmietEnvironment'
import { NmietContent } from '@/components/nmiet/NmietContent'
import { NmietCanvas3D } from '@/components/3d/canvas/NmietCanvas3D'
import { useExperience } from '@/core/context/ExperienceContext'

export const NmietTransition: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const { prefersReducedMotion } = useExperience()
  const [scrollProgress, setScrollProgress] = useState(0)
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 })

  const targetProgress = useRef(0)
  const currentProgress = useRef(0)
  const animFrameId = useRef<number | null>(null)

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return
      const rect = containerRef.current.getBoundingClientRect()
      const scrollableDistance = rect.height - window.innerHeight
      if (scrollableDistance <= 0) return

      const raw = Math.min(Math.max(-rect.top / scrollableDistance, 0), 1)
      targetProgress.current = raw
    }

    const updateLoop = () => {
      const diff = targetProgress.current - currentProgress.current
      if (Math.abs(diff) > 0.0002) {
        currentProgress.current += diff * 0.08
      } else {
        currentProgress.current = targetProgress.current
      }

      setScrollProgress(currentProgress.current)
      animFrameId.current = requestAnimationFrame(updateLoop)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    animFrameId.current = requestAnimationFrame(updateLoop)
    handleScroll()

    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (animFrameId.current) cancelAnimationFrame(animFrameId.current)
    }
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
      id="nmiet"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative w-full h-[180vh] sm:h-[195vh] bg-[#FAF7EF] select-none"
    >
      {/* Sticky Fullscreen Cinematic Viewport (100svh) */}
      <div className="sticky top-0 w-full h-[100svh] overflow-hidden flex flex-col justify-between">
        {/* 1. Environmental Layer: Transition from Walkway into Innovation Landmark */}
        <NmietEnvironment
          progress={scrollProgress}
          mouseOffset={mouseOffset}
          prefersReducedMotion={prefersReducedMotion}
        />

        {/* 2. Three.js / R3F Canvas: Upward Camera Crane & Daylight Fill */}
        <NmietCanvas3D
          progress={scrollProgress}
          mouseOffset={mouseOffset}
        />

        {/* 3. Foreground Editorial Content Layer: Desktop left 7–9vw, max-width 560px */}
        <div className="relative z-30 w-full max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-12 h-full flex items-center">
          <div className="w-full lg:w-[48%]">
            <NmietContent
              progress={scrollProgress}
              prefersReducedMotion={prefersReducedMotion}
            />
          </div>
        </div>
      </div>
    </section>
  )
}
