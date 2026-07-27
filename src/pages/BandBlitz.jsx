import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../context/AuthContext";
import { ArrowLeft, Timer, Zap } from "lucide-react";
import { BAND_BLITZ_ROUNDS, simulateBotBandBlitz } from "../data/bandBlitzData";
import { getBotName } from "../utils/botEngine";

// ── constants ─────────────────────────────────────────────────────────────────
const TOTAL_ROUNDS = 10;
const STEP_TIME = 18;
const POINTS_CORRECT = 10;
const POINTS_SPEED = 5; // answered in first 8s

const BAND_META = {
  5: { color: "#ef4444", bg: "rgba(239,68,68,.18)", border: "rgba(239,68,68,.4)", label: "Band 5", emoji: "📝" },
  6: { color: "#f59e0b", bg: "rgba(245,158,11,.18)", border: "rgba(245,158,11,.4)", label: "Band 6", emoji: "📋" },
  7: { color: "#22c55e", bg: "rgba(34,197,94,.18)", border: "rgba(34,197,94,.4)", label: "Band 7", emoji: "⭐" },
  8: { color: "#60a5fa", bg: "rgba(96,165,250,.18)", border: "rgba(96,165,250,.4)", label: "Band 8", emoji: "🏆" },
};

const SKILL_LABELS = {
  vocabulary: { label: "Vocabulary", color: "#a78bfa" },
  grammar: { label: "Grammar", color: "#f472b6" },
  coherence: { label: "Coherence", color: "#34d399" },
  task_response: { label: "Task Response", color: "#fbbf24" },
};

// ── styles ────────────────────────────────────────────────────────────────────
const S = {
  page: {
    minHeight: "100vh",
    background:
      "radial-gradient(circle at 20% 10%, rgba(96,165,250,.12), transparent 40%)," +
      "radial-gradient(circle at 80% 85%, rgba(34,197,94,.1), transparent 40%), #060d1f",
    fontFamily: "Inter, sans-serif",
    padding: "80px 24px 60px",
  },
  center: {
    minHeight: "100vh",
    background: "radial-gradient(circle at 30% 30%, rgba(96,165,250,.10), transparent 40%), #060d1f",
    display: "flex", alignItems: "center", justifyContent: "center", padding: "24px",
  },
  card: {
    width: "100%", maxWidth: "560px",
    background: "rgba(255,255,255,.05)", border: "1px solid rgba(255,255,255,.1)",
    borderRadius: "28px", padding: "36px 32px",
    boxShadow: "0 30px 80px rgba(0,0,0,.5)",
  },
  heading: { color: "#f1f5f9", fontWeight: 900, margin: 0, letterSpacing: "-0.5px" },
  primaryBtn: {
    width: "100%", padding: "14px", borderRadius: "14px", border: "none",
    background: "linear-gradient(135deg,#2563eb,#22c55e)",
    color: "white", fontWeight: 700, fontSize: "15px", cursor: "pointer",
  },
};

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function pickRounds(n = TOTAL_ROUNDS) {
  return shuffle(BAND_BLITZ_ROUNDS).slice(0, n);
}

