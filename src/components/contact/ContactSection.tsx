import React, { useEffect, useRef, useState, useCallback } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { siteConfig } from '@/core/config/site.config'
import './contact.css'

gsap.registerPlugin(ScrollTrigger)

const TOTAL_FRAMES = 125
const FRAME_PATH = (idx: number) =>
  `/contact/laptop/frame_${String(idx + 1).padStart(4, '0')}.webp`

export const ContactSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null)
  const laptopSectionRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const headingRef = useRef<HTMLDivElement>(null)
  const formOverlayRef = useRef<HTMLDivElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const fieldsRef = useRef<HTMLDivElement>(null)
  const submitRef = useRef<HTMLDivElement>(null)

  const [isMobile, setIsMobile] = useState(false)
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [statusMessage, setStatusMessage] = useState('')
  const [statusType, setStatusType] = useState<'success' | 'error' | ''>('')

  // Images cache & active frame tracking
  const framesCache = useRef<Map<number, HTMLImageElement>>(new Map())
  const currentFrameRef = useRef<number>(0)

  // Detect mobile/tablet screen or coarse pointer
  useEffect(() => {
    const checkMobile = () => {
      const isNarrow = window.innerWidth <= 1024
      const isCoarse = window.matchMedia('(pointer: coarse)').matches
      setIsMobile(isNarrow || isCoarse)
    }

    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Draw frame on canvas with crisp rendering
  const drawFrame = useCallback((frameIdx: number) => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d', { alpha: true })
    if (!ctx) return

    const clampedIdx = Math.max(0, Math.min(TOTAL_FRAMES - 1, Math.round(frameIdx)))
    currentFrameRef.current = clampedIdx

    const cachedImg = framesCache.current.get(clampedIdx)
    if (cachedImg && cachedImg.complete && cachedImg.naturalWidth > 0) {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.drawImage(cachedImg, 0, 0, canvas.width, canvas.height)
    } else {
      const img = new Image()
      img.src = FRAME_PATH(clampedIdx)
      img.onload = () => {
        framesCache.current.set(clampedIdx, img)
        if (currentFrameRef.current === clampedIdx) {
          ctx.clearRect(0, 0, canvas.width, canvas.height)
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
        }
      }
    }
  }, [])

  // Preload frames eagerly
  useEffect(() => {
    if (isMobile) return

    let isCancelled = false

    const loadSingleFrame = (idx: number): Promise<void> => {
      return new Promise((resolve) => {
        if (framesCache.current.has(idx)) {
          resolve()
          return
        }
        const img = new Image()
        img.src = FRAME_PATH(idx)
        img.onload = () => {
          if (!isCancelled) framesCache.current.set(idx, img)
          resolve()
        }
        img.onerror = () => resolve()
      })
    }

    // Phase 1: Load first frame and final opened frame immediately
    Promise.all([loadSingleFrame(0), loadSingleFrame(TOTAL_FRAMES - 1)]).then(() => {
      if (!isCancelled) drawFrame(0)
    })

    // Phase 2: Load keyframes across sequence (every 4th frame)
    const keyframes = Array.from({ length: 32 }, (_, i) => i * 4)
    Promise.all(keyframes.map(loadSingleFrame)).then(() => {
      // Phase 3: Load all remaining frames progressively
      let frameCursor = 1
      const interval = setInterval(() => {
        if (isCancelled || frameCursor >= TOTAL_FRAMES) {
          clearInterval(interval)
          return
        }
        for (let b = 0; b < 4 && frameCursor < TOTAL_FRAMES; b++) {
          loadSingleFrame(frameCursor)
          frameCursor++
        }
      }, 25)
    })

    return () => {
      isCancelled = true
    }
  }, [isMobile, drawFrame])

  // Canvas resize and DPI scaling
  useEffect(() => {
    if (isMobile) return

    const handleResize = () => {
      const canvas = canvasRef.current
      if (!canvas) return
      const rect = canvas.getBoundingClientRect()
      if (!rect.width || !rect.height) return

      const dpr = Math.min(window.devicePixelRatio || 1, 1.5)
      const w = Math.round(rect.width * dpr)
      const h = Math.round(rect.height * dpr)

      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w
        canvas.height = h
        drawFrame(currentFrameRef.current)
      }
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [isMobile, drawFrame])

  // GSAP ScrollTrigger timeline for Desktop Laptop
  useEffect(() => {
    if (isMobile || !laptopSectionRef.current || !canvasRef.current) return

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches

    if (prefersReducedMotion) {
      drawFrame(TOTAL_FRAMES - 1)
      if (headingRef.current) {
        headingRef.current.style.opacity = '0'
        headingRef.current.style.pointerEvents = 'none'
      }
      if (formOverlayRef.current) {
        formOverlayRef.current.style.opacity = '1'
        formOverlayRef.current.style.visibility = 'visible'
        formOverlayRef.current.style.pointerEvents = 'auto'
      }
      return
    }

    const state = { frame: 0 }

    const ctx = gsap.context(() => {
      // Master timeline scrubbed by scroll
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: laptopSectionRef.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.4,
          onUpdate: (self) => {
            const p = self.progress
            // Safety: strictly hide overlay when laptop is closed
            if (p < 0.45 && formOverlayRef.current) {
              formOverlayRef.current.style.visibility = 'hidden'
              formOverlayRef.current.style.opacity = '0'
              formOverlayRef.current.style.pointerEvents = 'none'
            }
            // Safety: strictly show overlay when reaching bottom
            if (p >= 0.85 && formOverlayRef.current) {
              formOverlayRef.current.style.visibility = 'visible'
              formOverlayRef.current.style.opacity = '1'
              formOverlayRef.current.style.pointerEvents = 'auto'
            }
          },
        },
      })

      // 1. Initial State: Hold closed laptop (t = 0 to 0.25)
      tl.to(state, {
        frame: 0,
        duration: 0.25,
        onUpdate: () => drawFrame(0),
      })

      // 2. Lid Opening Sequence: Frame 0 -> 124 (t = 0.25 to 1.85)
      tl.to(
        state,
        {
          frame: TOTAL_FRAMES - 1,
          snap: 'frame',
          ease: 'power1.inOut',
          duration: 1.6,
          onUpdate: () => {
            drawFrame(state.frame)
          },
        },
        0.25
      )

      // 3. "Contact us!" Heading floats up and fades out (t = 0.40 to 0.85)
      tl.to(
        headingRef.current,
        {
          opacity: 0,
          y: -40,
          duration: 0.45,
          ease: 'power1.out',
          pointerEvents: 'none',
        },
        0.4
      )

      // 4. Form Overlay Becomes Visible & Fades In inside screen (t = 1.15 to 1.65)
      // At t = 1.15, the laptop lid is already upright (frame ~72)
      tl.set(
        formOverlayRef.current,
        {
          visibility: 'visible',
        },
        1.15
      )

      tl.to(
        formOverlayRef.current,
        {
          opacity: 1,
          duration: 0.5,
          ease: 'power2.out',
          pointerEvents: 'auto',
        },
        1.15
      )

      // 5. Progressive Reveal of Inner Elements (staggered naturally as lid settles):
      if (headerRef.current) {
        tl.fromTo(
          headerRef.current,
          { opacity: 0, y: 12 },
          { opacity: 1, y: 0, duration: 0.35, ease: 'power2.out' },
          1.25
        )
      }

      if (fieldsRef.current) {
        tl.fromTo(
          fieldsRef.current,
          { opacity: 0, y: 12 },
          { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' },
          1.38
        )
      }

      if (submitRef.current) {
        tl.fromTo(
          submitRef.current,
          { opacity: 0, scale: 0.95 },
          { opacity: 1, scale: 1, duration: 0.3, ease: 'back.out(1.5)' },
          1.52
        )
      }

      // 6. Hold opened state for remainder of the section (t = 1.85 to 2.4)
      tl.to({}, { duration: 0.55 })
    }, laptopSectionRef)

    return () => {
      ctx.revert()
    }
  }, [isMobile, drawFrame])

  // Interactive Click: smoothly scroll to the fully opened laptop position
  const handleOpenLaptop = () => {
    if (!laptopSectionRef.current) return
    const rect = laptopSectionRef.current.getBoundingClientRect()
    // Scroll to 75% down the section where laptop is 100% open
    const targetScrollY =
      window.scrollY + rect.top + laptopSectionRef.current.offsetHeight * 0.72
    window.scrollTo({
      top: targetScrollY,
      behavior: 'smooth',
    })
  }

  // Interactive Close: click macOS red dot to scroll back up to closed state
  const handleCloseLaptop = () => {
    if (!laptopSectionRef.current) return
    const rect = laptopSectionRef.current.getBoundingClientRect()
    const targetScrollY = window.scrollY + rect.top
    window.scrollTo({
      top: targetScrollY,
      behavior: 'smooth',
    })
  }

  // Form submission handler
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setStatusMessage('')

    if (!formData.email.includes('@')) {
      setStatusType('error')
      setStatusMessage('Please enter a valid email address.')
      setIsSubmitting(false)
      return
    }

    setTimeout(() => {
      setIsSubmitting(false)
      setStatusType('success')
      setStatusMessage(
        'Thank you! Your message has been sent to ACM NMIET. We will get back to you shortly.'
      )
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        message: '',
      })
    }, 700)
  }

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  return (
    <section id="contact" ref={sectionRef} className="contact-section">
      {/* ============================================================== */}
      {/* DESKTOP VARIANT: 3D LAPTOP CANVAS SCROLL INTERFACE (>1024px)   */}
      {/* ============================================================== */}
      {!isMobile && (
        <div ref={laptopSectionRef} className="laptop-section">
          <div className="laptop-sticky">
            {/* 16:9 Stage Wrapper locks Canvas & Screen Form together */}
            <div className="laptop-stage-wrapper">
              {/* Canvas rendering 125-frame 3D Laptop animation */}
              <canvas
                ref={canvasRef}
                id="laptop-canvas"
                width={1920}
                height={1080}
                onClick={handleOpenLaptop}
                className="cursor-pointer"
                title="Scroll or click to open MacBook"
              />

              {/* "Contact us!" Heading (Centered over closed laptop lid) */}
              <div
                ref={headingRef}
                className="contact-heading"
                onClick={handleOpenLaptop}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') handleOpenLaptop()
                }}
              >
                <h2 className="contact-heading-title">Contact us!</h2>
                <p className="contact-heading-hint animate-bounce-subtle">
                  <span>Scroll down or click to open</span>
                  <span>•</span>
                  <span>Say Hello!</span>
                </p>
              </div>

              {/* Contact Form Overlay (Strictly transparent, positioned over physical laptop screen) */}
              <div
                ref={formOverlayRef}
                className="contact-form-overlay"
                style={{
                  opacity: 0,
                  visibility: 'hidden',
                  pointerEvents: 'none',
                  background: 'transparent',
                  border: 'none',
                  boxShadow: 'none',
                }}
              >
                <div className="contact-screen-card">
                  {/* macOS Window Header Bar & Title */}
                  <div ref={headerRef} className="w-full flex flex-col items-center">
                    <div className="macos-window-bar">
                      <div className="macos-traffic-dots">
                        <button
                          type="button"
                          onClick={handleCloseLaptop}
                          className="macos-dot macos-dot-close"
                          title="Close window (scroll to top)"
                          aria-label="Close contact window"
                        />
                        <button
                          type="button"
                          className="macos-dot macos-dot-minimize"
                          title="Minimize window"
                          aria-label="Minimize contact window"
                        />
                        <button
                          type="button"
                          className="macos-dot macos-dot-maximize"
                          title="Maximize window"
                          aria-label="Maximize contact window"
                        />
                      </div>
                      <span className="macos-title">
                        {siteConfig.chapter.name} • Contact Portal
                      </span>
                      <div className="flex items-center gap-1.5 text-[10px] text-emerald-600 font-mono">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                        <span>Online</span>
                      </div>
                    </div>

                    {/* Window Heading & Contact Details Badge */}
                    <h3 className="text-stone-900 text-lg sm:text-xl font-bold tracking-tight text-center">
                      Say Hello!
                    </h3>

                    {/* Verified Chapter Contact Information Banner */}
                    <div className="contact-info-badge">
                      <span>{siteConfig.chapter.name}</span>
                      <span>•</span>
                      <span>acm@nmiet.edu.in</span>
                      <span>•</span>
                      <span>NMIET Pune</span>
                    </div>
                  </div>

                  {/* Contact Form Fields (inputs with dashed borders directly on laptop screen) */}
                  <form
                    onSubmit={handleSubmit}
                    className="contact-form pointer-events-auto flex w-full max-w-[460px] flex-col gap-2 text-xs text-black px-1"
                  >
                    <div ref={fieldsRef} className="w-full flex flex-col gap-1.5">
                      {/* First Name & Last Name */}
                      <div className="grid grid-cols-2 gap-2.5">
                        <label className="flex flex-col gap-0.5 text-[9px] font-semibold uppercase tracking-[0.25em] text-neutral-600">
                          First Name
                          <input
                            type="text"
                            name="firstName"
                            required
                            value={formData.firstName}
                            onChange={handleInputChange}
                            placeholder="Your name"
                            className="contact-input"
                          />
                        </label>
                        <label className="flex flex-col gap-0.5 text-[9px] font-semibold uppercase tracking-[0.25em] text-neutral-600">
                          Last Name
                          <input
                            type="text"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleInputChange}
                            placeholder="Surname"
                            className="contact-input"
                          />
                        </label>
                      </div>

                      {/* Email & Phone */}
                      <div className="grid grid-cols-2 gap-2.5">
                        <label className="flex flex-col gap-0.5 text-[9px] font-semibold uppercase tracking-[0.25em] text-neutral-600">
                          Email
                          <input
                            type="email"
                            name="email"
                            required
                            value={formData.email}
                            onChange={handleInputChange}
                            placeholder="name@nmiet.edu.in"
                            className="contact-input"
                          />
                        </label>
                        <label className="flex flex-col gap-0.5 text-[9px] font-semibold uppercase tracking-[0.25em] text-neutral-600">
                          Phone
                          <input
                            type="tel"
                            name="phone"
                            inputMode="tel"
                            value={formData.phone}
                            onChange={handleInputChange}
                            placeholder="+91 98765 43210"
                            className="contact-input"
                          />
                        </label>
                      </div>

                      {/* Message */}
                      <label className="flex flex-col gap-0.5 text-[9px] font-semibold uppercase tracking-[0.25em] text-neutral-600">
                        Message
                        <textarea
                          name="message"
                          rows={2}
                          required
                          value={formData.message}
                          onChange={handleInputChange}
                          placeholder="Type your message, questions, or collaboration ideas..."
                          className="contact-input resize-none py-1"
                        />
                      </label>
                    </div>

                    {/* Submit Button */}
                    <div ref={submitRef} className="flex flex-col items-center gap-1 mt-0.5">
                      <div className="w-36 h-8 sm:w-38 sm:h-9 bg-stone-900 rounded-[200px] flex items-center justify-center overflow-hidden shadow-md hover:scale-105 transition-transform">
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="w-full h-full text-xs sm:text-sm font-light text-[#FFEEAD] uppercase tracking-wider hover:bg-stone-800 transition-colors cursor-pointer"
                        >
                          {isSubmitting ? 'Sending...' : 'Submit'}
                        </button>
                      </div>

                      {/* Status Feedback */}
                      {statusMessage && (
                        <p
                          className={`text-center text-[10px] font-mono tracking-normal px-2 ${
                            statusType === 'success'
                              ? 'text-emerald-700'
                              : 'text-rose-600'
                          }`}
                        >
                          {statusMessage}
                        </p>
                      )}
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* MOBILE VARIANT: RESPONSIVE FROSTED GLASS CARD (<=1024px)       */}
      {/* ============================================================== */}
      {isMobile && (
        <div className="w-full px-4 py-16 bg-[#050505] flex justify-center">
          <div className="mx-auto max-w-xl w-full rounded-[32px] border border-white/15 bg-white/[0.04] backdrop-blur-md p-6 sm:p-8 text-white shadow-[0_15px_45px_rgba(0,0,0,0.45)]">
            {/* macOS traffic dots at top */}
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-white/10">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-[#ff5f56]" />
                <span className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                <span className="w-3 h-3 rounded-full bg-[#27c93f]" />
              </div>
              <span className="text-[11px] font-mono tracking-widest text-white/50 uppercase">
                {siteConfig.chapter.name}
              </span>
            </div>

            {/* Header */}
            <div className="mb-6 text-center">
              <h3 className="text-3xl sm:text-4xl font-semibold uppercase tracking-tight text-white">
                Contact us!
              </h3>
              <p className="mt-2 text-xs uppercase tracking-[0.45em] text-white/60">
                Say Hello!
              </p>
              {/* Verified Chapter Contact Badge */}
              <div className="mt-3 inline-flex items-center gap-2 text-xs text-white/50 font-mono">
                <span>acm@nmiet.edu.in</span>
                <span>•</span>
                <span>NMIET Pune</span>
              </div>
            </div>

            {/* Mobile Form */}
            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-4 text-sm"
            >
              {/* First Name & Last Name */}
              <div className="flex flex-col gap-4 sm:flex-row sm:gap-3">
                <label className="flex-1 flex flex-col gap-2 text-xs font-semibold uppercase tracking-[0.35em] text-white/60">
                  First Name
                  <input
                    type="text"
                    name="firstName"
                    required
                    value={formData.firstName}
                    onChange={handleInputChange}
                    placeholder="Your name"
                    className="contact-mobile-input"
                  />
                </label>
                <label className="flex-1 flex flex-col gap-2 text-xs font-semibold uppercase tracking-[0.35em] text-white/60">
                  Last Name
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    placeholder="Surname"
                    className="contact-mobile-input"
                  />
                </label>
              </div>

              {/* Email */}
              <label className="flex flex-col gap-2 text-xs font-semibold uppercase tracking-[0.35em] text-white/60">
                Email
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="name@nmiet.edu.in"
                  className="contact-mobile-input"
                />
              </label>

              {/* Phone */}
              <label className="flex flex-col gap-2 text-xs font-semibold uppercase tracking-[0.35em] text-white/60">
                Phone
                <input
                  type="tel"
                  name="phone"
                  inputMode="tel"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="+91 98765 43210"
                  className="contact-mobile-input"
                />
              </label>

              {/* Message */}
              <label className="flex flex-col gap-2 text-xs font-semibold uppercase tracking-[0.35em] text-white/60">
                Message
                <textarea
                  name="message"
                  rows={4}
                  required
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Type your message, questions, or collaboration ideas..."
                  className="contact-mobile-input resize-none"
                />
              </label>

              {/* Submit button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="mt-2 inline-flex items-center justify-center rounded-full border border-white/60 px-8 py-3 text-base sm:text-lg font-semibold uppercase tracking-[0.35em] text-white transition hover:bg-white/10 hover:border-[#F95F4A] active:scale-95 cursor-pointer"
              >
                {isSubmitting ? 'Submitting...' : 'Submit'}
              </button>

              {/* Status Message */}
              {statusMessage && (
                <p
                  className={`text-center text-xs font-mono tracking-normal mt-2 ${
                    statusType === 'success'
                      ? 'text-emerald-400'
                      : 'text-rose-400'
                  }`}
                >
                  {statusMessage}
                </p>
              )}
            </form>
          </div>
        </div>
      )}
    </section>
  )
}
