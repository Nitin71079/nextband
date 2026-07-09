import { useState } from "react";
import toast from "react-hot-toast";

import { startCheckout } from "../services/billingService";
import { useAuth } from "../context/AuthContext";

export default function PricingCard({
  title,
  price,
  features,
}) {
  const { user } = useAuth();

  const [loading, setLoading] =
    useState(false);

  async function handleCheckout() {
    if (title === "Free") {
      toast.success("Welcome to Knarrow!");
      return;
    }

    if (!user) {
      toast.error(
        "Please sign in to continue."
      );
      return;
    }

    try {
      setLoading(true);

      await startCheckout(title);

    } catch (err) {
      console.error(err);

      toast.error(
        err.message ||
          "Unable to start checkout."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      style={{
        background: "#fff",
        padding: "30px",
        borderRadius: "20px",
        boxShadow:
          "0 10px 30px rgba(0,0,0,.08)",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {title === "Premium 3 Months" && (
        <div
          style={{
            background: "#2563eb",
            color: "#fff",
            padding: "8px 14px",
            borderRadius: "999px",
            display: "inline-block",
            marginBottom: "15px",
            fontWeight: "bold",
            width: "fit-content",
          }}
        >
          MOST POPULAR
        </div>
      )}

      <h2>{title}</h2>

      {title === "Premium 3 Months" && (
        <p
          style={{
            color: "#16a34a",
            fontWeight: "bold",
            marginTop: "-10px",
            marginBottom: "20px",
          }}
        >
          Save ₹98
        </p>
      )}

      <h1
        style={{
          fontSize: "48px",
          margin: "20px 0",
        }}
      >
        ₹{price}

        <span
          style={{
            fontSize: "18px",
            fontWeight: 400,
            color: "#64748b",
          }}
        >
          {title === "Premium Monthly"
            ? "/month"
            : title ===
              "Premium 3 Months"
            ? "/3 months"
            : ""}
        </span>
      </h1>

      <ul
        style={{
          flex: 1,
          lineHeight: 2,
          paddingLeft: "20px",
        }}
      >
        {features.map(
          (feature, index) => (
            <li key={index}>
              {feature}
            </li>
          )
        )}
      </ul>

      <button
        className="primary-btn"
        disabled={loading}
        onClick={handleCheckout}
        style={{
          width: "100%",
          marginTop: "25px",
          padding: "14px",
          fontSize: "16px",
          fontWeight: "bold",
          opacity: loading ? 0.7 : 1,
          cursor: loading
            ? "not-allowed"
            : "pointer",
        }}
      >
        {title === "Free"
          ? "Get Started"
          : loading
          ? "Opening Razorpay..."
          : "Upgrade Now"}
      </button>
    </div>
  );
}