// ── Intro Screen ──────────────────────────────────────────────────────────────
function IntroScreen({ onStart }) {
  return (
    <div style={S.center}>
      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} style={S.card}>
        <div style={{ textAlign: "center", marginBottom: "28px" }}>
          <div style={{ fontSize: "52px", marginBottom: "12px" }}>🎯</div>
          <h1 style={{ ...S.heading, fontSize: "28px", marginBottom: "10px" }}>Band Blitz</h1>
          <p style={{ color: "#94a3b8", fontSize: "14px", lineHeight: 1.75 }}>
            Read a real IELTS student sentence and guess its band score — 5, 6, 7 or 8.
            Train your eye for what examiners actually reward.
          </p>
        </div>

        {/* Band legend */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", marginBottom: "24px" }}>
          {Object.entries(BAND_META).map(([band, m]) => (
            <div key={band} style={{ padding: "12px 14px", borderRadius: "12px", background: m.bg, border: `1px solid ${m.border}`, display: "flex", alignItems: "center", gap: "10px" }}>
              <span style={{ fontSize: "20px" }}>{m.emoji}</span>
              <div>
                <p style={{ color: m.color, fontWeight: 800, fontSize: "14px", margin: 0 }}>{m.label}</p>
                <p style={{ color: "#64748b", fontSize: "11px", margin: 0 }}>
                  {band === "5" ? "Basic, errors, informal"
                    : band === "6" ? "Adequate, some range"
                    : band === "7" ? "Good range, mostly accurate"
                    : "Sophisticated, precise, fluid"}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div style={{ background: "rgba(96,165,250,.08)", border: "1px solid rgba(96,165,250,.2)", borderRadius: "14px", padding: "14px 16px", marginBottom: "24px", fontSize: "12px", color: "#94a3b8", lineHeight: 1.8 }}>
          ✓ Correct guess: <strong style={{ color: "#4ade80" }}>+{POINTS_CORRECT} pts</strong> &nbsp;|&nbsp;
          ⚡ Fast (within 8s): <strong style={{ color: "#fbbf24" }}>+{POINTS_SPEED} bonus</strong> &nbsp;|&nbsp;
          ⏱ {STEP_TIME}s per round &nbsp;|&nbsp;
          📝 {TOTAL_ROUNDS} sentences
        </div>

        <button onClick={onStart} style={S.primaryBtn}>🎯 Start Band Blitz</button>
      </motion.div>
    </div>
  );
}

// ── Skill Badge ───────────────────────────────────────────────────────────────
function SkillBadge({ skill }) {
  const m = SKILL_LABELS[skill];
  return (
    <span style={{
      display: "inline-block", padding: "3px 10px", borderRadius: "999px",
      background: `${m.color}18`, border: `1px solid ${m.color}40`,
      color: m.color, fontSize: "11px", fontWeight: 700,
    }}>{m.label}</span>
  );
}

// ── Band Button ───────────────────────────────────────────────────────────────
function BandButton({ band, selected, correct, disabled, onClick }) {
  const m = BAND_META[band];
  let bg = "rgba(255,255,255,.04)";
  let border = `1px solid rgba(255,255,255,.08)`;
  let scale = 1;

  if (selected !== null || disabled) {
    if (band === correct) { bg = m.bg; border = `1px solid ${m.border}`; }
    else if (band === selected) { bg = "rgba(239,68,68,.15)"; border = "1px solid rgba(239,68,68,.4)"; }
  }

  return (
    <motion.button
      whileHover={selected === null && !disabled ? { scale: 1.04 } : {}}
      whileTap={selected === null && !disabled ? { scale: 0.96 } : {}}
      onClick={() => !disabled && selected === null && onClick(band)}
      style={{
        padding: "18px 12px", borderRadius: "16px", border, background: bg,
        cursor: selected === null && !disabled ? "pointer" : "default",
        display: "flex", flexDirection: "column", alignItems: "center", gap: "6px",
      }}>
      <span style={{ fontSize: "24px" }}>{m.emoji}</span>
      <span style={{ color: band === correct && selected !== null ? m.color : band === selected ? "#f87171" : "#94a3b8", fontWeight: 900, fontSize: "18px" }}>{m.label}</span>
    </motion.button>
  );
}

// ── Game Component ────────────────────────────────────────────────────────────
function BandBlitzGame({ botName, navigate, onRestart }) {
  const rounds = useRef(pickRounds()).current;
  const botPlan = useRef(simulateBotBandBlitz(rounds)).current;

  const [idx, setIdx] = useState(0);
  const [myScore, setMyScore] = useState(0);
  const [botScore, setBotScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(STEP_TIME);
  const [selected, setSelected] = useState(null);
  const [feedback, setFeedback] = useState(null);
  const [history, setHistory] = useState([]);
  const [phase, setPhase] = useState("playing");
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);

  const timerRef = useRef(null);
  const botTimers = useRef([]);

  const round = rounds[idx];
  const total = rounds.length;

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

    botTimers.current.forEach(clearTimeout);
    botTimers.current = [];
    const plan = botPlan.find(p => p.index === idx);
    if (plan) {
      const t = setTimeout(() => {
        if (plan.correct) setBotScore(s => s + POINTS_CORRECT);
      }, Math.min(plan.delay, STEP_TIME * 1000 - 600));
      botTimers.current.push(t);
    }

    return () => { clearInterval(timerRef.current); botTimers.current.forEach(clearTimeout); };
  }, [idx]);

  function doTimeout() {
    setFeedback("timeout");
    setStreak(0);
    setHistory(prev => [...prev, { idx, correct: false, selected: null }]);
    advance();
  }

  function handleGuess(band) {
    if (selected !== null) return;
    clearInterval(timerRef.current);
    botTimers.current.forEach(clearTimeout);
    setSelected(band);

    const correct = band === round.band;
    const speedBonus = correct && timeLeft >= (STEP_TIME - 8) ? POINTS_SPEED : 0;
    const gain = correct ? POINTS_CORRECT + speedBonus : 0;
    setMyScore(s => s + gain);
    const newStreak = correct ? streak + 1 : 0;
    setStreak(newStreak);
    setBestStreak(prev => Math.max(prev, newStreak));
    setFeedback(correct ? (speedBonus > 0 ? "speed" : "correct") : "wrong");
    setHistory(prev => [...prev, { idx, correct, selected: band, speedBonus }]);
    advance();
  }

  function advance() {
    setTimeout(() => {
      if (idx + 1 >= total) setPhase("results");
      else setIdx(i => i + 1);
    }, 2500);
  }

  // ── Results ──────────────────────────────────────────────────────────────
  if (phase === "results") {
    const iWon = myScore > botScore;
    const tied = myScore === botScore;
    const correctCount = history.filter(h => h.correct).length;

    return (
      <div style={S.center}>
        <motion.div initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }} style={{ ...S.card, maxWidth: "580px" }}>
          <div style={{ textAlign: "center", marginBottom: "24px" }}>
            <div style={{ fontSize: "52px", marginBottom: "12px" }}>{tied ? "🤝" : iWon ? "🏆" : "🎯"}</div>
            <h1 style={{ ...S.heading, fontSize: "24px", marginBottom: "14px" }}>
              {tied ? "It's a Tie!" : iWon ? "You Win!" : `${botName?.split(" ")[0]} Wins!`}
            </h1>
            <div style={{ display: "flex", justifyContent: "center", gap: "24px" }}>
              {[
                { label: "Correct", value: `${correctCount}/${total}`, color: "#4ade80" },
                { label: "Best Streak", value: `🔥 ${bestStreak}`, color: "#fbbf24" },
                { label: "Score", value: myScore, color: "#60a5fa" },
              ].map(s => (
                <div key={s.label} style={{ textAlign: "center" }}>
                  <p style={{ fontSize: "22px", fontWeight: 900, color: s.color, margin: 0 }}>{s.value}</p>
                  <p style={{ color: "#64748b", fontSize: "11px", fontWeight: 700, margin: "3px 0 0" }}>{s.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* vs bot */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "20px" }}>
            {[{ name: "You", score: myScore, color: "#60a5fa" }, { name: botName, score: botScore, color: "#f472b6" }].map(p => (
              <div key={p.name} style={{ padding: "16px", borderRadius: "14px", background: "rgba(255,255,255,.04)", border: "1px solid rgba(255,255,255,.07)", textAlign: "center" }}>
                <p style={{ color: "#64748b", fontSize: "10px", fontWeight: 700, textTransform: "uppercase", margin: 0 }}>{p.name}</p>
                <p style={{ fontSize: "30px", fontWeight: 900, color: p.color, margin: "4px 0" }}>{p.score}</p>
              </div>
            ))}
          </div>

          {/* Review wrong answers */}
          {history.some(h => !h.correct) && (
            <div style={{ marginBottom: "20px" }}>
              <p style={{ color: "#64748b", fontSize: "11px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "1px", marginBottom: "10px" }}>What You Missed</p>
              <div style={{ display: "flex", flexDirection: "column", gap: "8px", maxHeight: "180px", overflowY: "auto" }}>
                {history.filter(h => !h.correct).slice(0, 5).map((h, i) => {
                  const r = rounds[h.idx];
                  const m = BAND_META[r.band];
                  return (
                    <div key={i} style={{ padding: "10px 12px", borderRadius: "10px", background: m.bg, borderWidth: "1px", borderStyle: "solid", borderColor: m.border }}>
                      <p style={{ color: m.color, fontSize: "11px", fontWeight: 700, margin: "0 0 4px" }}>Answer: {m.label}</p>
                      <p style={{ color: "#94a3b8", fontSize: "11px", margin: 0, lineHeight: 1.5 }}>{r.explanation}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            <button onClick={onRestart} style={S.primaryBtn}>🎯 Play Again</button>
            <button onClick={() => navigate("/games")} style={{ ...S.primaryBtn, background: "rgba(255,255,255,.06)", color: "#94a3b8" }}>
              Back to Games Zone
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  // ── Playing ───────────────────────────────────────────────────────────────
  const pct = (timeLeft / STEP_TIME) * 100;
  const timerColor = timeLeft > 10 ? "#60a5fa" : timeLeft > 5 ? "#f59e0b" : "#ef4444";

  return (
    <div style={{ maxWidth: "720px", margin: "0 auto" }}>
      {/* Header row */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <span style={{ color: "#64748b", fontSize: "12px", fontWeight: 700 }}>{idx + 1} / {total}</span>
          <SkillBadge skill={round.skill} />
          {streak >= 2 && (
            <span style={{ background: "rgba(251,191,36,.15)", border: "1px solid rgba(251,191,36,.3)", color: "#fbbf24", padding: "3px 10px", borderRadius: "999px", fontSize: "11px", fontWeight: 700 }}>
              🔥 {streak} streak
            </span>
          )}
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "6px", padding: "7px 14px", borderRadius: "10px", background: "rgba(255,255,255,.05)", borderWidth: "1px", borderStyle: "solid", borderColor: `${timerColor}50` }}>
          <Timer size={13} color={timerColor} />
          <span style={{ fontWeight: 900, fontSize: "19px", color: timerColor, fontVariantNumeric: "tabular-nums" }}>{timeLeft}</span>
        </div>

        <div style={{ display: "flex", gap: "16px" }}>
          {[{ name: "You", score: myScore, color: "#60a5fa" }, { name: botName?.split(" ")[0], score: botScore, color: "#f472b6" }].map(p => (
            <div key={p.name} style={{ textAlign: "center" }}>
              <p style={{ color: "#64748b", fontSize: "10px", fontWeight: 700, textTransform: "uppercase", margin: 0 }}>{p.name}</p>
              <p style={{ color: p.color, fontWeight: 900, fontSize: "18px", margin: "2px 0 0", fontVariantNumeric: "tabular-nums" }}>{p.score}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Progress bars */}
      <div style={{ height: "4px", background: "rgba(255,255,255,.06)", borderRadius: "999px", marginBottom: "6px", overflow: "hidden" }}>
        <motion.div animate={{ width: `${(idx / total) * 100}%` }} transition={{ duration: 0.4 }}
          style={{ height: "100%", background: "linear-gradient(90deg,#2563eb,#22c55e)", borderRadius: "999px" }} />
      </div>
      <div style={{ height: "3px", background: "rgba(255,255,255,.04)", borderRadius: "999px", marginBottom: "28px", overflow: "hidden" }}>
        <motion.div animate={{ width: `${pct}%` }} transition={{ duration: 0.5, ease: "linear" }}
          style={{ height: "100%", background: timerColor, borderRadius: "999px" }} />
      </div>

      {/* Instruction */}
      <p style={{ color: "#64748b", fontSize: "12px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "1.5px", marginBottom: "14px" }}>
        What band does this sentence represent?
      </p>

      {/* Sentence card */}
      <AnimatePresence mode="wait">
        <motion.div key={idx} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }}
          style={{ background: "rgba(255,255,255,.04)", borderWidth: "1px", borderStyle: "solid", borderColor: "rgba(96,165,250,.18)", borderRadius: "20px", padding: "24px 26px", marginBottom: "24px" }}>
          <p style={{ color: "#e2e8f0", fontSize: "17px", lineHeight: 1.8, margin: 0, fontStyle: "italic", fontWeight: 400 }}>
            "{round.sentence}"
          </p>
        </motion.div>
      </AnimatePresence>

      {/* Band buttons */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "10px", marginBottom: "16px" }}>
        {[5, 6, 7, 8].map(band => (
          <BandButton key={band} band={band} selected={selected} correct={round.band} disabled={false} onClick={handleGuess} />
        ))}
      </div>

      {/* Feedback */}
      <AnimatePresence>
        {feedback && (
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
            style={{ padding: "14px 16px", borderRadius: "14px",
              background: feedback === "correct" || feedback === "speed" ? BAND_META[round.band].bg : "rgba(100,116,139,.12)",
              borderWidth: "1px", borderStyle: "solid",
              borderColor: feedback === "correct" || feedback === "speed" ? BAND_META[round.band].border : "rgba(100,116,139,.25)" }}>
            <p style={{ margin: "0 0 6px", fontWeight: 700, fontSize: "13px",
              color: feedback === "correct" || feedback === "speed" ? BAND_META[round.band].color : feedback === "timeout" ? "#fbbf24" : "#f87171" }}>
              {feedback === "speed" ? `⚡ Nailed it! +${POINTS_CORRECT + POINTS_SPEED} pts ${streak >= 2 ? `🔥 ${streak} streak!` : ""}`
                : feedback === "correct" ? `✓ Correct! ${BAND_META[round.band].label} +${POINTS_CORRECT} pts`
                : feedback === "timeout" ? `⏰ Time's up — it was ${BAND_META[round.band].label}`
                : `✗ That's ${BAND_META[round.band].label}`}
            </p>
            <p style={{ margin: 0, color: "#94a3b8", fontSize: "12px", lineHeight: 1.6 }}>
              💡 {round.explanation}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ── Main ──────────────────────────────────────────────────────────────────────
export default function BandBlitz() {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [phase, setPhase] = useState("intro");
  const [gameKey, setGameKey] = useState(0);
  const botName = useRef(getBotName());

  function handleStart() {
    botName.current = getBotName();
    setPhase("playing");
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
          <motion.div key={`game-${gameKey}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{ maxWidth: "740px", margin: "0 auto" }}>
            <BandBlitzGame
              key={gameKey}
              botName={botName.current}
              navigate={navigate}
              onRestart={() => { setGameKey(k => k + 1); botName.current = getBotName(); }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
