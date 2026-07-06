const MONTHS = []
const now = new Date(2026, 5, 1) // Jun 2026
for (let i = 23; i >= 0; i--) {
  const d = new Date(now.getFullYear(), now.getMonth() - i, 1)
  MONTHS.push(d.toISOString().slice(0, 10))
}

function seededRandom(seed) {
  const x = Math.sin(seed) * 10000
  return x - Math.floor(x)
}

const RECURRING_RATIO = {
  SaaS: 0.88,
  FinTech: 0.82,
  Cloud: 0.90,
  CyberSec: 0.85,
  'AI/ML': 0.80,
  HealthTech: 0.72,
  EdTech: 0.75,
  Logistics: 0.58,
  AgriTech: 0.55,
  CleanTech: 0.62,
  D2C: 0.42,
  FoodTech: 0.48,
}

function deriveSaaSMetrics(monthlyRevenue, sector, seed) {
  const ratio = RECURRING_RATIO[sector] ?? 0.65
  const mrr = Math.round(monthlyRevenue * ratio)
  const arr = mrr * 12
  const cacBase = { SaaS: 48000, FinTech: 52000, Cloud: 55000, D2C: 38000, EdTech: 42000 }[sector] ?? 45000
  const cac = Math.round(cacBase + (seededRandom(seed + 11) - 0.5) * 18000)
  return { mrr, arr, cac }
}

function generateCompanyHistory(baseRevenue, growthRate, burnRate, cashStart, seed, sector = 'SaaS') {
  let cash = cashStart * 0.85
  const history = []
  const monthlyGrowth = growthRate / 100 / 12

  for (let i = 0; i < 24; i++) {
    const t = i / 23
    const noise = (seededRandom(seed + i * 7) - 0.5) * 0.04
    const revenue = Math.round(baseRevenue * (0.72 + 0.28 * t) * (1 + monthlyGrowth * i + noise))
    const expenses = revenue * (0.72 + seededRandom(seed + i) * 0.12) + burnRate * 0.25
    const ebitda = revenue - expenses * 0.85
    const burn = Math.max(expenses - revenue * 0.12, burnRate * (0.85 + seededRandom(seed + i * 3) * 0.3))
    cash = cash - burn + revenue * 0.1
    const runway = Math.max(1, Math.round(cash / burn))
    const ratio = RECURRING_RATIO[sector] ?? 0.65

    history.push({
      month: MONTHS[i],
      revenue,
      mrr: Math.round(revenue * ratio),
      expenses: Math.round(expenses),
      ebitda: Math.round(ebitda),
      cashBalance: Math.round(Math.max(cash, 0)),
      burnRate: Math.round(burn),
      runway,
    })
  }
  return history
}

export const STARTUP_COMPANY = {
  id: 'mishutt',
  name: 'Mishutt Tech Solutions',
  sector: 'SaaS',
  founded: 2021,
  stage: 'Series A',
}

