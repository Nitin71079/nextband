import "./Features.css";

import {
  BookOpen,
  Headphones,
  PenSquare,
  Mic,
  BrainCircuit,
  BarChart3,
} from "lucide-react";

export default function Features() {
  const features = [
    {
      icon: <BookOpen size={34} />,
      title: "Reading",
      description:
        "Real IELTS CBT reading tests with timer, passages, answers and detailed performance reports.",
      color: "#3b82f6",
    },

    {
      icon: <Headphones size={34} />,
      title: "Listening",
      description:
        "Authentic listening tests with synchronized audio and automatic scoring.",
      color: "#8b5cf6",
    },

    {
      icon: <PenSquare size={34} />,
      title: "Writing",
      description:
        "AI evaluates your essays like an IELTS examiner with detailed feedback.",
      color: "#f59e0b",
    },

    {
      icon: <Mic size={34} />,
      title: "Speaking",
      description:
        "Practice speaking with AI and receive fluency, grammar and pronunciation analysis.",
      color: "#22c55e",
    },

    {
      icon: <BrainCircuit size={34} />,
      title: "AI Coach",
      description:
        "Personalized study plans, recommendations and instant IELTS assistance.",
      color: "#06b6d4",
    },

    {
      icon: <BarChart3 size={34} />,
      title: "Analytics",
      description:
        "Track your progress with detailed performance analytics and predicted IELTS band.",
      color: "#ef4444",
    },
  ];

  return (
    <section className="features">

      <div className="features-header">

        <span>WHY NEXTBAND</span>

        <h2>

          Everything You Need
          To Score Higher

        </h2>

        <p>

          A complete AI-powered IELTS preparation platform
          built to help you achieve your dream band score.

        </p>

      </div>

      <div className="features-grid">

        {features.map((feature) => (

          <div
            key={feature.title}
            className="feature-card"
          >

            <div
              className="feature-icon"
              style={{
                background: feature.color,
              }}
            >
              {feature.icon}
            </div>

            <h3>{feature.title}</h3>

            <p>{feature.description}</p>

          </div>

        ))}

      </div>

    </section>
  );
}