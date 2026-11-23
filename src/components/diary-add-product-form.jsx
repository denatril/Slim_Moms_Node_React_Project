import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addProduct, PRODUCT_CATALOG } from '../redux/diary'
export default function DiaryAddProductForm({ date, onAdded }) {
  const dispatch = useDispatch()
  const [name, setName] = useState('')
  const [grams, setGrams] = useState('')
  function submit(event) {
    event.preventDefault()
    if (!name.trim() || Number(grams) <= 0) return
    dispatch(addProduct({ date, name: name.trim(), grams: Number(grams) }))
    setName(''); setGrams(''); onAdded?.()
  }
  return <form className="diary-form" onSubmit={submit}>
    <label><span>Product name</span><input list="diary-product-options" value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter product name" required /></label>
    <datalist id="diary-product-options">
      {Object.keys(PRODUCT_CATALOG).map((product) => <option key={product} value={product} />)}
    </datalist>
    <label><span>Grams</span><input type="number" min="1" step="1" value={grams} onChange={(e) => setGrams(e.target.value)} placeholder="Grams" required /></label>
    <button type="submit" aria-label="Add product"><span className="diary-add-icon" aria-hidden="true">+</span><span className="diary-add-text" aria-hidden="true">Add</span></button>
  </form>
}
