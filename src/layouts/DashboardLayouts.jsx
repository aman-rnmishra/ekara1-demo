import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  LayoutDashboard, Upload, FileText, BarChart3, Sparkles, FileBarChart,
  Users, Award, Target, Settings, LogOut, Menu, ChevronRight, BadgePercent,
} from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import NotificationBell from '../components/ui/NotificationBell'
import { STARTUP_NOTIFICATIONS, INVESTOR_NOTIFICATIONS } from '../data/demoData'

const startupNav = [
  { path: '/startup', icon: LayoutDashboard, label: 'Dashboard', end: true },
  { path: '/startup/uploads', icon: Upload, label: 'Financial Uploads' },
  { path: '/startup/statements', icon: FileText, label: 'Financial Statements' },
  { path: '/startup/metrics', icon: BarChart3, label: 'Metrics' },
  { path: '/startup/insights', icon: Sparkles, label: 'Expert Insights' },
  { path: '/startup/reports', icon: FileBarChart, label: 'Reports' },
  { path: '/startup/investors', icon: Users, label: 'Investors' },
  { path: '/startup/grants', icon: Award, label: 'Grant Eligibility' },
  { path: '/startup/tax-credits', icon: BadgePercent, label: 'Tax Credits & Incentives' },
  { path: '/startup/settings', icon: Settings, label: 'Settings' },
]

