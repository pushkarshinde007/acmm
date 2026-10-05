import React from 'react'
import { siteConfig } from '@/core/config/site.config'

interface DomainsNavigationProps {
  activeDomainId: string
  onSelectDomain: (id: string) => void
}

export const DomainsNavigation: React.FC<DomainsNavigationProps> = ({
  activeDomainId,
  onSelectDomain,
}) => {
  return (
    <nav
      role="tablist"
      aria-label="Domain Pathways Navigation"
      className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto no-scrollbar py-2"
    >
      {siteConfig.domains.items.map((domain) => {
        const isActive = activeDomainId === domain.id
        return (
          <button
            key={domain.id}
            role="tab"
            aria-selected={isActive}
            id={`domain-tab-${domain.id}`}
            aria-controls={`domain-panel-${domain.id}`}
            onClick={() => onSelectDomain(domain.id)}
            className={`group relative whitespace-nowrap flex items-center gap-2 px-3 sm:px-4 py-2 rounded-xl text-xs font-mono transition-all duration-300 ${
              isActive
                ? 'bg-[#071B34] text-[#FAF7EF] shadow-md font-semibold ring-1 ring-[#1457A6]/40'
                : 'bg-[#FAF7EF]/75 text-[#536273] hover:text-[#071B34] hover:bg-[#F5F0E6] border border-[#071B34]/10'
            }`}
          >
            {/* Small status dot */}
            <span
              className={`w-1.5 h-1.5 rounded-full transition-transform duration-300 ${
                isActive
                  ? 'scale-125'
                  : 'group-hover:scale-110 opacity-60'
              }`}
              style={{ backgroundColor: isActive ? domain.accentColor : '#536273' }}
            />

            <span>{domain.number}</span>
            <span className="hidden sm:inline opacity-40">/</span>
            <span className="font-sans font-medium text-[11px] sm:text-xs">
              {domain.title}
            </span>
          </button>
        )
      })}
    </nav>
  )
}
