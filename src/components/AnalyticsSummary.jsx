export default function AnalyticsSummary({
  analytics,
}) {
  if (!analytics)
    return null;

  return (
    <div
      style={{
        background:
          "#fff",
        padding:
          "30px",
        borderRadius:
          "20px",
        boxShadow:
          "0 10px 30px rgba(0,0,0,0.08)",
      }}
    >
      <h2>
        Performance Analytics
      </h2>

      <p>
        Total Exams:
        {" "}
        {
          analytics.totalExams
        }
      </p>

      <p>
        Average Band:
        {" "}
        {
          analytics.averageBand
        }
      </p>

      <p>
        Best Band:
        {" "}
        {
          analytics.bestBand
        }
      </p>
    </div>
  );
}   