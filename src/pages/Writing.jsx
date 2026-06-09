import {
  useState
} from "react";


import writingPrompts from "../data/writingPrompts";

import {
  useAuth
} from "../context/AuthContext";

import {
  saveResult
} from "../utils/saveResult";

import SearchBar from "../components/SearchBar";

import ExamTimer from "../components/ExamTimer";

import useMobile from "../hooks/useMobile";

export default function Writing() {
  const { user } =
    useAuth();

  const isMobile =
    useMobile();

  const [currentPrompt,
    setCurrentPrompt] =
    useState(
      writingPrompts[0]
    );

  const [essay,
    setEssay] =
    useState("");

  const [submitted,
    setSubmitted] =
    useState(false);

  const [loadingAI,
    setLoadingAI] =
    useState(false);

  const [aiFeedback,
    setAiFeedback] =
    useState("");

  const [estimatedBand,
    setEstimatedBand] =
    useState("");

  const wordCount =
    essay
      .trim()
      .split(/\s+/)
      .filter(Boolean)
      .length;

      async function evaluateEssay() {
  try {
    setLoadingAI(true);

    const response = await fetch(
      "/api/evaluate-writing",
      {
        method: "POST",

        headers: {
          "Content-Type":
            "application/json",
        },

        body: JSON.stringify({
          essay,
        }),
      }
    );

    const data =
      await response.json();

    if (!response.ok) {
      throw new Error(
        data.error ||
          "Evaluation failed"
      );
    }

    const feedback =
      data.feedback ||
      "No feedback received.";

    setAiFeedback(
      feedback
    );

    const bandMatch =
      feedback.match(
        /Band[:\s]*([0-9.]+)/i
      );

    if (bandMatch) {
      setEstimatedBand(
        bandMatch[1]
      );
    } else {
      setEstimatedBand(
        "7.0"
      );
    }
  } catch (error) {
    console.error(
      error
    );

    setAiFeedback(
      "AI evaluation failed."
    );
  } finally {
    setLoadingAI(false);
  }
}

  async function handleAutoSubmit() {
    if (submitted)
      return;

    setSubmitted(true);

    await evaluateEssay();

    if (user) {
      await saveResult(
        user.uid,
        "Writing",
        wordCount,
        estimatedBand || "7.0"
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
              AI IELTS Writing
            </h1>

            <p
              style={{
                color:
                  "#64748b",

                marginTop:
                  "10px"
              }}
            >
              GPT-Powered
              Essay Evaluation
            </p>
          </div>

          <select
            onChange={(e) => {
              const selected =
                writingPrompts.find(
                  (
                    prompt
                  ) =>
                    prompt.id ===
                    Number(
                      e
                        .target
                        .value
                    )
                );

              setCurrentPrompt(
                selected
              );

              setEssay("");

              setSubmitted(
                false
              );

              setAiFeedback(
                ""
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
            {writingPrompts.map(
              (
                prompt
              ) => (
                <option
                  key={
                    prompt.id
                  }
                  value={
                    prompt.id
                  }
                >
                  Prompt{" "}
                  {
                    prompt.id
                  }
                </option>
              )
            )}
          </select>
        </div>

        <SearchBar
          data={
            writingPrompts
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
                60
              }
              onComplete={
                handleAutoSubmit
              }
            />
          </div>
        )}

        <div
          style={{
            background:
              "#f1f5f9",

            padding:
              isMobile
                ? "20px"
                : "30px",

            borderRadius:
              "20px",

            marginBottom:
              "40px"
          }}
        >
          <p
            style={{
              lineHeight:
                "1.9",

              fontSize:
                isMobile
                  ? "16px"
                  : "18px",

              color:
                "#334155"
            }}
          >
            {
              currentPrompt.task
            }
          </p>
        </div>

        <textarea
          value={essay}
          onChange={(e) =>
            setEssay(
              e.target.value
            )
          }
          disabled={
            submitted
          }
          placeholder="Write your essay here..."
          style={{
            width: "100%",

            minHeight:
              isMobile
                ? "260px"
                : "350px",

            padding:
              "24px",

            borderRadius:
              "20px",

            border:
              "1px solid #cbd5e1",

            fontSize:
              "17px",

            lineHeight:
              "1.8",

            resize:
              "vertical",

            marginBottom:
              "30px",

            outline:
              "none"
          }}
        />

        <div
          style={{
            display:
              "flex",

            justifyContent:
              "space-between",

            alignItems:
              isMobile
                ? "flex-start"
                : "center",

            flexDirection:
              isMobile
                ? "column"
                : "row",

            gap: "20px",

            marginBottom:
              "30px"
          }}
        >
          <h2>
            Word Count:
            {" "}
            {wordCount}
          </h2>

          <div
            style={{
              color:
                wordCount >=
                250
                  ? "#22c55e"
                  : "#ef4444",

              fontWeight:
                "bold"
            }}
          >
            {wordCount >=
            250
              ? "Minimum word count achieved"
              : "Recommended minimum: 250 words"}
          </div>
        </div>

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
            Submit For AI
            Evaluation
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
              AI Evaluation
            </h1>

            {loadingAI ? (
              <p>
                Evaluating essay
                with AI...
              </p>
            ) : (
              <>
                <h2
                  style={{
                    marginBottom:
                      "20px"
                  }}
                >
                  Estimated IELTS
                  Band:
                  {" "}
                  {
                    estimatedBand
                  }
                </h2>

                <div
                  style={{
                    background:
                      "white",

                    padding:
                      "24px",

                    borderRadius:
                      "18px",

                    lineHeight:
                      "1.9",

                    whiteSpace:
                      "pre-wrap",

                    color:
                      "#334155"
                  }}
                >
                  {aiFeedback}
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}