const items = [
  'SaaS Products',
  'Custom Software',
  'AI Chatbots',
  'Vibe Coding',
  'WordPress',
  'Shopify',
  'MERN Stack',
  'Technical SEO',
  'Core Web Vitals',
  'UI & UX Design',
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
