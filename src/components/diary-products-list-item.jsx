import { useDispatch } from 'react-redux'
import { deleteProduct } from '../redux/diary'
export default function DiaryProductsListItem({ product }) {
  const dispatch = useDispatch()
  return <li className="diary-item"><span>{product.name}</span><span>{product.grams} g</span><span>{product.calories == null ? '—' : `${product.calories} kcal`}</span><button type="button" aria-label={`Delete ${product.name}`} onClick={() => dispatch(deleteProduct(product.id))}>×</button></li>
}
