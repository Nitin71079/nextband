import { useState, useMemo, useEffect } from "react";
import { Link } from "react-router-dom";
import AuroraBackground from "../components/AuroraBackground";
import { useExam } from "../context/ExamContext";
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
  Calculator,
  Scale,
  Zap,
  FileText,
  CheckCircle2,
  Globe,
  Award,
  Gamepad2,
  Atom,
  Stethoscope,
  BookMarked,
  Cpu,
  Layers
} from "lucide-react";
import "../styles/helpCenter.css";

/* ─────────────────────────────────────────────
   EXAM TRACK CONFIGURATION (13 EXAMS)
───────────────────────────────────────────── */

const EXAMS_LIST = [
  { id: "IELTS", label: "IELTS", icon: "🎓", name: "IELTS Academic & GT", color: "#2563eb" },
  { id: "SAT",   label: "Digital SAT", icon: "📘", name: "Digital SAT (1600)", color: "#0284c7" },
  { id: "GRE",   label: "GRE",   icon: "🏛️", name: "GRE General Test",   color: "#7c3aed" },
  { id: "GMAT",  label: "GMAT",  icon: "💼", name: "GMAT Focus Edition", color: "#059669" },
  { id: "CAT",   label: "CAT",   icon: "🐆", name: "IIM CAT (VARC/DILR/QA)", color: "#dc2626" },
  { id: "JEE",   label: "JEE",   icon: "⚛️", name: "JEE Main & Advanced", color: "#d97706" },
  { id: "NEET",  label: "NEET",  icon: "🩺", name: "NEET UG (Medical)", color: "#16a34a" },
  { id: "CLAT",  label: "CLAT",  icon: "⚖️", name: "CLAT (Law NLUs)",   color: "#9333ea" },
  { id: "GATE",  label: "GATE",  icon: "⚙️", name: "GATE Engineering",  color: "#475569" },
  { id: "TOEFL", label: "TOEFL", icon: "🗣️", name: "TOEFL iBT",         color: "#0891b2" },
  { id: "PTE",   label: "PTE",   icon: "🔤", name: "PTE Academic",      color: "#b45309" },
  { id: "DET",   label: "DET",   icon: "🦉", name: "Duolingo English",  color: "#65a30d" },
  { id: "ACT",   label: "ACT",   icon: "🎯", name: "ACT College Prep",  color: "#e11d48" }
];

/* ─────────────────────────────────────────────
   EXAM-SPECIFIC HELP CENTER DATA DICTIONARY
───────────────────────────────────────────── */

