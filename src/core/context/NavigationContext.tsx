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
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40)

      // Section spy between Home and About
      const aboutEl = document.getElementById('about')

      if (aboutEl) {
        const aboutRect = aboutEl.getBoundingClientRect()
        if (aboutRect.top <= window.innerHeight * 0.5 && aboutRect.bottom >= window.innerHeight * 0.2) {
          setActiveItem('About')
          return
        }
      }

      if (window.scrollY < window.innerHeight * 0.7) {
        setActiveItem('Home')
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
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
