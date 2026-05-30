import {
  useEffect,
  useState
} from "react";

import {
  getFirestore,
  collection,
  getDocs
} from "firebase/firestore";

import { app } from "../firebase";

export default function Leaderboard() {
  const [users,
    setUsers] =
    useState([]);

  const [loading,
    setLoading] =
    useState(true);

  useEffect(() => {
    async function fetchUsers() {
      try {
        const db =
          getFirestore(app);

        const snapshot =
          await getDocs(
            collection(
              db,
              "users"
            )
          );

        const data =
          snapshot.docs.map(
            (doc) => ({
              id: doc.id,
              ...doc.data()
            })
          );

        const sorted =
          data.sort(
            (
              a,
              b
            ) =>
              (b.averageBand ||
                0) -
              (a.averageBand ||
                0)
          );

        setUsers(sorted);
      } catch (error) {
        console.error(
          error
        );
      } finally {
        setLoading(false);
      }
    }

    fetchUsers();
  }, []);

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "#f8fafc",
        padding: "60px 30px",
        fontFamily: "Arial"
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto"
        }}
      >
        <div
          style={{
            marginBottom:
              "50px",

            textAlign:
              "center"
          }}
        >
          <h1
            style={{
              fontSize:
                "60px",

              marginBottom:
                "16px"
            }}
          >
            Leaderboard
          </h1>

          <p
            style={{
              color:
                "#64748b",

              fontSize:
                "18px"
            }}
          >
            Top IELTS
            performers on
            NextBand.
          </p>
        </div>

        <div
          style={{
            background:
              "white",

            padding: "40px",

            borderRadius:
              "24px",

            boxShadow:
              "0 10px 30px rgba(0,0,0,0.08)"
          }}
        >
          {loading ? (
            <p>
              Loading...
            </p>
          ) : users.length ===
            0 ? (
            <p>
              No users found.
            </p>
          ) : (
            <div
              style={{
                display: "flex",
                flexDirection:
                  "column",

                gap: "20px"
              }}
            >
              {users.map(
                (
                  user,
                  index
                ) => (
                  <div
                    key={user.id}
                    style={{
                      background:
                        index === 0
                          ? "#fef9c3"
                          : "#f8fafc",

                      padding:
                        "24px",

                      borderRadius:
                        "18px",

                      display:
                        "flex",

                      justifyContent:
                        "space-between",

                      alignItems:
                        "center",

                      flexWrap:
                        "wrap",

                      gap: "20px"
                    }}
                  >
                    <div>
                      <h2>
                        #{index + 1}
                      </h2>

                      <p
                        style={{
                          color:
                            "#64748b"
                        }}
                      >
                        {
                          user.email
                        }
                      </p>
                    </div>

                    <div
                      style={{
                        fontSize:
                          "28px",

                        fontWeight:
                          "bold",

                        color:
                          "#22c55e"
                      }}
                    >
                      Band{" "}
                      {user.averageBand ||
                        "0.0"}
                    </div>
                  </div>
                )
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}