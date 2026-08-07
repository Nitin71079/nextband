import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { serverTimestamp } from "firebase/firestore";

import { useAuth } from "../context/AuthContext";
import { useExam } from "../context/ExamContext";
import { saveResult } from "../services/resultService";
import { getIELTSBand } from "../services/BandCalculator";
import academicTests from "../data/reading/academic/academicTests";
import generalTests from "../data/reading/general/generalTests";
import { isReadingTestLocked } from "../services/freePlanLimits";

import QuestionRenderer from "../components/QuestionRenderer";
import QuestionPalette from "../components/QuestionPalette";
import TestFeedbackModal from "../components/TestFeedbackModal";
import scoreReading from "../utils/scoreReading";

import "../styles/mock-reading.css";

/* ──────────────────────────────────────────────────────────
   Helpers
────────────────────────────────────────────────────────── */
function fmtTime(seconds) {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${String(s).padStart(2, "0")}`;
}

function timerClass(seconds) {
  if (seconds <= 60)  return "ielts-timer danger";
  if (seconds <= 300) return "ielts-timer warning";
  return "ielts-timer";
}

/* ──────────────────────────────────────────────────────────
   Component
────────────────────────────────────────────────────────── */
export default function MockReading({
  mode = "practice",
  onComplete,
  forcedTestId,
  forcedExamType,
}) {
  const navigate  = useNavigate();
  const location  = useLocation();
  const { id: paramId } = useParams();

  const id = forcedTestId !== undefined ? String(forcedTestId) : paramId;

  const { user }         = useAuth();
  const { premium }      = useAuth();
  const { setReadingBand } = useExam();

  const isGeneral = forcedExamType
    ? forcedExamType === "general"
    : location.pathname.includes("/mock/general-reading");

  const readingTests  = isGeneral ? generalTests : academicTests;
  const currentTest   = readingTests.find((t) => String(t.id) === String(id)) || readingTests[0];

  /* ── Free plan gate — redirect before any state is set ── */
  useEffect(() => {
    if (!currentTest) return;
    if (mode === "cbt") return; // CBT mode is controlled by the full mock gate
    if (isReadingTestLocked(currentTest.id, isGeneral, premium)) {
      navigate("/pricing", { replace: true });
    }
  }, [currentTest?.id, isGeneral, premium, mode]); // eslint-disable-line

  /* ── State ─────────────────────────────────────────── */
  const [passageIndex, setPassageIndex] = useState(0);
  const [answers,      setAnswers]      = useState({});
  const [flagged,      setFlagged]      = useState([]);
  const [submitted,    setSubmitted]    = useState(false);
  const [reviewMode,   setReviewMode]   = useState(false);
  const [showAnswerKey, setShowAnswerKey] = useState(false);
  const [timeLeft,     setTimeLeft]     = useState((currentTest?.duration || 60) * 60);
  const [mobileTab,    setMobileTab]    = useState("passage"); // "passage" | "questions"
  const [currentQ,     setCurrentQ]     = useState(null);
  const [submitting,   setSubmitting]   = useState(false);
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);

  const questionRefs = useRef({});
  const questionsScrollRef = useRef(null);

  /* ── Derived ───────────────────────────────────────── */
  const currentPassage = currentTest?.passages?.[passageIndex] ?? null;

  const currentQuestions = useMemo(() => {
    if (!currentPassage || !Array.isArray(currentPassage.questions)) return [];
    return currentPassage.questions;
  }, [currentPassage]);

  const allQuestions = useMemo(() => {
    if (!currentTest?.passages) return [];
    return currentTest.passages.flatMap((p) =>
      Array.isArray(p.questions) ? p.questions : []
    );
  }, [currentTest]);

  const totalQuestions   = allQuestions.length;
  const answeredCount    = Object.keys(answers).filter((k) => answers[k] !== "").length;
  const progressPercent  = totalQuestions ? (answeredCount / totalQuestions) * 100 : 0;

  /* ── Reset on test change ──────────────────────────── */
  useEffect(() => {
    if (!currentTest) return;
    setPassageIndex(0);
    setAnswers({});
    setFlagged([]);
    setSubmitted(false);
    setReviewMode(false);
    setShowAnswerKey(false);
    setTimeLeft((currentTest.duration || 60) * 60);
    setCurrentQ(null);
    setSubmitting(false);
    questionRefs.current = {};
  }, [currentTest]);

  /* ── Timer ─────────────────────────────────────────── */
  useEffect(() => {
    if (submitted || reviewMode) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          // practice: auto-submit straight to results; exam: review first
          if (mode === "practice") {
            submitReading(true); // silent auto-submit
          } else {
            setReviewMode(true);
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [submitted, reviewMode, mode]); // eslint-disable-line

  /* ── 5 min warning ─────────────────────────────────── */
  useEffect(() => {
    if (timeLeft === 300) alert("⏰ Only 5 minutes remaining!");
  }, [timeLeft]);

  /* ── Title ─────────────────────────────────────────── */
  useEffect(() => {
    if (currentTest) document.title = `${currentTest.title} | Knarrow`;
  }, [currentTest]);

  /* ── Scroll passage panel to top on passage change ── */
  useEffect(() => {
    const panel = document.querySelector(".ielts-passage-panel");
    const qpanel = document.querySelector(".ielts-questions-panel");
    if (panel)  panel.scrollTop = 0;
    if (qpanel) qpanel.scrollTop = 0;
  }, [passageIndex]);

  /* ── Actions ───────────────────────────────────────── */
  const selectAnswer = useCallback((qId, val) => {
    setAnswers((prev) => ({ ...prev, [qId]: val }));
  }, []);

  const toggleFlag = useCallback((qId) => {
    setFlagged((prev) =>
      prev.includes(qId) ? prev.filter((x) => x !== qId) : [...prev, qId]
    );
  }, []);

  function scrollToQuestion(qId) {
    setCurrentQ(qId);
    const el = questionRefs.current[qId];
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }

  function handleQuestionClick(qId) {
    // find which passage this question belongs to
    const pIdx = currentTest.passages.findIndex(
      (p) => Array.isArray(p.questions) && p.questions.some((q) => q.id === qId)
    );
    if (pIdx !== -1 && pIdx !== passageIndex) {
      setPassageIndex(pIdx);
      // scroll after re-render
      setTimeout(() => scrollToQuestion(qId), 100);
    } else {
      scrollToQuestion(qId);
    }
    setMobileTab("questions");
  }

  function calculateScore() {
    return scoreReading(allQuestions, answers).score;
  }

  async function submitReading(silent = false) {
    if (submitting) return;
    setSubmitting(true);
    const score = calculateScore();
    const band  = getIELTSBand(score);
    setReadingBand(band);

    if (user) {
      try {
        await saveResult({
          userId:        user.uid,
          type:          "reading",
          examType:      isGeneral ? "General" : "Academic",
          testId:        currentTest.id,
          testTitle:     currentTest.title,
          score,
          totalQuestions,
          band,
          accuracy:      (score / totalQuestions) * 100,
          duration:      currentTest.duration,
          timeUsed:      currentTest.duration * 60 - timeLeft,
          answered:      answeredCount,
          unanswered:    totalQuestions - answeredCount,
          flagged:       flagged.length,
          completedAt:   serverTimestamp(),
        });
      } catch (_) {
        // non-blocking — results still show
      }
    }

    onComplete?.(band);
    setSubmitting(false);
    setSubmitted(true);
    setShowFeedbackModal(true);
  }

  function restartTest() {
    setAnswers({});
    setFlagged([]);
    setSubmitted(false);
    setReviewMode(false);
    setShowAnswerKey(false);
    setPassageIndex(0);
    setTimeLeft((currentTest.duration || 60) * 60);
    setCurrentQ(null);
    setSubmitting(false);
    questionRefs.current = {};
  }

  /* ── Guards ────────────────────────────────────────── */
  if (!currentTest)    return <div className="exam-error"><h2>Reading Test Not Found</h2></div>;
  if (!currentPassage) return <div className="exam-error"><h2>Passage Not Found</h2></div>;

  /* ══════════════════════════════════════════════════════
     RESULTS SCREEN
  ═════════════════════════════════════════════════════ */
  if (submitted) {
    const score = calculateScore();
    const band  = getIELTSBand(score);
    const acc   = totalQuestions ? ((score / totalQuestions) * 100).toFixed(1) : "0.0";
    const timeUsed = currentTest.duration * 60 - timeLeft;
    const minsUsed = Math.floor(timeUsed / 60);
    const secsUsed = timeUsed % 60;

    return (
      <div className="ielts-results-page">
        <div className="ielts-results-container">

          {/* Hero band + title */}
          <div className="ielts-results-hero">
            <div className="ielts-band-circle">
              <div className="ielts-band-value">{band}</div>
              <div className="ielts-band-label">Band Score</div>
            </div>
            <div className="ielts-results-info">
              <h2>Test Complete</h2>
              <p style={{ marginBottom: "6px" }}>
                <strong style={{ color: "#fff" }}>{currentTest.title}</strong>
              </p>
              <p>
                {isGeneral ? "General Training" : "Academic"} Reading ·{" "}
                {currentTest.passages.length} Passage{currentTest.passages.length > 1 ? "s" : ""}
                {" · "}{minsUsed}m {secsUsed}s used
              </p>
            </div>
          </div>

          {/* Stat cards */}
          <div className="ielts-results-stats">
            {[
              { label: "Correct",    value: `${score}/${totalQuestions}`, sub: `${acc}% accuracy`             },
              { label: "Answered",   value: answeredCount,                sub: `${totalQuestions - answeredCount} left blank` },
              { label: "Flagged",    value: flagged.length,               sub: "during the test"               },
              { label: "Time Used",  value: `${minsUsed}m`,              sub: `${secsUsed}s · of ${currentTest.duration}m`   },
            ].map((s) => (
              <div key={s.label} className="ielts-stat-card">
                <div className="stat-label">{s.label}</div>
                <div className="stat-value">{s.value}</div>
                <div className="stat-sub">{s.sub}</div>
              </div>
            ))}
          </div>

          {/* Actions */}
          <div className="ielts-results-actions">
            <button
              className={`ielts-action-btn primary`}
              onClick={() => setShowAnswerKey((v) => !v)}
            >
              {showAnswerKey ? "Hide Answer Key" : "View Answer Key"}
            </button>
            <button className="ielts-action-btn" onClick={restartTest}>
              Try Again
            </button>
            <button
              className="ielts-action-btn"
              onClick={() => navigate(isGeneral ? "/reading/general" : "/reading/academic")}
            >
              ← Reading Centre
            </button>
          </div>

          {/* Inline Answer Key */}
          {showAnswerKey && (
            <div className="ielts-answer-key">
              <div className="ielts-ak-header">Answer Key</div>
              {currentTest.passages.map((passage, pIdx) => (
                <div key={pIdx} className="ielts-ak-passage">
                  <div className="ielts-ak-passage-title">
                    Passage {pIdx + 1} — {passage.title}
                  </div>
                  {(passage.questions || []).map((q) => {
                    const userAns   = answers[q.id];
                    const correct   = Array.isArray(q.answer)
                      ? q.answer.map((a) => String(a).trim().toLowerCase())
                      : [String(q.answer ?? "").trim().toLowerCase()];
                    const isCorrect = userAns !== undefined &&
                      correct.includes(String(userAns).trim().toLowerCase());
                    const isBlank   = userAns === undefined || userAns === "";

                    return (
                      <div
                        key={q.id}
                        className={`ielts-ak-row${isCorrect ? " correct" : isBlank ? " blank" : " wrong"}`}
                      >
                        <span className="ielts-ak-qnum">Q{q.id}</span>
                        <span className="ielts-ak-qtext">{q.question}</span>
                        <span className="ielts-ak-yourans">
                          {isBlank ? <em>No answer</em> : userAns}
                        </span>
                        <span className="ielts-ak-ans">
                          {Array.isArray(q.answer) ? q.answer.join(" / ") : q.answer}
                        </span>
                        <span className={`ielts-ak-badge${isCorrect ? " ok" : isBlank ? " skip" : " err"}`}>
                          {isCorrect ? "✓" : isBlank ? "—" : "✗"}
                        </span>
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          )}

          <TestFeedbackModal
            isOpen={showFeedbackModal}
            onClose={() => setShowFeedbackModal(false)}
            testType="Reading Mock Test"
            testId={id}
          />
        </div>
      </div>
    );
  }

  /* ══════════════════════════════════════════════════════
     REVIEW SCREEN — exam mode only
  ═════════════════════════════════════════════════════ */
  if (reviewMode) {
    const score      = calculateScore();
    const band       = getIELTSBand(score);
    const unanswered = totalQuestions - answeredCount;

    return (
      <div className="ielts-review-page">
        <div className="ielts-review-bar">
          <h1>Review Before Submitting</h1>
          <div style={{ display: "flex", gap: "10px" }}>
            <button className="ielts-btn-outline" onClick={() => setReviewMode(false)}>
              ← Back to Test
            </button>
            <button
              className="ielts-btn-submit"
              disabled={submitting}
              onClick={() => submitReading()}
            >
              {submitting ? "Submitting…" : "Submit Test"}
            </button>
          </div>
        </div>

        <div className="ielts-review-content">
          <div className="ielts-review-summary">
            {[
              { label: "Total",      value: totalQuestions },
              { label: "Answered",   value: answeredCount  },
              { label: "Unanswered", value: unanswered     },
              { label: "Flagged",    value: flagged.length },
              { label: "Est. Band",  value: band           },
            ].map((s) => (
              <div key={s.label} className="ielts-review-stat">
                <span>{s.label}</span>
                <strong>{s.value}</strong>
              </div>
            ))}
          </div>

          {unanswered > 0 && (
            <div className="ielts-review-notice">
              ⚠️ {unanswered} unanswered question{unanswered > 1 ? "s" : ""} — these will be marked wrong.
            </div>
          )}

          <div className="ielts-review-actions">
            <button
              className="ielts-action-btn primary"
              disabled={submitting}
              onClick={() => submitReading()}
            >
              {submitting ? "Submitting…" : "✅ Submit Test"}
            </button>
            <button className="ielts-action-btn" onClick={() => setReviewMode(false)}>
              ← Keep Answering
            </button>
          </div>
        </div>
      </div>
    );
  }

  /* ══════════════════════════════════════════════════════
     MAIN EXAM UI
  ═════════════════════════════════════════════════════ */
  const examType   = isGeneral ? "General Training" : "Academic";
  const badgeCls   = `ielts-bar-badge${isGeneral ? " general" : ""}`;
  const passageCount = currentTest.passages.length;

  return (
    <div className="ielts-reading-page">

      {/* ── Sticky Top Bar ──────────────────────────────── */}
      <div className="ielts-exam-bar">
        <div className="ielts-bar-left">
          <span className={badgeCls}>IELTS {examType}</span>
          {mode !== "cbt" && (
            <span className="ielts-bar-title">{currentTest.title}</span>
          )}
        </div>

        <div className="ielts-bar-center">
          {/* Progress pill */}
          <div className="ielts-progress-pill">
            <span>{answeredCount}/{totalQuestions}</span>
            <div className="ielts-progress-pill-bar">
              <div
                className="ielts-progress-pill-fill"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Timer */}
          <div className={timerClass(timeLeft)}>
            ⏱ {fmtTime(timeLeft)}
          </div>
        </div>

        <div className="ielts-bar-right">
          {mode === "practice" && (
            <button className="ielts-btn-outline" onClick={restartTest}>
              Restart
            </button>
          )}
          {mode === "practice" ? (
            <button
              className="ielts-btn-submit"
              disabled={submitting}
              onClick={() => submitReading()}
            >
              {submitting ? "Submitting…" : "Submit Test"}
            </button>
          ) : (
            <button className="ielts-btn-submit" onClick={() => setReviewMode(true)}>
              Review & Submit
            </button>
          )}
        </div>
      </div>

      {/* ── Passage Tabs (desktop) ───────────────────────── */}
      <div className="ielts-passage-tabs">
        {currentTest.passages.map((p, idx) => {
          const pQs    = Array.isArray(p.questions) ? p.questions : [];
          const pStart = currentTest.passages.slice(0, idx).reduce(
            (acc, pp) => acc + (Array.isArray(pp.questions) ? pp.questions.length : 0), 1
          );
          const pEnd   = pStart + pQs.length - 1;
          const label  = pQs.length > 0
            ? `Questions ${pStart}–${pEnd}`
            : `Passage ${idx + 1}`;

          return (
            <button
              key={idx}
              className={`ielts-passage-tab${idx === passageIndex ? " active" : ""}`}
              onClick={() => setPassageIndex(idx)}
            >
              Passage {idx + 1}
              <span className="tab-count">{label}</span>
            </button>
          );
        })}
      </div>

      {/* ── Mobile Tab Switcher ─────────────────────────── */}
      <div className="ielts-mobile-tabs">
        <button
          className={`ielts-mobile-tab${mobileTab === "passage" ? " active" : ""}`}
          onClick={() => setMobileTab("passage")}
        >
          📄 Passage
        </button>
        <button
          className={`ielts-mobile-tab${mobileTab === "questions" ? " active" : ""}`}
          onClick={() => setMobileTab("questions")}
        >
          ❓ Questions ({answeredCount}/{currentQuestions.length})
        </button>
      </div>

      {/* ── Test Selector (practice mode, premium only) ───────────────── */}
      {mode === "practice" && premium && (
        <div className="ielts-selector-bar">
          <select
            className="ielts-test-select"
            value={String(currentTest.id)}
            onChange={(e) => {
              navigate(
                isGeneral
                  ? `/mock/general-reading/${e.target.value}`
                  : `/mock/reading/${e.target.value}`
              );
            }}
          >
            {readingTests.map((test) => (
              <option key={test.id} value={String(test.id)}>
                {test.title}
              </option>
            ))}
          </select>
          <div className="ielts-selector-meta">
            <span>
              Passage {passageIndex + 1} of {passageCount}
            </span>
            <span>
              {answeredCount} of {totalQuestions} answered
            </span>
            <span>{flagged.length} flagged</span>
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════════
          TWO-PANEL EXAM BODY
      ═════════════════════════════════════════════════ */}
      <div className="ielts-exam-body">

        {/* ── Left: Passage ─────────────────────────────── */}
        <div
          className={`ielts-passage-panel${mobileTab !== "passage" ? " tab-panel-hidden" : " tab-panel-visible"}`}
        >
          <div className="ielts-passage-header">
            <div className="ielts-passage-label">
              {examType} Reading · Passage {passageIndex + 1} of {passageCount}
            </div>
            <div className="ielts-passage-title">{currentPassage.title}</div>
            {currentPassage.subtitle && (
              <div className="ielts-passage-subtitle">{currentPassage.subtitle}</div>
            )}
          </div>

          <div className="ielts-passage-body">
            {(currentPassage.content || currentPassage.text) ? (
              (currentPassage.content || currentPassage.text)
                .trim()
                .split("\n\n")
                .map((para, i) => (
                  <p key={i}>{para.trim()}</p>
                ))
            ) : Array.isArray(currentPassage.texts) ? (
              currentPassage.texts.map((text) => (
                <div key={text.id} className="ielts-passage-section">
                  <div className="ielts-passage-section-heading">
                    {text.id}. {text.title}
                  </div>
                  {(text.content || text.text)
                    .trim()
                    .split("\n\n")
                    .map((para, i) => (
                      <p key={`${text.id}-${i}`}>{para.trim()}</p>
                    ))}
                </div>
              ))
            ) : (
              <p style={{ color: "#ef4444" }}>Passage content is missing.</p>
            )}
          </div>
        </div>

        {/* ── Right: Questions ──────────────────────────── */}
        <div
          ref={questionsScrollRef}
          className={`ielts-questions-panel${mobileTab !== "questions" ? " tab-panel-hidden" : " tab-panel-visible"}`}
        >
          <div className="ielts-qpanel-inner">

            {/* Question Palette */}
            <QuestionPalette
              questions={currentQuestions}
              answers={answers}
              flaggedQuestions={flagged}
              currentQuestion={currentQ}
              onQuestionClick={handleQuestionClick}
            />

            {/* Question Cards */}
            {currentQuestions.map((question, idx) => {
              const isAnswered = answers[question.id] !== undefined && answers[question.id] !== "";
              const isFlagged  = flagged.includes(question.id);

              // Detect instruction change (show instruction block before first question of group)
              const prevQ       = currentQuestions[idx - 1];
              const showInstr   = question.instruction &&
                (!prevQ || prevQ.instruction !== question.instruction);

              let cardCls = "ielts-question-card";
              if (isAnswered) cardCls += " has-answer";
              if (isFlagged)  cardCls += " is-flagged";

              return (
                <div key={question.id}>
                  {showInstr && (
                    <div className="ielts-instruction-block">
                      {question.instruction}
                    </div>
                  )}

                  <div
                    className={cardCls}
                    ref={(el) => (questionRefs.current[question.id] = el)}
                  >
                    {/* Question header row */}
                    <div className="ielts-q-number-row">
                      <span
                        className={`ielts-q-number${isAnswered ? " answered" : ""}${isFlagged ? " flagged" : ""}`}
                      >
                        Q{question.id}
                      </span>
                      <button
                        className={`ielts-flag-btn${isFlagged ? " active" : ""}`}
                        onClick={() => toggleFlag(question.id)}
                        title={isFlagged ? "Remove flag" : "Flag this question"}
                      >
                        {isFlagged ? "🚩 Flagged" : "⚑ Flag"}
                      </button>
                    </div>

                    {/* Question text */}
                    <div className="ielts-q-text">{question.question}</div>

                    {/* Answer input */}
                    <div className="ielts-q-answer-area">
                      <QuestionRenderer
                        question={question}
                        value={answers[question.id]}
                        onChange={selectAnswer}
                      />
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Submit nudge — practice mode, last passage, all answered */}
            {mode === "practice" && passageIndex === passageCount - 1 && answeredCount === totalQuestions && (
              <div className="ielts-submit-nudge">
                <span>All {totalQuestions} questions answered!</span>
                <button
                  className="ielts-btn-submit"
                  disabled={submitting}
                  onClick={() => submitReading()}
                >
                  {submitting ? "Submitting…" : "Submit & See Results →"}
                </button>
              </div>
            )}

          </div>{/* end qpanel-inner */}
        </div>{/* end questions panel */}

      </div>{/* end exam body */}
    </div>
  );
}
