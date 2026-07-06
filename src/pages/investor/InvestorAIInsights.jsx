import { PageTransition } from '../../components/ui/Animated'
import { Card } from '../../components/ui/Shared'
import { AI_COMMENTARY_INVESTOR } from '../../data/demoData'
import { motion } from 'framer-motion'
import { TrendingUp, Minus, Eye } from 'lucide-react'

const sentimentConfig = {
  bullish: { icon: TrendingUp, color: 'border-l-primary bg-primary-light/50', badge: 'bg-primary/10 text-primary-dark', label: 'Bullish' },
  neutral: { icon: Minus, color: 'border-l-blue-500 bg-blue-50', badge: 'bg-blue-100 text-blue-700', label: 'Neutral' },
  watchlist: { icon: Eye, color: 'border-l-amber-500 bg-amber-50', badge: 'bg-amber-100 text-amber-700', label: 'Watchlist' },
}

export default function InvestorAIInsights() {
  return (
    <PageTransition>
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold">Expert Commentary</h2>
          <p className="text-text-secondary mt-1">Portfolio insights from Ekara financial experts</p>
        </div>

        <div className="grid gap-4">
          {AI_COMMENTARY_INVESTOR.map((item, i) => {
            const config = sentimentConfig[item.sentiment]
            const Icon = config.icon
            return (
              <motion.div
                key={item.company}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06 }}
              >
                <Card className={`p-5 border-l-4 ${config.color}`}>
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full flex items-center gap-1 ${config.badge}`}>
                      <Icon size={12} /> {config.label}
                    </span>
                    <span className="font-semibold text-sm">{item.company}</span>
                  </div>
                  <p className="text-sm text-text-secondary leading-relaxed">{item.text}</p>
                </Card>
              </motion.div>
            )
          })}
        </div>
      </div>
    </PageTransition>
  )
}
