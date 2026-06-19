import {
  getExamHistory,
} from "../services/examSession";

export default function BandProgressChart() {
  const history =
    getExamHistory();

  if (
    !history ||
    history.length === 0
  ) {
    return null;
  }

  const exams =
    history.map(
      (exam) => {
        const overall =
          (
            (Number(
              exam.reading
            ) +
              Number(
                exam.listening
              ) +
              Number(
                exam.writing
              ) +
              Number(
                exam.speaking
              )) /
            4
          ).toFixed(1);

        return {
          ...exam,
          overall,
        };
      }
    );

  return (
    <div
      style={{
        background:
          "#fff",
        padding:
          "30px",
        borderRadius:
          "20px",
        boxShadow:
          "0 10px 30px rgba(0,0,0,0.08)",
        marginTop:
          "30px",
      }}
    >
      <h2>
        Band Progress
      </h2>

      {exams.map(
        (
          exam,
          index
        ) => (
          <div
            key={exam.id}
            style={{
              marginBottom:
                "15px",
            }}
          >
            <strong>
              Exam{" "}
              {index + 1}
            </strong>

            <div
              style={{
                width:
                  "100%",
                height:
                  "18px",
                background:
                  "#e2e8f0",
                borderRadius:
                  "999px",
                overflow:
                  "hidden",
                marginTop:
                  "8px",
              }}
            >
              <div
                style={{
                  width: `${
                    Number(
                      exam.overall
                    ) * 10
                  }%`,
                  height:
                    "100%",
                  background:
                    "#22c55e",
                }}
              />
            </div>

            <p>
              Band{" "}
              {
                exam.overall
              }
            </p>
          </div>
        )
      )}
    </div>
  );
}