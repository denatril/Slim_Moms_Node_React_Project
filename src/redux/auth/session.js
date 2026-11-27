import { createAction } from '@reduxjs/toolkit'

export const sessionEnded = createAction('auth/sessionEnded')
const SESSION_KEY = 'slim-moms-session'

export function readSession() {
  try {
    const session = JSON.parse(sessionStorage.getItem(SESSION_KEY))
    if (typeof session?.token === 'string' && typeof session.user?.email === 'string') return session
  } catch { /* Storage may be unavailable. */ }
  return null
}

export function persistSession({ token, user }) {
  try {
    if (token) sessionStorage.setItem(SESSION_KEY, JSON.stringify({ token, user }))
    else sessionStorage.removeItem(SESSION_KEY)
  } catch { /* The current session still works in memory. */ }
}
