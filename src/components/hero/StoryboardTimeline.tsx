import React, { useState } from 'react'
import { siteConfig } from '@/core/config/site.config'
import refImage from '@/assets/acm_reference.jpg'
import campusImage from '@/assets/campus_establishing.jpg'
import atriumImage from '@/assets/about_atrium_reference.jpg'

export const StoryboardTimeline: React.FC = () => {
  const [activeStep, setActiveStep] = useState(1)

  // Curated artwork sources & positions for each storyboard stage
  const stepAssets = [
    { src: campusImage, pos: 'object-[50%_40%]' }, // 1. Hero Establishing (Wide clean landscape)
    { src: refImage, pos: 'object-[48%_55%]' },    // 2. Student Begins Journey (Student walker)
    { src: refImage, pos: 'object-[75%_50%]' },    // 3. Environment Reveal (Campus walkway entrance)
    { src: atriumImage, pos: 'object-[30%_55%]' }, // 4. Transitional Bridge & Canopy
    { src: atriumImage, pos: 'object-[50%_50%]' }, // 5. The Community Atrium (Water, amphitheatre & globe)
  ]

  return (
    <section
      id="storyboard-section"
      className="w-full bg-[#FAF7EF] border-t border-[#071B34]/10 py-8 sm:py-12 px-4 sm:px-6 lg:px-10 select-none"
    >
      <div className="max-w-[1440px] mx-auto space-y-6">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 pb-2 border-b border-[#071B34]/10">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2 h-2 rounded-full bg-[#1457A6]" />
              <span className="text-xs font-bold uppercase tracking-widest text-[#1457A6]">
                Interactive Storyboard
              </span>
            </div>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#071B34] tracking-tight">
              Cinematic Journey Sequence
            </h2>
          </div>
          <p className="text-xs sm:text-sm font-body text-[#536273] max-w-sm">
            Explore the progressive stages of the <span className="font-semibold text-[#071B34]">Beyond The Scroll</span> journey from entrance into the Community Atrium.
          </p>
        </div>

        {/* 5-Card Storyboard Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {siteConfig.storyboard.map((step, idx) => {
            const isActive = activeStep === step.index
            const asset = stepAssets[idx] || stepAssets[0]

            return (
              <div
                key={step.index}
                onClick={() => setActiveStep(step.index)}
                className={`group relative flex flex-col justify-between p-3.5 sm:p-4 rounded-xl cursor-pointer transition-all duration-300 border ${
                  isActive
                    ? 'bg-white border-[#1457A6] shadow-lg ring-2 ring-[#1457A6]/15 -translate-y-1'
                    : 'bg-[#FAF7EF] border-[#071B34]/10 hover:border-[#1457A6]/40 hover:bg-white hover:shadow-md'
                }`}
              >
                {/* Visual Thumbnail */}
                <div className="relative w-full h-28 sm:h-32 rounded-lg overflow-hidden mb-3 bg-[#071B34]/5 border border-[#071B34]/10">
                  <img
                    src={asset.src}
                    alt={step.title}
                    className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 ${asset.pos}`}
                  />
                  <div
                    className={`absolute inset-0 transition-opacity duration-300 ${
                      isActive ? 'bg-[#1457A6]/10' : 'bg-transparent group-hover:bg-[#071B34]/5'
                    }`}
                  />
                  <span className="absolute top-2 left-2 px-2 py-0.5 rounded text-[10px] font-bold tracking-wider uppercase bg-[#071B34]/85 text-white backdrop-blur-sm">
                    {step.time}
                  </span>
                </div>

                {/* Content */}
                <div className="space-y-1">
                  <div className="flex items-center gap-1.5">
                    <span
                      className={`text-xs font-bold ${
                        isActive ? 'text-[#1457A6]' : 'text-[#536273]'
                      }`}
                    >
                      0{step.index}
                    </span>
                    <h3 className="font-display text-sm font-bold text-[#071B34] line-clamp-1">
                      {step.title}
                    </h3>
                  </div>
                  <p className="text-[12px] font-body text-[#536273] leading-relaxed line-clamp-3">
                    {step.description}
                  </p>
                </div>

                {/* Active Indicator Bar */}
                <div className="mt-3 pt-2 border-t border-[#071B34]/10 flex items-center justify-between">
                  <span
                    className={`text-[11px] font-semibold uppercase tracking-wider ${
                      isActive ? 'text-[#1457A6]' : 'text-[#536273] group-hover:text-[#071B34]'
                    }`}
                  >
                    {isActive ? 'Active Scene' : 'Preview Scene'}
                  </span>
                  <div
                    className={`w-2 h-2 rounded-full transition-colors ${
                      isActive ? 'bg-[#1457A6]' : 'bg-[#071B34]/20'
                    }`}
                  />
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
