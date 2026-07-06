import {
  AreaChart, Area, BarChart, Bar, LineChart, Line, XAxis, YAxis,
  CartesianGrid, Tooltip, ResponsiveContainer, Legend, RadarChart,
  PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ScatterChart,
  Scatter, ZAxis, RadialBarChart, RadialBar, Cell, ComposedChart,
} from 'recharts'
import { formatINR, formatMonth } from '../utils/format'
import { CHART_COLORS } from '../utils/constants'

const tooltipStyle = {
  contentStyle: { borderRadius: 8, border: '1px solid #E5E7EB', fontSize: 12 },
  formatter: (v) => formatINR(v),
}

export function RevenueTrendChart({ data }) {
  return (
    <ResponsiveContainer width="100%" height={280}>
      <AreaChart data={data}>
        <defs>
          <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor={CHART_COLORS.revenue} stopOpacity={0.3} />
            <stop offset="95%" stopColor={CHART_COLORS.revenue} stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
        <XAxis dataKey="month" tickFormatter={formatMonth} tick={{ fontSize: 11 }} />
        <YAxis tickFormatter={(v) => formatINR(v)} tick={{ fontSize: 11 }} width={70} />
        <Tooltip {...tooltipStyle} labelFormatter={formatMonth} />
        <Area type="monotone" dataKey="revenue" stroke={CHART_COLORS.revenue} fill="url(#revGrad)" strokeWidth={2} />
      </AreaChart>
    </ResponsiveContainer>
  )
}

export function RevenueVsExpensesChart({ data }) {
  return (
    <ResponsiveContainer width="100%" height={280}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
        <XAxis dataKey="month" tickFormatter={formatMonth} tick={{ fontSize: 11 }} />
        <YAxis tickFormatter={(v) => formatINR(v)} tick={{ fontSize: 11 }} width={70} />
        <Tooltip {...tooltipStyle} labelFormatter={formatMonth} />
        <Legend />
        <Bar dataKey="revenue" fill={CHART_COLORS.revenue} radius={[4, 4, 0, 0]} name="Revenue" />
        <Bar dataKey="expenses" fill={CHART_COLORS.expense} radius={[4, 4, 0, 0]} name="Expenses" />
      </BarChart>
    </ResponsiveContainer>
  )
}

export function EBITDATrendChart({ data }) {
  return (
    <ResponsiveContainer width="100%" height={280}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
        <XAxis dataKey="month" tickFormatter={formatMonth} tick={{ fontSize: 11 }} />
        <YAxis tickFormatter={(v) => formatINR(v)} tick={{ fontSize: 11 }} width={70} />
        <Tooltip {...tooltipStyle} labelFormatter={formatMonth} />
        <Line type="monotone" dataKey="ebitda" stroke={CHART_COLORS.ebitda} strokeWidth={2} dot={false} />
      </LineChart>
    </ResponsiveContainer>
  )
}

export function CashFlowTrendChart({ data }) {
  return (
    <ResponsiveContainer width="100%" height={280}>
      <ComposedChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
        <XAxis dataKey="month" tickFormatter={formatMonth} tick={{ fontSize: 11 }} />
        <YAxis tickFormatter={(v) => formatINR(v)} tick={{ fontSize: 11 }} width={70} />
        <Tooltip {...tooltipStyle} labelFormatter={formatMonth} />
        <Area type="monotone" dataKey="cashBalance" fill={CHART_COLORS.cash} fillOpacity={0.15} stroke={CHART_COLORS.cash} strokeWidth={2} />
        <Bar dataKey="burnRate" fill={CHART_COLORS.expense} fillOpacity={0.6} name="Burn" radius={[2, 2, 0, 0]} />
      </ComposedChart>
    </ResponsiveContainer>
  )
}

export function RunwayForecastChart({ data }) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <AreaChart data={data}>
        <defs>
          <linearGradient id="cashGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor={CHART_COLORS.cash} stopOpacity={0.3} />
            <stop offset="95%" stopColor={CHART_COLORS.cash} stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
        <XAxis dataKey="month" tick={{ fontSize: 11 }} />
        <YAxis tickFormatter={(v) => formatINR(v)} tick={{ fontSize: 11 }} width={70} />
        <Tooltip {...tooltipStyle} />
        <Area type="monotone" dataKey="cash" stroke={CHART_COLORS.cash} fill="url(#cashGrad)" strokeWidth={2} />
      </AreaChart>
    </ResponsiveContainer>
  )
}

