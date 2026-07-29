import { TrendingUp, TrendingDown, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";

const SKILL_META = {
  Reading:   { icon: "📖", color: "#4f8ef7", trend: [6.5, 7.0, 7.0, 7.0, 7.5, 7.5], delta: "+0.5" },
  Listening: { icon: "🎧", color: "#22d3ee", trend: [6.5, 7.0, 7.0, 7.5, 7.5, 8.0], delta: "+1.5" },
  Writing:   { icon: "✍️", color: "#8b5cf6", trend: [5.5, 6.0, 6.0, 6.5, 6.5, 7.0], delta: "+1.5" },
  Speaking:  { icon: "🎤", color: "#22d3a5", trend: [5.5, 6.0, 6.0, 6.5, 6.5, 6.5], delta: "+1.0" },
};

/* tiny inline sparkline */
function MicroSpark({ data, color }) {
  const max = Math.max(...data), min = Math.min(...data);
  const range = max - min || 1;
  const w = 60, h = 22;
  const pts = data
    .map((v, i) => `${(i / (data.length - 1)) * w},${h - ((v - min) / range) * (h * 0.8) - 2}`)
    .join(" ");
  return (
    <svg width={w} height={h} style={{ overflow: "visible", flexShrink: 0 }}>
      <polyline points={pts} fill="none" stroke={color} strokeWidth="2"
        strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function SkillBreakdown({ analytics = {} }) {
  const skills = [
    { name: "Reading",   score: analytics.reading   ?? 7.5, width: Math.round(((analytics.reading   ?? 7.5) / 9) * 100) },
    { name: "Listening", score: analytics.listening ?? 8.0, width: Math.round(((analytics.listening ?? 8.0) / 9) * 100) },
    { name: "Writing",   score: analytics.writing   ?? 6.5, width: Math.round(((analytics.writing   ?? 6.5) / 9) * 100) },
    { name: "Speaking",  score: analytics.speaking  ?? 6.5, width: Math.round(((analytics.speaking  ?? 6.5) / 9) * 100) },
  ];

  return (
    <section className="dashboard-section">
      <div className="section-header">
        <div>
          <h2>Skill Breakdown</h2>
          <p>Estimated performance across each IELTS module.</p>
        </div>
        <Link
          to="/insights?tab=Skills"
          style={{
            display: "inline-flex", alignItems: "center", gap: 6,
            fontSize: 14, fontWeight: 700, color: "var(--primary)",
            textDecoration: "none", padding: "8px 16px", borderRadius: 10,
            background: "rgba(37,99,235,.07)", border: "1px solid rgba(37,99,235,.12)",
            whiteSpace: "nowrap",
          }}
        >
          Detailed Skills <ArrowUpRight size={15} />
        </Link>
      </div>

      <div className="skills-card">
        {skills.map((skill) => {
          const meta = SKILL_META[skill.name];
          const lastTwo = meta.trend.slice(-2);
          const improved = lastTwo[1] >= lastTwo[0];
          return (
            <div key={skill.name} className="skill-item">
              {/* Top row */}
              <div className="skill-row">
                <span>
                  {meta.icon} {skill.name}
                </span>
                <strong>Band {skill.score}</strong>
              </div>

              {/* Progress bar */}
              <div className="skill-bar">
                <div
                  className={`fill ${skill.name.toLowerCase()}`}
                  style={{ width: `${skill.width}%` }}
                />
              </div>

              {/* Footer: label + sparkline + trend badge */}
              <div className="skill-footer">
                <span>
                  {skill.width}% of Band 9
                </span>

                <MicroSpark data={meta.trend} color={meta.color} />

                <div
                  className="skill-trend"
                  style={
                    improved
                      ? {}
                      : { background: "rgba(239,68,68,.08)", color: "#dc2626", borderColor: "rgba(239,68,68,.15)" }
                  }
                >
                  {improved
                    ? <TrendingUp size={13} />
                    : <TrendingDown size={13} />}
                  {meta.delta} overall
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
