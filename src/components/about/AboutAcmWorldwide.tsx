import React from 'react'
import { Users, Globe, Layers, Landmark, ExternalLink } from 'lucide-react'
import { siteConfig } from '@/core/config/site.config'

import yelenaImg from '@/assets/about/yelena_yesha.jpg'
import marceloImg from '@/assets/about/marcelo_viana.jpg'
import yannisImg from '@/assets/about/yannis_ioannidis.jpg'
import rachanaImg from '@/assets/about/rachana_anandan.jpg'

export const AboutAcmWorldwide: React.FC = () => {
  const leadershipPhotos = [yelenaImg, marceloImg, yannisImg, rachanaImg]
  const statIcons = [Users, Globe, Layers, Landmark]

  return (
    <section className="relative w-full bg-[#051329] text-white py-16 sm:py-24 overflow-hidden border-t border-[#1764BD]/20">
      {/* Background Gradients & Architectural Glow */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-[#1764BD]/12 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-[#2D75C9]/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
          
          {/* 1. Left Panel (Col 1-3.5): ACM Worldwide Intro */}
          <div className="lg:col-span-3 flex flex-col justify-between space-y-6">
            <div>
              {/* Heading: ACM WORLDWIDE */}
              <h2 className="font-display text-3xl sm:text-4xl lg:text-[40px] font-black tracking-tight leading-tight">
                <span className="text-white">{siteConfig.worldwide.headingPrefix} </span>
                <span className="text-[#2D75C9]">{siteConfig.worldwide.headingAccent}</span>
              </h2>

              {/* Subtitle */}
              <p className="text-xs sm:text-[13px] font-bold tracking-wider uppercase text-[#69BCE8] mt-2 mb-4">
                {siteConfig.worldwide.subtitle}
              </p>

              {/* Description */}
              <p className="text-[13.5px] sm:text-[14px] leading-[1.7] text-white/70 font-light">
                {siteConfig.worldwide.description}
              </p>
            </div>

            {/* White Button: ABOUT ACM → */}
            <div className="pt-2">
              <a
                href={siteConfig.worldwide.ctaUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 h-11 px-6 rounded-md font-semibold text-[#071B34] bg-white hover:bg-[#B9DDF2] transition-all duration-200 shadow-md hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 text-xs sm:text-sm tracking-wide"
              >
                <span>{siteConfig.worldwide.cta}</span>
                <ExternalLink className="w-3.5 h-3.5 text-[#071B34]" />
              </a>
            </div>
          </div>

          {/* 2. Center Panel (Col 4-7.5): Global Statistics & Glowing World Map */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-4 rounded-2xl bg-white/[0.03] border border-white/10 p-5 sm:p-6 backdrop-blur-sm">
            {/* Four Compact Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pb-4 border-b border-white/10">
              {siteConfig.worldwide.stats.map((stat, idx) => {
                const Icon = statIcons[idx] || Users
                return (
                  <div key={stat.label} className="flex flex-col">
                    <div className="flex items-center gap-1.5 text-[#2D75C9] mb-1">
                      <Icon className="w-3.5 h-3.5" />
                      <span className="font-display font-black text-lg sm:text-xl text-white tracking-tight">
                        {stat.value}
                      </span>
                    </div>
                    <span className="text-[10.5px] text-white/60 font-medium leading-tight">
                      {stat.label}
                    </span>
                  </div>
                )
              })}
            </div>

            {/* Glowing World Map Canvas/SVG with Connected Nodes */}
            <div className="relative w-full h-[220px] sm:h-[260px] flex items-center justify-center overflow-hidden">
              <svg
                viewBox="0 0 1000 500"
                className="w-full h-full opacity-70"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <linearGradient id="mapGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#1457A6" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#2D75C9" stopOpacity="0.4" />
                  </linearGradient>
                  <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="3" result="blur" />
                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                  </filter>
                </defs>

                {/* Stylized Vector World Continents Paths */}
                {/* North America */}
                <path
                  d="M150,110 Q210,90 280,120 Q320,160 290,220 Q260,260 210,240 Q160,200 150,110 Z"
                  fill="url(#mapGradient)"
                  opacity="0.35"
                />
                {/* South America */}
                <path
                  d="M270,270 Q320,290 340,360 Q320,440 280,430 Q240,360 270,270 Z"
                  fill="url(#mapGradient)"
                  opacity="0.35"
                />
                {/* Europe */}
                <path
                  d="M470,100 Q550,90 580,140 Q540,190 480,170 Q450,130 470,100 Z"
                  fill="url(#mapGradient)"
                  opacity="0.35"
                />
                {/* Africa */}
                <path
                  d="M480,200 Q560,190 580,280 Q560,370 510,380 Q470,300 480,200 Z"
                  fill="url(#mapGradient)"
                  opacity="0.35"
                />
                {/* Asia */}
                <path
                  d="M600,100 Q780,80 850,150 Q830,260 740,270 Q670,250 620,180 Z"
                  fill="url(#mapGradient)"
                  opacity="0.35"
                />
                {/* India Subcontinent */}
                <path
                  d="M670,220 Q720,220 710,290 Q680,310 660,260 Z"
                  fill="url(#mapGradient)"
                  opacity="0.45"
                />
                {/* Australia */}
                <path
                  d="M800,340 Q880,330 890,390 Q850,430 790,410 Q780,360 800,340 Z"
                  fill="url(#mapGradient)"
                  opacity="0.35"
                />

                {/* Network Arcs */}
                <path
                  d="M240,170 Q380,80 510,130"
                  stroke="#2D75C9"
                  strokeWidth="1.5"
                  strokeDasharray="4 4"
                  opacity="0.8"
                />
                <path
                  d="M510,130 Q600,140 680,250"
                  stroke="#69BCE8"
                  strokeWidth="1.5"
                  strokeDasharray="4 4"
                  opacity="0.9"
                />
                <path
                  d="M680,250 Q760,280 840,360"
                  stroke="#2D75C9"
                  strokeWidth="1.5"
                  strokeDasharray="4 4"
                  opacity="0.8"
                />
                <path
                  d="M240,170 Q460,220 680,250"
                  stroke="#2D75C9"
                  strokeWidth="1.2"
                  strokeDasharray="3 3"
                  opacity="0.6"
                />

                {/* Major Chapter Nodes with Pulsing Glow */}
                {/* Silicon Valley */}
                <circle cx="200" cy="170" r="4" fill="#69BCE8" filter="url(#glow)" />
                <circle cx="200" cy="170" r="8" stroke="#69BCE8" strokeWidth="1" opacity="0.6" />

                {/* New York */}
                <circle cx="260" cy="160" r="4.5" fill="#69BCE8" filter="url(#glow)" />

                {/* London / Europe */}
                <circle cx="500" cy="130" r="4" fill="#69BCE8" filter="url(#glow)" />

                {/* NMIET Pune / India Hub — Highlighted */}
                <circle cx="685" cy="255" r="6" fill="#38BDF8" filter="url(#glow)" />
                <circle cx="685" cy="255" r="14" stroke="#38BDF8" strokeWidth="1.5" opacity="0.8" />
                <circle cx="685" cy="255" r="22" stroke="#2D75C9" strokeWidth="0.8" strokeDasharray="3 3" opacity="0.5" />

                {/* East Asia / Tokyo */}
                <circle cx="810" cy="180" r="4" fill="#69BCE8" filter="url(#glow)" />

                {/* Australia */}
                <circle cx="840" cy="365" r="3.5" fill="#69BCE8" filter="url(#glow)" />
              </svg>

              {/* NMIET Badge on Map */}
              <div className="absolute bottom-2 left-3 bg-[#071B34]/90 border border-[#2D75C9]/40 px-2.5 py-1 rounded-md text-[10.5px] font-mono text-[#69BCE8] flex items-center gap-1.5 shadow-md">
                <span className="w-1.5 h-1.5 rounded-full bg-[#38BDF8] animate-ping" />
                <span>NMIET CHAPTER • PUNE, IN</span>
              </div>
            </div>
          </div>

          {/* 3. Right Panel (Col 8-12): ACM Global Leadership */}
          <div className="lg:col-span-4 flex flex-col justify-between space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-white/10">
              <h3 className="font-display text-sm sm:text-base font-bold uppercase tracking-wider text-white">
                {siteConfig.worldwide.leadership.heading}
              </h3>
              <a
                href={siteConfig.worldwide.leadership.viewAllUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-semibold text-[#69BCE8] hover:text-white flex items-center gap-1 transition-colors"
              >
                <span>{siteConfig.worldwide.leadership.viewAllText}</span>
              </a>
            </div>

            {/* Four Portrait Cards Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4 gap-2.5 sm:gap-3">
              {siteConfig.worldwide.leadership.members.map((member, idx) => {
                const photo = leadershipPhotos[idx] || yelenaImg
                return (
                  <div
                    key={member.name}
                    className="group relative rounded-xl overflow-hidden bg-[#071B34] border border-white/10 hover:border-[#2D75C9]/60 shadow-lg transition-all duration-300 hover:-translate-y-1"
                  >
                    {/* Portrait Photo */}
                    <div className="w-full aspect-[3/4] overflow-hidden">
                      <img
                        src={photo}
                        alt={member.name}
                        className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>

                    {/* Dark Translucent Overlay at Bottom */}
                    <div className="absolute inset-x-0 bottom-0 p-2 sm:p-2.5 bg-gradient-to-t from-[#051329] via-[#051329]/90 to-transparent">
                      <div className="font-display text-[11px] sm:text-[11.5px] font-bold text-white leading-tight truncate">
                        {member.name}
                      </div>
                      <div className="text-[9.5px] sm:text-[10px] text-[#69BCE8] font-medium leading-tight truncate mt-0.5">
                        {member.role}
                      </div>
                      <div className="text-[8.5px] text-white/50 font-mono mt-0.5">
                        {member.term}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Citation Note */}
            <p className="text-[10px] text-white/40 italic text-right">
              Official ACM leadership roster • Verified educational society governance
            </p>
          </div>

        </div>
      </div>
    </section>
  )
}
