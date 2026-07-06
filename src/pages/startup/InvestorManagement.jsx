import { useState } from 'react'
import { UserPlus, Share2, Activity, Mail } from 'lucide-react'
import { PageTransition } from '../../components/ui/Animated'
import { Card, Button, Badge, DataTable } from '../../components/ui/Shared'
import { MOCK_INVESTORS } from '../../data/demoData'

export default function InvestorManagement() {
  const [showInvite, setShowInvite] = useState(false)

  const columns = [
    { key: 'name', label: 'Investor', render: (r) => (
      <div>
        <p className="font-medium">{r.name}</p>
        <p className="text-xs text-text-secondary">{r.email}</p>
      </div>
    )},
    { key: 'permission', label: 'Permission', render: (r) => <Badge variant="success">{r.permission}</Badge> },
    { key: 'reportsShared', label: 'Reports Shared' },
    { key: 'lastActive', label: 'Last Active', render: (r) => (
      <span className="flex items-center gap-1 text-text-secondary text-xs"><Activity size={12} /> {r.lastActive}</span>
    )},
    { key: 'actions', label: 'Actions', render: () => (
      <div className="flex gap-2">
        <button type="button" className="text-primary text-xs font-medium hover:underline">Share</button>
        <button type="button" className="text-text-secondary text-xs hover:underline">Edit</button>
      </div>
    )},
  ]

  return (
    <PageTransition>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold">Investor Management</h2>
            <p className="text-text-secondary mt-1">Invite, manage permissions, and track activity</p>
          </div>
          <Button onClick={() => setShowInvite(!showInvite)}><UserPlus size={18} /> Invite Investor</Button>
        </div>

        {showInvite && (
          <Card className="p-6">
            <h3 className="font-semibold mb-4">Invite New Investor</h3>
            <div className="grid sm:grid-cols-2 gap-4">
              <input placeholder="Investor name" className="px-4 py-2.5 rounded-lg border border-border" />
              <input placeholder="Email address" type="email" className="px-4 py-2.5 rounded-lg border border-border" />
              <select className="px-4 py-2.5 rounded-lg border border-border sm:col-span-2">
                <option>Full Access</option>
                <option>Reports Only</option>
                <option>Metrics Only</option>
              </select>
            </div>
            <Button className="mt-4"><Mail size={16} /> Send Invitation</Button>
          </Card>
        )}

        <Card className="p-6">
          <DataTable columns={columns} data={MOCK_INVESTORS} />
        </Card>

        <div className="grid sm:grid-cols-3 gap-4">
          {[
            { icon: UserPlus, title: 'Invite Investors', desc: 'Send secure portal invitations' },
            { icon: Share2, title: 'Share Reports', desc: 'One-click report distribution' },
            { icon: Activity, title: 'Track Activity', desc: 'Monitor investor engagement' },
          ].map(({ icon: Icon, title, desc }) => (
            <Card key={title} className="p-5 text-center">
              <Icon className="mx-auto text-primary mb-2" size={24} />
              <h4 className="font-semibold text-sm">{title}</h4>
              <p className="text-xs text-text-secondary mt-1">{desc}</p>
            </Card>
          ))}
        </div>
      </div>
    </PageTransition>
  )
}
