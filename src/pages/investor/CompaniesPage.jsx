import { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { X } from 'lucide-react'
import { PageTransition } from '../../components/ui/Animated'
import { Card, Badge, DataTable } from '../../components/ui/Shared'
import { PORTFOLIO_COMPANIES } from '../../data/demoData'
import { formatINR, formatPercent } from '../../utils/format'
import { filterCompanies } from '../../utils/portfolioAnalytics'

const statusFilters = [
  { id: 'all', label: 'All' },
  { id: 'healthy', label: 'Healthy' },
  { id: 'watch', label: 'Watch' },
  { id: 'high risk', label: 'High Risk' },
]

const sectors = ['all', ...new Set(PORTFOLIO_COMPANIES.map((c) => c.sector))]

export default function CompaniesPage() {
  const navigate = useNavigate()
  const [filter, setFilter] = useState('all')
  const [sector, setSector] = useState('all')
  const [search, setSearch] = useState('')
  const [sortKey, setSortKey] = useState('health')
  const [page, setPage] = useState(0)
  const perPage = 8

  const hasFilters = filter !== 'all' || sector !== 'all' || search

  const data = useMemo(() => {
    return filterCompanies(PORTFOLIO_COMPANIES, { search, sector, status: filter })
      .sort((a, b) => b[sortKey] - a[sortKey])
  }, [filter, sector, search, sortKey])

  const paged = data.slice(page * perPage, (page + 1) * perPage)
  const totalPages = Math.max(1, Math.ceil(data.length / perPage))

  const columns = [
    { key: 'name', label: 'Company', render: (r) => (
      <div>
        <p className="font-medium">{r.name}</p>
        <p className="text-xs text-text-secondary">{r.sector} · {r.stage}</p>
      </div>
    )},
    { key: 'mrr', label: 'MRR', render: (r) => formatINR(r.mrr) },
    { key: 'arr', label: 'ARR', render: (r) => formatINR(r.arr) },
    { key: 'cac', label: 'CAC', render: (r) => formatINR(r.cac) },
    { key: 'growth', label: 'Growth', render: (r) => (
      <span className={r.growth >= 0 ? 'text-primary' : 'text-red-500'}>{formatPercent(r.growth)}</span>
    )},
    { key: 'burn', label: 'Burn', render: (r) => formatINR(r.monthlyBurn) },
    { key: 'runway', label: 'Runway', render: (r) => `${r.runway} mo` },
    { key: 'health', label: 'Health', render: (r) => <span className="font-semibold text-primary">{r.health}</span> },
    { key: 'status', label: 'Status', render: (r) => <Badge variant={r.status.toLowerCase()}>{r.status}</Badge> },
  ]

  return (
    <PageTransition>
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold">Portfolio Companies</h2>
          <p className="text-text-secondary mt-1">
            Full company directory with financial metrics · {data.length} companies
          </p>
        </div>

        <Card className="p-4" hover={false}>
          <div className="flex flex-col lg:flex-row gap-3">
            <input
              placeholder="Search by company name..."
              value={search}
              onChange={(e) => { setSearch(e.target.value); setPage(0) }}
              className="flex-1 px-4 py-2 rounded-lg border border-border text-sm focus:ring-2 focus:ring-primary/30 focus:outline-none"
            />
            <div className="flex flex-wrap items-center gap-2">
              {statusFilters.map((f) => (
                <button
                  key={f.id}
                  type="button"
                  onClick={() => { setFilter(f.id); setPage(0) }}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium ${
                    filter === f.id ? 'bg-primary text-white' : 'bg-gray-50 text-text-secondary hover:bg-primary-light'
                  }`}
                >
                  {f.label}
                </button>
              ))}
              <select value={sector} onChange={(e) => { setSector(e.target.value); setPage(0) }} className="px-3 py-1.5 rounded-lg border border-border text-sm">
                {sectors.map((s) => (
                  <option key={s} value={s}>{s === 'all' ? 'All Sectors' : s}</option>
                ))}
              </select>
              <select value={sortKey} onChange={(e) => setSortKey(e.target.value)} className="px-3 py-1.5 rounded-lg border border-border text-sm">
                <option value="health">Sort: Health</option>
                <option value="mrr">Sort: MRR</option>
                <option value="arr">Sort: ARR</option>
                <option value="cac">Sort: CAC</option>
                <option value="growth">Sort: Growth</option>
                <option value="runway">Sort: Runway</option>
                <option value="monthlyBurn">Sort: Burn</option>
              </select>
              {hasFilters && (
                <button type="button" onClick={() => { setFilter('all'); setSector('all'); setSearch(''); setPage(0) }} className="p-1.5 text-text-secondary hover:text-red-500">
                  <X size={16} />
                </button>
              )}
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <DataTable columns={columns} data={paged} onRowClick={(row) => navigate(`/investor/companies/${row.id}`)} />
          <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
            <p className="text-sm text-text-secondary">
              {data.length === 0 ? 'No results' : `${page * perPage + 1}–${Math.min((page + 1) * perPage, data.length)} of ${data.length}`}
            </p>
            <div className="flex gap-2">
              <button type="button" disabled={page === 0} onClick={() => setPage(page - 1)} className="px-3 py-1.5 text-sm rounded-lg border border-border disabled:opacity-40 hover:bg-gray-50">Prev</button>
              <button type="button" disabled={page >= totalPages - 1} onClick={() => setPage(page + 1)} className="px-3 py-1.5 text-sm rounded-lg border border-border disabled:opacity-40 hover:bg-gray-50">Next</button>
            </div>
          </div>
        </Card>
      </div>
    </PageTransition>
  )
}
