import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import site from '../../site.config.js'

const EMAIL = 'usamakhalid.work@gmail.com'
const LINKEDIN = 'https://www.linkedin.com/in/usama-khalid-90a15b204'
const GITHUB = 'https://github.com/Usaamakhalid123'
const LINKTREE = 'https://linktr.ee/chusama32'

// Enquiries are delivered by Formspree. If the endpoint is ever reset to the
// YOUR_FORM_ID placeholder, the form falls back to the visitor's email app.
const FORMSPREE_ENDPOINT = 'https://formspree.io/f/xeaegrza'

const SERVICES = [
  'Website',
  'E-commerce',
  'Web Application',
  'SaaS Product',
  'Custom Software',
  'AI Chatbot',
  'Vibe Coding / MVP',
  'SEO & Performance',
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
        `Budget: ${data.budget || 'To discuss'}`,
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
    <section className="section contact dark" id="contact">
      <div className="contact-grid">
        <div className="contact-intro">
          <span className="eyebrow reveal">Let’s talk</span>
          <h2 className="reveal">
            Have a project in mind?{' '}
            <span className="hero-accent">Let’s build it.</span>
          </h2>
          <p className="reveal contact-lead">
            Tell me about your goals and timeline. I reply within 24 hours
            with clear next steps.
          </p>
          <div className="contact-details reveal">
            <a href={`mailto:${EMAIL}`} data-cursor>
              {EMAIL}
            </a>
            {site.whatsapp && (
              <a
                className="btn btn-primary wa-btn"
                href={`https://wa.me/${site.whatsapp}?text=${encodeURIComponent(
                  'Hi Usama, I found your portfolio and have a project in mind.'
                )}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                Chat on WhatsApp
              </a>
            )}
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
            <span className="contact-loc">London, UK · Lahore, PK</span>
          </div>
        </div>

        <form className="contact-form reveal" onSubmit={onSubmit}>
          {status === 'success' ? (
            <div className="form-success" role="status">
              <h3>Thanks — it’s with me.</h3>
              <p>
                I’ve got your enquiry and will reply within 24 hours.
              </p>
            </div>
          ) : status === 'mailto' ? (
            <div className="form-success" role="status">
              <h3>One last step</h3>
              <p>
                Your email app should have opened with your enquiry ready —
                press send to finish. If nothing opened, email me at{' '}
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

              <fieldset
                className="field field-group"
                aria-describedby={
                  touched && services.length === 0 ? 'services-error' : undefined
                }
              >
                <legend>What do you need help with? *</legend>
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
                    Choose at least one service so I know where to start.
                  </span>
                )}
              </fieldset>

              <label className="field">
                <span>Budget (optional)</span>
                <select name="budget" defaultValue="">
                  <option value="">Prefer to discuss</option>
                  {BUDGETS.map((b) => (
                    <option key={b} value={b}>
                      {b}
                    </option>
                  ))}
                </select>
              </label>

              <label className="field">
                <span>Project details *</span>
                <textarea
                  name="message"
                  rows="4"
                  required
                  placeholder="What are you building, what should it achieve, and when do you need it?"
                />
              </label>

              <button
                className="btn btn-primary"
                type="submit"
                disabled={status === 'submitting'}
              >
                {status === 'submitting' ? 'Sending…' : 'Send my enquiry →'}
              </button>
              <p className="form-note">
                Takes under a minute. I reply within 24 hours and only use your
                details to respond — see the{' '}
                <Link to="/privacy">privacy policy</Link>.
              </p>

              {status === 'error' && (
                <p className="form-error" role="alert">
                  That didn’t go through. Please email me directly at {EMAIL} and I’ll reply within 24 hours.
                </p>
              )}
            </>
          )}
        </form>
      </div>
    </section>
  )
}
