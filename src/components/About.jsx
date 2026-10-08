import { lazy, Suspense, useEffect, useRef, useState } from 'react'
import SceneBoundary from './SceneBoundary'
import Tilt from './Tilt'
import { prefersReducedMotion } from '../hooks/reducedMotion'

const ShowcaseScene = lazy(() => import('../three/ShowcaseScene'))

const stats = [
  { num: 40, suffix: '+', label: 'Projects shipped' },
  { num: 3, suffix: '+', label: 'Years experience' },
  { num: 4, suffix: '', label: 'Countries served' },
]

// Counts up once when scrolled into view; shows the final value immediately
// for reduced-motion visitors or if IntersectionObserver is unavailable.
function CountUp({ to, suffix }) {
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
        const p = Math.min(1, (now - start) / 1400)
        setVal(Math.round(to * (1 - Math.pow(1 - p, 3))))
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
    <span ref={ref} className="stat-num">
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

        <div className="about-visual reveal">
          <Tilt className="showcase" max={5}>
            <SceneBoundary>
              <Suspense fallback={null}>
                <ShowcaseScene />
              </Suspense>
            </SceneBoundary>
            <div className="stats tilt-layer">
              {stats.map((s) => (
                <div className="stat" key={s.label}>
                  <CountUp to={s.num} suffix={s.suffix} />
                  <span className="stat-label">{s.label}</span>
                </div>
              ))}
            </div>
          </Tilt>
        </div>
      </div>
    </section>
  )
}
