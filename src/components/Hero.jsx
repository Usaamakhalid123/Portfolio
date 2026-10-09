import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { prefersReducedMotion } from '../hooks/reducedMotion'

const WORDS = ['clients.', 'revenue.', 'bookings.', 'growth.']

// Real client sites shown as a floating 3D browser stack.
const MOCKS = [
  { cls: 'm1', url: 'thepatternlabs.com', img: '/shots/patternlabs' },
  { cls: 'm2', url: 'basehealth.co.uk', img: '/shots/basehealth' },
  { cls: 'm3', url: 'khitamhealthhub.com', img: '/shots/khitam' },
]

function Rotator() {
  const el = useRef()
  const [i, setI] = useState(0)

  useEffect(() => {
    if (prefersReducedMotion()) return // keep the first word, no cycling
    const id = setInterval(() => {
      gsap.to(el.current, {
        yPercent: -100,
        opacity: 0,
        duration: 0.45,
        ease: 'power3.in',
        onComplete: () => {
          setI((v) => (v + 1) % WORDS.length)
          gsap.fromTo(
            el.current,
            { yPercent: 100, opacity: 0 },
            { yPercent: 0, opacity: 1, duration: 0.55, ease: 'power3.out' }
          )
        },
      })
    }, 2400)
    return () => clearInterval(id)
  }, [])

  return (
    <span className="rotator-wrap">
      <span className="rotator hero-accent" ref={el} aria-hidden="true">
        {WORDS[i]}
      </span>
      <span className="visually-hidden">clients.</span>
    </span>
  )
}

export default function Hero() {
  const root = useRef()
  const stage = useRef()

  useEffect(() => {
    if (prefersReducedMotion()) return
    const ctx = gsap.context(() => {
      gsap.from('.hero-title .line span', {
        yPercent: 110,
        duration: 0.9,
        ease: 'power4.out',
        stagger: 0.08,
      })
      // Transform-only entrances: the text and images that make up the Largest
      // Contentful Paint are painted immediately instead of waiting on a fade.
      gsap.from(['.hero-status', '.hero-sub', '.hero-ctas'], {
        y: 18,
        duration: 0.9,
        ease: 'power3.out',
        stagger: 0.08,
      })
      gsap.from('.mock', {
        y: 48,
        duration: 1.1,
        ease: 'expo.out',
        stagger: 0.1,
      })
      gsap.from('.hero-sticker', {
        scale: 0,
        rotate: -40,
        duration: 1,
        ease: 'back.out(1.6)',
        delay: 1.1,
      })

      // Pointer-driven tilt of the whole browser stack.
      const el = stage.current
      gsap.set(el, { transformPerspective: 1600, rotationX: 8, rotationY: -18 })
      const rotY = gsap.quickTo(el, 'rotationY', { duration: 1.4, ease: 'power3.out' })
      const rotX = gsap.quickTo(el, 'rotationX', { duration: 1.4, ease: 'power3.out' })
      const onMove = (e) => {
        const nx = (e.clientX / window.innerWidth) * 2 - 1
        const ny = (e.clientY / window.innerHeight) * 2 - 1
        rotY(-18 + nx * 9)
        rotX(8 - ny * 6)
      }
      window.addEventListener('pointermove', onMove, { passive: true })

      // Magnetic buttons
      const magnets = gsap.utils.toArray('.hero .btn')
      const handlers = []
      magnets.forEach((btn) => {
        const move = (e) => {
          const r = btn.getBoundingClientRect()
          gsap.to(btn, {
            x: (e.clientX - r.left - r.width / 2) * 0.3,
            y: (e.clientY - r.top - r.height / 2) * 0.3,
            duration: 0.4,
            ease: 'power3.out',
          })
        }
        const reset = () =>
          gsap.to(btn, { x: 0, y: 0, duration: 0.7, ease: 'elastic.out(1, 0.35)' })
        btn.addEventListener('mousemove', move)
        btn.addEventListener('mouseleave', reset)
        handlers.push([btn, move, reset])
      })
      return () => {
        window.removeEventListener('pointermove', onMove)
        handlers.forEach(([btn, move, reset]) => {
          btn.removeEventListener('mousemove', move)
          btn.removeEventListener('mouseleave', reset)
        })
      }
    }, root)
    return () => ctx.revert()
  }, [])

  return (
    <header className="hero" id="top" ref={root}>
      <div className="hero-content">
        <div className="hero-status">
          <span className="status-dot" aria-hidden="true" />
          Available for new projects
        </div>

        <h1 className="hero-title">
          <span className="line">
            <span>Websites that turn</span>
          </span>
          <span className="line">
            <span>
              visitors into <Rotator />
            </span>
          </span>
        </h1>

        <p className="hero-sub">
          I'm Usama, a freelance full-stack developer. I build fast,
          search-ready websites, SaaS products, custom software and AI
          chatbots for clinics, law firms, agencies and startups — 40+
          delivered across the UK, UAE, Pakistan and Australia.
        </p>

        <div className="hero-ctas">
          <a className="btn btn-primary" href="#contact">
            Start a project
            <span className="btn-arrow" aria-hidden="true">
              →
            </span>
          </a>
          <a className="btn btn-ghost" href="#work">
            See selected work
          </a>
        </div>
      </div>

      <div className="hero-mock" aria-hidden="true">
        <div className="mock-stage" ref={stage}>
          {MOCKS.map((m) => (
            <figure className={`mock ${m.cls}`} key={m.cls}>
              <div className="mock-bar">
                <i />
                <i />
                <i />
                <span>{m.url}</span>
              </div>
              <img
                src={`${m.img}.webp`}
                srcSet={`${m.img}-640.webp 640w, ${m.img}.webp 1200w`}
                sizes="(max-width: 900px) 78vw, 40vw"
                width="1200"
                height="750"
                alt=""
              />
            </figure>
          ))}
        </div>
        <div className="hero-sticker">
          <strong>40+</strong>
          <span>sites live</span>
        </div>
      </div>
    </header>
  )
}
