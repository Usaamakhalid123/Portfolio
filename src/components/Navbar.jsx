import { useEffect, useState } from 'react'
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
  const location = useLocation()

  // Close the mobile menu whenever the route/hash changes.
  useEffect(() => setOpen(false), [location])

  // Lock background scroll while the menu is open.
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <>
      <nav className="nav">
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
          className={`nav-toggle ${open ? 'open' : ''}`}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
        >
          <span />
          <span />
        </button>
      </nav>

      <div className={`nav-mobile ${open ? 'open' : ''}`}>
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
