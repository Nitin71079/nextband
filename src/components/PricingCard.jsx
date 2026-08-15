import { useState } from "react";
import toast from "react-hot-toast";
import { startCheckout } from "../services/billingService";
import { useAuth } from "../context/AuthContext";
import "../styles/pricing.css";

const FEATURES = {
  Free: [
    "3 Academic Reading Tests",
    "3 General Reading Tests",
    "3 Writing Practice Tests",
    "3 Speaking Practice Tests",
    "1 Listening Test",
    "3 Games in Games Zone",
    "Basic Score Reports",
    "Community Forum Access",
    "Leaderboard",
    "Exam History",
  ],
  "Premium Monthly": [
    "Unlimited Reading & Listening Mock Tests",
    "Full Academic & General CBT Mocks",
    "AI Writing Evaluation (band + detailed feedback)",
    "AI Speaking Evaluation (fluency, grammar, pronunciation)",
    "AI Study Planner — personalised weekly plan",
    "AI Assistant — 24/7 IELTS coach",
    "AI Control Center & Audio Generator",
    "Accent Lab — pronunciation training",
    "Performance Analytics & Band Prediction",
    "Certificates, Streaks & Achievements",
    "Mentors & Live Classes",
    "Special First-Time Price (₹499 vs ₹999)",
  ],
  "Premium 3 Months": [
    "Everything in Premium Monthly",
    "Unlimited AI Writing & Speaking Evaluations",
    "Full CBT Mock Suite (Academic + General)",
    "AI Study Planner + AI Assistant",
    "AI Control Center & Audio Generator",
    "Accent Lab — pronunciation training",
    "Advanced Analytics & Band Prediction",
    "Certificates, Streaks & Achievements",
    "Mentors & Live Classes",
    "Priority Support & Early Feature Access",
    "Special First-Time Price (₹1249 vs ₹2499)",
  ],
  "Lifetime Access": [
    "Unlimited Lifetime Access — One-Time Payment",
    "Everything in Premium 3 Months Forever",
    "All Future AI Features & CBT Tests Free",
    "Unlimited AI Writing & Speaking Evaluations",
    "Full CBT Mock Suite & AI Study Planner",
    "1-on-1 Senior Expert Consultation Discount",
    "VIP Priority Support & Private Forum Access",
    "Best Value Lifetime Investment",
  ],
};

export default function PricingCard({
  title,
  price,
  originalPrice,
  isFirstTime,
  appliedReferralCode,
  couponApplied,
  popular,
  isLifetime,
  currentPlan,
  expiresAt
}) {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);

  const isCurrentPlan = currentPlan === title || (title === "Lifetime Access" && currentPlan === "Premium Lifetime");
  const isFree = title === "Free";
  const is3Month = title === "Premium 3 Months";
  const features = FEATURES[title] || [];

  const periodLabel = title === "Premium Monthly"
    ? "/month"
    : title === "Premium 3 Months"
    ? "/3 months"
    : title === "Lifetime Access"
    ? "one-time"
    : "";

  async function handleCheckout(isTrial = false) {
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
      await startCheckout(title, isTrial, {
        customAmount: price,
        isFirstTime,
        appliedReferralCode,
      });
    } catch (err) {
      console.error(err);
      toast.error(err.message || "Unable to start checkout.");
    } finally {
      setLoading(false);
    }
  }

  /* expiry label */
  let expiryLabel = null;
  if (isCurrentPlan && expiresAt && !isFree && title !== "Lifetime Access") {
    const d = expiresAt?.toDate ? expiresAt.toDate() : new Date(expiresAt);
    expiryLabel = `Active until ${d.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}`;
  } else if (isCurrentPlan && title === "Lifetime Access") {
    expiryLabel = "♾️ Lifetime Unlimited Access";
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
    : isLifetime
    ? "💎 Get Lifetime Access"
    : "Upgrade Now";

  return (
    <div className={`pricing-card-neat${popular ? " popular" : ""}${isLifetime ? " lifetime" : ""}${isCurrentPlan ? " active" : ""}`}>
      {/* Sleek top badges */}
      <div className="card-top-bar">
        {isCurrentPlan && (
          <span className="badge-active">✓ Currently Active</span>
        )}
        {popular && !isCurrentPlan && (
          <span className="badge-popular">⭐ MOST POPULAR</span>
        )}
        {isLifetime && !isCurrentPlan && (
          <span className="badge-lifetime">💎 VIP LIFETIME</span>
        )}
      </div>

      <div className="card-header-clean">
        <h3 className="card-title-clean">{title}</h3>
        {isFirstTime && originalPrice && !isCurrentPlan && (
          <div className="badge-offer">🎉 50% OFF FIRST TIMER</div>
        )}
      </div>

      {/* Clean, perfectly spaced price layout */}
      <div className="price-box-clean">
        {isFree ? (
          <div className="price-free-text">Free</div>
        ) : (
          <div className="price-row-clean">
            <span className="price-currency">₹</span>
            <span className="price-num">{price}</span>
            <div className="price-sub-info">
              {originalPrice && originalPrice !== price && (
                <span className="price-strike">₹{originalPrice}</span>
              )}
              {periodLabel && <span className="price-period">{periodLabel}</span>}
            </div>
          </div>
        )}
      </div>

      {/* Active Expiry Label */}
      {expiryLabel && (
        <div className="expiry-tag">
          🗓 {expiryLabel}
        </div>
      )}

      {/* 1-day free trial box for 3-month plan */}
      {is3Month && !isCurrentPlan && (
        <div className="trial-box-clean">
          🎁 Try FREE for 1 day — only ₹1 authorization
          <div className="trial-box-sub">
            Auto-renews to 3-Month plan after trial
          </div>
        </div>
      )}

      {/* Feature list */}
      <ul className="features-list-clean">
        {features.map((f, i) => (
          <li key={i} className="feature-row">
            <span className="tick-circle">✓</span>
            <span className="feature-text">{f}</span>
          </li>
        ))}
      </ul>

      {/* Action buttons */}
      <div className="card-actions">
        {is3Month && !isCurrentPlan && (
          <button
            className="btn-trial"
            onClick={() => handleCheckout(true)}
            disabled={loading}
          >
            {loading ? "Opening Razorpay…" : "🎁 Start 1-Day Free Trial"}
          </button>
        )}

        <button
          className={`btn-main ${isFree ? "secondary" : "primary"}${isCurrentPlan ? " active" : ""}`}
          onClick={() => handleCheckout(false)}
          disabled={loading || isCurrentPlan}
        >
          {btnLabel}
        </button>

        {!isFree && !isCurrentPlan && (
          <p className="secure-footnote">
            {is3Month
              ? "🔒 Trial charges ₹1 · Auto-renews after 1 day · Cancel anytime"
              : "🔒 Secured by Razorpay"}
          </p>
        )}
      </div>
    </div>
  );
}
