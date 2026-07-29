import { Flame, TrendingUp, BookOpen, Trophy, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";

/* Inline mini sparkline — no library */
function MiniSpark({ data, color }) {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const w = 80, h = 28;
  const pts = data
    .map((v, i) => `${(i / (data.length - 1)) * w},${h - ((v - min) / range) * (h * 0.85) - h * 0.07}`)
    .join(" ");
  return (
    <svg width={w} height={h} style={{ display: "block", overflow: "visible" }}>
      <polyline points={pts} fill="none" stroke={color} strokeWidth="2"
        strokeLinecap="round" strokeLinejoin="round" opacity=".7" />
    </svg>
  );
}

export default function PerformanceOverview({ analytics = {} }) {
  const trendData = {
    streak:   [10, 12, 14, 14, 16, 18],
    band:     [7.0, 7.0, 7.5, 7.5, 7.5, 7.5],
    tests:    [20, 24, 26, 28, 32, 34],
    progress: [60, 65, 70, 75, 78, 82],
  };

  const cards = [
    {
      title:  "Study Streak",
      value:  analytics.studyStreak ?? 18,
      suffix: "days",
      icon:   <Flame size={32} color="#f97316" />,
      footer: "Days in a row",
      delta:  "+3 this week",
      up:     true,
      spark:  trendData.streak,
      color:  "#f97316",
    },
    {
      title:  "Estimated Band",
      value:  analytics.averageBand ?? 7.5,
      suffix: "",
      icon:   <TrendingUp size={32} color="#06b6d4" />,
      footer: "Current Prediction",
      delta:  "+0.5 this month",
      up:     true,
      spark:  trendData.band,
      color:  "#06b6d4",
    },
    {
      title:  "Tests Completed",
      value:  analytics.testsCompleted ?? 34,
      suffix: "",
      icon:   <BookOpen size={32} color="#3b82f6" />,
      footer: "Completed",
      delta:  "+2 this week",
      up:     true,
      spark:  trendData.tests,
      color:  "#3b82f6",
    },
    {
      title:  "Weekly Progress",
      value:  `${analytics.weeklyProgress ?? 82}%`,
      suffix: "",
      icon:   <Trophy size={32} color="#22c55e" />,
      footer: "Goal Completed",
      delta:  "On track",
      up:     true,
      spark:  trendData.progress,
      color:  "#22c55e",
    },
  ];

  return (
    <section className="dashboard-section">
      <div className="section-header">
        <div>
          <h2>Performance Overview</h2>
          <p>Your IELTS preparation at a glance.</p>
        </div>
        <Link to="/insights" style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 14, fontWeight: 700, color: "var(--primary)", textDecoration: "none", padding: "8px 16px", borderRadius: 10, background: "rgba(37,99,235,.07)", border: "1px solid rgba(37,99,235,.12)", transition: ".2s", whiteSpace: "nowrap" }}>
          Full Analytics <ArrowUpRight size={15} />
        </Link>
      </div>

      <div className="stats-grid">
        {cards.map((card) => (
          <div key={card.title} className="stat-card">
            <div className="stat-light" />
            {card.icon}
            <h1>{card.value}</h1>
            <span>{card.title}</span>

            {/* Mini sparkline */}
            <div style={{ marginTop: "auto", display: "flex", alignItems: "flex-end", justifyContent: "space-between" }}>
              <small className="stat-footer">{card.footer}</small>
              <MiniSpark data={card.spark} color={card.color} />
            </div>

            {/* Delta badge */}
            <div style={{
              display: "inline-flex", alignItems: "center", gap: 5,
              padding: "4px 10px", borderRadius: 99, fontSize: 12, fontWeight: 700, marginTop: 6,
              background: card.up ? "rgba(34,197,94,.08)" : "rgba(239,68,68,.08)",
              color: card.up ? "#16a34a" : "#dc2626",
              border: `1px solid ${card.up ? "rgba(34,197,94,.15)" : "rgba(239,68,68,.15)"}`,
            }}>
              {card.up ? "↑" : "↓"} {card.delta}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
