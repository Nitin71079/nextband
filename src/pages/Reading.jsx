import {
  useState,
  useEffect,
  useRef
} from "react";

import { readingMocks } from "../data/readingMocks";

import {
  collection,
  addDoc
} from "firebase/firestore";

import { db } from "../firebase";

import { useAuth } from "../context/AuthContext";

export default function Reading() {
  const [answers, setAnswers] =
    useState(() => {
      const saved =
        localStorage.getItem(
          "readingAnswers"
        );

      return saved
        ? JSON.parse(saved)
        : {};
    });

  const [submitted, setSubmitted] =
    useState(false);

  const [currentSection, setCurrentSection] =
    useState(0);

  const [timeLeft, setTimeLeft] =
    useState(60 * 60);

  const questionRefs = useRef([]);

  const currentMock =
    readingMocks[0];

  const { user } =
    useAuth();

  const currentPassage =
    currentMock.sections[
      currentSection
    ];

  useEffect(() => {
    localStorage.setItem(
      "readingAnswers",
      JSON.stringify(answers)
    );
  }, [answers]);

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

    return () => clearInterval(timer);
  }, []);

  const minutes = Math.floor(
    timeLeft / 60
  );

  const seconds =
    timeLeft % 60;

  const totalQuestions =
    currentMock.sections.reduce(
      (total, section) =>
        total +
        section.questions.length,
      0
    );

  let correctAnswers = 0;

  currentMock.sections.forEach(
    (section, sectionIndex) => {
      section.questions.forEach(
        (question, qIndex) => {
          const key =
            `${sectionIndex}-${qIndex}`;

          if (
            answers[key] ===
            question.answer
          ) {
            correctAnswers++;
          }
        }
      );
    }
  );

  const calculateBand = (
    score
  ) => {
    if (score >= 39) return 9;
    if (score >= 37) return 8.5;
    if (score >= 35) return 8;
    if (score >= 32) return 7.5;
    if (score >= 30) return 7;
    if (score >= 26) return 6.5;
    if (score >= 23) return 6;

    return 5;
  };

  const estimatedBand =
    calculateBand(correctAnswers);

  const saveResults =
    async () => {
      try {
        console.log(
          "Starting Firestore save..."
        );

        console.log(
          "Current user:",
          user
        );

        await addDoc(
          collection(
            db,
            "readingResults"
          ),
          {
            userId:
              user?.uid || "guest",

            email:
              user?.email ||
              "guest",

            score:
              correctAnswers,

            totalQuestions,

            estimatedBand,

            createdAt:
              new Date()
          }
        );

        console.log(
          "Firestore save success"
        );

        alert(
          "Results saved successfully."
        );
      } catch (error) {
        console.error(
          "Firestore error:",
          error
        );

        alert(
          error.message
        );
      }
    };

  return (
    <div
      style={{
        background: "#f1f5f9",
        minHeight: "100vh",
        fontFamily: "Arial"
      }}
    >
      <header
        style={{
          background: "#0f172a",
          color: "white",
          padding: "20px 40px",
          position: "sticky",
          top: 0,
          zIndex: 1000,
          display: "flex",
          justifyContent:
            "space-between",
          alignItems: "center"
        }}
      >
        <div>
          <h1>
            {currentMock.title}
          </h1>

          <p>
            IELTS Academic Reading
            Simulation
          </p>
        </div>

        <div
          style={{
            background: "#22d3ee",
            color: "black",
            padding: "14px 24px",
            borderRadius: "14px",
            fontWeight: "bold",
            fontSize: "24px"
          }}
        >
          {minutes}:
          {seconds
            .toString()
            .padStart(2, "0")}
        </div>
      </header>

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "1fr 1fr",
          gap: "30px",
          padding: "40px"
        }}
      >
        <div
          style={{
            background: "white",
            padding: "30px",
            borderRadius:
              "20px",
            lineHeight: "1.9",
            maxHeight: "80vh",
            overflowY: "auto"
          }}
        >
          <h2>
            {currentPassage.title}
          </h2>

          <p>
            {currentPassage.passage}
          </p>
        </div>

        <div
          style={{
            background: "white",
            padding: "30px",
            borderRadius:
              "20px",
            maxHeight: "80vh",
            overflowY: "auto"
          }}
        >
          <h2>
            Questions
          </h2>

          {currentPassage.questions.map(
            (
              question,
              qIndex
            ) => {
              const key =
                `${currentSection}-${qIndex}`;

              return (
                <div
                  key={qIndex}
                  ref={(el) =>
                    (questionRefs.current[
                      qIndex
                    ] = el)
                  }
                  style={{
                    background:
                      "#e0f2fe",

                    padding:
                      "20px",

                    borderRadius:
                      "14px",

                    marginBottom:
                      "24px"
                  }}
                >
                  <h3>
                    Question{" "}
                    {qIndex + 1}
                  </h3>

                  <p
                    style={{
                      marginBottom:
                        "16px"
                    }}
                  >
                    {
                      question.question
                    }
                  </p>

                  {(question.type ===
                    "multiple-choice" ||
                    question.type ===
                      "true-false-not-given") &&
                    question.options.map(
                      (
                        option,
                        optionIndex
                      ) => (
                        <label
                          key={
                            optionIndex
                          }
                          style={{
                            display:
                              "block",
                            marginBottom:
                              "12px"
                          }}
                        >
                          <input
                            type="radio"
                            name={key}
                            value={
                              option
                            }
                            checked={
                              answers[
                                key
                              ] === option
                            }
                            onChange={() =>
                              setAnswers({
                                ...answers,
                                [key]:
                                  option
                              })
                            }
                          />{" "}
                          {option}
                        </label>
                      )
                    )}

                  {question.type ===
                    "sentence-completion" && (
                    <input
                      type="text"
                      value={
                        answers[key] ||
                        ""
                      }
                      onChange={(e) =>
                        setAnswers({
                          ...answers,
                          [key]:
                            e.target
                              .value
                        })
                      }
                      style={{
                        width: "100%",
                        padding:
                          "14px",
                        borderRadius:
                          "10px",
                        border:
                          "1px solid #cbd5e1"
                      }}
                    />
                  )}
                </div>
              );
            }
          )}

          <div
            style={{
              display: "flex",
              justifyContent:
                "space-between",
              marginTop: "30px"
            }}
          >
            <button
              disabled={
                currentSection === 0
              }
              onClick={() =>
                setCurrentSection(
                  currentSection - 1
                )
              }
            >
              Previous Passage
            </button>

            <button
              disabled={
                currentSection ===
                currentMock.sections
                  .length -
                  1
              }
              onClick={() =>
                setCurrentSection(
                  currentSection + 1
                )
              }
            >
              Next Passage
            </button>
          </div>
        </div>
      </div>

      <div
        style={{
          textAlign: "center",
          paddingBottom: "60px"
        }}
      >
        <button
          onClick={async () => {
            setSubmitted(true);

            await saveResults();
          }}
          style={{
            padding: "18px 32px",
            border: "none",
            borderRadius: "14px",
            background: "#0f172a",
            color: "white",
            fontSize: "22px",
            cursor: "pointer",
            fontWeight: "bold"
          }}
        >
          Submit Reading Test
        </button>

        {submitted && (
          <div
            style={{
              marginTop: "40px",
              background: "#0f172a",
              color: "white",
              padding: "40px",
              borderRadius: "20px",
              width: "420px",
              marginInline:
                "auto"
            }}
          >
            <h2>
              Reading Test Results
            </h2>

            <div
              style={{
                fontSize: "56px",
                fontWeight: "bold",
                marginTop: "20px"
              }}
            >
              {correctAnswers}/
              {totalQuestions}
            </div>

            <p
              style={{
                marginTop: "20px",
                fontSize: "28px"
              }}
            >
              Estimated IELTS
              Band:{" "}
              {estimatedBand}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}