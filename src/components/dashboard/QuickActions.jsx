import { Link } from "react-router-dom";
import { motion } from "framer-motion";

import {
  BookOpen,
  Headphones,
  PenSquare,
  Mic,
  BrainCircuit,
  CalendarDays,
  BarChart3,
  Rocket,
  Sparkles,
  ArrowRight,
} from "lucide-react";

export default function QuickActions() {
  const quickActions = [
    {
      title: "Reading",
      subtitle: "Practice Passages",
      description: "Academic IELTS Reading",
      icon: BookOpen,
      path: "/reading",
      color: "blue",
      badge: "120 Questions",
    },
    {
      title: "Listening",
      subtitle: "Audio Tests",
      description: "Official IELTS Format",
      icon: Headphones,
      path: "/listening",
      color: "purple",
      badge: "30 Tests",
    },
    {
      title: "Writing",
      subtitle: "AI Evaluation",
      description: "Instant Band Score",
      icon: PenSquare,
      path: "/writing",
      color: "orange",
      badge: "AI Powered",
    },
    {
      title: "Speaking",
      subtitle: "AI Speaking",
      description: "Real-time Feedback",
      icon: Mic,
      path: "/speaking",
      color: "green",
      badge: "Live AI",
    },
    {
      title: "AI Center",
      subtitle: "Coach + Assistant",
      description: "Study Smarter",
      icon: BrainCircuit,
      path: "/ai-center",
      color: "cyan",
      badge: "Premium",
    },
    {
      title: "Planner",
      subtitle: "Study Schedule",
      description: "Daily Goals",
      icon: CalendarDays,
      path: "/planner",
      color: "pink",
      badge: "Daily",
    },
    {
      title: "Analytics",
      subtitle: "Track Progress",
      description: "Performance Insights",
      icon: BarChart3,
      path: "/analytics",
      color: "teal",
      badge: "Insights",
    },
    {
      title: "Full Mock",
      subtitle: "Complete IELTS",
      description: "Exam Simulation",
      icon: Rocket,
      path: "/full-mocks",
      color: "red",
      badge: "2h 45m",
    },
  ];

  return (
    <motion.section
      className="dashboard-section"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <div className="section-header">
        <div>
          <span className="badge">
            <Sparkles size={14} />
            AI Learning Hub
          </span>

          <h2>Quick Actions</h2>

          <p>
            Jump into any IELTS module with one click.
          </p>
        </div>
      </div>

      <div className="quick-grid">
        {quickActions.map((item, index) => {
          const Icon = item.icon;

          return (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
            >
              <Link
                to={item.path}
                className={`quick-card ${item.color}`}
              >
                <div className="quick-top">
                  <div
                    className={`quick-icon ${item.color}`}
                  >
                    <Icon size={28} />
                  </div>

                  <span className="quick-badge">
                    {item.badge}
                  </span>
                </div>

                <div className="quick-body">
                  <h3>{item.title}</h3>

                  <p>{item.subtitle}</p>

                  <small>
                    {item.description}
                  </small>
                </div>

                <div className="quick-footer">
                  <span>Open Module</span>

                  <ArrowRight size={18} />
                </div>
              </Link>
            </motion.div>
          );
        })}
      </div>

      <motion.div
        className="quick-bottom-banner"
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4 }}
      >
        <div className="quick-banner-left">
          <BrainCircuit size={28} />

          <div>
            <h3>
              AI Coach Recommendation
            </h3>

            <p>
              Complete one Listening practice today
              to increase your predicted IELTS
              score.
            </p>
          </div>
        </div>

        <Link
          to="/ai-center"
          className="quick-banner-btn"
        >
          Open AI Coach

          <ArrowRight size={18} />
        </Link>
      </motion.div>
    </motion.section>
  );
} 