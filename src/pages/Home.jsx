import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(to bottom right,#0f172a,#1e293b)",

        color: "white",
        fontFamily: "Arial"
      }}
    >
      <section
        style={{
          maxWidth: "1300px",
          margin: "0 auto",
          padding:
            "100px 40px"
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit,minmax(400px,1fr))",

            alignItems: "center",
            gap: "60px"
          }}
        >
          <div>
            <h1
              style={{
                fontSize: "72px",
                lineHeight: "1.1",
                marginBottom: "30px"
              }}
            >
              Achieve Your
              Dream IELTS
              Band
            </h1>

            <p
              style={{
                fontSize: "22px",
                lineHeight: "1.8",
                color: "#cbd5e1",
                marginBottom: "40px"
              }}
            >
              NextBand is a
              modern AI-powered
              IELTS preparation
              platform designed
              to help students
              improve Reading,
              Listening,
              Writing, and
              Speaking with
              realistic test
              simulations and
              analytics.
            </p>

            <div
              style={{
                display: "flex",
                gap: "20px",
                flexWrap: "wrap"
              }}
            >
              <Link
                to="/reading"
                style={{
                  background:
                    "#22d3ee",

                  color: "black",

                  padding:
                    "18px 34px",

                  borderRadius:
                    "16px",

                  textDecoration:
                    "none",

                  fontWeight:
                    "bold",

                  fontSize:
                    "18px"
                }}
              >
                Start Practice
              </Link>

              <Link
                to="/dashboard"
                style={{
                  background:
                    "transparent",

                  border:
                    "2px solid #22d3ee",

                  color:
                    "#22d3ee",

                  padding:
                    "18px 34px",

                  borderRadius:
                    "16px",

                  textDecoration:
                    "none",

                  fontWeight:
                    "bold",

                  fontSize:
                    "18px"
                }}
              >
                View Dashboard
              </Link>
            </div>
          </div>

          <div
            style={{
              background:
                "rgba(255,255,255,0.05)",

              border:
                "1px solid rgba(255,255,255,0.1)",

              padding: "40px",

              borderRadius:
                "30px",

              backdropFilter:
                "blur(10px)"
            }}
          >
            <h2
              style={{
                marginBottom: "30px",
                fontSize: "36px"
              }}
            >
              Why Choose
              NextBand?
            </h2>

            <div
              style={{
                display: "grid",
                gap: "24px"
              }}
            >
              <div>
                <h3>
                  Real IELTS
                  Simulations
                </h3>

                <p
                  style={{
                    color:
                      "#cbd5e1"
                  }}
                >
                  Experience
                  authentic exam
                  environments
                  with timers,
                  scoring, and
                  analytics.
                </p>
              </div>

              <div>
                <h3>
                  AI-Powered
                  Future
                </h3>

                <p
                  style={{
                    color:
                      "#cbd5e1"
                  }}
                >
                  Upcoming AI
                  essay scoring,
                  pronunciation
                  analysis, and
                  adaptive
                  learning.
                </p>
              </div>

              <div>
                <h3>
                  Performance
                  Analytics
                </h3>

                <p
                  style={{
                    color:
                      "#cbd5e1"
                  }}
                >
                  Track your
                  band scores,
                  progress, and
                  improvement
                  over time.
                </p>
              </div>

              <div>
                <h3>
                  Modern Learning
                  Experience
                </h3>

                <p
                  style={{
                    color:
                      "#cbd5e1"
                  }}
                >
                  Built with
                  modern
                  full-stack
                  technologies
                  and scalable
                  architecture.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        style={{
          maxWidth: "1300px",
          margin: "0 auto",
          padding:
            "0 40px 100px"
        }}
      >
        <h2
          style={{
            textAlign: "center",
            fontSize: "48px",
            marginBottom: "60px"
          }}
        >
          Modules
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit,minmax(260px,1fr))",

            gap: "30px"
          }}
        >
          {[
            {
              title:
                "Reading",
              desc:
                "Practice academic reading passages with scoring and timing."
            },

            {
              title:
                "Listening",
              desc:
                "Train with IELTS listening simulations and audio tests."
            },

            {
              title:
                "Writing",
              desc:
                "Improve essay writing with structured tasks and future AI feedback."
            },

            {
              title:
                "Speaking",
              desc:
                "Practice speaking parts, cue cards, and discussion rounds."
            }
          ].map(
            (
              item,
              index
            ) => (
              <div
                key={index}
                style={{
                  background:
                    "rgba(255,255,255,0.05)",

                  padding:
                    "30px",

                  borderRadius:
                    "24px",

                  border:
                    "1px solid rgba(255,255,255,0.08)"
                }}
              >
                <h2
                  style={{
                    marginBottom:
                      "20px"
                  }}
                >
                  {
                    item.title
                  }
                </h2>

                <p
                  style={{
                    color:
                      "#cbd5e1",

                    lineHeight:
                      "1.8"
                  }}
                >
                  {item.desc}
                </p>
              </div>
            )
          )}
        </div>
      </section>
    </div>
  );
}