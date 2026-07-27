import "./PricingPreview.css";
import { motion } from "framer-motion";

import {
  Check,
  Crown,
  Sparkles,
} from "lucide-react";


export default function PricingPreview() {

  const plans = [
    {
      title: "Free",
      price: "₹0",
      subtitle: "Explore the platform at no cost",
      popular: false,
      features: [
        "Reading Practice (limited tests)",
        "Listening Practice (limited tests)",
        "Basic Dashboard & Progress Tracking",
        "Mock Tests — Reading & Listening",
        "Exam History & Results",
        "Leaderboard Access",
        "Community Forum",
        "3 AI Evaluations / month",
      ],
    },
    {
      title: "Premium Monthly",
      price: "₹299",
      subtitle: "Full access for serious IELTS prep",
      popular: false,
      features: [
        "Unlimited Reading & Listening Mocks",
        "Full Academic & General Mock Tests",
        "AI Writing Evaluation (band scores + feedback)",
        "AI Speaking Evaluation (fluency, grammar, pronunciation)",
        "AI Study Planner — personalized weekly plan",
        "AI Assistant — 24/7 IELTS coach",
        "AI Control Center & Audio Generator",
        "Accent Lab — pronunciation training",
        "Advanced Performance Analytics",
        "Progress Analytics & Predicted Band",
        "Evaluation History",
        "Certificates on band achievement",
        "Streaks, Achievements & Referrals",
        "Mentors & Live Classes access",
      ],
    },
    {
      title: "Premium 3 Months",
      price: "₹799",
      subtitle: "Best value — save 11% vs monthly",
      popular: true,
      features: [
        "Everything in Premium Monthly",
        "Unlimited AI Evaluations — Writing & Speaking",
        "Priority access to new features",
        "Full Mock Test Suite (Academic + General)",
        "AI Study Planner + AI Assistant",
        "Accent Lab & Audio Generator",
        "Advanced Analytics & Performance Dashboard",
        "Certificates, Streaks & Achievements",
        "Mentors, Live Classes & Community",
        "Premium Support",
      ],
    },
  ];

  return (
        <motion.section
      className="pricing-preview"
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

      <div className="pricing-header">

        <span>

          <Sparkles size={15} />

          PREMIUM PLANS

        </span>

        <h2>

          Choose The Perfect
          Plan For Your IELTS Journey

        </h2>

        <p>

          Start for free and upgrade whenever you're
          ready to unlock AI-powered learning,
          unlimited practice, and advanced analytics.

        </p>

      </div>

      <div className="pricing-grid">

        {plans.map((plan, index) => (

          <motion.div
            key={plan.title}
            className={
              plan.popular
                ? "pricing-card popular"
                : "pricing-card"
            }
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
              delay: index * 0.12,
            }}
            whileHover={{
              y: -10,
              scale: 1.02,
            }}
          >

            {plan.popular && (

              <div className="popular-badge">

                <Crown size={18} />

                Most Popular

              </div>

            )}

            <h3>

              {plan.title}

            </h3>

            <p className="plan-subtitle">

              {plan.subtitle}

            </p>

            <h1>

              {plan.price}

            </h1>

            <small>

              / plan

            </small>

            <div className="pricing-features">
                            {plan.features.map((feature) => (

                <div
                  className="pricing-item"
                  key={feature}
                >

                  <Check
                    size={18}
                    className="pricing-check"
                  />

                  <span>

                    {feature}

                  </span>

                </div>

              ))}

            </div>



          </motion.div>

        ))}

      </div>

    </motion.section>

  );

}
