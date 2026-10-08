import { Link } from 'react-router-dom'
import { projects } from '../data/projects'
import WorkIndex from '../components/WorkIndex'
import Seo from '../components/Seo'

export default function WorkPage() {
  return (
    <section className="section work2 page" id="work">
      <Seo
        title="Selected work — Usama Khalid | Freelance Web Developer"
        description="17 live websites and web apps for clinics, law firms, e-commerce brands and software teams across the UK, UAE, Pakistan and Australia."
        path="/work"
      />
      <div className="page-head">
        <span className="eyebrow reveal">All Work</span>
        <h1 className="reveal">{projects.length} sites, built &amp; live.</h1>
        <p className="reveal page-sub">
          Websites and web apps for clinics, law firms, e-commerce brands and
          software teams across the UK, UAE, Pakistan and Australia. Every one
          is live — click through and see for yourself.
        </p>
      </div>

      <WorkIndex items={projects} />

      <div className="work-cta reveal">
        <Link to="/" className="btn btn-ghost" data-cursor>
          ← Back home
        </Link>
      </div>
    </section>
  )
}
