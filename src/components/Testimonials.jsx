import { useEffect, useState } from 'react'
import { testimonials } from '../data/testimonials'
import Tilt from './Tilt'
import { prefersReducedMotion } from '../hooks/reducedMotion'

const initials = (name) =>
  name
    .split(' ')
    .map((n) => n[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()

// Group into pages of 2. If the final page would hold a lone card,
// join it with the previous card so every page shows two.
function buildPages(items) {
  const pages = []
  for (let i = 0; i < items.length; i += 2) {
    if (i === items.length - 1) pages.push([items[i - 1], items[i]])
    else pages.push([items[i], items[i + 1]])
  }
  return pages
}

const INTERVAL = 8000 // auto-advance delay (ms)

export default function Testimonials() {
  const pages = buildPages(testimonials)
  const count = pages.length
  const [page, setPage] = useState(0)
  const [hoverPaused, setHoverPaused] = useState(false)
  // Users who ask for reduced motion never get auto-advance; others can stop it.
  const [userPaused, setUserPaused] = useState(prefersReducedMotion)
  const paused = hoverPaused || userPaused

  const go = (dir) => setPage((p) => (p + dir + count) % count)

  useEffect(() => {
    if (paused) return
    const id = setInterval(() => setPage((p) => (p + 1) % count), INTERVAL)
    return () => clearInterval(id)
  }, [paused, count])

  return (
    <section className="section testimonials" id="testimonials">
      <div className="section-head">
        <div>
          <span className="eyebrow reveal">Kind Words</span>
          <h2 className="reveal" style={{ marginTop: '1rem' }}>
            What clients say.
          </h2>
        </div>
        <div className="tnav reveal">
          <button onClick={() => go(-1)} aria-label="Previous testimonials">
            ←
          </button>
          <span className="tcount" aria-hidden="true">
            {String(page + 1).padStart(2, '0')} / {String(count).padStart(2, '0')}
          </span>
          <button onClick={() => go(1)} aria-label="Next testimonials">
            →
          </button>
          <button
            className="tpause"
            onClick={() => setUserPaused((p) => !p)}
            aria-label={
              userPaused ? 'Start automatic rotation' : 'Pause automatic rotation'
            }
            aria-pressed={userPaused}
          >
            {userPaused ? '▶' : '❚❚'}
          </button>
        </div>
      </div>

      <div
        className="tcarousel reveal"
        role="region"
        aria-roledescription="carousel"
        aria-label="Client testimonials"
        aria-live={paused ? 'polite' : 'off'}
        onMouseEnter={() => setHoverPaused(true)}
        onMouseLeave={() => setHoverPaused(false)}
        onFocus={() => setHoverPaused(true)}
        onBlur={() => setHoverPaused(false)}
      >
        <p className="visually-hidden">
          Showing page {page + 1} of {count}
        </p>
        <div
          className="tcarousel-track"
          style={{ transform: `translateX(-${page * 100}%)` }}
        >
          {pages.map((pair, i) => (
            <div
              className="tcarousel-slide"
              key={i}
              role="group"
              aria-roledescription="slide"
              aria-label={`${i + 1} of ${count}`}
              aria-hidden={i !== page}
            >
              {pair.map((t, j) => (
                <Tilt as="figure" className="tcard glass" max={4} key={`${i}-${j}`}>
                  <blockquote className="tquote tilt-layer">{t.quote}</blockquote>
                  <figcaption className="tmeta tilt-layer">
                    <span className="tavatar">{initials(t.name)}</span>
                    <span>
                      <span className="tname">{t.name}</span>
                      <span className="trole">{t.role}</span>
                    </span>
                  </figcaption>
                </Tilt>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
