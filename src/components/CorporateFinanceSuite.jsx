import { BlurReveal, StaggerReveal, CardReveal } from './Reveal'

const cards = [
  { icon: '💰', title: 'Expense Management', desc: 'Track and control business spending with structured budgets, approvals, and visibility across cost centres.' },
  { icon: '🎯', title: 'Goal Management', desc: 'Set and monitor corporate targets—revenue, margins, growth—with clear KPIs and reporting.' },
  { icon: '📒', title: 'Accountancy', desc: 'Maintain books, ledgers, and financial statements with accuracy and timely closure support.' },
  { icon: '🏗️', title: 'Project Funding', desc: 'Structure and secure funding for new projects, expansion, and capital expenditure.' },
  { icon: '💳', title: 'CC Limit', desc: 'Cash credit and overdraft facilities with optimal limits, pricing, and bank tie-ups.' },
  { icon: '📊', title: 'Working Capital', desc: 'Manage day-to-day liquidity with receivables, payables, and inventory-linked financing.' },
  { icon: '📄', title: 'Term Loan', desc: 'Long-term debt for capex, machinery, or refinance—sourced and structured for best terms.' },
  { icon: '📋', title: 'Tax Planning', desc: 'Corporate tax strategy, deductions, and compliance aligned with your business structure and timelines.' },
]

export default function CorporateFinanceSuite() {
  return (
    <section className="section corporate-finance-suite" id="corporate-finance-suite">
      <div className="container">
        <BlurReveal className="section__header">
          <span className="section__label">What We Do</span>
          <h2 className="section__title">The Corporate Finance Suite</h2>
          <p className="section__desc">End-to-end finance and compliance support for businesses—from accounts and funding to tax and working capital.</p>
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
