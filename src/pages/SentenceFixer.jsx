import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../context/AuthContext";
import { ArrowLeft, Timer, Wrench, CheckCircle } from "lucide-react";
import { SENTENCE_FIXER_QUESTIONS, simulateBotSentenceFixer } from "../data/sentenceFixerData";
import { getBotName } from "../utils/botEngine";

// ── constants ─────────────────────────────────────────────────────────────────
const TOTAL_QUESTIONS = 10;
const STEP_TIME = 25;
const POINTS_CORRECT = 10;
const POINTS_SPEED_BONUS = 5;
const SPEED_THRESHOLD = 10; // seconds remaining for bonus

// ── styles ────────────────────────────────────────────────────────────────────
const S = {
  page: {
    minHeight: "100vh",
    background:
      "radial-gradient(circle at 10% 15%, rgba(245,158,11,.10), transparent 40%), " +
      "radial-gradient(circle at 90% 80%, rgba(37,99,235,.10), transparent 40%), #060d1f",
    fontFamily: "Inter, sans-serif",
    padding: "80px 24px 60px",
  },
  center: {
    minHeight: "100vh",
    background:
      "radial-gradient(circle at 20% 20%, rgba(245,158,11,.08), transparent 40%), #060d1f",
    display: "flex", alignItems: "center", justifyContent: "center", padding: "24px",
  },
  card: {
    width: "100%", maxWidth: "560px",
    background: "rgba(255,255,255,.05)",
    border: "1px solid rgba(255,255,255,.1)",
    borderRadius: "28px", padding: "36px 32px",
    boxShadow: "0 30px 80px rgba(0,0,0,.4)",
  },
  heading: { color: "#f1f5f9", fontWeight: 900, margin: 0, letterSpacing: "-0.5px" },
  primaryBtn: {
    width: "100%", padding: "14px", borderRadius: "14px", border: "none",
    background: "linear-gradient(135deg,#f59e0b,#ef4444)",
    color: "white", fontWeight: 700, fontSize: "15px", cursor: "pointer",
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

function pickQuestions(n = TOTAL_QUESTIONS) {
  return shuffle(SENTENCE_FIXER_QUESTIONS).slice(0, n);
}

// ── Highlight error in sentence ───────────────────────────────────────────────
function HighlightSentence({ sentence, correctVersion }) {
  // Find differing words between original and correct
  const origWords = sentence.split(" ");
  const corrWords = correctVersion ? correctVersion.split(" ") : [];
  return (
    <p style={{ fontSize: "16px", lineHeight: 1.8, color: "#cbd5e1", margin: 0, fontStyle: "italic" }}>
      {origWords.map((word, i) => {
        const isDiff = corrWords[i] && word !== corrWords[i];
        return (
          <span key={i}>
            <span style={isDiff
              ? { color: "#f87171", textDecoration: "underline", textDecorationStyle: "wavy", textDecorationColor: "#ef4444" }
              : {}}>
              {word}
            </span>
            {i < origWords.length - 1 ? " " : ""}
          </span>
        );
      })}
    </p>
  );
}

// ── Intro Screen ──────────────────────────────────────────────────────────────
function IntroScreen({ onStart }) {
  const [mode, setMode] = useState("vs-bot");

  return (
    <div style={S.center}>
      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} style={S.card}>
        <div style={{ textAlign: "center", marginBottom: "28px" }}>
          <div style={{ fontSize: "48px", marginBottom: "12px" }}>🛠️</div>
          <h1 style={{ ...S.heading, fontSize: "26px", marginBottom: "8px" }}>Sentence Fixer</h1>
          <p style={{ color: "#94a3b8", fontSize: "13px", lineHeight: 1.7 }}>
            Spot the grammar error in each IELTS-style sentence and pick the corrected version.
            Train your grammar eye for Writing Band 7+.
          </p>
        </div>

        <div style={{ marginBottom: "20px" }}>
          <p style={{ color: "#64748b", fontSize: "11px", fontWeight: 700, letterSpacing: "1.5px", textTransform: "uppercase", marginBottom: "12px" }}>Mode</p>
          <div style={{ display: "flex", gap: "8px" }}>
            {[{ id: "vs-bot", label: "🤖 vs AI Bot", desc: "Race against the bot" }, { id: "solo", label: "🧠 Solo Practice", desc: "No pressure, just learn" }].map(m => (
              <button key={m.id} onClick={() => setMode(m.id)} style={{
                flex: 1, padding: "12px 14px", borderRadius: "12px", border: "none",
                background: mode === m.id ? "rgba(245,158,11,.2)" : "rgba(255,255,255,.04)",
                borderWidth: "1px", borderStyle: "solid",
                borderColor: mode === m.id ? "rgba(245,158,11,.5)" : "rgba(255,255,255,.08)",
                color: mode === m.id ? "#fcd34d" : "#94a3b8",
                fontSize: "13px", fontWeight: 700, cursor: "pointer",
                transition: "all .2s",
              }}>
                <div>{m.label}</div>
                <div style={{ fontSize: "11px", fontWeight: 400, marginTop: "3px", color: mode === m.id ? "#fbbf24" : "#64748b" }}>{m.desc}</div>
              </button>
            ))}
          </div>
        </div>

        <div style={{ background: "rgba(245,158,11,.08)", border: "1px solid rgba(245,158,11,.2)", borderRadius: "14px", padding: "14px 16px", marginBottom: "24px" }}>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "12px", fontSize: "12px", color: "#94a3b8", lineHeight: 1.6 }}>
            <span>✓ Correct: <strong style={{ color: "#4ade80" }}>+{POINTS_CORRECT} pts</strong></span>
            <span>⚡ Fast ({SPEED_THRESHOLD}s+): <strong style={{ color: "#fbbf24" }}>+{POINTS_SPEED_BONUS} bonus</strong></span>
            <span>⏱ {STEP_TIME}s per sentence</span>
            <span>📝 {TOTAL_QUESTIONS} sentences</span>
          </div>
        </div>

        <button onClick={() => onStart(mode)} style={S.primaryBtn}>
          🛠️ Start Fixing
        </button>
      </motion.div>
    </div>
  );
}

