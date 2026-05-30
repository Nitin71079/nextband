import {
  useEffect,
  useState
} from "react";

import {
  getFirestore,
  doc,
  getDoc,
  setDoc
} from "firebase/firestore";

import { app } from "../firebase";

import {
  useAuth
} from "../context/AuthContext";

import useMobile from "../hooks/useMobile";

export default function Streaks() {
  const { user } =
    useAuth();

  const isMobile =
    useMobile();

  const [streak,
    setStreak] =
    useState(0);

  const [xp,
    setXp] =
    useState(0);

  const [level,
    setLevel] =
    useState(1);

  const [lastVisit,
    setLastVisit] =
    useState("");

  useEffect(() => {
    updateStreak();
  }, []);

  async function updateStreak() {
    try {
      if (!user) return;

      const db =
        getFirestore(app);

      const streakRef =
        doc(
          db,
          "streaks",
          user.uid
        );

      const snapshot =
        await getDoc(
          streakRef
        );

      const today =
        new Date()
          .toISOString()
          .split("T")[0];

      if (
        snapshot.exists()
      ) {
        const data =
          snapshot.data();

        let newStreak =
          data.streak || 0;

        let newXp =
          data.xp || 0;

        if (
          data.lastVisit !==
          today
        ) {
          newStreak += 1;
          newXp += 50;
        }

        const newLevel =
          Math.floor(
            newXp / 200
          ) + 1;

        await setDoc(
          streakRef,
          {
            streak:
              newStreak,

            xp: newXp,

            level:
              newLevel,

            lastVisit:
              today
          }
        );

        setStreak(
          newStreak
        );

        setXp(newXp);

        setLevel(
          newLevel
        );

        setLastVisit(
          today
        );
      } else {
        await setDoc(
          streakRef,
          {
            streak: 1,

            xp: 50,

            level: 1,

            lastVisit:
              today
          }
        );

        setStreak(1);

        setXp(50);

        setLevel(1);

        setLastVisit(
          today
        );
      }
    } catch (error) {
      console.error(
        error
      );
    }
  }

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
            Streaks & XP
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
            Build consistency
            and level up your
            IELTS journey
          </p>
        </div>

        <div
          style={{
            display:
              "grid",

            gridTemplateColumns:
              isMobile
                ? "1fr"
                : "repeat(auto-fit,minmax(280px,1fr))",

            gap: "30px",

            marginBottom:
              "50px"
          }}
        >
          <div
            style={{
              background:
                "linear-gradient(135deg,#f97316,#ef4444)",

              color:
                "white",

              padding:
                "40px",

              borderRadius:
                "24px"
            }}
          >
            <h2
              style={{
                marginBottom:
                  "20px"
              }}
            >
              Daily Streak
            </h2>

            <h1
              style={{
                fontSize:
                  "64px"
              }}
            >
              🔥 {streak}
            </h1>
          </div>

          <div
            style={{
              background:
                "linear-gradient(135deg,#22d3ee,#3b82f6)",

              color:
                "white",

              padding:
                "40px",

              borderRadius:
                "24px"
            }}
          >
            <h2
              style={{
                marginBottom:
                  "20px"
              }}
            >
              XP Points
            </h2>

            <h1
              style={{
                fontSize:
                  "64px"
              }}
            >
              ⚡ {xp}
            </h1>
          </div>

          <div
            style={{
              background:
                "linear-gradient(135deg,#22c55e,#16a34a)",

              color:
                "white",

              padding:
                "40px",

              borderRadius:
                "24px"
            }}
          >
            <h2
              style={{
                marginBottom:
                  "20px"
              }}
            >
              Current Level
            </h2>

            <h1
              style={{
                fontSize:
                  "64px"
              }}
            >
              🏆 {level}
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
              "0 10px 30px rgba(0,0,0,0.08)"
          }}
        >
          <h1
            style={{
              marginBottom:
                "30px"
            }}
          >
            Progress Rewards
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
              🔥 7-Day Streak →
              Unlock Advanced
              Mock Tests
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
              ⚡ 500 XP →
              Unlock AI Study
              Insights
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
              🏆 Level 10 →
              Premium Mentor
              Discounts
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}