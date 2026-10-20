import React, { useEffect, useRef, useCallback } from 'react'
import gsap from 'gsap'

interface GalleryCardData {
  id: number
  title: string
  subtitle: string
  theme: 'pink' | 'orange'
  color: string
}

const GALLERY_CARDS: GalleryCardData[] = [
  { id: 1, title: 'Board Moment', subtitle: 'ACM 25 Board', theme: 'pink', color: '#FF007A' },
  { id: 2, title: 'Board Moment', subtitle: 'ACM 25 Board', theme: 'orange', color: '#F95F4A' },
  { id: 3, title: 'Board Moment', subtitle: 'ACM 25 Board', theme: 'pink', color: '#FF007A' },
  { id: 4, title: 'Board Moment', subtitle: 'ACM 25 Board', theme: 'orange', color: '#F95F4A' },
  { id: 5, title: 'Board Moment', subtitle: 'ACM 25 Board', theme: 'pink', color: '#FF007A' },
  { id: 6, title: 'Event Highlight', subtitle: 'Reverse Coding', theme: 'orange', color: '#F95F4A' },
  { id: 7, title: 'Event Highlight', subtitle: 'Reverse Coding', theme: 'pink', color: '#FF007A' },
  { id: 8, title: 'Event Highlight', subtitle: 'Reverse Coding', theme: 'orange', color: '#F95F4A' },
  { id: 9, title: 'Event Highlight', subtitle: 'Reverse Coding', theme: 'pink', color: '#FF007A' },
  { id: 10, title: 'Turf Action', subtitle: 'Turf', theme: 'orange', color: '#F95F4A' },
  { id: 11, title: 'Turf Action', subtitle: 'Turf', theme: 'pink', color: '#FF007A' },
  { id: 12, title: 'Turf Action', subtitle: 'Turf', theme: 'orange', color: '#F95F4A' },
  { id: 13, title: 'Nightslip Vibes', subtitle: 'Nightslip', theme: 'pink', color: '#FF007A' },
  { id: 14, title: 'Nightslip Vibes', subtitle: 'Nightslip', theme: 'orange', color: '#F95F4A' },
  { id: 15, title: 'Nightslip Vibes', subtitle: 'Nightslip', theme: 'pink', color: '#FF007A' },
  { id: 16, title: 'Celebration', subtitle: "Women's Day", theme: 'orange', color: '#F95F4A' },
  { id: 17, title: 'Celebration', subtitle: "Women's Day", theme: 'pink', color: '#FF007A' },
  { id: 18, title: 'Celebration', subtitle: "Women's Day", theme: 'orange', color: '#F95F4A' },
  { id: 19, title: 'New Board', subtitle: 'ACM 26 Board', theme: 'pink', color: '#FF007A' },
  { id: 20, title: 'New Board', subtitle: 'ACM 26 Board', theme: 'orange', color: '#F95F4A' },
]

interface ProofGalleryModalProps {
  isOpen: boolean
  onClose: () => void
  userImage?: string
}

