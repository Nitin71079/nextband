import MockWriting from "./pages/MockWriting";
const EvaluationHistory =
  lazy(() =>
import("./pages/EvaluationHistory") );
import PaymentSuccess from "./pages/PaymentSuccess";
import AdminTests from "./pages/AdminTests";
import PaymentCancelled from "./pages/PaymentCancelled";
import AIAssistant from "./pages/AIAssistant";
import AudioGenerator from "./pages/AudioGenerator";
import AccentLab from "./pages/AccentLab";
import AIControlCenter from "./pages/AIControlCenter";
import ResultsHistory from "./pages/ResultsHistory";
import ProgressAnalytics from "./pages/ProgressAnalytics";
import ExamResults from "./pages/ExamResults";
import FullAcademicMock from "./pages/FullAcademicMock";
import FullGeneralMock from "./pages/FullGeneralMock";
import { Routes, Route} from "react-router-dom";
import Certificates from "./pages/Certificates";
import MockListening from "./pages/MockListening";
import MockSpeaking from "./pages/MockSpeaking";
import PerformanceDashboard from "./pages/PerformanceDashboard";
import {lazy, Suspense} from "react";
import MockReading from "./pages/MockReading";
import Navbar from "./components/Navbar";
import MobileNav from "./components/MobileNav";
import ReferralPopup from "./components/ReferralPopup";
import WelcomeGreeting from "./components/WelcomeGreeting";
import Footer from "./components/home/Footer";
import Loader from "./components/Loader";
import ScrollToTop from "./components/ScrollToTop";
import PremiumGate from "./components/PremiumGate";
import AdminRoute from "./components/AdminRoute";
import PrivateRoute from "./components/PrivateRoute";
import ReadingCenter from "./pages/ReadingCenter";
import AcademicReadingCenter from "./pages/AcademicReadingCenter";
import GeneralReadingCenter from "./pages/GeneralReadingCenter";
import ListeningCenter from "./pages/ListeningCenter";
import WritingCenter from "./pages/WritingCenter";
import SpeakingCenter from "./pages/SpeakingCenter";
import ExamHistory from "./pages/ExamHistory";
import Settings from "./pages/Settings";
import Profile from "./pages/Profile";
import AdminContent from "./pages/AdminContent";
import Terms from "./pages/Terms";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import FAQ from "./pages/FAQ";
import Contact from "./pages/Contact";
const ExpertsCorner = lazy(() => import("./pages/ExpertsCorner"));
const ExpertProfile =
  lazy(() =>
    import(
      "./pages/ExpertProfile"
    )
  );

const MySessions =
  lazy(() =>
    import(
      "./pages/MySessions"
    )
  );
const Home = lazy(() => import("./pages/Home"));
const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
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
const FullMocks = lazy(() => import("./pages/FullMocks"));
const GamesZone = lazy(() => import("./pages/GamesZone"));
const SpeakingShowdown = lazy(() => import("./pages/SpeakingShowdown"));
const AudioSniper = lazy(() => import("./pages/AudioSniper"));
const EssayDuel = lazy(() => import("./pages/EssayDuel"));
const VocabBattle = lazy(() => import("./pages/VocabBattle"));
const ReadingRace = lazy(() => import("./pages/ReadingRace"));
const WordChain = lazy(() => import("./pages/WordChain"));
const SentenceFixer = lazy(() => import("./pages/SentenceFixer"));
const BandBlitz = lazy(() => import("./pages/BandBlitz"));
const SynonymSprint = lazy(() => import("./pages/SynonymSprint"));
const GrammarGladiator = lazy(() => import("./pages/GrammarGladiator"));
const Leaderboard = lazy(() => import("./pages/Leaderboard"));
const Pricing = lazy(() => import("./pages/Pricing"));
const Admin = lazy(() => import("./pages/Admin"));
const Success = lazy(() => import("./pages/Success"));
const NotFound = lazy(() => import("./pages/NotFound"));
const HelpCenter = lazy(() => import("./pages/HelpCenter"));
const MonitorPanel = lazy(() => import("./pages/MonitorPanel"));
const VideoCommercialAd = lazy(() => import("./pages/VideoCommercialAd"));

