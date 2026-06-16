import { useState } from 'react'

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
  const [status, setStatus] = useState('idle') // idle | submitting | success | error

  const toggleService = (s) =>
    setServices((prev) =>
      prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]
    )

  const onSubmit = async (e) => {
    e.preventDefault()
    if (services.length === 0) {
      setTouched(true)
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
      setStatus('success')
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
            <div className="form-success">
              <h3>Thank you! 🎉</h3>
              <p>
                Your message is on its way — I'll be in touch within 24 hours.
              </p>
            </div>
          ) : (
            <>
              <input
                type="text"
                name="_gotcha"
                tabIndex="-1"
                autoComplete="off"
                style={{ display: 'none' }}
              />

              <div className="form-row">
                <label className="field">
                  <span>Name *</span>
                  <input name="name" type="text" required placeholder="Jane Doe" />
                </label>
                <label className="field">
                  <span>Email *</span>
                  <input
                    name="email"
                    type="email"
                    required
                    placeholder="jane@company.com"
                  />
                </label>
              </div>

              <div className="form-row">
                <label className="field">
                  <span>Company</span>
                  <input name="company" type="text" placeholder="Company name" />
                </label>
                <label className="field">
                  <span>Website (if any)</span>
                  <input name="website" type="url" placeholder="https://" />
                </label>
              </div>

              <div className="form-row">
                <label className="field">
                  <span>Country</span>
                  <input
                    name="country"
                    type="text"
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

              <div className="field">
                <span>What do you need? *</span>
                <div className="chips">
                  {SERVICES.map((s) => (
                    <button
                      type="button"
                      key={s}
                      className={`chip ${services.includes(s) ? 'active' : ''}`}
                      onClick={() => toggleService(s)}
                    >
                      {s}
                    </button>
                  ))}
                </div>
                {touched && services.length === 0 && (
                  <span className="form-hint">Please pick at least one.</span>
                )}
              </div>

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
                <p className="form-error">
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
