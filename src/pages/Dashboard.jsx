import {
  useEffect,
  useState
} from "react";

import {
  collection,
  getDocs
} from "firebase/firestore";

import { db } from "../firebase";

import { useAuth } from "../context/AuthContext";

export default function Dashboard() {
  const [results, setResults] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const { user } =
    useAuth();

  useEffect(() => {
    const fetchResults =
      async () => {
        try {
          const querySnapshot =
            await getDocs(
              collection(
                db,
                "readingResults"
              )
            );

          const data =
            querySnapshot.docs
              .map((doc) => ({
                id: doc.id,
                ...doc.data()
              }))
              .filter(
                (result) =>
                  result.userId ===
                  user?.uid
              );

          setResults(data);
        } catch (error) {
          console.error(error);
        } finally {
          setLoading(false);
        }
      };

    if (user) {
      fetchResults();
    }
  }, [user]);

  const totalTests =
    results.length;

  const bestBand =
    results.length > 0
      ? Math.max(
          ...results.map(
            (r) =>
              r.estimatedBand
          )
        )
      : 0;

  const averageBand =
    results.length > 0
      ? (
          results.reduce(
            (sum, r) =>
              sum +
              r.estimatedBand,
            0
          ) / results.length
        ).toFixed(1)
      : 0;

  const latestScore =
    results.length > 0
      ? results[
          results.length - 1
        ].score
      : 0;

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f1f5f9",
        padding: "40px",
        fontFamily: "Arial"
      }}
    >
      <div
        style={{
          marginBottom: "40px"
        }}
      >
        <h1
          style={{
            fontSize: "42px",
            marginBottom: "10px",
            color: "#0f172a"
          }}
        >
          Dashboard
        </h1>

        {user && (
          <p
            style={{
              color: "#475569",
              fontSize: "18px"
            }}
          >
            Welcome back,
            {" "}
            <strong>
              {user.email}
            </strong>
          </p>
        )}
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit,minmax(250px,1fr))",

          gap: "24px",
          marginBottom: "50px"
        }}
      >
        <div
          style={{
            background:
              "white",

            padding: "30px",

            borderRadius:
              "22px",

            boxShadow:
              "0 6px 18px rgba(0,0,0,0.08)"
          }}
        >
          <h3
            style={{
              color: "#64748b"
            }}
          >
            Total Tests
          </h3>

          <h1
            style={{
              fontSize: "48px",
              marginTop: "10px",
              color: "#0f172a"
            }}
          >
            {totalTests}
          </h1>
        </div>

        <div
          style={{
            background:
              "white",

            padding: "30px",

            borderRadius:
              "22px",

            boxShadow:
              "0 6px 18px rgba(0,0,0,0.08)"
          }}
        >
          <h3
            style={{
              color: "#64748b"
            }}
          >
            Best Band
          </h3>

          <h1
            style={{
              fontSize: "48px",
              marginTop: "10px",
              color: "#0f172a"
            }}
          >
            {bestBand}
          </h1>
        </div>

        <div
          style={{
            background:
              "white",

            padding: "30px",

            borderRadius:
              "22px",

            boxShadow:
              "0 6px 18px rgba(0,0,0,0.08)"
          }}
        >
          <h3
            style={{
              color: "#64748b"
            }}
          >
            Average Band
          </h3>

          <h1
            style={{
              fontSize: "48px",
              marginTop: "10px",
              color: "#0f172a"
            }}
          >
            {averageBand}
          </h1>
        </div>

        <div
          style={{
            background:
              "white",

            padding: "30px",

            borderRadius:
              "22px",

            boxShadow:
              "0 6px 18px rgba(0,0,0,0.08)"
          }}
        >
          <h3
            style={{
              color: "#64748b"
            }}
          >
            Latest Score
          </h3>

          <h1
            style={{
              fontSize: "48px",
              marginTop: "10px",
              color: "#0f172a"
            }}
          >
            {latestScore}
          </h1>
        </div>
      </div>

      <div
        style={{
          marginBottom: "30px"
        }}
      >
        <h2
          style={{
            fontSize: "30px",
            color: "#0f172a"
          }}
        >
          Reading History
        </h2>
      </div>

      {loading ? (
        <div
          style={{
            background:
              "white",

            padding: "40px",

            borderRadius:
              "20px",

            textAlign: "center",

            fontSize: "20px"
          }}
        >
          Loading results...
        </div>
      ) : results.length === 0 ? (
        <div
          style={{
            background:
              "white",

            padding: "40px",

            borderRadius:
              "20px",

            textAlign: "center",

            fontSize: "20px",

            boxShadow:
              "0 6px 18px rgba(0,0,0,0.08)"
          }}
        >
          No test history yet.
        </div>
      ) : (
        <div
          style={{
            display: "grid",
            gap: "24px"
          }}
        >
          {results.map(
            (result) => (
              <div
                key={result.id}
                style={{
                  background:
                    "white",

                  padding:
                    "28px",

                  borderRadius:
                    "22px",

                  boxShadow:
                    "0 6px 18px rgba(0,0,0,0.08)"
                }}
              >
                <h2
                  style={{
                    marginBottom:
                      "20px",

                    color:
                      "#0f172a"
                  }}
                >
                  Reading Result
                </h2>

                <div
                  style={{
                    display:
                      "grid",

                    gridTemplateColumns:
                      "repeat(auto-fit,minmax(220px,1fr))",

                    gap: "16px"
                  }}
                >
                  <div>
                    <strong>
                      User:
                    </strong>

                    <p>
                      {
                        result.email
                      }
                    </p>
                  </div>

                  <div>
                    <strong>
                      Score:
                    </strong>

                    <p>
                      {
                        result.score
                      }
                    </p>
                  </div>

                  <div>
                    <strong>
                      Estimated Band:
                    </strong>

                    <p>
                      {
                        result.estimatedBand
                      }
                    </p>
                  </div>

                  <div>
                    <strong>
                      Date:
                    </strong>

                    <p>
                      {result.createdAt
                        ? new Date(
                            result.createdAt.seconds *
                              1000
                          ).toLocaleString()
                        : "N/A"}
                    </p>
                  </div>
                </div>
              </div>
            )
          )}
        </div>
      )}
    </div>
  );
}