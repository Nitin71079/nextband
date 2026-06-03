export default function ResultCard({
  score,
  total,
  band,
}) {
  return (
    <div
      style={{
        background: "#ffffff",
        padding: "30px",
        borderRadius: "16px",
        boxShadow:
          "0 4px 12px rgba(0,0,0,0.08)",
      }}
    >
      <h2>
        Reading Results
      </h2>

      <h3>
        Score:
        {" "}
        {score}/{total}
      </h3>

      <h3>
        Estimated IELTS Band:
        {" "}
        {band}
      </h3>
    </div>
  );
}