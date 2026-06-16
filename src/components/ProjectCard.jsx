// Reusable editorial project card (used on Home preview and the full Work page).
export default function ProjectCard({ p }) {
  return (
    <a
      className="work2-card reveal"
      href={p.url}
      target="_blank"
      rel="noopener noreferrer"
      data-cursor
    >
      <div className="work2-thumb">
        <img src={p.image + '?v=5'} alt={p.title} loading="lazy" />
      </div>
      <div className="work2-info">
        <div>
          <h3>{p.title}</h3>
          <span className="work2-meta">
            {p.category} · {p.location}
          </span>
        </div>
        <span className="work2-arrow" aria-hidden="true">
          ↗
        </span>
      </div>
    </a>
  )
}
