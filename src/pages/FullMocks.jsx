import { useNavigate } from "react-router-dom";
import PremiumGate from "../components/PremiumGate";

export default function FullMocks() {
  const navigate = useNavigate();

  const cards = [
    {
      title: "Academic Full Mock",
      duration: "2h 45m",
      description:
        "Complete IELTS Academic exam simulation.",
      path: "/mock/academic",
    },
    {
      title: "General Full Mock",
      duration: "2h 45m",
      description:
        "Complete IELTS General Training simulation.",
      path: "/mock/general",
    },
    {
      title: "Reading Test",
      duration: "60 min",
      description:
        "Three passages with IELTS-style questions.",
      path: "/mock/reading",
    },
    {
      title: "Listening Test",
      duration: "30 min",
      description:
        "Four listening sections and answer sheet.",
      path: "/mock/listening",
    },
    {
      title: "Writing Test",
      duration: "60 min",
      description:
        "Task 1 and Task 2 exam experience.",
      path: "/mock/writing",
    },
    {
      title: "Speaking Test",
      duration: "11-14 min",
      description:
        "Part 1, Part 2 and Part 3 simulation.",
      path: "/mock/speaking",
    },
  ];

  return (
    <PremiumGate>
      <div
        style={{
          minHeight: "100vh",
          padding: "40px",
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        <div
          style={{
            textAlign: "center",
            marginBottom: "50px",
          }}
        >
          <h1
            style={{
              fontSize: "48px",
              marginBottom: "15px",
            }}
          >
            IELTS Mock Test Center
          </h1>

          <p
            style={{
              fontSize: "18px",
              color: "#64748b",
            }}
          >
            Experience the IELTS exam in a
            realistic test environment.
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "24px",
          }}
        >
          {cards.map((card) => (
            <div
              key={card.title}
              style={{
                background: "#fff",
                borderRadius: "20px",
                padding: "25px",
                boxShadow:
                  "0 4px 12px rgba(0,0,0,0.08)",
              }}
            >
              <h2>{card.title}</h2>

              <p>
                <strong>Duration:</strong>{" "}
                {card.duration}
              </p>

              <p>{card.description}</p>

              <button
                onClick={() =>
                  navigate(card.path)
                }
                className="primary-btn"
              >
                Start Test
              </button>
            </div>
          ))}
        </div>

        <div
          style={{
            marginTop: "60px",
            padding: "30px",
            borderRadius: "20px",
            background: "#f8fafc",
          }}
        >
          <h2>Premium Features</h2>

          <ul>
            <li>AI Writing Evaluation</li>
            <li>AI Speaking Analysis</li>
            <li>Band Prediction</li>
            <li>Performance Analytics</li>
            <li>Detailed Score Reports</li>
          </ul>
        </div>
      </div>
    </PremiumGate>
  );
}