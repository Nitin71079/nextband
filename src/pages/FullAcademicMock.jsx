import { useNavigate } from "react-router-dom";

import {
  getExamSession,
  clearExamSession,
} from "../services/examSession";

export default function ExamResults() {
  const navigate =
    useNavigate();

  const session =
    getExamSession();

  if (!session) {
    return (
      <div
        style={{
          minHeight:
            "100vh",
          display:
            "flex",
          justifyContent:
            "center",
          alignItems:
            "center",
        }}
      >
        <div
          style={{
            background:
              "#fff",
            padding:
              "30px",
            borderRadius:
              "20px",
          }}
        >
          <h1>
            No Results Found
          </h1>

          <button
            className="primary-btn"
            onClick={() =>
              navigate("/")
            }
          >
            Go Home
          </button>
        </div>
      </div>
    );
  }

  const overall =
    (
      (session.reading +
        session.listening +
        session.writing +
        session.speaking) /
      4
    ).toFixed(1);

  function startNewExam() {
    clearExamSession();

    navigate(
      "/mock/academic"
    );
  }

  return (
    <div
      style={{
        minHeight:
          "100vh",
        maxWidth:
          "1200px",
        margin:
          "0 auto",
        padding:
          "40px",
      }}
    >
      <h1>
        IELTS Exam Results
      </h1>

      <div
        style={{
          background:
            "#fff",
          padding:
            "30px",
          borderRadius:
            "20px",
          marginTop:
            "20px",
          textAlign:
            "center",
        }}
      >
        <h2>
          Overall Band
        </h2>

        <div
          style={{
            fontSize:
              "72px",
            fontWeight:
              "bold",
          }}
        >
          {overall}
        </div>

        <p>
          Completed:
          {" "}
          {
            session.completedAt
          }
        </p>
      </div>

      <div
        style={{
          display:
            "grid",
          gridTemplateColumns:
            "repeat(auto-fit,minmax(250px,1fr))",
          gap:
            "20px",
          marginTop:
            "30px",
        }}
      >
        <ScoreCard
          title="Reading"
          score={
            session.reading
          }
        />

        <ScoreCard
          title="Listening"
          score={
            session.listening
          }
        />

        <ScoreCard
          title="Writing"
          score={
            session.writing
          }
        />

        <ScoreCard
          title="Speaking"
          score={
            session.speaking
          }
        />
      </div>

      <div
        style={{
          background:
            "#fff",
          padding:
            "25px",
          borderRadius:
            "20px",
          marginTop:
            "30px",
        }}
      >
        <h2>
          Recommendations
        </h2>

        <ul>
          <li>
            Practice
            Reading
            accuracy.
          </li>

          <li>
            Improve
            Listening
            concentration.
          </li>

          <li>
            Expand
            Writing
            vocabulary.
          </li>

          <li>
            Improve
            Speaking
            fluency.
          </li>
        </ul>
      </div>

      <div
        style={{
          marginTop:
            "30px",
        }}
      >
        <button
          className="primary-btn"
          onClick={
            startNewExam
          }
        >
          Start New Exam
        </button>
      </div>
    </div>
  );
}

function ScoreCard({
  title,
  score,
}) {
  return (
    <div
      style={{
        background:
          "#fff",
        padding:
          "25px",
        borderRadius:
          "18px",
        textAlign:
          "center",
      }}
    >
      <h3>
        {title}
      </h3>

      <div
        style={{
          fontSize:
            "48px",
          fontWeight:
            "bold",
        }}
      >
        {score}
      </div>
    </div>
  );
}