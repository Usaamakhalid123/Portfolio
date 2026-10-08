import Tilt from './Tilt'

// One icon family: 24px grid, 1.6 stroke, round caps/joins.
const Icon = ({ children }) => (
  <svg
    viewBox="0 0 24 24"
    width="28"
    height="28"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    {children}
  </svg>
)

const services = [
  {
    title: 'Custom Web Apps',
    desc: 'Full-stack MERN apps, dashboards and client portals — built to scale and easy to maintain.',
    icon: (
      <Icon>
        <path d="m8 8-4 4 4 4M16 8l4 4-4 4M14 5l-4 14" />
      </Icon>
    ),
  },
  {
    title: 'WordPress',
    desc: 'Bespoke themes and plugins, with editing that’s simple for your team and pages that load fast.',
    icon: (
      <Icon>
        <rect x="3" y="4" width="18" height="16" rx="2.5" />
        <path d="M3 9h18M8 9v11" />
      </Icon>
    ),
  },
  {
    title: 'Shopify & E-commerce',
    desc: 'Stores designed to convert, with custom checkout flows and product pages that sell.',
    icon: (
      <Icon>
        <path d="M5 8h14l-1 12H6L5 8Z" />
        <path d="M9 8V6a3 3 0 0 1 6 0v2" />
      </Icon>
    ),
  },
  {
    title: 'SEO & Performance',
    desc: 'Core Web Vitals, technical SEO and speed work, so you rank higher and lose fewer visitors.',
    icon: (
      <Icon>
        <path d="M4 17a8 8 0 1 1 16 0" />
        <path d="m12 17 4-6" />
        <path d="M4 20h16" />
      </Icon>
    ),
  },
]

export default function Services() {
  return (
    <section className="section" id="services">
      <div className="section-head">
        <div>
          <span className="eyebrow reveal">Services</span>
          <h2 className="reveal">How I can help</h2>
        </div>
      </div>

      <div className="services-grid">
        {services.map((s, i) => (
          <div className="reveal" key={s.title}>
            <Tilt className="service glass" data-cursor>
              <span className="service-idx tilt-layer">0{i + 1}</span>
              <span className="service-icon tilt-layer-deep">{s.icon}</span>
              <h3 className="service-title tilt-layer">{s.title}</h3>
              <p className="service-desc tilt-layer">{s.desc}</p>
            </Tilt>
          </div>
        ))}
      </div>
    </section>
  )
}
