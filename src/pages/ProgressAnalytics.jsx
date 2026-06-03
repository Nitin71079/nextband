import {
  useEffect,
  useState,
} from "react";

import BandTrendChart
from "../components/BandTrendChart";

import {
  fetchResults,
} from "../services/firebaseResults";

export default function ProgressAnalytics() {
  const [results,
    setResults] =
    useState([]);

  useEffect(() => {
    async function load() {
      const data =
        await fetchResults();

      setResults(
        data
      );
    }

    load();
  }, []);

  const latestBand =
    results.length
      ? results[0]
          .band
      : 0;

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
        Progress
        Analytics
      </h1>

      <div
        style={{
          background:
            "#fff",

          padding:
            "25px",

          borderRadius:
            "20px",

          marginBottom:
            "20px",
        }}
      >
        <h2>
          Latest Band
        </h2>

        <div
          style={{
            fontSize:
              "60px",

            fontWeight:
              "bold",
          }}
        >
          {latestBand}
        </div>
      </div>

      <BandTrendChart
        results={results}
      />
    </div>
  );
}