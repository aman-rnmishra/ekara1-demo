export const TAX_COUNTRIES = [
  { id: 'all', name: 'All Countries', flag: '🌐' },
  { id: 'in', name: 'India', flag: '🇮🇳', currency: 'INR', symbol: '₹' },
  { id: 'us', name: 'United States', flag: '🇺🇸', currency: 'USD', symbol: '$' },
  { id: 'uk', name: 'United Kingdom', flag: '🇬🇧', currency: 'GBP', symbol: '£' },
  { id: 'ca', name: 'Canada', flag: '🇨🇦', currency: 'CAD', symbol: 'CAD ' },
  { id: 'ae', name: 'UAE', flag: '🇦🇪', currency: 'AED', symbol: 'AED ' },
  { id: 'sg', name: 'Singapore', flag: '🇸🇬', currency: 'SGD', symbol: 'SGD ' },
  { id: 'au', name: 'Australia', flag: '🇦🇺', currency: 'AUD', symbol: 'AUD ' },
]

export const STARTUP_TAX_SUMMARY = {
  estimatedSavings: 125000,
  eligiblePrograms: 8,
  runwayExtension: 2.4,
  fundingOpportunities: 12,
  upcomingDeadlines: 3,
}

export const TAX_PROGRAMS = [
  {
    id: 'dpiit-in',
    country: 'in',
    name: 'DPIIT Startup Tax Exemption',
    benefit: '₹15 Lakhs',
    benefitValue: 1500000,
    eligibility: 92,
    status: 'Likely Eligible',
    statusVariant: 'success',
    funding: '₹15 Lakhs',
    complexity: 'Low',
    approvalProbability: 88,
    processingTime: '4–6 weeks',
    type: 'Tax Credit',
    deadline: 'Jun 30, 2026',
  },
  {
    id: 'rd-uk',
    country: 'uk',
    name: 'R&D Tax Relief',
    benefit: '£35,000',
    benefitValue: 35000,
    eligibility: 88,
    status: 'Review Required',
    statusVariant: 'warning',
    funding: '£35,000',
    complexity: 'Medium',
    approvalProbability: 76,
    processingTime: '8–12 weeks',
    type: 'Tax Credit',
    deadline: 'Jul 15, 2026',
  },
  {
    id: 'rd-us',
    country: 'us',
    name: 'Federal R&D Tax Credit',
    benefit: '$50,000',
    benefitValue: 50000,
    eligibility: 84,
    status: 'Potential Match',
    statusVariant: 'default',
    funding: '$50,000',
    complexity: 'High',
    approvalProbability: 71,
    processingTime: '10–16 weeks',
    type: 'Tax Credit',
    deadline: 'Aug 1, 2026',
  },
  {
    id: 'sred-ca',
    country: 'ca',
    name: 'SR&ED Tax Incentive',
    benefit: 'CAD 75,000',
    benefitValue: 75000,
    eligibility: 79,
    status: 'Potential Match',
    statusVariant: 'default',
    funding: 'CAD 75,000',
    complexity: 'High',
    approvalProbability: 68,
    processingTime: '12–18 weeks',
    type: 'Tax Credit',
    deadline: 'Sep 30, 2026',
  },
  {
    id: 'innov-ae',
    country: 'ae',
    name: 'Innovation Incentive Programs',
    benefit: 'AED 120,000',
    benefitValue: 120000,
    eligibility: 82,
    status: 'Likely Eligible',
    statusVariant: 'success',
    funding: 'AED 120,000',
    complexity: 'Medium',
    approvalProbability: 81,
    processingTime: '6–10 weeks',
    type: 'Incentive',
    deadline: 'Jul 31, 2026',
  },
  {
    id: 'edg-sg',
    country: 'sg',
    name: 'Enterprise Development Grant',
    benefit: 'SGD 60,000',
    benefitValue: 60000,
    eligibility: 90,
    status: 'Strong Match',
    statusVariant: 'success',
    funding: 'SGD 60,000',
    complexity: 'Low',
    approvalProbability: 91,
    processingTime: '5–8 weeks',
    type: 'Grant',
    deadline: 'Jun 20, 2026',
  },
  {
    id: 'rd-au',
    country: 'au',
    name: 'R&D Tax Incentive',
    benefit: 'AUD 45,000',
    benefitValue: 45000,
    eligibility: 87,
    status: 'Likely Eligible',
    statusVariant: 'success',
    funding: 'AUD 45,000',
    complexity: 'Medium',
    approvalProbability: 83,
    processingTime: '8–14 weeks',
    type: 'Tax Credit',
    deadline: 'Oct 15, 2026',
  },
  {
    id: 'msme-in',
    country: 'in',
    name: 'MSME Innovation Subsidy',
    benefit: '₹8 Lakhs',
    benefitValue: 800000,
    eligibility: 78,
    status: 'Potential Match',
    statusVariant: 'default',
    funding: '₹8 Lakhs',
    complexity: 'Medium',
    approvalProbability: 72,
    processingTime: '6–10 weeks',
    type: 'Subsidy',
    deadline: 'Aug 15, 2026',
  },
]

