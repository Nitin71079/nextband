import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer
      style={{
        background: "#0f172a",
        color: "white",
        padding: "60px 40px",
        marginTop: "80px"
      }}
    >
      <div
        style={{
          maxWidth: "1300px",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit,minmax(250px,1fr))",

          gap: "40px"
        }}
      >
        <div>
          <h2
            style={{
              marginBottom: "20px"
            }}
          >
            NextBand
          </h2>

          <p
            style={{
              lineHeight: "1.8",
              color: "#cbd5e1"
            }}
          >
            Modern AI-powered
            IELTS preparation
            platform for Reading,
            Listening, Writing,
            and Speaking practice.
          </p>
        </div>

        <div>
          <h3
            style={{
              marginBottom: "20px"
            }}
          >
            Modules
          </h3>

          <div
            style={{
              display: "grid",
              gap: "10px"
            }}
          >
            <Link
              to="/reading"
              style={linkStyle}
            >
              Reading
            </Link>

            <Link
              to="/listening"
              style={linkStyle}
            >
              Listening
            </Link>

            <Link
              to="/writing"
              style={linkStyle}
            >
              Writing
            </Link>

            <Link
              to="/speaking"
              style={linkStyle}
            >
              Speaking
            </Link>
          </div>
        </div>

        <div>
          <h3
            style={{
              marginBottom: "20px"
            }}
          >
            Legal
          </h3>

          <div
            style={{
              display: "grid",
              gap: "10px"
            }}
          >
            <Link
              to="/privacy-policy"
              style={linkStyle}
            >
              Privacy Policy
            </Link>

            <Link
              to="/terms"
              style={linkStyle}
            >
              Terms &
              Conditions
            </Link>

            <Link
              to="/contact"
              style={linkStyle}
            >
              Contact
            </Link>
          </div>
        </div>

        <div>
          <h3
            style={{
              marginBottom: "20px"
            }}
          >
            Future Upgrades
          </h3>

          <p>
            AI Essay Scoring
          </p>

          <p>
            Pronunciation
            Analysis
          </p>

          <p>
            Adaptive Learning
          </p>

          <p>
            Full Mock Exams
          </p>
        </div>
      </div>

      <div
        style={{
          borderTop:
            "1px solid rgba(255,255,255,0.1)",

          marginTop: "50px",

          paddingTop: "30px",

          textAlign: "center",

          color: "#94a3b8"
        }}
      >
        © 2026 NextBand. All
        rights reserved.
      </div>
    </footer>
  );
}

const linkStyle = {
  color: "#cbd5e1",
  textDecoration: "none"
};