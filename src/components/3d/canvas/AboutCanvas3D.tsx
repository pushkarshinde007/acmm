import React, { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { useExperience } from '@/core/context/ExperienceContext'

function AtmosphericParticles({ count = 50 }: { count?: number }) {
  const pointsRef = useRef<THREE.Points>(null)

  const [positions] = React.useState(() => {
    const pos = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 18
      pos[i * 3 + 1] = (Math.random() - 0.5) * 10 + 2
      pos[i * 3 + 2] = (Math.random() - 0.5) * 12
    }
    return pos
  })

  useFrame((_, delta) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += delta * 0.015
    }
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.055}
        color="#FFF4D6"
        transparent
        opacity={0.45}
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}

function AboutCameraRig({
  progress,
  mouseOffset,
  prefersReducedMotion,
}: {
  progress: number
  mouseOffset: { x: number; y: number }
  prefersReducedMotion: boolean
}) {
  useFrame(({ camera }) => {
    if (prefersReducedMotion) return

    // Camera moves forward from z=5.2 to z=3.8 and shifts slightly lateral (tracking shot)
    const targetZ = 5.2 - progress * 1.5
    const targetX = mouseOffset.x * 0.35 + (progress * -0.4)
    const targetY = mouseOffset.y * -0.2 + (progress * 0.1)

    camera.position.x = THREE.MathUtils.lerp(camera.position.x, targetX, 0.05)
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, targetY, 0.05)
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, targetZ, 0.05)

    camera.lookAt(0, 0, -2)
  })

  return null
}

interface AboutCanvas3DProps {
  progress: number
  mouseOffset: { x: number; y: number }
}

export const AboutCanvas3D: React.FC<AboutCanvas3DProps> = ({ progress, mouseOffset }) => {
  const { qualityTier, prefersReducedMotion } = useExperience()

  if (qualityTier === 'LITE') return null

  return (
    <div className="absolute inset-0 z-10 pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 5.2], fov: 45, near: 0.1, far: 100 }}
        gl={{ alpha: true, antialias: qualityTier === 'HIGH', powerPreference: 'high-performance' }}
        dpr={qualityTier === 'HIGH' ? [1, 2] : 1}
      >
        {/* Continuous Natural Sunlight from upper-left (slightly softer for community plaza) */}
        <directionalLight position={[-4.5, 7.5, 3.8]} intensity={1.4} color="#FFF6DE" />
        <ambientLight intensity={0.65} color="#D6E8FA" />

        <AtmosphericParticles count={qualityTier === 'HIGH' ? 60 : 30} />

        <AboutCameraRig
          progress={progress}
          mouseOffset={mouseOffset}
          prefersReducedMotion={prefersReducedMotion}
        />
      </Canvas>
    </div>
  )
}
