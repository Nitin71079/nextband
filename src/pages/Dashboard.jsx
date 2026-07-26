import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import Loader from "../components/Loader";

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
  const { premium } = useAuth();
  const { loading, analytics, memory, activities, firstName } = useLiveData();
  const [forceReady, setForceReady] = useState(false);

  useEffect(() => {
    trackEvent("dashboard_visit");
    // Never show the loader for more than 3 seconds
    const t = setTimeout(() => setForceReady(true), 3000);
    return () => clearTimeout(t);
  }, []);

  if (loading && !forceReady) return <Loader />;

  return (
    <div className="dashboard-page">
      <DashboardHero
        firstName={firstName}
        analytics={analytics}
        memory={memory}
      />

      <ContinueLearning memory={memory} />

      <QuickActions />

      <PerformanceOverview analytics={analytics} />

      <SkillBreakdown analytics={analytics} />

      <AIRecommendation analytics={analytics} />

      <DailyGoal analytics={analytics} />

      <AIStatus analytics={analytics} />

      <RecentActivity activities={activities} />

      {!premium && <PremiumBanner />}
    </div>
  );
}
