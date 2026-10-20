import React from 'react'
import { ArrowRight, Menu, X } from 'lucide-react'
import { siteConfig } from '@/core/config/site.config'
import { useNavigation } from '@/core/context/NavigationContext'
import { useExperience } from '@/core/context/ExperienceContext'

export const Navbar: React.FC = () => {
  const { activeItem, setActiveItem, isMobileMenuOpen, toggleMobileMenu, isScrolled } =
    useNavigation()
  const { openJoinModal } = useExperience()

  const handleNavClick = (label: string, href: string) => {
    setActiveItem(label)
    if (href.startsWith('#')) {
      const target =
        document.querySelector(href) ||
        (href === '#domain'
          ? document.querySelector('#domains')
          : href === '#domains'
            ? document.querySelector('#domain')
            : href === '#nmiet' || href === '#about' || href === '#about-nmiet'
              ? document.querySelector('#about') || document.querySelector('#about-master')
              : null)
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#FAF7EF]/90 backdrop-blur-md border-b border-[#071B34]/10 shadow-[0_4px_20px_rgba(7,27,52,0.04)] h-[72px]'
          : 'bg-transparent border-b border-transparent h-[84px]'
      }`}
    >
      <div className="max-w-[1440px] mx-auto h-full px-4 sm:px-6 lg:px-10 flex items-center justify-between">
        {/* Left: ACM NMIET Monogram Logo & Chapter Identity */}
        <a
          href="#home"
          onClick={() => setActiveItem('Home')}
          className="flex items-center gap-3 group text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1457A6] rounded-md p-1"
        >
          {/* Official ACM NMIET Logo */}
          <div className="relative h-10 sm:h-11 w-auto flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
            <img
              src="/assets/logo/acm_nmiet_logo.png"
              alt="ACM NMIET Student Chapter Logo"
              className="h-10 sm:h-11 w-auto object-contain"
            />
          </div>

          <div className="hidden sm:flex flex-col">
            <span className="font-display text-[15px] font-bold tracking-tight text-[#071B34] leading-tight group-hover:text-[#1457A6] transition-colors">
              {siteConfig.chapter.name}
            </span>
            <span className="text-[11px] font-medium tracking-wider uppercase text-[#536273] leading-none">
              {siteConfig.chapter.subname}
            </span>
          </div>
        </a>

        {/* Center: Minimal Navigation Links (Desktop) */}
        <nav
          className="hidden xl:flex items-center gap-1.5 2xl:gap-3"
          aria-label="Main Navigation"
        >
          {siteConfig.navItems.map((item) => {
            const isActive = activeItem === item.label
            return (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault()
                  handleNavClick(item.label, item.href)
                }}
                className={`relative px-2.5 2xl:px-3 py-1.5 text-[13px] 2xl:text-[13.5px] font-medium transition-all duration-200 rounded-md whitespace-nowrap ${
                  isActive
                    ? 'text-[#071B34] font-semibold'
                    : 'text-[#536273] hover:text-[#071B34] hover:bg-[#071B34]/5'
                }`}
              >
                {item.label}
                {isActive && (
                  <span className="absolute bottom-0 left-2.5 right-2.5 2xl:left-3 2xl:right-3 h-[2px] bg-[#1457A6] rounded-full" />
                )}
              </a>
            )
          })}
        </nav>

        {/* Right: Join ACM CTA Button & Mobile Hamburger */}
        <div className="flex items-center gap-3">
          <button
            onClick={openJoinModal}
            className="hidden sm:inline-flex items-center justify-center gap-2 h-11 px-5 rounded-md text-[13.5px] font-semibold text-white bg-[#071B34] hover:bg-[#1457A6] transition-all duration-200 shadow-sm hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1457A6]"
          >
            <span>Join ACM</span>
            <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
          </button>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={toggleMobileMenu}
            aria-label="Toggle Menu"
            className="xl:hidden inline-flex items-center justify-center w-10 h-10 rounded-md text-[#071B34] hover:bg-[#071B34]/5 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1457A6]"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>
    </header>
  )
}