export const TAX_TIMELINE_STEPS = [
  { id: 'discovery', label: 'Discovery', status: 'complete', date: 'Apr 2' },
  { id: 'eligibility', label: 'Eligibility Review', status: 'complete', date: 'Apr 18' },
  { id: 'documentation', label: 'Documentation', status: 'active', date: 'In Progress' },
  { id: 'application', label: 'Application', status: 'pending', date: 'Jun 2026' },
  { id: 'approval', label: 'Approval', status: 'pending', date: 'Jul 2026' },
  { id: 'funds', label: 'Funds Received', status: 'pending', date: 'Aug 2026' },
]

export const COMPLIANCE_CENTER = {
  deadlines: [
    { id: 1, title: 'UK R&D Tax Relief — Filing', date: 'Jul 15, 2026', daysLeft: 39, country: 'uk' },
    { id: 2, title: 'Singapore EDG — Application', date: 'Jun 20, 2026', daysLeft: 14, country: 'sg' },
    { id: 3, title: 'India DPIIT — Annual Declaration', date: 'Jun 30, 2026', daysLeft: 24, country: 'in' },
  ],
  missingDocs: [
    { id: 1, doc: 'R&D expenditure breakdown (FY25)', program: 'UK R&D Tax Relief' },
    { id: 2, doc: 'Innovation project proposal', program: 'Enterprise Development Grant' },
    { id: 3, doc: 'Audited financial statements', program: 'Federal R&D Tax Credit' },
  ],
  applications: [
    { id: 1, program: 'DPIIT Startup Tax Exemption', status: 'Under Review', progress: 65 },
    { id: 2, program: 'Enterprise Development Grant', status: 'Documentation', progress: 40 },
    { id: 3, program: 'Innovation Incentive (UAE)', status: 'Submitted', progress: 80 },
  ],
  history: [
    { id: 1, program: 'Startup India Seed Fund', amount: '₹50 Lakhs', date: 'Mar 2025', status: 'Received' },
    { id: 2, program: 'DPIIT Tax Holiday (Y1)', amount: '₹12 Lakhs', date: 'Jan 2025', status: 'Received' },
    { id: 3, program: 'MSME Innovation Grant', amount: '₹6 Lakhs', date: 'Nov 2024', status: 'Received' },
  ],
}

export const CASH_SIMULATOR_DEFAULTS = {
  country: 'uk',
  annualRevenue: 18500000,
  annualExpenses: 14200000,
  rdSpend: 2800000,
  employeeCount: 48,
  cashBalance: 16800000,
  monthlyBurn: 1200000,
}

export const PORTFOLIO_TAX_KPIS = {
  totalClaimed: 3800000,
  unclaimedOpportunities: 1400000,
  avgEfficiencyScore: 84,
  potentialCashImpact: 5200000,
}

