export default function QuestionPalette({
  questions = [],
  answers = {},
  flaggedQuestions = [],
  onQuestionClick,
  currentQuestionId = null,
}) {
  if (!Array.isArray(questions) || questions.length === 0) {
    return null;
  }

  return (
    <div style={{ marginBottom: "25px" }}>
      {/* Legend */}

      <div
        style={{
          display: "flex",
          gap: "18px",
          flexWrap: "wrap",
          marginBottom: "18px",
          fontSize: "14px",
          color: "#475569",
        }}
      >
        <span>⚪ Unanswered</span>
        <span>🟢 Answered</span>
        <span>🟠 Flagged</span>
        <span>🔵 Current</span>
      </div>

      {/* Palette */}

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fill, minmax(42px,1fr))",
          gap: "10px",
        }}
      >
        {questions.map((question) => {
          const answered =
            answers[question.id] !== undefined;

          const flagged =
            flaggedQuestions.includes(question.id);

          const current =
            currentQuestionId === question.id;

          let background = "#e2e8f0";
          let color = "#1e293b";

          if (answered) {
            background = "#22c55e";
            color = "#fff";
          }

          if (flagged) {
            background = "#f59e0b";
            color = "#fff";
          }

          if (current) {
            background = "#2563eb";
            color = "#fff";
          }

          return (
            <button
              key={question.id}
              onClick={() =>
                onQuestionClick?.(question.id)
              }
              title={`Question ${question.id}`}
              style={{
                width: 42,
                height: 42,
                border: "none",
                borderRadius: "10px",
                background,
                color,
                fontWeight: 700,
                cursor: "pointer",
                transition: "0.2s",
                boxShadow:
                  current
                    ? "0 0 0 3px rgba(37,99,235,.25)"
                    : "0 2px 6px rgba(0,0,0,.08)",
              }}
            >
              {question.id}
            </button>
          );
        })}
      </div>
    </div>
  );
}