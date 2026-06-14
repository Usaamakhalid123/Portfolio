export default function Navbar() {
  return (
    <nav className="nav">
      <a href="#top" className="nav-logo">
        Usama<span style={{ color: 'var(--accent)' }}>.</span>
      </a>
      <div className="nav-links">
        <a href="#work">Work</a>
        <a href="#about">About</a>
        <a href="#services">Services</a>
        <a href="#contact">Contact</a>
      </div>
    </nav>
  )
}
