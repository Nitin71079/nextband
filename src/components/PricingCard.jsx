import { useState } from "react";
import toast from "react-hot-toast";
import { startCheckout } from "../services/billingService";
import { useAuth } from "../context/AuthContext";

const FEATURES = {
  Free: [
    "5 Reading Tests",
    "5 Listening Tests",
    "Basic Score Reports",
    "Community Forum Access",
    "Leaderboard",
    "Exam History",
    "3 AI Evaluations / month",
  ],
  "Premium Monthly": [
    "Unlimited Reading Mock Tests",
    "Unlimited Listening Mock Tests",
    "Full Academic & General CBT Mocks",
    "AI Writing Evaluation (band + detailed feedback)",
    "AI Speaking Evaluation (fluency, grammar, pronunciation)",
    "AI Study Planner — personalised weekly plan",
    "AI Assistant — 24/7 IELTS coach",
    "AI Control Center",
    "Audio Generator",
    "Accent Lab — pronunciation training",
    "Performance Analytics Dashboard",
    "Progress Analytics & Band Prediction",
    "Evaluation History",
    "Certificates on band achievement",
    "Streaks & Achievements",
    "Mentors & Live Classes",
    "Priority Support",
  ],
  "Premium 3 Months": [
    "Everything in Premium Monthly",
    "Unlimited AI Writing & Speaking Evaluations",
    "Full CBT Mock Suite (Academic + General)",
    "AI Study Planner + AI Assistant",
    "AI Control Center & Audio Generator",
    "Accent Lab — pronunciation training",
    "Advanced Analytics & Performance Dashboard",
    "Progress Analytics & Band Prediction",
    "Certificates, Streaks & Achievements",
    "Mentors & Live Classes",
    "Priority Access to New Features",
    "Premium Support",
    "Best Value — Save ₹98 vs Monthly",
  ],
};

export default function PricingCard({ title, price, popular, currentPlan, expiresAt }) {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);

  const isCurrentPlan = currentPlan === title;
  const isFree = title === "Free";
  const features = FEATURES[title] || [];

  const periodLabel = title === "Premium Monthly"
    ? "/month"
    : title === "Premium 3 Months"
    ? "/3 months"
    : "";

  async function handleCheckout() {
    if (isFree) {
      toast.success("You're on the Free plan — explore Knarrow!");
      return;
    }
    if (isCurrentPlan) return;
    if (!user) {
      toast.error("Please sign in to continue.");
      return;
    }
    try {
      setLoading(true);
      await startCheckout(title);
    } catch (err) {
      console.error(err);
      toast.error(err.message || "Unable to start checkout.");
    } finally {
      setLoading(false);
    }
  }

  /* expiry label */
  let expiryLabel = null;
  if (isCurrentPlan && expiresAt && !isFree) {
    const d = expiresAt?.toDate ? expiresAt.toDate() : new Date(expiresAt);
    expiryLabel = `Active until ${d.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}`;
  }

  /* button label */
  let btnLabel = isFree
    ? "Get Started Free"
    : isCurrentPlan
    ? "✓ Currently Active"
    : loading
    ? "Opening Razorpay…"
    : popular
    ? "🚀 Upgrade Now — Best Value"
    : "Upgrade Now";

  return (
    <div className={`pricing-card${popular ? " popular" : ""}${isCurrentPlan ? " current-plan" : ""}`}>

      {/* ribbons */}
      {popular && !isCurrentPlan && (
        <div className="popular-badge">MOST POPULAR</div>
      )}
      {isCurrentPlan && (
        <div className="active-badge">
          <span className="active-dot" /> Currently Active
        </div>
      )}

      <div className="card-header">
        <h2>{title}</h2>

        {title === "Premium 3 Months" && !isCurrentPlan && (
          <span className="save-badge">🎉 Save ₹98</span>
        )}
      </div>

      {/* price */}
      <div className="price-section">
        {!isFree && <span className="currency">₹</span>}
        <span className="price">{isFree ? "Free" : price}</span>
        {periodLabel && <span className="period">{periodLabel}</span>}
      </div>

      {/* expiry */}
      {expiryLabel && (
        <div className="expiry">
          <span>🗓</span> {expiryLabel}
        </div>
      )}

      {/* features */}
      <ul className="feature-list">
        {features.map((f, i) => (
          <li key={i} className="feature-item">
            <span className="tick">✓</span>
            <span>{f}</span>
          </li>
        ))}
      </ul>

      {/* CTA */}
      <button
        className={`pricing-btn ${isFree ? "secondary" : "primary"}${isCurrentPlan ? " active-btn" : ""}`}
        onClick={handleCheckout}
        disabled={loading || isCurrentPlan}
      >
        {btnLabel}
      </button>

      {!isFree && !isCurrentPlan && (
        <p className="secure-text">
          🔒 Secured by Razorpay
        </p>
      )}
    </div>
  );
}
