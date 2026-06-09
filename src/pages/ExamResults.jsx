import {
  getExamSession,
} from "../services/examSession";

import BandBreakdown from "../components/BandBreakdown";

export default function ExamResults() {
  const session =
    getExamSession();

  if (!session) {
    return (
      <div
        style={{
          minHeight: "100vh",
          padding: "40px",
        }}
      >
        <h1>
          No Exam Data Available
        </h1>

        <p>
          Complete a full mock
          test first.
        </p>
      </div>
    );
  }

  const overallBand =
    (
      (
        Number(
          session.reading || 0
        ) +
        Number(
          session.listening || 0
        ) +
        Number(
          session.writing || 0
        ) +
        Number(
          session.speaking || 0
        )
      ) / 4
    ).toFixed(1);

  return (
    <div
      style={{
        minHeight: "100vh",
        maxWidth: "1200px",
        margin: "0 auto",
        padding: "40px",
      }}
    >
      <h1
        style={{
          marginBottom: "30px",
        }}
      >
        IELTS Exam Results
      </h1>

      <div
        style={{
          background: "#fff",
          padding: "30px",
          borderRadius: "20px",
          marginBottom: "30px",
          boxShadow:
            "0 10px 30px rgba(0,0,0,0.08)",
        }}
      >
        <h2>
          Overall Band Score
        </h2>

        <div
          style={{
            fontSize: "72px",
            fontWeight: "bold",
            color: "#22c55e",
            marginTop: "10px",
          }}
        >
          {overallBand}
        </div>
      </div>

      <BandBreakdown
        reading={
          session.reading
        }
        listening={
          session.listening
        }
        writing={
          session.writing
        }
        speaking={
          session.speaking
        }
      />

      <div
        style={{
          marginTop: "30px",
          background: "#fff",
          padding: "30px",
          borderRadius: "20px",
          boxShadow:
            "0 10px 30px rgba(0,0,0,0.08)",
        }}
      >
        <h2>
          Section Scores
        </h2>

        <p>
          Reading:{" "}
          {session.reading}
        </p>

        <p>
          Listening:{" "}
          {session.listening}
        </p>

        <p>
          Writing:{" "}
          {session.writing}
        </p>

        <p>
          Speaking:{" "}
          {session.speaking}
        </p>
      </div>

      <div
        style={{
          marginTop: "30px",
          background: "#fff",
          padding: "30px",
          borderRadius: "20px",
          boxShadow:
            "0 10px 30px rgba(0,0,0,0.08)",
        }}
      >
        <h2>
          Feedback
        </h2>

        <ul
          style={{
            lineHeight: "2",
          }}
        >
          <li>
            Continue Reading
            practice for higher
            accuracy.
          </li>

          <li>
            Improve Listening
            concentration and
            note-taking.
          </li>

          <li>
            Focus on Writing
            structure and
            coherence.
          </li>

          <li>
            Practice Speaking
            fluency and
            vocabulary.
          </li>
        </ul>
      </div>
    </div>
  );
}