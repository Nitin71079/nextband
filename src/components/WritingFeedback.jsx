export default function WritingFeedback({
  feedback,
}) {
  if (!feedback)
    return null;

  return (
    <div
      style={{
        background:
          "#fff",
        padding:
          "25px",
        borderRadius:
          "16px",
        marginTop:
          "20px",
      }}
    >
      <h2>
        AI Feedback
      </h2>

      <div
        style={{
          whiteSpace:
            "pre-wrap",
          lineHeight:
            "1.8",
        }}
      >
        {feedback}
      </div>
    </div>
  );
}