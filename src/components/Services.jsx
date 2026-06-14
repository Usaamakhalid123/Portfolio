const services = [
  {
    title: 'Custom Web Apps',
    desc: 'Full-stack MERN applications, dashboards and platforms.',
  },
  {
    title: 'WordPress',
    desc: 'Bespoke themes, plugins and fast marketing sites.',
  },
  {
    title: 'Shopify & E-commerce',
    desc: 'Conversion-focused stores with custom checkout flows.',
  },
  {
    title: 'SEO & Performance',
    desc: 'Core Web Vitals, technical SEO and speed optimization.',
  },
]

export default function Services() {
  return (
    <section className="section" id="services">
      <div className="section-head">
        <div>
          <span className="eyebrow reveal">Services</span>
          <h2 className="reveal" style={{ marginTop: '1rem' }}>
            What I build
          </h2>
        </div>
      </div>

      <div className="services-list">
        {services.map((s, i) => (
          <div className="service reveal" key={s.title} data-cursor>
            <span className="service-idx">0{i + 1}</span>
            <span className="service-title">{s.title}</span>
            <span className="service-desc">{s.desc}</span>
          </div>
        ))}
      </div>
    </section>
  )
}
