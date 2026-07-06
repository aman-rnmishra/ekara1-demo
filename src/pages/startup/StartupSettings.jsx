import { PageTransition } from '../../components/ui/Animated'
import { Card, Button } from '../../components/ui/Shared'
import { STARTUP_COMPANY } from '../../data/demoData'

export default function StartupSettings() {
  return (
    <PageTransition>
      <div className="space-y-6 max-w-2xl">
        <div>
          <h2 className="text-2xl font-bold">Settings</h2>
          <p className="text-text-secondary mt-1">Manage your startup profile and preferences</p>
        </div>

        <Card className="p-6 space-y-4">
          <h3 className="font-semibold">Company Profile</h3>
          {[
            { label: 'Company Name', value: STARTUP_COMPANY.name },
            { label: 'Sector', value: STARTUP_COMPANY.sector },
            { label: 'Stage', value: STARTUP_COMPANY.stage },
            { label: 'Founded', value: STARTUP_COMPANY.founded },
            { label: 'Reporting Currency', value: 'INR (₹)' },
            { label: 'Fiscal Year', value: 'April – March' },
          ].map((field) => (
            <div key={field.label}>
              <label className="text-sm text-text-secondary">{field.label}</label>
              <input defaultValue={field.value} className="w-full mt-1 px-4 py-2.5 rounded-lg border border-border bg-gray-50" readOnly />
            </div>
          ))}
          <Button>Save Changes</Button>
        </Card>

        <Card className="p-6 space-y-4">
          <h3 className="font-semibold">Notifications</h3>
          {['Monthly report reminders', 'Investor activity alerts', 'Expert insight notifications', 'Grant eligibility updates'].map((n) => (
            <label key={n} className="flex items-center gap-3 text-sm">
              <input type="checkbox" defaultChecked className="accent-primary w-4 h-4" />
              {n}
            </label>
          ))}
        </Card>
      </div>
    </PageTransition>
  )
}
