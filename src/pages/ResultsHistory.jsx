import {
  useEffect,
  useState,
} from "react";

import {
  fetchResults,
} from "../services/firebaseResults";

export default function ResultsHistory() {
  const [results,
    setResults] =
    useState([]);

  const [loading,
    setLoading] =
    useState(true);

  useEffect(() => {
    async function load() {
      const data =
        await fetchResults();

      setResults(
        data
      );

      setLoading(
        false
      );
    }

    load();
  }, []);

  if (loading) {
    return (
      <div
        style={{
          padding:
            "40px",
        }}
      >
        Loading...
      </div>
    );
  }

  return (
    <div
      style={{
        minHeight:
          "100vh",

        maxWidth:
          "1200px",

        margin:
          "0 auto",

        padding:
          "40px",
      }}
    >
      <h1>
        Results History
      </h1>

      {results.length ===
      0 ? (
        <p>
          No results
          found.
        </p>
      ) : (
        results.map(
          (
            result
          ) => (
            <div
              key={
                result.id
              }
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
                {
                  result.testType
                }
              </h3>

              <p>
                Band:
                {" "}
                {
                  result.band
                }
              </p>

              <p>
                Date:
                {" "}
                {
                  result.createdAt
                }
              </p>
            </div>
          )
        )
      )}
    </div>
  );
}