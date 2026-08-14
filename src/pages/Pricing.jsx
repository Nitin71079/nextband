import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import AuroraBackground from "../components/AuroraBackground";
import PricingCard from "../components/PricingCard";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";
import { validateAndApplyCoupon } from "../services/couponService";
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
    q: "Is there a free trial?",
    a: "Yes! The 3-Month Premium plan comes with a 2-day free trial. We charge just ₹1 to verify your payment method. After 2 days, the full ₹799 is charged and your 3-month plan begins. You can cancel before the trial ends to avoid the charge.",
  },
  {
    q: "Does the 3-Month plan auto-renew?",
    a: "Yes. The 3-Month Premium plan auto-renews every 90 days at ₹799 for uninterrupted access. You will receive a reminder before each renewal. You can cancel anytime from your account settings.",
  },
  {
    q: "Is Premium activated immediately?",
    a: "Yes. Once Razorpay verifies your payment, Premium unlocks automatically within seconds.",
  },
  {
    q: "Can I access Knarrow on multiple devices?",
    a: "Absolutely. Sign in with the same account on any device — desktop, tablet, or mobile.",
  },
  {
    q: "Which payment methods are supported?",
    a: "UPI, Debit / Credit Cards, Net Banking, and Wallets via Razorpay.",
  },
  {
    q: "Will my Premium expire automatically?",
    a: "Yes. Your subscription stays active until the expiry date shown in your account. The 3-Month plan auto-renews; the Monthly plan requires manual renewal.",
  },
  {
    q: "What if I'm already on a plan?",
    a: "Your current plan is highlighted on this page. You can upgrade anytime and the new period starts immediately.",
  },
];

