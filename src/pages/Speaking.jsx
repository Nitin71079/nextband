import {
  useState
} from "react";

import OpenAI from "openai";

import speakingMocks from "../data/speakingMocks";

import {
  useAuth
} from "../context/AuthContext";

import {
  saveResult
} from "../utils/saveResult";

import SearchBar from "../components/SearchBar";

import ExamTimer from "../components/ExamTimer";

import useMobile from "../hooks/useMobile";

export default function Speaking() {
  const { user } =
    useAuth();

  const isMobile =
    useMobile();

  const [currentSet,
    setCurrentSet] =
    useState(
      speakingMocks[0]
    );

  const [response,
    setResponse] =
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

  async function evaluateSpeaking() {
    try {
      setLoadingAI(true);

      const openai =
        new OpenAI({
          apiKey:
            import.meta.env
              .VITE_OPENAI_API_KEY,

          dangerouslyAllowBrowser: true
        });

      const completion =
        await openai.chat.completions.create(
          {
            model:
              "gpt-4o-mini",

            messages: [
              {
                role:
                  "system",

                content:
                  "You are an IELTS Speaking examiner. Evaluate fluency, vocabulary, grammar, pronunciation confidence, idea development, coherence, and estimated IELTS band score."
              },

              {
                role:
                  "user",

                content: `
Cue Card:

${currentSet.cueCard}

Student Response:

${response}
`
              }
            ]
          }
        );

      const feedback =
        completion.choices[0]
          .message
          .content;

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
        "AI speaking evaluation failed."
      );
    } finally {
      setLoadingAI(false);
    }
  }

  async function handleSubmit() {
    if (submitted)
      return;

    setSubmitted(true);

    await evaluateSpeaking();

    if (user) {
      await saveResult(
        user.uid,
        "Speaking",
        response.length,
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
              AI IELTS Speaking
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
              Speaking Feedback
            </p>
          </div>

          <select
            onChange={(e) => {
              const selected =
                speakingMocks.find(
                  (
                    mock
                  ) =>
                    mock.id ===
                    Number(
                      e
                        .target
                        .value
                    )
                );

              setCurrentSet(
                selected
              );

              setResponse("");

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
            {speakingMocks.map(
              (
                mock
              ) => (
                <option
                  key={
                    mock.id
                  }
                  value={
                    mock.id
                  }
                >
                  Speaking Set{" "}
                  {
                    mock.id
                  }
                </option>
              )
            )}
          </select>
        </div>

        <SearchBar
          data={
            speakingMocks
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
                15
              }
              onComplete={
                handleSubmit
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
          <h2
            style={{
              marginBottom:
                "20px"
            }}
          >
            Cue Card
          </h2>

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
              currentSet.cueCard
            }
          </p>
        </div>

        <textarea
          value={response}
          onChange={(e) =>
            setResponse(
              e.target.value
            )
          }
          disabled={
            submitted
          }
          placeholder="Write your speaking response here..."
          style={{
            width: "100%",

            minHeight:
              isMobile
                ? "240px"
                : "320px",

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

        {!submitted ? (
          <button
            onClick={
              handleSubmit
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
              AI Speaking
              Evaluation
            </h1>

            {loadingAI ? (
              <p>
                Evaluating
                speaking response...
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