import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import listeningTests from "../data/listening/tests";
import "../styles/listening/listening.css";

import ListeningHeader   from "../components/listening/ListeningHeader";
import ListeningTimer    from "../components/listening/ListeningTimer";
import AudioPlayer       from "../components/listening/AudioPlayer";
import SectionRenderer   from "../components/listening/SectionRenderer";
import QuestionPalette   from "../components/listening/renderers/QuestionPalette";
import ListeningReview   from "../components/listening/ListeningReview";
import ResultsPanel      from "../components/listening/ResultsPanel";
import TestFeedbackModal from "../components/TestFeedbackModal";

import { calculateListeningBand } from "../utils/listeningBandCalculator";
import useQuestionNavigation from "../hooks/useQuestionNavigation";
import useScrollSpy          from "../hooks/useScrollSpy";
import { useAuth }           from "../context/AuthContext";
import { isListeningTestLocked } from "../services/freePlanLimits";

/* ─────────────────────────────────────────────
   Build a lookup: questionId → sectionIndex
   Used by palette to jump across sections.
───────────────────────────────────────────── */
function buildQuestionSectionMap(sections) {
  const map = {};
  sections.forEach((section, sIdx) => {
    if (section.form) {
      section.form.forEach((q) => { map[q.id] = sIdx; });
    }
    section.groups?.forEach((group) => {
      group.questions?.forEach((q) => { map[q.id] = sIdx; });
      group.notes?.forEach((item) => {
        if (item.type === "blank") map[item.id] = sIdx;
      });
      group.rows?.forEach((row) => {
        row.forEach((cell) => {
          if (cell.id !== undefined && cell.type === undefined) map[cell.id] = sIdx;
        });
      });
      group.steps?.forEach((step) => {
        if (step.type === "blank") map[step.id] = sIdx;
      });
    });
  });
  return map;
}

