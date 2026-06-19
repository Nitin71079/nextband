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
    const allQuestions =
  currentTest.sections.flatMap(
    (section) => section.questions
  );
    console.log(
  "Current Test:",
  currentTest
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

    allQuestions.forEach(
      (q) => {
        if (
          (selectedAnswers[q.id] || "")
            .trim()
            .toLowerCase() ===
          q.answer
            .trim()
            .toLowerCase()
        ) {
          score++;
        }
      }
    );

    return score;
  };
const score =
  calculateScore();

let estimatedBand = 0;

if (score >= 39) estimatedBand = 9;
else if (score >= 37) estimatedBand = 8.5;
else if (score >= 35) estimatedBand = 8;
else if (score >= 32) estimatedBand = 7.5;
else if (score >= 30) estimatedBand = 7;
else if (score >= 26) estimatedBand = 6.5;
else if (score >= 23) estimatedBand = 6;
else if (score >= 18) estimatedBand = 5.5;
else if (score >= 16) estimatedBand = 5;
else if (score >= 13) estimatedBand = 4.5;
else if (score >= 11) estimatedBand = 4;
else if (score >= 8) estimatedBand = 3.5;
else if (score >= 6) estimatedBand = 3;
else if (score >= 4) estimatedBand = 2.5;
else if (score >= 2) estimatedBand = 2;
else if (score >= 1) estimatedBand = 1.5;

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
<p>
  Total Tests:
  {listeningTests.length}
</p>
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
  value={currentTest.id}
onChange={(e) => {
  const selected =
    listeningTests.find(
      (t) =>
        t.id === Number(
          e.target.value
        )
    );

  setCurrentTest(selected);
  setSelectedAnswers({});
  setSubmitted(false);
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
    (test) => (
      <option
        key={test.id}
        value={test.id}
      >
        {test.title}
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
  <p>
    Audio URL:
    {currentTest.audio}
  </p>

  <audio
    controls
    src={currentTest.audio}
    style={{
      width: "100%"
    }}
  />
</div>

{currentTest.sections.map(
  (section) => (
    <div
      key={section.id}
      style={{
        marginBottom: "50px",
      }}
    >
      <h2
        style={{
          background: "#e2e8f0",
          padding: "15px",
          borderRadius: "12px",
          marginBottom: "20px",
        }}
      >
        {section.title}
      </h2>

      {section.questions.map(
        (q) => (
          <div
            key={q.id}
            style={{
              marginBottom: "25px",
            }}
          >
            <h3>
              {q.id}. {q.question}
            </h3>

            <input
              type="text"
              value={
                selectedAnswers[q.id] || ""
              }
              onChange={(e) =>
                setSelectedAnswers({
                  ...selectedAnswers,
                  [q.id]:
                    e.target.value,
                })
              }
              placeholder="Type your answer"
              style={{
                width: "100%",
                padding: "12px",
                borderRadius: "10px",
                border:
                  "1px solid #cbd5e1",
                marginTop: "10px",
              }}
            />
          </div>
        )
      )}
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
{calculateScore()}
/40
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