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

export default function Achievements() {
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

  const testsCompleted =
    results.length;

  const highBandCount =
    results.filter(
      (r) =>
        Number(r.band) >=
        7
    ).length;

  const achievements = [
    {
      title:
        "First Step",

      description:
        "Complete your first IELTS test",

      unlocked:
        testsCompleted >=
        1,

      emoji: "🚀"
    },

    {
      title:
        "Consistent Learner",

      description:
        "Complete 10 mock tests",

      unlocked:
        testsCompleted >=
        10,

      emoji: "📚"
    },

    {
      title:
        "IELTS Expert",

      description:
        "Achieve Band 7+ five times",

      unlocked:
        highBandCount >=
        5,

      emoji: "🏆"
    },

    {
      title:
        "Master Candidate",

      description:
        "Complete 25 tests",

      unlocked:
        testsCompleted >=
        25,

      emoji: "🔥"
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
            Achievements
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
            Track your IELTS
            milestones and
            progress
          </p>
        </div>

        <div
          style={{
            display:
              "grid",

            gridTemplateColumns:
              isMobile
                ? "1fr"
                : "repeat(auto-fit, minmax(280px, 1fr))",

            gap: "25px"
          }}
        >
          {achievements.map(
            (
              achievement,
              index
            ) => (
              <div
                key={index}
                style={{
                  background:
                    achievement.unlocked
                      ? "linear-gradient(135deg,#22d3ee,#3b82f6)"
                      : "white",

                  color:
                    achievement.unlocked
                      ? "white"
                      : "#0f172a",

                  padding:
                    "35px",

                  borderRadius:
                    "24px",

                  boxShadow:
                    "0 10px 30px rgba(0,0,0,0.08)",

                  transition:
                    "0.3s"
                }}
              >
                <div
                  style={{
                    fontSize:
                      "52px",

                    marginBottom:
                      "20px"
                  }}
                >
                  {
                    achievement.emoji
                  }
                </div>

                <h2
                  style={{
                    marginBottom:
                      "15px"
                  }}
                >
                  {
                    achievement.title
                  }
                </h2>

                <p
                  style={{
                    lineHeight:
                      "1.8",

                    opacity:
                      0.9,

                    marginBottom:
                      "25px"
                  }}
                >
                  {
                    achievement.description
                  }
                </p>

                <div
                  style={{
                    background:
                      achievement.unlocked
                        ? "rgba(255,255,255,0.2)"
                        : "#f1f5f9",

                    padding:
                      "10px 18px",

                    borderRadius:
                      "999px",

                    display:
                      "inline-block",

                    fontWeight:
                      "bold"
                  }}
                >
                  {achievement.unlocked
                    ? "Unlocked"
                    : "Locked"}
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
}