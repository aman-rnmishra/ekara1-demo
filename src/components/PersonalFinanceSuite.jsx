import { BlurReveal, StaggerReveal, CardReveal } from './Reveal'

const cards = [
  { icon: '💰', title: 'Expense Management', desc: 'Track spending, set budgets, and get clear insights to take control of your day-to-day finances.' },
  { icon: '🎯', title: 'Goal Management', desc: 'Plan and track financial goals—savings, education, retirement—with clear milestones and timelines.' },
  { icon: '📄', title: 'Personal & Business Loans', desc: 'End-to-end support for personal and business loan sourcing, structuring, and documentation.' },
  { icon: '🏠', title: 'Home Loans & LAP', desc: 'Expert guidance on home loans and loan against property for purchase, construction, or refinance.' },
  { icon: '🚗', title: 'Auto Loans', desc: 'Simplified vehicle financing with competitive rates and quick processing for new and used cars.' },
  { icon: '🛡️', title: 'Insurances & Mutual Funds', desc: 'Tailored insurance (life, health, general) and mutual fund portfolios aligned to your goals and risk profile.' },
]

export default function PersonalFinanceSuite() {
  return (
    <section className="section personal-finance-suite" id="personal-finance-suite">
      <div className="container">
        <BlurReveal className="section__header">
          <span className="section__label">What We Do</span>
          <h2 className="section__title">The Personal Finance Suite</h2>
          <p className="section__desc">Structured solutions for your everyday money needs—expenses, goals, loans, and investments.</p>
        </BlurReveal>
        <StaggerReveal className="suite__grid">
          {cards.map((card) => (
            <CardReveal key={card.title} className="suite__card" shine>
              <div className="suite__icon">{card.icon}</div>
              <h3>{card.title}</h3>
              <p>{card.desc}</p>
            </CardReveal>
          ))}
        </StaggerReveal>
      </div>
    </section>
  )
}
