import { Link } from 'react-router-dom'
import { projects } from '../data/projects'
import ProjectCard from './ProjectCard'

// Featured four shown on the homepage.
const FEATURED = ['Khi Tam Health Hub', 'Pattern Labs', 'Base Health', 'Sama X']

export default function WorkPreview() {
  const featured = FEATURED.map((t) =>
    projects.find((p) => p.title === t)
  ).filter(Boolean)

  return (
    <section className="section work2" id="work">
      <div className="section-head">
        <div>
          <span className="eyebrow reveal">Selected Work</span>
          <h2 className="reveal" style={{ marginTop: '1rem' }}>
            Recent work I'm proud of.
          </h2>
        </div>
        <span className="section-count reveal">
          {projects.length} projects total
        </span>
      </div>

      <div className="work2-grid">
        {featured.map((p) => (
          <ProjectCard key={p.url} p={p} />
        ))}
      </div>

      <div className="work-cta reveal">
        <Link to="/work" className="btn btn-primary" data-cursor>
          View all {projects.length} projects →
        </Link>
      </div>
    </section>
  )
}
