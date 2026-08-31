import { useEffect } from "react";
import { Link } from "react-router-dom";
import { activateUserPlan } from "../utils/planAccess";

export default function PaymentSuccess() {
  useEffect(() => {
    activateUserPlan("all_access_monthly", "all_access");
  }, []);
  return (
    <div
      style={{
        maxWidth: "800px",
        margin: "100px auto",
        textAlign: "center",
        padding: "20px",
      }}
    >
      <h1>🎉 Payment Successful</h1>

      <p>
        Welcome to Knarrow Premium.
      </p>

      <p>
        Your premium features are now available.
      </p>

      <div
        style={{
          marginTop: "30px",
          display: "flex",
          justifyContent: "center",
          gap: "15px",
          flexWrap: "wrap",
        }}
      >
        <Link to="/dashboard">
          <button className="primary-btn">
            Go To Dashboard
          </button>
        </Link>

        <Link to="/analytics">
          <button className="secondary-btn">
            View Analytics
          </button>
        </Link>

        <Link to="/ai-center">
          <button className="secondary-btn">
            Open AI Center
          </button>
        </Link>
      </div>
    </div>
  );
}