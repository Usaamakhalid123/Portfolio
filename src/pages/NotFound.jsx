import { Link } from 'react-router-dom'
import Seo from '../components/Seo'

export default function NotFound() {
  return (
    <section className="section page">
      <Seo
        title="Page not found — Usama Khalid"
        description="This page doesn't exist. Head back to the portfolio."
        path="/404"
        noindex
      />
      <div className="page-head">
        <span className="eyebrow">Error 404</span>
        <h1>
          That page <span className="hero-accent">doesn’t exist.</span>
        </h1>
        <p className="page-sub">
          The link may be old or mistyped. Here’s where you probably wanted to
          go.
        </p>
      </div>
      <div className="hero-ctas">
        <Link to="/" className="btn btn-primary" data-cursor>
          Back to home
        </Link>
        <Link to="/work" className="btn btn-ghost" data-cursor>
          See selected work
        </Link>
      </div>
    </section>
  )
}
