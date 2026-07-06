export function formatINR(value, { compact = true } = {}) {
  if (value == null || Number.isNaN(value)) return '₹ 0'
  const abs = Math.abs(value)
  const sign = value < 0 ? '-' : ''
  if (compact) {
    if (abs >= 1e7) return `${sign}₹ ${(abs / 1e7).toFixed(2)} Cr`
    if (abs >= 1e5) return `${sign}₹ ${(abs / 1e5).toFixed(2)} L`
    if (abs >= 1e3) return `${sign}₹ ${(abs / 1e3).toFixed(1)} K`
  }
  return `${sign}₹ ${abs.toLocaleString('en-IN', { maximumFractionDigits: 0 })}`
}

export function formatPercent(value, decimals = 0) {
  if (value == null) return '0%'
  const sign = value > 0 ? '+' : ''
  return `${sign}${value.toFixed(decimals)}%`
}

export function formatMonth(dateStr) {
  const d = new Date(dateStr)
  return d.toLocaleDateString('en-IN', { month: 'short', year: '2-digit' })
}

export function filterByMonths(data, months) {
  if (!months || months === 'all') return data
  const n = parseInt(months, 10)
  return data.slice(-n)
}
