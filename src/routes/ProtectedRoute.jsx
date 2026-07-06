import { Navigate, useLocation, useParams } from 'react-router-dom'
import { useEffect } from 'react'
import { useAuth } from '../context/AuthContext'

export function ProtectedRoute({ children, role }) {
  const { user } = useAuth()
  const location = useLocation()

  if (!user) {
    return <Navigate to={`/login/${role}`} state={{ from: location }} replace />
  }
  if (user.role !== role) {
    return <Navigate to={user.role === 'startup' ? '/startup' : '/investor'} replace />
  }
  return children
}

export function LoginRoute({ children }) {
  const { role } = useParams()
  const { user, logout } = useAuth()

  useEffect(() => {
    if (user && user.role !== role) {
      logout()
    }
  }, [role]) // eslint-disable-line react-hooks/exhaustive-deps

  if (user?.role === role) {
    return <Navigate to={role === 'startup' ? '/startup' : '/investor'} replace />
  }

  return children
}
