import { Reveal, CardReveal } from './Reveal'

const partners = ['Banks', 'NBFCs', 'Private Equity', 'Investors', 'Debt Investors', 'Family Offices']

export default function WhyEkara() {
  return (
    <section className="section why-ekara">
      <div className="container">
        <Reveal className="section__header">
          <span className="section__label">Why Choose Us</span>
          <h2 className="section__title">Why Ekara Financial Advisory?</h2>
        </Reveal>
        <CardReveal className="why__content">
          <p>Experience integrated solutions with our team's expertise across transaction-related disciplines and a strong global network. We believe in <strong>"Think globally, act locally"</strong>—our partners enable us to deliver international top-tier quality while adapting to local markets.</p>
          <p>Collaboration is at our core. As trusted advisors, we work with you to maximize efficiency and enhance value. <strong>Objectivity, integrity, and independence</strong> are the pillars of every engagement. Join us for tailored, secure, and trustworthy solutions.</p>
        </CardReveal>
        <CardReveal className="partners">
          <h3>Our Associate Partners</h3>
          <div className="partners__list">
            {partners.map((p) => (
              <span key={p}>{p}</span>
            ))}
          </div>
        </CardReveal>
      </div>
    </section>
  )
}