export function StartupLayout({ children }) {
  const { user, logout } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()
  const [collapsed, setCollapsed] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  const NavContent = () => (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b border-border">
        <Link to="/" className="flex items-center gap-2">
          <img src={`${import.meta.env.BASE_URL}company-logo.png`} alt="Ekara" className="h-8 w-8 rounded-lg object-contain" onError={(e) => { e.target.src = '' }} />
          {!collapsed && <span className="font-bold text-text-primary">Ekara</span>}
        </Link>
        {!collapsed && <p className="text-xs text-text-secondary mt-2 truncate">{user?.name}</p>}
      </div>
      <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
        {startupNav.map(({ path, icon: Icon, label, end }) => {
          const isActive = end
            ? location.pathname === '/startup'
            : location.pathname === path || location.pathname.startsWith(`${path}/`)
          return (
            <Link
              key={path}
              to={path}
              onClick={() => setMobileOpen(false)}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                isActive ? 'bg-primary-light text-primary-dark' : 'text-text-secondary hover:bg-gray-50 hover:text-text-primary'
              }`}
            >
              <Icon size={18} />
              {!collapsed && label}
            </Link>
          )
        })}
      </nav>
      <div className="p-3 border-t border-border shrink-0">
        <button type="button" onClick={handleLogout} title="Logout" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-text-secondary hover:bg-red-50 hover:text-red-600 w-full">
          <LogOut size={18} />
          {!collapsed && 'Logout'}
        </button>
      </div>
    </div>
  )

  return (
    <div className="flex min-h-screen bg-bg">
      <motion.aside
        animate={{ width: collapsed ? 72 : 256 }}
        className="hidden lg:flex flex-col bg-card border-r border-border fixed h-full z-30"
      >
        <div className="h-full w-full overflow-hidden">
          <NavContent />
        </div>
        <button type="button" onClick={() => setCollapsed(!collapsed)} className="absolute -right-3 top-20 bg-card border border-border rounded-full p-1 shadow-sm">
          <ChevronRight size={14} className={`transition-transform ${collapsed ? '' : 'rotate-180'}`} />
        </button>
      </motion.aside>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="lg:hidden fixed inset-0 bg-black/40 z-40" onClick={() => setMobileOpen(false)} />
        )}
      </AnimatePresence>
      <motion.aside
        initial={false}
        animate={{ x: mobileOpen ? 0 : -280 }}
        className="lg:hidden fixed left-0 top-0 h-full w-64 bg-card border-r border-border z-50 flex flex-col"
      >
        <NavContent />
      </motion.aside>

      <div className={`flex-1 ${collapsed ? 'lg:ml-[72px]' : 'lg:ml-64'}`}>
        <header className="sticky top-0 z-20 bg-card/80 backdrop-blur-md border-b border-border px-4 lg:px-8 py-4 flex items-center justify-between gap-4">
          <button type="button" className="lg:hidden" onClick={() => setMobileOpen(true)}>
            <Menu size={22} />
          </button>
          <h1 className="text-lg font-semibold text-text-primary flex-1">Startup Portal</h1>
          <div className="flex items-center gap-3">
            <NotificationBell notifications={STARTUP_NOTIFICATIONS} />
            <span className="hidden sm:inline text-xs bg-primary-light text-primary-dark px-3 py-1 rounded-full font-medium">Demo Mode</span>
            <button
              type="button"
              onClick={handleLogout}
              className="inline-flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-text-secondary hover:bg-red-50 hover:text-red-600 border border-border"
            >
              <LogOut size={16} />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </header>
        <main className="p-4 lg:p-8">{children}</main>
      </div>
    </div>
  )
}

const investorNav = [
  { path: '/investor', icon: LayoutDashboard, label: 'Portfolio Dashboard', end: true },
  { path: '/investor/companies', icon: BarChart3, label: 'Companies' },
  { path: '/investor/reports', icon: FileBarChart, label: 'Reports' },
  { path: '/investor/risk', icon: Target, label: 'Risk Center' },
  { path: '/investor/tax-credits', icon: BadgePercent, label: 'Tax Credits & Incentives' },
  { path: '/investor/insights', icon: Sparkles, label: 'Expert Insights' },
  { path: '/investor/settings', icon: Settings, label: 'Settings' },
]

export function InvestorLayout({ children }) {
  const { user, logout } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()
  const [collapsed, setCollapsed] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  const NavContent = () => (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b border-border">
        <Link to="/" className="flex items-center gap-2">
          <img src={`${import.meta.env.BASE_URL}company-logo.png`} alt="Ekara" className="h-8 w-8 rounded-lg object-contain" />
          {!collapsed && <span className="font-bold text-text-primary">Ekara</span>}
        </Link>
        {!collapsed && <p className="text-xs text-text-secondary mt-2 truncate">{user?.name}</p>}
      </div>
      <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
        {investorNav.map(({ path, icon: Icon, label, end }) => {
          const isActive = end ? location.pathname === '/investor' : location.pathname.startsWith(path) && path !== '/investor'
          return (
            <Link
              key={path}
              to={path}
              onClick={() => setMobileOpen(false)}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                isActive ? 'bg-primary-light text-primary-dark' : 'text-text-secondary hover:bg-gray-50 hover:text-text-primary'
              }`}
            >
              <Icon size={18} />
              {!collapsed && label}
            </Link>
          )
        })}
      </nav>
      <div className="p-3 border-t border-border shrink-0">
        <button type="button" onClick={handleLogout} title="Logout" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-text-secondary hover:bg-red-50 hover:text-red-600 w-full">
          <LogOut size={18} />
          {!collapsed && 'Logout'}
        </button>
      </div>
    </div>
  )

  return (
    <div className="flex min-h-screen bg-bg">
      <motion.aside
        animate={{ width: collapsed ? 72 : 256 }}
        className="hidden lg:flex flex-col bg-card border-r border-border fixed h-full z-30"
      >
        <div className="h-full w-full overflow-hidden">
          <NavContent />
        </div>
        <button type="button" onClick={() => setCollapsed(!collapsed)} className="absolute -right-3 top-20 bg-card border border-border rounded-full p-1 shadow-sm">
          <ChevronRight size={14} className={`transition-transform ${collapsed ? '' : 'rotate-180'}`} />
        </button>
      </motion.aside>

      {mobileOpen && <div className="lg:hidden fixed inset-0 bg-black/40 z-40" onClick={() => setMobileOpen(false)} />}
      <motion.aside
        animate={{ x: mobileOpen ? 0 : -280 }}
        className="lg:hidden fixed left-0 top-0 h-full w-64 bg-card border-r border-border z-50 flex flex-col"
      >
        <NavContent />
      </motion.aside>

      <div className={`flex-1 ${collapsed ? 'lg:ml-[72px]' : 'lg:ml-64'}`}>
        <header className="sticky top-0 z-20 bg-card/80 backdrop-blur-md border-b border-border px-4 lg:px-8 py-4 flex items-center justify-between gap-4">
          <button type="button" className="lg:hidden" onClick={() => setMobileOpen(true)}>
            <Menu size={22} />
          </button>
          <h1 className="text-lg font-semibold text-text-primary flex-1">Investor Portal</h1>
          <div className="flex items-center gap-3">
            <NotificationBell notifications={INVESTOR_NOTIFICATIONS} />
            <span className="hidden sm:inline text-xs bg-primary-light text-primary-dark px-3 py-1 rounded-full font-medium">Demo Mode</span>
            <button
              type="button"
              onClick={handleLogout}
              className="inline-flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-text-secondary hover:bg-red-50 hover:text-red-600 border border-border"
            >
              <LogOut size={16} />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </header>
        <main className="p-4 lg:p-8">{children}</main>
      </div>
    </div>
  )
}
