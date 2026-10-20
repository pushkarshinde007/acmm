import React, { useEffect } from 'react'
import { Navbar } from '@/components/ui/navigation/Navbar'
import { MobileDrawer } from '@/components/ui/navigation/MobileDrawer'
import { AboutTransition } from '@/components/about/AboutTransition'
import { JoinModal } from '@/components/ui/common/JoinModal'
import { siteConfig } from '@/core/config/site.config'
import { useNavigation } from '@/core/context/NavigationContext'

export const AboutPage: React.FC = () => {
  const { setActiveItem } = useNavigation()

  useEffect(() => {
    setActiveItem('About')
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [setActiveItem])

  return (
    <div className="relative min-h-screen bg-[#FAF7EF] text-[#102033] flex flex-col justify-between selection:bg-[#1457A6] selection:text-white">
      {/* 1. Header & Navigation */}
      <Navbar />
      <MobileDrawer />

      {/* 2. Main Landmark */}
      <main id="main-content" className="flex-grow pt-16">
        <AboutTransition />
      </main>

      {/* 3. Architectural Footer */}
      <footer className="w-full bg-[#FAF7EF] border-t border-[#071B34]/10 py-6 px-4 sm:px-6 lg:px-10 text-xs text-[#536273]">
        <div className="max-w-[1440px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-display font-bold text-[#071B34]">
              {siteConfig.chapter.name}
            </span>
            <span>•</span>
            <span>{siteConfig.chapter.subname}</span>
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

export default AboutPage
