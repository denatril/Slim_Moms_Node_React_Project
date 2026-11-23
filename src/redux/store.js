import { configureStore } from '@reduxjs/toolkit'
import diary from './diary'
export const store = configureStore({ reducer: { diary } })
