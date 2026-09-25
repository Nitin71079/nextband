import "../styles/legal.css";

const SECTIONS = [
  {
    title: "Information We Collect",
    content: "We collect the following categories of information when you interact with Knarrow:",
    bullets: [
      "Account Information: Email address, display name, profile photo, and authentication identifiers collected via Firebase Auth (Google Sign-In or email/password).",
      "Exam & Performance Data: Test attempts, band scores, section scores, raw answers, timing metrics, and study plan progress across all 13 supported exam modules (IELTS, TOEFL, GRE, PTE, DET, CAT, GMAT, SAT, ACT, GATE, JEE, NEET, CLAT).",
      "AI Evaluation Data: Text essay submissions and audio recordings submitted for automated writing and speaking assessment.",
      "Billing & Transaction Data: Payment status, order IDs, and transaction references processed via Razorpay. We do not collect or store full credit/debit card numbers or banking passwords.",
      "Technical & Device Data: IP address, browser type, device type, operating system version, and system logs for security and performance optimization."
    ],
  },
  {
    title: "How We Use Your Information",
    content: "Your information is used strictly to provide, maintain, and improve our services:",
    bullets: [
      "To power your personalized user dashboard, progress analytics, and adaptive study planners.",
      "To evaluate writing essays and speaking audio using automated AI models and generate diagnostic feedback.",
      "To manage your premium subscriptions, process payment receipts, and handle billing inquiries via Razorpay.",
      "To prevent fraud, security breaches, and illegal copying of test preparation material.",
      "To send essential transactional notifications, password reset links, and service announcements."
    ],
  },
  {
    title: "Data Storage & Security Measures",
    content:
      "All user account records and exam histories are stored securely in Google Firebase (Firestore Database and Firebase Authentication). Data in transit is protected using SSL/TLS encryption (HTTPS). Access to production databases is restricted to authorized systems, and strict security rules enforce user-level data isolation.",
  },
  {
    title: "Third-Party Service Providers",
    content: "Knarrow integrates with trusted third-party service providers to deliver core features:",
    bullets: [
      "Google Firebase — User authentication, cloud database, and hosting infrastructure.",
      "Razorpay — Payment gateway processing for INR transactions (governed by Razorpay Privacy Policy).",
      "Groq / OpenAI API — AI language model providers used to evaluate essay text and speaking transcripts.",
      "Vercel — Global CDN hosting and application delivery."
    ],
  },
  {
    title: "Cookies & Browser Storage",
    content:
      "We utilize essential browser local storage and cookies to maintain active login sessions, save offline test states, store user preferences (such as dark mode preferences), and ensure secure navigation. Disabling browser storage may prevent certain interactive test features from functioning properly.",
  },
  {
    title: "AI Processing & Voice Submissions",
    content:
      "When you submit essays or audio recordings in speaking and writing modules, your inputs are transmitted over secure API connections to evaluation servers to compute scores, feedback, and error analyses. Voice recordings and text are used exclusively to process your specific evaluation request.",
  },
  {
    title: "User Rights & Data Controls",
    content: "Under applicable privacy laws, you possess the following rights regarding your personal data:",
    bullets: [
      "Right to Access: View your stored profile, score history, and account metrics at any time.",
      "Right to Rectification: Update your display name and profile settings directly in your account settings.",
      "Right to Erasure: Request permanent deletion of your account and test history by contacting support@knarrow.in.",
      "Right to Export: Request a copy of your historical performance records."
    ],
  },
  {
    title: "Children's Privacy Protection",
    content:
      "Knarrow is intended for students and learners aged 13 and older. We do not knowingly collect personal information from individuals under the age of 13. If we become aware that a child under 13 has provided personal data, we will take immediate steps to delete such records.",
  },
  {
    title: "Data Retention Period",
    content:
      "We retain active account data for as long as your account remains open. If you request account deletion, all personal profile data and performance records will be permanently removed or anonymized within 30 days.",
  },
  {
    title: "Updates to Privacy Policy",
    content:
      "This policy may be revised from time to time to reflect platform enhancements, legal requirements, or new features. Material changes will be communicated via website notices or email notifications.",
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
            At Knarrow, we respect your privacy and are committed to protecting your personal data and educational records.
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
            <strong>Privacy Questions?</strong> Contact our data privacy support team at{" "}
            <a href="mailto:support@knarrow.in" style={{ color: "#2563eb", fontWeight: 700 }}>
              support@knarrow.in
            </a>
            . We address all privacy inquiries within 48 business hours.
          </p>
        </div>
      </div>
    </div>
  );
}
