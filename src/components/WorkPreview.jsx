import { Link } from 'react-router-dom'
import { projects } from '../data/projects'
import WorkIndex from './WorkIndex'

// Featured five shown on the homepage; the full list lives on /work.
const FEATURED = [
  'Khi Tam Health Hub',
  'Pattern Labs',
  'Base Health',
  'Sama X',
  'Shazoni Digital',
]

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
            Real clients. Live sites.
          </h2>
        </div>
        <span className="section-count reveal">
          {projects.length} live projects
        </span>
      </div>

      <WorkIndex items={featured} />

      <div className="work-cta reveal">
        <Link to="/work" className="btn btn-primary" data-cursor>
          View all {projects.length} projects →
        </Link>
      </div>
    </section>
  )
}
