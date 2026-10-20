import React from 'react'
import { ArrowRight, GraduationCap, Hammer, Users, Rocket } from 'lucide-react'
import { siteConfig } from '@/core/config/site.config'
import heroCampusImg from '@/assets/about/about_hero_campus.jpg'

export const AboutHeroSplit: React.FC = () => {
  const iconMap = {
    GraduationCap,
    Hammer,
    Users,
    Rocket,
  }

  const handleScrollToStory = (e: React.MouseEvent) => {
    e.preventDefault()
    const target = document.getElementById('our-story')
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const handleScrollToTeam = (e: React.MouseEvent) => {
    e.preventDefault()
    const target = document.getElementById('team')
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section className="relative w-full bg-[#FAF7EF] pt-8 pb-12 sm:pb-16 overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          {/* Left Content Panel (Col 1-7) */}
          <div className="lg:col-span-7 flex flex-col justify-center space-y-6 sm:space-y-7 z-10">
            {/* Small Blue Eyebrow */}
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#1764BD]" />
              <span className="text-xs sm:text-[13px] font-bold uppercase tracking-[0.2em] text-[#1764BD]">
                {siteConfig.about.eyebrow}
              </span>
            </div>

            {/* Main Editorial Headline */}
            <h1 className="font-display text-[2.75rem] sm:text-[3.75rem] md:text-[4.5rem] lg:text-[4.75rem] font-black tracking-[-0.04em] text-[#071B34] leading-[0.94]">
              <span>{siteConfig.about.headlineLine1}</span>
              <br />
              <span>{siteConfig.about.headlineLine2}</span>
              <br />
              <span className="text-[#1764BD]">{siteConfig.about.headlineAccent}</span>
            </h1>

            {/* Supporting Description */}
            <p className="font-body text-[15px] sm:text-[16.5px] leading-[1.65] text-[#536273] max-w-[580px]">
              {siteConfig.about.description}
            </p>

            {/* Four Feature Columns */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 pt-2">
              {siteConfig.about.pillars.map((pillar) => {
                const IconComponent = iconMap[pillar.icon as keyof typeof iconMap] || Users
                return (
                  <div
                    key={pillar.id}
                    className="group p-3 sm:p-3.5 rounded-xl bg-white/70 border border-[#071B34]/10 hover:border-[#1764BD]/40 hover:bg-white transition-all duration-200 shadow-[0_2px_10px_rgba(7,27,52,0.02)] hover:shadow-md hover:-translate-y-0.5"
                  >
                    <div className="w-9 h-9 rounded-lg border border-[#1764BD]/30 bg-[#1764BD]/5 text-[#1764BD] flex items-center justify-center mb-2.5 transition-colors group-hover:bg-[#1764BD] group-hover:text-white">
                      <IconComponent className="w-4 h-4" />
                    </div>
                    <div className="font-display text-[12.5px] sm:text-[13px] font-bold text-[#071B34] tracking-tight uppercase">
                      {pillar.title}
                    </div>
                    <div className="text-[11px] sm:text-[11.5px] text-[#536273] leading-snug mt-1">
                      {pillar.description}
                    </div>
                  </div>
                )
              })}
            </div>

            {/* CTAs: OUR JOURNEY → & MEET THE TEAM */}
            <div className="flex items-center gap-5 pt-2">
              <a
                href="#our-story"
                onClick={handleScrollToStory}
                className="inline-flex items-center justify-center gap-2.5 h-12 px-7 rounded-md font-semibold text-white bg-[#071B34] hover:bg-[#1764BD] transition-all duration-200 shadow-sm hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 text-sm tracking-wide group"
              >
                <span>{siteConfig.about.primaryCta}</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
              </a>

              <a
                href="#team"
                onClick={handleScrollToTeam}
                className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#071B34] hover:text-[#1764BD] transition-colors py-2 border-b-2 border-transparent hover:border-[#1764BD]"
              >
                {siteConfig.about.secondaryCta}
              </a>
            </div>
          </div>

          {/* Right Visual Panel (Col 8-12): Cinematic Campus Illustration */}
          <div className="lg:col-span-5 relative w-full h-[360px] sm:h-[460px] lg:h-[560px] rounded-2xl overflow-hidden shadow-2xl border border-[#071B34]/10 group">
            {/* The Campus Art Image */}
            <img
              src={heroCampusImg}
              alt="ACM NMIET Campus Building and Community"
              className="w-full h-full object-cover object-[60%_35%] transition-transform duration-700 ease-out group-hover:scale-105"
            />

            {/* Subtle soft gradient fade into ivory at left edge */}
            <div className="hidden lg:block absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[#FAF7EF] via-[#FAF7EF]/40 to-transparent pointer-events-none" />

            {/* Top and Bottom atmospheric vignettes */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#071B34]/50 via-transparent to-transparent pointer-events-none" />

            {/* Floating Architectural Badge — Top Right */}
            <div className="absolute top-4 right-4 bg-[#071B34]/85 backdrop-blur-md border border-white/20 text-white px-3.5 py-1.5 rounded-full text-[10.5px] font-mono tracking-wider uppercase flex items-center gap-2 shadow-lg">
              <span className="w-1.5 h-1.5 rounded-full bg-[#1764BD] animate-pulse" />
              <span>IDEAS • PEOPLE • IMPACT</span>
            </div>

            {/* Floating Banner Badge — Bottom Left */}
            <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-md border border-[#071B34]/10 rounded-xl p-3 flex items-center justify-between shadow-lg">
              <div className="flex items-center gap-2.5">
                <img
                  src="/assets/logo/acm_nmiet_logo.png"
                  alt="ACM NMIET"
                  className="w-8 h-8 object-contain"
                />
                <div>
                  <div className="text-[12px] font-bold text-[#071B34] leading-tight">
                    NMIET Student Chapter
                  </div>
                  <div className="text-[10px] text-[#536273] font-medium leading-none mt-0.5">
                    Building a Brighter Tomorrow
                  </div>
                </div>
              </div>
              <span className="text-[11px] font-mono font-semibold text-[#1764BD] bg-[#1764BD]/10 px-2 py-0.5 rounded">
                &lt;/&gt;
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
