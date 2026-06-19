export default function QuestionNavigator({
  totalQuestions,
  answers,
}) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns:
          "repeat(10,1fr)",
        gap: "8px",
        marginBottom: "20px",
      }}
    >
      {Array.from(
        { length: totalQuestions },
        (_, i) => {
          const questionId =
            i + 1;

          const answered =
            answers[
              questionId
            ];

          return (
            <div
              key={questionId}
              style={{
                padding: "10px",
                textAlign:
                  "center",
                borderRadius:
                  "8px",
                background:
                  answered
                    ? "#22c55e"
                    : "#e5e7eb",
                color:
                  answered
                    ? "white"
                    : "black",
                fontWeight:
                  "bold",
              }}
            >
              {questionId}
            </div>
          );
        }
      )}
    </div>
  );
}