import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import AuroraBackground from "../components/AuroraBackground";
import PricingCard from "../components/PricingCard";
import { useAuth } from "../context/AuthContext";
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
  { feature: "Reading Practice",      free: "5 Tests",   premium: "Unlimited" },
  { feature: "Listening Practice",    free: "5 Tests",   premium: "Unlimited" },
  { feature: "Writing AI Evaluation", free: "—",         premium: "✓"         },
  { feature: "Speaking AI Evaluation",free: "—",         premium: "✓"         },
  { feature: "Band Prediction",       free: "—",         premium: "✓"         },
  { feature: "Performance Analytics", free: "Basic",     premium: "Advanced"  },
  { feature: "Full CBT Mock Exams",   free: "—",         premium: "✓"         },
  { feature: "Study Planner",         free: "Basic",     premium: "AI Powered"},
  { feature: "AI Study Coach",        free: "—",         premium: "✓"         },
];

/* ── FAQ items ── */
const FAQ = [
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
    a: "Yes. Your subscription stays active until the expiry date shown in your account.",
  },
  {
    q: "What if I'm already on a plan?",
    a: "Your current plan is highlighted on this page. You can upgrade anytime and the new period starts immediately.",
  },
];

export default function Pricing() {
  const { user, premium, premiumPlan, premiumExpires } = useAuth();
  const navigate = useNavigate();
  const pricingRef = useRef(null);

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
              <span className="pr-active-crown">👑</span>
              <div>
                <strong>You're on {currentPlan}</strong>
                {premiumExpires && (() => {
                  const d = premiumExpires?.toDate
                    ? premiumExpires.toDate()
                    : new Date(premiumExpires);
                  return (
                    <p>
                      Active until{" "}
                      {d.toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
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

        <div className="pr-plans-grid">

          <PricingCard
            title="Free"
            price="0"
            currentPlan={currentPlan}
          />

          <PricingCard
            title="Premium Monthly"
            price="299"
            currentPlan={currentPlan}
            expiresAt={premiumExpires}
          />

          <PricingCard
            title="Premium 3 Months"
            price="799"
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
          <a href="/support">Support</a>
        </div>
      </footer>

    </div>
  );
}
