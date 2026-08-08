import { useNavigate, useParams } from "react-router-dom";
import { BookOpen, Headphones, PenTool, Mic, ArrowLeft, Play } from "lucide-react";
import { detItemBank } from "../../../data/duolingo/itemBank";
import "../styles/duolingo.css";

export default function DETPracticeCenter() {
  const navigate = useNavigate();
  const { skill } = useParams();

  const filteredItems = skill
    ? detItemBank.filter((i) => i.skill.toLowerCase() === skill.toLowerCase() || i.type.includes(skill.toLowerCase()))
    : detItemBank;

  return (
    <div className="det-container">
      <button
        onClick={() => navigate("/duolingo")}
        style={{
          background: "none",
          border: "none",
          color: "var(--det-text-muted)",
          cursor: "pointer",
          display: "inline-flex",
          alignItems: "center",
          gap: "8px",
          marginBottom: "24px",
          fontWeight: "700",
        }}
      >
        <ArrowLeft size={18} /> Back to DET Dashboard
      </button>

      <h1 style={{ fontSize: "28px", fontWeight: "900", marginBottom: "8px" }}>
        {skill ? `${skill.toUpperCase()} Skill Practice` : "DET Practice Center"}
      </h1>
      <p style={{ color: "var(--det-text-muted)", marginBottom: "32px" }}>
        Select individual task types to build mastery across Reading, Listening, Writing, and Speaking.
      </p>

      <div className="det-stats-grid">
        {filteredItems.map((item) => (
          <div key={item.id} className="det-stat-card">
            <span className="det-hero-badge" style={{ textTransform: "uppercase", fontSize: "11px" }}>
              {item.type}
            </span>
            <h3 style={{ fontSize: "18px", fontWeight: "800", margin: "12px 0 8px" }}>
              {item.prompt.length > 60 ? item.prompt.slice(0, 60) + "…" : item.prompt}
            </h3>
            <div style={{ fontSize: "13px", color: "var(--det-text-muted)", marginBottom: "16px" }}>
              Time limit: {item.timeLimit}s · Difficulty: {item.difficulty}
            </div>
            <button
              className="det-btn-primary"
              style={{ width: "100%", justifyContent: "center", padding: "10px" }}
              onClick={() => navigate(`/duolingo/test/${item.id}`)}
            >
              <Play size={16} /> Practice Task →
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
