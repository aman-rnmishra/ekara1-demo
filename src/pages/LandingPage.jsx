import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  BarChart3, FileText, Sparkles, Heart, Flame, Target, Search,
  Upload, LineChart, Share2, Rocket, Mail, MapPin, ExternalLink,
  Menu, X, ArrowRight,
} from 'lucide-react'
import { Button } from '../components/ui/Shared'
import { useAuth } from '../context/AuthContext'

function DemoLink({ to, children, className = '', variant, onNavigate }) {
  const { logout } = useAuth()
  const navigate = useNavigate()

  const handleClick = (e) => {
    e.preventDefault()
    logout()
    onNavigate?.()
    navigate(to)
  }

  if (variant === 'button-primary') {
    return (
      <Button className={className} onClick={handleClick}>
        {children}
      </Button>
    )
  }
  if (variant === 'button-outline') {
    return (
      <Button variant="outline" className={className} onClick={handleClick}>
        {children}
      </Button>
    )
  }
  if (variant === 'text') {
    return (
      <button type="button" onClick={handleClick} className={className}>
        {children}
      </button>
    )
  }
  return (
    <Link to={to} onClick={() => logout()} className={className}>
      {children}
    </Link>
  )
}

const features = [
  { icon: BarChart3, title: 'Financial Dashboards', desc: 'Real-time KPIs, revenue analytics, and cash flow visibility in one place.' },
  { icon: FileText, title: 'Investor Reporting', desc: 'Automated monthly updates, quarterly reports, and board packs.' },
  { icon: Sparkles, title: 'Expert Insights', desc: 'Expert analysis of trends, risks, and opportunities in your financial data.' },
  { icon: Heart, title: 'Financial Health Score', desc: 'Composite score across growth, liquidity, profitability, and risk.' },
  { icon: Flame, title: 'Burn & Runway Analysis', desc: 'Forecast scenarios and track runway with interactive modeling.' },
  { icon: Target, title: 'Fundraising Readiness', desc: 'Valuation readiness scores and funding requirement forecasts.' },
  { icon: Search, title: 'Grant Discovery', desc: 'Match with government grants and track eligibility scores.' },
]

const steps = [
  { icon: Upload, title: 'Upload Financials', desc: 'Import P&L, balance sheet, and bank data securely.' },
  { icon: LineChart, title: 'Generate Insights', desc: 'Expert analysis transforms raw data into actionable intelligence.' },
  { icon: Share2, title: 'Share With Investors', desc: 'One-click investor updates and permission controls.' },
  { icon: Rocket, title: 'Raise Capital Faster', desc: 'Investor-grade reporting accelerates fundraising.' },
]

function FadeUp({ children, delay = 0, className = '' }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, delay }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

function LandingHeader() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const links = [
    { href: '#features', label: 'Features' },
    { href: '#how-it-works', label: 'How It Works' },
    { href: '#about', label: 'About' },
    { href: '#founder', label: 'Leadership' },
    { href: '#contact', label: 'Contact' },
  ]

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/90 backdrop-blur-md shadow-sm' : 'bg-transparent'}`}>
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16 lg:h-20">
        <a href="#" className="flex items-center gap-2.5">
          <img src={`${import.meta.env.BASE_URL}company-logo.png`} alt="Ekara Financials" className="h-9 w-9 object-contain" onError={(e) => { e.target.style.display = 'none' }} />
          <span className="font-bold text-lg text-text-primary">Ekara Financials</span>
        </a>

        <ul className="hidden lg:flex items-center gap-8">
          {links.map((l) => (
            <li key={l.href}>
              <a href={l.href} className="text-sm font-medium text-text-secondary hover:text-primary transition-colors">{l.label}</a>
            </li>
          ))}
        </ul>

        <div className="hidden lg:flex items-center gap-3">
          <DemoLink to="/login/investor" variant="text" className="text-sm font-semibold text-text-secondary hover:text-primary px-4 py-2">
            Investor Login
          </DemoLink>
          <DemoLink to="/login/startup" variant="button-primary" className="!py-2 !px-5">
            Startup Login
          </DemoLink>
        </div>

        <button type="button" className="lg:hidden" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {menuOpen && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="lg:hidden bg-white border-t border-border px-4 py-4 space-y-3">
          {links.map((l) => (
            <a key={l.href} href={l.href} onClick={() => setMenuOpen(false)} className="block text-sm font-medium py-2">{l.label}</a>
          ))}
          <div className="flex gap-2 pt-2">
            <DemoLink to="/login/investor" variant="text" onNavigate={() => setMenuOpen(false)} className="flex-1 text-center py-2.5 border border-border rounded-lg text-sm font-semibold">
              Investor Login
            </DemoLink>
            <DemoLink to="/login/startup" variant="text" onNavigate={() => setMenuOpen(false)} className="flex-1 text-center py-2.5 bg-primary text-white rounded-lg text-sm font-semibold">
              Startup Login
            </DemoLink>
          </div>
        </motion.div>
      )}
    </header>
  )
}

