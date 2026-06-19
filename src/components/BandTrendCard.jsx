export default function BandTrendCard({
  title,
  current,
  target,
}) {
  return (
    <div
      style={{
        background: "#fff",
        padding: "25px",
        borderRadius: "16px",
        boxShadow:
          "0 10px 30px rgba(0,0,0,0.08)",
      }}
    >
      <h3>
        {title}
      </h3>

      <h1>
        {current}
      </h1>

      <p>
        Target: {target}
      </p>

      <div
        style={{
          width: "100%",
          height: "12px",
          background:
            "#e2e8f0",
          borderRadius:
            "20px",
          overflow:
            "hidden",
          marginTop:
            "15px",
        }}
      >
        <div
          style={{
            width: `${
              (current /
                target) *
              100
            }%`,
            height:
              "100%",
            background:
              "#22c55e",
          }}
        />
      </div>
    </div>
  );
}