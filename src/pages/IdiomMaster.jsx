import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { BookOpen, Zap, Trophy, RefreshCw, ArrowLeft, Flame, HelpCircle, Sparkles } from "lucide-react";
import { saveGameResult } from "../services/gameStatsService";
import { useAuth } from "../context/AuthContext";

const IDIOM_QUESTIONS = [
  {
    id: 1,
    phrase: "a double-edged sword",
    question: "What is the best academic paraphrase for 'a double-edged sword'?",
    options: [
      "A phenomenon with both beneficial and harmful consequences",
      "An unexpected victory achieved easily",
      "A financial crisis affecting multiple industries",
      "A temporary solution to a complex issue"
    ],
    answer: "A phenomenon with both beneficial and harmful consequences",
    tip: "Use this in Task 2 essays when discussing technology, globalization, or automation."
  },
  {
    id: 2,
    phrase: "pave the way for",
    question: "What does 'pave the way for' mean in formal writing?",
    options: [
      "Create conditions that enable future developments",
      "Block progress due to regulatory obstacles",
      "Construct physical infrastructure in urban centers",
      "Delay a decision until further data is gathered"
    ],
    answer: "Create conditions that enable future developments",
    tip: "Great verb phrase to show cause-and-effect in academic essays."
  },
  {
    id: 3,
    phrase: "at the expense of",
    question: "Select the accurate definition of 'at the expense of':",
    options: [
      "Resulting in loss, harm, or sacrifice to something else",
      "Calculated accurately using financial models",
      "Funded entirely by government subsidies",
      "Purchased at a heavily discounted rate"
    ],
    answer: "Resulting in loss, harm, or sacrifice to something else",
    tip: "Ideal for economic vs environmental tradeoff essays (Band 8+ Lexical Resource)."
  },
  {
    id: 4,
    phrase: "shed light on",
    question: "What does 'shed light on' mean in research contexts?",
    options: [
      "Provide clarification or reveal new understanding",
      "Reduce energy consumption in facilities",
      "Cast doubt on previous empirical studies",
      "Publish findings exclusively in open-access journals"
    ],
    answer: "Provide clarification or reveal new understanding",
    tip: "Use in Academic Reading/Writing when discussing scientific breakthroughs."
  },
  {
    id: 5,
    phrase: "stem from",
    question: "What is the precise meaning of 'stem from'?",
    options: [
      "Originate or develop as a direct consequence of",
      "Branch out into unrelated fields of study",
      "Decrease rapidly over a short duration",
      "Inhibit growth in natural ecosystems"
    ],
    answer: "Originate or develop as a direct consequence of",
    tip: "Band 8 alternative for 'is caused by'."
  }
];

export default function IdiomMaster() {
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

  const currentQ = IDIOM_QUESTIONS[currentIndex % IDIOM_QUESTIONS.length];

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
      saveGameResult(user.uid, "idiom-master", outcome);
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
        phrase: currentQ.phrase,
        question: currentQ.question,
        userAns: opt,
        correctAns: currentQ.answer,
        isCorrect,
        tip: currentQ.tip
      }
    ]);
  };

  const handleNext = () => {
    setSelectedOption(null);
    setIsAnswered(false);
    if (currentIndex + 1 < IDIOM_QUESTIONS.length) {
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
      background: "radial-gradient(circle at 80% 20%, rgba(245,158,11,0.15), transparent 40%), radial-gradient(circle at 20% 80%, rgba(139,92,246,0.15), transparent 40%), var(--bg)",
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
                  background: "linear-gradient(135deg, #f59e0b, #d97706)",
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
              background: "rgba(245,158,11,0.12)",
              border: "1px solid rgba(245,158,11,0.3)",
              color: "#f59e0b",
              padding: "8px 18px",
              borderRadius: 14,
              fontWeight: 800,
              fontSize: 15
            }}>
              ⏱️ {timeLeft}s
            </div>

            <div style={{
              background: "linear-gradient(135deg, rgba(245,158,11,0.2), rgba(245,158,11,0.1))",
              border: "1px solid rgba(245,158,11,0.3)",
              color: "#f59e0b",
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
              <span style={{ fontSize: 13, fontWeight: 800, color: "#f59e0b", textTransform: "uppercase" }}>
                Expression {currentIndex + 1} of {IDIOM_QUESTIONS.length}
              </span>
              <span style={{ fontSize: 13, color: "var(--text-secondary)", fontWeight: 700 }}>
                Academic Idioms &amp; Paraphrasing
              </span>
            </div>

            <div style={{
              display: "inline-block",
              background: "rgba(245,158,11,0.12)",
              border: "1px solid rgba(245,158,11,0.3)",
              color: "#f59e0b",
              padding: "6px 16px",
              borderRadius: 999,
              fontWeight: 800,
              fontSize: 14,
              marginBottom: 16
            }}>
              "{currentQ.phrase}"
            </div>

            <h2 style={{ fontSize: "1.3rem", fontWeight: 800, lineHeight: 1.5, marginBottom: 28, color: "var(--text)" }}>
              {currentQ.question}
            </h2>

            <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 12, marginBottom: 24 }}>
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
                  background: "rgba(245,158,11,0.08)",
                  border: "1px solid rgba(245,158,11,0.25)",
                  borderRadius: 16,
                  padding: "16px 20px",
                  marginBottom: 20
                }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, color: "#f59e0b", fontWeight: 800, fontSize: 13, marginBottom: 6 }}>
                    <Sparkles size={16} /> Exam Score Booster Tip
                  </div>
                  <p style={{ fontSize: 14, color: "var(--text)", margin: 0, lineHeight: 1.5 }}>
                    {currentQ.tip}
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
                    background: "linear-gradient(135deg, #f59e0b, #d97706)",
                    color: "#ffffff",
                    fontWeight: 800,
                    fontSize: 15,
                    cursor: "pointer"
                  }}
                >
                  Next Expression →
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
            <Trophy size={48} color="#f59e0b" style={{ marginBottom: 16 }} />
            <h2 style={{ fontSize: 28, fontWeight: 900, marginBottom: 8, color: "var(--text)" }}>
              Idiom Master Complete!
            </h2>
            <p style={{ color: "var(--text-secondary)", fontSize: 15, marginBottom: 32 }}>
              Awesome job expanding your academic phrasing &amp; lexical range!
            </p>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16, marginBottom: 32 }}>
              <div style={{ background: "rgba(255,255,255,0.04)", borderRadius: 16, padding: 16 }}>
                <div style={{ fontSize: 12, color: "var(--text-secondary)", fontWeight: 700 }}>Total Score</div>
                <div style={{ fontSize: 24, fontWeight: 900, color: "#f59e0b", marginTop: 4 }}>{score} pts</div>
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
                  background: "linear-gradient(135deg, #f59e0b, #d97706)",
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
