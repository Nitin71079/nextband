import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../context/AuthContext";
import { ArrowLeft, Link2, Timer, Trophy, Zap } from "lucide-react";
import { WORD_CHAINS, simulateBotWordChain } from "../data/wordChainData";
import { getBotName } from "../utils/botEngine";

// ── constants ─────────────────────────────────────────────────────────────────
const STEP_TIME = 20; // seconds per step
const POINTS_CORRECT = 10;
const POINTS_SPEED_BONUS = 5; // if answered in first 8s

// ── styles ────────────────────────────────────────────────────────────────────
const S = {
  page: {
    minHeight: "100vh",
    background:
      "radial-gradient(circle at 15% 10%, rgba(139,92,246,.15), transparent 40%), " +
      "radial-gradient(circle at 85% 80%, rgba(37,99,235,.12), transparent 40%), #060d1f",
    fontFamily: "Inter, sans-serif",
    padding: "80px 24px 60px",
  },
  center: {
    minHeight: "100vh",
    background:
      "radial-gradient(circle at 20% 20%, rgba(139,92,246,.12), transparent 40%), #060d1f",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "24px",
  },
  card: {
    width: "100%",
    maxWidth: "540px",
    background: "rgba(255,255,255,.05)",
    border: "1px solid rgba(255,255,255,.1)",
    borderRadius: "28px",
    padding: "36px 32px",
    boxShadow: "0 30px 80px rgba(0,0,0,.4)",
  },
  heading: { color: "#f1f5f9", fontWeight: 900, margin: 0, letterSpacing: "-0.5px" },
  primaryBtn: {
    width: "100%",
    padding: "14px",
    borderRadius: "14px",
    border: "none",
    background: "linear-gradient(135deg,#8b5cf6,#2563eb)",
    color: "white",
    fontWeight: 700,
    fontSize: "15px",
    cursor: "pointer",
  },
};

// ── helpers ───────────────────────────────────────────────────────────────────
function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function pickChain() {
  return WORD_CHAINS[Math.floor(Math.random() * WORD_CHAINS.length)];
}

