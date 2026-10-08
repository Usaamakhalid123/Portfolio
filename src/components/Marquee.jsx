const items = [
  'Custom Web Apps',
  'WordPress',
  'Shopify',
  'MERN Stack',
  'Technical SEO',
  'Core Web Vitals',
  'UI & UX Design',
  'E-commerce',
]

export default function Marquee() {
  const row = [...items, ...items]
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee-track">
        <span>
          {row.map((item, i) => (
            <span key={i}>{item}</span>
          ))}
        </span>
      </div>
    </div>
  )
}
