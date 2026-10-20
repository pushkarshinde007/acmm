import React from 'react'
import { Navbar } from '@/components/ui/navigation/Navbar'
import { MobileDrawer } from '@/components/ui/navigation/MobileDrawer'
import { HeroScene } from '@/components/hero/HeroScene'
import { AboutTransition } from '@/components/about/AboutTransition'
import { DomainsPage } from '@/components/domains/DomainsPage'
import { EventsPage } from '@/components/events/EventsPage'
import Team from '@/components/ui/team-01'
import PartnersSection from '@/components/ui/partners'
import { GallerySection } from '@/components/gallery/GallerySection'
import { ContactSection } from '@/components/contact/ContactSection'
import { CourageFooterSection } from '@/components/footer/CourageFooterSection'
import { VideoLoader } from '@/components/ui/common/VideoLoader'
import { JoinModal } from '@/components/ui/common/JoinModal'


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

        {/* Phase 7: Gallery — Exact Replication from Reference */}
        <GallerySection />

        {/* Phase 8: Contact — Recreated from ACM-VIT Reference */}
        <ContactSection />
      </main>

      {/* 3. Final Footer Section with COURAGE Crack-Open Animation & Revealed Banner */}
      <CourageFooterSection />

      {/* 4. Intake Join Modal */}
      <JoinModal />
    </div>
  )
}
