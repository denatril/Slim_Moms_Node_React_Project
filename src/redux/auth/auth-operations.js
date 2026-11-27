import { createAsyncThunk } from '@reduxjs/toolkit'
import { api, apiError } from '../api'

function authOperation(type, endpoint) {
  return createAsyncThunk(type, async (credentials, { dispatch, rejectWithValue }) => {
    try {
      const result = await dispatch(endpoint.initiate(credentials, { track: false })).unwrap()
      dispatch(api.util.resetApiState())
      return result
    } catch (error) {
      return rejectWithValue(apiError(error))
    }
  })
}

export const logIn = authOperation('auth/login', api.endpoints.login)
export const register = authOperation('auth/register', api.endpoints.registerUser)
