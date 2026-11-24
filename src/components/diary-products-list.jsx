import DiaryProductsListItem from './diary-products-list-item'
export default function DiaryProductsList({ products }) {
  if (!products.length) return <p className="diary-empty">No products added for this date.</p>
  return <ul className="diary-list">{products.map((product) => <DiaryProductsListItem key={product.id} product={product} />)}</ul>
}
