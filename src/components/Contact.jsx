import { useRef, useState } from 'react'

const EMAIL = 'usamakhalid.work@gmail.com'
const LINKEDIN = 'https://www.linkedin.com/in/usama-khalid-90a15b204'
const GITHUB = 'https://github.com/Usaamakhalid123'
const LINKTREE = 'https://linktr.ee/chusama32'

// TODO(usama): create a free form at https://formspree.io and paste its endpoint
// here (looks like https://formspree.io/f/abcdwxyz). Until then, the form falls
// back to opening the visitor's email app addressed to you.
const FORMSPREE_ENDPOINT = 'https://formspree.io/f/YOUR_FORM_ID'

const SERVICES = [
  'Web Design',
  'Branding',
  'Development',
  'SEO',
  'Web Application',
  'E-commerce',
]
const BUDGETS = [
  'Under £500',
  '£500 – £1k',
  '£1k – £3k',
  '£3k – £5k',
  '£5k+',
]

export default function Contact() {
  const [services, setServices] = useState([])
  const [touched, setTouched] = useState(false)
  const [status, setStatus] = useState('idle') // idle | submitting | success | mailto | error
  const firstChip = useRef()

  const toggleService = (s) =>
    setServices((prev) =>
      prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]
    )

  const onSubmit = async (e) => {
    e.preventDefault()
    if (services.length === 0) {
      setTouched(true)
      firstChip.current?.focus()
      return
    }
    const form = e.currentTarget
    const data = Object.fromEntries(new FormData(form).entries())
    data.services = services.join(', ')
    delete data._gotcha

    // Fallback: no Formspree configured yet → open the visitor's email client.
    if (FORMSPREE_ENDPOINT.includes('YOUR_FORM_ID')) {
      const lines = [
        `Name: ${data.name}`,
        `Email: ${data.email}`,
        `Company: ${data.company || '-'}`,
        `Website: ${data.website || '-'}`,
        `Country: ${data.country || '-'}`,
        `Budget: ${data.budget || '-'}`,
        `Services: ${data.services}`,
        '',
        data.message,
      ]
      const subject = encodeURIComponent(`New project enquiry — ${data.name}`)
      const body = encodeURIComponent(lines.join('\n'))
      window.location.href = `mailto:${EMAIL}?subject=${subject}&body=${body}`
      // We can't know the visitor actually sent it, so don't claim success.
      setStatus('mailto')
      return
    }

    setStatus('submitting')
    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      setStatus(res.ok ? 'success' : 'error')
    } catch {
      setStatus('error')
    }
  }

  return (
    <section className="section contact" id="contact">
      <div className="contact-grid">
        <div className="contact-intro">
          <span className="eyebrow reveal">Say hello</span>
          <h2 className="reveal">
            Let's make something worth{' '}
            <span className="hero-accent">bookmarking.</span>
          </h2>
          <p className="reveal contact-lead">
            Tell me a little about your project and I'll get back to you within
            24 hours.
          </p>
          <div className="contact-details reveal">
            <a href={`mailto:${EMAIL}`} data-cursor>
              {EMAIL}
            </a>
            <div className="contact-socials">
              <a href={LINKEDIN} target="_blank" rel="noopener noreferrer">
                LinkedIn
              </a>
              <a href={GITHUB} target="_blank" rel="noopener noreferrer">
                GitHub
              </a>
              <a href={LINKTREE} target="_blank" rel="noopener noreferrer">
                Linktree
              </a>
            </div>
            <span className="contact-loc">Romford, UK · Lahore, PK</span>
          </div>
        </div>

        <form className="contact-form reveal" onSubmit={onSubmit}>
          {status === 'success' ? (
            <div className="form-success" role="status">
              <h3>Thank you!</h3>
              <p>
                Your message is on its way — I'll be in touch within 24 hours.
              </p>
            </div>
          ) : status === 'mailto' ? (
            <div className="form-success" role="status">
              <h3>Almost there</h3>
              <p>
                Your email app should have opened with your message ready —
                just press send. If nothing opened, email me directly at{' '}
                <a href={`mailto:${EMAIL}`} className="hero-accent">
                  {EMAIL}
                </a>
                .
              </p>
              <button
                type="button"
                className="btn btn-ghost"
                style={{ marginTop: '1.2rem' }}
                onClick={() => setStatus('idle')}
              >
                Back to the form
              </button>
            </div>
          ) : (
            <>
              <input
                type="text"
                name="_gotcha"
                tabIndex="-1"
                autoComplete="off"
                aria-hidden="true"
                style={{ display: 'none' }}
              />

              <div className="form-row">
                <label className="field">
                  <span>Name *</span>
                  <input
                    name="name"
                    type="text"
                    required
                    autoComplete="name"
                    placeholder="Jane Doe"
                  />
                </label>
                <label className="field">
                  <span>Email *</span>
                  <input
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    placeholder="jane@company.com"
                  />
                </label>
              </div>

              <div className="form-row">
                <label className="field">
                  <span>Company</span>
                  <input
                    name="company"
                    type="text"
                    autoComplete="organization"
                    placeholder="Company name"
                  />
                </label>
                <label className="field">
                  <span>Website (if any)</span>
                  <input
                    name="website"
                    type="url"
                    autoComplete="url"
                    placeholder="https://"
                  />
                </label>
              </div>

              <div className="form-row">
                <label className="field">
                  <span>Country</span>
                  <input
                    name="country"
                    type="text"
                    autoComplete="country-name"
                    placeholder="United Kingdom"
                  />
                </label>
                <label className="field">
                  <span>Budget</span>
                  <select name="budget" defaultValue="">
                    <option value="" disabled>
                      Select a range
                    </option>
                    {BUDGETS.map((b) => (
                      <option key={b} value={b}>
                        {b}
                      </option>
                    ))}
                  </select>
                </label>
              </div>

              <fieldset
                className="field field-group"
                aria-describedby={
                  touched && services.length === 0 ? 'services-error' : undefined
                }
              >
                <legend>What do you need? *</legend>
                <div className="chips">
                  {SERVICES.map((s, idx) => (
                    <button
                      type="button"
                      key={s}
                      ref={idx === 0 ? firstChip : undefined}
                      className={`chip ${services.includes(s) ? 'active' : ''}`}
                      aria-pressed={services.includes(s)}
                      onClick={() => toggleService(s)}
                    >
                      {s}
                    </button>
                  ))}
                </div>
                {touched && services.length === 0 && (
                  <span className="form-hint" id="services-error" role="alert">
                    Please pick at least one service.
                  </span>
                )}
              </fieldset>

              <label className="field">
                <span>Project details *</span>
                <textarea
                  name="message"
                  rows="4"
                  required
                  placeholder="Tell me about your project, goals and timeline…"
                />
              </label>

              <button
                className="btn btn-primary"
                type="submit"
                disabled={status === 'submitting'}
              >
                {status === 'submitting' ? 'Sending…' : 'Send message →'}
              </button>

              {status === 'error' && (
                <p className="form-error" role="alert">
                  Something went wrong — please email me directly at {EMAIL}.
                </p>
              )}
            </>
          )}
        </form>
      </div>
    </section>
  )
}
