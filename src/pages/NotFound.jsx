import { Link }
from "react-router-dom";

export default function NotFound() {
  return (
    <div className="container fade-in">
      <div
        className="card"
        style={{
          textAlign:
            "center",

          padding:
            "100px 30px"
        }}
      >
        <h1
          style={{
            fontSize:
              "120px",

            color:
              "#22d3ee",

            marginBottom:
              "20px"
          }}
        >
          404
        </h1>

        <h2
          style={{
            fontSize:
              "42px",

            marginBottom:
              "20px"
          }}
        >
          Page Not Found
        </h2>

        <p
          style={{
            color:
              "#64748b",

            lineHeight:
              "1.8",

            maxWidth:
              "600px",

            margin:
              "0 auto 40px"
          }}
        >
          The page you’re
          looking for doesn’t
          exist or may have
          been moved.
        </p>

        <Link to="/">
          <button className="primary-btn">
            Return Home
          </button>
        </Link>
      </div>
    </div>
  );
}