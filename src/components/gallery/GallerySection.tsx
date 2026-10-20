import React, { useState, useCallback } from 'react'
import { FloatingWords } from './FloatingWords'
import { ProofGalleryModal } from './ProofGalleryModal'
import './gallery.css'

export const GallerySection: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleOpenModal = useCallback(() => {
    history.pushState({ galleryOpen: true }, '', '#gallery-view')
    setIsModalOpen(true)
  }, [])

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false)
    if (window.location.hash === '#gallery-view') {
      history.back()
    }
  }, [])

  return (
    <section
      id="gallery"
      className="gallery-section relative w-full pt-12 pb-10 sm:pt-16 sm:pb-14 md:pt-20 md:pb-16 overflow-hidden bg-[#050505] flex flex-col items-center"
    >
      {/* Animated Floating Tags in the Background */}
      <FloatingWords />

      {/* Main Content Column */}
      <div className="flex w-full flex-col items-center relative z-10">
        {/* Header Block: Title & Button */}
        <div className="flex flex-col items-center gap-4 w-full px-4">
          {/* Gallery Stylized Title Graphic */}
          <div className="relative flex w-full max-w-3xl flex-col items-center">
            <img
              src="/gallery/gallery.webp"
              alt="Gallery Title"
              className="gallery-title relative z-10 w-[80vw] sm:w-[70vw] max-w-2xl mb-1 drop-shadow-md"
              decoding="async"
              loading="lazy"
            />
          </div>

          {/* CTA Button: Proof We Actually Do Stuff */}
          <div
            role="button"
            tabIndex={0}
            onClick={handleOpenModal}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault()
                handleOpenModal()
              }
            }}
            className="w-[460px] max-w-[90vw] h-12 bg-[#F95F4A] rounded-[41px] outline outline-1 outline-offset-[-1px] outline-yellow-50 flex items-center justify-center hover:scale-105 transition-transform duration-200 cursor-pointer shadow-xl z-20"
          >
            <span className="text-white text-sm sm:text-base font-light uppercase tracking-wider select-none text-center px-4">
              Proof We Actually Do Stuff - View Photos!
            </span>
          </div>
        </div>

        {/* Large, Immersive Group Photo Cutout Frame — Scaled to Match Outline */}
        <div className="gallery-frame relative w-full flex justify-center items-end mt-4 sm:mt-6 overflow-hidden">
          <img
            src="/gallery/user_photo_cutout.png"
            alt="ACM NMIET Team"
            className="gallery-image w-[95vw] max-w-[1260px] xl:max-w-[1360px] 2xl:max-w-[1550px] h-auto object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.8)]"
            decoding="async"
            loading="lazy"
          />
        </div>
      </div>

      {/* Proof Gallery Modal */}
      <ProofGalleryModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        userImage="/gallery/user_photo_cutout.png"
      />
    </section>
  )
}
