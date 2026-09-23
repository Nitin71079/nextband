import React, { useState, useEffect, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Clock, Bookmark, Calculator, ArrowLeft, ArrowRight, ShieldCheck, CheckCircle2, RotateCcw } from "lucide-react";
import { gmatTests } from "../data/gmat/gmatTests";
import { selectNextCATQuestion, updateAbilityEstimate } from "../utils/gmatAdaptiveEngine";
import { evaluateFullGMATPerformance, scoreGMATQuestion } from "../utils/gmatScoreCalculator";
import { saveGMATSessionState, loadGMATSessionState, clearGMATSessionState } from "../utils/gmatSessionPersistence";

import GMATPreExamFlow from "../components/gmat/GMATPreExamFlow";
import GMATQuestionRenderer from "../components/gmat/GMATQuestionRenderer";
import GMATCalculator from "../components/gmat/GMATCalculator";
import GMATQuestionReviewModal from "../components/gmat/GMATQuestionReviewModal";
import GMATBreakScreen from "../components/gmat/GMATBreakScreen";

export default function GMATTestEnginePage() {
  const { testId } = useParams();
  const navigate = useNavigate();

  const testObj = useMemo(() => {
    return gmatTests.find((t) => t.id === testId) || gmatTests[0];
  }, [testId]);

  // Pre-Exam Flow State
  const [hasSelectedOrder, setHasSelectedOrder] = useState(false);
  const [sectionOrder, setSectionOrder] = useState(["quant", "verbal", "di"]);
  const [activeSectionIdx, setActiveSectionIdx] = useState(0);

  // Workflow Stages: 'exam' | 'review' | 'break'
  const [stageMode, setStageMode] = useState("exam");

  // CAT Ability Theta & Trajectory
  const [thetas, setThetas] = useState({ quant: 0.0, verbal: 0.0, di: 0.0 });
  const [catTrajectories, setCatTrajectories] = useState({ quant: [0.0], verbal: [0.0], di: [0.0] });

  // Current Question List & Active Question Key
  const activeSectionKey = sectionOrder[activeSectionIdx] || "quant";
  const activePool = useMemo(() => {
    return testObj.sections[activeSectionKey]?.pool || [];
  }, [testObj, activeSectionKey]);

  const [activeQuestion, setActiveQuestion] = useState(null);
  const [sectionQuestionsList, setSectionQuestionsList] = useState([]);
  const [currentListIdx, setCurrentListIdx] = useState(0);

  // Candidate Response State
  const [userAnswers, setUserAnswers] = useState({});
  const [flaggedQuestions, setFlaggedQuestions] = useState({});
  const [answerChangeCount, setAnswerChangeCount] = useState({ quant: 0, verbal: 0, di: 0 });

  // Tools & Calculator State
  const [showCalculator, setShowCalculator] = useState(false);
  const maxAnswerChangesPerSection = 3;

  // Independent Section Timers (45 mins = 2700s)
  const sectionDurationSeconds = 2700;
  const [timeLeft, setTimeLeft] = useState(sectionDurationSeconds);

  // 1. Recover Session State on Load
  useEffect(() => {
    const saved = loadGMATSessionState(testObj.id);
    if (saved) {
      setHasSelectedOrder(saved.hasSelectedOrder ?? false);
      setSectionOrder(saved.sectionOrder || ["quant", "verbal", "di"]);
      setActiveSectionIdx(saved.activeSectionIdx || 0);
      setStageMode(saved.stageMode || "exam");
      setThetas(saved.thetas || { quant: 0.0, verbal: 0.0, di: 0.0 });
      setCatTrajectories(saved.catTrajectories || { quant: [0.0], verbal: [0.0], di: [0.0] });
      setUserAnswers(saved.userAnswers || {});
      setFlaggedQuestions(saved.flaggedQuestions || {});
      setAnswerChangeCount(saved.answerChangeCount || { quant: 0, verbal: 0, di: 0 });
      setSectionQuestionsList(saved.sectionQuestionsList || []);
      setCurrentListIdx(saved.currentListIdx || 0);
      if (saved.sectionQuestionsList && saved.sectionQuestionsList.length > 0) {
        setActiveQuestion(saved.sectionQuestionsList[saved.currentListIdx || 0]);
      }
      if (typeof saved.timeLeft === "number") {
        setTimeLeft(saved.timeLeft);
      }
    }
  }, [testObj.id]);

  // 2. Initialize First CAT Question when section changes
  useEffect(() => {
    if (hasSelectedOrder && stageMode === "exam" && sectionQuestionsList.length === 0) {
      const answeredSet = new Set();
      const firstQ = selectNextCATQuestion(thetas[activeSectionKey], activePool, answeredSet);
      if (firstQ) {
        setActiveQuestion(firstQ);
        setSectionQuestionsList([firstQ]);
        setCurrentListIdx(0);
      }
    }
  }, [hasSelectedOrder, activeSectionIdx, stageMode, activeSectionKey, activePool]);

  // 3. Section Timer Countdown
  useEffect(() => {
    if (!hasSelectedOrder || stageMode === "break") return;

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

  // 4. Auto-save session state to LocalStorage
  useEffect(() => {
    if (hasSelectedOrder) {
      saveGMATSessionState(testObj.id, {
        hasSelectedOrder,
        sectionOrder,
        activeSectionIdx,
        stageMode,
        thetas,
        catTrajectories,
        userAnswers,
        flaggedQuestions,
        answerChangeCount,
        sectionQuestionsList,
        currentListIdx,
        timeLeft
      });
    }
  }, [
    hasSelectedOrder, sectionOrder, activeSectionIdx, stageMode, thetas,
    catTrajectories, userAnswers, flaggedQuestions, answerChangeCount,
    sectionQuestionsList, currentListIdx, timeLeft, testObj.id
  ]);

  const formatTime = (secs) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
  };

  // Start Exam after choosing Section Order
  const handleStartExam = (selectedOrderKeys) => {
    setSectionOrder(selectedOrderKeys);
    setHasSelectedOrder(true);
    setActiveSectionIdx(0);
    setStageMode("exam");
    setTimeLeft(sectionDurationSeconds);
  };

  // Handle Option Selection with 3 Answer Edits Limit Enforcement
  const handleSelectOption = (qId, optionVal) => {
    const prevAns = userAnswers[qId];

    if (stageMode === "review" || currentListIdx < sectionQuestionsList.length - 1) {
      // If candidate is modifying an already answered question
      if (prevAns !== undefined && prevAns !== optionVal) {
        const used = answerChangeCount[activeSectionKey] || 0;
        if (used >= maxAnswerChangesPerSection) {
          alert(`Maximum ${maxAnswerChangesPerSection} answer changes per section allowed by GMAT Focus rules.`);
          return;
        }
        setAnswerChangeCount((prev) => ({
          ...prev,
          [activeSectionKey]: (prev[activeSectionKey] || 0) + 1
        }));
      }
    }

    setUserAnswers((prev) => ({ ...prev, [qId]: optionVal }));
  };

  // Move to Next Question or Trigger Next CAT Step
  const handleNextStep = () => {
    if (currentListIdx < sectionQuestionsList.length - 1) {
      const nextIdx = currentListIdx + 1;
      setCurrentListIdx(nextIdx);
      setActiveQuestion(sectionQuestionsList[nextIdx]);
      return;
    }

    if (!activeQuestion) return;

    // Evaluate answer & update theta
    const isCorrect = scoreGMATQuestion(activeQuestion, userAnswers[activeQuestion.id]);
    const currentT = thetas[activeSectionKey];
    const newT = updateAbilityEstimate(
      currentT,
      Boolean(isCorrect),
      activeQuestion.irt?.b ?? 0,
      activeQuestion.irt?.a ?? 1.25,
      activeQuestion.irt?.c ?? 0.20
    );

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
      setSectionQuestionsList((prev) => [...prev, nextQ]);
      const newIdx = sectionQuestionsList.length;
      setCurrentListIdx(newIdx);
      setActiveQuestion(nextQ);
    } else {
      setStageMode("review");
    }
  };

  const handlePreviousStep = () => {
    if (currentListIdx > 0) {
      const prevIdx = currentListIdx - 1;
      setCurrentListIdx(prevIdx);
      setActiveQuestion(sectionQuestionsList[prevIdx]);
    }
  };

  const toggleFlag = (qId) => {
    setFlaggedQuestions((prev) => ({ ...prev, [qId]: !prev[qId] }));
  };

  // Section Advancement & Completion
  const handleAdvanceSection = () => {
    if (activeSectionIdx < sectionOrder.length - 1) {
      setStageMode("break");
    } else {
      handleCompleteGMATExam();
    }
  };

  const handleEndBreak = () => {
    const nextIdx = activeSectionIdx + 1;
    setActiveSectionIdx(nextIdx);
    setStageMode("exam");
    setSectionQuestionsList([]);
    setCurrentListIdx(0);
    setActiveQuestion(null);
    setTimeLeft(sectionDurationSeconds);
  };

  const handleCompleteGMATExam = () => {
    clearGMATSessionState(testObj.id);

    const evalResult = evaluateFullGMATPerformance({ thetas, sectionOrder });
    const resultId = `gmat_res_${Date.now()}`;
    const resultPayload = {
      resultId,
      testId: testObj.id,
      title: testObj.title,
      date: new Date().toISOString(),
      sectionOrder,
      quantScore: evalResult.quantScore,
      verbalScore: evalResult.verbalScore,
      diScore: evalResult.diScore,
      totalScore: evalResult.totalScore,
      percentile: evalResult.percentile,
      userAnswers,
      flaggedQuestions,
      answerChangeCount,
      thetas
    };

    localStorage.setItem(`knarrow_gmat_res_${resultId}`, JSON.stringify(resultPayload));
    navigate(`/gmat/results/${resultId}`);
  };

  // Section Display Names
  const sectionDisplayNames = {
    quant: "Quantitative Reasoning",
    verbal: "Verbal Reasoning",
    di: "Data Insights"
  };

  // Render Pre-Exam Flow if Section Order not selected
  if (!hasSelectedOrder) {
    return <GMATPreExamFlow onStartExam={handleStartExam} />;
  }

  // Render Break Screen if in break stage
  if (stageMode === "break") {
    const nextSecKey = sectionOrder[activeSectionIdx + 1] || "quant";
    return (
      <GMATBreakScreen
        onEndBreak={handleEndBreak}
        nextSectionTitle={sectionDisplayNames[nextSecKey]}
      />
    );
  }

  const isBookmarked = activeQuestion ? Boolean(flaggedQuestions[activeQuestion.id]) : false;
  const maxQs = activeSectionKey === "quant" ? 21 : activeSectionKey === "verbal" ? 23 : 20;

  return (
    <div style={{ minHeight: "100vh", background: "#090d16", color: "#ffffff", fontFamily: "Inter, sans-serif", display: "flex", flexDirection: "column" }}>
      
      {/* ── TOP EXAM HEADER ── */}
      <div style={{ background: "#0f172a", borderBottom: "1px solid #334155", padding: "12px 24px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <span style={{ fontWeight: 900, fontSize: "16px", color: "#ffffff", letterSpacing: "-0.5px" }}>
            Knarrow <span style={{ color: "#38bdf8", fontWeight: 700, fontSize: "13px" }}>GMAT Practice Exam</span>
          </span>
          <span style={{ height: "18px", width: "1px", background: "#334155" }} />
          <span style={{ fontSize: "14px", fontWeight: 700, color: "#e2e8f0" }}>
            Section: <strong style={{ color: "#38bdf8" }}>{sectionDisplayNames[activeSectionKey]}</strong>
          </span>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
          {/* Question Counter */}
          <div style={{ fontSize: "14px", fontWeight: 700, color: "#cbd5e1" }}>
            Question: <strong style={{ color: "#ffffff" }}>{currentListIdx + 1}</strong> / {maxQs}
          </div>

          {/* Section Timer */}
          <div style={{ background: "#1e293b", border: "1px solid #334155", padding: "6px 14px", borderRadius: "8px", display: "flex", alignItems: "center", gap: "8px" }}>
            <Clock size={16} color="#38bdf8" />
            <span style={{ fontSize: "14px", fontWeight: 800, color: "#ffffff", fontFamily: "monospace" }}>
              {formatTime(timeLeft)}
            </span>
          </div>

          {/* Data Insights Calculator Toggle (Only in DI) */}
          {activeSectionKey === "di" && (
            <button
              onClick={() => setShowCalculator(!showCalculator)}
              style={{
                background: showCalculator ? "#0284c7" : "#1e293b",
                color: "#ffffff",
                border: "1px solid #334155",
                borderRadius: "8px",
                padding: "6px 14px",
                fontSize: "13px",
                fontWeight: 700,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "6px"
              }}
            >
              <Calculator size={16} /> Calculator
            </button>
          )}

          {/* Question Review Stage Launcher */}
          <button
            onClick={() => setStageMode("review")}
            style={{
              background: "#1e293b",
              color: "#38bdf8",
              border: "1px solid #0284c7",
              borderRadius: "8px",
              padding: "6px 14px",
              fontSize: "13px",
              fontWeight: 700,
              cursor: "pointer"
            }}
          >
            Review & Edit Stage
          </button>
        </div>
      </div>

      {/* ── MAIN QUESTION AREA ── */}
      <div style={{ flex: 1, maxWidth: "1200px", width: "100%", margin: "0 auto", padding: "28px 24px", display: "flex", flexDirection: "column" }}>
        
        {activeQuestion ? (
          <GMATQuestionRenderer
            question={activeQuestion}
            selectedOption={userAnswers[activeQuestion.id]}
            onSelectOption={(opt) => handleSelectOption(activeQuestion.id, opt)}
          />
        ) : (
          <div style={{ textAlign: "center", padding: "60px 0", color: "#94a3b8" }}>
            Loading next computer-adaptive question...
          </div>
        )}
      </div>

      {/* ── EXAM BOTTOM CONTROLS ── */}
      <div style={{ background: "#0f172a", borderTop: "1px solid #334155", padding: "16px 24px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          {activeQuestion && (
            <button
              onClick={() => toggleFlag(activeQuestion.id)}
              style={{
                background: isBookmarked ? "rgba(250, 204, 21, 0.2)" : "transparent",
                color: isBookmarked ? "#facc15" : "#94a3b8",
                border: isBookmarked ? "1px solid #facc15" : "1px solid #334155",
                borderRadius: "8px",
                padding: "10px 18px",
                fontSize: "13px",
                fontWeight: 700,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "8px"
              }}
            >
              <Bookmark size={16} fill={isBookmarked ? "#facc15" : "none"} />
              {isBookmarked ? "Bookmarked" : "Bookmark Question"}
            </button>
          )}
        </div>

        <div style={{ display: "flex", gap: "14px" }}>
          <button
            disabled={currentListIdx === 0}
            onClick={handlePreviousStep}
            style={{
              background: currentListIdx === 0 ? "rgba(255,255,255,0.05)" : "#1e293b",
              color: currentListIdx === 0 ? "#64748b" : "#ffffff",
              border: "1px solid #334155",
              borderRadius: "10px",
              padding: "10px 20px",
              fontSize: "14px",
              fontWeight: 700,
              cursor: currentListIdx === 0 ? "not-allowed" : "pointer",
              display: "flex",
              alignItems: "center",
              gap: "6px"
            }}
          >
            <ArrowLeft size={16} /> Previous
          </button>

          <button
            onClick={handleNextStep}
            style={{
              background: "linear-gradient(135deg, #0284c7, #10b981)",
              color: "#ffffff",
              border: "none",
              borderRadius: "10px",
              padding: "10px 24px",
              fontSize: "14px",
              fontWeight: 800,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              boxShadow: "0 4px 14px rgba(2, 132, 199, 0.4)"
            }}
          >
            {currentListIdx < sectionQuestionsList.length - 1 ? "Next" : "Submit & Continue"} <ArrowRight size={16} />
          </button>
        </div>
      </div>

      {/* Floating Calculator Modal */}
      {showCalculator && activeSectionKey === "di" && (
        <GMATCalculator onClose={() => setShowCalculator(false)} />
      )}

      {/* Question Review & Edit Stage Modal */}
      {stageMode === "review" && (
        <GMATQuestionReviewModal
          questionsList={sectionQuestionsList}
          userAnswers={userAnswers}
          flaggedQuestions={flaggedQuestions}
          answerChangeCount={answerChangeCount[activeSectionKey] || 0}
          maxChanges={maxAnswerChangesPerSection}
          timeLeftFormatted={formatTime(timeLeft)}
          onSelectQuestionToEdit={(idx) => {
            setCurrentListIdx(idx);
            setActiveQuestion(sectionQuestionsList[idx]);
            setStageMode("exam");
          }}
          onFinishSectionReview={handleAdvanceSection}
        />
      )}
    </div>
  );
}
