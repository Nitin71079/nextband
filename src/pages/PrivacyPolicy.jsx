import "../styles/legal.css";

const SECTIONS = [
  {
    title: "Information We Collect",
    content: "We collect the following types of information when you use Knarrow:",
    bullets: [
      "Account data: email address, display name, and profile photo (via Google or email sign-in)",
      "Usage data: mock test attempts, band scores, time spent, features used",
      "Device data: browser type, operating system, IP address, and referral source",
      "Payment data: transaction IDs processed via Razorpay (we do not store card details)",
      "AI interaction data: speaking recordings and writing submissions processed for evaluation",
    ],
  },
  {
    title: "How We Use Your Information",
    content: "Your data is used to:",
    bullets: [
      "Personalise your dashboard, recommendations, and study plan",
      "Generate AI-powered feedback and estimated band scores",
      "Track your learning progress across all four IELTS skills",
      "Process and manage your subscription payments",
      "Improve platform features, performance, and AI accuracy",
      "Send important service updates (you can unsubscribe at any time)",
    ],
  },
  {
    title: "Data Storage & Security",
    content:
      "Your data is stored securely using Google Firebase (Firestore & Firebase Auth). We implement industry-standard security measures including encrypted connections (HTTPS), Firebase security rules, and regular access audits. However, no system is completely immune to breaches — we encourage you to use a strong, unique password.",
  },
  {
    title: "Third-Party Services",
    content: "Knarrow uses the following third-party services that may process your data:",
    bullets: [
      "Firebase / Google Cloud — authentication, database, storage",
      "OpenAI — AI writing and speaking evaluations (submissions are not stored by OpenAI beyond the API call)",
      "Razorpay — payment processing (governed by Razorpay's Privacy Policy)",
      "Vercel — platform hosting and edge delivery",
    ],
  },
  {
    title: "Cookies & Analytics",
    content:
      "We use cookies and browser storage to maintain your session and preferences. We may use anonymised analytics to understand user engagement and improve the platform. You can disable cookies in your browser settings, though some features may not function correctly.",
  },
  {
    title: "AI Data Processing",
    content:
      "When you submit speaking recordings or writing essays for AI evaluation, the content is sent to our AI provider (OpenAI) via encrypted API calls solely to generate feedback. We do not sell, share, or use this content for training AI models without explicit consent.",
  },
  {
    title: "Your Rights",
    content: "You have the right to:",
    bullets: [
      "Access the personal data we hold about you",
      "Request correction of inaccurate data",
      "Request deletion of your account and associated data",
      "Withdraw consent for optional data processing",
      "Data portability — export your test history and results",
    ],
  },
  {
    title: "Children's Privacy",
    content:
      "Knarrow is not intended for children under 13. We do not knowingly collect personal information from children under 13. If you believe a child has provided us with personal data, please contact us and we will promptly delete it.",
  },
  {
    title: "Data Retention",
    content:
      "We retain your account data for as long as your account is active. If you delete your account, your personal data will be removed within 30 days, except where retention is required by law.",
  },
  {
    title: "Policy Updates",
    content:
      "This Privacy Policy may be updated to reflect platform changes, new integrations, or legal requirements. We will notify you of significant changes via email or in-app notification. Continued use after updates constitutes acceptance.",
  },
];

export default function PrivacyPolicy() {
  return (
    <div className="legal-page">
      <div className="legal-container">

        {/* Hero */}
        <div className="legal-hero">
          <div className="legal-hero-badge">Legal</div>
          <h1>Privacy Policy</h1>
          <p>
            At Knarrow, your privacy matters. This policy explains exactly what
            data we collect, how we use it, and the controls you have over it.
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
                  {s.bullets.map((b, j) => <li key={j}>{b}</li>)}
                </ul>
              )}
            </div>
          ))}
        </div>

        {/* Contact */}
        <div className="legal-highlight">
          <p>
            <strong>Questions about your data?</strong> Contact our privacy team at{" "}
            <a href="mailto:support@knarrow.in" style={{ color: "#2563eb" }}>
              support@knarrow.in
            </a>
            . We aim to respond to all privacy-related requests within 5 business days.
          </p>
        </div>

      </div>
    </div>
  );
}
