
export default function ReviewPanel({
  totalQuestions,
  answeredQuestions,
  onBack,
  onSubmit,
}) {
  return (
    <div
      style={{
        background:
          "#fff",

        padding:
          "30px",

        borderRadius:
          "20px",
      }}
    >
      <h2>
        Review Test
      </h2>

      <p>
        Total Questions:
        {" "}
        {
          totalQuestions
        }
      </p>

      <p>
        Answered:
        {" "}
        {
          answeredQuestions
        }
      </p>

      <p>
        Remaining:
        {" "}
        {
          totalQuestions -
          answeredQuestions
        }
      </p>

      <div
        style={{
          display:
            "flex",

          gap:
            "10px",

          marginTop:
            "20px",
        }}
      >
        <button
          onClick={
            onBack
          }
        >
          Back
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
  );
}
