import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { PageTransition } from '../../components/ui/Animated'
import { Card, KPICard, Badge, TabGroup } from '../../components/ui/Shared'
import { ChartPanel } from '../../components/ui/ChartPanel'
import { PORTFOLIO_COMPANIES } from '../../data/demoData'
import { formatINR, formatPercent, filterByMonths } from '../../utils/format'
import {
  RevenueTrendChart, EBITDATrendChart, CashFlowTrendChart,
  MRRTrendChart, MetricComparisonChart,
} from '../../charts/ChartComponents'

const timeFilters = [
  { id: '6', label: '6M' },
  { id: '12', label: '12M' },
  { id: 'all', label: 'All' },
]

const chartTabs = [
  { id: 'revenue', label: 'Revenue' },
  { id: 'mrr', label: 'MRR' },
  { id: 'cash', label: 'Cash & Burn' },
  { id: 'multi', label: 'Combined' },
]

export default function CompanyDetail() {
  const { id } = useParams()
  const [timeFilter, setTimeFilter] = useState('12')
  const [chartTab, setChartTab] = useState('revenue')
  const company = PORTFOLIO_COMPANIES.find((c) => c.id === id)

  if (!company) {
    return <div className="text-center py-20"><p>Company not found</p><Link to="/investor/companies" className="text-primary">Back</Link></div>
  }

  const chartData = filterByMonths(company.history, timeFilter === 'all' ? null : timeFilter)

  const commentary = company.growth > 15
    ? `${company.name} shows strong momentum with ${company.growth}% revenue growth. Burn efficiency improving. Runway at ${company.runway} months is ${company.runway > 10 ? 'healthy' : 'concerning'}.`
    : `${company.name} requires monitoring with ${company.growth}% growth. Focus on runway extension and cost optimization.`

  return (
    <PageTransition>
      <div className="space-y-6">
        <Link to="/investor/companies" className="inline-flex items-center gap-2 text-text-secondary hover:text-primary text-sm">
          <ArrowLeft size={16} /> Back to Companies
        </Link>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold">{company.name}</h2>
            <p className="text-text-secondary">{company.sector} · {company.stage || 'Series A'}</p>
          </div>
          <Badge variant={company.status.toLowerCase()}>{company.status}</Badge>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7 gap-4">
          <KPICard title="MRR" value={formatINR(company.mrr)} subtitle={`${formatPercent(company.mrrGrowth)} MoM`} trend={company.mrrGrowth >= 0 ? 'up' : 'down'} />
          <KPICard title="ARR" value={formatINR(company.arr)} />
          <KPICard title="CAC" value={formatINR(company.cac)} />
          <KPICard title="Revenue" value={formatINR(company.monthlyRevenue)} />
          <KPICard title="Growth" value={formatPercent(company.growth)} trend={company.growth >= 0 ? 'up' : 'down'} />
          <KPICard title="Cash Position" value={formatINR(company.cashPosition)} />
          <KPICard title="Health Score" value={`${company.health}/100`} />
        </div>

        <Card className="p-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <h3 className="font-semibold">Performance Charts</h3>
            <div className="flex flex-wrap gap-2">
              <TabGroup tabs={chartTabs} active={chartTab} onChange={setChartTab} />
              <TabGroup tabs={timeFilters} active={timeFilter} onChange={setTimeFilter} />
            </div>
          </div>
          <ChartPanel chartKey={`${chartTab}-${timeFilter}-${company.id}`}>
            {chartTab === 'revenue' && (
              <div className="grid lg:grid-cols-2 gap-8">
                <div><p className="text-sm text-text-secondary mb-3">Revenue Trend</p><RevenueTrendChart data={chartData} /></div>
                <div><p className="text-sm text-text-secondary mb-3">EBITDA Trend</p><EBITDATrendChart data={chartData} /></div>
              </div>
            )}
            {chartTab === 'mrr' && <MRRTrendChart data={chartData} />}
            {chartTab === 'cash' && <CashFlowTrendChart data={chartData} />}
            {chartTab === 'multi' && <MetricComparisonChart data={chartData} metrics={['mrr', 'ebitda', 'burn']} />}
          </ChartPanel>
        </Card>

        <div className="grid lg:grid-cols-2 gap-6">
          <Card className="p-6 space-y-4">
            <h3 className="font-semibold">Investor Commentary</h3>
            <p className="text-sm text-text-secondary leading-relaxed">{commentary}</p>
            <div className="border-t pt-4">
              <h4 className="font-semibold text-sm mb-2">Funding Requirement Forecast</h4>
              <p className="text-sm text-text-secondary">
                {company.runway < 8
                  ? `Bridge round of ${formatINR(company.monthlyBurn * 12)} recommended within 3 months.`
                  : `No immediate funding required. Next round projected in ${company.runway - 4} months.`}
              </p>
            </div>
          </Card>
          <Card className="p-6">
            <h4 className="font-semibold text-sm mb-3">Valuation Readiness</h4>
            <div className="w-full bg-gray-100 rounded-full h-4 mb-2">
              <div className="bg-primary h-4 rounded-full transition-all duration-700" style={{ width: `${company.valuationReadiness}%` }} />
            </div>
            <p className="text-2xl font-bold text-primary">{company.valuationReadiness.toFixed(0)}%</p>
            <p className="text-xs text-text-secondary mt-1">Based on growth, runway, and unit economics</p>
            <div className="grid grid-cols-3 gap-3 mt-6 text-center">
              <div className="p-3 rounded-lg bg-primary-light/50">
                <p className="text-xs text-text-secondary">LTV:CAC</p>
                <p className="font-bold text-primary">{(company.cac > 0 ? (company.mrr / company.cac) * 12 : 0).toFixed(1)}x</p>
              </div>
              <div className="p-3 rounded-lg bg-primary-light/50">
                <p className="text-xs text-text-secondary">Burn Multiple</p>
                <p className="font-bold">{(company.monthlyBurn / (company.mrr || 1)).toFixed(1)}x</p>
              </div>
              <div className="p-3 rounded-lg bg-primary-light/50">
                <p className="text-xs text-text-secondary">Runway</p>
                <p className="font-bold">{company.runway} mo</p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </PageTransition>
  )
}
