import "../styles/legal.css";

const SECTIONS = [
  {
    title: "Acceptance of Terms",
    content:
      "By accessing, registering for, or using Knarrow (knarrow.in), you acknowledge that you have read, understood, and agree to be bound by these Terms & Conditions. If you do not agree to these terms, you must refrain from using the platform.",
  },
  {
    title: "Platform Overview & Permitted Use",
    content:
      "Knarrow provides AI-powered exam preparation software, computer-based test (CBT) practice suites, adaptive analytics, and study planning tools across 13 major examination modules (IELTS, TOEFL, GRE, PTE, DET, CAT, GMAT, SAT, ACT, GATE, JEE, NEET, CLAT). You agree to use the platform strictly for personal, non-commercial educational purposes.",
  },
  {
    title: "Independent Educational Service Disclaimer",
    content:
      "Knarrow is an independent educational technology platform. Knarrow is NOT affiliated with, authorized by, endorsed by, or partnered with ETS, GMAC, NTA, IDP, British Council, Cambridge Assessment, College Board, Duolingo, Pearson, or any official examination governing body. All trademarked examination names belong solely to their respective copyright and trademark owners.",
  },
  {
    title: "AI Feedback & Score Estimation Limitations",
    content:
      "Score estimates, band predictors, essay evaluations, and speaking feedback provided by Knarrow's AI algorithms are simulated diagnostic tools designed for practice purposes. They do not constitute official examination scores, official certificates, or guaranteed test results on actual examination days.",
  },
  {
    title: "Account Registration & Security",
    content:
      "You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You agree to notify us immediately at support@knarrow.in of any unauthorized access or security breach.",
  },
  {
    title: "Prohibited Conduct & Anti-Theft Protection",
    content:
      "To safeguard our proprietary content and technical infrastructure, users are strictly prohibited from:",
    bullets: [
      "Using automated scripts, web scrapers, or bots to extract test questions or platform content.",
      "Attempting to circumvent security mechanisms, anti-screenshot measures, or payment gates.",
      "Sharing, reselling, or sub-licensing user accounts or premium subscriptions.",
      "Posting harmful, offensive, unlawful, or infringing content in community discussion spaces.",
      "Attempting to reverse-engineer, decompile, or copy any software logic or source code."
    ],
  },
  {
    title: "Subscriptions, Pricing & Payments",
    content:
      "Access to certain premium test suites and AI evaluation limits requires a paid subscription. Prices are displayed in INR (or USD equivalent) at checkout. Payments are processed securely via Razorpay. Subscriptions renew according to the chosen plan unless cancelled prior to the billing date.",
  },
  {
    title: "Refunds & Cancellations",
    content:
      "Refund requests are handled in accordance with our Refund & Cancellation Policy. Refund requests submitted within 7 days of purchase are eligible for full refunds, provided platform fair-use usage limits have not been exceeded.",
  },
  {
    title: "Intellectual Property Rights",
    content:
      "All platform branding, visual design, custom UI components, software algorithms, practice test questions, software code, and educational content are the exclusive intellectual property of Knarrow. All rights reserved.",
  },
  {
    title: "Service Availability & Modifications",
    content:
      "We strive to maintain 99.9% platform availability. However, scheduled updates, emergency maintenance, or server outages may occasionally interrupt access. We reserve the right to modify or enhance platform features at any time.",
  },
  {
    title: "Limitation of Liability",
    content:
      "To the maximum extent permitted by applicable law, Knarrow shall not be liable for any indirect, incidental, or consequential damages, score discrepancies, or university admission outcomes resulting from your use of the platform.",
  },
  {
    title: "Governing Law & Jurisdiction",
    content:
      "These Terms & Conditions are governed by the laws of India. Any legal disputes arising out of or related to platform usage shall be subject to the exclusive jurisdiction of the courts in Bangalore, Karnataka, India.",
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
            Please review these terms governing your use of Knarrow's AI-powered test preparation platform.
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

        {/* Highlight */}
        <div className="legal-highlight">
          <p>
            <strong>Questions regarding our terms?</strong> Reach out to our team at{" "}
            <a href="mailto:support@knarrow.in" style={{ color: "#2563eb", fontWeight: 700 }}>
              support@knarrow.in
            </a>
            . We are happy to assist you.
          </p>
        </div>
      </div>
    </div>
  );
}
