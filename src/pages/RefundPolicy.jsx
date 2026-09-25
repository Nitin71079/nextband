import React from "react";
import "../styles/legal.css";

const SECTIONS = [
  {
    title: "Subscription & Payment Overview",
    content:
      "Knarrow offers paid premium access plans (including monthly, annual, and lifetime access options) for advanced AI evaluations, unlimited mock tests, study planners, and performance analytics across our 13 exam modules. Payments are securely processed through Razorpay."
  },
  {
    title: "7-Day Refund Eligibility Period",
    content:
      "We want you to be completely satisfied with your test preparation experience on Knarrow. If you purchase a paid subscription and decide it does not meet your needs, you may request a full refund within 7 calendar days of your original transaction date, subject to the non-refundable usage conditions outlined below."
  },
  {
    title: "Conditions for Refund Eligibility",
    content:
      "To prevent abuse of our AI evaluation APIs and proprietary test material, refunds are granted only when the following fair-use conditions are met:",
    bullets: [
      "The refund request is submitted within 7 days of subscription activation.",
      "The account has completed no more than 3 full-length mock tests or 10 AI speaking/writing evaluations during the billing period.",
      "The subscription was purchased directly through the official Knarrow website (knarrow.in).",
      "The account has not previously received a refund for the same exam tier."
    ]
  },
  {
    title: "Non-Refundable Circumstances",
    content: "Refunds will NOT be granted under the following circumstances:",
    bullets: [
      "Requests submitted after the 7-day refund window has elapsed.",
      "Accounts that have substantially consumed platform resources (e.g., completing 4+ full mock tests or 10+ AI evaluations).",
      "Subscriptions cancelled due to violations of our Terms & Conditions or account sharing.",
      "Discounted promotional bundles or special gift codes marked as non-refundable at checkout."
    ]
  },
  {
    title: "Subscription Cancellation",
    content:
      "You can cancel your auto-renewing subscription at any time via your Settings page under Billing Management, or by contacting support@knarrow.in. Upon cancellation, your premium access remains active until the end of your current paid billing period. No further auto-renewal charges will be billed."
  },
  {
    title: "How to Request a Refund",
    content: "To initiate a refund request:",
    bullets: [
      "Send an email from your registered Knarrow account email address to support@knarrow.in.",
      "Include your Payment Transaction ID (received via email or Razorpay receipt).",
      "Briefly state the reason for your refund request so we can improve our service."
    ]
  },
  {
    title: "Refund Processing & Timeline",
    content:
      "Once approved, refunds are credited back to the original payment method (bank account, credit card, debit card, or UPI) used during checkout via Razorpay. Refund processing typically takes 5 to 7 business days to reflect on your account bank statement."
  },
  {
    title: "Contact & Policy Updates",
    content:
      "If you have any questions regarding our Refund and Cancellation Policy or experience billing discrepancies, please reach out to our support team at support@knarrow.in. We respond to all billing inquiries within 24-48 business hours."
  }
];

export default function RefundPolicy() {
  return (
    <div className="legal-page">
      <div className="legal-container">
        {/* Hero */}
        <div className="legal-hero">
          <div className="legal-hero-badge">Billing &amp; Payments</div>
          <h1>Refund &amp; Cancellation Policy</h1>
          <p>
            Transparent, fair refund terms for all Knarrow premium plans and subscriptions.
          </p>
          <div className="legal-hero-meta">Last updated: July 2026 · Effective immediately</div>
        </div>

        {/* Sections */}
        <div className="legal-card">
          {SECTIONS.map((s, i) => (
            <div key={i} className="legal-section">
              <h2>
                <span className="legal-section-number">{i + 1}</span>
                {s.title}
              </h2>
              <p>{s.content}</p>
              {s.bullets && (
                <ul>
                  {s.bullets.map((b, j) => (
                    <li key={j}>{b}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>

        {/* Support Highlight */}
        <div className="legal-highlight">
          <p>
            <strong>Need assistance with a transaction?</strong> Contact our dedicated support team at{" "}
            <a href="mailto:support@knarrow.in" style={{ color: "#2563eb", fontWeight: 700 }}>
              support@knarrow.in
            </a>
            . Please include your order ID for faster resolution.
          </p>
        </div>
      </div>
    </div>
  );
}
