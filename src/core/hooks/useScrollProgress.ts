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
  const isRunning = useRef(false)
  const animFrameId = useRef<number | null>(null)

  useEffect(() => {
    const updateLoop = () => {
      const diff = targetProgress.current - currentProgress.current
      if (Math.abs(diff) > 0.0005) {
        currentProgress.current += diff * 0.12
      } else {
        currentProgress.current = targetProgress.current
      }

      const delta = currentProgress.current - lastProgress.current
      const isMoving = Math.abs(delta) > 0.001
      const direction = delta > 0.001 ? 'forward' : delta < -0.001 ? 'backward' : 'idle'
      const isWalking = (isMoving && currentProgress.current > 0.05) || currentProgress.current > 0.25

      // Only update React state if there is meaningful visual change
      if (Math.abs(currentProgress.current - lastProgress.current) > 0.001 || !isMoving) {
        setProgressState({
          rawProgress: targetProgress.current,
          smoothProgress: currentProgress.current,
          isWalking,
          direction,
        })
        lastProgress.current = currentProgress.current
      }

      // Continue loop if still easing toward target
      if (Math.abs(targetProgress.current - currentProgress.current) > 0.0005) {
        animFrameId.current = requestAnimationFrame(updateLoop)
      } else {
        isRunning.current = false
      }
    }

    const handleScroll = () => {
      const scrollY = window.scrollY
      const normalized = Math.min(Math.max(scrollY / (window.innerHeight * 1.5), 0), 1)
      targetProgress.current = normalized

      if (!isRunning.current) {
        isRunning.current = true
        animFrameId.current = requestAnimationFrame(updateLoop)
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()

    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (animFrameId.current) cancelAnimationFrame(animFrameId.current)
    }
  }, [containerRef])

  return progressState
}
