export default function ForecastCard({
  currentBand,
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
      }}
    >
      <h2>
        Band Forecast
      </h2>

      <p>
        Current Band:
        {" "}
        {currentBand}
      </p>

      <p>
        Expected Next Band:
        {" "}
        {(
          Number(
            currentBand
          ) + 0.5
        ).toFixed(1)}
      </p>

      <p>
        Estimated Timeline:
        4–8 Weeks
      </p>
    </div>
  );
}