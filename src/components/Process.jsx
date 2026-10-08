const STEPS = [
  {
    title: 'Discover',
    text: 'We talk through your goals, audience and timeline, then I send a clear scope so you know exactly what to expect.',
  },
  {
    title: 'Design',
    text: 'A focused design that fits your brand and is shaped around what turns visitors into enquiries.',
  },
  {
    title: 'Build',
    text: 'Fast, accessible, search-ready code — with progress shared along the way, not a surprise at the end.',
  },
  {
    title: 'Launch & support',
    text: 'A careful launch, a hands-on handover so your team can manage the site, and help when you need it.',
  },
]

export default function Process() {
  return (
    <section className="section" id="process">
      <div className="section-head">
        <div>
          <span className="eyebrow reveal">How I work</span>
          <h2 className="reveal">
            From first call to <span className="hero-accent">live site.</span>
          </h2>
        </div>
      </div>

      <ol className="process">
        {STEPS.map((s, i) => (
          <li className="process-step reveal" key={s.title}>
            <span className="process-num">0{i + 1}</span>
            <h3>{s.title}</h3>
            <p>{s.text}</p>
          </li>
        ))}
      </ol>
    </section>
  )
}