export default function MockListening({
  testId: testIdProp = 0,
  mode = "practice",
  onComplete,
}) {
  /* ── Resolve test ── */
  const { id: urlId } = useParams();
  const navigate = useNavigate();
  const { premium } = useAuth();

  const test =
    urlId
      ? listeningTests.find((t) => t.id === urlId) ??
        listeningTests[testIdProp] ??
        listeningTests[0]
      : listeningTests[testIdProp] ?? listeningTests[0];

  if (!test) return <h2 style={{ color: "#fff", padding: 40 }}>Listening Test Not Found</h2>;

  /* ── Free plan gate ── */
  useEffect(() => {
    if (mode === "cbt") return;
    if (isListeningTestLocked(test.id, premium)) {
      navigate("/pricing", { replace: true });
    }
  }, [test.id, premium, mode]); // eslint-disable-line

  /* ── Always clear any saved progress on mount so every open is fresh ── */
  useEffect(() => {
    localStorage.removeItem(`listening-${test.id}`);
  }, [test.id]); // eslint-disable-line

  /* ── State — always fresh (no restore) ── */
  const [answers,        setAnswers]        = useState({});
  const [currentSection, setCurrentSection] = useState(0);
  const [flagged,        setFlagged]        = useState([]);
  const [submitted,      setSubmitted]      = useState(false);
  const [showReview,     setShowReview]     = useState(false);
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);

  // Always start at 40:00
  const [timeLeft, setTimeLeft] = useState(40 * 60);

  /* ── Navigation ── */
  const { currentQuestion, goToQuestion, setCurrentQuestion } = useQuestionNavigation();

  useScrollSpy(setCurrentQuestion);

  /* ── Question → section lookup ── */
  const questionSectionMap = useMemo(
    () => buildQuestionSectionMap(test.sections),
    [test]
  );

  /* ── Current section data ── */
  const currentSectionData = test.sections[currentSection];

  /* ── Count total questions ── */
  const totalQuestions = useMemo(() => {
    let total = 0;
    test.sections.forEach((section) => {
      if (section.form) total += section.form.length;
      section.groups?.forEach((group) => {
        switch (group.type) {
          case "mcq":
          case "matching":
          case "map":
            total += group.questions.length;
            break;
          case "notes":
            total += group.notes.filter((n) => n.type === "blank").length;
            break;
          case "table":
            total += group.rows.reduce(
              (acc, row) => acc + row.filter((c) => c.id !== undefined && c.type === undefined).length,
              0
            );
            break;
          case "flowchart":
            total += group.steps.filter((s) => s.type === "blank").length;
            break;
          default:
            break;
        }
      });
    });
    return total;
  }, [test]);

  const answeredCount = Object.keys(answers).length;
  const minutes       = Math.floor(timeLeft / 60);
  const seconds       = String(timeLeft % 60).padStart(2, "0");

  /* ── Score calculation ── */
  const calculateScore = () => {
    let score = 0;
    test.sections.forEach((section) => {
      if (section.form) {
        section.form.forEach((item) => {
          if (
            String(answers[item.id] || "").trim().toLowerCase() ===
            String(item.answer).trim().toLowerCase()
          )
            score++;
        });
      }
      if (section.groups) {
        section.groups.forEach((group) => {
          if (group.questions) {
            group.questions.forEach((q) => {
              if (
                String(answers[q.id] || "").trim().toLowerCase() ===
                String(q.answer).trim().toLowerCase()
              )
                score++;
            });
          }
          if (group.notes) {
            group.notes.forEach((item) => {
              if (item.type !== "blank") return;
              const correct = group.answers?.[item.id] ?? item.answer ?? "";
              if (
                String(answers[item.id] || "").trim().toLowerCase() ===
                String(correct).trim().toLowerCase()
              )
                score++;
            });
          }
          if (group.rows) {
            group.rows.forEach((row) => {
              row.forEach((cell) => {
                if (cell.id === undefined || cell.type !== undefined) return;
                const correct = group.answers?.[cell.id] ?? cell.answer ?? "";
                if (
                  String(answers[cell.id] || "").trim().toLowerCase() ===
                  String(correct).trim().toLowerCase()
                )
                  score++;
              });
            });
          }
          if (group.steps) {
            group.steps.forEach((step) => {
              if (step.type !== "blank") return;
              const correct = group.answers?.[step.id] ?? step.answer ?? "";
              if (
                String(answers[step.id] || "").trim().toLowerCase() ===
                String(correct).trim().toLowerCase()
              )
                score++;
            });
          }
        });
      }
    });
    return score;
  };

  /* ── Submit ── */
  const submitTest = () => {
    const score = calculateScore();
    const band  = calculateListeningBand(score);
    setSubmitted(true);
    setShowFeedbackModal(true);
    if (onComplete) onComplete(band);
  };

  /* ── Timer — auto-submit at 0:00 ── */
  const submitRef = useRef(submitTest);
  submitRef.current = submitTest; // keep ref up-to-date without restarting the interval

  useEffect(() => {
    if (submitted) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          // Auto-submit directly — no review screen, just results
          submitRef.current();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [submitted]); // eslint-disable-line

  /* ── Handlers ── */
  const updateAnswer = (questionId, value) =>
    setAnswers((prev) => ({ ...prev, [questionId]: value }));

  const toggleFlag = (questionId) =>
    setFlagged((prev) =>
      prev.includes(questionId) ? prev.filter((id) => id !== questionId) : [...prev, questionId]
    );

  /* ── Palette navigation: switch section then scroll ── */
  const handlePaletteSelect = (questionId) => {
    const targetSection = questionSectionMap[questionId];
    if (targetSection !== undefined && targetSection !== currentSection) {
      setCurrentSection(targetSection);
      // Wait for the new section to render, then scroll
      setTimeout(() => goToQuestion(questionId), 80);
    } else {
      goToQuestion(questionId);
    }
  };

  const previousSection = () => {
    if (currentSection > 0) setCurrentSection((p) => p - 1);
  };

  const nextSection = () => {
    if (currentSection < test.sections.length - 1) setCurrentSection((p) => p + 1);
  };

  /* ── Review screen ── */
  if (showReview) {
    return (
      <ListeningReview
        sections={test.sections}
        answers={answers}
        flagged={flagged}
        goToQuestion={handlePaletteSelect}
        onReturn={() => setShowReview(false)}
        onSubmit={submitTest}
      />
    );
  }

  /* ── Results screen ── */
  if (submitted) {
    return (
      <>
        <ResultsPanel test={test} answers={answers} />
        <TestFeedbackModal
          isOpen={showFeedbackModal}
          onClose={() => setShowFeedbackModal(false)}
          testType="Listening Mock Test"
          testId={test.id}
        />
      </>
    );
  }

  /* ── Progress % ── */
  const progressPct = totalQuestions ? Math.round((answeredCount / totalQuestions) * 100) : 0;

  /* ── Main render ── */
  return (
    <div className="listening-page">

      {/* Fixed timer badge */}
      <ListeningTimer minutes={minutes} seconds={seconds} />

      {/* Header bar */}
      <ListeningHeader
        title={mode === "cbt" ? "IELTS Listening" : test.title}
        section={currentSection + 1}
        totalSections={test.sections.length}
      />

      {/* Audio player */}
      <AudioPlayer
        audioUrl={test.audio}
        startTime={currentSectionData.audioStart}
        endTime={currentSectionData.audioEnd}
      />

      {/* Two-column layout */}
      <div className="listening-layout">

        {/* ── LEFT: questions ── */}
        <div className="left-panel">
          <SectionRenderer
            section={currentSectionData}
            answers={answers}
            updateAnswer={updateAnswer}
            toggleFlag={toggleFlag}
            flagged={flagged}
          />
        </div>

        {/* ── RIGHT: palette + progress ── */}
        <div className="right-panel">
          <QuestionPalette
            sections={test.sections}
            answers={answers}
            flagged={flagged}
            currentQuestion={currentQuestion}
            onSelectQuestion={handlePaletteSelect}
          />

          <div className="progress-card">
            <h3>Progress</h3>
            <h1>
              {answeredCount}{" "}
              <span style={{ fontSize: 18, color: "var(--l-muted)", fontWeight: 500 }}>
                / {totalQuestions}
              </span>
            </h1>
            <div className="progress-bar-track">
              <div
                className="progress-bar-fill"
                style={{ width: `${progressPct}%` }}
              />
            </div>
            <p className="progress-label">{progressPct}% complete</p>
          </div>
        </div>
      </div>

      {/* ── Navigation bar ── */}
      <div className="navigation-bar">
        <button
          className="secondary-btn"
          onClick={previousSection}
          disabled={currentSection === 0}
        >
          ← Previous Section
        </button>

        {currentSection < test.sections.length - 1 ? (
          <button className="primary-btn" onClick={nextSection}>
            Next Section →
          </button>
        ) : (
          <button className="primary-btn" onClick={() => setShowReview(true)}>
            Review Answers →
          </button>
        )}
      </div>
    </div>
  );
}
