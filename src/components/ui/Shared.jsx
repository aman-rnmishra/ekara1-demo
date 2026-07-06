import { motion } from 'framer-motion'

const variants = {
  positive: 'border-l-primary bg-primary-light/50',
  warning: 'border-l-amber-500 bg-amber-50',
  critical: 'border-l-red-500 bg-red-50',
  neutral: 'border-l-blue-500 bg-blue-50',
}

const badges = {
  positive: 'bg-primary/10 text-primary-dark',
  warning: 'bg-amber-100 text-amber-700',
  critical: 'bg-red-100 text-red-700',
  neutral: 'bg-blue-100 text-blue-700',
}

export function KPICard({ title, value, subtitle, icon: Icon, delay = 0, trend, compact = false }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.4 }}
      whileHover={{ y: -2, boxShadow: '0 8px 30px rgba(0,0,0,0.08)' }}
      className={`bg-card rounded-xl border border-border shadow-sm ${compact ? 'p-4' : 'p-5'}`}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0 flex-1">
          <p className={`text-text-secondary font-medium truncate ${compact ? 'text-xs' : 'text-sm'}`}>{title}</p>
          <p className={`font-bold text-text-primary mt-1 truncate ${compact ? 'text-lg' : 'text-2xl'}`}>{value}</p>
          {subtitle && (
            <p className={`mt-1 truncate ${compact ? 'text-xs' : 'text-sm'} ${trend === 'up' ? 'text-primary' : trend === 'down' ? 'text-red-500' : 'text-text-secondary'}`}>
              {subtitle}
            </p>
          )}
        </div>
        {Icon && (
          <div className={`shrink-0 rounded-lg bg-primary-light text-primary ${compact ? 'p-2' : 'p-2.5'}`}>
            <Icon size={compact ? 16 : 20} />
          </div>
        )}
      </div>
    </motion.div>
  )
}

export function Card({ children, className = '', hover = true }) {
  return (
    <motion.div
      whileHover={hover ? { y: -2 } : {}}
      className={`bg-card rounded-xl border border-border shadow-sm ${className}`}
    >
      {children}
    </motion.div>
  )
}

export function Badge({ children, variant = 'default' }) {
  const styles = {
    default: 'bg-gray-100 text-text-secondary',
    success: 'bg-primary-light text-primary-dark',
    warning: 'bg-amber-100 text-amber-700',
    danger: 'bg-red-100 text-red-700',
    healthy: 'bg-primary-light text-primary-dark',
    watch: 'bg-amber-100 text-amber-700',
    'high risk': 'bg-red-100 text-red-700',
  }
  return (
    <span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-semibold ${styles[variant.toLowerCase()] || styles.default}`}>
      {children}
    </span>
  )
}

export function InsightCard({ title, message, severity, detail, expanded, onToggle }) {
  return (
    <motion.div
      layout
      className={`border-l-4 rounded-xl p-4 cursor-pointer ${variants[severity]}`}
      onClick={onToggle}
      whileHover={{ scale: 1.01 }}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <span className={`text-xs font-semibold px-2 py-0.5 rounded-full capitalize ${badges[severity]}`}>{severity}</span>
            <h4 className="font-semibold text-text-primary text-sm">{title}</h4>
          </div>
          <p className="text-sm text-text-secondary">{message}</p>
          {expanded && detail && (
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-sm text-text-secondary mt-3 pt-3 border-t border-border/50">
              {detail}
            </motion.p>
          )}
        </div>
      </div>
    </motion.div>
  )
}

export function TabGroup({ tabs, active, onChange }) {
  return (
    <div className="flex gap-1 p-1 bg-gray-100 rounded-lg w-fit">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          type="button"
          onClick={() => onChange(tab.id)}
          className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${
            active === tab.id ? 'bg-white text-primary shadow-sm' : 'text-text-secondary hover:text-text-primary'
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  )
}

export function Button({ children, variant = 'primary', className = '', ...props }) {
  const styles = {
    primary: 'bg-primary text-white hover:bg-primary-dark shadow-sm',
    outline: 'border-2 border-primary text-primary hover:bg-primary-light',
    ghost: 'text-text-secondary hover:bg-gray-100',
    danger: 'bg-red-500 text-white hover:bg-red-600',
  }
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg font-semibold text-sm transition-colors ${styles[variant]} ${className}`}
      {...props}
    >
      {children}
    </motion.button>
  )
}

export function DataTable({ columns, data, onRowClick }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-border">
            {columns.map((col) => (
              <th key={col.key} className="text-left py-3 px-4 font-semibold text-text-secondary">{col.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, i) => (
            <motion.tr
              key={row.id || i}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: i * 0.03 }}
              onClick={() => onRowClick?.(row)}
              className={`border-b border-border/50 ${onRowClick ? 'cursor-pointer hover:bg-primary-light/30' : ''}`}
            >
              {columns.map((col) => (
                <td key={col.key} className="py-3 px-4">{col.render ? col.render(row) : row[col.key]}</td>
              ))}
            </motion.tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export function Logo({ className = 'h-9' }) {
  return (
    <img
      src={`${import.meta.env.BASE_URL}company-logo.png`}
      alt="Ekara Financials"
      className={className}
      onError={(e) => {
        e.target.style.display = 'none'
        e.target.nextSibling?.classList.remove('hidden')
      }}
    />
  )
}

export function LogoWithFallback({ className = 'h-9' }) {
  return (
    <span className="inline-flex items-center gap-2">
      <Logo className={className} />
      <span className="hidden h-9 w-9 rounded-full bg-primary text-white font-bold text-lg items-center justify-center">E</span>
    </span>
  )
}
