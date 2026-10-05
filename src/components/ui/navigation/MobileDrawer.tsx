import React, { useEffect } from 'react'
import { X, ArrowRight } from 'lucide-react'
import { siteConfig } from '@/core/config/site.config'
import { useNavigation } from '@/core/context/NavigationContext'
import { useExperience } from '@/core/context/ExperienceContext'

export const MobileDrawer: React.FC = () => {
  const { isMobileMenuOpen, closeMobileMenu, activeItem, setActiveItem } = useNavigation()
  const { openJoinModal } = useExperience()

  // Prevent background scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isMobileMenuOpen])

  if (!isMobileMenuOpen) return null

  const handleLinkClick = (label: string, href: string) => {
    setActiveItem(label)
    closeMobileMenu()
    if (href.startsWith('#')) {
      const target = document.querySelector(href)
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }

  return (
    <div className="fixed inset-0 z-50 xl:hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#071B34]/40 backdrop-blur-sm transition-opacity"
        onClick={closeMobileMenu}
      />

      {/* Drawer Panel */}
      <div className="fixed top-0 right-0 bottom-0 w-full max-w-sm bg-[#FAF7EF] p-6 shadow-2xl flex flex-col justify-between overflow-y-auto">
        <div>
          {/* Header */}
          <div className="flex items-center justify-between pb-6 border-b border-[#071B34]/10">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8">
                <svg viewBox="0 0 40 40" className="w-full h-full" fill="none">
                  <polygon
                    points="20,2 38,20 20,38 2,20"
                    stroke="#071B34"
                    strokeWidth="2.5"
                    fill="none"
                  />
                  <circle cx="20" cy="20" r="3" fill="#1457A6" />
                </svg>
              </div>
              <span className="font-display font-bold text-[#071B34] text-sm">
                {siteConfig.chapter.name}
              </span>
            </div>

            <button
              onClick={closeMobileMenu}
              aria-label="Close menu"
              className="p-2 rounded-md text-[#536273] hover:text-[#071B34] hover:bg-[#071B34]/5"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="flex flex-col py-6 space-y-1">
            {siteConfig.navItems.map((item) => {
              const isActive = activeItem === item.label
              return (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault()
                    handleLinkClick(item.label, item.href)
                  }}
                  className={`flex items-center justify-between px-4 py-3 rounded-lg text-base font-medium transition-colors ${
                    isActive
                      ? 'bg-[#1457A6]/10 text-[#1457A6] font-semibold'
                      : 'text-[#102033] hover:bg-[#071B34]/5'
                  }`}
                >
                  <span>{item.label}</span>
                  {isActive && <div className="w-1.5 h-1.5 rounded-full bg-[#1457A6]" />}
                </a>
              )
            })}
          </nav>
        </div>

        {/* Bottom CTA */}
        <div className="pt-6 border-t border-[#071B34]/10">
          <button
            onClick={() => {
              closeMobileMenu()
              openJoinModal()
            }}
            className="w-full flex items-center justify-center gap-2 h-12 rounded-md font-semibold text-white bg-[#071B34] hover:bg-[#1457A6] transition-colors shadow-sm"
          >
            <span>Join ACM</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  )
}
