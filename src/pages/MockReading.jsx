import { useState, useEffect, useRef, useMemo } from "react";
import {
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";

import { useAuth } from "../context/AuthContext";
import { useExam } from "../context/ExamContext";

import { saveResult } from "../services/resultService";
import { getIELTSBand } from "../services/BandCalculator";
import academicTests from "../data/reading/academic/academicTests";
import generalTests from "../data/reading/general/generalTests";

import QuestionRenderer from "../components/QuestionRenderer";
import QuestionPalette from "../components/QuestionPalette";

import ExamHeader from "../components/ExamHeader";
import ExamProgressBar from "../components/ExamProgressBar";

import scoreReading from "../utils/scoreReading";

import "../styles/exam/shared.css";

export default function MockReading({
  mode = "practice",
  onComplete,
}) {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();

  const { user } = useAuth();
  const { setReadingBand } = useExam();

  const isGeneral = location.pathname.includes(
    "/mock/general-reading"
  );

  const readingTests = isGeneral
    ? generalTests
    : academicTests;

  const currentTest =
    readingTests.find(
      (test) => String(test.id) === String(id)
    ) || readingTests[0];

  const [passageIndex, setPassageIndex] =
    useState(0);

  const [answers, setAnswers] = useState({});

  const [flaggedQuestions, setFlaggedQuestions] =
    useState([]);

  const [submitted, setSubmitted] =
    useState(false);

  const [reviewMode, setReviewMode] =
    useState(false);

  const [timeLeft, setTimeLeft] =
    useState(
      (currentTest?.duration || 60) * 60
    );

  const questionRefs = useRef({});

  const currentPassage =
    currentTest?.passages?.[passageIndex] ??
    null;

  const currentQuestions = useMemo(() => {
    if (
      !currentPassage ||
      !Array.isArray(currentPassage.questions)
    ) {
      return [];
    }

    return currentPassage.questions;
  }, [currentPassage]);

  const allQuestions = useMemo(() => {
    if (!currentTest?.passages) return [];

    return currentTest.passages.flatMap(
      (passage) =>
        Array.isArray(passage.questions)
          ? passage.questions
          : []
    );
  }, [currentTest]);

  const totalQuestions =
    allQuestions.length;

  const answeredQuestions =
    Object.keys(answers).length;

  const minutes = Math.floor(
    timeLeft / 60
  );

  const seconds = timeLeft % 60;

  useEffect(() => {
    if (!currentTest) return;

    setPassageIndex(0);
    setAnswers({});
    setFlaggedQuestions([]);
    setSubmitted(false);
    setReviewMode(false);
    setTimeLeft(
      (currentTest.duration || 60) * 60
    );

    questionRefs.current = {};

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [currentTest]);

  useEffect(() => {
    if (submitted || reviewMode) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);

          if (mode === "practice") {
            setSubmitted(true);
          } else {
            setReviewMode(true);
          }

          return 0;
        }

        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [submitted, reviewMode, mode]);

  useEffect(() => {
    if (timeLeft === 300) {
      alert("Only 5 minutes remaining.");
    }
  }, [timeLeft]);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [passageIndex]);

  useEffect(() => {
    if (currentTest) {
      document.title = `${currentTest.title} | NextBand`;
    }
  }, [currentTest]);

  function selectAnswer(questionId, value) {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: value,
    }));
  }

  function toggleFlag(questionId) {
    setFlaggedQuestions((prev) =>
      prev.includes(questionId)
        ? prev.filter((id) => id !== questionId)
        : [...prev, questionId]
    );
  }

  function calculateScore() {
    return scoreReading(
      allQuestions,
      answers
    ).score;
  }

  async function submitReading() {
    if (answeredQuestions === 0) {
      alert(
        "Please answer at least one question."
      );
      return;
    }

    const score = calculateScore();

    const band =
      getIELTSBand(score);

    setReadingBand(band);

    if (user) {
      await saveResult({
        userId: user.uid,
        type: "reading",
        score,
        band,
        totalQuestions,
        answers,
      });
    }

    onComplete?.(band);

    setSubmitted(true);
  }

  function restartTest() {
    if (
      !window.confirm(
        "Restart this reading test?"
      )
    ) {
      return;
    }

    setAnswers({});
    setFlaggedQuestions([]);
    setSubmitted(false);
    setReviewMode(false);
    setPassageIndex(0);
    setTimeLeft(
      (currentTest.duration || 60) * 60
    );

    questionRefs.current = {};
  }

  if (!currentTest) {
    return (
      <div className="exam-error">
        <h2>Reading Test Not Found</h2>
      </div>
    );
  }

  if (!currentPassage) {
    return (
      <div className="exam-error">
        <h2>Passage Not Found</h2>
      </div>
    );
  }

  if (!Array.isArray(currentPassage.questions)) {
    return (
      <div
        style={{
          padding: "40px",
          color: "#b91c1c",
        }}
      >
        <h2>Invalid Reading Data</h2>

        <p>
          The current passage does not contain a
          valid questions array.
        </p>

        <pre
          style={{
            background: "#f3f4f6",
            padding: "20px",
            overflow: "auto",
          }}
        >
          {JSON.stringify(
            currentPassage,
            null,
            2
          )}
        </pre>
      </div>
    );
  }/* ==========================================================
      RESULTS SCREEN
========================================================== */

