import React, { useRef, useState, useEffect, useCallback } from 'react'
import { DomainsEnvironment } from '@/components/domains/DomainsEnvironment'
import { DomainsContent } from '@/components/domains/DomainsContent'
import { useExperience } from '@/core/context/ExperienceContext'

export const DomainsTransition: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const { prefersReducedMotion } = useExperience()
  const [scrollProgress, setScrollProgress] = useState(0)
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 })
  const [activeDomainId, setActiveDomainId] = useState<string>('technology')
  const [manualOverride, setManualOverride] = useState(false)

  const targetProgress = useRef(0)
  const currentProgress = useRef(0)
  const animFrameId = useRef<number | null>(null)
  const lastScrollY = useRef(0)

  // Map scroll progress to domain activation unless manually overridden during brief pause
  const getDomainFromProgress = useCallback((p: number): string => {
    if (p < 0.60) return 'technology'
    if (p < 0.72) return 'technology'
    if (p < 0.80) return 'management'
    if (p < 0.86) return 'design'
    if (p < 0.93) return 'competitive-coding'
    return 'research'
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return
      const rect = containerRef.current.getBoundingClientRect()
      const scrollableDistance = rect.height - window.innerHeight
      if (scrollableDistance <= 0) return

      const raw = Math.min(Math.max(-rect.top / scrollableDistance, 0), 1)
      targetProgress.current = raw

      // Check if user is actively scrolling; clear manual override on significant scroll
      if (Math.abs(window.scrollY - lastScrollY.current) > 30) {
        setManualOverride(false)
        lastScrollY.current = window.scrollY
      }
    }

    const updateLoop = () => {
      const diff = targetProgress.current - currentProgress.current
      if (Math.abs(diff) > 0.0002) {
        currentProgress.current += diff * 0.08
      } else {
        currentProgress.current = targetProgress.current
      }

      setScrollProgress(currentProgress.current)

      if (!manualOverride) {
        setActiveDomainId(getDomainFromProgress(currentProgress.current))
      }

      animFrameId.current = requestAnimationFrame(updateLoop)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    animFrameId.current = requestAnimationFrame(updateLoop)
    handleScroll()

    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (animFrameId.current) cancelAnimationFrame(animFrameId.current)
    }
  }, [manualOverride, getDomainFromProgress])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (prefersReducedMotion) return
    const { clientX, clientY, currentTarget } = e
    const { width, height, left, top } = currentTarget.getBoundingClientRect()
    const x = (clientX - left) / width - 0.5
    const y = (clientY - top) / height - 0.5
    setMouseOffset({ x, y })
  }

  const handleSelectDomain = (id: string) => {
    setActiveDomainId(id)
    setManualOverride(true)
  }

  return (
    <section
      id="domains"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative w-full h-[180vh] sm:h-[200vh] bg-[#FAF7EF] select-none"
    >
      {/* Sticky Fullscreen Viewport (100svh) */}
      <div className="sticky top-0 w-full h-[100svh] overflow-hidden flex flex-col justify-between pt-16 sm:pt-20">
        {/* 1. Environmental Layer: Multi-level architecture, glass research pavilions & water */}
        <DomainsEnvironment
          progress={scrollProgress}
          mouseOffset={mouseOffset}
          prefersReducedMotion={prefersReducedMotion}
        />

        {/* 2. Foreground Content: Left-aligned editorial hierarchy (max 560px) */}
        <div className="relative z-30 w-full max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-12 h-full flex items-center">
          <div className="w-full lg:w-[48%]">
            <DomainsContent
              progress={scrollProgress}
              activeDomainId={activeDomainId}
              onSelectDomain={handleSelectDomain}
              onOpenJoinModal={() => {
                const joinBtn = document.querySelector('[data-join-modal-trigger]') as HTMLElement
                joinBtn?.click()
              }}
            />
          </div>
        </div>
      </div>
    </section>
  )
}
