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

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid
} from "recharts";

import useMobile from "../hooks/useMobile";

export default function Admin() {
  const isMobile =
    useMobile();

  const [users,
    setUsers] =
    useState([]);

  const [results,
    setResults] =
    useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const db =
          getFirestore(app);

        const usersSnapshot =
          await getDocs(
            collection(
              db,
              "users"
            )
          );

        const resultsSnapshot =
          await getDocs(
            collection(
              db,
              "mockResults"
            )
          );

        const usersData =
          usersSnapshot.docs.map(
            (doc) => ({
              id: doc.id,
              ...doc.data()
            })
          );

        const resultsData =
          resultsSnapshot.docs.map(
            (doc) => ({
              id: doc.id,
              ...doc.data()
            })
          );

        setUsers(
          usersData
        );

        setResults(
          resultsData
        );
      } catch (error) {
        console.error(
          error
        );
      }
    }

    fetchData();
  }, []);

  const premiumUsers =
    users.filter(
      (u) => u.premium
    ).length;

  const estimatedRevenue =
    premiumUsers * 499;

  const chartData = [
    {
      name: "Users",
      value:
        users.length
    },

    {
      name: "Premium",
      value:
        premiumUsers
    },

    {
      name: "Tests",
      value:
        results.length
    }
  ];

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
            "1300px",

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
                  : "52px",

              marginBottom:
                "10px"
            }}
          >
            Admin Analytics
          </h1>

          <p
            style={{
              color:
                "#64748b",

              fontSize:
                "18px"
            }}
          >
            Platform insights
            and growth
            monitoring
          </p>
        </div>

        <div
          style={{
            display:
              "grid",

            gridTemplateColumns:
              isMobile
                ? "1fr"
                : "repeat(auto-fit, minmax(250px, 1fr))",

            gap: "25px",

            marginBottom:
              "50px"
          }}
        >
          <div
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
                color:
                  "#64748b",

                marginBottom:
                  "16px"
              }}
            >
              Total Users
            </h2>

            <h1
              style={{
                fontSize:
                  "52px",

                color:
                  "#22d3ee"
              }}
            >
              {users.length}
            </h1>
          </div>

          <div
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
                color:
                  "#64748b",

                marginBottom:
                  "16px"
              }}
            >
              Premium Users
            </h2>

            <h1
              style={{
                fontSize:
                  "52px",

                color:
                  "#22c55e"
              }}
            >
              {
                premiumUsers
              }
            </h1>
          </div>

          <div
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
                color:
                  "#64748b",

                marginBottom:
                  "16px"
              }}
            >
              Total Tests
            </h2>

            <h1
              style={{
                fontSize:
                  "52px",

                color:
                  "#f59e0b"
              }}
            >
              {
                results.length
              }
            </h1>
          </div>

          <div
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
                color:
                  "#64748b",

                marginBottom:
                  "16px"
              }}
            >
              Estimated Revenue
            </h2>

            <h1
              style={{
                fontSize:
                  "42px",

                color:
                  "#8b5cf6"
              }}
            >
              ₹
              {
                estimatedRevenue
              }
            </h1>
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

            marginBottom:
              "50px"
          }}
        >
          <h1
            style={{
              marginBottom:
                "30px"
            }}
          >
            Platform Growth
          </h1>

          <div
            style={{
              width: "100%",
              height:
                "400px"
            }}
          >
            <ResponsiveContainer>
              <BarChart
                data={
                  chartData
                }
              >
                <CartesianGrid strokeDasharray="3 3" />

                <XAxis dataKey="name" />

                <YAxis />

                <Tooltip />

                <Bar
                  dataKey="value"
                  fill="#22d3ee"
                  radius={[
                    10, 10, 0,
                    0
                  ]}
                />
              </BarChart>
            </ResponsiveContainer>
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
              "0 10px 30px rgba(0,0,0,0.08)"
          }}
        >
          <h1
            style={{
              marginBottom:
                "30px"
            }}
          >
            Recent Users
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
            {users.map(
              (
                user
              ) => (
                <div
                  key={
                    user.id
                  }
                  style={{
                    background:
                      "#f8fafc",

                    padding:
                      "20px",

                    borderRadius:
                      "18px",

                    display:
                      "flex",

                    justifyContent:
                      "space-between",

                    alignItems:
                      isMobile
                        ? "flex-start"
                        : "center",

                    flexDirection:
                      isMobile
                        ? "column"
                        : "row",

                    gap: "15px"
                  }}
                >
                  <div>
                    <h2>
                      {
                        user.email
                      }
                    </h2>

                    <p
                      style={{
                        color:
                          "#64748b"
                      }}
                    >
                      User ID:
                      {" "}
                      {
                        user.id
                      }
                    </p>
                  </div>

                  <div
                    style={{
                      background:
                        user.premium
                          ? "#dcfce7"
                          : "#fee2e2",

                      color:
                        user.premium
                          ? "#166534"
                          : "#991b1b",

                      padding:
                        "10px 18px",

                      borderRadius:
                        "999px",

                      fontWeight:
                        "bold"
                    }}
                  >
                    {user.premium
                      ? "Premium"
                      : "Free"}
                  </div>
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
}