import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { MeshDistortMaterial, Float } from '@react-three/drei'
import * as THREE from 'three'

function AnimatedSphere() {
  const mesh = useRef<THREE.Mesh>(null)
  useFrame(({ clock }) => {
    if (mesh.current) {
      mesh.current.rotation.x = clock.getElapsedTime() * 0.12
      mesh.current.rotation.y = clock.getElapsedTime() * 0.18
    }
  })
  return (
    <Float speed={1.6} rotationIntensity={0.4} floatIntensity={0.8}>
      <mesh ref={mesh} scale={2.2}>
        <icosahedronGeometry args={[1, 4]} />
        <MeshDistortMaterial
          color="#ff2d78"
          attach="material"
          distort={0.28}
          speed={1.8}
          roughness={0}
          metalness={0.1}
          wireframe={false}
          transparent
          opacity={0.18}
          side={THREE.DoubleSide}
        />
      </mesh>
      <mesh scale={2.25}>
        <icosahedronGeometry args={[1, 1]} />
        <meshStandardMaterial color="#ff2d78" wireframe transparent opacity={0.25} />
      </mesh>
    </Float>
  )
}

function ParticleField() {
  const points = useRef<THREE.Points>(null)
  const count = 180
  const positions = new Float32Array(count * 3)
  for (let i = 0; i < count; i++) {
    positions[i * 3]     = (Math.random() - 0.5) * 14
    positions[i * 3 + 1] = (Math.random() - 0.5) * 14
    positions[i * 3 + 2] = (Math.random() - 0.5) * 14
  }
  useFrame(({ clock }) => {
    if (points.current) {
      points.current.rotation.y = clock.getElapsedTime() * 0.04
      points.current.rotation.x = clock.getElapsedTime() * 0.02
    }
  })
  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.04} color="#ff2d78" transparent opacity={0.55} />
    </points>
  )
}

export default function HeroScene() {
  return (
    <Canvas camera={{ position: [0, 0, 5], fov: 55 }}>
      <ambientLight intensity={0.6} />
      <pointLight position={[4, 4, 4]} intensity={1.4} color="#ff2d78" />
      <pointLight position={[-4, -4, 2]} intensity={0.6} color="#9333ea" />
      <AnimatedSphere />
      <ParticleField />
    </Canvas>
  )
}
