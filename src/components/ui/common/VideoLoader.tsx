import React, { useState, useEffect, useRef } from 'react'

interface VideoLoaderProps {
  onComplete?: () => void
  durationSeconds?: number
}

export const VideoLoader: React.FC<VideoLoaderProps> = ({
  onComplete,
  durationSeconds = 5,
}) => {
  const [isVisible, setIsVisible] = useState(true)
  const [isFadingOut, setIsFadingOut] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    // Attempt playback immediately
    if (videoRef.current) {
      videoRef.current.play().catch(() => {
        // Autoplay policy fallback: muted video allows autoplay in modern browsers
        if (videoRef.current) {
          videoRef.current.muted = true
          videoRef.current.play().catch(() => {})
        }
      })
    }

    // Begin fade-out 700ms before total 5 seconds
    const fadeOutDelay = Math.max((durationSeconds * 1000) - 700, 1000)
    const fadeOutTimer = setTimeout(() => {
      setIsFadingOut(true)
    }, fadeOutDelay)

    // Complete loader after exactly 5 seconds
    const finishTimer = setTimeout(() => {
      setIsVisible(false)
      onComplete?.()
    }, durationSeconds * 1000)

    return () => {
      clearTimeout(fadeOutTimer)
      clearTimeout(finishTimer)
    }
  }, [durationSeconds, onComplete])

  const handleSkip = () => {
    setIsFadingOut(true)
    setTimeout(() => {
      setIsVisible(false)
      onComplete?.()
    }, 400)
  }

  if (!isVisible) return null

  return (
    <aside
      aria-label="Welcome Introduction Animation"
      className={`fixed inset-0 z-[9999] flex items-center justify-center bg-[#FAF7EF] overflow-hidden transition-all duration-700 ease-out select-none ${
        isFadingOut ? 'opacity-0 pointer-events-none scale-[1.02]' : 'opacity-100 scale-100'
      }`}
    >
      {/* 1. Fullscreen Clean Video Animation (No bottom controls, no progress bar, no percentage) */}
      <div className="relative w-full h-full flex items-center justify-center">
        <video
          ref={videoRef}
          src="/intro_loader.mp4"
          autoPlay
          muted
          playsInline
          preload="auto"
          className="w-full h-full object-cover object-center"
        />

        {/* Soft edge ambient blend to ensure seamless ivory transition */}
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-[#FAF7EF]/30 via-transparent to-[#FAF7EF]/20" />
      </div>

      {/* 2. Minimal Subtle Skip Button (Accessible and non-intrusive) */}
      <button
        onClick={handleSkip}
        className="absolute top-6 right-6 z-20 px-3.5 py-1.5 rounded-full bg-[#FAF7EF]/85 hover:bg-[#FAF7EF] text-[#071B34] text-xs font-mono font-medium tracking-wider uppercase border border-[#071B34]/15 shadow-sm backdrop-blur-sm transition-all duration-300 hover:scale-105 active:scale-95"
        aria-label="Skip introductory video animation"
      >
        Skip →
      </button>
    </aside>
  )
}
