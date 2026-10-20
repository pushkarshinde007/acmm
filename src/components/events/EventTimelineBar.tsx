import React from 'react'
import { ArrowRight, Calendar } from 'lucide-react'
import { eventsData, type EventItem } from '@/core/config/events.data'

interface EventTimelineBarProps {
  activeIndex: number
  onSelectIndex: (index: number) => void
}

export const EventTimelineBar: React.FC<EventTimelineBarProps> = ({
  activeIndex,
  onSelectIndex,
}) => {
  return (
    <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 pb-14 sm:pb-20">
      {/* Header Row */}
      <div className="flex items-center justify-between mb-6 pb-2 border-b border-[#071B34]/10">
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4 text-[#1764BD]" />
          <h3 className="font-display font-black text-xs sm:text-sm uppercase tracking-wider text-[#071B34]">
            Event Timeline
          </h3>
        </div>

        <a
          href="#events"
          onClick={(e) => {
            e.preventDefault()
            const target = document.getElementById('events')
            if (target) target.scrollIntoView({ behavior: 'smooth' })
          }}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-[#1764BD] hover:text-[#071B34] transition-colors group"
        >
          <span>View All Events</span>
          <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
        </a>
      </div>

      {/* Horizontal Milestone Connector Track */}
      <div className="relative overflow-x-auto pb-4 no-scrollbar">
        <div className="min-w-[900px] relative pt-4 pb-2">
          {/* Continuous Connecting Line */}
          <div className="absolute top-[28px] left-6 right-6 h-[2px] bg-[#071B34]/15 z-0" />

          {/* 8 Event Milestone Nodes Grid */}
          <div className="grid grid-cols-8 gap-2 relative z-10">
            {eventsData.map((ev: EventItem, idx: number) => {
              const isActive = idx === activeIndex

              return (
                <button
                  key={ev.id}
                  type="button"
                  onClick={() => onSelectIndex(idx)}
                  className="flex flex-col items-center text-center group cursor-pointer focus:outline-none"
                >
                  {/* Number Circle Node */}
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center font-mono font-bold text-[11px] transition-all duration-300 ${
                      isActive
                        ? 'bg-[#1764BD] text-white ring-4 ring-[#1764BD]/20 scale-110 shadow-sm'
                        : 'bg-white border-2 border-[#071B34]/25 text-[#071B34] group-hover:border-[#1764BD] group-hover:text-[#1764BD]'
                    }`}
                  >
                    {ev.number}
                  </div>

                  {/* Date Badge */}
                  <span
                    className={`text-[10px] sm:text-[10.5px] font-mono font-bold mt-2 uppercase tracking-wider ${
                      isActive ? 'text-[#1764BD]' : 'text-[#536273] group-hover:text-[#071B34]'
                    }`}
                  >
                    {ev.dateBadge} 2026
                  </span>

                  {/* Short Title */}
                  <span
                    className={`text-[11px] sm:text-[11.5px] leading-tight mt-1 max-w-[105px] line-clamp-2 transition-colors ${
                      isActive
                        ? 'font-bold text-[#071B34]'
                        : 'font-medium text-[#536273] group-hover:text-[#071B34]'
                    }`}
                  >
                    {ev.shortTitle}
                  </span>
                </button>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default EventTimelineBar