export default function Pricing() {
  const { user, premium, premiumPlan, premiumExpires, isTrial, autoRenew } = useAuth();
  const navigate = useNavigate();
  const pricingRef = useRef(null);

  const [couponInput, setCouponInput] = useState("FIRST50");
  const [couponApplied, setCouponApplied] = useState(false);

  async function handleApplyCoupon() {
    if (!couponInput) {
      toast.error("Please enter a coupon code.");
      return;
    }
    const result = await validateAndApplyCoupon({
      couponCode: couponInput,
      user,
      originalPrice: 299,
    });
    if (result.valid) {
      setCouponApplied(true);
      toast.success(result.message);
    } else {
      setCouponApplied(false);
      toast.error(result.message);
    }
  }

  /* figure out which card is "active" */
  const currentPlan = !user
    ? null
    : premium
    ? premiumPlan || "Premium Monthly"   // fallback to monthly if plan not stored
    : "Free";

  function scrollToPlans() {
    pricingRef.current?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <div className="pricing-page">
      <AuroraBackground />

      {/* ═══════════════════════════════════════
          HERO
      ═══════════════════════════════════════ */}
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

      {/* ═══════════════════════════════════════
          STATS BAR
      ═══════════════════════════════════════ */}
      <section className="pr-stats">
        {STATS.map((s) => (
          <div key={s.value} className="pr-stat-card">
            <h2>{s.value}</h2>
            <p>{s.label}</p>
          </div>
        ))}
      </section>

      {/* ═══════════════════════════════════════
          ACTIVE PLAN BANNER
      ═══════════════════════════════════════ */}
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
                      {autoRenew && !isTrial && " · Auto-renews every 3 months"}
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

      {/* ═══════════════════════════════════════
          PRICING CARDS
      ═══════════════════════════════════════ */}
      <section id="pricing-section" className="pr-plans-section" ref={pricingRef}>

        <div className="pr-section-label">Simple, transparent pricing</div>

        <h2 className="pr-section-title">Choose Your Plan</h2>

        <p className="pr-section-sub">
          Upgrade anytime and unlock the complete Knarrow experience.
        </p>

        {/* 🎟 FIRST USER COUPON BANNER */}
        <div
          style={{
            maxWidth: "680px",
            margin: "0 auto 30px auto",
            background: "linear-gradient(135deg, #0284c7, #2563eb)",
            color: "#ffffff",
            borderRadius: "20px",
            padding: "20px 24px",
            boxShadow: "0 10px 25px rgba(2, 132, 199, 0.25)",
            textAlign: "center",
          }}
        >
          <div style={{ fontSize: "14px", fontWeight: "800", letterSpacing: "1px", textTransform: "uppercase", marginBottom: "4px" }}>
            🎉 FIRST TIME USER OFFER — 50% OFF!
          </div>
          <p style={{ fontSize: "14px", opacity: 0.95, margin: "4px 0 14px 0" }}>
            Use coupon code <strong style={{ background: "rgba(255,255,255,0.2)", padding: "2px 8px", borderRadius: "6px" }}>FIRST50</strong> during checkout to get 50% OFF your first Premium plan!
          </p>
          <div style={{ display: "flex", gap: "8px", maxWidth: "420px", margin: "0 auto" }}>
            <input
              type="text"
              placeholder="Enter coupon code (e.g. FIRST50)"
              value={couponInput}
              onChange={(e) => setCouponInput(e.target.value)}
              style={{
                flex: 1,
                padding: "10px 14px",
                borderRadius: "12px",
                border: "none",
                fontSize: "14px",
                color: "#0f172a",
                fontWeight: "600",
                outline: "none",
              }}
            />
            <button
              onClick={handleApplyCoupon}
              style={{
                background: "#ffffff",
                color: "#0284c7",
                border: "none",
                borderRadius: "12px",
                padding: "10px 18px",
                fontWeight: "800",
                fontSize: "14px",
                cursor: "pointer",
              }}
            >
              Apply 50% OFF
            </button>
          </div>
          {couponApplied && (
            <div style={{ marginTop: "10px", fontSize: "13px", fontWeight: "700", color: "#4ade80" }}>
              ✓ Coupon FIRST50 Applied! 50% OFF enabled on plans below.
            </div>
          )}
        </div>

        {/* 📱 PWA APP INSTALL TRIGGER CARD */}
        <div
          style={{
            maxWidth: "680px",
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

        <div className="pr-plans-grid">

          <PricingCard
            title="Free"
            price="0"
            currentPlan={currentPlan}
          />

          <PricingCard
            title="Premium Monthly"
            price={couponApplied ? "149.50" : "299"}
            originalPrice="299"
            couponApplied={couponApplied}
            currentPlan={currentPlan}
            expiresAt={premiumExpires}
          />

          <PricingCard
            title="Premium 3 Months"
            price={couponApplied ? "399.50" : "799"}
            originalPrice="799"
            couponApplied={couponApplied}
            popular
            currentPlan={currentPlan}
            expiresAt={premiumExpires}
          />

        </div>

        <p className="pr-plans-footnote">
          🔒 All payments are processed securely through Razorpay &nbsp;·&nbsp; Instant activation
        </p>

      </section>

      {/* ═══════════════════════════════════════
          BENEFITS
      ═══════════════════════════════════════ */}
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

      {/* ═══════════════════════════════════════
          TRUST
      ═══════════════════════════════════════ */}
      <section className="pr-trust">
        <div className="pr-trust-inner">
          {[
            { icon: "🔒", title: "100% Secure Payments",  desc: "Powered by Razorpay with industry-standard encryption and payment protection." },
            { icon: "⚡", title: "Instant Premium Access", desc: "Your account upgrades automatically after successful payment verification." },
            { icon: "💻", title: "Access Anywhere",        desc: "Practice from desktop, tablet or mobile using the same account." },
          ].map((t) => (
            <div key={t.title} className="pr-trust-card">
              <div className="pr-trust-icon">{t.icon}</div>
              <h3>{t.title}</h3>
              <p>{t.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════
          COMPARISON TABLE
      ═══════════════════════════════════════ */}
      <section className="pr-compare">

        <div className="pr-section-label">Side by side</div>
        <h2 className="pr-section-title">Compare Plans</h2>

        <div className="pr-compare-table">

          {/* header */}
          <div className="pr-compare-row pr-compare-head">
            <div>Feature</div>
            <div>Free</div>
            <div>Premium</div>
          </div>

          {COMPARE.map((row, i) => (
            <div
              key={i}
              className={`pr-compare-row${i % 2 === 0 ? " pr-compare-even" : ""}`}
            >
              <div>{row.feature}</div>
              <div className={row.free === "—" ? "pr-no" : "pr-yes"}>{row.free}</div>
              <div className="pr-yes">{row.premium}</div>
            </div>
          ))}

        </div>

      </section>

      {/* ═══════════════════════════════════════
          FAQ
      ═══════════════════════════════════════ */}
      <section className="pr-faq">

        <div className="pr-section-label">Got questions?</div>
        <h2 className="pr-section-title">Frequently Asked Questions</h2>

        <div className="pr-faq-grid">
          {FAQ.map((item) => (
            <div key={item.q} className="pr-faq-card">
              <h3>{item.q}</h3>
              <p>{item.a}</p>
            </div>
          ))}
        </div>

      </section>

      {/* ═══════════════════════════════════════
          FINAL CTA
      ═══════════════════════════════════════ */}
      <section className="pr-final-cta">
        <div className="pr-cta-card">
          <div className="pr-cta-badge">🚀 Start Your IELTS Journey Today</div>

          <h2>
            Ready to Reach <span>Band 8+</span> with Knarrow?
          </h2>

          <p>
            Practice smarter with AI-powered evaluation, realistic CBT mock exams,
            personalised analytics and everything you need to hit your target band.
          </p>

          <button className="pr-cta-btn" onClick={scrollToPlans}>
            🚀 View Plans
          </button>

          <div className="pr-cta-trust">
            <span>🔒 Secure Payments</span>
            <span>⚡ Instant Activation</span>
            <span>💳 Powered by Razorpay</span>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          MOBILE STICKY CTA
      ═══════════════════════════════════════ */}
      {!premium && (
        <div className="pr-mobile-sticky">
          <button onClick={scrollToPlans}>🚀 Unlock Premium</button>
        </div>
      )}

      {/* ═══════════════════════════════════════
          FOOTER
      ═══════════════════════════════════════ */}
      <footer className="pr-footer">
        <p>© 2026 Knarrow. All rights reserved.</p>
        <div>
          <a href="/privacy">Privacy Policy</a>
          <a href="/terms">Terms of Service</a>
          <a href="/support">Help Center</a>
        </div>
      </footer>

    </div>
  );
}
