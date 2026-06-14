const stats = [
  { num: '40+', label: 'Projects shipped' },
  { num: '3+', label: 'Years experience' },
  { num: '4', label: 'Countries served' },
]

export default function About() {
  return (
    <section className="section" id="about">
      <span className="eyebrow reveal">About</span>
      <div className="about-grid" style={{ marginTop: '2.5rem' }}>
        <p className="about-lead reveal">
          I help businesses look <em>credible</em>, load <em>fast</em> and
          convert <em>more</em> — turning ideas into polished, high-performing
          web experiences.
        </p>
        <div className="about-body reveal">
          <p>
            I'm Usama Khalid, a freelance full-stack developer based between
            Romford, UK and Lahore, Pakistan. Over 3+ years I've delivered 40+
            websites and custom web apps for clinics, agencies, law firms,
            e-commerce brands and startups.
          </p>
          <p>
            My stack spans the MERN ecosystem, WordPress and Shopify — paired
            with a sharp focus on performance, SEO and design detail. The result:
            sites that don't just look good, but win clients.
          </p>
          <div className="stats">
            {stats.map((s) => (
              <div key={s.label}>
                <div className="stat-num">{s.num}</div>
                <div className="stat-label">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
