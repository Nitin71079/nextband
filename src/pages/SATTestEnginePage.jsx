import React, { useState, useEffect, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Clock, ShieldCheck, ChevronLeft, ChevronRight, CheckCircle2,
  Bookmark, Award, Zap, AlertCircle, Calculator, FileText, X, Play, RotateCcw, PenTool, Ban, BookOpen
} from "lucide-react";
import { satTests } from "../data/sat/satTests";
import { getSATConfig } from "../config/satConfig";
import {
  scoreSATQuestion, evaluateModuleRouting, calculateSATSectionScore, calculateSATTotalScore
} from "../utils/satScoreCalculator";

export default function SATTestEnginePage() {
  const { testId } = useParams();
  const navigate = useNavigate();

  const testObj = useMemo(() => {
    return satTests.find((t) => t.id === testId) || satTests[0];
  }, [testId]);

  const config = getSATConfig(testObj.testVersion || "SAT_2026_DIGITAL");

  // Workflow Stages: 'rw_m1', 'rw_routing', 'rw_m2', 'break', 'math_m1', 'math_routing', 'math_m2'
  const [currentStage, setCurrentStage] = useState("rw_m1");

  // Multistage Adaptive Routes
  const [rwRoute, setRwRoute] = useState("HIGHER"); // 'HIGHER' or 'LOWER'
  const [mathRoute, setMathRoute] = useState("HIGHER"); // 'HIGHER' or 'LOWER'

  // Question Navigation
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);

  // User State
  const [userAnswers, setUserAnswers] = useState({});
  const [flaggedQuestions, setFlaggedQuestions] = useState({});

  // Embedded Tools State
  const [showDesmos, setShowDesmos] = useState(false);
  const [showReferenceSheet, setShowReferenceSheet] = useState(false);
  const [calcInput, setCalcInput] = useState("");

  // Section/Module Timers
  const moduleDurations = {
    rw_m1: 1920,      // 32 mins
    rw_m2: 1920,      // 32 mins
    break: 600,       // 10 mins
    math_m1: 2100,    // 35 mins
    math_m2: 2100     // 35 mins
  };

  const [timeLeft, setTimeLeft] = useState(moduleDurations[currentStage] || 1920);

  // Derive questions for active stage
  const activeQuestions = useMemo(() => {
    if (currentStage === "rw_m1") return testObj.sections.rw.module1;
    if (currentStage === "rw_m2") return rwRoute === "HIGHER" ? testObj.sections.rw.module2Higher : testObj.sections.rw.module2Lower;
    if (currentStage === "math_m1") return testObj.sections.math.module1;
    if (currentStage === "math_m2") return mathRoute === "HIGHER" ? testObj.sections.math.module2Higher : testObj.sections.math.module2Lower;
    return [];
  }, [currentStage, rwRoute, mathRoute, testObj]);

  const currentQ = activeQuestions[currentQuestionIdx] || activeQuestions[0];

  // Auto-Save Session
  useEffect(() => {
    const saved = localStorage.getItem(`sat_session_${testId}`);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setUserAnswers(parsed.userAnswers || {});
        setFlaggedQuestions(parsed.flaggedQuestions || {});
        setCurrentStage(parsed.currentStage || "rw_m1");
        setRwRoute(parsed.rwRoute || "HIGHER");
        setMathRoute(parsed.mathRoute || "HIGHER");
        setCurrentQuestionIdx(parsed.currentQuestionIdx || 0);
      } catch (err) {
        console.error("SAT session recovery error:", err);
      }
    }
  }, [testId]);

  useEffect(() => {
    localStorage.setItem(
      `sat_session_${testId}`,
      JSON.stringify({ userAnswers, flaggedQuestions, currentStage, rwRoute, mathRoute, currentQuestionIdx })
    );
  }, [userAnswers, flaggedQuestions, currentStage, rwRoute, mathRoute, currentQuestionIdx, testId]);

  // Stage Timer Countdown
  useEffect(() => {
    if (currentStage === "rw_routing" || currentStage === "math_routing") return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          handleAdvanceStage();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [currentStage]);

  const formatTime = (secs) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
  };

  const handleSelectOption = (qId, optionText) => {
    setUserAnswers((prev) => ({ ...prev, [qId]: optionText }));
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

  // Stage Transition & Routing Logic
  const handleAdvanceStage = () => {
    if (currentStage === "rw_m1") {
      const routing = evaluateModuleRouting(testObj.sections.rw.module1, userAnswers);
      setRwRoute(routing.route);
      setCurrentStage("rw_routing");
    } else if (currentStage === "rw_routing") {
      setCurrentStage("rw_m2");
      setCurrentQuestionIdx(0);
      setTimeLeft(moduleDurations.rw_m2);
    } else if (currentStage === "rw_m2") {
      setCurrentStage("break");
      setTimeLeft(moduleDurations.break);
    } else if (currentStage === "break") {
      setCurrentStage("math_m1");
      setCurrentQuestionIdx(0);
      setTimeLeft(moduleDurations.math_m1);
    } else if (currentStage === "math_m1") {
      const routing = evaluateModuleRouting(testObj.sections.math.module1, userAnswers);
      setMathRoute(routing.route);
      setCurrentStage("math_routing");
    } else if (currentStage === "math_routing") {
      setCurrentStage("math_m2");
      setCurrentQuestionIdx(0);
      setTimeLeft(moduleDurations.math_m2);
    } else if (currentStage === "math_m2") {
      handleCompleteSATExam();
    }
  };

  // Submit Official Digital SAT Exam
  const handleCompleteSATExam = () => {
    const rwM1 = testObj.sections.rw.module1;
    const rwM2 = rwRoute === "HIGHER" ? testObj.sections.rw.module2Higher : testObj.sections.rw.module2Lower;
    const mathM1 = testObj.sections.math.module1;
    const mathM2 = mathRoute === "HIGHER" ? testObj.sections.math.module2Higher : testObj.sections.math.module2Lower;

    const rwScore = calculateSATSectionScore(rwM1, rwM2, userAnswers, rwRoute, "rw");
    const mathScore = calculateSATSectionScore(mathM1, mathM2, userAnswers, mathRoute, "math");
    const totalScore = calculateSATTotalScore(rwScore, mathScore);

    const resultId = `sat_res_${Date.now()}`;
    const resultPayload = {
      resultId,
      testId: testObj.id,
      title: testObj.title,
      date: new Date().toISOString(),
      rwRoute,
      mathRoute,
      rwScore,
      mathScore,
      totalScore,
      userAnswers
    };

    localStorage.setItem(`sat_result_${resultId}`, JSON.stringify(resultPayload));
    localStorage.removeItem(`sat_session_${testId}`);
    navigate(`/sat/results/${resultId}`);
  };

  const isMathStage = currentStage === "math_m1" || currentStage === "math_m2";

  return (
    <div style={{ minHeight: "100vh", background: "#080c14", color: "#ffffff", fontFamily: "Inter, sans-serif", display: "flex", flexDirection: "column" }}>

      {/* ── TOP HEADER BAR ── */}
      <div style={{ background: "#0f172a", borderBottom: "1px solid rgba(255,255,255,0.12)", padding: "12px 24px", display: "flex", justifyContent: "space-between", alignItems: "center", position: "sticky", top: 0, zIndex: 999 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <button
            onClick={() => navigate("/sat")}
            style={{ background: "rgba(255,255,255,0.08)", color: "#cbd5e1", border: "1px solid rgba(255,255,255,0.15)", borderRadius: 10, padding: "6px 12px", fontSize: 13, fontWeight: 700, cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 6 }}
          >
            <ChevronLeft size={16} /> Exit Exam
          </button>
          <div>
            <h2 style={{ fontSize: 16, fontWeight: 900, margin: 0, color: "#ffffff" }}>{testObj.title}</h2>
            <div style={{ fontSize: 11, color: "#38bdf8", fontWeight: 800 }}>MULTISTAGE ADAPTIVE DIGITAL SAT 2026</div>
          </div>
        </div>

        {/* Center: Stage Indicator */}
        <div style={{ background: "rgba(56,189,248,0.15)", color: "#38bdf8", border: "1px solid rgba(56,189,248,0.3)", padding: "6px 18px", borderRadius: 999, fontSize: 12, fontWeight: 900, textTransform: "uppercase" }}>
          {currentStage.replace("_", " ").toUpperCase()}
        </div>

        {/* Right Tools & Timer */}
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          {isMathStage && (
            <>
              {/* Desmos Calculator */}
              <button
                onClick={() => setShowDesmos((prev) => !prev)}
                style={{ background: showDesmos ? "rgba(245,158,11,0.25)" : "rgba(255,255,255,0.08)", color: showDesmos ? "#facc15" : "#cbd5e1", border: "1px solid rgba(255,255,255,0.15)", borderRadius: 10, padding: "8px 14px", fontSize: 12, fontWeight: 800, cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 6 }}
              >
                <Calculator size={16} /> Calculator
              </button>

              {/* Reference Sheet Modal Toggle */}
              <button
                onClick={() => setShowReferenceSheet((prev) => !prev)}
                style={{ background: showReferenceSheet ? "rgba(56,189,248,0.25)" : "rgba(255,255,255,0.08)", color: showReferenceSheet ? "#38bdf8" : "#cbd5e1", border: "1px solid rgba(255,255,255,0.15)", borderRadius: 10, padding: "8px 14px", fontSize: 12, fontWeight: 800, cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 6 }}
              >
                <BookOpen size={16} /> Reference Sheet
              </button>
            </>
          )}

          {/* Timer */}
          <div style={{ background: "rgba(239,68,68,0.15)", color: "#f87171", border: "1px solid rgba(248,113,113,0.3)", borderRadius: 12, padding: "8px 16px", fontWeight: 900, fontSize: 15, display: "flex", alignItems: "center", gap: 8 }}>
            <Clock size={16} /> {formatTime(timeLeft)}
          </div>
        </div>
      </div>

      {/* ── INTERMISSION BREAK OR ROUTING SCREEN ── */}
      {currentStage === "break" ? (
        <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 40, textAlign: "center" }}>
          <div style={{ background: "rgba(30,41,59,0.8)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 28, padding: 48, maxWidth: 550, boxShadow: "0 20px 50px rgba(0,0,0,0.5)" }}>
            <span style={{ background: "rgba(56,189,248,0.2)", color: "#38bdf8", padding: "6px 16px", borderRadius: 999, fontSize: 12, fontWeight: 900 }}>
              10-MINUTE INTERMISSION BREAK
            </span>
            <h2 style={{ fontSize: 28, fontWeight: 900, color: "#ffffff", margin: "20px 0 12px 0" }}>
              Reading and Writing Section Complete!
            </h2>
            <p style={{ color: "#cbd5e1", fontSize: 15, lineHeight: 1.6, marginBottom: 28 }}>
              Take a short break. Your Math section timer will begin when the break countdown finishes or when you click Resume below.
            </p>
            <div style={{ fontSize: 48, fontWeight: 900, color: "#38bdf8", marginBottom: 28 }}>
              {formatTime(timeLeft)}
            </div>
            <button
              onClick={handleAdvanceStage}
              style={{ background: "linear-gradient(135deg, #0284c7, #7c3aed)", color: "#ffffff", border: "none", borderRadius: 14, padding: "14px 32px", fontSize: 15, fontWeight: 900, cursor: "pointer", boxShadow: "0 6px 20px rgba(2,132,199,0.4)" }}
            >
              Resume &amp; Start Math Section
            </button>
          </div>
        </div>
      ) : currentStage.includes("routing") ? (
        /* MST ROUTING TRANSITION SCREEN */
        <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 40, textAlign: "center" }}>
          <div style={{ background: "rgba(30,41,59,0.8)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 28, padding: 48, maxWidth: 550, boxShadow: "0 20px 50px rgba(0,0,0,0.5)" }}>
            <Zap size={36} color="#facc15" style={{ marginBottom: 16 }} />
            <h2 style={{ fontSize: 24, fontWeight: 900, color: "#ffffff", margin: "0 0 12px 0" }}>
              Multistage Adaptive Routing Engine Active
            </h2>
            <p style={{ color: "#cbd5e1", fontSize: 15, lineHeight: 1.6, marginBottom: 24 }}>
              Evaluating Module 1 response patterns to generate your targeted <strong>Module 2 Adaptive Form</strong> ({currentStage.startsWith("rw") ? rwRoute : mathRoute} Tier)...
            </p>
            <button
              onClick={handleAdvanceStage}
              style={{ background: "linear-gradient(135deg, #0284c7, #7c3aed)", color: "#ffffff", border: "none", borderRadius: 14, padding: "14px 32px", fontSize: 15, fontWeight: 900, cursor: "pointer" }}
            >
              Proceed to Module 2
            </button>
          </div>
        </div>
      ) : (
        /* MAIN EXAM QUESTION AREA */
        <div style={{ display: "grid", gridTemplateColumns: "1fr 340px", flex: 1, minHeight: "calc(100vh - 65px)" }}>

          {/* LEFT COLUMN: QUESTION & STIMULUS */}
          <div style={{ padding: 32, overflowY: "auto", borderRight: "1px solid rgba(255,255,255,0.1)" }}>

            {/* Stimulus / Micro-Passage (25-150 words) */}
            {currentQ?.passageText && (
              <div style={{ background: "rgba(30,41,59,0.75)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 20, padding: 24, marginBottom: 28 }}>
                <div style={{ fontSize: 12, fontWeight: 800, color: "#38bdf8", textTransform: "uppercase", marginBottom: 8 }}>
                  Passage / Stimulus Text
                </div>
                <div style={{ color: "#e2e8f0", fontSize: 15, lineHeight: 1.7, whiteSpace: "pre-line" }}>
                  {currentQ.passageText}
                </div>
              </div>
            )}

            {/* Question Header */}
            <div style={{ marginBottom: 28 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                <span style={{ background: "rgba(56,189,248,0.2)", color: "#38bdf8", border: "1px solid rgba(56,189,248,0.3)", padding: "4px 12px", borderRadius: 8, fontSize: 12, fontWeight: 900 }}>
                  QUESTION {currentQuestionIdx + 1} OF {activeQuestions.length}
                </span>
                {currentQ?.domain && (
                  <span style={{ fontSize: 12, color: "#94a3b8", fontWeight: 700 }}>
                    Domain: {currentQ.domain}
                  </span>
                )}
              </div>

              <h3 style={{ fontSize: 18, fontWeight: 800, color: "#ffffff", lineHeight: 1.6 }}>
                {currentQ?.questionText}
              </h3>
            </div>

            {/* Input Mode: MCQ vs SPR */}
            {currentQ?.questionType === "SPR" ? (
              <div style={{ marginBottom: 36 }}>
                <div style={{ fontSize: 13, color: "#94a3b8", fontWeight: 700, marginBottom: 8 }}>
                  Enter your numerical answer (integer, fraction like 3/4, or decimal):
                </div>
                <input
                  type="text"
                  value={userAnswers[currentQ.id] || ""}
                  onChange={(e) => handleSelectOption(currentQ.id, e.target.value)}
                  placeholder="e.g. 5, 3/4, 2.5"
                  style={{ width: "100%", maxWidth: 300, background: "#0f172a", border: "2px solid #38bdf8", borderRadius: 14, padding: "14px 18px", color: "#ffffff", fontSize: 18, fontWeight: 900, outline: "none" }}
                />
              </div>
            ) : (
              /* MCQ Options */
              <div style={{ display: "flex", flexDirection: "column", gap: 14, marginBottom: 36 }}>
                {(currentQ?.options || []).map((opt) => {
                  const isSelected = userAnswers[currentQ.id] === opt;
                  return (
                    <div
                      key={opt}
                      onClick={() => handleSelectOption(currentQ.id, opt)}
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

            {/* Navigation & Flag Bar */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "1px solid rgba(255,255,255,0.1)", paddingTop: 24 }}>
              <button
                onClick={() => toggleFlag(currentQ.id)}
                style={{
                  background: flaggedQuestions[currentQ.id] ? "rgba(245,158,11,0.25)" : "rgba(255,255,255,0.08)",
                  color: flaggedQuestions[currentQ.id] ? "#facc15" : "#cbd5e1",
                  border: flaggedQuestions[currentQ.id] ? "1px solid #facc15" : "1px solid rgba(255,255,255,0.15)",
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
                <Bookmark size={16} /> {flaggedQuestions[currentQ.id] ? "Flagged for Review" : "Flag Question"}
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
                  style={{ background: "linear-gradient(135deg, #0284c7, #7c3aed)", color: "#ffffff", border: "none", borderRadius: 12, padding: "12px 24px", fontWeight: 800, fontSize: 13, cursor: currentQuestionIdx === activeQuestions.length - 1 ? "not-allowed" : "pointer" }}
                >
                  Next Question <ChevronRight size={16} style={{ display: "inline", marginLeft: 4 }} />
                </button>
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN: PALETTE & STAGE ADVANCE */}
          <div style={{ background: "#0f172a", padding: 24, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>

            <div>
              <h3 style={{ fontSize: 15, fontWeight: 900, color: "#ffffff", marginBottom: 16 }}>
                Module Question Palette
              </h3>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 10 }}>
                {activeQuestions.map((q, idx) => {
                  const isAnswered = userAnswers[q.id] !== undefined && userAnswers[q.id] !== "";
                  const isFlagged = flaggedQuestions[q.id];
                  const isCurrent = idx === currentQuestionIdx;

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

            {/* Stage Advance Button */}
            <div style={{ marginTop: 28, paddingTop: 20, borderTop: "1px solid rgba(255,255,255,0.1)" }}>
              <button
                onClick={handleAdvanceStage}
                style={{ width: "100%", background: "linear-gradient(135deg, #0284c7, #7c3aed)", color: "#ffffff", border: "none", borderRadius: 14, padding: "14px", fontWeight: 900, fontSize: 14, cursor: "pointer" }}
              >
                Lock Module &amp; Proceed
              </button>
            </div>

          </div>

        </div>
      )}

      {/* ── ON-SCREEN CALCULATOR MODAL ── */}
      {showDesmos && isMathStage && (
        <div style={{ position: "fixed", bottom: 80, right: 360, background: "#0f172a", border: "2px solid #facc15", borderRadius: 20, padding: 20, width: 260, zIndex: 9999, boxShadow: "0 20px 40px rgba(0,0,0,0.6)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
            <span style={{ fontSize: 13, fontWeight: 900, color: "#facc15" }}>EMBEDDED MATH CALCULATOR</span>
            <X size={16} cursor="pointer" onClick={() => setShowDesmos(false)} />
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

      {/* ── OFFICIAL SAT MATH REFERENCE SHEET MODAL ── */}
      {showReferenceSheet && (
        <div style={{ position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)", background: "#0f172a", border: "2px solid #38bdf8", borderRadius: 24, padding: 28, width: "90%", maxWidth: 650, maxHeight: "80vh", overflowY: "auto", zIndex: 99999, boxShadow: "0 25px 60px rgba(0,0,0,0.8)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20, borderBottom: "1px solid rgba(255,255,255,0.1)", paddingBottom: 14 }}>
            <span style={{ fontSize: 16, fontWeight: 900, color: "#38bdf8" }}>OFFICIAL SAT MATH REFERENCE SHEET</span>
            <X size={20} cursor="pointer" onClick={() => setShowReferenceSheet(false)} />
          </div>
          <div style={{ color: "#e2e8f0", fontSize: 13, lineHeight: 1.8, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            <div style={{ background: "rgba(15,23,42,0.8)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 14, padding: 14 }}>
              <div style={{ fontWeight: 800, color: "#ffffff" }}>Area &amp; Circumference</div>
              <div>• Circle Area: A = π r²</div>
              <div>• Circumference: C = 2 π r</div>
              <div>• Rectangle Area: A = l w</div>
              <div>• Triangle Area: A = ½ b h</div>
            </div>
            <div style={{ background: "rgba(15,23,42,0.8)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 14, padding: 14 }}>
              <div style={{ fontWeight: 800, color: "#ffffff" }}>Pythagorean &amp; Triangles</div>
              <div>• Right Triangle: a² + b² = c²</div>
              <div>• Special 30°-60°-90°: x, x√3, 2x</div>
              <div>• Special 45°-45°-90°: x, x, x√2</div>
            </div>
            <div style={{ background: "rgba(15,23,42,0.8)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 14, padding: 14 }}>
              <div style={{ fontWeight: 800, color: "#ffffff" }}>3D Volume Formulas</div>
              <div>• Rectangular Prism: V = l w h</div>
              <div>• Cylinder: V = π r² h</div>
              <div>• Sphere: V = ⁴/₃ π r³</div>
              <div>• Cone: V = ⅓ π r² h</div>
            </div>
            <div style={{ background: "rgba(15,23,42,0.8)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 14, padding: 14 }}>
              <div style={{ fontWeight: 800, color: "#ffffff" }}>Circles &amp; Trigonometry</div>
              <div>• Degrees in a circle: 360°</div>
              <div>• Radians in a circle: 2π</div>
              <div>• Sum of angles in triangle: 180°</div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
