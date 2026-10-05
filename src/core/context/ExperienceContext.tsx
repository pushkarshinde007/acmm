import React, { createContext, useState } from 'react'
import { useReducedMotion } from '@/core/hooks/useReducedMotion'
import { useQualityTier, type QualityTier } from '@/core/hooks/useQualityTier'
import { useScrollProgress } from '@/core/hooks/useScrollProgress'
export { useExperience } from './useExperience'

export interface ExperienceContextType {
  qualityTier: QualityTier
  setQualityTier: (tier: QualityTier) => void
  prefersReducedMotion: boolean
  scrollProgress: number
  smoothScrollProgress: number
  isStudentWalking: boolean
  isJoinModalOpen: boolean
  openJoinModal: () => void
  closeJoinModal: () => void
  activeSection: string
  setActiveSection: (section: string) => void
}

export const ExperienceContext = createContext<ExperienceContextType | undefined>(undefined)

export const ExperienceProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const autoTier = useQualityTier()
  const [qualityTier, setQualityTier] = useState<QualityTier>(autoTier)
  const prefersReducedMotion = useReducedMotion()
  const scrollState = useScrollProgress()
  const [isJoinModalOpen, setIsJoinModalOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')

  const openJoinModal = () => setIsJoinModalOpen(true)
  const closeJoinModal = () => setIsJoinModalOpen(false)

  return (
    <ExperienceContext.Provider
      value={{
        qualityTier,
        setQualityTier,
        prefersReducedMotion,
        scrollProgress: scrollState.rawProgress,
        smoothScrollProgress: scrollState.smoothProgress,
        isStudentWalking: scrollState.isWalking,
        isJoinModalOpen,
        openJoinModal,
        closeJoinModal,
        activeSection,
        setActiveSection,
      }}
    >
      {children}
    </ExperienceContext.Provider>
  )
}
