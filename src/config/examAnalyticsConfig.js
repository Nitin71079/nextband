/**
 * examAnalyticsConfig.js
 * Comprehensive analytics configuration for all 10 exam tracks in Knarrow:
 * IELTS, DET, TOEFL, GRE, PTE, CAT, SAT, ACT, GMAT, SCHOOLS
 */

export const EXAM_ANALYTICS_CONFIG = {
  IELTS: {
    track: "IELTS",
    shortName: "IELTS",
    fullName: "IELTS Academic & General Training",
    subtitle: "Deep-dive into your IELTS performance across all 4 core modules.",
    overallMetricLabel: "Overall Band",
    overallScoreDefault: "7.5",
    overallMax: 9.0,
    unit: "Band",
    deltaText: "↑ +0.5 this month",
    targetVal: 8.0,
    skills: [
      { id: "Listening", label: "Listening", color: "#22d3ee", max: 9.0, defaultVal: 8.0, target: 8.5, trend: [6.5, 7.0, 7.0, 7.5, 7.5, 8.0] },
      { id: "Reading",   label: "Reading",   color: "#4f8ef7", max: 9.0, defaultVal: 7.5, target: 8.0, trend: [6.5, 7.0, 7.0, 7.0, 7.5, 7.5] },
      { id: "Writing",   label: "Writing",   color: "#8b5cf6", max: 9.0, defaultVal: 7.0, target: 7.5, trend: [5.5, 6.0, 6.0, 6.5, 6.5, 7.0] },
      { id: "Speaking",  label: "Speaking",  color: "#22d3a5", max: 9.0, defaultVal: 6.5, target: 7.5, trend: [5.5, 6.0, 6.0, 6.5, 6.5, 6.5] },
  ],
    demoHistory: [
      { section: "Listening", band: 8.0, score: 35, total: 40, date: "Jul 25", testName: "Listening Full Mock 002" },
      { section: "Reading",   band: 7.5, score: 33, total: 40, date: "Jul 23", testName: "Academic Reading Passage 1" },
      { section: "Listening", band: 7.5, score: 32, total: 40, date: "Jul 20", testName: "Listening Sectional 001" },
      { section: "Writing",   band: 7.0, score: null, total: null, date: "Jul 18", testName: "Writing Task 2 Essay" },
      { section: "Speaking",  band: 6.5, score: null, total: null, date: "Jul 15", testName: "Speaking Cue Card Simulator" },
      { section: "Reading",   band: 7.0, score: 30, total: 40, date: "Jul 12", testName: "General Reading Section 2" },
    ],
    recs: [
      { icon: "✍️", bg: "rgba(139,92,246,.12)", title: "Focus on Writing Task 2 Coherence", desc: "Work on paragraph transitions and academic vocabulary. Practice 3 essays this week.", priority: "high" },
      { icon: "🎤", bg: "rgba(34,211,165,.12)", title: "Speaking Part 2 Cue Card Drills", desc: "Record yourself speaking fluently for 2 continuous minutes. Use AI feedback for pacing.", priority: "medium" },
      { icon: "📖", bg: "rgba(79,142,247,.12)", title: "Reading Skimming & Scanning", desc: "Target matching headings and True/False/Not Given questions in under 18 mins.", priority: "low" },
      { icon: "🧠", bg: "rgba(249,115,22,.12)", title: "Academic Vocab Flashcards", desc: "Master top Band 8+ collocations and synonyms using the AI Flashcard engine.", priority: "medium" },
    ]
  },

  DET: {
    track: "DET",
    shortName: "DET",
    fullName: "Duolingo English Test (DET)",
    subtitle: "Deep-dive into your DET performance across Literacy, Comprehension, Conversation, & Production.",
    overallMetricLabel: "Overall Score",
    overallScoreDefault: "125",
    overallMax: 160,
    unit: "Pts",
    deltaText: "↑ +10 pts this month",
    targetVal: 135,
    skills: [
      { id: "Literacy",      label: "Literacy",      color: "#4f8ef7", max: 160, defaultVal: 125, target: 135, trend: [100, 110, 115, 120, 120, 125] },
      { id: "Comprehension", label: "Comprehension", color: "#22d3ee", max: 160, defaultVal: 130, target: 140, trend: [105, 115, 120, 125, 125, 130] },
      { id: "Conversation",  label: "Conversation",  color: "#8b5cf6", max: 160, defaultVal: 115, target: 125, trend: [95, 100, 105, 110, 110, 115] },
      { id: "Production",    label: "Production",    color: "#22d3a5", max: 160, defaultVal: 110, target: 125, trend: [90, 95, 100, 105, 105, 110] },
    ],
    demoHistory: [
      { section: "Literacy",      band: 125, score: 25, total: 30, date: "Jul 26", testName: "Read & Select Drill #4" },
      { section: "Comprehension", band: 130, score: 27, total: 30, date: "Jul 24", testName: "Interactive Reading Passages" },
      { section: "Production",    band: 110, score: null, total: null, date: "Jul 21", testName: "Write About Photo Speed Test" },
      { section: "Conversation",  band: 115, score: null, total: null, date: "Jul 19", testName: "Listen & Respond Simulator" },
      { section: "Literacy",      band: 120, score: 24, total: 30, date: "Jul 16", testName: "C-Test Sentence Completion" },
    ],
    recs: [
      { icon: "🖼️", bg: "rgba(34,211,165,.12)", title: "Write About Photo Speed Boost", desc: "Describe images in 3-4 detailed sentences within 90 seconds. Focus on prepositions.", priority: "high" },
      { icon: "🎧", bg: "rgba(139,92,246,.12)", title: "Listen & Type Dictation Accuracy", desc: "Improve audio perception for fast native speaker contractions and phonemes.", priority: "medium" },
      { icon: "📚", bg: "rgba(79,142,247,.12)", title: "Interactive Reading Flow", desc: "Practice complete the passage and highlight key idea questions efficiently.", priority: "medium" },
      { icon: "🗣️", bg: "rgba(249,115,22,.12)", title: "Speaking Sample Coherence", desc: "Aim for 75+ words in 90s speaking tasks using structured intro-body templates.", priority: "high" },
    ]
  },

  TOEFL: {
    track: "TOEFL",
    shortName: "TOEFL",
    fullName: "TOEFL iBT Test",
    subtitle: "Deep-dive into your TOEFL iBT performance across Reading, Listening, Speaking, & Writing.",
    overallMetricLabel: "Total Score",
    overallScoreDefault: "98",
    overallMax: 120,
    unit: "Pts",
    deltaText: "↑ +6 pts this month",
    targetVal: 105,
    skills: [
      { id: "Reading",   label: "Reading",   color: "#4f8ef7", max: 30, defaultVal: 26, target: 28, trend: [20, 22, 23, 24, 25, 26] },
      { id: "Listening", label: "Listening", color: "#22d3ee", max: 30, defaultVal: 25, target: 28, trend: [19, 21, 22, 23, 24, 25] },
      { id: "Speaking",  label: "Speaking",  color: "#22d3a5", max: 30, defaultVal: 23, target: 26, trend: [18, 19, 20, 21, 22, 23] },
      { id: "Writing",   label: "Writing",   color: "#8b5cf6", max: 30, defaultVal: 24, target: 27, trend: [18, 20, 21, 22, 23, 24] },
    ],
    demoHistory: [
      { section: "Reading",   band: 26, score: 18, total: 20, date: "Jul 25", testName: "Academic Reading Passage 2" },
      { section: "Listening", band: 25, score: 23, total: 28, date: "Jul 22", testName: "Campus Lecture Note-Taking" },
      { section: "Speaking",  band: 23, score: null, total: null, date: "Jul 19", testName: "Integrated Speaking Task 2" },
      { section: "Writing",   band: 24, score: null, total: null, date: "Jul 16", testName: "Writing for an Academic Discussion" },
    ],
    recs: [
      { icon: "🎙️", bg: "rgba(34,211,165,.12)", title: "Integrated Speaking Note-Taking", desc: "Structure note templates for reading + listening synthesis to eliminate pauses.", priority: "high" },
      { icon: "✍️", bg: "rgba(139,92,246,.12)", title: "Academic Discussion Essay", desc: "Master express-an-opinion writing in under 10 minutes with clear supporting points.", priority: "high" },
      { icon: "🎧", bg: "rgba(34,211,238,.12)", title: "Lecture Listening Detail Catch", desc: "Focus on transition signals (however, specifically) in biology and history lectures.", priority: "medium" },
      { icon: "📖", bg: "rgba(79,142,247,.12)", title: "Factual Information Questions", desc: "Practice scanning multi-paragraph texts to locate core thesis statements rapidly.", priority: "low" },
    ]
  },

  GRE: {
    track: "GRE",
    shortName: "GRE",
    fullName: "GRE General Test",
    subtitle: "Deep-dive into your GRE performance across Quantitative, Verbal, & Analytical Writing.",
    overallMetricLabel: "Total Score",
    overallScoreDefault: "320",
    overallMax: 340,
    unit: "Pts",
    deltaText: "↑ +8 pts this month",
    targetVal: 328,
    skills: [
      { id: "Quantitative Reasoning", label: "Quantitative", color: "#4f8ef7", max: 170, defaultVal: 164, target: 168, trend: [152, 155, 158, 160, 162, 164] },
      { id: "Verbal Reasoning",       label: "Verbal",       color: "#22d3ee", max: 170, defaultVal: 156, target: 162, trend: [146, 148, 150, 152, 154, 156] },
      { id: "Analytical Writing",     label: "Writing (AWA)", color: "#8b5cf6", max: 6.0, defaultVal: 4.5, target: 5.0, trend: [3.5, 3.5, 4.0, 4.0, 4.5, 4.5] },
    ],
    demoHistory: [
      { section: "Quantitative Reasoning", band: 164, score: 23, total: 27, date: "Jul 26", testName: "Quant Sectional Hard 02" },
      { section: "Verbal Reasoning",       band: 156, score: 18, total: 27, date: "Jul 23", testName: "TC & SE Vocabulary Drill" },
      { section: "Analytical Writing",     band: 4.5, score: null, total: null, date: "Jul 19", testName: "Analyze an Issue Essay" },
      { section: "Quantitative Reasoning", band: 162, score: 21, total: 27, date: "Jul 15", testName: "Data Interpretation Set" },
    ],
    recs: [
      { icon: "🧮", bg: "rgba(79,142,247,.12)", title: "Quantitative Comparison Shortcuts", desc: "Avoid unnecessary calculations using logic, estimation, and plug-in number strategies.", priority: "high" },
      { icon: "📖", bg: "rgba(34,211,238,.12)", title: "Text Completion Triple-Blank Vocab", desc: "Master high-frequency GRE words and contrast clues (despite, yields, sentence shifts).", priority: "high" },
      { icon: "✍️", bg: "rgba(139,92,246,.12)", title: "AWA Issue Task Counter-Arguments", desc: "Strengthen 5-paragraph essays with robust historical or contemporary examples.", priority: "medium" },
      { icon: "📊", bg: "rgba(34,211,165,.12)", title: "Data Interpretation Accuracy", desc: "Eliminate unit conversion mistakes and visual misinterpretations on bar/line graphs.", priority: "low" },
    ]
  },

  PTE: {
    track: "PTE",
    shortName: "PTE",
    fullName: "PTE Academic",
    subtitle: "Deep-dive into your PTE Academic performance across Communicative & Enabling Skills.",
    overallMetricLabel: "Overall Score",
    overallScoreDefault: "74",
    overallMax: 90,
    unit: "Pts",
    deltaText: "↑ +5 pts this month",
    targetVal: 79,
    skills: [
      { id: "Speaking & Writing", label: "Speaking & Writing", color: "#22d3a5", max: 90, defaultVal: 76, target: 82, trend: [60, 64, 68, 70, 73, 76] },
      { id: "Reading",            label: "Reading",            color: "#4f8ef7", max: 90, defaultVal: 72, target: 78, trend: [58, 62, 65, 68, 70, 72] },
      { id: "Listening",          label: "Listening",          color: "#22d3ee", max: 90, defaultVal: 74, target: 80, trend: [60, 63, 67, 70, 72, 74] },
      { id: "Enabling Skills",    label: "Enabling Skills",    color: "#8b5cf6", max: 90, defaultVal: 78, target: 85, trend: [62, 66, 70, 72, 75, 78] },
    ],
    demoHistory: [
      { section: "Speaking & Writing", band: 76, score: null, total: null, date: "Jul 25", testName: "Read Aloud & Describe Image" },
      { section: "Listening",          band: 74, score: null, total: null, date: "Jul 22", testName: "Write From Dictation Master" },
      { section: "Reading",            band: 72, score: 15, total: 20, date: "Jul 18", testName: "Re-order Paragraphs Speed" },
    ],
    recs: [
      { icon: "🎤", bg: "rgba(34,211,165,.12)", title: "Read Aloud Oral Fluency", desc: "Maintain continuous natural speed without unnatural pauses to maximize AI oral fluency score.", priority: "high" },
      { icon: "✍️", bg: "rgba(139,92,246,.12)", title: "Write From Dictation Accuracy", desc: "Spell every single word correctly; this module yields maximum points for Listening & Writing.", priority: "high" },
      { icon: "📊", bg: "rgba(79,142,247,.12)", title: "Describe Image Template Mastery", desc: "Memorize flawless structured spoken templates to speak continuously for 35 seconds.", priority: "medium" },
      { icon: "📖", bg: "rgba(34,211,238,.12)", title: "Reading Fill in the Blanks", desc: "Practice grammar clues (participle vs noun) and academic collocations daily.", priority: "medium" },
    ]
  },

  CAT: {
    track: "CAT",
    shortName: "CAT",
    fullName: "Common Admission Test (CAT MBA)",
    subtitle: "Deep-dive into your CAT MBA performance across VARC, DILR, & Quantitative Aptitude.",
    overallMetricLabel: "Percentile",
    overallScoreDefault: "98.5",
    overallMax: 100,
    unit: "%ile",
    deltaText: "↑ +3.2%ile this month",
    targetVal: 99.5,
    skills: [
      { id: "VARC", label: "VARC (Verbal)",   color: "#4f8ef7", max: 100, defaultVal: 97.2, target: 99.0, trend: [85, 88, 91, 94, 96, 97.2] },
      { id: "DILR", label: "DILR (Analytics)",color: "#8b5cf6", max: 100, defaultVal: 95.5, target: 98.0, trend: [80, 84, 88, 91, 93, 95.5] },
      { id: "QA",   label: "QA (Math)",        color: "#22d3ee", max: 100, defaultVal: 98.1, target: 99.2, trend: [88, 91, 94, 96, 97, 98.1] },
    ],
    demoHistory: [
      { section: "VARC", band: 97.2, score: 42, total: 72, date: "Jul 26", testName: "RC Dense Philosophy Passage" },
      { section: "DILR", band: 95.5, score: 28, total: 60, date: "Jul 22", testName: "Matrix Arrangement Set" },
      { section: "QA",   band: 98.1, score: 38, total: 66, date: "Jul 18", testName: "Algebra & Arithmetic Sprint" },
    ],
    recs: [
      { icon: "🧩", bg: "rgba(139,92,246,.12)", title: "DILR Set Selection Efficiency", desc: "Spend first 3 mins scanning all sets; solve the 2 easiest sets completely before trying complex ones.", priority: "high" },
      { icon: "📖", bg: "rgba(79,142,247,.12)", title: "VARC Inference & Tone Accuracy", desc: "Eliminate extreme option choices in reading comprehension passages.", priority: "high" },
      { icon: "📐", bg: "rgba(34,211,238,.12)", title: "QA Arithmetic Speed Calculations", desc: "Master TSD (Time Speed Distance) & Percentages without relying on paper steps.", priority: "medium" },
      { icon: "🎯", bg: "rgba(34,211,165,.12)", title: "Accuracy over Attempt Count", desc: "Avoid negative marking (-1); maintain an 85%+ accuracy rate per section.", priority: "high" },
    ]
  },

  SAT: {
    track: "SAT",
    shortName: "SAT",
    fullName: "Digital SAT Exam",
    subtitle: "Deep-dive into your Digital SAT performance across Reading & Writing and Math.",
    overallMetricLabel: "Total Score",
    overallScoreDefault: "1420",
    overallMax: 1600,
    unit: "Pts",
    deltaText: "↑ +60 pts this month",
    targetVal: 1530,
    skills: [
      { id: "Reading & Writing", label: "Reading & Writing", color: "#4f8ef7", max: 800, defaultVal: 710, target: 750, trend: [600, 630, 660, 680, 695, 710] },
      { id: "Mathematics",       label: "Mathematics",       color: "#22d3ee", max: 800, defaultVal: 740, target: 780, trend: [620, 650, 680, 700, 720, 740] },
    ],
    demoHistory: [
      { section: "Mathematics",       band: 740, score: 38, total: 44, date: "Jul 25", testName: "Module 2 Hard Math Drill" },
      { section: "Reading & Writing", band: 710, score: 48, total: 54, date: "Jul 21", testName: "Words in Context & Grammar" },
    ],
    recs: [
      { icon: "💻", bg: "rgba(34,211,238,.12)", title: "Desmos Graphing Calculator Power", desc: "Solve system of equations, quadratics, and minimum/maximum points in seconds with Desmos.", priority: "high" },
      { icon: "📚", bg: "rgba(79,142,247,.12)", title: "Vocabulary in Context Mastery", desc: "Study 200+ digital SAT high-yield words (ubiquitous, pragmatic, ambiguous).", priority: "high" },
      { icon: "✍️", bg: "rgba(139,92,246,.12)", title: "Grammar & Punctuation Rules", desc: "Master semicolon vs comma splices and subject-verb agreement on shorter prompts.", priority: "medium" },
      { icon: "⏱️", bg: "rgba(34,211,165,.12)", title: "Module 2 Adaptive Pacing", desc: "Keep 5 minutes spare at the end of Module 2 for double-checking flagged questions.", priority: "medium" },
    ]
  },

  ACT: {
    track: "ACT",
    shortName: "ACT",
    fullName: "ACT Exam",
    subtitle: "Deep-dive into your ACT performance across English, Math, Reading, & Science.",
    overallMetricLabel: "Composite Score",
    overallScoreDefault: "31",
    overallMax: 36,
    unit: "Pts",
    deltaText: "↑ +2 pts this month",
    targetVal: 34,
    skills: [
      { id: "English",     label: "English",     color: "#4f8ef7", max: 36, defaultVal: 31, target: 34, trend: [24, 26, 28, 29, 30, 31] },
      { id: "Mathematics", label: "Mathematics", color: "#22d3ee", max: 36, defaultVal: 32, target: 35, trend: [25, 27, 29, 30, 31, 32] },
      { id: "Reading",     label: "Reading",     color: "#8b5cf6", max: 36, defaultVal: 30, target: 33, trend: [23, 25, 27, 28, 29, 30] },
      { id: "Science",     label: "Science",     color: "#22d3a5", max: 36, defaultVal: 31, target: 34, trend: [24, 26, 28, 29, 30, 31] },
    ],
    demoHistory: [
      { section: "English",     band: 31, score: 65, total: 75, date: "Jul 24", testName: "Punctuation & Rhetoric Sprint" },
      { section: "Science",     band: 31, score: 34, total: 40, date: "Jul 20", testName: "Data Representation & Experiments" },
      { section: "Mathematics", band: 32, score: 52, total: 60, date: "Jul 17", testName: "Advanced Trig & Geometry" },
    ],
    recs: [
      { icon: "🔬", bg: "rgba(34,211,165,.12)", title: "Science Chart & Graph Interpretation", desc: "Don't read full passages first; jump straight to data figures to answer questions quickly.", priority: "high" },
      { icon: "⚡", bg: "rgba(79,142,247,.12)", title: "Reading 35-Minute Speed Scan", desc: "Allocate exactly 8.5 minutes per passage across Prose, Social Science, Humanities, & Natural Science.", priority: "high" },
      { icon: "📐", bg: "rgba(34,211,238,.12)", title: "Math Last 10 Questions Prep", desc: "Review matrices, complex numbers, and trigonometry identities for top score push.", priority: "medium" },
      { icon: "✍️", bg: "rgba(139,92,246,.12)", title: "English Rhetorical Skills", desc: "Identify transitions (consequently vs furthermore) and sentence placement logic.", priority: "low" },
    ]
  },

  GMAT: {
    track: "GMAT",
    shortName: "GMAT",
    fullName: "GMAT Focus Edition",
    subtitle: "Deep-dive into your GMAT Focus performance across Quantitative, Verbal, & Data Insights.",
    overallMetricLabel: "Total Score",
    overallScoreDefault: "675",
    overallMax: 805,
    unit: "Pts",
    deltaText: "↑ +35 pts this month",
    targetVal: 715,
    skills: [
      { id: "Quantitative Reasoning", label: "Quantitative", color: "#4f8ef7", max: 90, defaultVal: 82, target: 86, trend: [72, 74, 77, 79, 80, 82] },
      { id: "Verbal Reasoning",       label: "Verbal",       color: "#22d3ee", max: 90, defaultVal: 81, target: 85, trend: [71, 73, 76, 78, 80, 81] },
      { id: "Data Insights",          label: "Data Insights",color: "#8b5cf6", max: 90, defaultVal: 80, target: 84, trend: [70, 72, 75, 77, 79, 80] },
    ],
    demoHistory: [
      { section: "Quantitative Reasoning", band: 82, score: 17, total: 21, date: "Jul 25", testName: "Problem Solving Hard Drill" },
      { section: "Data Insights",          band: 80, score: 16, total: 20, date: "Jul 21", testName: "Multi-Source Reasoning Set" },
      { section: "Verbal Reasoning",       band: 81, score: 18, total: 23, date: "Jul 18", testName: "Critical Reasoning Assumptions" },
    ],
    recs: [
      { icon: "📊", bg: "rgba(139,92,246,.12)", title: "Data Insights Multi-Source Reasoning", desc: "Synthesize information across tabs, charts, and tables without get bogged down in text.", priority: "high" },
      { icon: "🔍", bg: "rgba(34,211,238,.12)", title: "Critical Reasoning Flaw Detection", desc: "Identify unstated assumptions and weak causal leaps rapidly.", priority: "high" },
      { icon: "🧮", bg: "rgba(79,142,247,.12)", title: "Quant Number Properties & Rates", desc: "Master prime factorization, remainders, and work/rate algebraic equations.", priority: "medium" },
      { icon: "⏱️", bg: "rgba(34,211,165,.12)", title: "Question Review & Change Strategy", desc: "Use GMAT Focus feature to bookmark hard questions and edit up to 3 answers per section.", priority: "medium" },
    ]
  }
};

/**
 * Returns the analytics configuration for the given activeTrack (defaults to IELTS if invalid)
 */
export function getExamAnalyticsConfig(track) {
  const normalized = (track || "IELTS").toUpperCase();
  return EXAM_ANALYTICS_CONFIG[normalized] || EXAM_ANALYTICS_CONFIG.IELTS;
}
