import { api, apiError } from '../redux/api'
import CalculatorCalorieForm from '../components/calculator-calorie-form'
import RightSideBar from '../components/right-side-bar'
import { getDateKey, getDisplayDate } from '../redux/diary-selectors'

export default function CalculatorPage() {
  const { data: profile, error: profileError } = api.useProfileQuery()
  const today = new Date()
  const dateKey = getDateKey(today)
  const [saveProfile, save] = api.useSaveProfileMutation()
  const { currentData: day, error: dayError } = api.useDayQuery(dateKey)
  const consumed = day?.consumed ?? null

  return (
    <main className="diary-layout">
      <section className="calculator-main" aria-labelledby="calculator-title">
        <h1 id="calculator-title">Calculate your daily calorie intake right now</h1>
        <CalculatorCalorieForm key={profile ? "saved" : "new"} profile={profile} onCalculate={saveProfile} pending={save.isLoading} />
        {save.error && <p role="alert">{apiError(save.error)}</p>}
      </section>
      {dayError && <p role="alert">{apiError(dayError)}</p>}
      {profileError && profileError.status !== 404 && <p role="alert">{apiError(profileError)}</p>}
      <RightSideBar date={getDisplayDate(today)} dailyRate={profile?.calories} foods={profile?.forbiddenFoods} consumed={consumed} />
    </main>
  )
}
