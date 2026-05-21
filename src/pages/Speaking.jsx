import {
  useState,
  useEffect
} from "react";

export default function Speaking() {
  const [submitted, setSubmitted] =
    useState(false);

  const [timeLeft, setTimeLeft] =
    useState(15 * 60);

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
            IELTS Speaking Test
          </h1>

          <p>
            Speaking Simulation
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
          maxWidth: "1100px",
          margin: "40px auto",
          display: "grid",
          gap: "40px"
        }}
      >
        <div
          style={{
            background: "white",
            padding: "40px",
            borderRadius: "20px"
          }}
        >
          <h2>
            Part 1:
            Introduction and
            Interview
          </h2>

          <div
            style={{
              marginTop: "20px",
              lineHeight: "2"
            }}
          >
            <p>
              • Tell me about
              your hometown.
            </p>

            <p>
              • Do you enjoy
              reading books?
            </p>

            <p>
              • What type of
              music do you
              prefer?
            </p>

            <p>
              • How do you
              usually spend your
              weekends?
            </p>
          </div>
        </div>

        <div
          style={{
            background: "white",
            padding: "40px",
            borderRadius: "20px"
          }}
        >
          <h2>
            Part 2:
            Cue Card
          </h2>

          <div
            style={{
              background: "#e0f2fe",
              padding: "30px",
              borderRadius: "18px",
              marginTop: "20px",
              lineHeight: "2"
            }}
          >
            <h3>
              Describe a person
              who inspired you.
            </h3>

            <p>
              You should say:
            </p>

            <p>
              • who the person
              is
            </p>

            <p>
              • how you know
              them
            </p>

            <p>
              • what qualities
              they have
            </p>

            <p>
              • and explain why
              they inspired you.
            </p>
          </div>
        </div>

        <div
          style={{
            background: "white",
            padding: "40px",
            borderRadius: "20px"
          }}
        >
          <h2>
            Part 3:
            Discussion
          </h2>

          <div
            style={{
              marginTop: "20px",
              lineHeight: "2"
            }}
          >
            <p>
              • Why do people
              admire successful
              individuals?
            </p>

            <p>
              • Do role models
              influence young
              people strongly?
            </p>

            <p>
              • How has social
              media changed the
              idea of inspiration?
            </p>
          </div>
        </div>

        <div
          style={{
            background: "white",
            padding: "40px",
            borderRadius: "20px"
          }}
        >
          <h2>
            Speaking Recorder
          </h2>

          <p
            style={{
              marginTop: "16px",
              marginBottom: "20px"
            }}
          >
            Voice recording and
            AI pronunciation
            analysis will be
            integrated here.
          </p>

          <button
            style={{
              padding: "16px 28px",
              border: "none",
              borderRadius: "14px",
              background: "#22c55e",
              color: "white",
              fontWeight: "bold",
              fontSize: "18px",
              cursor: "pointer"
            }}
          >
            Start Recording
          </button>
        </div>

        <button
          onClick={() =>
            setSubmitted(true)
          }
          style={{
            width: "100%",
            padding: "20px",
            border: "none",
            borderRadius: "16px",
            background: "#0f172a",
            color: "white",
            fontSize: "24px",
            cursor: "pointer",
            fontWeight: "bold"
          }}
        >
          Submit Speaking Test
        </button>

        {submitted && (
          <div
            style={{
              background: "#0f172a",
              color: "white",
              padding: "40px",
              borderRadius: "20px",
              textAlign: "center"
            }}
          >
            <h2>
              Speaking Test
              Submitted
            </h2>

            <p
              style={{
                marginTop: "20px",
                fontSize: "20px"
              }}
            >
              AI speaking
              evaluation and band
              prediction will be
              added in future
              versions.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}