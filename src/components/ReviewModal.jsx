export default function ReviewModal({
  totalQuestions,
  answers,
  onClose,
  onSubmit,
}) {
  const unanswered = [];

  for (
    let i = 1;
    i <= totalQuestions;
    i++
  ) {
    if (!answers[i]) {
      unanswered.push(i);
    }
  }

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background:
          "rgba(0,0,0,0.6)",
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
            "white",
          padding: "30px",
          borderRadius:
            "20px",
          width: "500px",
        }}
      >
        <h2>
          Review Answers
        </h2>

        <p>
          Answered:
          {" "}
          {
            Object.keys(
              answers
            ).length
          }
          /
          {totalQuestions}
        </p>

        <p>
          Unanswered:
          {" "}
          {
            unanswered.length
          }
        </p>

        <p>
          Missing:
          {" "}
          {
            unanswered.join(
              ", "
            )
          }
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
            onClick={
              onClose
            }
          >
            Go Back
          </button>

          <button
            className="primary-btn"
            onClick={
              onSubmit
            }
          >
            Submit Test
          </button>
        </div>
      </div>
    </div>
  );
}