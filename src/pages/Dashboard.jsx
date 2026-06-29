import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import Loader from "../components/Loader";
import { trackEvent } from "../utils/analytics";

import DashboardHero from "../components/dashboard/DashboardHero";
import ContinueLearning from "../components/dashboard/ContinueLearning";
import QuickActions from "../components/dashboard/QuickActions";
import PerformanceOverview from "../components/dashboard/PerformanceOverview";
import SkillBreakdown from "../components/dashboard/SkillBreakdown";
import AIRecommendation from "../components/dashboard/AIRecommendation";
import DailyGoal from "../components/dashboard/DailyGoal";
import AIStatus from "../components/dashboard/AIStatus";
import RecentActivity from "../components/dashboard/RecentActivity";
import PremiumBanner from "../components/dashboard/PremiumBanner";

import "../styles/dashboard.css";

export default function Dashboard() {

  const { user, name } = useAuth();

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

    trackEvent("dashboard_visit");

    const timer = setTimeout(() => {

      setLoading(false);

    }, 700);

    return () => clearTimeout(timer);

  }, []);

  if (loading) {

    return <Loader />;

  }

  const firstName =
    name
      ? name.split(" ")[0]
      : user?.email?.split("@")[0] || "Student";

  const analytics = {

    studyStreak: 18,

    averageBand: 7.5,

    weeklyProgress: 82,

    testsCompleted: 34,

    reading: 7.5,

    listening: 8,

    writing: 6.5,

    speaking: 6.5,

    dailyGoal: {

      title: "Complete One Listening Test",

      time: "30 Minutes",

      progress: 60,

      completed: false,

    },

    recommendation: {

      title: "Focus on Grammar Accuracy",

      description:
        "Improve Grammar Range & Accuracy and Task Response to consistently achieve Band 8.",

      priority: "High Priority",

      estimatedGain: "+0.5 Band",

      studyTime: "30 mins",

    },

    ai: {

      currentBand: 7.5,

      confidence: 92,

      weakestSkill: "Grammar Accuracy",

      recommendation: [

        "Complete one Writing Task 2 today.",

        "Review complex sentence structures.",

        "Practice speaking for 15 minutes.",

      ],

    },

  };

  const memory = {

    profile: {

      targetBand: 8,

    },

    progress: {

      lastModule: "/listening",

      lastLesson: "Listening Test 1",

      currentSection: "Section 3",

      remainingTime: "12 minutes",

      completion: 72,

    },

  };

  const activities = [

    {

      title: "Reading Practice",

      description: "Completed Reading Test 3",

      time: "Today",

      type: "reading",

    },

    {

      title: "Writing Evaluation",

      description: "AI estimated Band 7.0",

      time: "Yesterday",

      type: "writing",

    },

    {

      title: "Speaking Practice",

      description: "Cue Card Evaluation Complete",

      time: "2 Days Ago",

      type: "speaking",

    },

    {

      title: "AI Coach",

      description: "Generated New Study Plan",

      time: "3 Days Ago",

      type: "ai",

    },

  ];

  return (

    <div className="dashboard-page">

      <DashboardHero

        firstName={firstName}

        analytics={analytics}

        memory={memory}

      />

      <ContinueLearning

        memory={memory}

      />

      <QuickActions />

      <PerformanceOverview

        analytics={analytics}

      />

      <SkillBreakdown

        analytics={analytics}

      />

      <AIRecommendation

        analytics={analytics}

      />

      <DailyGoal

        analytics={analytics}

      />

      <AIStatus

        analytics={analytics}

      />

      <RecentActivity

        activities={activities}

      />

      <PremiumBanner />

    </div>

  );

}