import { Link } from 'react-router-dom'
import { projects } from '../data/projects'
import ProjectCard from '../components/ProjectCard'

export default function WorkPage() {
  return (
    <section className="section work2 page" id="work">
      <div className="page-head">
        <span className="eyebrow reveal">All Work</span>
        <h1 className="reveal">{projects.length} sites, shipped &amp; live.</h1>
        <p className="reveal page-sub">
          A complete look at the websites and web apps I've built for clients
          across the UK, UAE, Pakistan and Australia — from clinics and law firms
          to e-commerce and SaaS.
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
