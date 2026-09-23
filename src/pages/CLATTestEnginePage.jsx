import React, { useState, useEffect, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Clock, ChevronLeft, ChevronRight, Bookmark, BookOpen, Check, AlertCircle, RefreshCw, X
} from "lucide-react";
import { getCLATMockById } from "../data/clat/clatTests";
import { getCLATConfig } from "../config/clatConfig";
import { evaluateFullCLATScore } from "../utils/clatScoreCalculator";

export default function CLATTestEnginePage() {
  const { testId } = useParams();
  const navigate = useNavigate();

  const testObj = useMemo(() => {
    return getCLATMockById(testId);
  }, [testId]);

  const config = getCLATConfig(testObj.formatVersion || "CLAT_2026");

  // Section switcher: 'english', 'gk', 'legal', 'logical', 'quant'
  const [activeSection, setActiveSection] = useState("english");
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);

  // User State with localStorage persistence
  const [userAnswers, setUserAnswers] = useState(() => {
    const saved = localStorage.getItem(`clat_answers_${testId}`);
    return saved ? JSON.parse(saved) : {};
  });

  const [markedForReview, setMarkedForReview] = useState(() => {
    const saved = localStorage.getItem(`clat_marked_${testId}`);
    return saved ? JSON.parse(saved) : {};
  });

  const [visitedQuestions, setVisitedQuestions] = useState(() => {
    const saved = localStorage.getItem(`clat_visited_${testId}`);
    return saved ? new Set(JSON.parse(saved)) : new Set();
  });

  const [showSubmitModal, setShowSubmitModal] = useState(false);

  // 120 Mins Countdown Timer with localStorage Persistence
  const [timeLeft, setTimeLeft] = useState(() => {
    const savedTime = localStorage.getItem(`clat_timer_${testId}`);
    if (savedTime !== null) {
      const parsed = parseInt(savedTime, 10);
      return isNaN(parsed) ? (testObj.durationMinutes || 120) * 60 : parsed;
    }
    return (testObj.durationMinutes || 120) * 60;
  });

  const activeQuestions = useMemo(() => {
    return (testObj.questions || []).filter((q) => (q.section || "english") === activeSection);
  }, [testObj, activeSection]);

  const currentQ = activeQuestions[currentQuestionIdx] || activeQuestions[0];

  // Track visited questions
  useEffect(() => {
    if (currentQ?.id) {
      setVisitedQuestions((prev) => {
        const nextSet = new Set(prev);
        nextSet.add(currentQ.id);
        localStorage.setItem(`clat_visited_${testId}`, JSON.stringify(Array.from(nextSet)));
        return nextSet;
      });
    }
  }, [currentQ, testId]);

  // Save state to localStorage
  useEffect(() => {
    localStorage.setItem(`clat_answers_${testId}`, JSON.stringify(userAnswers));
  }, [userAnswers, testId]);

  useEffect(() => {
    localStorage.setItem(`clat_marked_${testId}`, JSON.stringify(markedForReview));
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
        localStorage.setItem(`clat_timer_${testId}`, String(updated));
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
    const evaluation = evaluateFullCLATScore(testObj.questions || [], userAnswers);
    const resultId = `clat_res_${Date.now()}`;
    const resultPayload = {
      resultId,
      testId: testObj.id,
      title: testObj.title,
      date: new Date().toISOString(),
      evaluation,
      userAnswers,
      timeSpentSeconds: (testObj.durationMinutes || 120) * 60 - timeLeft
    };

    localStorage.setItem(`clat_result_${resultId}`, JSON.stringify(resultPayload));
    // Clear transient state
    localStorage.removeItem(`clat_answers_${testId}`);
    localStorage.removeItem(`clat_marked_${testId}`);
    localStorage.removeItem(`clat_visited_${testId}`);
    localStorage.removeItem(`clat_timer_${testId}`);

    navigate(`/clat/results/${resultId}`);
  };

  // Palette Status Counter
  const paletteStats = useMemo(() => {
    let answered = 0;
    let notAnswered = 0;
    let marked = 0;
    let ansMarked = 0;
    let notVisited = 0;

    (testObj.questions || []).forEach((q) => {
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
  }, [testObj, userAnswers, markedForReview, visitedQuestions]);

  return (
    <div style={{ minHeight: "100vh", background: "#080c14", color: "#ffffff", fontFamily: "Inter, sans-serif", display: "flex", flexDirection: "column" }}>

      {/* SUBMISSION CONFIRMATION MODAL */}
      {showSubmitModal && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.8)", zIndex: 999999, display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}>
          <div style={{ background: "#0f172a", border: "2px solid #fbbf24", borderRadius: 24, padding: 32, maxWidth: 500, width: "100%", boxShadow: "0 25px 60px rgba(0,0,0,0.9)" }}>
            <h3 style={{ fontSize: 20, fontWeight: 900, color: "#ffffff", marginBottom: 12 }}>
              Submit Official CLAT Examination?
            </h3>
            <p style={{ fontSize: 14, color: "#94a3b8", marginBottom: 20, lineHeight: 1.5 }}>
              Are you sure you want to end your examination terminal? Your responses will be evaluated.
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
            onClick={() => navigate(`/clat/instructions/${testObj.id}`)}
            style={{ background: "rgba(255,255,255,0.08)", color: "#cbd5e1", border: "1px solid rgba(255,255,255,0.15)", borderRadius: 10, padding: "6px 12px", fontSize: 12, fontWeight: 800, cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 6 }}
          >
            <ChevronLeft size={16} /> Instructions
          </button>
          <div>
            <h2 style={{ fontSize: 15, fontWeight: 900, margin: 0, color: "#ffffff" }}>{testObj.title}</h2>
            <div style={{ fontSize: 11, color: "#fbbf24", fontWeight: 800 }}>CONSORTIUM OF NLUs CLAT 2026 TERMINAL</div>
          </div>
        </div>

        {/* Section Switcher */}
        <div style={{ display: "flex", gap: 6 }}>
          {[
            { id: "english", label: "ENGLISH (24M)" },
            { id: "gk", label: "GK / CA (30M)" },
            { id: "legal", label: "LEGAL (30M)" },
            { id: "logical", label: "LOGICAL (24M)" },
            { id: "quant", label: "QUANT (12M)" }
          ].map((sec) => (
            <button
              key={sec.id}
              onClick={() => {
                setActiveSection(sec.id);
                setCurrentQuestionIdx(0);
              }}
              style={{
                background: activeSection === sec.id ? "linear-gradient(135deg, #d97706, #b45309)" : "rgba(255,255,255,0.08)",
                color: "#ffffff",
                border: activeSection === sec.id ? "1px solid #fbbf24" : "1px solid rgba(255,255,255,0.1)",
                borderRadius: 999,
                padding: "6px 14px",
                fontSize: 11,
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

      {/* MAIN EXAM AREA: SPLIT SCREEN PASSAGE & QUESTION CONTAINER */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 300px", flex: 1, minHeight: "calc(100vh - 65px)" }}>

        {/* LEFT CONTAINER: 450-WORD READING PASSAGE CONTAINER */}
        <div style={{ padding: 28, borderRight: "1px solid rgba(255,255,255,0.12)", background: "rgba(15,23,42,0.6)", overflowY: "auto", maxHeight: "calc(100vh - 65px)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, color: "#fbbf24", marginBottom: 16 }}>
            <BookOpen size={18} />
            <span style={{ fontSize: 13, fontWeight: 800, textTransform: "uppercase" }}>Reading Passage / Fact Scenario</span>
          </div>

          <div style={{ background: "rgba(30,41,59,0.7)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 18, padding: 24, fontSize: 15, lineHeight: 1.75, color: "#e2e8f0", whiteSpace: "pre-line" }}>
            {currentQ?.passageText || "Read the passage carefully and answer the questions that follow."}
          </div>
        </div>

        {/* MIDDLE CONTAINER: QUESTION & OPTIONS */}
        <div style={{ padding: 28, overflowY: "auto", borderRight: "1px solid rgba(255,255,255,0.1)", maxHeight: "calc(100vh - 65px)", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
          <div>
            <div style={{ marginBottom: 24 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                <span style={{ background: "rgba(251,191,36,0.2)", color: "#fbbf24", border: "1px solid rgba(251,191,36,0.3)", padding: "4px 12px", borderRadius: 8, fontSize: 12, fontWeight: 900 }}>
                  QUESTION {currentQuestionIdx + 1} OF {activeQuestions.length} ({activeSection.toUpperCase()})
                </span>
                <span style={{ fontSize: 11, color: "#94a3b8", fontWeight: 700 }}>CLAT (+1, -0.25)</span>
              </div>

              <h3 style={{ fontSize: 17, fontWeight: 800, color: "#ffffff", lineHeight: 1.6 }}>
                {currentQ?.questionText}
              </h3>
            </div>

            {/* MCQ OPTIONS */}
            <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 32 }}>
              {(currentQ?.options || []).map((opt) => {
                const isSelected = userAnswers[currentQ?.id] === opt;
                return (
                  <div
                    key={opt}
                    onClick={() => handleSelectOption(currentQ?.id, opt)}
                    style={{
                      background: isSelected ? "rgba(251,191,36,0.18)" : "rgba(30,41,59,0.6)",
                      border: isSelected ? "2px solid #fbbf24" : "1px solid rgba(255,255,255,0.1)",
                      borderRadius: 14,
                      padding: "14px 18px",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      gap: 12
                    }}
                  >
                    <div style={{ width: 20, height: 20, borderRadius: "50%", border: isSelected ? "6px solid #fbbf24" : "2px solid #64748b", background: isSelected ? "#ffffff" : "transparent" }} />
                    <span style={{ fontSize: 14, fontWeight: isSelected ? 800 : 500, color: isSelected ? "#ffffff" : "#cbd5e1" }}>{opt}</span>
                  </div>
                );
              })}
            </div>
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
                style={{ background: "linear-gradient(135deg, #d97706, #b45309)", color: "#ffffff", border: "none", borderRadius: 10, padding: "10px 20px", fontWeight: 900, fontSize: 12, cursor: "pointer" }}
              >
                Save &amp; Next <ChevronRight size={14} style={{ display: "inline", marginLeft: 2 }} />
              </button>
            </div>
          </div>

        </div>

        {/* RIGHT CONTAINER: QUESTION PALETTE */}
        <div style={{ background: "#0f172a", padding: 20, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>

          <div>
            <h3 style={{ fontSize: 14, fontWeight: 900, color: "#ffffff", marginBottom: 12 }}>
              CLAT Question Palette
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
            Submit CLAT Examination
          </button>

        </div>

      </div>

    </div>
  );
}
