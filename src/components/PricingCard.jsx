import { useState } from "react";
import toast from "react-hot-toast";
import { startCheckout } from "../services/billingService";
import { useAuth } from "../context/AuthContext";

const FEATURES = {
  Free: [
    "5 Reading Tests",
    "5 Listening Tests",
    "Basic Score Reports",
    "Community Access",
    "Limited Practice",
  ],
  "Premium Monthly": [
    "Unlimited Reading & Listening",
    "Unlimited Writing Practice",
    "Unlimited Speaking Practice",
    "AI Writing Evaluation",
    "AI Speaking Evaluation",
    "Band Prediction Engine",
    "Performance Analytics",
    "Study Planner",
    "Priority Support",
  ],
  "Premium 3 Months": [
    "Everything in Monthly",
    "5 Full CBT Mock Exams",
    "AI Study Coach",
    "Weak Skill Analysis",
    "Premium Dashboard",
    "Fastest Progress Tracking",
    "Best Value — Save ₹98",
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
