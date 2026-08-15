import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import AuroraBackground from "../components/AuroraBackground";
import PricingCard from "../components/PricingCard";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";
import { validateReferralCode } from "../services/referralService";
import "../styles/pricing.css";

const STATS = [
  { value: "20+",  label: "Reading & Listening Tests" },
  { value: "100+", label: "Writing & Speaking Tasks"  },
  { value: "AI",   label: "Instant Band Evaluation"   },
  { value: "CBT",  label: "Real IELTS Exam Experience"},
];

const COMPARE_MATRIX = [
  { feature: "Academic Reading Tests", free: "1 Test", monthly: "Unlimited", threeMonth: "Unlimited", lifetime: "Unlimited" },
  { feature: "General Reading Tests", free: "1 Test", monthly: "Unlimited", threeMonth: "Unlimited", lifetime: "Unlimited" },
  { feature: "Writing Practice Tests", free: "1 Test", monthly: "Unlimited", threeMonth: "Unlimited", lifetime: "Unlimited" },
  { feature: "Speaking Practice Tests", free: "1 Test", monthly: "Unlimited", threeMonth: "Unlimited", lifetime: "Unlimited" },
  { feature: "Listening Practice Tests", free: "🔒 Locked", monthly: "Unlimited", threeMonth: "Unlimited", lifetime: "Unlimited" },
  { feature: "Full CBT Mock Exams", free: "🔒 Locked", monthly: "Unlimited", threeMonth: "Unlimited", lifetime: "Unlimited" },
  { feature: "AI Writing Band Evaluation", free: "—", monthly: "✓ Included", threeMonth: "✓ Included", lifetime: "✓ Included" },
  { feature: "AI Speaking Fluency Evaluation", free: "—", monthly: "✓ Included", threeMonth: "✓ Included", lifetime: "✓ Included" },
  { feature: "AI Study Planner", free: "Basic", monthly: "✓ Personalised", threeMonth: "✓ Personalised", lifetime: "✓ Personalised" },
  { feature: "Accent Lab & Pronunciation", free: "—", monthly: "✓ Included", threeMonth: "✓ Included", lifetime: "✓ Included" },
  { feature: "Band Prediction Analytics", free: "Basic", monthly: "✓ Advanced", threeMonth: "✓ Advanced", lifetime: "✓ Advanced" },
  { feature: "1-on-1 Senior Expert Coaching", free: "₹1,499", monthly: "₹749 (50% OFF)", threeMonth: "₹749 (50% OFF)", lifetime: "₹749 (50% OFF)" },
  { feature: "Renewal Billing Fee", free: "Free", monthly: "₹999 / month", threeMonth: "₹2,499 / 3 mos", lifetime: "♾️ Zero (Never)" },
];

const FAQ = [
  {
    q: "How does the First-Timers discount work?",
    a: "If you are upgrading to Knarrow Premium for the first time, 50% OFF is automatically applied: Monthly is ₹499 (instead of ₹999) and 3 Months is ₹1,249 (instead of ₹2,499). When you return to renew, regular pricing applies automatically.",
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
    a: "Yes! The 3-Month Premium plan comes with a 1-day free trial. We charge just ₹1 to verify your payment method. After 1 day, your 3-month plan begins.",
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
                <strong>{isTrial ? "1-Day Free Trial Active" : `You're on ${currentPlan}`}</strong>
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

        {/* 🎁 REFERRAL CODE BANNER FOR ₹50 CASHBACK */}
        <div className="referral-box-clean">
          <div className="referral-title">
            🎁 HAVE A REFERRAL CODE? GET ₹50 INSTANT CASHBACK!
          </div>
          <p className="referral-subtitle">
            Enter your friend's referral code below: <strong>you get ₹50 instant cashback</strong> into your account upon purchase, and <strong>your friend earns a 20% referral reward!</strong>
          </p>
          <div className="referral-form">
            <input
              type="text"
              placeholder="Enter Referral Code (e.g. KNARROW123)"
              value={referralInput}
              onChange={(e) => setReferralInput(e.target.value.toUpperCase())}
            />
            <button onClick={handleApplyReferral}>
              {referralValid ? "✓ ₹50 Cashback Ready" : "Apply Referral Code"}
            </button>
          </div>
          {referralValid && (
            <div className="referral-success">
              ✓ Referral Code Applied! ₹50 bank cashback will be credited to your account upon checkout.
            </div>
          )}
        </div>

        {/* 📱 PWA APP INSTALL TRIGGER BANNER */}
        <div className="pwa-banner-clean">
          <div className="pwa-left">
            <div className="pwa-icon">📲</div>
            <div>
              <div className="pwa-title">Install Knarrow Desktop &amp; Mobile App</div>
              <div className="pwa-sub">Fast 1-tap launcher, offline practice &amp; real-time test notifications.</div>
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
          >
            Get App Now ⬇
          </button>
        </div>

        {/* 4-CARD PRICING GRID */}
        <div className="pr-grid-neat">
          <PricingCard
            title="Free"
            price="0"
            currentPlan={currentPlan}
          />
          <PricingCard
            title="Premium Monthly"
            price={isFirstTime ? "499" : "999"}
            originalPrice={isFirstTime ? "999" : null}
            isFirstTime={isFirstTime}
            appliedReferralCode={appliedReferralCode}
            currentPlan={currentPlan}
            expiresAt={premiumExpires}
          />
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

      {/* FEATURE COMPARISON MATRIX (4-COLUMN RESPONSIVE TABLE) */}
      <section className="pr-compare">
        <div className="pr-section-label">Detailed Breakdown</div>
        <h2 className="pr-section-title">Compare All Plans</h2>
        <p className="pr-section-sub">
          Transparent feature comparison across Free, Monthly, 3-Month, and Lifetime tiers.
        </p>

        <div className="matrix-table-wrapper">
          <table className="matrix-table">
            <thead>
              <tr>
                <th className="th-feature">Feature / Capability</th>
                <th className="th-tier">Free Tier</th>
                <th className="th-tier">Monthly (₹499)</th>
                <th className="th-tier highlight">3-Months (₹1,249)</th>
                <th className="th-tier vip">Lifetime (₹4,999)</th>
              </tr>
            </thead>
            <tbody>
              {COMPARE_MATRIX.map((row, idx) => (
                <tr key={idx} className={idx % 2 === 0 ? "row-even" : ""}>
                  <td className="td-feature">{row.feature}</td>
                  <td className="td-val free">{row.free}</td>
                  <td className="td-val">{row.monthly}</td>
                  <td className="td-val highlight">{row.threeMonth}</td>
                  <td className="td-val vip">{row.lifetime}</td>
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
