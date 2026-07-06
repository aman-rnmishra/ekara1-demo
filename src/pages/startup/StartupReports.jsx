import { FileText, Download } from 'lucide-react'
import { PageTransition } from '../../components/ui/Animated'
import { Card, Button, Badge } from '../../components/ui/Shared'
import { REPORTS_STARTUP, STARTUP_COMPANY } from '../../data/demoData'
import { motion } from 'framer-motion'

export default function StartupReports() {
  const handleExport = (format) => {
    alert(`Demo: ${format} export would be generated here.`)
  }

  return (
    <PageTransition>
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold">Reports Center</h2>
          <p className="text-text-secondary mt-1">Generate and share investor-ready reports</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {REPORTS_STARTUP.map((report, i) => (
            <motion.div key={report.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}>
              <Card className="p-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-primary-light text-primary">
                    <FileText size={24} />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold">{report.name}</h3>
                    <p className="text-sm text-text-secondary mt-1">{report.period} · {report.pages} pages</p>
                    <Badge variant="success" className="mt-2">Ready</Badge>
                  </div>
                </div>
                <div className="flex gap-2 mt-4">
                  <Button variant="outline" className="flex-1 text-xs py-2" onClick={() => handleExport('PDF')}>
                    <Download size={14} /> PDF
                  </Button>
                  <Button variant="outline" className="flex-1 text-xs py-2" onClick={() => handleExport('Excel')}>
                    <Download size={14} /> Excel
                  </Button>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        <Card className="p-6">
          <h3 className="font-semibold mb-4">Report Preview</h3>
          <div className="bg-gray-50 rounded-lg border border-border p-8 min-h-[400px]">
            <div className="max-w-2xl mx-auto bg-white shadow-lg rounded p-8 space-y-4">
              <div className="flex justify-between items-center border-b pb-4">
                <span className="font-bold text-primary">Ekara Financials</span>
                <span className="text-xs text-text-secondary">Monthly Investor Update — May 2026</span>
              </div>
              <h4 className="text-xl font-bold">{STARTUP_COMPANY.name}</h4>
              <div className="grid grid-cols-3 gap-4 text-center py-4">
                <div><p className="text-xs text-text-secondary">Revenue</p><p className="font-bold">₹ 1.85 Cr</p></div>
                <div><p className="text-xs text-text-secondary">Growth</p><p className="font-bold text-primary">+18%</p></div>
                <div><p className="text-xs text-text-secondary">Runway</p><p className="font-bold">14 mo</p></div>
              </div>
              <p className="text-sm text-text-secondary leading-relaxed">
                {STARTUP_COMPANY.name} delivered strong performance in May with 18% revenue growth driven by enterprise expansion.
                Burn rate improved 12% through infrastructure optimization. Cash runway extended to 14 months.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </PageTransition>
  )
}
