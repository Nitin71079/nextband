import { useState } from "react";
import { Search, ChevronDown } from "lucide-react";
import "../styles/legal.css";

const FAQS = [
  {
    category: "Getting Started",
    items: [
      {
        q: "What is Knarrow?",
        a: "Knarrow is an AI-powered IELTS preparation platform covering all four skills — Reading, Listening, Writing, and Speaking. It provides realistic mock tests, AI-generated feedback, band score estimates, personalised study plans, and progress analytics.",
      },
      {
        q: "Do I need to create an account?",
        a: "You can browse the platform without an account, but you'll need to sign up to attempt mock tests, save your progress, access your dashboard, and get AI evaluations.",
      },
      {
        q: "Is Knarrow free?",
        a: "Yes — a substantial free tier is available including reading and listening mock tests and basic features. Premium unlocks full AI evaluations, speaking feedback, detailed analytics, the study planner, and unlimited mock tests.",
      },
      {
        q: "Which IELTS modules does Knarrow cover?",
        a: "All four: Reading (Academic & General Training), Listening, Writing (Task 1 & Task 2), and Speaking (all three parts). Both Academic and General Training pathways are supported.",
      },
    ],
  },
  {
    category: "Mock Tests & Practice",
    items: [
      {
        q: "Are the mock tests similar to the real IELTS exam?",
        a: "Yes. Our tests are designed to closely mirror the format, question types, timing, and difficulty of official IELTS exams. Academic and General Training tests are separate and follow their respective IELTS structures.",
      },
      {
        q: "How is my band score calculated?",
        a: "For Reading and Listening, your raw score (number of correct answers) is converted to an IELTS band score using the official IELTS band descriptor scale. For Writing and Speaking, AI evaluations score each response across the four official IELTS criteria.",
      },
      {
        q: "Can I pause a test and resume it later?",
        a: "Yes — for practice mode, your progress is auto-saved. For full mock tests in exam mode, the timer continues as it would in a real exam.",
      },
      {
        q: "How many mock tests are available?",
        a: "There are 10 Academic Reading tests, 10 General Training Reading tests, multiple Listening tests, and a growing bank of Writing tasks and Speaking questions. New content is added regularly.",
      },
    ],
  },
  {
    category: "AI Evaluations",
    items: [
      {
        q: "How accurate are the AI band score estimates?",
        a: "Our AI evaluations are trained on IELTS scoring criteria and provide estimates that closely align with official examiner scores. They are educational indicators — not official IELTS results — and should be used for practice and improvement guidance.",
      },
      {
        q: "What does the AI look at when evaluating Writing?",
        a: "Writing is evaluated across all four official IELTS Writing criteria: Task Achievement/Response, Coherence & Cohesion, Lexical Resource, and Grammatical Range & Accuracy. You receive scores and detailed feedback for each criterion.",
      },
      {
        q: "What does the AI evaluate for Speaking?",
        a: "Speaking is evaluated across the four official criteria: Fluency & Coherence, Lexical Resource, Grammatical Range & Accuracy, and Pronunciation. You record your response and receive written feedback with a band estimate.",
      },
      {
        q: "Is my writing or speaking data shared with anyone?",
        a: "Your submissions are processed via OpenAI's API solely to generate your feedback. They are not stored by OpenAI beyond the API call and are not used for AI model training. See our Privacy Policy for full details.",
      },
    ],
  },
  {
    category: "Premium & Billing",
    items: [
      {
        q: "What's included in Premium?",
        a: "Premium unlocks: unlimited AI Writing evaluations, AI Speaking evaluations with detailed feedback, full Progress Analytics, the AI Study Planner, Accent Lab, the full mock test library, and priority support.",
      },
      {
        q: "What payment methods are accepted?",
        a: "Payments are processed via Razorpay and support UPI, debit/credit cards (Visa, Mastercard, RuPay), net banking, and popular wallets.",
      },
      {
        q: "Can I get a refund?",
        a: "Refund requests are considered within 7 days of purchase, provided the premium features have not been substantially used. Contact support@knarrow.in with your order details.",
      },
      {
        q: "Does the subscription auto-renew?",
        a: "Yes, subscriptions renew automatically at the end of each billing cycle. You can cancel at any time from the Settings > Billing page. Access continues until the end of the paid period.",
      },
    ],
  },
  {
    category: "Account & Settings",
    items: [
      {
        q: "How do I change my password?",
        a: "Go to Settings > Account and use the Change Password option. If you signed in with Google, password management is handled through your Google account.",
      },
      {
        q: "Can I delete my account?",
        a: "Yes. Go to Settings > Account > Delete Account. This permanently removes your account and all associated data within 30 days.",
      },
      {
        q: "How do I track my progress?",
        a: "Your Dashboard shows an overview of your band scores, recent activity, and streaks. The Analytics page (Premium) provides in-depth skill breakdowns, score trends over time, and personalised improvement recommendations.",
      },
      {
        q: "I found a bug or have a suggestion — how do I report it?",
        a: "We'd love to hear from you. Use the Help Center at /help, email support@knarrow.in, or use the feedback button on any page.",
      },
    ],
  },
];

function FAQItem({ item }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="faq-item">
      <button
        className={`faq-question${open ? " open" : ""}`}
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
      >
        <span>{item.q}</span>
        <ChevronDown size={18} className="faq-chevron" />
      </button>
      <div className={`faq-answer${open ? " open" : ""}`}>
        <p>{item.a}</p>
      </div>
    </div>
  );
}

export default function FAQ() {
  const [query, setQuery] = useState("");

  const filtered = FAQS.map((cat) => ({
    ...cat,
    items: cat.items.filter(
      (item) =>
        item.q.toLowerCase().includes(query.toLowerCase()) ||
        item.a.toLowerCase().includes(query.toLowerCase())
    ),
  })).filter((cat) => cat.items.length > 0);

  return (
    <div className="legal-page">
      <div className="legal-container">

        {/* Hero */}
        <div className="legal-hero">
          <div className="legal-hero-badge">Support</div>
          <h1>Frequently Asked Questions</h1>
          <p>
            Everything you need to know about Knarrow — mock tests, AI evaluations,
            subscriptions, and more.
          </p>
        </div>

        {/* Search */}
        <div className="faq-search-bar">
          <Search size={18} />
          <input
            type="text"
            placeholder="Search questions…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>

        {/* Questions */}
        {filtered.length === 0 ? (
          <div className="legal-card">
            <div className="faq-no-results">
              No results for "<strong>{query}</strong>" — try different keywords.
            </div>
          </div>
        ) : (
          filtered.map((cat) => (
            <div key={cat.category} className="legal-card" style={{ marginBottom: "16px" }}>
              <div className="faq-category-title">{cat.category}</div>
              {cat.items.map((item, i) => (
                <FAQItem key={i} item={item} />
              ))}
            </div>
          ))
        )}

        {/* Contact nudge */}
        <div className="legal-highlight" style={{ marginTop: "24px" }}>
          <p>
            <strong>Still have questions?</strong> Visit the{" "}
            <a href="/help" style={{ color: "#2563eb" }}>Help Center</a> or email us at{" "}
            <a href="mailto:support@knarrow.in" style={{ color: "#2563eb" }}>
              support@knarrow.in
            </a>
            . We usually respond within one business day.
          </p>
        </div>

      </div>
    </div>
  );
}
