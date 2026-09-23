import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles, Clock, Calculator, Bookmark, CheckCircle2,
  AlertCircle, ArrowRight, ArrowLeft, PenTool, Zap, BookOpen, Layers, CheckSquare, Square,
  Grid, X
} from "lucide-react";
import toast from "react-hot-toast";
import { greTests } from "../data/gre/greTests";
import {
  rawToGreScaledScore, determineSection2Module, evaluateQuantComparison,
  evaluateNumericEntry, evaluateTextCompletion, evaluateSentenceEquivalence, evaluateSelectInPassage,
  evaluateMcqSingle, evaluateMcqMultiple
} from "../utils/greScoreCalculator";
import { evaluateGREAnalyticalWritingAI } from "../services/evaluateGREGPT";

export default function GRETestEnginePage() {
  const { testId } = useParams();
  const navigate = useNavigate();

  const testData = greTests.find((t) => t.id === testId) || greTests[0];

  // Section Sequence: aw | v1 | q1 | v2 | q2 | evaluating
  // Supports flexible V/Q ordering if configured
  const sectionSequence = testData.sectionOrder || ["aw", "v1", "q1", "v2", "q2"];
  const [sectionIndex, setSectionIndex] = useState(0);
  const currentSection = sectionSequence[sectionIndex] || "aw";

  const [currentQIndex, setCurrentQIndex] = useState(0);

  // Section Duration Configs (Seconds)
  const getSectionDuration = (sec) => {
    switch (sec) {
      case "aw": return 30 * 60; // 30 minutes
      case "v1": return 18 * 60; // 18 minutes (12 Q)
      case "v2": return 23 * 60; // 23 minutes (15 Q)
      case "q1": return 21 * 60; // 21 minutes (12 Q)
      case "q2": return 26 * 60; // 26 minutes (15 Q)
      default: return 20 * 60;
    }
  };

  // Timestamp-based Timer Persistence
  const [sectionStartTime, setSectionStartTime] = useState(Date.now());
  const [sectionTimeLeft, setSectionTimeLeft] = useState(getSectionDuration("aw"));

  // Student Answers & Marked Questions State
  const [answers, setAnswers] = useState({});
  const [essayText, setEssayText] = useState("");
  const [markedQuestions, setMarkedQuestions] = useState({}); // { sectionKey-idx: boolean }

  // Adaptive Module Routing State
  const [verbal2ModuleType, setVerbal2ModuleType] = useState("medium");
  const [quant2ModuleType, setQuant2ModuleType] = useState("medium");

  // Calculator & Review Grid Modals State
  const [showCalculator, setShowCalculator] = useState(false);
  const [calcDisplay, setCalcDisplay] = useState("0");
  const [showReviewGrid, setShowReviewGrid] = useState(false);
  const [showExitModal, setShowExitModal] = useState(false);

  // CRITICAL SCROLL RESET: Scroll to top whenever question or section changes
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    const container = document.querySelector(".gre-exam-container");
    if (container) container.scrollTop = 0;
  }, [currentQIndex, currentSection]);

  // Initialize section start timestamp when section changes
  useEffect(() => {
    setSectionStartTime(Date.now());
    setSectionTimeLeft(getSectionDuration(currentSection));
  }, [currentSection]);

  // Section Timer Tick Effect (robust against tab changes / rerenders)
  useEffect(() => {
    if (currentSection === "evaluating") return;

    const timer = setInterval(() => {
      const elapsed = Math.floor((Date.now() - sectionStartTime) / 1000);
      const allotted = getSectionDuration(currentSection);
      const remaining = Math.max(0, allotted - elapsed);

      setSectionTimeLeft(remaining);

      if (remaining <= 0) {
        clearInterval(timer);
        toast.error(`Time expired for ${getSectionTitle(currentSection)}. Auto-advancing section.`);
        autoAdvanceSection();
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [currentSection, sectionStartTime]);

  function getSectionTitle(sec) {
    switch (sec) {
      case "aw": return "Section 1: Analytical Writing (Analyze an Issue)";
      case "v1": return "Section 2: Verbal Reasoning 1 (Baseline)";
      case "q1": return "Section 3: Quantitative Reasoning 1 (Baseline)";
      case "v2": return `Section 4: Verbal Reasoning 2 (${verbal2ModuleType.toUpperCase()} Module)`;
      case "q2": return `Section 5: Quantitative Reasoning 2 (${quant2ModuleType.toUpperCase()} Module)`;
      default: return "GRE Section";
    }
  }

  function autoAdvanceSection() {
    if (currentSection === "aw") {
      advanceToNextSection("v1");
    } else if (currentSection === "v1") {
      const v1Correct = evaluateSectionAnswers("v1");
      const v2Mod = determineSection2Module(v1Correct, 12);
      setVerbal2ModuleType(v2Mod);
      advanceToNextSection("q1");
    } else if (currentSection === "q1") {
      const q1Correct = evaluateSectionAnswers("q1");
      const q2Mod = determineSection2Module(q1Correct, 12);
      setQuant2ModuleType(q2Mod);
      advanceToNextSection("v2");
    } else if (currentSection === "v2") {
      advanceToNextSection("q2");
    } else if (currentSection === "q2") {
      finishAndEvaluateExam();
    }
  }

  function advanceToNextSection(nextSecKey) {
    const nextIdx = sectionSequence.indexOf(nextSecKey);
    if (nextIdx !== -1) {
      setSectionIndex(nextIdx);
      setCurrentQIndex(0);
    } else {
      finishAndEvaluateExam();
    }
  }

  function evaluateSectionAnswers(secKey) {
    let count = 0;
    let qList = [];
    if (secKey === "v1") qList = testData.sections.verbal1.questions || [];
    else if (secKey === "q1") qList = testData.sections.quant1.questions || [];
    else if (secKey === "v2") qList = (testData.sections.verbal2 && testData.sections.verbal2.adaptiveModules[verbal2ModuleType]) || [];
    else if (secKey === "q2") qList = (testData.sections.quant2 && testData.sections.quant2.adaptiveModules[quant2ModuleType]) || [];

    qList.forEach(q => {
      const ans = answers[q.id];
      if (ans === undefined || ans === null || ans === "") return;

      if (q.type === "quant_comparison") {
        if (evaluateQuantComparison(ans, q.correctAnswer)) count++;
      } else if (q.type === "mcq_single" || q.type === "reading_comp_single" || q.type === "text_completion_1") {
        if (evaluateMcqSingle(ans, q.correctAnswer)) count++;
      } else if (q.type === "text_completion_2" || q.type === "text_completion_3") {
        if (evaluateTextCompletion(ans, q.correctAnswers)) count++;
      } else if (q.type === "sentence_equivalence") {
        if (evaluateSentenceEquivalence(ans, q.correctPair || q.correctAnswers)) count++;
      } else if (q.type === "numeric_entry") {
        if (evaluateNumericEntry(ans, q.correctAnswer, q.acceptedVariants)) count++;
      } else if (q.type === "mcq_multiple" || q.type === "reading_comp_multiple") {
        if (evaluateMcqMultiple(ans, q.correctAnswers || q.correctAnswer)) count++;
      } else if (q.type === "reading_comp_select_passage") {
        if (evaluateSelectInPassage(ans, q.correctSentenceIndex)) count++;
      }
    });

    return count;
  }

  // On-Screen Calculator Logic
  function handleCalcInput(val) {
    if (val === "C") {
      setCalcDisplay("0");
    } else if (val === "=") {
      try {
        const cleanExpr = calcDisplay.replace(/sqrt\(([^)]+)\)/g, "Math.sqrt($1)");
        const res = new Function(`"use strict"; return (${cleanExpr})`)();
        setCalcDisplay(String(res));
      } catch (e) {
        setCalcDisplay("Error");
      }
    } else if (val === "sqrt") {
      setCalcDisplay(`sqrt(${calcDisplay})`);
    } else {
      setCalcDisplay(calcDisplay === "0" ? String(val) : calcDisplay + val);
    }
  }

  // Active Questions List for Current Section
  function getActiveQuestionList() {
    if (currentSection === "v1") return testData.sections.verbal1.questions || [];
    if (currentSection === "q1") return testData.sections.quant1.questions || [];
    if (currentSection === "v2") {
      return (testData.sections.verbal2 && testData.sections.verbal2.adaptiveModules[verbal2ModuleType]) || [];
    }
    if (currentSection === "q2") {
      return (testData.sections.quant2 && testData.sections.quant2.adaptiveModules[quant2ModuleType]) || [];
    }
    return [];
  }

  const activeQuestions = getActiveQuestionList();
  const currentQ = activeQuestions[currentQIndex];

  async function finishAndEvaluateExam() {
    setSectionIndex(-1); // Set evaluating screen
    toast.loading("🤖 Evaluating Knarrow GRE Practice Test...", { id: "gre-eval" });

    const v1Correct = evaluateSectionAnswers("v1");
    const q1Correct = evaluateSectionAnswers("q1");
    const v2Correct = evaluateSectionAnswers("v2");
    const q2Correct = evaluateSectionAnswers("q2");

    const verbalScore = rawToGreScaledScore(v1Correct, v2Correct, verbal2ModuleType);
    const quantScore = rawToGreScaledScore(q1Correct, q2Correct, quant2ModuleType);

    // AI Essay Evaluation
    const awEval = await evaluateGREAnalyticalWritingAI({
      promptText: testData.sections.analyticalWriting.promptText,
      userEssay: essayText
    });

    const resultObj = {
      testId,
      date: new Date().toISOString(),
      verbalScore,
      quantScore,
      analyticalWritingScore: awEval.score || 4.0,
      v1Correct,
      v2Correct,
      q1Correct,
      q2Correct,
      verbal2ModuleType,
      quant2ModuleType,
      awFeedback: awEval
    };

    toast.dismiss("gre-eval");
    toast.success("✨ Practice Evaluation Complete!");
    localStorage.setItem(`gre_result_${testId}`, JSON.stringify(resultObj));
    navigate(`/gre/results/${testId}`);
  }

  const formatTimer = (secs) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  // Helper for Sentence Equivalence (exactly 2 choices limit) & MCQ Multiple
  function toggleMultiChoice(qId, opt, maxAllowed = null) {
    const existing = answers[qId] || [];
    if (existing.includes(opt)) {
      setAnswers({ ...answers, [qId]: existing.filter(x => x !== opt) });
    } else {
      if (maxAllowed && existing.length >= maxAllowed) {
        toast.error(`Sentence Equivalence requires selecting exactly ${maxAllowed} choices. Deselect one first.`);
        return;
      }
      setAnswers({ ...answers, [qId]: [...existing, opt] });
    }
  }

  // Helper for Text Completion 2 & 3 Blanks
  function handleBlankChoice(qId, blankKey, optionVal) {
    const existing = answers[qId] || {};
    setAnswers({ ...answers, [qId]: { ...existing, [blankKey]: optionVal } });
  }

  if (sectionIndex === -1) {
    return (
      <div style={{ minHeight: "100vh", background: "#0f172a", color: "#ffffff", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 24, textAlign: "center" }}>
        <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 2, ease: "linear" }} style={{ marginBottom: 24 }}>
          <Sparkles size={56} color="#facc15" />
        </motion.div>
        <h1 style={{ fontSize: "28px", fontWeight: 900, marginBottom: 12 }}>Evaluating Knarrow GRE General Practice Mocks</h1>
        <p style={{ color: "#94a3b8", fontSize: 16, maxWidth: 540 }}>
          Calculating Section-Level Adaptive scores on 130–170 scaled metrics &amp; evaluating Analytical Writing response...
        </p>
      </div>
    );
  }

  return (
    <div className="gre-exam-container" style={{ minHeight: "100vh", background: "#0f172a", color: "#ffffff", fontFamily: "Inter, sans-serif", display: "flex", flexDirection: "column" }}>

      {/* ── TOP ENGINE HEADER ── */}
      <header style={{ height: 64, background: "#1e293b", borderBottom: "1px solid rgba(255,255,255,0.1)", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 24px", sticky: "top", top: 0, zIndex: 50 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <span style={{ background: "#d97706", color: "#ffffff", padding: "4px 12px", borderRadius: 8, fontSize: 12, fontWeight: 900 }}>
            KNARROW GRE PRACTICE
          </span>
          <span style={{ fontSize: 14, fontWeight: 700, color: "#cbd5e1" }}>
            {getSectionTitle(currentSection)}
          </span>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <span style={{ fontSize: 14, color: "#facc15", fontWeight: 800, display: "inline-flex", alignItems: "center", gap: 6 }}>
            <Clock size={16} /> Timer: {formatTimer(sectionTimeLeft)}
          </span>

          {currentSection !== "aw" && (
            <button
              onClick={() => setShowReviewGrid(!showReviewGrid)}
              style={{ background: "rgba(250,204,21,0.15)", color: "#facc15", border: "1px solid rgba(250,204,21,0.3)", borderRadius: 10, padding: "6px 14px", fontSize: 13, fontWeight: 800, cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 6 }}
            >
              <Grid size={15} /> Review Section ({activeQuestions.filter((q, i) => answers[q.id]).length}/{activeQuestions.length})
            </button>
          )}

          {(currentSection === "q1" || currentSection === "q2") && (
            <button
              onClick={() => setShowCalculator(!showCalculator)}
              style={{ background: "rgba(56,189,248,0.2)", color: "#38bdf8", border: "1px solid rgba(56,189,248,0.3)", borderRadius: 10, padding: "6px 14px", fontSize: 13, fontWeight: 800, cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 6 }}
            >
              <Calculator size={15} /> Calculator
            </button>
          )}

          <button
            onClick={() => setShowExitModal(true)}
            style={{ background: "rgba(239,68,68,0.15)", color: "#f87171", border: "1px solid rgba(239,68,68,0.3)", borderRadius: 10, padding: "6px 14px", fontSize: 13, fontWeight: 700, cursor: "pointer" }}
          >
            Exit Exam
          </button>
        </div>
      </header>

      {/* ── ON-SCREEN CALCULATOR MODAL ── */}
      {showCalculator && (
        <div style={{ position: "fixed", top: 80, right: 30, zIndex: 100, background: "#1e293b", border: "2px solid #38bdf8", borderRadius: 18, padding: 18, width: 260, boxShadow: "0 10px 30px rgba(0,0,0,0.5)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
            <span style={{ fontSize: 12, fontWeight: 800, color: "#38bdf8" }}>GRE QUANT CALCULATOR</span>
            <button onClick={() => setShowCalculator(false)} style={{ background: "none", border: "none", color: "#94a3b8", cursor: "pointer", fontWeight: 800 }}>✕</button>
          </div>
          <div style={{ background: "#0f172a", padding: "12px", borderRadius: 10, textAlign: "right", fontSize: 20, fontWeight: 900, color: "#ffffff", marginBottom: 12, minHeight: 45 }}>
            {calcDisplay}
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 8 }}>
            {["C", "(", ")", "/", "7", "8", "9", "*", "4", "5", "6", "-", "1", "2", "3", "+", "0", ".", "sqrt", "="].map((btn) => (
              <button
                key={btn}
                onClick={() => handleCalcInput(btn)}
                style={{ background: btn === "=" ? "#38bdf8" : "rgba(255,255,255,0.08)", color: btn === "=" ? "#0f172a" : "#ffffff", border: "none", borderRadius: 8, padding: 10, fontSize: 14, fontWeight: 800, cursor: "pointer" }}
              >
                {btn}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* ── SECTION REVIEW GRID MODAL ── */}
      {showReviewGrid && (
        <div style={{ position: "fixed", inset: 0, zIndex: 110, background: "rgba(15,23,42,0.85)", backdropFilter: "blur(8px)", display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
          <div style={{ background: "#1e293b", border: "1px solid rgba(255,255,255,0.15)", borderRadius: 24, padding: 32, maxWidth: 640, width: "100%" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
              <h3 style={{ fontSize: 20, fontWeight: 900, color: "#facc15" }}>Section Review &amp; Navigation</h3>
              <button onClick={() => setShowReviewGrid(false)} style={{ background: "none", border: "none", color: "#94a3b8", cursor: "pointer" }}>
                <X size={20} />
              </button>
            </div>
            <p style={{ fontSize: 14, color: "#cbd5e1", marginBottom: 20 }}>
              Click any question number below to jump directly to it within the current section.
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 12, marginBottom: 24 }}>
              {activeQuestions.map((q, idx) => {
                const isAnswered = Boolean(answers[q.id]);
                const isMarked = Boolean(markedQuestions[`${currentSection}-${idx}`]);
                const isCurrent = idx === currentQIndex;

                return (
                  <button
                    key={q.id || idx}
                    onClick={() => {
                      setCurrentQIndex(idx);
                      setShowReviewGrid(false);
                    }}
                    style={{
                      background: isCurrent ? "#d97706" : isAnswered ? "rgba(16,185,129,0.2)" : "rgba(255,255,255,0.05)",
                      border: isCurrent ? "2px solid #facc15" : isMarked ? "2px solid #facc15" : "1px solid rgba(255,255,255,0.1)",
                      color: "#ffffff",
                      borderRadius: 12,
                      padding: 12,
                      fontSize: 14,
                      fontWeight: 800,
                      cursor: "pointer",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: 4
                    }}
                  >
                    <span>Q{idx + 1}</span>
                    <span style={{ fontSize: 10, color: isMarked ? "#facc15" : isAnswered ? "#10b981" : "#94a3b8" }}>
                      {isMarked ? "★ Marked" : isAnswered ? "✓ Done" : "Empty"}
                    </span>
                  </button>
                );
              })}
            </div>
            <button
              onClick={() => setShowReviewGrid(false)}
              style={{ width: "100%", background: "rgba(255,255,255,0.08)", color: "#ffffff", border: "none", borderRadius: 12, padding: 12, fontWeight: 800, cursor: "pointer" }}
            >
              Return to Current Question
            </button>
          </div>
        </div>
      )}

      {/* ── EXIT CONFIRMATION MODAL ── */}
      {showExitModal && (
        <div style={{ position: "fixed", inset: 0, zIndex: 120, background: "rgba(15,23,42,0.85)", backdropFilter: "blur(8px)", display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
          <div style={{ background: "#1e293b", border: "1px solid rgba(255,255,255,0.15)", borderRadius: 24, padding: 32, maxWidth: 460, width: "100%", textAlign: "center" }}>
            <AlertCircle size={48} color="#f87171" style={{ margin: "0 auto 16px" }} />
            <h3 style={{ fontSize: 22, fontWeight: 900, marginBottom: 12 }}>Exit GRE Practice Test?</h3>
            <p style={{ color: "#94a3b8", fontSize: 14, lineHeight: 1.6, marginBottom: 24 }}>
              Your current session progress will not be submitted for scoring. Are you sure you want to leave?
            </p>
            <div style={{ display: "flex", gap: 12 }}>
              <button
                onClick={() => setShowExitModal(false)}
                style={{ flex: 1, background: "rgba(255,255,255,0.08)", color: "#ffffff", border: "none", borderRadius: 12, padding: 12, fontWeight: 800, cursor: "pointer" }}
              >
                Resume Test
              </button>
              <button
                onClick={() => navigate("/gre")}
                style={{ flex: 1, background: "#ef4444", color: "#ffffff", border: "none", borderRadius: 12, padding: 12, fontWeight: 800, cursor: "pointer" }}
              >
                Confirm Exit
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── MAIN EXAM CONTENT AREA ── */}
      <main style={{ flex: 1, maxWidth: 1000, width: "100%", margin: "0 auto", padding: "32px 24px 80px" }}>

        {/* SECTION 1: ANALYTICAL WRITING (ANALYZE AN ISSUE) */}
        {currentSection === "aw" && (
          <div style={{ background: "rgba(30,41,59,0.8)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 24, padding: 32 }}>
            <span style={{ background: "rgba(236,72,153,0.15)", color: "#ec4899", padding: "4px 12px", borderRadius: 8, fontSize: 12, fontWeight: 800 }}>
              SECTION 1: ANALYTICAL WRITING (ANALYZE AN ISSUE)
            </span>
            <h2 style={{ fontSize: 22, fontWeight: 900, margin: "16px 0 12px" }}>Analyze an Issue Task (30 Minutes)</h2>
            <p style={{ color: "#ffffff", fontSize: 16, lineHeight: 1.6, background: "#0f172a", padding: 24, borderRadius: 16, marginBottom: 24 }}>
              {testData.sections.analyticalWriting.promptText}
            </p>

            <textarea
              rows={14}
              value={essayText}
              onChange={(e) => setEssayText(e.target.value)}
              placeholder="Type your Analyze an Issue response here..."
              spellCheck={false}
              style={{ width: "100%", background: "#0f172a", border: "1px solid #d97706", borderRadius: 14, padding: 20, color: "#ffffff", fontSize: 15, lineHeight: 1.6, outline: "none", marginBottom: 14, fontFamily: "inherit" }}
            />
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontSize: 13, color: "#94a3b8" }}>
                Word Count: <strong>{essayText.trim().split(/\s+/).filter(Boolean).length} words</strong>
              </span>
              <button
                onClick={autoAdvanceSection}
                style={{ background: "linear-gradient(135deg, #d97706, #b45309)", color: "#ffffff", border: "none", borderRadius: 14, padding: "12px 24px", fontSize: 14, fontWeight: 800, cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 8 }}
              >
                Submit Section 1 &amp; Continue <ArrowRight size={16} />
              </button>
            </div>
          </div>
        )}

        {/* SECTIONS 2-5: VERBAL & QUANT QUESTION RENDERERS */}
        {currentSection !== "aw" && currentQ && (
          <div style={{ background: "rgba(30,41,59,0.8)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 24, padding: 32 }}>
            
            {/* Header Toolbar */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
              <span style={{ fontSize: 13, fontWeight: 800, color: "#facc15" }}>
                Question {currentQIndex + 1} of {activeQuestions.length}
              </span>
              <button
                onClick={() => setMarkedQuestions({ ...markedQuestions, [`${currentSection}-${currentQIndex}`]: !markedQuestions[`${currentSection}-${currentQIndex}`] })}
                style={{ background: markedQuestions[`${currentSection}-${currentQIndex}`] ? "rgba(245,158,11,0.3)" : "rgba(255,255,255,0.08)", color: markedQuestions[`${currentSection}-${currentQIndex}`] ? "#facc15" : "#cbd5e1", border: "none", borderRadius: 10, padding: "6px 14px", fontSize: 13, fontWeight: 700, cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 6 }}
              >
                <Bookmark size={14} /> {markedQuestions[`${currentSection}-${currentQIndex}`] ? "Marked for Review" : "Mark for Review"}
              </button>
            </div>

            {/* TYPE 1: QUANTITATIVE COMPARISON */}
            {currentQ.type === "quant_comparison" && (
              <div>
                <span style={{ background: "rgba(56,189,248,0.15)", color: "#38bdf8", padding: "4px 12px", borderRadius: 8, fontSize: 12, fontWeight: 800 }}>
                  QUANTITATIVE COMPARISON
                </span>
                <p style={{ fontSize: 16, color: "#ffffff", margin: "16px 0 20px", lineHeight: 1.6 }}>{currentQ.promptText || currentQ.questionText}</p>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 24 }}>
                  <div style={{ background: "#0f172a", padding: 18, borderRadius: 14, border: "1px solid rgba(255,255,255,0.1)" }}>
                    <div style={{ fontSize: 12, color: "#94a3b8", fontWeight: 800 }}>QUANTITY A</div>
                    <div style={{ fontSize: 18, fontWeight: 900, marginTop: 6, color: "#38bdf8" }}>{currentQ.quantityA}</div>
                  </div>
                  <div style={{ background: "#0f172a", padding: 18, borderRadius: 14, border: "1px solid rgba(255,255,255,0.1)" }}>
                    <div style={{ fontSize: 12, color: "#94a3b8", fontWeight: 800 }}>QUANTITY B</div>
                    <div style={{ fontSize: 18, fontWeight: 900, marginTop: 6, color: "#facc15" }}>{currentQ.quantityB}</div>
                  </div>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  {currentQ.options.map((opt, i) => (
                    <button
                      key={i}
                      onClick={() => setAnswers({ ...answers, [currentQ.id]: opt.charAt(0) })}
                      style={{ background: answers[currentQ.id] === opt.charAt(0) ? "rgba(56,189,248,0.2)" : "rgba(15,23,42,0.6)", color: "#ffffff", border: answers[currentQ.id] === opt.charAt(0) ? "1px solid #38bdf8" : "1px solid rgba(255,255,255,0.1)", borderRadius: 12, padding: 14, textAlign: "left", fontSize: 15, fontWeight: 700, cursor: "pointer" }}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* TYPE 2: NUMERIC ENTRY */}
            {currentQ.type === "numeric_entry" && (
              <div>
                <span style={{ background: "rgba(56,189,248,0.15)", color: "#38bdf8", padding: "4px 12px", borderRadius: 8, fontSize: 12, fontWeight: 800 }}>
                  NUMERIC ENTRY
                </span>
                <p style={{ fontSize: 16, color: "#ffffff", margin: "16px 0 20px", lineHeight: 1.6 }}>{currentQ.promptText || currentQ.questionText}</p>
                <div style={{ background: "#0f172a", padding: 24, borderRadius: 16, border: "1px solid rgba(255,255,255,0.1)", display: "inline-block" }}>
                  <label style={{ fontSize: 13, color: "#94a3b8", display: "block", marginBottom: 8, fontWeight: 700 }}>Enter Answer Value (integer, decimal, or fraction):</label>
                  <input
                    type="text"
                    value={answers[currentQ.id] || ""}
                    onChange={(e) => setAnswers({ ...answers, [currentQ.id]: e.target.value })}
                    placeholder="e.g. 256 or 0.5 or 1/2"
                    style={{ width: 260, background: "#1e293b", border: "2px solid #38bdf8", borderRadius: 12, padding: "12px 16px", color: "#ffffff", fontSize: 18, fontWeight: 800, outline: "none" }}
                  />
                </div>
              </div>
            )}

            {/* TYPE 3: MCQ SINGLE / READING COMP SINGLE */}
            {(currentQ.type === "mcq_single" || currentQ.type === "reading_comp_single") && (
              <div>
                <span style={{ background: "rgba(245,158,11,0.15)", color: "#facc15", padding: "4px 12px", borderRadius: 8, fontSize: 12, fontWeight: 800 }}>
                  MULTIPLE CHOICE (SELECT ONE ANSWER)
                </span>
                {currentQ.passageText && (
                  <div style={{ fontSize: 15, color: "#cbd5e1", lineHeight: 1.6, background: "#0f172a", padding: 20, borderRadius: 14, margin: "16px 0 20px" }}>
                    {currentQ.passageText}
                  </div>
                )}
                <p style={{ fontSize: 16, color: "#ffffff", margin: "16px 0 20px", lineHeight: 1.6 }}>{currentQ.questionText || currentQ.promptText}</p>
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  {currentQ.options.map((opt, i) => (
                    <button
                      key={i}
                      onClick={() => setAnswers({ ...answers, [currentQ.id]: opt })}
                      style={{ background: answers[currentQ.id] === opt ? "rgba(245,158,11,0.2)" : "rgba(15,23,42,0.6)", color: "#ffffff", border: answers[currentQ.id] === opt ? "1px solid #facc15" : "1px solid rgba(255,255,255,0.1)", borderRadius: 12, padding: 14, textAlign: "left", fontSize: 15, fontWeight: 700, cursor: "pointer" }}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* TYPE 4: TEXT COMPLETION (1, 2, or 3 BLANKS) */}
            {currentQ.type.startsWith("text_completion") && (
              <div>
                <span style={{ background: "rgba(192,132,252,0.15)", color: "#c084fc", padding: "4px 12px", borderRadius: 8, fontSize: 12, fontWeight: 800 }}>
                  TEXT COMPLETION ({currentQ.type === "text_completion_1" ? "1 BLANK" : currentQ.type === "text_completion_2" ? "2 BLANKS" : "3 BLANKS"}) — ALL-OR-NOTHING SCORING
                </span>
                <p style={{ fontSize: 16, color: "#ffffff", margin: "16px 0 24px", lineHeight: 1.7, background: "#0f172a", padding: 20, borderRadius: 14 }}>
                  {currentQ.promptText}
                </p>

                {/* 1-Blank Choices */}
                {currentQ.type === "text_completion_1" && (
                  <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                    <div style={{ fontSize: 13, fontWeight: 800, color: "#c084fc" }}>Select Choice for Blank 1:</div>
                    {currentQ.options.map((opt, i) => (
                      <button
                        key={i}
                        onClick={() => setAnswers({ ...answers, [currentQ.id]: opt })}
                        style={{ background: answers[currentQ.id] === opt ? "rgba(192,132,252,0.25)" : "rgba(15,23,42,0.6)", color: "#ffffff", border: answers[currentQ.id] === opt ? "1px solid #c084fc" : "1px solid rgba(255,255,255,0.1)", borderRadius: 12, padding: 14, textAlign: "left", fontSize: 15, fontWeight: 700, cursor: "pointer" }}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                )}

                {/* 2 or 3-Blank Choices Table */}
                {(currentQ.type === "text_completion_2" || currentQ.type === "text_completion_3") && currentQ.options && (
                  <div style={{ display: "grid", gridTemplateColumns: currentQ.type === "text_completion_2" ? "1fr 1fr" : "1fr 1fr 1fr", gap: 16 }}>
                    {Object.keys(currentQ.options).map((bKey) => (
                      <div key={bKey} style={{ background: "#0f172a", padding: 16, borderRadius: 14, border: "1px solid rgba(255,255,255,0.1)" }}>
                        <div style={{ fontSize: 13, fontWeight: 800, color: "#c084fc", marginBottom: 12, textTransform: "uppercase" }}>
                          Choice for {bKey === "b1" ? "Blank 1" : bKey === "b2" ? "Blank 2" : "Blank 3"}
                        </div>
                        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                          {currentQ.options[bKey].map((opt, idx) => {
                            const isSelected = answers[currentQ.id] && answers[currentQ.id][bKey] === opt;
                            return (
                              <button
                                key={idx}
                                onClick={() => handleBlankChoice(currentQ.id, bKey, opt)}
                                style={{ background: isSelected ? "rgba(192,132,252,0.3)" : "rgba(30,41,59,0.8)", color: "#ffffff", border: isSelected ? "1px solid #c084fc" : "1px solid rgba(255,255,255,0.08)", borderRadius: 10, padding: 12, textAlign: "left", fontSize: 14, fontWeight: 700, cursor: "pointer" }}
                              >
                                {opt}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* TYPE 5: SENTENCE EQUIVALENCE */}
            {currentQ.type === "sentence_equivalence" && (
              <div>
                <span style={{ background: "rgba(16,185,129,0.15)", color: "#10b981", padding: "4px 12px", borderRadius: 8, fontSize: 12, fontWeight: 800 }}>
                  SENTENCE EQUIVALENCE (SELECT EXACTLY 2 CHOICES)
                </span>
                <p style={{ fontSize: 16, color: "#ffffff", margin: "16px 0 20px", lineHeight: 1.7, background: "#0f172a", padding: 20, borderRadius: 14 }}>
                  {currentQ.promptText}
                </p>
                <div style={{ fontSize: 13, color: "#10b981", marginBottom: 14, fontWeight: 700 }}>
                  Selected: <strong>{(answers[currentQ.id] || []).length} / 2 choices</strong>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  {currentQ.options.map((opt, i) => {
                    const selected = (answers[currentQ.id] || []).includes(opt);
                    return (
                      <button
                        key={i}
                        onClick={() => toggleMultiChoice(currentQ.id, opt, 2)}
                        style={{ background: selected ? "rgba(16,185,129,0.2)" : "rgba(15,23,42,0.6)", color: "#ffffff", border: selected ? "1px solid #10b981" : "1px solid rgba(255,255,255,0.1)", borderRadius: 12, padding: 14, textAlign: "left", fontSize: 15, fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", gap: 12 }}
                      >
                        {selected ? <CheckSquare size={18} color="#10b981" /> : <Square size={18} color="#94a3b8" />}
                        {opt}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* TYPE 6: MCQ MULTIPLE / READING COMP MULTIPLE */}
            {(currentQ.type === "mcq_multiple" || currentQ.type === "reading_comp_multiple") && (
              <div>
                <span style={{ background: "rgba(245,158,11,0.15)", color: "#facc15", padding: "4px 12px", borderRadius: 8, fontSize: 12, fontWeight: 800 }}>
                  MULTIPLE CHOICE (SELECT ONE OR MORE ANSWERS)
                </span>
                {currentQ.passageText && (
                  <div style={{ fontSize: 15, color: "#cbd5e1", lineHeight: 1.6, background: "#0f172a", padding: 20, borderRadius: 14, margin: "16px 0 20px" }}>
                    {currentQ.passageText}
                  </div>
                )}
                <p style={{ fontSize: 16, color: "#ffffff", margin: "16px 0 20px", lineHeight: 1.6 }}>{currentQ.questionText || currentQ.promptText}</p>
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  {currentQ.options.map((opt, i) => {
                    const selected = (answers[currentQ.id] || []).includes(opt);
                    return (
                      <button
                        key={i}
                        onClick={() => toggleMultiChoice(currentQ.id, opt)}
                        style={{ background: selected ? "rgba(245,158,11,0.2)" : "rgba(15,23,42,0.6)", color: "#ffffff", border: selected ? "1px solid #facc15" : "1px solid rgba(255,255,255,0.1)", borderRadius: 12, padding: 14, textAlign: "left", fontSize: 15, fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", gap: 12 }}
                      >
                        {selected ? <CheckSquare size={18} color="#facc15" /> : <Square size={18} color="#94a3b8" />}
                        {opt}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* TYPE 7: READING COMP SELECT IN PASSAGE (CLICKABLE SENTENCES) */}
            {currentQ.type === "reading_comp_select_passage" && (
              <div>
                <span style={{ background: "rgba(56,189,248,0.15)", color: "#38bdf8", padding: "4px 12px", borderRadius: 8, fontSize: 12, fontWeight: 800 }}>
                  SELECT-IN-PASSAGE (CLICK TARGET SENTENCE IN PASSAGE)
                </span>
                <p style={{ fontSize: 16, color: "#ffffff", margin: "16px 0 20px", lineHeight: 1.6 }}>{currentQ.questionText}</p>

                <div style={{ background: "#0f172a", padding: 24, borderRadius: 16, border: "1px solid rgba(255,255,255,0.1)", lineHeight: 1.8, fontSize: 16 }}>
                  {currentQ.passageText
                    .split(/(?<=\.)\s+/)
                    .filter(s => s.trim().length > 0)
                    .map((sentence, idx) => {
                      const isSelected = answers[currentQ.id] === idx;
                      return (
                        <span
                          key={idx}
                          onClick={() => setAnswers({ ...answers, [currentQ.id]: idx })}
                          style={{
                            background: isSelected ? "rgba(56,189,248,0.3)" : "transparent",
                            color: isSelected ? "#38bdf8" : "#cbd5e1",
                            borderBottom: isSelected ? "2px solid #38bdf8" : "1px dashed rgba(255,255,255,0.25)",
                            padding: "4px 8px",
                            borderRadius: 6,
                            cursor: "pointer",
                            marginRight: 6,
                            fontWeight: isSelected ? 800 : 400,
                            display: "inline-block",
                            transition: "all 0.2s ease"
                          }}
                        >
                          {sentence}
                        </span>
                      );
                    })}
                </div>
              </div>
            )}

            {/* Navigation Footer */}
            <div style={{ display: "flex", justifyContent: "space-between", borderTop: "1px solid rgba(255,255,255,0.1)", paddingTop: 24, marginTop: 32 }}>
              <button
                disabled={currentQIndex === 0}
                onClick={() => setCurrentQIndex(i => Math.max(0, i - 1))}
                style={{ background: "rgba(255,255,255,0.08)", color: "#ffffff", border: "none", borderRadius: 12, padding: "12px 20px", fontSize: 14, fontWeight: 800, cursor: currentQIndex === 0 ? "not-allowed" : "pointer" }}
              >
                <ArrowLeft size={16} /> Prev Question
              </button>

              {currentQIndex < activeQuestions.length - 1 ? (
                <button
                  onClick={() => setCurrentQIndex(i => i + 1)}
                  style={{ background: "linear-gradient(135deg, #d97706, #b45309)", color: "#ffffff", border: "none", borderRadius: 12, padding: "12px 24px", fontSize: 14, fontWeight: 800, cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 6 }}
                >
                  Next Question <ArrowRight size={16} />
                </button>
              ) : (
                <button
                  onClick={autoAdvanceSection}
                  style={{ background: "linear-gradient(135deg, #10b981, #059669)", color: "#ffffff", border: "none", borderRadius: 12, padding: "12px 24px", fontSize: 14, fontWeight: 800, cursor: "pointer" }}
                >
                  Submit Section &amp; Continue
                </button>
              )}
            </div>

          </div>
        )}

      </main>
    </div>
  );
}
