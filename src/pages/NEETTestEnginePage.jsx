import React, { useState, useEffect, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Clock, ChevronLeft, ChevronRight, Bookmark, CheckCircle2, RotateCcw, AlertTriangle, ShieldCheck
} from "lucide-react";
import { getNEETMockById } from "../data/neet/neetTests";
import { calculateNEETScore } from "../utils/neetScoreCalculator";

export default function NEETTestEnginePage() {
  const { testId } = useParams();
  const navigate = useNavigate();

  const mockObj = useMemo(() => {
    return getNEETMockById(testId);
  }, [testId]);

  const [activeSubject, setActiveSubject] = useState("physics"); // 'physics', 'chemistry', 'botany', 'zoology'
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);

  // User State
  const [userAnswers, setUserAnswers] = useState(() => {
    const saved = localStorage.getItem(`neet_ans_${testId}`);
    return saved ? JSON.parse(saved) : {};
  });

  const [markedForReview, setMarkedForReview] = useState(() => {
    const saved = localStorage.getItem(`neet_marked_${testId}`);
    return saved ? JSON.parse(saved) : {};
  });

  const [visitedQuestions, setVisitedQuestions] = useState(() => {
    const saved = localStorage.getItem(`neet_visited_${testId}`);
    return saved ? new Set(JSON.parse(saved)) : new Set();
  });

  // 200 Mins Countdown Timer Persistence
  const [timeLeft, setTimeLeft] = useState(() => {
    const saved = localStorage.getItem(`neet_timer_${testId}`);
    return saved ? parseInt(saved, 10) : 200 * 60;
  });

  const activeQuestions = useMemo(() => {
    return (mockObj.questions || []).filter((q) => (q.subject || "physics") === activeSubject);
  }, [mockObj, activeSubject]);

  const currentQ = activeQuestions[currentQuestionIdx] || activeQuestions[0];

  // Record visited question
  useEffect(() => {
    if (currentQ) {
      setVisitedQuestions((prev) => {
        const nextSet = new Set(prev);
        nextSet.add(currentQ.id);
        localStorage.setItem(`neet_visited_${testId}`, JSON.stringify(Array.from(nextSet)));
        return nextSet;
      });
    }
  }, [currentQ, testId]);

  // Persist answers
  useEffect(() => {
    localStorage.setItem(`neet_ans_${testId}`, JSON.stringify(userAnswers));
  }, [userAnswers, testId]);

  // Persist marked for review
  useEffect(() => {
    localStorage.setItem(`neet_marked_${testId}`, JSON.stringify(markedForReview));
  }, [markedForReview, testId]);

  // Timer Tick & Persistence
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleAutoSubmit();
          return 0;
        }
        const nextSec = prev - 1;
        localStorage.setItem(`neet_timer_${testId}`, String(nextSec));
        return nextSec;
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

  const handleClearResponse = (qId) => {
    setUserAnswers((prev) => {
      const copy = { ...prev };
      delete copy[qId];
      return copy;
    });
  };

  const handleToggleMarkReview = (qId) => {
    setMarkedForReview((prev) => ({ ...prev, [qId]: !prev[qId] }));
  };

  const handleSaveAndNext = () => {
    if (currentQuestionIdx < activeQuestions.length - 1) {
      setCurrentQuestionIdx((prev) => prev + 1);
    }
  };

  const handleMarkAndNext = () => {
    if (currentQ) {
      setMarkedForReview((prev) => ({ ...prev, [currentQ.id]: true }));
    }
    handleSaveAndNext();
  };

  const handleAutoSubmit = () => {
    saveAttemptResults();
  };

  const handleSubmitExam = () => {
    if (window.confirm("Are you sure you want to submit your NEET-UG Examination paper?")) {
      saveAttemptResults();
    }
  };

  const saveAttemptResults = () => {
    const attemptId = `neet_attempt_${Date.now()}`;
    const resultData = calculateNEETScore(mockObj, userAnswers, markedForReview, 200 * 60 - timeLeft);

    // Save attempt to local storage
    localStorage.setItem(attemptId, JSON.stringify({
      id: attemptId,
      testId: mockObj.id,
      mockTitle: mockObj.title,
      timestamp: new Date().toISOString(),
      userAnswers,
      markedForReview,
      result: resultData
    }));

    // Clear active test storage
    localStorage.removeItem(`neet_ans_${testId}`);
    localStorage.removeItem(`neet_marked_${testId}`);
    localStorage.removeItem(`neet_visited_${testId}`);
    localStorage.removeItem(`neet_timer_${testId}`);

    navigate(`/neet/results/${attemptId}`);
  };

  return (
    <div style={{ minHeight: "100vh", background: "#060b13", color: "#ffffff", fontFamily: "Inter, sans-serif", display: "flex", flexDirection: "column" }}>
      
      {/* TOP NTA CBT HEADER TOOLBAR */}
      <div style={{ background: "#0d1527", borderBottom: "1px solid rgba(255,255,255,0.12)", padding: "12px 24px", display: "flex", justifyContent: "space-between", alignItems: "center", position: "sticky", top: 0, zIndex: 998 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <button
            onClick={() => navigate("/neet")}
            style={{ background: "rgba(255,255,255,0.08)", color: "#cbd5e1", border: "1px solid rgba(255,255,255,0.15)", borderRadius: 10, padding: "6px 14px", fontSize: 13, fontWeight: 700, cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 6 }}
          >
            <ChevronLeft size={16} /> Exit CBT
          </button>
          <div>
            <h2 style={{ fontSize: 16, fontWeight: 900, margin: 0, color: "#ffffff" }}>{mockObj.title}</h2>
            <div style={{ fontSize: 11, color: "#10b981", fontWeight: 800 }}>OFFICIAL NTA NEET-UG COMPUTER BASED TEST</div>
          </div>
        </div>

        {/* Subject Navigation Tabs */}
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          {[
            { id: "physics", label: "PHYSICS", color: "#3b82f6" },
            { id: "chemistry", label: "CHEMISTRY", color: "#10b981" },
            { id: "botany", label: "BOTANY", color: "#059669" },
            { id: "zoology", label: "ZOOLOGY", color: "#ec4899" }
          ].map((sec) => (
            <button
              key={sec.id}
              onClick={() => {
                setActiveSubject(sec.id);
                setCurrentQuestionIdx(0);
              }}
              style={{
                background: activeSubject === sec.id ? sec.color : "rgba(255,255,255,0.08)",
                color: "#ffffff",
                border: activeSubject === sec.id ? `1px solid ${sec.color}` : "1px solid rgba(255,255,255,0.1)",
                borderRadius: 999,
                padding: "6px 18px",
                fontSize: 12,
                fontWeight: 900,
                cursor: "pointer",
                boxShadow: activeSubject === sec.id ? `0 4px 14px ${sec.color}40` : "none"
              }}
            >
              {sec.label}
            </button>
          ))}
        </div>

        {/* Timer Box */}
        <div style={{ background: "rgba(239,68,68,0.15)", color: "#f87171", border: "1px solid rgba(248,113,113,0.3)", borderRadius: 12, padding: "8px 18px", fontWeight: 900, fontSize: 15, display: "flex", alignItems: "center", gap: 8 }}>
          <Clock size={16} /> {formatTime(timeLeft)}
        </div>
      </div>

      {/* MAIN EXAM CONTAINER */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 340px", flex: 1, minHeight: "calc(100vh - 65px)" }}>

        {/* LEFT COLUMN: QUESTION PANEL */}
        <div style={{ padding: 32, overflowY: "auto", borderRight: "1px solid rgba(255,255,255,0.1)", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>

          <div>
            {/* Question Badge Header */}
            <div style={{ marginBottom: 24, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
              <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                <span style={{ background: "rgba(16,185,129,0.2)", color: "#10b981", border: "1px solid rgba(16,185,129,0.3)", padding: "4px 14px", borderRadius: 8, fontSize: 12, fontWeight: 900 }}>
                  Q.{currentQuestionIdx + 1} OF {activeQuestions.length} ({activeSubject.toUpperCase()})
                </span>
                <span style={{ background: "rgba(59,130,246,0.2)", color: "#60a5fa", border: "1px solid rgba(59,130,246,0.3)", padding: "4px 12px", borderRadius: 8, fontSize: 11, fontWeight: 800 }}>
                  NCERT: {currentQ?.ncertUnit || "NEET Syllabus"}
                </span>
              </div>

              <div style={{ fontSize: 12, color: "#94a3b8", fontWeight: 700 }}>
                Marking: <strong style={{ color: "#4ade80" }}>+4.0</strong> / <strong style={{ color: "#f87171" }}>-1.0</strong>
              </div>
            </div>

            {/* Question Text */}
            <div style={{ background: "rgba(15,23,42,0.6)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 16, padding: 24, marginBottom: 28 }}>
              <h3 style={{ fontSize: 17, fontWeight: 800, color: "#ffffff", lineHeight: 1.6, margin: 0 }}>
                {currentQ?.questionText}
              </h3>
            </div>

            {/* MCQ Options */}
            <div style={{ display: "flex", flexDirection: "column", gap: 14, marginBottom: 36 }}>
              {(currentQ?.options || []).map((opt) => {
                const isSelected = userAnswers[currentQ?.id] === opt;
                return (
                  <div
                    key={opt}
                    onClick={() => handleSelectOption(currentQ?.id, opt)}
                    style={{
                      background: isSelected ? "rgba(16,185,129,0.18)" : "rgba(30,41,59,0.6)",
                      border: isSelected ? "2px solid #10b981" : "1px solid rgba(255,255,255,0.1)",
                      borderRadius: 16,
                      padding: "16px 20px",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      gap: 14,
                      transition: "all 0.15s ease"
                    }}
                  >
                    <div style={{ width: 22, height: 22, borderRadius: "50%", border: isSelected ? "6px solid #10b981" : "2px solid #64748b", background: isSelected ? "#ffffff" : "transparent" }} />
                    <span style={{ fontSize: 15, fontWeight: isSelected ? 800 : 500, color: isSelected ? "#ffffff" : "#cbd5e1" }}>{opt}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Action Control Buttons */}
          <div style={{ borderTop: "1px solid rgba(255,255,255,0.1)", paddingTop: 20, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
            <div style={{ display: "flex", gap: 10 }}>
              <button
                onClick={() => handleClearResponse(currentQ?.id)}
                style={{ background: "rgba(239,68,68,0.15)", color: "#f87171", border: "1px solid rgba(239,68,68,0.3)", borderRadius: 12, padding: "10px 18px", fontWeight: 800, fontSize: 13, cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 6 }}
              >
                <RotateCcw size={15} /> Clear Response
              </button>

              <button
                onClick={handleMarkAndNext}
                style={{ background: "rgba(168,85,247,0.2)", color: "#c084fc", border: "1px solid rgba(168,85,247,0.3)", borderRadius: 12, padding: "10px 18px", fontWeight: 800, fontSize: 13, cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 6 }}
              >
                <Bookmark size={15} /> Mark for Review &amp; Next
              </button>
            </div>

            <div style={{ display: "flex", gap: 10 }}>
              <button
                disabled={currentQuestionIdx === 0}
                onClick={() => setCurrentQuestionIdx((prev) => Math.max(0, prev - 1))}
                style={{ background: "rgba(255,255,255,0.08)", color: "#ffffff", border: "1px solid rgba(255,255,255,0.15)", borderRadius: 12, padding: "10px 18px", fontWeight: 800, fontSize: 13, cursor: currentQuestionIdx === 0 ? "not-allowed" : "pointer" }}
              >
                Previous
              </button>

              <button
                onClick={handleSaveAndNext}
                style={{ background: "linear-gradient(135deg, #059669, #10b981)", color: "#ffffff", border: "none", borderRadius: 12, padding: "10px 24px", fontWeight: 900, fontSize: 14, cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 6, boxShadow: "0 4px 14px rgba(16,185,129,0.3)" }}
              >
                Save &amp; Next <ChevronRight size={16} />
              </button>
            </div>
          </div>

        </div>

        {/* RIGHT COLUMN: QUESTION PALETTE */}
        <div style={{ background: "#0d1527", padding: 24, display: "flex", flexDirection: "column", justifyContent: "space-between", borderLeft: "1px solid rgba(255,255,255,0.08)" }}>

          <div>
            <h3 style={{ fontSize: 15, fontWeight: 900, color: "#ffffff", marginBottom: 16 }}>
              {activeSubject.toUpperCase()} Question Palette
            </h3>

            {/* Question Grid */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 10, maxHeight: 380, overflowY: "auto", paddingRight: 4 }}>
              {activeQuestions.map((q, idx) => {
                const ans = userAnswers[q.id];
                const isAnswered = ans !== undefined && ans !== null && String(ans).trim() !== "";
                const isMarked = markedForReview[q.id];
                const isVisited = visitedQuestions.has(q.id);
                const isCurrent = idx === currentQuestionIdx;

                let bg = "rgba(255,255,255,0.06)";
                let color = "#cbd5e1";
                let border = "1px solid rgba(255,255,255,0.1)";

                if (isAnswered && isMarked) {
                  bg = "#06b6d4"; color = "#ffffff"; // Answered & Marked
                } else if (isAnswered) {
                  bg = "#22c55e"; color = "#ffffff"; // Answered
                } else if (isMarked) {
                  bg = "#8b5cf6"; color = "#ffffff"; // Marked for Review
                } else if (isVisited) {
                  bg = "#ef4444"; color = "#ffffff"; // Not Answered
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
                      borderRadius: isMarked ? "50%" : 10,
                      height: 40,
                      fontWeight: 800,
                      fontSize: 13,
                      cursor: "pointer"
                    }}
                  >
                    {idx + 1}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Palette Legend */}
          <div style={{ background: "rgba(15,23,42,0.6)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 14, padding: 14, marginTop: 20 }}>
            <div style={{ fontSize: 11, fontWeight: 900, color: "#94a3b8", marginBottom: 10 }}>PALETTE LEGEND</div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, fontSize: 11, color: "#cbd5e1" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <span style={{ width: 12, height: 12, borderRadius: 3, background: "#22c55e" }} /> Answered
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <span style={{ width: 12, height: 12, borderRadius: 3, background: "#ef4444" }} /> Not Answered
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <span style={{ width: 12, height: 12, borderRadius: "50%", background: "#8b5cf6" }} /> Marked Review
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <span style={{ width: 12, height: 12, borderRadius: 3, background: "rgba(255,255,255,0.1)" }} /> Not Visited
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <button
            onClick={handleSubmitExam}
            style={{ width: "100%", background: "linear-gradient(135deg, #059669, #10b981)", color: "#ffffff", border: "none", borderRadius: 14, padding: "16px", fontWeight: 900, fontSize: 15, cursor: "pointer", boxShadow: "0 8px 24px rgba(16,185,129,0.4)", marginTop: 16 }}
          >
            Submit Full NEET Exam
          </button>

        </div>

      </div>

    </div>
  );
}
