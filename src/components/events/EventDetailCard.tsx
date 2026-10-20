import React, { useState } from 'react'
import {
  Calendar,
  MapPin,
  Users,
  Mic,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Trophy,
  CheckCircle2,
  FileText,
  Images,
} from 'lucide-react'
import { type EventItem } from '@/core/config/events.data'

interface EventDetailCardProps {
  event: EventItem
  onNextEvent?: () => void
  onOpenGallery?: () => void
}

export const EventDetailCard: React.FC<EventDetailCardProps> = ({
  event,
  onNextEvent,
  onOpenGallery,
}) => {
  const [photoIndex, setPhotoIndex] = useState(0)

  // Ensure photo index stays in bounds if event changes
  const currentPhotoIndex = photoIndex < event.gallery.length ? photoIndex : 0
  const activePhoto = event.gallery[currentPhotoIndex] || event.coverImage

  const handlePrevPhoto = (e: React.MouseEvent) => {
    e.stopPropagation()
    setPhotoIndex((prev) => (prev > 0 ? prev - 1 : event.gallery.length - 1))
  }

  const handleNextPhoto = (e: React.MouseEvent) => {
    e.stopPropagation()
    setPhotoIndex((prev) => (prev < event.gallery.length - 1 ? prev + 1 : 0))
  }

  return (
    <div
      id="event-detail-section"
      className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 py-8 sm:py-12"
    >
      <div className="bg-white rounded-3xl border border-[#071B34]/10 shadow-[0_12px_40px_-15px_rgba(7,27,52,0.08)] p-6 sm:p-8 lg:p-10 transition-all duration-300">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-start">
          
          {/* Left Column: Event Metadata & Narrative Description (Col 1-5) */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            <div>
              {/* Top Tagline Row: Event Number, Category Pill, Date */}
              <div className="flex flex-wrap items-center gap-3 mb-3">
                <span className="font-display font-black text-3xl sm:text-4xl text-[#071B34] tracking-tight">
                  {event.number}
                </span>

                <span
                  className="text-[11px] font-mono font-bold tracking-wider uppercase px-3 py-1 rounded-full text-white shadow-sm"
                  style={{ backgroundColor: event.categoryBadgeColor }}
                >
                  {event.category}
                </span>

                <span className="text-xs font-mono text-[#536273] font-medium">
                  | {event.date}
                </span>
              </div>

              {/* Bold Event Title */}
              <h3 className="font-display font-black text-2xl sm:text-3xl text-[#071B34] tracking-tight leading-snug mb-4">
                {event.title}
              </h3>

              {/* Narrative Summary */}
              <p className="font-body text-[14px] sm:text-[15px] leading-[1.7] text-[#536273] mb-6">
                {event.detailedSummary}
              </p>

              {/* Event Metadata Pills */}
              <div className="space-y-2.5 pt-2 border-t border-[#071B34]/10 text-xs sm:text-[13px] text-[#071B34]">
                <div className="flex items-start gap-2.5">
                  <div className="w-6 h-6 rounded-md bg-[#FAF7EF] border border-[#071B34]/10 flex items-center justify-center shrink-0 mt-0.5 text-[#1764BD]">
                    <Calendar className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <span className="font-semibold block text-[11px] text-[#536273] uppercase tracking-wider">
                      Date & Time
                    </span>
                    <span className="font-medium">
                      {event.date} {event.time ? `• ${event.time}` : ''}
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <div className="w-6 h-6 rounded-md bg-[#FAF7EF] border border-[#071B34]/10 flex items-center justify-center shrink-0 mt-0.5 text-[#1764BD]">
                    <MapPin className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <span className="font-semibold block text-[11px] text-[#536273] uppercase tracking-wider">
                      Venue / Mode
                    </span>
                    <span className="font-medium">
                      {event.venue} ({event.mode})
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <div className="w-6 h-6 rounded-md bg-[#FAF7EF] border border-[#071B34]/10 flex items-center justify-center shrink-0 mt-0.5 text-[#1764BD]">
                    <Users className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <span className="font-semibold block text-[11px] text-[#536273] uppercase tracking-wider">
                      Organized With
                    </span>
                    <span className="font-medium">{event.organizedWith}</span>
                  </div>
                </div>

                {event.speaker && (
                  <div className="flex items-start gap-2.5">
                    <div className="w-6 h-6 rounded-md bg-[#FAF7EF] border border-[#071B34]/10 flex items-center justify-center shrink-0 mt-0.5 text-[#1764BD]">
                      <Mic className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <span className="font-semibold block text-[11px] text-[#536273] uppercase tracking-wider">
                        Keynote Speaker / Mentor
                      </span>
                      <span className="font-bold text-[#1764BD]">
                        {event.speaker.name}
                      </span>{' '}
                      <span className="text-[#536273]">
                        ({event.speaker.role}
                        {event.speaker.organization ? `, ${event.speaker.organization}` : ''})
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Action Buttons: View Gallery, Event Report & Next Event */}
            <div className="flex flex-wrap items-center gap-3 pt-4">
              <button
                type="button"
                onClick={onOpenGallery}
                className="h-10 px-5 rounded-xl bg-[#071B34] hover:bg-[#1764BD] text-white text-xs font-bold tracking-wide flex items-center gap-2 shadow-sm transition-all duration-200 hover:shadow-md"
              >
                <Images className="w-4 h-4" />
                <span>View Gallery ({event.gallery.length} Photos)</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <button
                type="button"
                onClick={onOpenGallery}
                className="h-10 px-4 rounded-xl bg-[#FAF7EF] hover:bg-white text-[#071B34] border border-[#071B34]/15 hover:border-[#1764BD] text-xs font-semibold tracking-wide flex items-center gap-2 transition-all"
              >
                <FileText className="w-4 h-4 text-[#1764BD]" />
                <span>Event Report</span>
              </button>

              {onNextEvent && (
                <button
                  type="button"
                  onClick={onNextEvent}
                  className="h-10 px-4 rounded-xl bg-[#FAF7EF] hover:bg-white text-[#071B34] border border-[#071B34]/15 hover:border-[#1764BD] text-xs font-semibold tracking-wide flex items-center gap-1.5 transition-all"
                >
                  <span>Next Event</span>
                  <ChevronRight className="w-4 h-4 text-[#1764BD]" />
                </button>
              )}
            </div>
          </div>

          {/* Center Column: Photo Showcase & Carousel (Col 6-8) */}
          <div className="lg:col-span-4 flex flex-col items-center">
            <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden bg-[#071B34] shadow-md group border border-[#071B34]/10">
              <img
                src={activePhoto}
                alt={`${event.title} photograph`}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#071B34]/70 via-transparent to-transparent pointer-events-none" />

              {/* Prev / Next photo buttons */}
              {event.gallery.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={handlePrevPhoto}
                    aria-label="Previous photograph"
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/85 hover:bg-white text-[#071B34] flex items-center justify-center shadow-md transition-all hover:scale-105"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>

                  <button
                    type="button"
                    onClick={handleNextPhoto}
                    aria-label="Next photograph"
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/85 hover:bg-white text-[#071B34] flex items-center justify-center shadow-md transition-all hover:scale-105"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </>
              )}

              {/* Bottom Caption Pill */}
              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-[11px] font-mono">
                <span className="bg-[#071B34]/80 backdrop-blur-md px-2.5 py-1 rounded-md border border-white/20">
                  PHOTO {currentPhotoIndex + 1} / {event.gallery.length}
                </span>

                {event.participants && (
                  <span className="bg-[#1764BD]/90 backdrop-blur-md px-2.5 py-1 rounded-md text-white font-bold">
                    {event.participants}
                  </span>
                )}
              </div>
            </div>

            {/* Pagination Dots */}
            {event.gallery.length > 1 && (
              <div className="flex items-center gap-1.5 mt-3">
                {event.gallery.map((_, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setPhotoIndex(idx)}
                    aria-label={`Show photo ${idx + 1}`}
                    className={`h-1.5 rounded-full transition-all duration-200 ${
                      idx === currentPhotoIndex
                        ? 'w-6 bg-[#1764BD]'
                        : 'w-2 bg-[#071B34]/20 hover:bg-[#071B34]/40'
                    }`}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Key Highlights & Winners (Col 9-12) */}
          <div className="lg:col-span-3 flex flex-col justify-between space-y-4 bg-[#FAF7EF] p-5 sm:p-6 rounded-2xl border border-[#071B34]/10">
            <div>
              <div className="flex items-center gap-2 mb-4 pb-2 border-b border-[#071B34]/10">
                <Sparkles className="w-4 h-4 text-[#1764BD]" />
                <h4 className="font-display font-black text-sm uppercase tracking-wider text-[#071B34]">
                  Key Highlights
                </h4>
              </div>

              {/* Highlights List with Icons */}
              <div className="space-y-3">
                {event.highlights.map((highlight, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs text-[#071B34]">
                    <div className="w-4 h-4 rounded-full bg-[#1764BD]/15 text-[#1764BD] flex items-center justify-center shrink-0 mt-0.5">
                      <CheckCircle2 className="w-3 h-3 text-[#1764BD]" />
                    </div>
                    <span className="leading-snug font-medium text-[#102033]">
                      {highlight}
                    </span>
                  </div>
                ))}
              </div>

              {/* If Competition (BackForge): Winners Podium */}
              {event.winners && event.winners.length > 0 && (
                <div className="mt-5 pt-4 border-t border-[#071B34]/10">
                  <div className="flex items-center gap-2 mb-3">
                    <Trophy className="w-4 h-4 text-[#D97706]" />
                    <span className="font-display font-bold text-xs uppercase text-[#071B34]">
                      Competition Winners
                    </span>
                  </div>
                  <div className="space-y-2">
                    {event.winners.slice(0, 3).map((w, idx) => (
                      <div
                        key={idx}
                        className="bg-white p-2.5 rounded-xl border border-[#071B34]/10 text-xs shadow-2xs"
                      >
                        <div className="flex items-center justify-between font-bold text-[#071B34]">
                          <span>{w.rank}</span>
                          <span className="text-[#059669] font-mono">{w.prize}</span>
                        </div>
                        <div className="text-[11px] text-[#1764BD] font-semibold mt-0.5">
                          {w.team} ({w.college})
                        </div>
                        <div className="text-[10px] text-[#536273] truncate">
                          {w.members}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Coordinators Badge */}
            {event.coordinators && event.coordinators.length > 0 && (
              <div className="pt-3 border-t border-[#071B34]/10 text-[10.5px] text-[#536273] font-mono">
                <span className="font-bold uppercase text-[#071B34] block mb-0.5">
                  Faculty Leadership:
                </span>
                <span>{event.coordinators.join(', ')}</span>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  )
}

export default EventDetailCard
