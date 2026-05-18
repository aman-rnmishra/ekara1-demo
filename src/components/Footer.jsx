import { motion } from 'framer-motion'

export default function Footer() {
  return (
    <motion.footer
      className="footer"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <div className="container">
        <div className="footer__content">
          <a href="#" className="footer__logo">
            <span className="logo-img-wrap">
              <img
                src="/company-logo.png"
                alt="Ekara Financials"
                className="logo-img"
                onError={(e) => {
                  e.target.style.display = 'none'
                  e.target.nextElementSibling?.classList.add('show')
                }}
              />
              <span className="logo-fallback" aria-hidden="true">
                <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="20" cy="20" r="19" stroke="currentColor" strokeWidth="2" fill="none" />
                  <text x="20" y="26" textAnchor="middle" fontSize="18" fontWeight="700" fill="currentColor" fontFamily="system-ui">E</text>
                </svg>
              </span>
            </span>
          </a>
          <p className="footer__legal">Ekara Financial Services Pvt Ltd. Regd Office: Plot No. F/2, Sector-5 C, Bokaro Steel City, Jharkhand 827006</p>
          <p className="footer__links">
            <a href="#privacy">Privacy Policy</a>
          </p>
          <p className="footer__domain"><a href="https://ekara.co.in">ekara.co.in</a></p>
        </div>
      </div>
    </motion.footer>
  )
}
