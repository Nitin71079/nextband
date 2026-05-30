import {
  useState
} from "react";

import listeningTests from "../data/listeningTests";

import {
  useAuth
} from "../context/AuthContext";

import {
  saveResult
} from "../utils/saveResult";

import SearchBar from "../components/SearchBar";

import ExamTimer from "../components/ExamTimer";

import useMobile from "../hooks/useMobile";

export default function Listening() {
  const { user } =
    useAuth();

  const isMobile =
    useMobile();

  const [currentTest,
    setCurrentTest] =
    useState(
      listeningTests[0]
    );

  const [selectedAnswers,
    setSelectedAnswers] =
    useState({});

  const [submitted,
    setSubmitted] =
    useState(false);

  const handleSelect = (
    qIndex,
    option
  ) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [qIndex]: option
    });
  };

  const calculateScore =
    () => {
      let score = 0;

      currentTest.questions.forEach(
        (q, index) => {
          if (
            selectedAnswers[
              index
            ] === q.answer
          ) {
            score++;
          }
        }
      );

      return score;
    };

  const estimatedBand =
    (
      (calculateScore() /
        currentTest
          .questions
          .length) *
        3 +
      6
    ).toFixed(1);

  async function handleAutoSubmit() {
    if (submitted)
      return;

    setSubmitted(true);

    if (user) {
      await saveResult(
        user.uid,
        "Listening",
        calculateScore(),
        estimatedBand
      );
    }
  }

  return (
    <div
      style={{
        minHeight:
          "100vh",

        background:
          "#f8fafc",

        padding: isMobile
          ? "30px 15px"
          : "60px 30px",

        fontFamily:
          "Arial"
      }}
    >
      <div
        style={{
          maxWidth:
            "1100px",

          margin:
            "0 auto",

          background:
            "white",

          padding: isMobile
            ? "25px"
            : "40px",

          borderRadius:
            "24px",

          boxShadow:
            "0 10px 30px rgba(0,0,0,0.08)"
        }}
      >
        <div
          style={{
            display:
              "flex",

            justifyContent:
              "space-between",

            alignItems:
              "center",

            flexWrap:
              "wrap",

            gap: "20px",

            marginBottom:
              "40px"
          }}
        >
          <div>
            <h1
              style={{
                fontSize:
                  isMobile
                    ? "32px"
                    : "42px"
              }}
            >
              IELTS Listening
            </h1>

            <p
              style={{
                color:
                  "#64748b",

                marginTop:
                  "10px"
              }}
            >
              {
                currentTest.title
              }
            </p>
          </div>

          <select
            onChange={(e) => {
              const selected =
                listeningTests.find(
                  (
                    test
                  ) =>
                    test.id ===
                    Number(
                      e
                        .target
                        .value
                    )
                );

              setCurrentTest(
                selected
              );

              setSelectedAnswers(
                {}
              );

              setSubmitted(
                false
              );
            }}
            style={{
              padding:
                "14px 18px",

              borderRadius:
                "14px",

              border:
                "1px solid #cbd5e1",

              fontSize:
                "16px",

              width:
                isMobile
                  ? "100%"
                  : "auto"
            }}
          >
            {listeningTests.map(
              (
                test
              ) => (
                <option
                  key={
                    test.id
                  }
                  value={
                    test.id
                  }
                >
                  {
                    test.title
                  }
                </option>
              )
            )}
          </select>
        </div>

        <SearchBar
          data={
            listeningTests
          }
        />

        {!submitted && (
          <div
            style={{
              marginBottom:
                "30px"
            }}
          >
            <ExamTimer
              initialMinutes={
                30
              }
              onComplete={
                handleAutoSubmit
              }
            />
          </div>
        )}

        <div
          style={{
            marginBottom:
              "40px"
          }}
        >
          <audio
            controls
            style={{
              width: "100%"
            }}
          >
            <source
              src={
                currentTest.audio
              }
              type="audio/mpeg"
            />
          </audio>
        </div>

        {currentTest.questions.map(
          (q, qIndex) => (
            <div
              key={qIndex}
              style={{
                marginBottom:
                  "40px"
              }}
            >
              <h2
                style={{
                  marginBottom:
                    "20px",

                  fontSize:
                    isMobile
                      ? "20px"
                      : "24px"
                }}
              >
                {qIndex + 1}.{" "}
                {q.question}
              </h2>

              <div
                style={{
                  display:
                    "flex",

                  flexDirection:
                    "column",

                  gap: "14px"
                }}
              >
                {q.options.map(
                  (
                    option,
                    index
                  ) => (
                    <button
                      key={index}
                      onClick={() =>
                        handleSelect(
                          qIndex,
                          option
                        )
                      }
                      disabled={
                        submitted
                      }
                      style={{
                        padding:
                          "16px",

                        borderRadius:
                          "14px",

                        border:
                          selectedAnswers[
                            qIndex
                          ] ===
                          option
                            ? "2px solid #22d3ee"
                            : "1px solid #cbd5e1",

                        background:
                          selectedAnswers[
                            qIndex
                          ] ===
                          option
                            ? "#ecfeff"
                            : "white",

                        cursor:
                          submitted
                            ? "default"
                            : "pointer",

                        textAlign:
                          "left",

                        fontSize:
                          "16px",

                        transition:
                          "0.2s",

                        opacity:
                          submitted
                            ? 0.85
                            : 1
                      }}
                    >
                      {option}
                    </button>
                  )
                )}
              </div>
            </div>
          )
        )}

        {!submitted ? (
          <button
            onClick={
              handleAutoSubmit
            }
            style={{
              background:
                "#22d3ee",

              border:
                "none",

              padding:
                "16px 32px",

              borderRadius:
                "14px",

              fontWeight:
                "bold",

              cursor:
                "pointer",

              fontSize:
                "18px",

              width:
                isMobile
                  ? "100%"
                  : "auto"
            }}
          >
            Submit Answers
          </button>
        ) : (
          <div
            style={{
              marginTop:
                "50px",

              background:
                "#f1f5f9",

              padding:
                isMobile
                  ? "25px"
                  : "40px",

              borderRadius:
                "24px"
            }}
          >
            <h1
              style={{
                fontSize:
                  isMobile
                    ? "32px"
                    : "42px",

                color:
                  "#22c55e",

                marginBottom:
                  "20px"
              }}
            >
              Results
            </h1>

            <h2
              style={{
                marginBottom:
                  "20px"
              }}
            >
              Score:
              {" "}
              {
                calculateScore()
              }
              /
              {
                currentTest
                  .questions
                  .length
              }
            </h2>

            <h2
              style={{
                marginBottom:
                  "16px"
              }}
            >
              Estimated IELTS
              Band:
              {" "}
              {estimatedBand}
            </h2>

            <div
              style={{
                marginTop:
                  "30px",

                background:
                  "white",

                padding:
                  "24px",

                borderRadius:
                  "18px"
              }}
            >
              <h3
                style={{
                  marginBottom:
                    "16px"
                }}
              >
                Performance
                Feedback
              </h3>

              <p
                style={{
                  color:
                    "#475569",

                  lineHeight:
                    "1.8"
                }}
              >
                {estimatedBand >=
                7
                  ? "Excellent listening accuracy and comprehension. Continue timed audio practice."
                  : estimatedBand >=
                    6
                  ? "Good listening performance. Improve concentration and note-taking strategies."
                  : "Practice more listening sections regularly and focus on identifying keywords quickly."}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}