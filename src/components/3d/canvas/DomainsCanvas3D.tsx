import React, { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { useExperience } from '@/core/context/ExperienceContext'

// Atmospheric Particles floating in the sunlit open plaza
function AtmosphericParticles({ count = 55 }: { count?: number }) {
  const pointsRef = useRef<THREE.Points>(null)

  const [positions] = React.useState(() => {
    const pos = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 22
      pos[i * 3 + 1] = (Math.random() - 0.5) * 14 + 1
      pos[i * 3 + 2] = (Math.random() - 0.5) * 16 - 2
    }
    return pos
  })

  useFrame((_, delta) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += delta * 0.012
    }
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.06}
        color="#FFF6E0"
        transparent
        opacity={0.42}
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}

// 1. Central Knowledge Nexus 3D Pavilion
function KnowledgeNexus3D({ isActiveNexus }: { isActiveNexus: boolean }) {
  const nexusRef = useRef<THREE.Group>(null)
  const coreRef = useRef<THREE.Mesh>(null)

  useFrame((_, delta) => {
    if (coreRef.current) {
      coreRef.current.rotation.y += delta * 0.4
      coreRef.current.rotation.x += delta * 0.2
    }
  })

  return (
    <group ref={nexusRef} position={[0, -0.4, -4.5]}>
      {/* Stepped Architectural Plinth / Forum */}
      <mesh position={[0, -0.15, 0]}>
        <cylinderGeometry args={[2.2, 2.5, 0.25, 32]} />
        <meshStandardMaterial color="#F2EBDC" roughness={0.7} metalness={0.1} />
      </mesh>
      <mesh position={[0, -0.02, 0]}>
        <cylinderGeometry args={[1.7, 1.9, 0.15, 32]} />
        <meshStandardMaterial color="#FAF7EF" roughness={0.6} metalness={0.1} />
      </mesh>

      {/* Concentric Architectural Rings */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.1, 0]}>
        <ringGeometry args={[1.9, 2.05, 48]} />
        <meshBasicMaterial color="#1457A6" wireframe opacity={0.65} transparent />
      </mesh>

      {/* Central Knowledge Core: Polyhedral Crystal */}
      <mesh ref={coreRef} position={[0, 0.7, 0]}>
        <octahedronGeometry args={[0.55, 0]} />
        <meshStandardMaterial
          color="#2D75C9"
          emissive="#1457A6"
          emissiveIntensity={isActiveNexus ? 0.7 : 0.4}
          roughness={0.2}
          metalness={0.5}
          transparent
          opacity={0.88}
        />
      </mesh>

      {/* 5 Radial Pathway Spokes radiating outward */}
      {[ -65, -30, 0, 30, 65 ].map((deg, idx) => {
        const rad = (deg * Math.PI) / 180
        const length = 2.8
        const x = Math.sin(rad) * (length / 2)
        const z = -Math.cos(rad) * (length / 2)
        return (
          <mesh
            key={idx}
            position={[x, 0.02, z]}
            rotation={[-Math.PI / 2, 0, -rad]}
          >
            <planeGeometry args={[0.08, length]} />
            <meshBasicMaterial color="#2D75C9" opacity={0.45} transparent />
          </mesh>
        )
      })}
    </group>
  )
}

// 2. The Five 3D Domain Sculptural Installations
function DomainInstallations3D({ activeDomainId }: { activeDomainId: string }) {
  const techRef = useRef<THREE.Group>(null)
  const mgmtRef = useRef<THREE.Group>(null)
  const designRef = useRef<THREE.Group>(null)
  const codingRef = useRef<THREE.Group>(null)
  const researchRef = useRef<THREE.Group>(null)

  useFrame((_, delta) => {
    if (techRef.current) techRef.current.rotation.y += delta * 0.3
    if (mgmtRef.current) mgmtRef.current.rotation.z += delta * 0.25
    if (designRef.current) designRef.current.rotation.y -= delta * 0.2
    if (codingRef.current) codingRef.current.rotation.y += delta * 0.35
    if (researchRef.current) researchRef.current.rotation.x += delta * 0.2
  })

  // Installation definitions with radial positions around the nexus
  const installations = [
    {
      id: 'technology',
      pos: [-3.8, 0.8, -5.2] as [number, number, number],
      color: '#1457A6',
      render: (
        <group ref={techRef}>
          {/* Computational Core: Geometric frame with glowing node */}
          <mesh>
            <boxGeometry args={[0.7, 0.7, 0.7]} />
            <meshStandardMaterial color="#1457A6" wireframe opacity={0.85} transparent />
          </mesh>
          <mesh>
            <sphereGeometry args={[0.26, 16, 16]} />
            <meshStandardMaterial
              color="#69BCE8"
              emissive="#1457A6"
              emissiveIntensity={0.8}
            />
          </mesh>
        </group>
      ),
    },
    {
      id: 'management',
      pos: [-1.8, 1.6, -6.4] as [number, number, number],
      color: '#2D75C9',
      render: (
        <group ref={mgmtRef}>
          {/* Strategy Bridge / Ring Forum */}
          <mesh>
            <torusGeometry args={[0.55, 0.08, 16, 32]} />
            <meshStandardMaterial color="#2D75C9" metalness={0.4} roughness={0.3} />
          </mesh>
          <mesh position={[0.4, 0, 0]}>
            <sphereGeometry args={[0.12, 12, 12]} />
            <meshStandardMaterial color="#FAF7EF" />
          </mesh>
        </group>
      ),
    },
    {
      id: 'design',
      pos: [3.8, 0.4, -4.8] as [number, number, number],
      color: '#69BCE8',
      render: (
        <group ref={designRef}>
          {/* Creative Studio: Dynamic Intersecting Drafting Planes */}
          <mesh rotation={[0.4, 0.5, 0]}>
            <boxGeometry args={[0.9, 0.6, 0.04]} />
            <meshStandardMaterial
              color="#FAF7EF"
              roughness={0.2}
              transparent
              opacity={0.85}
            />
          </mesh>
          <mesh rotation={[-0.3, -0.6, 0.2]} position={[0, 0.1, 0.1]}>
            <boxGeometry args={[0.7, 0.5, 0.04]} />
            <meshStandardMaterial
              color="#69BCE8"
              roughness={0.3}
              transparent
              opacity={0.7}
            />
          </mesh>
        </group>
      ),
    },
    {
      id: 'competitive-coding',
      pos: [-3.2, -0.4, -3.8] as [number, number, number],
      color: '#0B2D55',
      render: (
        <group ref={codingRef}>
          {/* Algorithmic Arena: Stepped rhythmic columns */}
          {[-0.25, 0, 0.25].map((xOffset, i) => (
            <mesh key={i} position={[xOffset, 0.25 + i * 0.15, 0]}>
              <cylinderGeometry args={[0.08, 0.08, 0.5 + i * 0.3, 12]} />
              <meshStandardMaterial
                color="#0B2D55"
                emissive="#1457A6"
                emissiveIntensity={0.4}
              />
            </mesh>
          ))}
        </group>
      ),
    },
    {
      id: 'research',
      pos: [2.0, 1.8, -6.8] as [number, number, number],
      color: '#2D75C9',
      render: (
        <group ref={researchRef}>
          {/* Knowledge Observatory: Orbital rings & lens prism */}
          <mesh>
            <sphereGeometry args={[0.4, 16, 16]} />
            <meshStandardMaterial
              color="#FAF7EF"
              transparent
              opacity={0.4}
              roughness={0.1}
            />
          </mesh>
          <mesh rotation={[Math.PI / 3, 0, 0]}>
            <ringGeometry args={[0.55, 0.62, 32]} />
            <meshBasicMaterial color="#2D75C9" wireframe />
          </mesh>
        </group>
      ),
    },
  ]

  return (
    <group>
      {installations.map((item) => {
        const isActive = activeDomainId === item.id
        return (
          <group
            key={item.id}
            position={item.pos}
            scale={isActive ? 1.25 : 0.85}
          >
            {item.render}
          </group>
        )
      })}
    </group>
  )
}

