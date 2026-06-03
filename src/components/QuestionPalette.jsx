export default function QuestionPalette({
  questions,
  answers,
}) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns:
          "repeat(5,1fr)",
        gap: "10px",
        marginBottom: "25px",
      }}
    >
      {questions.map((q) => (
        <div
          key={q.id}
          style={{
            background:
              answers[q.id]
                ? "#22c55e"
                : "#cbd5e1",

            color: "white",
            textAlign: "center",
            padding: "10px",
            borderRadius: "8px",
            fontWeight: "bold",
          }}
        >
          {q.id}
        </div>
      ))}
    </div>
  );
}