import React from 'react'
import { ArrowRight, Compass } from 'lucide-react'
import { siteConfig } from '@/core/config/site.config'
import { NmietConcepts } from '@/components/nmiet/NmietConcepts'
import { useExperience } from '@/core/context/ExperienceContext'

interface NmietContentProps {
  progress: number // 0 to 1
  prefersReducedMotion: boolean
}

export const NmietContent: React.FC<NmietContentProps> = ({ progress, prefersReducedMotion }) => {
  const { openJoinModal } = useExperience()

  // Content emerges naturally between progress 0.60 and 1.00
  const contentProgress = prefersReducedMotion
    ? 1
    : Math.min(Math.max((progress - 0.55) / 0.35, 0), 1)

  const translateY = prefersReducedMotion ? 0 : (1 - contentProgress) * 28

  const handleDiscoverClick = () => {
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
        {/* 1. Small Label: 03 • NMIET */}
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#1457A6]" />
          <span className="text-xs font-bold uppercase tracking-[0.18em] text-[#1457A6]">
            {siteConfig.nmiet.number} • {siteConfig.nmiet.label}
          </span>
          <span className="text-xs text-[#536273]">•</span>
          <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#536273]">
            {siteConfig.nmiet.sublabel}
          </span>
        </div>

        {/* 2. Main Headline: A PLACE TO LEARN. / A PLACE TO CREATE. (Semantic H2) */}
        <h2 className="font-display text-[2.75rem] xs:text-[3.25rem] sm:text-[4rem] md:text-[5rem] font-[800] tracking-[-0.04em] text-[#071B34] leading-[0.94]">
          <span>{siteConfig.nmiet.headlineLine1}</span>
          <br />
          <span>{siteConfig.nmiet.headlineLine2.replace('.', '')}</span>
          <span className="text-[#1457A6]">.</span>
        </h2>

        {/* 3. Supporting Paragraph */}
        <p className="font-body text-[14.5px] sm:text-[16px] leading-[1.65] text-[#536273] max-w-[500px]">
          {siteConfig.nmiet.paragraph}
        </p>

        {/* 4. Three Concepts: 01 LEARNING, 02 INNOVATION, 03 OPPORTUNITY */}
        <NmietConcepts />

        {/* 5. CTA Buttons */}
        <div className="flex flex-wrap items-center gap-3 sm:gap-4 pt-3">
          <button
            onClick={openJoinModal}
            className="group inline-flex items-center justify-center gap-2.5 h-[50px] px-7 rounded-md font-semibold text-white bg-[#071B34] hover:bg-[#1457A6] transition-all duration-200 shadow-sm hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1457A6] text-sm tracking-wide"
          >
            <span>{siteConfig.nmiet.cta}</span>
            <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
          </button>

          <button
            onClick={handleDiscoverClick}
            className="inline-flex items-center justify-center gap-2 h-[50px] px-6 rounded-md font-semibold text-[#071B34] bg-[#FAF7EF]/85 hover:bg-[#FAF7EF] border border-[#071B34]/25 hover:border-[#1457A6] hover:text-[#1457A6] transition-all duration-200 shadow-sm hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1457A6] text-sm tracking-wide"
          >
            <Compass className="w-4 h-4 text-[#1457A6]" />
            <span>CAMPUS MAP</span>
          </button>
        </div>
      </div>
    </div>
  )
}
