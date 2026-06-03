export default function CountdownTimer({
  minutes,
  seconds,
}) {
  return (
    <div
      style={{
        background:
          "#0f172a",

        color:
          "white",

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
  );
}
