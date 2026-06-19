import {
getExamHistory,
} from "../services/examSession";

export default function ExamHistory() {
const history =
getExamHistory();

return (
<div
style={{
minHeight: "100vh",
maxWidth: "1200px",
margin: "0 auto",
padding: "40px",
}}
>
<div
style={{
marginBottom: "30px",
}}
> <h1>
Exam History </h1>

    <p
      style={{
        color: "#64748b",
      }}
    >
      Review all previous
      IELTS mock exams and
      track your progress.
    </p>
  </div>

  {history.length === 0 ? (
    <div
      style={{
        background: "#fff",
        padding: "30px",
        borderRadius: "20px",
        boxShadow:
          "0 10px 30px rgba(0,0,0,0.08)",
      }}
    >
      <h2>
        No Exam History
      </h2>

      <p>
        Complete your first
        full mock exam to
        start tracking your
        progress.
      </p>
    </div>
  ) : (
    history
      .slice()
      .reverse()
      .map((exam) => {
        const overallBand =
          (
            (
              Number(
                exam.reading || 0
              ) +
              Number(
                exam.listening || 0
              ) +
              Number(
                exam.writing || 0
              ) +
              Number(
                exam.speaking || 0
              )
            ) / 4
          ).toFixed(1);

        return (
          <div
            key={exam.id}
            style={{
              background:
                "#fff",
              padding:
                "25px",
              borderRadius:
                "20px",
              marginBottom:
                "20px",
              boxShadow:
                "0 10px 30px rgba(0,0,0,0.08)",
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
              }}
            >
              <div>
                <h2>
                  IELTS Mock
                  Exam
                </h2>

                <p>
                  {
                    exam.completedAt
                  }
                </p>
              </div>

              <div
                style={{
                  fontSize:
                    "48px",
                  fontWeight:
                    "bold",
                  color:
                    "#22c55e",
                }}
              >
                {
                  overallBand
                }
              </div>
            </div>

            <hr
              style={{
                margin:
                  "20px 0",
              }}
            />

            <div
              style={{
                display:
                  "grid",
                gridTemplateColumns:
                  "repeat(auto-fit,minmax(180px,1fr))",
                gap:
                  "20px",
              }}
            >
              <div>
                <strong>
                  Reading
                </strong>

                <p>
                  {
                    exam.reading
                  }
                </p>
              </div>

              <div>
                <strong>
                  Listening
                </strong>

                <p>
                  {
                    exam.listening
                  }
                </p>
              </div>

              <div>
                <strong>
                  Writing
                </strong>

                <p>
                  {
                    exam.writing
                  }
                </p>
              </div>

              <div>
                <strong>
                  Speaking
                </strong>

                <p>
                  {
                    exam.speaking
                  }
                </p>
              </div>
            </div>
          </div>
        );
      })
  )}
</div>

);
}
