import { Reveal, CardReveal } from './Reveal'

export default function Founder() {
  return (
    <section className="section founder" id="founder">
      <div className="container">
        <Reveal className="section__header">
          <span className="section__label">Leadership</span>
          <h2 className="section__title">Founder</h2>
        </Reveal>
        <CardReveal className="founder__card">
          <div className="founder__inner">
            <div className="founder__photo">
              <img src="/photo.jpg" alt="Anima Mishra, Founder - Ekara Financials" width="280" height="280" />
            </div>
            <div className="founder__content">
              <h3>Anima Mishra</h3>
              <p className="founder__role">Founder & Chief Executive Officer — Ekara Financials</p>
              <p>Anima Mishra is the Founder and CEO of Ekara Financials, a financial consulting company which help corporates, startups and individuals in managing their finances through financial and goal clarity with financial advisory and reporting platform that builds structured financial systems for startups, institutions, and growing businesses.</p>
              <p>She founded Ekara after observing that many businesses treat funding, compliance, and financial planning as separate functions, leading to reactive decisions and delayed capital readiness. Her work focuses on integrating financial reporting, regulatory compliance, and capital strategy into a unified operating framework.</p>
              <p>Under her leadership, Ekara supports organizations across startup finance, corporate financial management, and institutional enablement, helping them become audit-ready and investment-ready. Her current focus is on developing Ekara into a standardized financial operating layer that enables continuous performance tracking, compliance readiness, and improved access to capital.</p>
              <div className="founder__contact">
                <a href="https://www.linkedin.com/in/anima-mishra-40048541" target="_blank" rel="noopener noreferrer">LinkedIn</a>
              </div>
            </div>
          </div>
        </CardReveal>
      </div>
    </section>
  )
}
