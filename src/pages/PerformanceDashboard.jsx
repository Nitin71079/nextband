import { useEffect, useState } from "react";

import {
  fetchResults,
} from "../services/firebaseResults";

export default function PerformanceDashboard() {
  const [results, setResults] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    async function loadData() {
      const data =
        await fetchResults();

      setResults(data);

      setLoading(false);
    }

    loadData();
  }, []);

  if (loading) {
    return (
      <div
        style={{
          padding: "40px",
        }}
      >
        Loading...
      </div>
    );
  }

  if (results.length === 0) {
    return (
      <div
        style={{
          padding: "40px",
        }}
      >
        <h1>
          Performance Dashboard
        </h1>

        <p>
          No test results found.
        </p>
      </div>
    );
  }

  const latest =
  results.find(
    (result) =>
      result.reading !== undefined &&
      result.listening !== undefined &&
      result.writing !== undefined &&
      result.speaking !== undefined
  ) || {};
  
  const reading =
    Number(
      latest.reading || 0
    );

  const listening =
    Number(
      latest.listening || 0
    );

  const writing =
    Number(
      latest.writing || 0
    );

  const speaking =
    Number(
      latest.speaking || 0
    );

  const overallBand =
    (
      (reading +
        listening +
        writing +
        speaking) /
      4
    ).toFixed(1);

  const cards = [
    {
      title: "Reading",
      band: reading,
    },
    {
      title: "Listening",
      band: listening,
    },
    {
      title: "Writing",
      band: writing,
    },
    {
      title: "Speaking",
      band: speaking,
    },
  ];

  const strongest =
    cards.reduce(
      (best, current) =>
        current.band >
        best.band
          ? current
          : best
    );

  const weakest =
    cards.reduce(
      (worst, current) =>
        current.band <
        worst.band
          ? current
          : worst
    );

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

        <p>
          Tests Taken:
          {" "}
          {results.length}
        </p>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit,minmax(250px,1fr))",
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
            {" "}
            {strongest.title}
          </li>

          <li>
            Improvement Area:
            {" "}
            {weakest.title}
          </li>

          <li>
            Latest Overall Band:
            {" "}
            {overallBand}
          </li>
        </ul>
      </div>
    </div>
  );
}