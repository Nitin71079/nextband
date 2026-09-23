import React, { useState } from "react";
import { Clock, AlertTriangle, CheckCircle2, RotateCcw, Sparkles, HelpCircle, ArrowRight } from "lucide-react";

export default function AttemptHeatmapWidget({ questionsCount = 20, onRetakeMissed }) {
  const [selectedQuestion, setSelectedQuestion] = useState(null);

  // Mock question time heatmap dataset
  const heatmapData = Array.from({ length: questionsCount }, (_, i) => {
    const qNum = i + 1;
    const timeSpent = Math.floor(Math.random() * 110) + 10; // 10s to 120s
    const isCorrect = i % 4 !== 0; // 75% accuracy mockup
    let status = "optimal"; // "rushed" (<20s), "optimal" (20-80s), "stuck" (>80s)
    if (timeSpent < 20) status = "rushed";
    else if (timeSpent > 80) status = "stuck";

    return { qNum, timeSpent, isCorrect, status };
  });

  const incorrectCount = heatmapData.filter((q) => !q.isCorrect).length;

  return (
    <div style={{ background: "rgba(30,41,59,0.85)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 24, padding: 24, backdropFilter: "blur(12px)" }}>
      
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16, flexWrap: "wrap", gap: 12 }}>
        <div>
          <h4 style={{ fontSize: 18, fontWeight: 900, color: "#ffffff", margin: 0, display: "flex", alignItems: "center", gap: 8 }}>
            <Clock size={20} color="#38bdf8" /> Time-Per-Question Heatmap
          </h4>
          <p style={{ fontSize: 13, color: "#94a3b8", margin: "4px 0 0 0" }}>
            Click any block to inspect time efficiency and AI hints
          </p>
        </div>

        <button
          onClick={() => onRetakeMissed && onRetakeMissed(heatmapData.filter(q => !q.isCorrect))}
          style={{ background: "linear-gradient(135deg, #0284c7, #7c3aed)", color: "#ffffff", border: "none", borderRadius: 14, padding: "10px 18px", fontWeight: 800, fontSize: 13, cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 6, boxShadow: "0 4px 14px rgba(2,132,199,0.3)" }}
        >
          <RotateCcw size={15} /> Retake {incorrectCount} Missed Questions →
        </button>
      </div>

      {/* Heatmap Grid Blocks */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(36px, 1fr))", gap: 8, marginBottom: 16 }}>
        {heatmapData.map((q) => {
          let bgColor = "rgba(34,197,94,0.25)";
          let borderColor = "rgba(34,197,94,0.5)";
          let textColor = "#22c55e";

          if (!q.isCorrect) {
            bgColor = "rgba(239,68,68,0.25)";
            borderColor = "rgba(239,68,68,0.5)";
            textColor = "#ef4444";
          } else if (q.status === "stuck") {
            bgColor = "rgba(245,158,11,0.25)";
            borderColor = "rgba(245,158,11,0.5)";
            textColor = "#f59e0b";
          }

          return (
            <div
              key={q.qNum}
              onClick={() => setSelectedQuestion(q)}
              style={{
                background: bgColor,
                border: `1px solid ${borderColor}`,
                borderRadius: 10,
                height: 42,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                transition: "all 0.2s ease"
              }}
            >
              <span style={{ fontSize: 12, fontWeight: 900, color: textColor }}>Q{q.qNum}</span>
              <span style={{ fontSize: 9, color: "#cbd5e1", fontWeight: 700 }}>{q.timeSpent}s</span>
            </div>
          );
        })}
      </div>

      {/* Legend & Detail Panel */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 12, color: "#94a3b8", flexWrap: "wrap", gap: 12, borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: 14 }}>
        <div style={{ display: "flex", gap: 16 }}>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
            <span style={{ width: 10, height: 10, borderRadius: 3, background: "#22c55e" }} /> Correct / Optimal
          </span>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
            <span style={{ width: 10, height: 10, borderRadius: 3, background: "#f59e0b" }} /> Time Trap (&gt;80s)
          </span>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
            <span style={{ width: 10, height: 10, borderRadius: 3, background: "#ef4444" }} /> Incorrect
          </span>
        </div>

        {selectedQuestion && (
          <div style={{ background: "rgba(56,189,248,0.15)", color: "#38bdf8", padding: "4px 12px", borderRadius: 8, fontWeight: 800 }}>
            Inspecting Q{selectedQuestion.qNum}: {selectedQuestion.timeSpent}s ({selectedQuestion.isCorrect ? "Correct" : "Incorrect"})
          </div>
        )}
      </div>

    </div>
  );
}
