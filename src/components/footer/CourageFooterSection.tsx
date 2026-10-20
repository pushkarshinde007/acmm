import React, { useEffect, useRef, useCallback } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { siteConfig } from '@/core/config/site.config'
import './courage-footer.css'

const CURRENT_YEAR = 2026

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
  ;(window as unknown as { ScrollTrigger: typeof ScrollTrigger }).ScrollTrigger = ScrollTrigger
}

export const CourageFooterSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null)
  const stickyRef = useRef<HTMLDivElement>(null)
  const stageRef = useRef<HTMLDivElement>(null)
  const bannerRef = useRef<HTMLDivElement>(null)
  const leftHalfRef = useRef<HTMLDivElement>(null)
  const rightHalfRef = useRef<HTMLDivElement>(null)
  const crackSvgRef = useRef<SVGSVGElement>(null)
  const crackPathRef = useRef<SVGPathElement>(null)
  const crackGlowRef = useRef<SVGPathElement>(null)
  const footerBarRef = useRef<HTMLDivElement>(null)

  // Smooth scroll click handler
  const handleToggleOpen = useCallback(() => {
    if (!sectionRef.current) return
    const rect = sectionRef.current.getBoundingClientRect()
    const currentScroll = window.scrollY
    const targetScroll = currentScroll + rect.top + rect.height * 0.75
    window.scrollTo({
      top: targetScroll,
      behavior: 'smooth',
    })
  }, [])

  useEffect(() => {
    if (!sectionRef.current || !stickyRef.current || !bannerRef.current) return

    // Path length for SVG crack animation
    const pathLength = crackPathRef.current?.getTotalLength() || 600

    // Initial setup: Crack line hidden, Banner masked tightly in center
    gsap.set([crackPathRef.current, crackGlowRef.current], {
      strokeDasharray: pathLength,
      strokeDashoffset: pathLength,
      opacity: 0,
    })

    if (crackSvgRef.current) {
      crackSvgRef.current.style.visibility = 'hidden'
      crackSvgRef.current.style.opacity = '0'
    }

    gsap.set(bannerRef.current, {
      clipPath: 'inset(0% 50% 0% 50% round 16px)',
      scale: 0.95,
      opacity: 0,
    })

    gsap.set([leftHalfRef.current, rightHalfRef.current], {
      x: 0,
      y: 0,
      rotation: 0,
      opacity: 1,
    })

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.6,
          onUpdate: (self) => {
            const p = self.progress
            if (crackSvgRef.current) {
              // Only visible strictly during the central cracking phase (0.18 -> 0.48)
              if (p >= 0.18 && p < 0.48) {
                crackSvgRef.current.style.visibility = 'visible'
              } else {
                crackSvgRef.current.style.visibility = 'hidden'
                crackSvgRef.current.style.opacity = '0'
              }
            }
          },
        },
      })

      // -------------------------------------------------------------------
      // Step 1 (0.00 -> 0.20): COURAGE holds steady and intact
      // -------------------------------------------------------------------
      tl.to(
        {},
        {
          duration: 0.2,
        },
        0
      )

      // -------------------------------------------------------------------
      // Step 2 (0.20 -> 0.40): Single middle crack develops down the center
      // -------------------------------------------------------------------
      tl.to(
        crackSvgRef.current,
        {
          opacity: 1,
          duration: 0.04,
          ease: 'power1.in',
        },
        0.2
      )

      tl.to(
        [crackPathRef.current, crackGlowRef.current],
        {
          opacity: 1,
          duration: 0.04,
          ease: 'power1.in',
        },
        0.2
      )

      tl.to(
        [crackPathRef.current, crackGlowRef.current],
        {
          strokeDashoffset: 0,
          duration: 0.16,
          ease: 'power2.inOut',
        },
        0.22
      )

      // Subtle initial rumble / tremor right as the crack reaches the bottom
      tl.to(
        stageRef.current,
        {
          x: '+=3',
          y: '-=2',
          duration: 0.04,
          repeat: 3,
          yoyo: true,
          ease: 'none',
        },
        0.36
      )

      // -------------------------------------------------------------------
      // Step 3 (0.40 -> 0.85): Left & Right portions separate and open outward
      // Concurrently: Banner expands from the central opening like a mouth
      // -------------------------------------------------------------------
      // Left half shifts left and tilts slightly
      tl.to(
        leftHalfRef.current,
        {
          xPercent: -55,
          rotation: -3.5,
          opacity: 0.15,
          duration: 0.45,
          ease: 'power2.inOut',
        },
        0.4
      )

      // Right half shifts right and tilts slightly
      tl.to(
        rightHalfRef.current,
        {
          xPercent: 55,
          rotation: 3.5,
          opacity: 0.15,
          duration: 0.45,
          ease: 'power2.inOut',
        },
        0.4
      )

      // Middle crack line fades out completely as the word separates
      tl.to(
        [crackPathRef.current, crackGlowRef.current, crackSvgRef.current],
        {
          opacity: 0,
          duration: 0.1,
          ease: 'power1.out',
        },
        0.4
      )

      // Banner reveal: expands progressively from center slit to full view
      tl.to(
        bannerRef.current,
        {
          opacity: 1,
          duration: 0.1,
          ease: 'power1.in',
        },
        0.4
      )

      tl.to(
        bannerRef.current,
        {
          clipPath: 'inset(0% 0% 0% 0% round 16px)',
          scale: 1.0,
          duration: 0.45,
          ease: 'power2.out',
        },
        0.4
      )

      // -------------------------------------------------------------------
      // Step 4 (0.85 -> 1.00): Complete reveal settles; COURAGE completely clears
      // -------------------------------------------------------------------
      tl.to(
        [leftHalfRef.current, rightHalfRef.current],
        {
          opacity: 0,
          duration: 0.15,
          ease: 'power1.out',
        },
        0.85
      )

      tl.to(
        footerBarRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.15,
          ease: 'power1.out',
        },
        0.85
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <footer
      id="courage-footer"
      ref={sectionRef}
      className="courage-footer-section"
      aria-label="Final Footer Banner"
    >
      <div ref={stickyRef} className="courage-sticky-container">
        {/* Ambient atmospheric backdrop */}
        <div className="courage-bg-glow" />

        {/* Main Interactive Animation Stage */}
        <div
          ref={stageRef}
          className="courage-stage"
          onClick={handleToggleOpen}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') handleToggleOpen()
          }}
          aria-label="Click to reveal final banner"
        >
          {/* 1. Underlying Banner Layer (ACM Official Banner) */}
          <div ref={bannerRef} className="courage-banner-wrapper">
            <img
              src="/footer/acm_banner.png"
              alt="ACM NMIET Community Banner"
              className="courage-banner-img"
              loading="lazy"
              decoding="async"
            />
          </div>

          {/* 2. COURAGE Typography Layer — Split Into Left and Right Halves */}
          <div className="courage-word-container">
            {/* Left Half ("COU" + Left edge of "R") */}
            <div ref={leftHalfRef} className="courage-half courage-half-left">
              <h2 className="courage-text">COURAGE</h2>
            </div>

            {/* Right Half (Right edge of "R" + "AGE") */}
            <div ref={rightHalfRef} className="courage-half courage-half-right">
              <h2 className="courage-text">COURAGE</h2>
            </div>
          </div>

          {/* 3. Central Fissure / Crack SVG Animation */}
          <svg
            ref={crackSvgRef}
            className="courage-crack-svg"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            {/* Outer Glow Path */}
            <path
              ref={crackGlowRef}
              className="courage-crack-glow"
              d="M 50 0 L 49.2 16 L 51.5 32 L 48.5 48 L 52 64 L 49 82 L 50.8 100"
              fill="none"
              vectorEffect="non-scaling-stroke"
            />
            {/* Core Bright Fracture Path */}
            <path
              ref={crackPathRef}
              className="courage-crack-line"
              d="M 50 0 L 49.2 16 L 51.5 32 L 48.5 48 L 52 64 L 49 82 L 50.8 100"
              fill="none"
              vectorEffect="non-scaling-stroke"
            />
          </svg>
        </div>

        {/* 4. Bottom Footer Bar */}
        <div ref={footerBarRef} className="courage-footer-bar">
          <div className="courage-footer-tagline">
            <img
              src="/assets/logo/acm_nmiet_logo.png"
              alt="ACM NMIET Logo"
              className="w-7 h-7 object-contain"
            />
            <span className="w-2 h-2 rounded-full bg-[#FF6B52] animate-pulse" />
            <span>{siteConfig.chapter.name} • {siteConfig.chapter.subname}</span>
          </div>

          <div className="courage-footer-scroll-hint">
            <span>Scroll to crack open • Reveal Banner</span>
          </div>

          <div className="text-right text-[11px] text-stone-400">
            © {CURRENT_YEAR} {siteConfig.chapter.name}. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  )
}
