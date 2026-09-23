import { useEffect, useState, useRef } from "react";
import {
  getFirestore, collection, addDoc, query, where, getDocs, deleteDoc, doc,
} from "firebase/firestore";
import { app } from "../firebase";
import { useAuth } from "../context/AuthContext";
import { useExam } from "../context/ExamContext";
import { motion, AnimatePresence } from "framer-motion";
import ReactMarkdown from "react-markdown";
import toast from "react-hot-toast";
import {
  CalendarDays, Sparkles, PlusCircle, Zap, ClipboardList,
  Calendar, Trash2, BrainCircuit, CheckCircle2, Clock,
} from "lucide-react";
import aiService from "../services/aiService";

// ─── Tokens ───────────────────────────────────────────────────────────────────
const T = {
  glass: {
    background: "rgba(255,255,255,.06)",
    border: "1px solid rgba(255,255,255,.10)",
    backdropFilter: "blur(22px)",
    borderRadius: "22px",
  },
  gradientText: {
    background: "linear-gradient(90deg,#4f46e5,#2563eb,#06b6d4)",
    WebkitBackgroundClip: "text",
    backgroundClip: "text",
    WebkitTextFillColor: "transparent",
  },
  primaryBtn: (disabled) => ({
    display: "inline-flex", alignItems: "center", gap: "9px",
    padding: "13px 20px", border: "none", borderRadius: "14px",
    background: disabled ? "rgba(255,255,255,.08)" : "linear-gradient(135deg,#4f46e5,#2563eb)",
    color: disabled ? "var(--text-secondary)" : "white",
    fontWeight: 700, fontSize: "14px",
    cursor: disabled ? "not-allowed" : "pointer",
    boxShadow: disabled ? "none" : "0 12px 30px rgba(79,70,229,.30)",
    transition: "all .25s", width: "100%", justifyContent: "center",
    opacity: disabled ? 0.6 : 1,
  }),
  input: {
    width: "100%", padding: "12px 16px", borderRadius: "12px",
    border: "1px solid rgba(255,255,255,.12)",
    background: "rgba(255,255,255,.04)", color: "var(--text)",
    fontSize: "14px", outline: "none",
    fontFamily: "Inter, sans-serif", transition: "border .2s",
    boxSizing: "border-box",
  },
  badge: {
    display: "inline-flex", alignItems: "center", gap: "7px",
    padding: "7px 16px", borderRadius: "999px",
    background: "rgba(255,255,255,.08)", border: "1px solid rgba(255,255,255,.12)",
    fontSize: ".82rem", fontWeight: 700, color: "var(--text)", letterSpacing: "1px",
  },
};

const ACCENT_COLORS = ["#4f46e5","#06b6d4","#22c55e","#f59e0b","#8b5cf6","#ef4444"];
function taskAccent(id = "") {
  let h = 0; for (const c of id) h += c.charCodeAt(0);
  return ACCENT_COLORS[h % ACCENT_COLORS.length];
}

function focusIn(e)  { e.target.style.border = "1px solid rgba(79,70,229,.65)"; }
function focusOut(e) { e.target.style.border = "1px solid rgba(255,255,255,.12)"; }

function CardSection({ title, icon: Icon, iconColor = "#4f46e5", children, style = {} }) {
  return (
    <div style={{ ...T.glass, padding: "26px", display: "flex", flexDirection: "column", gap: "18px", ...style }}>
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <div style={{ width: "36px", height: "36px", borderRadius: "11px", display: "flex", alignItems: "center", justifyContent: "center", background: `${iconColor}22`, flexShrink: 0 }}>
          <Icon size={17} color={iconColor} />
        </div>
        <h2 style={{ fontSize: "1rem", fontWeight: 700, color: "var(--text)" }}>{title}</h2>
      </div>
      {children}
    </div>
  );
}

function FieldLabel({ children }) {
  return <label style={{ display: "block", fontSize: ".8rem", fontWeight: 600, color: "var(--text-secondary)", marginBottom: "5px" }}>{children}</label>;
}

