import React from 'react'
import { Navbar } from '@/components/ui/navigation/Navbar'
import { MobileDrawer } from '@/components/ui/navigation/MobileDrawer'
import { HeroScene } from '@/components/hero/HeroScene'
import { AboutTransition } from '@/components/about/AboutTransition'
import { DomainsPage } from '@/components/domains/DomainsPage'
import { EventsPage } from '@/components/events/EventsPage'
import Team from '@/components/ui/team-01'
import PartnersSection from '@/components/ui/partners'
import { VideoLoader } from '@/components/ui/common/VideoLoader'
import { JoinModal } from '@/components/ui/common/JoinModal'
import { siteConfig } from '@/core/config/site.config'

export const HomePage: React.FC = () => {
  return (
    <div className="relative min-h-screen bg-[#FAF7EF] text-[#102033] flex flex-col justify-between selection:bg-[#1457A6] selection:text-white">
      {/* 0. Introductory 5-Second Video Loader */}
      <VideoLoader durationSeconds={5} />

      {/* 1. Header & Navigation */}
      <Navbar />
      <MobileDrawer />

      {/* 2. Main Landmark */}
      <main id="main-content" className="flex-grow">
        {/* Phase 1: Cinematic Hero Scene */}
        <HeroScene />

        {/* Phase 2: About ACM NMIET */}
        <AboutTransition />

        {/* Phase 3: Domains — The Five Core Domains with 3D WorksWheel */}
        <DomainsPage />

        {/* Phase 4: Events — Disc Cascade Carousel & Event Report Journey */}
        <EventsPage />

        {/* Phase 5: Team — Chapter Leadership & Core Team */}
        <Team id="team" />

        {/* Phase 6: Partners — Industry & Ecosystem Partners Marquee */}
        <PartnersSection id="partners" />
      </main>

      {/* 3. Minimal Clean Architectural Footer */}
      <footer id="contact" className="w-full bg-[#FAF7EF] border-t border-[#071B34]/10 py-6 px-4 sm:px-6 lg:px-10 text-xs text-[#536273]">
        <div className="max-w-[1440px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <img
              src="/assets/logo/acm_nmiet_logo.png"
              alt="ACM NMIET Logo"
              className="w-8 h-8 object-contain"
            />
            <div className="flex items-center gap-2">
              <span className="font-display font-bold text-[#071B34]">
                {siteConfig.chapter.name}
              </span>
              <span>•</span>
              <span>{siteConfig.chapter.subname}</span>
            </div>
          </div>

          <p className="text-center sm:text-right">
            {siteConfig.chapter.institution}
          </p>
        </div>
      </footer>

      {/* 4. Intake Join Modal */}
      <JoinModal />
    </div>
  )
}
