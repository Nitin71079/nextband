import { useState } from "react";
import toast from "react-hot-toast";
import { startCheckout } from "../services/billingService";
import { useAuth } from "../context/AuthContext";

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
    ? " one-time"
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
    <div className={`pricing-card${popular ? " popular" : ""}${isLifetime ? " lifetime-card" : ""}${isCurrentPlan ? " current-plan" : ""}`}>
      {/* ribbons */}
      {popular && !isCurrentPlan && (
        <div className="popular-badge">MOST POPULAR</div>
      )}
      {isLifetime && !isCurrentPlan && (
        <div className="popular-badge" style={{ background: "linear-gradient(135deg, #ec4899, #8b5cf6)" }}>VIP LIFETIME</div>
      )}
      {isCurrentPlan && (
        <div className="active-badge">
          <span className="active-dot" /> Currently Active
        </div>
      )}

      <div className="card-header">
        <h2>{title}</h2>

        {isFirstTime && originalPrice && !isCurrentPlan && (
          <span className="save-badge" style={{ background: "#22c55e" }}>🎉 50% OFF FIRST TIMER</span>
        )}
        {couponApplied && !isFree && !isFirstTime && (
          <span className="save-badge" style={{ background: "#22c55e" }}>🎟 Coupon Applied</span>
        )}
      </div>

      {/* price */}
      <div className="price-section">
        {!isFree && <span className="currency">₹</span>}
        <span className="price">{isFree ? "Free" : price}</span>
        {originalPrice && originalPrice !== price && !isFree && (
          <span style={{ textDecoration: "line-through", color: "#94a3b8", fontSize: "18px", marginLeft: "8px" }}>
            ₹{originalPrice}
          </span>
        )}
        {periodLabel && <span className="period">{periodLabel}</span>}
      </div>

      {/* expiry */}
      {expiryLabel && (
        <div className="expiry">
          <span>🗓</span> {expiryLabel}
        </div>
      )}

      {/* 1-day free trial badge for 3-month plan */}
      {is3Month && !isCurrentPlan && (
        <div style={{
          background: "linear-gradient(135deg, #10b981, #059669)",
          color: "#fff",
          borderRadius: "12px",
          padding: "10px 14px",
          marginBottom: "16px",
          textAlign: "center",
          fontSize: "13px",
          fontWeight: "700",
          boxShadow: "0 4px 14px rgba(16,185,129,0.30)",
        }}>
          🎁 Try FREE for 1 day — only ₹1 authorization
          <div style={{ fontSize: "11px", fontWeight: 600, opacity: 0.9, marginTop: 3 }}>
            Auto-renews to 3-Month plan after trial
          </div>
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

      {/* CTA — trial button for 3-month plan */}
      {is3Month && !isCurrentPlan && (
        <button
          className="pricing-btn primary"
          onClick={() => handleCheckout(true)}
          disabled={loading}
          style={{
            marginBottom: "8px",
            background: "linear-gradient(135deg, #10b981, #059669)",
            boxShadow: "0 4px 14px rgba(16,185,129,0.35)",
          }}
        >
          {loading ? "Opening Razorpay…" : "🎁 Start 1-Day Free Trial"}
        </button>
      )}

      <button
        className={`pricing-btn ${isFree ? "secondary" : "primary"}${isCurrentPlan ? " active-btn" : ""}`}
        onClick={() => handleCheckout(false)}
        disabled={loading || isCurrentPlan}
      >
        {btnLabel}
      </button>

      {!isFree && !isCurrentPlan && (
        <p className="secure-text">
          {is3Month
            ? "🔒 Trial charges ₹1 · Auto-renews after 1 day · Cancel anytime"
            : "🔒 Secured by Razorpay"}
        </p>
      )}
    </div>
  );
}
