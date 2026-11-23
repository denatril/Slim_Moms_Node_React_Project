import { useDispatch, useSelector } from 'react-redux'
import { saveCalculation } from '../redux/diary'
import CalculatorCalorieForm from '../components/calculator-calorie-form'
import RightSideBar from '../components/right-side-bar'
import { getDateKey, getDisplayDate, selectDiaryProducts } from '../redux/diary-selectors'

export default function CalculatorPage() {
  const dispatch = useDispatch()
  const profile = useSelector((state) => state.diary.profile)
  const today = new Date()
  const dateKey = getDateKey(today)
  const products = useSelector(selectDiaryProducts)
  const consumed = products
    .filter((product) => product.date === dateKey)
    .reduce((sum, product) => sum == null || product.calories == null ? null : sum + product.calories, 0)

  return (
    <main className="diary-layout">
      <section className="calculator-main" aria-labelledby="calculator-title">
        <h1 id="calculator-title">Calculate your daily calorie intake right now</h1>
        <CalculatorCalorieForm profile={profile} onCalculate={(values) => dispatch(saveCalculation(values))} />
      </section>
      <RightSideBar date={getDisplayDate(today)} dailyRate={profile?.dailyRate} foods={profile?.foods} consumed={consumed} />
    </main>
  )
}