// ── Error Type Badge ──────────────────────────────────────────────────────────
const ERROR_COLORS = {
  tense: { bg: "rgba(99,102,241,.2)", border: "rgba(99,102,241,.4)", color: "#a5b4fc", label: "Tense" },
  agreement: { bg: "rgba(239,68,68,.15)", border: "rgba(239,68,68,.35)", color: "#f87171", label: "Agreement" },
  article: { bg: "rgba(34,197,94,.15)", border: "rgba(34,197,94,.35)", color: "#4ade80", label: "Article" },
  preposition: { bg: "rgba(245,158,11,.15)", border: "rgba(245,158,11,.35)", color: "#fcd34d", label: "Preposition" },
  word_form: { bg: "rgba(6,182,212,.15)", border: "rgba(6,182,212,.35)", color: "#67e8f9", label: "Word Form" },
  syntax: { bg: "rgba(139,92,246,.15)", border: "rgba(139,92,246,.35)", color: "#c4b5fd", label: "Syntax" },
};

function ErrorBadge({ type }) {
  const c = ERROR_COLORS[type] || ERROR_COLORS.syntax;
  return (
    <span style={{
      display: "inline-block", padding: "3px 10px", borderRadius: "999px",
      background: c.bg, border: `1px solid ${c.border}`, color: c.color,
      fontSize: "11px", fontWeight: 700,
    }}>
      {c.label} Error
    </span>
  );
}

