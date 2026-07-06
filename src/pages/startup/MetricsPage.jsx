import { useState } from 'react'
import { PageTransition } from '../../components/ui/Animated'
import { Card, KPICard, TabGroup } from '../../components/ui/Shared'
import { ChartPanel } from '../../components/ui/ChartPanel'
import { STARTUP_KPIS, STARTUP_HISTORY, RECEIVABLES_DATA, generateRunwayForecast } from '../../data/demoData'
import { formatINR, formatPercent, filterByMonths } from '../../utils/format'
import { buildCACLTVSeries } from '../../utils/portfolioAnalytics'
import { RunwayForecastChart, AgingChart, MRRTrendChart, CACLTVChart, MetricComparisonChart } from '../../charts/ChartComponents'
import { Wallet, Flame, Clock, Timer, Repeat, Calendar, UserPlus } from 'lucide-react'

const scenarios = [
  { id: 'conservative', label: 'Conservative' },
  { id: 'expected', label: 'Expected' },
  { id: 'aggressive', label: 'Aggressive' },
]

const timeFilters = [
  { id: '6', label: '6M' },
  { id: '12', label: '12M' },
  { id: 'all', label: 'All' },
]

const saasViews = [
  { id: 'mrr', label: 'MRR Trend' },
  { id: 'cac', label: 'CAC / LTV' },
  { id: 'multi', label: 'Combined' },
]

export default function MetricsPage() {
  const [scenario, setScenario] = useState('expected')
  const [slider, setSlider] = useState(50)
  const [timeFilter, setTimeFilter] = useState('12')
  const [saasView, setSaasView] = useState('mrr')

  const burnAdj = STARTUP_KPIS.burnRate * (1 + (slider - 50) / 100)
  const forecast = generateRunwayForecast(scenario)
  const chartData = filterByMonths(STARTUP_HISTORY, timeFilter === 'all' ? null : timeFilter)
  const cacLtvData = buildCACLTVSeries(chartData, STARTUP_KPIS.cac)

  return (
    <PageTransition>
      <div className="space-y-8">
        <div>
          <h2 className="text-2xl font-bold">Metrics</h2>
          <p className="text-text-secondary mt-1">SaaS metrics, burn, runway, receivables & payables</p>
        </div>

        <div>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
            <h3 className="text-lg font-semibold">SaaS Metrics</h3>
            <div className="flex flex-wrap gap-2">
              <TabGroup tabs={saasViews} active={saasView} onChange={setSaasView} />
              <TabGroup tabs={timeFilters} active={timeFilter} onChange={setTimeFilter} />
            </div>
          </div>
          <div className="grid sm:grid-cols-3 gap-4 mb-6">
            <KPICard title="MRR" value={formatINR(STARTUP_KPIS.mrr)} subtitle={`${formatPercent(STARTUP_KPIS.mrrGrowth)} MoM`} icon={Repeat} trend="up" />
            <KPICard title="ARR" value={formatINR(STARTUP_KPIS.arr)} icon={Calendar} />
            <KPICard title="CAC" value={formatINR(STARTUP_KPIS.cac)} subtitle="Customer acquisition cost" icon={UserPlus} />
          </div>
          <Card className="p-6">
            <ChartPanel chartKey={`${saasView}-${timeFilter}`}>
              {saasView === 'mrr' && <MRRTrendChart data={chartData} />}
              {saasView === 'cac' && <CACLTVChart data={cacLtvData} />}
              {saasView === 'multi' && <MetricComparisonChart data={chartData} metrics={['mrr', 'ebitda', 'burn']} />}
            </ChartPanel>
          </Card>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">Burn & Runway Center</h3>
          <div className="grid sm:grid-cols-3 gap-4 mb-6">
            <KPICard title="Current Cash" value={formatINR(STARTUP_KPIS.cashPosition)} icon={Wallet} />
            <KPICard title="Monthly Burn" value={formatINR(burnAdj)} icon={Flame} />
            <KPICard title="Runway" value={`${Math.round(STARTUP_KPIS.cashPosition / burnAdj)} Months`} icon={Clock} />
          </div>

          <Card className="p-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
              <h4 className="font-semibold">18-Month Forecast</h4>
              <TabGroup tabs={scenarios} active={scenario} onChange={setScenario} />
            </div>
            <div className="mb-6">
              <label className="text-sm text-text-secondary flex items-center gap-2 mb-2">
                <Timer size={16} /> Burn Rate Adjustment: {formatINR(burnAdj)}/mo
              </label>
              <input type="range" min="0" max="100" value={slider} onChange={(e) => setSlider(+e.target.value)} className="w-full accent-primary" />
              <div className="flex justify-between text-xs text-text-secondary mt-1">
                <span>Lower burn</span>
                <span>Higher burn</span>
              </div>
            </div>
            <RunwayForecastChart data={forecast} />
          </Card>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">Receivables & Payables</h3>
          <div className="grid sm:grid-cols-3 gap-4 mb-6">
            <KPICard title="DSO" value={`${RECEIVABLES_DATA.dso} Days`} />
            <KPICard title="Outstanding Receivables" value={formatINR(RECEIVABLES_DATA.outstandingReceivables)} />
            <KPICard title="Outstanding Payables" value={formatINR(RECEIVABLES_DATA.outstandingPayables)} />
          </div>

          <Card className="p-6">
            <h4 className="font-semibold mb-4">Aging Buckets</h4>
            <AgingChart data={RECEIVABLES_DATA.aging} />
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-6">
              {RECEIVABLES_DATA.aging.map((bucket) => {
                const intensity = bucket.receivables / 1800000
                return (
                  <button
                    key={bucket.bucket}
                    type="button"
                    className="rounded-lg p-3 text-center text-white text-sm transition-transform hover:scale-105"
                    style={{ backgroundColor: `rgba(63, 163, 77, ${0.3 + intensity * 0.7})` }}
                  >
                    <p className="font-bold">{bucket.bucket} days</p>
                    <p className="text-xs mt-1 opacity-90">Recv: {formatINR(bucket.receivables)}</p>
                    <p className="text-xs opacity-75">Pay: {formatINR(bucket.payables)}</p>
                  </button>
                )
              })}
            </div>
          </Card>
        </div>
      </div>
    </PageTransition>
  )
}
