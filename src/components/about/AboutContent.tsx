import React from 'react'
import { ArrowRight, Users } from 'lucide-react'
import { siteConfig } from '@/core/config/site.config'
import { AboutPillars } from '@/components/about/AboutPillars'
import { useExperience } from '@/core/context/ExperienceContext'

interface AboutContentProps {
  progress: number // 0 to 1
  prefersReducedMotion: boolean
}

export const AboutContent: React.FC<AboutContentProps> = ({ progress, prefersReducedMotion }) => {
  const { openJoinModal } = useExperience()

  // Content becomes dominant and emerges when student reaches atrium (progress 0.60 to 1.00)
  const contentProgress = prefersReducedMotion
    ? 1
    : Math.min(Math.max((progress - 0.55) / 0.35, 0), 1)

  const translateY = prefersReducedMotion ? 0 : (1 - contentProgress) * 28

  const handleOurCommunityClick = () => {
    const el = document.getElementById('storyboard-section')
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <div
      className="relative z-30 w-full max-w-[560px] pointer-events-auto flex flex-col justify-center py-8 md:py-12 transition-all duration-700 ease-out"
      style={{
        opacity: contentProgress,
        transform: `translateY(${translateY}px)`,
        pointerEvents: contentProgress > 0.4 ? 'auto' : 'none',
      }}
    >
      <div className="space-y-4 sm:space-y-5">
        {/* 1. Small Label: ABOUT ACM NMIET */}
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#1457A6]" />
          <span className="text-xs font-bold uppercase tracking-[0.18em] text-[#1457A6]">
            {siteConfig.about.label}
          </span>
          <span className="text-xs text-[#536273]">•</span>
          <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#536273]">
            {siteConfig.chapter.institution}
          </span>
        </div>

        {/* 2. Main Headline (Three lines on desktop): A COMMUNITY / THAT BUILDS / TOMORROW. */}
        <h2 className="font-display text-[2.75rem] xs:text-[3.25rem] sm:text-[4.25rem] md:text-[5.25rem] font-[800] tracking-[-0.04em] text-[#071B34] leading-[0.92]">
          <span>{siteConfig.about.headlineLine1}</span>
          <br />
          <span>{siteConfig.about.headlineLine2}</span>
          <br />
          <span>{siteConfig.about.headlineLine3.replace('.', '')}</span>
          <span className="text-[#1457A6]">.</span>
        </h2>

        {/* 3. Supporting Statement */}
        <p className="font-subheading text-base sm:text-xl font-bold text-[#0B2D55] tracking-tight leading-snug">
          {siteConfig.about.statement}
        </p>

        {/* 4. Supporting Paragraph (max-width 500px, muted dark blue) */}
        <p className="font-body text-[14px] sm:text-[15.5px] leading-[1.65] text-[#536273] max-w-[500px]">
          {siteConfig.about.description}
        </p>

        {/* 5. Three Community Pillars: 01 LEARN, 02 BUILD, 03 CONNECT */}
        <AboutPillars />

        {/* 6. CTAs: EXPLORE ACM → & OUR COMMUNITY */}
        <div className="flex flex-wrap items-center gap-3 sm:gap-4 pt-3">
          {/* Primary CTA */}
          <button
            onClick={openJoinModal}
            className="group inline-flex items-center justify-center gap-2.5 h-[50px] px-7 rounded-md font-semibold text-white bg-[#071B34] hover:bg-[#1457A6] transition-all duration-200 shadow-sm hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1457A6] text-sm tracking-wide"
          >
            <span>{siteConfig.about.primaryCta}</span>
            <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
          </button>

          {/* Secondary CTA: OUR COMMUNITY */}
          <button
            onClick={handleOurCommunityClick}
            className="inline-flex items-center justify-center gap-2 h-[50px] px-6 rounded-md font-semibold text-[#071B34] bg-[#FAF7EF]/85 hover:bg-[#FAF7EF] border border-[#071B34]/25 hover:border-[#1457A6] hover:text-[#1457A6] transition-all duration-200 shadow-sm hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1457A6] text-sm tracking-wide"
          >
            <Users className="w-4 h-4 text-[#1457A6]" />
            <span>{siteConfig.about.secondaryCta}</span>
          </button>
        </div>
      </div>
    </div>
  )
}
