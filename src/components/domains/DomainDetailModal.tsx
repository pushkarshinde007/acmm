import React from 'react'
import { X, ArrowRight, CheckCircle2 } from 'lucide-react'
import type { DomainItem } from '@/core/config/domains.data'
import { useExperience } from '@/core/context/ExperienceContext'

interface DomainDetailModalProps {
  domain: DomainItem | null
  isOpen: boolean
  onClose: () => void
}

export const DomainDetailModal: React.FC<DomainDetailModalProps> = ({
  domain,
  isOpen,
  onClose,
}) => {
  const { openJoinModal } = useExperience()

  if (!isOpen || !domain) return null

  const handleApplyClick = () => {
    onClose()
    openJoinModal()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 select-none animate-in fade-in duration-200">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#071B34]/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-2xl bg-[#FAF7EF] border border-[#071B34]/15 rounded-2xl shadow-2xl overflow-hidden z-10 flex flex-col max-h-[90vh]">
        {/* Top Accent Strip */}
        <div
          className="h-2 w-full"
          style={{ backgroundColor: domain.accentColor }}
        />

        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close modal"
          className="absolute top-4 right-4 p-2 rounded-lg text-[#536273] hover:text-[#071B34] hover:bg-[#071B34]/10 transition-colors z-20"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Scroll Content */}
        <div className="overflow-y-auto p-6 sm:p-8 space-y-6">
          {/* Header */}
          <div className="flex items-center gap-3">
            <span
              className="font-mono text-sm font-black px-2.5 py-1 rounded"
              style={{
                backgroundColor: domain.badgeBg,
                color: domain.accentColor,
              }}
            >
              DOMAIN {domain.number}
            </span>
            <span className="text-xs font-mono tracking-wider text-[#536273] uppercase">
              ACM NMIET CHAPTER
            </span>
          </div>

          <h2 className="font-display text-2xl sm:text-3xl font-black text-[#071B34] tracking-tight uppercase">
            {domain.name}
          </h2>

          {/* Image */}
          <div className="relative w-full h-[220px] rounded-xl overflow-hidden shadow-md">
            <img
              src={domain.image}
              alt={domain.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#071B34]/70 via-transparent to-transparent" />
            <div className="absolute bottom-3 left-4 right-4 text-white text-sm font-medium">
              {domain.tagline}
            </div>
          </div>

          {/* Detailed Description */}
          <div>
            <h4 className="font-display font-bold text-xs uppercase tracking-wider text-[#1764BD] mb-2">
              OVERVIEW & IMPACT
            </h4>
            <p className="text-[14px] sm:text-[15px] leading-[1.7] text-[#536273]">
              {domain.detailedDescription}
            </p>
          </div>

          {/* Focus Areas */}
          <div>
            <h4 className="font-display font-bold text-xs uppercase tracking-wider text-[#1764BD] mb-3">
              SPECIALIZED TRACKS
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {domain.focusAreas.map((area) => (
                <div
                  key={area.title}
                  className="flex items-center gap-2.5 p-3 rounded-xl bg-white border border-[#071B34]/10"
                >
                  <CheckCircle2
                    className="w-4 h-4 shrink-0"
                    style={{ color: domain.accentColor }}
                  />
                  <span className="text-xs font-semibold text-[#071B34]">
                    {area.title}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Action Row */}
          <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
            <button
              onClick={handleApplyClick}
              className="w-full sm:w-auto flex-1 h-12 rounded-xl text-white font-semibold text-xs sm:text-sm tracking-wide flex items-center justify-center gap-2 shadow-md transition-all hover:brightness-110 active:scale-[0.99]"
              style={{ backgroundColor: domain.accentColor }}
            >
              <span>Join {domain.name} Domain Track</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={onClose}
              className="w-full sm:w-auto px-6 h-12 rounded-xl border border-[#071B34]/20 text-[#071B34] font-semibold text-xs sm:text-sm hover:bg-[#071B34]/5 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
