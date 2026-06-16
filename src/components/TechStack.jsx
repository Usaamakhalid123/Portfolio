const TECHS = [
  { name: 'JavaScript', icon: 'javascript' },
  { name: 'TypeScript', icon: 'typescript' },
  { name: 'React', icon: 'react' },
  { name: 'Node.js', icon: 'nodedotjs' },
  { name: 'Next.js', icon: 'nextdotjs' },
  { name: 'MongoDB', icon: 'mongodb' },
  { name: 'WordPress', icon: 'wordpress' },
  { name: 'Shopify', icon: 'shopify' },
  { name: 'Wix', icon: 'wix' },
  { name: 'Tailwind', icon: 'tailwindcss' },
]

// Badges sit evenly around a circle. `.orbit` rotates the whole ring; each
// `.badge-spin` counter-rotates by the same amount so the pills stay upright.
export default function TechStack() {
  const n = TECHS.length
  return (
    <div className="techstack" aria-hidden="true">
      <div className="orbit-path" />
      <div className="orbit">
        {TECHS.map((t, i) => {
          const angle = (360 / n) * i
          return (
            <div
              className="orbit-item"
              key={t.name}
              style={{
                transform: `rotate(${angle}deg) translateY(calc(-1 * var(--orbit-r)))`,
              }}
            >
              <div
                className="orbit-counter"
                style={{ transform: `rotate(${-angle}deg)` }}
              >
                <div className="badge-spin">
                  <div className="tech-badge-inner">
                    <img src={`/icons/${t.icon}.svg`} alt="" />
                    <span>{t.name}</span>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
