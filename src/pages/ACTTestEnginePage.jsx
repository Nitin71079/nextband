import React, { useState, useEffect, useMemo } from "react";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Clock, ShieldCheck, ChevronLeft, ChevronRight, CheckCircle2,
  Bookmark, Award, Zap, AlertCircle, Calculator, FileText, X, Play, RotateCcw, PenTool, Ban
} from "lucide-react";
import { actTests } from "../data/act/actTests";
import { getACTConfig } from "../config/actConfig";
import {
  scoreACTQuestion, rawToActSectionScore, calculateACTComposite,
  calculateACTStemScore, calculateACTElaScore
} from "../utils/actScoreCalculator";

export default function ACTTestEnginePage() {
  const { testId } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  // Test mode query param: 'core', 'science', 'writing', 'complete'
  const mockMode = searchParams.get("mode") || "complete";

  const testObj = useMemo(() => {
    return actTests.find((t) => t.id === testId) || actTests[0];
  }, [testId]);

  const config = getACTConfig(testObj.testVersion || "ACT_2026_NATIONAL");

  // Determine active section keys based on chosen mode
  const activeSections = useMemo(() => {
    const secs = ["english", "math", "reading"];
    if (mockMode === "science" || mockMode === "complete") secs.push("science");
    if (mockMode === "writing" || mockMode === "complete") secs.push("writing");
    return secs;
  }, [mockMode]);

  const [activeSectionIdx, setActiveSectionIdx] = useState(0);
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);

  // User Response State
  const [userAnswers, setUserAnswers] = useState({});
  const [flaggedQuestions, setFlaggedQuestions] = useState({});
  const [userEssayText, setUserEssayText] = useState("");

  // Tools State
  const [showCalculator, setShowCalculator] = useState(false);
  const [showScratchpad, setShowScratchpad] = useState(false);
  const [scratchText, setScratchText] = useState("");
  const [calcInput, setCalcInput] = useState("");

  const activeSectionKey = activeSections[activeSectionIdx] || "english";
  const isWritingSection = activeSectionKey === "writing";

  // Section Timers
  const sectionDurations = {
    english: 2100,
    math: 3000,
    reading: 2400,
    science: 2400,
    writing: 2400
  };

  const [sectionTimeLeft, setSectionTimeLeft] = useState(sectionDurations[activeSectionKey] || 2100);

  const activeQuestions = isWritingSection
    ? []
    : testObj.sections[activeSectionKey]?.questions || [];
  const currentQ = activeQuestions[currentQuestionIdx] || activeQuestions[0];
  const writingPrompt = testObj.sections.writing?.prompt;

  // Auto-Save / Session Recovery
  useEffect(() => {
    const saved = localStorage.getItem(`act_session_${testId}`);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setUserAnswers(parsed.userAnswers || {});
        setFlaggedQuestions(parsed.flaggedQuestions || {});
        setUserEssayText(parsed.userEssayText || "");
        setActiveSectionIdx(parsed.activeSectionIdx || 0);
        setCurrentQuestionIdx(parsed.currentQuestionIdx || 0);
      } catch (err) {
        console.error("ACT session recovery error:", err);
      }
    }
  }, [testId]);

  useEffect(() => {
    localStorage.setItem(
      `act_session_${testId}`,
      JSON.stringify({ userAnswers, flaggedQuestions, userEssayText, activeSectionIdx, currentQuestionIdx })
    );
  }, [userAnswers, flaggedQuestions, userEssayText, activeSectionIdx, currentQuestionIdx, testId]);

  // Section Timer Countdown
  useEffect(() => {
    const timer = setInterval(() => {
      setSectionTimeLeft((prev) => {
        if (prev <= 1) {
          if (activeSectionIdx < activeSections.length - 1) {
            const nextIdx = activeSectionIdx + 1;
            setActiveSectionIdx(nextIdx);
            setCurrentQuestionIdx(0);
            return sectionDurations[activeSections[nextIdx]] || 2100;
          } else {
            handleCompleteACTExam();
            return 0;
          }
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [activeSectionIdx, activeSections]);

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

  // Complete ACT Exam
  const handleCompleteACTExam = () => {
    let engRaw = 0, mathRaw = 0, readRaw = 0, sciRaw = 0;

    (testObj.sections.english?.questions || []).forEach((q) => {
      if (scoreACTQuestion(q, userAnswers[q.id])) engRaw++;
    });
    (testObj.sections.math?.questions || []).forEach((q) => {
      if (scoreACTQuestion(q, userAnswers[q.id])) mathRaw++;
    });
    (testObj.sections.reading?.questions || []).forEach((q) => {
      if (scoreACTQuestion(q, userAnswers[q.id])) readRaw++;
    });
    if (activeSections.includes("science")) {
      (testObj.sections.science?.questions || []).forEach((q) => {
        if (scoreACTQuestion(q, userAnswers[q.id])) sciRaw++;
      });
    }

    const englishScore = rawToActSectionScore(engRaw, "english");
    const mathScore = rawToActSectionScore(mathRaw, "math");
    const readingScore = rawToActSectionScore(readRaw, "reading");
    const scienceScore = activeSections.includes("science") ? rawToActSectionScore(sciRaw, "science") : null;

    const compositeScore = calculateACTComposite(englishScore, mathScore, readingScore);
    const stemScore = scienceScore ? calculateACTStemScore(mathScore, scienceScore) : null;
    const elaScore = activeSections.includes("writing") ? calculateACTElaScore(englishScore, readingScore, 8) : null;

    const resultId = `act_res_${Date.now()}`;
    const resultPayload = {
      resultId,
      testId: testObj.id,
      title: testObj.title,
      mockMode,
      date: new Date().toISOString(),
      rawScores: { engRaw, mathRaw, readRaw, sciRaw },
      sectionScores: { englishScore, mathScore, readingScore, scienceScore },
      compositeScore,
      stemScore,
      elaScore,
      userEssayText
    };

    localStorage.setItem(`act_result_${resultId}`, JSON.stringify(resultPayload));
    localStorage.removeItem(`act_session_${testId}`);
    navigate(`/act/results/${resultId}`);
  };

  const isCalculatorAllowed = activeSectionKey === "math";

  return (
    <div style={{ minHeight: "100vh", background: "#080c14", color: "#ffffff", fontFamily: "Inter, sans-serif", display: "flex", flexDirection: "column" }}>

      {/* ── TOP HEADER BAR ── */}
      <div style={{ background: "#0f172a", borderBottom: "1px solid rgba(255,255,255,0.12)", padding: "12px 24px", display: "flex", justifyContent: "space-between", alignItems: "center", position: "sticky", top: 0, zIndex: 999 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <button
            onClick={() => navigate("/act")}
            style={{ background: "rgba(255,255,255,0.08)", color: "#cbd5e1", border: "1px solid rgba(255,255,255,0.15)", borderRadius: 10, padding: "6px 12px", fontSize: 13, fontWeight: 700, cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 6 }}
          >
            <ChevronLeft size={16} /> Exit Exam
          </button>
          <div>
            <h2 style={{ fontSize: 16, fontWeight: 900, margin: 0, color: "#ffffff" }}>{testObj.title}</h2>
            <div style={{ fontSize: 11, color: "#38bdf8", fontWeight: 800 }}>OFFICIAL ACT 2026 SIMULATION</div>
          </div>
        </div>

        {/* Center: Section Indicator Tabs */}
        <div style={{ display: "flex", gap: 8 }}>
          {activeSections.map((secKey, idx) => {
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
          {/* On-Screen Calculator (Disabled in Science) */}
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
            {activeSectionKey === "science" ? "No Calc (Science)" : "Calculator"}
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

          {isWritingSection ? (
            /* WRITING SECTION ESSAY PROMPT */
            <div>
              <div style={{ background: "rgba(30,41,59,0.75)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 20, padding: 24, marginBottom: 28 }}>
                <span style={{ background: "rgba(56,189,248,0.2)", color: "#38bdf8", border: "1px solid rgba(56,189,248,0.3)", padding: "4px 12px", borderRadius: 8, fontSize: 12, fontWeight: 900 }}>
                  SECTION 5: OPTIONAL ACT WRITING PROMPT (40 MINS)
                </span>
                <h3 style={{ fontSize: 18, fontWeight: 900, color: "#ffffff", margin: "14px 0 8px 0" }}>
                  {writingPrompt?.title}
                </h3>
                <p style={{ color: "#cbd5e1", fontSize: 14, lineHeight: 1.7 }}>
                  {writingPrompt?.promptText}
                </p>

                <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 16 }}>
                  {(writingPrompt?.perspectives || []).map((p, idx) => (
                    <div key={idx} style={{ background: "rgba(15,23,42,0.8)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 12, padding: 12, fontSize: 13, color: "#f3f4f6" }}>
                      {p}
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8, fontSize: 12, color: "#94a3b8", fontWeight: 700 }}>
                  <span>Write your essay response below:</span>
                  <span>Word Count: <strong>{userEssayText.trim() ? userEssayText.trim().split(/\s+/).length : 0} words</strong></span>
                </div>
                <textarea
                  value={userEssayText}
                  onChange={(e) => setUserEssayText(e.target.value)}
                  placeholder="Type your ACT essay here. Develop your position and analyze provided perspectives..."
                  style={{ width: "100%", height: 350, background: "#0f172a", border: "2px solid #38bdf8", borderRadius: 16, padding: 18, color: "#ffffff", fontSize: 15, lineHeight: 1.7, outline: "none", resize: "vertical" }}
                />
              </div>
            </div>
          ) : (
            /* MULTIPLE CHOICE SECTIONS */
            <div>
              {/* Passage / Scenario Box */}
              {(currentQ?.passageText || currentQ?.scenarioText) && (
                <div style={{ background: "rgba(30,41,59,0.75)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 20, padding: 24, marginBottom: 28, maxHeight: 300, overflowY: "auto" }}>
                  <div style={{ fontSize: 12, fontWeight: 800, color: "#38bdf8", textTransform: "uppercase", marginBottom: 8 }}>
                    {currentQ.passageTitle || currentQ.scenarioTitle || "Passage / Scenario Text"}
                  </div>
                  <div style={{ color: "#e2e8f0", fontSize: 14, lineHeight: 1.7, whiteSpace: "pre-line" }}>
                    {currentQ.passageText || currentQ.scenarioText}
                  </div>
                </div>
              )}

              {/* Question Prompt */}
              <div style={{ marginBottom: 28 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                  <span style={{ background: "rgba(56,189,248,0.2)", color: "#38bdf8", border: "1px solid rgba(56,189,248,0.3)", padding: "4px 12px", borderRadius: 8, fontSize: 12, fontWeight: 900 }}>
                    QUESTION {currentQuestionIdx + 1} OF {activeQuestions.length} ({activeSectionKey.toUpperCase()})
                  </span>
                  {currentQ?.category && (
                    <span style={{ fontSize: 12, color: "#94a3b8", fontWeight: 700 }}>
                      Category: {currentQ.category}
                    </span>
                  )}
                </div>

                <h3 style={{ fontSize: 18, fontWeight: 800, color: "#ffffff", lineHeight: 1.6 }}>
                  {currentQ?.questionText}
                </h3>
              </div>

              {/* Answer Options */}
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
          )}

        </div>

        {/* RIGHT COLUMN: QUESTION PALETTE & SECTION ADVANCE */}
        <div style={{ background: "#0f172a", padding: 24, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>

          <div>
            <h3 style={{ fontSize: 16, fontWeight: 900, color: "#ffffff", marginBottom: 16 }}>
              {activeSectionKey.toUpperCase()} Palette
            </h3>

            {!isWritingSection && (
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
            )}
          </div>

          {/* Submit / Advance Section Button */}
          <div style={{ marginTop: 28, paddingTop: 20, borderTop: "1px solid rgba(255,255,255,0.1)" }}>
            {activeSectionIdx < activeSections.length - 1 ? (
              <button
                onClick={() => {
                  const nextIdx = activeSectionIdx + 1;
                  setActiveSectionIdx(nextIdx);
                  setCurrentQuestionIdx(0);
                  setSectionTimeLeft(sectionDurations[activeSections[nextIdx]]);
                }}
                style={{ width: "100%", background: "linear-gradient(135deg, #0284c7, #0369a1)", color: "#ffffff", border: "none", borderRadius: 14, padding: "14px", fontWeight: 800, fontSize: 14, cursor: "pointer" }}
              >
                Lock Section &amp; Proceed to {activeSections[activeSectionIdx + 1].toUpperCase()}
              </button>
            ) : (
              <button
                onClick={handleCompleteACTExam}
                style={{ width: "100%", background: "linear-gradient(135deg, #22c55e, #15803d)", color: "#ffffff", border: "none", borderRadius: 14, padding: "14px", fontWeight: 900, fontSize: 15, cursor: "pointer", boxShadow: "0 6px 20px rgba(34,197,94,0.4)" }}
              >
                Submit Official ACT Exam
              </button>
            )}
          </div>

        </div>

      </div>

      {/* ── ON-SCREEN CALCULATOR MODAL ── */}
      {showCalculator && isCalculatorAllowed && (
        <div style={{ position: "fixed", bottom: 80, right: 360, background: "#0f172a", border: "2px solid #facc15", borderRadius: 20, padding: 20, width: 260, zIndex: 9999, boxShadow: "0 20px 40px rgba(0,0,0,0.6)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
            <span style={{ fontSize: 13, fontWeight: 900, color: "#facc15" }}>ACT MATH CALCULATOR</span>
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
