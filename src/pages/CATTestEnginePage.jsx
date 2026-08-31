import React, { useState, useEffect, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Clock, ShieldCheck, ChevronLeft, ChevronRight, CheckCircle2,
  Bookmark, Award, Zap, AlertCircle, Calculator, FileText, X, Play, RotateCcw
} from "lucide-react";
import { catTests } from "../data/cat/catTests";
import { getCATConfig } from "../config/catConfig";
import { calculateCATSectionScores } from "../utils/catScoreCalculator";

export default function CATTestEnginePage() {
  const { testId } = useParams();
  const navigate = useNavigate();

  // Find test object
  const testObj = useMemo(() => {
    return catTests.find((t) => t.id === testId) || catTests[0];
  }, [testId]);

  const config = getCATConfig(testObj.testVersion || "CAT_2026");

  // Section Order
  const SECTIONS = ["varc", "dilr", "qa"];
  const [activeSectionIdx, setActiveSectionIdx] = useState(0); // 0: VARC, 1: DILR, 2: QA
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);

  // User State
  const [userAnswers, setUserAnswers] = useState({});
  const [markedForReview, setMarkedForReview] = useState({});
  const [titaInputs, setTitaInputs] = useState({});
  const [isExamMode, setIsExamMode] = useState(true); // Full Simulation vs Practice

  // On-Screen Tools State
  const [showCalculator, setShowCalculator] = useState(false);
  const [showScratchpad, setShowScratchpad] = useState(false);
  const [scratchText, setScratchText] = useState("");
  const [calcInput, setCalcInput] = useState("");

  // Timers (40:00 per section)
  const [sectionTimeLeft, setSectionTimeLeft] = useState(2400);

  // Active section question list
  const activeSectionKey = SECTIONS[activeSectionIdx];
  const activeQuestions = testObj.sections[activeSectionKey]?.questions || [];
  const currentQ = activeQuestions[currentQuestionIdx] || activeQuestions[0];

  // Auto-Save / Session Recovery
  useEffect(() => {
    const saved = localStorage.getItem(`cat_session_${testId}`);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setUserAnswers(parsed.userAnswers || {});
        setMarkedForReview(parsed.markedForReview || {});
        setTitaInputs(parsed.titaInputs || {});
        setActiveSectionIdx(parsed.activeSectionIdx || 0);
        setCurrentQuestionIdx(parsed.currentQuestionIdx || 0);
      } catch (err) {
        console.error("CAT session recovery error:", err);
      }
    }
  }, [testId]);

  useEffect(() => {
    localStorage.setItem(
      `cat_session_${testId}`,
      JSON.stringify({ userAnswers, markedForReview, titaInputs, activeSectionIdx, currentQuestionIdx })
    );
  }, [userAnswers, markedForReview, titaInputs, activeSectionIdx, currentQuestionIdx, testId]);

  // Section Timer Countdown
  useEffect(() => {
    const timer = setInterval(() => {
      setSectionTimeLeft((prev) => {
        if (prev <= 1) {
          // Auto Lock section & advance
          if (activeSectionIdx < SECTIONS.length - 1) {
            setActiveSectionIdx((s) => s + 1);
            setCurrentQuestionIdx(0);
            return 2400; // Reset next section timer
          } else {
            handleCompleteCATExam(); // Auto submit final test
            return 0;
          }
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [activeSectionIdx]);

  const formatTime = (secs) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
  };

  // Option / Answer Selection Handlers
  const handleSelectMcq = (qId, optionText) => {
    setUserAnswers((prev) => ({ ...prev, [qId]: optionText }));
  };

  const handleTitaChange = (qId, val) => {
    setTitaInputs((prev) => ({ ...prev, [qId]: val }));
    setUserAnswers((prev) => ({ ...prev, [qId]: val }));
  };

  const toggleMarkReview = (qId) => {
    setMarkedForReview((prev) => ({ ...prev, [qId]: !prev[qId] }));
  };

  // Calculator Handler
  const handleCalcClick = (val) => {
    if (val === "C") setCalcInput("");
    else if (val === "=") {
      try {
        const sanitized = calcInput.replace(/×/g, "*").replace(/÷/g, "/").replace(/[^0-9+\-*/.]/g, "");
        const res = new Function(`"use strict"; return (${sanitized})`)();
        setCalcInput(String(res));
      } catch {
        setCalcInput("Error");
      }
    } else {
      setCalcInput((prev) => prev + val);
    }
  };

  // Final Exam Submission
  const handleCompleteCATExam = () => {
    const allQuestions = [
      ...(testObj.sections.varc?.questions || []),
      ...(testObj.sections.dilr?.questions || []),
      ...(testObj.sections.qa?.questions || [])
    ];

    const results = calculateCATSectionScores(userAnswers, allQuestions, testObj.testVersion);
    const resultId = `cat_res_${Date.now()}`;

    const resultPayload = {
      resultId,
      testId: testObj.id,
      title: testObj.title,
      date: new Date().toISOString(),
      userAnswers,
      ...results
    };

    localStorage.setItem(`cat_result_${resultId}`, JSON.stringify(resultPayload));
    localStorage.removeItem(`cat_session_${testId}`);
    navigate(`/cat/results/${resultId}`);
  };

  return (
    <div style={{ minHeight: "100vh", background: "#090d16", color: "#ffffff", fontFamily: "Inter, sans-serif", display: "flex", flexDirection: "column" }}>

      {/* ── TOP HEADER BAR ── */}
      <div style={{ background: "#0f172a", borderBottom: "1px solid rgba(255,255,255,0.12)", padding: "12px 24px", display: "flex", justifyContent: "space-between", alignItems: "center", position: "sticky", top: 0, zIndex: 999 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <button
            onClick={() => navigate("/cat")}
            style={{ background: "rgba(255,255,255,0.08)", color: "#cbd5e1", border: "1px solid rgba(255,255,255,0.15)", borderRadius: 10, padding: "6px 12px", fontSize: 13, fontWeight: 700, cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 6 }}
          >
            <ChevronLeft size={16} /> Exit Exam
          </button>
          <div>
            <h2 style={{ fontSize: 16, fontWeight: 900, margin: 0, color: "#ffffff" }}>{testObj.title}</h2>
            <div style={{ fontSize: 11, color: "#ec4899", fontWeight: 800 }}>CAT 2026 OFFICIAL COMPUTER SIMULATION</div>
          </div>
        </div>

        {/* Center: Section Indicator Tabs */}
        <div style={{ display: "flex", gap: 8 }}>
          {SECTIONS.map((secKey, idx) => {
            const isLocked = idx < activeSectionIdx;
            const isActive = idx === activeSectionIdx;
            return (
              <div
                key={secKey}
                style={{
                  background: isActive ? "linear-gradient(135deg, #db2777, #9333ea)" : isLocked ? "rgba(255,255,255,0.04)" : "rgba(255,255,255,0.08)",
                  color: isActive ? "#ffffff" : isLocked ? "#64748b" : "#cbd5e1",
                  border: isActive ? "1px solid #f472b6" : "1px solid rgba(255,255,255,0.1)",
                  padding: "6px 16px",
                  borderRadius: 999,
                  fontSize: 12,
                  fontWeight: 800,
                  display: "flex",
                  alignItems: "center",
                  gap: 6
                }}
              >
                <span>{secKey.toUpperCase()}</span>
                {isLocked && <span style={{ fontSize: 10, opacity: 0.8 }}>(LOCKED)</span>}
              </div>
            );
          })}
        </div>

        {/* Right Tools & Timer */}
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          {/* On-Screen Calculator Toggle */}
          <button
            onClick={() => setShowCalculator((prev) => !prev)}
            style={{ background: showCalculator ? "rgba(245,158,11,0.2)" : "rgba(255,255,255,0.08)", color: showCalculator ? "#facc15" : "#cbd5e1", border: "1px solid rgba(255,255,255,0.15)", borderRadius: 10, padding: "8px 14px", fontSize: 12, fontWeight: 800, cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 6 }}
          >
            <Calculator size={16} /> Calculator
          </button>

          {/* Rough Scratchpad Toggle */}
          <button
            onClick={() => setShowScratchpad((prev) => !prev)}
            style={{ background: showScratchpad ? "rgba(56,189,248,0.2)" : "rgba(255,255,255,0.08)", color: showScratchpad ? "#38bdf8" : "#cbd5e1", border: "1px solid rgba(255,255,255,0.15)", borderRadius: 10, padding: "8px 14px", fontSize: 12, fontWeight: 800, cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 6 }}
          >
            <FileText size={16} /> Scratchpad
          </button>

          {/* Section Timer */}
          <div style={{ background: "rgba(239,68,68,0.15)", color: "#f87171", border: "1px solid rgba(248,113,113,0.3)", borderRadius: 12, padding: "8px 16px", fontWeight: 900, fontSize: 15, display: "flex", alignItems: "center", gap: 8 }}>
            <Clock size={16} /> {formatTime(sectionTimeLeft)}
          </div>
        </div>
      </div>

      {/* ── MAIN EXAM AREA ── */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 340px", flex: 1, minHeight: "calc(100vh - 65px)" }}>

        {/* LEFT COLUMN: QUESTION CONTENT & INPUT */}
        <div style={{ padding: 32, overflowY: "auto", borderRight: "1px solid rgba(255,255,255,0.1)" }}>

          {/* Passage / Scenario Box if RC or DILR */}
          {(currentQ?.passageText || currentQ?.scenario) && (
            <div style={{ background: "rgba(30,41,59,0.75)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 20, padding: 24, marginBottom: 28, maxHeight: 320, overflowY: "auto" }}>
              <div style={{ fontSize: 12, fontWeight: 800, color: "#ec4899", textTransform: "uppercase", marginBottom: 8 }}>
                {currentQ.passageTitle || currentQ.setTitle || "Passage / Scenario Context"}
              </div>
              <div style={{ color: "#e2e8f0", fontSize: 14, lineHeight: 1.7, whiteSpace: "pre-line" }}>
                {currentQ.passageText || currentQ.scenario}
              </div>
            </div>
          )}

          {/* Question Prompt */}
          <div style={{ marginBottom: 28 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
              <span style={{ background: "rgba(236,72,153,0.2)", color: "#f472b6", border: "1px solid rgba(244,114,182,0.3)", padding: "4px 12px", borderRadius: 8, fontSize: 12, fontWeight: 900 }}>
                QUESTION {currentQuestionIdx + 1} OF {activeQuestions.length} ({currentQ?.questionType || "MCQ"})
              </span>
              <span style={{ fontSize: 12, color: "#94a3b8", fontWeight: 700 }}>
                {currentQ?.questionType === "TITA" ? "Non-MCQ (+3 / 0 Marking)" : "MCQ (+3 / -1 Marking)"}
              </span>
            </div>

            <h3 style={{ fontSize: 18, fontWeight: 800, color: "#ffffff", lineHeight: 1.6 }}>
              {currentQ?.questionText}
            </h3>
          </div>

          {/* Answer Option Selector / TITA Input */}
          {currentQ?.questionType === "TITA" ? (
            <div style={{ marginBottom: 36 }}>
              <label style={{ display: "block", fontSize: 13, color: "#94a3b8", fontWeight: 700, marginBottom: 8 }}>
                Type In The Answer (TITA Numeric Input):
              </label>
              <input
                type="text"
                value={titaInputs[currentQ.id] || ""}
                onChange={(e) => handleTitaChange(currentQ.id, e.target.value)}
                placeholder="Enter numerical answer..."
                style={{ width: "100%", maxWidth: 300, background: "#0f172a", border: "2px solid #ec4899", borderRadius: 14, padding: "14px 18px", color: "#ffffff", fontSize: 16, fontWeight: 800, outline: "none" }}
              />
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 14, marginBottom: 36 }}>
              {(currentQ?.options || []).map((opt) => {
                const isSelected = userAnswers[currentQ.id] === opt;
                return (
                  <div
                    key={opt}
                    onClick={() => handleSelectMcq(currentQ.id, opt)}
                    style={{
                      background: isSelected ? "rgba(236,72,153,0.18)" : "rgba(30,41,59,0.6)",
                      border: isSelected ? "2px solid #ec4899" : "1px solid rgba(255,255,255,0.1)",
                      borderRadius: 16,
                      padding: "16px 20px",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      gap: 14,
                      transition: "all 0.2s ease"
                    }}
                  >
                    <div style={{ width: 22, height: 22, borderRadius: "50%", border: isSelected ? "6px solid #ec4899" : "2px solid #64748b", background: isSelected ? "#ffffff" : "transparent" }} />
                    <span style={{ fontSize: 15, fontWeight: isSelected ? 800 : 500, color: isSelected ? "#ffffff" : "#cbd5e1" }}>{opt}</span>
                  </div>
                );
              })}
            </div>
          )}

          {/* Navigation & Action Bar */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "1px solid rgba(255,255,255,0.1)", paddingTop: 24 }}>
            <button
              onClick={() => toggleMarkReview(currentQ.id)}
              style={{
                background: markedForReview[currentQ.id] ? "rgba(245,158,11,0.25)" : "rgba(255,255,255,0.08)",
                color: markedForReview[currentQ.id] ? "#facc15" : "#cbd5e1",
                border: markedForReview[currentQ.id] ? "1px solid #facc15" : "1px solid rgba(255,255,255,0.15)",
                borderRadius: 12,
                padding: "12px 20px",
                fontWeight: 800,
                fontSize: 13,
                cursor: "pointer",
                display: "inline-flex",
                alignItems: "center",
                gap: 8
              }}
            >
              <Bookmark size={16} /> {markedForReview[currentQ.id] ? "Marked for Review" : "Mark for Review"}
            </button>

            <div style={{ display: "flex", gap: 12 }}>
              <button
                disabled={currentQuestionIdx === 0}
                onClick={() => setCurrentQuestionIdx((prev) => Math.max(0, prev - 1))}
                style={{ background: "rgba(255,255,255,0.08)", color: "#ffffff", border: "1px solid rgba(255,255,255,0.15)", borderRadius: 12, padding: "12px 20px", fontWeight: 800, fontSize: 13, cursor: currentQuestionIdx === 0 ? "not-allowed" : "pointer" }}
              >
                Previous
              </button>
              <button
                disabled={currentQuestionIdx === activeQuestions.length - 1}
                onClick={() => setCurrentQuestionIdx((prev) => Math.min(activeQuestions.length - 1, prev + 1))}
                style={{ background: "linear-gradient(135deg, #db2777, #9333ea)", color: "#ffffff", border: "none", borderRadius: 12, padding: "12px 24px", fontWeight: 800, fontSize: 13, cursor: currentQuestionIdx === activeQuestions.length - 1 ? "not-allowed" : "pointer" }}
              >
                Next Question <ChevronRight size={16} style={{ display: "inline", marginLeft: 4 }} />
              </button>
            </div>
          </div>

        </div>

        {/* RIGHT COLUMN: QUESTION PALETTE & SECTION SUBMIT */}
        <div style={{ background: "#0f172a", padding: 24, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>

          <div>
            <h3 style={{ fontSize: 16, fontWeight: 900, color: "#ffffff", marginBottom: 16 }}>
              {activeSectionKey.toUpperCase()} Question Palette
            </h3>

            {/* Question Status Legend */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, fontSize: 11, color: "#94a3b8", marginBottom: 20 }}>
              <div><span style={{ display: "inline-block", width: 10, height: 10, borderRadius: "50%", background: "rgba(255,255,255,0.2)", marginRight: 6 }} /> ○ Not Visited</div>
              <div><span style={{ display: "inline-block", width: 10, height: 10, borderRadius: "50%", background: "#22c55e", marginRight: 6 }} /> ● Answered</div>
              <div><span style={{ display: "inline-block", width: 10, height: 10, borderRadius: "50%", background: "#facc15", marginRight: 6 }} /> ⚑ Marked Review</div>
              <div><span style={{ display: "inline-block", width: 10, height: 10, borderRadius: "50%", background: "#a855f7", marginRight: 6 }} /> ●⚑ Answered+Marked</div>
            </div>

            {/* Question Buttons Palette Grid */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 10 }}>
              {activeQuestions.map((q, idx) => {
                const isAnswered = userAnswers[q.id] !== undefined && userAnswers[q.id] !== "";
                const isMarked = markedForReview[q.id];
                const isCurrent = idx === currentQuestionIdx;

                let bg = "rgba(255,255,255,0.06)";
                let color = "#cbd5e1";
                let border = "1px solid rgba(255,255,255,0.1)";

                if (isAnswered && isMarked) {
                  bg = "#a855f7"; color = "#ffffff";
                } else if (isAnswered) {
                  bg = "#22c55e"; color = "#ffffff";
                } else if (isMarked) {
                  bg = "#facc15"; color = "#0f172a";
                }

                if (isCurrent) {
                  border = "2px solid #ffffff";
                }

                return (
                  <button
                    key={q.id}
                    onClick={() => setCurrentQuestionIdx(idx)}
                    style={{
                      background: bg,
                      color: color,
                      border: border,
                      borderRadius: 10,
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

          {/* Submit / Advance Section Button */}
          <div style={{ marginTop: 28, paddingTop: 20, borderTop: "1px solid rgba(255,255,255,0.1)" }}>
            {activeSectionIdx < SECTIONS.length - 1 ? (
              <button
                onClick={() => {
                  setActiveSectionIdx((s) => s + 1);
                  setCurrentQuestionIdx(0);
                  setSectionTimeLeft(2400);
                }}
                style={{ width: "100%", background: "linear-gradient(135deg, #d97706, #b45309)", color: "#ffffff", border: "none", borderRadius: 14, padding: "14px", fontWeight: 800, fontSize: 14, cursor: "pointer" }}
              >
                Lock Section &amp; Proceed to {SECTIONS[activeSectionIdx + 1].toUpperCase()}
              </button>
            ) : (
              <button
                onClick={handleCompleteCATExam}
                style={{ width: "100%", background: "linear-gradient(135deg, #22c55e, #15803d)", color: "#ffffff", border: "none", borderRadius: 14, padding: "14px", fontWeight: 900, fontSize: 15, cursor: "pointer", boxShadow: "0 6px 20px rgba(34,197,94,0.4)" }}
              >
                Submit Official CAT Exam
              </button>
            )}
          </div>

        </div>

      </div>

      {/* ── ON-SCREEN CALCULATOR MODAL ── */}
      {showCalculator && (
        <div style={{ position: "fixed", bottom: 80, right: 360, background: "#0f172a", border: "2px solid #facc15", borderRadius: 20, padding: 20, width: 260, zIndex: 9999, boxShadow: "0 20px 40px rgba(0,0,0,0.6)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
            <span style={{ fontSize: 13, fontWeight: 900, color: "#facc15" }}>CAT CALCULATOR</span>
            <X size={16} cursor="pointer" onClick={() => setShowCalculator(false)} />
          </div>
          <div style={{ background: "#020617", border: "1px solid rgba(255,255,255,0.2)", borderRadius: 10, padding: 12, fontSize: 20, fontWeight: 900, color: "#4ade80", textAlign: "right", marginBottom: 14, minHeight: 45 }}>
            {calcInput || "0"}
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 8 }}>
            {["7", "8", "9", "÷", "4", "5", "6", "×", "1", "2", "3", "-", "C", "0", "=", "+"].map((btn) => (
              <button
                key={btn}
                onClick={() => handleCalcClick(btn)}
                style={{ background: btn === "=" ? "#22c55e" : btn === "C" ? "#ef4444" : "rgba(255,255,255,0.1)", color: "#ffffff", border: "none", borderRadius: 10, padding: "12px 0", fontWeight: 800, fontSize: 15, cursor: "pointer" }}
              >
                {btn}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* ── ROUGH WORK SCRATCHPAD MODAL ── */}
      {showScratchpad && (
        <div style={{ position: "fixed", bottom: 80, right: 100, background: "#0f172a", border: "2px solid #38bdf8", borderRadius: 20, padding: 20, width: 320, zIndex: 9999, boxShadow: "0 20px 40px rgba(0,0,0,0.6)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
            <span style={{ fontSize: 13, fontWeight: 900, color: "#38bdf8" }}>ROUGH WORK SCRATCHPAD</span>
            <X size={16} cursor="pointer" onClick={() => setShowScratchpad(false)} />
          </div>
          <textarea
            value={scratchText}
            onChange={(e) => setScratchText(e.target.value)}
            placeholder="Type equations, variables, and scratch notes here..."
            style={{ width: "100%", height: 180, background: "#020617", border: "1px solid rgba(255,255,255,0.15)", borderRadius: 12, padding: 12, color: "#ffffff", fontSize: 13, outline: "none", resize: "none" }}
          />
        </div>
      )}

    </div>
  );
}
