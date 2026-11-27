import { loader } from './loader/loader-slice'
import { persistSession } from './auth/session'
import { configureStore } from '@reduxjs/toolkit'
import { authReducer } from './auth/auth-slice'
import { api } from './api'

export const store = configureStore({
  reducer: { loader, auth: authReducer, [api.reducerPath]: api.reducer },
  middleware: defaults => defaults().concat(api.middleware),
})

let previousToken = store.getState().auth.token
store.subscribe(() => {
  const auth = store.getState().auth
  if (auth.token !== previousToken) {
    previousToken = auth.token
    persistSession(auth)
  }
})
