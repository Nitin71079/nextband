import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { BarChart3, Zap, Trophy, RefreshCw, ArrowLeft, Flame, HelpCircle, Sparkles } from "lucide-react";
import { saveGameResult } from "../services/gameStatsService";
import { useAuth } from "../context/AuthContext";

const GRAPH_DATA_PROBLEMS = [
  {
    id: 1,
    title: "Global Renewable Energy Share (2020 vs 2025)",
    chartData: "Solar: 15% ➔ 30% | Wind: 20% ➔ 35% | Hydro: 40% ➔ 25% | Biomass: 25% ➔ 10%",
    question: "Which renewable energy sector experienced the highest percentage point increase?",
    options: ["Solar (+15%)", "Wind (+15%)", "Both Solar & Wind (+15%)", "Hydro (+15%)"],
    answer: "Both Solar & Wind (+15%)",
    explanation: "Both Solar (15% to 30%) and Wind (20% to 35%) increased by exactly 15 percentage points."
  },
  {
    id: 2,
    title: "University Enrolment by Faculty (Total = 5,000 Students)",
    chartData: "STEM: 40% | Humanities: 25% | Business: 20% | Arts: 15%",
    question: "How many more students are enrolled in STEM compared to Business?",
    options: ["500", "750", "1,000", "1,250"],
    answer: "1,000",
    explanation: "STEM = 40% of 5000 = 2000. Business = 20% of 5000 = 1000. Difference = 2000 - 1000 = 1000."
  },
  {
    id: 3,
    title: "Quarterly Revenue Growth (Q1 - Q4 in $ Millions)",
    chartData: "Q1: $12M | Q2: $15M | Q3: $18M | Q4: $24M",
    question: "What is the percentage increase in revenue from Q1 to Q4?",
    options: ["50%", "75%", "100%", "120%"],
    answer: "100%",
    explanation: "Growth = ($24M - $12M) / $12M × 100% = 12M / 12M × 100% = 100%."
  },
  {
    id: 4,
    title: "Export Volume by Country (Metric Tonnes)",
    chartData: "Country A: 450 | Country B: 300 | Country C: 600 | Country D: 150",
    question: "What proportion of total exports is contributed by Country C?",
    options: ["30%", "33.3%", "40%", "45%"],
    answer: "40%",
    explanation: "Total = 450 + 300 + 600 + 150 = 1500. Country C share = 600 / 1500 = 40%."
  },
  {
    id: 5,
    title: "Company Staff Distribution by Department",
    chartData: "Engineering: 120 | Sales: 80 | Marketing: 50 | Operations: 50",
    question: "What is the ratio of Engineering staff to Sales staff?",
    options: ["3:2", "4:3", "5:4", "2:1"],
    answer: "3:2",
    explanation: "120 : 80 simplifies by dividing by 40 ➔ 3 : 2."
  }
];

export default function DataInterpretation() {
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

  const currentQ = GRAPH_DATA_PROBLEMS[currentIndex % GRAPH_DATA_PROBLEMS.length];

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
      const outcome = score >= 30 ? "win" : "loss";
      saveGameResult(user.uid, "data-interpretation", outcome);
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
      const points = 10 * (newStreak >= 3 ? 2 : 1);
      setScore((prev) => prev + points);
    } else {
      setStreak(0);
    }

    setHistory((prev) => [
      ...prev,
      {
        title: currentQ.title,
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
    if (currentIndex + 1 < GRAPH_DATA_PROBLEMS.length) {
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
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "radial-gradient(circle at 10% 80%, rgba(37,99,235,0.15), transparent 40%), radial-gradient(circle at 90% 20%, rgba(16,185,129,0.15), transparent 40%), var(--bg)",
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
                  background: "linear-gradient(135deg, #2563eb, #06b6d4)",
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
              background: "rgba(37,99,235,0.12)",
              border: "1px solid rgba(37,99,235,0.3)",
              color: "var(--primary)",
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
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
              <span style={{ fontSize: 13, fontWeight: 800, color: "var(--primary)", textTransform: "uppercase" }}>
                Data Set {currentIndex + 1} of {GRAPH_DATA_PROBLEMS.length}
              </span>
              <span style={{ fontSize: 13, color: "var(--text-secondary)", fontWeight: 700 }}>
                Data Interpretation &amp; Analysis
              </span>
            </div>

            {/* DATA BOX */}
            <div style={{
              background: "rgba(37,99,235,0.08)",
              border: "1px solid rgba(37,99,235,0.25)",
              borderRadius: 16,
              padding: "18px 22px",
              marginBottom: 24
            }}>
              <div style={{ fontSize: 15, fontWeight: 800, color: "var(--primary)", marginBottom: 6 }}>
                📊 {currentQ.title}
              </div>
              <div style={{ fontSize: 14, fontFamily: "monospace", color: "var(--text)", background: "rgba(0,0,0,0.2)", padding: "10px 14px", borderRadius: 10 }}>
                {currentQ.chartData}
              </div>
            </div>

            <h2 style={{ fontSize: "1.25rem", fontWeight: 800, lineHeight: 1.5, marginBottom: 28, color: "var(--text)" }}>
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
                      padding: "16px 20px",
                      borderRadius: 16,
                      border,
                      background: bg,
                      color: textColor,
                      fontWeight: 700,
                      fontSize: "0.95rem",
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
                  background: "rgba(37,99,235,0.08)",
                  border: "1px solid rgba(37,99,235,0.25)",
                  borderRadius: 16,
                  padding: "16px 20px",
                  marginBottom: 20
                }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, color: "var(--primary)", fontWeight: 800, fontSize: 13, marginBottom: 6 }}>
                    <HelpCircle size={16} /> Data Solution Breakdown
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
                  Next Data Set →
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
            <Trophy size={48} color="#2563eb" style={{ marginBottom: 16 }} />
            <h2 style={{ fontSize: 28, fontWeight: 900, marginBottom: 8, color: "var(--text)" }}>
              Data Interpretation Complete!
            </h2>
            <p style={{ color: "var(--text-secondary)", fontSize: 15, marginBottom: 32 }}>
              Excellent chart analysis and data synthesis accuracy!
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
                  background: "linear-gradient(135deg, #2563eb, #1d4ed8)",
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
