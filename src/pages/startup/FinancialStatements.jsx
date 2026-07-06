import { useState } from 'react'
import { PageTransition } from '../../components/ui/Animated'
import { Card, TabGroup } from '../../components/ui/Shared'
import { getPLStatement, getBalanceSheet, getCashFlowStatement, getTrialBalance } from '../../data/demoData'
import { formatINR } from '../../utils/format'

const stmtTabs = [
  { id: 'pl', label: 'Profit & Loss' },
  { id: 'bs', label: 'Balance Sheet' },
  { id: 'cf', label: 'Cash Flow Statement' },
  { id: 'tb', label: 'Trial Balance' },
]

const periodTabs = [
  { id: 'monthly', label: 'Monthly' },
  { id: 'quarterly', label: 'Quarterly' },
  { id: 'annual', label: 'Annual' },
]

export default function FinancialStatements() {
  const [stmt, setStmt] = useState('pl')
  const [period, setPeriod] = useState('monthly')

  const pl = getPLStatement(period)
  const bs = getBalanceSheet()
  const cf = getCashFlowStatement(period)
  const tb = getTrialBalance()

  return (
    <PageTransition>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold">Financial Statements</h2>
            <p className="text-text-secondary mt-1">Interactive financial reports</p>
          </div>
          <TabGroup tabs={periodTabs} active={period} onChange={setPeriod} />
        </div>

        <TabGroup tabs={stmtTabs} active={stmt} onChange={setStmt} />

        <Card className="p-6 overflow-x-auto">
          {stmt === 'pl' && (
            <table className="w-full text-sm">
              <thead><tr className="border-b"><th className="text-left py-3 font-semibold">Line Item</th><th className="text-right py-3 font-semibold">Amount</th></tr></thead>
              <tbody>
                {pl.items.map((item) => (
                  <tr key={item.label} className={`border-b border-border/50 ${item.bold ? 'font-bold bg-primary-light/20' : ''}`}>
                    <td className="py-2.5 pl-2">{item.label}</td>
                    <td className="py-2.5 pr-2 text-right">{formatINR(Math.abs(item.value))}{item.value < 0 ? ' (Dr)' : ''}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {stmt === 'bs' && (
            <div className="grid md:grid-cols-3 gap-8">
              {['assets', 'liabilities', 'equity'].map((section) => (
                <div key={section}>
                  <h4 className="font-semibold capitalize mb-3 text-primary">{section}</h4>
                  <table className="w-full text-sm">
                    <tbody>
                      {bs[section].map((item) => (
                        <tr key={item.label} className={item.bold ? 'font-bold border-t-2' : 'border-b border-border/50'}>
                          <td className="py-2">{item.label}</td>
                          <td className="py-2 text-right">{formatINR(item.value)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ))}
            </div>
          )}

          {stmt === 'cf' && (
            <div className="max-w-md space-y-4">
              {[
                { label: 'Cash from Operations', value: cf.operating },
                { label: 'Cash from Investing', value: cf.investing },
                { label: 'Cash from Financing', value: cf.financing },
                { label: 'Net Change in Cash', value: cf.netChange, bold: true },
              ].map((row) => (
                <div key={row.label} className={`flex justify-between py-3 border-b ${row.bold ? 'font-bold text-lg' : ''}`}>
                  <span>{row.label}</span>
                  <span className={row.value < 0 ? 'text-red-500' : 'text-primary'}>{formatINR(row.value)}</span>
                </div>
              ))}
            </div>
          )}

          {stmt === 'tb' && (
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3">Account</th>
                  <th className="text-right py-3">Debit</th>
                  <th className="text-right py-3">Credit</th>
                </tr>
              </thead>
              <tbody>
                {tb.map((row) => (
                  <tr key={row.account} className="border-b border-border/50">
                    <td className="py-2.5">{row.account}</td>
                    <td className="py-2.5 text-right">{row.debit ? formatINR(row.debit) : '—'}</td>
                    <td className="py-2.5 text-right">{row.credit ? formatINR(row.credit) : '—'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </Card>
      </div>
    </PageTransition>
  )
}
