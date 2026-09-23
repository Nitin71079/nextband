import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Award, CheckCircle2, XCircle, Clock, ChevronLeft, AlertCircle, BookOpen, ChevronDown, ChevronUp, Stethoscope
} from "lucide-react";
import { getNEETMockById } from "../data/neet/neetTests";
import { calculateNEETScore } from "../utils/neetScoreCalculator";

export default function NEETResultsPage() {
  const { attemptId } = useParams();
  const navigate = useNavigate();

  // Load saved attempt
  const savedDataRaw = localStorage.getItem(attemptId);
  let attemptObj = null;
  if (savedDataRaw) {
    try {
      attemptObj = JSON.parse(savedDataRaw);
    } catch (e) {
      attemptObj = null;
    }
  }

  const mockObj = attemptObj ? getNEETMockById(attemptObj.testId) : getNEETMockById("neet-mock-001");
  const result = attemptObj ? attemptObj.result : calculateNEETScore(mockObj, {}, {}, 0);

  const [filterSubject, setFilterSubject] = useState("all");
  const [expandedQId, setExpandedQId] = useState(null);

  const filteredQuestions = (mockObj.questions || []).filter(q => {
    if (filterSubject === "all") return true;
    return q.subject === filterSubject;
  });

  return (
    <div style={{ minHeight: "100vh", background: "#060b13", color: "#ffffff", fontFamily: "Inter, sans-serif", padding: "40px 24px" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>

        {/* Back Button */}
        <button
          onClick={() => navigate("/neet")}
          style={{ background: "rgba(255,255,255,0.08)", color: "#cbd5e1", border: "1px solid rgba(255,255,255,0.15)", borderRadius: 12, padding: "8px 18px", fontSize: 13, fontWeight: 800, cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 6, marginBottom: 24 }}
        >
          <ChevronLeft size={16} /> Return to NEET Hub
        </button>

        {/* Top Header Card */}
        <div style={{ background: "linear-gradient(135deg, #0d1527 0%, #111827 100%)", border: "1px solid rgba(16,185,129,0.3)", borderRadius: 24, padding: 36, marginBottom: 32, boxShadow: "0 20px 50px rgba(0,0,0,0.5)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 20 }}>
            <div>
              <span style={{ background: "rgba(16,185,129,0.2)", color: "#10b981", border: "1px solid rgba(16,185,129,0.3)", padding: "4px 12px", borderRadius: 8, fontSize: 12, fontWeight: 900 }}>
                NEET-UG OFFICIAL PERFORMANCE REPORT
              </span>
              <h1 style={{ fontSize: 28, fontWeight: 900, color: "#ffffff", marginTop: 8, marginBottom: 4 }}>
                {mockObj.title} Results
              </h1>
              <div style={{ fontSize: 13, color: "#94a3b8" }}>
                Attempted on {attemptObj ? new Date(attemptObj.timestamp).toLocaleDateString("en-IN", { dateStyle: "long" }) : "Recent Attempt"}
              </div>
            </div>

            {/* Score Pill */}
            <div style={{ background: "rgba(16,185,129,0.12)", border: "2px solid #10b981", borderRadius: 20, padding: "16px 28px", textAlign: "center" }}>
              <div style={{ fontSize: 12, color: "#94a3b8", fontWeight: 800 }}>TOTAL MARKS / 720</div>
              <div style={{ fontSize: 38, fontWeight: 900, color: "#10b981" }}>{result.totalScore}</div>
              <div style={{ fontSize: 12, color: "#4ade80", fontWeight: 800 }}>{result.percentage}% Score</div>
            </div>
          </div>

          {/* Quick Metrics */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 16, marginTop: 28 }}>
            <div style={metricBoxStyle}>
              <Award size={20} color="#f59e0b" />
              <div>
                <div style={{ fontSize: 11, color: "#94a3b8", fontWeight: 700 }}>ESTIMATED NEET AIR</div>
                <div style={{ fontSize: 15, fontWeight: 900, color: "#facc15" }}>{result.estimatedAIR}</div>
              </div>
            </div>

            <div style={metricBoxStyle}>
              <CheckCircle2 size={20} color="#22c55e" />
              <div>
                <div style={{ fontSize: 11, color: "#94a3b8", fontWeight: 700 }}>ACCURACY</div>
                <div style={{ fontSize: 16, fontWeight: 900, color: "#ffffff" }}>{result.accuracy}%</div>
              </div>
            </div>

            <div style={metricBoxStyle}>
              <Clock size={20} color="#3b82f6" />
              <div>
                <div style={{ fontSize: 11, color: "#94a3b8", fontWeight: 700 }}>TIME SPENT</div>
                <div style={{ fontSize: 16, fontWeight: 900, color: "#ffffff" }}>{Math.floor(result.timeSpentSeconds / 60)} mins</div>
              </div>
            </div>

            <div style={metricBoxStyle}>
              <Stethoscope size={20} color="#ec4899" />
              <div>
                <div style={{ fontSize: 11, color: "#94a3b8", fontWeight: 700 }}>PERCENTILE</div>
                <div style={{ fontSize: 16, fontWeight: 900, color: "#ffffff" }}>{result.estimatedPercentile}%</div>
              </div>
            </div>
          </div>
        </div>

        {/* Four Subjects Breakdown */}
        <div style={{ marginBottom: 36 }}>
          <h2 style={{ fontSize: 20, fontWeight: 900, color: "#ffffff", marginBottom: 16 }}>
            Subject Breakdown (Physics, Chemistry, Botany, Zoology)
          </h2>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 16 }}>
            {Object.values(result.subjectBreakdown).map((s) => (
              <div key={s.name} style={{ background: "#0d1527", border: `1px solid ${s.color}50`, borderRadius: 18, padding: 20 }}>
                <div style={{ fontSize: 12, color: s.color, fontWeight: 900, textTransform: "uppercase" }}>{s.name}</div>
                <div style={{ fontSize: 28, fontWeight: 900, color: "#ffffff", margin: "6px 0" }}>{s.score} <span style={{ fontSize: 14, color: "#64748b" }}>/ 180</span></div>
                
                <div style={{ display: "flex", gap: 12, fontSize: 12, marginTop: 8 }}>
                  <span style={{ color: "#4ade80" }}>✓ {s.correct} Correct</span>
                  <span style={{ color: "#f87171" }}>✗ {s.incorrect} Wrong</span>
                  <span style={{ color: "#94a3b8" }}>- {s.unanswered} Unattempted</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* NCERT Weakness Analysis */}
        {result.ncertWeaknesses && result.ncertWeaknesses.length > 0 && (
          <div style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.3)", borderRadius: 18, padding: 24, marginBottom: 36 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, color: "#f87171", fontWeight: 900, fontSize: 16, marginBottom: 12 }}>
              <AlertCircle size={20} /> Recommended NCERT Revision Areas (&lt;50% Accuracy)
            </div>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              {result.ncertWeaknesses.map((w, i) => (
                <span key={i} style={{ background: "rgba(15,23,42,0.8)", border: "1px solid rgba(239,68,68,0.4)", borderRadius: 10, padding: "6px 14px", fontSize: 12, color: "#cbd5e1" }}>
                  <strong style={{ color: "#ffffff" }}>{w.chapter}</strong> ({w.ncertUnit}) — <span style={{ color: "#f87171" }}>{w.accuracy}% Accuracy</span>
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Detailed Solutions & Explanations */}
        <div style={{ background: "#0d1527", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 24, padding: 32 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24, flexWrap: "wrap", gap: 12 }}>
            <h2 style={{ fontSize: 20, fontWeight: 900, color: "#ffffff", margin: 0 }}>
              Question Solutions &amp; NCERT Explanations
            </h2>

            {/* Filter Pills */}
            <div style={{ display: "flex", gap: 8 }}>
              {["all", "physics", "chemistry", "botany", "zoology"].map(sec => (
                <button
                  key={sec}
                  onClick={() => setFilterSubject(sec)}
                  style={{
                    background: filterSubject === sec ? "#10b981" : "rgba(255,255,255,0.08)",
                    color: "#ffffff",
                    border: "none",
                    borderRadius: 8,
                    padding: "6px 14px",
                    fontSize: 12,
                    fontWeight: 800,
                    cursor: "pointer",
                    textTransform: "capitalize"
                  }}
                >
                  {sec}
                </button>
              ))}
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {filteredQuestions.map((q, idx) => {
              const userAns = attemptObj ? attemptObj.userAnswers[q.id] : null;
              const isCorrect = userAns === q.correctAnswer;
              const isUnattempted = !userAns || userAns === "";
              const isExpanded = expandedQId === q.id;

              return (
                <div key={q.id} style={{ background: "rgba(15,23,42,0.6)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 16, padding: 20 }}>
                  <div
                    onClick={() => setExpandedQId(isExpanded ? null : q.id)}
                    style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", cursor: "pointer", gap: 12 }}
                  >
                    <div>
                      <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 8 }}>
                        <span style={{ background: "rgba(16,185,129,0.2)", color: "#10b981", padding: "2px 8px", borderRadius: 6, fontSize: 11, fontWeight: 800 }}>
                          Q.{q.questionNumber || idx + 1} ({q.subSubject || q.subject})
                        </span>
                        <span style={{ fontSize: 11, color: "#94a3b8" }}>NCERT: {q.ncertUnit}</span>
                      </div>
                      <h4 style={{ fontSize: 15, fontWeight: 700, color: "#ffffff", margin: 0, lineHeight: 1.5 }}>
                        {q.questionText}
                      </h4>
                    </div>

                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      {isCorrect ? (
                        <span style={{ background: "rgba(34,197,94,0.2)", color: "#4ade80", border: "1px solid rgba(34,197,94,0.3)", padding: "4px 10px", borderRadius: 8, fontSize: 12, fontWeight: 900 }}>+4.0 Correct</span>
                      ) : isUnattempted ? (
                        <span style={{ background: "rgba(148,163,184,0.2)", color: "#94a3b8", border: "1px solid rgba(148,163,184,0.3)", padding: "4px 10px", borderRadius: 8, fontSize: 12, fontWeight: 900 }}>0 Unattempted</span>
                      ) : (
                        <span style={{ background: "rgba(239,68,68,0.2)", color: "#f87171", border: "1px solid rgba(239,68,68,0.3)", padding: "4px 10px", borderRadius: 8, fontSize: 12, fontWeight: 900 }}>-1.0 Incorrect</span>
                      )}
                      {isExpanded ? <ChevronUp size={18} color="#94a3b8" /> : <ChevronDown size={18} color="#94a3b8" />}
                    </div>
                  </div>

                  {/* Expanded Solution Panel */}
                  {isExpanded && (
                    <div style={{ marginTop: 16, paddingTop: 16, borderTop: "1px solid rgba(255,255,255,0.08)", display: "flex", flexDirection: "column", gap: 12 }}>
                      <div style={{ fontSize: 13, color: "#cbd5e1" }}>
                        <strong>Your Answer:</strong> <span style={{ color: isCorrect ? "#4ade80" : "#f87171" }}>{userAns || "Not Answered"}</span>
                      </div>
                      <div style={{ fontSize: 13, color: "#4ade80" }}>
                        <strong>Correct Answer:</strong> {q.correctAnswer}
                      </div>
                      <div style={{ background: "rgba(16,185,129,0.1)", borderLeft: "4px solid #10b981", padding: 14, borderRadius: "0 10px 10px 0", fontSize: 13, color: "#cbd5e1", lineHeight: 1.6 }}>
                        <strong style={{ color: "#10b981", display: "block", marginBottom: 4 }}>NCERT Explanation:</strong>
                        {q.explanation}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
}

const metricBoxStyle = {
  background: "rgba(30,41,59,0.6)",
  border: "1px solid rgba(255,255,255,0.1)",
  borderRadius: 14,
  padding: "16px 20px",
  display: "flex",
  alignItems: "center",
  gap: 14
};
