import { Routes, Route } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import SignupPage from "../pages/SignupPage";
import CalendarPage from "../pages/CalendarPage";
import ScheduledPage from "../pages/ScheduledPage";
import AuthGuard from "../components/auth/AuthGuard";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route
          path="/calendar"
          element={
            <AuthGuard>
              <CalendarPage />
            </AuthGuard>
          }
        />

      <Route
        path="/scheduled"
        element={
          <AuthGuard>
            <ScheduledPage />
          </AuthGuard>
        }
      />
    </Routes>
  );
}
