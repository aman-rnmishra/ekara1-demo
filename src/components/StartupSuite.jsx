import { BlurReveal, StaggerReveal, CardReveal } from './Reveal'

const cards = [
  { icon: '📋', title: 'Grant Advisory & Funding', desc: 'Identify, secure, and manage government & private grants for your startup.' },
  { icon: '🤝', title: 'Investor Matchmaking', desc: 'Connect high-potential startups with Angel Investors, VCs, and Impact Funds.' },
  { icon: '📊', title: 'Business Modelling', desc: 'Create robust financial models tailored to your startup\'s unique needs.' },
  { icon: '⚖️', title: 'Compliance Advisory', desc: 'Expert navigation of startup-specific regulatory and legal frameworks.' },
  { icon: '📁', title: 'Accounting & Taxes', desc: 'Streamline your financial records and tax compliance with end-to-end support.' },
  { icon: '🎓', title: 'Founder Training (Finance 101)', desc: 'Workshops on financial modelling, valuation, pitch decks, and equity understanding.' },
]

export default function StartupSuite() {
  return (
    <section className="section startup-suite" id="startup-suite">
      <div className="container">
        <BlurReveal className="section__header">
          <span className="section__label">What We Do</span>
          <h2 className="section__title">The Startup Finance Suite</h2>
          <p className="section__desc">Equipping founders with the tools and insights to master their startup's financial journey.</p>
        </BlurReveal>
        <StaggerReveal className="suite__grid">
          {cards.map((card) => (
            <CardReveal key={card.title} className="suite__card" shine>
              <div className="suite__icon">{card.icon}</div>
              <h3>{card.title}</h3>
              <p>{card.desc}</p>
            </CardReveal>
          ))}
          <CardReveal className="suite__card suite__card--wide" shine>
            <div className="suite__icon">📈</div>
            <h3>Financial Reporting Platform</h3>
            <p>A platform built for startups and investors to streamline financial transparency and portfolio oversight.</p>
            <div className="suite__detail">
              <p><strong>Startups:</strong> Securely upload data and gain structured insights into core business metrics—MRR, burn rate, runway, cash position, revenue trends, expenses, and more.</p>
              <p><strong>Investors:</strong> Consolidated portfolio dashboard with real-time company health indicators (Healthy / Watch), detailed per-company breakdowns, benchmarking (portfolio vs sector, cross-company comparisons), and downloadable analytics for decision-making.</p>
            </div>
          </CardReveal>
        </StaggerReveal>
      </div>
    </section>
  )
}
