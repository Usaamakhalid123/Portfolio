import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import TechStack from './TechStack'

const WORDS = ['clients.', 'revenue.', 'bookings.', 'growth.']

function Rotator() {
  const el = useRef()
  const [i, setI] = useState(0)

  useEffect(() => {
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
    }, 2200)
    return () => clearInterval(id)
  }, [])

  return (
    <span className="rotator-wrap">
      <span className="rotator hero-accent" ref={el}>
        {WORDS[i]}
      </span>
    </span>
  )
}

export default function Hero() {
  const root = useRef()

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.hero-title .line span', {
        yPercent: 110,
        duration: 1.1,
        ease: 'power4.out',
        stagger: 0.1,
        delay: 0.2,
      })
      gsap.from(['.hero-status', '.hero-sub', '.hero-ctas'], {
        opacity: 0,
        y: 22,
        duration: 1,
        ease: 'power3.out',
        delay: 0.7,
        stagger: 0.12,
      })

      // Magnetic buttons
      const magnets = gsap.utils.toArray('.btn')
      const handlers = []
      magnets.forEach((btn) => {
        const move = (e) => {
          const r = btn.getBoundingClientRect()
          gsap.to(btn, {
            x: (e.clientX - r.left - r.width / 2) * 0.35,
            y: (e.clientY - r.top - r.height / 2) * 0.35,
            duration: 0.4,
            ease: 'power3.out',
          })
        }
        const reset = () =>
          gsap.to(btn, { x: 0, y: 0, duration: 0.6, ease: 'elastic.out(1, 0.3)' })
        btn.addEventListener('mousemove', move)
        btn.addEventListener('mouseleave', reset)
        handlers.push([btn, move, reset])
      })
      return () =>
        handlers.forEach(([btn, move, reset]) => {
          btn.removeEventListener('mousemove', move)
          btn.removeEventListener('mouseleave', reset)
        })
    }, root)
    return () => ctx.revert()
  }, [])

  return (
    <header className="hero" id="top" ref={root}>
      <div className="hero-aurora" />
      <div className="hero-content">
        <div className="hero-status">
          <span className="status-dot" />
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
          I'm Usama — I design and build websites that make small businesses
          look like the big ones, and turn quiet pages into booked calendars.
          40+ shipped across four countries, and counting.
        </p>

        <div className="hero-ctas">
          <a className="btn btn-primary" href="#contact">
            Start a project
          </a>
          <a className="btn btn-ghost" href="#work">
            View work →
          </a>
        </div>
      </div>

      <div className="hero-visual">
        <TechStack />
      </div>
    </header>
  )
}
