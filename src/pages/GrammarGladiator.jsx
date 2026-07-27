import { useEffect, useState, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  doc, setDoc, onSnapshot, updateDoc, getDoc, deleteDoc, serverTimestamp,
} from "firebase/firestore";
import { db } from "../firebase";
import { useAuth } from "../context/AuthContext";
import { GRAMMAR_QUESTIONS } from "../data/grammarGladiatorData";
import { Copy, ArrowLeft, Trophy, Zap, AlertCircle, CheckCircle2 } from "lucide-react";
import useMatchmaking from "../hooks/useMatchmaking";
import { getBotName } from "../utils/botEngine";
import { saveGameResult, addStudyTime } from "../services/gameStatsService";

// ─── Helpers ──────────────────────────────────────────────────────────────────
function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function pickQuestions(n = 10) {
  return shuffle(GRAMMAR_QUESTIONS).slice(0, n).map((q, i) => ({ ...q, id: i }));
}

function genCode() {
  return Math.random().toString(36).substring(2, 8).toUpperCase();
}

const QUESTION_TIME = 12;
const TOTAL_QUESTIONS = 10;

// ─── Styles ───────────────────────────────────────────────────────────────────
const S = {
  page: {
    minHeight: "100vh",
    background: "radial-gradient(circle at 20% 15%, rgba(251,113,133,.10), transparent 40%), radial-gradient(circle at 80% 85%, rgba(37,99,235,.10), transparent 40%), #060d1f",
    fontFamily: "Inter, sans-serif",
  },
  center: {
    minHeight: "100vh",
    background: "radial-gradient(circle at 20% 20%, rgba(251,113,133,.12), transparent 40%), #060d1f",
    display: "flex", alignItems: "center", justifyContent: "center", padding: "24px",
  },
  card: {
    width: "100%", maxWidth: "500px",
    background: "rgba(255,255,255,.05)", border: "1px solid rgba(255,255,255,.1)",
    borderRadius: "28px", padding: "36px 32px",
    boxShadow: "0 30px 80px rgba(0,0,0,.4)",
  },
  heading: { color: "#f1f5f9", fontWeight: 900, margin: 0, letterSpacing: "-0.5px" },
  primaryBtn: {
    width: "100%", padding: "14px", borderRadius: "14px", border: "none",
    background: "linear-gradient(135deg,#f43f5e,#e11d48)", color: "white",
    fontWeight: 700, fontSize: "15px", cursor: "pointer", transition: "opacity .2s",
  },
  input: {
    width: "100%", padding: "14px 16px", borderRadius: "14px",
    border: "1px solid rgba(255,255,255,.12)", background: "rgba(255,255,255,.06)",
    color: "#f1f5f9", fontSize: "20px", fontWeight: 800, letterSpacing: "4px",
    textAlign: "center", outline: "none", fontFamily: "Inter, sans-serif", boxSizing: "border-box",
  },
  playerChip: {
    display: "flex", flexDirection: "column", alignItems: "center", gap: "6px",
    padding: "12px", borderRadius: "14px",
    background: "rgba(255,255,255,.04)", border: "1px solid rgba(255,255,255,.08)",
  },
  avatar: {
    width: "36px", height: "36px", borderRadius: "50%",
    background: "linear-gradient(135deg,#f43f5e,#e11d48)",
    color: "white", fontWeight: 800, fontSize: "16px",
    display: "flex", alignItems: "center", justifyContent: "center",
  },
  scoreCard: {
    padding: "14px 18px", borderRadius: "14px",
    background: "rgba(255,255,255,.04)", border: "1px solid rgba(255,255,255,.08)",
    display: "flex", flexDirection: "column", gap: "4px",
  },
  timerCircle: {
    width: "48px", height: "48px", borderRadius: "50%",
    border: "3px solid",
    display: "flex", alignItems: "center", justifyContent: "center",
    fontWeight: 900, fontSize: "18px", margin: "8px auto 0",
    transition: "border-color .5s, color .5s",
  },
};

