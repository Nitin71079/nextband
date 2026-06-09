import AudioGenerator from "./pages/AudioGenerator";
import AccentLab from "./pages/AccentLab";
import AIControlCenter from "./pages/AIControlCenter";
import ResultsHistory from "./pages/ResultsHistory";
import ProgressAnalytics from "./pages/ProgressAnalytics";
import ExamResults from "./pages/ExamResults";
import FullAcademicMock from "./pages/FullAcademicMock";
import FullGeneralMock from "./pages/FullGeneralMock";
import {
  Routes,
  Route
} from "react-router-dom";

import MockListening from "./pages/MockListening";
import MockWriting from "./pages/MockWriting";
import MockSpeaking from "./pages/MockSpeaking";
import PerformanceDashboard from "./pages/PerformanceDashboard";
import {
  lazy,
  Suspense
} from "react";
import MockReading from "./pages/MockReading";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import MobileNav from "./components/MobileNav";
import Loader from "./components/Loader";
import PremiumGate from "./components/PremiumGate";
import AdminRoute from "./components/AdminRoute";
import PrivateRoute from "./components/PrivateRoute";
const Home = lazy(() => import("./pages/Home"));
const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Profile = lazy(() => import("./pages/Profile"));
const StudyPlanner = lazy(() => import("./pages/StudyPlanner"));
const Achievements = lazy(() => import("./pages/Achievements"));
const Notifications = lazy(() => import("./pages/Notifications"));
const Community = lazy(() => import("./pages/Community"));
const Mentors = lazy(() => import("./pages/Mentors"));
const LiveClasses = lazy(() => import("./pages/LiveClasses"));
const Insights = lazy(() => import("./pages/Insights"));
const Streaks = lazy(() => import("./pages/Streaks"));
const Referrals = lazy(() => import("./pages/Referrals"));
const Support = lazy(() => import("./pages/Support"));
const Reading = lazy(() => import("./pages/Reading"));
const Listening = lazy(() => import("./pages/Listening"));
const Writing = lazy(() => import("./pages/Writing"));
const Speaking = lazy(() => import("./pages/Speaking"));
const FullMocks = lazy(() => import("./pages/FullMocks"));
const Leaderboard = lazy(() => import("./pages/Leaderboard"));
const Pricing = lazy(() => import("./pages/Pricing"));
const Admin = lazy(() => import("./pages/Admin"));
const Success = lazy(() => import("./pages/Success"));
const NotFound = lazy(() => import("./pages/NotFound"));

function App() {
  return (
    <>
      <Navbar />

      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/login" element={<Login />} />

          <Route
            path="/register"
            element={<Register />}
          />
<Route
  path="/accent-lab"
  element={
    <PrivateRoute>
      <PremiumGate>
        <AccentLab />
      </PremiumGate>
    </PrivateRoute>
  }
/>
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />

          <Route
            path="/profile"
            element={
              <PrivateRoute>
                <Profile />
              </PrivateRoute>
            }
          />

          <Route
            path="/planner"
            element={
              <PrivateRoute>
                <StudyPlanner />
              </PrivateRoute>
            }
          />

          <Route
            path="/achievements"
            element={
              <PrivateRoute>
                <Achievements />
              </PrivateRoute>
            }
          />

          <Route
            path="/notifications"
            element={
              <PrivateRoute>
                <Notifications />
              </PrivateRoute>
            }
          />
<Route
  path="/results-history"
  element={
    <PrivateRoute>
      <ResultsHistory />
    </PrivateRoute>
  }
/>

<Route
  path="/analytics"
  element={
    <PrivateRoute>
      <PremiumGate>
        <ProgressAnalytics />
      </PremiumGate>
    </PrivateRoute>
  }
/>


          <Route
            path="/community"
            element={
              <PrivateRoute>
                <Community />
              </PrivateRoute>
            }
          />

          <Route
            path="/mentors"
            element={
              <PrivateRoute>
                <Mentors />
              </PrivateRoute>
            }
          />

          <Route
            path="/live-classes"
            element={
              <PrivateRoute>
                <LiveClasses />
              </PrivateRoute>
            }
          />

          <Route
            path="/insights"
            element={
              <PrivateRoute>
                <Insights />
              </PrivateRoute>
            }
          />
<Route
  path="/exam-results"
  element={
    <PrivateRoute>
      <ExamResults />
    </PrivateRoute>
  }
/>
          <Route
            path="/streaks"
            element={
              <PrivateRoute>
                <Streaks />
              </PrivateRoute>
            }
          />

          <Route
            path="/referrals"
            element={
              <PrivateRoute>
                <Referrals />
              </PrivateRoute>
            }
          />

          <Route
            path="/support"
            element={
              <PrivateRoute>
                <Support />
              </PrivateRoute>
            }
          />

          <Route
            path="/reading"
            element={
              <PrivateRoute>
                <Reading />
              </PrivateRoute>
            }
          />

          <Route
            path="/listening"
            element={
              <PrivateRoute>
                <Listening />
              </PrivateRoute>
            }
          />

          <Route
            path="/writing"
            element={
              <PrivateRoute>
                <Writing />
              </PrivateRoute>
            }
          />
<Route
  path="/mock/academic"
  element={
    <PremiumGate>
      <FullAcademicMock />
    </PremiumGate>
  }
/>

<Route
  path="/mock/general"
  element={
    <PremiumGate>
      <FullGeneralMock />
    </PremiumGate>
  }
/>
          <Route
            path="/speaking"
            element={
              <PrivateRoute>
                <Speaking />
              </PrivateRoute>
            }
          />

          <Route
            path="/leaderboard"
            element={
              <PrivateRoute>
                <Leaderboard />
              </PrivateRoute>
            }
          />

          <Route
            path="/pricing"
            element={
              <PrivateRoute>
                <Pricing />
              </PrivateRoute>
            }
          />

          <Route
            path="/success"
            element={
              <PrivateRoute>
                <Success />
              </PrivateRoute>
            }
          />

          {/* TEMPORARY DIRECT ROUTE */}
          <Route
            path="/full-mocks"
            element={<FullMocks />}
          />

          <Route
            path="/admin"
            element={
              <PrivateRoute>
                <AdminRoute>
                  <Admin />
                </AdminRoute>
              </PrivateRoute>
            }
          />
    <Route
  path="/mock/listening"
  element={
    <PremiumGate>
      <MockListening />
    </PremiumGate>
  }
/>
<Route
  path="/mock/writing"
  element={
    <PremiumGate>
      <MockWriting />
    </PremiumGate>
  }
/>
<Route
  path="/performance"
  element={
    <PrivateRoute>
      <PremiumGate>
        <PerformanceDashboard />
      </PremiumGate>
    </PrivateRoute>
  }
/>
<Route
  path="/mock/speaking"
  element={
    <PremiumGate>
      <MockSpeaking />
    </PremiumGate>
  }
/>
<Route
  path="/ai-center"
  element={
    <PrivateRoute>
      <PremiumGate>
        <AIControlCenter />
      </PremiumGate>
    </PrivateRoute>
  }
/>
<Route
  path="/audio-generator"
  element={
    <PrivateRoute>
      <PremiumGate>
        <AudioGenerator />
      </PremiumGate>
    </PrivateRoute>
  }
/>
     <Route
  path="/mock/reading"
  element={
    <PremiumGate>
      <MockReading />
    </PremiumGate>
  }
/>
          <Route
            path="*"
            element={<NotFound />}
          />
        </Routes>
      </Suspense>

      <Footer />

      <MobileNav />
    </>
  );
}

export default App;