if (submitted) {
  const score = calculateScore();
  const band = getIELTSBand(score);

  return (
    <div
      style={{
        maxWidth: "1100px",
        margin: "40px auto",
        padding: "30px",
      }}
    >
      <h1>🎉 IELTS Reading Results</h1>

      <div
        style={{
          marginTop: "30px",
          background: "#fff",
          borderRadius: "18px",
          padding: "30px",
          boxShadow: "0 10px 30px rgba(0,0,0,.08)",
        }}
      >
        <h2 style={{ marginBottom: "20px" }}>
          {currentTest.title}
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit,minmax(220px,1fr))",
            gap: "20px",
          }}
        >
          <div>
            <h3>Correct Answers</h3>
            <h1>
              {score}/{totalQuestions}
            </h1>
          </div>

          <div>
            <h3>Estimated Band</h3>
            <h1>{band}</h1>
          </div>

          <div>
            <h3>Answered</h3>
            <h1>
              {answeredQuestions}/{totalQuestions}
            </h1>
          </div>

          <div>
            <h3>Accuracy</h3>
            <h1>
              {totalQuestions
                ? (
                    (score /
                      totalQuestions) *
                    100
                  ).toFixed(1)
                : 0}
              %
            </h1>
          </div>
        </div>
      </div>

      <div
        style={{
          display: "flex",
          gap: "15px",
          marginTop: "35px",
          flexWrap: "wrap",
        }}
      >
        <button
          className="primary-btn"
          onClick={restartTest}
        >
          🔄 Restart Test
        </button>

        <button
          onClick={() =>
            setReviewMode(true)
          }
        >
          📖 Review Answers
        </button>

        <button
          onClick={() =>
            navigate(
              isGeneral
                ? "/reading/general"
                : "/reading/academic"
            )
          }
        >
          🏠 Reading Centre
        </button>
      </div>
    </div>
  );
}

/* ==========================================================
      REVIEW SCREEN
========================================================== */

