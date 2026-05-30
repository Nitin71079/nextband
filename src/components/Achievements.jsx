export default function Achievements({
  testsTaken,
  averageBand
}) {
  const achievements = [
    {
      title:
        "First Test Completed",

      unlocked:
        testsTaken >= 1
    },

    {
      title:
        "5 Tests Completed",

      unlocked:
        testsTaken >= 5
    },

    {
      title:
        "10 Tests Completed",

      unlocked:
        testsTaken >= 10
    },

    {
      title:
        "Band 6 Achiever",

      unlocked:
        averageBand >= 6
    },

    {
      title:
        "Band 7 Master",

      unlocked:
        averageBand >= 7
    },

    {
      title:
        "Band 8 Elite",

      unlocked:
        averageBand >= 8
    }
  ];

  return (
    <div
      style={{
        background:
          "white",

        padding: "40px",

        borderRadius:
          "24px",

        boxShadow:
          "0 10px 30px rgba(0,0,0,0.08)",

        marginTop: "50px"
      }}
    >
      <h1
        style={{
          marginBottom:
            "30px"
        }}
      >
        Achievements
      </h1>

      <div
        style={{
          display: "grid",

          gridTemplateColumns:
            "repeat(auto-fit, minmax(250px, 1fr))",

          gap: "20px"
        }}
      >
        {achievements.map(
          (
            achievement,
            index
          ) => (
            <div
              key={index}
              style={{
                background:
                  achievement.unlocked
                    ? "#ecfeff"
                    : "#f8fafc",

                padding:
                  "24px",

                borderRadius:
                  "18px",

                border:
                  achievement.unlocked
                    ? "2px solid #22d3ee"
                    : "1px solid #e2e8f0"
              }}
            >
              <h2
                style={{
                  marginBottom:
                    "12px"
                }}
              >
                {
                  achievement.title
                }
              </h2>

              <p
                style={{
                  color:
                    achievement.unlocked
                      ? "#0891b2"
                      : "#64748b",

                  fontWeight:
                    "bold"
                }}
              >
                {achievement.unlocked
                  ? "Unlocked"
                  : "Locked"}
              </p>
            </div>
          )
        )}
      </div>
    </div>
  );
}