export default function LandingPage() {
  return (
    <div className="min-h-screen">
      <LandingHeader />

      {/* Hero */}
      <section className="relative pt-28 lg:pt-36 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary-light/60 via-bg to-bg" />
        <div className="absolute top-20 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-primary-accent/10 rounded-full blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <FadeUp delay={0.1}>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-display text-text-primary leading-tight max-w-4xl mx-auto">
              Startup Reporting <span className="text-primary">Investors Trust</span>
            </h1>
          </FadeUp>
          <FadeUp delay={0.2}>
            <p className="mt-6 text-lg sm:text-xl text-text-secondary max-w-2xl mx-auto leading-relaxed">
              Transform accounting data into investor-ready insights, runway forecasts, and financial intelligence.
            </p>
          </FadeUp>
          <FadeUp delay={0.3}>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <DemoLink to="/login/startup" variant="button-primary" className="!px-8 !py-3.5 text-base">
                Startup Login <ArrowRight size={18} />
              </DemoLink>
              <DemoLink to="/login/investor" variant="button-outline" className="!px-8 !py-3.5 text-base">
                Investor Login
              </DemoLink>
            </div>
          </FadeUp>

          <FadeUp delay={0.5} className="mt-16">
            <div className="relative max-w-5xl mx-auto rounded-2xl border border-border bg-card shadow-2xl shadow-primary/5 overflow-hidden">
              <div className="bg-primary-dark px-4 py-3 flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-red-400" />
                <span className="w-3 h-3 rounded-full bg-amber-400" />
                <span className="w-3 h-3 rounded-full bg-green-400" />
                <span className="ml-4 text-white/70 text-xs">app.ekara.org.in/dashboard</span>
              </div>
              <div className="p-6 lg:p-8 grid sm:grid-cols-3 gap-4 bg-gradient-to-br from-primary-light/30 to-white">
                {[
                  { label: 'Revenue', value: '₹ 1.85 Cr', change: '+18%' },
                  { label: 'Runway', value: '14 Months', change: 'Healthy' },
                  { label: 'Health Score', value: '87/100', change: '+3 pts' },
                ].map((kpi) => (
                  <div key={kpi.label} className="bg-white rounded-xl p-4 border border-border shadow-sm text-left">
                    <p className="text-xs text-text-secondary font-medium">{kpi.label}</p>
                    <p className="text-xl font-bold mt-1">{kpi.value}</p>
                    <p className="text-xs text-primary font-semibold mt-1">{kpi.change}</p>
                  </div>
                ))}
              </div>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeUp className="text-center mb-16">
            <span className="text-sm font-semibold text-primary uppercase tracking-wider">Platform Features</span>
            <h2 className="text-3xl lg:text-4xl font-bold mt-3">Everything founders and investors need</h2>
            <p className="text-text-secondary mt-4 max-w-2xl mx-auto">A complete financial operating layer for startups and portfolio oversight for investors.</p>
          </FadeUp>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {features.map((f, i) => (
              <FadeUp key={f.title} delay={i * 0.06}>
                <motion.div whileHover={{ y: -4 }} className="p-6 rounded-2xl border border-border bg-bg hover:shadow-lg hover:shadow-primary/5 transition-shadow h-full">
                  <div className="p-3 rounded-xl bg-primary-light text-primary w-fit mb-4">
                    <f.icon size={22} />
                  </div>
                  <h3 className="font-semibold text-lg">{f.title}</h3>
                  <p className="text-sm text-text-secondary mt-2 leading-relaxed">{f.desc}</p>
                </motion.div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* Why Ekara / How it works */}
      <section id="how-it-works" className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeUp className="text-center mb-16">
            <span className="text-sm font-semibold text-primary uppercase tracking-wider">Why Ekara</span>
            <h2 className="text-3xl lg:text-4xl font-bold mt-3">From data to capital in four steps</h2>
          </FadeUp>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, i) => (
              <FadeUp key={step.title} delay={i * 0.1}>
                <div className="relative text-center">
                  {i < steps.length - 1 && <div className="hidden lg:block absolute top-8 left-[60%] w-[80%] h-0.5 bg-primary/20" />}
                  <div className="w-16 h-16 rounded-2xl bg-primary text-white flex items-center justify-center mx-auto mb-4 shadow-lg shadow-primary/20">
                    <step.icon size={28} />
                  </div>
                  <span className="text-xs font-bold text-primary">Step {i + 1}</span>
                  <h3 className="font-semibold text-lg mt-1">{step.title}</h3>
                  <p className="text-sm text-text-secondary mt-2">{step.desc}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <FadeUp>
              <span className="text-sm font-semibold text-primary uppercase tracking-wider">Our Mission</span>
              <h2 className="text-3xl lg:text-4xl font-bold mt-3 leading-tight">Bridging the gap between ideas, funding & financial confidence</h2>
              <p className="text-text-secondary mt-6 leading-relaxed">
                Ekara reconstructs your finance by providing sophisticated and strategic financial advice which enriches your wealth. We make every Indian founder financially confident and every startup financially ready.
              </p>
            </FadeUp>
            <FadeUp delay={0.15}>
              <div className="grid gap-4">
                {[
                  { title: 'Our Vision', desc: 'Make every Indian founder financially confident and every startup financially ready.' },
                  { title: 'Our Promise', desc: 'A 360° financial partner powering every stage of your financial journey.' },
                ].map((card) => (
                  <div key={card.title} className="p-6 rounded-2xl border border-border bg-bg">
                    <h3 className="font-semibold text-lg text-primary">{card.title}</h3>
                    <p className="text-sm text-text-secondary mt-2">{card.desc}</p>
                  </div>
                ))}
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* Founder */}
      <section id="founder" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeUp className="text-center mb-12">
            <span className="text-sm font-semibold text-primary uppercase tracking-wider">Leadership</span>
            <h2 className="text-3xl font-bold mt-2">Founder</h2>
          </FadeUp>
          <FadeUp>
            <div className="max-w-4xl mx-auto flex flex-col md:flex-row gap-8 items-start p-8 rounded-2xl border border-border bg-bg">
              <img src={`${import.meta.env.BASE_URL}anima-mishra.png`} alt="Anima Mishra" className="w-48 h-48 rounded-2xl object-cover mx-auto md:mx-0" onError={(e) => { e.target.src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200"><rect fill="%23EAF7EE" width="200" height="200"/><text x="50%25" y="50%25" text-anchor="middle" dy=".3em" fill="%233FA34D" font-size="48">AM</text></svg>' }} />
              <div>
                <h3 className="text-2xl font-bold">Anima Mishra</h3>
                <p className="text-primary font-medium mt-1">Founder & CEO — Ekara Financials</p>
                <p className="text-sm text-text-secondary mt-4 leading-relaxed">
                  Anima founded Ekara after observing that many businesses treat funding, compliance, and financial planning as separate functions. Her work focuses on integrating financial reporting, regulatory compliance, and capital strategy into a unified operating framework — enabling continuous performance tracking and improved access to capital.
                </p>
                <a href="https://www.linkedin.com/in/anima-mishra-40048541" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 mt-4 text-sm font-semibold text-primary hover:underline">
                  <ExternalLink size={16} /> LinkedIn
                </a>
              </div>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeUp className="text-center mb-12">
            <h2 className="text-3xl font-bold">Join the Movement</h2>
            <p className="text-text-secondary mt-3">Connect with us for startup finance, grants, and advisory.</p>
          </FadeUp>
          <div className="grid sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[
              { icon: Mail, title: 'Reach Us', content: <><a href="mailto:team@ekara.org.in" className="text-primary hover:underline">team@ekara.org.in</a><br /><a href="https://wa.me/919431348343" className="text-primary hover:underline">+91 9431348343</a></> },
              { icon: MapPin, title: 'Registered Office', content: 'Plot No. F/2, Sector-5 C, Bokaro Steel City, Jharkhand 827006' },
              { icon: MapPin, title: 'Branch Office', content: 'House No. 183, New Moti Bagh Colony, Ludhiana 141013' },
            ].map((c) => (
              <FadeUp key={c.title}>
                <div className="p-6 rounded-2xl bg-card border border-border text-center h-full">
                  <c.icon className="mx-auto text-primary mb-3" size={24} />
                  <h3 className="font-semibold">{c.title}</h3>
                  <p className="text-sm text-text-secondary mt-2">{c.content}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 border-t border-border bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <img src={`${import.meta.env.BASE_URL}company-logo.png`} alt="Ekara" className="h-8 mx-auto mb-4" />
          <p className="text-sm text-text-secondary">Ekara Financial Services Pvt Ltd. · <a href="https://ekara.org.in" className="text-primary hover:underline">ekara.org.in</a></p>
          <p className="text-xs text-text-secondary mt-2">Regd Office: Plot No. F/2, Sector-5 C, Bokaro Steel City, Jharkhand 827006</p>
        </div>
      </footer>
    </div>
  )
}
