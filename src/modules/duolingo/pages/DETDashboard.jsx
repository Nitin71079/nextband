import { useNavigate } from "react-router-dom";
import { Sparkles, BookOpen, Headphones, PenTool, Mic, Award, ArrowRight, PlayCircle, BarChart3 } from "lucide-react";
import "../styles/duolingo.css";

export default function DETDashboard() {
  const navigate = useNavigate();

  return (
    <div className="det-container">
      {/* ── DET Hero Header ────────────────────────────────────────── */}
      <div className="det-hero">
        <div>
          <span className="det-hero-badge">
            <Sparkles size={14} /> Duolingo English Test Prep
          </span>
          <h1>Master the DET with Adaptive AI</h1>
          <p>
            Experience realistic computer-adaptive DET practice, instant AI scoring, and subscore breakdowns for Literacy, Comprehension, Conversation, and Production.
          </p>
          <button className="det-btn-primary" onClick={() => navigate("/duolingo/test/det-full-mock-1")}>
            <PlayCircle size={20} /> Start Adaptive Practice Test →
          </button>
        </div>

        <div
          style={{
            background: "rgba(255,255,255,0.05)",
            padding: "24px 32px",
            borderRadius: "24px",
            border: "1px solid rgba(255,255,255,0.1)",
            textAlign: "center",
          }}
        >
          <div style={{ fontSize: "14px", color: "#94a3b8", fontWeight: "700" }}>Knarrow Practice Estimate</div>
          <div style={{ fontSize: "56px", fontWeight: "900", color: "#58cc02", margin: "4px 0" }}>115</div>
          <div style={{ fontSize: "13px", color: "#cbd5e1" }}>Out of 160 (CEFR B2 Level)</div>
        </div>
      </div>

      {/* ── Subscore Breakdown Cards ───────────────────────────────── */}
      <h2 style={{ fontSize: "22px", fontWeight: "800", marginBottom: "16px" }}>Subscore Breakdown</h2>
      <div className="det-subscore-grid">
        <div className="det-subscore-card">
          <div className="det-subscore-icon">📖</div>
          <div>
            <div style={{ fontSize: "13px", color: "var(--det-text-muted)", fontWeight: "700" }}>LITERACY</div>
            <div style={{ fontSize: "24px", fontWeight: "900" }}>110 / 160</div>
            <div style={{ fontSize: "12px", color: "var(--det-text-muted)" }}>Read and Write</div>
          </div>
        </div>

        <div className="det-subscore-card">
          <div className="det-subscore-icon">🧠</div>
          <div>
            <div style={{ fontSize: "13px", color: "var(--det-text-muted)", fontWeight: "700" }}>COMPREHENSION</div>
            <div style={{ fontSize: "24px", fontWeight: "900" }}>120 / 160</div>
            <div style={{ fontSize: "12px", color: "var(--det-text-muted)" }}>Read and Listen</div>
          </div>
        </div>

        <div className="det-subscore-card">
          <div className="det-subscore-icon">💬</div>
          <div>
            <div style={{ fontSize: "13px", color: "var(--det-text-muted)", fontWeight: "700" }}>CONVERSATION</div>
            <div style={{ fontSize: "24px", fontWeight: "900" }}>105 / 160</div>
            <div style={{ fontSize: "12px", color: "var(--det-text-muted)" }}>Listen and Speak</div>
          </div>
        </div>

        <div className="det-subscore-card">
          <div className="det-subscore-icon">✍️</div>
          <div>
            <div style={{ fontSize: "13px", color: "var(--det-text-muted)", fontWeight: "700" }}>PRODUCTION</div>
            <div style={{ fontSize: "24px", fontWeight: "900" }}>115 / 160</div>
            <div style={{ fontSize: "12px", color: "var(--det-text-muted)" }}>Write and Speak</div>
          </div>
        </div>
      </div>

      {/* ── Targeted Skill Practice Hub ────────────────────────────── */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
        <h2 style={{ fontSize: "22px", fontWeight: "800", margin: 0 }}>Targeted Skill Practice</h2>
        <button
          style={{
            background: "none",
            border: "none",
            color: "var(--det-primary)",
            fontWeight: "700",
            cursor: "pointer",
            display: "inline-flex",
            alignItems: "center",
            gap: "6px",
          }}
          onClick={() => navigate("/duolingo/practice")}
        >
          View All Skills <ArrowRight size={16} />
        </button>
      </div>

      <div className="det-stats-grid">
        <div
          className="det-stat-card"
          style={{ cursor: "pointer" }}
          onClick={() => navigate("/duolingo/practice/reading")}
        >
          <BookOpen color="#58cc02" size={28} />
          <h3 style={{ margin: "12px 0 4px", fontSize: "18px", fontWeight: "800" }}>Reading Tasks</h3>
          <p style={{ fontSize: "13px", color: "var(--det-text-muted)", margin: 0 }}>
            Read & Complete, Read & Select, Interactive Reading passages.
          </p>
        </div>

        <div
          className="det-stat-card"
          style={{ cursor: "pointer" }}
          onClick={() => navigate("/duolingo/practice/listening")}
        >
          <Headphones color="#1cb0f6" size={28} />
          <h3 style={{ margin: "12px 0 4px", fontSize: "18px", fontWeight: "800" }}>Listening Tasks</h3>
          <p style={{ fontSize: "13px", color: "var(--det-text-muted)", margin: 0 }}>
            Listen & Type dictation, Interactive Listening scenarios.
          </p>
        </div>

        <div
          className="det-stat-card"
          style={{ cursor: "pointer" }}
          onClick={() => navigate("/duolingo/practice/writing")}
        >
          <PenTool color="#ce82ff" size={28} />
          <h3 style={{ margin: "12px 0 4px", fontSize: "18px", fontWeight: "800" }}>Writing Tasks</h3>
          <p style={{ fontSize: "13px", color: "var(--det-text-muted)", margin: 0 }}>
            Interactive Writing, Writing Samples with instant Groq AI feedback.
          </p>
        </div>

        <div
          className="det-stat-card"
          style={{ cursor: "pointer" }}
          onClick={() => navigate("/duolingo/practice/speaking")}
        >
          <Mic color="#ff9600" size={28} />
          <h3 style={{ margin: "12px 0 4px", fontSize: "18px", fontWeight: "800" }}>Speaking Tasks</h3>
          <p style={{ fontSize: "13px", color: "var(--det-text-muted)", margin: 0 }}>
            Read Aloud, Interactive Speaking, Speaking Samples with audio evaluation.
          </p>
        </div>
      </div>
    </div>
  );
}
