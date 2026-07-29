import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Mic, MicOff, Trophy, Users, Copy, Check, ArrowRight, Brain, Loader2, LogOut, Play, RotateCcw } from "lucide-react";
import { db } from "../firebase";
import { useAuth } from "../context/AuthContext";
import {
  doc, setDoc, onSnapshot, updateDoc, arrayUnion,
  getDoc, serverTimestamp,
} from "firebase/firestore";
import { createBots, botSpeakingScore, botDifficulty, wait } from "../utils/gameBots";

/* ── helpers ── */
const shuffle = (arr) => [...arr].sort(() => Math.random() - 0.5);
const genCode = () => Math.random().toString(36).slice(2, 8).toUpperCase();

const QUESTIONS = [
  "Describe a memorable journey you have taken. Say where you went, how you travelled, what you did there, and explain why it was memorable.",
  "Describe a person who has had a significant influence on your life. Say who they are, how long you have known them, their qualities, and how they influenced you.",
  "Describe a skill you would like to learn. Say what it is, why you want to learn it, how you would learn it, and how it would help you.",
  "Describe a time when you helped someone. Say who you helped, what the situation was, how you helped, and how you felt about it.",
  "Describe your favourite place to study or work. Say where it is, what it looks like, what you do there, and why you like it.",
  "Describe a book or film that made a strong impression on you. Say what it was about, when you experienced it, what you liked, and why it impressed you.",
  "Describe a goal you hope to achieve in the future. Say what it is, why you want it, what steps you are taking, and how you will feel when you achieve it.",
  "Describe a tradition from your culture. Say what it is, when it happens, how people celebrate it, and why it is important.",
  "Describe a time you made an important decision. Say what it was, what made it hard, what you chose, and whether it was right.",
  "Describe a piece of technology you use regularly. Say what it is, what you use it for, how long you have had it, and how it changed your life.",
  "Describe an interesting conversation you had. Say who you spoke with, what you talked about, how long it lasted, and why it was interesting.",
  "Describe something you do to keep healthy. Say what it is, how often you do it, when you started, and why it matters.",
  "Describe a type of weather you enjoy. Say what it is, when it occurs, what you do during it, and why you enjoy it.",
  "Describe a time you learned from a mistake. Say what happened, what the mistake was, what you learned, and how it changed you.",
  "Describe a sport or physical activity you enjoy. Say what it is, how often you do it, who you do it with, and why you enjoy it.",
  "Describe a museum or gallery you visited. Say where it was, when you went, what you saw, and what you found most interesting.",
  "Describe a subject you enjoyed at school. Say what it was, how long you studied it, what the classes were like, and why you enjoyed it.",
  "Describe a time you received good news. Say what the news was, who told you, when it happened, and how you felt.",
  "Describe a place in your city you enjoy visiting. Say where it is, what it looks like, when you go, and why you enjoy it.",
  "Describe a time you visited a new place. Say where it was, why you went, what you did, and whether you would recommend it.",
];

