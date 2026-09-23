import React, { useState, useEffect, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Clock, ChevronLeft, ChevronRight, Bookmark, Calculator, Check, AlertCircle, RefreshCw, X
} from "lucide-react";
import { getJEEMockById } from "../data/jee/jeeTests";
import { getJEEConfig } from "../config/jeeConfig";
import { evaluateFullJEEScore } from "../utils/jeeScoreCalculator";
import GATENumericKeypad from "../components/gate/GATENumericKeypad";

export default function JEETestEnginePage() {
  const { testId } = useParams();
  const navigate = useNavigate();

  const testObj = useMemo(() => {
    return getJEEMockById(testId);
  }, [testId]);

  const config = getJEEConfig(testObj.formatVersion || "JEE_2026");

  // Active Subject Switcher: 'physics', 'chemistry', 'math'
  const [activeSubject, setActiveSubject] = useState("physics");
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);

  // User State with localStorage persistence
  const [userAnswers, setUserAnswers] = useState(() => {
    const saved = localStorage.getItem(`jee_answers_${testId}`);
    return saved ? JSON.parse(saved) : {};
  });

  const [markedForReview, setMarkedForReview] = useState(() => {
    const saved = localStorage.getItem(`jee_marked_${testId}`);
    return saved ? JSON.parse(saved) : {};
  });

  const [visitedQuestions, setVisitedQuestions] = useState(() => {
    const saved = localStorage.getItem(`jee_visited_${testId}`);
    return saved ? new Set(JSON.parse(saved)) : new Set();
  });

  const [showSubmitModal, setShowSubmitModal] = useState(false);

  // 180 Mins Countdown Timer with localStorage Persistence
  const [timeLeft, setTimeLeft] = useState(() => {
    const savedTime = localStorage.getItem(`jee_timer_${testId}`);
    if (savedTime !== null) {
      const parsed = parseInt(savedTime, 10);
      return isNaN(parsed) ? (testObj.durationMinutes || 180) * 60 : parsed;
    }
    return (testObj.durationMinutes || 180) * 60;
  });

  // Filter active subject questions
  const activeQuestions = useMemo(() => {
    if (testObj.sections && testObj.sections[activeSubject]) {
      return testObj.sections[activeSubject];
    }
    return (testObj.questions || []).filter((q) => (q.subject || "physics") === activeSubject);
  }, [testObj, activeSubject]);

  const allQuestions = useMemo(() => {
    return testObj.questions || [];
  }, [testObj]);

  const currentQ = activeQuestions[currentQuestionIdx] || activeQuestions[0];

  // Track visited questions
  useEffect(() => {
    if (currentQ?.id) {
      setVisitedQuestions((prev) => {
        const nextSet = new Set(prev);
        nextSet.add(currentQ.id);
        localStorage.setItem(`jee_visited_${testId}`, JSON.stringify(Array.from(nextSet)));
        return nextSet;
      });
    }
  }, [currentQ, testId]);

  // Save state to localStorage
  useEffect(() => {
    localStorage.setItem(`jee_answers_${testId}`, JSON.stringify(userAnswers));
  }, [userAnswers, testId]);

  useEffect(() => {
    localStorage.setItem(`jee_marked_${testId}`, JSON.stringify(markedForReview));
  }, [markedForReview, testId]);

  // Countdown Timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleCompleteExam();
          return 0;
        }
        const updated = prev - 1;
        localStorage.setItem(`jee_timer_${testId}`, String(updated));
        return updated;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [testId]);

  const formatTime = (secs) => {
    const h = Math.floor(secs / 3600);
    const m = Math.floor((secs % 3600) / 60);
    const s = secs % 60;
    return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
  };

  const handleSelectOption = (qId, optionVal) => {
    setUserAnswers((prev) => ({ ...prev, [qId]: optionVal }));
  };

  const handleClearResponse = () => {
    if (!currentQ?.id) return;
    setUserAnswers((prev) => {
      const nextState = { ...prev };
      delete nextState[currentQ.id];
      return nextState;
    });
  };

  const handleMarkForReviewAndNext = () => {
    if (!currentQ?.id) return;
    setMarkedForReview((prev) => ({ ...prev, [currentQ.id]: true }));
    if (currentQuestionIdx < activeQuestions.length - 1) {
      setCurrentQuestionIdx((prev) => prev + 1);
    }
  };

  const handleSaveAndNext = () => {
    if (currentQuestionIdx < activeQuestions.length - 1) {
      setCurrentQuestionIdx((prev) => prev + 1);
    }
  };

  const handleCompleteExam = () => {
    const evaluation = evaluateFullJEEScore(allQuestions, userAnswers);
    const resultId = `jee_res_${Date.now()}`;
    const resultPayload = {
      resultId,
      testId: testObj.id,
      title: testObj.title,
      date: new Date().toISOString(),
      evaluation,
      userAnswers,
      timeSpentSeconds: (testObj.durationMinutes || 180) * 60 - timeLeft
    };

    localStorage.setItem(`jee_result_${resultId}`, JSON.stringify(resultPayload));
    // Clear transient state
    localStorage.removeItem(`jee_answers_${testId}`);
    localStorage.removeItem(`jee_marked_${testId}`);
    localStorage.removeItem(`jee_visited_${testId}`);
    localStorage.removeItem(`jee_timer_${testId}`);

    navigate(`/jee/results/${resultId}`);
  };

  // Palette Status Counter
  const paletteStats = useMemo(() => {
    let answered = 0;
    let notAnswered = 0;
    let marked = 0;
    let ansMarked = 0;
    let notVisited = 0;

    allQuestions.forEach((q) => {
      const ans = userAnswers[q.id];
      const isAns = ans !== undefined && ans !== null && String(ans).trim() !== "";
      const isM = markedForReview[q.id];
      const isV = visitedQuestions.has(q.id);

      if (isAns && isM) ansMarked++;
      else if (isAns) answered++;
      else if (isM) marked++;
      else if (isV) notAnswered++;
      else notVisited++;
    });

    return { answered, notAnswered, marked, ansMarked, notVisited };
  }, [allQuestions, userAnswers, markedForReview, visitedQuestions]);

  return (
    <div style={{ minHeight: "100vh", background: "#080c14", color: "#ffffff", fontFamily: "Inter, sans-serif", display: "flex", flexDirection: "column" }}>

      {/* SUBMISSION CONFIRMATION MODAL */}
      {showSubmitModal && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.8)", zIndex: 999999, display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}>
          <div style={{ background: "#0f172a", border: "2px solid #818cf8", borderRadius: 24, padding: 32, maxWidth: 500, width: "100%", boxShadow: "0 25px 60px rgba(0,0,0,0.9)" }}>
            <h3 style={{ fontSize: 20, fontWeight: 900, color: "#ffffff", marginBottom: 12 }}>
              Submit Official JEE Main Paper?
            </h3>
            <p style={{ fontSize: 14, color: "#94a3b8", marginBottom: 20, lineHeight: 1.5 }}>
              Are you sure you want to end your examination terminal? Your responses across Physics, Chemistry, and Mathematics will be evaluated.
            </p>

            <div style={{ background: "#020617", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 14, padding: 16, marginBottom: 24, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, fontSize: 13 }}>
              <div>🟩 Answered: <strong style={{ color: "#22c55e" }}>{paletteStats.answered}</strong></div>
              <div>🟥 Not Answered: <strong style={{ color: "#ef4444" }}>{paletteStats.notAnswered}</strong></div>
              <div>🟪 Marked Review: <strong style={{ color: "#a855f7" }}>{paletteStats.marked}</strong></div>
              <div>🟣 Answered &amp; Marked: <strong style={{ color: "#c084fc" }}>{paletteStats.ansMarked}</strong></div>
              <div style={{ gridColumn: "span 2", borderTop: "1px solid rgba(255,255,255,0.1)", paddingTop: 8 }}>
                ⬜ Not Visited: <strong style={{ color: "#94a3b8" }}>{paletteStats.notVisited}</strong>
              </div>
            </div>

            <div style={{ display: "flex", gap: 12, justifyContent: "flex-end" }}>
              <button
                onClick={() => setShowSubmitModal(false)}
                style={{ background: "rgba(255,255,255,0.1)", color: "#cbd5e1", border: "none", borderRadius: 12, padding: "12px 20px", fontWeight: 800, cursor: "pointer" }}
              >
                Cancel &amp; Continue
              </button>
              <button
                onClick={handleCompleteExam}
                style={{ background: "linear-gradient(135deg, #22c55e, #15803d)", color: "#ffffff", border: "none", borderRadius: 12, padding: "12px 24px", fontWeight: 900, cursor: "pointer" }}
              >
                Confirm Submission
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TOP CBT HEADER TOOLBAR */}
      <div style={{ background: "#0f172a", borderBottom: "1px solid rgba(255,255,255,0.12)", padding: "10px 20px", display: "flex", justifyContent: "space-between", alignItems: "center", position: "sticky", top: 0, zIndex: 998, gap: 12 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <button
            onClick={() => navigate(`/jee/instructions/${testObj.id}`)}
            style={{ background: "rgba(255,255,255,0.08)", color: "#cbd5e1", border: "1px solid rgba(255,255,255,0.15)", borderRadius: 10, padding: "6px 12px", fontSize: 12, fontWeight: 800, cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 6 }}
          >
            <ChevronLeft size={16} /> Instructions
          </button>
          <div>
            <h2 style={{ fontSize: 15, fontWeight: 900, margin: 0, color: "#ffffff" }}>{testObj.title}</h2>
            <div style={{ fontSize: 11, color: "#818cf8", fontWeight: 800 }}>OFFICIAL NTA JEE MAIN CBT TERMINAL</div>
          </div>
        </div>

        {/* Subject Switcher */}
        <div style={{ display: "flex", gap: 8 }}>
          {[
            { id: "physics", label: "PHYSICS (100M)" },
            { id: "chemistry", label: "CHEMISTRY (100M)" },
            { id: "math", label: "MATHEMATICS (100M)" }
          ].map((sec) => (
            <button
              key={sec.id}
              onClick={() => {
                setActiveSubject(sec.id);
                setCurrentQuestionIdx(0);
              }}
              style={{
                background: activeSubject === sec.id ? "linear-gradient(135deg, #4f46e5, #9333ea)" : "rgba(255,255,255,0.08)",
                color: "#ffffff",
                border: activeSubject === sec.id ? "1px solid #818cf8" : "1px solid rgba(255,255,255,0.1)",
                borderRadius: 999,
                padding: "6px 16px",
                fontSize: 12,
                fontWeight: 800,
                cursor: "pointer"
              }}
            >
              {sec.label}
            </button>
          ))}
        </div>

        {/* Timer */}
        <div style={{ background: "rgba(239,68,68,0.15)", color: "#f87171", border: "1px solid rgba(248,113,113,0.3)", borderRadius: 12, padding: "8px 16px", fontWeight: 900, fontSize: 15, display: "flex", alignItems: "center", gap: 8 }}>
          <Clock size={16} /> {formatTime(timeLeft)}
        </div>
      </div>

      {/* MAIN EXAM AREA */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 340px", flex: 1, minHeight: "calc(100vh - 65px)" }}>

        {/* LEFT COLUMN: QUESTION & INPUT ENGINE */}
        <div style={{ padding: 32, overflowY: "auto", borderRight: "1px solid rgba(255,255,255,0.1)", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
          <div>
            <div style={{ marginBottom: 24 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }}>
                  <span style={{ background: "rgba(129,140,248,0.2)", color: "#818cf8", border: "1px solid rgba(129,140,248,0.3)", padding: "4px 12px", borderRadius: 8, fontSize: 12, fontWeight: 900 }}>
                    QUESTION {currentQuestionIdx + 1} OF {activeQuestions.length} ({activeSubject.toUpperCase()})
                  </span>
                  <span style={{ background: "rgba(245,158,11,0.2)", color: "#facc15", border: "1px solid rgba(245,158,11,0.3)", padding: "4px 10px", borderRadius: 8, fontSize: 11, fontWeight: 900 }}>
                    {currentQ?.sectionType || (currentQ?.questionType === "NVQ" ? "Section B (Numerical)" : "Section A (MCQ)")} (+4, -1)
                  </span>
                  {currentQ?.chapter && (
                    <span style={{ background: "rgba(168,85,247,0.2)", color: "#c084fc", border: "1px solid rgba(168,85,247,0.3)", padding: "4px 10px", borderRadius: 8, fontSize: 11, fontWeight: 800 }}>
                      {currentQ.chapter}
                    </span>
                  )}
                </div>
              </div>

              <h3 style={{ fontSize: 17, fontWeight: 800, color: "#ffffff", lineHeight: 1.6 }}>
                {currentQ?.questionText}
              </h3>
            </div>

            {/* INPUT FORMAT RENDERERS */}
            {currentQ?.questionType === "NVQ" || currentQ?.questionType === "NUMERICAL" ? (
              /* NVQ NUMERICAL KEYPAD INPUT */
              <div style={{ marginBottom: 32 }}>
                <GATENumericKeypad
                  value={userAnswers[currentQ?.id] || ""}
                  onChange={(val) => handleSelectOption(currentQ?.id, val)}
                />
              </div>
            ) : (
              /* MCQ SINGLE CHOICE OPTIONS */
              <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 32 }}>
                {(currentQ?.options || []).map((opt) => {
                  const isSelected = userAnswers[currentQ?.id] === opt;
                  return (
                    <div
                      key={opt}
                      onClick={() => handleSelectOption(currentQ?.id, opt)}
                      style={{
                        background: isSelected ? "rgba(129,140,248,0.18)" : "rgba(30,41,59,0.6)",
                        border: isSelected ? "2px solid #818cf8" : "1px solid rgba(255,255,255,0.1)",
                        borderRadius: 14,
                        padding: "14px 18px",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        gap: 12
                      }}
                    >
                      <div style={{ width: 22, height: 22, borderRadius: "50%", border: isSelected ? "6px solid #818cf8" : "2px solid #64748b", background: isSelected ? "#ffffff" : "transparent" }} />
                      <span style={{ fontSize: 15, fontWeight: isSelected ? 800 : 500, color: isSelected ? "#ffffff" : "#cbd5e1" }}>{opt}</span>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* EXAM CONTROLS ACTION BAR */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "1px solid rgba(255,255,255,0.1)", paddingTop: 20, flexWrap: "wrap", gap: 10 }}>
            <div style={{ display: "flex", gap: 8 }}>
              <button
                onClick={handleClearResponse}
                style={{ background: "rgba(239,68,68,0.15)", color: "#f87171", border: "1px solid rgba(239,68,68,0.3)", borderRadius: 10, padding: "10px 14px", fontWeight: 800, fontSize: 12, cursor: "pointer" }}
              >
                Clear Response
              </button>

              <button
                onClick={handleMarkForReviewAndNext}
                style={{
                  background: markedForReview[currentQ?.id] ? "rgba(168,85,247,0.3)" : "rgba(168,85,247,0.15)",
                  color: "#c084fc",
                  border: "1px solid rgba(168,85,247,0.4)",
                  borderRadius: 10,
                  padding: "10px 14px",
                  fontWeight: 800,
                  fontSize: 12,
                  cursor: "pointer"
                }}
              >
                <Bookmark size={14} style={{ display: "inline", marginRight: 4 }} /> Mark Review &amp; Next
              </button>
            </div>

            <div style={{ display: "flex", gap: 8 }}>
              <button
                disabled={currentQuestionIdx === 0}
                onClick={() => setCurrentQuestionIdx((prev) => Math.max(0, prev - 1))}
                style={{ background: "rgba(255,255,255,0.08)", color: "#ffffff", border: "1px solid rgba(255,255,255,0.15)", borderRadius: 10, padding: "10px 16px", fontWeight: 800, fontSize: 12, cursor: currentQuestionIdx === 0 ? "not-allowed" : "pointer" }}
              >
                Previous
              </button>
              <button
                onClick={handleSaveAndNext}
                style={{ background: "linear-gradient(135deg, #4f46e5, #9333ea)", color: "#ffffff", border: "none", borderRadius: 10, padding: "10px 20px", fontWeight: 900, fontSize: 12, cursor: "pointer" }}
              >
                Save &amp; Next <ChevronRight size={14} style={{ display: "inline", marginLeft: 2 }} />
              </button>
            </div>
          </div>

        </div>

        {/* RIGHT COLUMN: QUESTION PALETTE */}
        <div style={{ background: "#0f172a", padding: 20, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>

          <div>
            <h3 style={{ fontSize: 14, fontWeight: 900, color: "#ffffff", marginBottom: 12 }}>
              JEE Main Question Palette
            </h3>

            {/* Legend */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6, fontSize: 10, color: "#94a3b8", marginBottom: 14 }}>
              <div>⬜ Not Visited</div>
              <div>🟥 Not Answered</div>
              <div>🟩 Answered</div>
              <div>🟪 Review</div>
              <div style={{ gridColumn: "span 2" }}>🟣 Answered &amp; Marked</div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 8, maxHeight: "calc(100vh - 280px)", overflowY: "auto" }}>
              {activeQuestions.map((q, idx) => {
                const ans = userAnswers[q.id];
                const isAnswered = ans !== undefined && ans !== null && String(ans).trim() !== "";
                const isMarked = markedForReview[q.id];
                const isVisited = visitedQuestions.has(q.id);
                const isCurrent = idx === currentQuestionIdx;

                let bg = "rgba(255,255,255,0.06)";
                let color = "#cbd5e1";
                let border = "1px solid rgba(255,255,255,0.1)";
                let badge = null;

                if (isAnswered && isMarked) {
                  bg = "#7e22ce"; color = "#ffffff"; badge = "✓";
                } else if (isAnswered) {
                  bg = "#22c55e"; color = "#ffffff";
                } else if (isMarked) {
                  bg = "#a855f7"; color = "#ffffff";
                } else if (isVisited) {
                  bg = "#ef4444"; color = "#ffffff";
                }

                if (isCurrent) border = "2px solid #ffffff";

                return (
                  <button
                    key={q.id}
                    onClick={() => setCurrentQuestionIdx(idx)}
                    style={{
                      background: bg,
                      color: color,
                      border: border,
                      borderRadius: isMarked ? "50%" : 8,
                      height: 36,
                      fontWeight: 800,
                      fontSize: 12,
                      cursor: "pointer",
                      position: "relative"
                    }}
                  >
                    {idx + 1}
                    {badge && <span style={{ position: "absolute", top: -2, right: 0, fontSize: 10, color: "#4ade80" }}>{badge}</span>}
                  </button>
                );
              })}
            </div>
          </div>

          <button
            onClick={() => setShowSubmitModal(true)}
            style={{ width: "100%", background: "linear-gradient(135deg, #22c55e, #15803d)", color: "#ffffff", border: "none", borderRadius: 12, padding: "14px", fontWeight: 900, fontSize: 14, cursor: "pointer", boxShadow: "0 6px 20px rgba(34,197,94,0.4)" }}
          >
            Submit JEE Main Paper
          </button>

        </div>

      </div>

    </div>
  );
}
