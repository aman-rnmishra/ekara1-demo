import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import {
  DollarSign, FileCheck, Clock, Globe, Calendar,
  CheckCircle2, Circle, AlertCircle, FileWarning,
} from 'lucide-react'
import { PageTransition } from '../../components/ui/Animated'
import { Card, KPICard, Badge, TabGroup } from '../../components/ui/Shared'
import {
  TAX_COUNTRIES, TAX_PROGRAMS,
  TAX_TIMELINE_STEPS, COMPLIANCE_CENTER,
  GLOBAL_FUNDING_PROGRAMS, getCountryById, getStartupTaxSummary, formatTaxCurrency,
} from '../../data/taxCreditsData'

const FUNDING_CATEGORIES = ['all', ...new Set(GLOBAL_FUNDING_PROGRAMS.map((p) => p.category))]

function ScoreBar({ label, value, max = 100, color = 'bg-primary' }) {
  return (
    <div>
      <div className="flex justify-between text-xs mb-1">
        <span className="text-text-secondary">{label}</span>
        <span className="font-semibold">{typeof value === 'number' && max === 100 ? `${value}%` : value}</span>
      </div>
      <div className="w-full bg-gray-100 rounded-full h-2">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${Math.min(100, (value / max) * 100)}%` }}
          transition={{ duration: 0.6 }}
          className={`h-2 rounded-full ${color}`}
        />
      </div>
    </div>
  )
}

function ProgramCard({ program }) {
  const c = getCountryById(program.country)
  return (
    <Card className="p-5 h-full">
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex items-center gap-2">
          <span className="text-xl">{c.flag}</span>
          <div>
            <p className="text-xs text-text-secondary">{c.name}</p>
            <h4 className="font-semibold text-sm leading-snug">{program.name}</h4>
          </div>
        </div>
        <Badge variant={program.statusVariant}>{program.status}</Badge>
      </div>
      <div className="grid grid-cols-2 gap-3 mb-4 text-sm">
        <div>
          <p className="text-xs text-text-secondary">Estimated Benefit</p>
          <p className="font-bold text-primary">{program.benefit}</p>
        </div>
        <div>
          <p className="text-xs text-text-secondary">Eligibility</p>
          <p className="font-bold">{program.eligibility}%</p>
        </div>
      </div>
      <ScoreBar label="Eligibility Score" value={program.eligibility} />
      <div className="mt-3 space-y-2">
        <ScoreBar label="Approval Probability" value={program.approvalProbability} color="bg-emerald-500" />
      </div>
      <div className="mt-4 pt-3 border-t border-border grid grid-cols-2 gap-2 text-xs text-text-secondary">
        <span><strong className="text-text-primary">Funding:</strong> {program.funding}</span>
        <span><strong className="text-text-primary">Complexity:</strong> {program.complexity}</span>
        <span className="col-span-2"><strong className="text-text-primary">Processing:</strong> {program.processingTime}</span>
      </div>
    </Card>
  )
}

export default function TaxCreditsIncentives() {
  const [country, setCountry] = useState('all')
  const [fundingCategory, setFundingCategory] = useState('all')

  const summary = useMemo(() => getStartupTaxSummary(country), [country])

  const filteredPrograms = useMemo(() => {
    if (country === 'all') return TAX_PROGRAMS
    return TAX_PROGRAMS.filter((p) => p.country === country)
  }, [country])

  const filteredFunding = useMemo(() => {
    return GLOBAL_FUNDING_PROGRAMS.filter((p) => {
      const matchCountry = country === 'all' || p.country === country
      const matchCat = fundingCategory === 'all' || p.category === fundingCategory
      return matchCountry && matchCat
    })
  }, [country, fundingCategory])

  return (
    <PageTransition>
      <div className="space-y-8">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold">Tax Credits & Incentives</h2>
            <p className="text-text-secondary mt-1">
              Discover hidden capital through global tax credits, grants, and innovation funding
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {TAX_COUNTRIES.map((c) => (
              <button
                key={c.id}
                type="button"
                onClick={() => setCountry(c.id)}
                className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium border transition-colors ${
                  country === c.id
                    ? 'bg-primary text-white border-primary'
                    : 'bg-white border-border text-text-secondary hover:border-primary/40'
                }`}
              >
                <span>{c.flag}</span>
                <span className="hidden sm:inline">{c.name}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
          <KPICard compact title="Estimated Tax Savings" value={formatTaxCurrency(summary.estimatedSavings, country)} icon={DollarSign} delay={0} />
          <KPICard compact title="Eligible Programs" value={summary.eligiblePrograms} icon={FileCheck} delay={0.05} />
          <KPICard compact title="Runway Extension" value={`${summary.runwayExtension} mo`} icon={Clock} delay={0.1} trend="up" />
          <KPICard compact title="Funding Opportunities" value={summary.fundingOpportunities} icon={Globe} delay={0.15} />
          <KPICard compact title="Upcoming Deadlines" value={`${summary.upcomingDeadlines} Due`} icon={Calendar} delay={0.2} />
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">Tax Credit Discovery Engine</h3>
          <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
            {filteredPrograms.map((p, i) => (
              <motion.div key={p.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
                <ProgramCard program={p} />
              </motion.div>
            ))}
          </div>
        </div>

        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-6">Tax Credit Timeline</h3>
          <div className="relative">
            <div className="hidden sm:block absolute top-5 left-0 right-0 h-0.5 bg-gray-200" />
            <div className="grid sm:grid-cols-6 gap-4">
              {TAX_TIMELINE_STEPS.map((step) => (
                <div key={step.id} className="relative flex sm:flex-col items-center sm:text-center gap-3 sm:gap-2">
                  <div className={`relative z-10 w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
                    step.status === 'complete' ? 'bg-primary text-white'
                      : step.status === 'active' ? 'bg-primary-light text-primary border-2 border-primary'
                        : 'bg-gray-100 text-text-secondary'
                  }`}>
                    {step.status === 'complete' ? <CheckCircle2 size={18} /> : step.status === 'active' ? <Circle size={18} className="fill-primary" /> : <Circle size={18} />}
                  </div>
                  <div>
                    <p className="text-sm font-semibold">{step.label}</p>
                    <p className="text-xs text-text-secondary">{step.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>

        <div className="grid lg:grid-cols-2 gap-6">
          <Card className="p-6">
            <h3 className="font-semibold mb-4 flex items-center gap-2"><Calendar size={16} className="text-primary" /> Upcoming Filing Deadlines</h3>
            <div className="space-y-3">
              {COMPLIANCE_CENTER.deadlines.map((d) => (
                <div key={d.id} className="flex items-center justify-between p-3 rounded-lg bg-gray-50">
                  <div>
                    <p className="text-sm font-medium">{d.title}</p>
                    <p className="text-xs text-text-secondary">{d.date}</p>
                  </div>
                  <Badge variant={d.daysLeft <= 14 ? 'danger' : 'warning'}>{d.daysLeft}d left</Badge>
                </div>
              ))}
            </div>
          </Card>
          <Card className="p-6">
            <h3 className="font-semibold mb-4 flex items-center gap-2"><FileWarning size={16} className="text-amber-500" /> Missing Documents</h3>
            <div className="space-y-3">
              {COMPLIANCE_CENTER.missingDocs.map((d) => (
                <div key={d.id} className="p-3 rounded-lg border border-amber-100 bg-amber-50/50">
                  <p className="text-sm font-medium">{d.doc}</p>
                  <p className="text-xs text-text-secondary mt-0.5">{d.program}</p>
                </div>
              ))}
            </div>
          </Card>
          <Card className="p-6">
            <h3 className="font-semibold mb-4 flex items-center gap-2"><AlertCircle size={16} className="text-primary" /> Application Status</h3>
            <div className="space-y-4">
              {COMPLIANCE_CENTER.applications.map((a) => (
                <div key={a.id}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="font-medium">{a.program}</span>
                    <Badge variant="default">{a.status}</Badge>
                  </div>
                  <ScoreBar label="Progress" value={a.progress} />
                </div>
              ))}
            </div>
          </Card>
          <Card className="p-6">
            <h3 className="font-semibold mb-4 flex items-center gap-2"><FileCheck size={16} className="text-primary" /> Tax Credit History</h3>
            <div className="space-y-3">
              {COMPLIANCE_CENTER.history.map((h) => (
                <div key={h.id} className="flex items-center justify-between py-2 border-b border-border/50 last:border-0">
                  <div>
                    <p className="text-sm font-medium">{h.program}</p>
                    <p className="text-xs text-text-secondary">{h.date}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-primary">{h.amount}</p>
                    <Badge variant="success">{h.status}</Badge>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        <Card className="p-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <h3 className="text-lg font-semibold">Global Funding Intelligence Center</h3>
              <p className="text-sm text-text-secondary mt-1">Tax credits, grants, innovation programs & subsidies worldwide</p>
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
                  <th className="py-3 px-3 font-semibold text-text-secondary">Amount</th>
                  <th className="py-3 px-3 font-semibold text-text-secondary">Eligibility</th>
                  <th className="py-3 px-3 font-semibold text-text-secondary">Deadline</th>
                </tr>
              </thead>
              <tbody>
                {filteredFunding.map((p) => {
                  const c = getCountryById(p.country)
                  return (
                    <tr key={p.id} className="border-b border-border/50 hover:bg-primary-light/20">
                      <td className="py-3 px-3 font-medium">{p.name}</td>
                      <td className="py-3 px-3">{c.flag} {c.name}</td>
                      <td className="py-3 px-3"><Badge variant="default">{p.category}</Badge></td>
                      <td className="py-3 px-3 text-text-secondary">{p.industry}</td>
                      <td className="py-3 px-3 text-text-secondary">{p.stage}</td>
                      <td className="py-3 px-3 font-semibold text-primary">{p.amount}</td>
                      <td className="py-3 px-3">
                        <span className={`font-semibold ${p.eligibility >= 85 ? 'text-primary' : p.eligibility >= 70 ? 'text-amber-600' : 'text-text-secondary'}`}>
                          {p.eligibility}%
                        </span>
                      </td>
                      <td className="py-3 px-3 text-text-secondary">{p.deadline}</td>
                    </tr>
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
