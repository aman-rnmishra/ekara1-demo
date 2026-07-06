import { useState, useMemo } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { TrendingUp, Briefcase, Heart, Clock, Building2, Repeat, Calendar, UserPlus, SlidersHorizontal, X, ArrowRight, AlertTriangle, Trophy, BadgePercent, DollarSign, Target } from 'lucide-react'
import { motion } from 'framer-motion'
import { PageTransition } from '../../components/ui/Animated'
import { KPICard, Card, Badge, TabGroup } from '../../components/ui/Shared'
import { ChartPanel } from '../../components/ui/ChartPanel'
import { INVESTOR_KPIS, PORTFOLIO_COMPANIES } from '../../data/demoData'
import { PORTFOLIO_TAX_KPIS, formatUSD } from '../../data/taxCreditsData'
import { formatINR, formatPercent } from '../../utils/format'
import {
  aggregateBySector, healthDistribution, statusBreakdown, scatterData, filterCompanies,
} from '../../utils/portfolioAnalytics'
import {
  SectorBreakdownChart, HealthDistributionChart, PortfolioScatterChart, StatusDonutChart,
} from '../../charts/ChartComponents'

const statusFilters = [
  { id: 'all', label: 'All' },
  { id: 'healthy', label: 'Healthy' },
  { id: 'watch', label: 'Watch' },
  { id: 'high risk', label: 'High Risk' },
]

const vizTabs = [
  { id: 'sector', label: 'Sector ARR' },
  { id: 'health', label: 'Health' },
  { id: 'scatter', label: 'Growth vs Runway' },
  { id: 'status', label: 'Status' },
]

const sectors = ['all', ...new Set(PORTFOLIO_COMPANIES.map((c) => c.sector))]

function CompanySnapshot({ company, onClick }) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileHover={{ y: -2 }}
      className="w-full text-left p-4 rounded-xl border border-border bg-bg hover:border-primary/30 hover:shadow-sm transition-all"
    >
      <div className="flex items-start justify-between gap-2 mb-2">
        <div className="min-w-0">
          <p className="font-semibold text-sm truncate">{company.name}</p>
          <p className="text-xs text-text-secondary">{company.sector}</p>
        </div>
        <Badge variant={company.status.toLowerCase()}>{company.status}</Badge>
      </div>
      <div className="grid grid-cols-3 gap-2 text-xs">
        <div>
          <p className="text-text-secondary">MRR</p>
          <p className="font-semibold">{formatINR(company.mrr)}</p>
        </div>
        <div>
          <p className="text-text-secondary">Growth</p>
          <p className={`font-semibold ${company.growth >= 0 ? 'text-primary' : 'text-red-500'}`}>{formatPercent(company.growth)}</p>
        </div>
        <div>
          <p className="text-text-secondary">Health</p>
          <p className="font-semibold text-primary">{company.health}</p>
        </div>
      </div>
    </motion.button>
  )
}

