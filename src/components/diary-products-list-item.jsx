import { api, apiError } from '../redux/api'
export default function DiaryProductsListItem({ product }) {
  const [remove, { isLoading, error }] = api.useDeleteEntryMutation()
  return <li className="diary-item"><span>{product.name}</span><span>{product.grams} g</span><span>{product.calories == null ? '—' : `${product.calories} kcal`}</span><button type="button" aria-label={`Delete ${product.name}`} disabled={isLoading} onClick={() => remove({ date: product.date, id: product.id })}>×</button>{error && <small role="alert">{apiError(error)}</small>}</li>
}
