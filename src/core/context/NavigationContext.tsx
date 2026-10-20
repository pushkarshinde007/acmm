import React, { createContext, useState, useEffect } from 'react'
export { useNavigation } from './useNavigation'

export interface NavigationContextType {
  activeItem: string
  setActiveItem: (item: string) => void
  isMobileMenuOpen: boolean
  openMobileMenu: () => void
  closeMobileMenu: () => void
  toggleMobileMenu: () => void
  isScrolled: boolean
}

export const NavigationContext = createContext<NavigationContextType | undefined>(undefined)

export const NavigationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeItem, setActiveItem] = useState('Home')
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    let frameId = 0

    const updateSpy = () => {
      setIsScrolled(window.scrollY > 40)

      // Section spy for all navigation sections
      const sections = [
        { id: 'contact', label: 'Contact' },
        { id: 'gallery', label: 'Gallery' },
        { id: 'partners', label: 'Partners' },
        { id: 'team', label: 'Team' },
        { id: 'events', label: 'Events' },
        { id: 'domain', label: 'Domains' },
        { id: 'domains', label: 'Domains' },
        { id: 'nmiet', label: 'About NMIET' },
        { id: 'about', label: 'About NMIET' },
      ]

      for (const section of sections) {
        const el = document.getElementById(section.id)
        if (el) {
          const rect = el.getBoundingClientRect()
          if (rect.top <= window.innerHeight * 0.5 && rect.bottom >= window.innerHeight * 0.2) {
            setActiveItem(section.label)
            return
          }
        }
      }

      if (window.scrollY < window.innerHeight * 0.7) {
        setActiveItem('Home')
      }
    }

    const handleScroll = () => {
      cancelAnimationFrame(frameId)
      frameId = requestAnimationFrame(updateSpy)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    updateSpy()

    return () => {
      window.removeEventListener('scroll', handleScroll)
      cancelAnimationFrame(frameId)
    }
  }, [])

  const openMobileMenu = () => setIsMobileMenuOpen(true)
  const closeMobileMenu = () => setIsMobileMenuOpen(false)
  const toggleMobileMenu = () => setIsMobileMenuOpen((prev) => !prev)

  return (
    <NavigationContext.Provider
      value={{
        activeItem,
        setActiveItem,
        isMobileMenuOpen,
        openMobileMenu,
        closeMobileMenu,
        toggleMobileMenu,
        isScrolled,
      }}
    >
      {children}
    </NavigationContext.Provider>
  )
}
