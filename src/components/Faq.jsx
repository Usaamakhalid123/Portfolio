const FAQS = [
  {
    q: 'What does a project typically cost?',
    a: 'It depends on scope — a clean marketing site is very different from a custom web app or online store. Tell me your goals and budget range in the form and I’ll reply with a clear quote.',
  },
  {
    q: 'How long will it take?',
    a: 'That depends on scope and how quickly content and feedback come back. You’ll get a realistic schedule in the proposal, before any work starts.',
  },
  {
    q: 'Will I be able to update the site myself?',
    a: 'Yes. I build with editing in mind and walk you through managing the site, so everyday changes don’t depend on me.',
  },
  {
    q: 'Can you build a SaaS product or custom software from scratch?',
    a: 'Yes. I build SaaS products and custom software end to end — from the first idea and MVP through to a product that can scale.',
  },
  {
    q: 'What is vibe coding, and do you offer it?',
    a: 'Vibe coding means building with AI assistance to turn an idea into a working prototype quickly. I use it to get MVPs in front of users fast, then review and harden the code so it’s ready for production.',
  },
  {
    q: 'What can an AI chatbot do for my business?',
    a: 'It can answer common customer questions, capture leads and point people to the right next step around the clock — connected to your website and the tools you already use.',
  },
  {
    q: 'Do you work with clients outside the UK?',
    a: 'Yes. I’m based between London, UK and Lahore, Pakistan, and have delivered projects for clients in the UK, UAE, Pakistan and Australia.',
  },
  {
    q: 'Can you improve or redesign my existing website?',
    a: 'Yes. Besides new builds, I rework existing WordPress, Shopify and custom sites — for speed, SEO, conversion or a fresh look.',
  },
  {
    q: 'Do you offer support after launch?',
    a: 'Yes. I stay available after launch for fixes and updates — just get in touch.',
  },
]

// Structured data lets search engines show these answers directly in results.
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQS.map((f) => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  })),
}

export default function Faq() {
  return (
    <section className="section" id="faq">
      <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      <div className="section-head">
        <div>
          <span className="eyebrow reveal">FAQ</span>
          <h2 className="reveal">Good questions.</h2>
        </div>
      </div>

      <div className="faq reveal">
        {FAQS.map((f) => (
          <details className="faq-item" key={f.q}>
            <summary>
              <span>{f.q}</span>
              <i aria-hidden="true" />
            </summary>
            <p>{f.a}</p>
          </details>
        ))}
      </div>
    </section>
  )
}
