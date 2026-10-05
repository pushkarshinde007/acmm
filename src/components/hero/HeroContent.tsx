import React from 'react'
import { ArrowRight, ArrowDown } from 'lucide-react'
import { siteConfig } from '@/core/config/site.config'
import { useExperience } from '@/core/context/ExperienceContext'

export const HeroContent: React.FC<{ scrollProgress?: number }> = ({ scrollProgress = 0 }) => {
  const { openJoinModal } = useExperience()

  const handleExploreClick = () => {
    const el = document.getElementById('storyboard-section')
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    } else {
      window.scrollBy({ top: window.innerHeight * 0.85, behavior: 'smooth' })
    }
  }

  // Soft fade and subtle translation as scroll progress approaches 0.6 - 1.0
  const opacity = Math.max(1 - scrollProgress * 1.6, 0)
  const translateY = scrollProgress * -30

  return (
    <div
      className="relative z-30 w-full max-w-[560px] pointer-events-auto flex flex-col justify-between h-full pt-24 sm:pt-28 md:pt-32 pb-8 sm:pb-12"
      style={{
        opacity,
        transform: `translateY(${translateY}px)`,
        transition: 'opacity 0.2s ease-out, transform 0.2s ease-out',
      }}
    >
      <div className="space-y-5 sm:space-y-6">
        {/* Eyebrow: Small, uppercase, medium letter spacing, cobalt blue */}
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#1457A6]" />
          <span className="text-[12px] sm:text-[13px] font-bold tracking-[0.16em] uppercase text-[#1457A6]">
            {siteConfig.hero.eyebrow || siteConfig.chapter.eyebrow}
          </span>
        </div>

        {/* Primary Headline: BEYOND THE SCROLL. (Exact two lines) */}
        <h1 className="font-display text-[3.5rem] xs:text-[4.25rem] sm:text-[5.5rem] md:text-[6.25rem] lg:text-[7.25rem] font-[800] tracking-[-0.04em] text-[#071B34] leading-[0.92] select-text">
          <span>{siteConfig.hero.headlineLine1}</span>
          <br />
          <span>{siteConfig.hero.headlineLine2.replace('.', '')}</span>
          <span className="text-[#1457A6]">.</span>
        </h1>

        {/* Subheading */}
        <p className="font-subheading text-lg sm:text-xl font-semibold text-[#0B2D55] tracking-tight">
          {siteConfig.hero.subheading}
        </p>

        {/* Supporting Paragraph: max-width 480px, muted dark blue */}
        <p className="font-body text-[15px] sm:text-[16.5px] leading-[1.65] text-[#536273] max-w-[480px]">
          {siteConfig.hero.supportingParagraph}
        </p>

        {/* CTA Buttons: EXPLORE THE JOURNEY → & JOIN ACM */}
        <div className="flex flex-wrap items-center gap-3.5 sm:gap-4 pt-2">
          {/* Primary CTA */}
          <button
            onClick={handleExploreClick}
            className="group inline-flex items-center justify-center gap-2.5 h-[52px] px-7 rounded-md font-semibold text-white bg-[#071B34] hover:bg-[#1457A6] transition-all duration-200 shadow-sm hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1457A6] text-sm tracking-wide"
          >
            <span>{siteConfig.hero.primaryCta}</span>
            <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
          </button>

          {/* Secondary CTA */}
          <button
            onClick={openJoinModal}
            className="inline-flex items-center justify-center h-[52px] px-7 rounded-md font-semibold text-[#071B34] bg-[#FAF7EF]/80 hover:bg-[#FAF7EF] border border-[#071B34]/25 hover:border-[#1457A6] hover:text-[#1457A6] transition-all duration-200 shadow-sm hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1457A6] text-sm tracking-wide"
          >
            <span>{siteConfig.hero.secondaryCta}</span>
          </button>
        </div>
      </div>

      {/* Scroll Indicator: Placed near lower-left beneath the hero text */}
      <div className="pt-8 sm:pt-12 flex items-center gap-3">
        <button
          onClick={handleExploreClick}
          className="group flex items-center gap-2 text-xs font-semibold tracking-[0.14em] uppercase text-[#536273] hover:text-[#071B34] transition-colors focus:outline-none"
        >
          <span>{siteConfig.hero.scrollIndicator}</span>
          <div className="w-6 h-6 rounded-full border border-[#071B34]/20 flex items-center justify-center transition-transform duration-300 group-hover:border-[#1457A6] group-hover:text-[#1457A6]">
            <ArrowDown className="w-3.5 h-3.5 animate-bounce-subtle" />
          </div>
        </button>
      </div>
    </div>
  )
}
