import { Link } from "react-router-dom";
import { Target, Clock3, CheckCircle2, ArrowRight } from "lucide-react";

/* SVG ring progress — no library */
function RingProgress({ pct, size = 96, stroke = 8, color = "#2563eb" }) {
  const r = (size - stroke) / 2;
  const circ = 2 * Math.PI * r;
  const dash = (pct / 100) * circ;
  return (
    <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
      <circle cx={size / 2} cy={size / 2} r={r}
        fill="none" stroke="rgba(37,99,235,.12)" strokeWidth={stroke} />
      <circle cx={size / 2} cy={size / 2} r={r}
        fill="none" stroke={color} strokeWidth={stroke}
        strokeDasharray={`${dash} ${circ}`}
        strokeLinecap="round"
        style={{ transition: "stroke-dasharray .8s ease" }}
      />
    </svg>
  );
}

export default function DailyGoal({ analytics = {} }) {
  const goal = analytics.dailyGoal ?? {
    title: "Complete One Listening Test",
    time: "30 Minutes",
    progress: 60,
    completed: false,
  };

  return (
    <section className="dashboard-section">
      <div className="goal-card">
        <div className="goal-left">
          <span>TODAY'S GOAL</span>
          <h2>{goal.title}</h2>
          <p>Estimated Time: {goal.time}</p>

          <div className="goal-progress">
            <div
              className="goal-progress-fill"
              style={{ width: `${goal.progress}%` }}
            />
          </div>
          <small>{goal.progress}% Completed Today</small>
        </div>

        <div className="goal-right">
          {/* Ring replaces plain icon */}
          <div style={{ position: "relative", width: 96, height: 96, flexShrink: 0 }}>
            <RingProgress pct={goal.progress} size={96} stroke={8}
              color={goal.completed ? "#22c55e" : "#2563eb"} />
            <div style={{
              position: "absolute", inset: 0,
              display: "flex", alignItems: "center", justifyContent: "center",
              flexDirection: "column", gap: 1,
            }}>
              {goal.completed
                ? <CheckCircle2 size={28} color="#22c55e" />
                : <Target size={24} color="#2563eb" />}
              <span style={{ fontSize: 12, fontWeight: 700, color: "#2563eb" }}>{goal.progress}%</span>
            </div>
          </div>

          <Link to="/planner">
            <button className="goal-btn">
              <Clock3 size={17} />
              {goal.completed ? "View Progress" : "Start Now"}
              <ArrowRight size={17} />
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}
