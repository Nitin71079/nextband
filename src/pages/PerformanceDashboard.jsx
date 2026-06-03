
import { useMemo } from "react";

export default function PerformanceDashboard() {
  const stats = useMemo(
    () => ({
      reading: 7.0,
      listening: 6.5,
      writing: 6.5,
      speaking: 7.0,
    }),
    []
  );

  const overallBand =
    (
      (stats.reading +
        stats.listening +
        stats.writing +
        stats.speaking) /
      4
    ).toFixed(1);

  const cards = [
    {
      title: "Reading",
      band: stats.reading,
    },
    {
      title: "Listening",
      band: stats.listening,
    },
    {
      title: "Writing",
      band: stats.writing,
    },
    {
      title: "Speaking",
      band: stats.speaking,
    },
  ];

  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "40px",
        maxWidth: "1200px",
        margin: "0 auto",
      }}
    >
      <h1>
        Performance Dashboard
      </h1>

      <div
        style={{
          background: "#fff",
          padding: "30px",
          borderRadius: "20px",
          marginTop: "20px",
          marginBottom: "30px",
          textAlign: "center",
        }}
      >
        <h2>
          Overall IELTS Band
        </h2>

        <div
          style={{
            fontSize: "64px",
            fontWeight: "bold",
            marginTop: "10px",
          }}
        >
          {overallBand}
        </div>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit, minmax(250px,1fr))",
          gap: "20px",
        }}
      >
        {cards.map((card) => (
          <div
            key={card.title}
            style={{
              background: "#fff",
              padding: "25px",
              borderRadius: "18px",
            }}
          >
            <h3>
              {card.title}
            </h3>

            <div
              style={{
                fontSize: "42px",
                fontWeight: "bold",
                marginTop: "10px",
              }}
            >
              {card.band}
            </div>
          </div>
        ))}
      </div>

      <div
        style={{
          background: "#fff",
          padding: "25px",
          borderRadius: "18px",
          marginTop: "30px",
        }}
      >
        <h2>
          Strength Analysis
        </h2>

        <ul>
          <li>
            Strongest Skill:
            Reading
          </li>

          <li>
            Improvement Area:
            Listening
          </li>

          <li>
            Recommended Focus:
            Mock Tests +
            Listening Practice
          </li>
        </ul>
      </div>
    </div>
  );
}
