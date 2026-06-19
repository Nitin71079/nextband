import {
  getEvaluations,
} from "../services/evaluationStorage";

export default function EvaluationHistory() {
  const evaluations =
    getEvaluations();

  return (
    <div
      style={{
        minHeight: "100vh",
        maxWidth: "1200px",
        margin: "0 auto",
        padding: "40px",
      }}
    >
      <h1>
        Evaluation History
      </h1>

      {evaluations.length ===
      0 ? (
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
          }}
        >
          No evaluations yet.
        </div>
      ) : (
        evaluations.map(
          (
            item,
            index
          ) => (
            <div
              key={index}
              style={{
                background:
                  "#fff",
                padding:
                  "25px",
                borderRadius:
                  "20px",
                marginTop:
                  "20px",
                boxShadow:
                  "0 10px 30px rgba(0,0,0,0.08)",
              }}
            >
              <h2>
                {item.type}
              </h2>

              <p>
                Band:
                {" "}
                {
                  item.overallBand
                }
              </p>

              <p>
                Date:
                {" "}
                {new Date(
                  item.createdAt
                ).toLocaleString()}
              </p>
            </div>
          )
        )
      )}
    </div>
  );
}