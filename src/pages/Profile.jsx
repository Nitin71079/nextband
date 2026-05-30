import {
  useEffect,
  useState
} from "react";

import {
  getFirestore,
  doc,
  getDoc,
  updateDoc
} from "firebase/firestore";

import { app } from "../firebase";

import {
  useAuth
} from "../context/AuthContext";

import useMobile from "../hooks/useMobile";

export default function Profile() {
  const { user } =
    useAuth();

  const isMobile =
    useMobile();

  const [loading,
    setLoading] =
    useState(true);

  const [name,
    setName] =
    useState("");

  const [bio,
    setBio] =
    useState("");

  const [targetBand,
    setTargetBand] =
    useState("");

  const [studyGoal,
    setStudyGoal] =
    useState("");

  useEffect(() => {
    async function fetchProfile() {
      try {
        if (!user) return;

        const db =
          getFirestore(app);

        const userRef =
          doc(
            db,
            "users",
            user.uid
          );

        const snapshot =
          await getDoc(
            userRef
          );

        if (
          snapshot.exists()
        ) {
          const data =
            snapshot.data();

          setName(
            data.name || ""
          );

          setBio(
            data.bio || ""
          );

          setTargetBand(
            data.targetBand ||
              ""
          );

          setStudyGoal(
            data.studyGoal ||
              ""
          );
        }
      } catch (error) {
        console.error(
          error
        );
      } finally {
        setLoading(
          false
        );
      }
    }

    fetchProfile();
  }, [user]);

  async function saveProfile() {
    try {
      const db =
        getFirestore(app);

      const userRef =
        doc(
          db,
          "users",
          user.uid
        );

      await updateDoc(
        userRef,
        {
          name,
          bio,
          targetBand,
          studyGoal
        }
      );

      alert(
        "Profile updated!"
      );
    } catch (error) {
      console.error(
        error
      );
    }
  }

  if (loading) {
    return (
      <div
        style={{
          minHeight:
            "100vh",

          display: "flex",

          justifyContent:
            "center",

          alignItems:
            "center",

          background:
            "#f8fafc"
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
            "900px",

          margin:
            "0 auto",

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
        <div
          style={{
            display:
              "flex",

            alignItems:
              "center",

            gap: "25px",

            flexDirection:
              isMobile
                ? "column"
                : "row",

            marginBottom:
              "40px"
          }}
        >
          <div
            style={{
              width: "120px",

              height:
                "120px",

              borderRadius:
                "50%",

              background:
                "#22d3ee",

              display:
                "flex",

              justifyContent:
                "center",

              alignItems:
                "center",

              color:
                "white",

              fontSize:
                "42px",

              fontWeight:
                "bold"
            }}
          >
            {name
              ? name[0].toUpperCase()
              : "U"}
          </div>

          <div>
            <h1
              style={{
                fontSize:
                  isMobile
                    ? "32px"
                    : "46px"
              }}
            >
              My Profile
            </h1>

            <p
              style={{
                color:
                  "#64748b",

                marginTop:
                  "10px"
              }}
            >
              {
                user?.email
              }
            </p>
          </div>
        </div>

        <div
          style={{
            display:
              "flex",

            flexDirection:
              "column",

            gap: "25px"
          }}
        >
          <div>
            <label>
              Full Name
            </label>

            <input
              value={name}
              onChange={(e) =>
                setName(
                  e.target.value
                )
              }
              placeholder="Your name"
              style={{
                width:
                  "100%",

                padding:
                  "16px",

                borderRadius:
                  "14px",

                border:
                  "1px solid #cbd5e1",

                marginTop:
                  "10px",

                fontSize:
                  "16px"
              }}
            />
          </div>

          <div>
            <label>
              Bio
            </label>

            <textarea
              value={bio}
              onChange={(e) =>
                setBio(
                  e.target.value
                )
              }
              placeholder="Tell us about yourself..."
              style={{
                width:
                  "100%",

                minHeight:
                  "120px",

                padding:
                  "16px",

                borderRadius:
                  "14px",

                border:
                  "1px solid #cbd5e1",

                marginTop:
                  "10px",

                fontSize:
                  "16px",

                resize:
                  "vertical"
              }}
            />
          </div>

          <div>
            <label>
              Target IELTS
              Band
            </label>

            <input
              value={
                targetBand
              }
              onChange={(e) =>
                setTargetBand(
                  e.target.value
                )
              }
              placeholder="Example: 7.5"
              style={{
                width:
                  "100%",

                padding:
                  "16px",

                borderRadius:
                  "14px",

                border:
                  "1px solid #cbd5e1",

                marginTop:
                  "10px",

                fontSize:
                  "16px"
              }}
            />
          </div>

          <div>
            <label>
              Study Goal
            </label>

            <input
              value={
                studyGoal
              }
              onChange={(e) =>
                setStudyGoal(
                  e.target.value
                )
              }
              placeholder="Example: Study abroad in Canada"
              style={{
                width:
                  "100%",

                padding:
                  "16px",

                borderRadius:
                  "14px",

                border:
                  "1px solid #cbd5e1",

                marginTop:
                  "10px",

                fontSize:
                  "16px"
              }}
            />
          </div>

          <button
            onClick={
              saveProfile
            }
            style={{
              background:
                "#22d3ee",

              border:
                "none",

              padding:
                "18px",

              borderRadius:
                "14px",

              color:
                "white",

              fontSize:
                "18px",

              fontWeight:
                "bold",

              cursor:
                "pointer",

              marginTop:
                "20px"
            }}
          >
            Save Profile
          </button>
        </div>
      </div>
    </div>
  );
}