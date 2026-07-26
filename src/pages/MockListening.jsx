import { useEffect, useMemo, useState } from "react";

import listeningTests from "../data/listening/tests";
import "../styles/listening/listening.css";
import ListeningHeader from "../components/listening/ListeningHeader";
import ListeningTimer from "../components/listening/ListeningTimer";
import AudioPlayer from "../components/listening/AudioPlayer";
import SectionRenderer from "../components/listening/SectionRenderer";
import QuestionPalette from "../components/listening/renderers/QuestionPalette";
import ListeningReview from "../components/listening/ListeningReview";
import ResultsPanel from "../components/listening/ResultsPanel";

import { calculateListeningBand } from "../utils/listeningBandCalculator";
import useQuestionNavigation from "../hooks/useQuestionNavigation";
import useScrollSpy from "../hooks/useScrollSpy";
import useAutosave from "../hooks/useAutosave";
import useRestoreListening from "../hooks/useRestoreListening";

import "../styles/listening/listening.css";
export default function MockListening({

    testId = 0,

    mode = "practice",

    onComplete,

}) {

    // -----------------------------
    // Load Test
    // -----------------------------

    const test = listeningTests[testId];

    if (!test) {

        return <h2>Listening Test Not Found</h2>;

    }

    // -----------------------------
    // Restore Progress
    // -----------------------------

    const savedProgress = useRestoreListening(

        test.id

    );

    // -----------------------------
    // States
    // -----------------------------

    const [answers, setAnswers] = useState(

        savedProgress?.answers || {}

    );

    const [currentSection, setCurrentSection] = useState(

        savedProgress?.currentSection || 0

    );

    const [flagged, setFlagged] = useState(

        savedProgress?.flagged || []

    );

    const [submitted, setSubmitted] = useState(false);

    const [showReview, setShowReview] = useState(false);

    const [timeLeft, setTimeLeft] = useState(

        savedProgress?.timeLeft ||

        test.duration * 60

    );

    // -----------------------------
    // Navigation Hook
    // -----------------------------

    const {

        currentQuestion,

        goToQuestion,

        setCurrentQuestion,

    } = useQuestionNavigation();

    useEffect(() => {

        if (savedProgress?.currentQuestion) {

            setCurrentQuestion(

                savedProgress.currentQuestion

            );

        }

    }, []);

    useScrollSpy(

        setCurrentQuestion

    );

    // -----------------------------
    // Autosave
    // -----------------------------

    useAutosave({

        testId: test.id,

        answers,

        currentSection,

        currentQuestion,

        timeLeft,

    });

    // -----------------------------
    // Current Section
    // -----------------------------

    const currentSectionData =

        test.sections[currentSection];

    // -----------------------------
    // Count Questions
    // -----------------------------

    const totalQuestions = useMemo(() => {
  let total = 0;

  test.sections.forEach((section) => {
    // Section 1
    if (section.form) {
      total += section.form.length;
    }

    // Sections 2–4
    section.groups?.forEach((group) => {
      switch (group.type) {
        case "mcq":
        case "matching":
        case "map":
          total += group.questions.length;
          break;

        case "notes":
          total += group.notes.filter(
            (item) => item.type === "blank"
          ).length;
          break;

        case "table":
          total += group.rows.length;
          break;

        case "flowchart":
          total += group.steps.filter(
            (step) => step.type === "blank"
          ).length;
          break;

        default:
          break;
      }
    });
  });

  return total;
}, [test]);

    // -----------------------------
    // Progress
    // -----------------------------

    const answeredQuestions =

        Object.keys(answers).length;

    const minutes =

        Math.floor(timeLeft / 60);

    const seconds =

        String(timeLeft % 60)

            .padStart(2, "0");

    // -----------------------------
    // Timer
    // -----------------------------

    useEffect(() => {

        if (submitted) return;

        const timer = setInterval(() => {

            setTimeLeft(prev => {

                if (prev <= 1) {

                    clearInterval(timer);

                    setShowReview(true);

                    return 0;

                }

                return prev - 1;

            });

        }, 1000);

        return () => clearInterval(timer);

    }, [submitted]);
        // -----------------------------
    // Update Answer
    // -----------------------------

    const updateAnswer = (questionId, value) => {

        setAnswers(prev => ({

            ...prev,

            [questionId]: value,

        }));

    };

    // -----------------------------
    // Flag / Unflag Question
    // -----------------------------

    const toggleFlag = (questionId) => {

        setFlagged(prev =>

            prev.includes(questionId)

                ? prev.filter(id => id !== questionId)

                : [...prev, questionId]

        );

    };

    // -----------------------------
    // Calculate Raw Score
    // -----------------------------

    const calculateScore = () => {

        let score = 0;

        test.sections.forEach(section => {

            // -------- Section 1 --------

            if (section.form) {

                section.form.forEach(item => {

                    const user =

                        String(

                            answers[item.id] || ""

                        )

                        .trim()

                        .toLowerCase();

                    const correct =

                        String(item.answer)

                        .trim()

                        .toLowerCase();

                    if (user === correct) {

                        score++;

                    }

                });

            }

            // -------- Sections 2–4 --------

            if (section.groups) {

                section.groups.forEach(group => {

                    // MCQ / Matching / Map

                    if (group.questions) {

                        group.questions.forEach(question => {

                            const user =

                                String(

                                    answers[question.id] || ""

                                )

                                .trim()

                                .toLowerCase();

                            const correct =

                                String(question.answer)

                                .trim()

                                .toLowerCase();

                            if (user === correct) {

                                score++;

                            }

                        });

                    }

                    // Notes Completion

                    if (group.notes) {

                        group.notes.forEach(item => {

                            if (item.type !== "blank") return;

                            const user =

                                String(

                                    answers[item.id] || ""

                                )

                                .trim()

                                .toLowerCase();

                            const correct =

                                String(item.answer)

                                .trim()

                                .toLowerCase();

                            if (user === correct) {

                                score++;

                            }

                        });

                    }

                });

            }

        });

        return score;

    };

    // -----------------------------
    // Previous Section
    // -----------------------------

    const previousSection = () => {

        if (currentSection > 0) {

            setCurrentSection(prev => prev - 1);

        }

    };

    // -----------------------------
    // Next Section
    // -----------------------------

    const nextSection = () => {

        if (

            currentSection <

            test.sections.length - 1

        ) {

            setCurrentSection(prev => prev + 1);

        }

    };

    // -----------------------------
    // Submit Test
    // -----------------------------

    const submitTest = () => {

        localStorage.removeItem(

            `knarrow_listening-${test.id}`

        );

        const score = calculateScore();
        const band = calculateListeningBand(score);

        setSubmitted(true);

        if (onComplete) {
            onComplete(band);
        }

    };

    // -----------------------------
    // Review Screen
    // -----------------------------

    if (showReview) {

        return (

            <ListeningReview

                sections={test.sections}

                answers={answers}

                flagged={flagged}

                goToQuestion={goToQuestion}

                onReturn={() =>

                    setShowReview(false)

                }

                onSubmit={submitTest}

            />

        );

    }

    // -----------------------------
    // Results Screen
    // -----------------------------

    if (submitted) {

        return (

            <ResultsPanel

                test={test}

                answers={answers}

                score={calculateScore()}

            />

        );

    }
        return (

        <div className="listening-page">

            <ListeningHeader

                title={test.title}

                section={currentSection + 1}

                totalSections={test.sections.length}

            />

            <ListeningTimer

                minutes={minutes}

                seconds={seconds}

            />

           <AudioPlayer
    audioUrl={test.audio}
    startTime={currentSectionData.audioStart}
    endTime={currentSectionData.audioEnd}
/>

            <div className="listening-layout">

                {/* ---------------- LEFT PANEL ---------------- */}

                <div className="left-panel">

                    <SectionRenderer

                        section={currentSectionData}

                        answers={answers}

                        updateAnswer={updateAnswer}

                        toggleFlag={toggleFlag}

                        flagged={flagged}

                    />

                </div>

                {/* ---------------- RIGHT PANEL ---------------- */}

                <div className="right-panel">

                    <QuestionPalette

                        sections={test.sections}

                        answers={answers}

                        flagged={flagged}

                        currentQuestion={currentQuestion}

                        onSelectQuestion={goToQuestion}

                    />

                    <div className="progress-card">

                        <h3>

                            Progress

                        </h3>

                        <h1>

                            {answeredQuestions} / {totalQuestions}

                        </h1>

                        <progress

                            value={answeredQuestions}

                            max={totalQuestions}

                            style={{

                                width: "100%",

                                height: "12px",

                                marginTop: "15px",

                            }}

                        />

                        <p

                            style={{

                                marginTop: "10px",

                                color: "#666",

                            }}

                        >

                            {

                                totalQuestions

                                    ? Math.round(

                                          answeredQuestions /

                                              totalQuestions *

                                              100

                                      )

                                    : 0

                            }

                            % Complete

                        </p>

                    </div>

                </div>

            </div>

            {/* ---------------- NAVIGATION ---------------- */}

            <div className="navigation-bar">

                <button

                    onClick={previousSection}

                    disabled={currentSection === 0}

                >

                    ← Previous Section

                </button>

                {

                    currentSection <

                    test.sections.length - 1

                    ? (

                        <button

                            className="primary-btn"

                            onClick={nextSection}

                        >

                            Next Section →

                        </button>

                    ) : (

                        <button

                            className="primary-btn"

                            onClick={() =>

                                setShowReview(true)

                            }

                        >

                            Review Answers

                        </button>

                    )

                }

            </div>

        </div>

    );

}