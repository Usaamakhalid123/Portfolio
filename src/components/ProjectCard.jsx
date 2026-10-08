import Tilt from './Tilt'

// Editorial project card with 3D tilt. The outer link carries the GSAP reveal;
// the inner Tilt owns the pointer transform so the two never fight.
export default function ProjectCard({ p }) {
  return (
    <a
      className="work2-card reveal"
      href={p.url}
      target="_blank"
      rel="noopener noreferrer"
      data-cursor
    >
      <Tilt className="work2-tilt" max={7}>
        <div className="work2-thumb">
          <img
            src={p.image + '?v=5'}
            alt={`${p.title} website screenshot`}
            loading="lazy"
          />
          <span className="work2-chip">{p.category}</span>
        </div>
        <div className="work2-info tilt-layer">
          <div>
            <h3>{p.title}</h3>
            <span className="work2-meta">
              {p.location} · {p.year}
            </span>
          </div>
          <span className="work2-arrow" aria-hidden="true">
            ↗
          </span>
        </div>
      </Tilt>
    </a>
  )
}
