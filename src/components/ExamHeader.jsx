export default function ExamHeader({
  title,
  minutes,
  seconds,
}) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent:
          "space-between",
        alignItems:
          "center",
        marginBottom:
          "25px",
      }}
    >
      <div>
        <h1>{title}</h1>
      </div>

      <div
        style={{
          background:
            "#0f172a",
          color: "white",
          padding:
            "15px 25px",
          borderRadius:
            "12px",
          fontSize:
            "24px",
          fontWeight:
            "bold",
        }}
      >
        {minutes}:
        {String(
          seconds
        ).padStart(2, "0")}
      </div>
    </div>
  );
}