const EXAM_HELP_DATA = {
  /* 🎓 IELTS */
  IELTS: {
    title: "IELTS Help & Exam Guide",
    subtitle: "Everything you need to master IELTS Academic & General Training (Band 0–9).",
    categories: [
      { id: "getting-started", label: "Getting Started", icon: BookOpen, color: "#2563eb" },
      { id: "reading", label: "Reading Module", icon: BookOpen, color: "#0891b2" },
      { id: "listening", label: "Listening Module", icon: Headphones, color: "#7c3aed" },
      { id: "writing", label: "Writing Task 1 & 2", icon: PenLine, color: "#059669" },
      { id: "speaking", label: "Speaking Parts 1-3", icon: Mic, color: "#dc2626" },
      { id: "ai", label: "AI Evaluation & Coach", icon: Brain, color: "#d97706" },
      { id: "scores", label: "Band Scores (0-9)", icon: Trophy, color: "#b45309" },
      { id: "billing", label: "Billing & Premium", icon: CreditCard, color: "#16a34a" },
    ],
    faqs: [
      { category: "getting-started", q: "What is Knarrow IELTS Prep?", a: "Knarrow provides official 2026 CBT simulations for IELTS Academic & General Training including Reading, Listening, Writing, and Speaking with real-time AI band scoring." },
      { category: "reading", q: "How are Reading tests scored in Knarrow?", a: "Raw correct answers (out of 40) are automatically mapped to official IELTS Band Scores (0-9) according to Academic and GT conversion tables." },
      { category: "listening", q: "Can I pause audio during the Listening test?", a: "In realistic exam mode, audio plays strictly once without pausing. Practice mode allows playback controls for learning." },
      { category: "writing", q: "How does AI Writing Evaluation grade Task 1 and Task 2?", a: "Our AI evaluates your essay across all 4 official criteria: Task Achievement/Response, Coherence & Cohesion, Lexical Resource, and Grammatical Range & Accuracy within seconds." },
      { category: "speaking", q: "How does the AI Speaking test work?", a: "You record audio for Part 1 (Questions), Part 2 (Cue Card 2-min talk), and Part 3 (Discussion). AI transcribes and scores your Fluency, Lexical Resource, Grammar, and Pronunciation." },
      { category: "scores", q: "How accurate are Knarrow AI Band Predictions?", a: "Our scoring models align within ±0.5 band of official examiner descriptors based on official IELTS benchmark corpora." }
    ],
    popular: [
      { label: "How is IELTS Band Score calculated?", cat: "scores" },
      { label: "How does AI Writing Evaluation work?", cat: "writing" },
      { label: "My microphone isn't working for Speaking", cat: "speaking" },
      { label: "Difference between Academic and General Training", cat: "reading" }
    ],
    quickLinks: [
      { icon: BookOpen, label: "Take IELTS Reading Mock", path: "/reading", color: "#0891b2" },
      { icon: Headphones, label: "Start Listening Simulation", path: "/listening", color: "#7c3aed" },
      { icon: PenLine, label: "AI Essay Evaluation", path: "/writing", color: "#059669" },
      { icon: Mic, label: "AI Speaking Simulator", path: "/speaking", color: "#dc2626" },
      { icon: Brain, label: "IELTS AI Study Coach", path: "/ai-center", color: "#d97706" }
    ]
  },

  /* 📘 DIGITAL SAT */
  SAT: {
    title: "Digital SAT Help & Exam Guide",
    subtitle: "Master the 2026 Digital SAT Reading, Writing & Math (Score 400–1600).",
    categories: [
      { id: "getting-started", label: "Getting Started", icon: BookOpen, color: "#2563eb" },
      { id: "rw", label: "Reading & Writing", icon: BookOpen, color: "#0284c7" },
      { id: "math", label: "Math & Desmos", icon: Calculator, color: "#d97706" },
      { id: "adaptivity", label: "Multistage Adaptivity", icon: Zap, color: "#7c3aed" },
      { id: "ai", label: "AI Score Predictor", icon: Brain, color: "#059669" },
      { id: "scores", label: "Scale (400-1600)", icon: Trophy, color: "#b45309" }
    ],
    faqs: [
      { category: "getting-started", q: "What is the 2026 Digital SAT format?", a: "The Digital SAT consists of 2 Reading & Writing modules (54 questions total, 64 mins) and 2 Math modules (44 questions total, 70 mins)." },
      { category: "rw", q: "What question types appear in SAT Reading & Writing?", a: "Modules feature concise passages (25-150 words) with questions testing Craft & Structure, Information & Ideas, Standard English Conventions, and Expression of Ideas." },
      { category: "math", q: "Is the Desmos Graphing Calculator built into Knarrow SAT tests?", a: "Yes! Full Desmos Graphing Calculator is embedded inside all SAT Math practice tests and section mocks." },
      { category: "adaptivity", q: "How does Digital SAT multistage adaptivity work?", a: "Your performance on Module 1 determines whether you receive the Harder or Easier Module 2, directly impacting your maximum achievable 800 section score." },
      { category: "scores", q: "How does Knarrow calculate the 400-1600 score?", a: "We simulate College Board's Item Response Theory (IRT) scoring algorithm across both R&W and Math sections." }
    ],
    popular: [
      { label: "How does SAT Multistage Adaptivity work?", cat: "adaptivity" },
      { label: "Using Desmos Calculator in Math section", cat: "math" },
      { label: "Reading & Writing timing & strategies", cat: "rw" },
      { label: "SAT 400-1600 score conversion chart", cat: "scores" }
    ],
    quickLinks: [
      { icon: BookOpen, label: "Digital SAT Practice Mocks", path: "/sat", color: "#0284c7" },
      { icon: Calculator, label: "SAT Math Practice", path: "/sat", color: "#d97706" },
      { icon: Brain, label: "SAT AI Error Diagnostic", path: "/ai-center", color: "#059669" },
      { icon: Trophy, label: "SAT Score History", path: "/results-history", color: "#b45309" }
    ]
  },

  /* 🏛️ GRE */
  GRE: {
    title: "GRE General Test Help & Guide",
    subtitle: "Master the Shorter GRE 2026: Verbal, Quant & Analytical Writing (260–340).",
    categories: [
      { id: "getting-started", label: "Getting Started", icon: BookOpen, color: "#2563eb" },
      { id: "verbal", label: "Verbal Reasoning", icon: BookOpen, color: "#7c3aed" },
      { id: "quant", label: "Quant Reasoning", icon: Calculator, color: "#0284c7" },
      { id: "awa", label: "Analytical Writing", icon: PenLine, color: "#059669" },
      { id: "scores", label: "GRE Score Scale", icon: Trophy, color: "#b45309" }
    ],
    faqs: [
      { category: "getting-started", q: "What is the Shorter GRE test duration?", a: "The shorter GRE takes under 2 hours total, comprising Analytical Writing (1 Issue essay, 30 min), 2 Verbal sections (27 questions), and 2 Quant sections (27 questions)." },
      { category: "verbal", q: "What question types are in GRE Verbal?", a: "Text Completion (1, 2, 3 blanks), Sentence Equivalence, and Reading Comprehension with single and multi-select answer options." },
      { category: "quant", q: "Is an onscreen calculator provided for GRE Quant?", a: "Yes, an official 4-function calculator with square root is provided in all Quant sections on Knarrow." },
      { category: "awa", q: "How is the Issue Essay scored?", a: "Knarrow AI evaluates your Issue Essay on a 0.0 to 6.0 scale according to ETS Analytical Writing scoring criteria." }
    ],
    popular: [
      { label: "Shorter GRE test structure explained", cat: "getting-started" },
      { label: "GRE Verbal 130-170 scale conversion", cat: "scores" },
      { label: "AI Essay scoring for GRE AWA", cat: "awa" }
    ],
    quickLinks: [
      { icon: BookOpen, label: "GRE Verbal Practice", path: "/gre", color: "#7c3aed" },
      { icon: Calculator, label: "GRE Quant Practice", path: "/gre", color: "#0284c7" },
      { icon: PenLine, label: "AI Issue Essay Grader", path: "/writing", color: "#059669" }
    ]
  },

  /* 💼 GMAT */
  GMAT: {
    title: "GMAT Focus Edition Help & Guide",
    subtitle: "Master Quantitative, Verbal & Data Insights for Top Business Schools (205–805).",
    categories: [
      { id: "getting-started", label: "Getting Started", icon: BookOpen, color: "#2563eb" },
      { id: "quant", label: "Quantitative Reasoning", icon: Calculator, color: "#0284c7" },
      { id: "verbal", label: "Verbal Reasoning", icon: BookOpen, color: "#7c3aed" },
      { id: "di", label: "Data Insights", icon: BarChart3, color: "#059669" },
      { id: "scores", label: "Score Scale (205-805)", icon: Trophy, color: "#b45309" }
    ],
    faqs: [
      { category: "getting-started", q: "What are the sections in GMAT Focus Edition?", a: "GMAT Focus features 3 equal sections of 45 mins each: Quantitative Reasoning (21 questions), Verbal Reasoning (23 questions), and Data Insights (20 questions)." },
      { category: "di", q: "What is tested in Data Insights?", a: "Data Insights tests Data Sufficiency, Multi-Source Reasoning, Table Analysis, Graphics Interpretation, and Two-Part Analysis." },
      { category: "quant", q: "Can I edit answers in GMAT Focus?", a: "Yes! You can bookmark any question and review/change up to 3 answers per section at the end if time permits." }
    ],
    popular: [
      { label: "GMAT Focus Question Bookmark & Edit Feature", cat: "quant" },
      { label: "Data Insights Question Types & Calculator", cat: "di" },
      { label: "205-805 Score Scale & Percentile Table", cat: "scores" }
    ],
    quickLinks: [
      { icon: BarChart3, label: "GMAT Data Insights Practice", path: "/gmat", color: "#059669" },
      { icon: Calculator, label: "GMAT Quant Practice", path: "/gmat", color: "#0284c7" },
      { icon: BookOpen, label: "GMAT Verbal Practice", path: "/gmat", color: "#7c3aed" }
    ]
  },

  /* 🐆 CAT */
  CAT: {
    title: "CAT Exam Help & Guide",
    subtitle: "Ace VARC, DILR & Quantitative Aptitude for IIMs & Top B-Schools.",
    categories: [
      { id: "getting-started", label: "Getting Started", icon: BookOpen, color: "#2563eb" },
      { id: "varc", label: "VARC", icon: BookOpen, color: "#7c3aed" },
      { id: "dilr", label: "DILR Sets", icon: Layers, color: "#dc2626" },
      { id: "qa", label: "Quant Aptitude", icon: Calculator, color: "#0284c7" },
      { id: "tita", label: "TITA Non-MCQs", icon: Zap, color: "#d97706" }
    ],
    faqs: [
      { category: "getting-started", q: "What is the CAT exam timing and layout?", a: "CAT features 66 questions in 120 minutes with 40-minute strict sectional time limits for VARC, DILR, and QA." },
      { category: "tita", q: "What are TITA questions?", a: "TITA (Type-In-The-Answer) are non-MCQ questions where you type numbers into an input box. There is NO negative marking for incorrect TITA answers." },
      { category: "varc", q: "What is the CAT VARC marking scheme?", a: "MCQs carry +3 marks for correct answers and -1 mark penalty for wrong options." }
    ],
    popular: [
      { label: "CAT Sectional Time Limit Rules", cat: "getting-started" },
      { label: "TITA Question Strategy", cat: "tita" },
      { label: "CAT Percentile Estimator", cat: "qa" }
    ],
    quickLinks: [
      { icon: BookOpen, label: "VARC Practice Passages", path: "/cat", color: "#7c3aed" },
      { icon: Layers, label: "DILR Set Simulations", path: "/cat", color: "#dc2626" },
      { icon: Calculator, label: "Quant Section Mocks", path: "/cat", color: "#0284c7" }
    ]
  },

  /* ⚛️ JEE */
  JEE: {
    title: "JEE Main & Advanced Help & Guide",
    subtitle: "Master Physics, Chemistry & Mathematics for IITs, NITs & IIITs.",
    categories: [
      { id: "getting-started", label: "Getting Started", icon: Atom, color: "#2563eb" },
      { id: "physics", label: "Physics", icon: Zap, color: "#7c3aed" },
      { id: "chemistry", label: "Chemistry", icon: Sparkles, color: "#059669" },
      { id: "math", label: "Mathematics", icon: Calculator, color: "#d97706" },
      { id: "numerical", label: "Numerical Value", icon: Trophy, color: "#b45309" }
    ],
    faqs: [
      { category: "getting-started", q: "What is NTA JEE Main exam marking pattern?", a: "Each section (Physics, Chemistry, Math) has Section A (20 MCQs) and Section B (10 Numerical Value questions, attempt 5). Correct answers carry +4, wrong carry -1." },
      { category: "numerical", q: "How should numerical value answers be entered?", a: "Numerical value answers must be entered as exact integers or rounded decimal numbers specified in the question." }
    ],
    popular: [
      { label: "NTA +4 / -1 Marking Rules", cat: "getting-started" },
      { label: "JEE Main vs Advanced Differences", cat: "math" }
    ],
    quickLinks: [
      { icon: Atom, label: "JEE Physics Practice", path: "/jee", color: "#7c3aed" },
      { icon: Sparkles, label: "JEE Chemistry Practice", path: "/jee", color: "#059669" },
      { icon: Calculator, label: "JEE Math Section", path: "/jee", color: "#d97706" }
    ]
  },

  /* 🩺 NEET */
  NEET: {
    title: "NEET UG Medical Exam Help & Guide",
    subtitle: "Target 720/720 in Physics, Chemistry & Biology (Botany & Zoology).",
    categories: [
      { id: "getting-started", label: "Getting Started", icon: Stethoscope, color: "#16a34a" },
      { id: "biology", label: "Botany & Zoology", icon: Sparkles, color: "#059669" },
      { id: "chemistry", label: "Chemistry", icon: BookOpen, color: "#0284c7" },
      { id: "physics", label: "Physics", icon: Zap, color: "#7c3aed" },
      { id: "omr", label: "OMR Speed Strategy", icon: Trophy, color: "#b45309" }
    ],
    faqs: [
      { category: "getting-started", q: "What is the total marks structure for NEET UG?", a: "NEET UG consists of 200 questions (attempt 180) for 720 total marks: 360 marks for Biology (Botany + Zoology), 180 for Physics, and 180 for Chemistry." },
      { category: "biology", q: "Are questions strictly NCERT-based?", a: "Yes, over 95% of NEET Biology and Chemistry questions are direct NCERT line-by-line concept checks." }
    ],
    popular: [
      { label: "NEET 720 Score Breakdown", cat: "getting-started" },
      { label: "NCERT High-Yield Revision", cat: "biology" }
    ],
    quickLinks: [
      { icon: Stethoscope, label: "Biology NCERT Drills", path: "/neet", color: "#16a34a" },
      { icon: Zap, label: "Physics Practice Mocks", path: "/neet", color: "#7c3aed" },
      { icon: BookOpen, label: "Chemistry Practice Mocks", path: "/neet", color: "#0284c7" }
    ]
  },

  /* ⚖️ CLAT */
  CLAT: {
    title: "CLAT Exam Help & Guide",
    subtitle: "Master Legal Reasoning, Current Affairs, English & Logic for National Law Universities.",
    categories: [
      { id: "getting-started", label: "Getting Started", icon: Scale, color: "#9333ea" },
      { id: "legal", label: "Legal Reasoning", icon: Scale, color: "#7c3aed" },
      { id: "gk", label: "Current Affairs & GK", icon: Globe, color: "#0284c7" },
      { id: "english-logic", label: "English & Logic", icon: BookOpen, color: "#059669" }
    ],
    faqs: [
      { category: "getting-started", q: "What is the CLAT exam duration and passage style?", a: "CLAT features 120 passage-based MCQs in 120 minutes with 0.25 negative marking per incorrect answer." },
      { category: "legal", q: "Do I need prior legal knowledge for Legal Reasoning?", a: "No. Legal principles are provided inside the reading passage; you apply the principle to the factual situation." }
    ],
    popular: [
      { label: "Passage Comprehension Techniques for CLAT", cat: "legal" },
      { label: "CLAT 120 Min Speed Strategy", cat: "getting-started" }
    ],
    quickLinks: [
      { icon: Scale, label: "Legal Reasoning Passages", path: "/clat", color: "#9333ea" },
      { icon: Globe, label: "Current Affairs Drills", path: "/clat", color: "#0284c7" },
      { icon: BookOpen, label: "Logical Reasoning Mocks", path: "/clat", color: "#059669" }
    ]
  },

  /* ⚙️ GATE */
  GATE: {
    title: "GATE Engineering Exam Help & Guide",
    subtitle: "Master Core Engineering, Mathematics, MSQs & Virtual Calculator for M.Tech & PSUs.",
    categories: [
      { id: "getting-started", label: "Getting Started", icon: Cpu, color: "#475569" },
      { id: "core", label: "Technical Core", icon: Cpu, color: "#2563eb" },
      { id: "math", label: "Engineering Math", icon: Calculator, color: "#7c3aed" },
      { id: "msq-nat", label: "MSQs & NAT", icon: Zap, color: "#d97706" }
    ],
    faqs: [
      { category: "getting-started", q: "What are MSQ and NAT question types in GATE?", a: "MSQs (Multiple Select Questions) have one or more correct choices with ZERO partial marking. NAT (Numerical Answer Type) requires typing numeric values into a specified decimal range." },
      { category: "math", q: "Is the Virtual Calculator available in GATE tests?", a: "Yes, an exact replica of the GATE TCS iON virtual calculator is available in all GATE tests on Knarrow." }
    ],
    popular: [
      { label: "GATE MSQ Zero Partial Marking Rules", cat: "msq-nat" },
      { label: "Virtual Calculator Tips & Tricks", cat: "math" }
    ],
    quickLinks: [
      { icon: Cpu, label: "Technical Core Practice", path: "/gate", color: "#2563eb" },
      { icon: Calculator, label: "Engineering Math Practice", path: "/gate", color: "#7c3aed" }
    ]
  },

  /* 🗣️ TOEFL */
  TOEFL: {
    title: "TOEFL iBT Help & Guide",
    subtitle: "Master Streamlined TOEFL Reading, Listening, Speaking & Academic Writing (0–120).",
    categories: [
      { id: "getting-started", label: "Getting Started", icon: BookOpen, color: "#0891b2" },
      { id: "reading", label: "Reading", icon: BookOpen, color: "#0284c7" },
      { id: "listening", label: "Listening", icon: Headphones, color: "#7c3aed" },
      { id: "speaking", label: "Speaking", icon: Mic, color: "#dc2626" },
      { id: "writing", label: "Academic Writing", icon: PenLine, color: "#059669" }
    ],
    faqs: [
      { category: "getting-started", q: "What is the new TOEFL iBT test duration?", a: "TOEFL iBT takes under 2 hours, featuring Reading (20 questions), Listening (28 questions), Speaking (4 tasks), and Writing (2 tasks including Writing for Academic Discussion)." },
      { category: "writing", q: "What is 'Writing for Academic Discussion'?", a: "You state and justify your opinion in an online academic forum prompt within 10 minutes (100+ words)." }
    ],
    popular: [
      { label: "TOEFL Writing for Academic Discussion Guide", cat: "writing" },
      { label: "TOEFL 0-120 Subscore Conversion", cat: "getting-started" }
    ],
    quickLinks: [
      { icon: PenLine, label: "Academic Discussion Writing", path: "/toefl", color: "#059669" },
      { icon: Mic, label: "TOEFL Speaking Simulator", path: "/toefl", color: "#dc2626" }
    ]
  },

  /* 🔤 PTE */
  PTE: {
    title: "PTE Academic Help & Guide",
    subtitle: "Master Read Aloud, Repeat Sentence, Describe Image & Listening (10–90 Scale).",
    categories: [
      { id: "getting-started", label: "Getting Started", icon: BookOpen, color: "#b45309" },
      { id: "speaking-writing", label: "Speaking & Writing", icon: Mic, color: "#dc2626" },
      { id: "reading", label: "Reading", icon: BookOpen, color: "#0284c7" },
      { id: "listening", label: "Listening", icon: Headphones, color: "#7c3aed" }
    ],
    faqs: [
      { category: "speaking-writing", q: "How does Pearson AI score Oral Fluency & Pronunciation?", a: "Fluency is judged on natural rhythm without hesitations; Pronunciation compares vowel/consonant acoustic waveforms to native speech standards." },
      { category: "getting-started", q: "How are PTE Enabling Skills calculated?", a: "Grammar, Oral Fluency, Pronunciation, Spelling, Vocabulary, and Discourse Structure combine to give your overall 10-90 score." }
    ],
    popular: [
      { label: "Read Aloud Fluency vs Pronunciation Weightage", cat: "speaking-writing" },
      { label: "PTE 10-90 Score Scale Breakdown", cat: "getting-started" }
    ],
    quickLinks: [
      { icon: Mic, label: "Read Aloud & Repeat Sentence", path: "/pte", color: "#dc2626" },
      { icon: BookOpen, label: "Describe Image Visuals", path: "/pte", color: "#b45309" }
    ]
  },

  /* 🦉 DET */
  DET: {
    title: "Duolingo English Test Help & Guide",
    subtitle: "Master Literacy, Comprehension, Conversation & Production (10–160 Scale).",
    categories: [
      { id: "getting-started", label: "Getting Started", icon: BookOpen, color: "#65a30d" },
      { id: "subscores", label: "Subscores (10-160)", icon: Trophy, color: "#059669" },
      { id: "interactive-reading", label: "Interactive Reading", icon: BookOpen, color: "#0284c7" },
      { id: "production", label: "Writing & Speaking", icon: PenLine, color: "#7c3aed" }
    ],
    faqs: [
      { category: "getting-started", q: "How long is the DET and how is it structured?", a: "The DET takes ~1 hour, featuring computer adaptive short questions, Interactive Reading, Interactive Writing, and a Video Interview." },
      { category: "subscores", q: "What are the 4 DET subscores?", a: "Literacy (Read & Write), Comprehension (Read & Listen), Conversation (Listen & Speak), and Production (Write & Speak)." }
    ],
    popular: [
      { label: "DET Computer Adaptive Difficulty Rules", cat: "getting-started" },
      { label: "Interactive Reading Fill-in-the-Blanks", cat: "interactive-reading" }
    ],
    quickLinks: [
      { icon: BookOpen, label: "Interactive Reading Practice", path: "/duolingo", color: "#0284c7" },
      { icon: PenLine, label: "Picture Description & Writing", path: "/duolingo", color: "#7c3aed" }
    ]
  },

  /* 🎯 ACT */
  ACT: {
    title: "ACT College Prep Help & Guide",
    subtitle: "Master English, Mathematics, Reading & Science Reasoning (1–36 Composite).",
    categories: [
      { id: "getting-started", label: "Getting Started", icon: BookOpen, color: "#e11d48" },
      { id: "english", label: "English", icon: BookOpen, color: "#0284c7" },
      { id: "math", label: "Mathematics", icon: Calculator, color: "#d97706" },
      { id: "reading", label: "Reading", icon: BookOpen, color: "#7c3aed" },
      { id: "science", label: "Science Reasoning", icon: Zap, color: "#059669" }
    ],
    faqs: [
      { category: "getting-started", q: "What is the ACT exam layout?", a: "ACT includes English (75 Qs, 45 mins), Math (60 Qs, 60 mins), Reading (40 Qs, 35 mins), and Science (40 Qs, 35 mins)." },
      { category: "science", q: "Do I need scientific facts for ACT Science?", a: "No! ACT Science tests data interpretation, graph analysis, and conflicting viewpoints based on text provided." }
    ],
    popular: [
      { label: "ACT Science Data Interpretation Strategy", cat: "science" },
      { label: "ACT English 45s Pacing Guide", cat: "english" }
    ],
    quickLinks: [
      { icon: Zap, label: "ACT Science Reasoning Mocks", path: "/act", color: "#059669" },
      { icon: Calculator, label: "ACT Math Practice", path: "/act", color: "#d97706" }
    ]
  }
};

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
   MAIN HELP CENTER COMPONENT
