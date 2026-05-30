import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Loader from "../components/Loader";
import { trackEvent } from "../utils/analytics";
import { useAuth } from "../context/AuthContext";

export default function Dashboard() {
  const [loading, setLoading] = useState(true);

  const { user } = useAuth();

  useEffect(() => {
    trackEvent("dashboard_visit");

    const timer = setTimeout(() => {
      setLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <Loader />;
  }

  const tools = [
    {
      title: "AI Assistant",
      icon: "🤖",
      path: "/ai-assistant",
      color: "#22d3ee"
    },

    {
      title: "Reading",
      icon: "📖",
      path: "/reading",
      color: "#60a5fa"
    },

    {
      title: "Writing",
      icon: "✍️",
      path: "/writing",
      color: "#f59e0b"
    },

    {
      title: "Speaking",
      icon: "🎤",
      path: "/speaking",
      color: "#22c55e"
    },

    {
      title: "Listening",
      icon: "🎧",
      path: "/listening",
      color: "#8b5cf6"
    },

    {
      title: "Study Planner",
      icon: "📅",
      path: "/planner",
      color: "#ec4899"
    },

    {
      title: "Full Mock Tests",
      icon: "🚀",
      path: "/full-mocks",
      color: "#ef4444"
    }
  ];

  return (
    <div className="container fade-in">
      {/* HERO */}

      <div
        className="card"
        style={{
          background:
            "linear-gradient(135deg,#0891b2,#22d3ee)",

          color: "white",

          marginBottom: "40px",

          overflow: "hidden",

          position: "relative"
        }}
      >
        <div
          style={{
            position: "absolute",
            right: "-60px",
            top: "-60px",
            width: "220px",
            height: "220px",
            borderRadius: "50%",
            background:
              "rgba(255,255,255,0.12)"
          }}
        />

        <h1
          style={{
            fontSize: "52px",
            marginBottom: "15px"
          }}
        >
          Welcome Back 👋
        </h1>

        <p
          style={{
            opacity: 0.95,
            fontSize: "18px",
            marginBottom: "25px"
          }}
        >
          {user?.email}
        </p>

        <div
          style={{
            display: "inline-block",

            background:
              "rgba(255,255,255,0.2)",

            padding: "10px 18px",

            borderRadius: "999px",

            fontWeight: "700"
          }}
        >
          IELTS Success Journey
        </div>
      </div>

      {/* PERFORMANCE */}

      <h2 className="section-title">
        Performance Overview
      </h2>

      <div
        className="grid"
        style={{
          marginBottom: "50px"
        }}
      >
        <div className="card">
          <h3>🔥 Study Streak</h3>

          <h1
            style={{
              fontSize: "60px",
              color: "#22c55e",
              marginTop: "15px"
            }}
          >
            14
          </h1>

          <p
            style={{
              color: "#64748b"
            }}
          >
            Consecutive Days
          </p>
        </div>

        <div className="card">
          <h3>📈 Progress</h3>

          <h1
            style={{
              fontSize: "60px",
              color: "#22d3ee",
              marginTop: "15px"
            }}
          >
            68%
          </h1>

          <p
            style={{
              color: "#64748b"
            }}
          >
            Weekly Goal
          </p>
        </div>

        <div className="card">
          <h3>🎯 Estimated Band</h3>

          <h1
            style={{
              fontSize: "60px",
              color: "#f59e0b",
              marginTop: "15px"
            }}
          >
            7.0
          </h1>

          <p
            style={{
              color: "#64748b"
            }}
          >
            Current Prediction
          </p>
        </div>
      </div>

      {/* QUICK ACTIONS */}

      <h2 className="section-title">
        Quick Actions
      </h2>

      <div className="grid">
        {tools.map((tool) => (
          <Link
            key={tool.title}
            to={tool.path}
          >
            <div
              className="card"
              style={{
                cursor: "pointer",

                borderTop:
                  `5px solid ${tool.color}`
              }}
            >
              <div
                style={{
                  fontSize: "42px",
                  marginBottom: "15px"
                }}
              >
                {tool.icon}
              </div>

              <h3
                style={{
                  marginBottom: "10px"
                }}
              >
                {tool.title}
              </h3>

              <p
                style={{
                  color: "#64748b"
                }}
              >
                Open module
              </p>
            </div>
          </Link>
        ))}
      </div>

      {/* PREMIUM */}

      <div
        className="card"
        style={{
          marginTop: "60px",

          background:
            "linear-gradient(135deg,#111827,#1f2937)",

          color: "white"
        }}
      >
        <h2
          style={{
            marginBottom: "20px"
          }}
        >
          🚀 Premium Features
        </h2>

        <p
          style={{
            opacity: 0.9,
            lineHeight: "1.8",
            marginBottom: "25px"
          }}
        >
          Unlock full IELTS mock
          exams, advanced AI
          evaluation, performance
          analytics and exclusive
          learning tools.
        </p>

        <Link to="/full-mocks">
          <button
            className="primary-btn"
          >
            Open Premium
          </button>
        </Link>
      </div>

      {/* ACTIVITY */}

      <div
        className="card"
        style={{
          marginTop: "40px"
        }}
      >
        <h2
          style={{
            marginBottom: "25px"
          }}
        >
          Recent Activity
        </h2>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "18px"
          }}
        >
          <div>
            ✅ Completed Writing Task
          </div>

          <div>
            🎤 Speaking Practice
          </div>

          <div>
            📖 Reading Mock Test
          </div>

          <div>
            🔥 14-Day Streak Maintained
          </div>
        </div>
      </div>
    </div>
  );
}