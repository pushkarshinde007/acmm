import React from 'react'
import { GlyphPortal } from '@/components/ui/glyph-portal'
import { AboutMasterPage } from '@/components/about/AboutMasterPage'
import { ArrowDown } from 'lucide-react'

export const AboutTransition: React.FC = () => {
  return (
    <section id="about" className="relative w-full bg-[#FAF7EF] select-none">
      {/* 1. Cinematic Glyph Portal: Camera travels through live "COMMUNITY" type */}
      <GlyphPortal
        word="COMMUNITY"
        activeLetter="M"
        fontFamily="Outfit, var(--font-display, sans-serif)"
        fontWeight={900}
        scrollLength={1.8}
        interactive={true}
        enterLabel="STEPPING THROUGH"
        style={{
          '--gp-paper': '#FAF7EF',
          '--gp-ink': '#071B34',
          '--gp-field': '#FAF7EF',
          '--gp-foreground': '#102033',
        }}
        front={
          <div className="w-full max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-12 h-full flex flex-col justify-between py-24 sm:py-28">
            <div className="pt-6">
              <span className="font-mono text-xs font-semibold tracking-widest text-[#1764BD] uppercase">
                02 • ABOUT ACM NMIET
              </span>
              <h2 className="font-display font-black text-3xl sm:text-5xl lg:text-6xl text-[#071B34] tracking-tight mt-2">
                A COMMUNITY THAT BUILDS.
              </h2>
            </div>
            <div className="flex items-center gap-2 text-xs font-mono text-[#536273] pb-6">
              <span className="w-2 h-2 rounded-full bg-[#1764BD] animate-pulse" />
              <span>Scroll to step through the glyph into About ACM NMIET ↓</span>
            </div>
          </div>
        }
      >
        {/* Gateway revealed when stepping through the letter 'M' */}
        <div className="relative w-full h-full flex flex-col items-center justify-center text-center px-4 bg-[#FAF7EF]">
          <span className="text-xs font-bold tracking-[0.2em] text-[#1764BD] uppercase mb-2">
            WELCOME TO ACM NMIET
          </span>
          <h2 className="font-display text-4xl sm:text-6xl font-black text-[#071B34] tracking-tight">
            A COMMUNITY THAT BUILDS <span className="text-[#1764BD]">BEYOND.</span>
          </h2>
          <p className="text-sm sm:text-base text-[#536273] max-w-lg mt-3">
            Explore our chapter story, milestone timeline, global ACM network, and student initiatives.
          </p>
          <div className="mt-6 flex items-center gap-2 text-xs font-mono text-[#1764BD] bg-white/80 border border-[#1764BD]/20 px-4 py-2 rounded-full shadow-sm">
            <ArrowDown className="w-3.5 h-3.5 animate-bounce" />
            <span>Scroll down to continue ↓</span>
          </div>
        </div>
      </GlyphPortal>

      {/* 2. The Complete Master About Page Section — Reproduced exactly from reference */}
      <div className="relative z-10 w-full">
        <AboutMasterPage />
      </div>
    </section>
  )
}

export default AboutTransition