export const PORTFOLIO_TAX_OPPORTUNITIES = [
  { id: 'ekara', company: 'Ekara Financials', country: 'in', countryName: 'India', available: 420000, claimed: 280000, unclaimed: 140000, eligibility: 92, opportunity: 'High', status: 'In Progress' },
  { id: 'pravita', company: 'Pravita Pay', country: 'in', countryName: 'India', available: 580000, claimed: 520000, unclaimed: 60000, eligibility: 88, opportunity: 'Medium', status: 'Claimed' },
  { id: 'stacklyn', company: 'Stacklyn', country: 'us', countryName: 'United States', available: 890000, claimed: 720000, unclaimed: 170000, eligibility: 91, opportunity: 'High', status: 'Review' },
  { id: 'cogniva', company: 'Cogniva Labs', country: 'uk', countryName: 'United Kingdom', available: 650000, claimed: 380000, unclaimed: 270000, eligibility: 86, opportunity: 'High', status: 'In Progress' },
  { id: 'sunvera', company: 'Sunvera Energy', country: 'au', countryName: 'Australia', available: 480000, claimed: 410000, unclaimed: 70000, eligibility: 82, opportunity: 'Medium', status: 'Claimed' },
  { id: 'fleetora', company: 'Fleetora', country: 'sg', countryName: 'Singapore', available: 520000, claimed: 290000, unclaimed: 230000, eligibility: 85, opportunity: 'High', status: 'In Progress' },
  { id: 'arogyalink', company: 'ArogyaLink', country: 'in', countryName: 'India', available: 310000, claimed: 180000, unclaimed: 130000, eligibility: 79, opportunity: 'Medium', status: 'Review' },
  { id: 'bazaarlyn', company: 'Bazaarlyn', country: 'in', countryName: 'India', available: 180000, claimed: 45000, unclaimed: 135000, eligibility: 58, opportunity: 'Low', status: 'At Risk' },
  { id: 'vidyapath', company: 'VidyaPath', country: 'in', countryName: 'India', available: 220000, claimed: 95000, unclaimed: 125000, eligibility: 71, opportunity: 'Medium', status: 'Review' },
  { id: 'krishivo', company: 'Krishivo', country: 'in', countryName: 'India', available: 290000, claimed: 210000, unclaimed: 80000, eligibility: 76, opportunity: 'Medium', status: 'Claimed' },
  { id: 'sentineliq', company: 'SentinelIQ', country: 'us', countryName: 'United States', available: 540000, claimed: 460000, unclaimed: 80000, eligibility: 87, opportunity: 'Medium', status: 'Claimed' },
  { id: 'plateroute', company: 'PlateRoute', country: 'ae', countryName: 'UAE', available: 195000, claimed: 60000, unclaimed: 135000, eligibility: 68, opportunity: 'Medium', status: 'In Progress' },
]

export const INVESTOR_TAX_COMMENTARY = [
  {
    id: 1,
    severity: 'positive',
    text: 'Portfolio companies collectively have approximately $1.4M in unclaimed tax incentives.',
  },
  {
    id: 2,
    severity: 'warning',
    text: 'Three companies may qualify for additional R&D tax credits that could extend average runway by 1.7 months.',
  },
  {
    id: 3,
    severity: 'neutral',
    text: 'Tax efficiency across the portfolio improved by 12% compared to the previous quarter.',
  },
]