function App() {
  
  return (
    <>
      <ScrollToTop />
      <WelcomeGreeting />
      <Navbar />

      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/commercial" element={<VideoCommercialAd />} />

          <Route path="/login" element={<Login />} />

          <Route
            path="/register"
            element={<Register />}
          />
          <Route
  path="/mock/general-reading/:id"
  element={<MockReading />}
/>
          <Route
  path="/certificates"
  element={
    <PrivateRoute>
      <Certificates />
    </PrivateRoute>
  }
/>
<Route

path="/admin/content"

element={<AdminContent/>}

/>
<Route
  path="/admin/tests/:type"
  element={<AdminTests />}
/>
          <Route
  path="/settings"
  element={
    <PrivateRoute>
      <Settings />
    </PrivateRoute>
  }
/>
<Route
  path="/ai-assistant"
  element={
    <PrivateRoute>
      <AIAssistant />
    </PrivateRoute>
  }
/>

<Route

path="/history"

element={<ExamHistory/>}
/>
<Route
  path="/reading"
  element={<ReadingCenter />}
/>

<Route
  path="/reading/academic"
  element={<AcademicReadingCenter />}
/>

<Route
  path="/reading/general"
  element={<GeneralReadingCenter />}
/>

<Route
  path="/listening"
  element={<ListeningCenter />}
/>
<Route path="/writing" element={<WritingCenter />} />

<Route path="/speaking" element={<SpeakingCenter />} />
<Route
  path="/payment-success"
  element={
    <PaymentSuccess />
  }
/>

<Route
  path="/payment-cancelled"
  element={
    <PaymentCancelled />
  }
/>
<Route
  path="/experts-corner"
  element={
    <PrivateRoute>
      <ExpertsCorner />
    </PrivateRoute>
  }
/>
<Route
  path="/experts"
  element={
    <PrivateRoute>
      <ExpertsCorner />
    </PrivateRoute>
  }
/>
<Route
  path="/experts/:id"
  element={
    <PrivateRoute>
      <ExpertProfile />
    </PrivateRoute>
  }
/>
<Route
  path="/my-sessions"
  element={
    <PrivateRoute>
      <MySessions />
    </PrivateRoute>
  }
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
  path="/evaluation-history"
  element={
    <PrivateRoute>
      <EvaluationHistory />
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
<Route path="/mock/reading/:id" element={<MockReading />} />

<Route path="/mock/listening/:id" element={<MockListening />} />
<Route
  path="/mock/writing/:testId"
  element={<MockWriting />}
/>

<Route path="/mock/speaking/:id" element={<MockSpeaking />} />
        
         

<Route
  path="/mock/academic"
  element={
   
      <FullAcademicMock />
 
  }
/>

<Route
  path="/mock/general"
  element={
    
      <FullGeneralMock />
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
  path="/ai-center"
  element={<AIControlCenter />}
/>

<Route
  path="/games"
  element={
    <PrivateRoute>
      <GamesZone />
    </PrivateRoute>
  }
/>

<Route
  path="/games/speaking-showdown"
  element={
    <PrivateRoute>
      <PremiumGate>
        <SpeakingShowdown />
      </PremiumGate>
    </PrivateRoute>
  }
/>

<Route
  path="/games/audio-sniper"
  element={
    <PrivateRoute>
      <PremiumGate>
        <AudioSniper />
      </PremiumGate>
    </PrivateRoute>
  }
/>

<Route
  path="/games/essay-duel"
  element={
    <PrivateRoute>
      <EssayDuel />
    </PrivateRoute>
  }
/>

<Route
  path="/games/vocab-battle"
  element={
    <PrivateRoute>
      <VocabBattle />
    </PrivateRoute>
  }
/>

<Route
  path="/games/reading-race"
  element={
    <PrivateRoute>
      <ReadingRace />
    </PrivateRoute>
  }
/>

<Route
  path="/games/word-chain"
  element={
    <PrivateRoute>
      <PremiumGate>
        <WordChain />
      </PremiumGate>
    </PrivateRoute>
  }
/>

<Route
  path="/games/sentence-fixer"
  element={
    <PrivateRoute>
      <PremiumGate>
        <SentenceFixer />
      </PremiumGate>
    </PrivateRoute>
  }
/>

<Route
  path="/games/band-blitz"
  element={
    <PrivateRoute>
      <PremiumGate>
        <BandBlitz />
      </PremiumGate>
    </PrivateRoute>
  }
/>

<Route
  path="/games/synonym-sprint"
  element={
    <PrivateRoute>
      <PremiumGate>
        <SynonymSprint />
      </PremiumGate>
    </PrivateRoute>
  }
/>

<Route
  path="/games/grammar-gladiator"
  element={
    <PrivateRoute>
      <PremiumGate>
        <GrammarGladiator />
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
            path="/monitor"
            element={
              <PrivateRoute>
                <AdminRoute>
                  <MonitorPanel />
                </AdminRoute>
              </PrivateRoute>
            }
          />

          <Route path="/help" element={<HelpCenter />} />

          <Route path="/faq" element={<FAQ />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/contact" element={<Contact />} />

          <Route path="*" element={<NotFound />} />
           </Routes>
  </Suspense>

  <Footer />
  <MobileNav />
  <ReferralPopup />
</>
);
}

export default App;