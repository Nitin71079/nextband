import QuestionRenderer from "./QuestionRenderer";

export default function QuestionPanel({
  questions,
  answers,
  onAnswer,
}) {
  return (
    <div
      style={{
        background: "#fff",
        padding: "25px",
        borderRadius: "16px",
        height:
          "calc(100vh - 220px)",
        overflowY: "auto",
      }}
    >
      <h2>Questions</h2>

      {questions.map((q) => (
        <div
          key={q.id}
          style={{
            marginBottom:
              "30px",
          }}
        >
          <QuestionRenderer
            question={q}
            value={answers[q.id]}
            onChange={onAnswer}
          />
        </div>
      ))}
    </div>
  );
}