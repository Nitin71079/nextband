import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, useLocation } from "react-router-dom";
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
  const location = useLocation();

  const [isOpen, setIsOpen] = useState(false);
  const [selectedRiddle, setSelectedRiddle] = useState(DAILY_RIDDLES[0]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [hasAnswered, setHasAnswered] = useState(false);
  const [earnedEXP, setEarnedEXP] = useState(0);

  const isExamRoute =
    location.pathname.includes("/mock") ||
    location.pathname.includes("/cbt-exam") ||
    location.pathname.includes("/full-mocks");

  useEffect(() => {
    if (loading || !user || isExamRoute) return;

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
  }, [user, name, loading, isExamRoute]);

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

  if (!isOpen || isExamRoute) return null;

  const displayName = name || user?.displayName || user?.email?.split("@")[0] || "Candidate";
  const { greeting, subtext } = getTimeBasedGreeting();

  return (
    <div style={{
      position: "fixed",
      top: "68px",
      right: "16px",
      zIndex: 99999,
      width: "360px",
      maxWidth: "calc(100vw - 24px)",
    }}>
      {/* TOP ARROW POINTER POINTING TO PROFILE ICON */}
      <div style={{
        position: "absolute",
        top: "-8px",
        right: "24px",
        width: 0,
        height: 0,
        borderLeft: "8px solid transparent",
        borderRight: "8px solid transparent",
        borderBottom: "8px solid #f59e0b",
        zIndex: 2,
      }} />

      {/* POPOVER CARD CONTAINER */}
      <div style={{
        background: "linear-gradient(145deg, #172036, #121826, #0e1320)",
        border: "1.5px solid #f59e0b",
        borderRadius: 18,
        padding: "16px 14px",
        boxShadow: "0 15px 40px rgba(0, 0, 0, 0.6), 0 0 20px rgba(245, 158, 11, 0.15)",
        position: "relative",
        color: "#ffffff",
      }}>
        {/* Close Button */}
        <button
          onClick={handleClose}
          style={{
            position: "absolute",
            top: 12,
            right: 12,
            background: "rgba(255, 255, 255, 0.08)",
            border: "1px solid rgba(255, 255, 255, 0.12)",
            color: "#94a3b8",
            borderRadius: 10,
            width: 28,
            height: 28,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
          }}
        >
          <X size={14} />
        </button>

        {/* TOP HEADER */}
        <div style={{ textAlign: "left", marginBottom: 12, paddingRight: 28 }}>
          <div style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            padding: "3px 10px",
            borderRadius: 999,
            background: "rgba(245, 158, 11, 0.12)",
            border: "1px solid rgba(245, 158, 11, 0.3)",
            color: "#fbbf24",
            fontSize: 10,
            fontWeight: 800,
            textTransform: "uppercase",
            letterSpacing: 0.5,
            marginBottom: 6,
          }}>
            <Crown size={12} style={{ color: "#f59e0b" }} />
            <span>Daily Challenge • +100 EXP</span>
          </div>

          <h2 style={{ fontSize: "16px", fontWeight: 800, color: "#ffffff", margin: 0, marginBottom: 4 }}>
            {greeting}, {displayName}! 👋
          </h2>

          <p style={{ fontSize: 11, color: "#94a3b8", margin: 0, lineHeight: 1.4 }}>
            {subtext}
          </p>
        </div>

        {/* RIDDLE CARD */}
        <div style={{
          background: "rgba(15, 23, 42, 0.7)",
          border: "1px solid rgba(245, 158, 11, 0.25)",
          borderRadius: 14,
          padding: 12,
          marginBottom: 12,
        }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
            <span style={{ fontSize: 10, fontWeight: 800, textTransform: "uppercase", color: "#fbbf24", letterSpacing: 0.5 }}>
              🧠 {selectedRiddle.category}
            </span>
            <span style={{ fontSize: 10, fontWeight: 700, color: "#94a3b8" }}>
              Reward: <strong style={{ color: "#fbbf24" }}>+100 EXP</strong>
            </span>
          </div>

          <h3 style={{ fontSize: 12, fontWeight: 700, color: "#f8fafc", lineHeight: 1.4, margin: 0, marginBottom: 10 }}>
            "{selectedRiddle.question}"
          </h3>

          {/* OPTIONS LIST */}
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            {selectedRiddle.options.map((opt, i) => {
              const isSelected = selectedOption === opt;
              let bg = "rgba(30, 41, 59, 0.6)";
              let border = "1px solid rgba(255, 255, 255, 0.1)";
              let color = "#e2e8f0";

              if (hasAnswered) {
                if (opt.isCorrect) {
                  bg = "rgba(34, 197, 94, 0.2)";
                  border = "1.5px solid #22c55e";
                  color = "#4ade80";
                } else if (isSelected) {
                  bg = "rgba(239, 68, 68, 0.2)";
                  border = "1.5px solid #ef4444";
                  color = "#fca5a5";
                }
              }

              return (
                <button
                  key={i}
                  onClick={() => handleSelectOption(opt)}
                  disabled={hasAnswered}
                  style={{
                    padding: "8px 10px",
                    borderRadius: 10,
                    background: bg,
                    border: border,
                    color: color,
                    fontWeight: 600,
                    fontSize: 11,
                    textAlign: "left",
                    cursor: hasAnswered ? "default" : "pointer",
                    transition: "all 0.15s",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <span>{opt.text}</span>
                  {hasAnswered && opt.isCorrect && <CheckCircle2 size={14} style={{ color: "#22c55e" }} />}
                </button>
              );
            })}
          </div>

          {/* EXPLANATION AFTER ANSWERING */}
          {hasAnswered && (
            <div style={{
              marginTop: 10,
              padding: 10,
              borderRadius: 10,
              background: selectedOption.isCorrect ? "rgba(34, 197, 94, 0.12)" : "rgba(245, 158, 11, 0.12)",
              border: selectedOption.isCorrect ? "1px solid rgba(34, 197, 94, 0.3)" : "1px solid rgba(245, 158, 11, 0.3)",
              fontSize: 11,
              lineHeight: 1.4,
            }}>
              <div style={{ fontWeight: 800, color: selectedOption.isCorrect ? "#4ade80" : "#fbbf24", marginBottom: 2 }}>
                {selectedOption.isCorrect ? "🎉 Correct! +100 EXP Claimed!" : `⭐ +${earnedEXP} EXP Earned!`}
              </div>
              <div style={{ color: "#cbd5e1" }}>{selectedRiddle.explanation}</div>
            </div>
          )}
        </div>

        {/* FOOTER CTA */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 11, color: "#94a3b8" }}>
            <Trophy size={14} style={{ color: "#fbbf24" }} />
            <span>EXP: <strong style={{ color: "#fbbf24" }}>+{earnedEXP}</strong></span>
          </div>

          <button
            onClick={handleClose}
            style={{
              padding: "8px 16px",
              borderRadius: 12,
              background: "linear-gradient(135deg, #f59e0b, #d97706)",
              color: "#0f172a",
              border: "none",
              fontWeight: 800,
              fontSize: 12,
              cursor: "pointer",
              boxShadow: "0 6px 15px rgba(245, 158, 11, 0.3)",
              display: "flex",
              alignItems: "center",
              gap: 6,
            }}
          >
            Continue <ArrowRight size={14} />
          </button>
        </div>

      </div>
    </div>
  );
}
