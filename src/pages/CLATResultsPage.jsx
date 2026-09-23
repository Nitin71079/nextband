import React, { useState, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Award, CheckCircle2, XCircle, HelpCircle, Clock, ChevronLeft, RotateCcw, BarChart2, BookOpen, Sparkles
} from "lucide-react";

export default function CLATResultsPage() {
  const { resultId } = useParams();
  const navigate = useNavigate();

  const resultData = useMemo(() => {
    const stored = localStorage.getItem(`gate_result_${resultId}`) || localStorage.getItem(`clat_result_${resultId}`);
    if (stored) {
      try { return JSON.parse(stored); } catch (e) { return null; }
    }
    return null;
  }, [resultId]);

  const [activeTab, setActiveTab] = useState("overview"); // 'overview' | 'review'
  const [filterSection, setFilterSection] = useState("ALL");
  const [filterStatus, setFilterStatus] = useState("ALL");

  if (!resultData) {
    return (
      <div style={{ minHeight: "100vh", background: "#090d16", color: "#fff", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 20 }}>
        <h2>Result Record Not Found</h2>
        <p style={{ color: "#94a3b8" }}>The requested CLAT examination result could not be located.</p>
        <button onClick={() => navigate("/clat")} style={{ background: "#d97706", color: "#fff", border: "none", borderRadius: 10, padding: "10px 20px", cursor: "pointer", marginTop: 12 }}>
          Return to CLAT Hub
        </button>
      </div>
    );
  }

  const { evaluation = {}, userAnswers = {}, title, date, timeSpentSeconds = 0 } = resultData;

  const questionsList = useMemo(() => {
    return evaluation.questionResults || [];
  }, [evaluation]);

  const filteredQuestions = useMemo(() => {
    return questionsList.filter((q) => {
      const matchSec = filterSection === "ALL" || q.section === filterSection;
      const matchS = filterStatus === "ALL" ||
        (filterStatus === "CORRECT" && q.isCorrect) ||
        (filterStatus === "INCORRECT" && q.isAttempted && !q.isCorrect) ||
        (filterStatus === "UNATTEMPTED" && !q.isAttempted);
      return matchSec && matchS;
    });
  }, [questionsList, filterSection, filterStatus]);

  const formatSecs = (secs) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}m ${s}s`;
  };

  return (
    <div style={{ minHeight: "100vh", background: "radial-gradient(circle at 50% 0%, #78350f 0%, #0f172a 70%)", color: "#ffffff", fontFamily: "Inter, sans-serif", padding: "40px 24px 80px" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>

        {/* Top Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 28, flexWrap: "wrap", gap: 14 }}>
          <button
            onClick={() => navigate("/clat")}
            style={{ background: "rgba(255,255,255,0.08)", color: "#cbd5e1", border: "1px solid rgba(255,255,255,0.15)", borderRadius: 12, padding: "8px 16px", fontSize: 13, fontWeight: 800, cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 6 }}
          >
            <ChevronLeft size={16} /> CLAT Mock Hub
          </button>

          <div style={{ textAlign: "right" }}>
            <span style={{ background: "rgba(251,191,36,0.2)", color: "#fbbf24", border: "1px solid rgba(251,191,36,0.3)", padding: "4px 12px", borderRadius: 8, fontSize: 11, fontWeight: 900 }}>
              CONSORTIUM OF NLUs EXAMINATION ANALYSIS
            </span>
            <div style={{ fontSize: 12, color: "#94a3b8", marginTop: 4 }}>Completed on {new Date(date).toLocaleDateString()}</div>
          </div>
        </div>

        {/* Hero Score Banner */}
        <div style={{ background: "rgba(15,23,42,0.85)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 28, padding: 36, marginBottom: 32, boxShadow: "0 20px 60px rgba(0,0,0,0.6)" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 24, alignItems: "center" }}>

            <div>
              <div style={{ fontSize: 12, fontWeight: 900, color: "#fbbf24", letterSpacing: 1 }}>
                KNARROW ESTIMATED PERFORMANCE
              </div>
              <div style={{ fontSize: "clamp(3rem, 6vw, 4.5rem)", fontWeight: 900, color: "#ffffff", lineHeight: 1 }}>
                {evaluation.finalTotalMarks} <span style={{ fontSize: 24, color: "#94a3b8" }}>/ 120</span>
              </div>
              <div style={{ fontSize: 13, color: "#a855f7", fontWeight: 800, marginTop: 8, display: "flex", alignItems: "center", gap: 6 }}>
                <Sparkles size={16} /> Estimated NLU Rank Percentile: ~{evaluation.percentile || 85}th Percentile
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
              <div style={statBoxStyle}>
                <div style={{ fontSize: 11, color: "#94a3b8" }}>Accuracy</div>
                <div style={{ fontSize: 22, fontWeight: 900, color: "#22c55e" }}>{evaluation.accuracyPct}%</div>
              </div>
              <div style={statBoxStyle}>
                <div style={{ fontSize: 11, color: "#94a3b8" }}>Time Taken</div>
                <div style={{ fontSize: 20, fontWeight: 900, color: "#fbbf24" }}>{formatSecs(timeSpentSeconds)}</div>
              </div>
              <div style={statBoxStyle}>
                <div style={{ fontSize: 11, color: "#94a3b8" }}>Correct</div>
                <div style={{ fontSize: 20, fontWeight: 900, color: "#22c55e" }}>{evaluation.correctCount} Qs (+{evaluation.correctCount}M)</div>
              </div>
              <div style={statBoxStyle}>
                <div style={{ fontSize: 11, color: "#94a3b8" }}>Incorrect Penalty</div>
                <div style={{ fontSize: 20, fontWeight: 900, color: "#ef4444" }}>-{evaluation.totalPenalty || (evaluation.incorrectCount * 0.25).toFixed(2)} Marks</div>
              </div>
            </div>

          </div>
        </div>

        {/* View Switcher Tabs */}
        <div style={{ display: "flex", gap: 10, marginBottom: 24 }}>
          <button
            onClick={() => setActiveTab("overview")}
            style={{
              background: activeTab === "overview" ? "linear-gradient(135deg, #d97706, #b45309)" : "rgba(255,255,255,0.06)",
              color: "#ffffff",
              border: activeTab === "overview" ? "1px solid #fbbf24" : "1px solid rgba(255,255,255,0.1)",
              borderRadius: 14,
              padding: "12px 24px",
              fontSize: 14,
              fontWeight: 800,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: 8
            }}
          >
            <BarChart2 size={16} /> Section Performance Breakdown
          </button>

          <button
            onClick={() => setActiveTab("review")}
            style={{
              background: activeTab === "review" ? "linear-gradient(135deg, #d97706, #b45309)" : "rgba(255,255,255,0.06)",
              color: "#ffffff",
              border: activeTab === "review" ? "1px solid #fbbf24" : "1px solid rgba(255,255,255,0.1)",
              borderRadius: 14,
              padding: "12px 24px",
              fontSize: 14,
              fontWeight: 800,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: 8
            }}
          >
            <BookOpen size={16} /> Detailed Question Solutions ({questionsList.length})
          </button>
        </div>

        {/* TAB 1: OVERVIEW BREAKDOWN */}
        {activeTab === "overview" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>

            {/* Section-wise Analysis */}
            <div style={{ background: "rgba(30,41,59,0.7)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 20, padding: 28 }}>
              <h3 style={{ fontSize: 17, fontWeight: 900, color: "#ffffff", marginBottom: 20 }}>
                Sectional Performance &amp; Accuracy
              </h3>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 14 }}>
                {[
                  { key: "english", name: "English Language", total: 24 },
                  { key: "gk", name: "Current Affairs & GK", total: 30 },
                  { key: "legal", name: "Legal Reasoning", total: 30 },
                  { key: "logical", name: "Logical Reasoning", total: 24 },
                  { key: "quant", name: "Quantitative Techniques", total: 12 }
                ].map((sec) => {
                  const score = evaluation.sectionScores?.[sec.key] || 0;
                  const countData = evaluation.sectionCounts?.[sec.key] || { correct: 0, total: sec.total };
                  const pct = countData.total > 0 ? Math.round((countData.correct / countData.total) * 100) : 0;
                  return (
                    <div key={sec.key} style={{ background: "#0f172a", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 16, padding: 18 }}>
                      <div style={{ fontSize: 11, color: "#fbbf24", fontWeight: 800 }}>{sec.name}</div>
                      <div style={{ fontSize: 22, fontWeight: 900, color: "#ffffff", marginTop: 4 }}>
                        {score} <span style={{ fontSize: 13, color: "#94a3b8" }}>/ {sec.total}M</span>
                      </div>
                      <div style={{ fontSize: 12, color: "#22c55e", fontWeight: 800, marginTop: 4 }}>
                        {pct}% Accuracy ({countData.correct}/{countData.total} Correct)
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Attempt Summary */}
            <div style={{ background: "rgba(30,41,59,0.7)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 20, padding: 28 }}>
              <h3 style={{ fontSize: 17, fontWeight: 900, color: "#ffffff", marginBottom: 20 }}>
                Question Attempt Breakdown
              </h3>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16 }}>
                <div style={summaryCardStyle("#22c55e")}>
                  <CheckCircle2 size={24} color="#22c55e" />
                  <div>
                    <div style={{ fontSize: 22, fontWeight: 900, color: "#ffffff" }}>{evaluation.correctCount}</div>
                    <div style={{ fontSize: 12, color: "#94a3b8" }}>Correct Questions (+{evaluation.correctCount} Marks)</div>
                  </div>
                </div>

                <div style={summaryCardStyle("#ef4444")}>
                  <XCircle size={24} color="#ef4444" />
                  <div>
                    <div style={{ fontSize: 22, fontWeight: 900, color: "#ffffff" }}>{evaluation.incorrectCount}</div>
                    <div style={{ fontSize: 12, color: "#94a3b8" }}>Incorrect (-{evaluation.totalPenalty || (evaluation.incorrectCount * 0.25).toFixed(2)} Penalty)</div>
                  </div>
                </div>

                <div style={summaryCardStyle("#94a3b8")}>
                  <HelpCircle size={24} color="#94a3b8" />
                  <div>
                    <div style={{ fontSize: 22, fontWeight: 900, color: "#ffffff" }}>{evaluation.unattemptedCount}</div>
                    <div style={{ fontSize: 12, color: "#94a3b8" }}>Unattempted Questions</div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        )}

        {/* TAB 2: DETAILED QUESTION REVIEW */}
        {activeTab === "review" && (
          <div>
            {/* Filter Bar */}
            <div style={{ background: "rgba(30,41,59,0.7)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 18, padding: 18, marginBottom: 24, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 14 }}>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                {["ALL", "english", "gk", "legal", "logical", "quant"].map((sec) => (
                  <button
                    key={sec}
                    onClick={() => setFilterSection(sec)}
                    style={{
                      background: filterSection === sec ? "#d97706" : "rgba(255,255,255,0.06)",
                      color: "#ffffff",
                      border: "none",
                      borderRadius: 10,
                      padding: "6px 14px",
                      fontSize: 12,
                      fontWeight: 800,
                      cursor: "pointer"
                    }}
                  >
                    {sec === "ALL" ? "All Sections" : sec.toUpperCase()}
                  </button>
                ))}
              </div>

              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                {["ALL", "CORRECT", "INCORRECT", "UNATTEMPTED"].map((s) => (
                  <button
                    key={s}
                    onClick={() => setFilterStatus(s)}
                    style={{
                      background: filterStatus === s ? "#7c3aed" : "rgba(255,255,255,0.06)",
                      color: "#ffffff",
                      border: "none",
                      borderRadius: 10,
                      padding: "6px 14px",
                      fontSize: 12,
                      fontWeight: 800,
                      cursor: "pointer"
                    }}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Questions List */}
            <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
              {filteredQuestions.map((q, idx) => {
                const uAns = userAnswers[q.id];
                return (
                  <div key={q.id} style={{ background: "rgba(15,23,42,0.85)", border: q.isCorrect ? "1px solid rgba(34,197,94,0.3)" : q.isAttempted ? "1px solid rgba(239,68,68,0.3)" : "1px solid rgba(255,255,255,0.1)", borderRadius: 20, padding: 24 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                      <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                        <span style={{ background: "rgba(251,191,36,0.2)", color: "#fbbf24", padding: "4px 10px", borderRadius: 8, fontSize: 11, fontWeight: 900 }}>
                          Q{idx + 1} · {q.section?.toUpperCase()}
                        </span>
                        {q.topic && (
                          <span style={{ background: "rgba(168,85,247,0.2)", color: "#c084fc", padding: "4px 10px", borderRadius: 8, fontSize: 11, fontWeight: 800 }}>
                            {q.topic}
                          </span>
                        )}
                      </div>

                      <span style={{ fontSize: 12, fontWeight: 900, color: q.isCorrect ? "#22c55e" : q.isAttempted ? "#ef4444" : "#94a3b8" }}>
                        {q.isCorrect ? "+1.0 Mark" : q.isAttempted ? "-0.25 Penalty" : "Unattempted"}
                      </span>
                    </div>

                    {/* Passage Context snippet */}
                    {q.passageText && (
                      <div style={{ background: "#020617", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 12, padding: 14, fontSize: 13, color: "#94a3b8", marginBottom: 14, fontStyle: "italic", maxHeight: 100, overflowY: "auto" }}>
                        <strong style={{ color: "#fbbf24", fontStyle: "normal" }}>Passage Excerpt: </strong>
                        {q.passageText}
                      </div>
                    )}

                    <h4 style={{ fontSize: 16, fontWeight: 800, color: "#ffffff", marginBottom: 14, lineHeight: 1.5 }}>
                      {q.questionText}
                    </h4>

                    {/* Answers Comparison */}
                    <div style={{ background: "#020617", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 14, padding: 16, marginBottom: 16, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, fontSize: 13 }}>
                      <div>
                        <div style={{ fontSize: 11, color: "#94a3b8" }}>Your Answer:</div>
                        <div style={{ fontWeight: 800, color: q.isCorrect ? "#4ade80" : "#f87171" }}>
                          {uAns ? String(uAns) : "None"}
                        </div>
                      </div>

                      <div>
                        <div style={{ fontSize: 11, color: "#94a3b8" }}>Official Answer:</div>
                        <div style={{ fontWeight: 800, color: "#fbbf24" }}>
                          {String(q.correctAnswer)}
                        </div>
                      </div>
                    </div>

                    {/* Explanation */}
                    {q.explanation && (
                      <div style={{ background: "rgba(251,191,36,0.08)", border: "1px solid rgba(251,191,36,0.2)", borderRadius: 14, padding: 16, fontSize: 13, color: "#cbd5e1", lineHeight: 1.6 }}>
                        <strong style={{ color: "#fbbf24", display: "block", marginBottom: 4 }}>Detailed Solution:</strong>
                        {q.explanation}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

const statBoxStyle = {
  background: "#0f172a",
  border: "1px solid rgba(255,255,255,0.1)",
  borderRadius: 14,
  padding: "12px 16px"
};

const summaryCardStyle = (borderColor) => ({
  background: "#0f172a",
  border: `1px solid ${borderColor}`,
  borderRadius: 16,
  padding: 20,
  display: "flex",
  alignItems: "center",
  gap: 16
});
