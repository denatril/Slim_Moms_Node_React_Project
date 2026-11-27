import { useState } from 'react'
import { api, apiError } from '../redux/api'
export default function DiaryAddProductForm({ date, onAdded }) {
  const [addEntry, { isLoading }] = api.useAddEntryMutation()
  const [name, setName] = useState('')
  const [grams, setGrams] = useState('')
  const [error, setError] = useState('')
  const { currentData: options = [], error: searchError } = api.useSearchProductsQuery(name.trim(), { skip: !name.trim() })
  async function submit(event) {
    event.preventDefault()
    const product = options.find(item => item.name === name)
    if (!product) return setError('Select a product from the search results.')
    try {
      await addEntry({ date, productId: product.id, grams: Number(grams) }).unwrap()
    } catch (reason) {
      setError(apiError(reason))
      return
    }
    setName('')
    setGrams('')
    setError('')
    onAdded?.()
  }
  return <form className="diary-form" onSubmit={submit}>
    <label><span>Product name</span><input list="diary-product-options" value={name} aria-invalid={Boolean(error)} aria-describedby={error ? 'product-error' : undefined} onChange={(e) => { setName(e.target.value); setError('') }} placeholder="Enter product name" required />{error && <small id="product-error" role="alert">{error}</small>}</label>
    <datalist id="diary-product-options">
      {options.map((product) => <option key={product.id} value={product.name} />)}
    </datalist>
    <label><span>Grams</span><input type="number" min="1" step="1" value={grams} onChange={(e) => setGrams(e.target.value)} placeholder="Grams" required /></label>
    {searchError && <small role="alert">{apiError(searchError)}</small>}
    <button disabled={isLoading} type="submit" aria-label="Add product"><span className="diary-add-icon" aria-hidden="true">+</span><span className="diary-add-text" aria-hidden="true">Add</span></button>
  </form>
}
