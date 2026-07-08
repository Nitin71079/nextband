import { getExamHistory } from "../services/examSession";

export default function Certificates() {

  const history = getExamHistory();

  const bestBand =
    history.length
      ? Math.max(
          ...history.map((h) =>
            Number(h.overall || 0)
          )
        )
      : 0;

  const certificates = [

    {
      title: "First Mock Completed",
      unlocked:
        history.length >= 1,
      emoji: "🎓",
    },

    {
      title: "10 Mock Tests",
      unlocked:
        history.length >= 10,
      emoji: "🏅",
    },

    {
      title: "Band 7 Achieved",
      unlocked:
        bestBand >= 7,
      emoji: "🥇",
    },

    {
      title: "Band 8 Achieved",
      unlocked:
        bestBand >= 8,
      emoji: "🏆",
    },

    {
      title: "Band 9 Master",
      unlocked:
        bestBand >= 9,
      emoji: "👑",
    },

  ];

  return (

    <div
      style={{
        minHeight: "100vh",
        maxWidth: "1200px",
        margin: "0 auto",
        padding: "40px",
      }}
    >

      <h1
        style={{
          marginBottom: "40px",
        }}
      >
        Certificates
      </h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit,minmax(300px,1fr))",
          gap: "25px",
        }}
      >

        {certificates.map((item) => (

          <div
            key={item.title}
            style={{
              background:
                item.unlocked
                  ? "#ffffff"
                  : "#f1f5f9",
              padding: "30px",
              borderRadius: "22px",
              boxShadow:
                "0 10px 30px rgba(0,0,0,.08)",
              opacity:
                item.unlocked
                  ? 1
                  : .6,
            }}
          >

            <div
              style={{
                fontSize: "60px",
              }}
            >
              {item.emoji}
            </div>

            <h2>
              {item.title}
            </h2>

            <p>

              {item.unlocked
                ? "Unlocked"
                : "Locked"}

            </p>

            {item.unlocked && (

              <button
                className="primary-btn"
                style={{
                  marginTop: "20px",
                }}
                onClick={() =>
                  window.print()
                }
              >
                Download Certificate
              </button>

            )}

          </div>

        ))}

      </div>

    </div>

  );

}