import { useRef } from 'react'
import * as THREE from 'three'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float } from '@react-three/drei'
import Studio from './Studio'
import { useInView } from './useInView'
import { prefersReducedMotion } from '../hooks/reducedMotion'

// A chrome torus-knot whose rotation is driven by where its panel sits in the
// viewport, so it turns as the visitor scrolls past (scroll storytelling).
function Knot({ boxRef, animate }) {
  const mesh = useRef()
  useFrame((state, dt) => {
    const el = boxRef.current
    if (!el || !mesh.current) return
    const r = el.getBoundingClientRect()
    const p = (r.top + r.height / 2 - window.innerHeight / 2) / window.innerHeight
    const idle = animate ? state.clock.elapsedTime * 0.12 : 0
    mesh.current.rotation.y = THREE.MathUtils.damp(
      mesh.current.rotation.y,
      -p * 3.2 + idle,
      4,
      dt
    )
    mesh.current.rotation.x = THREE.MathUtils.damp(
      mesh.current.rotation.x,
      p * 1.6 + 0.4,
      4,
      dt
    )
  })
  return (
    <Float speed={animate ? 1.2 : 0} floatIntensity={animate ? 0.6 : 0}>
      <mesh ref={mesh}>
        <torusKnotGeometry args={[0.95, 0.32, 240, 36]} />
        <meshPhysicalMaterial
          color="#16161e"
          metalness={1}
          roughness={0.1}
          clearcoat={1}
          clearcoatRoughness={0.08}
          envMapIntensity={1.7}
        />
      </mesh>
    </Float>
  )
}

export default function ShowcaseScene() {
  const box = useRef()
  const inView = useInView(box)
  const reduced = prefersReducedMotion()
  return (
    <div className="showcase-canvas" ref={box} aria-hidden="true">
      <Canvas
        frameloop={inView && !reduced ? 'always' : 'demand'}
        dpr={[1, 1.6]}
        camera={{ position: [0, 0, 6.6], fov: 40 }}
        gl={{ antialias: true }}
        style={{ pointerEvents: 'none' }}
      >
        <Studio />
        <Knot boxRef={box} animate={inView && !reduced} />
      </Canvas>
    </div>
  )
}
