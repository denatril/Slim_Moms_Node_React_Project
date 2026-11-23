import { lazy, Suspense, useEffect, useState } from 'react'
import { Provider, useSelector } from 'react-redux'
import { store } from './redux/store'
import './components/diary.css'

const DiaryPage = lazy(() => import('./pages/diary-page'))
const CalculatorPage = lazy(() => import('./pages/calculator-page'))

function FeatureRoutes() {
  const loggedIn = useSelector((state) => state.auth?.isLoggedIn === true)
  const [hash, setHash] = useState(window.location.hash)
  const path = window.location.pathname.replace(/\/$/, '')
  const preview = import.meta.env.DEV && path === ''
  const calculator = preview ? hash === '#calculator' : path === '/calculator'

  useEffect(() => {
    const update = () => setHash(window.location.hash)
    window.addEventListener('hashchange', update)
    return () => window.removeEventListener('hashchange', update)
  }, [])

  if (!preview && !loggedIn) {
    return <main><p>Please log in to access your diary and calculator.</p></main>
  }

  return (
    <>
      {preview && (
        <nav className="preview-nav" aria-label="Page preview">
          <a href="#diary" aria-current={!calculator ? 'page' : undefined}>Diary</a>
          <a href="#calculator" aria-current={calculator ? 'page' : undefined}>Calculator</a>
        </nav>
      )}
      <Suspense fallback={<p role="status">Loading…</p>}>
        {calculator ? <CalculatorPage /> : <DiaryPage />}
      </Suspense>
    </>
  )
}
export default function App() {
  return <Provider store={store}><FeatureRoutes /></Provider>
}
