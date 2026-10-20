import React, { useRef, useState, useEffect, useCallback, useMemo } from 'react'
import { ChevronDown, ArrowDown } from 'lucide-react'
import DiscCascadeCarousel, { type DiscCascadeItem } from '@/components/ui/disc-cascade-carousel'
import { eventsData, type EventItem } from '@/core/config/events.data'
import campusImg from '@/assets/campus_establishing.jpg'

interface EventsHeroProps {
  activeIndex: number
  activeEvent: EventItem
  onIndexChange: (index: number) => void
  onSelectEvent?: (event: EventItem) => void
}

export const EventsHero: React.FC<EventsHeroProps> = ({
  activeIndex,
  activeEvent,
  onIndexChange,
  onSelectEvent,
}) => {
  const pinContainerRef = useRef<HTMLDivElement>(null)
  const [scrollProgress, setScrollProgress] = useState(0)

  // Track discrete active index to avoid redundant re-renders
  const activeIndexRef = useRef(activeIndex)
  activeIndexRef.current = activeIndex

  // Convert 8 events to DiscCascadeItems
  const discItems: DiscCascadeItem[] = useMemo(() => {
    return eventsData.map((ev) => ({
      title: ev.title,
      shortTitle: ev.shortTitle,
      label: `${ev.number} ${ev.shortTitle}`,
      labelStyle: 'arc',
      src: ev.discImage || ev.coverImage,
      hasCustomDiscArt: ev.hasCustomDiscArt,
      alt: ev.title,
      pattern: ev.discPattern,
      palette: ev.palette,
      date: ev.dateBadge + ' 2026',
      dateBadge: ev.dateBadge,
      category: ev.category,
      categoryBadgeColor: ev.categoryBadgeColor,
      eventNumber: ev.number,
      credits: [
        { label: 'Category', value: ev.category },
        { label: 'Date', value: `${ev.dateBadge} 2026` },
        { label: 'Format', value: ev.mode },
        { label: 'Venue', value: ev.venue.split(',')[0] },
      ],
      reviews: [
        {
          source: ev.organizedWith.split('&')[0].trim(),
          quote: ev.description,
          stars: 5,
        },
      ],
    }))
  }, [])

  // Continuous position calculation:
  // Maps scroll progress (0.0 to 1.0) directly across the 8 events (0.0 to 7.0)
  const continuousPosition = useMemo(() => {
    return Math.min(7, Math.max(0, scrollProgress * 7))
  }, [scrollProgress])

  // Sync discrete activeIndex to parent only when rounded index changes
  useEffect(() => {
    const currentInt = Math.min(7, Math.max(0, Math.round(continuousPosition)))
    if (currentInt !== activeIndexRef.current) {
      onIndexChange(currentInt)
    }
  }, [continuousPosition, onIndexChange])

  // Native window scroll listener for compulsory sticky horizontal scroll
  useEffect(() => {
    let frameId = 0
    let lastProgressVal = -1

    const handleScroll = () => {
      cancelAnimationFrame(frameId)
      frameId = requestAnimationFrame(() => {
        if (!pinContainerRef.current) return
        const rect = pinContainerRef.current.getBoundingClientRect()
        const totalScrollable = rect.height - window.innerHeight
        if (totalScrollable <= 0) return

        const currentOffset = -rect.top
        const p = Math.min(1, Math.max(0, currentOffset / totalScrollable))
        if (Math.abs(p - lastProgressVal) > 0.0005 || p === 0 || p === 1) {
          lastProgressVal = p
          setScrollProgress(p)
        }
      })
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => {
      window.removeEventListener('scroll', handleScroll)
      cancelAnimationFrame(frameId)
    }
  }, [])

  // Smooth click-to-scroll to any of the 8 events in the sequence
  const scrollToEvent = useCallback((targetIndex: number) => {
    if (!pinContainerRef.current) return
    const rect = pinContainerRef.current.getBoundingClientRect()
    const totalScrollable = rect.height - window.innerHeight
    if (totalScrollable <= 0) return

    const targetP = targetIndex / 7
    const targetScrollY = window.scrollY + rect.top + targetP * totalScrollable

    window.scrollTo({
      top: targetScrollY,
      behavior: 'smooth',
    })
  }, [])

  const scrollToDetails = (e?: React.MouseEvent) => {
    if (e) e.preventDefault()
    const target = document.getElementById('event-detail-section')
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <div
      ref={pinContainerRef}
      className="relative w-full bg-[#FAF7EF] h-[400vh]"
    >
      {/* Sticky Fullscreen Stage */}
      <div className="sticky top-0 h-screen w-full flex flex-col justify-between items-center overflow-hidden z-20 px-4 sm:px-6 lg:px-10 pt-[76px] sm:pt-[84px] pb-4 sm:pb-5">
        
        {/* Subtle Architectural Grid Accent */}
        <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#071B34_1px,transparent_1px),linear-gradient(to_bottom,#071B34_1px,transparent_1px)] bg-[size:48px_48px] pointer-events-none" />

        {/* Soft Academic Campus Ambient Silhouettes */}
        <div className="hidden lg:block absolute top-0 right-0 w-[42%] h-full opacity-15 pointer-events-none overflow-hidden">
          <img
            src={campusImg}
            alt="NMIET Campus Silhouette"
            className="w-full h-full object-cover object-left mask-image"
            style={{
              maskImage: 'linear-gradient(to right, transparent, black 50%)',
              WebkitMaskImage: 'linear-gradient(to right, transparent, black 50%)',
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#FAF7EF] via-transparent to-transparent" />
        </div>

        {/* 1. TOP HEADER & 8-EVENT QUICK NAVIGATION RAIL */}
        <div className="w-full max-w-[1440px] relative z-20 flex flex-col items-center text-center space-y-2.5">
          
          {/* Eyebrow and Headline Row */}
          <div className="flex flex-col items-center">
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2 h-2 rounded-full bg-[#1764BD] animate-pulse" />
              <span className="text-[11px] sm:text-xs font-bold uppercase tracking-[0.22em] text-[#1764BD]">
                ACM NMIET CHAPTER • EVENT DISCOGRAPHY
              </span>
            </div>

            <h1 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-[2.65rem] font-black tracking-[-0.03em] text-[#071B34] leading-[1.05]">
              A TIMELINE OF IDEAS AND IMPACT
            </h1>

            <p className="font-body text-xs sm:text-[13.5px] text-[#536273] max-w-[620px] mt-0.5 hidden sm:block">
              8 Signature Milestones · Hands-on Workshops · Hackathons · Competitions · Jan – Apr 2026
            </p>
          </div>

          {/* 8 Perimeter Date Markers Rail */}
          <div className="w-full max-w-[1080px] flex items-center justify-between sm:justify-center gap-1.5 sm:gap-2.5 overflow-x-auto no-scrollbar py-1 px-1">
            {eventsData.map((ev, idx) => {
              const isActive = idx === activeIndex
              return (
                <button
                  key={ev.id}
                  type="button"
                  onClick={() => scrollToEvent(idx)}
                  title={`${ev.number} · ${ev.title}`}
                  className={`group relative flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-full border text-left transition-all duration-300 cursor-pointer ${
                    isActive
                      ? 'bg-[#1764BD] border-[#1764BD] text-white shadow-md shadow-[#1764BD]/20 scale-105'
                      : 'bg-white/80 backdrop-blur-sm border-[#071B34]/12 text-[#071B34] hover:border-[#1764BD]/40 hover:bg-white'
                  }`}
                >
                  <span
                    className={`text-[10px] sm:text-[11px] font-mono font-black ${
                      isActive ? 'text-white' : 'text-[#1764BD]'
                    }`}
                  >
                    {ev.number}
                  </span>
                  <span className="text-[10px] sm:text-[11.5px] font-medium hidden md:inline truncate max-w-[95px]">
                    {ev.shortTitle}
                  </span>
                  <span
                    className={`text-[9px] font-mono hidden lg:inline ${
                      isActive ? 'text-blue-100' : 'text-[#536273]'
                    }`}
                  >
                    {ev.dateBadge}
                  </span>
                </button>
              )
            })}
          </div>
        </div>

        {/* 2. MIDDLE STAGE: 3D DISC CASCADE CAROUSEL IN CENTER (BIG SIZE, HORIZONTALLY SCROLLABLE) */}
        <div className="relative flex-1 w-full max-w-[1440px] flex items-center justify-center my-auto min-h-0">
          
          {/* Concentric Blueprint Rings Centered Behind Discs */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
            <svg
              viewBox="0 0 600 600"
              className="w-[90%] max-w-[620px] h-auto opacity-35 transition-transform duration-300 ease-out"
              style={{
                transform: `rotate(${continuousPosition * 45}deg)`,
              }}
              fill="none"
            >
              <circle
                cx="300"
                cy="300"
                r="280"
                stroke="#1764BD"
                strokeWidth="1.2"
                strokeDasharray="4 8"
              />
              <circle
                cx="300"
                cy="300"
                r="220"
                stroke="#071B34"
                strokeWidth="0.8"
                opacity="0.35"
              />
              <circle
                cx="300"
                cy="300"
                r="160"
                stroke="#1764BD"
                strokeWidth="0.8"
                strokeDasharray="2 4"
              />
              <line
                x1="20"
                y1="300"
                x2="580"
                y2="300"
                stroke="#071B34"
                strokeWidth="0.5"
                strokeDasharray="3 6"
                opacity="0.25"
              />
              <line
                x1="300"
                y1="20"
                x2="300"
                y2="580"
                stroke="#071B34"
                strokeWidth="0.5"
                strokeDasharray="3 6"
                opacity="0.25"
              />
            </svg>
          </div>

          {/* The Large 3D Disc Component in Center Moving Horizontally */}
          <div className="relative z-10 w-full h-[480px] sm:h-[540px] md:h-[580px] lg:h-[620px] max-h-[80vh]">
            <DiscCascadeCarousel
              items={discItems}
              position={continuousPosition}
              onIndexChange={onIndexChange}
              onSelect={(_, i) => {
                const selected = eventsData[i]
                if (selected) {
                  onSelectEvent?.(selected)
                  scrollToDetails()
                }
              }}
              height="100%"
              discSize="clamp(300px, min(44vmin, 420px), 480px)"
              spacing={1.22}
              rise={0}
              depth={0.48}
              yaw={0}
              fan={-11}
              tilt={-3}
              roll={85}
              spin={0}
              sheen={0.7}
              brand="ACM NMIET"
              indexLabel="Jump to Event"
              details={false}
              reviews={false}
              controls={false}
              frame={false}
            />
          </div>

        </div>

        {/* 3. BOTTOM FLOATING CONTROL & SCROLL PROGRESS TRACK */}
        <div className="w-full max-w-[1240px] relative z-20">
          <div className="bg-white/90 backdrop-blur-md border border-[#071B34]/12 shadow-[0_12px_32px_-10px_rgba(7,27,52,0.12)] rounded-2xl px-4 sm:px-6 py-2.5 sm:py-3 flex flex-col sm:flex-row items-center justify-between gap-2.5 sm:gap-3">
            
            {/* Active Event Information */}
            <div className="flex items-center gap-3">
              <span
                className="px-2.5 py-1 rounded-md text-[10.5px] font-mono font-bold uppercase tracking-wider text-white shrink-0"
                style={{ backgroundColor: activeEvent.categoryBadgeColor || '#1764BD' }}
              >
                {activeEvent.category}
              </span>

              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <span className="font-display font-black text-sm sm:text-base text-[#071B34]">
                    {activeEvent.number} · {activeEvent.title}
                  </span>
                </div>
                <span className="text-[11px] font-mono text-[#536273] hidden sm:block">
                  {activeEvent.dateBadge} 2026 • {activeEvent.mode} • {activeEvent.venue.split(',')[0]}
                </span>
              </div>
            </div>

            {/* 8-Segment Progress Track */}
            <div className="flex items-center gap-1.5">
              {eventsData.map((ev, idx) => {
                const isCurrent = idx === activeIndex
                const isPassed = idx < activeIndex
                return (
                  <button
                    key={ev.id}
                    type="button"
                    onClick={() => scrollToEvent(idx)}
                    title={`${ev.number} · ${ev.shortTitle}`}
                    className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                      isCurrent
                        ? 'w-7 sm:w-8 bg-[#1764BD]'
                        : isPassed
                        ? 'w-3 sm:w-4 bg-[#1764BD]/50'
                        : 'w-2 bg-[#071B34]/15 hover:bg-[#071B34]/30'
                    }`}
                  />
                )
              })}
            </div>

            {/* Compulsory Scroll Indicator / Unpin Prompt */}
            <div className="flex items-center gap-2">
              {scrollProgress < 0.95 ? (
                <div className="flex items-center gap-2 text-xs font-mono font-bold tracking-wider text-[#1764BD]">
                  <span>SCROLL DOWN TO ADVANCE ({activeIndex + 1}/8)</span>
                  <ChevronDown className="w-4 h-4 animate-bounce text-[#1764BD]" />
                </div>
              ) : (
                <button
                  type="button"
                  onClick={scrollToDetails}
                  className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1764BD] text-white text-xs font-mono font-bold shadow-md hover:bg-[#071B34] transition-all cursor-pointer animate-pulse"
                >
                  <span>VIEW FULL REPORT & GALLERY</span>
                  <ArrowDown className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

          </div>
        </div>

      </div>
    </div>
  )
}

export default EventsHero