───────────────────────────────────────────── */

export default function HelpCenter() {
  const examContext = useExam ? useExam() : null;
  const activeTrack = examContext?.activeTrack || "IELTS";
  const selectTrack = examContext?.selectTrack;

  const [selectedExam, setSelectedExam] = useState(activeTrack);
  const [search, setSearch]             = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [openFaq, setOpenFaq]           = useState(null);

  // Sync selected exam if global context changes
  useEffect(() => {
    if (activeTrack && EXAM_HELP_DATA[activeTrack]) {
      setSelectedExam(activeTrack);
    }
  }, [activeTrack]);

  function handleExamChange(examId) {
    setSelectedExam(examId);
    setActiveCategory("all");
    setSearch("");
    setOpenFaq(null);
    if (selectTrack) {
      selectTrack(examId, null); // update global context without forcing navigation
    }
  }

  // Retrieve current active exam data (fallback to IELTS if undefined)
  const currentExamConfig = EXAMS_LIST.find((e) => e.id === selectedExam) || EXAMS_LIST[0];
  const examData = EXAM_HELP_DATA[selectedExam] || EXAM_HELP_DATA.IELTS;

  /* Filter FAQs */
  const filteredFaqs = useMemo(() => {
    const q = search.toLowerCase().trim();
    return examData.faqs.filter((faq) => {
      const matchCat = activeCategory === "all" || faq.category === activeCategory;
      const matchSearch =
        !q ||
        faq.q.toLowerCase().includes(q) ||
        faq.a.toLowerCase().includes(q);
      return matchCat && matchSearch;
    });
  }, [search, activeCategory, examData]);

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

      {/* ═══════ HERO SECTION ═══════ */}
      <section className="hc-hero">
        <div className="hc-hero-inner">
          
          {/* Badge */}
          <div className="hc-hero-badge">
            <HelpCircle size={16} />
            <span>Knarrow Help Center</span>
          </div>

          <h1 className="hc-hero-title">
            How can we <span>help you?</span>
          </h1>

          <p className="hc-hero-sub">
            {examData.subtitle}
          </p>

          {/* ═══════ DYNAMIC EXAM TRACK SELECTOR BAR ═══════ */}
          <div className="hc-exam-selector-wrap">
            <div className="hc-exam-selector-header">
              <Sparkles size={16} className="hc-exam-sparkle" />
              <span>Select Exam Target:</span>
              <span className="hc-exam-active-pill" style={{ color: currentExamConfig.color, borderColor: `${currentExamConfig.color}40` }}>
                {currentExamConfig.icon} {currentExamConfig.name}
              </span>
            </div>

            <div className="hc-exam-bar">
              {EXAMS_LIST.map((ex) => {
                const isActive = selectedExam === ex.id;
                return (
                  <button
                    key={ex.id}
                    className={`hc-exam-pill${isActive ? " hc-exam-pill--active" : ""}`}
                    style={{
                      "--exam-color": ex.color,
                      borderColor: isActive ? ex.color : "var(--border)"
                    }}
                    onClick={() => handleExamChange(ex.id)}
                  >
                    <span className="hc-exam-pill-icon">{ex.icon}</span>
                    <span className="hc-exam-pill-label">{ex.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Search bar */}
          <div className="hc-search-wrap">
            <Search size={20} className="hc-search-icon" />
            <input
              className="hc-search-input"
              type="text"
              placeholder={`Search ${currentExamConfig.label} questions, scoring, strategy…`}
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

          {/* Popular tags */}
          {examData.popular && examData.popular.length > 0 && (
            <div className="hc-popular">
              <span className="hc-popular-label">Popular for {currentExamConfig.label}:</span>
              {examData.popular.map((item) => (
                <button
                  key={item.label}
                  className="hc-popular-tag"
                  onClick={() => handlePopularClick(item)}
                >
                  {item.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ═══════ CATEGORY GRID ═══════ */}
      <section className="hc-categories">
        <div className="hc-categories-inner">
          <div className="hc-section-label">{currentExamConfig.label} Knowledge Base</div>
          <h2 className="hc-section-title">Explore {currentExamConfig.name} Topics</h2>

          <div className="hc-cat-grid">
            {/* "All Topics" card */}
            <button
              className={`hc-cat-card${activeCategory === "all" ? " hc-cat-card--active" : ""}`}
              onClick={() => handleCategoryClick("all")}
            >
              <div className="hc-cat-icon" style={{ background: `${currentExamConfig.color}18`, color: currentExamConfig.color }}>
                <Sparkles size={24} />
              </div>
              <span>All Topics</span>
              <small>{examData.faqs.length} articles</small>
            </button>

            {examData.categories.map(({ id, label, icon: Icon, color }) => {
              const count = examData.faqs.filter((f) => f.category === id).length;
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
                ? `${currentExamConfig.label} FAQ & Guidelines`
                : examData.categories.find((c) => c.id === activeCategory)?.label || "Articles"}
            </h2>
            <span className="hc-faq-count">
              {filteredFaqs.length} result{filteredFaqs.length !== 1 ? "s" : ""}
            </span>
          </div>

          {filteredFaqs.length === 0 ? (
            <div className="hc-no-results">
              <HelpCircle size={48} />
              <h3>No articles found for "{search || activeCategory}"</h3>
              <p>
                Try searching for another topic or{" "}
                <button onClick={() => { setSearch(""); setActiveCategory("all"); }}>
                  view all {currentExamConfig.label} topics
                </button>.
              </p>
            </div>
          ) : (
            <div className="hc-accordion">
              {filteredFaqs.map((faq, i) => (
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

      {/* ═══════ EXAM QUICK LINKS ═══════ */}
      {examData.quickLinks && examData.quickLinks.length > 0 && (
        <section className="hc-quick-links">
          <div className="hc-quick-links-inner">
            <div className="hc-section-label">{currentExamConfig.label} Practice Tools</div>
            <h2 className="hc-section-title">Jump Right into {currentExamConfig.label} Practice</h2>

            <div className="hc-quick-grid">
              {examData.quickLinks.map(({ icon: Icon, label, path, color }) => (
                <Link key={label} to={path} className="hc-quick-card">
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
      )}

      {/* ═══════ CONTACT SUPPORT ═══════ */}
      <section className="hc-contact">
        <div className="hc-contact-inner">
          <div className="hc-section-label">Still need help with {currentExamConfig.label}?</div>
          <h2 className="hc-section-title">Contact Knarrow Support</h2>
          <p className="hc-contact-sub">
            Our expert exam tutors and support engineers are available 24/7.
          </p>

          <div className="hc-contact-grid">
            <a href="https://mail.google.com/mail/?view=cm&fs=1&to=support@knarrow.in" target="_blank" rel="noopener noreferrer" className="hc-contact-card">
              <div className="hc-contact-icon">
                <Mail size={28} />
              </div>
              <h3>Email Support</h3>
              <p>support@knarrow.in</p>
              <span className="hc-contact-badge">Opens directly in Gmail</span>
            </a>

            <Link to="/community" className="hc-contact-card">
              <div className="hc-contact-icon hc-contact-icon--purple">
                <MessageCircle size={28} />
              </div>
              <h3>Community Forum</h3>
              <p>Discuss {currentExamConfig.label} strategies</p>
              <span className="hc-contact-badge hc-contact-badge--purple">Get peer & tutor help</span>
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
