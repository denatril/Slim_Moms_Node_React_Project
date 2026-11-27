import { createReducer, isAnyOf } from '@reduxjs/toolkit'
import { api } from '../api'

const tracked = [api.endpoints.login, api.endpoints.registerUser, api.endpoints.logout,
  api.endpoints.saveProfile, api.endpoints.calculateCalories]

export const loader = createReducer({}, builder => {
  builder.addMatcher(isAnyOf(...tracked.map(endpoint => endpoint.matchPending)), (state, action) => {
    state[action.meta.requestId] = true
  }).addMatcher(isAnyOf(...tracked.flatMap(endpoint => [endpoint.matchFulfilled, endpoint.matchRejected])), (state, action) => {
    delete state[action.meta.requestId]
  })
})
