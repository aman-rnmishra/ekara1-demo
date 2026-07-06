import { useState } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Mail, Lock, ArrowLeft, Building2, TrendingUp } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { Button } from '../components/ui/Shared'

export default function LoginPage() {
  const { role } = useParams()
  const navigate = useNavigate()
  const { login } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const isStartup = role === 'startup'
  const title = isStartup ? 'Startup Login' : 'Investor Login'
  const Icon = isStartup ? Building2 : TrendingUp

  const handleSubmit = (e) => {
    e.preventDefault()
    const result = login(email, password, role)
    if (result.success) {
      navigate(isStartup ? '/startup' : '/investor')
    } else {
      setError(result.error)
    }
  }

  return (
    <div className="min-h-screen bg-bg flex">
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-primary-dark to-primary p-12 flex-col justify-between text-white">
        <Link to="/" className="flex items-center gap-3">
          <img src={`${import.meta.env.BASE_URL}company-logo.png`} alt="Ekara" className="h-10 w-10 rounded-lg bg-white/10 p-1" />
          <span className="text-xl font-bold">Ekara Financials</span>
        </Link>
        <div>
          <h2 className="text-4xl font-bold font-display mb-4">
            {isStartup ? 'Report with confidence' : 'Portfolio intelligence at scale'}
          </h2>
          <p className="text-white/80 text-lg">
            {isStartup
              ? 'Transform your financial data into investor-ready insights.'
              : 'Monitor portfolio health, risks, and opportunities in real time.'}
          </p>
        </div>
        <p className="text-white/50 text-sm">EKARA V1 — Financial reporting & portfolio intelligence</p>
      </div>

      <div className="flex-1 flex items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md"
        >
          <Link to="/" className="inline-flex items-center gap-2 text-text-secondary text-sm mb-8 hover:text-primary">
            <ArrowLeft size={16} /> Back to home
          </Link>

          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 rounded-xl bg-primary-light text-primary">
              <Icon size={24} />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-text-primary">{title}</h1>
              <p className="text-text-secondary text-sm">Access your {isStartup ? 'startup' : 'investor'} dashboard</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="bg-card rounded-2xl border border-border p-8 shadow-sm space-y-5">
            {error && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-red-50 text-red-600 text-sm px-4 py-3 rounded-lg border border-red-100">
                {error}
              </motion.div>
            )}

            <div>
              <label className="block text-sm font-medium text-text-primary mb-1.5">Email</label>
              <div className="relative">
                <Mail size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); setError('') }}
                  className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
                  placeholder={isStartup ? 'startup@ekara.org.in' : 'investor@ekara.org.in'}
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-text-primary mb-1.5">Password</label>
              <div className="relative">
                <Lock size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); setError('') }}
                  className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            <Button type="submit" className="w-full">Sign In</Button>
          </form>
        </motion.div>
      </div>
    </div>
  )
}
