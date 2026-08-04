import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { saveGameResult } from "../services/gameStatsService";
import toast from "react-hot-toast";
import {
  Sparkles,
  Flame,
  X,
  ArrowRight,
  Sun,
  Moon,
  Coffee,
  Trophy,
  HelpCircle,
  CheckCircle2,
  AlertCircle,
  Crown,
  Zap,
  Award
} from "lucide-react";

/* -------------------------------------------------------------
   DAILY IELTS RIDDLES DATASET
------------------------------------------------------------- */
const DAILY_RIDDLES = [
  {
    id: 1,
    category: "C1 Academic Vocabulary",
    question: "I am a high-scoring C1 IELTS vocabulary word meaning 'to make something better, improve, or enhance'. What am I?",
    options: [
      { text: "A) Exacerbate", isCorrect: false },
      { text: "B) Ameliorate", isCorrect: true },
      { text: "C) Stagnate", isCorrect: false },
      { text: "D) Relinquish", isCorrect: false },
    ],
    explanation: "'Ameliorate' means to make a bad or difficult situation better (e.g. 'Government policies helped ameliorate poverty').",
  },
  {
    id: 2,
    category: "Logic & Speaking Mindset",
    question: "The more of me you take in your IELTS preparation, the more you leave behind. What am I?",
    options: [
      { text: "A) Pauses & Hesitations", isCorrect: false },
      { text: "B) Footsteps", isCorrect: true },
      { text: "C) Spelling Errors", isCorrect: false },
      { text: "D) Cue Cards", isCorrect: false },
    ],
    explanation: "Footsteps! As you take more steps forward in your practice journey, you leave more steps behind.",
  },
  {
    id: 3,
    category: "Pronunciation & Phonetics",
    question: "I speak without a mouth and hear without ears. I have no body, but I come alive with your voice in Speaking. What am I?",
    options: [
      { text: "A) A Thought", isCorrect: false },
      { text: "B) An Echo", isCorrect: true },
      { text: "C) A Dictation", isCorrect: false },
      { text: "D) A Shadow", isCorrect: false },
    ],
    explanation: "An Echo! It responds with your own voice.",
  },
];

export function getTimeBasedGreeting() {
  const hour = new Date().getHours();
  if (hour >= 5 && hour < 12) return { greeting: "Good morning", subtext: "Ready to start your day with a focused IELTS session? ☀️" };
  if (hour >= 12 && hour < 17) return { greeting: "Good afternoon", subtext: "Great to see you! Let's boost your band score today. 🚀" };
  if (hour >= 17 && hour < 22) return { greeting: "Good evening", subtext: "Unwind with practice. Every session brings you closer to your goal! 🎯" };
  return { greeting: "Late night study?", subtext: "Working hard towards your dream band score. Keep it up! 🌌" };
}

