import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Brain, Zap, Trophy, RefreshCw, ArrowLeft, CheckCircle2, Flame, HelpCircle } from "lucide-react";
import { saveGameResult } from "../services/gameStatsService";
import { useAuth } from "../context/AuthContext";

const LOGIC_QUESTIONS = [
  {
    id: 1,
    question: "Complete the number series: 2, 6, 12, 20, 30, ?",
    options: ["36", "40", "42", "48"],
    answer: "42",
    explanation: "Differences between numbers are +4, +6, +8, +10. So next difference is +12. 30 + 12 = 42."
  },
  {
    id: 2,
    question: "Statements: All cats are mammals. All mammals are warm-blooded. Conclusion: Are all cats warm-blooded?",
    options: ["Definitely True", "Definitely False", "Cannot be determined", "Partially True"],
    answer: "Definitely True",
    explanation: "By transitive logic: Cats ⊂ Mammals ⊂ Warm-blooded, so all cats are warm-blooded."
  },
  {
    id: 3,
    question: "If 'PENCIL' is coded as 'QFMDJM', how is 'PAPER' coded?",
    options: ["QBQFS", "QBDFS", "QBOFQ", "QAPFS"],
    answer: "QBQFS",
    explanation: "Each letter is shifted forward by +1 in the alphabet (P->Q, A->B, P->Q, E->F, R->S)."
  },
  {
    id: 4,
    question: "A is the father of B, but B is not the son of A. What is the relationship of B to A?",
    options: ["Nephew", "Daughter", "Brother", "Cousin"],
    answer: "Daughter",
    explanation: "If B is not the son, B must be the daughter of A."
  },
  {
    id: 5,
    question: "Which of the following numbers does NOT belong to the series: 3, 5, 7, 9, 11, 13?",
    options: ["5", "7", "9", "11"],
    answer: "9",
    explanation: "All numbers in the series are prime numbers except 9, which is composite (3×3)."
  },
  {
    id: 6,
    question: "Five people (A, B, C, D, E) sit in a row. C sits in the middle. A sits at the left end. Where does E sit if B is next to A?",
    options: ["Next to C", "At the right end", "Next to A", "Middle left"],
    answer: "At the right end",
    explanation: "Arrangement from left to right: A, B, C, D, E. So E is at the far right end."
  },
  {
    id: 7,
    question: "If 12th March of a non-leap year is a Sunday, what day of the week is 27th March?",
    options: ["Monday", "Tuesday", "Wednesday", "Thursday"],
    answer: "Monday",
    explanation: "27 - 12 = 15 days. 15 mod 7 = 1 odd day. Sunday + 1 day = Monday."
  },
  {
    id: 8,
    question: "Complete the pattern: AB, DE, GH, JK, ?",
    options: ["LM", "MN", "NO", "OP"],
    answer: "MN",
    explanation: "Each pair skips 1 letter: AB (skip C), DE (skip F), GH (skip I), JK (skip L), MN."
  }
];

export default function AptitudeArena() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [maxStreak, setMaxStreak] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [timeLeft, setTimeLeft] = useState(90);
  const [isGameOver, setIsGameOver] = useState(false);
  const [history, setHistory] = useState([]);

  const currentQ = LOGIC_QUESTIONS[currentIndex % LOGIC_QUESTIONS.length];

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
      const outcome = score >= 40 ? "win" : "loss";
      saveGameResult(user.uid, "aptitude-arena", outcome);
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
    if (currentIndex + 1 < LOGIC_QUESTIONS.length) {
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
    setTimeLeft(90);
    setIsGameOver(false);
    setHistory([]);
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "radial-gradient(circle at 15% 15%, rgba(139,92,246,0.15), transparent 40%), radial-gradient(circle at 85% 85%, rgba(245,158,11,0.15), transparent 40%), var(--bg)",
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
                  background: "linear-gradient(135deg, #8b5cf6, #ec4899)",
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
                <Flame size={16} fill="#ffffff" /> {streak}x Streak!
              </motion.div>
            )}

            <div style={{
              background: "rgba(139,92,246,0.12)",
              border: "1px solid rgba(139,92,246,0.3)",
              color: "#8b5cf6",
              padding: "8px 18px",
              borderRadius: 14,
              fontWeight: 800,
              fontSize: 15
            }}>
              ⏱️ {timeLeft}s
            </div>

            <div style={{
              background: "linear-gradient(135deg, rgba(139,92,246,0.2), rgba(139,92,246,0.1))",
              border: "1px solid rgba(139,92,246,0.3)",
              color: "#8b5cf6",
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
              <span style={{ fontSize: 13, fontWeight: 800, color: "#8b5cf6", textTransform: "uppercase" }}>
                Puzzle {currentIndex + 1} of {LOGIC_QUESTIONS.length}
              </span>
              <span style={{ fontSize: 13, color: "var(--text-secondary)", fontWeight: 700 }}>
                Logical Reasoning &amp; Aptitude
              </span>
            </div>

            <h2 style={{ fontSize: "1.35rem", fontWeight: 800, lineHeight: 1.5, marginBottom: 28, color: "var(--text)" }}>
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

            {isAnswered && (
              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }}>
                <div style={{
                  background: "rgba(139,92,246,0.08)",
                  border: "1px solid rgba(139,92,246,0.25)",
                  borderRadius: 16,
                  padding: "16px 20px",
                  marginBottom: 20
                }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, color: "#8b5cf6", fontWeight: 800, fontSize: 13, marginBottom: 6 }}>
                    <HelpCircle size={16} /> Logical Solution
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
                    background: "linear-gradient(135deg, #8b5cf6, #7c3aed)",
                    color: "#ffffff",
                    fontWeight: 800,
                    fontSize: 15,
                    cursor: "pointer"
                  }}
                >
                  Next Logic Puzzle →
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
            <Trophy size={48} color="#8b5cf6" style={{ marginBottom: 16 }} />
            <h2 style={{ fontSize: 28, fontWeight: 900, marginBottom: 8, color: "var(--text)" }}>
              Aptitude Arena Complete!
            </h2>
            <p style={{ color: "var(--text-secondary)", fontSize: 15, marginBottom: 32 }}>
              Excellent logical reasoning and spatial acuity performance!
            </p>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16, marginBottom: 32 }}>
              <div style={{ background: "rgba(255,255,255,0.04)", borderRadius: 16, padding: 16 }}>
                <div style={{ fontSize: 12, color: "var(--text-secondary)", fontWeight: 700 }}>Total Score</div>
                <div style={{ fontSize: 24, fontWeight: 900, color: "#8b5cf6", marginTop: 4 }}>{score} pts</div>
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
                  background: "linear-gradient(135deg, #8b5cf6, #7c3aed)",
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
