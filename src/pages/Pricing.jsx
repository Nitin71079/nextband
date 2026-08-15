import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import AuroraBackground from "../components/AuroraBackground";
import PricingCard from "../components/PricingCard";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";
import { validateReferralCode } from "../services/referralService";
import "../styles/pricing.css";

/* ── social proof numbers ── */
const STATS = [
  { value: "20+",  label: "Reading & Listening Tests" },
  { value: "100+", label: "Writing & Speaking Tasks"  },
  { value: "AI",   label: "Instant Band Evaluation"   },
  { value: "CBT",  label: "Real IELTS Exam Experience"},
];

/* ── comparison rows ── */
const COMPARE = [
  { feature: "Academic Reading Tests", free: "3 Tests",   premium: "Unlimited" },
  { feature: "General Reading Tests",  free: "3 Tests",   premium: "Unlimited" },
  { feature: "Writing Practice Tests", free: "3 Tests",   premium: "Unlimited" },
  { feature: "Speaking Practice Tests",free: "3 Tests",   premium: "Unlimited" },
  { feature: "Listening Practice",     free: "1 Test",    premium: "Unlimited" },
  { feature: "Games Zone",             free: "3 Games",   premium: "All 10 Games" },
  { feature: "Writing AI Evaluation",  free: "—",         premium: "✓"         },
  { feature: "Speaking AI Evaluation", free: "—",         premium: "✓"         },
  { feature: "Band Prediction",        free: "—",         premium: "✓"         },
  { feature: "Performance Analytics",  free: "Basic",     premium: "Advanced"  },
  { feature: "Full CBT Mock Exams",    free: "—",         premium: "✓"         },
  { feature: "Study Planner",          free: "Basic",     premium: "AI Powered"},
  { feature: "AI Study Coach",         free: "—",         premium: "✓"         },
  { feature: "1-Hour AI Bot Live Coaching", free: "₹349/session", premium: "FREE Unlimited" },
  { feature: "1-on-1 Senior Human Expert (60 Min)", free: "₹1,499", premium: "₹749 (50% OFF)" },
];

/* ── FAQ items ── */
const FAQ = [
  {
    q: "How does the First-Timers discount work?",
    a: "If you are upgrading to Knarrow Premium for the very first time, you automatically get 50% OFF: Monthly is only ₹499 (instead of ₹999) and 3 Months is only ₹1249 (instead of ₹2499). When you return the second time, regular prices apply automatically.",
  },
  {
    q: "How do I get ₹50 Bank Cashback with a Referral Code?",
    a: "Enter a valid friend's referral code in the referral box on this page before checkout. As soon as your purchase completes, ₹50 instant cashback is credited directly to your bank account / balance.",
  },
  {
    q: "What is included in the Lifetime Access plan?",
    a: "The Lifetime Access plan is a one-time ₹4,999 payment that unlocks all current and future Knarrow CBT mock tests, AI evaluations, Study Planner, Accent Lab, and features forever with no recurring fees ever.",
  },
  {
    q: "Is there a free trial for the 3-Month plan?",
    a: "Yes! The 3-Month Premium plan comes with a 2-day free trial. We charge just ₹1 to verify your payment method. After 2 days, your 3-month plan begins.",
  },
  {
    q: "Is Premium activated immediately?",
    a: "Yes. Once Razorpay verifies your payment, Premium unlocks automatically within seconds.",
  },
  {
    q: "Which payment methods are supported?",
    a: "UPI (GPay, PhonePe, Paytm), Debit / Credit Cards, Net Banking, and Wallets via Razorpay.",
  },
];

