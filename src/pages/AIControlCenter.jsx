import { useNavigate } from "react-router-dom";

export default function AIControlCenter() {
  const navigate = useNavigate();

  const tools = [
    {
  title: "AI IELTS Coach",
  description:
    "Chat with an AI IELTS mentor.",
  action: () =>
    navigate("/ai-assistant"),
},
    {
      title: "Writing Coach",
      description:
        "Get IELTS Writing Task 1 & Task 2 feedback and band estimates.",
      action: () => navigate("/mock/writing"),
    },
    {
      title: "Speaking Coach",
      description:
        "Practice speaking responses with AI evaluation.",
      action: () => navigate("/mock/speaking"),
    },
    {
      title: "Reading Coach",
      description:
        "Improve reading accuracy and identify weaknesses.",
      action: () => navigate("/mock/reading"),
    },
    {
      title: "Listening Coach",
      description:
        "Practice IELTS listening with score tracking.",
      action: () => navigate("/mock/listening"),
    },
    {
      title: "Study Planner",
      description:
        "Generate a personalized IELTS preparation plan.",
      action: () => navigate("/planner"),
    },
    {
      title: "Performance Analytics",
      description:
        "Review your progress and identify improvement areas.",
      action: () => navigate("/performance"),
    },
  ];

  return (
    <div
      style={{
        minHeight: "100vh",
        maxWidth: "1200px",
        margin: "0 auto",
        padding: "40px",
      }}
    >
      <h1>AI Control Center</h1>

      <p
        style={{
          marginBottom: "30px",
          color: "#64748b",
        }}
      >
        Your personal IELTS AI coaching hub.
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit,minmax(300px,1fr))",
          gap: "20px",
        }}
      >
        {tools.map((tool) => (
          <div
            key={tool.title}
            style={{
              background: "#fff",
              padding: "25px",
              borderRadius: "18px",
              boxShadow:
                "0 4px 10px rgba(0,0,0,0.08)",
            }}
          >
            <h2>{tool.title}</h2>

            <p>{tool.description}</p>

            <button
              className="primary-btn"
              onClick={tool.action}
            >
              Open
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}