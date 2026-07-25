import "./Features.css";
import { motion } from "framer-motion";

import {
  BookOpen,
  Headphones,
  PenSquare,
  Mic,
  BrainCircuit,
  BarChart3,
  ArrowRight,
  Sparkles,
} from "lucide-react";

export default function Features() {

  const features = [

    {
      icon: BookOpen,
      title: "Reading",
      description:
        "Real IELTS CBT reading tests with timers, passages, answer review and detailed analytics.",
      color:"#2563eb",
      badge:"120 Questions",
    },

    {
      icon: Headphones,
      title: "Listening",
      description:
        "Practice authentic listening tests with synchronized audio and automatic scoring.",
      color:"#8b5cf6",
      badge:"30 Tests",
    },

    {
      icon: PenSquare,
      title:"Writing",
      description:
        "Receive AI evaluation based on IELTS band descriptors with detailed feedback.",
      color:"#f59e0b",
      badge:"AI Powered",
    },

    {
      icon: Mic,
      title:"Speaking",
      description:
        "Practice with AI and improve pronunciation, fluency and grammar naturally.",
      color:"#22c55e",
      badge:"Live AI",
    },

    {
      icon: BrainCircuit,
      title:"AI Coach",
      description:
        "Personalized study plans, recommendations and instant IELTS assistance.",
      color:"#06b6d4",
      badge:"24/7 Coach",
    },

    {
      icon: BarChart3,
      title:"Analytics",
      description:
        "Track progress with detailed performance reports and predicted IELTS bands.",
      color:"#ef4444",
      badge:"Insights",
    },

  ];

  return (
        <motion.section
      className="features"
      initial={{
        opacity: 0,
      }}
      whileInView={{
        opacity: 1,
      }}
      viewport={{
        once: true,
      }}
      transition={{
        duration: 0.6,
      }}
    >

      <div className="features-header">

        <span>

          <Sparkles size={15} />

WHY STUDENTS CHOOSE KNARROW
        </span>

        <h2>

         Everything Required to
Master Every IELTS Module

        </h2>

        <p>

          Practice every IELTS module using
          realistic CBT exams, AI evaluation,
          personalized coaching and powerful
          analytics—all in one platform.

        </p>

      </div>

      <div className="features-grid">

        {features.map((feature, index) => {

          const Icon = feature.icon;

          return (

            <motion.div
              key={feature.title}
              className="feature-card"
              initial={{
                opacity: 0,
                y: 30,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
              }}
              transition={{
                delay: index * 0.08,
              }}
              whileHover={{
                y: -10,
                scale: 1.02,
              }}
            >

              <div
className="feature-icon"
style={{
background:`linear-gradient(135deg, ${feature.color}, ${feature.color}dd)`
}}
>

                <Icon size={32} />

              </div>

              <h3>

                {feature.title}

              </h3>

              <p>

                {feature.description}

              </p>
                            <div className="feature-footer">

                <span className="feature-badge">

                  {feature.badge}

                </span>

                <div className="feature-link">

                  Learn More

                  <ArrowRight size={18} />

                </div>

              </div>

            </motion.div>

          );

        })}

      </div>

    </motion.section>

  );

}