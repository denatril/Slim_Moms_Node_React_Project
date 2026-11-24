
import { lazy, Suspense } from 'react';
import { useSelector } from 'react-redux';
import { Routes, Route, Navigate, NavLink, Outlet } from 'react-router-dom';

import { MainPage } from './pages/main-page/main-page';
import './components/diary.css';

const Login = lazy(() => import('./pages/login-page/login-page'));
const Register = lazy(() => import('./pages/registration-page/registration-page'));
const Diary = lazy(() => import('./pages/diary-page'));
const Calculator = lazy(() => import('./pages/calculator-page'));

function PrivatePages() {
  const loggedIn = useSelector((state) => state.auth.isLoggedIn);

  if (!loggedIn) {
    return <Navigate to="/login" replace />;
  }

  return (
    <>
      <nav className="preview-nav" aria-label="Main navigation">
        <NavLink to="/diary">Diary</NavLink>
        <NavLink to="/calculator">Calculator</NavLink>
      </nav>
      <Outlet />
    </>
  );
}

export default function App() {
  const loggedIn = useSelector((state) => state.auth.isLoggedIn);
  const diary = <Navigate to="/diary" replace />;

  return (
    <Suspense fallback={<p role="status">Loading…</p>}>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/login" element={loggedIn ? diary : <Login />} />
        <Route path="/register" element={loggedIn ? diary : <Register />} />

        <Route element={<PrivatePages />}>
          <Route path="/diary" element={<Diary />} />
          <Route path="/calculator" element={<Calculator />} />
        </Route>

        <Route
          path="*"
          element={<Navigate to={loggedIn ? '/diary' : '/login'} replace />}
        />
      </Routes>
    </Suspense>
  );
}