// ─── Lobby ────────────────────────────────────────────────────────────────────
function Lobby({ user, onRoom, onBot }) {
  const [tab, setTab] = useState("quick");
  const [joinCode, setJoinCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  const { matchmaking, countdown, startMatchmaking, cancelMatchmaking } = useMatchmaking({
    user,
    gameType: "grammar-gladiator",
    onMatched: async (result) => {
      if (result.botMode) { onBot(); return; }
      const code = genCode();
      const questions = pickQuestions(TOTAL_QUESTIONS);
      const myName = user.displayName || user.email?.split("@")[0] || "Player 1";
      await setDoc(doc(db, "grammarRooms", code), {
        code, host: user.uid, hostName: myName,
        guest: result.opponentId, guestName: result.opponentName,
        status: "playing", questions, currentQ: 0,
        scores: { [user.uid]: 0, [result.opponentId]: 0 },
        answers: {}, firstCorrect: {},
        qStartedAt: serverTimestamp(), createdAt: serverTimestamp(),
      });
      onRoom(code, "host");
    },
  });

  async function createRoom() {
    setLoading(true); setErr("");
    const code = genCode();
    const questions = pickQuestions(TOTAL_QUESTIONS);
    await setDoc(doc(db, "grammarRooms", code), {
      code, host: user.uid,
      hostName: user.displayName || user.email?.split("@")[0] || "Player 1",
      guest: null, guestName: null,
      status: "waiting", questions, currentQ: 0,
      scores: { [user.uid]: 0 }, answers: {}, firstCorrect: {},
      qStartedAt: null, createdAt: serverTimestamp(),
    });
    setLoading(false); onRoom(code, "host");
  }

  async function joinRoom() {
    setErr(""); setLoading(true);
    const code = joinCode.trim().toUpperCase();
    if (!code) { setErr("Enter a room code."); setLoading(false); return; }
    const snap = await getDoc(doc(db, "grammarRooms", code));
    if (!snap.exists()) { setErr("Room not found."); setLoading(false); return; }
    const data = snap.data();
    if (data.status !== "waiting") { setErr("Room already started."); setLoading(false); return; }
    if (data.host === user.uid) { setErr("You created this room!"); setLoading(false); return; }
    const guestName = user.displayName || user.email?.split("@")[0] || "Player 2";
    await updateDoc(doc(db, "grammarRooms", code), {
      guest: user.uid, guestName, [`scores.${user.uid}`]: 0,
    });
    setLoading(false); onRoom(code, "guest");
  }

  return (
    <div style={S.center}>
      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} style={S.card}>
        <div style={{ textAlign: "center", marginBottom: "28px" }}>
          <div style={{ fontSize: "48px", marginBottom: "10px" }}>⚔️🔤</div>
          <h1 style={{ ...S.heading, fontSize: "26px" }}>Grammar Gladiator</h1>
          <p style={{ color: "#94a3b8", fontSize: "13px", marginTop: "6px" }}>1v1 real-time IELTS grammar duel — fix the sentence first</p>
        </div>

        {/* Error type explanation */}
        <div style={{
          display: "flex", gap: "8px", flexWrap: "wrap", justifyContent: "center",
          marginBottom: "22px",
        }}>
          {["Agreement", "Tense", "Preposition", "Conditionals"].map(t => (
            <span key={t} style={{
              padding: "4px 12px", borderRadius: "999px", fontSize: "11px", fontWeight: 700,
              background: "rgba(244,63,94,.12)", border: "1px solid rgba(244,63,94,.25)", color: "#fb7185",
            }}>{t}</span>
          ))}
        </div>

        <div style={{ display: "flex", gap: "6px", marginBottom: "24px" }}>
          {["quick", "create", "join"].map(t => (
            <button key={t} onClick={() => setTab(t)} style={{
              flex: 1, padding: "10px 6px", borderRadius: "10px", border: "none",
              fontWeight: 700, fontSize: "12px", cursor: "pointer",
              background: tab === t ? "linear-gradient(135deg,#f43f5e,#e11d48)" : "rgba(255,255,255,.06)",
              color: tab === t ? "white" : "#64748b",
            }}>
              {t === "quick" ? "⚡ Quick Match" : t === "create" ? "🎮 Create" : "🔗 Join"}
            </button>
          ))}
        </div>

        {tab === "quick" && (
          <div style={{ textAlign: "center" }}>
            <p style={{ color: "#94a3b8", fontSize: "13px", marginBottom: "20px", lineHeight: 1.7 }}>
              Match instantly. If no one is online within <strong style={{ color: "#fb7185" }}>8 seconds</strong>, you'll duel our grammar bot.
            </p>
            {!matchmaking ? (
              <button onClick={startMatchmaking} style={S.primaryBtn}>⚡ Find Match</button>
            ) : (
              <div>
                <div style={{ fontSize: "48px", fontWeight: 900, color: "#fb7185", marginBottom: "8px" }}>{countdown}</div>
                <p style={{ color: "#94a3b8", fontSize: "13px", marginBottom: "16px" }}>Searching for an opponent…</p>
                <div style={{ display: "flex", gap: "6px", justifyContent: "center", marginBottom: "16px" }}>
                  {[0, 1, 2].map(i => (
                    <motion.div key={i} animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 1, repeat: Infinity, delay: i * 0.3 }}
                      style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#f43f5e" }} />
                  ))}
                </div>
                <button onClick={cancelMatchmaking} style={{ ...S.primaryBtn, background: "rgba(255,255,255,.06)", color: "#94a3b8" }}>Cancel</button>
              </div>
            )}
          </div>
        )}

        {tab === "create" && (
          <div>
            <p style={{ color: "#94a3b8", fontSize: "13px", marginBottom: "18px", lineHeight: 1.7 }}>
              Create a private room and share the code with your opponent.
            </p>
            <button onClick={createRoom} disabled={loading} style={S.primaryBtn}>
              {loading ? "Creating…" : "🎮 Create Room"}
            </button>
          </div>
        )}

        {tab === "join" && (
          <div>
            <input value={joinCode} onChange={e => setJoinCode(e.target.value.toUpperCase())}
              placeholder="Enter 6-letter code" maxLength={6} style={S.input}
              onKeyDown={e => e.key === "Enter" && joinRoom()} />
            {err && <p style={{ color: "#f87171", fontSize: "12px", marginTop: "8px" }}>{err}</p>}
            <button onClick={joinRoom} disabled={loading} style={{ ...S.primaryBtn, marginTop: "16px" }}>
              {loading ? "Joining…" : "🚀 Join Room"}
            </button>
          </div>
        )}
      </motion.div>
    </div>
  );
}