/* ── styles ── */
const S = {
  page: { minHeight: "100vh", background: "radial-gradient(circle at 15% 10%, rgba(139,92,246,.14), transparent 40%), radial-gradient(circle at 85% 85%, rgba(37,99,235,.12), transparent 40%), #0a0f1e", fontFamily: "Inter,sans-serif", padding: "80px 24px 60px", color: "#f1f5f9" },
  center: { maxWidth: 860, margin: "0 auto" },
  card: { background: "rgba(255,255,255,.05)", border: "1px solid rgba(255,255,255,.09)", borderRadius: 24, padding: "36px 40px" },
  badge: (c) => ({ display: "inline-flex", alignItems: "center", gap: 8, padding: "8px 18px", borderRadius: 999, background: `${c}18`, border: `1px solid ${c}35`, color: c, fontSize: 11, fontWeight: 800, letterSpacing: 2, textTransform: "uppercase", marginBottom: 20 }),
  h1: { fontSize: "clamp(32px,5vw,56px)", fontWeight: 900, letterSpacing: -2, margin: "0 0 14px", lineHeight: 1.05 },
  h2: { fontSize: 26, fontWeight: 800, margin: "0 0 10px" },
  p:  { color: "#94a3b8", lineHeight: 1.8, margin: "0 0 24px" },
  btn: (bg, c="#fff") => ({ display: "inline-flex", alignItems: "center", gap: 10, padding: "14px 26px", borderRadius: 14, background: bg, color: c, fontWeight: 800, fontSize: 15, border: "none", cursor: "pointer", transition: "transform .2s,box-shadow .2s" }),
  outlineBtn: { display: "inline-flex", alignItems: "center", gap: 8, padding: "12px 22px", borderRadius: 14, background: "rgba(255,255,255,.05)", border: "1px solid rgba(255,255,255,.12)", color: "#f1f5f9", fontWeight: 700, fontSize: 14, cursor: "pointer" },
  input: { width: "100%", padding: "14px 18px", borderRadius: 14, background: "rgba(255,255,255,.06)", border: "1px solid rgba(255,255,255,.10)", color: "#f1f5f9", fontSize: 16, fontWeight: 700, outline: "none", letterSpacing: 3 },
  scoreBar: (pct, c) => ({ height: 8, borderRadius: 999, background: `linear-gradient(90deg,${c},${c}88)`, width: `${Math.min(pct * 100 / 9, 100)}%`, transition: "width 1s ease" }),
};