export function HealthRadialChart({ data, score }) {
  const radialData = [{ name: 'Score', value: score, fill: CHART_COLORS.primary }]
  return (
    <div className="relative">
      <ResponsiveContainer width="100%" height={200}>
        <RadialBarChart cx="50%" cy="50%" innerRadius="70%" outerRadius="100%" barSize={12} data={radialData} startAngle={90} endAngle={-270}>
          <RadialBar background dataKey="value" cornerRadius={6} />
        </RadialBarChart>
      </ResponsiveContainer>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-3xl font-bold text-primary">{score}</span>
      </div>
    </div>
  )
}

export function HealthBreakdownChart({ data }) {
  return (
    <ResponsiveContainer width="100%" height={220}>
      <RadarChart data={data}>
        <PolarGrid stroke="#E5E7EB" />
        <PolarAngleAxis dataKey="label" tick={{ fontSize: 10 }} />
        <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fontSize: 9 }} />
        <Radar dataKey="value" stroke={CHART_COLORS.primary} fill={CHART_COLORS.primary} fillOpacity={0.25} strokeWidth={2} />
      </RadarChart>
    </ResponsiveContainer>
  )
}

export function AgingChart({ data }) {
  return (
    <ResponsiveContainer width="100%" height={240}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
        <XAxis dataKey="bucket" tick={{ fontSize: 11 }} />
        <YAxis tickFormatter={(v) => formatINR(v)} tick={{ fontSize: 11 }} width={60} />
        <Tooltip {...tooltipStyle} />
        <Legend />
        <Bar dataKey="receivables" fill={CHART_COLORS.primary} name="Receivables" radius={[4, 4, 0, 0]} />
        <Bar dataKey="payables" fill={CHART_COLORS.expense} name="Payables" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  )
}

export function PortfolioRadarChart({ companies }) {
  const data = companies.slice(0, 3).map((c) => ({
    company: c.name.split(' ')[0],
    Revenue: Math.min(100, c.growth * 3),
    Growth: c.growth * 3,
    Health: c.health,
    Runway: Math.min(100, c.runway * 5),
    Readiness: c.valuationReadiness,
  }))
  const colors = [CHART_COLORS.primary, CHART_COLORS.cash, CHART_COLORS.warning]
  return (
    <ResponsiveContainer width="100%" height={320}>
      <RadarChart data={data[0] ? [
        { metric: 'Revenue', ...Object.fromEntries(companies.slice(0, 3).map((c, i) => [`c${i}`, c.growth * 3])) },
        { metric: 'Growth', ...Object.fromEntries(companies.slice(0, 3).map((c, i) => [`c${i}`, c.growth * 4])) },
        { metric: 'Health', ...Object.fromEntries(companies.slice(0, 3).map((c, i) => [`c${i}`, c.health])) },
        { metric: 'Runway', ...Object.fromEntries(companies.slice(0, 3).map((c, i) => [`c${i}`, c.runway * 5])) },
        { metric: 'Readiness', ...Object.fromEntries(companies.slice(0, 3).map((c, i) => [`c${i}`, c.valuationReadiness])) },
      ] : []}>
        <PolarGrid />
        <PolarAngleAxis dataKey="metric" tick={{ fontSize: 10 }} />
        {companies.slice(0, 3).map((c, i) => (
          <Radar key={c.id} name={c.name.split(' ')[0]} dataKey={`c${i}`} stroke={colors[i]} fill={colors[i]} fillOpacity={0.15} />
        ))}
        <Legend />
      </RadarChart>
    </ResponsiveContainer>
  )
}

export function ComparisonBarChart({ companies, metric }) {
  const key = { Revenue: 'monthlyRevenue', Growth: 'growth', Burn: 'monthlyBurn', Runway: 'runway', 'Health Score': 'health' }[metric] || 'growth'
  const data = companies.map((c) => ({ name: c.name.split(' ')[0], value: c[key] }))
  return (
    <ResponsiveContainer width="100%" height={280}>
      <BarChart data={data} layout="vertical">
        <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
        <XAxis type="number" tick={{ fontSize: 11 }} tickFormatter={key.includes('Revenue') || key.includes('Burn') ? (v) => formatINR(v) : undefined} />
        <YAxis type="category" dataKey="name" tick={{ fontSize: 11 }} width={80} />
        <Tooltip formatter={(v) => key.includes('Revenue') || key.includes('Burn') ? formatINR(v) : v} />
        <Bar dataKey="value" fill={CHART_COLORS.primary} radius={[0, 4, 4, 0]} />
      </BarChart>
    </ResponsiveContainer>
  )
}

