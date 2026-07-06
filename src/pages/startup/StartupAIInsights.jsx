import { useState } from 'react'
import { PageTransition } from '../../components/ui/Animated'
import { InsightCard } from '../../components/ui/Shared'
import { AI_INSIGHTS_STARTUP } from '../../data/demoData'

export default function StartupAIInsights() {
  const [expanded, setExpanded] = useState(null)

  return (
    <PageTransition>
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold">Expert Insights</h2>
          <p className="text-text-secondary mt-1">Expert-led financial intelligence from the Ekara team</p>
        </div>
        <div className="grid gap-4">
          {AI_INSIGHTS_STARTUP.map((insight) => (
            <InsightCard
              key={insight.id}
              {...insight}
              expanded={expanded === insight.id}
              onToggle={() => setExpanded(expanded === insight.id ? null : insight.id)}
            />
          ))}
        </div>
      </div>
    </PageTransition>
  )
}
