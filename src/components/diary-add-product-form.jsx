import { useState } from 'react'
import { api, apiError } from '../redux/api'
export default function DiaryAddProductForm({ date, onAdded }) {
  const [addEntry, { isLoading }] = api.useAddEntryMutation()
  const [name, setName] = useState('')
  const [grams, setGrams] = useState('')
  const [error, setError] = useState('')
  const [open, setOpen] = useState(false)
  const [selected, setSelected] = useState(null)
  const [active, setActive] = useState(-1)
  const { isFetching, currentData: options = [], error: searchError } = api.useSearchProductsQuery(name.trim(), { skip: !name.trim() })
  const showResults = open && Boolean(name.trim())

  function choose(product) {
    setSelected(product)
    setName(product.name)
    setOpen(false)
    setActive(-1)
    setError('')
  }

  function navigate(event) {
    if (event.key === 'Escape') {
      setOpen(false)
      setActive(-1)
    } else if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault()
      setOpen(true)
      setActive(index => event.key === 'ArrowDown'
        ? Math.min(index + 1, options.length - 1)
        : Math.max(index - 1, 0))
    } else if (event.key === 'Enter' && showResults && options[active]) {
      event.preventDefault()
      choose(options[active])
    }
  }

  async function submit(event) {
    event.preventDefault()
    const product = selected ?? options.find(item => item.name === name)
    if (!product) return setError('Select a product from the search results.')
    try {
      await addEntry({ date, productId: product.id, grams: Number(grams) }).unwrap()
    } catch (reason) {
      setError(apiError(reason))
      return
    }
    setName('')
    setSelected(null)
    setOpen(false)
    setGrams('')
    setError('')
    onAdded?.()
  }
  return <form className="diary-form" onSubmit={submit}>
    <div className="diary-product-field">
      <label><span>Product name</span>
        <input role="combobox" autoComplete="off" aria-autocomplete="list"
          aria-expanded={showResults} aria-controls="diary-product-options"
          aria-activedescendant={showResults && options[active] ? 'product-' + options[active].id : undefined}
          value={name} aria-invalid={Boolean(error)} aria-describedby={error ? 'product-error' : undefined}
          onFocus={() => setOpen(true)} onBlur={() => setOpen(false)} onKeyDown={navigate}
          onChange={event => {
            setName(event.target.value)
            setSelected(null)
            setActive(-1)
            setOpen(true)
            setError('')
          }} placeholder="Enter product name" required />
      </label>
      <ul id="diary-product-options" role="listbox" aria-label="Products" hidden={!showResults}
        className="diary-options">
        {options.map((product, index) => (
          <li key={product.id} id={'product-' + product.id} role="option" aria-selected={index === active}
            ref={node => { if (node && showResults && index === active) node.scrollIntoView({ block: 'nearest' }) }}
            onMouseDown={event => event.preventDefault()} onClick={() => choose(product)}>
            {product.name}
          </li>
        ))}
        {!options.length && <li role="presentation">{isFetching ? 'Searching…' : searchError ? 'Search unavailable' : 'No matching products'}</li>}
      </ul>
      {error && <small id="product-error" role="alert">{error}</small>}
    </div>
    <label><span>Grams</span><input type="number" min="1" step="1" value={grams} onChange={(e) => setGrams(e.target.value)} placeholder="Grams" required /></label>
    {searchError && <small role="alert">{apiError(searchError)}</small>}
    <button disabled={isLoading} type="submit" aria-label="Add product"><span className="diary-add-icon" aria-hidden="true">+</span><span className="diary-add-text" aria-hidden="true">Add</span></button>
  </form>
}