export default function Pricing() {
  const { user, premium, premiumPlan, premiumExpires, isTrial, autoRenew } = useAuth();
  const navigate = useNavigate();
  const pricingRef = useRef(null);

  // Check if user is first-timer (has not purchased premium before)
  const isFirstTime = user ? !user.hasPurchasedPremium : true;

  const [referralInput, setReferralInput] = useState("");
  const [appliedReferralCode, setAppliedReferralCode] = useState("");
  const [referralValid, setReferralValid] = useState(false);

  async function handleApplyReferral() {
    const code = referralInput.trim().toUpperCase();
    if (!code) {
      toast.error("Please enter a referral code.");
      return;
    }
    try {
      const res = await validateReferralCode(code);
      if (res.valid) {
        setAppliedReferralCode(code);
        setReferralValid(true);
        toast.success("🎉 Referral Code Applied! ₹50 Bank Cashback activated.");
      } else {
        setReferralValid(false);
        toast.error(res.message || "Invalid referral code.");
      }
    } catch (err) {
      setReferralValid(false);
      toast.error(err.message || "Referral validation failed.");
    }
  }

  const currentPlan = !user
    ? null
    : premium
    ? premiumPlan || "Premium Monthly"
    : "Free";

  function scrollToPlans() {
    pricingRef.current?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <div className="pricing-page">
      <AuroraBackground />

      {/* HERO */}
      <section className="pr-hero">
        <div className="pr-hero-inner">
          <div className="pr-hero-pill">
            🚀 AI-Powered IELTS Preparation Platform
          </div>

          <h1 className="pr-hero-title">
            Achieve Your Dream
            <span> IELTS Band </span>
            Faster with AI
          </h1>

          <p className="pr-hero-sub">
            Practice exactly like the official IELTS Computer Based Test —
            AI-powered Writing &amp; Speaking evaluation, realistic mock exams,
            deep analytics, and a personalised study coach.
          </p>

          <div className="pr-hero-actions">
            <button className="pr-btn-primary" onClick={scrollToPlans}>
              Unlock Premium →
            </button>
            <button
              className="pr-btn-secondary"
              onClick={() =>
                document.getElementById("pr-benefits")?.scrollIntoView({ behavior: "smooth" })
              }
            >
              Explore Features
            </button>
          </div>

          <div className="pr-hero-rating">
            <span className="pr-stars">⭐⭐⭐⭐⭐</span>
            <span>Premium AI-powered IELTS Preparation</span>
          </div>
        </div>
      </section>

      {/* STATS BAR */}
      <section className="pr-stats">
        {STATS.map((s) => (
          <div key={s.value} className="pr-stat-card">
            <h2>{s.value}</h2>
            <p>{s.label}</p>
          </div>
        ))}
      </section>

      {/* ACTIVE PLAN BANNER */}
      {user && premium && (
        <div className="pr-active-banner">
          <div className="pr-active-banner-inner">
            <div className="pr-active-banner-left">
              <span className="pr-active-crown">{isTrial ? "🎁" : "👑"}</span>
              <div>
                <strong>{isTrial ? "2-Day Free Trial Active" : `You're on ${currentPlan}`}</strong>
                {premiumExpires && (() => {
                  const d = premiumExpires?.toDate
                    ? premiumExpires.toDate()
                    : new Date(premiumExpires);
                  return (
                    <p>
                      {isTrial ? "Trial ends" : "Active until"}{" "}
                      {d.toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                      {autoRenew && !isTrial && " · Auto-renews"}
                    </p>
                  );
                })()}
              </div>
            </div>
            <button
              className="pr-banner-btn"
              onClick={() => navigate("/dashboard")}
            >
              Go to Dashboard →
            </button>
          </div>
        </div>
      )}

      {/* PRICING CARDS SECTION */}
      <section id="pricing-section" className="pr-plans-section" ref={pricingRef}>
        <div className="pr-section-label">Simple, transparent pricing</div>
        <h2 className="pr-section-title">Choose Your Plan</h2>
        <p className="pr-section-sub">
          {isFirstTime
            ? "🎁 First-Time Buyer Special Deal: 50% OFF automatically applied below!"
            : "Welcome back! Regular pricing applies for your renewal plan."}
        </p>

        {/* 🎁 REFERRAL CODE INPUT FIELD FOR ₹50 CASHBACK */}
        <div
          style={{
            maxWidth: "720px",
            margin: "0 auto 32px auto",
            background: "linear-gradient(135deg, #0284c7, #2563eb)",
            color: "#ffffff",
            borderRadius: "22px",
            padding: "24px 28px",
            boxShadow: "0 12px 30px rgba(2, 132, 199, 0.28)",
            textAlign: "center",
          }}
        >
          <div style={{ fontSize: "15px", fontWeight: "900", letterSpacing: "0.5px", textTransform: "uppercase", marginBottom: "6px" }}>
            🎁 HAVE A REFERRAL CODE? GET ₹50 INSTANT BANK CASHBACK!
          </div>
          <p style={{ fontSize: "14px", opacity: 0.95, margin: "4px 0 16px 0" }}>
            Enter your friend's referral code below to receive <strong>₹50 instant bank cashback</strong> directly into your account upon completing your purchase.
          </p>
          <div style={{ display: "flex", gap: "10px", maxWidth: "460px", margin: "0 auto", flexWrap: "wrap" }}>
            <input
              type="text"
              placeholder="Enter Referral Code (e.g. KNARROW123)"
              value={referralInput}
              onChange={(e) => setReferralInput(e.target.value.toUpperCase())}
              style={{
                flex: 1,
                minWidth: "200px",
                padding: "12px 16px",
                borderRadius: "14px",
                border: "none",
                fontSize: "14px",
                color: "#0f172a",
                fontWeight: "700",
                outline: "none",
                textTransform: "uppercase",
              }}
            />
            <button
              onClick={handleApplyReferral}
              style={{
                background: referralValid ? "#22c55e" : "#ffffff",
                color: referralValid ? "#ffffff" : "#0284c7",
                border: "none",
                borderRadius: "14px",
                padding: "12px 20px",
                fontWeight: "800",
                fontSize: "14px",
                cursor: "pointer",
                boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                whiteSpace: "nowrap",
              }}
            >
              {referralValid ? "✓ ₹50 Cashback Ready" : "Apply Referral Code"}
            </button>
          </div>
          {referralValid && (
            <div style={{ marginTop: "12px", fontSize: "13px", fontWeight: "800", color: "#4ade80" }}>
              ✓ Referral Code Applied! ₹50 bank cashback will be credited to your account upon checkout.
            </div>
          )}
        </div>

        {/* 📱 PWA APP INSTALL TRIGGER CARD */}
        <div
          style={{
            maxWidth: "720px",
            margin: "0 auto 40px auto",
            background: "var(--card, #ffffff)",
            border: "1px solid var(--border, #e2e8f0)",
            borderRadius: "20px",
            padding: "20px 24px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "16px",
            boxShadow: "0 4px 20px rgba(0,0,0,0.04)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
            <div
              style={{
                width: "44px",
                height: "44px",
                borderRadius: "14px",
                background: "rgba(37,99,235,0.1)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "22px",
              }}
            >
              📲
            </div>
            <div>
              <div style={{ fontSize: "15px", fontWeight: "800", color: "var(--text)" }}>
                Install Knarrow Desktop &amp; Mobile App
              </div>
              <div style={{ fontSize: "12px", color: "var(--text-secondary)" }}>
                Fast 1-tap launcher, offline practice &amp; real-time test notifications.
              </div>
            </div>
          </div>
          <button
            onClick={() => {
              if (window.triggerPwaInstall) {
                window.triggerPwaInstall();
              } else {
                localStorage.removeItem("knarrow_pwa_dismissed");
                window.location.reload();
              }
            }}
            style={{
              background: "var(--primary, #2563eb)",
              color: "#ffffff",
              border: "none",
              borderRadius: "12px",
              padding: "10px 18px",
              fontSize: "13px",
              fontWeight: "800",
              cursor: "pointer",
              whiteSpace: "nowrap",
            }}
          >
            Get App Now ⬇
          </button>
        </div>

        {/* PLANS GRID */}
        <div className="pr-plans-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(270px, 1fr))", gap: "24px" }}>
          {/* Free Plan */}
          <PricingCard
            title="Free"
            price="0"
            currentPlan={currentPlan}
          />

          {/* Monthly Plan: ₹499 1st time / ₹999 regular */}
          <PricingCard
            title="Premium Monthly"
            price={isFirstTime ? "499" : "999"}
            originalPrice={isFirstTime ? "999" : null}
            isFirstTime={isFirstTime}
            appliedReferralCode={appliedReferralCode}
            currentPlan={currentPlan}
            expiresAt={premiumExpires}
          />

          {/* 3-Month Plan: ₹1249 1st time / ₹2499 regular */}
          <PricingCard
            title="Premium 3 Months"
            price={isFirstTime ? "1249" : "2499"}
            originalPrice={isFirstTime ? "2499" : null}
            isFirstTime={isFirstTime}
            appliedReferralCode={appliedReferralCode}
            popular
            currentPlan={currentPlan}
            expiresAt={premiumExpires}
          />

          {/* Lifetime Plan: ₹4999 */}
          <PricingCard
            title="Lifetime Access"
            price="4999"
            originalPrice="9999"
            isFirstTime={isFirstTime}
            appliedReferralCode={appliedReferralCode}
            isLifetime
            currentPlan={currentPlan}
            expiresAt={premiumExpires}
          />
        </div>

        <p className="pr-plans-footnote">
          🔒 All payments are processed securely through Razorpay &nbsp;·&nbsp; Instant activation &amp; ₹50 Referral Bank Cashback
        </p>
      </section>

      {/* BENEFITS */}
      <section id="pr-benefits" className="pr-benefits">
        <div className="pr-section-label">Why Knarrow</div>
        <h2 className="pr-section-title">Everything You Need to Score Higher</h2>
        <p className="pr-section-sub">
          Every feature is designed to replicate the official IELTS CBT while giving
          you AI guidance unavailable anywhere else.
        </p>

        <div className="pr-benefit-grid">
          {[
            { icon: "📝", title: "AI Writing Evaluation",    desc: "Detailed IELTS-style feedback, band estimates, grammar corrections, coherence and vocabulary suggestions — instantly." },
            { icon: "🎤", title: "AI Speaking Evaluation",   desc: "Improve pronunciation, fluency, lexical resource and grammar through intelligent real-time assessment." },
            { icon: "📊", title: "Performance Analytics",    desc: "Track every section, identify weaknesses and monitor band progression with deep visualisations." },
            { icon: "🎯", title: "Real CBT Experience",      desc: "Practice with an interface that closely mirrors the official IELTS Computer Based Test." },
            { icon: "🤖", title: "AI Study Coach",           desc: "Personalised recommendations based on your strengths, weaknesses and progress over time." },
            { icon: "🏆", title: "Full Mock Exams",          desc: "Complete Reading, Listening, Writing and Speaking exams under realistic exam timing." },
          ].map((b) => (
            <div key={b.title} className="pr-benefit-card">
              <div className="pr-benefit-icon">{b.icon}</div>
              <h3>{b.title}</h3>
              <p>{b.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURE COMPARISON */}
      <section className="pr-compare">
        <div className="pr-section-label">Detailed Breakdown</div>
        <h2 className="pr-section-title">Compare Plans</h2>
        <p className="pr-section-sub">
          See everything included in Free vs Premium.
        </p>

        <div className="pr-compare-table-wrapper">
          <table className="pr-compare-table">
            <thead>
              <tr>
                <th>Feature</th>
                <th>Free Plan</th>
                <th>Premium Plan</th>
              </tr>
            </thead>
            <tbody>
              {COMPARE.map((row, idx) => (
                <tr key={idx}>
                  <td>{row.feature}</td>
                  <td className="free-cell">{row.free}</td>
                  <td className="prem-cell">{row.premium}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* FAQ */}
      <section className="pr-faq">
        <div className="pr-section-label">Questions?</div>
        <h2 className="pr-section-title">Frequently Asked Questions</h2>

        <div className="pr-faq-grid">
          {FAQ.map((item, idx) => (
            <div key={idx} className="pr-faq-card">
              <h3>{item.q}</h3>
              <p>{item.a}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
