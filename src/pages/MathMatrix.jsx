import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Calculator, Zap, Trophy, RefreshCw, ArrowLeft, CheckCircle2, XCircle, Flame, HelpCircle } from "lucide-react";
import { saveGameResult } from "../services/gameStatsService";
import { useAuth } from "../context/AuthContext";

const MATH_QUESTIONS = [
  {
    id: 1,
    question: "If a car travels at 60 km/h for 45 minutes, how many kilometers does it cover?",
    options: ["40 km", "45 km", "50 km", "55 km"],
    answer: "45 km",
    explanation: "Distance = Speed × Time = 60 km/h × (45/60) hours = 45 km."
  },
  {
    id: 2,
    question: "What is 15% of 240?",
    options: ["30", "32", "36", "40"],
    answer: "36",
    explanation: "10% of 240 is 24. 5% is 12. 24 + 12 = 36."
  },
  {
    id: 3,
    question: "Solve for x: 3x + 12 = 45",
    options: ["9", "11", "12", "15"],
    answer: "11",
    explanation: "3x = 45 - 12 = 33 => x = 11."
  },
  {
    id: 4,
    question: "The ratio of boys to girls in a class of 35 students is 3:4. How many girls are in the class?",
    options: ["15", "18", "20", "24"],
    answer: "20",
    explanation: "Total parts = 3 + 4 = 7. Each part = 35 / 7 = 5. Girls = 4 × 5 = 20."
  },
  {
    id: 5,
    question: "If the area of a circle is 49π, what is its circumference?",
    options: ["7π", "14π", "21π", "28π"],
    answer: "14π",
    explanation: "Area = πr² = 49π => r = 7. Circumference = 2πr = 14π."
  },
  {
    id: 6,
    question: "An item originally priced at $80 is on sale for $60. What is the percentage discount?",
    options: ["20%", "25%", "30%", "33.3%"],
    answer: "25%",
    explanation: "Discount = $20. Discount % = (20 / 80) × 100% = 25%."
  },
  {
    id: 7,
    question: "What is the median of the set: {12, 5, 22, 17, 9, 30, 14}?",
    options: ["12", "14", "17", "18"],
    answer: "14",
    explanation: "Sorted set: {5, 9, 12, 14, 17, 22, 30}. The middle number (4th) is 14."
  },
  {
    id: 8,
    question: "If 4 workers build a wall in 6 days, how many days will 3 workers take at the same rate?",
    options: ["7 days", "8 days", "9 days", "10 days"],
    answer: "8 days",
    explanation: "Total man-days = 4 × 6 = 24. 3 workers take 24 / 3 = 8 days."
  },
  {
    id: 9,
    question: "Evaluate: (2³ × 3²) - 12",
    options: ["54", "60", "64", "72"],
    answer: "60",
    explanation: "2³ = 8, 3² = 9. 8 × 9 = 72. 72 - 12 = 60."
  },
  {
    id: 10,
    question: "If a principal of $1,000 earns 5% simple interest per year, what is total interest after 3 years?",
    options: ["$100", "$150", "$200", "$250"],
    answer: "$150",
    explanation: "Simple Interest = P × R × T / 100 = 1000 × 0.05 × 3 = $150."
  }
];