// ── Menu ──────────────────────────────────────────────────────────────────────
function Menu({ onStart }) {
  const [selected, setSelected] = useState(null);
  const chains = WORD_CHAINS;

  return (
    <div style={S.center}>
      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} style={S.card}>
        <div style={{ textAlign: "center", marginBottom: "28px" }}>
          <div style={{ fontSize: "48px", marginBottom: "12px" }}>🔗</div>
          <h1 style={{ ...S.heading, fontSize: "26px", marginBottom: "8px" }}>Word Chain</h1>
          <p style={{ color: "#94a3b8", fontSize: "13px", lineHeight: 1.7 }}>
            Follow the IELTS word chain — each step connects to the next concept.
            Answer correctly before time runs out.
          </p>
        </div>

        <div style={{ marginBottom: "20px" }}>
          <p style={{ color: "#64748b", fontSize: "11px", fontWeight: 700, letterSpacing: "1.5px", textTransform: "uppercase", marginBottom: "12px" }}>
            Pick a Theme
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            {chains.map((c) => (
              <button key={c.id} onClick={() => setSelected(c.id)}
                style={{
                  padding: "12px 16px", borderRadius: "12px", border: "none",
                  background: selected === c.id ? "rgba(139,92,246,.2)" : "rgba(255,255,255,.04)",
                  borderWidth: "1px", borderStyle: "solid",
                  borderColor: selected === c.id ? "rgba(139,92,246,.5)" : "rgba(255,255,255,.08)",
                  color: selected === c.id ? "#c4b5fd" : "#94a3b8",
                  fontSize: "13px", fontWeight: 600, cursor: "pointer",
                  textAlign: "left", display: "flex", alignItems: "center", gap: "10px",
                  transition: "all .2s",
                }}>
                <span style={{ fontSize: "18px" }}>🔗</span>
                <div>
                  <span style={{ color: selected === c.id ? "#c4b5fd" : "#f1f5f9", fontWeight: 700 }}>{c.startWord}</span>
                  <span style={{ color: "#64748b", fontSize: "11px", marginLeft: "8px" }}>{c.theme}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div style={{ background: "rgba(139,92,246,.08)", border: "1px solid rgba(139,92,246,.2)", borderRadius: "14px", padding: "16px", marginBottom: "24px", fontSize: "12px", color: "#94a3b8", lineHeight: 1.7 }}>
          ⚡ <strong style={{ color: "#c4b5fd" }}>+{POINTS_CORRECT} pts</strong> correct answer &nbsp;|&nbsp;
          🚀 <strong style={{ color: "#fbbf24" }}>+{POINTS_SPEED_BONUS} pts</strong> if answered within 8s &nbsp;|&nbsp;
          ⏱ <strong style={{ color: "#f87171" }}>20s</strong> per step
        </div>

        <button onClick={() => onStart(selected ? WORD_CHAINS.find(c => c.id === selected) : pickChain())}
          style={{ ...S.primaryBtn, opacity: 1 }}>
          {selected ? "🔗 Start Chain" : "🎲 Random Chain"}
        </button>
      </motion.div>
    </div>
  );
}

// ── Chain Breadcrumb ──────────────────────────────────────────────────────────
function ChainBreadcrumb({ chain, currentStep, words }) {
  return (
    <div style={{
      display: "flex", alignItems: "center", gap: "6px",
      flexWrap: "wrap", marginBottom: "24px",
      padding: "12px 16px", borderRadius: "14px",
      background: "rgba(255,255,255,.03)", border: "1px solid rgba(255,255,255,.06)",
    }}>
      <span style={{ color: "#8b5cf6", fontWeight: 800, fontSize: "13px" }}>{chain.startWord}</span>
      {chain.steps.map((step, i) => (
        <span key={i} style={{ display: "flex", alignItems: "center", gap: "6px" }}>
          <span style={{ color: "rgba(255,255,255,.2)", fontSize: "16px" }}>→</span>
          <span style={{
            fontSize: "13px", fontWeight: 700,
            color: i < currentStep ? "#a78bfa"
              : i === currentStep ? "#f1f5f9"
              : "rgba(255,255,255,.2)",
          }}>
            {i < currentStep ? words[i] : i === currentStep ? "?" : "·"}
          </span>
        </span>
      ))}
    </div>
  );
}

// ── Game Screen ───────────────────────────────────────────────────────────────
function GameScreen({ chain, user, onFinish }) {
  const botName = useRef(getBotName()).current;
  const botPlan = useRef(simulateBotWordChain(chain.steps)).current;

  const [stepIdx, setStepIdx] = useState(0);
  const [myScore, setMyScore] = useState(0);
  const [botScore, setBotScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(STEP_TIME);
  const [selected, setSelected] = useState(null);
  const [feedback, setFeedback] = useState(null);
  const [revealLink, setRevealLink] = useState(false);
  const [chainWords, setChainWords] = useState([]);
  const [finished, setFinished] = useState(false);

  const timerRef = useRef(null);
  const botTimers = useRef([]);

  const step = chain.steps[stepIdx];
  const totalSteps = chain.steps.length;

  // Start/reset timer on step change
  useEffect(() => {
    setTimeLeft(STEP_TIME);
    setSelected(null);
    setFeedback(null);
    setRevealLink(false);

    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          handleTimeout();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timerRef.current);
  }, [stepIdx]);

  // Schedule bot answers
  useEffect(() => {
    botTimers.current.forEach(clearTimeout);
    botTimers.current = [];

    botPlan.forEach(plan => {
      if (plan.stepIndex !== stepIdx) return;
      const t = setTimeout(() => {
        const pointsGain = plan.correct ? POINTS_CORRECT : 0;
        setBotScore(s => s + pointsGain);
      }, Math.min(plan.delay, STEP_TIME * 1000 - 500));
      botTimers.current.push(t);
    });

    return () => botTimers.current.forEach(clearTimeout);
  }, [stepIdx]);

  function handleTimeout() {
    if (selected !== null) return;
    setFeedback("timeout");
    setRevealLink(true);
    setChainWords(prev => [...prev, step.options[step.answer]]);
    advanceStep();
  }

  function handleAnswer(optIdx) {
    if (selected !== null) return;
    clearInterval(timerRef.current);
    setSelected(optIdx);

    const correct = optIdx === step.answer;
    const speedBonus = correct && timeLeft > (STEP_TIME - 8) ? POINTS_SPEED_BONUS : 0;
    const gain = correct ? POINTS_CORRECT + speedBonus : 0;

    setMyScore(s => s + gain);
    setFeedback(correct ? (speedBonus > 0 ? "speed" : "correct") : "wrong");
    setRevealLink(true);
    setChainWords(prev => [...prev, step.options[step.answer]]);
    advanceStep();
  }

  function advanceStep() {
    setTimeout(() => {
      if (stepIdx + 1 >= totalSteps) {
        setFinished(true);
      } else {
        setStepIdx(i => i + 1);
      }
    }, 1800);
  }

  if (finished) {
    return <Results myScore={myScore} botScore={botScore} botName={botName} chain={chain} chainWords={chainWords} onFinish={onFinish} />;
  }

  const pct = (timeLeft / STEP_TIME) * 100;
  const timerColor = timeLeft > 10 ? "#8b5cf6" : timeLeft > 5 ? "#f59e0b" : "#ef4444";

  return (
    <div style={{ maxWidth: "700px", margin: "0 auto" }}>
      {/* Header row */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "28px" }}>
        <div>
          <p style={{ color: "#64748b", fontSize: "11px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "1.5px", margin: 0 }}>Theme</p>
          <p style={{ color: "#a78bfa", fontWeight: 800, fontSize: "14px", margin: "2px 0 0" }}>{chain.theme}</p>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "8px", padding: "8px 16px", borderRadius: "12px", background: "rgba(255,255,255,.05)", border: `1px solid ${timerColor}40` }}>
          <Timer size={14} color={timerColor} />
          <span style={{ fontWeight: 900, fontSize: "20px", color: timerColor, fontVariantNumeric: "tabular-nums" }}>{timeLeft}</span>
        </div>
        <div style={{ display: "flex", gap: "16px" }}>
          {[{ name: "You", score: myScore, color: "#8b5cf6" }, { name: botName.split(" ")[0], score: botScore, color: "#f472b6" }].map(p => (
            <div key={p.name} style={{ textAlign: "center" }}>
              <p style={{ color: "#64748b", fontSize: "10px", fontWeight: 700, textTransform: "uppercase", margin: 0 }}>{p.name}</p>
              <p style={{ color: p.color, fontWeight: 900, fontSize: "18px", margin: "2px 0 0", fontVariantNumeric: "tabular-nums" }}>{p.score}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Timer bar */}
      <div style={{ height: "4px", background: "rgba(255,255,255,.06)", borderRadius: "999px", marginBottom: "24px", overflow: "hidden" }}>
        <motion.div animate={{ width: `${pct}%` }} transition={{ duration: 0.5, ease: "linear" }}
          style={{ height: "100%", background: timerColor, borderRadius: "999px" }} />
      </div>

      {/* Chain breadcrumb */}
      <ChainBreadcrumb chain={chain} currentStep={stepIdx} words={chainWords} />

      {/* Step counter */}
      <p style={{ color: "#64748b", fontSize: "11px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "1.5px", marginBottom: "14px" }}>
        Step {stepIdx + 1} of {totalSteps}
      </p>

      {/* Question card */}
      <AnimatePresence mode="wait">
        <motion.div key={stepIdx} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }}
          style={{ background: "rgba(255,255,255,.05)", border: "1px solid rgba(139,92,246,.25)", borderRadius: "20px", padding: "24px", marginBottom: "16px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "14px" }}>
            <Link2 size={16} color="#8b5cf6" />
            <span style={{ color: "#8b5cf6", fontWeight: 700, fontSize: "12px", textTransform: "uppercase", letterSpacing: "1px" }}>Next link in the chain</span>
          </div>
          <p style={{ color: "#f1f5f9", fontSize: "16px", fontWeight: 600, lineHeight: 1.6, margin: 0 }}>{step.clue}</p>
        </motion.div>
      </AnimatePresence>

      {/* Options */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", marginBottom: "16px" }}>
        {step.options.map((opt, i) => {
          let bg = "rgba(255,255,255,.04)";
          let border = "1px solid rgba(255,255,255,.08)";
          let color = "#cbd5e1";
          if (selected !== null || feedback === "timeout") {
            if (i === step.answer) { bg = "rgba(139,92,246,.2)"; border = "1px solid #8b5cf6"; color = "#c4b5fd"; }
            else if (i === selected) { bg = "rgba(239,68,68,.15)"; border = "1px solid #ef4444"; color = "#f87171"; }
          }
          return (
            <motion.button key={i}
              whileHover={selected === null ? { scale: 1.02 } : {}}
              whileTap={selected === null ? { scale: 0.98 } : {}}
              onClick={() => handleAnswer(i)}
              style={{ padding: "14px 16px", borderRadius: "14px", border, background: bg, color, fontSize: "14px", fontWeight: 600, cursor: selected === null ? "pointer" : "default", textAlign: "left", lineHeight: 1.4 }}>
              {opt}
            </motion.button>
          );
        })}
      </div>

      {/* Feedback / Link explanation */}
      <AnimatePresence>
        {revealLink && (
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
            style={{ padding: "14px 16px", borderRadius: "14px",
              background: feedback === "correct" || feedback === "speed" ? "rgba(139,92,246,.12)" : "rgba(239,68,68,.1)",
              border: `1px solid ${feedback === "correct" || feedback === "speed" ? "rgba(139,92,246,.3)" : "rgba(239,68,68,.3)"}` }}>
            <p style={{ margin: "0 0 4px", fontWeight: 700, fontSize: "13px",
              color: feedback === "correct" || feedback === "speed" ? "#c4b5fd" : feedback === "timeout" ? "#fbbf24" : "#f87171" }}>
              {feedback === "speed" ? `⚡ Blazing fast! +${POINTS_CORRECT + POINTS_SPEED_BONUS} pts`
                : feedback === "correct" ? `✓ Correct! +${POINTS_CORRECT} pts`
                : feedback === "timeout" ? "⏰ Time's up!"
                : `✗ Wrong — the answer was "${step.options[step.answer]}"`}
            </p>
            <p style={{ margin: 0, color: "#94a3b8", fontSize: "12px" }}>🔗 {step.link}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ── Results ───────────────────────────────────────────────────────────────────
function Results({ myScore, botScore, botName, chain, chainWords, onFinish }) {
  const iWon = myScore > botScore;
  const tied = myScore === botScore;
  const maxScore = chain.steps.length * (POINTS_CORRECT + POINTS_SPEED_BONUS);

  return (
    <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
      style={{ ...S.card, margin: "0 auto", textAlign: "center" }}>
      <div style={{ fontSize: "52px", marginBottom: "14px" }}>
        {tied ? "🤝" : iWon ? "🏆" : "🔗"}
      </div>
      <h1 style={{ ...S.heading, fontSize: "26px", marginBottom: "8px" }}>
        {tied ? "It's a Tie!" : iWon ? "Chain Complete!" : `${botName.split(" ")[0]} Wins!`}
      </h1>
      <p style={{ color: "#94a3b8", fontSize: "13px", marginBottom: "24px" }}>
        Theme: <span style={{ color: "#a78bfa", fontWeight: 700 }}>{chain.theme}</span>
      </p>

      {/* Chain replay */}
      <div style={{ background: "rgba(139,92,246,.08)", border: "1px solid rgba(139,92,246,.2)", borderRadius: "14px", padding: "16px", marginBottom: "24px", textAlign: "left" }}>
        <p style={{ color: "#64748b", fontSize: "11px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "1px", marginBottom: "10px" }}>Your Chain</p>
        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "6px" }}>
          <span style={{ color: "#a78bfa", fontWeight: 800, fontSize: "13px" }}>{chain.startWord}</span>
          {chain.steps.map((_, i) => (
            <span key={i} style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <span style={{ color: "rgba(255,255,255,.3)" }}>→</span>
              <span style={{ color: "#c4b5fd", fontWeight: 700, fontSize: "13px" }}>{chainWords[i] || "—"}</span>
            </span>
          ))}
        </div>
      </div>

      {/* Scores */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px", marginBottom: "24px" }}>
        {[{ name: "You", score: myScore, color: "#8b5cf6" }, { name: botName, score: botScore, color: "#f472b6" }].map(p => (
          <div key={p.name} style={{ padding: "18px", borderRadius: "14px", background: "rgba(255,255,255,.04)", border: "1px solid rgba(255,255,255,.08)" }}>
            <p style={{ color: "#64748b", fontSize: "11px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "1px", marginBottom: "8px" }}>{p.name}</p>
            <p style={{ fontSize: "36px", fontWeight: 900, color: p.color, margin: 0 }}>{p.score}</p>
            <p style={{ color: "#475569", fontSize: "11px", margin: "4px 0 0" }}>/ {maxScore} pts</p>
          </div>
        ))}
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <button onClick={() => onFinish("again")} style={S.primaryBtn}>🔗 Play Again</button>
        <button onClick={() => onFinish("menu")} style={{ ...S.primaryBtn, background: "rgba(255,255,255,.06)", color: "#94a3b8" }}>
          Back to Games Zone
        </button>
      </div>
    </motion.div>
  );
}

// ── Main ──────────────────────────────────────────────────────────────────────
export default function WordChain() {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [phase, setPhase] = useState("menu"); // "menu" | "playing"
  const [chain, setChain] = useState(null);

  function handleStart(selectedChain) {
    setChain(selectedChain);
    setPhase("playing");
  }

  function handleFinish(action) {
    if (action === "again") {
      setChain(null);
      setPhase("menu");
    } else {
      navigate("/games");
    }
  }

  if (authLoading) {
    return (
      <div style={S.center}>
        <p style={{ color: "#94a3b8" }}>Loading…</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div style={S.center}>
        <p style={{ color: "#94a3b8" }}>Please sign in to play.</p>
      </div>
    );
  }

  return (
    <div style={S.page}>
      {/* Back button */}
      <motion.button
        onClick={() => navigate("/games")}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        style={{
          position: "fixed", top: "80px", left: "24px", zIndex: 50,
          display: "flex", alignItems: "center", gap: "6px",
          padding: "8px 16px", borderRadius: "10px", border: "none",
          background: "rgba(255,255,255,.06)", border: "1px solid rgba(255,255,255,.1)",
          color: "#94a3b8", fontSize: "13px", fontWeight: 600, cursor: "pointer",
        }}>
        <ArrowLeft size={14} /> Games Zone
      </motion.button>

      <AnimatePresence mode="wait">
        {phase === "menu" && (
          <motion.div key="menu" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <Menu onStart={handleStart} />
          </motion.div>
        )}

        {phase === "playing" && chain && (
          <motion.div key="playing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{ maxWidth: "720px", margin: "0 auto" }}>
            <GameScreen chain={chain} user={user} onFinish={handleFinish} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