const companyDefs = [
  { id: 'ekara', name: 'Ekara Financials', sector: 'SaaS', stage: 'Series A', revenue: 18500000, growth: 18, burn: 1200000, cash: 16800000, health: 87, status: 'Healthy', funding: 45000000 },
  { id: 'pravita', name: 'Pravita Pay', sector: 'FinTech', stage: 'Series B', revenue: 22000000, growth: 22, burn: 980000, cash: 14700000, health: 91, status: 'Healthy', funding: 62000000 },
  { id: 'krishivo', name: 'Krishivo', sector: 'AgriTech', stage: 'Series A', revenue: 8900000, growth: 14, burn: 1100000, cash: 6600000, health: 72, status: 'Watch', funding: 28000000 },
  { id: 'arogyalink', name: 'ArogyaLink', sector: 'HealthTech', stage: 'Series A', revenue: 15200000, growth: 16, burn: 1350000, cash: 8100000, health: 78, status: 'Healthy', funding: 38000000 },
  { id: 'fleetora', name: 'Fleetora', sector: 'Logistics', stage: 'Series B', revenue: 31000000, growth: 12, burn: 2100000, cash: 18900000, health: 85, status: 'Healthy', funding: 95000000 },
  { id: 'vidyapath', name: 'VidyaPath', sector: 'EdTech', stage: 'Seed', revenue: 6400000, growth: 8, burn: 890000, cash: 3200000, health: 58, status: 'Watch', funding: 18000000 },
  { id: 'stacklyn', name: 'Stacklyn', sector: 'Cloud', stage: 'Series C', revenue: 42000000, growth: 25, burn: 2800000, cash: 35000000, health: 93, status: 'Healthy', funding: 120000000 },
  { id: 'bazaarlyn', name: 'Bazaarlyn', sector: 'D2C', stage: 'Series A', revenue: 11800000, growth: -3, burn: 1450000, cash: 4100000, health: 45, status: 'High Risk', funding: 22000000 },
  { id: 'cogniva', name: 'Cogniva Labs', sector: 'AI/ML', stage: 'Series A', revenue: 9800000, growth: 28, burn: 1650000, cash: 11200000, health: 82, status: 'Healthy', funding: 52000000 },
  { id: 'sunvera', name: 'Sunvera Energy', sector: 'CleanTech', stage: 'Series B', revenue: 25600000, growth: 19, burn: 1900000, cash: 22400000, health: 88, status: 'Healthy', funding: 78000000 },
  { id: 'plateroute', name: 'PlateRoute', sector: 'FoodTech', stage: 'Seed', revenue: 7200000, growth: 5, burn: 1050000, cash: 2800000, health: 52, status: 'Watch', funding: 15000000 },
  { id: 'sentineliq', name: 'SentinelIQ', sector: 'CyberSec', stage: 'Series A', revenue: 19800000, growth: 21, burn: 1420000, cash: 15600000, health: 86, status: 'Healthy', funding: 48000000 },
]

export const PORTFOLIO_COMPANIES = companyDefs.map((c, idx) => {
  const history = generateCompanyHistory(c.revenue, c.growth, c.burn, c.cash, idx * 100 + 42, c.sector)
  const latest = history[history.length - 1]
  const { mrr, arr, cac } = deriveSaaSMetrics(c.revenue, c.sector, idx * 100 + 42)
  const runway = Math.max(1, Math.round(c.cash / c.burn))
  return {
    ...c,
    monthlyRevenue: c.revenue,
    monthlyBurn: c.burn,
    cashPosition: c.cash,
    runway,
    mrr,
    arr,
    cac,
    mrrGrowth: c.growth,
    history,
    valuationReadiness: Math.min(95, c.health + seededRandom(idx) * 10),
    investors: ['Ekara Capital Partners', 'Crestline Partners', 'Seed Fund II'].slice(0, 1 + (idx % 3)),
    lastReport: MONTHS[MONTHS.length - 1],
  }
})

export const STARTUP_HISTORY = PORTFOLIO_COMPANIES[0].history

export const STARTUP_KPIS = {
  revenue: PORTFOLIO_COMPANIES[0].monthlyRevenue,
  revenueGrowth: PORTFOLIO_COMPANIES[0].growth,
  mrr: PORTFOLIO_COMPANIES[0].mrr,
  arr: PORTFOLIO_COMPANIES[0].arr,
  mrrGrowth: PORTFOLIO_COMPANIES[0].mrrGrowth,
  cac: PORTFOLIO_COMPANIES[0].cac,
  burnRate: PORTFOLIO_COMPANIES[0].monthlyBurn,
  runway: PORTFOLIO_COMPANIES[0].runway,
  cashPosition: PORTFOLIO_COMPANIES[0].cashPosition,
  healthScore: 87,
}

export const HEALTH_BREAKDOWN = [
  { label: 'Growth Score', value: 90, color: '#3FA34D' },
  { label: 'Liquidity Score', value: 84, color: '#66BB6A' },
  { label: 'Profitability Score', value: 88, color: '#2E7D32' },
  { label: 'Cash Flow Score', value: 86, color: '#4CAF50' },
  { label: 'Risk Score', value: 82, color: '#81C784' },
]