export default function MathMatrix() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [maxStreak, setMaxStreak] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60);
  const [isGameOver, setIsGameOver] = useState(false);
  const [history, setHistory] = useState([]);
  const [showExplanation, setShowExplanation] = useState(false);

  const currentQ = MATH_QUESTIONS[currentIndex % MATH_QUESTIONS.length];

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
      saveGameResult(user.uid, "math-matrix", outcome);
    }
  };

  const handleSelectOption = (opt) => {
    if (isAnswered || isGameOver) return;
    setSelectedOption(opt);
    setIsAnswered(true);

    const isCorrect = opt === currentQ.answer;
    let points = 0;

    if (isCorrect) {
      const newStreak = streak + 1;
      setStreak(newStreak);
      if (newStreak > maxStreak) setMaxStreak(newStreak);
      const multiplier = newStreak >= 3 ? 2 : 1;
      points = 10 * multiplier;
      setScore((prev) => prev + points);
    } else {
      setStreak(0);
    }

    setHistory((prev) => [
      ...prev,
      {
        question: currentQ.question,
        userAns: opt,
        correctAns: currentQ.answer,
        isCorrect,
        explanation: currentQ.explanation
      }
    ]);
  };

  const handleNext = () => {
    setSelectedOption(null);
    setIsAnswered(false);
    setShowExplanation(false);
    if (currentIndex + 1 < MATH_QUESTIONS.length) {
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
    setTimeLeft(60);
    setIsGameOver(false);
    setHistory([]);
    setShowExplanation(false);
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "radial-gradient(circle at 10% 20%, rgba(37,99,235,0.15), transparent 40%), radial-gradient(circle at 90% 80%, rgba(6,182,212,0.15), transparent 40%), var(--bg)",
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
            {streak >= 2 && (
              <motion.div
                initial={{ scale: 0.8 }}
                animate={{ scale: [1, 1.15, 1] }}
                transition={{ repeat: Infinity, duration: 1 }}
                style={{
                  background: "linear-gradient(135deg, #f59e0b, #ef4444)",
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
                <Flame size={16} fill="#ffffff" /> {streak}x Combo!
              </motion.div>
            )}

            <div style={{
              background: "rgba(6,182,212,0.12)",
              border: "1px solid rgba(6,182,212,0.3)",
              color: "#06b6d4",
              padding: "8px 18px",
              borderRadius: 14,
              fontWeight: 800,
              fontSize: 15
            }}>
              ⏱️ {timeLeft}s
            </div>

            <div style={{
              background: "linear-gradient(135deg, rgba(37,99,235,0.2), rgba(37,99,235,0.1))",
              border: "1px solid rgba(37,99,235,0.3)",
              color: "var(--primary)",
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
            {/* PROGRESS BAR */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
              <span style={{ fontSize: 13, fontWeight: 800, color: "#06b6d4", textTransform: "uppercase" }}>
                Question {currentIndex + 1} of {MATH_QUESTIONS.length}
              </span>
              <span style={{ fontSize: 13, color: "var(--text-secondary)", fontWeight: 700 }}>
                Math &amp; Quantitative Aptitude
              </span>
            </div>

            <h2 style={{ fontSize: "1.35rem", fontWeight: 800, lineHeight: 1.5, marginBottom: 28, color: "var(--text)" }}>
              {currentQ.question}
            </h2>

            {/* OPTIONS GRID */}
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
                      fontWeight: 700,
                      fontSize: "1rem",
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

            {/* STEP EXPLANATION BOX */}
            {isAnswered && (
              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }}>
                <div style={{
                  background: "rgba(6,182,212,0.08)",
                  border: "1px solid rgba(6,182,212,0.25)",
                  borderRadius: 16,
                  padding: "16px 20px",
                  marginBottom: 20
                }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, color: "#06b6d4", fontWeight: 800, fontSize: 13, marginBottom: 6 }}>
                    <HelpCircle size={16} /> Step-by-Step Explanation
                  </div>
                  <p style={{ fontSize: 14, color: "var(--text)", margin: 0, lineHeight: 1.5 }}>
                    {currentQ.explanation}
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
                    background: "linear-gradient(135deg, #2563eb, #1d4ed8)",
                    color: "#ffffff",
                    fontWeight: 800,
                    fontSize: 15,
                    cursor: "pointer"
                  }}
                >
                  Next Question →
                </button>
              </motion.div>
            )}
          </motion.div>
        ) : (
          /* RESULTS CARD */
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
            <Trophy size={48} color="#f59e0b" style={{ marginBottom: 16 }} />
            <h2 style={{ fontSize: 28, fontWeight: 900, marginBottom: 8, color: "var(--text)" }}>
              Math Matrix Complete!
            </h2>
            <p style={{ color: "var(--text-secondary)", fontSize: 15, marginBottom: 32 }}>
              Great effort on building your quantitative speed and precision!
            </p>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16, marginBottom: 32 }}>
              <div style={{ background: "rgba(255,255,255,0.04)", borderRadius: 16, padding: 16 }}>
                <div style={{ fontSize: 12, color: "var(--text-secondary)", fontWeight: 700 }}>Total Score</div>
                <div style={{ fontSize: 24, fontWeight: 900, color: "var(--primary)", marginTop: 4 }}>{score} pts</div>
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
                  background: "linear-gradient(135deg, #06b6d4, #0891b2)",
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
