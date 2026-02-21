import { motion } from 'framer-motion'
import { SlideReveal, StaggerReveal, CardReveal } from './Reveal'

const contactCards = [
  {
    title: 'Reach Us',
    content: (
      <>
        <p><a href="mailto:team@ekara.co.in">team@ekara.co.in</a></p>
        <p><a href="https://wa.me/919431348343">+91 9431348343</a> (WhatsApp)</p>
      </>
    ),
  },
  {
    title: 'Registered Office',
    content: <p>Plot No. F/2, Sector-5 C, Bokaro Steel City,<br />Bokaro, Jharkhand 827006</p>,
  },
  {
    title: 'Branch Office',
    content: <p>House No. 183, New Moti Bagh Colony,<br />Near Phullawal Chowk, Ludhiana 141013</p>,
  },
]

export default function Contact() {
  return (
    <section className="section contact" id="contact">
      <div className="container">
        <SlideReveal className="section__header" from="right">
          <span className="section__label">Get in Touch</span>
          <h2 className="section__title">Join the Movement</h2>
          <p className="section__desc">Connect with us for startup finance, grants, investor matchmaking, and advisory.</p>
        </SlideReveal>
        <StaggerReveal className="contact__grid">
          {contactCards.map((card) => (
            <CardReveal key={card.title} className="contact__card" shine>
              <h3>{card.title}</h3>
              {card.content}
            </CardReveal>
          ))}
        </StaggerReveal>
        <motion.div
          className="contact__cta"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <motion.a href="mailto:team@ekara.co.in" className="btn btn--primary" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
            Email Us
          </motion.a>
          <motion.a href="https://wa.me/919431348343" className="btn btn--whatsapp" target="_blank" rel="noopener noreferrer" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
            WhatsApp
          </motion.a>
          <motion.a href="https://www.linkedin.com/company/ekara-financials/?viewAsMember=true" className="btn btn--linkedin" target="_blank" rel="noopener noreferrer" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
            LinkedIn
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}
