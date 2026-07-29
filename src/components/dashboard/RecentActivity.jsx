import { Link } from "react-router-dom";
import { BookOpen, PenSquare, Mic, Headphones, BrainCircuit, ArrowUpRight } from "lucide-react";

const TYPE_META = {
  reading:   { icon: <BookOpen size={20} />,    gradient: "linear-gradient(135deg,#2563eb,#60a5fa)" },
  listening: { icon: <Headphones size={20} />,  gradient: "linear-gradient(135deg,#06b6d4,#67e8f9)" },
  writing:   { icon: <PenSquare size={20} />,   gradient: "linear-gradient(135deg,#f97316,#fb923c)" },
  speaking:  { icon: <Mic size={20} />,         gradient: "linear-gradient(135deg,#22c55e,#4ade80)" },
  ai:        { icon: <BrainCircuit size={20} />,gradient: "linear-gradient(135deg,#8b5cf6,#a78bfa)" },
};

const DEFAULT_ACTIVITIES = [
  { title: "Reading Practice",    description: "Completed Reading Test 3",         time: "Today",       type: "reading"   },
  { title: "Writing Evaluation",  description: "AI estimated Band 7.0",            time: "Yesterday",   type: "writing"   },
  { title: "Speaking Practice",   description: "Cue Card Evaluation Complete",     time: "2 Days Ago",  type: "speaking"  },
  { title: "Listening Practice",  description: "Scored 34/40 in Mock Test",        time: "3 Days Ago",  type: "listening" },
  { title: "AI Coach",            description: "Generated New Study Plan",         time: "4 Days Ago",  type: "ai"        },
];

export default function RecentActivity({ activities = [] }) {
  const list = activities.length ? activities : DEFAULT_ACTIVITIES;

  /* small summary strip */
  const counts = list.reduce((acc, a) => {
    acc[a.type] = (acc[a.type] || 0) + 1;
    return acc;
  }, {});

  return (
    <section className="dashboard-section">
      <div className="activity-card">

        {/* Header */}
        <div className="activity-header">
          <div>
            <h2>Recent Activity</h2>
            <p>Everything you've accomplished recently.</p>
          </div>
          <Link
            to="/insights?tab=History"
            style={{
              display: "inline-flex", alignItems: "center", gap: 6,
              fontSize: 13, fontWeight: 700, color: "#2563eb",
              padding: "8px 14px", borderRadius: 10,
              background: "rgba(37,99,235,.07)", border: "1px solid rgba(37,99,235,.12)",
              textDecoration: "none", whiteSpace: "nowrap",
            }}
          >
            Full History <ArrowUpRight size={14} />
          </Link>
        </div>

        {/* Summary chips */}
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 22 }}>
          {Object.entries(counts).map(([type, cnt]) => {
            const m = TYPE_META[type] || TYPE_META.ai;
            return (
              <div
                key={type}
                style={{
                  display: "inline-flex", alignItems: "center", gap: 6,
                  padding: "5px 12px", borderRadius: 99, fontSize: 12, fontWeight: 700,
                  background: "rgba(37,99,235,.06)", color: "#2563eb",
                  border: "1px solid rgba(37,99,235,.1)",
                }}
              >
                {m.icon} {cnt} {type}
              </div>
            );
          })}
        </div>

        {/* Timeline list */}
        <div className="activity-list">
          {list.map((activity, index) => {
            const meta = TYPE_META[activity.type] || TYPE_META.ai;
            return (
              <div key={index} className={`activity-item ${activity.type}`}>
                <div className="activity-ripple" />
                <div className="activity-icon" style={{ background: meta.gradient }}>
                  {meta.icon}
                </div>
                <div className="activity-content">
                  <h3>{activity.title}</h3>
                  <p>{activity.description}</p>
                </div>
                <div className="activity-time">{activity.time}</div>
              </div>
            );
          })}
        </div>

        <div className="activity-decoration one" />
        <div className="activity-decoration two" />
      </div>
    </section>
  );
}
