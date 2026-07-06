import { useState } from 'react'
import { Upload, FileSpreadsheet, CheckCircle, Clock } from 'lucide-react'
import { PageTransition } from '../../components/ui/Animated'
import { Card, Button, Badge } from '../../components/ui/Shared'
import { motion } from 'framer-motion'

const uploads = [
  { name: 'P&L Statement — May 2026.xlsx', type: 'Profit & Loss', date: 'Jun 1, 2026', status: 'Processed' },
  { name: 'Balance Sheet — Q1 FY26.xlsx', type: 'Balance Sheet', date: 'May 28, 2026', status: 'Processed' },
  { name: 'Bank Statement — May 2026.csv', type: 'Bank Statement', date: 'Jun 2, 2026', status: 'Processing' },
  { name: 'Trial Balance — May 2026.xlsx', type: 'Trial Balance', date: 'May 15, 2026', status: 'Processed' },
]

export default function FinancialUploads() {
  const [dragging, setDragging] = useState(false)

  return (
    <PageTransition>
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold">Financial Uploads</h2>
          <p className="text-text-secondary mt-1">Upload accounting data to generate insights</p>
        </div>

        <motion.div
          onDragOver={(e) => { e.preventDefault(); setDragging(true) }}
          onDragLeave={() => setDragging(false)}
          onDrop={(e) => { e.preventDefault(); setDragging(false) }}
          animate={{ borderColor: dragging ? '#3FA34D' : '#E5E7EB', backgroundColor: dragging ? '#EAF7EE' : '#FFFFFF' }}
          className="border-2 border-dashed rounded-2xl p-12 text-center"
        >
          <Upload size={40} className="mx-auto text-primary mb-4" />
          <h3 className="text-lg font-semibold mb-2">Drag & drop financial files</h3>
          <p className="text-text-secondary text-sm mb-4">Supports Excel, CSV, PDF — P&L, Balance Sheet, Cash Flow, Trial Balance</p>
          <Button><FileSpreadsheet size={18} /> Browse Files</Button>
        </motion.div>

        <Card className="p-6">
          <h3 className="font-semibold mb-4">Recent Uploads</h3>
          <div className="space-y-3">
            {uploads.map((file, i) => (
              <motion.div
                key={file.name}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className="flex items-center justify-between p-4 rounded-lg border border-border hover:bg-gray-50"
              >
                <div className="flex items-center gap-3">
                  <FileSpreadsheet className="text-primary" size={20} />
                  <div>
                    <p className="font-medium text-sm">{file.name}</p>
                    <p className="text-xs text-text-secondary">{file.type} · {file.date}</p>
                  </div>
                </div>
                <Badge variant={file.status === 'Processed' ? 'success' : 'warning'}>
                  {file.status === 'Processed' ? <CheckCircle size={12} className="inline mr-1" /> : <Clock size={12} className="inline mr-1" />}
                  {file.status}
                </Badge>
              </motion.div>
            ))}
          </div>
        </Card>
      </div>
    </PageTransition>
  )
}
