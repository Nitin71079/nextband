import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  doc, setDoc, onSnapshot, updateDoc, getDoc, deleteDoc, serverTimestamp,
} from "firebase/firestore";
import { db } from "../firebase";
import { useAuth } from "../context/AuthContext";
import { READING_RACE_PASSAGES } from "../data/readingRacePassages";
import { BookOpen, Copy, ArrowLeft, Zap, Timer } from "lucide-react";

function genCode() {
  return Math.random().toString(36).substring(2, 8).toUpperCase();
}

function pickPassage() {
  return READING_RACE_PASSAGES[Math.floor(Math.random() * READING_RACE_PASSAGES.length)];
}

const TOTAL_QUESTIONS = 5;
const RACE_TIME = 180; // 3 minutes

// ── Styles ───────────────────────────────────────────────────────────────────
const S = {
  page: { minHeight: "100vh", background: "#060d1f", fontFamily: "Inter, sans-serif" },
  center: {
    minHeight: "100vh",
    background: "radial-gradient(circle at 20% 20%, rgba(37,99,235,.12), transparent 40%), #060d1f",
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
    background: "linear-gradient(135deg,#2563eb,#06b6d4)", color: "white",
    fontWeight: 700, fontSize: "15px", cursor: "pointer",
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
    background: "linear-gradient(135deg,#2563eb,#06b6d4)",
    color: "white", fontWeight: 800, fontSize: "16px",
    display: "flex", alignItems: "center", justifyContent: "center",
  },
};

// ── Lobby ─────────────────────────────────────────────────────────────────────
function Lobby({ user, onRoom }) {
  const [tab, setTab] = useState("create");
  const [joinCode, setJoinCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  async function createRoom() {
    setLoading(true); setErr("");
    const code = genCode();
    const passage = pickPassage();
    await setDoc(doc(db, "readingRooms", code), {
      code,
      host: user.uid,
      hostName: user.displayName || user.email?.split("@")[0] || "Player 1",
      guest: null, guestName: null,
      status: "waiting",
      passage,
      currentQ: 0,
      scores: { [user.uid]: 0 },
      progress: { [user.uid]: 0 },
      answers: {},
      firstCorrect: {},
      timeLeft: RACE_TIME,
      raceStartedAt: null,
      createdAt: serverTimestamp(),
    });
    setLoading(false);
    onRoom(code, "host");
  }

  async function joinRoom() {
    setErr(""); setLoading(true);
    const code = joinCode.trim().toUpperCase();
    if (!code) { setErr("Enter a room code."); setLoading(false); return; }
    const snap = await getDoc(doc(db, "readingRooms", code));
    if (!snap.exists()) { setErr("Room not found."); setLoading(false); return; }
    const data = snap.data();
    if (data.status !== "waiting") { setErr("Race already started."); setLoading(false); return; }
    if (data.host === user.uid) { setErr("You created this room!"); setLoading(false); return; }
    const guestName = user.displayName || user.email?.split("@")[0] || "Player 2";
    await updateDoc(doc(db, "readingRooms", code), {
      guest: user.uid, guestName,
      [`scores.${user.uid}`]: 0,
      [`progress.${user.uid}`]: 0,
    });
    setLoading(false);
    onRoom(code, "guest");
  }

  return (
    <div style={S.center}>
      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} style={S.card}>
        <div style={{ textAlign: "center", marginBottom: "32px" }}>
          <div style={{ fontSize: "48px", marginBottom: "12px" }}>📖</div>
          <h1 style={{ ...S.heading, fontSize: "26px" }}>Reading Race</h1>
          <p style={{ color: "#94a3b8", fontSize: "13px", marginTop: "8px" }}>
            1v1 — same passage, 5 questions, 3 minutes. Speed + accuracy wins.
          </p>
        </div>
        <div style={{ display: "flex", gap: "8px", marginBottom: "24px" }}>
          {["create", "join"].map(t => (
            <button key={t} onClick={() => setTab(t)} style={{
              flex: 1, padding: "11px", borderRadius: "12px", border: "none",
              fontWeight: 700, fontSize: "13px", cursor: "pointer",
              background: tab === t ? "linear-gradient(135deg,#2563eb,#06b6d4)" : "rgba(255,255,255,.06)",
              color: tab === t ? "white" : "#64748b",
            }}>
              {t === "create" ? "Create Room" : "Join Room"}
            </button>
          ))}
        </div>
        {tab === "create" ? (
          <div>
            <p style={{ color: "#94a3b8", fontSize: "13px", marginBottom: "20px", lineHeight: 1.7 }}>
              A passage is randomly selected. Share the room code with your opponent — race starts when they join.
            </p>
            <button onClick={createRoom} disabled={loading} style={S.primaryBtn}>
              {loading ? "Creating…" : "📖 Create Room"}
            </button>
          </div>
        ) : (
          <div>
            <input value={joinCode} onChange={e => setJoinCode(e.target.value.toUpperCase())}
              placeholder="Enter room code" maxLength={6} style={S.input}
              onKeyDown={e => e.key === "Enter" && joinRoom()} />
            {err && <p style={{ color: "#f87171", fontSize: "12px", marginTop: "8px" }}>{err}</p>}
            <button onClick={joinRoom} disabled={loading} style={{ ...S.primaryBtn, marginTop: "16px" }}>
              {loading ? "Joining…" : "🚀 Join Race"}
            </button>
          </div>
        )}
      </motion.div>
    </div>
  );
}

