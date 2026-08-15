import "./PricingPreview.css";
import { motion } from "framer-motion";
import { Check, Crown, Sparkles, Zap } from "lucide-react";

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
      price: "₹499",
      originalPrice: "₹999",
      subtitle: "₹499 First-Timers (₹999 Regular)",
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
        "Advanced Performance Analytics & Band Prediction",
        "Evaluation History, Certificates & Streaks",
        "50% OFF First-Time Special Deal",
      ],
    },
    {
      title: "Premium 3 Months",
      price: "₹1,249",
      originalPrice: "₹2,499",
      subtitle: "₹1249 First-Timers (₹2499 Regular)",
      popular: true,
      features: [
        "Everything in Premium Monthly",
        "Unlimited AI Evaluations — Writing & Speaking",
        "Full Mock Test Suite (Academic + General)",
        "AI Study Planner + AI Assistant",
        "Accent Lab & Audio Generator",
        "Advanced Analytics & Performance Dashboard",
        "Certificates, Streaks & Achievements",
        "Mentors, Live Classes & Community",
        "1-Day Free Trial Available",
      ],
    },
    {
      title: "Lifetime Access",
      price: "₹4,999",
      originalPrice: "₹9,999",
      subtitle: "One-time payment for lifetime access",
      popular: false,
      isLifetime: true,
      features: [
        "Unlimited Lifetime Access — No Renewal Ever",
        "Everything in Premium 3 Months Forever",
        "All Future CBT Mocks & AI Features Free",
        "Unlimited AI Writing & Speaking Evaluations",
        "VIP Priority Support & Senior Expert Discount",
        "Best Value One-Time Investment",
      ],
    },
  ];

  return (
    <motion.section
      className="pricing-preview"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <div className="pricing-header">
        <span>
          <Sparkles size={15} />
          PREMIUM PLANS
        </span>
        <h2>
          Choose The Perfect Plan For Your IELTS Journey
        </h2>
        <p>
          Start for free or upgrade to unlock 50% OFF First-Timer deals, unlimited practice, and AI-powered evaluation.
        </p>
      </div>

      <div className="pricing-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "24px" }}>
        {plans.map((plan, index) => (
          <motion.div
            key={plan.title}
            className={`pricing-card${plan.popular ? " popular" : ""}${plan.isLifetime ? " lifetime-preview" : ""}`}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ y: -8, scale: 1.02 }}
          >
            {plan.popular && (
              <div className="popular-badge">
                <Crown size={18} />
                Most Popular
              </div>
            )}
            {plan.isLifetime && (
              <div className="popular-badge" style={{ background: "linear-gradient(135deg, #ec4899, #8b5cf6)" }}>
                <Zap size={16} /> VIP Lifetime
              </div>
            )}

            <h3>{plan.title}</h3>
            <p className="plan-subtitle">{plan.subtitle}</p>

            <div style={{ display: "flex", alignItems: "baseline", gap: "8px", margin: "12px 0 4px 0" }}>
              <h1 style={{ margin: 0, fontSize: "36px", fontWeight: "900" }}>{plan.price}</h1>
              {plan.originalPrice && (
                <span style={{ textDecoration: "line-through", color: "#94a3b8", fontSize: "18px", fontWeight: "700" }}>
                  {plan.originalPrice}
                </span>
              )}
            </div>

            <div className="pricing-features">
              {plan.features.map((feature) => (
                <div className="pricing-item" key={feature}>
                  <Check size={18} className="pricing-check" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}
