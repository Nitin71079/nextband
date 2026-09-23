import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Zap, Trophy, RefreshCw, ArrowLeft, Flame, ShieldAlert, Sparkles, HelpCircle } from "lucide-react";
import { saveGameResult } from "../services/gameStatsService";
import { useAuth } from "../context/AuthContext";

const SPEED_MATH_PROBLEMS = [
  {
    id: 1,
    level: "Easy",
    question: "What is 25% of 320?",
    options: ["60", "70", "80", "90"],
    answer: "80",
    shortcut: "25% is 1/4th. 320 / 4 = 80."
  },
  {
    id: 2,
    level: "Easy",
    question: "Evaluate: 14 × 5 + 30",
    options: ["90", "100", "110", "120"],
    answer: "100",
    explanation: "14 × 5 = 70. 70 + 30 = 100."
  },
  {
    id: 3,
    level: "Medium",
    question: "If 2ⁿ = 64, what is the value of n?",
    options: ["5", "6", "7", "8"],
    answer: "6",
    shortcut: "2¹=2, 2²=4, 2³=8, 2⁴=16, 2⁵=32, 2⁶=64. So n = 6."
  },
  {
    id: 4,
    level: "Medium",
    question: "What is the average of 14, 26, and 50?",
    options: ["28", "30", "32", "35"],
    answer: "30",
    shortcut: "Sum = 14 + 26 + 50 = 90. Average = 90 / 3 = 30."
  },
  {
    id: 5,
    level: "Medium",
    question: "If a right triangle has legs of length 6 and 8, what is the hypotenuse?",
    options: ["9", "10", "12", "14"],
    answer: "10",
    shortcut: "Pythagorean triple (3-4-5) scaled by 2: 6-8-10. c = √(6² + 8²) = √(36+64) = 10."
  },
  {
    id: 6,
    level: "Hard",
    question: "Solve for x: x² - 9 = 40",
    options: ["±5", "±6", "±7", "±8"],
    answer: "±7",
    shortcut: "x² = 49 => x = ±7."
  },
  {
    id: 7,
    level: "Hard",
    question: "If 3 pencils cost $1.50, how much do 10 pencils cost?",
    options: ["$4.50", "$5.00", "$5.50", "$6.00"],
    answer: "$5.00",
    shortcut: "Cost per pencil = $1.50 / 3 = $0.50. 10 pencils = 10 × $0.50 = $5.00."
  },
  {
    id: 8,
    level: "Hard",
    question: "What is 2³ + 3² + 4¹?",
    options: ["19", "21", "23", "25"],
    answer: "21",
    shortcut: "2³ = 8, 3² = 9, 4¹ = 4. 8 + 9 + 4 = 21."
  }
];