export default function InvestorDashboard() {
  const navigate = useNavigate()
  const [sector, setSector] = useState('all')
  const [status, setStatus] = useState('all')
  const [vizView, setVizView] = useState('sector')

  const hasFilters = status !== 'all' || sector !== 'all'

  const filtered = useMemo(() => {
    return filterCompanies(PORTFOLIO_COMPANIES, { sector, status })
  }, [sector, status])

  const filteredKpis = useMemo(() => {
    if (filtered.length === 0) return { ...INVESTOR_KPIS, activeInvestments: 0 }
    return {
      ...INVESTOR_KPIS,
      totalARR: filtered.reduce((s, c) => s + c.arr, 0),
      avgMRR: Math.round(filtered.reduce((s, c) => s + c.mrr, 0) / filtered.length),
      avgCAC: Math.round(filtered.reduce((s, c) => s + c.cac, 0) / filtered.length),
      avgGrowth: Math.round(filtered.reduce((s, c) => s + c.growth, 0) / filtered.length),
      avgRunway: Math.round(filtered.reduce((s, c) => s + c.runway, 0) / filtered.length),
      portfolioHealth: Math.round(filtered.reduce((s, c) => s + c.health, 0) / filtered.length),
      activeInvestments: filtered.length,
    }
  }, [filtered])

  const topPerformers = useMemo(() =>
    [...filtered].sort((a, b) => b.health - a.health || b.growth - a.growth).slice(0, 3),
  [filtered])

  const needsAttention = useMemo(() =>
    filtered.filter((c) => c.status !== 'Healthy').sort((a, b) => a.health - b.health).slice(0, 3),
  [filtered])

  const clearFilters = () => {
    setStatus('all')
    setSector('all')
  }

  return (
    <PageTransition>
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold">Portfolio Overview</h2>
          <p className="text-text-secondary mt-1">
            Ekara Capital Partners · {filtered.length} companies
            {hasFilters && <span className="text-primary"> (filtered)</span>}
          </p>
        </div>

        <Card className="p-4" hover={false}>
          <div className="flex flex-col lg:flex-row lg:items-center gap-4">
            <div className="flex items-center gap-2 text-sm font-medium text-text-secondary shrink-0">
              <SlidersHorizontal size={16} />
              Filters
            </div>
            <div className="flex flex-wrap gap-1.5">
              {statusFilters.map((f) => (
                <button
                  key={f.id}
                  type="button"
                  onClick={() => setStatus(f.id)}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                    status === f.id ? 'bg-primary text-white' : 'bg-gray-50 text-text-secondary hover:bg-primary-light'
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
            <select
              value={sector}
              onChange={(e) => setSector(e.target.value)}
              className="px-3 py-1.5 rounded-lg border border-border text-sm bg-white min-w-[140px]"
            >
              {sectors.map((s) => (
                <option key={s} value={s}>{s === 'all' ? 'All Sectors' : s}</option>
              ))}
            </select>
            {hasFilters && (
              <button type="button" onClick={clearFilters} className="inline-flex items-center gap-1.5 text-sm text-text-secondary hover:text-red-600">
                <X size={14} /> Clear
              </button>
            )}
          </div>
        </Card>

        <div className="space-y-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <KPICard compact title="Portfolio Value" value={formatINR(INVESTOR_KPIS.portfolioValue)} icon={Briefcase} delay={0} />
            <KPICard compact title="Total ARR" value={formatINR(filteredKpis.totalARR)} icon={Calendar} delay={0.05} subtitle={hasFilters ? 'Filtered' : undefined} />
            <KPICard compact title="Avg MRR" value={formatINR(filteredKpis.avgMRR)} icon={Repeat} delay={0.1} />
            <KPICard compact title="Companies" value={filteredKpis.activeInvestments} icon={Building2} delay={0.15} />
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <KPICard compact title="Avg Growth" value={formatPercent(filteredKpis.avgGrowth)} icon={TrendingUp} delay={0.2} trend="up" />
            <KPICard compact title="Avg Runway" value={`${filteredKpis.avgRunway} mo`} icon={Clock} delay={0.25} />
            <KPICard compact title="Portfolio Health" value={`${filteredKpis.portfolioHealth}/100`} icon={Heart} delay={0.3} />
            <KPICard compact title="Avg CAC" value={formatINR(filteredKpis.avgCAC)} icon={UserPlus} delay={0.35} />
          </div>
        </div>

        <Card className="p-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <h3 className="text-lg font-semibold">Portfolio Visualizations</h3>
            <TabGroup tabs={vizTabs} active={vizView} onChange={setVizView} />
          </div>
          <ChartPanel chartKey={`${vizView}-${sector}-${status}`}>
            {vizView === 'sector' && <SectorBreakdownChart data={aggregateBySector(filtered)} />}
            {vizView === 'health' && <HealthDistributionChart data={healthDistribution(filtered)} />}
            {vizView === 'scatter' && (
              <div>
                <p className="text-xs text-text-secondary mb-3">Click a bubble to view company details.</p>
                <PortfolioScatterChart
                  data={scatterData(filtered)}
                  onClick={(pt) => {
                    const id = pt?.id ?? pt?.payload?.id
                    if (id) navigate(`/investor/companies/${id}`)
                  }}
                />
              </div>
            )}
            {vizView === 'status' && <StatusDonutChart data={statusBreakdown(filtered)} />}
          </ChartPanel>
        </Card>

        <Card className="p-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-2">
              <BadgePercent size={18} className="text-primary" />
              <div>
                <h3 className="text-lg font-semibold">Tax Efficiency</h3>
                <p className="text-sm text-text-secondary">Portfolio tax credits & unclaimed incentives</p>
              </div>
            </div>
            <Link to="/investor/tax-credits" className="text-sm font-semibold text-primary hover:underline inline-flex items-center gap-1">
              View Full Dashboard <ArrowRight size={14} />
            </Link>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <KPICard compact title="Credits Claimed" value={formatUSD(PORTFOLIO_TAX_KPIS.totalClaimed)} icon={DollarSign} delay={0} />
            <KPICard compact title="Unclaimed" value={formatUSD(PORTFOLIO_TAX_KPIS.unclaimedOpportunities)} icon={Target} delay={0.05} />
            <KPICard compact title="Efficiency Score" value={`${PORTFOLIO_TAX_KPIS.avgEfficiencyScore}/100`} icon={TrendingUp} delay={0.1} trend="up" />
            <KPICard compact title="Cash Impact" value={formatUSD(PORTFOLIO_TAX_KPIS.potentialCashImpact)} icon={Briefcase} delay={0.15} />
          </div>
        </Card>

        {/* Snapshot panels — not a duplicate of Companies tab */}
        <div className="grid lg:grid-cols-2 gap-6">
          <Card className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <Trophy size={18} className="text-primary" />
              <h3 className="font-semibold">Top Performers</h3>
            </div>
            <div className="space-y-3">
              {topPerformers.map((c) => (
                <CompanySnapshot key={c.id} company={c} onClick={() => navigate(`/investor/companies/${c.id}`)} />
              ))}
              {topPerformers.length === 0 && <p className="text-sm text-text-secondary text-center py-4">No companies match filters.</p>}
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <AlertTriangle size={18} className="text-amber-500" />
              <h3 className="font-semibold">Needs Attention</h3>
            </div>
            <div className="space-y-3">
              {needsAttention.length > 0 ? needsAttention.map((c) => (
                <CompanySnapshot key={c.id} company={c} onClick={() => navigate(`/investor/companies/${c.id}`)} />
              )) : (
                <p className="text-sm text-text-secondary text-center py-8">All portfolio companies are healthy.</p>
              )}
            </div>
          </Card>
        </div>

        <Link
          to="/investor/companies"
          className="flex items-center justify-center gap-2 w-full py-4 rounded-xl border-2 border-dashed border-primary/30 text-primary font-semibold hover:bg-primary-light/50 transition-colors"
        >
          View All Companies — Full MRR, ARR, CAC & Metrics
          <ArrowRight size={18} />
        </Link>
      </div>
    </PageTransition>
  )
}
