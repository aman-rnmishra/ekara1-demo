import { CHART_COLORS } from './constants'

export function aggregateBySector(companies) {
  const map = {}
  companies.forEach((c) => {
    if (!map[c.sector]) map[c.sector] = { sector: c.sector, arr: 0, mrr: 0, count: 0 }
    map[c.sector].arr += c.arr
    map[c.sector].mrr += c.mrr
    map[c.sector].count += 1
  })
  return Object.values(map).sort((a, b) => b.arr - a.arr)
}

export function healthDistribution(companies) {
  const buckets = [
    { range: '80–100', min: 80, max: 100, count: 0, color: CHART_COLORS.primary },
    { range: '60–79', min: 60, max: 79, count: 0, color: CHART_COLORS.warning },
    { range: '40–59', min: 40, max: 59, count: 0, color: '#FB923C' },
    { range: '< 40', min: 0, max: 39, count: 0, color: CHART_COLORS.danger },
  ]
  companies.forEach((c) => {
    const b = buckets.find((bucket) => c.health >= bucket.min && c.health <= bucket.max)
    if (b) b.count += 1
  })
  return buckets
}

export function statusBreakdown(companies) {
  const counts = { Healthy: 0, Watch: 0, 'High Risk': 0 }
  companies.forEach((c) => { counts[c.status] = (counts[c.status] || 0) + 1 })
  return [
    { name: 'Healthy', value: counts.Healthy, fill: CHART_COLORS.primary },
    { name: 'Watch', value: counts.Watch, fill: CHART_COLORS.warning },
    { name: 'High Risk', value: counts['High Risk'], fill: CHART_COLORS.danger },
  ]
}

export function scatterData(companies) {
  return companies.map((c) => ({
    id: c.id,
    name: c.name,
    growth: c.growth,
    runway: c.runway,
    mrr: c.mrr,
    health: c.health,
  }))
}

export function buildCACLTVSeries(history, cac) {
  return history.slice(-12).map((row, i) => ({
    month: row.month,
    cac: Math.round(cac * (0.92 + i * 0.012)),
    ltv: Math.round(cac * (3.2 + i * 0.15)),
  }))
}

export function filterCompanies(companies, { search = '', sector = 'all', status = 'all', stage = 'all' }) {
  return companies.filter((c) => {
    if (search && !c.name.toLowerCase().includes(search.toLowerCase())) return false
    if (sector !== 'all' && c.sector !== sector) return false
    if (status !== 'all' && c.status.toLowerCase() !== status.toLowerCase()) return false
    if (stage !== 'all' && c.stage !== stage) return false
    return true
  })
}

export const SECTOR_OPTIONS = ['SaaS', 'FinTech', 'Cloud', 'HealthTech', 'EdTech', 'D2C', 'AgriTech', 'Logistics', 'AI/ML', 'CleanTech', 'FoodTech', 'CyberSec']
export const STAGE_OPTIONS = ['Seed', 'Series A', 'Series B', 'Series C']
