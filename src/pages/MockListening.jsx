import "../styles/exam/shared.css";

import { useEffect, useState } from "react";

import { useExam } from "../context/ExamContext";

import { getIELTSListeningBand } from "../services/bandCalculator";

import ReviewModal from "../components/ReviewModal";
import QuestionNavigator from "../components/QuestionNavigator";
import AudioPlayer from "../components/AudioPlayer";

import listeningTests from "../data/listening/tests";

export default function MockListening({

  mode = "practice",

  onComplete,

  testId,

}) {

  const { setListeningBand } = useExam();

  const [test, setTest] = useState(
    listeningTests[testId ?? 0]
  );

  const [answers, setAnswers] =
    useState({});

  const [submitted, setSubmitted] =
    useState(false);

  const [showReview, setShowReview] =
    useState(false);

  const [currentSection, setCurrentSection] =
    useState(0);

  const [timeLeft, setTimeLeft] =
    useState(
      (test.duration || 30) * 60
    );

  useEffect(() => {

    const timer = setInterval(() => {

      setTimeLeft((prev) => {

        if (prev <= 1) {

          clearInterval(timer);

          setShowReview(true);

          return 0;

        }

        return prev - 1;

      });

    }, 1000);

    return () => clearInterval(timer);

  }, []);

  useEffect(() => {

    if (timeLeft === 300) {

      alert(
        "Only 5 minutes remaining."
      );

    }

  }, [timeLeft]);

  useEffect(() => {

    if (!submitted) return;

    const score =
      calculateScore();

    const band =
      getIELTSListeningBand(score);

    setListeningBand(band);

    if (onComplete) {

      onComplete(band);

    }

  }, [submitted]);

  function updateAnswer(
    questionId,
    value
  ) {

    setAnswers((prev) => ({
      ...prev,
      [questionId]: value,
    }));

  }

  function calculateScore() {

    let score = 0;

    test.sections.forEach(
      (section) => {

        section.questions.forEach(
          (question) => {

            const userAnswer =
              String(
                answers[question.id] || ""
              )
                .trim()
                .toLowerCase();

            const correctAnswer =
              String(question.answer)
                .trim()
                .toLowerCase();

            if (
              userAnswer === correctAnswer
            ) {

              score++;

            }

          }
        );

      }
    );

    return score;

  }

  const totalQuestions =
    test.sections.reduce(

      (total, section) =>

        total +
        section.questions.length,

      0

    );

  const answeredQuestions =
    Object.keys(answers).length;

  const minutes =
    Math.floor(timeLeft / 60);

  const seconds =
    timeLeft % 60;

  if (!test || !test.sections) {

    return (

      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >

        <h2>
          Loading Listening Test...
        </h2>

      </div>

    );

  }

  if (submitted) {

    const score =
      calculateScore();

    const band =
      getIELTSListeningBand(score);

    const result = {

      testId: test.id,

      testTitle: test.title,

      score,

      band,

      completedAt:
        new Date().toISOString(),

    };

    const previous =
      JSON.parse(
        localStorage.getItem(
          "listeningResults"
        ) || "[]"
      );

    localStorage.setItem(

      "listeningResults",

      JSON.stringify([
        ...previous,
        result,
      ])

    );
        return (
      <>
        {showReview && (
          <ReviewModal
            totalQuestions={totalQuestions}
            answers={answers}
            onClose={() =>
              setShowReview(false)
            }
            onSubmit={() => {
              setShowReview(false);
              setSubmitted(true);
            }}
          />
        )}

        <div
          style={{
            padding: "40px",
            maxWidth: "900px",
            margin: "0 auto",
          }}
        >
          <h1>IELTS Listening Results</h1>

          <div
            style={{
              background: "#fff",
              padding: "25px",
              borderRadius: "16px",
              marginTop: "20px",
            }}
          >
            <h2>
              Test: {test.title}
            </h2>

            <h2>
              Score: {score}/
              {totalQuestions}
            </h2>

            <h2>
              Estimated Band: {band}
            </h2>

            <h3>
              Answered:{" "}
              {answeredQuestions}/
              {totalQuestions}
            </h3>
          </div>

          <button
            className="primary-btn"
            style={{
              marginTop: "20px",
            }}
            onClick={() => {
              setAnswers({});
              setSubmitted(false);
              setShowReview(false);
              setCurrentSection(0);
              setTimeLeft(
                (test.duration || 30) *
                  60
              );

              if (
                mode === "practice"
              ) {
                setTest(
                  listeningTests[
                    testId ?? 0
                  ]
                );
              }
            }}
          >
            Restart Test
          </button>
        </div>
      </>
    );
  }

  return (
    <>
      {showReview && (
        <ReviewModal
          totalQuestions={
            totalQuestions
          }
          answers={answers}
          onClose={() =>
            setShowReview(false)
          }
          onSubmit={() => {
            setShowReview(false);
            setSubmitted(true);
          }}
        />
      )}

      <div
        style={{
          minHeight: "100vh",
          padding: "30px",
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent:
              "space-between",
            marginBottom: "20px",
          }}
        >
          <div>
            <h1>
              IELTS Listening Test
            </h1>

            <p>{test.title}</p>
          </div>

          <h2>
            {minutes}:
            {String(seconds).padStart(
              2,
              "0"
            )}
          </h2>
        </div>

        {mode ===
          "practice" && (
          <select
            value={test.id}
            onChange={(e) => {
              const selected =
                listeningTests.find(
                  (t) =>
                    t.id ===
                    Number(
                      e.target.value
                    )
                );

              setTest(selected);

              setAnswers({});

              setSubmitted(false);

              setShowReview(false);

              setCurrentSection(0);

              setTimeLeft(
                (selected.duration ||
                  30) * 60
              );
            }}
            style={{
              padding: "10px",
              marginBottom:
                "20px",
            }}
          >
            {listeningTests.map(
              (t) => (
                <option
                  key={t.id}
                  value={t.id}
                >
                  {t.title}
                </option>
              )
            )}
          </select>
        )}

        <QuestionNavigator
          totalQuestions={
            totalQuestions
          }
          answers={answers}
        />

        <AudioPlayer
          audioUrl={
            test.sections[
              currentSection
            ].audio
          }
        />

        {(() => {
          const section =
            test.sections[
              currentSection
            ];

          return (
            <div
              style={{
                background:
                  "#fff",
                padding: "20px",
                borderRadius:
                  "16px",
                marginTop: "20px",
                marginBottom:
                  "20px",
              }}
            >
              <h2>
                {section.title}
              </h2>
                            {section.questions.map(
                (question) => (
                  <div
                    key={question.id}
                    style={{
                      marginBottom:
                        "20px",
                    }}
                  >
                    <p>
                      <strong>
                        {question.id}.
                      </strong>{" "}
                      {
                        question.question
                      }
                    </p>

                    <input
                      type="text"
                      value={
                        answers[
                          question.id
                        ] || ""
                      }
                      onChange={(e) =>
                        updateAnswer(
                          question.id,
                          e.target.value
                        )
                      }
                      style={{
                        width: "100%",
                        padding:
                          "10px",
                        border:
                          "1px solid #d1d5db",
                        borderRadius:
                          "8px",
                      }}
                    />
                  </div>
                )
              )}
            </div>
          );
        })()}

        <div
          style={{
            display: "flex",
            justifyContent:
              "space-between",
            marginTop: "20px",
          }}
        >
          <button
            disabled={
              currentSection === 0
            }
            onClick={() =>
              setCurrentSection(
                (prev) =>
                  prev - 1
              )
            }
          >
            Previous
          </button>

          {currentSection <
          test.sections.length -
            1 ? (
            <button
              className="primary-btn"
              onClick={() =>
                setCurrentSection(
                  (prev) =>
                    prev + 1
                )
              }
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
              Review & Submit →
            </button>
          )}
        </div>
      </div>
    </>
  );
}