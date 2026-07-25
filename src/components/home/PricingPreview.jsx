import "./PricingPreview.css";
import { motion } from "framer-motion";

import {
  Check,
  Crown,
  Sparkles,
} from "lucide-react";

import { Link } from "react-router-dom";

export default function PricingPreview() {

  const plans = [

    {
      title:"Free",

      price:"₹0",

      subtitle:"Perfect for getting started",

      popular:false,

      features:[
        "Reading Practice",
        "Listening Practice",
        "Basic Dashboard",
        "Limited AI Evaluation",
      ],
    },

    {
      title:"Premium Monthly",

      price:"₹299",

      subtitle:"For serious IELTS preparation",

      popular:false,

      features:[
        "Unlimited Mock Tests",
        "AI Writing Evaluation",
        "AI Speaking Evaluation",
        "AI Coach",
        "Advanced Analytics",
      ],
    },

    {
      title:"Premium 3 Months",

      price:"₹799",

      subtitle:"Best value for most students",

      popular:true,

      features:[
        "Everything in Premium",
        "Unlimited AI",
        "Priority Features",
        "Premium Support",
        "Best Savings",
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

            <Link
              to="/pricing"
            >

              <button
                className={
                  plan.popular
                    ? "pricing-btn premium-btn"
                    : "pricing-btn"
                }
              >

                {plan.popular
                  ? "Get Premium"
                  : "View Plan"}

              </button>

            </Link>

          </motion.div>

        ))}

      </div>

    </motion.section>

  );

}
