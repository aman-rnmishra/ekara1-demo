import { useState, useEffect, useCallback } from 'react'
import { AUTH_STORAGE_KEY, DEMO_CREDENTIALS } from '../utils/constants'

function readStoredAuth() {
  try {
    const raw = localStorage.getItem(AUTH_STORAGE_KEY)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

export function useAuth() {
  const [user, setUser] = useState(() => readStoredAuth())

  useEffect(() => {
    if (user) {
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user))
    } else {
      localStorage.removeItem(AUTH_STORAGE_KEY)
    }
  }, [user])

  const login = useCallback((email, password, role) => {
    const creds = DEMO_CREDENTIALS[role]
    if (email === creds.email && password === creds.password) {
      const session = { email, role, name: role === 'startup' ? 'Mishutt Tech Solutions' : 'Ekara Capital Partners' }
      setUser(session)
      return { success: true }
    }
    return { success: false, error: 'Invalid credentials' }
  }, [])

  const logout = useCallback(() => setUser(null), [])

  return { user, login, logout, isStartup: user?.role === 'startup', isInvestor: user?.role === 'investor' }
}
