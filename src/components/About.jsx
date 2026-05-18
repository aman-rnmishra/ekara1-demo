import { ScaleReveal, StaggerReveal, CardReveal } from './Reveal'

export default function About() {
  return (
    <section className="section about" id="about">
      <div className="container">
        <ScaleReveal className="section__header">
          <span className="section__label">Our Mission</span>
          <h2 className="section__title">Bridging the gap between ideas, funding & financial confidence</h2>
        </ScaleReveal>
        <StaggerReveal className="about__grid">
          <CardReveal className="about__card" shine style={{ boxShadow: 'var(--shadow)' }}>
            <div className="about__icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
              </svg>
            </div>
            <h3>Our Vision</h3>
            <p>Make every Indian founder financially confident and every startup financially ready.</p>
          </CardReveal>
          <CardReveal className="about__card" shine style={{ boxShadow: 'var(--shadow)' }}>
            <div className="about__icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" />
              </svg>
            </div>
            <h3>Our Promise</h3>
            <p>A 360° financial partner powering every stage of your financial journey.</p>
          </CardReveal>
        </StaggerReveal>
        <CardReveal className="about__quote">
          "We, at Ekara, reconstruct your finance by providing sophisticated and strategic financial advice which enriches your wealth."
          <cite>— Ekara Team</cite>
        </CardReveal>
      </div>
    </section>
  )
}
