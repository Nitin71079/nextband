import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles, BrainCircuit, Gamepad2, Award, CalendarDays, ArrowRight,
  X, ChevronUp, Flame, Zap, Crown
} from "lucide-react";

const PROMOTIONS = [
  {
    id: "ai-eval",
    badge: "AI EVALUATION ENGINE",
    title: "⚡ Groq AI Real-Time Scoring",
    description: "Get instant Llama 3.3 rubric scoring for Essays & Spoken tasks across TOEFL, GRE, PTE & DET.",
    buttonText: "Try AI Diagnostics",
    path: "/insights",
    gradient: "linear-gradient(135deg, #7c3aed, #2563eb)",
    glowColor: "rgba(124, 58, 237, 0.4)",
    icon: BrainCircuit,
  },
  {
    id: "arcade",
    badge: "LIVE COMPETITION",
    title: "⚔️ Knarrow Arcade Duels",
    description: "Battle peers live in VocabBattle, BandBlitz & SpeakingShowdown to claim #1 on the Leaderboard!",
    buttonText: "Play Arcade",
    path: "/games",
    gradient: "linear-gradient(135deg, #d97706, #059669)",
    glowColor: "rgba(217, 119, 6, 0.4)",
    icon: Gamepad2,
  },
  {
    id: "100-mocks",
    badge: "100 FULL MOCKS",
    title: "🎯 100 Adaptive Test Suites",
    description: "Practice with 100 complete official-length mocks for TOEFL iBT, GRE General, PTE Academic & DET.",
    buttonText: "Explore Full Pass",
    path: "/pricing",
    gradient: "linear-gradient(135deg, #0284c7, #7c3aed)",
    glowColor: "rgba(2, 132, 199, 0.4)",
    icon: Award,
  },
  {
    id: "planner",
    badge: "SCORE BOOSTER",
    title: "📅 Personalized AI Planner",
    description: "Stay on track for Band 8.5+ or GRE 330+ with daily targeted drills and adaptive focus areas.",
    buttonText: "View Planner",
    path: "/planner",
    gradient: "linear-gradient(135deg, #db2777, #9333ea)",
    glowColor: "rgba(219, 39, 119, 0.4)",
    icon: CalendarDays,
  },
];

