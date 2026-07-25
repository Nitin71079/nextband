import "./DashboardPreview.css";
import { motion } from "framer-motion";

import {
  BookOpen,
  Headphones,
  PenSquare,
  Mic,
  BrainCircuit,
  TrendingUp,
  Sparkles,
  ShieldCheck,
  Flame,
} from "lucide-react";

export default function DashboardPreview() {

  const cards = [

    {
      title: "Reading",
      subtitle: "Continue Test 4",
      value: "87%",
      icon: BookOpen,
      color: "#2563eb",
      change: "+12%",
    },

    {
      title: "Listening",
      subtitle: "Section 3",
      value: "82%",
      icon: Headphones,
      color: "#8b5cf6",
      change: "+8%",
    },

    {
      title: "Writing",
      subtitle: "Predicted Band",
      value: "7.0",
      icon: PenSquare,
      color: "#f59e0b",
      change: "+0.5",
    },

    {
      title: "Speaking",
      subtitle: "AI Feedback",
      value: "6.5",
      icon: Mic,
      color: "#22c55e",
      change: "+0.5",
    },

    {
      title: "AI Coach",
      subtitle: "Recommendations",
      value: "24/7",
      icon: BrainCircuit,
      color: "#06b6d4",
      change: "Live",
    },

    {
      title: "Analytics",
      subtitle: "Overall Progress",
      value: "82%",
      icon: TrendingUp,
      color: "#ef4444",
      change: "+14%",
    },

  ];

  return (
        <motion.section
      className="dashboard-preview-section"
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
        duration: .6,
      }}
    >

      <div className="dashboard-preview-header">

        <span>

          <Sparkles size={15} />

          PRODUCT PREVIEW

        </span>

        <h2>

          Experience the
          Knarrow Dashboard

        </h2>

        <p>

          Everything you need for IELTS preparation—
          AI guidance, analytics, mock tests and
          personalized learning—all inside one
          beautiful dashboard.

        </p>

      </div>

      <motion.div
        className="dashboard-window"
        initial={{
          opacity: 0,
          y: 50,
        }}
        whileInView={{
          opacity: 1,
          y: 0,
        }}
        viewport={{
          once: true,
        }}
        transition={{
          delay: .2,
        }}
      >

        <div className="window-top">

          <div className="window-left">

            <div className="window-dots">

              <span className="red"></span>

              <span className="yellow"></span>

              <span className="green"></span>

            </div>

            <h3>

              Knarrow Dashboard

            </h3>

          </div>

          <div className="window-right">

            <div className="window-badge">

              AI Powered

            </div>

          </div>

        </div>

        <div className="dashboard-grid">
                    {cards.map((card, index) => {

            const Icon = card.icon;

            return (

              <motion.div
                key={card.title}
                className="dashboard-box"
                initial={{
                  opacity: 0,
                  y: 25,
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
                  y: -8,
                  scale: 1.02,
                }}
              >
<div className="dashboard-shine"></div>
                <div
                  className="dashboard-icon"
                  style={{
  background: `linear-gradient(135deg, ${card.color}, ${card.color}cc)`
}}
                >

                  <Icon size={28} />

                </div>

                <h4>

                  {card.title}

                </h4>

                <p>

                  {card.subtitle}

                </p>

                <div className="dashboard-value">

                  <div className="dashboard-number">

                    {card.value}

                  </div>

                  <div className="dashboard-change">

                    {card.change}

                  </div>

                </div>

                <div className="dashboard-progress">

                  <div className="dashboard-progress-bar">

                    <motion.div
                      className="dashboard-progress-fill"
                      initial={{
                        width: 0,
                      }}
                      whileInView={{
                        width: card.value.includes("%")
                          ? card.value
                          : "82%",
                      }}
                      viewport={{
                        once: true,
                      }}
                      transition={{
                        duration: 1,
                      }}
                    />

                  </div>

                </div>

              </motion.div>

            );

          })}
                  </div>

        <motion.div
          className="dashboard-floating"
          style={{
            top: "110px",
            right: "-40px",
          }}
          initial={{
            opacity: 0,
            scale: .8,
          }}
          whileInView={{
            opacity: 1,
            scale: 1,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            delay: .8,
          }}
        >

          <h4>

            Predicted Band

          </h4>

          <h2>

            7.5

          </h2>

          <span>

            ↑ +0.4 This Week

          </span>

        </motion.div>

        <motion.div
          className="dashboard-floating"
          style={{
            bottom: "70px",
            left: "-45px",
          }}
          initial={{
            opacity: 0,
            scale: .8,
          }}
          whileInView={{
            opacity: 1,
            scale: 1,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            delay: 1,
          }}
        >

          <h4>

            Study Streak

          </h4>

          <h2>

            <Flame
              size={20}
              style={{
                color:"#f97316",
                marginRight:6,
              }}
            />

            18 Days

          </h2>

          <span>

            🔥 Keep Going

          </span>

        </motion.div>

      </motion.div>

    </motion.section>

  );

}
