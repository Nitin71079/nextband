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

export default function Referrals() {
  const { user } =
    useAuth();

  const isMobile =
    useMobile();

  const [referralCode,
    setReferralCode] =
    useState("");

  const [referrals,
    setReferrals] =
    useState(0);

  useEffect(() => {
    generateReferral();
  }, []);

  async function generateReferral() {
    try {
      if (!user) return;

      const db =
        getFirestore(app);

      const referralRef =
        doc(
          db,
          "referrals",
          user.uid
        );

      const snapshot =
        await getDoc(
          referralRef
        );

      if (
        snapshot.exists()
      ) {
        const data =
          snapshot.data();

        setReferralCode(
          data.code
        );

        setReferrals(
          data.count || 0
        );
      } else {
        const code =
          user.uid.slice(
            0,
            6
          );

        await setDoc(
          referralRef,
          {
            code,
            count: 0
          }
        );

        setReferralCode(
          code
        );
      }
    } catch (error) {
      console.error(
        error
      );
    }
  }

  function copyCode() {
    navigator.clipboard.writeText(
      referralCode
    );

    alert(
      "Referral code copied!"
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
            "1000px",

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
            Referral Program
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
            Invite friends and
            earn rewards
          </p>
        </div>

        <div
          style={{
            display:
              "grid",

            gridTemplateColumns:
              isMobile
                ? "1fr"
                : "1fr 1fr",

            gap: "30px",

            marginBottom:
              "40px"
          }}
        >
          <div
            style={{
              background:
                "white",

              padding:
                "40px",

              borderRadius:
                "24px",

              boxShadow:
                "0 10px 30px rgba(0,0,0,0.08)"
            }}
          >
            <h2
              style={{
                marginBottom:
                  "20px"
              }}
            >
              Your Referral Code
            </h2>

            <div
              style={{
                background:
                  "#f1f5f9",

                padding:
                  "20px",

                borderRadius:
                  "18px",

                fontSize:
                  "32px",

                fontWeight:
                  "bold",

                marginBottom:
                  "25px",

                textAlign:
                  "center"
              }}
            >
              {
                referralCode
              }
            </div>

            <button
              onClick={
                copyCode
              }
              style={{
                background:
                  "#22d3ee",

                border:
                  "none",

                padding:
                  "16px",

                borderRadius:
                  "14px",

                color:
                  "white",

                fontWeight:
                  "bold",

                fontSize:
                  "16px",

                cursor:
                  "pointer",

                width:
                  "100%"
              }}
            >
              Copy Referral Code
            </button>
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
              Successful Referrals
            </h2>

            <h1
              style={{
                fontSize:
                  "72px"
              }}
            >
              🎁 {referrals}
            </h1>

            <p
              style={{
                marginTop:
                  "20px",

                lineHeight:
                  "1.8"
              }}
            >
              Earn premium perks
              and rewards for
              every successful
              referral.
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
              "0 10px 30px rgba(0,0,0,0.08)"
          }}
        >
          <h1
            style={{
              marginBottom:
                "30px"
            }}
          >
            Referral Rewards
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
              🎁 1 Referral →
              Unlock 1 Premium
              Mock Test
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
              🚀 5 Referrals →
              1 Month Premium
              Access
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
              🏆 20 Referrals →
              VIP Mentor Session
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}