export default function PromotionalDangler() {
  const navigate = useNavigate();
  const location = useLocation();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isClosed, setIsClosed] = useState(false);

  // Auto-cycle through promotions every 8 seconds
  useEffect(() => {
    if (isMinimized || isClosed) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % PROMOTIONS.length);
    }, 8000);
    return () => clearInterval(interval);
  }, [isMinimized, isClosed]);

  // Do not render during active full test taking engines to avoid distraction
  const isTestEngineRoute =
    location.pathname.includes("/test/") ||
    location.pathname.includes("/mock/") ||
    location.pathname.includes("/exam/");

  if (isTestEngineRoute || isClosed) return null;

  const current = PROMOTIONS[currentIndex];
  const IconComp = current.icon;

  if (isMinimized) {
    return (
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0, opacity: 0 }}
        style={{
          position: "fixed",
          bottom: 24,
          right: 24,
          zIndex: 9990,
        }}
      >
        <button
          onClick={() => setIsMinimized(false)}
          style={{
            background: "linear-gradient(135deg, #7c3aed 0%, #2563eb 100%)",
            color: "#ffffff",
            border: "1px solid rgba(255,255,255,0.3)",
            borderRadius: 999,
            padding: "10px 18px",
            fontWeight: 800,
            fontSize: 13,
            cursor: "pointer",
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            boxShadow: "0 10px 25px rgba(124, 58, 237, 0.4)",
            backdropFilter: "blur(12px)",
          }}
        >
          <Sparkles size={16} color="#facc15" />
          <span>Knarrow Booster</span>
          <span
            style={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              background: "#4ade80",
              boxShadow: "0 0 8px #4ade80",
            }}
          />
        </button>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 40, scale: 0.95 }}
      transition={{ duration: 0.4, type: "spring", stiffness: 300, damping: 25 }}
      style={{
        position: "fixed",
        bottom: 24,
        right: 24,
        zIndex: 9990,
        maxWidth: 360,
        width: "calc(100vw - 48px)",
      }}
    >
      <div
        className="glossy-card"
        style={{
          background: "linear-gradient(135deg, rgba(15,23,42,0.92) 0%, rgba(30,41,59,0.95) 100%)",
          border: "1px solid rgba(255,255,255,0.2)",
          borderRadius: 24,
          padding: 20,
          boxShadow: `0 20px 40px rgba(0,0,0,0.5), 0 0 30px ${current.glowColor}`,
          backdropFilter: "blur(16px) saturate(180%)",
          color: "#ffffff",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Top Header & Controls */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
          <span
            style={{
              background: "rgba(255,255,255,0.1)",
              border: "1px solid rgba(255,255,255,0.2)",
              color: "#facc15",
              padding: "3px 10px",
              borderRadius: 999,
              fontSize: 10,
              fontWeight: 800,
              letterSpacing: 0.5,
              textTransform: "uppercase",
              display: "inline-flex",
              alignItems: "center",
              gap: 4,
            }}
          >
            <Sparkles size={11} color="#facc15" /> {current.badge}
          </span>

          <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
            <button
              onClick={() => setIsMinimized(true)}
              title="Minimize"
              style={{
                background: "rgba(255,255,255,0.08)",
                border: "none",
                color: "#94a3b8",
                borderRadius: 8,
                width: 24,
                height: 24,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
              }}
            >
              <ChevronUp size={14} />
            </button>
            <button
              onClick={() => setIsClosed(true)}
              title="Close"
              style={{
                background: "rgba(255,255,255,0.08)",
                border: "none",
                color: "#94a3b8",
                borderRadius: 8,
                width: 24,
                height: 24,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
              }}
            >
              <X size={14} />
            </button>
          </div>
        </div>

        {/* Content Body with Animated Transitions */}
        <AnimatePresence mode="wait">
          <motion.div
            key={current.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <div style={{ display: "flex", alignItems: "flex-start", gap: 14, marginBottom: 14 }}>
              <div
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 14,
                  background: current.gradient,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#ffffff",
                  boxShadow: `0 6px 16px ${current.glowColor}`,
                  flexShrink: 0,
                }}
              >
                <IconComp size={22} />
              </div>

              <div>
                <h4 style={{ fontSize: 16, fontWeight: 900, margin: "0 0 4px", color: "#ffffff" }}>
                  {current.title}
                </h4>
                <p style={{ fontSize: 13, color: "#cbd5e1", margin: 0, lineHeight: 1.4 }}>
                  {current.description}
                </p>
              </div>
            </div>

            {/* Action Button & Dots */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 14, paddingTop: 12, borderTop: "1px solid rgba(255,255,255,0.1)" }}>
              {/* Carousel Indicators */}
              <div style={{ display: "flex", gap: 5 }}>
                {PROMOTIONS.map((p, idx) => (
                  <span
                    key={p.id}
                    onClick={() => setCurrentIndex(idx)}
                    style={{
                      width: currentIndex === idx ? 16 : 6,
                      height: 6,
                      borderRadius: 999,
                      background: currentIndex === idx ? "#38bdf8" : "rgba(255,255,255,0.2)",
                      cursor: "pointer",
                      transition: "all 0.3s ease",
                    }}
                  />
                ))}
              </div>

              <button
                onClick={() => navigate(current.path)}
                style={{
                  background: current.gradient,
                  color: "#ffffff",
                  border: "1px solid rgba(255,255,255,0.3)",
                  borderRadius: 12,
                  padding: "8px 16px",
                  fontSize: 12,
                  fontWeight: 800,
                  cursor: "pointer",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 6,
                  boxShadow: `0 4px 14px ${current.glowColor}`,
                }}
              >
                {current.buttonText} <ArrowRight size={14} />
              </button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