export const AI_INSIGHTS_STARTUP = [
  { id: 1, title: 'Revenue Momentum', message: 'Revenue increased 18% month-over-month driven by enterprise tier upgrades.', severity: 'positive', detail: 'Enterprise segment grew 24% while SMB remained flat. Net revenue retention reached 118%. Recommend doubling down on enterprise sales motion.' },
  { id: 2, title: 'Burn Efficiency', message: 'Burn rate improved by 12% through operational cost optimization.', severity: 'positive', detail: 'Cloud infrastructure costs reduced 18% after migration to reserved instances. Headcount growth slowed from 8% to 4% MoM.' },
  { id: 3, title: 'Marketing Spend Alert', message: 'Marketing expenses increased 27% without proportional lead growth.', severity: 'warning', detail: 'CAC rose from ₹42K to ₹53K. Paid channels showing diminishing returns. Consider reallocating 15% of ad spend to content-led acquisition.' },
  { id: 4, title: 'Runway Extension', message: 'Cash runway extended from 11 to 14 months.', severity: 'positive', detail: 'Combination of burn reduction and delayed hiring plan contributed to 3-month runway improvement. Break-even projected in 16 months at current trajectory.' },
  { id: 5, title: 'Customer Concentration', message: 'Customer concentration risk detected — top 3 clients represent 48% of revenue.', severity: 'critical', detail: 'Largest client contributes 22% of MRR. Recommend diversifying pipeline with mid-market segment and implementing usage-based pricing.' },
  { id: 6, title: 'Receivables Aging', message: 'Receivable aging above industry benchmark at 45 days DSO.', severity: 'warning', detail: '₹18L in receivables past 60 days from 2 enterprise accounts. Collections team should prioritize these accounts to improve cash conversion.' },
]

export const GRANTS = [
  { id: 'sisfs', name: 'Startup India Seed Fund', score: 92, amount: '₹ 50 L – ₹ 2 Cr', timeline: '8–12 weeks', docs: ['DPIIT Certificate', 'Pitch Deck', 'Financial Statements', 'KYC Documents'], desc: 'Government-backed seed funding for early-stage DPIIT-recognized startups.' },
  { id: 'msme', name: 'MSME Innovation Grant', score: 78, amount: '₹ 15 L – ₹ 1 Cr', timeline: '6–10 weeks', docs: ['MSME Registration', 'Innovation Proposal', 'Project Plan', 'Cost Estimate'], desc: 'Support for MSMEs developing innovative products and processes.' },
  { id: 'ai', name: 'AI Innovation Program', score: 85, amount: '₹ 25 L – ₹ 1.5 Cr', timeline: '10–14 weeks', docs: ['Technical Architecture', 'AI Model Documentation', 'Team Credentials', 'IP Declaration'], desc: 'MeitY program supporting AI/ML startups with R&D grants.' },
  { id: 'dpiit', name: 'DPIIT Startup Benefits', score: 95, amount: 'Tax Exemptions + Benefits', timeline: '4–6 weeks', docs: ['Incorporation Certificate', 'DPIIT Application', 'Brief about Innovation'], desc: 'Tax holiday, self-certification compliance, and fast-track patent examination.' },
  { id: 'sidbi', name: 'SIDBI Assistance', score: 71, amount: '₹ 10 L – ₹ 5 Cr', timeline: '12–16 weeks', docs: ['Business Plan', 'Audited Financials', 'Collateral Documents', 'Board Resolution'], desc: 'Debt and quasi-equity assistance for growth-stage startups.' },
]

export const RECEIVABLES_DATA = {
  dso: 45,
  outstandingReceivables: 3200000,
  outstandingPayables: 1100000,
  aging: [
    { bucket: '0-30', receivables: 1800000, payables: 620000 },
    { bucket: '31-60', receivables: 980000, payables: 310000 },
    { bucket: '61-90', receivables: 320000, payables: 120000 },
    { bucket: '90+', receivables: 100000, payables: 50000 },
  ],
}

