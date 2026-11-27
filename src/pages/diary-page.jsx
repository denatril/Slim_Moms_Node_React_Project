import { api, apiError } from '../redux/api'
import { useRef, useState } from 'react'
import DiaryDateCalendar from '../components/diary-date-calendar'
import DiaryAddProductForm from '../components/diary-add-product-form'
import DiaryProductsList from '../components/diary-products-list'
import RightSideBar from '../components/right-side-bar'
import { getDateKey, getDisplayDate } from '../redux/diary-selectors'

export default function DiaryPage() {
  const { data: profile, error: profileError } = api.useProfileQuery()
  const [date, setDate] = useState(() => new Date())
  const [adding, setAdding] = useState(false)
  const addButton = useRef(null)
  const backButton = useRef(null)
  const selectedDate = getDateKey(date)
  const { currentData: day, error: dayError } = api.useDayQuery(selectedDate)
  const consumed = day?.consumed ?? null

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
          <DiaryProductsList products={day?.entries ?? []} />
          <button ref={addButton} type="button" className="diary-mobile-add" onClick={showAddForm} aria-label="Add product">+</button>
        </div>
      </section>
      {dayError && <p role="alert">{apiError(dayError)}</p>}
      {profileError && profileError.status !== 404 && <p role="alert">{apiError(profileError)}</p>}
      <RightSideBar date={getDisplayDate(date)} consumed={consumed} dailyRate={profile?.calories} foods={profile?.forbiddenFoods} />
    </main>
  )
}
