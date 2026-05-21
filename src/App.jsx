import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import Navbar from "./components/Navbar";

import Footer from "./components/Footer";

import ProtectedRoute from "./components/ProtectedRoute";

import Home from "./pages/Home";

import Reading from "./pages/Reading";

import Listening from "./pages/Listening";

import Writing from "./pages/Writing";

import Speaking from "./pages/Speaking";

import Login from "./pages/Login";

import Dashboard from "./pages/Dashboard";

import NotFound from "./pages/NotFound";

import PrivacyPolicy from "./pages/PrivacyPolicy";

import Terms from "./pages/Terms";

import Contact from "./pages/Contact";

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/reading"
          element={<Reading />}
        />

        <Route
          path="/listening"
          element={<Listening />}
        />

        <Route
          path="/writing"
          element={<Writing />}
        />

        <Route
          path="/speaking"
          element={<Speaking />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/privacy-policy"
          element={
            <PrivacyPolicy />
          }
        />

        <Route
          path="/terms"
          element={<Terms />}
        />

        <Route
          path="/contact"
          element={<Contact />}
        />

        <Route
          path="*"
          element={<NotFound />}
        />
      </Routes>

      <Footer />
    </BrowserRouter>
  );
}