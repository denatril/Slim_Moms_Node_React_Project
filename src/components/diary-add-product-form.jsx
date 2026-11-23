import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addProduct, PRODUCT_CATALOG } from '../redux/diary'
export default function DiaryAddProductForm({ date, onAdded }) {
  const dispatch = useDispatch()
  const [name, setName] = useState('')
  const [grams, setGrams] = useState('')
  const [error, setError] = useState('')
  async function submit(event) {
    event.preventDefault()
    const result = await dispatch(addProduct({ date, name, grams: Number(grams) }))
    if (addProduct.rejected.match(result)) {
      setError(result.error.message)
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
      {Object.keys(PRODUCT_CATALOG).map((product) => <option key={product} value={product} />)}
    </datalist>
    <label><span>Grams</span><input type="number" min="1" step="1" value={grams} onChange={(e) => setGrams(e.target.value)} placeholder="Grams" required /></label>
    <button type="submit" aria-label="Add product"><span className="diary-add-icon" aria-hidden="true">+</span><span className="diary-add-text" aria-hidden="true">Add</span></button>
  </form>
}
