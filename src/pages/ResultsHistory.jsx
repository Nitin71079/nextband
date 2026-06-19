import {
  useEffect,
  useState,
} from "react";

import {
  fetchResults,
} from "../services/firebaseResults";

export default function ResultsHistory() {
  
  const [results, setResults] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    async function load() {
      const data =
        await fetchResults();

setResults(
  [...data].reverse()
);
      setLoading(false);
    }

    load();
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

  return (
    <div
      style={{
        minHeight: "100vh",
        maxWidth: "1200px",
        margin: "0 auto",
        padding: "40px",
      }}
    >
      <h1>
        Results History
      </h1>

      {results.length === 0 ? (
        <p>
          No results found.
        </p>
      ) : (
        results.map((result) => {
          const reading =
            Number(
              result.reading || 0
            );

          const listening =
            Number(
              result.listening || 0
            );

          const writing =
            Number(
              result.writing || 0
            );

          const speaking =
            Number(
              result.speaking || 0
            );

          const overall =
            reading ||
            listening ||
            writing ||
            speaking
              ? (
                  (reading +
                    listening +
                    writing +
                    speaking) /
                  4
                ).toFixed(1)
              : result.band ||
                "N/A";

          return (
            <div
              key={result.id}
              style={{
                background:
                  "#fff",
                padding:
                  "20px",
                borderRadius:
                  "16px",
                marginBottom:
                  "15px",
              }}
            >
              <h3>
                {result.testType ||
                  "IELTS Mock Test"}
              </h3>

              <p>
                <strong>
                  Overall Band:
                </strong>{" "}
                {overall}
              </p>

              {reading > 0 && (
                <p>
                  Reading:{" "}
                  {reading}
                </p>
              )}

              {listening > 0 && (
                <p>
                  Listening:{" "}
                  {listening}
                </p>
              )}

              {writing > 0 && (
                <p>
                  Writing:{" "}
                  {writing}
                </p>
              )}

              {speaking > 0 && (
                <p>
                  Speaking:{" "}
                  {speaking}
                </p>
              )}

              <p>
                Date:{" "}
                {result.createdAt?.toDate?.()
                  ?.toLocaleDateString() ||
                  "N/A"}
              </p>
            </div>
          );
        })
      )}
    </div>
  );
}