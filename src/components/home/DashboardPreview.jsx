import "./DashboardPreview.css";
import {
  BookOpen,
  Headphones,
  PenSquare,
  Mic,
  BrainCircuit,
  TrendingUp,
} from "lucide-react";

export default function DashboardPreview() {
  const cards = [
    {
      title: "Reading",
      subtitle: "Continue Test 4",
      icon: <BookOpen size={26} />,
      color: "#3b82f6",
    },
    {
      title: "Listening",
      subtitle: "Section 3",
      icon: <Headphones size={26} />,
      color: "#8b5cf6",
    },
    {
      title: "Writing",
      subtitle: "Band 7.0",
      icon: <PenSquare size={26} />,
      color: "#f59e0b",
    },
    {
      title: "Speaking",
      subtitle: "AI Feedback",
      icon: <Mic size={26} />,
      color: "#22c55e",
    },
    {
      title: "AI Center",
      subtitle: "Coach Ready",
      icon: <BrainCircuit size={26} />,
      color: "#06b6d4",
    },
    {
      title: "Analytics",
      subtitle: "82% Progress",
      icon: <TrendingUp size={26} />,
      color: "#ef4444",
    },
  ];

  return (
    <section className="dashboard-preview-section">

      <div className="dashboard-preview-header">

        <span>PREVIEW</span>

        <h2>
          Experience The NextBand Dashboard
        </h2>

        <p>
          Your entire IELTS journey organized in one
          modern dashboard with AI guidance.
        </p>

      </div>

      <div className="dashboard-window">

        <div className="window-top">

          <div className="window-dots">

            <span className="red"></span>
            <span className="yellow"></span>
            <span className="green"></span>

          </div>

          <h3>Dashboard</h3>

        </div>

        <div className="dashboard-grid">

          {cards.map((card) => (

            <div
              className="dashboard-box"
              key={card.title}
            >

              <div
                className="dashboard-icon"
                style={{
                  background: card.color,
                }}
              >
                {card.icon}
              </div>

              <h4>{card.title}</h4>

              <p>{card.subtitle}</p>

            </div>

          ))}

        </div>

      </div>

    </section>
  );
}