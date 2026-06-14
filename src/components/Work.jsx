import { useState } from 'react'
import { projects, categories } from '../data/projects'

function Card({ p }) {
  const onMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect()
    e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`)
    e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`)
  }

  return (
    <a
      className="work-card reveal"
      href={p.url}
      target="_blank"
      rel="noopener noreferrer"
      onMouseMove={onMove}
      data-cursor
    >
      <div className="work-card-top">
        <span className="work-cat">{p.category}</span>
        <span className="work-year">{p.year}</span>
      </div>
      <div className="work-card-body">
        <h3>
          {p.title}
          <span className="arrow">↗</span>
        </h3>
        <p>{p.description}</p>
        <div className="work-loc">{p.location}</div>
      </div>
    </a>
  )
}

export default function Work() {
  const [filter, setFilter] = useState('All')
  const shown =
    filter === 'All' ? projects : projects.filter((p) => p.category === filter)

  return (
    <section className="section" id="work">
      <div className="section-head">
        <div>
          <span className="eyebrow reveal">Selected Work</span>
          <h2 className="reveal" style={{ marginTop: '1rem' }}>
            Live client projects
          </h2>
        </div>
        <span className="section-count reveal">{projects.length} projects</span>
      </div>

      <div className="filters reveal">
        {categories.map((c) => (
          <button
            key={c}
            className={`filter ${filter === c ? 'active' : ''}`}
            onClick={() => setFilter(c)}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="work-grid">
        {shown.map((p) => (
          <Card key={p.url} p={p} />
        ))}
      </div>
    </section>
  )
}
