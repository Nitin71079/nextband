import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import AuroraBackground from "../components/AuroraBackground";
import {
  Search,
  BookOpen,
  Headphones,
  PenLine,
  Mic,
  Brain,
  CreditCard,
  Settings,
  Trophy,
  ChevronDown,
  ChevronUp,
  Mail,
  MessageCircle,
  ArrowRight,
  Sparkles,
  HelpCircle,
  BarChart3,
  Gamepad2,
} from "lucide-react";
import "../styles/helpCenter.css";

/* ─────────────────────────────────────────────
   CATEGORIES
───────────────────────────────────────────── */

const CATEGORIES = [
  { id: "getting-started", label: "Getting Started",     icon: BookOpen,     color: "#2563eb" },
  { id: "reading",         label: "Reading",             icon: BookOpen,     color: "#0891b2" },
  { id: "listening",       label: "Listening",           icon: Headphones,   color: "#7c3aed" },
  { id: "writing",         label: "Writing",             icon: PenLine,      color: "#059669" },
  { id: "speaking",        label: "Speaking",            icon: Mic,          color: "#dc2626" },
  { id: "ai",              label: "AI Features",         icon: Brain,        color: "#d97706" },
  { id: "analytics",       label: "Analytics",           icon: BarChart3,    color: "#0284c7" },
  { id: "games",           label: "Games Zone",          icon: Gamepad2,     color: "#9333ea" },
  { id: "billing",         label: "Billing & Premium",   icon: CreditCard,   color: "#16a34a" },
  { id: "account",         label: "Account & Settings",  icon: Settings,     color: "#475569" },
  { id: "scores",          label: "Scores & Results",    icon: Trophy,       color: "#b45309" },
];

/* ─────────────────────────────────────────────
   FAQ DATA
───────────────────────────────────────────── */

