import { lazy, Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

const LoginPage = lazy(() => import("./pages/login-page/login-page"));

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Suspense>
  );
}

export default App;
