import React from 'react'
import { siteConfig } from '@/core/config/site.config'

interface KnowledgeNexusProps {
  progress: number
  activeDomainId: string
  onSelectDomain: (id: string) => void
}

export const KnowledgeNexus: React.FC<KnowledgeNexusProps> = ({
  progress,
  activeDomainId,
  onSelectDomain,
}) => {
  // Knowledge Nexus appears prominently in progress range 0.30 - 0.65
  const isNexusVisible = progress >= 0.25

  return (
    <div
      className={`transition-all duration-700 ease-out ${
        isNexusVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      }`}
    >
      {/* Nexus Central Badge */}
      <div className="flex items-center gap-3 mb-4">
        <div className="relative w-8 h-8 rounded-full border border-[#1457A6]/30 flex items-center justify-center bg-[#FAF7EF]/90 shadow-sm">
          <div className="w-2.5 h-2.5 rounded-full bg-[#1457A6] animate-pulse" />
          <div className="absolute inset-0 rounded-full border border-[#2D75C9]/40 animate-ping opacity-25" />
        </div>
        <div>
          <span className="text-[11px] font-mono tracking-widest text-[#2D75C9] font-semibold uppercase block">
            CENTRAL ARCHITECTURAL ANCHOR
          </span>
          <span className="text-sm font-display font-bold text-[#071B34]">
            {siteConfig.domains.nexus.title}
          </span>
        </div>
      </div>

      <p className="text-xs sm:text-sm text-[#536273] leading-relaxed max-w-[440px] mb-4">
        {siteConfig.domains.nexus.description}
      </p>

      {/* 5 Interconnected Path Conduits Indicator */}
      <div className="flex items-center gap-1.5 pt-1">
        {siteConfig.domains.items.map((item, idx) => {
          const isActive = activeDomainId === item.id
          return (
            <button
              key={item.id}
              onClick={() => onSelectDomain(item.id)}
              aria-label={`Select domain ${item.title}`}
              className={`group flex items-center gap-1 px-2.5 py-1 rounded text-[11px] font-mono transition-all duration-300 ${
                isActive
                  ? 'bg-[#071B34] text-[#FAF7EF] shadow-sm font-semibold'
                  : 'bg-[#FAF7EF]/80 text-[#536273] hover:text-[#071B34] hover:bg-[#F5F0E6] border border-[#071B34]/10'
              }`}
            >
              <span className={`w-1.5 h-1.5 rounded-full ${isActive ? 'bg-[#69BCE8]' : 'bg-[#2D75C9]/40'}`} />
              <span>0{idx + 1}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
