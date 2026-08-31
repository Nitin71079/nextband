import React, { useState, useEffect, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Clock, ShieldCheck, ChevronLeft, ChevronRight, CheckCircle2,
  Bookmark, Award, Zap, AlertCircle, Calculator, FileText, X, Play, RotateCcw, PenTool, Ban, Layers, RefreshCw
} from "lucide-react";
import { gmatTests } from "../data/gmat/gmatTests";
import { getGMATConfig } from "../config/gmatConfig";
import { selectNextCATQuestion, updateAbilityEstimate } from "../utils/gmatAdaptiveEngine";
import {
  scoreGMATQuestion, calculateGMATSectionScore, calculateGMATTotalScore
} from "../utils/gmatScoreCalculator";

export default function GMATTestEnginePage() {
  const { testId } = useParams();
  const navigate = useNavigate();

  const testObj = useMemo(() => {
    return gmatTests.find((t) => t.id === testId) || gmatTests[0];
  }, [testId]);

  const config = getGMATConfig(testObj.testVersion || "GMAT_2026");

  // Section Order Selection Modal State
  const [hasSelectedOrder, setHasSelectedOrder] = useState(false);
  const [sectionOrder, setSectionOrder] = useState(["quant", "verbal", "di"]);
  const [activeSectionIdx, setActiveSectionIdx] = useState(0);

  // Workflow Mode: 'exam' (CAT testing) vs 'review' (Section Review Screen)
  const [stageMode, setStageMode] = useState("exam");

  // CAT Trajectory & Ability Theta Tracking per section
  const [thetas, setThetas] = useState({ quant: 0.0, verbal: 0.0, di: 0.0 });
  const [catTrajectories, setCatTrajectories] = useState({ quant: [0.0], verbal: [0.0], di: [0.0] });

  // Current Question Index & Active Section Key
  const activeSectionKey = sectionOrder[activeSectionIdx] || "quant";
  const activePool = testObj.sections[activeSectionKey]?.pool || [];

  const [activeQuestion, setActiveQuestion] = useState(null);
  const [answeredQuestionIds, setAnsweredQuestionIds] = useState(new Set());
  const [sectionQuestionsList, setSectionQuestionsList] = useState([]);
  const [currentListIdx, setCurrentListIdx] = useState(0);

  // User State
  const [userAnswers, setUserAnswers] = useState({});
  const [flaggedQuestions, setFlaggedQuestions] = useState({});
  const [answerChangeCount, setAnswerChangeCount] = useState({ quant: 0, verbal: 0, di: 0 });

  // Tools & Review State
  const [showCalculator, setShowCalculator] = useState(false);
  const [calcInput, setCalcInput] = useState("");
  const maxChanges = config.maxAnswerChangesPerSection || 3;

  // Section Timer (45 minutes per section)
  const sectionDurationSeconds = 2700;
  const [timeLeft, setTimeLeft] = useState(sectionDurationSeconds);

  // Initialize First CAT Question when section changes
  useEffect(() => {
    if (hasSelectedOrder && stageMode === "exam") {
      const answeredSet = new Set(sectionQuestionsList.map((q) => q.id));
      const firstQ = selectNextCATQuestion(thetas[activeSectionKey], activePool, answeredSet);
      if (firstQ) {
        setActiveQuestion(firstQ);
        setSectionQuestionsList((prev) => [...prev, firstQ]);
        setCurrentListIdx(sectionQuestionsList.length);
      }
    }
  }, [hasSelectedOrder, activeSectionIdx, stageMode]);

  // Section Timer Countdown
  useEffect(() => {
    if (!hasSelectedOrder) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          if (stageMode === "exam") {
            setStageMode("review");
          } else {
            handleAdvanceSection();
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [hasSelectedOrder, activeSectionIdx, stageMode]);

  const formatTime = (secs) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
  };

  // Submit Answer & Trigger CAT Step
  const handleSelectOption = (qId, optionVal) => {
    const prevAns = userAnswers[qId];

    if (stageMode === "review") {
      // In review mode, check answer edit limits
      if (prevAns !== undefined && prevAns !== optionVal) {
        const used = answerChangeCount[activeSectionKey] || 0;
        if (used >= maxChanges) {
          alert(`You have reached the maximum allowed ${maxChanges} answer changes for this section.`);
          return;
        }
        setAnswerChangeCount((prev) => ({ ...prev, [activeSectionKey]: (prev[activeSectionKey] || 0) + 1 }));
      }
    }

    setUserAnswers((prev) => ({ ...prev, [qId]: optionVal }));
  };

  const handleNextCATStep = () => {
    if (!activeQuestion) return;

    const isCorrect = scoreGMATQuestion(activeQuestion, userAnswers[activeQuestion.id]);
    const currentT = thetas[activeSectionKey];
    const newT = updateAbilityEstimate(currentT, Boolean(isCorrect), activeQuestion.irt?.b || 0, activeQuestion.irt?.a || 1.2);

    setThetas((prev) => ({ ...prev, [activeSectionKey]: newT }));
    setCatTrajectories((prev) => ({ ...prev, [activeSectionKey]: [...(prev[activeSectionKey] || []), newT] }));

    const maxQs = activeSectionKey === "quant" ? 21 : activeSectionKey === "verbal" ? 23 : 20;

    if (sectionQuestionsList.length >= maxQs) {
      setStageMode("review");
      return;
    }

    const answeredSet = new Set(sectionQuestionsList.map((q) => q.id));
    const nextQ = selectNextCATQuestion(newT, activePool, answeredSet);

    if (nextQ) {
      setActiveQuestion(nextQ);
      setSectionQuestionsList((prev) => [...prev, nextQ]);
      setCurrentListIdx(sectionQuestionsList.length);
    } else {
      setStageMode("review");
    }
  };

  const toggleFlag = (qId) => {
    setFlaggedQuestions((prev) => ({ ...prev, [qId]: !prev[qId] }));
  };

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

  // Advance Section or Complete GMAT Exam
  const handleAdvanceSection = () => {
    if (activeSectionIdx < sectionOrder.length - 1) {
      const nextIdx = activeSectionIdx + 1;
      setActiveSectionIdx(nextIdx);
      setStageMode("exam");
      setSectionQuestionsList([]);
      setCurrentListIdx(0);
      setTimeLeft(sectionDurationSeconds);
    } else {
      handleCompleteGMATExam();
    }
  };

  const handleCompleteGMATExam = () => {
    const quantScore = calculateGMATSectionScore(thetas.quant);
    const verbalScore = calculateGMATSectionScore(thetas.verbal);
    const diScore = calculateGMATSectionScore(thetas.di);
    const totalScore = calculateGMATTotalScore(quantScore, verbalScore, diScore);

    const resultId = `gmat_res_${Date.now()}`;
    const resultPayload = {
      resultId,
      testId: testObj.id,
      title: testObj.title,
      date: new Date().toISOString(),
      sectionOrder,
      quantScore,
      verbalScore,
      diScore,
      totalScore,
      thetas,
      catTrajectories,
      userAnswers
    };

    localStorage.setItem(`gmat_result_${resultId}`, JSON.stringify(resultPayload));
    navigate(`/gmat/results/${resultId}`);
  };

  const isCalculatorAllowed = activeSectionKey === "di";

  return (
    <div style={{ minHeight: "100vh", background: "#080c14", color: "#ffffff", fontFamily: "Inter, sans-serif", display: "flex", flexDirection: "column" }}>

      {/* ── SECTION ORDER SELECTION MODAL (BEFORE EXAM START) ── */}
      {!hasSelectedOrder && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(8,12,20,0.95)", backdropFilter: "blur(20px)", zIndex: 99999, display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
          <div style={{ background: "#0f172a", border: "2px solid #38bdf8", borderRadius: 28, padding: 40, maxWidth: 600, width: "100%", boxShadow: "0 20px 60px rgba(0,0,0,0.6)", textAlign: "center" }}>
            <span style={{ background: "rgba(56,189,248,0.2)", color: "#38bdf8", padding: "6px 16px", borderRadius: 999, fontSize: 12, fontWeight: 900 }}>
              OFFICIAL GMAT EXAM 2026 PRE-TEST SETUP
            </span>
            <h2 style={{ fontSize: 26, fontWeight: 900, color: "#ffffff", margin: "20px 0 12px 0" }}>
              Select Your Preferred Section Order
            </h2>
            <p style={{ color: "#cbd5e1", fontSize: 14, lineHeight: 1.6, marginBottom: 28 }}>
              Per official GMAC specifications, you may choose the sequence in which you complete the Quantitative Reasoning, Verbal Reasoning, and Data Insights sections.
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: 14, marginBottom: 32 }}>
              {config.permittedSectionOrders.map((ord, idx) => {
                const isSelected = sectionOrder.join() === ord.join();
                return (
                  <div
                    key={idx}
                    onClick={() => setSectionOrder(ord)}
                    style={{
                      background: isSelected ? "rgba(56,189,248,0.18)" : "rgba(30,41,59,0.6)",
                      border: isSelected ? "2px solid #38bdf8" : "1px solid rgba(255,255,255,0.1)",
                      borderRadius: 16,
                      padding: "16px 20px",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between"
                    }}
                  >
                    <span style={{ fontSize: 15, fontWeight: 900, color: "#ffffff" }}>
                      Option {idx + 1}: {ord.map((s) => s.toUpperCase()).join("  →  ")}
                    </span>
                    <div style={{ width: 20, height: 20, borderRadius: "50%", border: isSelected ? "5px solid #38bdf8" : "2px solid #64748b", background: isSelected ? "#ffffff" : "transparent" }} />
                  </div>
                );
              })}
            </div>

            <button
              onClick={() => setHasSelectedOrder(true)}
              style={{ width: "100%", background: "linear-gradient(135deg, #0284c7, #7c3aed)", color: "#ffffff", border: "none", borderRadius: 16, padding: "16px", fontWeight: 900, fontSize: 16, cursor: "pointer", boxShadow: "0 8px 25px rgba(2,132,199,0.4)" }}
            >
              Begin GMAT Computer-Adaptive Exam
            </button>
          </div>
        </div>
      )}

      {/* ── TOP HEADER BAR ── */}
      <div style={{ background: "#0f172a", borderBottom: "1px solid rgba(255,255,255,0.12)", padding: "12px 24px", display: "flex", justifyContent: "space-between", alignItems: "center", position: "sticky", top: 0, zIndex: 999 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <button
            onClick={() => navigate("/gmat")}
            style={{ background: "rgba(255,255,255,0.08)", color: "#cbd5e1", border: "1px solid rgba(255,255,255,0.15)", borderRadius: 10, padding: "6px 12px", fontSize: 13, fontWeight: 700, cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 6 }}
          >
            <ChevronLeft size={16} /> Exit Exam
          </button>
          <div>
            <h2 style={{ fontSize: 16, fontWeight: 900, margin: 0, color: "#ffffff" }}>{testObj.title}</h2>
            <div style={{ fontSize: 11, color: "#38bdf8", fontWeight: 800 }}>COMPUTER-ADAPTIVE GMAT EXAM (205–805 SCALE)</div>
          </div>
        </div>

        {/* Center: Section Order Indicator */}
        <div style={{ display: "flex", gap: 8 }}>
          {sectionOrder.map((secKey, idx) => {
            const isLocked = idx < activeSectionIdx;
            const isActive = idx === activeSectionIdx;
            return (
              <div
                key={secKey}
                style={{
                  background: isActive ? "linear-gradient(135deg, #0284c7, #7c3aed)" : isLocked ? "rgba(255,255,255,0.04)" : "rgba(255,255,255,0.08)",
                  color: isActive ? "#ffffff" : isLocked ? "#64748b" : "#cbd5e1",
                  border: isActive ? "1px solid #38bdf8" : "1px solid rgba(255,255,255,0.1)",
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
          {/* On-Screen Calculator (Data Insights Only) */}
          <button
            disabled={!isCalculatorAllowed}
            onClick={() => setShowCalculator((prev) => !prev)}
            style={{
              background: !isCalculatorAllowed ? "rgba(239,68,68,0.1)" : showCalculator ? "rgba(245,158,11,0.2)" : "rgba(255,255,255,0.08)",
              color: !isCalculatorAllowed ? "#ef4444" : showCalculator ? "#facc15" : "#cbd5e1",
              border: !isCalculatorAllowed ? "1px solid rgba(239,68,68,0.3)" : "1px solid rgba(255,255,255,0.15)",
              borderRadius: 10,
              padding: "8px 14px",
              fontSize: 12,
              fontWeight: 800,
              cursor: !isCalculatorAllowed ? "not-allowed" : "pointer",
              display: "inline-flex",
              alignItems: "center",
              gap: 6
            }}
          >
            {!isCalculatorAllowed ? <Ban size={16} /> : <Calculator size={16} />}
            {!isCalculatorAllowed ? "No Calc" : "Calculator"}
          </button>

          {/* Timer */}
          <div style={{ background: "rgba(239,68,68,0.15)", color: "#f87171", border: "1px solid rgba(248,113,113,0.3)", borderRadius: 12, padding: "8px 16px", fontWeight: 900, fontSize: 15, display: "flex", alignItems: "center", gap: 8 }}>
            <Clock size={16} /> {formatTime(timeLeft)}
          </div>
        </div>
      </div>

      {/* ── MAIN EXAM AREA ── */}
      {stageMode === "review" ? (
        /* SECTION REVIEW SCREEN */
        <div style={{ flex: 1, padding: 40, maxWidth: 950, margin: "0 auto", width: "100%" }}>
          <div style={{ background: "rgba(30,41,59,0.8)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 28, padding: 36, boxShadow: "0 20px 50px rgba(0,0,0,0.5)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
              <span style={{ background: "rgba(56,189,248,0.2)", color: "#38bdf8", padding: "6px 16px", borderRadius: 999, fontSize: 12, fontWeight: 900 }}>
                {activeSectionKey.toUpperCase()} SECTION REVIEW &amp; EDIT
              </span>
              <span style={{ fontSize: 13, color: "#facc15", fontWeight: 800 }}>
                Answer Changes Remaining: {maxChanges - (answerChangeCount[activeSectionKey] || 0)} / {maxChanges}
              </span>
            </div>

            <h2 style={{ fontSize: 24, fontWeight: 900, color: "#ffffff", margin: "0 0 16px 0" }}>
              Review Your Answers
            </h2>
            <p style={{ color: "#cbd5e1", fontSize: 14, marginBottom: 28 }}>
              You may review your flagged questions and modify up to {maxChanges} answers before locking this section.
            </p>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 14, marginBottom: 32 }}>
              {sectionQuestionsList.map((q, idx) => {
                const ans = userAnswers[q.id];
                const isFlagged = flaggedQuestions[q.id];
                return (
                  <div
                    key={q.id}
                    onClick={() => {
                      setActiveQuestion(q);
                      setCurrentListIdx(idx);
                    }}
                    style={{
                      background: "rgba(15,23,42,0.8)",
                      border: isFlagged ? "2px solid #facc15" : "1px solid rgba(255,255,255,0.1)",
                      borderRadius: 14,
                      padding: 16,
                      cursor: "pointer"
                    }}
                  >
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, fontWeight: 800, color: "#94a3b8", marginBottom: 6 }}>
                      <span>Q{idx + 1} ({q.questionType})</span>
                      {isFlagged && <span style={{ color: "#facc15" }}>★ FLAGGED</span>}
                    </div>
                    <div style={{ fontSize: 13, color: ans ? "#4ade80" : "#ef4444", fontWeight: 800 }}>
                      {ans ? `Answered: ${typeof ans === "object" ? "Dual Answer" : ans}` : "Unanswered"}
                    </div>
                  </div>
                );
              })}
            </div>

            <button
              onClick={handleAdvanceSection}
              style={{ width: "100%", background: "linear-gradient(135deg, #0284c7, #7c3aed)", color: "#ffffff", border: "none", borderRadius: 16, padding: "16px", fontWeight: 900, fontSize: 16, cursor: "pointer", boxShadow: "0 8px 25px rgba(2,132,199,0.4)" }}
            >
              Lock Section &amp; Proceed
            </button>
          </div>
        </div>
      ) : (
        /* ITEM-LEVEL CAT EXAM AREA */
        <div style={{ display: "grid", gridTemplateColumns: "1fr 340px", flex: 1, minHeight: "calc(100vh - 65px)" }}>

          {/* LEFT COLUMN: QUESTION CONTENT & INTERACTIVE RENDERERS */}
          <div style={{ padding: 32, overflowY: "auto", borderRight: "1px solid rgba(255,255,255,0.1)" }}>

            {/* Micro-Passage / Scenario Box */}
            {activeQuestion?.passageText && (
              <div style={{ background: "rgba(30,41,59,0.75)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 20, padding: 24, marginBottom: 28, maxHeight: 260, overflowY: "auto" }}>
                <div style={{ fontSize: 12, fontWeight: 800, color: "#38bdf8", textTransform: "uppercase", marginBottom: 8 }}>
                  Passage / Stimulus Text
                </div>
                <div style={{ color: "#e2e8f0", fontSize: 14, lineHeight: 1.7, whiteSpace: "pre-line" }}>
                  {activeQuestion.passageText}
                </div>
              </div>
            )}

            {/* Question Header */}
            <div style={{ marginBottom: 28 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                <span style={{ background: "rgba(56,189,248,0.2)", color: "#38bdf8", border: "1px solid rgba(56,189,248,0.3)", padding: "4px 12px", borderRadius: 8, fontSize: 12, fontWeight: 900 }}>
                  CAT QUESTION {sectionQuestionsList.length} ({activeSectionKey.toUpperCase()})
                </span>
                {activeQuestion?.topic && (
                  <span style={{ fontSize: 12, color: "#94a3b8", fontWeight: 700 }}>
                    Topic: {activeQuestion.topic}
                  </span>
                )}
              </div>

              <h3 style={{ fontSize: 18, fontWeight: 800, color: "#ffffff", lineHeight: 1.6, whiteSpace: "pre-line" }}>
                {activeQuestion?.questionText}
              </h3>
            </div>

            {/* TWO-PART ANALYSIS RENDERER */}
            {activeQuestion?.questionType === "TWO_PART_ANALYSIS" ? (
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 36 }}>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 800, color: "#38bdf8", marginBottom: 8 }}>PART A SELECTION</div>
                  {(activeQuestion.options || []).map((opt) => {
                    const isPartA = userAnswers[activeQuestion.id]?.partA === opt;
                    return (
                      <div
                        key={opt}
                        onClick={() => handleSelectOption(activeQuestion.id, { ...(userAnswers[activeQuestion.id] || {}), partA: opt })}
                        style={{ background: isPartA ? "rgba(56,189,248,0.2)" : "rgba(30,41,59,0.6)", border: isPartA ? "2px solid #38bdf8" : "1px solid rgba(255,255,255,0.1)", borderRadius: 12, padding: "12px 16px", marginBottom: 8, cursor: "pointer", fontSize: 14, color: "#ffffff", fontWeight: isPartA ? 800 : 500 }}
                      >
                        {opt}
                      </div>
                    );
                  })}
                </div>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 800, color: "#c084fc", marginBottom: 8 }}>PART B SELECTION</div>
                  {(activeQuestion.options || []).map((opt) => {
                    const isPartB = userAnswers[activeQuestion.id]?.partB === opt;
                    return (
                      <div
                        key={opt}
                        onClick={() => handleSelectOption(activeQuestion.id, { ...(userAnswers[activeQuestion.id] || {}), partB: opt })}
                        style={{ background: isPartB ? "rgba(192,132,252,0.2)" : "rgba(30,41,59,0.6)", border: isPartB ? "2px solid #c084fc" : "1px solid rgba(255,255,255,0.1)", borderRadius: 12, padding: "12px 16px", marginBottom: 8, cursor: "pointer", fontSize: 14, color: "#ffffff", fontWeight: isPartB ? 800 : 500 }}
                      >
                        {opt}
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : (
              /* STANDARD MCQ / DATA SUFFICIENCY OPTIONS */
              <div style={{ display: "flex", flexDirection: "column", gap: 14, marginBottom: 36 }}>
                {(activeQuestion?.options || []).map((opt) => {
                  const isSelected = userAnswers[activeQuestion?.id] === opt;
                  return (
                    <div
                      key={opt}
                      onClick={() => handleSelectOption(activeQuestion.id, opt)}
                      style={{
                        background: isSelected ? "rgba(56,189,248,0.18)" : "rgba(30,41,59,0.6)",
                        border: isSelected ? "2px solid #38bdf8" : "1px solid rgba(255,255,255,0.1)",
                        borderRadius: 16,
                        padding: "16px 20px",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        gap: 14,
                        transition: "all 0.2s ease"
                      }}
                    >
                      <div style={{ width: 22, height: 22, borderRadius: "50%", border: isSelected ? "6px solid #38bdf8" : "2px solid #64748b", background: isSelected ? "#ffffff" : "transparent" }} />
                      <span style={{ fontSize: 15, fontWeight: isSelected ? 800 : 500, color: isSelected ? "#ffffff" : "#cbd5e1" }}>{opt}</span>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Navigation Bar */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "1px solid rgba(255,255,255,0.1)", paddingTop: 24 }}>
              <button
                onClick={() => activeQuestion && toggleFlag(activeQuestion.id)}
                style={{
                  background: activeQuestion && flaggedQuestions[activeQuestion.id] ? "rgba(245,158,11,0.25)" : "rgba(255,255,255,0.08)",
                  color: activeQuestion && flaggedQuestions[activeQuestion.id] ? "#facc15" : "#cbd5e1",
                  border: activeQuestion && flaggedQuestions[activeQuestion.id] ? "1px solid #facc15" : "1px solid rgba(255,255,255,0.15)",
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
                <Bookmark size={16} /> {activeQuestion && flaggedQuestions[activeQuestion.id] ? "Flagged for Review" : "Flag Question"}
              </button>

              <button
                onClick={handleNextCATStep}
                style={{ background: "linear-gradient(135deg, #0284c7, #7c3aed)", color: "#ffffff", border: "none", borderRadius: 12, padding: "12px 28px", fontWeight: 800, fontSize: 14, cursor: "pointer" }}
              >
                Submit Answer &amp; Get Next CAT Question <ChevronRight size={16} style={{ display: "inline", marginLeft: 4 }} />
              </button>
            </div>

          </div>

          {/* RIGHT COLUMN: PALETTE & SECTION PROGRESS */}
          <div style={{ background: "#0f172a", padding: 24, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>

            <div>
              <h3 style={{ fontSize: 15, fontWeight: 900, color: "#ffffff", marginBottom: 16 }}>
                Section Question Trail
              </h3>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 10 }}>
                {sectionQuestionsList.map((q, idx) => {
                  const isAnswered = userAnswers[q.id] !== undefined && userAnswers[q.id] !== "";
                  const isFlagged = flaggedQuestions[q.id];
                  const isCurrent = activeQuestion?.id === q.id;

                  let bg = "rgba(255,255,255,0.06)";
                  let color = "#cbd5e1";
                  let border = "1px solid rgba(255,255,255,0.1)";

                  if (isAnswered && isFlagged) {
                    bg = "#a855f7"; color = "#ffffff";
                  } else if (isAnswered) {
                    bg = "#22c55e"; color = "#ffffff";
                  } else if (isFlagged) {
                    bg = "#facc15"; color = "#0f172a";
                  }

                  if (isCurrent) {
                    border = "2px solid #ffffff";
                  }

                  return (
                    <button
                      key={q.id}
                      onClick={() => {
                        setActiveQuestion(q);
                        setCurrentListIdx(idx);
                      }}
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

            {/* Advance to Section Review */}
            <div style={{ marginTop: 28, paddingTop: 20, borderTop: "1px solid rgba(255,255,255,0.1)" }}>
              <button
                onClick={() => setStageMode("review")}
                style={{ width: "100%", background: "linear-gradient(135deg, #0284c7, #0369a1)", color: "#ffffff", border: "none", borderRadius: 14, padding: "14px", fontWeight: 800, fontSize: 14, cursor: "pointer" }}
              >
                Proceed to Section Review
              </button>
            </div>

          </div>

        </div>
      )}

      {/* ── ON-SCREEN CALCULATOR MODAL (DATA INSIGHTS ONLY) ── */}
      {showCalculator && isCalculatorAllowed && (
        <div style={{ position: "fixed", bottom: 80, right: 360, background: "#0f172a", border: "2px solid #facc15", borderRadius: 20, padding: 20, width: 260, zIndex: 9999, boxShadow: "0 20px 40px rgba(0,0,0,0.6)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
            <span style={{ fontSize: 13, fontWeight: 900, color: "#facc15" }}>DATA INSIGHTS CALCULATOR</span>
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

    </div>
  );
}
