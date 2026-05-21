import {
  useState,
  useEffect
} from "react";

export default function Writing() {
  const [task1, setTask1] =
    useState("");

  const [task2, setTask2] =
    useState("");

  const [submitted, setSubmitted] =
    useState(false);

  const [timeLeft, setTimeLeft] =
    useState(60 * 60);

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

  const wordCountTask1 =
    task1
      .trim()
      .split(/\s+/)
      .filter(Boolean).length;

  const wordCountTask2 =
    task2
      .trim()
      .split(/\s+/)
      .filter(Boolean).length;

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
            IELTS Writing Test
          </h1>

          <p>
            Academic Writing
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
          maxWidth: "1200px",
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
            Task 1
          </h2>

          <p
            style={{
              marginBottom: "20px",
              lineHeight: "1.8"
            }}
          >
            The chart below shows
            the percentage of
            households using
            different internet
            services in a European
            country between 2000
            and 2020.

            Summarise the
            information by
            selecting and reporting
            the main features, and
            make comparisons where
            relevant.
          </p>

          <textarea
            value={task1}
            onChange={(e) =>
              setTask1(
                e.target.value
              )
            }
            placeholder="Write your Task 1 response here..."
            style={{
              width: "100%",
              height: "300px",
              padding: "20px",
              borderRadius: "16px",
              border:
                "1px solid #cbd5e1",
              fontSize: "16px",
              resize: "vertical"
            }}
          />

          <p
            style={{
              marginTop: "16px",
              fontWeight: "bold"
            }}
          >
            Word Count:
            {" "}
            {wordCountTask1}
          </p>
        </div>

        <div
          style={{
            background: "white",
            padding: "40px",
            borderRadius: "20px"
          }}
        >
          <h2>
            Task 2
          </h2>

          <p
            style={{
              marginBottom: "20px",
              lineHeight: "1.8"
            }}
          >
            Some people believe
            that universities
            should focus only on
            academic subjects,
            while others think
            students should also
            learn practical skills.

            Discuss both views and
            give your opinion.
          </p>

          <textarea
            value={task2}
            onChange={(e) =>
              setTask2(
                e.target.value
              )
            }
            placeholder="Write your Task 2 essay here..."
            style={{
              width: "100%",
              height: "400px",
              padding: "20px",
              borderRadius: "16px",
              border:
                "1px solid #cbd5e1",
              fontSize: "16px",
              resize: "vertical"
            }}
          />

          <p
            style={{
              marginTop: "16px",
              fontWeight: "bold"
            }}
          >
            Word Count:
            {" "}
            {wordCountTask2}
          </p>
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
          Submit Writing Test
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
              Writing Submitted
            </h2>

            <p
              style={{
                marginTop: "20px",
                fontSize: "20px"
              }}
            >
              AI scoring and band
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