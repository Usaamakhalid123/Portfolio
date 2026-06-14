const items = [
  'Web Apps',
  'WordPress',
  'Shopify',
  'MERN Stack',
  'SEO',
  'Performance',
  'UI / UX',
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
