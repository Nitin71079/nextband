import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "../../context/AuthContext";
import { useExam } from "../../context/ExamContext";
import {
  ArrowRight, Sparkles, BrainCircuit, Trophy, TrendingUp,
  Users, PlayCircle, ShieldCheck, BookOpen, Mic, BarChart3,
  Star, CheckCircle2, Zap, Target, Layers, Crown, Flame
} from "lucide-react";
import AudioWaveformVisualizer from "../audio/AudioWaveformVisualizer";
import FloatingDanglerPill from "../FloatingDanglerPill";
import "./Hero.css";

export default function Hero() {
  const { user } = useAuth();
  const { activeTrack } = useExam();

  const dashboardStats = [
    { title: "Study Streak", value: "18 Days 🔥", change: "+3 this week", color: "orange" },
    { title: "Predicted Score", value: activeTrack === "DET" ? "135 DET" : "7.5 Band", change: "+0.5 Band", color: "blue" },
    { title: "Weekly Accuracy", value: "94%", change: "18 / 20 Mocks", color: "green" },
  ];

  const features = [
    { icon: BookOpen, text: "IELTS & DET CBT Mocks" },
    { icon: Mic, text: "AI Voice Evaluation" },
    { icon: BrainCircuit, text: "Groq Llama 3.3 Scoring" },
    { icon: BarChart3, text: "IRT Subscore Analytics" },
  ];

  return (
    <motion.section className="hero" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.7 }}>
      {/* Dynamic Glowing Ambient Spotlights */}
      <div className="hero-grid" />
      <div className="hero-bg-gradient" />
      <div className="hero-glow hero-glow-1" />
      <div className="hero-glow hero-glow-2" />
      <div className="hero-noise" />

      <div className="hero-container">
        {/* ── LEFT COLUMN ── */}
        <motion.div className="hero-left" initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>

          <motion.div className="hero-badge" whileHover={{ scale: 1.04 }}>
            <Sparkles size={16} color="#facc15" />
            <span>🔥 NEXT-GEN AI EXAM SIMULATION PLATFORM</span>
          </motion.div>

          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} style={{ fontSize: "clamp(2.8rem, 5.5vw, 4.2rem)", fontWeight: 900, lineHeight: 1.08, letterSpacing: "-1px" }}>
            Master Your <br />
            <span style={{ background: "linear-gradient(135deg, #00f2fe 0%, #4facfe 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              Target Exam Score
            </span> <br />
            Faster With <span style={{ background: "linear-gradient(135deg, #c084fc 0%, #e879f9 50%, #38bdf8 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Groq AI Intelligence</span>
          </motion.h1>

          <motion.p className="hero-description" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.45 }} style={{ fontSize: "1.2rem", color: "#cbd5e1", lineHeight: 1.6, maxWidth: 620 }}>
            Experience 100% official computer-based simulations, instant 2PL IRT ability adaptation, real-time voice spectrogram scoring, and 7-day study plans for IELTS, DET, TOEFL, GRE, CAT, GMAT, SAT, and ACT.
          </motion.p>

          <motion.div className="hero-buttons" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.55 }} style={{ display: "flex", gap: 16, flexWrap: "wrap", margin: "10px 0 20px" }}>
            <Link to={user ? (activeTrack === "DET" ? "/duolingo" : (activeTrack === "TOEFL" ? "/toefl" : (activeTrack === "PTE" ? "/pte" : (activeTrack === "GRE" ? "/gre" : (activeTrack === "CAT" ? "/cat" : (activeTrack === "ACT" ? "/act" : (activeTrack === "SAT" ? "/sat" : (activeTrack === "GMAT" ? "/gmat" : "/dashboard")))))))) : "/register"}>
              <motion.button className="hero-primary-btn" whileHover={{ scale: 1.05, y: -3 }} whileTap={{ scale: 0.97 }} style={{ background: "linear-gradient(135deg, #0284c7 0%, #7c3aed 100%)", boxShadow: "0 10px 35px rgba(2,132,199,0.45)", borderRadius: 18, padding: "16px 32px", fontSize: 16, fontWeight: 900, border: "1px solid rgba(255,255,255,0.3)" }}>
                <Zap size={20} fill="#ffffff" />
                {user ? `Launch ${activeTrack} Prep Engine` : "Start Free Simulation"}
                <ArrowRight size={20} />
              </motion.button>
            </Link>
            <Link to="/pricing">
              <motion.button className="hero-secondary-btn" whileHover={{ scale: 1.05, y: -3 }} whileTap={{ scale: 0.97 }} style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.18)", borderRadius: 18, padding: "16px 28px", fontSize: 16, fontWeight: 800, color: "#ffffff" }}>
                <Crown size={18} color="#facc15" /> View All Plans
              </motion.button>
            </Link>
          </motion.div>

          {/* Feature Chips */}
          <motion.div className="hero-feature-list" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }}>
            {features.map((f) => {
              const Icon = f.icon;
              return (
                <div key={f.text} className="hero-feature-chip">
                  <Icon size={16} color="#38bdf8" />
                  <span>{f.text}</span>
                </div>
              );
            })}
          </motion.div>

          <motion.div className="hero-trust" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}>
            <Users size={18} color="#22c55e" />
            <span>
              <strong>10,000+ Candidates</strong> preparing for top global universities with Knarrow AI.
            </span>
          </motion.div>
        </motion.div>

        {/* ── RIGHT COLUMN: INTERACTIVE GLASS COCKPIT CARD ── */}
        <motion.div className="hero-right" initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}>
          <div className="hero-dashboard" style={{ background: "linear-gradient(135deg, rgba(15,23,42,0.9), rgba(30,41,59,0.85))", border: "2px solid rgba(56,189,248,0.3)", borderRadius: 32, padding: 32, boxShadow: "0 25px 70px rgba(0,0,0,0.5)", position: "relative" }}>
            
            {/* Top Bar */}
            <div className="dashboard-top" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
              <div>
                <span style={{ fontSize: 11, fontWeight: 900, color: "#38bdf8", textTransform: "uppercase", letterSpacing: 1 }}>GROQ AI REAL-TIME COCKPIT</span>
                <h3 style={{ fontSize: 22, fontWeight: 900, color: "#ffffff", margin: "4px 0 0 0" }}>Adaptive Readiness Engine</h3>
              </div>
              <motion.div className="band-chip" whileHover={{ scale: 1.05 }} style={{ background: "linear-gradient(135deg, #0284c7, #7c3aed)", color: "#ffffff", padding: "6px 16px", borderRadius: 999, fontWeight: 900, fontSize: 13, boxShadow: "0 4px 15px rgba(2,132,199,0.4)" }}>
                {activeTrack === "DET" ? "🦉 DET 135/160" : "⭐ Band 7.5 Target"}
              </motion.div>
            </div>

            {/* Audio Spectrogram Canvas */}
            <div style={{ marginBottom: 20 }}>
              <AudioWaveformVisualizer isRecording={true} color="#38bdf8" />
            </div>

            {/* Dashboard Stats Cards */}
            <div className="dashboard-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12, marginBottom: 20 }}>
              {dashboardStats.map((item, i) => (
                <motion.div key={item.title} className={`dashboard-stat-card ${item.color}`}
                  initial={{ opacity: 0, y: 25 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.2 + i * 0.1 }} whileHover={{ y: -6, scale: 1.02 }}
                  style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 16, padding: 14, textAlign: "center" }}
                >
                  <div style={{ fontSize: 11, color: "#94a3b8", fontWeight: 700 }}>{item.title}</div>
                  <h2 style={{ fontSize: 18, fontWeight: 900, color: "#ffffff", margin: "4px 0" }}>{item.value}</h2>
                  <small style={{ fontSize: 10, color: "#22c55e", fontWeight: 800 }}>{item.change}</small>
                </motion.div>
              ))}
            </div>

            {/* AI Recommendation Ticker */}
            <motion.div className="dashboard-ai-card" initial={{ opacity: 0, y: 25 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.9 }} style={{ background: "rgba(56,189,248,0.1)", border: "1px solid rgba(56,189,248,0.25)", borderRadius: 20, padding: 18 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, color: "#38bdf8", fontSize: 12, fontWeight: 900 }}>
                <BrainCircuit size={18} />
                <span>GROQ AI LLAMA 3.3 DIAGNOSTIC RECOMMENDATION</span>
              </div>
              <h3 style={{ fontSize: 15, fontWeight: 900, color: "#ffffff", margin: "8px 0 4px 0" }}>Complete 1 Adaptive Mock Form Today</h3>
              <p style={{ fontSize: 12, color: "#cbd5e1", margin: 0, lineHeight: 1.5 }}>
                Your Literacy &amp; IRT ability parameters indicate high growth potential for +0.5 Band score jump.
              </p>
            </motion.div>

          </div>

          {/* Floating Glass Dangler Pills */}
          <FloatingDanglerPill
            icon={TrendingUp}
            value="+0.5 Band"
            label="Predicted Growth"
            variant="dark"
            iconBg="rgba(34,197,94,0.2)"
            iconColor="#22c55e"
            floatDelay={0}
            style={{ position: "absolute", top: -20, right: -20 }}
          />

          <FloatingDanglerPill
            icon={Flame}
            value="18 Days 🔥"
            label="Active Streak"
            variant="dark"
            iconBg="rgba(245,158,11,0.2)"
            iconColor="#f59e0b"
            floatDelay={2}
            style={{ position: "absolute", bottom: -20, left: -20 }}
          />

        </motion.div>
      </div>
    </motion.section>
  );
}