if (reviewMode) {
  const score = calculateScore();
  const band = getIELTSBand(score);

  const unanswered =
    totalQuestions - answeredQuestions;

  return (
    <div
      style={{
        maxWidth: "1100px",
        margin: "40px auto",
        padding: "30px",
      }}
    >
      <h1>📖 Review Reading Test</h1>

      <div
        style={{
          marginTop: "30px",
          background: "#fff",
          borderRadius: "18px",
          padding: "30px",
          boxShadow: "0 10px 30px rgba(0,0,0,.08)",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit,minmax(220px,1fr))",
            gap: "20px",
          }}
        >
          <div>
            <strong>
              Total Questions
            </strong>

            <h2>{totalQuestions}</h2>
          </div>

          <div>
            <strong>
              Answered
            </strong>

            <h2>
              {answeredQuestions}
            </h2>
          </div>

          <div>
            <strong>
              Unanswered
            </strong>

            <h2>{unanswered}</h2>
          </div>

          <div>
            <strong>
              Estimated Band
            </strong>

            <h2>{band}</h2>
          </div>

          <div>
            <strong>
              Current Score
            </strong>

            <h2>
              {score}/{totalQuestions}
            </h2>
          </div>
        </div>
      </div>

      <div
        style={{
          display: "flex",
          gap: "15px",
          marginTop: "35px",
          flexWrap: "wrap",
        }}
      >
        <button
          onClick={() =>
            setReviewMode(false)
          }
        >
          ← Back To Test
        </button>

        <button
          className="primary-btn"
          onClick={() => {
            if (
              window.confirm(
                "Submit Reading Test?"
              )
            ) {
              submitReading();
            }
          }}
        >
          ✅ Submit Reading
        </button>

        <button
          onClick={restartTest}
        >
          🔄 Restart
        </button>
      </div>
    </div>
  );
}return (
  <div
    style={{
      minHeight: "100vh",
      padding: "30px",
      maxWidth: "1500px",
      margin: "0 auto",
    }}
  >
    {/* =====================================
        TEST SELECTOR
    ===================================== */}

    {mode === "practice" && (
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "20px",
          marginBottom: "25px",
          flexWrap: "wrap",
        }}
      >
        <select
          value={String(currentTest.id)}
          onChange={(e) => {
            const selectedId = e.target.value;

            navigate(
              isGeneral
                ? `/mock/general-reading/${selectedId}`
                : `/mock/reading/${selectedId}`
            );
          }}
          style={{
            padding: "12px 18px",
            borderRadius: "10px",
            minWidth: "320px",
          }}
        >
          {readingTests.map((test) => (
            <option
              key={test.id}
              value={String(test.id)}
            >
              {test.title}
            </option>
          ))}
        </select>

        <div
          style={{
            display: "flex",
            gap: "20px",
            fontWeight: 600,
          }}
        >
          <span>
            Passage {passageIndex + 1} /{" "}
            {currentTest.passages.length}
          </span>

          <span>
            Answered {answeredQuestions} /{" "}
            {totalQuestions}
          </span>
        </div>
      </div>
    )}

    <ExamHeader
      title={currentTest.title}
      minutes={minutes}
      seconds={seconds}
    />

    <ExamProgressBar
      answered={answeredQuestions}
      total={totalQuestions}
    />

    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1.35fr 1fr",
        gap: "30px",
        marginTop: "25px",
      }}
    >
      {/* ================= PASSAGE ================= */}

      <div
        style={{
          background: "#fff",
          borderRadius: "18px",
          padding: "30px",
          overflowY: "auto",
          height: "calc(100vh - 210px)",
        }}
      >
      <h2
  style={{
    marginBottom: "25px",
    fontSize: "28px",
  }}
>
  {currentPassage.title}
</h2>

{currentPassage.subtitle && (
  <p
    style={{
      marginBottom: "25px",
      fontWeight: 600,
      color: "#555",
    }}
  >
    {currentPassage.subtitle}
  </p>
)}

