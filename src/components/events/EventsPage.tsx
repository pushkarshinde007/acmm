import React, { useState } from 'react'
import { eventsData, type EventItem } from '@/core/config/events.data'
import { EventsHero } from '@/components/events/EventsHero'
import { EventDetailCard } from '@/components/events/EventDetailCard'
import { EventTimelineBar } from '@/components/events/EventTimelineBar'
import { EventGalleryModal } from '@/components/events/EventGalleryModal'

export const EventsPage: React.FC = () => {
  // Default to Event 01 (Canva Workshop, index 0)
  const [activeIndex, setActiveIndex] = useState(0)
  const [isGalleryOpen, setIsGalleryOpen] = useState(false)

  const activeEvent: EventItem = eventsData[activeIndex] || eventsData[0]

  const handleNextEvent = () => {
    setActiveIndex((prev) => (prev < eventsData.length - 1 ? prev + 1 : 0))
  }

  const handleSelectEvent = (event: EventItem) => {
    const idx = eventsData.findIndex((e) => e.id === event.id)
    if (idx !== -1) setActiveIndex(idx)
  }

  return (
    <section id="events" className="relative w-full bg-[#FAF7EF] select-none scroll-mt-16">
      {/* 1. Hero Section with 3D Disc Cascade Carousel */}
      <EventsHero
        activeIndex={activeIndex}
        activeEvent={activeEvent}
        onIndexChange={setActiveIndex}
        onSelectEvent={handleSelectEvent}
      />

      {/* 2. Detailed Event Showcase Card matching Reference Layout */}
      <EventDetailCard
        event={activeEvent}
        onNextEvent={handleNextEvent}
        onOpenGallery={() => setIsGalleryOpen(true)}
      />

      {/* 3. Horizontal 8-Step Timeline Milestone Track */}
      <EventTimelineBar
        activeIndex={activeIndex}
        onSelectIndex={setActiveIndex}
      />

      {/* 4. Full-Size Photo Gallery Modal */}
      <EventGalleryModal
        event={activeEvent}
        isOpen={isGalleryOpen}
        onClose={() => setIsGalleryOpen(false)}
      />
    </section>
  )
}

export default EventsPage