const FAQS = [
  /* ── Getting Started ── */
  {
    category: "getting-started",
    q: "What is Knarrow?",
    a: "Knarrow is an AI-powered IELTS preparation platform. It offers realistic Computer Based Test (CBT) simulations for all four modules — Reading, Listening, Writing, and Speaking — along with AI-driven feedback, performance analytics, a personalised study planner, and games to make practice engaging.",
  },
  {
    category: "getting-started",
    q: "Do I need to create an account to use Knarrow?",
    a: "You can explore the home page and some public content without an account. However, to access practice tests, track your progress, and use AI features you need to register. Registration is free and takes under a minute.",
  },
  {
    category: "getting-started",
    q: "How do I register?",
    a: "Click the 'Register' button on the top right of any page. You can sign up with your email and a password. After verifying your email you'll be redirected to your Dashboard automatically.",
  },
  {
    category: "getting-started",
    q: "Is Knarrow free to use?",
    a: "Yes — there's a free tier that gives access to limited Reading and Listening tests along with basic analytics. Upgrading to Premium unlocks unlimited tests, AI Writing & Speaking evaluation, full CBT mock exams, advanced analytics, the AI Study Coach, and more.",
  },
  {
    category: "getting-started",
    q: "Which IELTS modules does Knarrow cover?",
    a: "Knarrow covers all four modules: Reading (Academic & General Training), Listening, Writing (Task 1 & Task 2), and Speaking. Full CBT-style mock exams bundling all four modules are also available under Full Mocks.",
  },

  /* ── Reading ── */
  {
    category: "reading",
    q: "What types of Reading tests are available?",
    a: "Knarrow provides both Academic and General Training Reading tests. Each test contains three passages with a variety of question types including Multiple Choice, True/False/Not Given, Matching Headings, Sentence Completion, and more.",
  },
  {
    category: "reading",
    q: "How are Reading answers checked?",
    a: "Answers are checked automatically as soon as you submit the test. You'll see which answers are correct or incorrect, your band score estimate, and a full review mode where you can go through each question with the correct answer highlighted.",
  },
  {
    category: "reading",
    q: "Can I pause a Reading test and resume later?",
    a: "Yes. Your progress is auto-saved as you go. If you navigate away, you'll be prompted to resume the test next time you open it.",
  },
  {
    category: "reading",
    q: "How many Reading tests are available?",
    a: "There are 20+ Reading tests across Academic and General Training categories, with more being added regularly.",
  },

  /* ── Listening ── */
  {
    category: "listening",
    q: "How does the Listening module work?",
    a: "You'll listen to audio recordings — just like in the real IELTS exam — and answer questions as the audio plays. The audio cannot be paused or replayed, matching real exam conditions. A question palette lets you track which questions you've answered.",
  },
  {
    category: "listening",
    q: "What question types appear in Listening tests?",
    a: "You'll encounter Multiple Choice, Form Completion, Note Completion, Table Completion, Flowchart Completion, Diagram Labelling, Matching, and Map Labelling questions.",
  },
  {
    category: "listening",
    q: "The audio isn't playing. What should I do?",
    a: "First check that your browser isn't blocking audio (look for a muted icon in the address bar). Make sure your device volume is turned up. Try refreshing the page. If the issue persists, try a different browser — Knarrow works best in Chrome or Edge.",
  },
  {
    category: "listening",
    q: "Can I restore an accidentally closed Listening test?",
    a: "Yes. Knarrow saves your listening progress locally. When you return to the Listening Center, you'll see an option to resume your most recent session.",
  },

  /* ── Writing ── */
  {
    category: "writing",
    q: "What writing tasks are available?",
    a: "Both Academic Writing Task 1 (charts, graphs, diagrams, maps) and Task 2 (opinion essays, problem-solution essays, discussion essays) and General Training letter writing tasks are available.",
  },
  {
    category: "writing",
    q: "How does AI Writing Evaluation work?",
    a: "After you submit your essay, Knarrow's AI analyses it against all four official IELTS Writing criteria: Task Achievement, Coherence & Cohesion, Lexical Resource, and Grammatical Range & Accuracy. You receive a detailed breakdown with a band estimate, specific suggestions, and highlighted improvements.",
  },
  {
    category: "writing",
    q: "How long does Writing evaluation take?",
    a: "Evaluation is near-instant — usually within 10–15 seconds after submission.",
  },
  {
    category: "writing",
    q: "Does Knarrow save my writing drafts?",
    a: "Yes. Knarrow auto-saves your essay as you type. If you close the tab accidentally, your draft will be restored the next time you open the same task.",
  },
  {
    category: "writing",
    q: "Is AI Writing Evaluation available on the Free plan?",
    a: "AI Writing Evaluation is a Premium feature. Free users can write essays but won't receive AI feedback until they upgrade.",
  },

  /* ── Speaking ── */
  {
    category: "speaking",
    q: "How does AI Speaking Evaluation work?",
    a: "You record your response to a Speaking prompt directly in the browser. Knarrow transcribes your audio, then evaluates it on Fluency & Coherence, Lexical Resource, Grammatical Range & Accuracy, and Pronunciation, providing a band estimate and actionable feedback.",
  },
  {
    category: "speaking",
    q: "My microphone is not working. How do I fix it?",
    a: "Make sure you've granted microphone permission to the site. In Chrome, click the lock icon in the address bar → Site settings → Microphone → Allow. Then refresh the page and try again.",
  },
  {
    category: "speaking",
    q: "What parts of the IELTS Speaking test are covered?",
    a: "Knarrow covers all three parts: Part 1 (Introduction & Interview), Part 2 (Long Turn / Cue Card), and Part 3 (Two-way Discussion).",
  },
  {
    category: "speaking",
    q: "Is AI Speaking Evaluation available on the Free plan?",
    a: "AI Speaking Evaluation is a Premium feature. Free users can practice speaking but need to upgrade for AI feedback.",
  },

  /* ── AI Features ── */
  {
    category: "ai",
    q: "What is the AI Control Center?",
    a: "The AI Control Center is your hub for all AI-powered tools — AI Writing Evaluation, AI Speaking Evaluation, the AI Study Coach chat, the AI Accent Lab, and Audio Generator. Access it from the nav bar under 'AI Studio'.",
  },
  {
    category: "ai",
    q: "What is the AI Study Coach?",
    a: "The AI Study Coach is a conversational assistant that gives you personalised study advice, answers IELTS questions, helps you understand your weak areas, and suggests what to practice next based on your history.",
  },
  {
    category: "ai",
    q: "What is Accent Lab?",
    a: "Accent Lab is a Premium AI tool that analyses your pronunciation, identifies specific sounds you struggle with, and gives targeted exercises to improve your spoken English accent and clarity.",
  },
  {
    category: "ai",
    q: "What is the Audio Generator?",
    a: "Audio Generator is a Premium tool that creates realistic IELTS-style listening audio from custom scripts — useful for teachers creating practice material or learners who want fresh content.",
  },

  /* ── Analytics ── */
  {
    category: "analytics",
    q: "What does the Analytics dashboard show?",
    a: "The Analytics dashboard shows your band score trends across all modules, time spent practising, accuracy by question type, your strongest and weakest skill areas, and personalised improvement suggestions.",
  },
  {
    category: "analytics",
    q: "How accurate is the band prediction?",
    a: "Band predictions are generated by AI models trained on IELTS marking criteria. They are designed to closely reflect official band descriptors, but should be treated as an indication rather than a guarantee of your actual exam score.",
  },
  {
    category: "analytics",
    q: "Is advanced analytics a Premium feature?",
    a: "Basic analytics (overall scores, recent tests) are available for free. Advanced analytics with full trend breakdowns, question-type analysis, and AI recommendations require a Premium subscription.",
  },

  /* ── Games ── */
  {
    category: "games",
    q: "What games are available in the Games Zone?",
    a: "The Games Zone currently includes: Speaking Showdown, Audio Sniper, Essay Duel, Vocab Battle, Reading Race, Word Chain, Sentence Fixer, Band Blitz, Synonym Sprint, and Grammar Gladiator.",
  },
  {
    category: "games",
    q: "Do games count towards my practice history?",
    a: "Yes. Games contribute to your Streaks and some game scores are reflected in your overall activity feed and leaderboard ranking.",
  },
  {
    category: "games",
    q: "Can I compete against other users?",
    a: "The Leaderboard ranks all users by activity and scores. Some games like Essay Duel and Speaking Showdown are designed with competitive mechanics in mind.",
  },

  /* ── Billing & Premium ── */
  {
    category: "billing",
    q: "How much does Premium cost?",
    a: "Knarrow offers three Premium options: Monthly (₹499 for first-timers, ₹999 regular), 3-Month (₹1,249 for first-timers, ₹2,499 regular), and Lifetime Access (one-time ₹4,999 for unlimited lifetime access).",
  },
  {
    category: "billing",
    q: "Which payment methods are accepted?",
    a: "All payments are processed securely through Razorpay. Accepted methods include UPI, Debit Cards, Credit Cards, Net Banking, and popular Wallets.",
  },
  {
    category: "billing",
    q: "Is Premium activated immediately after payment?",
    a: "Yes. Once Razorpay confirms your payment, your account upgrades to Premium automatically within seconds. No manual activation required.",
  },
  {
    category: "billing",
    q: "Does Premium renew automatically?",
    a: "No. Knarrow uses one-time payment subscriptions. You'll receive a reminder before your plan expires, and can renew manually from the Pricing page.",
  },
  {
    category: "billing",
    q: "What happens when my Premium expires?",
    a: "You revert to the Free plan. Your data, results, and history are fully preserved. You can resubscribe anytime to regain Premium access.",
  },
  {
    category: "billing",
    q: "Can I get a refund?",
    a: "Refunds are evaluated on a case-by-case basis. If you haven't used any Premium features since payment, reach out to support@knarrow.in within 48 hours and we'll review your request.",
  },

  /* ── Account & Settings ── */
  {
    category: "account",
    q: "How do I update my profile information?",
    a: "Go to your Profile page (click your avatar in the top right → Profile). From there you can update your display name, target band score, and profile picture.",
  },
  {
    category: "account",
    q: "How do I change my password?",
    a: "Go to Settings → Security and use the 'Change Password' option. You'll need to confirm your current password before setting a new one.",
  },
  {
    category: "account",
    q: "How do I switch between dark and light mode?",
    a: "Click the Sun/Moon icon in the top navigation bar to toggle between light and dark themes. Your preference is saved automatically.",
  },
  {
    category: "account",
    q: "How do I delete my account?",
    a: "Account deletion can be requested from Settings → Account → Delete Account. This is permanent and removes all your data. If you're having trouble, contact support@knarrow.in.",
  },

  /* ── Scores & Results ── */
  {
    category: "scores",
    q: "Where can I see all my past test results?",
    a: "Visit the Results History page (Dashboard → View History or navigate to /results-history). You can filter by module and date to find any past test.",
  },
  {
    category: "scores",
    q: "How is the IELTS band score calculated?",
    a: "For Reading and Listening, your raw score (number correct) is converted to a band using official IELTS conversion tables. For Writing and Speaking, the AI evaluates your response against the four official band descriptors and provides a band estimate.",
  },
  {
    category: "scores",
    q: "Can I download or share my results?",
    a: "Yes. From the Results or Evaluation History page, use the 'Download PDF' button to export your result as a formatted PDF you can share or print.",
  },
  {
    category: "scores",
    q: "What are Certificates?",
    a: "Knarrow awards achievement certificates when you reach milestones like completing a full mock exam or consistently scoring above a target band. Find them at /certificates.",
  },
];

