import { Link } from "react-router-dom";

export default function Success() {
  return (
    <div className="container fade-in">
      <div
        className="card"
        style={{
          textAlign: "center",
          padding: "100px 30px",
        }}
      >
        <div
          style={{
            fontSize: "80px",
            marginBottom: "25px",
          }}
        >
          🎉
        </div>

        <h1 className="section-title">
          Payment Successful
        </h1>

        <p
          className="section-subtitle"
          style={{
            maxWidth: "700px",
            margin: "0 auto 40px",
          }}
        >
          Thank you for your purchase.
          Your payment was received successfully.
          Premium access will be activated
          automatically after payment verification.
        </p>

        <Link to="/dashboard">
          <button className="primary-btn">
            Go To Dashboard
          </button>
        </Link>
      </div>
    </div>
  );
}