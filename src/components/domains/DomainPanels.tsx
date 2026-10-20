import React from 'react'
import {
  ArrowRight,
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
} from 'lucide-react'
import { type DomainItem, domainsData } from '@/core/config/domains.data'

interface DomainPanelsProps {
  activeDomainId: string
  onSelectDomain: (domain: DomainItem) => void
}

export const DomainPanels: React.FC<DomainPanelsProps> = ({
  activeDomainId,
  onSelectDomain,
}) => {
  const focusIcons: Record<string, React.ComponentType<{ className?: string }>> = {
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

  return (
    <section
      id="domain-panels"
      className="relative w-full bg-[#FAF7EF] py-12 sm:py-16 border-t border-[#071B34]/10 scroll-mt-20"
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
        {/* Five Information Panels Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 lg:gap-5">
          {domainsData.map((domain) => {
            const isActive = domain.id === activeDomainId

            return (
              <div
                key={domain.id}
                onClick={() => onSelectDomain(domain)}
                className={`group flex flex-col justify-between p-4 sm:p-4.5 rounded-2xl bg-white transition-all duration-300 border cursor-pointer ${
                  isActive
                    ? 'border-2 shadow-lg -translate-y-1'
                    : 'border-[#071B34]/10 hover:border-[#071B34]/25 shadow-sm hover:shadow-md hover:-translate-y-0.5'
                }`}
                style={{
                  borderColor: isActive ? domain.accentColor : undefined,
                  boxShadow: isActive
                    ? `0 12px 30px -10px ${domain.accentGlow}`
                    : undefined,
                }}
              >
                <div>
                  {/* Top Header: Number & Domain Name */}
                  <div className="flex items-center gap-2 mb-1.5">
                    <span
                      className="font-mono text-xs sm:text-[13px] font-black"
                      style={{ color: domain.accentColor }}
                    >
                      {domain.number}
                    </span>
                    <h3
                      className="font-display font-black text-sm sm:text-[14.5px] uppercase tracking-tight"
                      style={{ color: domain.accentColor }}
                    >
                      {domain.name}
                    </h3>
                  </div>

                  {/* Short Description */}
                  <p className="text-[12px] sm:text-[12.5px] leading-snug text-[#536273] font-medium min-h-[36px] mb-3">
                    {domain.description}
                  </p>

                  {/* Wide High-Quality Image */}
                  <div className="relative w-full h-[125px] sm:h-[135px] rounded-xl overflow-hidden mb-3.5 bg-[#071B34]">
                    <img
                      src={domain.image}
                      alt={domain.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#071B34]/60 via-transparent to-transparent" />
                  </div>

                  {/* Four Focus Areas with Small Icons */}
                  <div className="space-y-2 py-1 border-t border-[#071B34]/5">
                    {domain.focusAreas.map((focus) => {
                      const IconComponent = focusIcons[focus.icon] || Globe
                      return (
                        <div
                          key={focus.title}
                          className="flex items-center gap-2 text-[11.5px] sm:text-[12px] text-[#071B34] font-medium"
                        >
                          <div
                            className="w-5 h-5 rounded flex items-center justify-center shrink-0"
                            style={{
                              backgroundColor: domain.badgeBg,
                              color: domain.accentColor,
                            }}
                          >
                            <IconComponent className="w-3.5 h-3.5" />
                          </div>
                          <span className="truncate">{focus.title}</span>
                        </div>
                      )
                    })}
                  </div>
                </div>

                {/* Bottom Action: Underlined Learn More → */}
                <div className="pt-4 border-t border-[#071B34]/10 mt-3 flex items-center justify-between">
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      onSelectDomain(domain)
                    }}
                    className="inline-flex items-center gap-1.5 text-xs font-bold transition-all underline underline-offset-4 group-hover:translate-x-0.5"
                    style={{ color: domain.accentColor }}
                  >
                    <span>Learn More</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

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