// ── Game Screen ───────────────────────────────────────────────────────────────
function GameScreen({ mode, onFinish }) {
  const botName = useRef(mode === "vs-bot" ? getBotName() : null).current;
  const questions = useRef(pickQuestions()).current;
  const botPlan = useRef(mode === "vs-bot" ? simulateBotSentenceFixer(questions) : []).current;

  const [qIdx, setQIdx] = useState(0);
  const [myScore, setMyScore] = useState(0);
  const [botScore, setBotScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(STEP_TIME);
  const [selected, setSelected] = useState(null);
  const [feedback, setFeedback] = useState(null);
  const [history, setHistory] = useState([]);

  const timerRef = useRef(null);
  const botTimers = useRef([]);

  const q = questions[qIdx];
  const total = questions.length;

  // Reset and start timer per question
  useEffect(() => {
    setTimeLeft(STEP_TIME);
    setSelected(null);
    setFeedback(null);
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

    // Schedule bot answer for this question
    if (mode === "vs-bot") {
      botTimers.current.forEach(clearTimeout);
      botTimers.current = [];
      const plan = botPlan.find(p => p.index === qIdx);
      if (plan) {
        const t = setTimeout(() => {
          if (plan.correct) setBotScore(s => s + POINTS_CORRECT);
        }, Math.min(plan.delay, STEP_TIME * 1000 - 500));
        botTimers.current.push(t);
      }
    }

    return () => {
      clearInterval(timerRef.current);
      botTimers.current.forEach(clearTimeout);
    };
  }, [qIdx]);

  function handleTimeout() {
    if (selected !== null) return;
    setFeedback("timeout");
    setHistory(prev => [...prev, { qIdx, correct: false, selectedIdx: null }]);
    advance();
  }

  function handleAnswer(optIdx) {
    if (selected !== null) return;
    clearInterval(timerRef.current);
    botTimers.current.forEach(clearTimeout);
    setSelected(optIdx);

    const correct = optIdx === q.answer;
    const speedBonus = correct && timeLeft >= SPEED_THRESHOLD ? POINTS_SPEED_BONUS : 0;
    const gain = correct ? POINTS_CORRECT + speedBonus : 0;

    setMyScore(s => s + gain);
    setFeedback(correct ? (speedBonus > 0 ? "speed" : "correct") : "wrong");
    setHistory(prev => [...prev, { qIdx, correct, selectedIdx: optIdx, speedBonus }]);
    advance();
  }

  function advance() {
    setTimeout(() => {
      if (qIdx + 1 >= total) {
        onFinish({ myScore: 0, botScore: 0, questions, history: [] }); // passed via state
      } else {
        setQIdx(i => i + 1);
      }
    }, 2200);
  }

  const pct = (timeLeft / STEP_TIME) * 100;
  const timerColor = timeLeft > 12 ? "#f59e0b" : timeLeft > 6 ? "#ef4444" : "#dc2626";

  return (
    <div style={{ maxWidth: "760px", margin: "0 auto" }}>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <span style={{ color: "#64748b", fontSize: "12px", fontWeight: 700 }}>
            {qIdx + 1} / {total}
          </span>
          <ErrorBadge type={q.errorType} />
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "6px", padding: "7px 14px", borderRadius: "10px", background: "rgba(255,255,255,.05)", border: `1px solid ${timerColor}50` }}>
          <Timer size={13} color={timerColor} />
          <span style={{ fontWeight: 900, fontSize: "19px", color: timerColor, fontVariantNumeric: "tabular-nums" }}>{timeLeft}</span>
        </div>

        {mode === "vs-bot" && (
          <div style={{ display: "flex", gap: "16px" }}>
            {[{ name: "You", score: myScore, color: "#f59e0b" }, { name: botName.split(" ")[0], score: botScore, color: "#f472b6" }].map(p => (
              <div key={p.name} style={{ textAlign: "center" }}>
                <p style={{ color: "#64748b", fontSize: "10px", fontWeight: 700, textTransform: "uppercase", margin: 0 }}>{p.name}</p>
                <p style={{ color: p.color, fontWeight: 900, fontSize: "18px", margin: "2px 0 0", fontVariantNumeric: "tabular-nums" }}>{p.score}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Progress bar */}
      <div style={{ height: "4px", background: "rgba(255,255,255,.06)", borderRadius: "999px", marginBottom: "20px", overflow: "hidden" }}>
        <motion.div animate={{ width: `${(qIdx / total) * 100}%` }} transition={{ duration: 0.4 }}
          style={{ height: "100%", background: "linear-gradient(90deg,#f59e0b,#ef4444)", borderRadius: "999px" }} />
      </div>
      <div style={{ height: "4px", background: "rgba(255,255,255,.04)", borderRadius: "999px", marginBottom: "24px", overflow: "hidden" }}>
        <motion.div animate={{ width: `${pct}%` }} transition={{ duration: 0.5, ease: "linear" }}
          style={{ height: "100%", background: timerColor, borderRadius: "999px" }} />
      </div>

      {/* Instruction */}
      <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "14px" }}>
        <Wrench size={14} color="#f59e0b" />
        <span style={{ color: "#f59e0b", fontWeight: 700, fontSize: "12px", textTransform: "uppercase", letterSpacing: "1px" }}>
          {q.errorHint}
        </span>
      </div>

      {/* Original sentence */}
      <AnimatePresence mode="wait">
        <motion.div key={qIdx} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }}
          style={{ background: "rgba(255,255,255,.04)", border: "1px solid rgba(245,158,11,.2)", borderRadius: "18px", padding: "22px", marginBottom: "20px" }}>
          <p style={{ color: "#64748b", fontSize: "11px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "1px", marginBottom: "10px" }}>
            Original Sentence — find the error
          </p>
          <HighlightSentence
            sentence={q.sentence}
            correctVersion={selected !== null || feedback === "timeout" ? q.options[q.answer] : null}
          />
        </motion.div>
      </AnimatePresence>

      {/* Options */}
      <p style={{ color: "#64748b", fontSize: "11px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "1px", marginBottom: "12px" }}>
        Choose the corrected sentence:
      </p>
      <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "16px" }}>
        {q.options.map((opt, i) => {
          let bg = "rgba(255,255,255,.03)";
          let border = "1px solid rgba(255,255,255,.07)";
          let color = "#94a3b8";
          if (selected !== null || feedback === "timeout") {
            if (i === q.answer) { bg = "rgba(34,197,94,.12)"; border = "1px solid #22c55e60"; color = "#4ade80"; }
            else if (i === selected) { bg = "rgba(239,68,68,.12)"; border = "1px solid #ef444460"; color = "#f87171"; }
          }
          return (
            <motion.button key={i}
              whileHover={selected === null ? { scale: 1.008 } : {}}
              whileTap={selected === null ? { scale: 0.995 } : {}}
              onClick={() => handleAnswer(i)}
              style={{ padding: "14px 16px", borderRadius: "14px", border, background: bg, color, fontSize: "13.5px", fontWeight: 400, lineHeight: 1.7, cursor: selected === null ? "pointer" : "default", textAlign: "left", display: "flex", alignItems: "flex-start", gap: "10px" }}>
              <span style={{ display: "inline-flex", minWidth: "22px", height: "22px", borderRadius: "6px", background: "rgba(255,255,255,.07)", alignItems: "center", justifyContent: "center", fontSize: "11px", fontWeight: 800, flexShrink: 0, marginTop: "1px" }}>
                {["A","B","C","D"][i]}
              </span>
              {opt}
            </motion.button>
          );
        })}
      </div>

      {/* Feedback */}
      <AnimatePresence>
        {feedback && (
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
            style={{ padding: "14px 16px", borderRadius: "14px",
              background: feedback === "correct" || feedback === "speed" ? "rgba(34,197,94,.1)" : "rgba(239,68,68,.08)",
              border: `1px solid ${feedback === "correct" || feedback === "speed" ? "rgba(34,197,94,.3)" : "rgba(239,68,68,.25)"}` }}>
            <p style={{ margin: "0 0 6px", fontWeight: 700, fontSize: "13px",
              color: feedback === "correct" || feedback === "speed" ? "#4ade80" : feedback === "timeout" ? "#fbbf24" : "#f87171" }}>
              {feedback === "speed" ? `⚡ Perfect! +${POINTS_CORRECT + POINTS_SPEED_BONUS} pts`
                : feedback === "correct" ? `✓ Correct! +${POINTS_CORRECT} pts`
                : feedback === "timeout" ? "⏰ Time's up!"
                : "✗ Incorrect"}
            </p>
            <p style={{ margin: 0, color: "#94a3b8", fontSize: "12px", lineHeight: 1.6 }}>
              💡 {q.explanation}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ── Results Screen ────────────────────────────────────────────────────────────
function ResultsScreen({ myScore, botScore, botName, mode, questions, history, onPlayAgain, onExit }) {
  const maxScore = questions.length * (POINTS_CORRECT + POINTS_SPEED_BONUS);
  const iWon = mode === "vs-bot" ? myScore > botScore : true;
  const tied = mode === "vs-bot" ? myScore === botScore : false;
  const correctCount = history.filter(h => h.correct).length;
  const speedCount = history.filter(h => h.speedBonus > 0).length;

  return (
    <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
      style={{ ...S.card, margin: "0 auto" }}>
      <div style={{ textAlign: "center", marginBottom: "24px" }}>
        <div style={{ fontSize: "52px", marginBottom: "14px" }}>
          {mode === "solo" ? "🛠️" : tied ? "🤝" : iWon ? "🏆" : "📝"}
        </div>
        <h1 style={{ ...S.heading, fontSize: "24px", marginBottom: "8px" }}>
          {mode === "solo" ? "Practice Complete!" : tied ? "It's a Tie!" : iWon ? "You Win!" : `${botName?.split(" ")[0]} Wins!`}
        </h1>

        {/* Quick stats */}
        <div style={{ display: "flex", justifyContent: "center", gap: "20px", marginTop: "16px" }}>
          {[
            { label: "Correct", value: `${correctCount}/${questions.length}`, color: "#4ade80" },
            { label: "Speed Bonus", value: `×${speedCount}`, color: "#fbbf24" },
            { label: "Score", value: myScore, color: "#f59e0b" },
          ].map(s => (
            <div key={s.label} style={{ textAlign: "center" }}>
              <p style={{ fontSize: "22px", fontWeight: 900, color: s.color, margin: 0 }}>{s.value}</p>
              <p style={{ color: "#64748b", fontSize: "11px", fontWeight: 700, margin: "3px 0 0" }}>{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {mode === "vs-bot" && (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "20px" }}>
          {[{ name: "You", score: myScore, color: "#f59e0b" }, { name: botName, score: botScore, color: "#f472b6" }].map(p => (
            <div key={p.name} style={{ padding: "16px", borderRadius: "14px", background: "rgba(255,255,255,.04)", border: "1px solid rgba(255,255,255,.07)", textAlign: "center" }}>
              <p style={{ color: "#64748b", fontSize: "10px", fontWeight: 700, textTransform: "uppercase", margin: 0 }}>{p.name}</p>
              <p style={{ fontSize: "32px", fontWeight: 900, color: p.color, margin: "4px 0 0" }}>{p.score}</p>
              <p style={{ color: "#475569", fontSize: "11px" }}>/ {maxScore} pts</p>
            </div>
          ))}
        </div>
      )}

      {/* Review incorrect */}
      {history.some(h => !h.correct) && (
        <div style={{ marginBottom: "20px" }}>
          <p style={{ color: "#64748b", fontSize: "11px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "1px", marginBottom: "10px" }}>
            Review Errors
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: "8px", maxHeight: "200px", overflowY: "auto" }}>
            {history.filter(h => !h.correct).map((h, i) => {
              const qq = questions[h.qIdx];
              return (
                <div key={i} style={{ padding: "10px 12px", borderRadius: "10px", background: "rgba(239,68,68,.07)", border: "1px solid rgba(239,68,68,.2)" }}>
                  <p style={{ color: "#f87171", fontSize: "11px", fontWeight: 700, margin: "0 0 4px" }}>
                    Q{h.qIdx + 1} — <ErrorBadge type={qq.errorType} />
                  </p>
                  <p style={{ color: "#4ade80", fontSize: "12px", margin: 0, lineHeight: 1.5 }}>✓ {qq.options[qq.answer]}</p>
                </div>
              );
            })}
          </div>
        </div>
      )}

      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <button onClick={onPlayAgain} style={S.primaryBtn}>🛠️ Play Again</button>
        <button onClick={onExit} style={{ ...S.primaryBtn, background: "rgba(255,255,255,.06)", color: "#94a3b8" }}>
          Back to Games Zone
        </button>
      </div>
    </motion.div>
  );
}

// ── Main ──────────────────────────────────────────────────────────────────────
export default function SentenceFixer() {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [phase, setPhase] = useState("intro"); // "intro" | "playing" | "results"
  const [mode, setMode] = useState("vs-bot");
  const [results, setResults] = useState(null);
  const [gameKey, setGameKey] = useState(0);
  const botNameRef = useRef(null);

  function handleStart(selectedMode) {
    setMode(selectedMode);
    botNameRef.current = getBotName();
    setPhase("playing");
  }

  // We track score via a callback from GameScreen via a lifted-up approach
  const [myScore, setMyScore] = useState(0);
  const [botScore, setBotScore] = useState(0);
  const [history, setHistory] = useState([]);
  const [questions, setQuestions] = useState([]);

  function handleGameFinish(data) {
    setResults(data);
    setPhase("results");
  }

  if (authLoading) return <div style={S.center}><p style={{ color: "#94a3b8" }}>Loading…</p></div>;
  if (!user) return <div style={S.center}><p style={{ color: "#94a3b8" }}>Please sign in to play.</p></div>;

  return (
    <div style={S.page}>
      <motion.button onClick={() => navigate("/games")} initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        style={{ position: "fixed", top: "80px", left: "24px", zIndex: 50, display: "flex", alignItems: "center", gap: "6px", padding: "8px 16px", borderRadius: "10px", border: "none", background: "rgba(255,255,255,.06)", borderWidth: "1px", borderStyle: "solid", borderColor: "rgba(255,255,255,.1)", color: "#94a3b8", fontSize: "13px", fontWeight: 600, cursor: "pointer" }}>
        <ArrowLeft size={14} /> Games Zone
      </motion.button>

      <AnimatePresence mode="wait">
        {phase === "intro" && (
          <motion.div key="intro" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <IntroScreen onStart={handleStart} />
          </motion.div>
        )}

        {phase === "playing" && (
          <motion.div key={`playing-${gameKey}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{ maxWidth: "780px", margin: "0 auto" }}>
            <SentenceFixerGame key={gameKey} mode={mode} botName={botNameRef.current} navigate={navigate} onRestart={() => { setGameKey(k => k + 1); setPhase("intro"); }} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ── Unified self-contained game component ─────────────────────────────────────
function SentenceFixerGame({ mode, botName, navigate, onRestart }) {
  const questions = useRef(pickQuestions()).current;
  const botPlan = useRef(mode === "vs-bot" ? simulateBotSentenceFixer(questions) : []).current;

  const [qIdx, setQIdx] = useState(0);
  const [myScore, setMyScore] = useState(0);
  const [botScore, setBotScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(STEP_TIME);
  const [selected, setSelected] = useState(null);
  const [feedback, setFeedback] = useState(null);
  const [history, setHistory] = useState([]);
  const [phase, setPhase] = useState("playing"); // "playing" | "results"

  const timerRef = useRef(null);
  const botTimers = useRef([]);

  const q = questions[qIdx];
  const total = questions.length;

  useEffect(() => {
    setTimeLeft(STEP_TIME);
    setSelected(null);
    setFeedback(null);
    clearInterval(timerRef.current);

    timerRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) { clearInterval(timerRef.current); doTimeout(); return 0; }
        return prev - 1;
      });
    }, 1000);

    // Bot answer
    if (mode === "vs-bot") {
      botTimers.current.forEach(clearTimeout);
      botTimers.current = [];
      const plan = botPlan.find(p => p.index === qIdx);
      if (plan) {
        const t = setTimeout(() => {
          if (plan.correct) setBotScore(s => s + POINTS_CORRECT);
        }, Math.min(plan.delay, STEP_TIME * 1000 - 600));
        botTimers.current.push(t);
      }
    }

    return () => { clearInterval(timerRef.current); botTimers.current.forEach(clearTimeout); };
  }, [qIdx]);

  function doTimeout() {
    setFeedback("timeout");
    setHistory(prev => [...prev, { qIdx, correct: false, selectedIdx: null, speedBonus: 0 }]);
    doAdvance();
  }

  function handleAnswer(optIdx) {
    if (selected !== null) return;
    clearInterval(timerRef.current);
    botTimers.current.forEach(clearTimeout);
    setSelected(optIdx);
    const correct = optIdx === q.answer;
    const speedBonus = correct && timeLeft >= SPEED_THRESHOLD ? POINTS_SPEED_BONUS : 0;
    const gain = correct ? POINTS_CORRECT + speedBonus : 0;
    setMyScore(s => s + gain);
    setFeedback(correct ? (speedBonus > 0 ? "speed" : "correct") : "wrong");
    setHistory(prev => [...prev, { qIdx, correct, selectedIdx: optIdx, speedBonus }]);
    doAdvance();
  }

  function doAdvance() {
    setTimeout(() => {
      if (qIdx + 1 >= total) setPhase("results");
      else setQIdx(i => i + 1);
    }, 2200);
  }

  if (phase === "results") {
    const maxScore = total * (POINTS_CORRECT + POINTS_SPEED_BONUS);
    const iWon = mode === "vs-bot" ? myScore > botScore : true;
    const tied = mode === "vs-bot" ? myScore === botScore : false;
    const correctCount = history.filter(h => h.correct).length;
    const speedCount = history.filter(h => h.speedBonus > 0).length;

    return (
      <div style={S.center}>
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} style={S.card}>
          <div style={{ textAlign: "center", marginBottom: "24px" }}>
            <div style={{ fontSize: "52px", marginBottom: "14px" }}>
              {mode === "solo" ? "🛠️" : tied ? "🤝" : iWon ? "🏆" : "📝"}
            </div>
            <h1 style={{ ...S.heading, fontSize: "24px", marginBottom: "16px" }}>
              {mode === "solo" ? "Practice Complete!" : tied ? "It's a Tie!" : iWon ? "You Win!" : `${botName?.split(" ")[0]} Wins!`}
            </h1>
            <div style={{ display: "flex", justifyContent: "center", gap: "24px" }}>
              {[
                { label: "Correct", value: `${correctCount}/${total}`, color: "#4ade80" },
                { label: "Speed Bonus", value: `×${speedCount}`, color: "#fbbf24" },
                { label: "Score", value: myScore, color: "#f59e0b" },
              ].map(s => (
                <div key={s.label}>
                  <p style={{ fontSize: "24px", fontWeight: 900, color: s.color, margin: 0 }}>{s.value}</p>
                  <p style={{ color: "#64748b", fontSize: "11px", fontWeight: 700, margin: "3px 0 0" }}>{s.label}</p>
                </div>
              ))}
            </div>
          </div>

          {mode === "vs-bot" && (
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "20px" }}>
              {[{ name: "You", score: myScore, color: "#f59e0b" }, { name: botName, score: botScore, color: "#f472b6" }].map(p => (
                <div key={p.name} style={{ padding: "16px", borderRadius: "14px", background: "rgba(255,255,255,.04)", border: "1px solid rgba(255,255,255,.07)", textAlign: "center" }}>
                  <p style={{ color: "#64748b", fontSize: "10px", fontWeight: 700, textTransform: "uppercase", margin: 0 }}>{p.name}</p>
                  <p style={{ fontSize: "30px", fontWeight: 900, color: p.color, margin: "4px 0" }}>{p.score}</p>
                  <p style={{ color: "#475569", fontSize: "11px", margin: 0 }}>/ {maxScore} pts</p>
                </div>
              ))}
            </div>
          )}

          {history.some(h => !h.correct) && (
            <div style={{ marginBottom: "20px" }}>
              <p style={{ color: "#64748b", fontSize: "11px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "1px", marginBottom: "10px" }}>Review Errors</p>
              <div style={{ display: "flex", flexDirection: "column", gap: "8px", maxHeight: "180px", overflowY: "auto" }}>
                {history.filter(h => !h.correct).map((h, i) => {
                  const qq = questions[h.qIdx];
                  return (
                    <div key={i} style={{ padding: "10px 12px", borderRadius: "10px", background: "rgba(239,68,68,.07)", border: "1px solid rgba(239,68,68,.2)" }}>
                      <p style={{ color: "#f87171", fontSize: "11px", fontWeight: 700, margin: "0 0 4px" }}>Q{h.qIdx + 1}</p>
                      <p style={{ color: "#4ade80", fontSize: "12px", margin: 0, lineHeight: 1.5 }}>✓ {qq.options[qq.answer]}</p>
                      <p style={{ color: "#94a3b8", fontSize: "11px", margin: "4px 0 0" }}>💡 {qq.explanation}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            <button onClick={onRestart} style={S.primaryBtn}>🛠️ Play Again</button>
            <button onClick={() => navigate("/games")} style={{ ...S.primaryBtn, background: "rgba(255,255,255,.06)", color: "#94a3b8" }}>
              Back to Games Zone
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  const pct = (timeLeft / STEP_TIME) * 100;
  const timerColor = timeLeft > 12 ? "#f59e0b" : timeLeft > 6 ? "#ef4444" : "#dc2626";

  return (
    <div>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <span style={{ color: "#64748b", fontSize: "12px", fontWeight: 700 }}>{qIdx + 1} / {total}</span>
          <ErrorBadge type={q.errorType} />
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "6px", padding: "7px 14px", borderRadius: "10px", background: "rgba(255,255,255,.05)", borderWidth: "1px", borderStyle: "solid", borderColor: `${timerColor}50` }}>
          <Timer size={13} color={timerColor} />
          <span style={{ fontWeight: 900, fontSize: "19px", color: timerColor, fontVariantNumeric: "tabular-nums" }}>{timeLeft}</span>
        </div>
        {mode === "vs-bot" && (
          <div style={{ display: "flex", gap: "16px" }}>
            {[{ name: "You", score: myScore, color: "#f59e0b" }, { name: botName?.split(" ")[0], score: botScore, color: "#f472b6" }].map(p => (
              <div key={p.name} style={{ textAlign: "center" }}>
                <p style={{ color: "#64748b", fontSize: "10px", fontWeight: 700, textTransform: "uppercase", margin: 0 }}>{p.name}</p>
                <p style={{ color: p.color, fontWeight: 900, fontSize: "18px", margin: "2px 0 0", fontVariantNumeric: "tabular-nums" }}>{p.score}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Progress bars */}
      <div style={{ height: "4px", background: "rgba(255,255,255,.06)", borderRadius: "999px", marginBottom: "6px", overflow: "hidden" }}>
        <motion.div animate={{ width: `${((qIdx) / total) * 100}%` }} transition={{ duration: 0.4 }}
          style={{ height: "100%", background: "linear-gradient(90deg,#f59e0b,#ef4444)", borderRadius: "999px" }} />
      </div>
      <div style={{ height: "3px", background: "rgba(255,255,255,.04)", borderRadius: "999px", marginBottom: "24px", overflow: "hidden" }}>
        <motion.div animate={{ width: `${pct}%` }} transition={{ duration: 0.5, ease: "linear" }}
          style={{ height: "100%", background: timerColor, borderRadius: "999px" }} />
      </div>

      {/* Hint */}
      <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "12px" }}>
        <Wrench size={14} color="#f59e0b" />
        <span style={{ color: "#f59e0b", fontWeight: 700, fontSize: "12px", textTransform: "uppercase", letterSpacing: "1px" }}>
          {q.errorHint}
        </span>
      </div>

      {/* Original sentence card */}
      <AnimatePresence mode="wait">
        <motion.div key={qIdx} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }}
          style={{ background: "rgba(255,255,255,.04)", borderWidth: "1px", borderStyle: "solid", borderColor: "rgba(245,158,11,.2)", borderRadius: "18px", padding: "20px 22px", marginBottom: "18px" }}>
          <p style={{ color: "#64748b", fontSize: "11px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "1px", marginBottom: "10px" }}>
            Original — find the error
          </p>
          <HighlightSentence
            sentence={q.sentence}
            correctVersion={selected !== null || feedback === "timeout" ? q.options[q.answer] : null}
          />
        </motion.div>
      </AnimatePresence>

      {/* Options */}
      <p style={{ color: "#64748b", fontSize: "11px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "1px", marginBottom: "10px" }}>
        Choose the corrected sentence:
      </p>
      <div style={{ display: "flex", flexDirection: "column", gap: "9px", marginBottom: "14px" }}>
        {q.options.map((opt, i) => {
          let bg = "rgba(255,255,255,.03)";
          let borderColor = "rgba(255,255,255,.07)";
          let color = "#94a3b8";
          if (selected !== null || feedback === "timeout") {
            if (i === q.answer) { bg = "rgba(34,197,94,.12)"; borderColor = "#22c55e60"; color = "#4ade80"; }
            else if (i === selected) { bg = "rgba(239,68,68,.12)"; borderColor = "#ef444460"; color = "#f87171"; }
          }
          return (
            <motion.button key={i}
              whileHover={selected === null ? { scale: 1.005 } : {}}
              whileTap={selected === null ? { scale: 0.998 } : {}}
              onClick={() => handleAnswer(i)}
              style={{ padding: "13px 16px", borderRadius: "13px", borderWidth: "1px", borderStyle: "solid", borderColor, background: bg, color, fontSize: "13px", fontWeight: 400, lineHeight: 1.7, cursor: selected === null ? "pointer" : "default", textAlign: "left", display: "flex", alignItems: "flex-start", gap: "10px" }}>
              <span style={{ display: "inline-flex", minWidth: "21px", height: "21px", borderRadius: "5px", background: "rgba(255,255,255,.07)", alignItems: "center", justifyContent: "center", fontSize: "10px", fontWeight: 800, flexShrink: 0, marginTop: "2px" }}>
                {["A","B","C","D"][i]}
              </span>
              {opt}
            </motion.button>
          );
        })}
      </div>

      {/* Feedback */}
      <AnimatePresence>
        {feedback && (
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
            style={{ padding: "13px 16px", borderRadius: "13px",
              background: feedback === "correct" || feedback === "speed" ? "rgba(34,197,94,.1)" : "rgba(239,68,68,.08)",
              borderWidth: "1px", borderStyle: "solid",
              borderColor: feedback === "correct" || feedback === "speed" ? "rgba(34,197,94,.3)" : "rgba(239,68,68,.25)" }}>
            <p style={{ margin: "0 0 5px", fontWeight: 700, fontSize: "13px",
              color: feedback === "correct" || feedback === "speed" ? "#4ade80" : feedback === "timeout" ? "#fbbf24" : "#f87171" }}>
              {feedback === "speed" ? `⚡ Perfect! +${POINTS_CORRECT + POINTS_SPEED_BONUS} pts`
                : feedback === "correct" ? `✓ Correct! +${POINTS_CORRECT} pts`
                : feedback === "timeout" ? "⏰ Time's up!"
                : "✗ Incorrect"}
            </p>
            <p style={{ margin: 0, color: "#94a3b8", fontSize: "12px", lineHeight: 1.6 }}>
              💡 {q.explanation}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
