import React from 'react'
import {
  Globe,
  Cpu,
  Cloud,
  Shield,
  Calendar,
  Briefcase,
  Coins,
  Handshake,
  Layout,
  PenTool,
  Video,
  Sparkles,
  Terminal,
  Users,
  Award,
  GitBranch,
  FileText,
  BookOpen,
  Lightbulb,
  Network,
  ArrowRight,
} from 'lucide-react'
import { type DomainItem, domainsData } from '@/core/config/domains.data'

interface DomainPanelsProps {
  activeDomainId: string
  onSelectDomain: (domain: DomainItem) => void
}

const focusIconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Globe,
  Cpu,
  Cloud,
  Shield,
  Calendar,
  Briefcase,
  Coins,
  Handshake,
  Layout,
  PenTool,
  Video,
  Sparkles,
  Terminal,
  Users,
  Award,
  GitBranch,
  FileText,
  BookOpen,
  Lightbulb,
  Network,
}

export const DomainPanels: React.FC<DomainPanelsProps> = ({
  activeDomainId,
  onSelectDomain,
}) => {
  return (
    <section
      id="domain-panels"
      className="relative w-full bg-[#FAF7EF] py-16 sm:py-20 border-t border-[#071B34]/10 scroll-mt-20"
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
        {/* Five Information Panels Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 lg:gap-5 items-stretch">
          {domainsData.map((domain) => {
            const isActive = domain.id === activeDomainId
            const isDark = domain.theme === 'dark'

            return (
              <div
                key={domain.id}
                onClick={() => onSelectDomain(domain)}
                className={`group relative flex flex-col justify-between rounded-[22px] overflow-hidden cursor-pointer transition-all duration-500 border ${
                  isActive
                    ? 'ring-2 ring-offset-2 ring-offset-[#FAF7EF] scale-[1.02] -translate-y-2 z-10 shadow-2xl'
                    : 'hover:-translate-y-2 hover:shadow-xl shadow-md'
                }`}
                style={{
                  backgroundColor: domain.cardBg,
                  borderColor: domain.borderColor,
                  boxShadow: isActive
                    ? `0 24px 48px -12px ${domain.accentGlow}`
                    : `0 8px 24px -8px ${domain.accentGlow}`,
                }}
              >
                {/* 1. Top Content Block */}
                <div className="p-4 sm:p-5 flex flex-col z-10 relative">
                  {/* Header Row: Number + Rule + 3 Pillars */}
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2">
                      <span
                        className="font-display font-black text-2xl sm:text-[26px] tracking-tight leading-none"
                        style={{ color: isDark ? '#FFFFFF' : domain.textColor }}
                      >
                        {domain.number}
                      </span>
                      <div
                        className="w-5 sm:w-6 h-[2px] rounded-full opacity-60"
                        style={{ backgroundColor: domain.accentColor }}
                      />
                    </div>

                    {/* 3 Pillars in Monospace Typography */}
                    <div
                      className="flex flex-col text-right font-mono text-[8.5px] sm:text-[9px] font-bold tracking-widest uppercase leading-tight opacity-75"
                      style={{ color: isDark ? '#FFFFFF' : domain.textColor }}
                    >
                      {domain.pillars.map((pillar) => (
                        <span key={pillar}>{pillar}</span>
                      ))}
                    </div>
                  </div>

                  {/* Domain Name */}
                  <h3
                    className="font-display font-black text-lg sm:text-[19px] uppercase tracking-tight leading-tight mt-1"
                    style={{ color: isDark ? '#FFFFFF' : domain.textColor }}
                  >
                    {domain.name}
                  </h3>

                  {/* Domain Tagline */}
                  <p
                    className="text-[11.5px] sm:text-[12px] leading-snug font-medium mt-1.5 min-h-[34px] line-clamp-2"
                    style={{ color: isDark ? domain.subtextColor : '#536273' }}
                  >
                    {domain.description}
                  </p>

                  {/* 4 Focus Area Tracks with Real SVG Icons */}
                  <div
                    className="space-y-1.5 pt-3 mt-2 border-t"
                    style={{
                      borderColor: isDark
                        ? 'rgba(255, 255, 255, 0.1)'
                        : 'rgba(7, 27, 52, 0.08)',
                    }}
                  >
                    {domain.focusAreas.map((focus) => {
                      const IconComponent = focusIconMap[focus.icon] || Globe

                      return (
                        <div
                          key={focus.title}
                          className="flex items-center gap-2 text-[11px] sm:text-[11.5px] font-medium leading-none"
                          style={{
                            color: isDark ? '#FFFFFF' : '#102033',
                          }}
                        >
                          <div
                            className="w-4 h-4 rounded flex items-center justify-center shrink-0"
                            style={{
                              backgroundColor: domain.badgeBg,
                              color: domain.accentColor,
                            }}
                          >
                            <IconComponent className="w-2.5 h-2.5" />
                          </div>
                          <span className="truncate">{focus.title}</span>
                        </div>
                      )
                    })}
                  </div>

                  {/* 2. Framed Photographic Visual Anchor */}
                  <div className="relative w-full h-[145px] sm:h-[155px] rounded-xl overflow-hidden mt-3.5 shadow-inner bg-[#071B34]">
                    <img
                      src={domain.image}
                      alt={`${domain.name} visual`}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    {/* Vignette Gradients */}
                    <div
                      className="absolute inset-0 pointer-events-none"
                      style={{
                        background: isDark
                          ? 'linear-gradient(to top, rgba(6,19,37,0.7) 0%, transparent 40%, rgba(6,19,37,0.4) 100%)'
                          : 'linear-gradient(to top, rgba(255,253,249,0.5) 0%, transparent 40%)',
                      }}
                    />
                  </div>
                </div>

                {/* 3. Bottom Action Bar: Pill Button */}
                <div
                  className="px-4 sm:px-5 pb-4 pt-1 z-10 relative flex items-center justify-between"
                  style={{
                    borderTop: `1px solid ${
                      isDark ? 'rgba(255, 255, 255, 0.06)' : 'rgba(7, 27, 52, 0.06)'
                    }`,
                  }}
                >
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation()
                      onSelectDomain(domain)
                    }}
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-[11px] sm:text-xs font-bold tracking-wide transition-all duration-300 shadow-sm group-hover:translate-x-0.5"
                    style={{
                      backgroundColor: domain.pillBg,
                      border: domain.pillBorder
                        ? `1px solid ${domain.pillBorder}`
                        : undefined,
                      color: domain.pillText,
                    }}
                  >
                    <span>Learn More</span>
                    <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-0.5" />
                  </button>

                  {/* Active Indicator Pulse Ring */}
                  <span
                    className="w-2 h-2 rounded-full transition-all"
                    style={{
                      backgroundColor: isActive ? domain.accentColor : 'transparent',
                    }}
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

export default DomainPanels
