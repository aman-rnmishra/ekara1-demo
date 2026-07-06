import { useState } from 'react'
import { PageTransition } from '../../components/ui/Animated'
import { Card, Button, Badge } from '../../components/ui/Shared'
import { GRANTS } from '../../data/demoData'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, FileCheck } from 'lucide-react'

export default function GrantEligibility() {
  const [selected, setSelected] = useState(null)

  return (
    <PageTransition>
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold">Grant Eligibility Center</h2>
          <p className="text-text-secondary mt-1">Discover and apply for government & private grants</p>
        </div>

        <div className="grid gap-4">
          {GRANTS.map((grant, i) => (
            <motion.div key={grant.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}>
              <Card className="p-6">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-semibold text-lg">{grant.name}</h3>
                      <Badge variant={grant.score >= 85 ? 'success' : grant.score >= 75 ? 'warning' : 'default'}>
                        Score: {grant.score}%
                      </Badge>
                    </div>
                    <p className="text-sm text-text-secondary">{grant.desc}</p>
                    <div className="flex flex-wrap gap-4 mt-3 text-sm">
                      <span><strong>Funding:</strong> {grant.amount}</span>
                      <span><strong>Timeline:</strong> {grant.timeline}</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" onClick={() => setSelected(selected === grant.id ? null : grant.id)}>
                      View Details <ChevronDown size={16} className={`transition-transform ${selected === grant.id ? 'rotate-180' : ''}`} />
                    </Button>
                    <Button>Apply</Button>
                  </div>
                </div>

                <AnimatePresence>
                  {selected === grant.id && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                      <div className="mt-4 pt-4 border-t border-border">
                        <h4 className="font-semibold text-sm mb-2 flex items-center gap-2"><FileCheck size={16} /> Required Documents</h4>
                        <ul className="grid sm:grid-cols-2 gap-2">
                          {grant.docs.map((doc) => (
                            <li key={doc} className="text-sm text-text-secondary flex items-center gap-2">
                              <span className="w-1.5 h-1.5 rounded-full bg-primary" /> {doc}
                            </li>
                          ))}
                        </ul>
                        <div className="mt-3 w-full bg-gray-100 rounded-full h-2">
                          <div className="bg-primary h-2 rounded-full transition-all" style={{ width: `${grant.score}%` }} />
                        </div>
                        <p className="text-xs text-text-secondary mt-1">Eligibility match: {grant.score}%</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </PageTransition>
  )
}
