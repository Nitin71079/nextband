export default function ReadinessCard({
  score,
  currentOverall,
}) {
  return (
    <div
      style={{
        background: "#fff",
        padding: "30px",
        borderRadius: "20px",
        marginBottom: "20px",
        boxShadow:
          "0 10px 30px rgba(0,0,0,0.08)",
        textAlign: "center",
      }}
    >
      <h2>
        IELTS Readiness
      </h2>

      <div
        style={{
          fontSize: "64px",
          fontWeight: "bold",
          color: "#22c55e",
        }}
      >
        {score}%
      </div>

      <p>
        Current Overall Band:
        {" "}
        <strong>
          {currentOverall}
        </strong>
      </p>

      <p>
        Exam Readiness:
        {" "}
        <strong>
          {score >= 85
            ? "Excellent"
            : score >= 70
            ? "Strong"
            : score >= 55
            ? "Moderate"
            : "Needs Improvement"}
        </strong>
      </p>
    </div>
  );
}