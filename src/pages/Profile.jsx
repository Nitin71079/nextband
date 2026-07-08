import { useEffect, useState } from "react";
import {
  getFirestore,
  doc,
  getDoc,
} from "firebase/firestore";
import { app } from "../firebase";
import { useAuth } from "../context/AuthContext";
import { getExamHistory } from "../services/examSession";

export default function Profile() {
  const { user } = useAuth();

  const [profile, setProfile] =
    useState(null);

  useEffect(() => {
    loadProfile();
  }, []);

  async function loadProfile() {
    if (!user) return;

    const db =
      getFirestore(app);

    const snapshot =
      await getDoc(
        doc(db, "users", user.uid)
      );

    if (snapshot.exists()) {
      setProfile(snapshot.data());
    }
  }

  const history =
    getExamHistory();

  const testsCompleted =
    history.length;

  const averageBand =
    history.length
      ? (
          history.reduce(
            (sum, exam) =>
              sum +
              Number(
                exam.overall || 0
              ),
            0
          ) / history.length
        ).toFixed(1)
      : "--";

  const bestBand =
    history.length
      ? Math.max(
          ...history.map((h) =>
            Number(
              h.overall || 0
            )
          )
        )
      : "--";

  return (
    <div
      style={{
        minHeight: "100vh",
        maxWidth: "1200px",
        margin: "0 auto",
        padding: "40px",
      }}
    >
      <h1
        style={{
          marginBottom: "40px",
        }}
      >
        My Profile
      </h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "320px 1fr",
          gap: "30px",
        }}
      >
        {/* LEFT */}

        <div
          style={{
            background: "#fff",
            borderRadius: "20px",
            padding: "30px",
            textAlign: "center",
            boxShadow:
              "0 10px 30px rgba(0,0,0,.08)",
          }}
        >
          <img
            src={
              user?.photoURL ||
              "https://ui-avatars.com/api/?name=User"
            }
            alt=""
            style={{
              width: "140px",
              height: "140px",
              borderRadius: "50%",
            }}
          />

          <h2>
            {profile?.displayName ||
              user?.displayName ||
              "Student"}
          </h2>

          <p>
            {user?.email}
          </p>

          <div
            style={{
              marginTop: "20px",
            }}
          >
            <span
              style={{
                background:
                  "#22c55e",
                color: "white",
                padding:
                  "8px 18px",
                borderRadius:
                  "999px",
              }}
            >
              {profile?.premium
                ? "Premium"
                : "Free"}
            </span>
          </div>
        </div>

        {/* RIGHT */}

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit,minmax(220px,1fr))",
            gap: "20px",
          }}
        >
          {[
            {
              title:
                "Tests Completed",
              value:
                testsCompleted,
            },
            {
              title:
                "Average Band",
              value:
                averageBand,
            },
            {
              title:
                "Best Band",
              value:
                bestBand,
            },
            {
              title:
                "Study Streak",
              value:
                profile?.streak ||
                0,
            },
            {
              title:
                "Target Band",
              value:
                profile?.goalBand ||
                "--",
            },
            {
              title:
                "Member Since",
              value:
                user?.metadata
                  ?.creationTime
                  ?.split(" ")[0],
            },
          ].map((card) => (
            <div
              key={card.title}
              style={{
                background:
                  "#fff",
                borderRadius:
                  "18px",
                padding: "25px",
                boxShadow:
                  "0 8px 25px rgba(0,0,0,.08)",
              }}
            >
              <h3>
                {card.title}
              </h3>

              <div
                style={{
                  fontSize:
                    "40px",
                  fontWeight:
                    "bold",
                  color:
                    "#0891b2",
                }}
              >
                {card.value}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}