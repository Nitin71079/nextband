import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(to bottom right,#0f172a,#1e293b)",

        color: "white",

        display: "flex",

        justifyContent:
          "center",

        alignItems: "center",

        textAlign: "center",

        padding: "40px",

        fontFamily: "Arial"
      }}
    >
      <div>
        <h1
          style={{
            fontSize: "120px",
            marginBottom: "20px"
          }}
        >
          404
        </h1>

        <h2
          style={{
            fontSize: "42px",
            marginBottom: "20px"
          }}
        >
          Page Not Found
        </h2>

        <p
          style={{
            fontSize: "20px",
            color: "#cbd5e1",
            marginBottom: "40px",
            lineHeight: "1.8"
          }}
        >
          The page you are
          looking for does not
          exist or has been moved.
        </p>

        <Link
          to="/"
          style={{
            background: "#22d3ee",
            color: "black",
            padding: "18px 34px",
            borderRadius: "16px",
            textDecoration: "none",
            fontWeight: "bold",
            fontSize: "18px"
          }}
        >
          Go Back Home
        </Link>
      </div>
    </div>
  );
}