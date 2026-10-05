import React from 'react'
import { ArrowRight, Sparkles } from 'lucide-react'

export interface DomainItem {
  id: string
  number: string
  title: string
  category: string
  description: string
  metaphor: string
  accentColor: string
  tag: string
}

interface DomainInstallationProps {
  domain: DomainItem
  isActive: boolean
  onSelect: () => void
  onExplore?: () => void
}

export const DomainInstallation: React.FC<DomainInstallationProps> = ({
  domain,
  isActive,
  onSelect,
  onExplore,
}) => {
  return (
    <article
      onClick={onSelect}
      role="tabpanel"
      aria-selected={isActive}
      className={`group cursor-pointer rounded-2xl p-5 sm:p-6 transition-all duration-500 ease-out border ${
        isActive
          ? 'bg-[#FAF7EF]/95 backdrop-blur-md border-[#1457A6]/30 shadow-xl opacity-100 scale-100'
          : 'bg-[#FAF7EF]/65 backdrop-blur-sm border-[#071B34]/10 hover:border-[#1457A6]/20 opacity-80 hover:opacity-95 scale-[0.98]'
      }`}
    >
      {/* Top Meta: Number + Category Tag */}
      <div className="flex items-center justify-between gap-2 mb-3">
        <div className="flex items-center gap-2">
          <span className="font-mono text-xs font-bold text-[#1457A6] tracking-wider">
            {domain.number}
          </span>
          <span className="text-[#071B34]/25">•</span>
          <span className="text-[11px] font-mono tracking-widest text-[#536273] uppercase">
            {domain.category}
          </span>
        </div>

        {/* Small Active Pulse / Tag */}
        <span
          className="text-[10px] font-mono font-medium px-2 py-0.5 rounded-full border transition-colors duration-300"
          style={{
            borderColor: isActive ? domain.accentColor : 'rgba(7, 27, 52, 0.1)',
            backgroundColor: isActive ? 'rgba(250, 247, 239, 0.9)' : 'transparent',
            color: isActive ? domain.accentColor : '#536273',
          }}
        >
          {domain.tag}
        </span>
      </div>

      {/* Main Domain Heading: Large, Bold, Editorial */}
      <h3 className="font-display font-black text-2xl sm:text-3xl text-[#071B34] tracking-tight mb-2 group-hover:text-[#1457A6] transition-colors duration-300">
        {domain.title}
      </h3>

      {/* Domain Description */}
      <p className="text-xs sm:text-sm text-[#536273] leading-relaxed mb-4">
        {domain.description}
      </p>

      {/* Visual Metaphor Architectural Micro-Note */}
      <div className="pt-3 border-t border-[#071B34]/10 flex items-start gap-2 text-[11px] text-[#536273]">
        <Sparkles className="w-3.5 h-3.5 mt-0.5 flex-shrink-0 text-[#2D75C9]" />
        <span className="italic leading-snug">
          {domain.metaphor}
        </span>
      </div>

      {/* Explore Action Button */}
      {isActive && (
        <div className="mt-4 pt-2 flex items-center justify-between">
          <button
            onClick={(e) => {
              e.stopPropagation()
              onExplore?.()
            }}
            className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider text-[#071B34] hover:text-[#1457A6] uppercase transition-colors"
          >
            <span>EXPLORE DOMAIN</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#1457A6] transition-transform group-hover:translate-x-1" />
          </button>

          <span className="text-[10px] font-mono text-[#536273]/70">
            PATH ACTIVE
          </span>
        </div>
      )}
    </article>
  )
}
