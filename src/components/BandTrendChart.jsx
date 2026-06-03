export default function BandTrendChart({
  results,
}) {
  return (
    <div
      style={{
        background:
          "#fff",

        padding:
          "25px",

        borderRadius:
          "20px",
      }}
    >
      <h2>
        Band Trend
      </h2>

      {results.map(
        (
          result,
          index
        ) => (
          <div
            key={index}
            style={{
              display:
                "flex",

              justifyContent:
                "space-between",

              padding:
                "10px 0",

              borderBottom:
                "1px solid #e2e8f0",
            }}
          >
            <span>
              {
                result.date
              }
            </span>

            <strong>
              {
                result.band
              }
            </strong>
          </div>
        )
      )}
    </div>
  );
}