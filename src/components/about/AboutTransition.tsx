import React, { useRef, useState, useEffect } from 'react'
import { GlyphPortal } from '@/components/ui/glyph-portal'
import { AboutEnvironment } from '@/components/about/AboutEnvironment'
import { AboutContent } from '@/components/about/AboutContent'
import { AboutCanvas3D } from '@/components/3d/canvas/AboutCanvas3D'
import { useExperience } from '@/core/context/ExperienceContext'

export const AboutTransition: React.FC = () => {
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
      id="about"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative w-full bg-[#FAF7EF] select-none"
    >
      <GlyphPortal
        word="COMMUNITY"
        activeLetter="M"
        fontFamily="Outfit, var(--font-display, sans-serif)"
        fontWeight={900}
        scrollLength={2.0}
        interactive={true}
        enterLabel="STEPPING THROUGH"
        style={{
          '--gp-paper': '#FAF7EF',
          '--gp-ink': '#071B34',
          '--gp-field': '#FAF7EF',
          '--gp-foreground': '#102033',
        }}
        front={
          <div className="w-full max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-12 h-full flex flex-col justify-between py-24 sm:py-28">
            <div className="pt-6">
              <span className="font-mono text-xs font-semibold tracking-widest text-[#1457A6] uppercase">
                02 • ABOUT ACM NMIET
              </span>
              <h2 className="font-display font-black text-3xl sm:text-5xl lg:text-6xl text-[#071B34] tracking-tight mt-2">
                A COMMUNITY THAT BUILDS.
              </h2>
            </div>
            <div className="flex items-center gap-2 text-xs font-mono text-[#536273] pb-6">
              <span className="w-2 h-2 rounded-full bg-[#1457A6] animate-pulse" />
              <span>Scroll to step through the glyph into Community Atrium ↓</span>
            </div>
          </div>
        }
      >
        {/* The Community Atrium Revealed Inside the Portal */}
        <div className="relative w-full h-full overflow-hidden flex flex-col justify-between">
          {/* 1. Environmental Layer: Community Atrium, Water Feature & Digital Globe */}
          <AboutEnvironment
            progress={scrollProgress}
            mouseOffset={mouseOffset}
            prefersReducedMotion={prefersReducedMotion}
          />

          {/* 2. Three.js / R3F Canvas: Directional Sunlight & Tracking Camera */}
          <AboutCanvas3D
            progress={scrollProgress}
            mouseOffset={mouseOffset}
          />

          {/* 3. Foreground Editorial Content Layer */}
          <div className="relative z-30 w-full max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-12 h-full flex items-center">
            <div className="w-full lg:w-[48%]">
              <AboutContent
                progress={scrollProgress}
                prefersReducedMotion={prefersReducedMotion}
              />
            </div>
          </div>
        </div>
      </GlyphPortal>
    </section>
  )
}

