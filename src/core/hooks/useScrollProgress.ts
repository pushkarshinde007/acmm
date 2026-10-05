import { useState, useEffect, useRef } from 'react'

export interface ScrollProgressState {
  rawProgress: number // 0 to 1
  smoothProgress: number // 0 to 1 damped
  isWalking: boolean // true when progress > 0.15 and moving
  direction: 'forward' | 'backward' | 'idle'
}

export function useScrollProgress(containerRef?: React.RefObject<HTMLElement | null>) {
  const [progressState, setProgressState] = useState<ScrollProgressState>({
    rawProgress: 0,
    smoothProgress: 0,
    isWalking: false,
    direction: 'idle',
  })

  const targetProgress = useRef(0)
  const currentProgress = useRef(0)
  const lastProgress = useRef(0)
  const animFrameId = useRef<number | null>(null)

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      const normalized = Math.min(Math.max(scrollY / (window.innerHeight * 1.5), 0), 1)
      targetProgress.current = normalized
    }

    const updateLoop = () => {
      // Lerp smoothing with 0.08 damping factor
      const diff = targetProgress.current - currentProgress.current
      if (Math.abs(diff) > 0.0001) {
        currentProgress.current += diff * 0.08
      } else {
        currentProgress.current = targetProgress.current
      }

      const delta = currentProgress.current - lastProgress.current
      const isMoving = Math.abs(delta) > 0.0005
      const direction = delta > 0.0005 ? 'forward' : delta < -0.0005 ? 'backward' : 'idle'
      const isWalking = (isMoving && currentProgress.current > 0.05) || currentProgress.current > 0.25

      setProgressState({
        rawProgress: targetProgress.current,
        smoothProgress: currentProgress.current,
        isWalking,
        direction,
      })

      lastProgress.current = currentProgress.current
      animFrameId.current = requestAnimationFrame(updateLoop)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    animFrameId.current = requestAnimationFrame(updateLoop)

    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (animFrameId.current) cancelAnimationFrame(animFrameId.current)
    }
  }, [containerRef])

  return progressState
}
