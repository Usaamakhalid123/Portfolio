import { Suspense, useMemo, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import {
  Environment,
  Float,
  Icosahedron,
  Lightformer,
  MeshDistortMaterial,
} from '@react-three/drei'
import * as THREE from 'three'

// The morphing glass centerpiece. Reacts to the cursor and slowly breathes.
function GlassForm({ reduced }) {
  const mesh = useRef()
  const mat = useRef()

  useFrame((state, delta) => {
    if (!mesh.current) return
    const { pointer, clock } = state
    // Ease the form toward the pointer for a subtle "following" feel.
    mesh.current.rotation.y = THREE.MathUtils.lerp(
      mesh.current.rotation.y,
      pointer.x * 0.6 + clock.elapsedTime * 0.08,
      0.05
    )
    mesh.current.rotation.x = THREE.MathUtils.lerp(
      mesh.current.rotation.x,
      -pointer.y * 0.4,
      0.05
    )
    // Breathe the distortion based on scroll depth.
    const scrollProgress =
      window.scrollY / (document.body.scrollHeight - window.innerHeight || 1)
    if (mat.current) {
      mat.current.distort = THREE.MathUtils.lerp(
        mat.current.distort,
        0.28 + scrollProgress * 0.35,
        0.04
      )
    }
    const targetScale = 1 + Math.sin(clock.elapsedTime * 0.6) * 0.02
    mesh.current.scale.setScalar(targetScale)
  })

  return (
    <Float speed={1.4} rotationIntensity={0.4} floatIntensity={0.6}>
      <Icosahedron ref={mesh} args={[1.5, reduced ? 8 : 18]}>
        <MeshDistortMaterial
          ref={mat}
          color="#5b3df0"
          envMapIntensity={1.2}
          roughness={0.05}
          metalness={0.1}
          clearcoat={1}
          distort={0.3}
          speed={1.6}
          iridescence={1}
          iridescenceIOR={1.4}
        />
      </Icosahedron>
    </Float>
  )
}

// In-memory studio environment (no network fetch) for crisp reflections.
function Studio() {
  return (
    <Environment resolution={256}>
      <group rotation={[0, 0, 1]}>
        <Lightformer
          intensity={2}
          position={[0, 5, -9]}
          scale={[10, 10, 1]}
          color="#ffffff"
        />
        <Lightformer
          intensity={3}
          position={[-5, 1, -1]}
          scale={[8, 2, 1]}
          color="#7c5cff"
        />
        <Lightformer
          intensity={2}
          position={[5, -1, -1]}
          scale={[8, 2, 1]}
          color="#22d3ee"
        />
        <Lightformer
          intensity={1.5}
          position={[0, -5, 2]}
          scale={[10, 4, 1]}
          color="#ffffff"
        />
      </group>
    </Environment>
  )
}

export default function Scene() {
  const reduced = useMemo(
    () =>
      typeof window !== 'undefined' &&
      (window.innerWidth < 768 ||
        window.matchMedia('(prefers-reduced-motion: reduce)').matches),
    []
  )

  return (
    <div className="scene-canvas">
      <Canvas
        dpr={reduced ? [1, 1.2] : [1, 1.8]}
        camera={{ position: [0, 0, 5], fov: 42 }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.4} />
        <directionalLight position={[3, 4, 5]} intensity={1.5} />
        <Suspense fallback={null}>
          <GlassForm reduced={reduced} />
          <Studio />
        </Suspense>
      </Canvas>
    </div>
  )
}
