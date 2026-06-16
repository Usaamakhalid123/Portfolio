import { Link } from 'react-router-dom'

export default function Navbar() {
  return (
    <nav className="nav">
      <Link to="/" className="nav-logo">
        Usama<span style={{ color: 'var(--accent)' }}>.</span>
      </Link>
      <div className="nav-links">
        <Link to="/work">Work</Link>
        <Link to="/#about">About</Link>
        <Link to="/#services">Services</Link>
        <Link to="/#testimonials">Testimonials</Link>
        <Link to="/#contact">Contact</Link>
      </div>
    </nav>
  )
}
