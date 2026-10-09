import { useEffect, useRef, useState } from 'react'
import { prefersReducedMotion } from '../hooks/reducedMotion'

// One definition used for BOTH behaviour and styling (the `has-preview` class),
// so the preview can never be visible without the code that moves it. Touch-first
// devices report `hover: none` or `pointer: coarse`; everything else (including
// laptops that report `hover: on-demand`) gets the cursor-following preview.
const canFollowCursor = () =>
  typeof window !== 'undefined' &&
  !window.matchMedia('(hover: none), (pointer: coarse)').matches

const GAP = 36 // space between the cursor and the preview
const NAV = 96 // keep clear of the fixed nav
const EDGE = 16

const clamp = (v, a, b) => Math.max(a, Math.min(b, v))

// Editorial project index. Hovering (or keyboard-focusing) a row summons a
// floating browser preview of that site beside the cursor.
//
// The preview is `position: fixed` and driven in viewport coordinates, so it
// stays glued to the pointer even while the page scrolls underneath it. Its
// motion runs in one requestAnimationFrame loop with frame-rate-independent
// easing, and it re-aims on scroll because browsers don't fire pointermove
// when content moves under a stationary cursor.
export default function WorkIndex({ items }) {
  const root = useRef()
  const preview = useRef()
  const [active, setActive] = useState(null)
  const [enabled] = useState(canFollowCursor)
  // Preview images are fetched only once the visitor engages with the list,
  // so they don't compete with first paint (the fixed preview is technically
  // "in view" while invisible, which would otherwise make lazy-loading moot).
  const [armed, setArmed] = useState(false)
  const activeRef = useRef(null)
  const m = useRef({
    tx: 0, ty: 0, // target position (viewport px)
    x: 0, y: 0, // current position
    r: 0, s: 0.84, o: 0, // rotation, scale, opacity
    show: false,
    inside: false,
    raf: 0,
    t: 0,
    px: -1, py: -1, // last pointer position
  })

  const choose = (i) => {
    activeRef.current = i
    setActive(i)
  }

  // Convert a pointer/anchor point into the preview's target position.
  const aim = (px, py) => {
    const el = preview.current
    if (!el) return
    const w = el.offsetWidth
    const h = el.offsetHeight
    let x = px + GAP + w / 2
    if (x + w / 2 > window.innerWidth - EDGE) x = px - GAP - w / 2
    m.current.tx = x
    m.current.ty = clamp(py, NAV + h / 2, window.innerHeight - h / 2 - EDGE)
  }

  const kick = () => {
    if (!m.current.raf) {
      m.current.t = performance.now()
      m.current.raf = requestAnimationFrame(tick)
    }
  }

  const tick = (now) => {
    const s = m.current
    const el = preview.current
    if (!el) return
    const instant = prefersReducedMotion()
    const dt = Math.min(0.05, (now - s.t) / 1000)
    s.t = now
    const ease = (rate) => (instant ? 1 : 1 - Math.pow(1 - rate, dt * 60))

    s.x += (s.tx - s.x) * ease(0.16)
    s.y += (s.ty - s.y) * ease(0.16)
    // Lean into the direction of travel: the lag itself drives the tilt.
    const lean = instant ? 0 : clamp((s.tx - s.x) * 0.05, -9, 9)
    s.r += (lean - s.r) * ease(0.2)
    s.s += ((s.show ? 1 : 0.84) - s.s) * ease(0.18)
    s.o += ((s.show ? 1 : 0) - s.o) * ease(0.22)

    el.style.transform = `translate3d(${s.x.toFixed(2)}px, ${s.y.toFixed(2)}px, 0) translate(-50%, -50%) rotate(${s.r.toFixed(2)}deg) scale(${s.s.toFixed(3)})`
    el.style.opacity = s.o.toFixed(3)

    if (s.show || s.o > 0.01) {
      s.raf = requestAnimationFrame(tick)
    } else {
      s.raf = 0
      el.style.opacity = '0'
    }
  }

  const reveal = (i) => {
    const s = m.current
    choose(i)
    if (!s.show) {
      s.show = true
      if (s.px >= 0) aim(s.px, s.py)
      // Appear right at the cursor rather than sliding in from a stale spot.
      if (s.o < 0.05) {
        s.x = s.tx
        s.y = s.ty
      }
    }
    kick()
  }

  const hide = () => {
    m.current.show = false
    choose(null)
    kick()
  }

  useEffect(() => {
    if (!enabled) return
    const s = m.current
    const node = root.current

    const onMove = (e) => {
      s.px = e.clientX
      s.py = e.clientY
      s.inside = true
      if (s.show) {
        aim(s.px, s.py)
        kick()
      }
    }
    const onLeave = () => {
      s.inside = false
      hide()
    }

    // Content moves under a still cursor while scrolling: re-pick the row
    // under the pointer and re-aim, since no pointermove fires.
    let ticking = false
    const onScroll = () => {
      if (!s.inside || ticking) return
      ticking = true
      requestAnimationFrame(() => {
        ticking = false
        const row = document
          .elementFromPoint(s.px, s.py)
          ?.closest?.('.wrow')
        if (row) {
          const i = Number(row.dataset.i)
          if (i !== activeRef.current) reveal(i)
          aim(s.px, s.py)
          kick()
        } else if (s.show) {
          hide()
        }
      })
    }

    node.addEventListener('pointermove', onMove)
    node.addEventListener('pointerleave', onLeave)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      node.removeEventListener('pointermove', onMove)
      node.removeEventListener('pointerleave', onLeave)
      window.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(s.raf)
      s.raf = 0
    }
  }, [enabled])

  // Keyboard users have no cursor, so park the preview beside the focused row.
  const onFocusRow = (i, e) => {
    if (!enabled) return choose(i)
    const r = e.currentTarget.getBoundingClientRect()
    const s = m.current
    s.px = r.left + r.width * 0.45
    s.py = r.top + r.height / 2
    reveal(i)
    aim(s.px, s.py)
    s.x = s.tx
    s.y = s.ty
    kick()
  }

  const onBlurRow = () => {
    if (!enabled) return choose(null)
    if (!m.current.inside) hide()
  }

  return (
    <div
      className={`windex ${enabled ? 'has-preview' : ''} ${
        active !== null ? 'is-hovering' : ''
      }`}
      ref={root}
      onPointerEnter={() => setArmed(true)}
      onFocus={() => setArmed(true)}
    >
      <ul className="windex-list">
        {items.map((p, i) => (
          <li key={p.url} className="reveal">
            <a
              className={`wrow ${active === i ? 'is-active' : ''}`}
              data-i={i}
              href={p.url}
              target="_blank"
              rel="noopener noreferrer"
              onPointerEnter={() => enabled && reveal(i)}
              onFocus={(e) => onFocusRow(i, e)}
              onBlur={onBlurRow}
            >
              <span className="wrow-num">{String(i + 1).padStart(2, '0')}</span>
              <span className="wrow-main">
                <span className="wrow-title">{p.title}</span>
                <span className="wrow-meta">
                  <span className="wrow-cat">{p.category}</span>
                  <span>
                    {p.location} · {p.year}
                  </span>
                </span>
              </span>
              <span className="wrow-arrow" aria-hidden="true">
                ↗
              </span>
              <img
                className="wrow-thumb"
                src={p.image}
                srcSet={`${p.image.replace('.webp', '-640.webp')} 640w, ${p.image} 1200w`}
                sizes="(max-width: 700px) calc(100vw - 2.5rem), 700px"
                alt={`${p.title} website screenshot`}
                loading="lazy"
                decoding="async"
                width="1200"
                height="750"
              />
              <span className="visually-hidden">(opens in a new tab)</span>
            </a>
          </li>
        ))}
      </ul>

      {enabled && (
        <div className="wpreview" ref={preview} aria-hidden="true">
          <div className="wpreview-bar">
            <i />
            <i />
            <i />
            <span>
              {active !== null
                ? items[active].url.replace(/^https?:\/\//, '').replace(/\/$/, '')
                : ''}
            </span>
          </div>
          <div className="wpreview-stack">
            {items.map((p, i) => (
              <img
                key={p.url}
                src={armed ? p.image : undefined}
                alt=""
                className={active === i ? 'show' : ''}
                decoding="async"
              />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
