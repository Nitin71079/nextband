import { Link } from "react-router-dom";
import {
  Crown,
  CheckCircle2,
  ArrowRight,
  Sparkles,
} from "lucide-react";

export default function PremiumBanner() {

  const features = [

    "Unlimited AI Evaluations",
    "100+ Full Mock Tests",
    "Speaking AI Simulator",
    "Advanced Analytics",
    "Accent Lab",
    "Priority Support",

  ];

  return (

    <section className="dashboard-section">

      <div className="premium-banner">

        <div className="premium-content">

          <div className="premium-tag">

            <Sparkles size={16} />

            Knarrow PREMIUM

          </div>

          <h2>

            Unlock Your Full IELTS Potential

          </h2>

          <p>

            Get unlimited AI-powered evaluations,
            advanced analytics, premium mock exams,
            personalized study plans, and exclusive
            learning tools designed to help you
            achieve your target band faster.

          </p>

          <div className="premium-features">

            {features.map((feature) => (

              <div
                key={feature}
                className="premium-feature"
              >

                <CheckCircle2 size={16} />

                {feature}

              </div>

            ))}

          </div>

        </div>

        <div className="premium-side">

          <div className="premium-icon">

            <Crown size={58} />

          </div>

          <Link to="/pricing">

            <button className="premium-btn">

              Upgrade Now

              <ArrowRight size={18} />

            </button>

          </Link>

        </div>

      </div>

    </section>

  );

}