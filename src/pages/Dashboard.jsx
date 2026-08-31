import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useExam } from "../context/ExamContext";
import Loader from "../components/Loader";

import DETDashboard from "../modules/duolingo/pages/DETDashboard";
import TOEFLCenter from "./TOEFLCenter";
import PTECenter from "./PTECenter";
import GRECenter from "./GRECenter";
import CATCenter from "./CATCenter";
import ACTCenter from "./ACTCenter";
import SATCenter from "./SATCenter";
import GMATCenter from "./GMATCenter";
import ExamTrackHeaderSwitcher from "../components/ExamTrackHeaderSwitcher";

import DashboardHero       from "../components/dashboard/DashboardHero";
import ContinueLearning    from "../components/dashboard/ContinueLearning";
import QuickActions        from "../components/dashboard/QuickActions";
import PerformanceOverview from "../components/dashboard/PerformanceOverview";
import SkillBreakdown      from "../components/dashboard/SkillBreakdown";
import AIRecommendation    from "../components/dashboard/AIRecommendation";
import DailyGoal           from "../components/dashboard/DailyGoal";
import AIStatus            from "../components/dashboard/AIStatus";
import RecentActivity      from "../components/dashboard/RecentActivity";
import PremiumBanner       from "../components/dashboard/PremiumBanner";

import { trackEvent } from "../utils/analytics";
import { useLiveData } from "../hooks/useLiveData";

import "../styles/dashboard/dashboard.css";

export default function Dashboard() {
  const { activeTrack } = useExam();
  const { premium } = useAuth();
  const { loading, analytics, memory, activities, firstName } = useLiveData();
  const [forceReady, setForceReady] = useState(false);

  useEffect(() => {
    trackEvent("dashboard_visit");
    // Never show the loader for more than 3 seconds
    const t = setTimeout(() => setForceReady(true), 3000);
    return () => clearTimeout(t);
  }, []);

  if (activeTrack === "DET") {
    return <DETDashboard />;
  }

  if (activeTrack === "TOEFL") {
    return <TOEFLCenter />;
  }

  if (activeTrack === "PTE") {
    return <PTECenter />;
  }

  if (activeTrack === "GRE") {
    return <GRECenter />;
  }

  if (activeTrack === "CAT") {
    return <CATCenter />;
  }

  if (activeTrack === "ACT") {
    return <ACTCenter />;
  }

  if (activeTrack === "SAT") {
    return <SATCenter />;
  }

  if (activeTrack === "GMAT") {
    return <GMATCenter />;
  }

  if (loading && !forceReady) return <Loader />;

  return (
    <div className="dashboard-page">
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "24px 24px 0" }}>
        <ExamTrackHeaderSwitcher />
      </div>

      <DashboardHero
        firstName={firstName}
        analytics={analytics}
        memory={memory}
      />

      <ContinueLearning memory={memory} />

      <QuickActions />

      <PerformanceOverview analytics={analytics} />

      {/* ── Analytics quick-access strip ── */}
      <section className="dashboard-section">
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: 16,
        }}>
          {[
            { label: "Full Analytics",   sub: "Trends, charts & deep-dive",  to: "/insights",           color: "#4f8ef7", emoji: "📊" },
            { label: "Score History",    sub: "All past test results",        to: "/insights?tab=History", color: "#22d3ee", emoji: "📋" },
            { label: "AI Study Goals",   sub: "Personalized weekly plan",     to: "/insights?tab=Goals",  color: "#8b5cf6", emoji: "🎯" },
            { label: "Skill Progress",   sub: "Module-level breakdown",       to: "/insights?tab=Skills", color: "#22d3a5", emoji: "📈" },
          ].map((item) => (
            <Link
              key={item.label}
              to={item.to}
              style={{ textDecoration: "none" }}
            >
              <div style={{
                background: "white",
                border: "1px solid var(--border)",
                borderRadius: 20,
                padding: "22px 24px",
                display: "flex",
                alignItems: "center",
                gap: 16,
                cursor: "pointer",
                transition: "transform .22s, box-shadow .22s",
                boxShadow: "0 6px 20px rgba(15,23,42,.05)",
              }}
                onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 16px 40px rgba(15,23,42,.10)"; }}
                onMouseLeave={e => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = "0 6px 20px rgba(15,23,42,.05)"; }}
              >
                <div style={{
                  width: 48, height: 48, borderRadius: 13,
                  background: item.color + "15",
                  border: `1px solid ${item.color}30`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 22, flexShrink: 0,
                }}>
                  {item.emoji}
                </div>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 800, color: "var(--text)", marginBottom: 3 }}>{item.label}</div>
                  <div style={{ fontSize: 12, color: "var(--text-muted)" }}>{item.sub}</div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <SkillBreakdown analytics={analytics} />

      <AIRecommendation analytics={analytics} />

      <DailyGoal analytics={analytics} />

      <AIStatus analytics={analytics} />

      <RecentActivity activities={activities} />

      {!premium && <PremiumBanner />}
    </div>
  );
}
