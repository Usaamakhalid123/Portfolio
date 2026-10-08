import { Link } from 'react-router-dom'
import { projects } from '../data/projects'
import ProjectCard from '../components/ProjectCard'

export default function WorkPage() {
  return (
    <section className="section work2 page" id="work">
      <div className="page-head">
        <span className="eyebrow reveal">All Work</span>
        <h1 className="reveal">{projects.length} sites, built &amp; live.</h1>
        <p className="reveal page-sub">
          Websites and web apps for clinics, law firms, e-commerce brands and
          software teams across the UK, UAE, Pakistan and Australia. Every one
          is live — click through and see for yourself.
        </p>
      </div>

      <div className="work2-grid">
        {projects.map((p) => (
          <ProjectCard key={p.url} p={p} />
        ))}
      </div>

      <div className="work-cta reveal">
        <Link to="/" className="btn btn-ghost" data-cursor>
          ← Back home
        </Link>
      </div>
    </section>
  )
}
