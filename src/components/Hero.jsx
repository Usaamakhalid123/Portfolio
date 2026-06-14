import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

export default function Hero() {
  const root = useRef()

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.hero-title .line span', {
        yPercent: 110,
        duration: 1.1,
        ease: 'power4.out',
        stagger: 0.08,
        delay: 0.2,
      })
      gsap.from(['.hero-sub', '.hero-foot'], {
        opacity: 0,
        y: 20,
        duration: 1,
        ease: 'power3.out',
        delay: 0.9,
        stagger: 0.15,
      })
    }, root)
    return () => ctx.revert()
  }, [])

  return (
    <header className="hero" id="top" ref={root}>
      <h1 className="hero-title">
        <span className="line">
          <span>Full-Stack</span>
        </span>
        <span className="line">
          <span>
            Web <span className="hero-accent">Developer</span>
          </span>
        </span>
      </h1>
      <p className="hero-sub">
        I design and build fast, beautiful websites and web apps that turn
        visitors into clients — for businesses across the UK, UAE, Pakistan and
        Australia.
      </p>

      <div className="hero-foot">
        <div className="scroll-hint">
          <span className="dot" />
          Scroll to explore
        </div>
        <div>Usama Khalid — Romford, UK · Lahore, PK</div>
      </div>
    </header>
  )
}
