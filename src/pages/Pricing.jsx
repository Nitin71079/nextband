import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles, CheckCircle2, Zap, ShieldCheck, Award, Layers,
  Lock, ArrowRight, HelpCircle, RefreshCw, Star, Check, X, Crown, Clock,
  BookOpen, Calculator, Atom, Stethoscope, Scale, Cpu, Globe, Target, Mic, Headphones, BarChart3, Search, Info
} from "lucide-react";
import { getActiveUserPlan, activateUserPlan } from "../utils/planAccess";
import { startRazorpayCheckout } from "../services/billingService";
import FloatingDanglerPill from "../components/FloatingDanglerPill";

/* ─────────────────────────────────────────────
   DIFFERENTIATED EXAM PRICING (BASED ON EXAM FEE & MARKET DEMAND)
───────────────────────────────────────────── */

const INDIVIDUAL_EXAMS = [
  /* 💼 GMAT Focus - Premium Global MBA */
  {
    id: "GMAT",
    name: "GMAT Focus Edition",
    icon: "💼",
    badge: "PREMIUM MBA TRACK",
    examFee: "Official Exam Fee: ~$300 USD (~₹25,000)",
    color: "#059669",
    bgGradient: "linear-gradient(135deg, rgba(5,150,105,0.18), rgba(16,185,129,0.18))",
    borderColor: "#059669",
    tagline: "Quant, Verbal & Data Insights (205–805)",
    features: [
      "100 GMAT Focus Full Simulation Mocks",
      "Data Insights Section (DS, MSR, Graphs)",
      "Bookmark & Edit 3 Answers per Section",
      "Official 205–805 Score Scale IRT Engine",
      "Question Difficulty Adaptive Curve"
    ],
    pricing: {
      weekly:   { priceUSD: "$9",  priceINR: "₹699" },
      monthly:  { priceUSD: "$29", priceINR: "₹1,999" },
      yearly:   { priceUSD: "$99", priceINR: "₹6,999" },
      lifetime: { priceUSD: "$179", priceINR: "₹12,999" }
    }
  },

  /* 🏛️ GRE - Global Grad Admissions */
  {
    id: "GRE",
    name: "GRE General Test",
    icon: "🏛️",
    badge: "GLOBAL GRAD TRACK",
    examFee: "Official Exam Fee: ~$220 USD (~₹18,500)",
    color: "#7c3aed",
    bgGradient: "linear-gradient(135deg, rgba(124,58,237,0.18), rgba(168,85,247,0.18))",
    borderColor: "#7c3aed",
    tagline: "Shorter 2-Hour GRE Format (260–340)",
    features: [
      "100 Shorter GRE Full Simulation Mocks",
      "Verbal & Quant Section Adaptive Engine",
      "AI Analytical Writing Issue Essay Grader",
      "On-Screen 4-Function Calculator",
      "GRE High-Frequency Vocab Flashcards"
    ],
    pricing: {
      weekly:   { priceUSD: "$8",  priceINR: "₹599" },
      monthly:  { priceUSD: "$24", priceINR: "₹1,699" },
      yearly:   { priceUSD: "$89", priceINR: "₹5,999" },
      lifetime: { priceUSD: "$149", priceINR: "₹10,999" }
    }
  },

  /* 📘 Digital SAT - US College Admissions */
  {
    id: "SAT",
    name: "Digital SAT 1600",
    icon: "📘",
    badge: "DESMOS EMBEDDED",
    examFee: "Official Exam Fee: ~$110 USD (~₹9,200)",
    color: "#0284c7",
    bgGradient: "linear-gradient(135deg, rgba(2,132,199,0.18), rgba(56,189,248,0.18))",
    borderColor: "#0284c7",
    tagline: "2026 Digital SAT Reading, Writing & Math",
    features: [
      "100 Digital SAT Full Mocks",
      "Multistage Adaptive Module 1 & 2 Engine",
      "Embedded Desmos Graphing Calculator",
      "400–1600 IRT Score Calculation",
      "SAT Passage Annotation & Highlight Tools"
    ],
    pricing: {
      weekly:   { priceUSD: "$7",  priceINR: "₹549" },
      monthly:  { priceUSD: "$21", priceINR: "₹1,499" },
      yearly:   { priceUSD: "$79", priceINR: "₹4,999" },
      lifetime: { priceUSD: "$139", priceINR: "₹9,999" }
    }
  },

  /* 🎓 IELTS - International Study / Immigration */
  {
    id: "IELTS",
    name: "IELTS Academic & GT",
    icon: "🎓",
    badge: "HIGH GLOBAL DEMAND",
    examFee: "Official Exam Fee: ~$205 USD (~₹17,000)",
    color: "#2563eb",
    bgGradient: "linear-gradient(135deg, rgba(37,99,235,0.18), rgba(124,58,237,0.18))",
    borderColor: "#2563eb",
    tagline: "Academic & General Training Band 0–9",
    features: [
      "100 Full IELTS CBT Simulation Mocks",
      "AI Essay Evaluator for Task 1 & Task 2",
      "AI Speaking Simulator (Parts 1, 2, & 3)",
      "Strict Exam Audio & Playback Controls",
      "Groq AI Llama 3.3 Diagnostic Report"
    ],
    pricing: {
      weekly:   { priceUSD: "$6.5", priceINR: "₹499" },
      monthly:  { priceUSD: "$18",   priceINR: "₹1,299" },
      yearly:   { priceUSD: "$65",   priceINR: "₹4,499" },
      lifetime: { priceUSD: "$129",  priceINR: "₹8,999" }
    }
  },

  /* 🗣️ TOEFL iBT - US/Global Study */
  {
    id: "TOEFL",
    name: "TOEFL iBT 2026",
    icon: "🗣️",
    badge: "STREAMLINED FORMAT",
    examFee: "Official Exam Fee: ~$200 USD (~₹16,900)",
    color: "#0891b2",
    bgGradient: "linear-gradient(135deg, rgba(8,145,178,0.18), rgba(6,182,212,0.18))",
    borderColor: "#0891b2",
    tagline: "Streamlined 2-Hour TOEFL iBT",
    features: [
      "100 TOEFL iBT Full Mocks",
      "Writing for Academic Discussion AI Grader",
      "0–120 Scale Score Converter",
      "AI Speech Recognition Evaluation",
      "MyBest Scores Performance Tracker"
    ],
    pricing: {
      weekly:   { priceUSD: "$6.5", priceINR: "₹499" },
      monthly:  { priceUSD: "$18",   priceINR: "₹1,299" },
      yearly:   { priceUSD: "$65",   priceINR: "₹4,499" },
      lifetime: { priceUSD: "$129",  priceINR: "₹8,999" }
    }
  },

  /* 🎯 ACT - US College Prep */
  {
    id: "ACT",
    name: "ACT College Prep",
    icon: "🎯",
    badge: "1–36 COMPOSITE",
    examFee: "Official Exam Fee: ~$180 USD (~₹15,000)",
    color: "#e11d48",
    bgGradient: "linear-gradient(135deg, rgba(225,29,72,0.18), rgba(244,63,94,0.18))",
    borderColor: "#e11d48",
    tagline: "English, Math, Reading & Science",
    features: [
      "100 ACT Computer Simulation Mocks",
      "Science Reasoning Data Interpretation",
      "English 45-Second Speed Pacing Drill",
      "Online ACT Math Formula Sheet Drawer",
      "1–36 Composite Score Calculator"
    ],
    pricing: {
      weekly:   { priceUSD: "$6.5", priceINR: "₹499" },
      monthly:  { priceUSD: "$19.5", priceINR: "₹1,399" },
      yearly:   { priceUSD: "$69",   priceINR: "₹4,799" },
      lifetime: { priceUSD: "$135",  priceINR: "₹9,499" }
    }
  },

  /* 🔤 PTE Academic - Australia/UK Study & Visa */
  {
    id: "PTE",
    name: "PTE Academic",
    icon: "🔤",
    badge: "PEARSON AI MATCH",
    examFee: "Official Exam Fee: ~$205 USD (~₹17,000)",
    color: "#b45309",
    bgGradient: "linear-gradient(135deg, rgba(180,83,9,0.18), rgba(217,119,6,0.18))",
    borderColor: "#b45309",
    tagline: "Read Aloud, Repeat Sentence & 10–90 Scale",
    features: [
      "100 PTE Academic Full Mocks",
      "Oral Fluency & Pronunciation AI Engine",
      "Describe Image & Retell Lecture Drills",
      "Summarize Written Text AI Feedback",
      "10–90 Score Scale & Enabling Skills"
    ],
    pricing: {
      weekly:   { priceUSD: "$6",  priceINR: "₹449" },
      monthly:  { priceUSD: "$16.5", priceINR: "₹1,199" },
      yearly:   { priceUSD: "$59", priceINR: "₹3,999" },
      lifetime: { priceUSD: "$119", priceINR: "₹7,999" }
    }
  },

  /* 🐆 CAT - Top Indian B-Schools */
  {
    id: "CAT",
    name: "IIM CAT Entrance",
    icon: "🐆",
    badge: "TOP INDIAN B-SCHOOLS",
    examFee: "Official Exam Fee: ~₹2,500 INR",
    color: "#dc2626",
    bgGradient: "linear-gradient(135deg, rgba(220,38,38,0.18), rgba(239,68,68,0.18))",
    borderColor: "#dc2626",
    tagline: "VARC, DILR & QA (Percentile Engine)",
    features: [
      "100 CAT Full Simulation Mocks",
      "40-Minute Strict Sectional Timers",
      "TITA Non-MCQ Type-In Answer Drills",
      "Complex DILR Caselet Set Solvers",
      "CAT Percentile Estimator Engine"
    ],
    pricing: {
      weekly:   { priceUSD: "$5",  priceINR: "₹399" },
      monthly:  { priceUSD: "$14", priceINR: "₹999" },
      yearly:   { priceUSD: "$49", priceINR: "₹3,499" },
      lifetime: { priceUSD: "$99", priceINR: "₹6,999" }
    }
  },

  /* ⚖️ CLAT - NLU Law Entrance */
  {
    id: "CLAT",
    name: "CLAT Law NLUs",
    icon: "⚖️",
    badge: "NATIONAL LAW ENTRANCE",
    examFee: "Official Exam Fee: ~₹4,000 INR",
    color: "#9333ea",
    bgGradient: "linear-gradient(135deg, rgba(147,51,234,0.18), rgba(168,85,247,0.18))",
    borderColor: "#9333ea",
    tagline: "Legal Reasoning, Logic, GK & English",
    features: [
      "100 CLAT Full Passages & Mocks",
      "Passage-Based Legal Reasoning Solvers",
      "120 Questions / 120 Mins Speed Engine",
      "Current Affairs & Landmark Judgments DB",
      "NLU Cutoff & Rank Estimator"
    ],
    pricing: {
      weekly:   { priceUSD: "$4.5", priceINR: "₹349" },
      monthly:  { priceUSD: "$12.5", priceINR: "₹899" },
      yearly:   { priceUSD: "$42",  priceINR: "₹2,999" },
      lifetime: { priceUSD: "$85",  priceINR: "₹5,999" }
    }
  },

  /* ⚛️ JEE - Engineering Admissions */
  {
    id: "JEE",
    name: "JEE Main & Advanced",
    icon: "⚛️",
    badge: "IIT & NIT ENTRANCE",
    examFee: "Official Exam Fee: ~₹1,000 INR",
    color: "#d97706",
    bgGradient: "linear-gradient(135deg, rgba(217,119,6,0.18), rgba(245,158,11,0.18))",
    borderColor: "#d97706",
    tagline: "Physics, Chemistry & Math (300 Marks)",
    features: [
      "100 JEE Main & Advanced Full Mocks",
      "NTA +4 / -1 Marking Scheme Simulation",
      "Section B Numerical Value Input Drills",
      "Physics & Chemistry High-Yield Formulae",
      "AI Error Diagnostic & Weak Topic Analysis"
    ],
    pricing: {
      weekly:   { priceUSD: "$4",  priceINR: "₹299" },
      monthly:  { priceUSD: "$11", priceINR: "₹799" },
      yearly:   { priceUSD: "$38", priceINR: "₹2,699" },
      lifetime: { priceUSD: "$79", priceINR: "₹5,499" }
    }
  },

  /* 🩺 NEET UG - Medical Admissions */
  {
    id: "NEET",
    name: "NEET UG Medical",
    icon: "🩺",
    badge: "MEDICAL 720 TARGET",
    examFee: "Official Exam Fee: ~₹1,700 INR",
    color: "#16a34a",
    bgGradient: "linear-gradient(135deg, rgba(22,163,74,0.18), rgba(34,197,94,0.18))",
    borderColor: "#16a34a",
    tagline: "Botany, Zoology, Physics & Chemistry",
    features: [
      "100 NEET UG Full Mocks (720 Target)",
      "NCERT Line-by-Line High Yield Quizzes",
      "Section A & B (Optional Qs) Simulation",
      "OMR Bubble Speed & Accuracy Tracker",
      "NEET Rank & College Cutoff Predictor"
    ],
    pricing: {
      weekly:   { priceUSD: "$4",  priceINR: "₹299" },
      monthly:  { priceUSD: "$11", priceINR: "₹799" },
      yearly:   { priceUSD: "$38", priceINR: "₹2,699" },
      lifetime: { priceUSD: "$79", priceINR: "₹5,499" }
    }
  },

  /* ⚙️ GATE - PSU & M.Tech */
  {
    id: "GATE",
    name: "GATE Engineering",
    icon: "⚙️",
    badge: "PSU & M.TECH",
    examFee: "Official Exam Fee: ~₹1,800 INR",
    color: "#475569",
    bgGradient: "linear-gradient(135deg, rgba(71,85,105,0.18), rgba(100,116,139,0.18))",
    borderColor: "#475569",
    tagline: "Technical Core, MSQs, NAT & Virtual Calc",
    features: [
      "100 GATE Full Simulation Mocks",
      "TCS iON Official Virtual Calculator",
      "MSQs (Multiple Select) Zero Partial Marking",
      "NAT (Numerical Answer Type) Tolerance",
      "Engineering Math & Aptitude Mocks"
    ],
    pricing: {
      weekly:   { priceUSD: "$3.5", priceINR: "₹249" },
      monthly:  { priceUSD: "$9.5", priceINR: "₹699" },
      yearly:   { priceUSD: "$32",  priceINR: "₹2,299" },
      lifetime: { priceUSD: "$69",  priceINR: "₹4,999" }
    }
  },

  /* 🦉 DET - Duolingo Fast Test */
  {
    id: "DET",
    name: "Duolingo English Test",
    icon: "🦉",
    badge: "FAST BUDGET TEST",
    examFee: "Official Exam Fee: $65 USD (~₹5,400)",
    color: "#65a30d",
    bgGradient: "linear-gradient(135deg, rgba(101,163,13,0.18), rgba(132,204,22,0.18))",
    borderColor: "#65a30d",
    tagline: "Adaptive Questions, Literacy & Production",
    features: [
      "100 DET Full Adaptive Simulation Mocks",
      "Interactive Reading Fill-in-the-Blanks",
      "Picture Description & Production Grader",
      "10–160 Subscore Breakdown Engine",
      "Security & Camera Rule Simulation"
    ],
    pricing: {
      weekly:   { priceUSD: "$3",   priceINR: "₹219" },
      monthly:  { priceUSD: "$8.5", priceINR: "₹599" },
      yearly:   { priceUSD: "$26",  priceINR: "₹1,899" },
      lifetime: { priceUSD: "$55",  priceINR: "₹3,999" }
    }
  }
];