// 3. Camera Rig with smooth focus towards active domain
function DomainsCameraRig({
  progress,
  mouseOffset,
  activeDomainId,
  prefersReducedMotion,
}: {
  progress: number
  mouseOffset: { x: number; y: number }
  activeDomainId: string
  prefersReducedMotion: boolean
}) {
  // Focus offset targets for each domain
  const cameraOffsets: Record<string, { x: number; y: number; z: number }> = {
    technology: { x: -0.6, y: 0.1, z: 4.8 },
    management: { x: -0.3, y: 0.3, z: 4.6 },
    design: { x: 0.6, y: -0.1, z: 4.8 },
    'competitive-coding': { x: -0.5, y: -0.2, z: 4.9 },
    research: { x: 0.3, y: 0.4, z: 4.5 },
  }

  useFrame(({ camera }) => {
    if (prefersReducedMotion) return

    const targetOffset = cameraOffsets[activeDomainId] || { x: 0, y: 0, z: 5.0 }

    // Dolly and crane based on scroll progress (0.0 -> 1.0)
    const baseZ = 5.6 - progress * 1.0
    const targetZ = targetOffset.z * 0.4 + baseZ * 0.6
    const targetX = targetOffset.x * 0.8 + mouseOffset.x * 0.4
    const targetY = targetOffset.y * 0.6 + mouseOffset.y * -0.25 + (progress * 0.2)

    camera.position.x = THREE.MathUtils.lerp(camera.position.x, targetX, 0.04)
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, targetY, 0.04)
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, targetZ, 0.04)

    // Look at target near Knowledge Nexus
    camera.lookAt(targetOffset.x * 0.3, 0.1, -4.5)
  })

  return null
}

interface DomainsCanvas3DProps {
  progress: number
  mouseOffset: { x: number; y: number }
  activeDomainId: string
}

export const DomainsCanvas3D: React.FC<DomainsCanvas3DProps> = ({
  progress,
  mouseOffset,
  activeDomainId,
}) => {
  const { qualityTier, prefersReducedMotion } = useExperience()

  if (qualityTier === 'LITE') return null

  return (
    <div className="absolute inset-0 z-10 pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 5.2], fov: 45, near: 0.1, far: 100 }}
        gl={{ alpha: true, antialias: qualityTier === 'HIGH', powerPreference: 'high-performance' }}
        dpr={qualityTier === 'HIGH' ? [1, 2] : 1}
      >
        {/* Natural Daylight matching reference: warm highlight from left, cool sky ambient */}
        <directionalLight position={[-4.5, 7.5, 4.0]} intensity={1.6} color="#FFF6E5" />
        <ambientLight intensity={0.65} color="#D6E8FA" />

        {/* Floating atmospheric sunlit particles */}
        <AtmosphericParticles count={qualityTier === 'HIGH' ? 55 : 25} />

        {/* Central Knowledge Nexus */}
        <KnowledgeNexus3D isActiveNexus={progress >= 0.3 && progress <= 0.6} />

        {/* 5 Domain 3D Installations */}
        <DomainInstallations3D activeDomainId={activeDomainId} />

        {/* Camera Rig */}
        <DomainsCameraRig
          progress={progress}
          mouseOffset={mouseOffset}
          activeDomainId={activeDomainId}
          prefersReducedMotion={prefersReducedMotion}
        />
      </Canvas>
    </div>
  )
}
