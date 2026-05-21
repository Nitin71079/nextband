import {
  useState,
  useEffect
} from "react";

export default function Listening() {
  const questions = [
    {
      question:
        "What is the student's name?",

      options: [
        "John",
        "David",
        "Michael",
        "Daniel"
      ],

      answer: "David"
    },

    {
      question:
        "Which course did she enroll in?",

      options: [
        "Engineering",
        "Business",
        "Design",
        "Law"
      ],

      answer: "Business"
    },

    {
      question:
        "When does the semester begin?",

      options: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Friday"
      ],

      answer: "Monday"
    }
  ];

  const [answers, setAnswers] =
    useState({});

  const [submitted, setSubmitted] =
    useState(false);

  const [timeLeft, setTimeLeft] =
    useState(30 * 60);

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

  let score = 0;

  questions.forEach(
    (question, index) => {
      if (
        answers[index] ===
        question.answer
      ) {
        score++;
      }
    }
  );

  const calculateBand = (
    score
  ) => {
    if (score === 3) return 9;
    if (score === 2) return 7;
    if (score === 1) return 5;

    return 4;
  };

  const estimatedBand =
    calculateBand(score);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f1f5f9",
        fontFamily: "Arial"
      }}
    >
      <header
        style={{
          background: "#0f172a",
          color: "white",
          padding: "20px 40px",
          display: "flex",
          justifyContent:
            "space-between",
          alignItems: "center"
        }}
      >
        <div>
          <h1>
            IELTS Listening Test
          </h1>

          <p>
            Academic Listening
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
          maxWidth: "1000px",
          margin: "40px auto",
          background: "white",
          padding: "40px",
          borderRadius: "20px"
        }}
      >
        <h2
          style={{
            marginBottom: "20px"
          }}
        >
          Audio Section
        </h2>

        <div
          style={{
            background: "#e2e8f0",
            padding: "30px",
            borderRadius: "16px",
            marginBottom: "40px"
          }}
        >
          <p>
            MP3 audio integration
            will be added here.
          </p>

          <audio controls>
            <source
              src=""
              type="audio/mpeg"
            />
          </audio>
        </div>

        <h2
          style={{
            marginBottom: "30px"
          }}
        >
          Questions
        </h2>

        {questions.map(
          (
            question,
            index
          ) => (
            <div
              key={index}
              style={{
                background:
                  "#e0f2fe",

                padding:
                  "24px",

                borderRadius:
                  "16px",

                marginBottom:
                  "24px"
              }}
            >
              <h3>
                Question{" "}
                {index + 1}
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

              {question.options.map(
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
                      name={`question-${index}`}
                      value={
                        option
                      }
                      checked={
                        answers[
                          index
                        ] ===
                        option
                      }
                      onChange={() =>
                        setAnswers({
                          ...answers,
                          [index]:
                            option
                        })
                      }
                    />{" "}
                    {option}
                  </label>
                )
              )}
            </div>
          )
        )}

        <button
          onClick={() =>
            setSubmitted(true)
          }
          style={{
            width: "100%",
            padding: "18px",
            border: "none",
            borderRadius: "14px",
            background: "#0f172a",
            color: "white",
            fontSize: "22px",
            cursor: "pointer",
            fontWeight: "bold"
          }}
        >
          Submit Listening Test
        </button>

        {submitted && (
          <div
            style={{
              marginTop: "40px",
              background: "#0f172a",
              color: "white",
              padding: "40px",
              borderRadius: "20px",
              textAlign: "center"
            }}
          >
            <h2>
              Listening Results
            </h2>

            <div
              style={{
                fontSize: "56px",
                fontWeight: "bold",
                marginTop: "20px"
              }}
            >
              {score}/
              {
                questions.length
              }
            </div>

            <p
              style={{
                marginTop: "20px",
                fontSize: "28px"
              }}
            >
              Estimated IELTS
              Band:
              {" "}
              {estimatedBand}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}