export default function SpeakingShowdown() {
  const { user, name } = useAuth();
  const navigate = useNavigate();

  const [gameState, setGameState] = useState("lobby"); // lobby|waiting|round|processing|scores|finished
  const [mode, setMode] = useState("2v2");
  const [roomCode, setRoomCode] = useState("");
  const [joinCode, setJoinCode] = useState("");
  const [roomData, setRoomData] = useState(null);
  const [currentRound, setCurrentRound] = useState(0);
  const [recording, setRecording] = useState(false);
  const [timeLeft, setTimeLeft] = useState(45);
  const [myScores, setMyScores] = useState(null);
  const [roundScores, setRoundScores] = useState([]);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const mediaRecorderRef = useRef(null);
  const chunksRef = useRef([]);
  const timerRef = useRef(null);
  const unsubRef = useRef(null);

  const displayName = name || user?.email?.split("@")[0] || "Player";
  const isHost = roomData?.host === user?.uid;
  const playerCount = roomData?.players?.length || 0;
  const maxPlayers = roomData?.maxPlayers || (mode === "2v2" ? 4 : 8);
  const canStart = isHost; // bots always fill vacant slots — no minimum needed

  /* ── Firestore subscription ── */
  function subscribeRoom(code) {
    if (unsubRef.current) unsubRef.current();
    const ref = doc(db, "speakingRooms", code);
    unsubRef.current = onSnapshot(ref, (snap) => {
      if (!snap.exists()) return;
      const data = snap.data();
      setRoomData(data);
      if (data.status === "playing") {
        setCurrentRound(data.round);
        setSubmitted(false);
        setMyScores(null);
        setGameState("round");
        setTimeLeft(45);
      }
      if (data.status === "finished") {
        setGameState("finished");
      }
    });
  }

  useEffect(() => () => { if (unsubRef.current) unsubRef.current(); clearInterval(timerRef.current); }, []);

  /* ── Create room ── */
  async function createRoom() {
    setError("");
    const code = genCode();
    const questions = shuffle(QUESTIONS).slice(0, 5);
    const maxP = mode === "2v2" ? 4 : 8;

    // Build bots to fill all remaining slots
    const bots = createBots(maxP - 1, [displayName]);
    const botPlayers = bots.map((b, i) => ({
      uid: b.uid, name: b.name, isBot: true,
      team: i % 2 === 0 ? "B" : "A",   // alternate teams
      scores: [],
    }));

    await setDoc(doc(db, "speakingRooms", code), {
      code, mode, maxPlayers: maxP,
      players: [
        { uid: user.uid, name: displayName, team: "A", scores: [], isBot: false },
        ...botPlayers,
      ],
      host: user.uid, status: "waiting",
      round: 0, questions,
      createdAt: serverTimestamp(),
    });
    setRoomCode(code);
    setGameState("waiting");
    subscribeRoom(code);
  }

  /* ── Join room ── */
  async function joinRoom() {
    setError("");
    const code = joinCode.toUpperCase().trim();
    if (!code) { setError("Enter a room code"); return; }
    const snap = await getDoc(doc(db, "speakingRooms", code));
    if (!snap.exists()) { setError("Room not found"); return; }
    const data = snap.data();
    if (data.players.find(p => p.uid === user.uid)) { setRoomCode(code); setGameState("waiting"); subscribeRoom(code); return; }
    const humanSlots = data.players.filter(p => !p.isBot).length;
    // Replace a bot with this real player if room is full of bots
    let updatedPlayers = data.players;
    const botSlot = updatedPlayers.findIndex(p => p.isBot);
    const teamA = updatedPlayers.filter(p => p.team === "A").length;
    const teamB = updatedPlayers.filter(p => p.team === "B").length;
    const team = teamA <= teamB ? "A" : "B";
    const newPlayer = { uid: user.uid, name: displayName, team, scores: [], isBot: false };
    if (botSlot !== -1) {
      updatedPlayers = updatedPlayers.map((p, i) => i === botSlot ? newPlayer : p);
    } else if (updatedPlayers.length < data.maxPlayers) {
      updatedPlayers = [...updatedPlayers, newPlayer];
    } else {
      setError("Room is full"); return;
    }
    await updateDoc(doc(db, "speakingRooms", code), { players: updatedPlayers });
    setRoomCode(code);
    setGameState("waiting");
    subscribeRoom(code);
  }

  /* ── Start game — always ready since bots fill the room ── */
  async function startGame() {
    await updateDoc(doc(db, "speakingRooms", roomCode), { status: "playing", round: 0 });
  }

  /* ── Simulate bot scores for current round (called after human submits) ── */
  async function simulateBotRound(roundIndex) {
    const snap = await getDoc(doc(db, "speakingRooms", roomCode));
    if (!snap.exists()) return;
    const d = snap.data();
    const bots = d.players.filter(p => p.isBot);
    if (!bots.length) return;

    // Bots submit after a short random delay (2–6s) to feel natural
    for (const bot of bots) {
      const delay = 1500 + Math.random() * 4000;
      await wait(delay);
      const scores = botSpeakingScore(botDifficulty(bot.uid));
      const freshSnap = await getDoc(doc(db, "speakingRooms", roomCode));
      if (!freshSnap.exists()) return;
      const players = freshSnap.data().players.map(p =>
        p.uid === bot.uid
          ? { ...p, scores: [...(p.scores || []), { round: roundIndex, ...scores }] }
          : p
      );
      await updateDoc(doc(db, "speakingRooms", roomCode), { players });
    }
  }

  /* ── Recording ── */
  async function startRecording() {
    chunksRef.current = [];
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mr = new MediaRecorder(stream);
      mr.ondataavailable = (e) => { if (e.data.size > 0) chunksRef.current.push(e.data); };
      mr.onstop = () => { stream.getTracks().forEach(t => t.stop()); processRecording(); };
      mr.start();
      mediaRecorderRef.current = mr;
      setRecording(true);
      let t = 45;
      setTimeLeft(t);
      timerRef.current = setInterval(() => {
        t--;
        setTimeLeft(t);
        if (t <= 0) { clearInterval(timerRef.current); stopRecording(); }
      }, 1000);
    } catch {
      setError("Microphone access denied. Please allow microphone and try again.");
    }
  }

  function stopRecording() {
    clearInterval(timerRef.current);
    if (mediaRecorderRef.current?.state !== "inactive") {
      mediaRecorderRef.current.stop();
    }
    setRecording(false);
  }

  async function processRecording() {
    setGameState("processing");
    setSubmitted(true);
    try {
      const blob = new Blob(chunksRef.current, { type: "audio/webm" });
      // Transcribe
      const tRes = await fetch("/api/transcribe", { method: "POST", headers: { "Content-Type": "audio/webm" }, body: blob });
      const tData = await tRes.json();
      const transcript = tData.transcript || "No speech detected";
      // Evaluate
      const eRes = await fetch("/api/ai/evaluate-speaking", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ response: transcript }) });
      const eData = await eRes.json();
      const scores = {
        fluency: eData.fluency || 6,
        pronunciation: eData.pronunciation || 6,
        vocabulary: eData.lexicalResource || 6,
        grammar: eData.grammar || 6,
        overall: eData.overallBand || 6,
        transcript,
      };
      setMyScores(scores);
      // Save to Firestore
      const snap = await getDoc(doc(db, "speakingRooms", roomCode));
      if (snap.exists()) {
        const players = snap.data().players.map(p =>
          p.uid === user.uid ? { ...p, scores: [...(p.scores || []), { round: currentRound, ...scores }] } : p
        );
        await updateDoc(doc(db, "speakingRooms", roomCode), { players });
      }
    } catch {
      setMyScores({ fluency: 6, pronunciation: 6, vocabulary: 6, grammar: 6, overall: 6, transcript: "Evaluation failed" });
    }
    setGameState("scores");
    // Trigger bot scoring in background (host only)
    if (isHost) simulateBotRound(currentRound);
  }

  /* ── Next round / finish ── */
  async function nextRound() {
    if (currentRound >= 4) {
      await updateDoc(doc(db, "speakingRooms", roomCode), { status: "finished" });
    } else {
      await updateDoc(doc(db, "speakingRooms", roomCode), { status: "playing", round: currentRound + 1 });
    }
  }

  /* ── Leave ── */
  function leaveRoom() {
    if (unsubRef.current) unsubRef.current();
    clearInterval(timerRef.current);
    setGameState("lobby");
    setRoomCode("");
    setRoomData(null);
    navigate("/games");
  }

  /* ── Copy code ── */
  function copyCode() {
    navigator.clipboard.writeText(roomCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  /* ── Derived ── */
  const currentQuestion = roomData?.questions?.[currentRound] || "";
  const teamA = roomData?.players?.filter(p => p.team === "A") || [];
  const teamB = roomData?.players?.filter(p => p.team === "B") || [];

  function teamScore(team) {
    return team.reduce((sum, p) => {
      const avg = p.scores?.length ? p.scores.reduce((s, r) => s + r.overall, 0) / p.scores.length : 0;
      return sum + avg;
    }, 0).toFixed(1);
  }

  /* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
     RENDER
  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
  return (
    <div style={S.page}>
      <div style={{ position: "fixed", inset: 0, backgroundImage: "linear-gradient(rgba(255,255,255,.025) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.025) 1px,transparent 1px)", backgroundSize: "40px 40px", pointerEvents: "none", zIndex: 0 }} />
      <div style={{ ...S.center, position: "relative", zIndex: 1 }}>

        {/* ── LOBBY ── */}
        {gameState === "lobby" && (
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}>
            <div style={{ textAlign: "center", marginBottom: 56 }}>
              <div style={S.badge("#8b5cf6")}><Mic size={13} /> SPEAKING GAMES</div>
              <h1 style={S.h1}>🎙️ Speaking <span style={{ background: "linear-gradient(90deg,#8b5cf6,#06b6d4)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Showdown</span></h1>
              <p style={{ ...S.p, maxWidth: 520, margin: "0 auto 32px" }}>Answer IELTS speaking questions in real-time team battles. AI scores fluency, pronunciation, vocabulary and grammar every round.</p>
            </div>

            {/* Mode selector */}
            <div style={{ ...S.card, marginBottom: 24 }}>
              <h2 style={S.h2}>Select Mode</h2>
              <div style={{ display: "flex", gap: 16, marginBottom: 28 }}>
                {[{ id: "2v2", label: "2v2 Teams", desc: "2 players per side, 4 total", icon: "⚔️" }, { id: "4v4", label: "4v4 Teams", desc: "4 players per side, 8 total", icon: "🏆" }].map(m => (
                  <div key={m.id} onClick={() => setMode(m.id)} style={{ flex: 1, padding: "20px 24px", borderRadius: 18, border: `2px solid ${mode === m.id ? "#8b5cf6" : "rgba(255,255,255,.09)"}`, background: mode === m.id ? "rgba(139,92,246,.12)" : "rgba(255,255,255,.03)", cursor: "pointer", transition: "all .2s" }}>
                    <div style={{ fontSize: 28, marginBottom: 8 }}>{m.icon}</div>
                    <div style={{ fontWeight: 800, fontSize: 17, marginBottom: 4 }}>{m.label}</div>
                    <div style={{ color: "#94a3b8", fontSize: 13 }}>{m.desc}</div>
                  </div>
                ))}
              </div>
              <button style={{ ...S.btn("linear-gradient(135deg,#8b5cf6,#2563eb)"), width: "100%", justifyContent: "center" }} onClick={createRoom}>
                <Play size={18} /> Create Room
              </button>
            </div>

            {/* Join */}
            <div style={{ ...S.card, textAlign: "center" }}>
              <div style={{ color: "#64748b", fontWeight: 700, marginBottom: 20, fontSize: 13, letterSpacing: 1 }}>— OR JOIN A ROOM —</div>
              <div style={{ display: "flex", gap: 12 }}>
                <input style={S.input} value={joinCode} onChange={e => setJoinCode(e.target.value.toUpperCase())} placeholder="ENTER CODE" maxLength={6} onKeyDown={e => e.key === "Enter" && joinRoom()} />
                <button style={{ ...S.btn("#2563eb"), whiteSpace: "nowrap" }} onClick={joinRoom}><ArrowRight size={18} /> Join</button>
              </div>
              {error && <div style={{ color: "#f87171", marginTop: 12, fontWeight: 600 }}>{error}</div>}
            </div>
          </motion.div>
        )}

        {/* ── WAITING ── */}
        {gameState === "waiting" && (
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 32 }}>
              <div>
                <div style={S.badge("#8b5cf6")}><Users size={13} /> LOBBY</div>
                <h1 style={{ ...S.h1, fontSize: 36 }}>🎙️ Speaking Showdown</h1>
              </div>
              <button style={S.outlineBtn} onClick={leaveRoom}><LogOut size={16} /> Leave</button>
            </div>

            {/* Room code */}
            <div style={{ ...S.card, textAlign: "center", marginBottom: 24 }}>
              <div style={{ color: "#94a3b8", fontSize: 13, fontWeight: 700, marginBottom: 12 }}>ROOM CODE — SHARE WITH FRIENDS</div>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 16 }}>
                <div style={{ fontSize: 48, fontWeight: 900, letterSpacing: 10, color: "#f1f5f9", background: "rgba(139,92,246,.12)", padding: "16px 32px", borderRadius: 18, border: "2px solid rgba(139,92,246,.3)" }}>{roomCode}</div>
                <button style={S.outlineBtn} onClick={copyCode}>{copied ? <Check size={16} color="#22c55e" /> : <Copy size={16} />}{copied ? "Copied!" : "Copy"}</button>
              </div>
              <div style={{ color: "#64748b", fontSize: 13, marginTop: 12 }}>{mode.toUpperCase()} · {playerCount}/{maxPlayers} players joined</div>
            </div>

            {/* Teams */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 24 }}>
              {[{ label: "Team A", players: teamA, color: "#2563eb" }, { label: "Team B", players: teamB, color: "#8b5cf6" }].map(t => (
                <div key={t.label} style={{ ...S.card, borderTop: `3px solid ${t.color}` }}>
                  <div style={{ fontWeight: 800, color: t.color, marginBottom: 16 }}>{t.label}</div>
                  {t.players.map(p => (
                    <div key={p.uid} style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 0", borderBottom: "1px solid rgba(255,255,255,.05)" }}>
                      <div style={{ width: 36, height: 36, borderRadius: "50%", background: `linear-gradient(135deg,${t.color},#06b6d4)`, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 16 }}>{p.name.charAt(0).toUpperCase()}</div>
                      <div>
                        <div style={{ fontWeight: 700, fontSize: 14 }}>{p.name}{p.isBot && <span style={{ fontSize: 11, color: "#a78bfa", marginLeft: 6 }}>🤖 Bot</span>}</div>
                        {p.uid === roomData?.host && <div style={{ fontSize: 11, color: "#f59e0b", fontWeight: 700 }}>HOST</div>}
                      </div>
                    </div>
                  ))}
                  {t.players.length === 0 && <div style={{ color: "#64748b", fontSize: 13 }}>Waiting...</div>}
                </div>
              ))}
            </div>

            {isHost ? (
              canStart ? (
                <button style={{ ...S.btn("linear-gradient(135deg,#22c55e,#16a34a)"), width: "100%", justifyContent: "center", fontSize: 18 }} onClick={startGame}><Play size={20} /> Start Game!</button>
              ) : (
                <div style={{ textAlign: "center", color: "#64748b", fontWeight: 700, padding: 24 }}>
                  <motion.div animate={{ opacity: [1, 0.5, 1] }} transition={{ duration: 1.5, repeat: Infinity }}>⏳ Waiting for at least 2 players to start...</motion.div>
                </div>
              )
            ) : (
              <div style={{ textAlign: "center", color: "#64748b", fontWeight: 700, padding: 24 }}>
                <motion.div animate={{ opacity: [1, 0.5, 1] }} transition={{ duration: 1.5, repeat: Infinity }}>⏳ Waiting for host to start the game...</motion.div>
              </div>
            )}
          </motion.div>
        )}

        {/* ── ROUND ── */}
        {gameState === "round" && (
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 32 }}>
              <div style={{ ...S.badge("#8b5cf6"), marginBottom: 0 }}>Round {currentRound + 1} of 5</div>
              <button style={S.outlineBtn} onClick={leaveRoom}><LogOut size={16} /> Leave</button>
            </div>

            {/* Question */}
            <div style={{ ...S.card, marginBottom: 24, borderLeft: "4px solid #8b5cf6" }}>
              <div style={{ color: "#a78bfa", fontWeight: 800, fontSize: 12, letterSpacing: 2, marginBottom: 14 }}>IELTS SPEAKING QUESTION</div>
              <div style={{ fontSize: "clamp(16px,2.5vw,22px)", fontWeight: 700, lineHeight: 1.7, color: "#f1f5f9" }}>{currentQuestion}</div>
            </div>

            {/* Timer + Record */}
            <div style={{ ...S.card, textAlign: "center" }}>
              {!submitted ? (
                <>
                  {/* SVG circular timer */}
                  <div style={{ position: "relative", width: 160, height: 160, margin: "0 auto 24px" }}>
                    <svg width={160} height={160} style={{ transform: "rotate(-90deg)" }}>
                      <circle cx={80} cy={80} r={70} fill="none" stroke="rgba(255,255,255,.07)" strokeWidth={8} />
                      <motion.circle cx={80} cy={80} r={70} fill="none" stroke={timeLeft > 15 ? "#8b5cf6" : "#ef4444"} strokeWidth={8}
                        strokeDasharray={440} strokeDashoffset={440 - (440 * timeLeft / 45)} strokeLinecap="round"
                        transition={{ duration: 0.5 }} />
                    </svg>
                    <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                      <div style={{ fontSize: 42, fontWeight: 900, color: timeLeft > 15 ? "#f1f5f9" : "#f87171" }}>{timeLeft}</div>
                      <div style={{ fontSize: 12, color: "#64748b", fontWeight: 700 }}>seconds</div>
                    </div>
                  </div>

                  {!recording ? (
                    <button style={{ ...S.btn("linear-gradient(135deg,#ef4444,#dc2626)"), fontSize: 17, padding: "18px 40px", boxShadow: "0 16px 40px rgba(239,68,68,.35)" }} onClick={startRecording}>
                      <Mic size={22} /> Start Recording
                    </button>
                  ) : (
                    <motion.div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 16 }}>
                      <motion.div animate={{ scale: [1, 1.15, 1], opacity: [1, 0.7, 1] }} transition={{ duration: 1, repeat: Infinity }}
                        style={{ width: 80, height: 80, borderRadius: "50%", background: "rgba(239,68,68,.2)", border: "3px solid #ef4444", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <Mic size={32} color="#ef4444" />
                      </motion.div>
                      <div style={{ color: "#ef4444", fontWeight: 800, fontSize: 16 }}>● Recording...</div>
                      <button style={S.outlineBtn} onClick={stopRecording}><MicOff size={16} /> Stop Early</button>
                    </motion.div>
                  )}
                  <div style={{ color: "#64748b", fontSize: 13, marginTop: 20 }}>Speak naturally for up to 45 seconds about the topic above.</div>
                </>
              ) : (
                <div style={{ color: "#94a3b8", padding: "24px 0", fontWeight: 700 }}>
                  <motion.div animate={{ opacity: [1, 0.4, 1] }} transition={{ duration: 1.5, repeat: Infinity }}>✅ Answer submitted — waiting for others...</motion.div>
                </div>
              )}
            </div>
          </motion.div>
        )}

        {/* ── PROCESSING ── */}
        {gameState === "processing" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ textAlign: "center", padding: "120px 0" }}>
            <motion.div animate={{ rotate: 360 }} transition={{ duration: 2, repeat: Infinity, ease: "linear" }} style={{ display: "inline-block", marginBottom: 24 }}>
              <Brain size={64} color="#8b5cf6" />
            </motion.div>
            <h2 style={{ ...S.h2, marginBottom: 12 }}>Evaluating your answer...</h2>
            <p style={{ ...S.p, maxWidth: 400, margin: "0 auto" }}>AI is scoring your fluency, pronunciation, vocabulary and grammar.</p>
            <div style={{ display: "flex", justifyContent: "center", gap: 8, marginTop: 24 }}>
              {[0, 1, 2].map(i => (
                <motion.div key={i} animate={{ y: [0, -12, 0] }} transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.2 }}
                  style={{ width: 10, height: 10, borderRadius: "50%", background: "#8b5cf6" }} />
              ))}
            </div>
          </motion.div>
        )}

        {/* ── SCORES ── */}
        {gameState === "scores" && myScores && (
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}>
            <div style={{ textAlign: "center", marginBottom: 32 }}>
              <div style={S.badge("#22c55e")}>Round {currentRound + 1} Results</div>
              <h2 style={S.h2}>Your Score</h2>
              <div style={{ fontSize: 72, fontWeight: 900, color: "#f1f5f9", lineHeight: 1 }}>
                {myScores.overall.toFixed(1)}
                <span style={{ fontSize: 24, color: "#94a3b8", fontWeight: 600 }}> / 9</span>
              </div>
            </div>

            {/* Score bars */}
            <div style={{ ...S.card, marginBottom: 24 }}>
              {[
                { label: "Fluency", val: myScores.fluency, color: "#2563eb" },
                { label: "Pronunciation", val: myScores.pronunciation, color: "#8b5cf6" },
                { label: "Vocabulary", val: myScores.vocabulary, color: "#f59e0b" },
                { label: "Grammar", val: myScores.grammar, color: "#22c55e" },
              ].map(s => (
                <div key={s.label} style={{ marginBottom: 20 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                    <span style={{ fontWeight: 700, fontSize: 14 }}>{s.label}</span>
                    <span style={{ fontWeight: 900, color: s.color }}>{s.val} / 9</span>
                  </div>
                  <div style={{ height: 8, borderRadius: 999, background: "rgba(255,255,255,.08)" }}>
                    <motion.div initial={{ width: 0 }} animate={S.scoreBar(s.val, s.color)} />
                  </div>
                </div>
              ))}
            </div>

            {/* Team scores */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 24 }}>
              {[{ label: "Team A", players: teamA, color: "#2563eb" }, { label: "Team B", players: teamB, color: "#8b5cf6" }].map(t => (
                <div key={t.label} style={{ ...S.card, textAlign: "center", borderTop: `3px solid ${t.color}` }}>
                  <div style={{ color: t.color, fontWeight: 800, marginBottom: 8 }}>{t.label}</div>
                  <div style={{ fontSize: 32, fontWeight: 900 }}>{teamScore(t.players)}</div>
                  <div style={{ color: "#64748b", fontSize: 12 }}>avg band</div>
                </div>
              ))}
            </div>

            {isHost && (
              <button style={{ ...S.btn(currentRound >= 4 ? "linear-gradient(135deg,#f59e0b,#d97706)" : "linear-gradient(135deg,#8b5cf6,#2563eb)"), width: "100%", justifyContent: "center", fontSize: 17 }} onClick={nextRound}>
                {currentRound >= 4 ? <><Trophy size={20} /> See Final Results</> : <><ArrowRight size={20} /> Next Round</>}
              </button>
            )}
            {!isHost && <div style={{ textAlign: "center", color: "#64748b", fontWeight: 700, marginTop: 16 }}>Waiting for host to start next round...</div>}
          </motion.div>
        )}

        {/* ── FINISHED ── */}
        {gameState === "finished" && roomData && (() => {
          const allPlayers = [...(roomData.players || [])].map(p => ({
            ...p,
            avgScore: p.scores?.length ? p.scores.reduce((s, r) => s + r.overall, 0) / p.scores.length : 0,
          })).sort((a, b) => b.avgScore - a.avgScore);
          const tAScore = parseFloat(teamScore(teamA));
          const tBScore = parseFloat(teamScore(teamB));
          const winTeam = tAScore > tBScore ? "A" : tBScore > tAScore ? "B" : null;

          return (
            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}>
              <div style={{ textAlign: "center", marginBottom: 40 }}>
                <div style={S.badge("#f59e0b")}><Trophy size={13} /> Final Results</div>
                <h1 style={{ ...S.h1, fontSize: 42 }}>🏆 Game Over!</h1>
                {winTeam && <div style={{ fontSize: 22, fontWeight: 800, color: winTeam === "A" ? "#2563eb" : "#8b5cf6", marginTop: 8 }}>Team {winTeam} Wins!</div>}
                {!winTeam && <div style={{ fontSize: 20, fontWeight: 800, color: "#f59e0b" }}>It's a Draw!</div>}
              </div>

              {/* Team totals */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 32 }}>
                {[{ label: "Team A", score: tAScore, color: "#2563eb", win: winTeam === "A" }, { label: "Team B", score: tBScore, color: "#8b5cf6", win: winTeam === "B" }].map(t => (
                  <div key={t.label} style={{ ...S.card, textAlign: "center", borderTop: `4px solid ${t.color}`, background: t.win ? `rgba(255,255,255,.08)` : "rgba(255,255,255,.04)" }}>
                    {t.win && <div style={{ fontSize: 28, marginBottom: 4 }}>👑</div>}
                    <div style={{ color: t.color, fontWeight: 800, marginBottom: 8, fontSize: 18 }}>{t.label}</div>
                    <div style={{ fontSize: 40, fontWeight: 900 }}>{t.score.toFixed(1)}</div>
                    <div style={{ color: "#64748b", fontSize: 13 }}>avg band</div>
                  </div>
                ))}
              </div>

              {/* Leaderboard */}
              <div style={{ ...S.card, marginBottom: 28 }}>
                <h3 style={{ fontWeight: 800, fontSize: 18, marginBottom: 20 }}>🏅 Player Rankings</h3>
                {allPlayers.map((p, i) => (
                  <div key={p.uid} style={{ display: "flex", alignItems: "center", gap: 16, padding: "14px 0", borderBottom: "1px solid rgba(255,255,255,.06)" }}>
                    <div style={{ fontSize: i === 0 ? 28 : 22, width: 36, textAlign: "center" }}>{["🥇", "🥈", "🥉"][i] || `#${i + 1}`}</div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 800, fontSize: 15 }}>{p.name} {p.uid === user?.uid && <span style={{ color: "#22c55e", fontSize: 12 }}>(You)</span>}</div>
                      <div style={{ color: p.team === "A" ? "#60a5fa" : "#a78bfa", fontSize: 12, fontWeight: 700 }}>Team {p.team}</div>
                    </div>
                    <div style={{ fontWeight: 900, fontSize: 22, color: "#f1f5f9" }}>{p.avgScore.toFixed(1)}</div>
                  </div>
                ))}
              </div>

              <div style={{ display: "flex", gap: 14 }}>
                <button style={{ ...S.btn("linear-gradient(135deg,#8b5cf6,#2563eb)"), flex: 1, justifyContent: "center" }} onClick={() => { if (unsubRef.current) unsubRef.current(); setGameState("lobby"); setRoomCode(""); setRoomData(null); }}>
                  <RotateCcw size={18} /> Play Again
                </button>
                <button style={{ ...S.outlineBtn, flex: 1, justifyContent: "center" }} onClick={() => navigate("/games")}>
                  <LogOut size={18} /> Back to Games
                </button>
              </div>
            </motion.div>
          );
        })()}

      </div>
    </div>
  );
}