{currentPassage.content ? (
  currentPassage.content
    .trim()
    .split("\n\n")
    .map((paragraph, index) => (
      <p
        key={index}
        style={{
          whiteSpace: "pre-wrap",
          lineHeight: "2",
          fontSize: "17px",
          textAlign: "justify",
          marginBottom: "26px",
        }}
      >
        {paragraph}
      </p>
    ))
) : Array.isArray(currentPassage.texts) ? (
  currentPassage.texts.map((text) => (
    <div
      key={text.id}
      style={{ marginBottom: "40px" }}
    >
      <h3
        style={{
          marginBottom: "15px",
          color: "#2563eb",
        }}
      >
        {text.id}. {text.title}
      </h3>

      {text.content
        .trim()
        .split("\n\n")
        .map((paragraph, index) => (
          <p
            key={`${text.id}-${index}`}
            style={{
              whiteSpace: "pre-wrap",
              lineHeight: "2",
              fontSize: "17px",
              textAlign: "justify",
              marginBottom: "22px",
            }}
          >
            {paragraph}
          </p>
        ))}
    </div>
  ))
) : (
  <p style={{ color: "red" }}>
    Passage data is missing.
  </p>
)}
      </div>

      {/* ================= QUESTIONS ================= */}

      <div
        style={{
          background: "#fff",
          borderRadius: "18px",
          padding: "25px",
          overflowY: "auto",
          height: "calc(100vh - 210px)",
        }}
      >
        <QuestionPalette
          questions={currentQuestions}
          answers={answers}
          flaggedQuestions={flaggedQuestions}
          onQuestionClick={(id) => {
            questionRefs.current[id]?.scrollIntoView({
              behavior: "smooth",
              block: "start",
            });
          }}
        />

        {currentQuestions.map((question) => (
          <div
            key={question.id}
            ref={(el) =>
              (questionRefs.current[question.id] = el)
            }
            style={{
              marginTop: "35px",
              marginBottom: "45px",
              paddingBottom: "30px",
              borderBottom:
                "1px solid #e5e7eb",
            }}
          >
            {question.instruction && (
              <p
                style={{
                  color: "#2563eb",
                  fontWeight: 600,
                  marginBottom: "14px",
                }}
              >
                {question.instruction}
              </p>
            )}

            <h3
              style={{
                marginBottom: "18px",
              }}
            >
              {question.id}.{" "}
              {question.question}
            </h3>

            <QuestionRenderer
              question={question}
              value={answers[question.id]}
              onChange={selectAnswer}
            />

            <button
              style={{
                marginTop: "18px",
                padding: "8px 14px",
                borderRadius: "8px",
                cursor: "pointer",
              }}
              onClick={() =>
                toggleFlag(question.id)
              }
            >
              {flaggedQuestions.includes(
                question.id
              )
                ? "🚩 Remove Flag"
                : "🚩 Flag Question"}
            </button>
                    </div>
        ))}
        {/* =====================================
            PASSAGE NAVIGATION
        ===================================== */}

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            gap: "12px",
            marginTop: "30px",
          }}
        >
          <button
            disabled={passageIndex === 0}
            onClick={() =>
              setPassageIndex((prev) => prev - 1)
            }
          >
            ← Previous Passage
          </button>

          {passageIndex <
          currentTest.passages.length - 1 ? (
            <button
              onClick={() =>
                setPassageIndex((prev) => prev + 1)
              }
            >
              Next Passage →
            </button>
          ) : (
            <button
              className="primary-btn"
              onClick={() => setReviewMode(true)}
            >
              Review Answers →
            </button>
          )}
        </div>

        {/* =====================================
            EXAM STATS
        ===================================== */}

        <div
          style={{
            marginTop: "35px",
            background: "#f8fafc",
            borderRadius: "14px",
            padding: "18px",
            display: "flex",
            justifyContent: "space-between",
            fontWeight: 600,
            flexWrap: "wrap",
            gap: "12px",
          }}
        >
          <span>
            Answered: {answeredQuestions}/{totalQuestions}
          </span>

          <span>
            Flagged: {flaggedQuestions.length}
          </span>

          <span>
            Remaining: {totalQuestions - answeredQuestions}
          </span>
        </div>
      </div>
    </div>
  </div>
);
}