// ─── Track Configuration System ───────────────────────────────────────────────
const TRACK_PLANNER_CONFIG = {
  ACT: {
    title: "ACT 2026 Study Planner",
    subtitle: "Organize your study schedule and let Groq AI generate a custom ACT 2026 prep roadmap for your 1–36 target composite score.",
    currentLabel: "Current Composite Score",
    currentPlaceholder: "E.g. 24",
    targetLabel: "Target Composite Score",
    targetPlaceholder: "E.g. 32",
    focusPlaceholder: "E.g. Math, English, Science",
    emptyText: "Enter your composite scores and click \"Generate with Groq AI\" to get your personalized plan.",
    scale: "1 – 36 Composite Scale",
    promptDetails: "ACT 2026 National format covering English (50 Qs), Math (45 Qs), Reading (36 Qs), optional Science (40 Qs), and optional Writing."
  },
  SAT: {
    title: "Digital SAT 2026 Study Planner",
    subtitle: "Organize your study schedule and let Groq AI generate a custom Digital SAT prep roadmap for your 400–1600 target total score.",
    currentLabel: "Current Total Score",
    currentPlaceholder: "E.g. 1150",
    targetLabel: "Target Total Score",
    targetPlaceholder: "E.g. 1450",
    focusPlaceholder: "E.g. Math, Reading & Writing",
    emptyText: "Enter your total SAT scores and click \"Generate with Groq AI\" to get your personalized plan.",
    scale: "400 – 1600 Total Scale",
    promptDetails: "Digital SAT 2026 Multistage Adaptive format covering Reading & Writing (54 Qs / 64m) and Math (44 Qs / 70m with Desmos calculator)."
  },
  GMAT: {
    title: "GMAT Exam 2026 Study Planner",
    subtitle: "Organize your study schedule and let Groq AI generate a custom GMAT prep roadmap for your 205–805 target score.",
    currentLabel: "Current GMAT Score",
    currentPlaceholder: "E.g. 585",
    targetLabel: "Target GMAT Score",
    targetPlaceholder: "E.g. 705",
    focusPlaceholder: "E.g. Quantitative, Data Insights",
    emptyText: "Enter your GMAT scores and click \"Generate with Groq AI\" to get your personalized plan.",
    scale: "205 – 805 Scale",
    promptDetails: "GMAT Exam / Focus Edition 2026 format covering Quantitative Reasoning (21 Qs), Verbal Reasoning (23 Qs), and Data Insights (20 Qs)."
  },
  TOEFL: {
    title: "TOEFL iBT 2026 Study Planner",
    subtitle: "Organize your study schedule and let Groq AI generate a custom TOEFL iBT prep roadmap for your 0–120 target score.",
    currentLabel: "Current TOEFL Score",
    currentPlaceholder: "E.g. 85",
    targetLabel: "Target TOEFL Score",
    targetPlaceholder: "E.g. 105",
    focusPlaceholder: "E.g. Speaking, Writing, C-Tests",
    emptyText: "Enter your TOEFL scores and click \"Generate with Groq AI\" to get your personalized plan.",
    scale: "0 – 120 Scale",
    promptDetails: "TOEFL iBT 2026 format covering Reading (C-tests & passages), Listening, Speaking, and Writing."
  },
  GRE: {
    title: "GRE General 2026 Study Planner",
    subtitle: "Organize your study schedule and let Groq AI generate a custom GRE General prep roadmap for your 260–340 target score.",
    currentLabel: "Current GRE Score",
    currentPlaceholder: "E.g. 308",
    targetLabel: "Target GRE Score",
    targetPlaceholder: "E.g. 325",
    focusPlaceholder: "E.g. Verbal Reasoning, Quant",
    emptyText: "Enter your GRE scores and click \"Generate with Groq AI\" to get your personalized plan.",
    scale: "260 – 340 Combined Scale",
    promptDetails: "GRE General Shorter 2026 format covering Analytical Writing (Issue Essay), Verbal Reasoning (27 Qs), and Quantitative Reasoning (27 Qs)."
  },
  CAT: {
    title: "IIM CAT 2026 Study Planner",
    subtitle: "Organize your study schedule and let Groq AI generate a custom CAT MBA prep roadmap for your target percentile.",
    currentLabel: "Current Percentile",
    currentPlaceholder: "E.g. 80 %ile",
    targetLabel: "Target Percentile",
    targetPlaceholder: "E.g. 99 %ile",
    focusPlaceholder: "E.g. DILR Sets, QA Arithmetic",
    emptyText: "Enter your percentiles and click \"Generate with Groq AI\" to get your personalized plan.",
    scale: "Percentile Scale (0 – 100 %ile)",
    promptDetails: "IIM CAT 2026 format covering VARC (24 Qs), DILR (22 Qs), and QA (22 Qs) with section-locking."
  },
  PTE: {
    title: "PTE Academic 2026 Study Planner",
    subtitle: "Organize your study schedule and let Groq AI generate a custom PTE Academic prep roadmap for your 10–90 target score.",
    currentLabel: "Current PTE Score",
    currentPlaceholder: "E.g. 62",
    targetLabel: "Target PTE Score",
    targetPlaceholder: "E.g. 79",
    focusPlaceholder: "E.g. Read Aloud, Dictation",
    emptyText: "Enter your PTE scores and click \"Generate with Groq AI\" to get your personalized plan.",
    scale: "10 – 90 Scale",
    promptDetails: "PTE Academic 2026 Enhanced format covering Speaking & Writing (54–67m), Reading, and Listening."
  },
  DET: {
    title: "Duolingo DET Study Planner",
    subtitle: "Organize your practice tasks and let Groq AI generate a tailored week-by-week DET roadmap for your 10–160 target score.",
    currentLabel: "Current DET Score",
    currentPlaceholder: "E.g. 115",
    targetLabel: "Target DET Score",
    targetPlaceholder: "E.g. 135",
    focusPlaceholder: "E.g. Literacy, Production",
    emptyText: "Enter your DET scores and click \"Generate with Groq AI\" to get your personalized plan.",
    scale: "10 – 160 Scale",
    promptDetails: "Duolingo English Test (DET) 2026 computer-adaptive format across Literacy, Comprehension, Conversation, and Production subscores."
  },
  NEET: {
    title: "NEET UG 2026 Study Planner",
    subtitle: "Organize your study schedule and let Groq AI generate a custom NEET UG prep roadmap for your 180–720 target score.",
    currentLabel: "Current NEET Score",
    currentPlaceholder: "E.g. 520",
    targetLabel: "Target NEET Score",
    targetPlaceholder: "E.g. 680",
    focusPlaceholder: "E.g. Biology, Physics Numericals, Chemistry",
    emptyText: "Enter your NEET scores and click \"Generate with Groq AI\" to get your personalized plan.",
    scale: "180 – 720 Score Scale",
    promptDetails: "NEET UG 2026 format covering Physics (45 Qs), Chemistry (45 Qs), and Biology/Botany/Zoology (90 Qs)."
  },
  JEE: {
    title: "JEE Main 2026 Study Planner",
    subtitle: "Organize your study schedule and let Groq AI generate a custom JEE Main prep roadmap for your target percentile or score.",
    currentLabel: "Current Percentile / Score",
    currentPlaceholder: "E.g. 92 %ile",
    targetLabel: "Target Percentile / Score",
    targetPlaceholder: "E.g. 99.5 %ile",
    focusPlaceholder: "E.g. Calculus, Organic Chemistry, Mechanics",
    emptyText: "Enter your JEE scores and click \"Generate with Groq AI\" to get your personalized plan.",
    scale: "Percentile / 300 Score Scale",
    promptDetails: "JEE Main 2026 format covering Physics (30 Qs), Chemistry (30 Qs), and Mathematics (30 Qs)."
  },
  GATE: {
    title: "GATE Exam 2026 Study Planner",
    subtitle: "Organize your study schedule and let Groq AI generate a custom GATE prep roadmap for your target score.",
    currentLabel: "Current GATE Score",
    currentPlaceholder: "E.g. 450",
    targetLabel: "Target GATE Score",
    targetPlaceholder: "E.g. 750",
    focusPlaceholder: "E.g. General Aptitude, Core Engineering Subjects",
    emptyText: "Enter your GATE scores and click \"Generate with Groq AI\" to get your personalized plan.",
    scale: "100 Marks / 1000 Score Scale",
    promptDetails: "GATE 2026 Engineering & Science format covering General Aptitude (15 marks) and Core Discipline (85 marks)."
  },
  CLAT: {
    title: "CLAT 2026 Exam Study Planner",
    subtitle: "Organize your study schedule and let Groq AI generate a custom CLAT prep roadmap for your target score / NLU rank.",
    currentLabel: "Current CLAT Score",
    currentPlaceholder: "E.g. 75",
    targetLabel: "Target CLAT Score",
    targetPlaceholder: "E.g. 105",
    focusPlaceholder: "E.g. Legal Reasoning, Current Affairs, Critical Reasoning",
    emptyText: "Enter your CLAT scores and click \"Generate with Groq AI\" to get your personalized plan.",
    scale: "120 Marks Scale",
    promptDetails: "Consortium of NLUs CLAT 2026 format covering English, Current Affairs, Legal Reasoning, Logical Reasoning, and Quantitative Techniques."
  },
  IELTS: {
    title: "IELTS Study Planner",
    subtitle: "Add your tasks, then let Groq AI generate a tailored week-by-week IELTS roadmap for your target band score.",
    currentLabel: "Current Band Score",
    currentPlaceholder: "E.g. 6.0",
    targetLabel: "Target Band Score",
    targetPlaceholder: "E.g. 7.5",
    focusPlaceholder: "E.g. Writing Task 2, Speaking",
    emptyText: "Enter your band scores and click \"Generate with Groq AI\" to get your personalized plan.",
    scale: "Band 0 – 9.0 Scale",
    promptDetails: "IELTS Academic & General Training format covering Listening (40 Qs), Reading (3 passages, 40 Qs), Writing (Task 1 & 2), and Speaking (3 Parts)."
  }
};

