import {
  Flame,
  TrendingUp,
  BookOpen,
  Trophy,
} from "lucide-react";

export default function PerformanceOverview({
  analytics = {},
}) {

  const cards = [

    {
      title: "Study Streak",
      value: analytics.studyStreak ?? 18,
      icon: <Flame size={36} color="#f97316" />,
      footer: "Days",
    },

    {
      title: "Estimated Band",
      value: analytics.averageBand ?? 7.5,
      icon: <TrendingUp size={36} color="#06b6d4" />,
      footer: "Current Prediction",
    },

    {
      title: "Tests Completed",
      value: analytics.testsCompleted ?? 34,
      icon: <BookOpen size={36} color="#3b82f6" />,
      footer: "Completed",
    },

    {
      title: "Weekly Progress",
      value: `${analytics.weeklyProgress ?? 82}%`,
      icon: <Trophy size={36} color="#22c55e" />,
      footer: "Goal Completed",
    },

  ];

  return (

    <section className="dashboard-section">

      <div className="section-header">

        <div>

          <h2>

            Performance Overview

          </h2>

          <p>

            Your IELTS preparation at a glance.

          </p>

        </div>

      </div>

      <div className="stats-grid">

        {cards.map((card) => (

          <div
            key={card.title}
            className="stat-card"
          >

            {card.icon}

            <h1>

              {card.value}

            </h1>

            <span>

              {card.title}

            </span>

            <small className="stat-footer">

              {card.footer}

            </small>

          </div>

        ))}

      </div>

    </section>

  );

}