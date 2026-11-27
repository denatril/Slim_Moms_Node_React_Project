import { Header } from './components/header/header';
import { Loader } from './components/loader/loader';
import { lazy, Suspense } from 'react';
import { useSelector } from 'react-redux';
import { Routes, Route, Navigate, Outlet } from 'react-router-dom';

const MainPage = lazy(() => import('./pages/main-page/main-page').then(module => ({ default: module.MainPage })));
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

  return <Outlet />;
}

export default function App() {
  const loggedIn = useSelector((state) => state.auth.isLoggedIn);
  const loading = useSelector(state => Object.keys(state.loader).length > 0);
  const diary = <Navigate to="/diary" replace />;

  return (
    <>
      <Header />
      <Loader isLoading={loading} />
      <Suspense fallback={<Loader isLoading />}>
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
    </>
  );
}
