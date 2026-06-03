export default function TestSummaryModal({
  totalQuestions,
  answeredQuestions,
  onBack,
  onSubmit,
}) {
  const unanswered =
    totalQuestions -
    answeredQuestions;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background:
          "rgba(0,0,0,0.5)",
        display: "flex",
        justifyContent:
          "center",
        alignItems:
          "center",
        zIndex: 9999,
      }}
    >
      <div
        style={{
          background:
            "#fff",
          padding: "30px",
          borderRadius:
            "16px",
          width: "500px",
          maxWidth:
            "90%",
        }}
      >
        <h2>
          Review Before Submission
        </h2>

        <p>
          Answered:
          {" "}
          {answeredQuestions}
        </p>

        <p>
          Unanswered:
          {" "}
          {unanswered}
        </p>

        <p>
          Total Questions:
          {" "}
          {totalQuestions}
        </p>

        <div
          style={{
            display: "flex",
            gap: "10px",
            marginTop:
              "20px",
          }}
        >
          <button
            onClick={onBack}
          >
            Back To Test
          </button>

          <button
            className="primary-btn"
            onClick={
              onSubmit
            }
          >
            Submit Exam
          </button>
        </div>
      </div>
    </div>
  );
}