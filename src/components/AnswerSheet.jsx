
export default function AnswerSheet({
  totalQuestions,
  answers,
  onJump,
}) {
  const numbers =
    Array.from(
      {
        length:
          totalQuestions,
      },
      (_, i) => i + 1
    );

  return (
    <div
      style={{
        background:
          "#fff",

        padding:
          "20px",

        borderRadius:
          "16px",
      }}
    >
      <h3>
        Answer Sheet
      </h3>

      <div
        style={{
          display:
            "grid",

          gridTemplateColumns:
            "repeat(5,1fr)",

          gap:
            "10px",
        }}
      >
        {numbers.map(
          (num) => (
            <button
              key={num}
              onClick={() =>
                onJump(
                  num
                )
              }
              style={{
                padding:
                  "10px",

                border:
                  "none",

                borderRadius:
                  "10px",

                cursor:
                  "pointer",

                background:
                  answers[
                    num
                  ]
                    ? "#22c55e"
                    : "#cbd5e1",

                color:
                  "white",

                fontWeight:
                  "bold",
              }}
            >
              {num}
            </button>
          )
        )}
      </div>
    </div>
  );
}
