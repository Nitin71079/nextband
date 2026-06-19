export default function AIErrorCard({
  error,
}) {
  return (
    <div
      style={{
        background:
          "#fef2f2",
        border:
          "1px solid #fecaca",
        padding:
          "20px",
        borderRadius:
          "16px",
      }}
    >
      <h3>
        AI Evaluation Error
      </h3>

      <p>{error}</p>
    </div>
  );
}