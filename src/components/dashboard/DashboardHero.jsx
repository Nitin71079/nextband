import { Link } from "react-router-dom";
import { motion } from "framer-motion";

import {
  ArrowRight,
  Award,
  BrainCircuit,
  ChevronRight,
  Clock3,
  Flame,
  Sparkles,
  Target,
  TrendingUp,
} from "lucide-react";

export default function DashboardHero({
  firstName,
  analytics = {},
  memory = {},
}) {

  /* ---------------- Greeting ---------------- */

  const hour = new Date().getHours();

  const greeting =
    hour < 12
      ? "Good Morning"
      : hour < 17
      ? "Good Afternoon"
      : "Good Evening";

  /* ---------------- Analytics ---------------- */

  const streak =
    analytics.studyStreak ?? 18;

  const estimatedBand = Math.min(
    9.0,
    Math.max(0, Number(analytics.averageBand ?? 7.5))
  );

  const weeklyGoal =
    analytics.weeklyProgress ?? 82;

  const testsCompleted =
    analytics.testsCompleted ?? 34;

  /* ---------------- User Memory ---------------- */

  const targetBand =
    memory?.profile?.targetBand ?? 8;

  const continuePath =
    memory?.progress?.lastModule ??
    "/listening";

  const lesson =
    memory?.progress?.lastLesson ??
    "Listening Test 1";

  const section =
    memory?.progress?.currentSection ??
    "Section 3";

  const remainingTime =
    memory?.progress?.remainingTime ??
    "12 mins";

  const completion =
    memory?.progress?.completion ??
    72;

  const confidence = 92;

  /* ---------------- AI Insight ---------------- */

  const insightTitle =
    analytics.recommendation?.title ?? "Improve Grammar Accuracy";

  const insightDescription =
    analytics.recommendation?.description ??
    "Based on your recent performance, improving grammar accuracy and sentence variety could increase your estimated score.";

  const insightGain =
    analytics.recommendation?.estimatedGain ?? "+0.5 Band";

  const remainingBand = Math.max(
    0,
    Number(
      (
        targetBand -
        estimatedBand
      ).toFixed(1)
    )
  );

  const stats = [
    {
      icon: Flame,
      value: streak,
      label: "Day Streak",
      color: "orange",
    },
    {
      icon: TrendingUp,
      value: estimatedBand,
      label: "Predicted Band",
      color: "blue",
    },
    {
      icon: Target,
      value: `${weeklyGoal}%`,
      label: "Weekly Goal",
      color: "green",
    },
    {
      icon: Award,
      value: testsCompleted,
      label: "Tests Completed",
      color: "purple",
    },
  ];

  return (    <motion.section
      className="dashboard-hero"
      initial={{
        opacity: 0,
        y: 30,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.5,
      }}
    >

      <div className="hero-glow" />

      <div className="dashboard-hero-content">

        {/* ================= LEFT ================= */}

        <motion.div
className="dashboard-hero-left"
          initial={{
            opacity: 0,
            x: -30,
          }}
          animate={{
            opacity: 1,
            x: 0,
          }}
          transition={{
            delay: 0.15,
          }}
        >

          <div className="hero-badge">

            <Sparkles size={15} />

            <span>

              AI Powered Learning

            </span>

          </div>

          <h1>

            {greeting},

            <span>

              {" "}

              {firstName}

            </span>

          </h1>

          <p>

            You're only

            <strong>

              {" "}

              {remainingBand} band

            </strong>

            {" "}away from achieving

            <strong>

              {" "}Band {targetBand}

            </strong>

            .

          </p>

          <div className="hero-buttons">

            <Link
              to={continuePath}
className="hero-primary"
            >

              Continue Learning

              <ArrowRight size={18} />

            </Link>

            <Link
              to="/planner"
className="hero-secondary"
            >

              Study Planner

            </Link>

          </div>

          <div className="hero-progress-card">

            <div className="progress-top">

              <div>

                <span>

                  Current Lesson

                </span>

                <h3>

                  {lesson}

                </h3>

              </div>

              <BrainCircuit size={28} />

            </div>

            <div className="progress-bar">

              <motion.div
                className="progress-fill"
                initial={{
                  width: 0,
                }}
                animate={{
                  width: `${completion}%`,
                }}
                transition={{
                  duration: 1,
                }}
              />

            </div>

            <div className="progress-footer">

              <div className="progress-time">

                <Clock3 size={15} />

                <span>

                  {remainingTime}

                </span>

              </div>

              <span>

                {section}

              </span>

            </div>

          </div>

        </motion.div>
                {/* ================= RIGHT SIDE ================= */}

        <motion.div
className="dashboard-hero-right"
          initial={{
            opacity: 0,
            x: 30,
          }}
          animate={{
            opacity: 1,
            x: 0,
          }}
          transition={{
            delay: 0.25,
          }}
        >

          {/* AI Prediction */}

          <motion.div
            className="prediction-card"
            whileHover={{
              y: -6,
            }}
          >

            <div className="prediction-header">

              <div>

                <span className="prediction-label">

                  AI Prediction

                </span>

                <h2>

                  Band {estimatedBand}

                </h2>

              </div>

              <div className="prediction-icon">

                <BrainCircuit size={24} />

              </div>

            </div>

            <div className="prediction-ring">

              <div className="prediction-score">

                <h1>

                  {estimatedBand}

                </h1>

                <span>

                  Overall

                </span>

              </div>

            </div>

            <div className="confidence-row">

              <span>

                Confidence

              </span>

              <strong>

                {confidence}%

              </strong>

            </div>

            <div className="confidence-bar">

              <motion.div
                className="confidence-fill"
                initial={{
                  width: 0,
                }}
                animate={{
                  width: `${confidence}%`,
                }}
                transition={{
                  duration: 1,
                  delay: .4,
                }}
              />

            </div>

          </motion.div>

          {/* KPI Cards */}

          <div className="hero-stats-grid">

            {stats.map((item) => {

              const Icon = item.icon;

              return (

                <motion.div
                  key={item.label}
                  whileHover={{
                    y: -6,
                    scale: 1.02,
                  }}
                  className={`hero-stat-card ${item.color}`}
                >

                  <div className="stat-icon">

                    <Icon size={22} />

                  </div>

                  <div className="stat-content">

                    <h3>

                      {item.value}

                    </h3>

                    <span>

                      {item.label}

                    </span>

                  </div>

                </motion.div>

              );

            })}

          </div>

          {/* AI Insight */}

          <motion.div
            className="hero-ai-insight"
            whileHover={{
              y: -6,
            }}
          >

            <div className="ai-insight-icon">

              <BrainCircuit size={28} />

            </div>

            <div className="ai-insight-content">

              <small>Today's AI Insight</small>

              <h3>

                {insightTitle}

              </h3>

              <p>

                {insightDescription}

              </p>

              <Link
                to="/ai-center"
                className="ai-improvement"
              >

                <Sparkles size={15} />

                {insightGain} Potential

                <ChevronRight size={16} />

              </Link>

            </div>

          </motion.div>

        </motion.div>
              </div>

    </motion.section>

  );

}