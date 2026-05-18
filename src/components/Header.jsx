import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

const navLinks = [
  { href: '#hero', label: 'Home' },
  { href: '#startup-suite', label: 'Startup Suite' },
  { href: '#personal-finance-suite', label: 'Personal Finance' },
  { href: '#corporate-finance-suite', label: 'Corporate Finance' },
  { href: '#services', label: 'Services' },
  { href: '#impact', label: 'Impact' },
  { href: '#founder', label: 'Leadership' },
  { href: '#contact', label: 'Contact Us' },
  { href: '#about', label: 'About Us' },
  { href: '#privacy', label: 'Privacy Policy' },
]

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
  }, [menuOpen])

  return (
    <header className={`header ${scrolled ? 'scrolled' : ''}`} id="header">
      <nav className="nav container">
        <a href="#" className="nav__logo" onClick={() => setMenuOpen(false)}>
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
        <ul className={`nav__menu ${menuOpen ? 'active' : ''}`} id="nav-menu">
          {navLinks.map(({ href, label }) => (
            <li key={href}>
              <motion.a
                href={href}
                className="nav__link"
                onClick={() => setMenuOpen(false)}
                whileHover={{ y: -2 }}
                transition={{ duration: 0.2 }}
              >
                {label}
              </motion.a>
            </li>
          ))}
        </ul>
        <button
          type="button"
          className={`nav__toggle ${menuOpen ? 'active' : ''}`}
          aria-label="Toggle menu"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span />
          <span />
          <span />
        </button>
      </nav>
    </header>
  )
}