export default function SpeedMathClash() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [maxStreak, setMaxStreak] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [timeLeft, setTimeLeft] = useState(45);
  const [isGameOver, setIsGameOver] = useState(false);
  const [timeBonusText, setTimeBonusText] = useState(null);
  const [history, setHistory] = useState([]);

  const currentQ = SPEED_MATH_PROBLEMS[currentIndex % SPEED_MATH_PROBLEMS.length];

  useEffect(() => {
    if (isGameOver || timeLeft <= 0) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          endGame();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, isGameOver]);

  const endGame = () => {
    setIsGameOver(true);
    if (user?.uid) {
      const outcome = score >= 50 ? "win" : "loss";
      saveGameResult(user.uid, "speed-math-clash", outcome);
    }
  };

  const handleSelectOption = (opt) => {
    if (isAnswered || isGameOver) return;
    setSelectedOption(opt);
    setIsAnswered(true);

    const isCorrect = opt === currentQ.answer;

    if (isCorrect) {
      const newStreak = streak + 1;
      setStreak(newStreak);
      if (newStreak > maxStreak) setMaxStreak(newStreak);
      
      // Bonus time & multiplier
      const pts = 10 * (newStreak >= 3 ? 2 : 1);
      setScore((prev) => prev + pts);
      setTimeLeft((prev) => prev + 3); // +3s bonus
      setTimeBonusText("+3s Bonus!");
    } else {
      setStreak(0);
      setTimeLeft((prev) => Math.max(1, prev - 2)); // -2s penalty
      setTimeBonusText("-2s Penalty!");
    }

    setTimeout(() => setTimeBonusText(null), 1200);

    setHistory((prev) => [
      ...prev,
      {
        question: currentQ.question,
        userAns: opt,
        correctAns: currentQ.answer,
        isCorrect,
        shortcut: currentQ.shortcut || currentQ.explanation
      }
    ]);
  };

  const handleNext = () => {
    setSelectedOption(null);
    setIsAnswered(false);
    if (currentIndex + 1 < SPEED_MATH_PROBLEMS.length) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      endGame();
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setScore(0);
    setStreak(0);
    setMaxStreak(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setTimeLeft(45);
    setIsGameOver(false);
    setHistory([]);
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "radial-gradient(circle at 80% 20%, rgba(16,185,129,0.15), transparent 40%), radial-gradient(circle at 20% 80%, rgba(37,99,235,0.15), transparent 40%), var(--bg)",
      color: "var(--text)",
      fontFamily: "Inter, sans-serif",
      padding: "40px 24px 80px"
    }}>
      <div style={{ maxWidth: "800px", margin: "0 auto" }}>
        
        {/* HEADER NAV */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 32 }}>
          <button
            onClick={() => navigate("/games")}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              background: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(255,255,255,0.12)",
              color: "var(--text)",
              padding: "10px 18px",
              borderRadius: 14,
              fontWeight: 700,
              fontSize: 14,
              cursor: "pointer"
            }}
          >
            <ArrowLeft size={16} /> Games Arcade
          </button>

          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            {timeBonusText && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                style={{
                  color: timeBonusText.includes("+") ? "#22c55e" : "#ef4444",
                  fontWeight: 900,
                  fontSize: 14
                }}
              >
                {timeBonusText}
              </motion.div>
            )}

            {streak >= 2 && (
              <motion.div
                initial={{ scale: 0.8 }}
                animate={{ scale: [1, 1.15, 1] }}
                transition={{ repeat: Infinity, duration: 1 }}
                style={{
                  background: "linear-gradient(135deg, #10b981, #059669)",
                  color: "#ffffff",
                  padding: "6px 14px",
                  borderRadius: 999,
                  fontWeight: 900,
                  fontSize: 13,
                  display: "flex",
                  alignItems: "center",
                  gap: 6
                }}
              >
                <Flame size={16} fill="#ffffff" /> {streak}x Speed Combo!
              </motion.div>
            )}

            <div style={{
              background: "rgba(16,185,129,0.12)",
              border: "1px solid rgba(16,185,129,0.3)",
              color: "#10b981",
              padding: "8px 18px",
              borderRadius: 14,
              fontWeight: 800,
              fontSize: 15
            }}>
              ⏱️ {timeLeft}s
            </div>

            <div style={{
              background: "linear-gradient(135deg, rgba(16,185,129,0.2), rgba(16,185,129,0.1))",
              border: "1px solid rgba(16,185,129,0.3)",
              color: "#10b981",
              padding: "8px 18px",
              borderRadius: 14,
              fontWeight: 900,
              fontSize: 15
            }}>
              ⭐ {score} pts
            </div>
          </div>
        </div>

        {/* MAIN GAME CONTAINER */}
        {!isGameOver ? (
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="glossy-card"
            style={{
              padding: "36px",
              borderRadius: 24,
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.12)",
              boxShadow: "0 20px 50px rgba(0,0,0,0.25)"
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
              <span style={{ fontSize: 13, fontWeight: 800, color: "#10b981", textTransform: "uppercase" }}>
                Problem {currentIndex + 1} of {SPEED_MATH_PROBLEMS.length}
              </span>
              <span style={{
                background: "rgba(16,185,129,0.12)",
                color: "#10b981",
                padding: "4px 12px",
                borderRadius: 999,
                fontSize: 12,
                fontWeight: 800
              }}>
                {currentQ.level} Tier
              </span>
            </div>

            <h2 style={{ fontSize: "1.4rem", fontWeight: 900, lineHeight: 1.5, marginBottom: 28, color: "var(--text)" }}>
              {currentQ.question}
            </h2>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 24 }}>
              {currentQ.options.map((opt) => {
                const isSelected = selectedOption === opt;
                const isCorrect = opt === currentQ.answer;

                let border = "1px solid rgba(255,255,255,0.12)";
                let bg = "rgba(255,255,255,0.04)";
                let textColor = "var(--text)";

                if (isAnswered) {
                  if (isCorrect) {
                    border = "1px solid #22c55e";
                    bg = "rgba(34,197,94,0.15)";
                    textColor = "#22c55e";
                  } else if (isSelected && !isCorrect) {
                    border = "1px solid #ef4444";
                    bg = "rgba(239,68,68,0.15)";
                    textColor = "#ef4444";
                  }
                }

                return (
                  <button
                    key={opt}
                    onClick={() => handleSelectOption(opt)}
                    disabled={isAnswered}
                    style={{
                      padding: "18px 20px",
                      borderRadius: 16,
                      border,
                      background: bg,
                      color: textColor,
                      fontWeight: 800,
                      fontSize: "1.05rem",
                      textAlign: "left",
                      cursor: isAnswered ? "default" : "pointer",
                      transition: "all 0.2s"
                    }}
                  >
                    {opt}
                  </button>
                );
              })}
            </div>

            {isAnswered && (
              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }}>
                <div style={{
                  background: "rgba(16,185,129,0.08)",
                  border: "1px solid rgba(16,185,129,0.25)",
                  borderRadius: 16,
                  padding: "16px 20px",
                  marginBottom: 20
                }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, color: "#10b981", fontWeight: 800, fontSize: 13, marginBottom: 6 }}>
                    <Sparkles size={16} /> Speed Math Shortcut
                  </div>
                  <p style={{ fontSize: 14, color: "var(--text)", margin: 0, lineHeight: 1.5 }}>
                    {currentQ.shortcut}
                  </p>
                </div>

                <button
                  onClick={handleNext}
                  className="glossy-btn"
                  style={{
                    width: "100%",
                    padding: "16px",
                    borderRadius: 16,
                    border: "none",
                    background: "linear-gradient(135deg, #10b981, #059669)",
                    color: "#ffffff",
                    fontWeight: 800,
                    fontSize: 15,
                    cursor: "pointer"
                  }}
                >
                  Next Calculation →
                </button>
              </motion.div>
            )}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glossy-card"
            style={{
              padding: 40,
              borderRadius: 24,
              textAlign: "center",
              background: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(255,255,255,0.12)"
            }}
          >
            <Trophy size={48} color="#10b981" style={{ marginBottom: 16 }} />
            <h2 style={{ fontSize: 28, fontWeight: 900, marginBottom: 8, color: "var(--text)" }}>
              Speed Math Clash Complete!
            </h2>
            <p style={{ color: "var(--text-secondary)", fontSize: 15, marginBottom: 32 }}>
              Awesome quantitative reflex speed and mental calculation accuracy!
            </p>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16, marginBottom: 32 }}>
              <div style={{ background: "rgba(255,255,255,0.04)", borderRadius: 16, padding: 16 }}>
                <div style={{ fontSize: 12, color: "var(--text-secondary)", fontWeight: 700 }}>Total Score</div>
                <div style={{ fontSize: 24, fontWeight: 900, color: "#10b981", marginTop: 4 }}>{score} pts</div>
              </div>
              <div style={{ background: "rgba(255,255,255,0.04)", borderRadius: 16, padding: 16 }}>
                <div style={{ fontSize: 12, color: "var(--text-secondary)", fontWeight: 700 }}>Max Streak</div>
                <div style={{ fontSize: 24, fontWeight: 900, color: "#f59e0b", marginTop: 4 }}>{maxStreak}🔥</div>
              </div>
              <div style={{ background: "rgba(255,255,255,0.04)", borderRadius: 16, padding: 16 }}>
                <div style={{ fontSize: 12, color: "var(--text-secondary)", fontWeight: 700 }}>Accuracy</div>
                <div style={{ fontSize: 24, fontWeight: 900, color: "#22c55e", marginTop: 4 }}>
                  {history.length > 0 ? Math.round((history.filter(h => h.isCorrect).length / history.length) * 100) : 0}%
                </div>
              </div>
            </div>

            <div style={{ display: "flex", gap: 16 }}>
              <button
                onClick={handleRestart}
                style={{
                  flex: 1,
                  padding: "16px",
                  borderRadius: 16,
                  border: "none",
                  background: "linear-gradient(135deg, #10b981, #059669)",
                  color: "#ffffff",
                  fontWeight: 800,
                  fontSize: 15,
                  cursor: "pointer",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 8
                }}
              >
                <RefreshCw size={18} /> Play Again
              </button>
              <button
                onClick={() => navigate("/games")}
                style={{
                  flex: 1,
                  padding: "16px",
                  borderRadius: 16,
                  border: "1px solid rgba(255,255,255,0.12)",
                  background: "rgba(255,255,255,0.06)",
                  color: "var(--text)",
                  fontWeight: 800,
                  fontSize: 15,
                  cursor: "pointer"
                }}
              >
                Back to Arcade
              </button>
            </div>
          </motion.div>
        )}

      </div>
    </div>
  );
}
