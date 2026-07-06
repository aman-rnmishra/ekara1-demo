import { PageTransition } from '../../components/ui/Animated'
import { Card, Button } from '../../components/ui/Shared'

export default function InvestorSettings() {
  return (
    <PageTransition>
      <div className="space-y-6 max-w-2xl">
        <div>
          <h2 className="text-2xl font-bold">Settings</h2>
          <p className="text-text-secondary mt-1">Investor portal preferences</p>
        </div>

        <Card className="p-6 space-y-4">
          <h3 className="font-semibold">Fund Profile</h3>
          {[
            { label: 'Fund Name', value: 'Ekara Capital Partners' },
            { label: 'Fund Size', value: '₹ 150 Cr' },
            { label: 'Portfolio Companies', value: '12' },
            { label: 'Primary Contact', value: 'partners@ekara.org.in' },
          ].map((f) => (
            <div key={f.label}>
              <label className="text-sm text-text-secondary">{f.label}</label>
              <input defaultValue={f.value} readOnly className="w-full mt-1 px-4 py-2.5 rounded-lg border border-border bg-gray-50" />
            </div>
          ))}
        </Card>

        <Card className="p-6 space-y-4">
          <h3 className="font-semibold">Alert Preferences</h3>
          {['Runway below 6 months', 'Revenue decline alerts', 'New report submissions', 'Risk flag notifications'].map((a) => (
            <label key={a} className="flex items-center gap-3 text-sm">
              <input type="checkbox" defaultChecked className="accent-primary w-4 h-4" />
              {a}
            </label>
          ))}
          <Button>Save Preferences</Button>
        </Card>
      </div>
    </PageTransition>
  )
}
