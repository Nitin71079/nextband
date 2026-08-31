import { Link } from "react-router-dom";
import { motion } from "framer-motion";

import {
  ArrowRight,
  Award,
  BrainCircuit,
  ChevronRight,
  Clock3,
  Flame,
  Sparkles,
  Star,
  Target,
  TrendingUp,
} from "lucide-react";
import FloatingDanglerPill from "../FloatingDanglerPill";

export default function DashboardHero({
  firstName,
  analytics = {},
  memory = {},
}) {

  /* ---------------- Greeting ---------------- */

  const hour = new Date().getHours();

  const greeting =
    hour < 12
      ? "Good Morning"
      : hour < 17
      ? "Good Afternoon"
      : "Good Evening";

  /* ---------------- Analytics ---------------- */

  const streak =
    analytics.studyStreak ?? 18;

  const estimatedBand =
    analytics.averageBand ?? 7.5;

  const weeklyGoal =
    analytics.weeklyProgress ?? 82;

  const testsCompleted =
    analytics.testsCompleted ?? 34;

  /* ---------------- User Memory ---------------- */

  const targetBand =
    memory?.profile?.targetBand ?? 8;

  const continuePath =
    memory?.progress?.lastModule ??
    "/listening";

  const remainingBand = (targetBand - estimatedBand).toFixed(1);

  const stats = [
    {
      icon: Flame,
      value: streak,
      label: "Day Streak",
      color: "orange",
    },
    {
      icon: TrendingUp,
      value: estimatedBand,
      label: "Predicted Band",
      color: "blue",
    },
    {
      icon: Target,
      value: `${weeklyGoal}%`,
      label: "Weekly Goal",
      color: "green",
    },
    {
      icon: Award,
      value: testsCompleted,
      label: "Tests Completed",
      color: "purple",
    },
  ];

  return (
    <motion.section
      className="dashboard-hero"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      style={{ background: "rgba(30,41,59,0.7)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 28, padding: 36, backdropFilter: "blur(12px)", marginBottom: 36 }}
    >

      <div className="hero-glow" />

      <div className="dashboard-hero-content" style={{ display: "grid", gridTemplateColumns: "1.2fr 0.8fr", gap: 32, alignItems: "center", marginBottom: 32 }}>

        {/* ================= LEFT ================= */}
        <motion.div
          className="dashboard-hero-left"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.15 }}
        >
          <div className="hero-badge" style={{ background: "rgba(139,92,246,0.2)", border: "1px solid rgba(168,85,247,0.3)", color: "#c084fc", display: "inline-flex", alignItems: "center", gap: 8, padding: "6px 16px", borderRadius: 999, fontWeight: 800, fontSize: 13 }}>
            <Sparkles size={15} color="#c084fc" />
            <span>AI-POWERED PREPARATION ENGINE (2026 SPECS)</span>
          </div>

          <h1 style={{ fontSize: "clamp(2rem, 3.5vw, 3rem)", fontWeight: 900, marginTop: 16, marginBottom: 12, lineHeight: 1.1, background: "linear-gradient(135deg, #ffffff 40%, #c084fc 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            {greeting}, <span>{firstName}</span>
          </h1>

          <p style={{ color: "#cbd5e1", fontSize: 16, lineHeight: 1.6, marginBottom: 24, maxWidth: 520 }}>
            You're only <strong style={{ color: "#facc15" }}>{remainingBand} band</strong> away from achieving your target of <strong style={{ color: "#38bdf8" }}>Band {targetBand}</strong>. Realize your potential with Groq AI Llama 3.3 scoring.
          </p>

          <div className="hero-buttons" style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
            <Link
              to={continuePath}
              className="hero-primary"
              style={{ background: "linear-gradient(135deg, #7c3aed, #4c1d95)", color: "#ffffff", padding: "14px 28px", borderRadius: 14, fontWeight: 800, textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 8, boxShadow: "0 8px 25px rgba(124,58,237,0.4)" }}
            >
              Continue Learning <ArrowRight size={18} />
            </Link>

            <Link
              to="/insights"
              style={{ background: "rgba(255,255,255,0.08)", color: "#ffffff", border: "1px solid rgba(255,255,255,0.2)", padding: "14px 24px", borderRadius: 14, fontWeight: 800, textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 8 }}
            >
              <BrainCircuit size={18} color="#38bdf8" /> AI Diagnostics
            </Link>
          </div>
        </motion.div>

        {/* ================= RIGHT: 3D GRAPHIC DISPLAY ================= */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          style={{ position: "relative", textAlign: "center", display: "inline-block" }}
        >
          {/* Decorative Floating Glass Danglers */}
          <FloatingDanglerPill
            icon={TrendingUp}
            value="+15 Pts"
            label="Predicted Growth"
            variant="light"
            iconBg="rgba(124, 58, 237, 0.12)"
            iconColor="#7c3aed"
            floatDelay={0}
            style={{ position: "absolute", top: -10, right: -15 }}
          />

          <FloatingDanglerPill
            icon={Star}
            value="98%"
            label="Candidate Pass Rate"
            variant="light"
            iconBg="rgba(56, 189, 248, 0.15)"
            iconColor="#0284c7"
            floatDelay={1.5}
            style={{ position: "absolute", bottom: 20, left: -15 }}
          />

          <img
            src="/src/assets/images/dashboard_ai_hero.png"
            alt="3D AI Exam Dashboard Graphic"
            style={{ width: "100%", maxWidth: 420, borderRadius: 24, filter: "drop-shadow(0 15px 35px rgba(124, 58, 237, 0.4))", border: "1px solid rgba(255,255,255,0.15)" }}
          />
        </motion.div>

      </div>

      {/* ================= STATS BAR ================= */}
      <div className="hero-stats" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 16 }}>
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              className={`stat-card stat-${stat.color}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + idx * 0.05 }}
              style={{ background: "rgba(15,23,42,0.6)", border: "1px solid rgba(255,255,255,0.08)", padding: 18, borderRadius: 18, display: "flex", alignItems: "center", gap: 14 }}
            >
              <div className="stat-icon" style={{ width: 44, height: 44, borderRadius: 14, background: "rgba(255,255,255,0.08)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Icon size={22} color={stat.color === "orange" ? "#fb923c" : stat.color === "blue" ? "#38bdf8" : stat.color === "green" ? "#4ade80" : "#c084fc"} />
              </div>
              <div className="stat-info">
                <div className="stat-value" style={{ fontSize: 20, fontWeight: 900, color: "#ffffff" }}>{stat.value}</div>
                <div className="stat-label" style={{ fontSize: 12, color: "#94a3b8", fontWeight: 700 }}>{stat.label}</div>
              </div>
            </motion.div>
          );
        })}
      </div>

    </motion.section>
  );
}