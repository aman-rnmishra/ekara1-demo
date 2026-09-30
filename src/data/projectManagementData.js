/** Factory CRM operations data — not Tally / Zoho finance. Units are physical output. */

export const PROJECT_SOURCE = 'Factory CRM'

export const PROJECT_KPIS = {
  plannedUnits: 18400,
  producedUnits: 15120,
  bookedUnits: 16850,
  openOrders: 26,
}

export const PROJECT_MONTHLY = [
  { month: 'Apr', planned: 2600, produced: 2410, bookings: 2550 },
  { month: 'May', planned: 2800, produced: 2680, bookings: 2920 },
  { month: 'Jun', planned: 3000, produced: 2740, bookings: 3100 },
  { month: 'Jul', planned: 3100, produced: 2520, bookings: 2860 },
  { month: 'Aug', planned: 3400, produced: 2410, bookings: 2720 },
  { month: 'Sep', planned: 3500, produced: 2360, bookings: 2700 },
]

export const PROJECT_PLANS = [
  {
    id: 'nexcell',
    name: 'NexCell Battery Pack',
    line: 'Line A · Bokaro',
    owner: 'Ravi Menon',
    planned: 6200,
    produced: 5480,
    bookings: 5900,
    status: 'On Track',
    due: 'Oct 2026',
  },
  {
    id: 'voltbay',
    name: 'VoltBay Enclosure',
    line: 'Line B · Bokaro',
    owner: 'Anjali Deshmukh',
    planned: 4100,
    produced: 2980,
    bookings: 3720,
    status: 'Behind',
    due: 'Nov 2026',
  },
  {
    id: 'gridloom',
    name: 'GridLoom Inverter Kit',
    line: 'Line C · Ludhiana',
    owner: 'Karan Sethi',
    planned: 3600,
    produced: 3410,
    bookings: 3180,
    status: 'Ahead',
    due: 'Sep 2026',
  },
  {
    id: 'auracell',
    name: 'AuraCell Cooling Module',
    line: 'Line A · Bokaro',
    owner: 'Meera Iyer',
    planned: 2500,
    produced: 1680,
    bookings: 2410,
    status: 'At Risk',
    due: 'Dec 2026',
  },
  {
    id: 'haulyn',
    name: 'Haulyn Harness Assembly',
    line: 'Line D · Ludhiana',
    owner: 'Dev Patel',
    planned: 2000,
    produced: 1570,
    bookings: 1640,
    status: 'Behind',
    due: 'Oct 2026',
  },
]

export const PROJECT_NOTES = [
  {
    id: 1,
    severity: 'warning',
    title: 'Bookings ahead of output',
    message: 'Confirmed orders sit 1,730 units above production completed. Line B and the cooling module are the gap.',
  },
  {
    id: 2,
    severity: 'critical',
    title: 'AuraCell short of plan',
    message: 'Only 67% of the AuraCell plan is built, while 96% is already booked. Owner: Meera Iyer.',
  },
  {
    id: 3,
    severity: 'positive',
    title: 'GridLoom ahead of schedule',
    message: 'Line C has produced 95% of plan with bookings still open. Capacity can absorb spillover from Line B.',
  },
]