// ─── Waiting Room ─────────────────────────────────────────────────────────────
function WaitingRoom({ roomData, code, role, user }) {
  const [copied, setCopied] = useState(false);

  function copyCode() {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  async function startGame() {
    await updateDoc(doc(db, "grammarRooms", code), {
      status: "playing", currentQ: 0, qStartedAt: serverTimestamp(),
    });
  }

  const guestJoined = !!roomData.guest;

  return (
    <div style={S.center}>
      <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} style={S.card}>
        <h2 style={{ ...S.heading, fontSize: "22px", marginBottom: "24px" }}>Waiting for opponent…</h2>

        <div style={{ background: "rgba(244,63,94,.1)", border: "1px solid rgba(244,63,94,.3)", borderRadius: "16px", padding: "20px", textAlign: "center", marginBottom: "24px" }}>
          <p style={{ color: "#64748b", fontSize: "11px", fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase", marginBottom: "8px" }}>Room Code</p>
          <div style={{ fontSize: "36px", fontWeight: 900, letterSpacing: "8px", color: "#fb7185", marginBottom: "12px" }}>{code}</div>
          <button onClick={copyCode} style={{ display: "inline-flex", alignItems: "center", gap: "6px", padding: "8px 18px", borderRadius: "10px", border: "none", background: copied ? "rgba(34,197,94,.15)" : "rgba(255,255,255,.08)", color: copied ? "#4ade80" : "#94a3b8", fontWeight: 600, fontSize: "13px", cursor: "pointer" }}>
            <Copy size={13} />{copied ? "Copied!" : "Copy Code"}
          </button>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr auto 1fr", gap: "12px", alignItems: "center", marginBottom: "24px" }}>
          <div style={S.playerChip}>
            <div style={S.avatar}>{(roomData.hostName || "H")[0].toUpperCase()}</div>
            <span style={{ color: "#f1f5f9", fontSize: "13px", fontWeight: 700 }}>{roomData.hostName}</span>
            <span style={{ fontSize: "10px", color: "#22c55e", fontWeight: 700 }}>HOST</span>
          </div>
          <div style={{ color: "#475569", fontWeight: 900, fontSize: "18px" }}>VS</div>
          <div style={{ ...S.playerChip, opacity: guestJoined ? 1 : 0.4 }}>
            {guestJoined ? (
              <>
                <div style={S.avatar}>{(roomData.guestName || "G")[0].toUpperCase()}</div>
                <span style={{ color: "#f1f5f9", fontSize: "13px", fontWeight: 700 }}>{roomData.guestName}</span>
              </>
            ) : <span style={{ color: "#475569", fontSize: "13px" }}>Waiting…</span>}
          </div>
        </div>

        {role === "host" && guestJoined && (
          <button onClick={startGame} style={S.primaryBtn}>⚔️ Start Battle!</button>
        )}
        {role === "host" && !guestJoined && (
          <p style={{ color: "#64748b", fontSize: "13px", textAlign: "center" }}>Share the code above to invite your opponent</p>
        )}
        {role === "guest" && (
          <p style={{ color: "#64748b", fontSize: "13px", textAlign: "center" }}>Waiting for the host to start…</p>
        )}
      </motion.div>
    </div>
  );
}

// ─── Game Screen ──────────────────────────────────────────────────────────────
function GameScreen({ roomData, code, user }) {
  const [timeLeft, setTimeLeft] = useState(QUESTION_TIME);
  const [selected, setSelected] = useState(null);
  const timerRef = useRef(null);

  const qIdx = roomData.currentQ ?? 0;
  const questions = roomData.questions || [];
  const q = questions[qIdx];
  const myScore = roomData.scores?.[user.uid] ?? 0;
  const opponentId = roomData.host === user.uid ? roomData.guest : roomData.host;
  const opponentName = roomData.host === user.uid ? roomData.guestName : roomData.hostName;
  const oppScore = roomData.scores?.[opponentId] ?? 0;

  // Sync timer from server timestamp
  useEffect(() => {
    setSelected(null);
    if (!roomData.qStartedAt) return;
    const started = roomData.qStartedAt?.toDate ? roomData.qStartedAt.toDate() : new Date(roomData.qStartedAt);
    const elapsed = Math.floor((Date.now() - started.getTime()) / 1000);
    const remaining = Math.max(0, QUESTION_TIME - elapsed);
    setTimeLeft(remaining);

    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) { clearInterval(timerRef.current); return 0; }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timerRef.current);
  }, [qIdx, roomData.qStartedAt]);

  // Auto-advance when time runs out (host)
  useEffect(() => {
    if (timeLeft > 0) return;
    if (roomData.host !== user.uid) return;
    const nextQ = qIdx + 1;
    if (nextQ >= TOTAL_QUESTIONS) {
      updateDoc(doc(db, "grammarRooms", code), { status: "finished" });
    } else {
      updateDoc(doc(db, "grammarRooms", code), {
        currentQ: nextQ, qStartedAt: serverTimestamp(), answers: {},
      });
    }
  }, [timeLeft]);

  async function handleAnswer(optIdx) {
    if (selected !== null) return;
    setSelected(optIdx);
    const correct = q.answer === optIdx;
    const isFirst = roomData.firstCorrect?.[qIdx] === undefined;
    const speedBonus = correct && isFirst ? 1 : 0;
    const points = correct ? 1 + speedBonus : 0;

    const updates = { [`answers.${user.uid}`]: optIdx };
    if (correct) updates[`scores.${user.uid}`] = myScore + points;
    if (correct && isFirst) updates[`firstCorrect.${qIdx}`] = user.uid;
    await updateDoc(doc(db, "grammarRooms", code), updates);

    if (roomData.host === user.uid) {
      const opponentAnswered = roomData.answers?.[opponentId] !== undefined;
      if (opponentAnswered) {
        setTimeout(async () => {
          const nextQ = qIdx + 1;
          if (nextQ >= TOTAL_QUESTIONS) {
            await updateDoc(doc(db, "grammarRooms", code), { status: "finished" });
          } else {
            await updateDoc(doc(db, "grammarRooms", code), {
              currentQ: nextQ, qStartedAt: serverTimestamp(), answers: {},
            });
          }
        }, 1000);
      }
    }
  }

  if (!q) return <div style={S.center}><p style={{ color: "#94a3b8" }}>Loading…</p></div>;

  const timerPct = (timeLeft / QUESTION_TIME) * 100;
  const timerColor = timeLeft > 7 ? "#22c55e" : timeLeft > 3 ? "#f59e0b" : "#ef4444";
  const opponentAnswered = roomData.answers?.[opponentId] !== undefined;

  return (
    <div style={{ ...S.page, padding: "24px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "100vh" }}>
      {/* Score bar */}
      <div style={{ width: "100%", maxWidth: "720px", display: "grid", gridTemplateColumns: "1fr auto 1fr", gap: "12px", alignItems: "center", marginBottom: "20px" }}>
        <div style={{ ...S.scoreCard, textAlign: "left" }}>
          <span style={{ fontSize: "11px", color: "#64748b", fontWeight: 700, textTransform: "uppercase", letterSpacing: "1px" }}>You</span>
          <span style={{ fontSize: "28px", fontWeight: 900, color: "#fb7185" }}>{myScore}</span>
        </div>
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: "12px", color: "#475569", fontWeight: 700 }}>Q {qIdx + 1}/{TOTAL_QUESTIONS}</div>
          <div style={{ ...S.timerCircle, borderColor: timerColor, color: timerColor }}>{timeLeft}</div>
        </div>
        <div style={{ ...S.scoreCard, textAlign: "right" }}>
          <span style={{ fontSize: "11px", color: "#64748b", fontWeight: 700, textTransform: "uppercase", letterSpacing: "1px" }}>{opponentName}</span>
          <span style={{ fontSize: "28px", fontWeight: 900, color: "#60a5fa" }}>{oppScore}</span>
          {opponentAnswered && <span style={{ fontSize: "10px", color: "#94a3b8" }}>✓ answered</span>}
        </div>
      </div>

      {/* Timer bar */}
      <div style={{ width: "100%", maxWidth: "720px", height: "4px", background: "rgba(255,255,255,.08)", borderRadius: "999px", marginBottom: "24px", overflow: "hidden" }}>
        <motion.div animate={{ width: `${timerPct}%` }} transition={{ duration: 0.8, ease: "linear" }}
          style={{ height: "100%", background: timerColor, borderRadius: "999px" }} />
      </div>

      {/* Error type badge */}
      <div style={{ marginBottom: "12px" }}>
        <span style={{ padding: "4px 14px", borderRadius: "999px", fontSize: "11px", fontWeight: 800, letterSpacing: ".8px",
          background: "rgba(244,63,94,.12)", border: "1px solid rgba(244,63,94,.25)", color: "#fb7185" }}>
          {q.error}
        </span>
      </div>

      {/* Broken sentence */}
      <motion.div key={qIdx} initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }}
        style={{ width: "100%", maxWidth: "720px", background: "rgba(255,255,255,.05)", border: "1px solid rgba(255,255,255,.1)", borderRadius: "20px", padding: "28px 32px", marginBottom: "20px", textAlign: "center" }}>
        <p style={{ color: "#64748b", fontSize: "11px", fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase", marginBottom: "14px" }}>
          Fix the sentence
        </p>
        <p style={{ color: "#fca5a5", fontSize: "18px", fontWeight: 600, lineHeight: 1.65, fontStyle: "italic", margin: 0 }}>
          "{q.broken}"
        </p>
      </motion.div>

      {/* Options */}
      <div style={{ width: "100%", maxWidth: "720px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
        {q.options.map((opt, i) => {
          let bg = "rgba(255,255,255,.04)";
          let border = "1px solid rgba(255,255,255,.08)";
          let color = "#e2e8f0";
          if (selected !== null) {
            if (i === q.answer) { bg = "rgba(34,197,94,.15)"; border = "1px solid #22c55e"; color = "#4ade80"; }
            else if (i === selected && i !== q.answer) { bg = "rgba(239,68,68,.15)"; border = "1px solid #ef4444"; color = "#f87171"; }
          }
          return (
            <motion.button key={i} whileHover={selected === null ? { scale: 1.02 } : {}} whileTap={selected === null ? { scale: 0.97 } : {}}
              onClick={() => handleAnswer(i)}
              style={{ padding: "16px 18px", borderRadius: "14px", border, background: bg, color, fontSize: "14px", fontWeight: 600, cursor: selected === null ? "pointer" : "default", textAlign: "left", lineHeight: 1.6, transition: "all .2s", display: "flex", gap: "10px", alignItems: "flex-start" }}>
              <span style={{ display: "inline-flex", width: "24px", height: "24px", borderRadius: "7px", background: "rgba(255,255,255,.08)", alignItems: "center", justifyContent: "center", fontSize: "11px", fontWeight: 800, flexShrink: 0 }}>
                {["A","B","C","D"][i]}
              </span>
              {opt}
            </motion.button>
          );
        })}
      </div>

      {/* Tip after answering */}
      {selected !== null && (
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
          style={{ width: "100%", maxWidth: "720px", marginTop: "16px", padding: "14px 18px", borderRadius: "14px",
            background: selected === q.answer ? "rgba(34,197,94,.08)" : "rgba(239,68,68,.08)",
            border: `1px solid ${selected === q.answer ? "rgba(34,197,94,.3)" : "rgba(239,68,68,.3)"}` }}>
          <div style={{ display: "flex", gap: "8px", alignItems: "flex-start" }}>
            {selected === q.answer
              ? <CheckCircle2 size={16} color="#4ade80" style={{ flexShrink: 0, marginTop: "2px" }} />
              : <AlertCircle size={16} color="#f87171" style={{ flexShrink: 0, marginTop: "2px" }} />}
            <p style={{ margin: 0, color: "var(--text-secondary, #94a3b8)", fontSize: "13px", lineHeight: 1.6 }}>
              <strong style={{ color: selected === q.answer ? "#4ade80" : "#f87171" }}>
                {selected === q.answer ? "Correct! " : "Wrong. "}
              </strong>
              {q.tip}
            </p>
          </div>
        </motion.div>
      )}
    </div>
  );
}

// ─── Results Screen ───────────────────────────────────────────────────────────
function ResultsScreen({ roomData, user, code, navigate }) {
  const myScore = roomData.scores?.[user.uid] ?? 0;
  const opponentId = roomData.host === user.uid ? roomData.guest : roomData.host;
  const opponentName = roomData.host === user.uid ? roomData.guestName : roomData.hostName;
  const oppScore = roomData.scores?.[opponentId] ?? 0;
  const iWon = myScore > oppScore;
  const tied = myScore === oppScore;

  const savedRef = useRef(false);
  useEffect(() => {
    if (savedRef.current) return;
    savedRef.current = true;
    saveGameResult(user.uid, "grammar-gladiator", tied ? "tie" : iWon ? "win" : "loss");
    addStudyTime(user.uid, 3);
  }, []);

  async function leaveRoom() {
    if (roomData.host === user.uid) await deleteDoc(doc(db, "grammarRooms", code));
    navigate("/games");
  }

  return (
    <div style={S.center}>
      <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} style={{ ...S.card, textAlign: "center" }}>
        <div style={{ fontSize: "56px", marginBottom: "16px" }}>
          {tied ? "🤝" : iWon ? "🏆" : "😤"}
        </div>
        <h1 style={{ ...S.heading, fontSize: "28px", marginBottom: "8px" }}>
          {tied ? "It's a Tie!" : iWon ? "You Won!" : "You Lost!"}
        </h1>
        <p style={{ color: "#94a3b8", fontSize: "14px", marginBottom: "32px" }}>
          {tied ? "Equally matched grammar skills!" : iWon ? "Your grammar is gladiator-level!" : "Hit the books — you'll fix them next time!"}
        </p>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "32px" }}>
          {[
            { name: "You", score: myScore, highlight: iWon },
            { name: opponentName, score: oppScore, highlight: !iWon && !tied },
          ].map((p) => (
            <div key={p.name} style={{ padding: "20px", borderRadius: "16px", background: "rgba(255,255,255,.04)", border: "1px solid rgba(255,255,255,.08)" }}>
              <p style={{ color: "#64748b", fontSize: "11px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "1px", marginBottom: "8px" }}>{p.name}</p>
              <p style={{ fontSize: "40px", fontWeight: 900, color: "#fb7185" }}>{p.score}</p>
              <p style={{ color: "#475569", fontSize: "12px" }}>/ {TOTAL_QUESTIONS + TOTAL_QUESTIONS} max pts</p>
            </div>
          ))}
        </div>

        <div style={{ display: "flex", gap: "12px", flexDirection: "column" }}>
          <button onClick={leaveRoom} style={S.primaryBtn}>Play Again</button>
          <button onClick={() => navigate("/games")} style={{ ...S.primaryBtn, background: "rgba(255,255,255,.06)", color: "#94a3b8" }}>Back to Games Zone</button>
        </div>
      </motion.div>
    </div>
  );
}

// ─── Bot Game ─────────────────────────────────────────────────────────────────
function BotGameScreen({ user, navigate }) {
  const questions = useRef(pickQuestions(TOTAL_QUESTIONS)).current;
  const botName = useRef(getBotName()).current;
  const [qIdx, setQIdx] = useState(0);
  const [myScore, setMyScore] = useState(0);
  const [botScore, setBotScore] = useState(0);
  const [selected, setSelected] = useState(null);
  const [botAnswered, setBotAnswered] = useState(false);
  const [timeLeft, setTimeLeft] = useState(QUESTION_TIME);
  const [finished, setFinished] = useState(false);
  const timerRef = useRef(null);
  const cancelBotRef = useRef(null);

  const q = questions[qIdx];

  useEffect(() => {
    setSelected(null); setBotAnswered(false);
    setTimeLeft(QUESTION_TIME);

    // Bot answers in 3–10 seconds with 65% accuracy
    const delay = 3000 + Math.random() * 7000;
    const t = setTimeout(() => {
      const botCorrect = Math.random() < 0.65;
      if (botCorrect) setBotScore(s => s + 1);
      setBotAnswered(true);
    }, delay);
    cancelBotRef.current = () => clearTimeout(t);

    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) { clearInterval(timerRef.current); advance(); return 0; }
        return prev - 1;
      });
    }, 1000);

    return () => { cancelBotRef.current?.(); clearInterval(timerRef.current); };
  }, [qIdx]);

  function advance() {
    clearInterval(timerRef.current);
    cancelBotRef.current?.();
    setTimeout(() => {
      if (qIdx + 1 >= TOTAL_QUESTIONS) setFinished(true);
      else setQIdx(i => i + 1);
    }, 1000);
  }

  function handleAnswer(optIdx) {
    if (selected !== null) return;
    clearInterval(timerRef.current);
    cancelBotRef.current?.();
    setSelected(optIdx);
    if (optIdx === q.answer) setMyScore(s => s + 1);
    advance();
  }

  const timerPct = (timeLeft / QUESTION_TIME) * 100;
  const timerColor = timeLeft > 7 ? "#22c55e" : timeLeft > 3 ? "#f59e0b" : "#ef4444";

  if (finished) return <BotFinishedScreen user={user} myScore={myScore} botScore={botScore} botName={botName} navigate={navigate} />;

  return (
    <div style={{ ...S.page, padding: "24px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "100vh" }}>
      <div style={{ width: "100%", maxWidth: "720px", display: "grid", gridTemplateColumns: "1fr auto 1fr", gap: "12px", alignItems: "center", marginBottom: "20px" }}>
        <div style={{ ...S.scoreCard, textAlign: "left" }}>
          <span style={{ fontSize: "11px", color: "#64748b", fontWeight: 700, textTransform: "uppercase" }}>You</span>
          <span style={{ fontSize: "28px", fontWeight: 900, color: "#fb7185" }}>{myScore}</span>
        </div>
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: "12px", color: "#475569", fontWeight: 700 }}>Q {qIdx + 1}/{TOTAL_QUESTIONS}</div>
          <div style={{ ...S.timerCircle, borderColor: timerColor, color: timerColor }}>{timeLeft}</div>
        </div>
        <div style={{ ...S.scoreCard, textAlign: "right" }}>
          <span style={{ fontSize: "11px", color: "#64748b", fontWeight: 700, textTransform: "uppercase" }}>{botName} 🤖</span>
          <span style={{ fontSize: "28px", fontWeight: 900, color: "#60a5fa" }}>{botScore}</span>
          {botAnswered && <span style={{ fontSize: "10px", color: "#94a3b8" }}>✓ answered</span>}
        </div>
      </div>

      <div style={{ width: "100%", maxWidth: "720px", height: "4px", background: "rgba(255,255,255,.08)", borderRadius: "999px", marginBottom: "24px", overflow: "hidden" }}>
        <motion.div animate={{ width: `${timerPct}%` }} transition={{ duration: 0.8, ease: "linear" }}
          style={{ height: "100%", background: timerColor, borderRadius: "999px" }} />
      </div>

      <div style={{ marginBottom: "12px" }}>
        <span style={{ padding: "4px 14px", borderRadius: "999px", fontSize: "11px", fontWeight: 800, letterSpacing: ".8px", background: "rgba(244,63,94,.12)", border: "1px solid rgba(244,63,94,.25)", color: "#fb7185" }}>
          {q.error}
        </span>
      </div>

      <motion.div key={qIdx} initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }}
        style={{ width: "100%", maxWidth: "720px", background: "rgba(255,255,255,.05)", border: "1px solid rgba(255,255,255,.1)", borderRadius: "20px", padding: "28px 32px", marginBottom: "20px", textAlign: "center" }}>
        <p style={{ color: "#64748b", fontSize: "11px", fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase", marginBottom: "14px" }}>Fix the sentence</p>
        <p style={{ color: "#fca5a5", fontSize: "18px", fontWeight: 600, lineHeight: 1.65, fontStyle: "italic", margin: 0 }}>"{q.broken}"</p>
      </motion.div>

      <div style={{ width: "100%", maxWidth: "720px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
        {q.options.map((opt, i) => {
          let bg = "rgba(255,255,255,.04)", border = "1px solid rgba(255,255,255,.08)", color = "#e2e8f0";
          if (selected !== null) {
            if (i === q.answer) { bg = "rgba(34,197,94,.15)"; border = "1px solid #22c55e"; color = "#4ade80"; }
            else if (i === selected) { bg = "rgba(239,68,68,.15)"; border = "1px solid #ef4444"; color = "#f87171"; }
          }
          return (
            <motion.button key={i} whileHover={selected === null ? { scale: 1.02 } : {}} whileTap={selected === null ? { scale: 0.97 } : {}}
              onClick={() => handleAnswer(i)}
              style={{ padding: "16px 18px", borderRadius: "14px", border, background: bg, color, fontSize: "14px", fontWeight: 600, cursor: selected === null ? "pointer" : "default", textAlign: "left", lineHeight: 1.6, display: "flex", gap: "10px", alignItems: "flex-start" }}>
              <span style={{ display: "inline-flex", width: "24px", height: "24px", borderRadius: "7px", background: "rgba(255,255,255,.08)", alignItems: "center", justifyContent: "center", fontSize: "11px", fontWeight: 800, flexShrink: 0 }}>
                {["A","B","C","D"][i]}
              </span>
              {opt}
            </motion.button>
          );
        })}
      </div>

      {selected !== null && (
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
          style={{ width: "100%", maxWidth: "720px", marginTop: "16px", padding: "14px 18px", borderRadius: "14px",
            background: selected === q.answer ? "rgba(34,197,94,.08)" : "rgba(239,68,68,.08)",
            border: `1px solid ${selected === q.answer ? "rgba(34,197,94,.3)" : "rgba(239,68,68,.3)"}` }}>
          <div style={{ display: "flex", gap: "8px", alignItems: "flex-start" }}>
            {selected === q.answer ? <CheckCircle2 size={16} color="#4ade80" style={{ flexShrink: 0, marginTop: "2px" }} /> : <AlertCircle size={16} color="#f87171" style={{ flexShrink: 0, marginTop: "2px" }} />}
            <p style={{ margin: 0, color: "#94a3b8", fontSize: "13px", lineHeight: 1.6 }}>
              <strong style={{ color: selected === q.answer ? "#4ade80" : "#f87171" }}>{selected === q.answer ? "Correct! " : "Wrong. "}</strong>
              {q.tip}
            </p>
          </div>
        </motion.div>
      )}
    </div>
  );
}

// ─── Bot Finished ─────────────────────────────────────────────────────────────
function BotFinishedScreen({ user, myScore, botScore, botName, navigate }) {
  const iWon = myScore > botScore;
  const tied = myScore === botScore;
  const savedRef = useRef(false);
  useEffect(() => {
    if (savedRef.current) return;
    savedRef.current = true;
    saveGameResult(user.uid, "grammar-gladiator", tied ? "tie" : iWon ? "win" : "loss");
    addStudyTime(user.uid, 3);
  }, []);

  return (
    <div style={S.center}>
      <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} style={{ ...S.card, textAlign: "center" }}>
        <div style={{ fontSize: "52px", marginBottom: "14px" }}>{tied ? "🤝" : iWon ? "🏆" : "😤"}</div>
        <h1 style={{ ...S.heading, fontSize: "26px", marginBottom: "6px" }}>
          {tied ? "Tie!" : iWon ? "You Beat the Bot!" : "Bot Wins!"}
        </h1>
        <p style={{ color: "#94a3b8", fontSize: "12px", marginBottom: "4px" }}>vs {botName} 🤖</p>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px", margin: "24px 0" }}>
          {[{ name: "You", score: myScore }, { name: botName, score: botScore }].map(p => (
            <div key={p.name} style={{ padding: "18px", borderRadius: "14px", background: "rgba(255,255,255,.04)", border: "1px solid rgba(255,255,255,.08)" }}>
              <p style={{ color: "#64748b", fontSize: "11px", fontWeight: 700, textTransform: "uppercase", marginBottom: "6px" }}>{p.name}</p>
              <p style={{ fontSize: "36px", fontWeight: 900, color: "#fb7185" }}>{p.score}</p>
              <p style={{ color: "#475569", fontSize: "11px" }}>/ {TOTAL_QUESTIONS}</p>
            </div>
          ))}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <button onClick={() => navigate("/games/grammar-gladiator")} style={S.primaryBtn}>Play Again</button>
          <button onClick={() => navigate("/games")} style={{ ...S.primaryBtn, background: "rgba(255,255,255,.06)", color: "#94a3b8" }}>Games Zone</button>
        </div>
      </motion.div>
    </div>
  );
}

// ─── Main Controller ──────────────────────────────────────────────────────────
export default function GrammarGladiator() {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [phase, setPhase] = useState("lobby");
  const [roomCode, setRoomCode] = useState(null);
  const [role, setRole] = useState(null);
  const [roomData, setRoomData] = useState(null);
  const unsubRef = useRef(null);

  useEffect(() => {
    if (!roomCode) return;
    if (unsubRef.current) unsubRef.current();
    unsubRef.current = onSnapshot(doc(db, "grammarRooms", roomCode), snap => {
      if (!snap.exists()) { setPhase("lobby"); setRoomCode(null); return; }
      const data = snap.data();
      setRoomData(data);
      if (data.status === "waiting") setPhase("waiting");
      else if (data.status === "playing") setPhase("playing");
      else if (data.status === "finished") setPhase("finished");
    });
    return () => unsubRef.current?.();
  }, [roomCode]);

  function handleRoom(code, r) { setRoomCode(code); setRole(r); setPhase("waiting"); }
  function handleBot() { setPhase("bot"); }

  if (authLoading) return <div style={S.center}><p style={{ color: "#94a3b8" }}>Loading…</p></div>;
  if (!user) return <div style={S.center}><p style={{ color: "#94a3b8" }}>Please sign in to play.</p></div>;

  return (
    <>
      {phase === "lobby" && (
        <motion.button onClick={() => navigate("/games")} initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          style={{ position: "fixed", top: "80px", left: "24px", zIndex: 50, display: "flex", alignItems: "center", gap: "6px", padding: "8px 16px", borderRadius: "10px", background: "rgba(255,255,255,.06)", border: "1px solid rgba(255,255,255,.1)", color: "#94a3b8", fontSize: "13px", fontWeight: 600, cursor: "pointer" }}>
          <ArrowLeft size={14} /> Games Zone
        </motion.button>
      )}

      <AnimatePresence mode="wait">
        {phase === "lobby" && (
          <motion.div key="lobby" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <Lobby user={user} onRoom={handleRoom} onBot={handleBot} />
          </motion.div>
        )}
        {phase === "waiting" && roomData && (
          <motion.div key="waiting" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <WaitingRoom roomData={roomData} code={roomCode} role={role} user={user} />
          </motion.div>
        )}
        {phase === "playing" && roomData && (
          <motion.div key="playing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <GameScreen roomData={roomData} code={roomCode} user={user} />
          </motion.div>
        )}
        {phase === "finished" && roomData && (
          <motion.div key="finished" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <ResultsScreen roomData={roomData} user={user} code={roomCode} navigate={navigate} />
          </motion.div>
        )}
        {phase === "bot" && (
          <motion.div key="bot" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <BotGameScreen user={user} navigate={navigate} />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