export const INVESTOR_KPIS = {
  portfolioValue: 450000000,
  avgGrowth: 21,
  avgRunway: 13,
  portfolioHealth: 84,
  activeInvestments: 12,
  totalARR: PORTFOLIO_COMPANIES.reduce((sum, c) => sum + c.arr, 0),
  avgMRR: Math.round(PORTFOLIO_COMPANIES.reduce((sum, c) => sum + c.mrr, 0) / PORTFOLIO_COMPANIES.length),
  avgCAC: Math.round(PORTFOLIO_COMPANIES.reduce((sum, c) => sum + c.cac, 0) / PORTFOLIO_COMPANIES.length),
}

export const RISK_FLAGS = [
  { company: 'Bazaarlyn', flag: 'Revenue Decline', severity: 'high', probability: 78, action: 'Schedule board review and assess pivot options' },
  { company: 'Bazaarlyn', flag: 'Runway < 6 Months', severity: 'high', probability: 85, action: 'Initiate bridge round discussions immediately' },
  { company: 'VidyaPath', flag: 'Runway < 6 Months', severity: 'high', probability: 72, action: 'Review cost structure and extend runway via expense cuts' },
  { company: 'PlateRoute', flag: 'Negative Cash Flow', severity: 'medium', probability: 65, action: 'Monitor unit economics and delivery cost per order' },
  { company: 'Krishivo', flag: 'Receivable Concentration', severity: 'medium', probability: 58, action: 'Diversify customer base in Q3 pipeline' },
  { company: 'Ekara Financials', flag: 'Customer Concentration', severity: 'medium', probability: 55, action: 'Accelerate mid-market acquisition strategy' },
  { company: 'ArogyaLink', flag: 'Expense Spike', severity: 'low', probability: 42, action: 'Review R&D spend allocation for Q2' },
]

export const AI_COMMENTARY_INVESTOR = [
  { company: 'Pravita Pay', sentiment: 'bullish', text: 'Ekara experts note that Pravita Pay grew revenue 22% while reducing burn by 14%. Current runway is healthy at 15 months. Working capital efficiency improved compared to prior quarter.' },
  { company: 'Bazaarlyn', sentiment: 'watchlist', text: 'Revenue declined 3% MoM with burn increasing 8%. Runway at 4 months requires immediate attention. Customer churn in D2C segment elevated to 12%.' },
  { company: 'Stacklyn', sentiment: 'bullish', text: 'Strongest performer in portfolio with 25% growth and expanding margins. EBITDA positive for 3 consecutive months. Valuation readiness score at 94%.' },
  { company: 'VidyaPath', sentiment: 'watchlist', text: 'Growth decelerated to 8% with runway under pressure. EdTech sector headwinds affecting conversion rates. Recommend operational review.' },
  { company: 'Cogniva Labs', sentiment: 'neutral', text: 'High growth at 28% offset by elevated burn from R&D investments. Cash position adequate at 11 months runway. Monitor GPU infrastructure costs.' },
  { company: 'Krishivo', sentiment: 'neutral', text: 'Steady 14% growth with seasonal revenue patterns. Receivable concentration from 2 large agri-corps warrants monitoring.' },
]

export const MOCK_INVESTORS = [
  { id: 1, name: 'Ekara Capital Partners', email: 'partners@ekara.org.in', permission: 'Full Access', lastActive: '2 hours ago', reportsShared: 12 },
  { id: 2, name: 'Crestline Partners', email: 'portfolio@crestline.partners', permission: 'Reports Only', lastActive: '1 day ago', reportsShared: 8 },
  { id: 3, name: 'Seed Fund II', email: 'analyst@seedfund.in', permission: 'Metrics Only', lastActive: '3 days ago', reportsShared: 4 },
]

export const REPORTS_STARTUP = [
  { id: 'monthly', name: 'Monthly Investor Update', period: 'May 2026', pages: 8 },
  { id: 'quarterly', name: 'Quarterly Investor Report', period: 'Q1 FY26', pages: 24 },
  { id: 'board', name: 'Board Report', period: 'Q1 FY26', pages: 32 },
  { id: 'summary', name: 'Financial Summary', period: 'YTD FY26', pages: 12 },
]

