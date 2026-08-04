import React from "react";
import AIErrorCard from "./AIErrorCard";
import { Sparkles, Award, CheckCircle, AlertTriangle, Lightbulb, FileText } from "lucide-react";

export default function WritingReport({ report }) {
  if (!report) return null;

  if (!report.success) {
    return <AIErrorCard error={report.error} />;
  }

  const task1 = report.task1 || {};
  const task2 = report.task2 || {};
  const overallBand = report.overallBand || 6.0;

  return (
    <div style={{ background: "#ffffff", padding: "30px", borderRadius: "24px", marginTop: "24px", boxShadow: "0 10px 30px rgba(15,23,42,0.06)", border: "1px solid #e2e8f0" }}>
      
      {/* 🏆 OVERALL CALCULATED RESULT CARD */}
      <div
        style={{
          background: "linear-gradient(135deg, #0f172a, #1e293b)",
          color: "#ffffff",
          padding: "32px",
          borderRadius: "20px",
          marginBottom: "32px",
          boxShadow: "0 12px 30px rgba(15,23,42,0.25)",
          textAlign: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "rgba(255,255,255,0.15)", color: "#38bdf8", padding: "6px 16px", borderRadius: "20px", fontSize: "13px", fontWeight: "800", marginBottom: "16px" }}>
          <Sparkles size={16} /> OFFICIAL IELTS CALCULATED RESULT
        </div>

        <div style={{ fontSize: "72px", fontWeight: "900", color: "#38bdf8", lineHeight: "1", margin: "10px 0" }}>
          {overallBand.toFixed(1)}
        </div>
        <div style={{ fontSize: "18px", fontWeight: "800", color: "#f8fafc" }}>
          Overall IELTS Writing Band
        </div>

        {/* ⚖️ WEIGHTING FORMULA BREAKDOWN */}
        <div
          style={{
            marginTop: "20px",
            background: "rgba(255,255,255,0.08)",
            border: "1px solid rgba(255,255,255,0.15)",
            padding: "14px 20px",
            borderRadius: "14px",
            fontSize: "14px",
            color: "#cbd5e1",
            display: "inline-block",
            maxWidth: "600px",
          }}
        >
          <strong>Weighting Formula:</strong>{" "}
          <span style={{ color: "#38bdf8", fontWeight: "700" }}>33.3% Task 1</span> (Band {(task1.band || 0).toFixed(1)}) +{" "}
          <span style={{ color: "#fb923c", fontWeight: "700" }}>66.7% Task 2</span> (Band {(task2.band || 0).toFixed(1)})
          <div style={{ fontSize: "12px", opacity: 0.8, marginTop: "4px" }}>
            {report.calculationBreakdown || "Rounded according to official IELTS band rules."}
          </div>
        </div>
      </div>

      {/* 📊 SEPARATE TASK RESULTS GRID */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px" }}>
        
        {/* ====================================
            TASK 1 SEPARATE RESULT
        ==================================== */}
        <div
          style={{
            background: "#f0f9ff",
            border: "2px solid #bae6fd",
            borderRadius: "20px",
            padding: "24px",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
            <div>
              <h3 style={{ fontSize: "20px", fontWeight: "800", color: "#0369a1", margin: 0 }}>
                📊 Task 1 Result (33.3% Weight)
              </h3>
              <span style={{ fontSize: "13px", color: "#0284c7" }}>
                Word Count: <strong>{task1.wordCount || 0}</strong> words
              </span>
            </div>
            <div style={{ background: "#0284c7", color: "#ffffff", padding: "8px 16px", borderRadius: "14px", fontSize: "24px", fontWeight: "900" }}>
              {(task1.band || 0).toFixed(1)}
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", marginBottom: "20px" }}>
            <div style={{ background: "#ffffff", padding: "10px 14px", borderRadius: "12px", border: "1px solid #e0f2fe" }}>
              <div style={{ fontSize: "11px", fontWeight: "700", color: "#64748b" }}>TASK ACHIEVEMENT</div>
              <div style={{ fontSize: "18px", fontWeight: "800", color: "#0284c7" }}>{task1.taskAchievement || "--"}</div>
            </div>
            <div style={{ background: "#ffffff", padding: "10px 14px", borderRadius: "12px", border: "1px solid #e0f2fe" }}>
              <div style={{ fontSize: "11px", fontWeight: "700", color: "#64748b" }}>COHERENCE & COHESION</div>
              <div style={{ fontSize: "18px", fontWeight: "800", color: "#0284c7" }}>{task1.coherenceCohesion || "--"}</div>
            </div>
            <div style={{ background: "#ffffff", padding: "10px 14px", borderRadius: "12px", border: "1px solid #e0f2fe" }}>
              <div style={{ fontSize: "11px", fontWeight: "700", color: "#64748b" }}>LEXICAL RESOURCE</div>
              <div style={{ fontSize: "18px", fontWeight: "800", color: "#0284c7" }}>{task1.lexicalResource || "--"}</div>
            </div>
            <div style={{ background: "#ffffff", padding: "10px 14px", borderRadius: "12px", border: "1px solid #e0f2fe" }}>
              <div style={{ fontSize: "11px", fontWeight: "700", color: "#64748b" }}>GRAMMAR ACCURACY</div>
              <div style={{ fontSize: "18px", fontWeight: "800", color: "#0284c7" }}>{task1.grammarRangeAccuracy || "--"}</div>
            </div>
          </div>

          {/* Task 1 Feedback */}
          {task1.strengths?.length > 0 && (
            <div style={{ marginBottom: "12px" }}>
              <strong style={{ fontSize: "13px", color: "#166534", display: "flex", alignItems: "center", gap: "6px" }}>
                <CheckCircle size={14} /> Strengths:
              </strong>
              <ul style={{ margin: "4px 0 0 16px", padding: 0, fontSize: "13px", color: "#334155" }}>
                {task1.strengths.map((item, idx) => <li key={idx}>{item}</li>)}
              </ul>
            </div>
          )}

          {task1.weaknesses?.length > 0 && (
            <div style={{ marginBottom: "12px" }}>
              <strong style={{ fontSize: "13px", color: "#991b1b", display: "flex", alignItems: "center", gap: "6px" }}>
                <AlertTriangle size={14} /> Areas to Improve:
              </strong>
              <ul style={{ margin: "4px 0 0 16px", padding: 0, fontSize: "13px", color: "#334155" }}>
                {task1.weaknesses.map((item, idx) => <li key={idx}>{item}</li>)}
              </ul>
            </div>
          )}

          {task1.recommendations?.length > 0 && (
            <div>
              <strong style={{ fontSize: "13px", color: "#854d0e", display: "flex", alignItems: "center", gap: "6px" }}>
                <Lightbulb size={14} /> Recommendations:
              </strong>
              <ul style={{ margin: "4px 0 0 16px", padding: 0, fontSize: "13px", color: "#334155" }}>
                {task1.recommendations.map((item, idx) => <li key={idx}>{item}</li>)}
              </ul>
            </div>
          )}
        </div>

        {/* ====================================
            TASK 2 SEPARATE RESULT
        ==================================== */}
        <div
          style={{
            background: "#fff7ed",
            border: "2px solid #fed7aa",
            borderRadius: "20px",
            padding: "24px",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
            <div>
              <h3 style={{ fontSize: "20px", fontWeight: "800", color: "#c2410c", margin: 0 }}>
                ✍ Task 2 Result (66.7% Weight)
              </h3>
              <span style={{ fontSize: "13px", color: "#ea580c" }}>
                Word Count: <strong>{task2.wordCount || 0}</strong> words
              </span>
            </div>
            <div style={{ background: "#ea580c", color: "#ffffff", padding: "8px 16px", borderRadius: "14px", fontSize: "24px", fontWeight: "900" }}>
              {(task2.band || 0).toFixed(1)}
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", marginBottom: "20px" }}>
            <div style={{ background: "#ffffff", padding: "10px 14px", borderRadius: "12px", border: "1px solid #ffedd5" }}>
              <div style={{ fontSize: "11px", fontWeight: "700", color: "#64748b" }}>TASK RESPONSE</div>
              <div style={{ fontSize: "18px", fontWeight: "800", color: "#ea580c" }}>{task2.taskResponse || "--"}</div>
            </div>
            <div style={{ background: "#ffffff", padding: "10px 14px", borderRadius: "12px", border: "1px solid #ffedd5" }}>
              <div style={{ fontSize: "11px", fontWeight: "700", color: "#64748b" }}>COHERENCE & COHESION</div>
              <div style={{ fontSize: "18px", fontWeight: "800", color: "#ea580c" }}>{task2.coherenceCohesion || "--"}</div>
            </div>
            <div style={{ background: "#ffffff", padding: "10px 14px", borderRadius: "12px", border: "1px solid #ffedd5" }}>
              <div style={{ fontSize: "11px", fontWeight: "700", color: "#64748b" }}>LEXICAL RESOURCE</div>
              <div style={{ fontSize: "18px", fontWeight: "800", color: "#ea580c" }}>{task2.lexicalResource || "--"}</div>
            </div>
            <div style={{ background: "#ffffff", padding: "10px 14px", borderRadius: "12px", border: "1px solid #ffedd5" }}>
              <div style={{ fontSize: "11px", fontWeight: "700", color: "#64748b" }}>GRAMMAR ACCURACY</div>
              <div style={{ fontSize: "18px", fontWeight: "800", color: "#ea580c" }}>{task2.grammarRangeAccuracy || "--"}</div>
            </div>
          </div>

          {/* Task 2 Feedback */}
          {task2.strengths?.length > 0 && (
            <div style={{ marginBottom: "12px" }}>
              <strong style={{ fontSize: "13px", color: "#166534", display: "flex", alignItems: "center", gap: "6px" }}>
                <CheckCircle size={14} /> Strengths:
              </strong>
              <ul style={{ margin: "4px 0 0 16px", padding: 0, fontSize: "13px", color: "#334155" }}>
                {task2.strengths.map((item, idx) => <li key={idx}>{item}</li>)}
              </ul>
            </div>
          )}

          {task2.weaknesses?.length > 0 && (
            <div style={{ marginBottom: "12px" }}>
              <strong style={{ fontSize: "13px", color: "#991b1b", display: "flex", alignItems: "center", gap: "6px" }}>
                <AlertTriangle size={14} /> Areas to Improve:
              </strong>
              <ul style={{ margin: "4px 0 0 16px", padding: 0, fontSize: "13px", color: "#334155" }}>
                {task2.weaknesses.map((item, idx) => <li key={idx}>{item}</li>)}
              </ul>
            </div>
          )}

          {task2.recommendations?.length > 0 && (
            <div>
              <strong style={{ fontSize: "13px", color: "#854d0e", display: "flex", alignItems: "center", gap: "6px" }}>
                <Lightbulb size={14} /> Recommendations:
              </strong>
              <ul style={{ margin: "4px 0 0 16px", padding: 0, fontSize: "13px", color: "#334155" }}>
                {task2.recommendations.map((item, idx) => <li key={idx}>{item}</li>)}
              </ul>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
