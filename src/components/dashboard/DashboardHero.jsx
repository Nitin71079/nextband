import { Link } from "react-router-dom";
import {
  ArrowRight,
  Flame,
  TrendingUp,
  Target,
  Sparkles,
  BookOpen,
} from "lucide-react";

export default function DashboardHero({
  firstName,
  analytics = {},
  memory = {},
}) {

  // Greeting
  const hour = new Date().getHours();

  const greeting =
    hour < 12
      ? "Good Morning"
      : hour < 17
      ? "Good Afternoon"
      : "Good Evening";

  // Analytics
  const streak = analytics.studyStreak ?? 18;
  const estimatedBand = analytics.averageBand ?? 7.5;
  const weeklyGoal = analytics.weeklyProgress ?? 82;
  const testsCompleted = analytics.testsCompleted ?? 34;

  // User Target
  const targetBand =
    memory?.profile?.targetBand ?? 8;

  const continuePath =
    memory?.progress?.lastModule ??
    "/listening";

  const remainingBand = Math.max(
    0,
    (targetBand - estimatedBand).toFixed(1)
  );

  return (
    <section className="dashboard-hero">

      <div className="dashboard-hero-left">

        <div className="dashboard-badge">
          <Sparkles size={16} />
          <span>Welcome Back</span>
        </div>

        <h1>
          {greeting},
          <span> {firstName}</span>
        </h1>

        <p>
          Continue your IELTS preparation and stay on
          track towards your target Band{" "}
          <strong>{targetBand}</strong>.
          {remainingBand > 0 && (
            <>
              {" "}
              You're only{" "}
              <strong>{remainingBand}</strong> Band away.
            </>
          )}
        </p>

        <div className="hero-buttons">

          <Link to={continuePath}>
            <button className="hero-primary">
              Continue Learning
              <ArrowRight size={18} />
            </button>
          </Link>

          <Link to="/planner">
            <button className="hero-secondary">
              Study Planner
            </button>
          </Link>

        </div>

      </div>

      <div className="dashboard-hero-right">

        <div className="hero-stat">
          <Flame size={30} />
          <div>
            <h2>{streak}</h2>
            <span>Day Streak</span>
          </div>
        </div>

        <div className="hero-stat">
          <TrendingUp size={30} />
          <div>
            <h2>{estimatedBand}</h2>
            <span>Estimated Band</span>
          </div>
        </div>

        <div className="hero-stat">
          <Target size={30} />
          <div>
            <h2>{weeklyGoal}%</h2>
            <span>Weekly Goal</span>
          </div>
        </div>

        <div className="hero-stat">
          <BookOpen size={30} />
          <div>
            <h2>{testsCompleted}</h2>
            <span>Tests Completed</span>
          </div>
        </div>

      </div>

    </section>
  );
}