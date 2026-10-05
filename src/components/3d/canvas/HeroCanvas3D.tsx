import React, { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { useExperience } from '@/core/context/ExperienceContext'

// Subtle floating atmospheric particles (dust motes catching sunlight)
function AtmosphericParticles({ count = 60 }: { count?: number }) {
  const pointsRef = useRef<THREE.Points>(null)

  const [positions] = React.useState(() => {
    const pos = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 20
      pos[i * 3 + 1] = (Math.random() - 0.5) * 12 + 2
      pos[i * 3 + 2] = (Math.random() - 0.5) * 15
    }
    return pos
  })

  useFrame((_, delta) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += delta * 0.02
      pointsRef.current.rotation.x += delta * 0.01
    }
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.06}
        color="#FFF6D8"
        transparent
        opacity={0.55}
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}

// Interactive 3D Camera Rig reacting to smooth scroll progress and mouse coordinates
function CameraRig({
  scrollProgress,
  mouseOffset,
  prefersReducedMotion,
}: {
  scrollProgress: number
  mouseOffset: { x: number; y: number }
  prefersReducedMotion: boolean
}) {
  useFrame(({ camera }) => {
    if (prefersReducedMotion) return

    // Dolly camera forward based on scroll progress (0 -> 1)
    const targetZ = 5.5 - scrollProgress * 2.2
    const targetX = (mouseOffset.x * 0.4) + (scrollProgress * 0.3)
    const targetY = (mouseOffset.y * -0.2) + (scrollProgress * -0.15)

    camera.position.x = THREE.MathUtils.lerp(camera.position.x, targetX, 0.06)
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, targetY, 0.06)
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, targetZ, 0.06)

    camera.lookAt(0, 0, -2)
  })

  return null
}

interface HeroCanvas3DProps {
  scrollProgress: number
  mouseOffset: { x: number; y: number }
}

export const HeroCanvas3D: React.FC<HeroCanvas3DProps> = ({ scrollProgress, mouseOffset }) => {
  const { qualityTier, prefersReducedMotion } = useExperience()

  // Skip 3D canvas on LITE devices to maintain high mobile performance
  if (qualityTier === 'LITE') return null

  return (
    <div className="absolute inset-0 z-10 pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 5.5], fov: 45, near: 0.1, far: 100 }}
        gl={{ alpha: true, antialias: qualityTier === 'HIGH', powerPreference: 'high-performance' }}
        dpr={qualityTier === 'HIGH' ? [1, 2] : 1}
      >
        {/* Warm Morning Sunlight from upper-left */}
        <directionalLight position={[-5, 8, 4]} intensity={1.5} color="#FFF5DC" />

        {/* Ambient Architectural Blue Sky Fill */}
        <ambientLight intensity={0.6} color="#C4E2F8" />

        {/* Floating atmospheric dust particles */}
        <AtmosphericParticles count={qualityTier === 'HIGH' ? 80 : 35} />

        {/* Dynamic Camera tracking */}
        <CameraRig
          scrollProgress={scrollProgress}
          mouseOffset={mouseOffset}
          prefersReducedMotion={prefersReducedMotion}
        />
      </Canvas>
    </div>
  )
}
