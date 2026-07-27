import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../context/AuthContext";
import { ArrowLeft, Timer, BookOpen } from "lucide-react";
import { SYNONYM_SPRINT_QUESTIONS, simulateBotSynonymSprint } from "../data/synonymSprintData";
import { getBotName } from "../utils/botEngine";

// ── constants ─────────────────────────────────────────────────────────────────
const TOTAL_QUESTIONS = 12;
const STEP_TIME = 20;
const POINTS_CORRECT = 10;
const POINTS_SPEED = 5;
const SPEED_THRESHOLD = 12; // seconds remaining

const CATEGORY_META = {
  verb:      { label: "Verb Swap",   color: "#a78bfa", bg: "rgba(167,139,250,.15)", border: "rgba(167,139,250,.35)" },
  adjective: { label: "Adjective",   color: "#f472b6", bg: "rgba(244,114,182,.15)", border: "rgba(244,114,182,.35)" },
  noun:      { label: "Noun Swap",   color: "#34d399", bg: "rgba(52,211,153,.15)",  border: "rgba(52,211,153,.35)"  },
  phrase:    { label: "Phrase Swap", color: "#fbbf24", bg: "rgba(251,191,36,.15)",  border: "rgba(251,191,36,.35)"  },
};

// ── styles ────────────────────────────────────────────────────────────────────
const S = {
  page: {
    minHeight: "100vh",
    background:
      "radial-gradient(circle at 10% 20%, rgba(167,139,250,.12), transparent 40%)," +
      "radial-gradient(circle at 90% 80%, rgba(52,211,153,.1), transparent 40%), #060d1f",
    fontFamily: "Inter, sans-serif",
    padding: "80px 24px 60px",
  },
  center: {
    minHeight: "100vh",
    background: "radial-gradient(circle at 30% 30%, rgba(167,139,250,.10), transparent 40%), #060d1f",
    display: "flex", alignItems: "center", justifyContent: "center", padding: "24px",
  },
  card: {
    width: "100%", maxWidth: "580px",
    background: "rgba(255,255,255,.05)", border: "1px solid rgba(255,255,255,.1)",
    borderRadius: "28px", padding: "36px 32px",
    boxShadow: "0 30px 80px rgba(0,0,0,.5)",
  },
  heading: { color: "#f1f5f9", fontWeight: 900, margin: 0, letterSpacing: "-0.5px" },
  primaryBtn: {
    width: "100%", padding: "14px", borderRadius: "14px", border: "none",
    background: "linear-gradient(135deg,#7c3aed,#34d399)",
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

function pickQuestions(n = TOTAL_QUESTIONS) {
  return shuffle(SYNONYM_SPRINT_QUESTIONS).slice(0, n);
}

// ── Sentence renderer — highlights the [target word] ─────────────────────────
function HighlightedSentence({ sentence, revealed, correctOption }) {
  // Sentence format: "some text [targetWord] more text"
  const match = sentence.match(/^(.*?)\[(.+?)\](.*)$/);
  if (!match) return <p style={{ color: "#e2e8f0", fontSize: "17px", lineHeight: 1.8, margin: 0 }}>{sentence}</p>;

  const [, before, target, after] = match;
  return (
    <p style={{ color: "#e2e8f0", fontSize: "17px", lineHeight: 1.9, margin: 0 }}>
      <span style={{ fontStyle: "italic" }}>{before}</span>
      <span style={{
        display: "inline-block",
        padding: "2px 10px",
        borderRadius: "8px",
        background: revealed ? "rgba(52,211,153,.2)" : "rgba(167,139,250,.25)",
        border: `1px solid ${revealed ? "rgba(52,211,153,.5)" : "rgba(167,139,250,.5)"}`,
        color: revealed ? "#34d399" : "#c4b5fd",
        fontWeight: 700,
        margin: "0 2px",
        transition: "all .3s",
        textDecoration: revealed ? "none" : "underline",
        textDecorationStyle: "dotted",
        textDecorationColor: "#7c3aed",
      }}>
        {revealed ? correctOption : target}
      </span>
      <span style={{ fontStyle: "italic" }}>{after}</span>
    </p>
  );
}

// ── Category badge ────────────────────────────────────────────────────────────
function CategoryBadge({ category }) {
  const m = CATEGORY_META[category] || CATEGORY_META.phrase;
  return (
    <span style={{ display: "inline-block", padding: "3px 10px", borderRadius: "999px", background: m.bg, border: `1px solid ${m.border}`, color: m.color, fontSize: "11px", fontWeight: 700 }}>
      {m.label}
    </span>
  );
}

// ── Intro Screen ──────────────────────────────────────────────────────────────
function IntroScreen({ onStart }) {
  return (
    <div style={S.center}>
      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} style={S.card}>
        <div style={{ textAlign: "center", marginBottom: "28px" }}>
          <div style={{ fontSize: "52px", marginBottom: "12px" }}>⚡</div>
          <h1 style={{ ...S.heading, fontSize: "28px", marginBottom: "10px" }}>Synonym Sprint</h1>
          <p style={{ color: "#94a3b8", fontSize: "14px", lineHeight: 1.75 }}>
            A word in each IELTS sentence is highlighted. Choose its best academic
            synonym or paraphrase — the one that fits the context and raises the register.
          </p>
        </div>

        {/* Category legend */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px", marginBottom: "20px" }}>
          {Object.entries(CATEGORY_META).map(([key, m]) => (
            <div key={key} style={{ padding: "10px 12px", borderRadius: "10px", background: m.bg, border: `1px solid ${m.border}`, display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ color: m.color, fontWeight: 800, fontSize: "13px" }}>{m.label}</span>
            </div>
          ))}
        </div>

        <div style={{ background: "rgba(124,58,237,.08)", border: "1px solid rgba(124,58,237,.25)", borderRadius: "14px", padding: "14px 16px", marginBottom: "24px", fontSize: "12px", color: "#94a3b8", lineHeight: 1.8 }}>
          ✓ Correct: <strong style={{ color: "#4ade80" }}>+{POINTS_CORRECT} pts</strong> &nbsp;|&nbsp;
          ⚡ Fast ({SPEED_THRESHOLD}s+): <strong style={{ color: "#fbbf24" }}>+{POINTS_SPEED} bonus</strong> &nbsp;|&nbsp;
          ⏱ {STEP_TIME}s per sentence &nbsp;|&nbsp;
          📝 {TOTAL_QUESTIONS} sentences
        </div>

        <button onClick={onStart} style={S.primaryBtn}>⚡ Start Sprint</button>
      </motion.div>
    </div>
  );
}

// ── Main game component ───────────────────────────────────────────────────────
function SynonymGame({ botName, navigate, onRestart }) {
  const questions = useRef(pickQuestions()).current;
  const botPlan = useRef(simulateBotSynonymSprint(questions)).current;

  const [qIdx, setQIdx] = useState(0);
  const [myScore, setMyScore] = useState(0);
  const [botScore, setBotScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(STEP_TIME);
  const [selected, setSelected] = useState(null);
  const [feedback, setFeedback] = useState(null);
  const [history, setHistory] = useState([]);
  const [phase, setPhase] = useState("playing");
  const [wordsLearned, setWordsLearned] = useState([]);

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

    botTimers.current.forEach(clearTimeout);
    botTimers.current = [];
    const plan = botPlan.find(p => p.index === qIdx);
    if (plan) {
      const t = setTimeout(() => {
        if (plan.correct) setBotScore(s => s + POINTS_CORRECT);
      }, Math.min(plan.delay, STEP_TIME * 1000 - 600));
      botTimers.current.push(t);
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
    const speedBonus = correct && timeLeft >= SPEED_THRESHOLD ? POINTS_SPEED : 0;
    const gain = correct ? POINTS_CORRECT + speedBonus : 0;
    setMyScore(s => s + gain);
    setFeedback(correct ? (speedBonus > 0 ? "speed" : "correct") : "wrong");
    setHistory(prev => [...prev, { qIdx, correct, selectedIdx: optIdx, speedBonus }]);
    if (correct) setWordsLearned(prev => [...prev, { target: q.targetWord, answer: q.options[q.answer] }]);
    doAdvance();
  }

  function doAdvance() {
    setTimeout(() => {
      if (qIdx + 1 >= total) setPhase("results");
      else setQIdx(i => i + 1);
    }, 2400);
  }

  // ── Results ──────────────────────────────────────────────────────────────
  if (phase === "results") {
    const iWon = myScore > botScore;
    const tied = myScore === botScore;
    const correctCount = history.filter(h => h.correct).length;
    const speedCount = history.filter(h => h.speedBonus > 0).length;
    const maxScore = total * (POINTS_CORRECT + POINTS_SPEED);

    return (
      <div style={S.center}>
        <motion.div initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }} style={{ ...S.card, maxWidth: "600px" }}>
          <div style={{ textAlign: "center", marginBottom: "24px" }}>
            <div style={{ fontSize: "52px", marginBottom: "12px" }}>{tied ? "🤝" : iWon ? "🏆" : "⚡"}</div>
            <h1 style={{ ...S.heading, fontSize: "24px", marginBottom: "14px" }}>
              {tied ? "It's a Tie!" : iWon ? "You Win!" : `${botName?.split(" ")[0]} Wins!`}
            </h1>
            <div style={{ display: "flex", justifyContent: "center", gap: "24px" }}>
              {[
                { label: "Correct", value: `${correctCount}/${total}`, color: "#4ade80" },
                { label: "Speed Bonus", value: `×${speedCount}`, color: "#fbbf24" },
                { label: "Words Learned", value: correctCount, color: "#a78bfa" },
              ].map(s => (
                <div key={s.label} style={{ textAlign: "center" }}>
                  <p style={{ fontSize: "22px", fontWeight: 900, color: s.color, margin: 0 }}>{s.value}</p>
                  <p style={{ color: "#64748b", fontSize: "11px", fontWeight: 700, margin: "3px 0 0" }}>{s.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* vs bot scores */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "20px" }}>
            {[{ name: "You", score: myScore, color: "#a78bfa" }, { name: botName, score: botScore, color: "#f472b6" }].map(p => (
              <div key={p.name} style={{ padding: "16px", borderRadius: "14px", background: "rgba(255,255,255,.04)", border: "1px solid rgba(255,255,255,.07)", textAlign: "center" }}>
                <p style={{ color: "#64748b", fontSize: "10px", fontWeight: 700, textTransform: "uppercase", margin: 0 }}>{p.name}</p>
                <p style={{ fontSize: "30px", fontWeight: 900, color: p.color, margin: "4px 0" }}>{p.score}</p>
                <p style={{ color: "#475569", fontSize: "11px", margin: 0 }}>/ {maxScore} pts</p>
              </div>
            ))}
          </div>

          {/* Words learned glossary */}
          {wordsLearned.length > 0 && (
            <div style={{ marginBottom: "20px" }}>
              <p style={{ color: "#64748b", fontSize: "11px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "1px", marginBottom: "10px" }}>
                📚 Synonyms Learned
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                {wordsLearned.map((w, i) => (
                  <div key={i} style={{ padding: "6px 12px", borderRadius: "999px", background: "rgba(124,58,237,.15)", border: "1px solid rgba(124,58,237,.3)", display: "flex", alignItems: "center", gap: "6px" }}>
                    <span style={{ color: "#94a3b8", fontSize: "12px" }}>{w.target}</span>
                    <span style={{ color: "#64748b", fontSize: "10px" }}>→</span>
                    <span style={{ color: "#c4b5fd", fontSize: "12px", fontWeight: 700 }}>{w.answer}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Review misses */}
          {history.some(h => !h.correct) && (
            <div style={{ marginBottom: "20px" }}>
              <p style={{ color: "#64748b", fontSize: "11px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "1px", marginBottom: "10px" }}>Review Errors</p>
              <div style={{ display: "flex", flexDirection: "column", gap: "8px", maxHeight: "160px", overflowY: "auto" }}>
                {history.filter(h => !h.correct).map((h, i) => {
                  const qq = questions[h.qIdx];
                  return (
                    <div key={i} style={{ padding: "10px 12px", borderRadius: "10px", background: "rgba(124,58,237,.1)", border: "1px solid rgba(124,58,237,.25)" }}>
                      <p style={{ color: "#a78bfa", fontSize: "11px", fontWeight: 700, margin: "0 0 3px" }}>
                        [{qq.targetWord}] → <strong style={{ color: "#c4b5fd" }}>{qq.options[qq.answer]}</strong>
                      </p>
                      <p style={{ color: "#94a3b8", fontSize: "11px", margin: 0, lineHeight: 1.5 }}>{qq.explanation}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            <button onClick={onRestart} style={S.primaryBtn}>⚡ Sprint Again</button>
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
  const timerColor = timeLeft > 12 ? "#a78bfa" : timeLeft > 6 ? "#f59e0b" : "#ef4444";
  const catMeta = CATEGORY_META[q.category] || CATEGORY_META.phrase;

  return (
    <div style={{ maxWidth: "740px", margin: "0 auto" }}>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <span style={{ color: "#64748b", fontSize: "12px", fontWeight: 700 }}>{qIdx + 1} / {total}</span>
          <CategoryBadge category={q.category} />
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "6px", padding: "7px 14px", borderRadius: "10px", background: "rgba(255,255,255,.05)", borderWidth: "1px", borderStyle: "solid", borderColor: `${timerColor}50` }}>
          <Timer size={13} color={timerColor} />
          <span style={{ fontWeight: 900, fontSize: "19px", color: timerColor, fontVariantNumeric: "tabular-nums" }}>{timeLeft}</span>
        </div>

        <div style={{ display: "flex", gap: "16px" }}>
          {[{ name: "You", score: myScore, color: "#a78bfa" }, { name: botName?.split(" ")[0], score: botScore, color: "#f472b6" }].map(p => (
            <div key={p.name} style={{ textAlign: "center" }}>
              <p style={{ color: "#64748b", fontSize: "10px", fontWeight: 700, textTransform: "uppercase", margin: 0 }}>{p.name}</p>
              <p style={{ color: p.color, fontWeight: 900, fontSize: "18px", margin: "2px 0 0", fontVariantNumeric: "tabular-nums" }}>{p.score}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Progress bars */}
      <div style={{ height: "4px", background: "rgba(255,255,255,.06)", borderRadius: "999px", marginBottom: "6px", overflow: "hidden" }}>
        <motion.div animate={{ width: `${(qIdx / total) * 100}%` }} transition={{ duration: 0.4 }}
          style={{ height: "100%", background: "linear-gradient(90deg,#7c3aed,#34d399)", borderRadius: "999px" }} />
      </div>
      <div style={{ height: "3px", background: "rgba(255,255,255,.04)", borderRadius: "999px", marginBottom: "28px", overflow: "hidden" }}>
        <motion.div animate={{ width: `${pct}%` }} transition={{ duration: 0.5, ease: "linear" }}
          style={{ height: "100%", background: timerColor, borderRadius: "999px" }} />
      </div>

      {/* Instruction */}
      <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "14px" }}>
        <BookOpen size={14} color={catMeta.color} />
        <span style={{ color: catMeta.color, fontWeight: 700, fontSize: "12px", textTransform: "uppercase", letterSpacing: "1px" }}>
          Replace the highlighted word with its best academic synonym
        </span>
      </div>

      {/* Sentence card */}
      <AnimatePresence mode="wait">
        <motion.div key={qIdx} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }}
          style={{ background: "rgba(255,255,255,.04)", borderWidth: "1px", borderStyle: "solid", borderColor: "rgba(124,58,237,.2)", borderRadius: "20px", padding: "24px 26px", marginBottom: "24px" }}>
          <HighlightedSentence
            sentence={q.sentence}
            revealed={selected !== null || feedback === "timeout"}
            correctOption={q.options[q.answer]}
          />
        </motion.div>
      </AnimatePresence>

      {/* Options — 2x2 grid */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", marginBottom: "16px" }}>
        {q.options.map((opt, i) => {
          let bg = "rgba(255,255,255,.04)";
          let borderColor = "rgba(255,255,255,.08)";
          let color = "#94a3b8";
          if (selected !== null || feedback === "timeout") {
            if (i === q.answer) { bg = "rgba(52,211,153,.15)"; borderColor = "rgba(52,211,153,.5)"; color = "#34d399"; }
            else if (i === selected) { bg = "rgba(239,68,68,.12)"; borderColor = "rgba(239,68,68,.45)"; color = "#f87171"; }
          }
          return (
            <motion.button key={i}
              whileHover={selected === null ? { scale: 1.03 } : {}}
              whileTap={selected === null ? { scale: 0.97 } : {}}
              onClick={() => handleAnswer(i)}
              style={{ padding: "16px 14px", borderRadius: "14px", borderWidth: "1px", borderStyle: "solid", borderColor, background: bg, color, fontSize: "15px", fontWeight: 600, cursor: selected === null ? "pointer" : "default", textAlign: "center", lineHeight: 1.4, fontStyle: "italic" }}>
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
              background: feedback === "correct" || feedback === "speed" ? "rgba(52,211,153,.1)" : "rgba(239,68,68,.08)",
              borderWidth: "1px", borderStyle: "solid",
              borderColor: feedback === "correct" || feedback === "speed" ? "rgba(52,211,153,.3)" : "rgba(239,68,68,.25)" }}>
            <p style={{ margin: "0 0 5px", fontWeight: 700, fontSize: "13px",
              color: feedback === "correct" || feedback === "speed" ? "#34d399" : feedback === "timeout" ? "#fbbf24" : "#f87171" }}>
              {feedback === "speed"
                ? `⚡ Perfect synonym! +${POINTS_CORRECT + POINTS_SPEED} pts — [${q.targetWord}] → "${q.options[q.answer]}"`
                : feedback === "correct"
                ? `✓ Correct! +${POINTS_CORRECT} pts — [${q.targetWord}] → "${q.options[q.answer]}"`
                : feedback === "timeout"
                ? `⏰ Time's up — best choice: "${q.options[q.answer]}"`
                : `✗ Best choice: "${q.options[q.answer]}"`}
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

// ── Main ──────────────────────────────────────────────────────────────────────
export default function SynonymSprint() {
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
            style={{ maxWidth: "760px", margin: "0 auto" }}>
            <SynonymGame
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
