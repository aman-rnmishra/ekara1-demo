import { ScaleReveal, StaggerReveal, CardReveal } from './Reveal'

const services = [
  {
    title: 'Individual Finance',
    list: ['Financial Management', 'Tax & Insurance Planning', 'Investment & Goal Planning', 'Expense & Loan Management'],
  },
  {
    title: 'Fund Raising & Debt Advisory',
    body: 'Expert guidance on capital structure, financing options, and customized financial packages to raise necessary funds.',
  },
  {
    title: 'Business Plans & Feasibility',
    body: 'Business plans, feasibility studies, and financial projections for new projects, expansion, M&A, and loan rescheduling.',
  },
  {
    title: 'Outsourcing',
    list: ['Accounting & Corporate Secretarial', 'Payroll & Payment Services', 'Tax return, TDS & GST filing', 'PE accounts maintenance'],
  },
  {
    title: 'Business & Financial Modelling',
    body: 'Customized, logically structured models and decision support tools for your unique business objectives.',
  },
  {
    title: 'Valuation Services',
    body: 'Objective, substantiated valuations to assess and comprehend the value of your assets in a regulated climate.',
  },
]

export default function Services() {
  return (
    <section className="section services" id="services">
      <div className="container">
        <ScaleReveal className="section__header">
          <span className="section__label">Comprehensive Advisory</span>
          <h2 className="section__title">Our Services</h2>
          <p className="section__desc">Strategic and financial guidance for individuals, startups, and enterprises at every stage.</p>
        </ScaleReveal>
        <StaggerReveal className="services__grid">
          {services.map((s) => (
            <CardReveal key={s.title} className="services__card" shine>
              <h3>{s.title}</h3>
              {s.list ? (
                <ul>
                  {s.list.map((li) => (
                    <li key={li}>{li}</li>
                  ))}
                </ul>
              ) : (
                <p>{s.body}</p>
              )}
            </CardReveal>
          ))}
        </StaggerReveal>
      </div>
    </section>
  )
}
