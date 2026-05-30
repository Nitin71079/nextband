import { Link } from "react-router-dom";

export default function Home() {
  const features = [
    {
      title: "AI Speaking Analysis",
      desc:
        "Practice IELTS speaking with intelligent AI-powered fluency and pronunciation feedback."
    },

    {
      title: "Writing Evaluation",
      desc:
        "Receive essay corrections, grammar improvements, and estimated IELTS band scores."
    },

    {
      title: "Full Mock Tests",
      desc:
        "Simulate realistic IELTS exams with timers, analytics, and progress tracking."
    },

    {
      title: "Smart Study Planner",
      desc:
        "Build personalized study schedules and maintain learning consistency."
    },

    {
      title: "Performance Analytics",
      desc:
        "Track progress, strengths, weaknesses, and study streaks visually."
    },

    {
      title: "AI IELTS Assistant",
      desc:
        "Ask IELTS questions instantly and receive smart AI-powered guidance."
    }
  ];

  const stats = [
    {
      number: "10K+",
      label: "Practice Sessions"
    },

    {
      number: "95%",
      label: "Student Satisfaction"
    },

    {
      number: "24/7",
      label: "AI Assistance"
    },

    {
      number: "140+",
      label: "Countries Reached"
    }
  ];

  const isMobile =
    window.innerWidth < 768;

  return (
    <div className="fade-in">
      {/* HERO */}

      <section
        style={{
          padding:
            isMobile
              ? "90px 20px"
              : "120px 20px",

          textAlign:
            "center"
        }}
      >
        <div className="container">
          <span className="badge">
            AI-Powered IELTS
            Platform
          </span>

          <h1
            style={{
              fontSize:
                isMobile
                  ? "42px"
                  : "72px",

              lineHeight:
                "1.1",

              marginTop:
                "25px",

              fontWeight:
                "900"
            }}
          >
            Master IELTS
            <br />
            Smarter with AI 🚀
          </h1>

          <p
            style={{
              maxWidth:
                "800px",

              margin:
                "30px auto",

              lineHeight:
                "1.9",

              color:
                "#64748b",

              fontSize:
                isMobile
                  ? "16px"
                  : "20px"
            }}
          >
            NextBand combines
            artificial
            intelligence, smart
            analytics, mock
            tests, and
            personalized
            learning tools to
            help students
            achieve higher IELTS
            bands faster and
            more effectively.
          </p>

          <div
            style={{
              display: "flex",

              justifyContent:
                "center",

              gap: "20px",

              flexWrap:
                "wrap",

              marginTop:
                "40px"
            }}
          >
            <Link to="/register">
              <button className="primary-btn">
                Start Free
              </button>
            </Link>

            <Link to="/full-mocks">
              <button className="secondary-btn">
                Explore Premium
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* STATS */}

      <section className="container">
        <div className="grid">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="card"
              style={{
                textAlign:
                  "center"
              }}
            >
              <h2
                style={{
                  fontSize:
                    isMobile
                      ? "40px"
                      : "52px",

                  color:
                    "#22d3ee",

                  marginBottom:
                    "10px"
                }}
              >
                {stat.number}
              </h2>

              <p
                style={{
                  color:
                    "#64748b",

                  fontWeight:
                    "600"
                }}
              >
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURES */}

      <section
        className="container"
        style={{
          marginTop:
            "100px"
        }}
      >
        <h2
          className="section-title"
          style={{
            textAlign:
              "center"
          }}
        >
          Everything You Need
          for IELTS Success
        </h2>

        <p
          className="section-subtitle"
          style={{
            textAlign:
              "center",

            maxWidth:
              "700px",

            margin:
              "0 auto 60px"
          }}
        >
          NextBand provides
          modern AI-powered
          learning systems to
          help students improve
          speaking, writing,
          reading, listening,
          and overall IELTS
          performance.
        </p>

        <div className="grid">
          {features.map(
            (feature) => (
              <div
                key={
                  feature.title
                }
                className="card"
              >
                <h2
                  style={{
                    marginBottom:
                      "18px",

                    fontSize:
                      "28px"
                  }}
                >
                  {
                    feature.title
                  }
                </h2>

                <p
                  style={{
                    color:
                      "#64748b",

                    lineHeight:
                      "1.8"
                  }}
                >
                  {
                    feature.desc
                  }
                </p>
              </div>
            )
          )}
        </div>
      </section>

      {/* HOW IT WORKS */}

      <section
        className="container"
        style={{
          marginTop:
            "120px"
        }}
      >
        <h2
          className="section-title"
          style={{
            textAlign:
              "center"
          }}
        >
          How NextBand Works
        </h2>

        <div
          className="grid"
          style={{
            marginTop:
              "60px"
          }}
        >
          <div className="card">
            <h2
              style={{
                marginBottom:
                  "15px"
              }}
            >
              1. Practice Daily
            </h2>

            <p
              style={{
                color:
                  "#64748b",

                lineHeight:
                  "1.8"
              }}
            >
              Improve speaking,
              writing, reading,
              and listening
              through AI-powered
              exercises.
            </p>
          </div>

          <div className="card">
            <h2
              style={{
                marginBottom:
                  "15px"
              }}
            >
              2. Receive AI
              Feedback
            </h2>

            <p
              style={{
                color:
                  "#64748b",

                lineHeight:
                  "1.8"
              }}
            >
              Analyze mistakes,
              fluency, grammar,
              and vocabulary
              using intelligent
              AI systems.
            </p>
          </div>

          <div className="card">
            <h2
              style={{
                marginBottom:
                  "15px"
              }}
            >
              3. Track
              Improvement
            </h2>

            <p
              style={{
                color:
                  "#64748b",

                lineHeight:
                  "1.8"
              }}
            >
              Monitor performance
              analytics, study
              streaks, and IELTS
              band progress over
              time.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}

      <section
        style={{
          padding:
            "120px 20px"
        }}
      >
        <div
          className="container card"
          style={{
            textAlign:
              "center"
          }}
        >
          <h2
            style={{
              fontSize:
                isMobile
                  ? "36px"
                  : "54px",

              marginBottom:
                "25px"
            }}
          >
            Ready to Achieve
            Your IELTS Goals?
          </h2>

          <p
            style={{
              color:
                "#64748b",

              lineHeight:
                "1.9",

              maxWidth:
                "700px",

              margin:
                "0 auto 40px"
            }}
          >
            Join students using
            AI-powered learning
            tools to prepare
            smarter, faster, and
            more effectively.
          </p>

          <Link to="/register">
            <button className="primary-btn">
              Start Learning Now
            </button>
          </Link>
        </div>
      </section>
    </div>
  );
}