export const REPORTS_INVESTOR = [
  { id: 'portfolio', name: 'Portfolio Summary', period: 'Q1 FY26', companies: 12 },
  { id: 'board', name: 'Board Packs', period: 'May 2026', companies: 5 },
  { id: 'quarterly', name: 'Quarterly Reviews', period: 'Q1 FY26', companies: 12 },
]

export function getPLStatement(period = 'monthly') {
  const latest = STARTUP_HISTORY[STARTUP_HISTORY.length - 1]
  const mult = period === 'annual' ? 12 : period === 'quarterly' ? 3 : 1
  const rev = latest.revenue * mult
  const cogs = rev * 0.28
  const gross = rev - cogs
  const opex = latest.expenses * mult * 0.72
  const ebitda = gross - opex
  return {
    revenue: rev, cogs, grossProfit: gross, opex, ebitda,
    depreciation: rev * 0.02 * mult,
    interest: rev * 0.008 * mult,
    netIncome: ebitda * 0.65,
    items: [
      { label: 'Product Revenue', value: rev * 0.82 },
      { label: 'Services Revenue', value: rev * 0.18 },
      { label: 'Cost of Goods Sold', value: -cogs },
      { label: 'Gross Profit', value: gross, bold: true },
      { label: 'Sales & Marketing', value: -opex * 0.35 },
      { label: 'R&D', value: -opex * 0.30 },
      { label: 'G&A', value: -opex * 0.35 },
      { label: 'EBITDA', value: ebitda, bold: true },
      { label: 'Net Income', value: ebitda * 0.65, bold: true },
    ],
  }
}

export function getBalanceSheet() {
  const cash = STARTUP_KPIS.cashPosition
  return {
    assets: [
      { label: 'Cash & Equivalents', value: cash },
      { label: 'Accounts Receivable', value: RECEIVABLES_DATA.outstandingReceivables },
      { label: 'Prepaid Expenses', value: 420000 },
      { label: 'Fixed Assets (Net)', value: 2800000 },
      { label: 'Total Assets', value: cash + RECEIVABLES_DATA.outstandingReceivables + 420000 + 2800000, bold: true },
    ],
    liabilities: [
      { label: 'Accounts Payable', value: RECEIVABLES_DATA.outstandingPayables },
      { label: 'Accrued Expenses', value: 890000 },
      { label: 'Deferred Revenue', value: 3200000 },
      { label: 'Long-term Debt', value: 0 },
      { label: 'Total Liabilities', value: RECEIVABLES_DATA.outstandingPayables + 890000 + 3200000, bold: true },
    ],
    equity: [
      { label: 'Share Capital', value: 1000000 },
      { label: 'Retained Earnings', value: 4200000 },
      { label: 'Total Equity', value: 5200000, bold: true },
    ],
  }
}

export function getCashFlowStatement(period = 'monthly') {
  const mult = period === 'annual' ? 12 : period === 'quarterly' ? 3 : 1
  const latest = STARTUP_HISTORY[STARTUP_HISTORY.length - 1]
  return {
    operating: latest.ebitda * mult * 0.8,
    investing: -latest.revenue * 0.05 * mult,
    financing: 0,
    netChange: latest.ebitda * mult * 0.8 - latest.revenue * 0.05 * mult,
  }
}

export function getTrialBalance() {
  return [
    { account: '1000 - Cash', debit: STARTUP_KPIS.cashPosition, credit: 0 },
    { account: '1100 - Accounts Receivable', debit: RECEIVABLES_DATA.outstandingReceivables, credit: 0 },
    { account: '2000 - Accounts Payable', debit: 0, credit: RECEIVABLES_DATA.outstandingPayables },
    { account: '3000 - Share Capital', debit: 0, credit: 1000000 },
    { account: '4000 - Revenue', debit: 0, credit: STARTUP_KPIS.revenue },
    { account: '5000 - COGS', debit: STARTUP_KPIS.revenue * 0.28, credit: 0 },
    { account: '6000 - Operating Expenses', debit: STARTUP_HISTORY.at(-1).expenses * 0.72, credit: 0 },
    { account: '7000 - Retained Earnings', debit: 0, credit: 4200000 },
  ]
}

