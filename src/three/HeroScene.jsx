import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Float, MeshDistortMaterial, Sparkles } from '@react-three/drei'
import Studio from './Studio'
import { useInView } from './useInView'
import { prefersReducedMotion } from '../hooks/reducedMotion'

const TECHS = [
  'react',
  'nextdotjs',
  'typescript',
  'javascript',
  'nodedotjs',
  'mongodb',
  'wordpress',
  'shopify',
  'tailwindcss',
  'wix',
]

// Shared, mutable input (pointer + scroll) read every frame — no React state.
const input = { x: 0, y: 0, scroll: 0 }

// Rasterise each SVG icon onto a canvas so it renders crisp as a texture.
function useIconTextures(names) {
  const [textures, setTextures] = useState({})
  useEffect(() => {
    let dead = false
    const made = []
    names.forEach((n) => {
      const img = new Image()
      img.width = 256
      img.height = 256
      img.onload = () => {
        const c = document.createElement('canvas')
        c.width = c.height = 256
        c.getContext('2d').drawImage(img, 0, 0, 256, 256)
        const t = new THREE.CanvasTexture(c)
        t.colorSpace = THREE.SRGBColorSpace
        t.anisotropy = 8
        made.push(t)
        if (!dead) setTextures((prev) => ({ ...prev, [n]: t }))
      }
      img.src = `/icons/${n}.svg`
    })
    return () => {
      dead = true
      made.forEach((t) => t.dispose())
    }
  }, [names])
  return textures
}

function Coin({ texture, coinRef }) {
  return (
    <group ref={coinRef}>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.36, 0.36, 0.1, 48]} />
        <meshStandardMaterial
          color="#ffffff"
          emissive="#ffffff"
          emissiveIntensity={0.28}
          metalness={0.1}
          roughness={0.45}
          envMapIntensity={0.4}
        />
      </mesh>
      {texture && (
        <mesh position={[0, 0, 0.052]}>
          <planeGeometry args={[0.4, 0.4]} />
          <meshBasicMaterial map={texture} transparent toneMapped={false} />
        </mesh>
      )}
    </group>
  )
}

// Tech icons travel an elliptical path around the core; depth drives scale so
// the near side swells and the far side recedes behind the sphere.
function Orbit({ animate }) {
  const textures = useIconTextures(TECHS)
  const refs = useRef([])
  const R = 2.35

  useFrame((state) => {
    const t = animate ? state.clock.elapsedTime * 0.16 : 0.4
    refs.current.forEach((g, i) => {
      if (!g) return
      const a = t + (i / TECHS.length) * Math.PI * 2
      g.position.set(
        Math.cos(a) * R,
        Math.sin(a) * 0.75 + Math.sin(a * 2 + i) * 0.18,
        Math.sin(a) * R * 0.5
      )
      const depth = (g.position.z + R) / (2 * R)
      g.scale.setScalar(0.62 + depth * 0.5)
    })
  })

  return TECHS.map((n, i) => (
    <Coin
      key={n}
      texture={textures[n]}
      coinRef={(el) => (refs.current[i] = el)}
    />
  ))
}

function Core({ animate }) {
  const mesh = useRef()
  useFrame((_, dt) => {
    if (!animate || !mesh.current) return
    mesh.current.rotation.y += dt * 0.16
    mesh.current.rotation.x += dt * 0.05
  })
  return (
    <Float
      speed={animate ? 1.3 : 0}
      rotationIntensity={0.35}
      floatIntensity={animate ? 0.8 : 0}
    >
      <mesh ref={mesh}>
        <icosahedronGeometry args={[1.3, 32]} />
        <MeshDistortMaterial
          color="#14141c"
          metalness={1}
          roughness={0.14}
          distort={0.36}
          speed={animate ? 1.3 : 0}
          envMapIntensity={1.7}
        />
      </mesh>
      <mesh rotation={[Math.PI / 2.3, 0.35, 0]}>
        <torusGeometry args={[1.95, 0.012, 16, 220]} />
        <meshBasicMaterial color="#ff7a45" toneMapped={false} />
      </mesh>
      <mesh rotation={[Math.PI / 2.9, -0.5, 0.4]}>
        <torusGeometry args={[2.25, 0.008, 16, 220]} />
        <meshBasicMaterial color="#6f7bff" toneMapped={false} />
      </mesh>
    </Float>
  )
}

// Positions the whole assembly beside the headline (wide screens) or above it
// (phones) and lets pointer + scroll nudge it for parallax depth.
function Rig({ children, animate }) {
  const group = useRef()
  const { viewport, size } = useThree()
  const wide = size.width / size.height > 1.1

  useFrame((_, dt) => {
    const g = group.current
    if (!g) return
    const k = animate ? 3 : 100
    const s = THREE.MathUtils.clamp(viewport.width / 9, 0.42, 1)
    const targetX = (wide ? viewport.width * 0.21 : 0) + input.x * 0.25
    const targetY =
      (wide ? 0 : viewport.height * 0.27) + input.y * 0.2 + input.scroll * 1.4
    g.position.x = THREE.MathUtils.damp(g.position.x, targetX, k, dt)
    g.position.y = THREE.MathUtils.damp(g.position.y, targetY, k, dt)
    g.rotation.y = THREE.MathUtils.damp(
      g.rotation.y,
      input.x * 0.35 + input.scroll * 1.6,
      k,
      dt
    )
    g.rotation.x = THREE.MathUtils.damp(g.rotation.x, -input.y * 0.2, k, dt)
    const scale = s * (1 - input.scroll * 0.25)
    g.scale.setScalar(THREE.MathUtils.damp(g.scale.x, scale, k, dt))
  })

  return <group ref={group}>{children}</group>
}

export default function HeroScene() {
  const box = useRef()
  const inView = useInView(box)
  const reduced = prefersReducedMotion()
  const mobile = typeof window !== 'undefined' && window.innerWidth < 700

  useEffect(() => {
    const onMove = (e) => {
      input.x = (e.clientX / window.innerWidth) * 2 - 1
      input.y = -((e.clientY / window.innerHeight) * 2 - 1)
    }
    const onScroll = () => {
      input.scroll = THREE.MathUtils.clamp(
        window.scrollY / window.innerHeight,
        0,
        1
      )
    }
    onScroll()
    window.addEventListener('pointermove', onMove, { passive: true })
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  const animate = inView && !reduced

  return (
    <div className="hero-canvas" ref={box} aria-hidden="true">
      <Canvas
        frameloop={animate ? 'always' : 'demand'}
        dpr={[1, mobile ? 1.5 : 1.75]}
        camera={{ position: [0, 0, 9.6], fov: 38 }}
        gl={{ antialias: true, powerPreference: 'high-performance' }}
        style={{ pointerEvents: 'none' }}
      >
        <Studio />
        <Rig animate={animate}>
          <Core animate={animate} />
          <Orbit animate={animate} />
        </Rig>
        {!reduced && (
          <Sparkles
            count={mobile ? 30 : 80}
            scale={[10, 6, 6]}
            size={2.4}
            speed={0.25}
            opacity={0.55}
            color="#ffb36b"
          />
        )}
      </Canvas>
    </div>
  )
}
