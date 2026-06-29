import { Link } from "react-router-dom";
import {
  BookOpen,
  Headphones,
  PenSquare,
  Mic,
  BrainCircuit,
  CalendarDays,
  BarChart3,
  Rocket,
} from "lucide-react";

export default function QuickActions() {

  const quickActions = [

    {
      title: "Reading",
      subtitle: "Practice Passages",
      icon: <BookOpen size={28} />,
      path: "/reading",
      color: "#3b82f6",
      badge: "120 Questions",
    },

    {
      title: "Listening",
      subtitle: "Audio Tests",
      icon: <Headphones size={28} />,
      path: "/listening",
      color: "#8b5cf6",
      badge: "30 Tests",
    },

    {
      title: "Writing",
      subtitle: "AI Evaluation",
      icon: <PenSquare size={28} />,
      path: "/writing",
      color: "#f59e0b",
      badge: "AI Powered",
    },

    {
      title: "Speaking",
      subtitle: "AI Speaking",
      icon: <Mic size={28} />,
      path: "/speaking",
      color: "#22c55e",
      badge: "Live AI",
    },

    {
      title: "AI Center",
      subtitle: "Coach + Assistant",
      icon: <BrainCircuit size={28} />,
      path: "/ai-center",
      color: "#06b6d4",
      badge: "Premium",
    },

    {
      title: "Planner",
      subtitle: "Study Schedule",
      icon: <CalendarDays size={28} />,
      path: "/planner",
      color: "#ec4899",
      badge: "Daily",
    },

    {
      title: "Analytics",
      subtitle: "Track Progress",
      icon: <BarChart3 size={28} />,
      path: "/analytics",
      color: "#14b8a6",
      badge: "Insights",
    },

    {
      title: "Full Mock",
      subtitle: "Complete IELTS",
      icon: <Rocket size={28} />,
      path: "/full-mocks",
      color: "#ef4444",
      badge: "2h 45m",
    },

  ];

  return (

    <section className="dashboard-section">

      <div className="section-header">

        <div>

          <h2>

            Quick Actions

          </h2>

          <p>

            Jump directly into any IELTS module.

          </p>

        </div>

      </div>

      <div className="quick-grid">

        {quickActions.map((item) => (

          <Link
            key={item.title}
            to={item.path}
            className="quick-card"
          >

            <div
              className="quick-icon"
              style={{
                background: item.color,
              }}
            >

              {item.icon}

            </div>

            <h3>

              {item.title}

            </h3>

            <p>

              {item.subtitle}

            </p>

            <span className="quick-badge">

              {item.badge}

            </span>

          </Link>

        ))}

      </div>

    </section>

  );

}