import {
  useExam,
} from "../context/ExamContext";
import { useEffect, useState } from "react";

import readingTests from "../data/reading/tests";

import QuestionRenderer from "../components/QuestionRenderer";
import QuestionPalette from "../components/QuestionPalette";

import ExamHeader from "../components/ExamHeader";
import ExamProgressBar from "../components/ExamProgressBar";

export default function MockReading() {
  const {
  setReadingBand,
} = useExam();
  const [testIndex, setTestIndex] =
    useState(0);

  const [passageIndex, setPassageIndex] =
    useState(0);

  const [answers, setAnswers] =
    useState({});

  const [submitted, setSubmitted] =
    useState(false);

  const [reviewMode, setReviewMode] =
    useState(false);

  const [timeLeft, setTimeLeft] =
    useState(60 * 60);

  const currentTest =
    readingTests[testIndex];

  const currentPassage =
    currentTest?.passages?.[
      passageIndex
    ];

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);

          setSubmitted(true);

          return 0;
        }

        return prev - 1;
      });
    }, 1000);

    return () =>
      clearInterval(timer);
  }, []);

  function selectAnswer(
    questionId,
    answer
  ) {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: answer,
    }));
  }

  function calculateScore() {
    let score = 0;

    currentTest.passages.forEach(
      (passage) => {
        passage.questions.forEach(
          (question) => {
            const userAnswer =
              String(
                answers[
                  question.id
                ] || ""
              )
                .trim()
                .toLowerCase();

            const correctAnswer =
              String(
                question.answer
              )
                .trim()
                .toLowerCase();

            if (
              userAnswer ===
              correctAnswer
            ) {
              score++;
            }
          }
        );
      }
    );

    return score;
  }

  function getBand(score) {
    if (score >= 39) return 9;
    if (score >= 37) return 8.5;
    if (score >= 35) return 8;
    if (score >= 32) return 7.5;
    if (score >= 30) return 7;
    if (score >= 27) return 6.5;
    if (score >= 23) return 6;
    if (score >= 19) return 5.5;
    if (score >= 15) return 5;

    return 4;
  }

  const totalQuestions =
    currentTest.passages.reduce(
      (
        total,
        passage
      ) =>
        total +
        passage.questions.length,
      0
    );

  const answeredQuestions =
    Object.keys(
      answers
    ).length;

  const minutes =
    Math.floor(timeLeft / 60);

  const seconds =
    timeLeft % 60;

  if (
    !currentTest ||
    !currentPassage
  ) {
    return (
      <div
        style={{
          padding: "40px",
        }}
      >
        Loading...
      </div>
    );
  }

  if (submitted) {
    const score =
      calculateScore();

    const band =
      getBand(score);

      setReadingBand(band);

    return (
      <div
        style={{
          minHeight: "100vh",
          padding: "40px",
          maxWidth: "1000px",
          margin: "0 auto",
        }}
      >
        <h1>
          IELTS Reading Results
        </h1>

        <div
          style={{
            background:
              "#fff",
            padding: "30px",
            borderRadius:
              "16px",
            marginTop: "20px",
          }}
        >
          <h2>
            Score:
            {" "}
            {score}/
            {totalQuestions}
          </h2>

          <h2>
            Estimated Band:
            {" "}
            {band}
          </h2>

          <h3>
            Answered:
            {" "}
            {
              answeredQuestions
            }
            /
            {
              totalQuestions
            }
          </h3>
        </div>

        <button
          className="primary-btn"
          style={{
            marginTop: "20px",
          }}
          onClick={() =>
            window.location.reload()
          }
        >
          Restart Test
        </button>
      </div>
    );
  }

  if (reviewMode) {
    return (
      <div
        style={{
          minHeight: "100vh",
          padding: "40px",
          maxWidth: "900px",
          margin: "0 auto",
        }}
      >
        <h1>
          Review Answers
        </h1>

        <div
          style={{
            background:
              "#fff",
            padding: "25px",
            borderRadius:
              "16px",
            marginTop: "20px",
          }}
        >
          <h2>
            Total Questions:
            {" "}
            {
              totalQuestions
            }
          </h2>

          <h2>
            Answered:
            {" "}
            {
              answeredQuestions
            }
          </h2>

          <h2>
            Unanswered:
            {" "}
            {
              totalQuestions -
              answeredQuestions
            }
          </h2>

          <div
            style={{
              display: "flex",
              gap: "10px",
              marginTop: "20px",
            }}
          >
            <button
              onClick={() =>
                setReviewMode(
                  false
                )
              }
            >
              Back To Test
            </button>

            <button
              className="primary-btn"
              onClick={() =>
                setSubmitted(
                  true
                )
              }
            >
              Submit Exam
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "30px",
        maxWidth: "1400px",
        margin: "0 auto",
      }}
    >
      <ExamHeader
        title="IELTS Reading Test"
        minutes={minutes}
        seconds={seconds}
      />

      <ExamProgressBar
        answered={
          answeredQuestions
        }
        total={
          totalQuestions
        }
      />

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "1.3fr 1fr",
          gap: "30px",
        }}
      >
        <div
          style={{
            background:
              "#ffffff",
            padding:
              "25px",
            borderRadius:
              "16px",
            lineHeight:
              "1.9",
            height:
              "calc(100vh - 220px)",
            overflowY:
              "auto",
          }}
        >
          <h2>
            {
              currentPassage.title
            }
          </h2>

          <p>
            {
              currentPassage.content
            }
          </p>
        </div>

        <div
          style={{
            background:
              "#ffffff",
            padding:
              "25px",
            borderRadius:
              "16px",
            height:
              "calc(100vh - 220px)",
            overflowY:
              "auto",
          }}
        >
          <QuestionPalette
            questions={
              currentPassage.questions
            }
            answers={answers}
          />

          {currentPassage.questions.map(
            (question) => (
              <div
                key={
                  question.id
                }
                style={{
                  marginBottom:
                    "30px",
                }}
              >
                <p>
                  <strong>
                    {
                      question.id
                    }
                    .
                  </strong>{" "}
                  {
                    question.question
                  }
                </p>

                <QuestionRenderer
                  question={
                    question
                  }
                  value={
                    answers[
                      question.id
                    ]
                  }
                  onChange={
                    selectAnswer
                  }
                />
              </div>
            )
          )}

          <div
            style={{
              display: "flex",
              gap: "10px",
              marginTop: "20px",
            }}
          >
            <button
              disabled={
                passageIndex ===
                0
              }
              onClick={() =>
                setPassageIndex(
                  (
                    prev
                  ) =>
                    prev - 1
                )
              }
            >
              Previous
            </button>

            <button
              disabled={
                passageIndex ===
                currentTest
                  .passages
                  .length -
                1
              }
              onClick={() =>
                setPassageIndex(
                  (
                    prev
                  ) =>
                    prev + 1
                )
              }
            >
              Next
            </button>

            <button
              className="primary-btn"
              onClick={() =>
                setReviewMode(
                  true
                )
              }
            >
              Review Answers
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

