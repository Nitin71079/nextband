import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "../../context/AuthContext";
import { useExam } from "../../context/ExamContext";
import {
  ArrowRight, Sparkles, BrainCircuit, Trophy, TrendingUp,
  Users, PlayCircle, ShieldCheck, BookOpen, Mic, BarChart3,
  Star, CheckCircle2, Zap, Target, Layers
} from "lucide-react";
import "./Hero.css";

export default function Hero() {
  const { user } = useAuth();
  const { activeTrack } = useExam();

  const dashboardStats = [
    { title: "Study Streak", value: "18 Days", change: "+3 this week", color: "orange" },
    { title: "Predicted Score", value: activeTrack === "DET" ? "130 DET" : "7.5 Band", change: "+0.4", color: "blue" },
    { title: "Weekly Progress", value: "82%", change: "4 / 5 Tasks", color: "green" },
  ];

  const features = [
    { icon: BookOpen, text: "IELTS & DET CBT" },
    { icon: Mic, text: "AI Speaking" },
    { icon: BrainCircuit, text: "Groq AI Writing" },
    { icon: BarChart3, text: "Subscore Analytics" },
  ];

  return (
    <motion.section className="hero" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.7 }}>
      {/* Backgrounds */}
      <div className="hero-grid" />
      <div className="hero-bg-gradient" />
      <div className="hero-glow hero-glow-1" />
      <div className="hero-glow hero-glow-2" />
      <div className="hero-noise" />

      <div className="hero-container">
        {/* ── LEFT ── */}
        <motion.div className="hero-left" initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>

          <motion.div className="hero-badge" whileHover={{ scale: 1.03 }}>
            <Sparkles size={15} />
            <span>Multi-Exam AI Prep Platform — IELTS · DET · TOEFL · GRE · CAT</span>
          </motion.div>

          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            Master Your
            <span>Target Exam Score</span>
            Faster With
            <span className="gradient-text">Adaptive AI Intelligence</span>
          </motion.h1>

          <motion.p className="hero-description" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.45 }}>
            Experience realistic computer-based simulations, instant Groq AI scoring, personalized study planners, and subscore diagnostics for IELTS, DET, TOEFL, GRE, and CAT.
          </motion.p>

          <motion.div className="hero-buttons" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.55 }}>
            <Link to={user ? (activeTrack === "DET" ? "/duolingo" : "/dashboard") : "/register"}>
              <motion.button className="hero-primary-btn" whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.97 }}>
                <Zap size={18} />
                {user ? `Enter ${activeTrack} Prep` : "Start Free Practice"}
                <ArrowRight size={18} />
              </motion.button>
            </Link>
            <a href="#score-converter">
              <motion.button className="hero-secondary-btn" whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.97 }}>
                <PlayCircle size={18} />
                Explore Tracks
              </motion.button>
            </a>
          </motion.div>

          <motion.div className="hero-feature-list" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }}>
            {features.map((f) => {
              const Icon = f.icon;
              return (
                <div key={f.text} className="hero-feature-chip">
                  <Icon size={16} />
                  <span>{f.text}</span>
                </div>
              );
            })}
          </motion.div>

          <motion.div className="hero-trust" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}>
            <Users size={18} />
            <span>
              Join 10,000+ candidates preparing for their dream university admission scores with Knarrow AI.
            </span>
          </motion.div>
        </motion.div>

        {/* ── RIGHT ── */}
        <motion.div className="hero-right" initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}>
          <div className="hero-dashboard">
            <div className="dashboard-top">
              <div>
                <span>Knarrow AI Platform</span>
                <h3>Adaptive Progress Overview</h3>
              </div>
              <motion.div className="band-chip" whileHover={{ scale: 1.05 }}>
                {activeTrack === "DET" ? "🦉 DET 130/160" : "⭐ Band 7.5"}
              </motion.div>
            </div>

            <div className="dashboard-grid">
              {dashboardStats.map((item, i) => (
                <motion.div key={item.title} className={`dashboard-stat-card ${item.color}`}
                  initial={{ opacity: 0, y: 25 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.2 + i * 0.1 }} whileHover={{ y: -6, scale: 1.02 }}>
                  <div className="dashboard-stat-top">
                    <span>{item.title}</span>
                    <div className={`status-dot ${item.color}`} />
                  </div>
                  <h2>{item.value}</h2>
                  <small>{item.change}</small>
                </motion.div>
              ))}
            </div>

            <motion.div className="dashboard-chart" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.4 }}>
              <div className="chart-header">
                <span>Score Prediction Growth</span>
                <strong>+15 pts</strong>
              </div>
              <div className="chart-bars">
                {[{ h: "45%", d: 1.5 }, { h: "58%", d: 1.6 }, { h: "70%", d: 1.7 }, { h: "82%", d: 1.8, active: true }].map((b, i) => (
                  <motion.div key={i} className={`bar${b.active ? " active" : ""}`}
                    initial={{ height: 0 }} animate={{ height: b.h }} transition={{ delay: b.d }} />
                ))}
              </div>
            </motion.div>

            <motion.div className="dashboard-ai-card" initial={{ opacity: 0, y: 25 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.9 }} whileHover={{ y: -5 }}>
              <div className="dashboard-ai-top">
                <BrainCircuit size={22} />
                <span>AI Recommendation</span>
              </div>
              <h3>Complete 1 Adaptive Mock Today</h3>
              <p>Based on your performance analytics, your Literacy &amp; Production subscores have high growth potential this week.</p>
              <div className="dashboard-progress">
                <div className="dashboard-progress-header">
                  <span>Weekly Goal</span>
                  <strong>82%</strong>
                </div>
                <div className="dashboard-progress-bar">
                  <motion.div className="dashboard-progress-fill"
                    initial={{ width: 0 }} animate={{ width: "82%" }} transition={{ duration: 1.5 }} />
                </div>
              </div>
            </motion.div>
          </div>

          {/* Floating cards */}
          <motion.div className="floating-card floating-card-1"
            animate={{ y: [0, -12, 0], rotate: [0, 1, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}>
            <TrendingUp size={18} />
            <div><strong>+15 Pts</strong><span>Predicted Growth</span></div>
          </motion.div>

          <motion.div className="floating-card floating-card-2"
            animate={{ y: [0, 10, 0], rotate: [0, -1, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}>
            <Trophy size={18} />
            <div><strong>18 Days</strong><span>Current Streak</span></div>
          </motion.div>

          <motion.div className="floating-card floating-card-3"
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}>
            <Star size={18} />
            <div><strong>98%</strong><span>Candidate Pass Rate</span></div>
          </motion.div>

          <motion.div className="floating-card floating-card-4"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}>
            <CheckCircle2 size={18} />
            <div><strong>Groq AI</strong><span>Instant Evaluation</span></div>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
}
