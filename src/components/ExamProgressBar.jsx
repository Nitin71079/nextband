export default function ExamProgressBar({
  answered,
  total,
}) {
  const percentage =
    total
      ? (answered /
          total) *
        100
      : 0;

  return (
    <div
      style={{
        marginBottom:
          "20px",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent:
            "space-between",
          marginBottom:
            "8px",
        }}
      >
        <span>
          Progress
        </span>

        <span>
          {answered}/{total}
        </span>
      </div>

      <div
        style={{
          height: "12px",
          background:
            "#e2e8f0",
          borderRadius:
            "999px",
        }}
      >
        <div
          style={{
            height:
              "100%",
            width:
              `${percentage}%`,
            background:
              "#22c55e",
            borderRadius:
              "999px",
          }}
        />
      </div>
    </div>
  );
}