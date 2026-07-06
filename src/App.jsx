import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { ProtectedRoute, LoginRoute } from './routes/ProtectedRoute'
import { StartupLayout, InvestorLayout } from './layouts/DashboardLayouts'

import LandingPage from './pages/LandingPage'
import LoginPage from './pages/LoginPage'

import StartupDashboard from './pages/startup/StartupDashboard'
import FinancialUploads from './pages/startup/FinancialUploads'
import FinancialStatements from './pages/startup/FinancialStatements'
import MetricsPage from './pages/startup/MetricsPage'
import StartupAIInsights from './pages/startup/StartupAIInsights'
import StartupReports from './pages/startup/StartupReports'
import InvestorManagement from './pages/startup/InvestorManagement'
import GrantEligibility from './pages/startup/GrantEligibility'
import TaxCreditsIncentives from './pages/startup/TaxCreditsIncentives'
import StartupSettings from './pages/startup/StartupSettings'

import InvestorDashboard from './pages/investor/InvestorDashboard'
import CompaniesPage from './pages/investor/CompaniesPage'
import CompanyDetail from './pages/investor/CompanyDetail'
import InvestorReports from './pages/investor/InvestorReports'
import RiskCenter from './pages/investor/RiskCenter'
import InvestorAIInsights from './pages/investor/InvestorAIInsights'
import TaxEfficiency from './pages/investor/TaxEfficiency'
import InvestorSettings from './pages/investor/InvestorSettings'

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login/:role" element={<LoginRoute><LoginPage /></LoginRoute>} />

          <Route path="/startup" element={<ProtectedRoute role="startup"><StartupLayout><StartupDashboard /></StartupLayout></ProtectedRoute>} />
          <Route path="/startup/uploads" element={<ProtectedRoute role="startup"><StartupLayout><FinancialUploads /></StartupLayout></ProtectedRoute>} />
          <Route path="/startup/statements" element={<ProtectedRoute role="startup"><StartupLayout><FinancialStatements /></StartupLayout></ProtectedRoute>} />
          <Route path="/startup/metrics" element={<ProtectedRoute role="startup"><StartupLayout><MetricsPage /></StartupLayout></ProtectedRoute>} />
          <Route path="/startup/insights" element={<ProtectedRoute role="startup"><StartupLayout><StartupAIInsights /></StartupLayout></ProtectedRoute>} />
          <Route path="/startup/reports" element={<ProtectedRoute role="startup"><StartupLayout><StartupReports /></StartupLayout></ProtectedRoute>} />
          <Route path="/startup/investors" element={<ProtectedRoute role="startup"><StartupLayout><InvestorManagement /></StartupLayout></ProtectedRoute>} />
          <Route path="/startup/grants" element={<ProtectedRoute role="startup"><StartupLayout><GrantEligibility /></StartupLayout></ProtectedRoute>} />
          <Route path="/startup/tax-credits" element={<ProtectedRoute role="startup"><StartupLayout><TaxCreditsIncentives /></StartupLayout></ProtectedRoute>} />
          <Route path="/startup/settings" element={<ProtectedRoute role="startup"><StartupLayout><StartupSettings /></StartupLayout></ProtectedRoute>} />

          <Route path="/investor" element={<ProtectedRoute role="investor"><InvestorLayout><InvestorDashboard /></InvestorLayout></ProtectedRoute>} />
          <Route path="/investor/companies" element={<ProtectedRoute role="investor"><InvestorLayout><CompaniesPage /></InvestorLayout></ProtectedRoute>} />
          <Route path="/investor/companies/:id" element={<ProtectedRoute role="investor"><InvestorLayout><CompanyDetail /></InvestorLayout></ProtectedRoute>} />
          <Route path="/investor/reports" element={<ProtectedRoute role="investor"><InvestorLayout><InvestorReports /></InvestorLayout></ProtectedRoute>} />
          <Route path="/investor/risk" element={<ProtectedRoute role="investor"><InvestorLayout><RiskCenter /></InvestorLayout></ProtectedRoute>} />
          <Route path="/investor/tax-credits" element={<ProtectedRoute role="investor"><InvestorLayout><TaxEfficiency /></InvestorLayout></ProtectedRoute>} />
          <Route path="/investor/insights" element={<ProtectedRoute role="investor"><InvestorLayout><InvestorAIInsights /></InvestorLayout></ProtectedRoute>} />
          <Route path="/investor/settings" element={<ProtectedRoute role="investor"><InvestorLayout><InvestorSettings /></InvestorLayout></ProtectedRoute>} />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}
