import { useState, useMemo } from 'react'
import { TrendingUp, Flame, Clock, Wallet, Heart, IndianRupee, Repeat, Calendar, UserPlus } from 'lucide-react'
import { PageTransition } from '../../components/ui/Animated'
import { KPICard, Card, TabGroup, InsightCard } from '../../components/ui/Shared'
import { FilterChips } from '../../components/ui/FilterChips'
import { ChartPanel } from '../../components/ui/ChartPanel'
import { STARTUP_KPIS, STARTUP_HISTORY, HEALTH_BREAKDOWN, AI_INSIGHTS_STARTUP, STARTUP_COMPANY } from '../../data/demoData'
import { formatINR, formatPercent, filterByMonths } from '../../utils/format'
import { buildCACLTVSeries } from '../../utils/portfolioAnalytics'
import {
  RevenueTrendChart, RevenueVsExpensesChart, EBITDATrendChart,
  CashFlowTrendChart, HealthRadialChart, HealthBreakdownChart,
  MRRTrendChart, CACLTVChart, MetricComparisonChart,
} from '../../charts/ChartComponents'

const timeFilters = [
  { id: '3', label: '3M' },
  { id: '6', label: '6M' },
  { id: '12', label: '12M' },
  { id: 'all', label: 'All' },
]

const chartViews = [
  { id: 'revenue', label: 'Revenue' },
  { id: 'mrr', label: 'MRR' },
  { id: 'comparison', label: 'Multi-Metric' },
  { id: 'cashflow', label: 'Cash Flow' },
]

const severityFilters = [
  { id: 'all', label: 'All' },
  { id: 'positive', label: 'Positive' },
  { id: 'warning', label: 'Warning' },
  { id: 'critical', label: 'Critical' },
]

const metricToggles = [
  { id: 'mrr', label: 'MRR' },
  { id: 'ebitda', label: 'EBITDA' },
  { id: 'burn', label: 'Burn' },
]

