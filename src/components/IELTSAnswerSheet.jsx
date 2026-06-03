export default function IELTSAnswerSheet({
  questions,
  answers,
  onJump,
}) {
  return (
    <div
      style={{
        background: "#ffffff",
        borderRadius: "16px",
        padding: "20px",
        marginTop: "20px",
      }}
    >
      <h3>
        Answer Sheet
      </h3>

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(5, 1fr)",
          gap: "10px",
        }}
      >
        {questions.map((q) => {
          const answered =
            answers[q.id];

          return (
            <button
              key={q.id}
              onClick={() =>
                onJump(q.id)
              }
              style={{
                padding: "12px",
                borderRadius:
                  "10px",
                border: "none",
                cursor: "pointer",

                background:
                  answered
                    ? "#22c55e"
                    : "#e2e8f0",

                color:
                  answered
                    ? "white"
                    : "#0f172a",

                fontWeight:
                  "bold",
              }}
            >
              {q.id}
            </button>
          );
        })}
      </div>

      <div
        style={{
          marginTop: "15px",
        }}
      >
        <strong>
          Answered:
        </strong>{" "}
        {
          Object.keys(
            answers
          ).length
        }
        /
        {
          questions.length
        }
      </div>
    </div>
  );
}