const ALL_ACCESS_PRICING = {
  weekly:   { priceUSD: "$15",  priceINR: "₹999",   period: "per week", badge: "QUICK SPRINT", discount: null },
  monthly:  { priceUSD: "$35",  priceINR: "₹2,499",  period: "per month", badge: "BEST SELLER — 13 EXAMS UNLIMITED", discount: "SAVE 75%" },
  yearly:   { priceUSD: "$109", priceINR: "₹7,999",  period: "per year", badge: "MAX SAVINGS", discount: "SAVE 80%" },
  lifetime: { priceUSD: "$199", priceINR: "₹14,999", period: "one-time payment", badge: "LIFETIME VIP FOREVER", discount: "PAY ONCE FOREVER" }
};

export default function Pricing() {
  const navigate = useNavigate();

  // Active Plan State
  const [currentPlan, setCurrentPlan]     = useState(getActiveUserPlan());
  const [viewMode, setViewMode]           = useState("individual_grid"); // "individual_grid" | "featured_compare" | "matrix"
  const [billingCycle, setBillingCycle]   = useState("monthly"); // "weekly" | "monthly" | "yearly" | "lifetime"
  const [selectedTrack, setSelectedTrack] = useState("GMAT");
  const [searchQuery, setSearchQuery]     = useState("");
  const [successModal, setSuccessModal]   = useState(null);

  useEffect(() => {
    const handlePlanChange = () => {
      setCurrentPlan(getActiveUserPlan());
    };
    window.addEventListener("knarrow_plan_changed", handlePlanChange);
    return () => window.removeEventListener("knarrow_plan_changed", handlePlanChange);
  }, []);

  const handleActivateSingleTrack = (trackId) => {
    const examObj = INDIVIDUAL_EXAMS.find((e) => e.id === trackId) || INDIVIDUAL_EXAMS[0];
    const priceINR = examObj.pricing[billingCycle].priceINR;

    startRazorpayCheckout({
      planName: `Knarrow ${examObj.name} Pass`,
      amountINR: priceINR,
      packType: "single_track",
      trackId,
      duration: billingCycle,
      onSuccessCallback: (payload) => {
        setSuccessModal(payload);
      }
    });
  };

  const handleActivateAllAccess = () => {
    const payload = activateUserPlan(`all_access_${billingCycle}`, "all_access", null, billingCycle);
    setSuccessModal(payload);
  };

  // Filter individual exams by search query
  const filteredExams = INDIVIDUAL_EXAMS.filter((exam) =>
    !searchQuery ||
    exam.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    exam.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    exam.tagline.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const selectedExamObj = INDIVIDUAL_EXAMS.find((e) => e.id === selectedTrack) || INDIVIDUAL_EXAMS[0];

  return (
    <div style={{ minHeight: "100vh", background: "radial-gradient(circle at 50% 0%, #0369a1 0%, #0f172a 70%)", color: "#ffffff", fontFamily: "Inter, sans-serif", padding: "40px 24px 80px" }}>
      <div style={{ maxWidth: "1280px", margin: "0 auto" }}>

        {/* ── HERO BANNER ── */}
        <div style={{ textAlign: "center", marginBottom: 48, position: "relative" }}>
          
          <span style={{ background: "rgba(56,189,248,0.2)", color: "#38bdf8", border: "1px solid rgba(56,189,248,0.3)", padding: "6px 20px", borderRadius: 999, fontSize: 13, fontWeight: 900, letterSpacing: 0.5, display: "inline-flex", alignItems: "center", gap: 8, marginBottom: 20 }}>
            <Sparkles size={15} /> INDIVIDUAL EXAM PLANS TIERED BY MARKET DEMAND
          </span>

          <h1 style={{ fontSize: "clamp(2.4rem, 5vw, 3.8rem)", fontWeight: 900, margin: "0 0 16px", letterSpacing: "-1px" }}>
            Invest in Your Specific Target Exam
          </h1>
          <p style={{ color: "#cbd5e1", fontSize: "1.15rem", maxWidth: 780, margin: "0 auto 28px", lineHeight: 1.6 }}>
            Each individual exam plan is uniquely priced based on its real-world exam registration fees, candidate demand, and prep market standards. Get a targeted pass or unlock <strong>All 13 Global Exam Tracks</strong> for ultimate savings!
          </p>

          {/* Clean Non-Overlapping Floating Glass Danglers Bar */}
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 20, flexWrap: "wrap", margin: "0 auto 32px" }}>
            <FloatingDanglerPill
              icon={Crown}
              value="Differentiated Pricing"
              label="Adjusted for Exam Fees & Demand"
              variant="light"
              iconBg="rgba(250, 204, 21, 0.15)"
              iconColor="#facc15"
              floatDelay={0}
            />

            <FloatingDanglerPill
              icon={ShieldCheck}
              value="7-Day Guarantee"
              label="Money-Back Promise"
              variant="light"
              iconBg="rgba(56, 189, 248, 0.15)"
              iconColor="#38bdf8"
              floatDelay={1.5}
            />
          </div>

          {/* ── VIEW MODE SWITCHER (GRID VS FEATURED COMPARISON) ── */}
          <div style={{ display: "inline-flex", background: "rgba(15,23,42,0.85)", border: "1px solid rgba(255,255,255,0.15)", borderRadius: 20, padding: 6, marginBottom: 28, backdropFilter: "blur(12px)", flexWrap: "wrap", justifyContent: "center", gap: 6 }}>
            <button
              onClick={() => setViewMode("individual_grid")}
              style={{
                background: viewMode === "individual_grid" ? "linear-gradient(135deg, #0284c7, #7c3aed)" : "transparent",
                color: "#ffffff",
                border: "none",
                borderRadius: 14,
                padding: "12px 24px",
                fontWeight: 900,
                fontSize: 14,
                cursor: "pointer",
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                boxShadow: viewMode === "individual_grid" ? "0 6px 20px rgba(2,132,199,0.4)" : "none"
              }}
            >
              <Layers size={18} /> Individual Exam Plans (13 Exams)
            </button>
            <button
              onClick={() => setViewMode("featured_compare")}
              style={{
                background: viewMode === "featured_compare" ? "linear-gradient(135deg, #0284c7, #7c3aed)" : "transparent",
                color: "#ffffff",
                border: "none",
                borderRadius: 14,
                padding: "12px 24px",
                fontWeight: 900,
                fontSize: 14,
                cursor: "pointer",
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                boxShadow: viewMode === "featured_compare" ? "0 6px 20px rgba(2,132,199,0.4)" : "none"
              }}
            >
              <Crown size={18} color="#facc15" /> Single Exam vs All-Access VIP
            </button>
            <button
              onClick={() => setViewMode("matrix")}
              style={{
                background: viewMode === "matrix" ? "linear-gradient(135deg, #0284c7, #7c3aed)" : "transparent",
                color: "#ffffff",
                border: "none",
                borderRadius: 14,
                padding: "12px 24px",
                fontWeight: 900,
                fontSize: 14,
                cursor: "pointer",
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                boxShadow: viewMode === "matrix" ? "0 6px 20px rgba(2,132,199,0.4)" : "none"
              }}
            >
              <BarChart3 size={18} /> Feature Matrix Table
            </button>
          </div>

          {/* ── BILLING DURATION TOGGLE ── */}
          <div style={{ display: "flex", justifyContent: "center", gap: 10, flexWrap: "wrap", marginBottom: 20 }}>
            {[
              { id: "weekly", label: "Weekly Sprint" },
              { id: "monthly", label: "Monthly Pass (Recommended)" },
              { id: "yearly", label: "Yearly Pass (Save 60%+)" },
              { id: "lifetime", label: "Lifetime Pass (VIP Forever)" },
            ].map((cycle) => {
              const isActive = billingCycle === cycle.id;
              return (
                <button
                  key={cycle.id}
                  onClick={() => setBillingCycle(cycle.id)}
                  style={{
                    background: isActive ? "rgba(56,189,248,0.25)" : "rgba(255,255,255,0.06)",
                    color: isActive ? "#38bdf8" : "#cbd5e1",
                    border: isActive ? "2px solid #38bdf8" : "1px solid rgba(255,255,255,0.1)",
                    borderRadius: 14,
                    padding: "10px 20px",
                    fontWeight: 800,
                    fontSize: 13,
                    cursor: "pointer",
                    transition: "all 0.2s"
                  }}
                >
                  {cycle.label}
                </button>
              );
            })}
          </div>

        </div>

        {/* ═════════════════════════════════════════════════════════
            MODE 1: INDIVIDUAL EXAM PLANS GRID (ALL 13 EXAMS)
        ═════════════════════════════════════════════════════════ */}
        {viewMode === "individual_grid" && (
          <div>
            {/* Search Filter for Individual Exams */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 16, flexWrap: "wrap", marginBottom: 28, background: "rgba(15,23,42,0.6)", padding: "16px 24px", borderRadius: 20, border: "1px solid rgba(255,255,255,0.1)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, flex: 1, minWidth: 260 }}>
                <Search size={18} color="#38bdf8" />
                <input
                  type="text"
                  placeholder="Filter by exam (e.g. GMAT, GRE, SAT, IELTS, NEET, JEE, CAT, DET)..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={{ width: "100%", background: "transparent", border: "none", color: "#ffffff", fontSize: 14, outline: "none", fontWeight: 600 }}
                />
              </div>

              {/* All-Access VIP Dangler Promo */}
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <span style={{ fontSize: 13, color: "#cbd5e1", fontWeight: 700 }}>Want all 13 exams together?</span>
                <button
                  onClick={handleActivateAllAccess}
                  style={{ background: "linear-gradient(135deg, #eab308, #ca8a04)", color: "#000000", border: "none", borderRadius: 12, padding: "8px 18px", fontWeight: 900, fontSize: 13, cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 6, boxShadow: "0 4px 15px rgba(234,179,8,0.4)" }}
                >
                  <Crown size={15} /> All-Access Pass ({ALL_ACCESS_PRICING[billingCycle].priceINR}) →
                </button>
              </div>
            </div>

            {/* Individual Exam Cards Grid */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: 24, marginBottom: 56 }}>
              {filteredExams.map((exam) => {
                const isUnlocked = currentPlan.type === "ALL_ACCESS" || currentPlan.unlockedTracks?.includes(exam.id);
                const priceInfo = exam.pricing[billingCycle];

                return (
                  <div
                    key={exam.id}
                    style={{
                      background: "rgba(15, 23, 42, 0.85)",
                      border: isUnlocked ? "2px solid #22c55e" : `1.5px solid ${exam.borderColor}`,
                      borderRadius: 24,
                      padding: 28,
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                      position: "relative",
                      backdropFilter: "blur(16px)",
                      boxShadow: `0 12px 35px ${exam.color}25`,
                      transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)"
                    }}
                  >
                    {/* Badge & Exam Fee Note */}
                    <div>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                        <span style={{ background: `${exam.color}25`, color: exam.color, border: `1px solid ${exam.color}40`, padding: "4px 12px", borderRadius: 999, fontSize: 11, fontWeight: 900, letterSpacing: 0.5 }}>
                          {exam.badge}
                        </span>
                        {isUnlocked && (
                          <span style={{ background: "rgba(34,197,94,0.2)", color: "#22c55e", padding: "4px 12px", borderRadius: 999, fontSize: 11, fontWeight: 900, display: "inline-flex", alignItems: "center", gap: 4 }}>
                            <CheckCircle2 size={12} /> ACTIVE PLAN
                          </span>
                        )}
                      </div>

                      {/* Official Exam Fee Indicator */}
                      <div style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 11, color: "#94a3b8", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", padding: "3px 10px", borderRadius: 8, marginBottom: 16, fontWeight: 600 }}>
                        <Info size={12} color="#38bdf8" />
                        <span>{exam.examFee}</span>
                      </div>

                      {/* Exam Icon & Title */}
                      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
                        <span style={{ fontSize: 32 }}>{exam.icon}</span>
                        <div>
                          <h3 style={{ fontSize: 22, fontWeight: 900, color: "#ffffff", margin: 0 }}>{exam.name}</h3>
                          <span style={{ fontSize: 12, color: "#94a3b8", fontWeight: 600 }}>{exam.tagline}</span>
                        </div>
                      </div>

                      {/* Pricing Block */}
                      <div style={{ display: "flex", alignItems: "baseline", gap: 8, margin: "20px 0 16px" }}>
                        <span style={{ fontSize: 36, fontWeight: 900, color: "#ffffff" }}>{priceInfo.priceINR}</span>
                        <span style={{ fontSize: 16, color: "#94a3b8" }}>({priceInfo.priceUSD})</span>
                        <span style={{ fontSize: 13, color: "#cbd5e1" }}>/ {billingCycle}</span>
                      </div>

                      {/* Feature List */}
                      <ul style={{ listStyle: "none", padding: 0, margin: "0 0 24px 0", display: "flex", flexDirection: "column", gap: 10, fontSize: 13, color: "#cbd5e1" }}>
                        {exam.features.map((feat, i) => (
                          <li key={i} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                            <CheckCircle2 size={15} color={exam.color} style={{ flexShrink: 0 }} />
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Action CTA */}
                    <button
                      onClick={() => handleActivateSingleTrack(exam.id)}
                      style={{
                        width: "100%",
                        background: isUnlocked ? "rgba(34,197,94,0.2)" : exam.bgGradient,
                        color: isUnlocked ? "#22c55e" : "#ffffff",
                        border: isUnlocked ? "1px solid #22c55e" : `1.5px solid ${exam.borderColor}`,
                        borderRadius: 14,
                        padding: 14,
                        fontWeight: 900,
                        fontSize: 14,
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: 8,
                        boxShadow: `0 6px 20px ${exam.color}30`
                      }}
                    >
                      {isUnlocked ? (
                        <>
                          <CheckCircle2 size={16} /> Plan Active — Launch {exam.id} Engine →
                        </>
                      ) : (
                        <>
                          Activate {exam.id} Pass ({priceInfo.priceINR}) →
                        </>
                      )}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ═════════════════════════════════════════════════════════
            MODE 2: SINGLE EXAM VS ALL-ACCESS VIP COMPARISON
        ═════════════════════════════════════════════════════════ */}
        {viewMode === "featured_compare" && (
          <div>
            {/* Single Track Selector dropdown */}
            <div style={{ textAlign: "center", marginBottom: 32 }}>
              <label style={{ fontSize: 14, color: "#38bdf8", fontWeight: 800, marginRight: 12 }}>
                Select Your Primary Target Exam:
              </label>
              <select
                value={selectedTrack}
                onChange={(e) => setSelectedTrack(e.target.value)}
                style={{ background: "#0f172a", color: "#ffffff", border: "2px solid #38bdf8", borderRadius: 14, padding: "10px 20px", fontSize: 15, fontWeight: 900, outline: "none", cursor: "pointer" }}
              >
                {INDIVIDUAL_EXAMS.map((t) => (
                  <option key={t.id} value={t.id}>{t.icon} {t.name} ({t.pricing[billingCycle].priceINR})</option>
                ))}
              </select>
            </div>

            {/* Side-by-Side Comparison Cards */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))", gap: 28, marginBottom: 56 }}>
              
              {/* SINGLE EXAM PASS CARD */}
              <div style={{ background: "rgba(15,23,42,0.85)", border: `2px solid ${selectedExamObj.borderColor}`, borderRadius: 28, padding: 36, display: "flex", flexDirection: "column", justifyContent: "space-between", boxShadow: `0 16px 40px ${selectedExamObj.color}20` }}>
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                    <span style={{ background: `${selectedExamObj.color}25`, color: selectedExamObj.color, border: `1px solid ${selectedExamObj.color}40`, padding: "4px 14px", borderRadius: 999, fontSize: 11, fontWeight: 900 }}>
                      SINGLE EXAM TARGET PASS
                    </span>
                    <span style={{ fontSize: 11, color: "#94a3b8" }}>{selectedExamObj.examFee}</span>
                  </div>

                  <h3 style={{ fontSize: 28, fontWeight: 900, color: "#ffffff", margin: "16px 0 8px 0" }}>
                    {selectedExamObj.icon} {selectedExamObj.name} Pass
                  </h3>

                  <div style={{ display: "flex", alignItems: "baseline", gap: 10 }}>
                    <div style={{ fontSize: 44, fontWeight: 900, color: "#ffffff" }}>
                      {selectedExamObj.pricing[billingCycle].priceINR}
                    </div>
                    <div style={{ fontSize: 18, color: "#94a3b8" }}>({selectedExamObj.pricing[billingCycle].priceUSD})</div>
                    <div style={{ fontSize: 14, color: "#cbd5e1" }}>/ {billingCycle}</div>
                  </div>

                  <p style={{ color: "#cbd5e1", fontSize: 14, margin: "12px 0 24px 0", lineHeight: 1.6 }}>
                    Full 100% access dedicated exclusively to <strong>{selectedExamObj.name}</strong> prep engine &amp; AI tools.
                  </p>

                  <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 12, fontSize: 14, color: "#ffffff" }}>
                    <li style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <CheckCircle2 size={16} color={selectedExamObj.color} />
                      <span><strong>100 Full {selectedExamObj.id} Mocks Unlocked</strong></span>
                    </li>
                    <li style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <CheckCircle2 size={16} color={selectedExamObj.color} />
                      <span><strong>Groq AI Llama 3.3</strong> Instant Diagnostic &amp; 7-Day Plan</span>
                    </li>
                    <li style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <CheckCircle2 size={16} color={selectedExamObj.color} />
                      <span><strong>All 9 Multiplayer Arcade Games Unlocked</strong></span>
                    </li>
                    <li style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <CheckCircle2 size={16} color={selectedExamObj.color} />
                      <span><strong>{selectedExamObj.features[1]}</strong></span>
                    </li>
                    <li style={{ display: "flex", alignItems: "center", gap: 10, opacity: 0.5 }}>
                      <X size={16} color="#ef4444" />
                      <span>Access to other 12 Exam Tracks (Locked)</span>
                    </li>
                  </ul>
                </div>

                <button
                  onClick={() => handleActivateSingleTrack(selectedExamObj.id)}
                  style={{ width: "100%", background: selectedExamObj.bgGradient, color: "#ffffff", border: `1.5px solid ${selectedExamObj.borderColor}`, borderRadius: 16, padding: 16, fontWeight: 900, fontSize: 16, cursor: "pointer", marginTop: 32, boxShadow: `0 8px 25px ${selectedExamObj.color}40` }}
                >
                  Activate {selectedExamObj.id} Pass ({selectedExamObj.pricing[billingCycle].priceINR}) →
                </button>
              </div>

              {/* ALL ACCESS UNLIMITED VIP PASS CARD */}
              <div style={{ background: "linear-gradient(135deg, rgba(2,132,199,0.25) 0%, rgba(124,58,237,0.25) 100%)", border: "2px solid #38bdf8", borderRadius: 28, padding: 36, display: "flex", flexDirection: "column", justifyContent: "space-between", boxShadow: "0 20px 50px rgba(2,132,199,0.4)", position: "relative" }}>
                
                <span style={{ position: "absolute", top: -14, right: 28, background: "linear-gradient(135deg, #eab308, #ca8a04)", color: "#000000", padding: "4px 16px", borderRadius: 999, fontSize: 11, fontWeight: 900, letterSpacing: 0.5, boxShadow: "0 4px 15px rgba(234,179,8,0.4)" }}>
                  MAX SAVINGS — ALL 13 EXAMS UNLIMITED
                </span>

                <div>
                  <span style={{ background: "rgba(56,189,248,0.25)", color: "#38bdf8", padding: "4px 12px", borderRadius: 999, fontSize: 11, fontWeight: 800 }}>
                    ALL-EXAM UNLIMITED VIP PASS
                  </span>

                  <h3 style={{ fontSize: 28, fontWeight: 900, color: "#ffffff", margin: "16px 0 8px 0" }}>
                    Knarrow 13-Exam VIP Pass
                  </h3>

                  <div style={{ display: "flex", alignItems: "baseline", gap: 10 }}>
                    <div style={{ fontSize: 44, fontWeight: 900, color: "#ffffff" }}>
                      {ALL_ACCESS_PRICING[billingCycle].priceINR}
                    </div>
                    <div style={{ fontSize: 18, color: "#94a3b8" }}>({ALL_ACCESS_PRICING[billingCycle].priceUSD})</div>
                    <div style={{ fontSize: 14, color: "#cbd5e1" }}>/ {billingCycle}</div>
                  </div>

                  <p style={{ color: "#cbd5e1", fontSize: 14, margin: "12px 0 24px 0", lineHeight: 1.6 }}>
                    Unlocks ALL 13 exam tracks (GMAT, GRE, SAT, IELTS, TOEFL, ACT, PTE, CAT, CLAT, JEE, NEET, GATE, DET) with 1300+ full mocks!
                  </p>

                  <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 12, fontSize: 14, color: "#ffffff" }}>
                    <li style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <Crown size={16} color="#facc15" />
                      <span><strong>1,300+ Full Mocks Across All 13 Exams</strong></span>
                    </li>
                    <li style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <CheckCircle2 size={16} color="#38bdf8" />
                      <span><strong>Unlimited Groq AI Llama 3.3 Scoring &amp; Feedback</strong></span>
                    </li>
                    <li style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <CheckCircle2 size={16} color="#38bdf8" />
                      <span><strong>All 9 Multiplayer Arcade Games Unlocked</strong></span>
                    </li>
                    <li style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <CheckCircle2 size={16} color="#38bdf8" />
                      <span><strong>Desmos Calc, Virtual Calc, OMR Drills &amp; Descriptors</strong></span>
                    </li>
                    <li style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <CheckCircle2 size={16} color="#38bdf8" />
                      <span><strong>7-Day Money Back Score Improvement Guarantee</strong></span>
                    </li>
                  </ul>
                </div>

                <button
                  onClick={handleActivateAllAccess}
                  style={{ width: "100%", background: "linear-gradient(135deg, #0284c7, #7c3aed)", color: "#ffffff", border: "none", borderRadius: 16, padding: 16, fontWeight: 900, fontSize: 16, cursor: "pointer", marginTop: 32, boxShadow: "0 8px 25px rgba(2,132,199,0.4)" }}
                >
                  Activate All-Access 13-Exam VIP Pass Now →
                </button>
              </div>

            </div>
          </div>
        )}

        {/* ═════════════════════════════════════════════════════════
            MODE 3: COMPARISON MATRIX TABLE
        ═════════════════════════════════════════════════════════ */}
        {viewMode === "matrix" && (
          <div style={{ background: "rgba(30,41,59,0.85)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 28, padding: 36, marginBottom: 56, backdropFilter: "blur(16px)" }}>
            <h3 style={{ fontSize: 24, fontWeight: 900, color: "#ffffff", textAlign: "center", marginBottom: 28 }}>
              Plan Feature Comparison Matrix (Tiered 13 Exams)
            </h3>

            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", color: "#ffffff", textAlign: "left", fontSize: 14 }}>
                <thead>
                  <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.15)" }}>
                    <th style={{ padding: 16 }}>Platform Feature</th>
                    <th style={{ padding: 16, color: "#94a3b8" }}>Free Tier</th>
                    <th style={{ padding: 16, color: "#38bdf8" }}>Single Exam Pass (Tiered ₹599 – ₹1,999/mo)</th>
                    <th style={{ padding: 16, color: "#c084fc" }}>All-Access VIP Pass (₹2,499/mo)</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { feature: "Full Mocks per Exam Track", free: "3 Free Mocks", single: "100 Mocks (Selected Exam)", all: "1,300+ Mocks (All 13 Exams)" },
                    { feature: "IELTS / TOEFL / PTE AI Speaking & Writing", free: "2 Tests Free", single: "Unlimited (If Language Pass)", all: "Unlimited (All Exams)" },
                    { feature: "SAT Desmos & Quant Tools", free: "✓", single: "✓", all: "✓" },
                    { feature: "CAT 40-min Timers & TITA Drills", free: "✓", single: "✓", all: "✓" },
                    { feature: "NEET NCERT Drills & OMR Bubble Speed", free: "✓", single: "✓", all: "✓" },
                    { feature: "Arcade Games Unlocked", free: "3 Free Games", single: "All 9 Games Unlocked", all: "All 9 Games Unlocked" },
                    { feature: "Groq AI Llama 3.3 Diagnostic Plan", free: "Basic", single: "Full 7-Day Plan", all: "Unlimited AI Plan" },
                    { feature: "Score Improvement Guarantee", free: "—", single: "✓ (7-Day Guarantee)", all: "✓ (7-Day Guarantee)" },
                  ].map((row, idx) => (
                    <tr key={idx} style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                      <td style={{ padding: 16, fontWeight: 700 }}>{row.feature}</td>
                      <td style={{ padding: 16, color: "#cbd5e1" }}>{row.free}</td>
                      <td style={{ padding: 16, color: "#38bdf8", fontWeight: 800 }}>{row.single}</td>
                      <td style={{ padding: 16, color: "#c084fc", fontWeight: 900 }}>{row.all}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ── SUCCESS MODAL ── */}
        <AnimatePresence>
          {successModal && (
            <div style={{ position: "fixed", inset: 0, background: "rgba(8,12,20,0.9)", backdropFilter: "blur(20px)", zIndex: 999999, display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
              <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} style={{ background: "#0f172a", border: "2px solid #38bdf8", borderRadius: 28, padding: 40, maxWidth: 500, width: "100%", textAlign: "center", boxShadow: "0 20px 60px rgba(0,0,0,0.6)" }}>
                <div style={{ width: 64, height: 64, borderRadius: "50%", background: "rgba(34,197,94,0.2)", color: "#22c55e", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px" }}>
                  <CheckCircle2 size={36} />
                </div>
                <h3 style={{ fontSize: 24, fontWeight: 900, color: "#ffffff", margin: "0 0 12px 0" }}>Plan Activated Successfully!</h3>
                <p style={{ color: "#cbd5e1", fontSize: 14, lineHeight: 1.6, marginBottom: 28 }}>
                  Your <strong>{successModal.type === "ALL_ACCESS" ? "All-Exam 13-Track VIP Pass" : `${successModal.trackId} Pass`}</strong> is now active. All 100 Mocks, AI feedback, and Arcade Games are unlocked!
                </p>
                <button
                  onClick={() => {
                    const trackToNav = successModal.trackId ? successModal.trackId.toLowerCase() : "dashboard";
                    setSuccessModal(null);
                    if (trackToNav === "duolingo") navigate("/duolingo");
                    else if (trackToNav === "ielts") navigate("/reading");
                    else navigate(`/${trackToNav}`);
                  }}
                  style={{ width: "100%", background: "linear-gradient(135deg, #0284c7, #7c3aed)", color: "#ffffff", border: "none", borderRadius: 16, padding: 16, fontWeight: 900, fontSize: 16, cursor: "pointer" }}
                >
                  Start Practicing Now →
                </button>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}