export default function WelcomeGreeting() {
  const { user, name, loading } = useAuth();
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);
  const [selectedRiddle, setSelectedRiddle] = useState(DAILY_RIDDLES[0]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [hasAnswered, setHasAnswered] = useState(false);
  const [earnedEXP, setEarnedEXP] = useState(0);

  useEffect(() => {
    if (loading || !user) return;

    const justLoggedIn = sessionStorage.getItem("justLoggedIn");
    if (justLoggedIn === "true") {
      sessionStorage.removeItem("justLoggedIn");

      // Pick a random riddle
      const randomRiddle = DAILY_RIDDLES[Math.floor(Math.random() * DAILY_RIDDLES.length)];
      setSelectedRiddle(randomRiddle);

      // Open full page modal
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 300);

      return () => clearTimeout(timer);
    }
  }, [user, name, loading]);

  const handleSelectOption = (option) => {
    if (hasAnswered) return;

    setSelectedOption(option);
    setHasAnswered(true);

    const expAmount = option.isCorrect ? 100 : 25;
    setEarnedEXP(expAmount);

    // Persist EXP to localStorage & Firestore
    const currentEXP = Number(localStorage.getItem("userEXP") || 0);
    localStorage.setItem("userEXP", currentEXP + expAmount);

    if (user?.uid) {
      saveGameResult(user.uid, "riddle-challenge", option.isCorrect ? "win" : "tie");
    }

    if (option.isCorrect) {
      toast.success(`🎉 Correct! +100 Leaderboard EXP Added to Your Rank!`);
    } else {
      toast(`+25 EXP Awarded for Participating! Keep Going!`, { icon: "⭐" });
    }
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  if (!isOpen) return null;

  const displayName = name || user?.displayName || user?.email?.split("@")[0] || "Candidate";
  const { greeting, subtext } = getTimeBasedGreeting();

  return (
    <div style={{
      position: "fixed",
      inset: 0,
      zIndex: 1000,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "16px",
      background: "rgba(11, 14, 23, 0.85)",
      backdropFilter: "blur(12px)",
      overflowY: "auto",
    }}>
      {/* FULL-PAGE CENTER MODAL CONTAINER */}
      <div style={{
        maxWidth: 680,
        width: "100%",
        background: "linear-gradient(145deg, #172036, #121826, #0e1320)",
        border: "1px solid rgba(245, 158, 11, 0.4)",
        borderRadius: 32,
        padding: "36px 32px",
        boxShadow: "0 30px 80px rgba(0, 0, 0, 0.6), 0 0 40px rgba(245, 158, 11, 0.15)",
        position: "relative",
        color: "#ffffff",
        margin: "auto 0",
      }}>
        {/* Close Button */}
        <button
          onClick={handleClose}
          style={{
            position: "absolute",
            top: 20,
            right: 20,
            background: "rgba(255, 255, 255, 0.08)",
            border: "1px solid rgba(255, 255, 255, 0.12)",
            color: "#94a3b8",
            borderRadius: 14,
            width: 36,
            height: 36,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
          }}
        >
          <X size={18} />
        </button>

        {/* TOP HEADER */}
        <div style={{ textAlign: "center", marginBottom: 24 }}>
          <div style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            padding: "6px 16px",
            borderRadius: 999,
            background: "rgba(245, 158, 11, 0.12)",
            border: "1px solid rgba(245, 158, 11, 0.3)",
            color: "#fbbf24",
            fontSize: 12,
            fontWeight: 800,
            textTransform: "uppercase",
            letterSpacing: 0.5,
            marginBottom: 12,
          }}>
            <Crown size={15} style={{ color: "#f59e0b" }} />
            <span>Daily Welcome Challenge • Win +100 EXP</span>
          </div>

          <h2 style={{ fontSize: "clamp(1.6rem, 3.5vw, 2.2rem)", fontWeight: 900, color: "#ffffff", margin: 0, marginBottom: 6 }}>
            {greeting}, {displayName}! 👋
          </h2>

          <p style={{ fontSize: 14, color: "#94a3b8", margin: 0, maxWidth: 520, margin: "0 auto", lineHeight: 1.5 }}>
            {subtext} Solve today's IELTS challenge below to claim your Leaderboard points!
          </p>
        </div>

        {/* RIDDLE CARD */}
        <div style={{
          background: "rgba(15, 23, 42, 0.7)",
          border: "1px solid rgba(245, 158, 11, 0.25)",
          borderRadius: 24,
          padding: 24,
          marginBottom: 24,
        }}>
          <div style={{ display: "flex", alignItems: "center", justifyBetween: "space-between", marginBottom: 12 }}>
            <span style={{ fontSize: 11, fontWeight: 800, textTransform: "uppercase", color: "#fbbf24", letterSpacing: 0.5 }}>
              🧠 {selectedRiddle.category}
            </span>
            <span style={{ fontSize: 11, fontWeight: 700, color: "#64748b" }}>
              Reward: <strong style={{ color: "#fbbf24" }}>+100 EXP</strong>
            </span>
          </div>

          <h3 style={{ fontSize: 16, fontWeight: 800, color: "#f8fafc", lineHeight: 1.5, margin: 0, marginBottom: 18 }}>
            "{selectedRiddle.question}"
          </h3>

          {/* OPTIONS GRID */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 12 }}>
            {selectedRiddle.options.map((opt, i) => {
              const isSelected = selectedOption === opt;
              let bg = "rgba(30, 41, 59, 0.6)";
              let border = "1px solid rgba(255, 255, 255, 0.1)";
              let color = "#e2e8f0";

              if (hasAnswered) {
                if (opt.isCorrect) {
                  bg = "rgba(34, 197, 94, 0.2)";
                  border = "2px solid #22c55e";
                  color = "#4ade80";
                } else if (isSelected) {
                  bg = "rgba(239, 68, 68, 0.2)";
                  border = "2px solid #ef4444";
                  color = "#fca5a5";
                }
              }

              return (
                <button
                  key={i}
                  onClick={() => handleSelectOption(opt)}
                  disabled={hasAnswered}
                  style={{
                    padding: "14px 16px",
                    borderRadius: 16,
                    background: bg,
                    border: border,
                    color: color,
                    fontWeight: 700,
                    fontSize: 13,
                    textAlign: "left",
                    cursor: hasAnswered ? "default" : "pointer",
                    transition: "all 0.2s",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <span>{opt.text}</span>
                  {hasAnswered && opt.isCorrect && <CheckCircle2 size={18} style={{ color: "#22c55e" }} />}
                </button>
              );
            })}
          </div>

          {/* EXPLANATION AFTER ANSWERING */}
          {hasAnswered && (
            <div style={{
              marginTop: 18,
              padding: 14,
              borderRadius: 16,
              background: selectedOption.isCorrect ? "rgba(34, 197, 94, 0.12)" : "rgba(245, 158, 11, 0.12)",
              border: selectedOption.isCorrect ? "1px solid rgba(34, 197, 94, 0.3)" : "1px solid rgba(245, 158, 11, 0.3)",
              fontSize: 13,
              lineHeight: 1.5,
            }}>
              <div style={{ fontWeight: 800, color: selectedOption.isCorrect ? "#4ade80" : "#fbbf24", marginBottom: 2 }}>
                {selectedOption.isCorrect ? "🎉 Excellent Job! +100 EXP Claimed!" : `⭐ Nice Effort! +${earnedEXP} EXP Earned!`}
              </div>
              <div style={{ color: "#cbd5e1" }}>{selectedRiddle.explanation}</div>
            </div>
          )}
        </div>

        {/* FOOTER CTA */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: "#94a3b8" }}>
            <Trophy size={16} style={{ color: "#fbbf24" }} />
            <span>Leaderboard Points: <strong style={{ color: "#fbbf24" }}>+{earnedEXP} EXP</strong></span>
          </div>

          <button
            onClick={handleClose}
            style={{
              padding: "14px 28px",
              borderRadius: 18,
              background: "linear-gradient(135deg, #f59e0b, #d97706)",
              color: "#0f172a",
              border: "none",
              fontWeight: 900,
              fontSize: 14,
              cursor: "pointer",
              boxShadow: "0 10px 25px rgba(245, 158, 11, 0.3)",
              display: "flex",
              alignItems: "center",
              gap: 8,
            }}
          >
            Enter Dashboard & Practice <ArrowRight size={16} />
          </button>
        </div>

      </div>
    </div>
  );
}
