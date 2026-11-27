import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import { sessionEnded } from './auth/session'

const request = fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL || 'http://localhost:3000/api',
    prepareHeaders(headers, { getState }) {
      const token = getState().auth.token
      if (token) headers.set('authorization', 'Bearer ' + token)
      return headers
    },
  })

export const api = createApi({
  reducerPath: 'api',
  async baseQuery(args, context, options) {
    const token = context.getState().auth.token
    const result = await request(args, context, options)
    if (token && token === context.getState().auth.token &&
        (result.error?.status === 401 || (context.endpoint === 'logout' && !result.error))) {
      context.dispatch(sessionEnded())
      context.dispatch(api.util.resetApiState())
    }
    return result
  },
  tagTypes: ['Day', 'Profile'],
  endpoints: (build) => ({
    logout: build.mutation({ query: () => ({ url: 'auth/logout', method: 'POST' }) }),
    calculateCalories: build.mutation({
      query: body => ({ url: 'calories', method: 'POST', body }),
    }),
    login: build.mutation({ query: body => ({ url: 'auth/login', method: 'POST', body }) }),
    registerUser: build.mutation({ query: body => ({ url: 'auth/register', method: 'POST', body }) }),
    searchProducts: build.query({ query: search => ({ url: 'products', params: { search } }) }),
    day: build.query({
      query: date => 'diary/' + date,
      providesTags: (_, __, date) => [{ type: 'Day', id: date }],
    }),
    addEntry: build.mutation({
      query: ({ date, ...body }) => ({ url: 'diary/' + date + '/entries', method: 'POST', body }),
      invalidatesTags: (_, __, { date }) => [{ type: 'Day', id: date }],
    }),
    deleteEntry: build.mutation({
      query: ({ date, id }) => ({ url: 'diary/' + date + '/entries/' + id, method: 'DELETE' }),
      invalidatesTags: (_, __, { date }) => [{ type: 'Day', id: date }],
    }),
    profile: build.query({
      query: () => 'calories/private',
      providesTags: ['Profile'],
    }),
    saveProfile: build.mutation({
      query: body => ({ url: 'calories/private', method: 'POST', body }),
      invalidatesTags: ['Profile'],
    }),
  }),
})

export const apiError = error => error?.data?.message || 'Could not reach the API. Please try again.'
