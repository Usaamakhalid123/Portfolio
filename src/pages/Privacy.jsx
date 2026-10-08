import { Link } from 'react-router-dom'
import Seo from '../components/Seo'
import site from '../../site.config.js'

const EMAIL = 'usamakhalid.work@gmail.com'

export default function Privacy() {
  return (
    <section className="section page">
      <Seo
        title="Privacy policy — Usama Khalid"
        description="How enquiries sent through this website are handled and stored."
        path="/privacy"
      />
      <div className="page-head">
        <span className="eyebrow">Privacy</span>
        <h1>Privacy policy</h1>
        <p className="page-sub">
          Short and plain: what I collect, why, and how to have it removed.
        </p>
      </div>

      <div className="prose">
        <h2>What I collect</h2>
        <p>
          Only what you type into the contact form: your name, email address,
          the services you’re interested in, an optional budget range and your
          project details. If you email or message me directly, I receive
          whatever you send.
        </p>

        <h2>Why I collect it</h2>
        <p>
          To reply to your enquiry and, if we work together, to scope and
          deliver your project. I don’t sell your details or add you to any
          mailing list.
        </p>

        <h2>Who processes it</h2>
        <p>
          Form submissions are delivered by{' '}
          <a href="https://formspree.io/legal/privacy-policy/" target="_blank" rel="noopener noreferrer">
            Formspree
          </a>
          , which forwards them to my email inbox. Formspree acts as a
          processor and has its own privacy policy.
        </p>

        <h2>Analytics and cookies</h2>
        <p>
          {site.plausibleDomain
            ? 'This site uses Plausible Analytics, which is cookie-free and does not track individuals or collect personal data. No cookie banner is needed.'
            : 'This site does not use advertising or tracking cookies.'}
        </p>

        <h2>How long I keep it</h2>
        <p>
          I keep enquiries for as long as needed to respond and to manage any
          resulting work, then delete them.
        </p>

        <h2>Your rights</h2>
        <p>
          You can ask me to see, correct or delete the information I hold
          about you at any time by emailing{' '}
          <a href={`mailto:${EMAIL}`}>{EMAIL}</a>. I’ll respond within a
          reasonable time.
        </p>

        <p className="prose-meta">
          Last updated: {new Date().getFullYear()}. <Link to="/">Back to home</Link>
        </p>
      </div>
    </section>
  )
}
