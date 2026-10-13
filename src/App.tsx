import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Layout from '@components/Layout'
import LoginPage from '@pages/LoginPage'
import DashboardPage from '@pages/DashboardPage'
import BooksPage from '@pages/BooksPage'
import MembersPage from '@pages/MembersPage'
import LoansPage from '@pages/LoansPage'
import OverduePage from '@pages/OverduePage'
import ReportPage from '@pages/ReportPage'
import { useAuthStore } from '@hooks/useAuthStore'

function App() {
  const { isAuthenticated } = useAuthStore()

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        
        {isAuthenticated ? (
          <Route path="/" element={<Layout />}>
            <Route index element={<DashboardPage />} />
            <Route path="books" element={<BooksPage />} />
            <Route path="members" element={<MembersPage />} />
            <Route path="loans" element={<LoansPage />} />
            <Route path="overdue" element={<OverduePage />} />
            <Route path="report" element={<ReportPage />} />
          </Route>
        ) : (
          <Route path="*" element={<Navigate to="/login" replace />} />
        )}
      </Routes>
    </Router>
  )
}

export default App