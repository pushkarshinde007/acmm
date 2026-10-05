import React from 'react'
import { siteConfig } from '@/core/config/site.config'

export const AboutPillars: React.FC = () => {
  return (
    <div className="pt-4 sm:pt-6 border-t border-[#071B34]/12">
      {/* Horizontal Arrangement on Desktop, Stacked on Mobile */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-4 md:gap-6 divide-y sm:divide-y-0 sm:divide-x divide-[#071B34]/10">
        {siteConfig.about.principles.map((pillar, idx) => (
          <div
            key={pillar.number}
            className={`space-y-2 group ${idx > 0 ? 'pt-4 sm:pt-0 sm:pl-4 md:pl-6' : ''}`}
          >
            {/* Small cobalt blue number & thin architectural line */}
            <div className="flex items-center gap-2">
              <span className="font-display text-xs font-bold text-[#1457A6]">
                {pillar.number}
              </span>
              <span className="w-6 h-[1px] bg-[#1457A6]/30 group-hover:w-10 group-hover:bg-[#1457A6] transition-all duration-300" />
            </div>

            {/* Large Title */}
            <h3 className="font-display text-base sm:text-lg font-bold text-[#071B34] tracking-wide uppercase">
              {pillar.title}
            </h3>

            {/* Short Description */}
            <p className="font-body text-[12.5px] sm:text-[13px] leading-relaxed text-[#536273]">
              {pillar.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}
