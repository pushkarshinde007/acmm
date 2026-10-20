import React, { useState } from 'react'
import { DomainsHero } from '@/components/domains/DomainsHero'
import { DomainPanels } from '@/components/domains/DomainPanels'
import { DomainDetailModal } from '@/components/domains/DomainDetailModal'
import { type DomainItem, domainsData } from '@/core/config/domains.data'

export const DomainsPage: React.FC = () => {
  const [activeDomain, setActiveDomain] = useState<DomainItem>(domainsData[0])
  const [modalDomain, setModalDomain] = useState<DomainItem | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleDomainChange = (domain: DomainItem) => {
    setActiveDomain(domain)
  }

  const handleExploreDomain = (domain: DomainItem) => {
    setActiveDomain(domain)
    setModalDomain(domain)
    setIsModalOpen(true)
  }

  const handleSelectPanel = (domain: DomainItem) => {
    setActiveDomain(domain)
    setModalDomain(domain)
    setIsModalOpen(true)
  }

  return (
    <section id="domains" className="relative w-full bg-[#FAF7EF] select-none scroll-mt-16">
      {/* 1. Hero Section with 3D WorksWheel Interactive Drum */}
      <DomainsHero
        activeDomain={activeDomain}
        onDomainChange={handleDomainChange}
        onExploreDomain={handleExploreDomain}
      />

      {/* 2. Five-Column Domain Information Panels */}
      <DomainPanels
        activeDomainId={activeDomain.id}
        onSelectDomain={handleSelectPanel}
      />

      {/* 3. Accessible Domain Detail Modal */}
      <DomainDetailModal
        domain={modalDomain}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </section>
  )
}

export default DomainsPage
