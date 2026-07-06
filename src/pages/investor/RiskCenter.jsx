import { useState, useMemo } from 'react'
import { AlertTriangle, Shield } from 'lucide-react'
import { PageTransition } from '../../components/ui/Animated'
import { Card, Badge } from '../../components/ui/Shared'
import { FilterChips } from '../../components/ui/FilterChips'
import { RISK_FLAGS } from '../../data/demoData'
import { motion, AnimatePresence } from 'framer-motion'

const severityStyles = {
  high: 'border-l-red-500 bg-red-50',
  medium: 'border-l-amber-500 bg-amber-50',
  low: 'border-l-blue-500 bg-blue-50',
}

const severityFilters = [
  { id: 'all', label: 'All' },
  { id: 'high', label: 'High' },
  { id: 'medium', label: 'Medium' },
  { id: 'low', label: 'Low' },
]

export default function RiskCenter() {
  const [severity, setSeverity] = useState('all')

  const filtered = useMemo(() => {
    if (severity === 'all') return RISK_FLAGS
    return RISK_FLAGS.filter((r) => r.severity === severity)
  }, [severity])

  const grouped = useMemo(() => ({
    high: filtered.filter((r) => r.severity === 'high'),
    medium: filtered.filter((r) => r.severity === 'medium'),
    low: filtered.filter((r) => r.severity === 'low'),
  }), [filtered])

  return (
    <PageTransition>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold">Risk Center</h2>
            <p className="text-text-secondary mt-1">Automatic portfolio risk flags and recommended actions</p>
          </div>
          <FilterChips options={severityFilters} value={severity} onChange={setSeverity} />
        </div>

        <div className="grid sm:grid-cols-3 gap-4">
          {[
            { label: 'High Risk', count: grouped.high.length, color: 'text-red-600 bg-red-50', filter: 'high' },
            { label: 'Medium Risk', count: grouped.medium.length, color: 'text-amber-600 bg-amber-50', filter: 'medium' },
            { label: 'Low Risk', count: grouped.low.length, color: 'text-blue-600 bg-blue-50', filter: 'low' },
          ].map((s) => (
            <button
              key={s.label}
              type="button"
              onClick={() => setSeverity(severity === s.filter ? 'all' : s.filter)}
              className={`p-5 text-center rounded-xl border border-transparent transition-all hover:scale-[1.02] ${s.color} ${severity === s.filter ? 'ring-2 ring-primary' : ''}`}
            >
              <AlertTriangle className="mx-auto mb-2" size={24} />
              <p className="text-2xl font-bold">{s.count}</p>
              <p className="text-sm font-medium">{s.label}</p>
            </button>
          ))}
        </div>

        <AnimatePresence mode="popLayout">
          <div className="space-y-3">
            {filtered.map((risk, i) => (
              <motion.div
                key={`${risk.company}-${risk.flag}`}
                layout
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                transition={{ delay: i * 0.03 }}
                className={`border-l-4 rounded-xl p-5 ${severityStyles[risk.severity]}`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <Badge variant={risk.severity === 'high' ? 'danger' : risk.severity === 'medium' ? 'warning' : 'default'}>
                        {risk.severity.toUpperCase()}
                      </Badge>
                      <span className="font-semibold text-sm">{risk.company}</span>
                    </div>
                    <p className="font-medium">{risk.flag}</p>
                    <p className="text-sm text-text-secondary mt-1 flex items-center gap-1">
                      <Shield size={14} /> {risk.action}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-text-secondary">Probability</p>
                    <div className="flex items-center gap-2 justify-end">
                      <div className="w-20 h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full ${risk.severity === 'high' ? 'bg-red-500' : risk.severity === 'medium' ? 'bg-amber-500' : 'bg-blue-500'}`}
                          style={{ width: `${risk.probability}%` }}
                        />
                      </div>
                      <p className="text-lg font-bold w-10">{risk.probability}%</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </AnimatePresence>
      </div>
    </PageTransition>
  )
}
