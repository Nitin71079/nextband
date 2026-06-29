import "./Stats.css";
import {
  Users,
  Brain,
  BookOpen,
  Trophy,
} from "lucide-react";

export default function Stats() {
  const stats = [
    {
      icon: <Users size={34} />,
      number: "10,000+",
      title: "Students",
      color: "#06b6d4",
    },

    {
      icon: <Brain size={34} />,
      number: "50,000+",
      title: "AI Evaluations",
      color: "#8b5cf6",
    },

    {
      icon: <BookOpen size={34} />,
      number: "120+",
      title: "Mock Tests",
      color: "#22c55e",
    },

    {
      icon: <Trophy size={34} />,
      number: "98%",
      title: "Success Rate",
      color: "#f59e0b",
    },
  ];

  return (
    <section className="stats-section">

      <div className="stats-container">

        {stats.map((stat) => (

          <div
            key={stat.title}
            className="stat-card"
          >

            <div
              className="stat-icon"
              style={{
                background: stat.color,
              }}
            >
              {stat.icon}
            </div>

            <h2>{stat.number}</h2>

            <p>{stat.title}</p>

          </div>

        ))}

      </div>

    </section>
  );
}