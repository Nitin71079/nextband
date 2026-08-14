import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Sparkles, BrainCircuit, PenSquare, Mic, BookOpen, Headphones,
  CalendarDays, BarChart3, ArrowRight, Bot, Cpu, Activity, Target, Zap,
  Volume2, Sliders, ShieldCheck, Award, Flame, CheckCircle2
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useLiveData } from "../hooks/useLiveData";
import "../styles/ai-control-center.css";

export default function AIControlCenter() {
  const navigate = useNavigate();
  const { name, user } = useAuth();
  const { analytics } = useLiveData();

  const firstName = name || user?.email?.split("@")[0] || "Candidate";

  const band = Math.min(9.0, Math.max(0, Number(analytics?.averageBand || 7.5))).toFixed(1);
  const confidence = analytics?.ai?.confidence || 92;
  const rawWeak = analytics?.ai?.weakestSkill || "Writing";
  const weakSkill = rawWeak.replace(" Accuracy", "");
  const totalTests = analytics?.testsCompleted || 0;
  const streak = analytics?.studyStreak || 0;

  const aiSuite = [
    {
      title: "AI IELTS Coach",
      category: "Personal Mentor",
      desc: "24/7 AI tutor for instant grammar, vocabulary, and exam strategy assistance.",
      icon: Bot,
      route: "/ai-assistant",
      color: "#06b6d4",
      tag: "24/7 Live",
    },
    {
      title: "Writing AI Evaluator",
      category: "Essay Evaluation",
      desc: "Instant Task 1 & 2 evaluation with Task Response, Coherence & Lexical band feedback.",
      icon: PenSquare,
      route: "/mock/writing",
      color: "#f59e0b",
      tag: "Instant Feedback",
    },
    {
      title: "Speaking AI Coach",
      category: "Voice Analysis",
      desc: "Real-time speech evaluation measuring pronunciation, fluency, and grammar range.",
      icon: Mic,
      route: "/mock/speaking",
      color: "#10b981",
      tag: "Speech Scoring",
    },
    {
      title: "Reading AI Diagnostic",
      category: "Comprehension",
      desc: "Passage breakdown, distractor analysis, and skimming speed optimization.",
      icon: BookOpen,
      route: "/mock/reading",
      color: "#3b82f6",
      tag: "Adaptive Test",
    },
    {
      title: "Listening AI Trainer",
      category: "Audio Practice",
      desc: "Accent-adaptive listening exercises with real-time transcript synchronization.",
      icon: Headphones,
      route: "/mock/listening",
      color: "#8b5cf6",
      tag: "CBT Audio",
    },
    {
      title: "AI Study Planner",
      category: "Smart Roadmap",
      desc: "Groq AI-powered weekly schedule tailored to your target band milestone.",
      icon: CalendarDays,
      route: "/planner",
      color: "#ec4899",
      tag: "Personalized",
    },
    {
      title: "Accent Lab",
      category: "Pronunciation",
      desc: "Phoneme-level accent training and syllable pitch practice for Speaking Part 1-3.",
      icon: Volume2,
      route: "/accent-lab",
      color: "#f43f5e",
      tag: "Phoneme AI",
    },
    {
      title: "Audio Generator",
      category: "Audio Studio",
      desc: "Generate custom IELTS listening passages with multi-speaker accent synthesis.",
      icon: Sliders,
      route: "/audio-generator",
      color: "#6366f1",
      tag: "Custom Audio",
    },
    {
      title: "Performance Analytics",
      category: "Deep Metrics",
      desc: "Subscore diagnostics, historical trends, and goal progression tracking.",
      icon: BarChart3,
      route: "/insights",
      color: "#14b8a6",
      tag: "Subscore Radar",
    },
  ];

  return (
    <div className="ai-page">
      <div className="ai-container">
        {/* ── HERO BANNER ───────────────────────────────────────── */}
        <motion.section
          className="ai-hero-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="ai-hero-left">
            <div className="ai-pill">
              <Sparkles size={14} /> GROQ 70B AI SCORING ENGINE ACTIVE
            </div>
            <h1 className="ai-hero-title">
              AI Intelligence Studio
            </h1>
            <p className="ai-hero-sub">
              Welcome back, <strong>{firstName}</strong>. Your AI mentor is ready to evaluate your practice, analyze subscores, and accelerate your path to Band 8.0+.
            </p>
            <div className="ai-hero-actions">
              <button
                className="ai-btn-primary"
                onClick={() => navigate("/ai-assistant")}
              >
                <Bot size={18} /> Launch AI Coach <ArrowRight size={16} />
              </button>
              <button
                className="ai-btn-secondary"
                onClick={() => navigate("/planner")}
              >
                <CalendarDays size={18} /> View AI Study Plan
              </button>
            </div>
          </div>

          {/* AI Metrics Badge */}
          <div className="ai-hero-metrics">
            <div className="ai-metric-item">
              <div className="ai-metric-icon" style={{ background: "rgba(37,99,235,0.12)", color: "#2563eb" }}>
                <BrainCircuit size={24} />
              </div>
              <div>
                <div className="ai-metric-val">Band {band}</div>
                <div className="ai-metric-lbl">Predicted Band</div>
              </div>
            </div>

            <div className="ai-metric-item">
              <div className="ai-metric-icon" style={{ background: "rgba(16,185,129,0.12)", color: "#10b981" }}>
                <Activity size={24} />
              </div>
              <div>
                <div className="ai-metric-val">{confidence}%</div>
                <div className="ai-metric-lbl">AI Confidence</div>
              </div>
            </div>

            <div className="ai-metric-item">
              <div className="ai-metric-icon" style={{ background: "rgba(245,158,11,0.12)", color: "#f59e0b" }}>
                <Target size={24} />
              </div>
              <div>
                <div className="ai-metric-val">{weakSkill}</div>
                <div className="ai-metric-lbl">Focus Skill</div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* ── RECOMMENDED AI ACTION BANNER ──────────────────────── */}
        <motion.div
          className="ai-focus-banner"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="ai-focus-left">
            <div className="ai-focus-icon">
              <Zap size={22} color="#f59e0b" />
            </div>
            <div>
              <div className="ai-focus-title">
                Today's Recommended Priority: Focus on {weakSkill}
              </div>
              <div className="ai-focus-desc">
                Based on your last {totalTests} test evaluations, practicing {weakSkill} will yield your highest band score increase (+0.5 Band).
              </div>
            </div>
          </div>
          <button
            className="ai-focus-btn"
            onClick={() => navigate(weakSkill === "Writing" ? "/mock/writing" : weakSkill === "Speaking" ? "/mock/speaking" : weakSkill === "Reading" ? "/mock/reading" : "/mock/listening")}
          >
            Start {weakSkill} Practice →
          </button>
        </motion.div>

        {/* ── AI SUITE GRID (BROWSING FRIENDLY) ─────────────────── */}
        <section className="ai-grid-section">
          <div className="ai-section-header">
            <div>
              <h2 className="ai-section-title">Explore AI Power Tools</h2>
              <p className="ai-section-sub">Select any AI module below for instant evaluation, diagnostic feedback, or interactive coaching.</p>
            </div>
            <div className="ai-suite-badge">
              <ShieldCheck size={14} /> 9 AI Modules Available
            </div>
          </div>

          <div className="ai-tools-grid">
            {aiSuite.map((t, idx) => {
              const Icon = t.icon;
              return (
                <motion.div
                  key={t.title}
                  className="ai-tool-card"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: idx * 0.05 }}
                  whileHover={{ y: -6 }}
                  onClick={() => navigate(t.route)}
                >
                  <div className="ai-tool-top">
                    <div
                      className="ai-tool-icon"
                      style={{ background: `${t.color}15`, border: `1px solid ${t.color}30`, color: t.color }}
                    >
                      <Icon size={24} />
                    </div>
                    <span className="ai-tool-tag" style={{ background: `${t.color}12`, color: t.color }}>
                      {t.tag}
                    </span>
                  </div>

                  <div className="ai-tool-category">{t.category}</div>
                  <h3 className="ai-tool-title">{t.title}</h3>
                  <p className="ai-tool-desc">{t.desc}</p>

                  <div className="ai-tool-action" style={{ color: t.color }}>
                    <span>Launch Module</span> <ArrowRight size={16} />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* ── QUICK STATS STRIP ────────────────────────────────── */}
        <section className="ai-stats-strip">
          <div className="ai-stat-box">
            <Award size={24} color="#2563eb" />
            <div>
              <div className="ai-stat-val">{totalTests}</div>
              <div className="ai-stat-lbl">Evaluations Completed</div>
            </div>
          </div>

          <div className="ai-stat-box">
            <Flame size={24} color="#f97316" />
            <div>
              <div className="ai-stat-val">{streak} Days</div>
              <div className="ai-stat-lbl">Active Streak</div>
            </div>
          </div>

          <div className="ai-stat-box">
            <CheckCircle2 size={24} color="#10b981" />
            <div>
              <div className="ai-stat-val">Band {band}</div>
              <div className="ai-stat-lbl">Average Score</div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}