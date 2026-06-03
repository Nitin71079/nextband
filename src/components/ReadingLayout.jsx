export default function ReadingLayout({
  timer,
  passage,
  questions,
  answerSheet,
}) {
  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "20px",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent:
            "space-between",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        <h1>
          IELTS Academic Reading
        </h1>

        {timer}
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "1.2fr 1fr",
          gap: "20px",
        }}
      >
        <div>{passage}</div>

        <div>{questions}</div>
      </div>

      <div
        style={{
          marginTop: "20px",
        }}
      >
        {answerSheet}
      </div>
    </div>
  );
}