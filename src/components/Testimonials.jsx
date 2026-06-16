import { useEffect, useState } from 'react'
import { testimonials } from '../data/testimonials'

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
  const [paused, setPaused] = useState(false)

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
          <span className="tcount">
            {String(page + 1).padStart(2, '0')} / {String(count).padStart(2, '0')}
          </span>
          <button onClick={() => go(1)} aria-label="Next testimonials">
            →
          </button>
        </div>
      </div>

      <div
        className="tcarousel reveal"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <div
          className="tcarousel-track"
          style={{ transform: `translateX(-${page * 100}%)` }}
        >
          {pages.map((pair, i) => (
            <div className="tcarousel-slide" key={i}>
              {pair.map((t, j) => (
                <figure className="tcard" key={`${i}-${j}`}>
                  <blockquote className="tquote">{t.quote}</blockquote>
                  <figcaption className="tmeta">
                    <span className="tavatar">{initials(t.name)}</span>
                    <span>
                      <span className="tname">{t.name}</span>
                      <span className="trole">{t.role}</span>
                    </span>
                  </figcaption>
                </figure>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