export function generateRunwayForecast(scenario = 'expected', months = 18) {
  const burn = STARTUP_KPIS.burnRate
  const cash = STARTUP_KPIS.cashPosition
  const mult = { conservative: 1.15, expected: 1.0, aggressive: 0.85 }[scenario]
  const data = []
  let c = cash
  for (let i = 0; i <= months; i++) {
    data.push({ month: i === 0 ? 'Now' : `M${i}`, cash: Math.round(c), burn: Math.round(burn * mult) })
    c -= burn * mult
    if (c < 0) c = 0
  }
  return data
}

export { MONTHS }

export const STARTUP_NOTIFICATIONS = [
  {
    id: 'su-1',
    title: 'May investor update ready',
    message: 'Your monthly investor report for May 2026 has been generated and is ready to share.',
    time: '12 min ago',
    read: false,
    type: 'report',
    link: '/startup/reports',
  },
  {
    id: 'su-2',
    title: 'Crestline Partners viewed your report',
    message: 'Crestline Partners opened the Q1 FY26 board report you shared yesterday.',
    time: '1 hour ago',
    read: false,
    type: 'investor',
    link: '/startup/investors',
  },
  {
    id: 'su-3',
    title: 'Expert insight flagged',
    message: 'Customer concentration risk detected — top 3 clients represent 48% of revenue.',
    time: '3 hours ago',
    read: false,
    type: 'insight',
    link: '/startup/insights',
  },
  {
    id: 'su-4',
    title: 'Bank statement processed',
    message: 'HDFC operating account statement (May 2026) was parsed successfully. 142 transactions reconciled.',
    time: '5 hours ago',
    read: true,
    type: 'upload',
    link: '/startup/uploads',
  },
  {
    id: 'su-5',
    title: 'Grant eligibility improved',
    message: 'Your Startup India Seed Fund readiness score increased to 92 based on latest financials.',
    time: 'Yesterday',
    read: true,
    type: 'grant',
    link: '/startup/grants',
  },
  {
    id: 'su-6',
    title: 'Runway forecast updated',
    message: 'Cash runway extended to 14 months after burn efficiency improvements in May.',
    time: '2 days ago',
    read: true,
    type: 'metrics',
    link: '/startup/metrics',
  },
]

export const INVESTOR_NOTIFICATIONS = [
  {
    id: 'inv-1',
    title: 'Runway alert — Bazaarlyn',
    message: 'Bazaarlyn runway dropped below 6 months. Immediate board review recommended.',
    time: '18 min ago',
    read: false,
    type: 'alert',
    link: '/investor/risk',
  },
  {
    id: 'inv-2',
    title: 'New report from Mishutt Tech Solutions',
    message: 'Mishutt Tech Solutions shared the May 2026 monthly investor update.',
    time: '45 min ago',
    read: false,
    type: 'report',
    link: '/investor/reports',
  },
  {
    id: 'inv-3',
    title: 'Pravita Pay exceeded target',
    message: 'Pravita Pay posted 22% MoM revenue growth, beating portfolio average by 4 points.',
    time: '2 hours ago',
    read: false,
    type: 'insight',
    link: '/investor/companies/pravita',
  },
  {
    id: 'inv-4',
    title: 'Q1 portfolio summary available',
    message: 'Your consolidated Q1 FY26 portfolio report is ready for download.',
    time: '6 hours ago',
    read: true,
    type: 'report',
    link: '/investor/reports',
  },
  {
    id: 'inv-5',
    title: 'VidyaPath flagged for review',
    message: 'Growth decelerated to 8% with runway under pressure. Risk probability at 72%.',
    time: 'Yesterday',
    read: true,
    type: 'alert',
    link: '/investor/risk',
  },
  {
    id: 'inv-6',
    title: 'Stacklyn board pack uploaded',
    message: 'Stacklyn uploaded Q1 board materials. EBITDA positive for the third consecutive month.',
    time: '2 days ago',
    read: true,
    type: 'report',
    link: '/investor/companies/stacklyn',
  },
]