export const ProofGalleryModal: React.FC<ProofGalleryModalProps> = ({
  isOpen,
  onClose,
  userImage = '/gallery/user_photo_cutout.png',
}) => {
  const modalRef = useRef<HTMLDivElement>(null)

  const handleClose = useCallback(() => {
    if (modalRef.current) {
      gsap.to(modalRef.current, {
        opacity: 0,
        duration: 0.3,
        ease: 'power2.in',
        onComplete: () => {
          onClose()
        },
      })
    } else {
      onClose()
    }
  }, [onClose])

  useEffect(() => {
    if (!isOpen) return

    document.body.style.overflow = 'hidden'

    if (modalRef.current) {
      const items = modalRef.current.querySelectorAll('.gallery-item')
      const tl = gsap.timeline()
      tl.fromTo(
        modalRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.3, ease: 'power2.out' }
      ).fromTo(
        items,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.05, duration: 0.5, ease: 'back.out(1.2)' },
        '-=0.1'
      )
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleClose()
      }
    }

    const handlePopState = () => {
      onClose()
    }

    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('popstate', handlePopState)

    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('popstate', handlePopState)
    }
  }, [isOpen, handleClose, onClose])

  if (!isOpen) return null

  return (
    <div
      id="proof-gallery-modal"
      ref={modalRef}
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-[100] flex items-center justify-center transition-opacity duration-300"
    >
      {/* Backdrop */}
      <div
        id="proof-gallery-backdrop"
        onClick={handleClose}
        className="absolute inset-0 bg-[#050505]/95 backdrop-blur-md cursor-pointer"
      />

      {/* Modal Main Frame */}
      <div className="relative w-full h-full max-w-7xl mx-auto p-4 md:p-8 pt-24 md:pt-32 flex flex-col z-10 pointer-events-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6 md:mb-10 px-2">
          <div className="flex flex-col">
            <h2 className="text-2xl md:text-5xl text-[#FEFCD9] uppercase tracking-wider drop-shadow-lg font-bold">
              Proof We Actually{' '}
              <span className="text-[#F95F4A]">Do Stuff</span>
            </h2>
            <div className="h-1 w-24 bg-[#F95F4A] mt-2 rounded-full" />
          </div>

          <button
            id="proof-gallery-close"
            onClick={handleClose}
            aria-label="Close Gallery"
            className="group relative w-12 h-12 flex items-center justify-center rounded-full border border-[#FEFCD9]/30 hover:border-[#F95F4A] hover:bg-[#F95F4A]/10 transition-all duration-300 cursor-pointer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-[#FEFCD9] transition-transform duration-300 group-hover:rotate-90 group-hover:text-[#F95F4A]"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Scrollable Grid Container */}
        <div
          id="proof-gallery-grid-container"
          className="flex-1 overflow-y-auto overflow-x-hidden px-2 gallery-custom-scrollbar"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-20">
            {GALLERY_CARDS.map((card) => (
              <div
                key={card.id}
                className="gallery-item group relative w-full aspect-[1.6] rounded-lg bg-white overflow-hidden flex items-center justify-center transition-transform duration-300 hover:scale-[1.02]"
              >
                {/* Background Pattern */}
                <div
                  className="absolute inset-0 pointer-events-none opacity-50 z-0"
                  style={{
                    backgroundImage: 'url(/gallery/noise.webp)',
                    backgroundSize: 'cover',
                  }}
                />

                {/* Full Frame Image */}
                <div className="absolute inset-0 z-10 p-[3%] flex items-center justify-center">
                  <img
                    src={userImage}
                    alt={card.title}
                    className="w-full h-full object-contain rounded-sm transition-transform duration-700 group-hover:scale-105"
                    decoding="async"
                    loading="lazy"
                  />
                </div>

                {/* Cassette Overlay */}
                <div className="w-[97%] h-[96.5%] flex justify-center items-center absolute z-20 pointer-events-none">
                  <img
                    src={
                      card.theme === 'pink'
                        ? '/gallery/casette-layout-pink.webp'
                        : '/gallery/casette-layout-orange.webp'
                    }
                    alt="Cassette Frame"
                    className="absolute w-full h-full object-cover"
                    decoding="async"
                    loading="lazy"
                  />
                </div>

                {/* ACM Logo at Bottom */}
                <div className="w-full flex justify-center items-center z-30 h-[20%] pb-1 absolute bottom-0 pointer-events-none">
                  <img
                    src="/gallery/acm-logo-black.webp"
                    alt="ACM Logo"
                    className="h-full object-cover"
                    decoding="async"
                    loading="lazy"
                  />
                </div>

                {/* Hover Overlay Content */}
                <div className="absolute inset-0 z-40 bg-black/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center text-center p-6 backdrop-blur-sm">
                  <h3 className="text-xl md:text-2xl text-[#FEFCD9] m-0 leading-tight uppercase translate-y-4 group-hover:translate-y-0 transition-transform duration-300 font-bold">
                    {card.title}
                  </h3>
                  <p
                    className="text-sm md:text-base m-0 uppercase mt-2 translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75"
                    style={{ color: card.color }}
                  >
                    {card.subtitle}
                  </p>
                  <div className="mt-4 translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-100">
                    <span className="text-xs text-white/80 uppercase border-b border-white/50 pb-0.5">
                      View Details
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
