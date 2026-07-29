import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "../../context/AuthContext";
import {
  ArrowRight, Sparkles, BrainCircuit, Trophy, TrendingUp,
  Users, PlayCircle, ShieldCheck, BookOpen, Mic, BarChart3,
  Star, CheckCircle2, Zap, Target,
} from "lucide-react";
import "./Hero.css";

export default function Hero() {
  const { user } = useAuth();

  const dashboardStats = [
    { title: "Study Streak", value: "18 Days", change: "+3 this week", color: "orange" },
    { title: "Predicted Band", value: "7.5", change: "+0.4", color: "blue" },
    { title: "Weekly Progress", value: "82%", change: "4 / 5 Tasks", color: "green" },
  ];

  const features = [
    { icon: BookOpen, text: "Real IELTS CBT" },
    { icon: Mic, text: "AI Speaking" },
    { icon: BrainCircuit, text: "AI Writing" },
    { icon: BarChart3, text: "Analytics" },
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
            <span>Premium AI-Powered IELTS Platform</span>
          </motion.div>

          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            Reach Your
            <span>Target IELTS Band</span>
            Faster With
            <span className="gradient-text">Smarter AI Learning</span>
          </motion.h1>

          <motion.p className="hero-description" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.45 }}>
            Master Reading, Listening, Writing and Speaking using realistic CBT simulations,
            AI-powered evaluation, personalized study plans and detailed performance
            analytics—all in one premium platform.
          </motion.p>

          <motion.div className="hero-buttons" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.55 }}>
            <Link to={user ? "/dashboard" : "/register"}>
              <motion.button className="hero-primary-btn" whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.97 }}>
                <Zap size={18} />
                {user ? "Go to Dashboard" : "Start Free Today"}
                <ArrowRight size={18} />
              </motion.button>
            </Link>
            <Link to="/pricing">
              <motion.button className="hero-secondary-btn" whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.97 }}>
                <PlayCircle size={18} />
                View Premium
              </motion.button>
            </Link>
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
              Join learners preparing for their dream IELTS score with AI-powered practice,
              detailed insights and realistic CBT simulations.
            </span>
          </motion.div>
        </motion.div>

        {/* ── RIGHT ── */}
        <motion.div className="hero-right" initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}>
          <div className="hero-dashboard">
            <div className="dashboard-top">
              <div>
                <span>Knarrow Dashboard</span>
                <h3>AI Progress Overview</h3>
              </div>
              <motion.div className="band-chip" whileHover={{ scale: 1.05 }}>⭐ Band 7.5</motion.div>
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
                <span>Band Prediction</span>
                <strong>+0.4</strong>
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
              <h3>Complete one Listening mock today</h3>
              <p>Based on your recent performance, your Listening score has the highest improvement potential this week.</p>
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

          {/* Floating danglers */}
          <motion.div className="floating-card floating-card-1"
            animate={{ y: [0, -12, 0], rotate: [0, 1, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}>
            <TrendingUp size={18} />
            <div><strong>+0.4</strong><span>Predicted Growth</span></div>
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
            <div><strong>96%</strong><span>Student Satisfaction</span></div>
          </motion.div>

          <motion.div className="floating-card floating-card-4"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}>
            <CheckCircle2 size={18} />
            <div><strong>AI Ready</strong><span>Instant Evaluation</span></div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div className="scroll-indicator" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.5 }}>
        <span>Scroll</span>
        <motion.div className="mouse" animate={{ y: [0, 8, 0] }} transition={{ duration: 1.8, repeat: Infinity }}>
          <motion.div className="wheel" animate={{ y: [0, 6, 0] }} transition={{ duration: 1.5, repeat: Infinity }} />
        </motion.div>
      </motion.div>
    </motion.section>
  );
}
