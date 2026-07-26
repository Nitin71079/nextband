import { useEffect, useState, useRef } from "react";
import {
  getFirestore, collection, addDoc, query, where, getDocs, deleteDoc, doc,
} from "firebase/firestore";
import { app } from "../firebase";
import { useAuth } from "../context/AuthContext";
import { motion, AnimatePresence } from "framer-motion";
import ReactMarkdown from "react-markdown";
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

// ─── Main Component ───────────────────────────────────────────────────────────
export default function StudyPlanner() {
  const { user } = useAuth();

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

  useEffect(() => { fetchTasks(); }, [user]);

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
    } catch (e) { console.error(e); }
  }

  async function addTask() {
    if (!taskName.trim() || !taskDate) return;
    if (!user) { alert("Please login first."); return; }
    setSavingTask(true);
    try {
      const db = getFirestore(app);
      await addDoc(collection(db, "studyPlans"), {
        userId: user.uid, task: taskName.trim(), date: taskDate,
        completed: false, createdAt: new Date(),
      });
      setTaskName(""); setTaskDate("");
      fetchTasks();
    } catch (e) { console.error(e); }
    finally { setSavingTask(false); }
  }

  async function deleteTask(id) {
    try {
      const db = getFirestore(app);
      await deleteDoc(doc(db, "studyPlans", id));
      setTasks((prev) => prev.filter((t) => t.id !== id));
    } catch (e) { console.error(e); }
  }

  async function generatePlan() {
    if (!currentBand || !targetBand) return;
    setAiPlan("");
    setStreaming(true);

    const prompt = `
Create a detailed, personalized IELTS study plan for a student with the following profile:
- Current Band Score: ${currentBand}
- Target Band Score: ${targetBand}
- Available Study Time: ${weeksAvail || "8"} weeks
- Priority Focus Area: ${focusArea || "all sections equally"}

Generate a week-by-week plan with:
1. Daily study tasks and time allocation
2. Specific exercises per section (Reading, Listening, Writing, Speaking)
3. Mock test schedule
4. Weekly milestones and how to measure progress
5. Tips to bridge the gap from ${currentBand} to ${targetBand}

Make it practical, motivating, and IELTS-specific.
`.trim();

    try {
      await aiService.stream({
        systemPrompt: `You are an expert IELTS coach. Create structured, practical study plans using markdown with clear headings (##), bullet points, and weekly breakdowns. Be specific and encouraging.`,
        messages: [{ role: "user", content: prompt }],
        onToken: (_, full) => setAiPlan(full),
      });
    } catch (e) {
      setAiPlan("❌ Failed to generate plan. Please try again.");
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
            <span style={T.gradientText}>Study Planner</span>
          </h1>
          <p style={{ color: "var(--text-secondary)", fontSize: "1rem", lineHeight: 1.8, maxWidth: "520px" }}>
            Add your tasks, then let Groq AI generate a tailored week-by-week IELTS roadmap for your target band.
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
                  placeholder="E.g. Complete Reading Test 4"
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
                        <div style={{ width: "30px", height: "30px", borderRadius: "9px", display: "flex", alignItems: "center", justifyContent: "center", background: `${accent}22`, flexShrink: 0 }}>
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
                <FieldLabel>Current Band</FieldLabel>
                <input placeholder="E.g. 5.5" value={currentBand} onChange={(e) => setCurrentBand(e.target.value)}
                  style={T.input} onFocus={focusIn} onBlur={focusOut} />
              </div>
              <div>
                <FieldLabel>Target Band</FieldLabel>
                <input placeholder="E.g. 7.0" value={targetBand} onChange={(e) => setTargetBand(e.target.value)}
                  style={T.input} onFocus={focusIn} onBlur={focusOut} />
              </div>
              <div>
                <FieldLabel>Weeks Available</FieldLabel>
                <input placeholder="E.g. 8" value={weeksAvail} onChange={(e) => setWeeksAvail(e.target.value)}
                  style={T.input} onFocus={focusIn} onBlur={focusOut} />
              </div>
              <div>
                <FieldLabel>Priority Focus (optional)</FieldLabel>
                <input placeholder="E.g. Writing, Speaking" value={focusArea} onChange={(e) => setFocusArea(e.target.value)}
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
                  <div style={{ fontWeight: 700, color: "var(--text)", fontSize: ".95rem" }}>AI Study Plan</div>
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
                      Enter your band scores and click "Generate with Groq AI" to get your personalized plan.
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
