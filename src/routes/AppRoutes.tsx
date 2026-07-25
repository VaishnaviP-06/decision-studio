import { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "../pages/LandingPage";

const StudioPage = lazy(() => import("../pages/StudioPage"));

function StudioFallback() {
  return (
    <div className="flex h-screen w-full items-center justify-center bg-[var(--background)] text-sm text-[var(--text-muted)]">
      Loading studio…
    </div>
  );
}

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route
          path="/studio"
          element={
            <Suspense fallback={<StudioFallback />}>
              <StudioPage />
            </Suspense>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;