// ─── Main Component ───────────────────────────────────────────────────────────
export default function StudyPlanner() {
  const { user } = useAuth();
  const { activeTrack } = useExam();

  const trackCfg = TRACK_PLANNER_CONFIG[activeTrack] || TRACK_PLANNER_CONFIG.IELTS;

  // Task form
  const [taskName, setTaskName] = useState("");
  const [taskDate, setTaskDate] = useState("");
  const [tasks, setTasks] = useState([]);
  const [savingTask, setSavingTask] = useState(false);

  // AI planner
  const [currentBand, setCurrentBand] = useState("");
  const [targetBand, setTargetBand] = useState("");
  const [focusArea, setFocusArea] = useState("");
  const [weeksAvail, setWeeksAvail] = useState("");
  const [aiPlan, setAiPlan] = useState("");
  const [streaming, setStreaming] = useState(false);
  const planRef = useRef(null);

  useEffect(() => {
    if (user) fetchTasks();
    else setTasks([]);
  }, [user]);

  // scroll plan into view as it streams
  useEffect(() => {
    if (aiPlan && planRef.current) {
      planRef.current.scrollTop = planRef.current.scrollHeight;
    }
  }, [aiPlan]);

  async function fetchTasks() {
    if (!user) return;
    try {
      const db = getFirestore(app);
      const q = query(collection(db, "studyPlans"), where("userId", "==", user.uid));
      const snap = await getDocs(q);
      const data = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
      data.sort((a, b) => (a.date > b.date ? 1 : -1));
      setTasks(data);
    } catch (e) {
      console.error("fetchTasks:", e);
      if (e?.code !== "permission-denied") {
        toast.error("Could not load tasks. Please try again.");
      }
    }
  }

  async function addTask() {
    if (!taskName.trim() || !taskDate) return;
    if (!user) { toast.error("Please sign in to save tasks."); return; }
    setSavingTask(true);
    try {
      const db = getFirestore(app);
      await addDoc(collection(db, "studyPlans"), {
        userId: user.uid, task: taskName.trim(), date: taskDate,
        completed: false, createdAt: new Date(),
      });
      setTaskName(""); setTaskDate("");
      fetchTasks();
      toast.success("Task added!");
    } catch (e) {
      console.error("addTask:", e);
      toast.error("Failed to save task. Please try again.");
    }
    finally { setSavingTask(false); }
  }

  async function deleteTask(id) {
    try {
      const db = getFirestore(app);
      await deleteDoc(doc(db, "studyPlans", id));
      setTasks((prev) => prev.filter((t) => t.id !== id));
    } catch (e) {
      console.error("deleteTask:", e);
      toast.error("Could not delete task.");
    }
  }

  function buildLocalStudyPlan() {
    const weeks = parseInt(weeksAvail, 10) || 8;
    const focus = focusArea || "All sections equally";

    return `
## 🎯 Personalized ${trackCfg.title} Prep Roadmap (${activeTrack} Track)

### 📌 Student Profile & Objectives
- **${trackCfg.currentLabel}:** ${currentBand} (Scale: ${trackCfg.scale})
- **${trackCfg.targetLabel}:** ${targetBand} (Scale: ${trackCfg.scale})
- **Preparation Window:** ${weeks} Weeks
- **Key Focus Area:** ${focus}
- **Exam Context:** ${trackCfg.promptDetails}

---

## 🗓️ Week-by-Week Action Plan

### 🚀 Phase 1: Diagnostic Foundation & Core Strategies (Weeks 1 – 2)
- **Daily Allocation:** 1.5 – 2 Hours / day
- **Monday & Tuesday:** Diagnostic practice test to pinpoint current error patterns in ${focus}.
- **Wednesday & Thursday:** Review core exam question formats, timing rules, and section guidelines.
- **Friday:** Focused drill on weak topics (Targeting +15% accuracy).
- **Weekend:** Complete Section Mock 1 + In-depth answer review.

### 📈 Phase 2: Skill Building & Strategy Mastery (Weeks 3 – ${Math.min(weeks, 4)})
- **Daily Allocation:** 2 – 2.5 Hours / day
- **Focus:** Intensive practice on ${focus} and key high-yield topics.
- **Section Drills:** Time-bound practice sessions with instant error analysis.
- **Mid-Point Assessment:** Take Full Mock Test 1 under simulated exam conditions. Target progress check toward ${targetBand}.

### ⚡ Phase 3: Advanced Speed, Accuracy & Full Mock Simulations (Weeks ${Math.min(weeks, 5)} – ${weeks})
- **Daily Allocation:** 2.5 – 3 Hours / day
- **Full Exam Mocks:** 2 Full Mocks per week with realistic timing enforcement.
- **Error Log Refinement:** Re-solve missed questions until 100% mastery.
- **Final Week Prep:** Light review, test-day strategy checklist, and rest before the exam.

---

## 💡 Key Strategies to Reach ${targetBand}
1. **Pacing Control:** Master time management for each section.
2. **Error Logging:** Maintain an active log of incorrect answers and review weekly.
3. **Simulated Mocks:** Replicate exam conditions for peak performance.
`.trim();
  }

  async function generatePlan() {
    if (!currentBand || !targetBand) return;
    setAiPlan("");
    setStreaming(true);

    const prompt = `
Create a detailed, personalized study plan for a student preparing for ${trackCfg.title} (${activeTrack} Track) with the following profile:
- ${trackCfg.currentLabel}: ${currentBand} (Scale: ${trackCfg.scale})
- ${trackCfg.targetLabel}: ${targetBand} (Scale: ${trackCfg.scale})
- Available Study Window: ${weeksAvail || "8"} weeks
- Priority Focus Area: ${focusArea || "All sections equally"}

Exam Specification Context:
${trackCfg.promptDetails}

Generate a week-by-week plan with:
1. Daily study tasks and time allocation
2. Specific exercises per section/subskill for ${activeTrack}
3. Full Mock test schedule and progress checks
4. Weekly milestones and how to measure improvement
5. Practical tips to bridge the gap from ${currentBand} to ${targetBand} on the ${trackCfg.scale}

Make it highly practical, encouraging, and specific to ${trackCfg.title}.
`.trim();

    try {
      await aiService.stream({
        systemPrompt: `You are an expert ${trackCfg.title} coach. Create structured, practical study plans using markdown with clear headings (##), bullet points, and weekly breakdowns. Be specific and encouraging.`,
        messages: [{ role: "user", content: prompt }],
        onToken: (_, full) => setAiPlan(full),
      });
    } catch (e) {
      console.warn("AI generation failed, using structured fallback planner:", e);
      try {
        const chatRes = await aiService.chat({
          systemPrompt: `You are an expert ${trackCfg.title} coach.`,
          messages: [{ role: "user", content: prompt }]
        });
        if (chatRes) {
          setAiPlan(chatRes);
          return;
        }
      } catch (err) {
        console.warn("AI chat fallback failed:", err);
      }
      setAiPlan(buildLocalStudyPlan());
    } finally {
      setStreaming(false);
    }
  }

  const isToday = (dateStr) => {
    const today = new Date().toISOString().split("T")[0];
    return dateStr === today;
  };
  const isPast = (dateStr) => {
    const today = new Date().toISOString().split("T")[0];
    return dateStr < today;
  };

  // ─── Render ────────────────────────────────────────────────────────────────
  return (
    <div style={{
      minHeight: "100vh",
      background: "radial-gradient(circle at 20% 10%, rgba(99,102,241,.18), transparent 40%), radial-gradient(circle at 80% 90%, rgba(59,130,246,.15), transparent 40%), var(--bg)",
      fontFamily: "Inter, sans-serif",
    }}>
      {/* Grid overlay */}
      <div style={{ position: "fixed", inset: 0, backgroundImage: "linear-gradient(rgba(255,255,255,.04) 1px, transparent 1px), linear-gradient(90deg,rgba(255,255,255,.04) 1px, transparent 1px)", backgroundSize: "40px 40px", opacity: .4, pointerEvents: "none", zIndex: 0 }} />

      <div style={{ maxWidth: "1320px", margin: "0 auto", padding: "72px 24px 60px", position: "relative", zIndex: 1 }}>

        {/* ── Page Hero ──────────────────────────────────────────────────── */}
        <motion.div initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .55 }}
          style={{ marginBottom: "48px" }}>
          <span style={T.badge}><Zap size={13} color="#4f46e5" />AI POWERED</span>
          <h1 style={{ fontSize: "clamp(2rem,4vw,3rem)", fontWeight: 800, lineHeight: 1.1, letterSpacing: "-1px", color: "var(--text)", margin: "16px 0 10px" }}>
            <span style={T.gradientText}>{trackCfg.title}</span>
          </h1>
          <p style={{ color: "var(--text-secondary)", fontSize: "1rem", lineHeight: 1.8, maxWidth: "560px" }}>
            {trackCfg.subtitle}
          </p>
        </motion.div>

        {/* ── Three-column layout ─────────────────────────────────────────── */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "minmax(0,1fr) minmax(0,1fr) minmax(0,1.6fr)",
          gap: "22px",
          alignItems: "start",
        }}>

          {/* ── COL 1: Add Task ─────────────────────────────────────────── */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .5, delay: .1 }}>
            <CardSection title="Add Study Task" icon={PlusCircle}>
              <div>
                <FieldLabel>Task</FieldLabel>
                <input value={taskName} onChange={(e) => setTaskName(e.target.value)}
                  placeholder="E.g. Complete Practice Module 4"
                  style={T.input} onFocus={focusIn} onBlur={focusOut}
                  onKeyDown={(e) => e.key === "Enter" && addTask()} />
              </div>
              <div>
                <FieldLabel>Due Date</FieldLabel>
                <input type="date" value={taskDate} onChange={(e) => setTaskDate(e.target.value)}
                  style={{ ...T.input, colorScheme: "dark" }} onFocus={focusIn} onBlur={focusOut} />
              </div>
              <button onClick={addTask} disabled={savingTask || !taskName.trim() || !taskDate}
                style={T.primaryBtn(savingTask || !taskName.trim() || !taskDate)}>
                <PlusCircle size={16} />{savingTask ? "Saving…" : "Add Task"}
              </button>
            </CardSection>

            {/* Task list */}
            <div style={{ marginTop: "18px", display: "flex", flexDirection: "column", gap: "10px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", padding: "0 4px", marginBottom: "4px" }}>
                <ClipboardList size={16} color="#4f46e5" />
                <span style={{ fontSize: ".88rem", fontWeight: 700, color: "var(--text)" }}>Your Tasks</span>
                <span style={{ marginLeft: "auto", fontSize: ".78rem", padding: "3px 10px", borderRadius: "999px", background: "rgba(79,70,229,.15)", color: "#818cf8" }}>{tasks.length}</span>
              </div>

              {tasks.length === 0 ? (
                <div style={{ ...T.glass, padding: "30px", textAlign: "center" }}>
                  <Calendar size={32} color="rgba(255,255,255,.18)" style={{ marginBottom: "10px" }} />
                  <p style={{ color: "var(--text-secondary)", fontSize: ".88rem" }}>No tasks yet</p>
                </div>
              ) : (
                <AnimatePresence>
                  {tasks.map((t, i) => {
                    const accent = taskAccent(t.id);
                    const today = isToday(t.date);
                    const past = isPast(t.date);
                    return (
                      <motion.div key={t.id}
                        initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -12 }}
                        transition={{ delay: i * .04 }}
                        style={{ background: today ? `${accent}14` : "rgba(255,255,255,.04)", border: `1px solid ${today ? accent + "44" : "rgba(255,255,255,.08)"}`, borderRadius: "14px", padding: "13px 14px", display: "flex", alignItems: "flex-start", gap: "11px", position: "relative", overflow: "hidden" }}>
                        {/* left bar */}
                        <div style={{ position: "absolute", left: 0, top: 0, width: "3px", height: "100%", background: past ? "#64748b" : accent }} />
                        <div style={{ width: "30px", height: "30px", borderRadius: "999px", display: "flex", alignItems: "center", justifyContent: "center", background: `${accent}22`, flexShrink: 0 }}>
                          {today ? <CheckCircle2 size={15} color={accent} /> : <Calendar size={15} color={accent} />}
                        </div>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ fontWeight: 600, color: past ? "var(--text-secondary)" : "var(--text)", fontSize: ".88rem", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", textDecoration: past ? "line-through" : "none" }}>{t.task}</div>
                          <div style={{ display: "flex", alignItems: "center", gap: "4px", color: today ? accent : past ? "#ef4444" : "var(--text-secondary)", fontSize: ".75rem", marginTop: "3px" }}>
                            <Clock size={11} />
                            {today ? "Today" : t.date}
                          </div>
                        </div>
                        <button onClick={() => deleteTask(t.id)}
                          style={{ background: "none", border: "none", color: "#475569", cursor: "pointer", padding: "2px", flexShrink: 0, lineHeight: 1 }}>
                          <Trash2 size={13} />
                        </button>
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              )}
            </div>
          </motion.div>

          {/* ── COL 2: AI Planner Form ───────────────────────────────────── */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .5, delay: .18 }}>
            <CardSection title="AI Plan Generator" icon={BrainCircuit} iconColor="#8b5cf6">
              <div>
                <FieldLabel>{trackCfg.currentLabel}</FieldLabel>
                <input placeholder={trackCfg.currentPlaceholder} value={currentBand} onChange={(e) => setCurrentBand(e.target.value)}
                  style={T.input} onFocus={focusIn} onBlur={focusOut} />
              </div>
              <div>
                <FieldLabel>{trackCfg.targetLabel}</FieldLabel>
                <input placeholder={trackCfg.targetPlaceholder} value={targetBand} onChange={(e) => setTargetBand(e.target.value)}
                  style={T.input} onFocus={focusIn} onBlur={focusOut} />
              </div>
              <div>
                <FieldLabel>Weeks Available</FieldLabel>
                <input placeholder="E.g. 8" value={weeksAvail} onChange={(e) => setWeeksAvail(e.target.value)}
                  style={T.input} onFocus={focusIn} onBlur={focusOut} />
              </div>
              <div>
                <FieldLabel>Priority Focus (optional)</FieldLabel>
                <input placeholder={trackCfg.focusPlaceholder} value={focusArea} onChange={(e) => setFocusArea(e.target.value)}
                  style={T.input} onFocus={focusIn} onBlur={focusOut} />
              </div>
              <button onClick={generatePlan} disabled={streaming || !currentBand || !targetBand}
                style={T.primaryBtn(streaming || !currentBand || !targetBand)}>
                {streaming
                  ? <><span style={{ width: "14px", height: "14px", border: "2px solid rgba(255,255,255,.3)", borderTopColor: "white", borderRadius: "50%", animation: "spin 0.7s linear infinite", display: "inline-block" }} />Generating…</>
                  : <><Sparkles size={16} />Generate with Groq AI</>}
              </button>

              {/* Stats row */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", marginTop: "4px" }}>
                {[
                  { label: "Tasks Added", value: tasks.length, color: "#4f46e5" },
                  { label: "Due Today", value: tasks.filter((t) => isToday(t.date)).length, color: "#22c55e" },
                ].map((s) => (
                  <div key={s.label} style={{ background: "rgba(255,255,255,.04)", border: "1px solid rgba(255,255,255,.08)", borderRadius: "14px", padding: "14px", textAlign: "center" }}>
                    <div style={{ fontSize: "1.6rem", fontWeight: 800, color: s.color }}>{s.value}</div>
                    <div style={{ fontSize: ".75rem", color: "var(--text-secondary)", marginTop: "3px" }}>{s.label}</div>
                  </div>
                ))}
              </div>
            </CardSection>
          </motion.div>

          {/* ── COL 3: AI Plan Output ────────────────────────────────────── */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .5, delay: .26 }}>
            <div style={{ ...T.glass, height: "100%", minHeight: "520px", display: "flex", flexDirection: "column" }}>
              {/* header */}
              <div style={{ padding: "20px 24px 0", display: "flex", alignItems: "center", gap: "10px", borderBottom: "1px solid rgba(255,255,255,.06)", paddingBottom: "16px" }}>
                <div style={{ width: "32px", height: "32px", borderRadius: "10px", background: "linear-gradient(135deg,#8b5cf6,#4f46e5)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Sparkles size={15} color="white" />
                </div>
                <div>
                  <div style={{ fontWeight: 700, color: "var(--text)", fontSize: ".95rem" }}>{trackCfg.title} (AI Output)</div>
                  <div style={{ fontSize: ".75rem", color: streaming ? "#22d3ee" : "var(--text-secondary)", display: "flex", alignItems: "center", gap: "5px" }}>
                    {streaming && <span style={{ width: "7px", height: "7px", borderRadius: "50%", background: "#22d3ee", animation: "pulse 1s infinite", display: "inline-block" }} />}
                    {streaming ? "Groq AI is writing your plan…" : aiPlan ? "Plan ready" : "Fill in the form and generate"}
                  </div>
                </div>
              </div>

              {/* content area */}
              <div ref={planRef} style={{ flex: 1, overflowY: "auto", padding: "20px 24px" }}>
                {!aiPlan && !streaming ? (
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100%", gap: "16px", opacity: .5, paddingTop: "60px" }}>
                    <BrainCircuit size={48} color="#4f46e5" />
                    <p style={{ color: "var(--text-secondary)", fontSize: ".9rem", textAlign: "center", maxWidth: "260px", lineHeight: 1.7 }}>
                      {trackCfg.emptyText}
                    </p>
                  </div>
                ) : (
                  <div style={{ color: "var(--text)", fontSize: ".9rem", lineHeight: 1.8 }}>
                    <style>{`
                      .ai-plan-md h2 { font-size:1.05rem; font-weight:700; color:var(--text); margin:18px 0 8px; border-bottom:1px solid rgba(255,255,255,.08); padding-bottom:6px; }
                      .ai-plan-md h3 { font-size:.95rem; font-weight:700; color:#818cf8; margin:14px 0 6px; }
                      .ai-plan-md ul { padding-left:20px; margin:6px 0 10px; }
                      .ai-plan-md li { margin-bottom:4px; color:var(--text-secondary); }
                      .ai-plan-md strong { color:var(--text); }
                      .ai-plan-md p { margin-bottom:8px; color:var(--text-secondary); }
                      .ai-plan-md code { background:rgba(79,70,229,.18); padding:2px 7px; border-radius:5px; font-size:.82rem; color:#a5b4fc; }
                    `}</style>
                    <div className="ai-plan-md">
                      <ReactMarkdown>{aiPlan}</ReactMarkdown>
                    </div>
                    {streaming && (
                      <span style={{ display: "inline-block", width: "8px", height: "16px", background: "#4f46e5", borderRadius: "2px", animation: "blink 1s step-end infinite", verticalAlign: "middle", marginLeft: "2px" }} />
                    )}
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
        @keyframes pulse { 0%,100%{opacity:.6} 50%{opacity:1} }
        @media (max-width: 1024px) {
          .planner-grid { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 640px) {
          .planner-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
