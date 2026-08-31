import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, RefreshCw, Trophy, Sparkles, CheckCircle2 } from "lucide-react";
import { calculateDETPracticeScores, detToIelts, detToCEFR } from "../services/detScoringEngine";
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
          { skill: "conversation", accuracy: 0.8, difficulty: 105 },
          { skill: "production", accuracy: 0.85, difficulty: 120 },
        ]
  );

  const ieltsVal = scores.ieltsEquivalent || detToIelts(scores.overall);
  const cefrVal = scores.cefrLevel || detToCEFR(scores.overall);

  return (
    <div className="det-container" style={{ maxWidth: "1000px", margin: "0 auto", padding: "32px 16px" }}>
      <button
        onClick={() => navigate("/duolingo")}
        style={{
          background: "none",
          border: "none",
          color: "var(--det-text-muted, #64748b)",
          cursor: "pointer",
          display: "inline-flex",
          alignItems: "center",
          gap: "8px",
          marginBottom: "24px",
          fontWeight: "700",
          fontSize: "14px"
        }}
      >
        <ArrowLeft size={18} /> Back to DET Hub
      </button>

      {/* ── GREEN OFFICIAL DET ESTIMATED RESULT HERO CARD ── */}
      <div
        style={{
          background: "linear-gradient(135deg, #059669 0%, #047857 100%)",
          borderRadius: "28px",
          padding: "36px 40px",
          color: "#ffffff",
          boxShadow: "0 20px 40px rgba(5, 150, 105, 0.25)",
          marginBottom: "40px",
          position: "relative",
          overflow: "hidden"
        }}
      >
        <div style={{ fontSize: "13px", fontWeight: "900", letterSpacing: "1.5px", textTransform: "uppercase", opacity: 0.9, marginBottom: "16px" }}>
          OFFICIAL DET ESTIMATED RESULT
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "24px" }}>
          {/* Main Overall Score */}
          <div>
            <div style={{ display: "flex", alignItems: "baseline", gap: "8px" }}>
              <span style={{ fontSize: "72px", fontWeight: "900", lineHeight: "1" }}>{scores.overall}</span>
              <span style={{ fontSize: "28px", fontWeight: "700", opacity: 0.8 }}>/ 160</span>
            </div>
            <div style={{ fontSize: "16px", fontWeight: "700", opacity: 0.9, marginTop: "8px" }}>
              Overall Duolingo English Test Score
            </div>
          </div>

          {/* Pure DET Score Badges */}
          <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
            <div
              style={{
                background: "rgba(255, 255, 255, 0.15)",
                backdropFilter: "blur(10px)",
                borderRadius: "20px",
                padding: "18px 24px",
                border: "1px solid rgba(255, 255, 255, 0.2)",
                minWidth: "160px"
              }}
            >
              <div style={{ fontSize: "11px", fontWeight: "900", textTransform: "uppercase", opacity: 0.8, letterSpacing: "0.5px" }}>
                DET SCORE TIER
              </div>
              <div style={{ fontSize: "22px", fontWeight: "900", marginTop: "4px" }}>
                {scores.overall >= 120 ? "Advanced Academic" : "Intermediate"}
              </div>
            </div>

            <div
              style={{
                background: "rgba(255, 255, 255, 0.15)",
                backdropFilter: "blur(10px)",
                borderRadius: "20px",
                padding: "18px 24px",
                border: "1px solid rgba(255, 255, 255, 0.2)",
                minWidth: "180px"
              }}
            >
              <div style={{ fontSize: "11px", fontWeight: "900", textTransform: "uppercase", opacity: 0.8, letterSpacing: "0.5px" }}>
                CEFR LEVEL
              </div>
              <div style={{ fontSize: "20px", fontWeight: "900", marginTop: "4px" }}>
                {cefrVal}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── DET SUBSCORES BREAKDOWN GRID ── */}
      <h2 style={{ fontSize: "24px", fontWeight: "900", color: "var(--det-text, #0f172a)", marginBottom: "20px" }}>
        DET Subscores Breakdown
      </h2>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "20px", marginBottom: "40px" }}>
        {/* Literacy */}
        <div style={{ background: "var(--card, #ffffff)", border: "1px solid var(--border, #e2e8f0)", borderRadius: "20px", padding: "24px", boxShadow: "0 4px 12px rgba(0,0,0,0.03)" }}>
          <div style={{ fontSize: "13px", fontWeight: "800", color: "#64748b", textTransform: "uppercase" }}>Literacy</div>
          <div style={{ fontSize: "36px", fontWeight: "900", color: "#059669", margin: "8px 0" }}>
            {scores.integrated.literacy} <span style={{ fontSize: "16px", color: "#94a3b8", fontWeight: "700" }}>/ 160</span>
          </div>
          <div style={{ width: "100%", background: "#e2e8f0", height: "8px", borderRadius: "999px", overflow: "hidden" }}>
            <div style={{ width: `${(scores.integrated.literacy / 160) * 100}%`, background: "#059669", height: "100%", borderRadius: "999px" }} />
          </div>
        </div>

        {/* Comprehension */}
        <div style={{ background: "var(--card, #ffffff)", border: "1px solid var(--border, #e2e8f0)", borderRadius: "20px", padding: "24px", boxShadow: "0 4px 12px rgba(0,0,0,0.03)" }}>
          <div style={{ fontSize: "13px", fontWeight: "800", color: "#64748b", textTransform: "uppercase" }}>Comprehension</div>
          <div style={{ fontSize: "36px", fontWeight: "900", color: "#059669", margin: "8px 0" }}>
            {scores.integrated.comprehension} <span style={{ fontSize: "16px", color: "#94a3b8", fontWeight: "700" }}>/ 160</span>
          </div>
          <div style={{ width: "100%", background: "#e2e8f0", height: "8px", borderRadius: "999px", overflow: "hidden" }}>
            <div style={{ width: `${(scores.integrated.comprehension / 160) * 100}%`, background: "#059669", height: "100%", borderRadius: "999px" }} />
          </div>
        </div>

        {/* Conversation */}
        <div style={{ background: "var(--card, #ffffff)", border: "1px solid var(--border, #e2e8f0)", borderRadius: "20px", padding: "24px", boxShadow: "0 4px 12px rgba(0,0,0,0.03)" }}>
          <div style={{ fontSize: "13px", fontWeight: "800", color: "#64748b", textTransform: "uppercase" }}>Conversation</div>
          <div style={{ fontSize: "36px", fontWeight: "900", color: "#059669", margin: "8px 0" }}>
            {scores.integrated.conversation} <span style={{ fontSize: "16px", color: "#94a3b8", fontWeight: "700" }}>/ 160</span>
          </div>
          <div style={{ width: "100%", background: "#e2e8f0", height: "8px", borderRadius: "999px", overflow: "hidden" }}>
            <div style={{ width: `${(scores.integrated.conversation / 160) * 100}%`, background: "#059669", height: "100%", borderRadius: "999px" }} />
          </div>
        </div>

        {/* Production */}
        <div style={{ background: "var(--card, #ffffff)", border: "1px solid var(--border, #e2e8f0)", borderRadius: "20px", padding: "24px", boxShadow: "0 4px 12px rgba(0,0,0,0.03)" }}>
          <div style={{ fontSize: "13px", fontWeight: "800", color: "#64748b", textTransform: "uppercase" }}>Production</div>
          <div style={{ fontSize: "36px", fontWeight: "900", color: "#059669", margin: "8px 0" }}>
            {scores.integrated.production} <span style={{ fontSize: "16px", color: "#94a3b8", fontWeight: "700" }}>/ 160</span>
          </div>
          <div style={{ width: "100%", background: "#e2e8f0", height: "8px", borderRadius: "999px", overflow: "hidden" }}>
            <div style={{ width: `${(scores.integrated.production / 160) * 100}%`, background: "#059669", height: "100%", borderRadius: "999px" }} />
          </div>
        </div>
      </div>

      {/* ── ACTION BUTTONS ── */}
      <div style={{ display: "flex", gap: "16px", justifyContent: "center" }}>
        <button
          onClick={() => navigate("/duolingo")}
          style={{
            padding: "16px 32px",
            borderRadius: "999px",
            border: "1px solid var(--border, #cbd5e1)",
            background: "#ffffff",
            color: "#334155",
            fontWeight: "800",
            fontSize: "15px",
            cursor: "pointer"
          }}
        >
          Back to DET Center
        </button>

        <button
          onClick={() => {
            const randomId = Math.floor(Math.random() * 12) + 1;
            navigate(`/mock/det/${randomId}`);
          }}
          style={{
            padding: "16px 36px",
            borderRadius: "999px",
            border: "none",
            background: "#059669",
            color: "#ffffff",
            fontWeight: "800",
            fontSize: "15px",
            cursor: "pointer",
            boxShadow: "0 6px 20px rgba(5, 150, 105, 0.3)"
          }}
        >
          🎲 Retake Random DET Practice Test
        </button>
      </div>
    </div>
  );
}
