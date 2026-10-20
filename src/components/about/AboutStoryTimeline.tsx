import React from 'react'
import { Flag, Users, Box, Trophy, Target } from 'lucide-react'
import { siteConfig } from '@/core/config/site.config'

export const AboutStoryTimeline: React.FC = () => {
  const milestoneIcons = [Flag, Users, Box, Trophy]

  return (
    <section id="our-story" className="relative w-full bg-[#FAF7EF] py-14 sm:py-20 border-t border-[#071B34]/10">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
          {/* Left Column (Col 1-4): OUR STORY */}
          <div className="lg:col-span-4 flex flex-col justify-between space-y-4">
            <div>
              {/* Short Blue Accent Line */}
              <div className="w-10 h-1 bg-[#1764BD] rounded-full mb-3" />
              
              <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-[#071B34] uppercase mb-3">
                {siteConfig.story.label}
              </h2>
              
              <p className="font-body text-[14px] sm:text-[15px] leading-[1.7] text-[#536273]">
                {siteConfig.story.description}
              </p>
            </div>

            <div className="pt-2">
              <span className="text-[11px] font-mono tracking-wider uppercase text-[#1764BD] font-semibold bg-[#1764BD]/10 px-2.5 py-1 rounded-md inline-block">
                ESTABLISHED AT NMIET PUNE
              </span>
            </div>
          </div>

          {/* Center Column (Col 5-8): Horizontal Timeline */}
          <div className="lg:col-span-5 flex flex-col justify-center py-4">
            <div className="relative">
              {/* Fine Dotted Connecting Blue Line */}
              <div className="absolute top-[22px] left-4 right-4 h-0.5 border-t-2 border-dashed border-[#1764BD]/40 z-0 hidden sm:block" />

              {/* Four Milestones Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 relative z-10">
                {siteConfig.story.milestones.map((milestone, idx) => {
                  const Icon = milestoneIcons[idx] || Flag
                  return (
                    <div key={milestone.year} className="flex flex-col items-center text-center group">
                      {/* Milestone Icon Node */}
                      <div className="w-11 h-11 rounded-full bg-white border-2 border-[#1764BD] text-[#1764BD] flex items-center justify-center shadow-sm group-hover:scale-110 group-hover:bg-[#1764BD] group-hover:text-white transition-all duration-200">
                        <Icon className="w-4 h-4" />
                      </div>

                      {/* Year */}
                      <span className="font-display font-black text-sm sm:text-base text-[#071B34] mt-2.5">
                        {milestone.year}
                      </span>

                      {/* Title */}
                      <span className="text-[11px] sm:text-[11.5px] font-medium text-[#536273] leading-snug mt-0.5 max-w-[100px]">
                        {milestone.title}
                      </span>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>

          {/* Right Column (Col 9-12): OUR MISSION Card */}
          <div className="lg:col-span-3 flex items-center">
            <div className="w-full h-full p-6 sm:p-7 rounded-2xl bg-gradient-to-br from-white via-white/90 to-[#1764BD]/5 border border-[#071B34]/10 shadow-[0_4px_20px_rgba(7,27,52,0.03)] flex flex-col justify-between space-y-4">
              <div className="w-11 h-11 rounded-xl bg-[#1764BD]/10 text-[#1764BD] flex items-center justify-center">
                <Target className="w-5 h-5" />
              </div>

              <div>
                <h3 className="font-display text-lg font-bold text-[#071B34] uppercase tracking-tight mb-2">
                  {siteConfig.story.mission.label}
                </h3>
                <p className="text-[13px] sm:text-[13.5px] leading-[1.65] text-[#536273] font-medium">
                  &ldquo;{siteConfig.story.mission.statement}&rdquo;
                </p>
              </div>

              <div className="flex items-center gap-1.5 text-xs font-semibold text-[#1764BD]">
                <span>Student Driven</span>
                <span>•</span>
                <span>Innovation Led</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