export default function StartupDashboard() {
  const [filter, setFilter] = useState('12')
  const [chartView, setChartView] = useState('revenue')
  const [severity, setSeverity] = useState('all')
  const [metrics, setMetrics] = useState(['mrr', 'ebitda'])
  const [expandedInsight, setExpandedInsight] = useState(null)

  const chartData = filterByMonths(STARTUP_HISTORY, filter === 'all' ? null : filter)
  const cacLtvData = useMemo(() => buildCACLTVSeries(chartData, STARTUP_KPIS.cac), [chartData])

  const insights = useMemo(() => {
    if (severity === 'all') return AI_INSIGHTS_STARTUP
    return AI_INSIGHTS_STARTUP.filter((i) => i.severity === severity)
  }, [severity])

  const toggleMetric = (id) => {
    setMetrics((prev) => prev.includes(id) ? prev.filter((m) => m !== id) : [...prev, id])
  }

  return (
    <PageTransition>
      <div className="space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-text-primary">Dashboard Overview</h2>
            <p className="text-text-secondary mt-1">{STARTUP_COMPANY.name} — Financial snapshot</p>
          </div>
          <TabGroup tabs={timeFilters} active={filter} onChange={setFilter} />
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          <KPICard compact title="Revenue" value={formatINR(STARTUP_KPIS.revenue)} icon={IndianRupee} delay={0} />
          <KPICard compact title="MRR" value={formatINR(STARTUP_KPIS.mrr)} subtitle={`${formatPercent(STARTUP_KPIS.mrrGrowth)} MoM`} icon={Repeat} delay={0.04} trend="up" />
          <KPICard compact title="ARR" value={formatINR(STARTUP_KPIS.arr)} icon={Calendar} delay={0.08} />
          <KPICard compact title="CAC" value={formatINR(STARTUP_KPIS.cac)} icon={UserPlus} delay={0.12} />
          <KPICard compact title="Growth" value={formatPercent(STARTUP_KPIS.revenueGrowth)} subtitle="MoM" icon={TrendingUp} delay={0.16} trend="up" />
          <KPICard compact title="Burn Rate" value={`${formatINR(STARTUP_KPIS.burnRate)}/mo`} icon={Flame} delay={0.2} />
          <KPICard compact title="Runway" value={`${STARTUP_KPIS.runway} Months`} icon={Clock} delay={0.24} />
          <KPICard compact title="Cash Position" value={formatINR(STARTUP_KPIS.cashPosition)} icon={Wallet} delay={0.28} />
          <KPICard compact title="Health Score" value={`${STARTUP_KPIS.healthScore}/100`} icon={Heart} delay={0.32} trend="up" />
        </div>

        <Card className="p-6">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
            <h3 className="text-lg font-semibold">Financial Analytics</h3>
            <TabGroup tabs={chartViews} active={chartView} onChange={setChartView} />
          </div>

          <ChartPanel chartKey={`${chartView}-${filter}`}>
            {chartView === 'revenue' && (
              <div className="grid lg:grid-cols-2 gap-8">
                <div>
                  <p className="text-sm font-medium text-text-secondary mb-3">Monthly Revenue Trend</p>
                  <RevenueTrendChart data={chartData} />
                </div>
                <div>
                  <p className="text-sm font-medium text-text-secondary mb-3">Revenue vs Expenses</p>
                  <RevenueVsExpensesChart data={chartData} />
                </div>
                <div>
                  <p className="text-sm font-medium text-text-secondary mb-3">EBITDA Trend</p>
                  <EBITDATrendChart data={chartData} />
                </div>
                <div>
                  <p className="text-sm font-medium text-text-secondary mb-3">CAC vs Est. LTV</p>
                  <CACLTVChart data={cacLtvData} />
                </div>
              </div>
            )}
            {chartView === 'mrr' && (
              <div className="grid lg:grid-cols-2 gap-8">
                <div>
                  <p className="text-sm font-medium text-text-secondary mb-3">MRR vs Total Revenue</p>
                  <MRRTrendChart data={chartData} />
                </div>
                <div>
                  <p className="text-sm font-medium text-text-secondary mb-3">MRR Growth Trajectory</p>
                  <RevenueTrendChart data={chartData.map((d) => ({ ...d, revenue: d.mrr }))} />
                </div>
              </div>
            )}
            {chartView === 'comparison' && (
              <div>
                <div className="flex flex-wrap gap-2 mb-4">
                  {metricToggles.map((m) => (
                    <button
                      key={m.id}
                      type="button"
                      onClick={() => toggleMetric(m.id)}
                      className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                        metrics.includes(m.id) ? 'bg-primary text-white' : 'bg-gray-100 text-text-secondary'
                      }`}
                    >
                      {m.label}
                    </button>
                  ))}
                </div>
                <MetricComparisonChart data={chartData} metrics={metrics.length ? metrics : ['mrr']} />
              </div>
            )}
            {chartView === 'cashflow' && (
              <div className="grid lg:grid-cols-2 gap-8">
                <div>
                  <p className="text-sm font-medium text-text-secondary mb-3">Cash Position & Burn</p>
                  <CashFlowTrendChart data={chartData} />
                </div>
                <div>
                  <p className="text-sm font-medium text-text-secondary mb-3">EBITDA Trend</p>
                  <EBITDATrendChart data={chartData} />
                </div>
              </div>
            )}
          </ChartPanel>
        </Card>

        <div className="grid lg:grid-cols-3 gap-6">
          <Card className="p-6 lg:col-span-2">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
              <h3 className="text-lg font-semibold">Expert Insights</h3>
              <FilterChips options={severityFilters} value={severity} onChange={setSeverity} />
            </div>
            <div className="space-y-3">
              {insights.length === 0 ? (
                <p className="text-sm text-text-secondary py-8 text-center">No insights for this filter.</p>
              ) : insights.slice(0, 5).map((insight) => (
                <InsightCard
                  key={insight.id}
                  {...insight}
                  expanded={expandedInsight === insight.id}
                  onToggle={() => setExpandedInsight(expandedInsight === insight.id ? null : insight.id)}
                />
              ))}
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-2">Financial Health</h3>
            <HealthRadialChart score={STARTUP_KPIS.healthScore} />
            <HealthBreakdownChart data={HEALTH_BREAKDOWN} />
            <div className="space-y-2 mt-4">
              {HEALTH_BREAKDOWN.map((item) => (
                <div key={item.label} className="flex justify-between text-sm items-center">
                  <span className="text-text-secondary">{item.label}</span>
                  <div className="flex items-center gap-2">
                    <div className="w-16 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full bg-primary rounded-full transition-all" style={{ width: `${item.value}%` }} />
                    </div>
                    <span className="font-semibold text-primary w-6 text-right">{item.value}</span>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </PageTransition>
  )
}