export const GLOBAL_FUNDING_PROGRAMS = [
  { id: 1, name: 'DPIIT Startup Tax Exemption', country: 'in', category: 'Tax Credits', industry: 'SaaS', stage: 'Series A', amount: '₹15 Lakhs', eligibility: 92, deadline: 'Jun 30, 2026' },
  { id: 2, name: 'Federal R&D Tax Credit', country: 'us', category: 'Tax Credits', industry: 'AI/ML', stage: 'Series A+', amount: '$50,000', eligibility: 84, deadline: 'Aug 1, 2026' },
  { id: 3, name: 'R&D Tax Relief', country: 'uk', category: 'Tax Credits', industry: 'HealthTech', stage: 'Series A', amount: '£35,000', eligibility: 88, deadline: 'Jul 15, 2026' },
  { id: 4, name: 'SR&ED Tax Incentive', country: 'ca', category: 'Tax Credits', industry: 'Cloud', stage: 'Series B+', amount: 'CAD 75,000', eligibility: 79, deadline: 'Sep 30, 2026' },
  { id: 5, name: 'Innovation Incentive Programs', country: 'ae', category: 'Innovation Programs', industry: 'FoodTech', stage: 'Seed', amount: 'AED 120,000', eligibility: 82, deadline: 'Jul 31, 2026' },
  { id: 6, name: 'Enterprise Development Grant', country: 'sg', category: 'Government Grants', industry: 'Logistics', stage: 'Series B', amount: 'SGD 60,000', eligibility: 90, deadline: 'Jun 20, 2026' },
  { id: 7, name: 'R&D Tax Incentive', country: 'au', category: 'Tax Credits', industry: 'CleanTech', stage: 'Series B', amount: 'AUD 45,000', eligibility: 87, deadline: 'Oct 15, 2026' },
  { id: 8, name: 'Startup India Seed Fund', country: 'in', category: 'Government Grants', industry: 'All', stage: 'Seed', amount: '₹50 L – ₹2 Cr', eligibility: 92, deadline: 'Rolling' },
  { id: 9, name: 'Y Combinator Continuity', country: 'us', category: 'Accelerator Funding', industry: 'SaaS', stage: 'Series A+', amount: '$500K – $2M', eligibility: 65, deadline: 'Rolling' },
  { id: 10, name: 'MEIS Export Incentive', country: 'in', category: 'Export Incentives', industry: 'D2C', stage: 'Series A', amount: '₹10 Lakhs', eligibility: 74, deadline: 'Dec 31, 2026' },
  { id: 11, name: 'EU Horizon Research Subsidy', country: 'uk', category: 'Research Subsidies', industry: 'AI/ML', stage: 'Series A+', amount: '€80,000', eligibility: 71, deadline: 'Nov 1, 2026' },
  { id: 12, name: 'Green Transition Grant', country: 'au', category: 'Sustainability Incentives', industry: 'CleanTech', stage: 'Series B', amount: 'AUD 120,000', eligibility: 89, deadline: 'Aug 30, 2026' },
  { id: 13, name: 'Digital India Transformation Grant', country: 'in', category: 'Digital Transformation Grants', industry: 'EdTech', stage: 'Seed', amount: '₹25 Lakhs', eligibility: 81, deadline: 'Sep 15, 2026' },
  { id: 14, name: 'Smart Nation Innovation Fund', country: 'sg', category: 'Innovation Programs', industry: 'FinTech', stage: 'Series A', amount: 'SGD 150,000', eligibility: 86, deadline: 'Jul 10, 2026' },
]

export function getCountryById(id) {
  return TAX_COUNTRIES.find((c) => c.id === id) || TAX_COUNTRIES[0]
}

const FX_TO_USD = { in: 0.012, us: 1, uk: 1.27, ca: 0.74, ae: 0.27, sg: 0.74, au: 0.66 }

const RUNWAY_EXTENSION = { all: 2.4, in: 2.1, us: 2.6, uk: 2.3, ca: 2.5, ae: 2.0, sg: 2.8, au: 2.2 }

export function formatUSD(value) {
  if (value >= 1e6) return `$${(value / 1e6).toFixed(1)}M`
  if (value >= 1e3) return `$${(value / 1e3).toFixed(0)}K`
  return `$${value.toLocaleString()}`
}

