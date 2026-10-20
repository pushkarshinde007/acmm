import React, { useState } from 'react'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'
import { type EventItem } from '@/core/config/events.data'

interface EventGalleryModalProps {
  event: EventItem | null
  isOpen: boolean
  onClose: () => void
}

export const EventGalleryModal: React.FC<EventGalleryModalProps> = ({
  event,
  isOpen,
  onClose,
}) => {
  const [activePhotoIdx, setActivePhotoIdx] = useState(0)

  if (!isOpen || !event) return null

  const photos = event.gallery.length > 0 ? event.gallery : [event.coverImage]
  const currentPhoto = photos[activePhotoIdx] || photos[0]

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation()
    setActivePhotoIdx((prev) => (prev > 0 ? prev - 1 : photos.length - 1))
  }

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation()
    setActivePhotoIdx((prev) => (prev < photos.length - 1 ? prev + 1 : 0))
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`${event.title} Photo Gallery`}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#071B34]/80 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl bg-white rounded-3xl overflow-hidden shadow-2xl border border-white/20 flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-5 sm:p-6 border-b border-[#071B34]/10 bg-[#FAF7EF]">
          <div>
            <div className="flex items-center gap-2">
              <span
                className="text-[10px] font-mono font-bold uppercase px-2.5 py-0.5 rounded text-white"
                style={{ backgroundColor: event.categoryBadgeColor }}
              >
                {event.category}
              </span>
              <span className="text-xs font-mono text-[#536273]">
                {event.date}
              </span>
            </div>
            <h3 className="font-display font-black text-lg sm:text-xl text-[#071B34] mt-1">
              {event.title} — Photo Gallery
            </h3>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close Gallery"
            className="w-9 h-9 rounded-full bg-white border border-[#071B34]/15 hover:bg-[#071B34] hover:text-white flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Main Photo Viewport */}
        <div className="relative flex-1 min-h-[300px] sm:min-h-[440px] bg-[#071B34] flex items-center justify-center overflow-hidden">
          <img
            src={currentPhoto}
            alt={`${event.title} photo ${activePhotoIdx + 1}`}
            className="max-h-[58vh] w-auto max-w-full object-contain"
          />

          {/* Navigation Arrows */}
          {photos.length > 1 && (
            <>
              <button
                type="button"
                onClick={handlePrev}
                aria-label="Previous photograph"
                className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 hover:bg-white text-[#071B34] flex items-center justify-center shadow-lg transition-transform hover:scale-105"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <button
                type="button"
                onClick={handleNext}
                aria-label="Next photograph"
                className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 hover:bg-white text-[#071B34] flex items-center justify-center shadow-lg transition-transform hover:scale-105"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </>
          )}

          {/* Bottom Counter Pill */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-[#071B34]/80 backdrop-blur-md text-white text-xs font-mono px-3 py-1 rounded-full border border-white/20">
            {activePhotoIdx + 1} of {photos.length}
          </div>
        </div>

        {/* Thumbnail Row */}
        {photos.length > 1 && (
          <div className="p-4 bg-[#FAF7EF] border-t border-[#071B34]/10 flex items-center gap-3 overflow-x-auto">
            {photos.map((photo, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setActivePhotoIdx(idx)}
                className={`relative w-20 h-14 rounded-lg overflow-hidden shrink-0 border-2 transition-all ${
                  idx === activePhotoIdx
                    ? 'border-[#1764BD] scale-105 shadow-md'
                    : 'border-transparent opacity-60 hover:opacity-100'
                }`}
              >
                <img
                  src={photo}
                  alt={`Thumbnail ${idx + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default EventGalleryModal
