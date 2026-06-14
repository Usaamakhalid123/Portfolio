// TODO(usama): confirm the email + social links you want shown publicly.
const EMAIL = 'usamakhalid.work@gmail.com'
const socials = [
  { label: 'GitHub', url: 'https://github.com/Usaamakhalid123' },
  { label: 'Linktree', url: 'https://linktr.ee/chusama32' },
  { label: 'LinkedIn', url: '#' },
]

export default function Contact() {
  return (
    <section className="contact" id="contact">
      <span className="eyebrow reveal" style={{ justifyContent: 'center' }}>
        Get in touch
      </span>
      <h2 className="reveal" style={{ marginTop: '1.5rem' }}>
        Let's build
        <br />
        something <span className="hero-accent">great.</span>
      </h2>
      <a className="contact-mail reveal" href={`mailto:${EMAIL}`} data-cursor>
        {EMAIL}
      </a>
      <div className="contact-socials reveal">
        {socials.map((s) => (
          <a key={s.label} href={s.url} target="_blank" rel="noopener noreferrer">
            {s.label}
          </a>
        ))}
      </div>
    </section>
  )
}
