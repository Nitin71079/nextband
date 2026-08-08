import { useNavigate, useParams } from "react-router-dom";
import { Sparkles, Trophy, ArrowLeft, RefreshCw, CheckCircle2, AlertCircle } from "lucide-react";
import { calculateDETPracticeScores } from "../services/detScoringEngine";
import "../styles/duolingo.css";

export default function DETResultsPage() {
  const navigate = useNavigate();
  const { id } = useParams();

  let storedResponses = [];
  try {
    const raw = sessionStorage.getItem(`det_result_${id}`);
    if (raw) storedResponses = JSON.parse(raw);
  } catch (e) {
    console.error("Could not parse DET session responses:", e);
  }

  const scores = calculateDETPracticeScores(
    storedResponses.length > 0
      ? storedResponses
      : [
          { skill: "literacy", accuracy: 0.85, difficulty: 100 },
          { skill: "comprehension", accuracy: 0.9, difficulty: 110 },
          { skill: "conversation", accuracy: 0.8, difficulty: 95 },
          { skill: "production", accuracy: 0.85, difficulty: 105 },
        ]
  );

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
        <ArrowLeft size={18} /> Return to DET Dashboard
      </button>

      {/* ── Results Score Hero ────────────────────────────────────── */}
      <div className="det-hero">
        <div>
          <span className="det-hero-badge">
            <Trophy size={14} /> Test Complete
          </span>
          <h1>Your Practice Results</h1>
          <p>
            Here is your Knarrow Practice Estimate based on your adaptive performance.
          </p>
          <button className="det-btn-primary" onClick={() => navigate("/duolingo/test/det-full-mock-1")}>
            <RefreshCw size={18} /> Retake Practice Test →
          </button>
        </div>

        <div
          style={{
            background: "rgba(255,255,255,0.05)",
            padding: "24px 36px",
            borderRadius: "24px",
            border: "1px solid rgba(255,255,255,0.1)",
            textAlign: "center",
          }}
        >
          <div style={{ fontSize: "14px", color: "#94a3b8", fontWeight: "700" }}>{scores.label}</div>
          <div style={{ fontSize: "64px", fontWeight: "900", color: "#58cc02", margin: "4px 0" }}>
            {scores.overall}
          </div>
          <div style={{ fontSize: "13px", color: "#cbd5e1" }}>Scale: 10–160</div>
        </div>
      </div>

      {/* ── Subscore Breakdown ───────────────────────────────────── */}
      <h2 style={{ fontSize: "22px", fontWeight: "800", marginBottom: "16px" }}>Integrated Subscores</h2>
      <div className="det-subscore-grid">
        <div className="det-subscore-card">
          <div className="det-subscore-icon">📖</div>
          <div>
            <div style={{ fontSize: "13px", color: "var(--det-text-muted)", fontWeight: "700" }}>LITERACY</div>
            <div style={{ fontSize: "28px", fontWeight: "900" }}>{scores.integrated.literacy} / 160</div>
          </div>
        </div>

        <div className="det-subscore-card">
          <div className="det-subscore-icon">🧠</div>
          <div>
            <div style={{ fontSize: "13px", color: "var(--det-text-muted)", fontWeight: "700" }}>COMPREHENSION</div>
            <div style={{ fontSize: "28px", fontWeight: "900" }}>{scores.integrated.comprehension} / 160</div>
          </div>
        </div>

        <div className="det-subscore-card">
          <div className="det-subscore-icon">💬</div>
          <div>
            <div style={{ fontSize: "13px", color: "var(--det-text-muted)", fontWeight: "700" }}>CONVERSATION</div>
            <div style={{ fontSize: "28px", fontWeight: "900" }}>{scores.integrated.conversation} / 160</div>
          </div>
        </div>

        <div className="det-subscore-card">
          <div className="det-subscore-icon">✍️</div>
          <div>
            <div style={{ fontSize: "13px", color: "var(--det-text-muted)", fontWeight: "700" }}>PRODUCTION</div>
            <div style={{ fontSize: "28px", fontWeight: "900" }}>{scores.integrated.production} / 160</div>
          </div>
        </div>
      </div>

      {/* ── Individual Skills Breakdown ──────────────────────────── */}
      <h2 style={{ fontSize: "22px", fontWeight: "800", marginBottom: "16px" }}>Individual Modality Scores</h2>
      <div className="det-stats-grid">
        <div className="det-stat-card">
          <span style={{ fontSize: "13px", fontWeight: "700", color: "var(--det-text-muted)" }}>READING</span>
          <div className="det-stat-val">{scores.individual.reading}</div>
        </div>
        <div className="det-stat-card">
          <span style={{ fontSize: "13px", fontWeight: "700", color: "var(--det-text-muted)" }}>LISTENING</span>
          <div className="det-stat-val">{scores.individual.listening}</div>
        </div>
        <div className="det-stat-card">
          <span style={{ fontSize: "13px", fontWeight: "700", color: "var(--det-text-muted)" }}>WRITING</span>
          <div className="det-stat-val">{scores.individual.writing}</div>
        </div>
        <div className="det-stat-card">
          <span style={{ fontSize: "13px", fontWeight: "700", color: "var(--det-text-muted)" }}>SPEAKING</span>
          <div className="det-stat-val">{scores.individual.speaking}</div>
        </div>
      </div>

      {/* ── Strengths & Key Areas ───────────────────────────────── */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", marginTop: "32px" }}>
        <div style={{ background: "var(--det-surface-2)", padding: "24px", borderRadius: "20px", border: "1px solid var(--det-border)" }}>
          <h3 style={{ margin: "0 0 12px", display: "flex", alignItems: "center", gap: "8px", color: "#16a34a" }}>
            <CheckCircle2 size={20} /> Key Strengths
          </h3>
          <ul style={{ margin: 0, paddingLeft: "20px", lineHeight: "1.8", color: "var(--det-text-muted)" }}>
            <li>Strong performance in Reading comprehension tasks.</li>
            <li>Accurate vocabulary selection in Read & Select.</li>
            <li>Consistent task completion across Writing samples.</li>
          </ul>
        </div>

        <div style={{ background: "var(--det-surface-2)", padding: "24px", borderRadius: "20px", border: "1px solid var(--det-border)" }}>
          <h3 style={{ margin: "0 0 12px", display: "flex", alignItems: "center", gap: "8px", color: "#d97706" }}>
            <AlertCircle size={20} /> Recommended Practice Focus
          </h3>
          <ul style={{ margin: 0, paddingLeft: "20px", lineHeight: "1.8", color: "var(--det-text-muted)" }}>
            <li>Improve fluency and response length in Interactive Speaking.</li>
            <li>Practice rapid dictation accuracy in Listen & Type.</li>
            <li>Review C-test completion patterns in Read & Complete.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
