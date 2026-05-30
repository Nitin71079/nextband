import {
  useEffect,
  useState
} from "react";

import {
  getFirestore,
  collection,
  query,
  where,
  getDocs
} from "firebase/firestore";

import { app } from "../firebase";

import {
  useAuth
} from "../context/AuthContext";

import useMobile from "../hooks/useMobile";

export default function Insights() {
  const { user } =
    useAuth();

  const isMobile =
    useMobile();

  const [results,
    setResults] =
    useState([]);

  useEffect(() => {
    fetchResults();
  }, []);

  async function fetchResults() {
    try {
      if (!user) return;

      const db =
        getFirestore(app);

      const q = query(
        collection(
          db,
          "mockResults"
        ),

        where(
          "userId",
          "==",
          user.uid
        )
      );

      const snapshot =
        await getDocs(q);

      const data =
        snapshot.docs.map(
          (doc) => ({
            id: doc.id,
            ...doc.data()
          })
        );

      setResults(data);
    } catch (error) {
      console.error(
        error
      );
    }
  }

  function calculateAverage(
    section
  ) {
    const filtered =
      results.filter(
        (r) =>
          r.section ===
          section
      );

    if (
      filtered.length === 0
    )
      return 0;

    const total =
      filtered.reduce(
        (
          acc,
          curr
        ) =>
          acc +
          Number(
            curr.band || 0
          ),
        0
      );

    return (
      total /
      filtered.length
    ).toFixed(1);
  }

  const readingAvg =
    calculateAverage(
      "Reading"
    );

  const listeningAvg =
    calculateAverage(
      "Listening"
    );

  const writingAvg =
    calculateAverage(
      "Writing"
    );

  const speakingAvg =
    calculateAverage(
      "Speaking"
    );

  const sections = [
    {
      name:
        "Reading",
      score:
        readingAvg
    },

    {
      name:
        "Listening",
      score:
        listeningAvg
    },

    {
      name:
        "Writing",
      score:
        writingAvg
    },

    {
      name:
        "Speaking",
      score:
        speakingAvg
    }
  ];

  const weakest =
    sections.reduce(
      (prev, curr) =>
        Number(
          prev.score
        ) <
        Number(
          curr.score
        )
          ? prev
          : curr
    );

  const strongest =
    sections.reduce(
      (prev, curr) =>
        Number(
          prev.score
        ) >
        Number(
          curr.score
        )
          ? prev
          : curr
    );

  return (
    <div
      style={{
        minHeight:
          "100vh",

        background:
          "#f8fafc",

        padding: isMobile
          ? "30px 15px"
          : "60px 30px",

        fontFamily:
          "Arial"
      }}
    >
      <div
        style={{
          maxWidth:
            "1100px",

          margin:
            "0 auto"
        }}
      >
        <div
          style={{
            marginBottom:
              "50px"
          }}
        >
          <h1
            style={{
              fontSize:
                isMobile
                  ? "36px"
                  : "52px"
            }}
          >
            AI Insights
          </h1>

          <p
            style={{
              color:
                "#64748b",

              marginTop:
                "10px",

              fontSize:
                "18px"
            }}
          >
            Personalized IELTS
            performance
            analytics
          </p>
        </div>

        <div
          style={{
            display:
              "grid",

            gridTemplateColumns:
              isMobile
                ? "1fr"
                : "repeat(auto-fit,minmax(250px,1fr))",

            gap: "25px",

            marginBottom:
              "50px"
          }}
        >
          {sections.map(
            (
              section,
              index
            ) => (
              <div
                key={index}
                style={{
                  background:
                    "white",

                  padding:
                    "35px",

                  borderRadius:
                    "24px",

                  boxShadow:
                    "0 10px 30px rgba(0,0,0,0.08)"
                }}
              >
                <h2
                  style={{
                    marginBottom:
                      "18px"
                  }}
                >
                  {
                    section.name
                  }
                </h2>

                <h1
                  style={{
                    fontSize:
                      "54px",

                    color:
                      "#22d3ee"
                  }}
                >
                  {
                    section.score
                  }
                </h1>

                <p
                  style={{
                    color:
                      "#64748b",

                    marginTop:
                      "10px"
                  }}
                >
                  Average Band
                </p>
              </div>
            )
          )}
        </div>

        <div
          style={{
            display:
              "grid",

            gridTemplateColumns:
              isMobile
                ? "1fr"
                : "1fr 1fr",

            gap: "30px"
          }}
        >
          <div
            style={{
              background:
                "#dcfce7",

              padding:
                "35px",

              borderRadius:
                "24px"
            }}
          >
            <h2
              style={{
                marginBottom:
                  "20px",

                color:
                  "#166534"
              }}
            >
              Strongest Module
            </h2>

            <h1
              style={{
                fontSize:
                  "42px",

                marginBottom:
                  "12px"
              }}
            >
              {
                strongest.name
              }
            </h1>

            <p
              style={{
                lineHeight:
                  "1.8"
              }}
            >
              You are performing
              best in{" "}
              {
                strongest.name
              }.
              Continue
              practicing to
              maintain high
              scores.
            </p>
          </div>

          <div
            style={{
              background:
                "#fee2e2",

              padding:
                "35px",

              borderRadius:
                "24px"
            }}
          >
            <h2
              style={{
                marginBottom:
                  "20px",

                color:
                  "#991b1b"
              }}
            >
              Weakest Module
            </h2>

            <h1
              style={{
                fontSize:
                  "42px",

                marginBottom:
                  "12px"
              }}
            >
              {
                weakest.name
              }
            </h1>

            <p
              style={{
                lineHeight:
                  "1.8"
              }}
            >
              Focus more on{" "}
              {
                weakest.name
              }
              {" "}practice to
              improve your
              overall IELTS
              band score.
            </p>
          </div>
        </div>

        <div
          style={{
            background:
              "white",

            padding:
              isMobile
                ? "25px"
                : "40px",

            borderRadius:
              "24px",

            boxShadow:
              "0 10px 30px rgba(0,0,0,0.08)",

            marginTop:
              "40px"
          }}
        >
          <h1
            style={{
              marginBottom:
                "25px"
            }}
          >
            AI Recommendations
          </h1>

          <div
            style={{
              display:
                "flex",

              flexDirection:
                "column",

              gap: "20px"
            }}
          >
            <div
              style={{
                background:
                  "#f8fafc",

                padding:
                  "20px",

                borderRadius:
                  "18px"
              }}
            >
              Practice{" "}
              {
                weakest.name
              }
              {" "}daily for at
              least 45 minutes.
            </div>

            <div
              style={{
                background:
                  "#f8fafc",

                padding:
                  "20px",

                borderRadius:
                  "18px"
              }}
            >
              Attempt 3 full
              mock tests every
              week.
            </div>

            <div
              style={{
                background:
                  "#f8fafc",

                padding:
                  "20px",

                borderRadius:
                  "18px"
              }}
            >
              Use AI Writing and
              Speaking tools
              consistently for
              faster band
              improvement.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}