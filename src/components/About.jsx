import { useEffect, useRef, useState } from 'react'
import Tilt from './Tilt'
import { prefersReducedMotion } from '../hooks/reducedMotion'

const TECH = [
  ['react', 'React'],
  ['nextdotjs', 'Next.js'],
  ['typescript', 'TypeScript'],
  ['nodedotjs', 'Node.js'],
  ['mongodb', 'MongoDB'],
  ['wordpress', 'WordPress'],
  ['shopify', 'Shopify'],
  ['tailwindcss', 'Tailwind'],
]

// Counts up once when scrolled into view; shows the final value immediately
// for reduced-motion visitors or if IntersectionObserver is unavailable.
function CountUp({ to, suffix = '' }) {
  const ref = useRef()
  const [val, setVal] = useState(prefersReducedMotion() ? to : 0)

  useEffect(() => {
    if (prefersReducedMotion() || typeof IntersectionObserver === 'undefined') {
      setVal(to)
      return
    }
    let raf
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return
      io.disconnect()
      const start = performance.now()
      const tick = (now) => {
        const p = Math.min(1, (now - start) / 1600)
        setVal(Math.round(to * (1 - Math.pow(1 - p, 4))))
        if (p < 1) raf = requestAnimationFrame(tick)
      }
      raf = requestAnimationFrame(tick)
    })
    io.observe(ref.current)
    return () => {
      io.disconnect()
      cancelAnimationFrame(raf)
    }
  }, [to])

  return (
    <span ref={ref} className="bento-num">
      {val}
      {suffix}
    </span>
  )
}

export default function About() {
  return (
    <section className="section" id="about">
      <span className="eyebrow reveal">About</span>
      <div className="about-grid">
        <div>
          <p className="about-lead reveal">
            I build websites that look <em>credible</em>, load <em>fast</em>{' '}
            and bring in <em>more clients</em>.
          </p>
          <div className="about-body reveal">
            <p>
              I'm Usama Khalid, a freelance full-stack developer split between
              Romford, UK and Lahore, Pakistan. In three-plus years I've
              shipped 40+ websites and web apps for clinics, agencies, law
              firms, online stores and startups.
            </p>
            <p>
              I work across the MERN stack, WordPress and Shopify, and I treat
              performance, SEO and design detail as part of the build — not an
              add-on. The goal is simple: a site that wins you clients.
            </p>
          </div>
        </div>

        <div className="bento">
          <div className="reveal bento-a">
            <Tilt className="bento-card b-lime" max={5}>
              <CountUp to={40} suffix="+" />
              <span className="bento-label">Projects shipped</span>
            </Tilt>
          </div>
          <div className="reveal bento-b">
            <Tilt className="bento-card b-ink" max={5}>
              <CountUp to={3} suffix="+" />
              <span className="bento-label">Years experience</span>
            </Tilt>
          </div>
          <div className="reveal bento-c">
            <Tilt className="bento-card b-white" max={3}>
              <span className="bento-label">Tools I build with</span>
              <ul className="bento-tech">
                {TECH.map(([icon, name]) => (
                  <li key={icon}>
                    <img src={`/icons/${icon}.svg`} alt="" width="18" height="18" />
                    {name}
                  </li>
                ))}
              </ul>
            </Tilt>
          </div>
          <div className="reveal bento-d">
            <Tilt className="bento-card b-white" max={5}>
              <CountUp to={4} />
              <span className="bento-label">Countries served</span>
            </Tilt>
          </div>
          <div className="reveal bento-e">
            <Tilt className="bento-card b-sand" max={5}>
              <span className="bento-label">Based between</span>
              <span className="bento-place">
                Romford, UK <i aria-hidden="true">↔</i> Lahore, PK
              </span>
            </Tilt>
          </div>
        </div>
      </div>
    </section>
  )
}