/* ─────────────────────────────────────────────
   POPULAR ARTICLES  (quick-start links)
───────────────────────────────────────────── */

const POPULAR = [
  { label: "How do I upgrade to Premium?",       cat: "billing"         },
  { label: "How does AI Writing Evaluation work?", cat: "writing"        },
  { label: "My microphone isn't working",          cat: "speaking"       },
  { label: "How to restore a Listening session",   cat: "listening"      },
  { label: "Where are my past results?",           cat: "scores"         },
  { label: "What is the AI Study Coach?",          cat: "ai"             },
];

/* ─────────────────────────────────────────────
   ACCORDION ITEM
───────────────────────────────────────────── */

function AccordionItem({ q, a, open, onToggle }) {
  return (
    <div className={`hc-accordion-item${open ? " hc-accordion-item--open" : ""}`}>
      <button className="hc-accordion-trigger" onClick={onToggle} aria-expanded={open}>
        <span>{q}</span>
        {open ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
      </button>
      {open && (
        <div className="hc-accordion-body">
          <p>{a}</p>
        </div>
      )}
    </div>
  );
}

/* ─────────────────────────────────────────────
   MAIN PAGE
───────────────────────────────────────────── */

export default function HelpCenter() {
  const [search, setSearch]       = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [openFaq, setOpenFaq]     = useState(null);

  /* filter FAQs */
  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();
    return FAQS.filter((faq) => {
      const matchCat = activeCategory === "all" || faq.category === activeCategory;
      const matchSearch =
        !q ||
        faq.q.toLowerCase().includes(q) ||
        faq.a.toLowerCase().includes(q);
      return matchCat && matchSearch;
    });
  }, [search, activeCategory]);

  function handleCategoryClick(id) {
    setActiveCategory(id);
    setOpenFaq(null);
    setSearch("");
  }

  function handlePopularClick(item) {
    setActiveCategory(item.cat);
    setSearch(item.label);
    setOpenFaq(null);
  }

  return (
    <div className="hc-page">
      <AuroraBackground />

      {/* ═══════ HERO ═══════ */}
      <section className="hc-hero">
        <div className="hc-hero-inner">
          <div className="hc-hero-badge">
            <HelpCircle size={16} />
            Help Center
          </div>

          <h1 className="hc-hero-title">
            How can we <span>help you?</span>
          </h1>

          <p className="hc-hero-sub">
            Search our knowledge base or browse by topic below.
          </p>

          {/* search bar */}
          <div className="hc-search-wrap">
            <Search size={20} className="hc-search-icon" />
            <input
              className="hc-search-input"
              type="text"
              placeholder="Search articles, questions…"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setActiveCategory("all");
                setOpenFaq(null);
              }}
              aria-label="Search help articles"
            />
            {search && (
              <button
                className="hc-search-clear"
                onClick={() => setSearch("")}
                aria-label="Clear search"
              >
                ×
              </button>
            )}
          </div>

          {/* popular articles */}
          <div className="hc-popular">
            <span className="hc-popular-label">Popular:</span>
            {POPULAR.map((item) => (
              <button
                key={item.label}
                className="hc-popular-tag"
                onClick={() => handlePopularClick(item)}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ CATEGORY GRID ═══════ */}
      <section className="hc-categories">
        <div className="hc-categories-inner">
          <div className="hc-section-label">Browse by topic</div>
          <h2 className="hc-section-title">What do you need help with?</h2>

          <div className="hc-cat-grid">
            {/* "All Topics" card */}
            <button
              className={`hc-cat-card${activeCategory === "all" ? " hc-cat-card--active" : ""}`}
              onClick={() => handleCategoryClick("all")}
            >
              <div className="hc-cat-icon" style={{ background: "rgba(37,99,235,.12)", color: "#2563eb" }}>
                <Sparkles size={24} />
              </div>
              <span>All Topics</span>
              <small>{FAQS.length} articles</small>
            </button>

            {CATEGORIES.map(({ id, label, icon: Icon, color }) => {
              const count = FAQS.filter((f) => f.category === id).length;
              return (
                <button
                  key={id}
                  className={`hc-cat-card${activeCategory === id ? " hc-cat-card--active" : ""}`}
                  onClick={() => handleCategoryClick(id)}
                >
                  <div
                    className="hc-cat-icon"
                    style={{
                      background: `${color}18`,
                      color,
                    }}
                  >
                    <Icon size={24} />
                  </div>
                  <span>{label}</span>
                  <small>{count} article{count !== 1 ? "s" : ""}</small>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══════ FAQ SECTION ═══════ */}
      <section className="hc-faq-section">
        <div className="hc-faq-inner">
          <div className="hc-faq-header">
            <h2 className="hc-section-title">
              {activeCategory === "all"
                ? "All Articles"
                : CATEGORIES.find((c) => c.id === activeCategory)?.label || "Articles"}
            </h2>
            <span className="hc-faq-count">
              {filtered.length} result{filtered.length !== 1 ? "s" : ""}
            </span>
          </div>

          {filtered.length === 0 ? (
            <div className="hc-no-results">
              <HelpCircle size={48} />
              <h3>No articles found</h3>
              <p>
                Try a different search term, or{" "}
                <button onClick={() => { setSearch(""); setActiveCategory("all"); }}>
                  browse all topics
                </button>.
              </p>
            </div>
          ) : (
            <div className="hc-accordion">
              {filtered.map((faq, i) => (
                <AccordionItem
                  key={i}
                  q={faq.q}
                  a={faq.a}
                  open={openFaq === i}
                  onToggle={() => setOpenFaq(openFaq === i ? null : i)}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ═══════ QUICK LINKS ═══════ */}
      <section className="hc-quick-links">
        <div className="hc-quick-links-inner">
          <div className="hc-section-label">Helpful links</div>
          <h2 className="hc-section-title">Jump right in</h2>

          <div className="hc-quick-grid">
            {[
              { icon: BookOpen,   label: "Start Reading Practice",  path: "/reading",   color: "#0891b2" },
              { icon: Headphones, label: "Start Listening Practice", path: "/listening", color: "#7c3aed" },
              { icon: PenLine,    label: "Start Writing Practice",   path: "/writing",   color: "#059669" },
              { icon: Mic,        label: "Start Speaking Practice",  path: "/speaking",  color: "#dc2626" },
              { icon: Brain,      label: "Open AI Studio",           path: "/ai-center", color: "#d97706" },
              { icon: CreditCard, label: "View Pricing Plans",       path: "/pricing",   color: "#16a34a" },
            ].map(({ icon: Icon, label, path, color }) => (
              <Link key={path} to={path} className="hc-quick-card">
                <div className="hc-quick-icon" style={{ background: `${color}18`, color }}>
                  <Icon size={22} />
                </div>
                <span>{label}</span>
                <ArrowRight size={16} className="hc-quick-arrow" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ CONTACT ═══════ */}
      <section className="hc-contact">
        <div className="hc-contact-inner">
          <div className="hc-section-label">Still need help?</div>
          <h2 className="hc-section-title">Contact Support</h2>
          <p className="hc-contact-sub">
            Can't find what you're looking for? Our support team is here to help.
          </p>

          <div className="hc-contact-grid">
            <a href="mailto:support@knarrow.in" className="hc-contact-card">
              <div className="hc-contact-icon">
                <Mail size={28} />
              </div>
              <h3>Email Support</h3>
              <p>support@knarrow.in</p>
              <span className="hc-contact-badge">Usually replies within 24h</span>
            </a>

            <Link to="/community" className="hc-contact-card">
              <div className="hc-contact-icon hc-contact-icon--purple">
                <MessageCircle size={28} />
              </div>
              <h3>Community Forum</h3>
              <p>Ask the Knarrow community</p>
              <span className="hc-contact-badge hc-contact-badge--purple">Get peer help instantly</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════ FOOTER ═══════ */}
      <footer className="hc-footer">
        <p>© {new Date().getFullYear()} Knarrow. All rights reserved.</p>
        <div>
          <Link to="/privacy">Privacy Policy</Link>
          <Link to="/terms">Terms of Service</Link>
          <Link to="/pricing">Pricing</Link>
        </div>
      </footer>
    </div>
  );
}
