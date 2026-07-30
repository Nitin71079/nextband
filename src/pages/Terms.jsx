import "../styles/legal.css";

const SECTIONS = [
  {
    title: "Acceptance of Terms",
    content:
      "By accessing or using Knarrow, you confirm that you are at least 13 years of age and agree to be bound by these Terms & Conditions. If you do not agree, please discontinue use of the platform immediately.",
  },
  {
    title: "Platform Usage",
    content:
      "Knarrow is an AI-powered IELTS preparation platform. You agree to use it solely for lawful educational purposes. Prohibited activities include:",
    bullets: [
      "Attempting to reverse-engineer, scrape, or copy platform content",
      "Sharing account credentials with other users",
      "Using the platform to distribute spam, malware, or harmful content",
      "Impersonating other users or Knarrow staff",
    ],
  },
  {
    title: "Account Responsibility",
    content:
      "You are solely responsible for maintaining the confidentiality of your login credentials and for all activity that occurs under your account. Notify us immediately at support@knarrow.in if you suspect unauthorised access.",
  },
  {
    title: "Educational Content & AI Evaluations",
    content:
      "Knarrow provides AI-generated feedback, band score estimates, mock tests, and study analytics for educational purposes only. These are simulated indicators and do not constitute official IELTS scores or certifications issued by IDP, British Council, or Cambridge Assessment.",
  },
  {
    title: "Premium Subscriptions & Payments",
    content:
      "Certain features require a paid subscription. By subscribing you agree to:",
    bullets: [
      "Pay the applicable fees as displayed at checkout",
      "Automatic renewal unless cancelled before the billing date",
      "Our refund policy: refunds are considered within 7 days of purchase if the service has not been substantially used",
    ],
  },
  {
    title: "Intellectual Property",
    content:
      "All platform branding, UI elements, design systems, AI models, educational content, and source code are the intellectual property of Knarrow. Reproducing, distributing, or creating derivative works without explicit written permission is prohibited.",
  },
  {
    title: "Service Availability",
    content:
      "We aim to maintain high uptime but do not guarantee continuous, uninterrupted access. Scheduled maintenance, technical issues, or events beyond our control may cause temporary unavailability.",
  },
  {
    title: "Limitation of Liability",
    content:
      "To the fullest extent permitted by law, Knarrow shall not be liable for any indirect, incidental, or consequential damages arising from platform usage, including but not limited to actual IELTS exam results, data loss, or service interruptions.",
  },
  {
    title: "Third-Party Services",
    content:
      "The platform integrates with third-party services including Firebase (authentication & database), Razorpay (payments), OpenAI (AI evaluations), and Vercel (hosting). Use of these services is subject to their respective terms and policies.",
  },
  {
    title: "Termination",
    content:
      "We reserve the right to suspend or terminate accounts that violate these Terms at our discretion, without prior notice. Users may also delete their account at any time via the Settings page.",
  },
  {
    title: "Governing Law",
    content:
      "These Terms are governed by the laws of India. Any disputes arising from use of the platform shall be subject to the exclusive jurisdiction of courts in Bangalore, Karnataka.",
  },
  {
    title: "Updates to Terms",
    content:
      "These Terms may be revised periodically. Continued use of the platform after updates constitutes acceptance of the revised Terms. We will notify users of material changes via email or in-app notification.",
  },
];

export default function Terms() {
  return (
    <div className="legal-page">
      <div className="legal-container">

        {/* Hero */}
        <div className="legal-hero">
          <div className="legal-hero-badge">Legal</div>
          <h1>Terms &amp; Conditions</h1>
          <p>
            Please read these terms carefully before using Knarrow. They govern
            your access to and use of our AI-powered IELTS preparation platform.
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

        {/* Agreement */}
        <div className="legal-highlight">
          <p>
            <strong>Agreement:</strong> By continuing to use Knarrow, you confirm
            that you have read, understood, and agree to these Terms &amp; Conditions.
            Questions? Contact us at{" "}
            <a href="mailto:support@knarrow.in" style={{ color: "#2563eb" }}>
              support@knarrow.in
            </a>
          </p>
        </div>

      </div>
    </div>
  );
}
