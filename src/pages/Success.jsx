import { Link } from "react-router-dom";

export default function Success() {
  return (
    <div className="container fade-in">
      <div
        className="card"
        style={{
          textAlign: "center",
          padding: "100px 30px",
          maxWidth: "900px",
          margin: "0 auto",
        }}
      >
        <div
          style={{
            fontSize: "90px",
            marginBottom: "25px",
          }}
        >
          🎉
        </div>

        <h1 className="section-title">
          Payment Successful
        </h1>

        <div
          style={{
            background: "#dcfce7",
            color: "#166534",
            padding: "15px",
            borderRadius: "12px",
            fontWeight: "bold",
            margin: "20px auto 30px",
            maxWidth: "500px",
          }}
        >
          Premium Plan Activated
        </div>

        <p
          className="section-subtitle"
          style={{
            maxWidth: "700px",
            margin: "0 auto 40px",
          }}
        >
          Thank you for your purchase.
          Your premium subscription
          has been activated
          successfully.
        </p>

        <div
          style={{
            background: "#f8fafc",
            padding: "30px",
            borderRadius: "16px",
            textAlign: "left",
            maxWidth: "700px",
            margin: "0 auto 40px",
          }}
        >
          <h2>
            Premium Features
            Unlocked
          </h2>

          <ul
            style={{
              lineHeight: "2",
              marginTop: "15px",
            }}
          >
            <li>GPT Writing Evaluation</li>
            <li>GPT Speaking Evaluation</li>
            <li>Advanced Analytics</li>
            <li>AI Coach</li>
            <li>Forecast Engine</li>
            <li>Expert Marketplace</li>
            <li>Premium Mock Tests</li>
            <li>Future Premium Updates</li>
          </ul>
        </div>

        <div
          style={{
            display: "flex",
            gap: "15px",
            justifyContent: "center",
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
    </div>
  );
}