export function ScatterPlotChart({ companies }) {
  const data = companies.map((c) => ({ x: c.growth, y: c.runway, z: c.health, name: c.name.split(' ')[0] }))
  return (
    <ResponsiveContainer width="100%" height={300}>
      <ScatterChart>
        <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
        <XAxis type="number" dataKey="x" name="Growth %" tick={{ fontSize: 11 }} />
        <YAxis type="number" dataKey="y" name="Runway" tick={{ fontSize: 11 }} />
        <ZAxis type="number" dataKey="z" range={[60, 400]} />
        <Tooltip cursor={{ strokeDasharray: '3 3' }} formatter={(v, name) => [name === 'x' ? `${v}%` : v, name]} />
        <Scatter data={data} fill={CHART_COLORS.primary} />
      </ScatterChart>
    </ResponsiveContainer>
  )
}

const SECTOR_COLORS = ['#3FA34D', '#66BB6A', '#2E7D32', '#2563EB', '#F59E0B', '#8B5CF6', '#EC4899', '#14B8A6', '#F97316', '#6366F1', '#84CC16', '#06B6D4']

export function MRRTrendChart({ data }) {
  return (
    <ResponsiveContainer width="100%" height={280}>
      <ComposedChart data={data}>
        <defs>
          <linearGradient id="mrrGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor={CHART_COLORS.primary} stopOpacity={0.35} />
            <stop offset="95%" stopColor={CHART_COLORS.primary} stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
        <XAxis dataKey="month" tickFormatter={formatMonth} tick={{ fontSize: 11 }} />
        <YAxis tickFormatter={(v) => formatINR(v)} tick={{ fontSize: 11 }} width={70} />
        <Tooltip {...tooltipStyle} labelFormatter={formatMonth} />
        <Legend />
        <Area type="monotone" dataKey="mrr" stroke={CHART_COLORS.primary} fill="url(#mrrGrad)" strokeWidth={2} name="MRR" />
        <Line type="monotone" dataKey="revenue" stroke={CHART_COLORS.secondary} strokeWidth={2} dot={false} name="Total Revenue" strokeDasharray="4 4" />
      </ComposedChart>
    </ResponsiveContainer>
  )
}

export function CACLTVChart({ data }) {
  return (
    <ResponsiveContainer width="100%" height={240}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
        <XAxis dataKey="month" tickFormatter={formatMonth} tick={{ fontSize: 11 }} />
        <YAxis tickFormatter={(v) => formatINR(v)} tick={{ fontSize: 11 }} width={60} />
        <Tooltip {...tooltipStyle} labelFormatter={formatMonth} />
        <Legend />
        <Bar dataKey="cac" fill={CHART_COLORS.warning} name="CAC" radius={[4, 4, 0, 0]} />
        <Bar dataKey="ltv" fill={CHART_COLORS.primary} name="Est. LTV" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  )
}

