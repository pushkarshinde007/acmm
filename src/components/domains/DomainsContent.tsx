import React from 'react'
import { siteConfig } from '@/core/config/site.config'
import { DomainsNavigation } from '@/components/domains/DomainsNavigation'
import { DomainInstallation } from '@/components/domains/DomainInstallation'
import { KnowledgeNexus } from '@/components/domains/KnowledgeNexus'
import { useExperience } from '@/core/context/ExperienceContext'

interface DomainsContentProps {
  progress: number
  activeDomainId: string
  onSelectDomain: (id: string) => void
  onOpenJoinModal: () => void
}

export const DomainsContent: React.FC<DomainsContentProps> = ({
  progress,
  activeDomainId,
  onSelectDomain,
  onOpenJoinModal,
}) => {
  const { prefersReducedMotion } = useExperience()

  // Intro content appears as visitor enters the innovation district (progress >= 0.15)
  const isIntroRevealed = prefersReducedMotion || progress >= 0.12
  // Domain details appear as paths become visible (progress >= 0.35)
  const isDomainsRevealed = prefersReducedMotion || progress >= 0.30

  const activeDomain =
    siteConfig.domains.items.find((d) => d.id === activeDomainId) ||
    siteConfig.domains.items[0]

  return (
    <div className="w-full max-w-[560px] flex flex-col justify-center py-6 sm:py-10">
      {/* 1. Small Section Label: 04 / DOMAINS */}
      <div
        className={`transition-all duration-700 ease-out ${
          isIntroRevealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}
      >
        <div className="flex items-center gap-2 mb-3">
          <span className="font-mono text-xs font-semibold text-[#1457A6] tracking-widest uppercase">
            {siteConfig.domains.number}
          </span>
          <span className="text-[#071B34]/30">•</span>
          <span className="font-mono text-xs tracking-widest text-[#2D75C9] font-medium uppercase">
            {siteConfig.domains.label}
          </span>
          <span className="text-[#071B34]/30 hidden sm:inline">•</span>
          <span className="font-mono text-[11px] tracking-wider text-[#536273] uppercase hidden sm:inline">
            {siteConfig.domains.sublabel}
          </span>
        </div>

        {/* 2. Main Heading: Large, Bold, Editorial: FIVE PATHS. ONE COMMUNITY. */}
        <h2 className="font-display font-black text-3xl sm:text-4xl lg:text-5xl text-[#071B34] tracking-tight leading-[0.95] mb-4">
          <span className="block text-[#071B34]">{siteConfig.domains.headlineLine1}</span>
          <span className="block text-[#1457A6]">{siteConfig.domains.headlineLine2}</span>
        </h2>

        {/* 3. Supporting Paragraph */}
        <p className="text-xs sm:text-sm text-[#536273] leading-relaxed mb-6 max-w-[480px]">
          {siteConfig.domains.supportingText}
        </p>
      </div>

      {/* 4. Interactive Domain Pathway Selector */}
      <div
        className={`transition-all duration-700 delay-100 ease-out mb-5 ${
          isDomainsRevealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}
      >
        <DomainsNavigation
          activeDomainId={activeDomainId}
          onSelectDomain={onSelectDomain}
        />
      </div>

      {/* 5. Active Domain Installation Interactive Showcase */}
      <div
        className={`transition-all duration-700 delay-200 ease-out mb-5 ${
          isDomainsRevealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}
      >
        <DomainInstallation
          domain={activeDomain}
          isActive={true}
          onSelect={() => {}}
          onExplore={onOpenJoinModal}
        />
      </div>

      {/* 6. Central Knowledge Nexus Anchor Info */}
      <div
        className={`transition-all duration-700 delay-300 ease-out hidden sm:block ${
          isDomainsRevealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}
      >
        <KnowledgeNexus
          progress={progress}
          activeDomainId={activeDomainId}
          onSelectDomain={onSelectDomain}
        />
      </div>
    </div>
  )
}
