import {
  useEffect,
  useState
} from "react";

import {
  useNavigate
} from "react-router-dom";

import {
  getFirestore,
  doc,
  getDoc
} from "firebase/firestore";

import { app } from "../firebase";

import {
  useAuth
} from "../context/AuthContext";

import { stripePromise } from "../utils/stripe";

export default function PremiumGate({
  children
}) {
  const { user } =
    useAuth();

  const navigate =
    useNavigate();

  const [loading,
    setLoading] =
    useState(true);

  const [isPremium,
    setIsPremium] =
    useState(false);

  useEffect(() => {
    async function checkPremium() {
      try {
        if (!user) {
          setLoading(
            false
          );

          return;
        }

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
          const userData =
            snapshot.data();

          setIsPremium(
            userData.premium
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

    checkPremium();
  }, [user]);

  async function handleUpgrade() {
    try {
      const stripe =
        await stripePromise;

      await stripe.redirectToCheckout(
        {
          lineItems: [
            {
              price:
                "price_1TaUbCQhiTO43lNuwLH00Xvf",

              quantity: 1
            }
          ],

          mode:
            "subscription",

          successUrl:
            window.location.origin +
            "/dashboard",

          cancelUrl:
            window.location.origin
        }
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
            "#f8fafc",

          fontSize:
            "24px",

          fontWeight:
            "bold"
        }}
      >
        Loading...
      </div>
    );
  }

  if (!user) {
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
            "#f8fafc",

          padding:
            "30px"
        }}
      >
        <div
          style={{
            background:
              "white",

            padding:
              "50px",

            borderRadius:
              "24px",

            maxWidth:
              "600px",

            textAlign:
              "center",

            boxShadow:
              "0 10px 30px rgba(0,0,0,0.08)"
          }}
        >
          <h1
            style={{
              fontSize:
                "42px",

              marginBottom:
                "20px"
            }}
          >
            Login Required
          </h1>

          <p
            style={{
              lineHeight:
                "1.8",

              color:
                "#64748b",

              marginBottom:
                "30px"
            }}
          >
            Please login to
            access premium
            IELTS features.
          </p>

          <button
            onClick={() =>
              navigate(
                "/login"
              )
            }
            style={{
              background:
                "#22d3ee",

              border:
                "none",

              padding:
                "16px 32px",

              borderRadius:
                "14px",

              fontWeight:
                "bold",

              cursor:
                "pointer",

              fontSize:
                "18px"
            }}
          >
            Go To Login
          </button>
        </div>
      </div>
    );
  }

  if (!isPremium) {
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
            "#f8fafc",

          padding:
            "30px"
        }}
      >
        <div
          style={{
            background:
              "white",

            padding:
              "50px",

            borderRadius:
              "24px",

            maxWidth:
              "650px",

            textAlign:
              "center",

            boxShadow:
              "0 10px 30px rgba(0,0,0,0.08)"
          }}
        >
          <h1
            style={{
              fontSize:
                "46px",

              marginBottom:
                "20px"
            }}
          >
            Premium Feature
          </h1>

          <p
            style={{
              lineHeight:
                "1.9",

              color:
                "#64748b",

              marginBottom:
                "35px"
            }}
          >
            Unlock advanced
            analytics, AI
            scoring, full
            mock exams,
            premium
            speaking
            feedback, and
            personalized
            IELTS coaching.
          </p>

          <button
            onClick={
              handleUpgrade
            }
            style={{
              background:
                "#22c55e",

              border:
                "none",

              padding:
                "18px 36px",

              borderRadius:
                "16px",

              fontWeight:
                "bold",

              cursor:
                "pointer",

              fontSize:
                "18px",

              color:
                "white"
            }}
          >
            Upgrade To Premium
          </button>
        </div>
      </div>
    );
  }

  return children;
}