import AuroraBackground from "../components/AuroraBackground";
import PricingCard from "../components/PricingCard";

import "../styles/Pricing.css";

export default function Pricing() {
  return (
    <div className="pricing-page">

      <AuroraBackground />

      {/* ---------------- HERO ---------------- */}

      <section className="hero">

        <div className="hero-content">

          <div className="hero-pill">

            🚀 AI Powered IELTS Preparation Platform

          </div>

          <h1>

            Achieve Your Dream

            <span> IELTS Band </span>

            Faster with AI

          </h1>

          <p>

            Practice exactly like the official IELTS Computer
            Based Test with AI-powered Writing & Speaking
            evaluation, real exam simulations, detailed
            analytics and personalized study insights.

          </p>

          <div className="hero-buttons">

            <button
              className="primary-hero-btn"
              onClick={() =>
                document
                  .getElementById("pricing-section")
                  ?.scrollIntoView({
                    behavior: "smooth",
                  })
              }
            >
              Unlock Premium →
            </button>

            <button
              className="secondary-hero-btn"
              onClick={() =>
                document
                  .getElementById("benefits")
                  ?.scrollIntoView({
                    behavior: "smooth",
                  })
              }
            >
              Explore Features
            </button>

          </div>

          <div className="hero-rating">

            <span className="stars">

              ⭐⭐⭐⭐⭐

            </span>

            <span>

              Premium AI-powered IELTS Preparation

            </span>

          </div>

        </div>

      </section>
<section className="stats-section">

    <div className="stat-card">

        <h2>20+</h2>

        <p>Premium Reading & Listening Tests</p>

    </div>

    <div className="stat-card">

        <h2>100+</h2>

        <p>Writing & Speaking Tasks</p>

    </div>

    <div className="stat-card">

        <h2>AI</h2>

        <p>Instant Band Evaluation</p>

    </div>

    <div className="stat-card">

        <h2>CBT</h2>

        <p>Real IELTS Exam Experience</p>

    </div>

</section>
      {/* ---------------- PRICING ---------------- */}

      <section
        id="pricing-section"
        className="pricing-section"
      >

        <div className="section-heading">

          <h2>

            Choose Your Plan

          </h2>

          <p>

            Upgrade anytime and unlock the complete
            Knarrow experience.

          </p>

        </div>

        <div className="pricing-grid">

          <PricingCard
            title="Free"
            price="0"
            features={[
              "5 Reading Tests",
              "5 Listening Tests",
              "Basic Score Reports",
              "Community Access",
              "Limited Practice",
            ]}
          />

          <PricingCard
            title="Premium Monthly"
            price="299"
            features={[
              "Unlimited Reading",
              "Unlimited Listening",
              "Unlimited Writing",
              "Unlimited Speaking",
              "AI Writing Evaluation",
              "AI Speaking Evaluation",
              "Study Planner",
              "Band Prediction",
              "Performance Analytics",
              "Priority Support",
            ]}
          />

          <PricingCard
            title="Premium 3 Months"
            popular
            price="799"
            features={[
              "Everything Included",
              "5 Full CBT Mock Exams",
              "AI Study Coach",
              "Weak Skill Analysis",
              "Premium Dashboard",
              "Fastest Progress Tracking",
              "Best Value",
              "Save ₹98",
            ]}
          />

        </div>

      </section>
    

      {/* ---------------- BENEFITS ---------------- */}

      <section
        id="benefits"
        className="premium-benefits"
      >

        <div className="section-heading">

          <h2>

            Why Students Choose Knarrow

          </h2>

          <p>

            Every feature has been built to replicate the
            official IELTS Computer Based Test while giving
            you AI-powered guidance unavailable anywhere else.

          </p>

        </div>

        <div className="benefit-grid">

          <div className="benefit-card">

            <div className="benefit-icon">

              📝

            </div>

            <h3>

              AI Writing Evaluation

            </h3>

            <p>

              Receive detailed IELTS-style feedback,
              band estimates, grammar corrections,
              coherence analysis and vocabulary
              suggestions instantly.

            </p>

          </div>

          <div className="benefit-card">

            <div className="benefit-icon">

              🎤

            </div>

            <h3>

              AI Speaking Evaluation

            </h3>

            <p>

              Improve pronunciation, fluency,
              lexical resource and grammar through
              intelligent speaking assessment.

            </p>

          </div>

          <div className="benefit-card">

            <div className="benefit-icon">

              📊

            </div>

            <h3>

              Performance Analytics

            </h3>

            <p>

              Track every section,
              identify weaknesses,
              monitor band progression
              and understand exactly where
              you need to improve.

            </p>

          </div>

          <div className="benefit-card">

            <div className="benefit-icon">

              🎯

            </div>

            <h3>

              Real CBT Experience

            </h3>

            <p>

              Practice with an interface
              that closely mirrors the official
              IELTS Computer Based Test.

            </p>

          </div>

          <div className="benefit-card">

            <div className="benefit-icon">

              🤖

            </div>

            <h3>

              AI Study Coach

            </h3>

            <p>

              Receive personalized
              recommendations based on your
              strengths, weaknesses and progress.

            </p>

          </div>

          <div className="benefit-card">

            <div className="benefit-icon">

              🏆

            </div>

            <h3>

              Full Mock Exams

            </h3>

            <p>

              Experience complete
              Reading, Listening,
              Writing and Speaking
              exams under realistic timing.

            </p>

          </div>

        </div>

      </section>
            {/* ---------------- TRUST ---------------- */}

      <section className="pricing-trust">

        <div className="section-heading">

          <h2>Trusted by Serious IELTS Aspirants</h2>

          <p>
            Secure payments, instant activation and a platform
            designed to help you perform at your best.
          </p>

        </div>

        <div className="trust-grid">

          <div className="trust-card">

            <div className="trust-icon">
              🔒
            </div>

            <h3>100% Secure Payments</h3>

            <p>
              Powered by Razorpay with industry-standard
              encryption and payment protection.
            </p>

          </div>

          <div className="trust-card">

            <div className="trust-icon">
              ⚡
            </div>

            <h3>Instant Premium Access</h3>

            <p>
              Your account upgrades automatically
              after successful payment verification.
            </p>

          </div>

          <div className="trust-card">

            <div className="trust-icon">
              💻
            </div>

            <h3>Access Anywhere</h3>

            <p>
              Practice from desktop, tablet
              or mobile using the same account.
            </p>

          </div>

        </div>

      </section>

      {/* ---------------- COMPARISON ---------------- */}

      <section className="comparison-section">

        <div className="section-heading">

          <h2>Compare Plans</h2>

        </div>

        <div className="comparison-table">

          <table>

            <thead>

              <tr>

                <th>Features</th>

                <th>Free</th>

                <th>Premium</th>

              </tr>

            </thead>

            <tbody>

              <tr>

                <td>Reading Practice</td>

                <td>Limited</td>

                <td>Unlimited</td>

              </tr>

              <tr>

                <td>Listening Practice</td>

                <td>Limited</td>

                <td>Unlimited</td>

              </tr>

              <tr>

                <td>Writing AI</td>

                <td>—</td>

                <td>✓</td>

              </tr>

              <tr>

                <td>Speaking AI</td>

                <td>—</td>

                <td>✓</td>

              </tr>

              <tr>

                <td>Band Prediction</td>

                <td>—</td>

                <td>✓</td>

              </tr>

              <tr>

                <td>Performance Analytics</td>

                <td>Basic</td>

                <td>Advanced</td>

              </tr>

              <tr>

                <td>Full CBT Mock Exams</td>

                <td>—</td>

                <td>✓</td>

              </tr>

              <tr>

                <td>Study Planner</td>

                <td>Basic</td>

                <td>AI Powered</td>

              </tr>

            </tbody>

          </table>

        </div>

      </section>

      {/* ---------------- FAQ ---------------- */}

      <section className="pricing-faq">

        <div className="section-heading">

          <h2>Frequently Asked Questions</h2>

        </div>

        <div className="faq-item">

          <h3>
            Is Premium activated immediately?
          </h3>

          <p>
            Yes. Once Razorpay verifies your payment,
            Premium unlocks automatically.
          </p>

        </div>

        <div className="faq-item">

          <h3>
            Can I access Knarrow on multiple devices?
          </h3>

          <p>
            Absolutely. Simply sign in using the same
            account on any supported device.
          </p>

        </div>

        <div className="faq-item">

          <h3>
            Which payment methods are supported?
          </h3>

          <p>
            UPI, Debit Cards, Credit Cards,
            Net Banking and Wallets supported
            through Razorpay.
          </p>

        </div>

        <div className="faq-item">

          <h3>
            Will my Premium expire automatically?
          </h3>

          <p>
            Yes. Your subscription remains active
            until the expiry date shown in your account.
          </p>

        </div>

      </section>
      <section className="final-cta">

    <div className="cta-card">

        <div className="cta-badge">

            🚀 Start Your IELTS Journey Today

        </div>

        <h2>

            Ready to Reach
            <span> Band 8+ </span>
            with Knarrow?

        </h2>

        <p>

            Practice smarter with AI-powered Writing &
            Speaking evaluation, realistic CBT mock exams,
            personalized analytics, and everything you need
            to achieve your target IELTS band.

        </p>

        <button
            className="cta-button"
            onClick={() =>
                document
                    .querySelector(".pricing-grid")
                    ?.scrollIntoView({
                        behavior:"smooth"
                    })
            }
        >

            🚀 Unlock Premium

        </button>

        <div className="cta-trust">

            <span>🔒 Secure Payments</span>

            <span>⚡ Instant Activation</span>

            <span>💳 Powered by Razorpay</span>

        </div>

    </div>

</section>

      {/* ---------------- FINAL CTA ---------------- */}

     
      <div className="mobile-upgrade">

    <button
        onClick={()=>
            document
            .querySelector(".pricing-grid")
            ?.scrollIntoView({
                behavior:"smooth"
            })
        }
    >
        🚀 Unlock Premium
    </button>

</div>

      {/* ---------------- FOOTER ---------------- */}

   <footer className="pricing-footer">

    <p>

        © 2026 Knarrow

    </p>

    <div>

        <span>Privacy Policy</span><a href="/privacy">

Privacy Policy

</a>

<a href="/Terms">

Privacy Policy

</a>
<a href="/Privacy">

Privacy Policy

</a>
    </div>

</footer>
    </div>
  );
}