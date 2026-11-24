import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

// Preview catalogue. Values are sample kcal per 100 g.
export const PRODUCT_CATALOG = {
  Apple: 52,
  Banana: 89,
  Bread: 265,
  Eggplant: 25,
  Milk: 61,
}

export const addProduct = createAsyncThunk('diary/addProduct', async (product) => {
  const name = Object.keys(PRODUCT_CATALOG).find(
    (item) => item.toLowerCase() === product.name.trim().toLowerCase(),
  )
  if (!name) throw new Error("Choose a product from the catalogue.")
  return {
    ...product,
    name,
    calories: Math.round(PRODUCT_CATALOG[name] * product.grams / 100),
    id: crypto.randomUUID(),
  }
})
export const deleteProduct = createAsyncThunk('diary/deleteProduct', async (id) => id)
const slice = createSlice({
  name: 'diary', initialState: { products: [], profile: null },
  reducers: {
    saveCalculation(state, action) {
      // Sample calculation response until the API supplies recommendations.
      state.profile = { foods: ['Flour products', 'Milk', 'Red meat', 'Smoked meats'], ...action.payload }
    },
  },
  extraReducers: (builder) => builder
    .addCase(addProduct.fulfilled, (state, action) => { state.products.push(action.payload) })
    .addCase(deleteProduct.fulfilled, (state, action) => { state.products = state.products.filter((item) => item.id !== action.payload) }),
})
export const { saveCalculation } = slice.actions
export default slice.reducer
