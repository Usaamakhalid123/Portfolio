import { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

const ITEMS = [
  { to: '/work', label: 'Work' },
  { to: '/#about', label: 'About' },
  { to: '/#services', label: 'Services' },
  { to: '/#testimonials', label: 'Testimonials' },
  { to: '/#contact', label: 'Contact' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()
  const toggleRef = useRef()
  const menuRef = useRef()

  // Close the mobile menu whenever the route/hash changes.
  useEffect(() => setOpen(false), [location])

  // Give the fixed nav a backdrop once the page has scrolled.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // While the menu is open: lock scroll, close on Escape, trap Tab inside it,
  // and hand focus back to the toggle when it closes.
  useEffect(() => {
    if (!open) return
    document.body.style.overflow = 'hidden'

    const focusables = () => [
      toggleRef.current,
      ...menuRef.current.querySelectorAll('a'),
    ]
    focusables()[1]?.focus()

    const onKey = (e) => {
      if (e.key === 'Escape') {
        setOpen(false)
        toggleRef.current?.focus()
        return
      }
      if (e.key !== 'Tab') return
      const els = focusables()
      const first = els[0]
      const last = els[els.length - 1]
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }
    document.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  return (
    <>
      <nav
        className={`nav ${scrolled ? 'scrolled' : ''}`}
        aria-label="Main"
      >
        <Link to="/" className="nav-logo">
          Usama<span style={{ color: 'var(--accent)' }}>.</span>
        </Link>

        <div className="nav-links">
          {ITEMS.map((i) => (
            <Link key={i.to} to={i.to}>
              {i.label}
            </Link>
          ))}
        </div>

        <button
          ref={toggleRef}
          className={`nav-toggle ${open ? 'open' : ''}`}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((o) => !o)}
        >
          <span />
          <span />
        </button>
      </nav>

      <div
        id="mobile-menu"
        ref={menuRef}
        className={`nav-mobile ${open ? 'open' : ''}`}
      >
        <div className="nav-mobile-links">
          {ITEMS.map((i) => (
            <Link key={i.to} to={i.to} onClick={() => setOpen(false)}>
              {i.label}
            </Link>
          ))}
        </div>
      </div>
    </>
  )
}
