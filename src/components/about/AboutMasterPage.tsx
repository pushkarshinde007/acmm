import React from 'react'
import { AboutHeroSplit } from '@/components/about/AboutHeroSplit'
import { AboutStoryTimeline } from '@/components/about/AboutStoryTimeline'
import { AboutAcmWorldwide } from '@/components/about/AboutAcmWorldwide'
import { AboutWhatWeDo } from '@/components/about/AboutWhatWeDo'

export const AboutMasterPage: React.FC = () => {
  return (
    <div id="about-master" className="relative w-full bg-[#FAF7EF] text-[#071B34] flex flex-col">
      {/* 1. Hero Split Composition: Headline, 4 Pillars & Campus Illustration */}
      <AboutHeroSplit />

      {/* 2. Our Story, Milestone Timeline & Chapter Mission Card */}
      <AboutStoryTimeline />

      {/* 3. ACM Worldwide, Statistics, Glowing Network Map & Leadership Roster */}
      <AboutAcmWorldwide />

      {/* 4. What We Do: 5 Interactive Activity Image Cards */}
      <AboutWhatWeDo />
    </div>
  )
}

export default AboutMasterPage
