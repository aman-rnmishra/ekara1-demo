import { FileText, Download } from 'lucide-react'
import { PageTransition } from '../../components/ui/Animated'
import { Card, Button } from '../../components/ui/Shared'
import { REPORTS_INVESTOR } from '../../data/demoData'

export default function InvestorReports() {
  return (
    <PageTransition>
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold">Reports</h2>
          <p className="text-text-secondary mt-1">Portfolio summaries, board packs, and quarterly reviews</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {REPORTS_INVESTOR.map((report) => (
            <Card key={report.id} className="p-6">
              <FileText className="text-primary mb-3" size={28} />
              <h3 className="font-semibold">{report.name}</h3>
              <p className="text-sm text-text-secondary mt-1">{report.period} · {report.companies} companies</p>
              <Button variant="outline" className="mt-4 w-full text-xs" onClick={() => alert('Demo: PDF preview')}>
                <Download size={14} /> View Report
              </Button>
            </Card>
          ))}
        </div>

        <Card className="p-6">
          <h3 className="font-semibold mb-4">Interactive Report Preview</h3>
          <div className="bg-gray-100 rounded-lg p-6 min-h-[450px]">
            <div className="max-w-3xl mx-auto bg-white shadow-xl rounded-lg overflow-hidden">
              <div className="bg-primary text-white p-6">
                <h4 className="text-xl font-bold">Portfolio Summary — Q1 FY26</h4>
                <p className="text-white/80 text-sm mt-1">Ekara Capital Partners</p>
              </div>
              <div className="p-6 space-y-4">
                <div className="grid grid-cols-4 gap-4 text-center">
                  <div className="p-3 bg-primary-light rounded-lg"><p className="text-xs text-text-secondary">Value</p><p className="font-bold">₹ 45 Cr</p></div>
                  <div className="p-3 bg-primary-light rounded-lg"><p className="text-xs text-text-secondary">Growth</p><p className="font-bold text-primary">21%</p></div>
                  <div className="p-3 bg-primary-light rounded-lg"><p className="text-xs text-text-secondary">Health</p><p className="font-bold">84</p></div>
                  <div className="p-3 bg-primary-light rounded-lg"><p className="text-xs text-text-secondary">Companies</p><p className="font-bold">12</p></div>
                </div>
                <p className="text-sm text-text-secondary leading-relaxed">
                  Portfolio performance remained strong in Q1 with weighted average growth of 21%.
                  9 of 12 companies maintain Healthy status. Bazaarlyn and VidyaPath require active monitoring.
                </p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </PageTransition>
  )
}
