import React, { useRef, useState, useEffect, useCallback } from 'react'
import { WorksWheel } from '@/components/ui/works-wheel'
import { type DomainItem, domainsData } from '@/core/config/domains.data'

interface DomainsHeroProps {
  activeDomain: DomainItem
  onDomainChange: (domain: DomainItem) => void
  onExploreDomain: (domain: DomainItem) => void
}

export const DomainsHero: React.FC<DomainsHeroProps> = ({
  activeDomain,
  onDomainChange,
  onExploreDomain,
}) => {
  const pinContainerRef = useRef<HTMLDivElement>(null)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [isDesktop, setIsDesktop] = useState(true)

  // Detect screen size for responsive layout transform
  useEffect(() => {
    const checkWidth = () => {
      setIsDesktop(window.innerWidth >= 1024)
    }
    checkWidth()
    window.addEventListener('resize', checkWidth)
    return () => window.removeEventListener('resize', checkWidth)
  }, [])

  // Calculate sticky scroll progress (0 when entering to 1 at end of pin)
  useEffect(() => {
    let frameId = 0
    let lastProgressVal = -1

    const handleScroll = () => {
      cancelAnimationFrame(frameId)
      frameId = requestAnimationFrame(() => {
        if (!pinContainerRef.current) return
        const rect = pinContainerRef.current.getBoundingClientRect()
        const totalScrollable = rect.height - window.innerHeight
        if (totalScrollable <= 0) return

        const currentOffset = -rect.top
        const p = Math.min(1, Math.max(0, currentOffset / totalScrollable))
        if (Math.abs(p - lastProgressVal) > 0.001 || p === 0 || p === 1) {
          lastProgressVal = p
          setScrollProgress(p)
        }
      })
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => {
      window.removeEventListener('scroll', handleScroll)
      cancelAnimationFrame(frameId)
    }
  }, [])

  // Calculate middle-to-side shift and drum rotation
  // 1. Progress 0.0 to 0.04: Resting state in the middle (turn = 0, shift = 0)
  // 2. Progress 0.04 to 0.22: First scroll blows open ring to drum and shifts to side
  // 3. Progress 0.22 to 0.88: Turning drum through 5 domains (turn = 1 -> 5)
  // 4. Progress 0.88 to 1.0: End buffer before unpinning to 5 panels
  const shiftProgress = Math.min(1, Math.max(0, (scrollProgress - 0.04) / 0.18))

  let controlledTurn = 0
  if (scrollProgress < 0.04) {
    controlledTurn = 0
  } else if (scrollProgress < 0.22) {
    // Blow open ring to drum item 1
    controlledTurn = (scrollProgress - 0.04) / 0.18
  } else if (scrollProgress <= 0.88) {
    // Smoothly turn through 5 domains
    controlledTurn = 1 + ((scrollProgress - 0.22) / 0.66) * 4
  } else {
    controlledTurn = 5
  }

  // Handle direct turn requests (clicking index items, arrows, or toggle)
  const handleRequestTurn = useCallback(
    (targetTurn: number) => {
      if (!pinContainerRef.current) return
      const rect = pinContainerRef.current.getBoundingClientRect()
      const totalScrollable = rect.height - window.innerHeight
      if (totalScrollable <= 0) return

      let targetP = 0
      if (targetTurn <= 0) {
        targetP = 0
      } else if (targetTurn >= 5) {
        targetP = 0.88
      } else {
        targetP = 0.22 + ((targetTurn - 1) / 4) * 0.66
      }

      const targetScrollY = window.scrollY + rect.top + targetP * totalScrollable
      window.scrollTo({
        top: targetScrollY,
        behavior: 'smooth',
      })
    },
    []
  )

  const handleScrollDownToPanels = (e: React.MouseEvent) => {
    e.preventDefault()
    const target = document.getElementById('domain-panels')
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' })
    }
  }

  // Visual layout interpolation:
  // When shiftProgress = 0: Wheel is in the middle, left text is hidden
  // When shiftProgress = 1: Wheel is on the right side, left text is visible
  const leftOpacity = shiftProgress
  const leftTranslateX = isDesktop ? -36 * (1 - shiftProgress) : 0
  const wheelTranslateX = isDesktop ? -44 * (1 - shiftProgress) : 0
  const wheelScale = 1 + 0.04 * (1 - shiftProgress)

  return (
    <div
      ref={pinContainerRef}
      className="relative w-full h-[260vh] sm:h-[290vh] bg-[#FAF7EF]"
    >
      {/* Sticky Fullscreen Stage */}
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
        {/* Background Architectural Grid Accent */}
        <div className="absolute inset-0 opacity-[0.025] bg-[linear-gradient(to_right,#071B34_1px,transparent_1px),linear-gradient(to_bottom,#071B34_1px,transparent_1px)] bg-[size:44px_44px] pointer-events-none" />

        {/* Subtle Right Campus Silhouette Backdrop */}
        <div className="absolute top-0 right-0 w-[45%] h-full opacity-15 pointer-events-none bg-gradient-to-l from-[#1764BD]/20 to-transparent blur-3xl" />

        {/* Top-Right Floating Label Watermark */}
        <div className="hidden xl:block absolute top-6 right-8 text-right z-20 pointer-events-none">
          <div className="text-[10px] font-mono tracking-widest text-[#536273] uppercase leading-tight">
            IDEAS
            <br />
            PEOPLE
            <br />
            COMMUNITY
            <br />
            IMPACT
          </div>
        </div>

        {/* Stage Content Container */}
        <div className="max-w-[1440px] w-full mx-auto px-4 sm:px-6 lg:px-10 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 items-center">
            
            {/* Left-side Content (Col 1-5): Fades and slides in as wheel shifts to side */}
            <div
              className="lg:col-span-5 flex flex-col justify-center space-y-5 will-change-transform"
              style={{
                opacity: leftOpacity,
                transform: `translateX(${leftTranslateX}px)`,
                pointerEvents: leftOpacity > 0.4 ? 'auto' : 'none',
              }}
            >
              {/* Eyebrow */}
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#1764BD]" />
                <span className="text-xs sm:text-[13px] font-bold uppercase tracking-[0.2em] text-[#1764BD]">
                  OUR DOMAINS
                </span>
              </div>

              {/* Main Editorial Headline */}
              <h1 className="font-display text-[2.5rem] sm:text-[3.25rem] md:text-[4rem] lg:text-[4.5rem] font-black tracking-[-0.04em] text-[#071B34] leading-[0.92]">
                <span>EXPLORE</span>
                <br />
                <span>OUR</span>
                <br />
                <span className="text-[#1764BD]">DOMAINS.</span>
              </h1>

              {/* Supporting Text */}
              <p className="font-body text-[14px] sm:text-[15.5px] leading-[1.6] text-[#536273] max-w-[440px]">
                Different interests. One community. Explore the domains at ACM NMIET and find where your curiosity turns into impact.
              </p>

              {/* Three Compact Metrics */}
              <div className="grid grid-cols-3 gap-3 pt-2 max-w-[420px] border-t border-[#071B34]/10">
                <div className="flex flex-col">
                  <span className="font-display font-black text-2xl sm:text-3xl text-[#071B34]">
                    05
                  </span>
                  <span className="text-[11px] sm:text-[12px] text-[#536273] font-medium leading-tight mt-0.5">
                    Core Domains
                  </span>
                </div>

                <div className="flex flex-col">
                  <span className="font-display font-black text-2xl sm:text-3xl text-[#071B34]">
                    ∞
                  </span>
                  <span className="text-[11px] sm:text-[12px] text-[#536273] font-medium leading-tight mt-0.5">
                    Opportunities
                  </span>
                </div>

                <div className="flex flex-col">
                  <span className="font-display font-black text-2xl sm:text-3xl text-[#071B34]">
                    01
                  </span>
                  <span className="text-[11px] sm:text-[12px] text-[#536273] font-medium leading-tight mt-0.5">
                    Community
                  </span>
                </div>
              </div>

              {/* Scroll Indicator Prompt */}
              <div className="pt-1">
                <a
                  href="#domain-panels"
                  onClick={handleScrollDownToPanels}
                  className="inline-flex items-center gap-2 text-xs font-mono font-bold tracking-wider text-[#1764BD] hover:text-[#071B34] transition-colors group"
                >
                  <div className="w-4 h-6 rounded-full border border-[#1764BD] flex items-start justify-center p-1">
                    <span className="w-1 h-1.5 rounded-full bg-[#1764BD] animate-bounce" />
                  </div>
                  <span>SCROLL TO EXPLORE ALL ↓</span>
                </a>
              </div>
            </div>

            {/* Right-side Content (Col 6-12): Starts in MIDDLE, shifts to SIDE on scroll */}
            <div
              className="lg:col-span-7 relative flex items-center justify-center will-change-transform"
              style={{
                transform: `translateX(${wheelTranslateX}%) scale(${wheelScale})`,
              }}
            >
              <WorksWheel
                domains={domainsData}
                activeDomainId={activeDomain.id}
                onDomainChange={onDomainChange}
                onExploreDomain={onExploreDomain}
                controlledTurn={controlledTurn}
                onRequestTurn={handleRequestTurn}
              />
            </div>

          </div>
        </div>

        {/* Subtle Bottom Progress Track */}
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 z-30 flex items-center gap-1.5 bg-white/80 backdrop-blur-sm px-3 py-1 rounded-full border border-[#071B34]/10 shadow-sm">
          <span className="text-[9px] font-mono uppercase tracking-widest text-[#536273]">
            {shiftProgress < 0.2 ? 'SCROLL TO EXPAND' : `DOMAIN ${activeDomain.number}`}
          </span>
          <div className="w-16 h-1 bg-[#071B34]/15 rounded-full overflow-hidden">
            <div
              className="h-full bg-[#1764BD] rounded-full transition-all duration-150"
              style={{ width: `${Math.round(scrollProgress * 100)}%` }}
            />
          </div>
        </div>

      </div>
    </div>
  )
}

export default DomainsHero
