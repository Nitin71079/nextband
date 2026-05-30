import {
  Link
} from "react-router-dom";

export default function Footer() {
  return (
    <footer
      style={{
        marginTop: "100px",

        padding:
          "60px 20px",

        background:
          "#0f172a",

        color: "white"
      }}
    >
      <div className="container">
        <div
          style={{
            display: "grid",

            gridTemplateColumns:
              "repeat(auto-fit,minmax(220px,1fr))",

            gap: "40px"
          }}
        >
          {/* BRAND */}

          <div>
            <h2
              style={{
                marginBottom:
                  "20px",

                color:
                  "#22d3ee"
              }}
            >
              NextBand
            </h2>

            <p
              style={{
                lineHeight:
                  "1.8",

                opacity: 0.8
              }}
            >
              AI-powered IELTS
              preparation platform
              helping students
              improve smarter and
              faster.
            </p>
          </div>

          {/* LINKS */}

          <div>
            <h3
              style={{
                marginBottom:
                  "20px"
              }}
            >
              Platform
            </h3>

            <div
              style={{
                display: "flex",

                flexDirection:
                  "column",

                gap: "12px",

                opacity: 0.85
              }}
            >
              <Link to="/dashboard">
                Dashboard
              </Link>

              <Link to="/ai-assistant">
                AI Assistant
              </Link>

              <Link to="/planner">
                Study Planner
              </Link>

              <Link to="/community">
                Community
              </Link>
            </div>
          </div>

          {/* FEATURES */}

          <div>
            <h3
              style={{
                marginBottom:
                  "20px"
              }}
            >
              Features
            </h3>

            <div
              style={{
                display: "flex",

                flexDirection:
                  "column",

                gap: "12px",

                opacity: 0.85
              }}
            >
              <div>
                AI Speaking
              </div>

              <div>
                Writing Evaluation
              </div>

              <div>
                Mock Tests
              </div>

              <div>
                Performance Analytics
              </div>
            </div>
          </div>

          {/* CONTACT */}

          <div>
            <h3
              style={{
                marginBottom:
                  "20px"
              }}
            >
              Contact
            </h3>

            <div
              style={{
                display: "flex",

                flexDirection:
                  "column",

                gap: "12px",

                opacity: 0.85
              }}
            >
              <div>
                hello@nextband.ai
              </div>

              <div>
                support@nextband.ai
              </div>

              <div>
                Global AI IELTS
                Platform
              </div>
            </div>
          </div>
        </div>

        {/* BOTTOM */}

        <div
          style={{
            marginTop:
              "60px",

            paddingTop:
              "25px",

            borderTop:
              "1px solid rgba(255,255,255,0.1)",

            textAlign:
              "center",

            opacity: 0.7
          }}
        >
          © 2026 NextBand.
          All rights reserved.
        </div>
      </div>
    </footer>
  );
}