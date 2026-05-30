export default function StreakCard({
  testsTaken
}) {
  const streak =
    Math.min(
      testsTaken,
      30
    );

  return (
    <div
      style={{
        background:
          "linear-gradient(135deg, #22d3ee, #0891b2)",

        padding: "40px",

        borderRadius:
          "24px",

        color: "white",

        boxShadow:
          "0 10px 30px rgba(0,0,0,0.15)",

        marginTop: "50px"
      }}
    >
      <h1
        style={{
          fontSize:
            "42px",

          marginBottom:
            "20px"
        }}
      >
        Daily Streak
      </h1>

      <div
        style={{
          display: "flex",

          alignItems:
            "center",

          gap: "20px",

          flexWrap:
            "wrap"
        }}
      >
        <div
          style={{
            fontSize:
              "72px",

            fontWeight:
              "bold"
          }}
        >
          🔥 {streak}
        </div>

        <div>
          <h2
            style={{
              marginBottom:
                "12px"
            }}
          >
            Keep Learning
          </h2>

          <p
            style={{
              lineHeight:
                "1.8",

              maxWidth:
                "500px"
            }}
          >
            Complete IELTS
            practice daily
            to maintain your
            streak and
            improve faster.
          </p>
        </div>
      </div>
    </div>
  );
}