import { useState } from 'react'
import {
  Bar, CartesianGrid, ComposedChart, Legend, Line, ResponsiveContainer, Tooltip, XAxis, YAxis,
} from 'recharts'
import { Factory, ClipboardCheck, PackageCheck, CalendarClock, Boxes } from 'lucide-react'
import { PageTransition } from '../../components/ui/Animated'
import { Badge, Card, KPICard, TabGroup } from '../../components/ui/Shared'
import { ChartPanel } from '../../components/ui/ChartPanel'
import { PROJECT_KPIS, PROJECT_MONTHLY, PROJECT_NOTES, PROJECT_PLANS, PROJECT_SOURCE } from '../../data/projectManagementData'
import { CHART_COLORS } from '../../utils/constants'

const views = [
  { id: 'all', label: 'All lines' },
  { id: 'behind', label: 'Behind plan' },
  { id: 'risk', label: 'At risk' },
]

const statusVariant = {
  'On Track': 'success',
  Ahead: 'success',
  Behind: 'warning',
  'At Risk': 'danger',
}

function units(value) {
  return value.toLocaleString('en-IN')
}

function pct(part, whole) {
  if (!whole) return 0
  return Math.round((part / whole) * 100)
}

export default function ProjectManagement() {
  const [view, setView] = useState('all')

  const fulfilment = pct(PROJECT_KPIS.producedUnits, PROJECT_KPIS.plannedUnits)
  const bookingCover = pct(PROJECT_KPIS.producedUnits, PROJECT_KPIS.bookedUnits)
  const gap = PROJECT_KPIS.bookedUnits - PROJECT_KPIS.producedUnits

  const rows = PROJECT_PLANS.filter((project) => {
    if (view === 'behind') return project.produced < project.planned * 0.9
    if (view === 'risk') return project.status === 'At Risk' || project.bookings > project.produced * 1.15
    return true
  })

  return (
    <PageTransition>
      <div className="space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
          <div>
            <h2 className="text-2xl font-bold">Project Management</h2>
            <p className="text-text-secondary mt-1">
              Production, bookings, and plan — sourced from the factory CRM, not Tally or Zoho.
            </p>
          </div>
          <span className="inline-flex items-center gap-2 text-xs font-medium text-primary-dark bg-primary-light px-3 py-1.5 rounded-full w-fit">
            <Factory size={14} /> {PROJECT_SOURCE}
          </span>
        </div>

        <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-4">
          <KPICard title="Planned output" value={units(PROJECT_KPIS.plannedUnits)} subtitle="Units on the project plan" icon={ClipboardCheck} />
          <KPICard title="Produced" value={units(PROJECT_KPIS.producedUnits)} subtitle={`${fulfilment}% of plan completed`} icon={PackageCheck} trend={fulfilment >= 85 ? 'up' : 'down'} />
          <KPICard title="Bookings" value={units(PROJECT_KPIS.bookedUnits)} subtitle={`${PROJECT_KPIS.openOrders} open orders`} icon={CalendarClock} />
          <KPICard title="Booked vs built" value={`${bookingCover}%`} subtitle={`${units(gap)} units still to build`} icon={Boxes} trend={bookingCover >= 90 ? 'up' : 'down'} />
        </div>

        <Card className="p-6">
          <div className="mb-4">
            <h3 className="text-lg font-semibold">Planned vs produced vs bookings</h3>
            <p className="text-sm text-text-secondary mt-1">Monthly factory output against the plan and confirmed CRM bookings.</p>
          </div>
          <ChartPanel chartKey="project-throughput">
            <ResponsiveContainer width="100%" height={300}>
              <ComposedChart data={PROJECT_MONTHLY}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 11 }} width={48} />
                <Tooltip contentStyle={{ borderRadius: 8, border: '1px solid #E5E7EB', fontSize: 12 }} />
                <Legend />
                <Bar dataKey="planned" name="Planned" fill="#E5E7EB" radius={[4, 4, 0, 0]} />
                <Bar dataKey="produced" name="Produced" fill={CHART_COLORS.primary} radius={[4, 4, 0, 0]} />
                <Line type="monotone" dataKey="bookings" name="Bookings" stroke={CHART_COLORS.warning} strokeWidth={2} dot={false} />
              </ComposedChart>
            </ResponsiveContainer>
          </ChartPanel>
        </Card>

        <div className="grid lg:grid-cols-3 gap-6">
          <Card className="p-6 lg:col-span-2">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
              <div>
                <h3 className="text-lg font-semibold">Project plan</h3>
                <p className="text-sm text-text-secondary mt-1">Each line has an owner. Progress is units built against the plan.</p>
              </div>
              <TabGroup tabs={views} active={view} onChange={setView} />
            </div>
            <div className="space-y-4">
              {rows.map((project) => {
                const built = pct(project.produced, project.planned)
                return (
                  <div key={project.id} className="border border-border rounded-xl p-4">
                    <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
                      <div>
                        <p className="font-semibold text-text-primary">{project.name}</p>
                        <p className="text-xs text-text-secondary mt-0.5">{project.line} · Owner {project.owner} · Due {project.due}</p>
                      </div>
                      <Badge variant={statusVariant[project.status] || 'default'}>{project.status}</Badge>
                    </div>
                    <div className="h-2 rounded-full bg-gray-100 overflow-hidden mb-2">
                      <div className="h-full bg-primary rounded-full" style={{ width: `${Math.min(built, 100)}%` }} />
                    </div>
                    <div className="grid grid-cols-3 gap-2 text-xs text-text-secondary">
                      <span>Planned <strong className="text-text-primary">{units(project.planned)}</strong></span>
                      <span>Produced <strong className="text-text-primary">{units(project.produced)}</strong></span>
                      <span>Booked <strong className="text-text-primary">{units(project.bookings)}</strong></span>
                    </div>
                  </div>
                )
              })}
            </div>
          </Card>

          <div className="space-y-3">
            <h3 className="text-lg font-semibold">Shop-floor notes</h3>
            {PROJECT_NOTES.map((note) => (
              <div
                key={note.id}
                className={`border-l-4 rounded-xl p-4 ${
                  note.severity === 'positive' ? 'border-l-primary bg-primary-light/50'
                    : note.severity === 'critical' ? 'border-l-red-500 bg-red-50'
                      : 'border-l-amber-500 bg-amber-50'
                }`}
              >
                <p className="font-semibold text-sm">{note.title}</p>
                <p className="text-sm text-text-secondary mt-1">{note.message}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </PageTransition>
  )
}