export function SectorBreakdownChart({ data }) {
  return (
    <ResponsiveContainer width="100%" height={280}>
      <BarChart data={data} layout="vertical">
        <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
        <XAxis type="number" tickFormatter={(v) => formatINR(v)} tick={{ fontSize: 11 }} />
        <YAxis type="category" dataKey="sector" tick={{ fontSize: 10 }} width={72} />
        <Tooltip formatter={(v) => formatINR(v)} />
        <Bar dataKey="arr" name="ARR" radius={[0, 4, 4, 0]}>
          {data.map((_, i) => (
            <Cell key={i} fill={SECTOR_COLORS[i % SECTOR_COLORS.length]} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  )
}

export function HealthDistributionChart({ data }) {
  return (
    <ResponsiveContainer width="100%" height={240}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
        <XAxis dataKey="range" tick={{ fontSize: 11 }} />
        <YAxis allowDecimals={false} tick={{ fontSize: 11 }} />
        <Tooltip />
        <Bar dataKey="count" name="Companies" radius={[6, 6, 0, 0]}>
          {data.map((entry, i) => (
            <Cell key={i} fill={entry.color} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  )
}

export function PortfolioScatterChart({ data, onClick }) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <ScatterChart>
        <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
        <XAxis type="number" dataKey="growth" name="Growth %" unit="%" tick={{ fontSize: 11 }} />
        <YAxis type="number" dataKey="runway" name="Runway (mo)" tick={{ fontSize: 11 }} />
        <ZAxis type="number" dataKey="mrr" range={[80, 500]} />
        <Tooltip
          cursor={{ strokeDasharray: '3 3' }}
          content={({ active, payload }) => {
            if (!active || !payload?.length) return null
            const d = payload[0].payload
            return (
              <div className="bg-white border border-border rounded-lg shadow-lg p-3 text-xs">
                <p className="font-semibold">{d.name}</p>
                <p>Growth: {d.growth}%</p>
                <p>Runway: {d.runway} mo</p>
                <p>MRR: {formatINR(d.mrr)}</p>
                <p>Health: {d.health}</p>
              </div>
            )
          }}
        />
        <Scatter
          data={data}
          onClick={(entry) => onClick?.(entry?.payload ?? entry)}
          cursor="pointer"
        >
          {data.map((entry, i) => (
            <Cell
              key={i}
              fill={entry.health >= 80 ? CHART_COLORS.primary : entry.health >= 60 ? CHART_COLORS.warning : CHART_COLORS.danger}
            />
          ))}
        </Scatter>
      </ScatterChart>
    </ResponsiveContainer>
  )
}

export function StatusDonutChart({ data }) {
  return (
    <ResponsiveContainer width="100%" height={220}>
      <RadialBarChart cx="50%" cy="50%" innerRadius="30%" outerRadius="90%" data={data} startAngle={180} endAngle={0}>
        <RadialBar background dataKey="value" cornerRadius={6}>
          {data.map((entry, i) => (
            <Cell key={i} fill={entry.fill} />
          ))}
        </RadialBar>
        <Tooltip />
        <Legend iconSize={10} wrapperStyle={{ fontSize: 12 }} />
      </RadialBarChart>
    </ResponsiveContainer>
  )
}

export function MetricComparisonChart({ data, metrics }) {
  return (
    <ResponsiveContainer width="100%" height={280}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
        <XAxis dataKey="month" tickFormatter={formatMonth} tick={{ fontSize: 11 }} />
        <YAxis tickFormatter={(v) => formatINR(v)} tick={{ fontSize: 11 }} width={70} />
        <Tooltip {...tooltipStyle} labelFormatter={formatMonth} />
        <Legend />
        {metrics.includes('mrr') && <Line type="monotone" dataKey="mrr" stroke={CHART_COLORS.primary} strokeWidth={2} dot={false} name="MRR" />}
        {metrics.includes('ebitda') && <Line type="monotone" dataKey="ebitda" stroke={CHART_COLORS.ebitda} strokeWidth={2} dot={false} name="EBITDA" />}
        {metrics.includes('burn') && <Line type="monotone" dataKey="burnRate" stroke={CHART_COLORS.expense} strokeWidth={2} dot={false} name="Burn" strokeDasharray="5 5" />}
      </LineChart>
    </ResponsiveContainer>
  )
}

export function TaxBenefitBarChart({ data, formatter }) {
  const fmt = formatter || ((v) => formatINR(v))
  return (
    <ResponsiveContainer width="100%" height={260}>
      <BarChart data={data} layout="vertical" margin={{ left: 20, right: 20 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" horizontal={false} />
        <XAxis type="number" tickFormatter={fmt} tick={{ fontSize: 11 }} />
        <YAxis type="category" dataKey="label" tick={{ fontSize: 11 }} width={90} />
        <Tooltip formatter={(v) => fmt(v)} contentStyle={{ borderRadius: 8, border: '1px solid #E5E7EB', fontSize: 12 }} />
        <Bar dataKey="value" radius={[0, 6, 6, 0]}>
          {data.map((entry, i) => (
            <Cell key={i} fill={entry.fill || CHART_COLORS.primary} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  )
}

export function CashImpactChart({ data }) {
  return (
    <ResponsiveContainer width="100%" height={280}>
      <AreaChart data={data}>
        <defs>
          <linearGradient id="baselineGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#94A3B8" stopOpacity={0.2} />
            <stop offset="95%" stopColor="#94A3B8" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="creditsGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor={CHART_COLORS.primary} stopOpacity={0.3} />
            <stop offset="95%" stopColor={CHART_COLORS.primary} stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
        <XAxis dataKey="month" tick={{ fontSize: 11 }} />
        <YAxis tickFormatter={(v) => formatINR(v)} tick={{ fontSize: 11 }} width={70} />
        <Tooltip {...tooltipStyle} />
        <Legend />
        <Area type="monotone" dataKey="baseline" stroke="#94A3B8" fill="url(#baselineGrad)" strokeWidth={2} name="Without Credits" />
        <Area type="monotone" dataKey="withCredits" stroke={CHART_COLORS.primary} fill="url(#creditsGrad)" strokeWidth={2} name="With Credits & Funding" />
      </AreaChart>
    </ResponsiveContainer>
  )
}
