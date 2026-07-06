import { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  DollarSign, TrendingUp, Target, Briefcase, Sparkles, Globe,
  SlidersHorizontal, X,
} from 'lucide-react'
import { PageTransition } from '../../components/ui/Animated'
import { Card, KPICard, Badge, DataTable, TabGroup } from '../../components/ui/Shared'
import {
  TAX_COUNTRIES, PORTFOLIO_TAX_KPIS, PORTFOLIO_TAX_OPPORTUNITIES,
  INVESTOR_TAX_COMMENTARY, GLOBAL_FUNDING_PROGRAMS, getCountryById, formatUSD,
} from '../../data/taxCreditsData'

const FUNDING_CATEGORIES = ['all', ...new Set(GLOBAL_FUNDING_PROGRAMS.map((p) => p.category))]

const insightStyles = {
  positive: 'border-l-primary bg-primary-light/50',
  warning: 'border-l-amber-500 bg-amber-50',
  neutral: 'border-l-blue-500 bg-blue-50',
}

const opportunityVariant = {
  High: 'success',
  Medium: 'warning',
  Low: 'default',
}

const statusVariant = {
  Claimed: 'success',
  'In Progress': 'default',
  Review: 'warning',
  'At Risk': 'danger',
}

export default function TaxEfficiency() {
  const navigate = useNavigate()
  const [country, setCountry] = useState('all')
  const [sector, setSector] = useState('all')
  const [stage, setStage] = useState('all')
  const [risk, setRisk] = useState('all')
  const [fundingCategory, setFundingCategory] = useState('all')

  const sectors = ['all', ...new Set(GLOBAL_FUNDING_PROGRAMS.map((p) => p.industry))]
  const stages = ['all', ...new Set(GLOBAL_FUNDING_PROGRAMS.map((p) => p.stage))]

  const filtered = useMemo(() => {
    return PORTFOLIO_TAX_OPPORTUNITIES.filter((row) => {
      if (country !== 'all' && row.country !== country) return false
      if (risk !== 'all' && row.opportunity.toLowerCase() !== risk) return false
      return true
    })
  }, [country, risk])

  const filteredFunding = useMemo(() => {
    return GLOBAL_FUNDING_PROGRAMS.filter((p) => {
      const matchCountry = country === 'all' || p.country === country
      const matchCat = fundingCategory === 'all' || p.category === fundingCategory
      const matchSector = sector === 'all' || p.industry === sector || p.industry === 'All'
      const matchStage = stage === 'all' || p.stage === stage || p.stage.includes(stage.replace('+', ''))
      return matchCountry && matchCat && matchSector && matchStage
    })
  }, [country, fundingCategory, sector, stage])

  const hasFilters = country !== 'all' || sector !== 'all' || stage !== 'all' || risk !== 'all'

  const columns = [
    { key: 'company', label: 'Company', render: (r) => <span className="font-medium">{r.company}</span> },
    { key: 'country', label: 'Country', render: (r) => {
      const c = getCountryById(r.country)
      return <span>{c.flag} {r.countryName}</span>
    }},
    { key: 'available', label: 'Available Credits', render: (r) => formatUSD(r.available) },
    { key: 'claimed', label: 'Claimed Credits', render: (r) => formatUSD(r.claimed) },
    { key: 'unclaimed', label: 'Unclaimed Credits', render: (r) => <span className="font-semibold text-amber-600">{formatUSD(r.unclaimed)}</span> },
    { key: 'eligibility', label: 'Eligibility Score', render: (r) => (
      <div className="flex items-center gap-2">
        <div className="w-16 bg-gray-100 rounded-full h-1.5">
          <div className="bg-primary h-1.5 rounded-full" style={{ width: `${r.eligibility}%` }} />
        </div>
        <span className="text-xs font-semibold">{r.eligibility}</span>
      </div>
    )},
    { key: 'opportunity', label: 'Opportunity', render: (r) => <Badge variant={opportunityVariant[r.opportunity]}>{r.opportunity}</Badge> },
    { key: 'status', label: 'Status', render: (r) => <Badge variant={statusVariant[r.status] || 'default'}>{r.status}</Badge> },
  ]

  return (
    <PageTransition>
      <div className="space-y-8">
        <div>
          <h2 className="text-2xl font-bold">Tax Credits & Incentives</h2>
          <p className="text-text-secondary mt-1">
            Portfolio tax efficiency, unclaimed opportunities & global funding intelligence
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <KPICard compact title="Total Tax Credits Claimed" value={formatUSD(PORTFOLIO_TAX_KPIS.totalClaimed)} icon={DollarSign} delay={0} />
          <KPICard compact title="Unclaimed Opportunities" value={formatUSD(PORTFOLIO_TAX_KPIS.unclaimedOpportunities)} icon={Target} delay={0.05} subtitle="Across portfolio" />
          <KPICard compact title="Avg Tax Efficiency Score" value={`${PORTFOLIO_TAX_KPIS.avgEfficiencyScore}/100`} icon={TrendingUp} delay={0.1} trend="up" />
          <KPICard compact title="Potential Cash Impact" value={formatUSD(PORTFOLIO_TAX_KPIS.potentialCashImpact)} icon={Briefcase} delay={0.15} />
        </div>

        <Card className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles size={18} className="text-primary" />
            <h3 className="text-lg font-semibold">AI Investor Commentary</h3>
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            {INVESTOR_TAX_COMMENTARY.map((c) => (
              <div key={c.id} className={`border-l-4 rounded-xl p-4 ${insightStyles[c.severity]}`}>
                <p className="text-sm leading-relaxed">{c.text}</p>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-4" hover={false}>
          <div className="flex flex-col lg:flex-row lg:items-center gap-4 flex-wrap">
            <div className="flex items-center gap-2 text-sm font-medium text-text-secondary shrink-0">
              <SlidersHorizontal size={16} />
              Filters
            </div>
            <select value={country} onChange={(e) => setCountry(e.target.value)} className="px-3 py-1.5 rounded-lg border border-border text-sm bg-white min-w-[140px]">
              {TAX_COUNTRIES.map((c) => (
                <option key={c.id} value={c.id}>{c.flag} {c.name}</option>
              ))}
            </select>
            <select value={sector} onChange={(e) => setSector(e.target.value)} className="px-3 py-1.5 rounded-lg border border-border text-sm bg-white min-w-[120px]">
              {sectors.map((s) => (
                <option key={s} value={s}>{s === 'all' ? 'All Sectors' : s}</option>
              ))}
            </select>
            <select value={stage} onChange={(e) => setStage(e.target.value)} className="px-3 py-1.5 rounded-lg border border-border text-sm bg-white min-w-[120px]">
              {stages.map((s) => (
                <option key={s} value={s}>{s === 'all' ? 'All Stages' : s}</option>
              ))}
            </select>
            <div className="flex gap-1.5">
              {['all', 'high', 'medium', 'low'].map((r) => (
                <button
                  key={r}
                  type="button"
                  onClick={() => setRisk(r)}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium capitalize transition-colors ${
                    risk === r ? 'bg-primary text-white' : 'bg-gray-50 text-text-secondary hover:bg-primary-light'
                  }`}
                >
                  {r === 'all' ? 'All Risk' : r}
                </button>
              ))}
            </div>
            {hasFilters && (
              <button type="button" onClick={() => { setCountry('all'); setSector('all'); setStage('all'); setRisk('all') }} className="inline-flex items-center gap-1.5 text-sm text-text-secondary hover:text-red-600">
                <X size={14} /> Clear
              </button>
            )}
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Portfolio Tax Opportunity Table</h3>
          <p className="text-sm text-text-secondary mb-4">{filtered.length} companies · Click a row to view company details</p>
          <DataTable
            columns={columns}
            data={filtered}
            onRowClick={(row) => navigate(`/investor/companies/${row.id}`)}
          />
        </Card>

        <Card className="p-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-2">
              <Globe size={18} className="text-primary" />
              <div>
                <h3 className="text-lg font-semibold">Global Funding Intelligence Center</h3>
                <p className="text-sm text-text-secondary">Tax credits, grants, innovation programs & subsidies</p>
              </div>
            </div>
            <div className="overflow-x-auto">
              <TabGroup tabs={FUNDING_CATEGORIES.map((c) => ({ id: c, label: c === 'all' ? 'All' : c }))} active={fundingCategory} onChange={setFundingCategory} />
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border text-left">
                  <th className="py-3 px-3 font-semibold text-text-secondary">Program</th>
                  <th className="py-3 px-3 font-semibold text-text-secondary">Country</th>
                  <th className="py-3 px-3 font-semibold text-text-secondary">Category</th>
                  <th className="py-3 px-3 font-semibold text-text-secondary">Industry</th>
                  <th className="py-3 px-3 font-semibold text-text-secondary">Stage</th>
                  <th className="py-3 px-3 font-semibold text-text-secondary">Funding Amount</th>
                  <th className="py-3 px-3 font-semibold text-text-secondary">Eligibility</th>
                  <th className="py-3 px-3 font-semibold text-text-secondary">Deadline</th>
                </tr>
              </thead>
              <tbody>
                {filteredFunding.map((p, i) => {
                  const c = getCountryById(p.country)
                  return (
                    <motion.tr
                      key={p.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: i * 0.02 }}
                      className="border-b border-border/50 hover:bg-primary-light/20"
                    >
                      <td className="py-3 px-3 font-medium">{p.name}</td>
                      <td className="py-3 px-3">{c.flag} {c.name}</td>
                      <td className="py-3 px-3"><Badge variant="default">{p.category}</Badge></td>
                      <td className="py-3 px-3 text-text-secondary">{p.industry}</td>
                      <td className="py-3 px-3 text-text-secondary">{p.stage}</td>
                      <td className="py-3 px-3 font-semibold text-primary">{p.amount}</td>
                      <td className="py-3 px-3 font-semibold text-primary">{p.eligibility}%</td>
                      <td className="py-3 px-3 text-text-secondary">{p.deadline}</td>
                    </motion.tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </PageTransition>
  )
}
