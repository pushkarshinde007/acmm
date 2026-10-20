import React from 'react'
import { ArrowRight, Calendar, Code, GraduationCap, Users, Briefcase } from 'lucide-react'
import { siteConfig } from '@/core/config/site.config'

import eventsImg from '@/assets/about/what_events.jpg'
import projectsImg from '@/assets/about/what_projects.jpg'
import mentorshipImg from '@/assets/about/what_mentorship.jpg'
import communityImg from '@/assets/about/what_community.jpg'
import opportunitiesImg from '@/assets/about/what_opportunities.jpg'

export const AboutWhatWeDo: React.FC = () => {
  const cardImages = [eventsImg, projectsImg, mentorshipImg, communityImg, opportunitiesImg]
  const cardIcons = [Calendar, Code, GraduationCap, Users, Briefcase]

  return (
    <section id="what-we-do" className="relative w-full bg-[#FAF7EF] py-14 sm:py-20 border-t border-[#071B34]/10">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
        {/* Header Row: Title and Explore More Link */}
        <div className="flex items-center justify-between mb-8 sm:mb-10">
          <div>
            <span className="text-xs font-bold tracking-widest text-[#1764BD] uppercase block mb-1">
              CHAPTER INITIATIVES
            </span>
            <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-black uppercase tracking-tight text-[#071B34]">
              {siteConfig.whatWeDo.heading}
            </h2>
          </div>

          <a
            href={siteConfig.whatWeDo.exploreMoreUrl}
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#1764BD] hover:text-[#071B34] transition-colors group"
          >
            <span>{siteConfig.whatWeDo.exploreMoreText}</span>
            <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
          </a>
        </div>

        {/* Five Horizontally Aligned Activity Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-5">
          {siteConfig.whatWeDo.cards.map((card, idx) => {
            const image = cardImages[idx] || eventsImg
            const Icon = cardIcons[idx] || Calendar

            return (
              <div
                key={card.id}
                className="group relative h-[250px] sm:h-[280px] rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1.5 border border-[#071B34]/10 cursor-pointer"
              >
                {/* Background Photographic Image */}
                <img
                  src={image}
                  alt={card.title}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                />

                {/* Dark Gradient Overlay for Readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#071B34] via-[#071B34]/60 to-transparent transition-opacity duration-300 group-hover:opacity-95" />

                {/* Top Subtle Pill with Icon */}
                <div className="absolute top-3.5 left-3.5 w-8 h-8 rounded-lg bg-white/20 backdrop-blur-md border border-white/20 text-white flex items-center justify-center transition-colors group-hover:bg-[#1764BD] group-hover:border-[#1764BD]">
                  <Icon className="w-4 h-4" />
                </div>

                {/* Bottom Content: Title & Description */}
                <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5 flex flex-col justify-end">
                  <h3 className="font-display text-base sm:text-lg font-black uppercase text-white tracking-tight group-hover:text-[#69BCE8] transition-colors leading-tight">
                    {card.title}
                  </h3>
                  <p className="text-[11.5px] sm:text-[12px] text-white/80 leading-snug mt-1.5 font-medium line-clamp-2">
                    {card.description}
                  </p>

                  <div className="mt-3 flex items-center gap-1 text-[11px] font-semibold text-[#69BCE8] opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <span>Learn more</span>
                    <ArrowRight className="w-3 h-3" />
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
