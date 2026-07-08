import { useNavigate } from "react-router-dom";

import {
  getExamHistory,
} from "../services/examSession";

export default function ExamHistory() {

  const navigate = useNavigate();

  const history =
    getExamHistory().reverse();

  return (

    <div
      style={{
        maxWidth: "1200px",
        margin: "0 auto",
        padding: "40px",
        minHeight: "100vh",
      }}
    >

      <h1
        style={{
          marginBottom: "30px",
        }}
      >
        Exam History
      </h1>

      {history.length === 0 ? (

        <div
          style={{
            background: "#fff",
            padding: "40px",
            borderRadius: "20px",
            textAlign: "center",
          }}
        >

          <h2>
            No Exams Yet
          </h2>

          <button
            className="primary-btn"
            onClick={() =>
              navigate("/cbt-exam")
            }
          >
            Take First Mock
          </button>

        </div>

      ) : (

        <div
          style={{
            display: "grid",
            gap: "20px",
          }}
        >

          {history.map((exam) => (

            <div
              key={exam.id}
              style={{
                background: "#fff",
                borderRadius: "20px",
                padding: "25px",
                boxShadow:
                  "0 8px 25px rgba(0,0,0,.08)",
              }}
            >

              <div
                style={{
                  display: "flex",
                  justifyContent:
                    "space-between",
                  alignItems:
                    "center",
                }}
              >

                <div>

                  <h2>
                    Overall Band {exam.overall}
                  </h2>

                  <p>

                    {new Date(
                      exam.completedAt
                    ).toLocaleString()}

                  </p>

                </div>

                <button
                  className="primary-btn"
                  onClick={() =>
                    navigate(
                      "/exam-results"
                    )
                  }
                >
                  View
                </button>

              </div>

              <hr />

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns:
                    "repeat(4,1fr)",
                  gap: "20px",
                }}
              >

                <div>

                  📖

                  <h3>
                    {exam.reading}
                  </h3>

                </div>

                <div>

                  🎧

                  <h3>
                    {exam.listening}
                  </h3>

                </div>

                <div>

                  ✍️

                  <h3>
                    {exam.writing}
                  </h3>

                </div>

                <div>

                  🎤

                  <h3>
                    {exam.speaking}
                  </h3>

                </div>

              </div>

            </div>

          ))}

        </div>

      )}

    </div>

  );

}