import { useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import DiaryDateCalendar from '../components/diary-date-calendar'
import DiaryAddProductForm from '../components/diary-add-product-form'
import DiaryProductsList from '../components/diary-products-list'
import RightSideBar from '../components/right-side-bar'
import { getDateKey, getDisplayDate, selectDiaryProducts } from '../redux/diary-selectors'

export default function DiaryPage() {
  const profile = useSelector((state) => state.diary.profile)
  const [date, setDate] = useState(() => new Date())
  const [adding, setAdding] = useState(false)
  const addButton = useRef(null)
  const backButton = useRef(null)
  const selectedDate = getDateKey(date)
  const products = useSelector(selectDiaryProducts).filter((product) => product.date === selectedDate)
  const consumed = products.reduce((sum, product) => sum == null || product.calories == null ? null : sum + product.calories, 0)

  function showAddForm() {
    setAdding(true)
    requestAnimationFrame(() => backButton.current?.focus())
  }

  function closeAddForm() {
    if (!adding) return
    setAdding(false)
    requestAnimationFrame(() => addButton.current?.focus())
  }

  return (
    <main className={adding ? 'diary-layout diary-entry-open' : 'diary-layout'}>
      <section className="diary-main" aria-label="Diary">
        <div className="diary-overview">
          <h1 id="diary-date-label">Diary</h1>
          <DiaryDateCalendar date={date} onChange={(value) => value && setDate(value)} />
        </div>
        <div className={adding ? 'diary-form-wrap is-open' : 'diary-form-wrap'}>
          <button ref={backButton} type="button" className="diary-back" onClick={closeAddForm}>← Back</button>
          <DiaryAddProductForm date={selectedDate} onAdded={closeAddForm} />
        </div>
        <div className="diary-overview">
          <DiaryProductsList products={products} />
          <button ref={addButton} type="button" className="diary-mobile-add" onClick={showAddForm} aria-label="Add product">+</button>
        </div>
      </section>
      <RightSideBar date={getDisplayDate(date)} consumed={consumed} dailyRate={profile?.dailyRate} foods={profile?.foods} />
    </main>
  )
}