export function formatTaxCurrency(value, countryId) {
  if (countryId === 'all') return formatUSD(value)

  const abs = Math.abs(value)
  const sign = value < 0 ? '-' : ''

  switch (countryId) {
    case 'in':
      if (abs >= 1e7) return `${sign}₹ ${(abs / 1e7).toFixed(2)} Cr`
      if (abs >= 1e5) return `${sign}₹ ${(abs / 1e5).toFixed(2)} L`
      if (abs >= 1e3) return `${sign}₹ ${(abs / 1e3).toFixed(1)} K`
      return `${sign}₹ ${abs.toLocaleString('en-IN', { maximumFractionDigits: 0 })}`
    case 'us':
      return formatUSD(value)
    case 'uk':
      if (abs >= 1e6) return `${sign}£${(abs / 1e6).toFixed(2)}M`
      if (abs >= 1e3) return `${sign}£${(abs / 1e3).toFixed(0)}K`
      return `${sign}£${abs.toLocaleString('en-GB')}`
    case 'ca':
      if (abs >= 1e6) return `${sign}CAD ${(abs / 1e6).toFixed(2)}M`
      if (abs >= 1e3) return `${sign}CAD ${(abs / 1e3).toFixed(0)}K`
      return `${sign}CAD ${abs.toLocaleString()}`
    case 'ae':
      if (abs >= 1e6) return `${sign}AED ${(abs / 1e6).toFixed(2)}M`
      if (abs >= 1e3) return `${sign}AED ${(abs / 1e3).toFixed(0)}K`
      return `${sign}AED ${abs.toLocaleString()}`
    case 'sg':
      if (abs >= 1e6) return `${sign}SGD ${(abs / 1e6).toFixed(2)}M`
      if (abs >= 1e3) return `${sign}SGD ${(abs / 1e3).toFixed(0)}K`
      return `${sign}SGD ${abs.toLocaleString()}`
    case 'au':
      if (abs >= 1e6) return `${sign}AUD ${(abs / 1e6).toFixed(2)}M`
      if (abs >= 1e3) return `${sign}AUD ${(abs / 1e3).toFixed(0)}K`
      return `${sign}AUD ${abs.toLocaleString()}`
    default:
      return formatUSD(value)
  }
}

export function getStartupTaxSummary(countryId) {
  const programs = countryId === 'all' ? TAX_PROGRAMS : TAX_PROGRAMS.filter((p) => p.country === countryId)
  const funding = countryId === 'all' ? GLOBAL_FUNDING_PROGRAMS : GLOBAL_FUNDING_PROGRAMS.filter((p) => p.country === countryId)
  const deadlines = countryId === 'all'
    ? COMPLIANCE_CENTER.deadlines.length
    : COMPLIANCE_CENTER.deadlines.filter((d) => d.country === countryId).length

  const estimatedSavings = countryId === 'all'
    ? Math.round(TAX_PROGRAMS.reduce((sum, p) => sum + p.benefitValue * (FX_TO_USD[p.country] || 1), 0))
    : programs.reduce((sum, p) => sum + p.benefitValue, 0)

  return {
    estimatedSavings,
    eligiblePrograms: programs.length,
    runwayExtension: RUNWAY_EXTENSION[countryId] ?? RUNWAY_EXTENSION.all,
    fundingOpportunities: funding.length,
    upcomingDeadlines: deadlines,
  }
}

export function simulateCashImpact({ annualRevenue, annualExpenses, rdSpend, employeeCount, monthlyBurn, country }) {
  const rdRatio = rdSpend / Math.max(annualExpenses, 1)
  const countryMult = { in: 0.08, us: 0.12, uk: 0.11, ca: 0.14, ae: 0.09, sg: 0.10, au: 0.11 }[country] || 0.10
  const scaleFactor = Math.min(1.2, 0.6 + rdRatio * 2 + employeeCount / 200)

  const taxCredits = Math.round(annualRevenue * countryMult * scaleFactor * 0.35)
  const govFunding = Math.round(rdSpend * countryMult * scaleFactor * 0.55)
  const netBenefit = taxCredits + govFunding
  const runwayExtension = monthlyBurn > 0 ? +(netBenefit / monthlyBurn).toFixed(1) : 0

  return {
    taxCredits,
    govFunding,
    netBenefit,
    runwayExtension,
    chartData: [
      { label: 'Tax Credits', value: taxCredits, fill: '#3FA34D' },
      { label: 'Gov. Funding', value: govFunding, fill: '#66BB6A' },
      { label: 'Net Benefit', value: netBenefit, fill: '#2E7D32' },
    ],
    cashFlowImpact: [
      { month: 'M0', baseline: 16800000, withCredits: 16800000 },
      { month: 'M3', baseline: 13200000, withCredits: 13200000 + netBenefit * 0.3 },
      { month: 'M6', baseline: 9600000, withCredits: 9600000 + netBenefit * 0.65 },
      { month: 'M9', baseline: 6000000, withCredits: 6000000 + netBenefit * 0.9 },
      { month: 'M12', baseline: 2400000, withCredits: 2400000 + netBenefit },
    ],
  }
}