// ── Waiting Room ──────────────────────────────────────────────────────────────
function WaitingRoom({ roomData, code, role }) {
  const [copied, setCopied] = useState(false);

  function copyCode() {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  async function startRace() {
    await updateDoc(doc(db, "readingRooms", code), {
      status: "playing",
      raceStartedAt: serverTimestamp(),
    });
  }

  const guestJoined = !!roomData.guest;

  return (
    <div style={S.center}>
      <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} style={S.card}>
        <h2 style={{ ...S.heading, fontSize: "20px", marginBottom: "8px" }}>Waiting for opponent…</h2>
        <p style={{ color: "#64748b", fontSize: "13px", marginBottom: "24px" }}>
          Passage: <span style={{ color: "#60a5fa", fontWeight: 700 }}>{roomData.passage?.title}</span>
        </p>

        <div style={{ background: "rgba(37,99,235,.1)", border: "1px solid rgba(37,99,235,.3)", borderRadius: "16px", padding: "20px", textAlign: "center", marginBottom: "24px" }}>
          <p style={{ color: "#64748b", fontSize: "11px", fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase", marginBottom: "8px" }}>Room Code</p>
          <div style={{ fontSize: "34px", fontWeight: 900, letterSpacing: "8px", color: "#60a5fa", marginBottom: "12px" }}>{code}</div>
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
            {guestJoined
              ? <><div style={S.avatar}>{(roomData.guestName || "G")[0].toUpperCase()}</div>
                  <span style={{ color: "#f1f5f9", fontSize: "13px", fontWeight: 700 }}>{roomData.guestName}</span></>
              : <span style={{ color: "#475569", fontSize: "13px" }}>Waiting…</span>
            }
          </div>
        </div>

        {role === "host" && guestJoined && (
          <button onClick={startRace} style={S.primaryBtn}>🏁 Start Race!</button>
        )}
        {role === "host" && !guestJoined && (
          <p style={{ color: "#64748b", fontSize: "13px", textAlign: "center" }}>Share the code to invite your opponent</p>
        )}
        {role === "guest" && (
          <p style={{ color: "#64748b", fontSize: "13px", textAlign: "center" }}>Waiting for the host to start the race…</p>
        )}
      </motion.div>
    </div>
  );
}

// ── Race Screen ───────────────────────────────────────────────────────────────
function RaceScreen({ roomData, code, user }) {
  const [timeLeft, setTimeLeft] = useState(RACE_TIME);
  const [selected, setSelected] = useState(null);
  const [feedback, setFeedback] = useState(null);
  const timerRef = useRef(null);

  const passage = roomData.passage;
  const qIdx = roomData.currentQ ?? 0;
  const q = passage?.questions?.[qIdx];
  const myScore = roomData.scores?.[user.uid] ?? 0;
  const opponentId = roomData.host === user.uid ? roomData.guest : roomData.host;
  const opponentName = roomData.host === user.uid ? roomData.guestName : roomData.hostName;
  const oppScore = roomData.scores?.[opponentId] ?? 0;
  const myProgress = roomData.progress?.[user.uid] ?? 0;
  const oppProgress = roomData.progress?.[opponentId] ?? 0;

  // Sync timer
  useEffect(() => {
    if (!roomData.raceStartedAt) return;
    const started = roomData.raceStartedAt?.toDate ? roomData.raceStartedAt.toDate() : new Date(roomData.raceStartedAt);
    const elapsed = Math.floor((Date.now() - started.getTime()) / 1000);
    const remaining = Math.max(0, RACE_TIME - elapsed);
    setTimeLeft(remaining);

    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) { clearInterval(timerRef.current); return 0; }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timerRef.current);
  }, [roomData.raceStartedAt]);

  // Auto-finish on timeout (host)
  useEffect(() => {
    if (timeLeft > 0) return;
    if (roomData.host !== user.uid) return;
    updateDoc(doc(db, "readingRooms", code), { status: "finished" });
  }, [timeLeft]);

  // Reset selection when question changes
  useEffect(() => {
    setSelected(null);
    setFeedback(null);
  }, [qIdx]);

  async function handleAnswer(optionIdx) {
    if (selected !== null) return;
    setSelected(optionIdx);
    const correct = q.answer === optionIdx;
    setFeedback(correct ? "correct" : "wrong");

    const newProgress = qIdx + 1;
    const scoreGain = correct ? 2 : 0;
    // Speed bonus: +1 if first to answer correctly
    const opponentAnswered = roomData.answers?.[opponentId] !== undefined;
    const speedBonus = correct && !opponentAnswered ? 1 : 0;

    const updates = {
      [`answers.${user.uid}`]: optionIdx,
      [`scores.${user.uid}`]: myScore + scoreGain + speedBonus,
      [`progress.${user.uid}`]: newProgress,
    };
    if (correct && !roomData.firstCorrect?.[qIdx]) {
      updates[`firstCorrect.${qIdx}`] = user.uid;
    }
    await updateDoc(doc(db, "readingRooms", code), updates);

    // Advance after short delay
    setTimeout(async () => {
      if (newProgress >= TOTAL_QUESTIONS) {
        // Check if opponent also done
        const opponentProgress = roomData.progress?.[opponentId] ?? 0;
        if (opponentProgress >= TOTAL_QUESTIONS || roomData.host === user.uid) {
          await updateDoc(doc(db, "readingRooms", code), { status: "finished" });
        }
      } else if (roomData.host === user.uid) {
        const opponentProgress = roomData.progress?.[opponentId] ?? 0;
        const nextQ = Math.max(newProgress, opponentProgress);
        if (nextQ > qIdx) {
          await updateDoc(doc(db, "readingRooms", code), {
            currentQ: nextQ,
            answers: {},
          });
        }
      }
    }, 900);
  }

  if (!passage || !q) return <div style={S.center}><p style={{ color: "#94a3b8" }}>Loading…</p></div>;

  const mins = String(Math.floor(timeLeft / 60)).padStart(2, "0");
  const secs = String(timeLeft % 60).padStart(2, "0");
  const timerColor = timeLeft > 60 ? "#22c55e" : timeLeft > 30 ? "#f59e0b" : "#ef4444";

  return (
    <div style={{ ...S.page, display: "grid", gridTemplateColumns: "1fr 420px", minHeight: "100vh" }}>

      {/* LEFT: Passage */}
      <div style={{ padding: "24px 32px 24px 24px", overflowY: "auto", borderRight: "1px solid rgba(255,255,255,.06)" }}>
        {/* Top bar */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
          <h2 style={{ color: "#f1f5f9", fontWeight: 800, fontSize: "18px", margin: 0 }}>{passage.title}</h2>
          <div style={{ display: "flex", alignItems: "center", gap: "6px", padding: "8px 16px", borderRadius: "10px", background: "rgba(255,255,255,.05)", border: `1px solid ${timerColor}40` }}>
            <Timer size={14} color={timerColor} />
            <span style={{ fontWeight: 800, fontSize: "18px", color: timerColor, fontVariantNumeric: "tabular-nums" }}>{mins}:{secs}</span>
          </div>
        </div>

        {/* Progress bars */}
        <div style={{ marginBottom: "20px", display: "flex", flexDirection: "column", gap: "8px" }}>
          {[
            { name: "You", progress: myProgress, score: myScore, color: "#2563eb" },
            { name: opponentName, progress: oppProgress, score: oppScore, color: "#f472b6" },
          ].map(p => (
            <div key={p.name} style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <span style={{ color: "#64748b", fontSize: "11px", fontWeight: 700, width: "80px", flexShrink: 0 }}>{p.name}</span>
              <div style={{ flex: 1, height: "6px", background: "rgba(255,255,255,.08)", borderRadius: "999px", overflow: "hidden" }}>
                <motion.div animate={{ width: `${(p.progress / TOTAL_QUESTIONS) * 100}%` }} transition={{ duration: 0.4 }}
                  style={{ height: "100%", background: p.color, borderRadius: "999px" }} />
              </div>
              <span style={{ color: p.color, fontWeight: 800, fontSize: "13px", width: "32px", textAlign: "right" }}>{p.score}pt</span>
            </div>
          ))}
        </div>

        {/* Passage text */}
        <div style={{ background: "rgba(255,255,255,.03)", border: "1px solid rgba(255,255,255,.07)", borderRadius: "16px", padding: "24px" }}>
          {passage.passage.split("\n\n").map((para, i) => (
            <p key={i} style={{ color: "#cbd5e1", fontSize: "15px", lineHeight: 1.85, marginBottom: i < passage.passage.split("\n\n").length - 1 ? "18px" : 0 }}>{para}</p>
          ))}
        </div>
      </div>

      {/* RIGHT: Questions */}
      <div style={{ padding: "24px", display: "flex", flexDirection: "column", overflowY: "auto" }}>
        <div style={{ marginBottom: "16px" }}>
          <span style={{ color: "#64748b", fontSize: "11px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "1.5px" }}>
            Question {qIdx + 1} of {TOTAL_QUESTIONS}
          </span>
        </div>

        <motion.div key={qIdx} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
          style={{ background: "rgba(255,255,255,.05)", border: "1px solid rgba(255,255,255,.1)", borderRadius: "18px", padding: "22px", marginBottom: "16px" }}>
          <p style={{ color: "#f1f5f9", fontSize: "15px", lineHeight: 1.7, margin: 0, fontWeight: 600 }}>{q.question}</p>
        </motion.div>

        <div style={{ display: "flex", flexDirection: "column", gap: "10px", flex: 1 }}>
          {q.options.map((opt, i) => {
            let bg = "rgba(255,255,255,.04)";
            let border = "1px solid rgba(255,255,255,.08)";
            let color = "#cbd5e1";
            if (selected !== null) {
              if (i === q.answer) { bg = "rgba(34,197,94,.15)"; border = "1px solid #22c55e"; color = "#4ade80"; }
              else if (i === selected && i !== q.answer) { bg = "rgba(239,68,68,.15)"; border = "1px solid #ef4444"; color = "#f87171"; }
            }
            return (
              <motion.button key={i} whileHover={selected === null ? { scale: 1.015 } : {}} whileTap={selected === null ? { scale: 0.98 } : {}}
                onClick={() => handleAnswer(i)}
                style={{ padding: "14px 16px", borderRadius: "14px", border, background: bg, color, fontSize: "14px", fontWeight: 500, cursor: selected === null ? "pointer" : "default", textAlign: "left", lineHeight: 1.5, display: "flex", alignItems: "flex-start", gap: "10px" }}>
                <span style={{ display: "inline-flex", width: "22px", height: "22px", borderRadius: "6px", background: "rgba(255,255,255,.08)", alignItems: "center", justifyContent: "center", fontSize: "11px", fontWeight: 800, flexShrink: 0, marginTop: "1px" }}>
                  {["A","B","C","D"][i]}
                </span>
                {opt}
              </motion.button>
            );
          })}
        </div>

        {feedback && (
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
            style={{ marginTop: "14px", padding: "12px 16px", borderRadius: "12px", background: feedback === "correct" ? "rgba(34,197,94,.1)" : "rgba(239,68,68,.1)", border: `1px solid ${feedback === "correct" ? "#22c55e40" : "#ef444440"}` }}>
            <p style={{ margin: 0, fontWeight: 700, fontSize: "13px", color: feedback === "correct" ? "#4ade80" : "#f87171" }}>
              {feedback === "correct" ? "✓ Correct! +2pts" + (roomData.firstCorrect?.[qIdx] === user.uid ? " +1 speed bonus!" : "") : `✗ The answer was: "${q.options[q.answer]}"`}
            </p>
          </motion.div>
        )}

        <div style={{ marginTop: "16px", padding: "12px 16px", borderRadius: "12px", background: "rgba(255,255,255,.03)", border: "1px solid rgba(255,255,255,.06)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: "11px", color: "#64748b", fontWeight: 700, marginBottom: "4px" }}>
            <span>SCORING</span>
          </div>
          <div style={{ fontSize: "12px", color: "#475569", lineHeight: 1.8 }}>
            ✓ Correct: <strong style={{ color: "#4ade80" }}>+2pts</strong> &nbsp;|&nbsp;
            ⚡ First correct: <strong style={{ color: "#fbbf24" }}>+1 bonus</strong> &nbsp;|&nbsp;
            ✗ Wrong: <strong style={{ color: "#f87171" }}>0pts</strong>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Results ───────────────────────────────────────────────────────────────────
function ResultsScreen({ roomData, user, code, navigate }) {
  const myScore = roomData.scores?.[user.uid] ?? 0;
  const opponentId = roomData.host === user.uid ? roomData.guest : roomData.host;
  const opponentName = roomData.host === user.uid ? roomData.guestName : roomData.hostName;
  const oppScore = roomData.scores?.[opponentId] ?? 0;
  const iWon = myScore > oppScore;
  const tied = myScore === oppScore;

  async function leaveRoom() {
    if (roomData.host === user.uid) {
      await deleteDoc(doc(db, "readingRooms", code));
    }
    navigate("/games");
  }

  return (
    <div style={S.center}>
      <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} style={{ ...S.card, textAlign: "center" }}>
        <div style={{ fontSize: "52px", marginBottom: "14px" }}>
          {tied ? "🤝" : iWon ? "🏆" : "📖"}
        </div>
        <h1 style={{ ...S.heading, fontSize: "26px", marginBottom: "8px" }}>
          {tied ? "It's a Tie!" : iWon ? "You Won the Race!" : "Race Over!"}
        </h1>
        <p style={{ color: "#94a3b8", fontSize: "13px", marginBottom: "28px" }}>
          Passage: <span style={{ color: "#60a5fa" }}>{roomData.passage?.title}</span>
        </p>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px", marginBottom: "28px" }}>
          {[{ name: "You", score: myScore }, { name: opponentName, score: oppScore }].map(p => (
            <div key={p.name} style={{ padding: "18px", borderRadius: "14px", background: "rgba(255,255,255,.04)", border: "1px solid rgba(255,255,255,.08)" }}>
              <p style={{ color: "#64748b", fontSize: "11px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "1px", marginBottom: "8px" }}>{p.name}</p>
              <p style={{ fontSize: "38px", fontWeight: 900, color: "#60a5fa" }}>{p.score}</p>
              <p style={{ color: "#475569", fontSize: "11px" }}>points</p>
            </div>
          ))}
        </div>

        <p style={{ color: "#64748b", fontSize: "12px", marginBottom: "20px" }}>
          Max possible: <strong style={{ color: "#94a3b8" }}>{TOTAL_QUESTIONS * 2 + TOTAL_QUESTIONS} pts</strong> (all correct + all speed bonuses)
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <button onClick={leaveRoom} style={S.primaryBtn}>Play Again</button>
          <button onClick={() => navigate("/games")} style={{ ...S.primaryBtn, background: "rgba(255,255,255,.06)", color: "#94a3b8" }}>
            Back to Games Zone
          </button>
        </div>
      </motion.div>
    </div>
  );
}

// ── Main ──────────────────────────────────────────────────────────────────────
export default function ReadingRace() {
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
    unsubRef.current = onSnapshot(doc(db, "readingRooms", roomCode), snap => {
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
            <Lobby user={user} onRoom={handleRoom} />
          </motion.div>
        )}
        {phase === "waiting" && roomData && (
          <motion.div key="waiting" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <WaitingRoom roomData={roomData} code={roomCode} role={role} />
          </motion.div>
        )}
        {phase === "playing" && roomData && (
          <motion.div key="playing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <RaceScreen roomData={roomData} code={roomCode} user={user} />
          </motion.div>
        )}
        {phase === "finished" && roomData && (
          <motion.div key="finished" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <ResultsScreen roomData={roomData} user={user} code={roomCode} navigate={navigate} />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
