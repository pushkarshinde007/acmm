import { useState, useEffect } from 'react'

export type QualityTier = 'HIGH' | 'BALANCED' | 'LITE'

export function useQualityTier(): QualityTier {
  const [tier, setTier] = useState<QualityTier>('HIGH')

  useEffect(() => {
    // Check if mobile or low performance device
    const isMobile = window.innerWidth < 768 || /Android|iPhone|iPad|iPod/i.test(navigator.userAgent)
    const cores = navigator.hardwareConcurrency || 4
    const dpr = window.devicePixelRatio || 1

    if (isMobile || cores <= 2) {
      setTier('LITE')
    } else if (cores <= 4 || dpr > 2) {
      setTier('BALANCED')
    } else {
      setTier('HIGH')
    }
  }, [])

  return tier
}
