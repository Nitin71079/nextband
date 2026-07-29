import { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Headphones, Play, Trophy, Users, Copy, Check,
  ArrowRight, LogOut, RotateCcw, Zap, Volume2, VolumeX, Target,
} from "lucide-react";
import { db } from "../firebase";
import { useAuth } from "../context/AuthContext";
import {
  doc, setDoc, onSnapshot, updateDoc, arrayUnion,
  getDoc, serverTimestamp,
} from "firebase/firestore";
import { createBots, botDifficulty, botSniperAnswer, wait } from "../utils/gameBots";

/* ── helpers ── */
const genCode = () => Math.random().toString(36).slice(2, 8).toUpperCase();
const shuffle = (arr) => [...arr].sort(() => Math.random() - 0.5);

/* ── Question bank ── */
/* Each question: audio text read aloud, then 4 options, correctIndex */
const QUESTION_BANK = [
  {
    audio: "The man says he will meet his friend at the library at three thirty in the afternoon to study for their biology exam.",
    question: "Where will the man meet his friend?",
    options: ["The cafeteria", "The library", "The classroom", "The gym"],
    correct: 1,
  },
  {
    audio: "The woman is looking for a flat that has two bedrooms, a garden, and is close to a bus stop. Her budget is six hundred pounds per month.",
    question: "What is the woman's monthly budget?",
    options: ["£500", "£650", "£600", "£700"],
    correct: 2,
  },
  {
    audio: "The lecturer announces that the assignment deadline has been moved from Friday the fifteenth to Monday the eighteenth due to the public holiday.",
    question: "When is the new assignment deadline?",
    options: ["Friday 15th", "Monday 18th", "Wednesday 17th", "Tuesday 16th"],
    correct: 1,
  },
  {
    audio: "The tour guide explains that the museum opens at nine in the morning and closes at five in the evening, except on Sundays when it closes at three.",
    question: "What time does the museum close on Sundays?",
    options: ["5:00 PM", "4:00 PM", "3:00 PM", "6:00 PM"],
    correct: 2,
  },
  {
    audio: "According to the radio announcement, passengers travelling to Edinburgh should go to platform seven. The train departs in fifteen minutes.",
    question: "Which platform should passengers use?",
    options: ["Platform 5", "Platform 9", "Platform 7", "Platform 3"],
    correct: 2,
  },
  {
    audio: "The doctor advises the patient to take two tablets in the morning and one tablet at night with food. The course lasts for ten days.",
    question: "How many tablets should the patient take in the morning?",
    options: ["One", "Three", "Two", "Four"],
    correct: 2,
  },
  {
    audio: "The student asks about the price of the university gym membership. The receptionist says it is forty pounds per term or one hundred pounds per year.",
    question: "How much is the annual gym membership?",
    options: ["£40", "£80", "£120", "£100"],
    correct: 3,
  },
  {
    audio: "The weather forecast says it will be cloudy in the morning with heavy rain expected in the afternoon. Temperatures will drop to around eight degrees.",
    question: "What weather is expected in the afternoon?",
    options: ["Sunny", "Cloudy", "Heavy rain", "Snow"],
    correct: 2,
  },
  {
    audio: "The manager tells the team that the new office will be located on the fourth floor of the Riverside building, starting from the first of next month.",
    question: "On which floor will the new office be located?",
    options: ["Second floor", "Third floor", "Fifth floor", "Fourth floor"],
    correct: 3,
  },
  {
    audio: "The professor says the exam will cover chapters one through eight, and students should pay particular attention to the section on global warming in chapter six.",
    question: "Which chapter has the section on global warming?",
    options: ["Chapter 4", "Chapter 6", "Chapter 8", "Chapter 2"],
    correct: 1,
  },
  {
    audio: "The travel agent explains that the flight to Sydney leaves on Tuesday at eleven forty-five and arrives the following Thursday morning due to the time difference.",
    question: "When does the flight to Sydney depart?",
    options: ["Monday", "Wednesday", "Tuesday", "Thursday"],
    correct: 2,
  },
  {
    audio: "The student says she chose environmental science because she wants to work for an international organisation focused on climate policy after graduation.",
    question: "Why did the student choose environmental science?",
    options: ["She loves animals", "She wants to work in climate policy", "Her parents suggested it", "It was the easiest subject"],
    correct: 1,
  },
  {
    audio: "The landlord informs the tenant that the water will be turned off on Wednesday morning from eight until midday for essential pipe repairs in the building.",
    question: "How long will the water be turned off?",
    options: ["Two hours", "All day", "Four hours", "One hour"],
    correct: 2,
  },
  {
    audio: "The sports coach announces that practice has been moved from Tuesday to Thursday this week and will start at six in the evening instead of five.",
    question: "What time will practice start this week?",
    options: ["5:00 PM", "6:30 PM", "6:00 PM", "7:00 PM"],
    correct: 2,
  },
  {
    audio: "The librarian reminds students that books can be borrowed for three weeks and renewed twice online. Late returns incur a fine of twenty pence per day.",
    question: "What is the fine for late book returns per day?",
    options: ["10 pence", "50 pence", "£1", "20 pence"],
    correct: 3,
  },
];

/* ── Shared styles ── */
const S = {
  page:  { minHeight: "100vh", background: "radial-gradient(circle at 20% 10%, rgba(6,182,212,.12), transparent 40%), radial-gradient(circle at 80% 80%, rgba(37,99,235,.10), transparent 40%), #0a0f1e", fontFamily: "Inter,sans-serif", padding: "80px 24px 60px", color: "#f1f5f9" },
  wrap:  { maxWidth: 860, margin: "0 auto", position: "relative", zIndex: 1 },
  card:  (extra) => ({ background: "rgba(255,255,255,.05)", border: "1px solid rgba(255,255,255,.09)", borderRadius: 24, padding: "32px 36px", ...extra }),
  badge: (c) => ({ display: "inline-flex", alignItems: "center", gap: 8, padding: "8px 18px", borderRadius: 999, background: `${c}18`, border: `1px solid ${c}35`, color: c, fontSize: 11, fontWeight: 800, letterSpacing: 2, textTransform: "uppercase", marginBottom: 20 }),
  h1:    { fontSize: "clamp(30px,5vw,52px)", fontWeight: 900, letterSpacing: -2, margin: "0 0 14px", lineHeight: 1.05 },
  h2:    { fontSize: 24, fontWeight: 800, margin: "0 0 10px" },
  p:     { color: "#94a3b8", lineHeight: 1.8, margin: "0 0 20px", fontSize: 16 },
  btn:   (bg, extra) => ({ display: "inline-flex", alignItems: "center", gap: 10, padding: "14px 26px", borderRadius: 14, background: bg, color: "#fff", fontWeight: 800, fontSize: 15, border: "none", cursor: "pointer", transition: "transform .15s,box-shadow .15s", ...extra }),
  ghost: { display: "inline-flex", alignItems: "center", gap: 8, padding: "12px 20px", borderRadius: 14, background: "rgba(255,255,255,.05)", border: "1px solid rgba(255,255,255,.10)", color: "#f1f5f9", fontWeight: 700, fontSize: 14, cursor: "pointer" },
  input: { width: "100%", padding: "14px 18px", borderRadius: 14, background: "rgba(255,255,255,.06)", border: "1px solid rgba(255,255,255,.10)", color: "#f1f5f9", fontSize: 16, fontWeight: 700, outline: "none", letterSpacing: 3 },
};

const TOTAL_ROUNDS = 10;
const POINTS = { first: 100, second: 70, third: 50, wrong: -10 };

export default function AudioSniper() {
  const { user, name } = useAuth();
  const navigate = useNavigate();
  const displayName = name || user?.email?.split("@")[0] || "Player";

  /* ── state ── */
  const [phase, setPhase]       = useState("lobby");   // lobby|waiting|playing|results
  const [roomCode, setRoomCode] = useState("");
  const [joinCode, setJoinCode] = useState("");
  const [roomData, setRoomData] = useState(null);
  const [error, setError]       = useState("");
  const [copied, setCopied]     = useState(false);

  /* in-round */
  const [roundIdx, setRoundIdx]         = useState(0);
  const [question, setQuestion]         = useState(null);
  const [playing, setPlaying]           = useState(false);
  const [played, setPlayed]             = useState(false);
  const [selected, setSelected]         = useState(null);   // option index chosen
  const [answered, setAnswered]         = useState(false);
  const [feedback, setFeedback]         = useState(null);   // 'correct'|'wrong'
  const [points, setPoints]             = useState(0);
  const [roundPoints, setRoundPoints]   = useState(null);
  const [countdown, setCountdown]       = useState(null);   // seconds after audio ends
  const [showQuestion, setShowQuestion] = useState(false);

  const unsubRef    = useRef(null);
  const timerRef    = useRef(null);
  const synthRef    = useRef(null);
  const answerTimeRef = useRef(null); // timestamp when question appeared

  /* ── subscribe ── */
  function subscribeRoom(code) {
    if (unsubRef.current) unsubRef.current();
    unsubRef.current = onSnapshot(doc(db, "audioSniperRooms", code), (snap) => {
      if (!snap.exists()) return;
      const d = snap.data();
      setRoomData(d);
      if (d.status === "playing" && d.round !== undefined) {
        const q = d.questions[d.round];
        setRoundIdx(d.round);
        setQuestion(q);
        setAnswered(false);
        setSelected(null);
        setFeedback(null);
        setRoundPoints(null);
        setPlayed(false);
        setShowQuestion(false);
        setPlaying(false);
        setCountdown(null);
        setPhase("playing");
      }
      if (d.status === "finished") setPhase("results");
    });
  }

  useEffect(() => () => {
    if (unsubRef.current) unsubRef.current();
    clearInterval(timerRef.current);
    window.speechSynthesis?.cancel();
  }, []);

  /* ── create room ── */
  async function createRoom() {
    setError("");
    const code = genCode();
    const qs = shuffle(QUESTION_BANK).slice(0, TOTAL_ROUNDS);
    // Fill with 7 bots
    const bots = createBots(7, [displayName]);
    const botPlayers = bots.map(b => ({ uid: b.uid, name: b.name, isBot: true, score: 0, answers: [] }));
    await setDoc(doc(db, "audioSniperRooms", code), {
      code, maxPlayers: 8,
      players: [{ uid: user.uid, name: displayName, isBot: false, score: 0, answers: [] }, ...botPlayers],
      host: user.uid, status: "waiting",
      round: 0, questions: qs,
      createdAt: serverTimestamp(),
    });
    setRoomCode(code);
    setPhase("waiting");
    subscribeRoom(code);
  }

  /* ── join room ── */
  async function joinRoom() {
    setError("");
    const code = joinCode.toUpperCase().trim();
    if (!code) { setError("Enter a room code"); return; }
    const snap = await getDoc(doc(db, "audioSniperRooms", code));
    if (!snap.exists()) { setError("Room not found"); return; }
    const d = snap.data();
    if (d.players.find(p => p.uid === user.uid)) { setRoomCode(code); setPhase("waiting"); subscribeRoom(code); return; }
    // Replace a bot slot if room is "full" of bots
    let updated = d.players;
    const botIdx = updated.findIndex(p => p.isBot);
    const newP = { uid: user.uid, name: displayName, isBot: false, score: 0, answers: [] };
    if (botIdx !== -1) {
      updated = updated.map((p, i) => i === botIdx ? newP : p);
      await updateDoc(doc(db, "audioSniperRooms", code), { players: updated });
    } else if (updated.length < d.maxPlayers) {
      await updateDoc(doc(db, "audioSniperRooms", code), { players: arrayUnion(newP) });
    } else {
      setError("Room is full"); return;
    }
    setRoomCode(code);
    setPhase("waiting");
    subscribeRoom(code);
  }

  /* ── start game — always ready since bots fill the room ── */
  async function startGame() {
    await updateDoc(doc(db, "audioSniperRooms", roomCode), { status: "playing", round: 0 });
  }

  /* ── Simulate all bots answering for this round ── */
  async function simulateBotRound(qIdx, correctIdx) {
    const snap = await getDoc(doc(db, "audioSniperRooms", roomCode));
    if (!snap.exists()) return;
    const d = snap.data();
    const bots = d.players.filter(p => p.isBot);

    // Track how many correct answers have been recorded already (human may already be correct)
    let correctCount = d.players.filter(p =>
      p.answers?.find(a => a.round === qIdx && a.correct)
    ).length;

    // Run bots with staggered delays
    const botActions = bots.map(bot => {
      const { delay, correct } = botSniperAnswer(botDifficulty(bot.uid));
      return { bot, delay, correct };
    }).sort((a, b) => a.delay - b.delay); // process fastest first

    for (const { bot, delay, correct } of botActions) {
      await wait(delay);
      const freshSnap = await getDoc(doc(db, "audioSniperRooms", roomCode));
      if (!freshSnap.exists()) return;
      const fresh = freshSnap.data();

      const earned = correct
        ? (correctCount === 0 ? POINTS.first : correctCount === 1 ? POINTS.second : POINTS.third)
        : POINTS.wrong;
      if (correct) correctCount++;

      const players = fresh.players.map(p =>
        p.uid === bot.uid
          ? {
              ...p,
              score: Math.max(0, (p.score || 0) + earned),
              answers: [...(p.answers || []), { round: qIdx, chosen: correct ? correctIdx : -1, correct, earned }],
            }
          : p
      );
      await updateDoc(doc(db, "audioSniperRooms", roomCode), { players });
    }
  }

  /* ── play audio via speech synthesis ── */
  function playAudio(text) {
    if (!window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const utt = new SpeechSynthesisUtterance(text);
    utt.rate = 0.88;
    utt.pitch = 1;
    utt.lang = "en-GB";
    // prefer a British/Australian voice
    const voices = window.speechSynthesis.getVoices();
    const preferred = voices.find(v => v.lang.startsWith("en-GB") || v.lang.startsWith("en-AU")) || voices.find(v => v.lang.startsWith("en"));
    if (preferred) utt.voice = preferred;

    synthRef.current = utt;
    setPlaying(true);
    setPlayed(false);

    utt.onend = () => {
      setPlaying(false);
      setPlayed(true);
      setShowQuestion(true);
      answerTimeRef.current = Date.now();
      // 15-second countdown to answer
      let t = 15;
      setCountdown(t);
      timerRef.current = setInterval(() => {
        t--;
        setCountdown(t);
        if (t <= 0) {
          clearInterval(timerRef.current);
          if (!answered) autoSubmit();
        }
      }, 1000);
    };
    window.speechSynthesis.speak(utt);
  }

  /* ── auto-submit if time runs out ── */
  function autoSubmit() {
    setAnswered(true);
    setFeedback("wrong");
    setRoundPoints(POINTS.wrong);
    setPoints(p => Math.max(0, p + POINTS.wrong));
    // Bots still answer even if human runs out of time
    if (isHost && question) simulateBotRound(roundIdx, question.correct);
  }

  /* ── answer selection ── */
  async function selectAnswer(idx) {
    if (answered || !played) return;
    clearInterval(timerRef.current);
    setSelected(idx);
    setAnswered(true);
    setCountdown(null);

    const isCorrect = idx === question.correct;
    const elapsed = Date.now() - (answerTimeRef.current || Date.now());

    // Save to Firestore
    const snap = await getDoc(doc(db, "audioSniperRooms", roomCode));
    const d = snap.data();
    const correctsThisRound = d.players.filter(p =>
      p.answers?.find(a => a.round === roundIdx && a.correct)
    ).length;

    let earned = 0;
    if (isCorrect) {
      earned = correctsThisRound === 0 ? POINTS.first : correctsThisRound === 1 ? POINTS.second : POINTS.third;
    } else {
      earned = POINTS.wrong;
    }

    setFeedback(isCorrect ? "correct" : "wrong");
    setRoundPoints(earned);
    setPoints(p => Math.max(0, p + earned));

    // Save to Firestore
    const players = d.players.map(p => p.uid === user.uid
      ? { ...p, score: Math.max(0, (p.score || 0) + earned), answers: [...(p.answers || []), { round: roundIdx, chosen: idx, correct: isCorrect, earned, elapsed }] }
      : p
    );
    await updateDoc(doc(db, "audioSniperRooms", roomCode), { players });

    // Simulate bots answering in background (host only)
    if (isHost) simulateBotRound(roundIdx, question.correct);
  }

  /* ── next round ── */
  async function nextRound() {
    window.speechSynthesis?.cancel();
    if (roundIdx >= TOTAL_ROUNDS - 1) {
      await updateDoc(doc(db, "audioSniperRooms", roomCode), { status: "finished" });
    } else {
      await updateDoc(doc(db, "audioSniperRooms", roomCode), { status: "playing", round: roundIdx + 1 });
    }
  }

  /* ── leave ── */
  function leave() {
    window.speechSynthesis?.cancel();
    if (unsubRef.current) unsubRef.current();
    clearInterval(timerRef.current);
    navigate("/games");
  }

  function copyCode() { navigator.clipboard.writeText(roomCode); setCopied(true); setTimeout(() => setCopied(false), 2000); }

  const isHost = roomData?.host === user?.uid;
  const playerCount = roomData?.players?.length || 0;
  const myPlayer = roomData?.players?.find(p => p.uid === user?.uid);

  /* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
     RENDER
  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
  return (
    <div style={S.page}>
      <div style={{ position:"fixed", inset:0, backgroundImage:"linear-gradient(rgba(255,255,255,.025) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.025) 1px,transparent 1px)", backgroundSize:"40px 40px", pointerEvents:"none", zIndex:0 }} />
      <div style={S.wrap}>

        {/* ══════════ LOBBY ══════════ */}
        {phase === "lobby" && (
          <motion.div initial={{opacity:0,y:24}} animate={{opacity:1,y:0}}>
            <div style={{textAlign:"center", marginBottom:48}}>
              <div style={S.badge("#06b6d4")}><Headphones size={13}/> LISTENING GAMES</div>
              <h1 style={S.h1}>🎧 Audio <span style={{background:"linear-gradient(90deg,#06b6d4,#2563eb)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent"}}>Sniper</span></h1>
              <p style={{...S.p, maxWidth:520, margin:"0 auto 32px"}}>Everyone hears the same IELTS-style recording. Fastest correct answer wins the round. First to snipe 3 in a row gets a bonus. Up to 8 players.</p>
              <div style={{display:"flex", justifyContent:"center", gap:20, flexWrap:"wrap", marginBottom:40}}>
                {[{icon:<Zap size={16}/>, text:"Real-time multiplayer"},{icon:<Target size={16}/>, text:"Speed bonus points"},{icon:<Headphones size={16}/>, text:"IELTS-style audio"}].map(f=>(
                  <div key={f.text} style={{display:"flex",alignItems:"center",gap:8,color:"#64748b",fontSize:13,fontWeight:600}}>
                    <span style={{color:"#06b6d4"}}>{f.icon}</span>{f.text}
                  </div>
                ))}
              </div>
            </div>

            {/* Points explainer */}
            <div style={{...S.card(), marginBottom:24, display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:16, textAlign:"center"}}>
              {[{label:"1st Correct",pts:"+100",c:"#22c55e"},{label:"2nd Correct",pts:"+70",c:"#06b6d4"},{label:"3rd Correct",pts:"+50",c:"#f59e0b"},{label:"Wrong Answer",pts:"-10",c:"#ef4444"}].map(x=>(
                <div key={x.label}>
                  <div style={{fontSize:26,fontWeight:900,color:x.c}}>{x.pts}</div>
                  <div style={{fontSize:12,color:"#64748b",fontWeight:700,marginTop:4}}>{x.label}</div>
                </div>
              ))}
            </div>

            <div style={{...S.card(), marginBottom:20}}>
              <h2 style={S.h2}>Create a Room</h2>
              <p style={{...S.p, marginBottom:16}}>You'll be the host. Share the room code with friends.</p>
              <button style={{...S.btn("linear-gradient(135deg,#06b6d4,#2563eb)"), width:"100%", justifyContent:"center"}} onClick={createRoom}>
                <Play size={18}/> Create Room
              </button>
            </div>

            <div style={{...S.card(), textAlign:"center"}}>
              <div style={{color:"#64748b",fontWeight:700,marginBottom:20,fontSize:13,letterSpacing:1}}>— OR JOIN A ROOM —</div>
              <div style={{display:"flex",gap:12}}>
                <input style={S.input} value={joinCode} onChange={e=>setJoinCode(e.target.value.toUpperCase())} placeholder="ENTER CODE" maxLength={6} onKeyDown={e=>e.key==="Enter"&&joinRoom()}/>
                <button style={{...S.btn("#2563eb"), whiteSpace:"nowrap"}} onClick={joinRoom}><ArrowRight size={18}/> Join</button>
              </div>
              {error && <div style={{color:"#f87171",marginTop:12,fontWeight:600}}>{error}</div>}
            </div>
          </motion.div>
        )}

        {/* ══════════ WAITING ══════════ */}
        {phase === "waiting" && (
          <motion.div initial={{opacity:0,y:24}} animate={{opacity:1,y:0}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:32}}>
              <div>
                <div style={S.badge("#06b6d4")}><Users size={13}/> LOBBY</div>
                <h1 style={{...S.h1,fontSize:36}}>🎧 Audio Sniper</h1>
              </div>
              <button style={S.ghost} onClick={leave}><LogOut size={16}/> Leave</button>
            </div>

            {/* Room code */}
            <div style={{...S.card({borderTop:"3px solid #06b6d4"}), textAlign:"center", marginBottom:24}}>
              <div style={{color:"#94a3b8",fontSize:13,fontWeight:700,marginBottom:12}}>ROOM CODE — SHARE WITH FRIENDS</div>
              <div style={{display:"flex",alignItems:"center",justifyContent:"center",gap:16}}>
                <div style={{fontSize:48,fontWeight:900,letterSpacing:10,color:"#f1f5f9",background:"rgba(6,182,212,.12)",padding:"16px 32px",borderRadius:18,border:"2px solid rgba(6,182,212,.3)"}}>{roomCode}</div>
                <button style={S.ghost} onClick={copyCode}>{copied?<Check size={16} color="#22c55e"/>:<Copy size={16}/>}{copied?"Copied!":"Copy"}</button>
              </div>
              <div style={{color:"#64748b",fontSize:13,marginTop:12}}>{playerCount} / 8 players joined</div>
            </div>

            {/* Players grid */}
            <div style={{...S.card(), marginBottom:24}}>
              <h3 style={{fontWeight:800,fontSize:16,marginBottom:16}}>Players</h3>
              <div style={{display:"grid",gridTemplateColumns:"repeat(2,1fr)",gap:14}}>
                {roomData?.players?.map(p=>(
                  <div key={p.uid} style={{display:"flex",alignItems:"center",gap:10,padding:"10px 14px",borderRadius:14,background:"rgba(255,255,255,.03)",border:"1px solid rgba(255,255,255,.06)"}}>
                    <div style={{width:36,height:36,borderRadius:"50%",background:"linear-gradient(135deg,#06b6d4,#2563eb)",display:"flex",alignItems:"center",justifyContent:"center",fontWeight:800,fontSize:16}}>{p.name.charAt(0).toUpperCase()}</div>
                    <div>
                      <div style={{fontWeight:700,fontSize:14}}>{p.name}</div>
                      {p.uid===roomData?.host&&<div style={{fontSize:11,color:"#f59e0b",fontWeight:700}}>HOST</div>}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {isHost?
              <button style={{...S.btn("linear-gradient(135deg,#22c55e,#16a34a)"), width:"100%", justifyContent:"center", fontSize:18}} onClick={startGame}><Play size={20}/> Start Game!</button>
            : (
              <div style={{textAlign:"center",color:"#64748b",fontWeight:700,padding:24}}>
                <motion.div animate={{opacity:[1,0.5,1]}} transition={{duration:1.5,repeat:Infinity}}>⏳ Waiting for host to start...</motion.div>
              </div>
            )}
          </motion.div>
        )}

        {/* ══════════ PLAYING ══════════ */}
        {phase === "playing" && question && (
          <motion.div initial={{opacity:0}} animate={{opacity:1}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:32}}>
              <div>
                <div style={S.badge("#06b6d4")}>Round {roundIdx+1} / {TOTAL_ROUNDS}</div>
                <h2 style={{...S.h2,margin:0}}>Listen carefully...</h2>
              </div>
              <button style={S.ghost} onClick={leave}><LogOut size={16}/> Leave</button>
            </div>

            {/* Top bar: score, countdown */}
            <div style={{display:"flex",gap:16,marginBottom:24}}>
              <div style={{...S.card({flex:1,textAlign:"center"})}}>
                <div style={{fontSize:12,color:"#64748b",marginBottom:4,fontWeight:700}}>YOUR SCORE</div>
                <div style={{fontSize:32,fontWeight:900,color:"#f1f5f9"}}>{myPlayer?.score || 0}</div>
              </div>
              {countdown!==null&&(
                <div style={{...S.card({flex:1,textAlign:"center",borderTop:"3px solid #ef4444"})}}>
                  <div style={{fontSize:12,color:"#64748b",marginBottom:4,fontWeight:700}}>TIME LEFT</div>
                  <div style={{fontSize:32,fontWeight:900,color:countdown<=5?"#f87171":"#f1f5f9"}}>{countdown}s</div>
                </div>
              )}
            </div>

            {/* Audio player */}
            {!played ? (
              <div style={{...S.card({borderLeft:"4px solid #06b6d4",marginBottom:24})}}>
                <div style={{display:"flex",alignItems:"center",gap:16}}>
                  <motion.div animate={playing?{scale:[1,1.15,1]}:{}} transition={{duration:.8,repeat:Infinity}}
                    style={{width:64,height:64,borderRadius:"50%",background:playing?"rgba(6,182,212,.2)":"rgba(6,182,212,.1)",border:`3px solid ${playing?"#06b6d4":"rgba(6,182,212,.3)"}`,display:"flex",alignItems:"center",justifyContent:"center"}}>
                    {playing?<Volume2 size={28} color="#06b6d4"/>:<VolumeX size={28} color="#64748b"/>}
                  </motion.div>
                  <div style={{flex:1}}>
                    <div style={{fontWeight:800,fontSize:16,marginBottom:4,color:"#06b6d4"}}>Listen to the audio</div>
                    <div style={{color:"#94a3b8",fontSize:14}}>Click play, then answer the question as fast as you can.</div>
                  </div>
                  {!playing&&!played&&(
                    <button style={{...S.btn("linear-gradient(135deg,#06b6d4,#2563eb)")}} onClick={()=>playAudio(question.audio)}>
                      <Play size={18}/> Play Audio
                    </button>
                  )}
                  {playing&&<div style={{color:"#06b6d4",fontWeight:800,fontSize:14}}>▶ Playing...</div>}
                </div>
              </div>
            ) : null}

            {/* Question + options */}
            {showQuestion&&(
              <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}}>
                <div style={{...S.card({marginBottom:20})}}>
                  <div style={{fontSize:12,color:"#a5b4fc",fontWeight:800,letterSpacing:1,marginBottom:12}}>QUESTION</div>
                  <div style={{fontSize:18,fontWeight:700,lineHeight:1.7,marginBottom:20,color:"#f1f5f9"}}>{question.question}</div>
                  <div style={{display:"grid",gap:12}}>
                    {question.options.map((opt,i)=>{
                      const isCorrect=i===question.correct;
                      const chosen=i===selected;
                      return(
                        <button key={i} disabled={answered}
                          onClick={()=>selectAnswer(i)}
                          style={{
                            ...S.btn(
                              answered&&chosen&&feedback==="correct"?"linear-gradient(135deg,#22c55e,#16a34a)":
                              answered&&chosen&&feedback==="wrong"?"linear-gradient(135deg,#ef4444,#dc2626)":
                              "rgba(255,255,255,.06)",
                              {
                                border:chosen?"2px solid #06b6d4":"1px solid rgba(255,255,255,.1)",
                                cursor:answered?"default":"pointer",
                                justifyContent:"flex-start",
                                fontSize:16,
                                padding:"16px 20px",
                                opacity:answered?(chosen?1:0.5):1,
                                width:"100%",
                              }
                            )
                          }}>
                          <div style={{width:28,height:28,borderRadius:"50%",background:answered&&chosen&&feedback==="correct"?"#fff":answered&&chosen?"#fff":"rgba(255,255,255,.1)",display:"flex",alignItems:"center",justifyContent:"center",fontWeight:900,fontSize:14,color:answered&&chosen?"#0f172a":"#f1f5f9"}}>
                            {String.fromCharCode(65+i)}
                          </div>
                          {opt}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {roundPoints!==null&&(
                  <motion.div initial={{scale:0.9,opacity:0}} animate={{scale:1,opacity:1}}
                    style={{...S.card({borderTop:`3px solid ${roundPoints>0?"#22c55e":"#ef4444"}`,textAlign:"center",marginBottom:20})}}>
                    <div style={{fontSize:42,fontWeight:900,color:roundPoints>0?"#22c55e":"#f87171"}}>
                      {roundPoints>0?`+${roundPoints}`:roundPoints}
                    </div>
                    <div style={{color:"#94a3b8",fontSize:14,marginTop:8}}>{feedback==="correct"?"Correct!":"Wrong answer"}</div>
                  </motion.div>
                )}

                {isHost&&answered&&(
                  <button style={{...S.btn(roundIdx>=TOTAL_ROUNDS-1?"linear-gradient(135deg,#f59e0b,#d97706)":"linear-gradient(135deg,#06b6d4,#2563eb)"), width:"100%", justifyContent:"center"}} onClick={nextRound}>
                    {roundIdx>=TOTAL_ROUNDS-1?<><Trophy size={18}/> See Results</>:<><ArrowRight size={18}/> Next Round</>}
                  </button>
                )}
                {!isHost&&answered&&<div style={{textAlign:"center",color:"#64748b",fontWeight:700,marginTop:16}}>Waiting for host to start next round...</div>}
              </motion.div>
            )}
          </motion.div>
        )}

        {/* ══════════ RESULTS ══════════ */}
        {phase === "results" && roomData && (() => {
          const sorted = [...(roomData.players||[])].sort((a,b)=>(b.score||0)-(a.score||0));
          return (
            <motion.div initial={{opacity:0,y:24}} animate={{opacity:1,y:0}}>
              <div style={{textAlign:"center",marginBottom:40}}>
                <div style={S.badge("#f59e0b")}><Trophy size={13}/> Final Results</div>
                <h1 style={{...S.h1,fontSize:42}}>🏆 Game Over!</h1>
                {sorted[0]&&<div style={{fontSize:22,fontWeight:800,color:"#f59e0b",marginTop:8}}>🥇 {sorted[0].name} wins!</div>}
              </div>

              {/* Podium top 3 */}
              {sorted.length>=2&&(
                <div style={{display:"flex",alignItems:"flex-end",justifyContent:"center",gap:16,marginBottom:36}}>
                  {[sorted[1],sorted[0],sorted[2]].filter(Boolean).map((p,i)=>{
                    const pos=[2,1,3][i];
                    const heights=[160,200,130][i];
                    const colors=["#94a3b8","#f59e0b","#cd7f32"];
                    return(
                      <div key={p.uid} style={{textAlign:"center",flex:1,maxWidth:200}}>
                        <div style={{fontSize:pos===1?36:28,marginBottom:8}}>{pos===1?"🥇":pos===2?"🥈":"🥉"}</div>
                        <div style={{fontWeight:800,fontSize:14,marginBottom:4,color:"#f1f5f9"}}>{p.name}</div>
                        <div style={{fontSize:28,fontWeight:900,color:colors[i],marginBottom:8}}>{p.score}</div>
                        <div style={{height:heights,borderRadius:"14px 14px 0 0",background:`linear-gradient(180deg,${colors[i]}33,${colors[i]}15)`,border:`1px solid ${colors[i]}44`}}/>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Full leaderboard */}
              <div style={{...S.card(),marginBottom:28}}>
                <h3 style={{fontWeight:800,fontSize:18,marginBottom:20}}>🏅 Final Scores</h3>
                {sorted.map((p,i)=>(
                  <div key={p.uid} style={{display:"flex",alignItems:"center",gap:16,padding:"14px 0",borderBottom:"1px solid rgba(255,255,255,.05)"}}>
                    <div style={{fontSize:i<3?26:18,width:36,textAlign:"center"}}>{["🥇","🥈","🥉"][i]||`#${i+1}`}</div>
                    <div style={{width:40,height:40,borderRadius:"50%",background:"linear-gradient(135deg,#06b6d4,#2563eb)",display:"flex",alignItems:"center",justifyContent:"center",fontWeight:800,fontSize:16}}>{p.name.charAt(0).toUpperCase()}</div>
                    <div style={{flex:1}}>
                      <div style={{fontWeight:800,fontSize:15}}>{p.name}{p.uid===user?.uid&&<span style={{color:"#22c55e",fontSize:12,marginLeft:8}}>(You)</span>}</div>
                      <div style={{fontSize:12,color:"#64748b"}}>{p.answers?.filter(a=>a.correct).length||0} / {TOTAL_ROUNDS} correct</div>
                    </div>
                    <div style={{fontWeight:900,fontSize:26,color:"#f1f5f9"}}>{p.score}</div>
                  </div>
                ))}
              </div>

              <div style={{display:"flex",gap:14}}>
                <button style={{...S.btn("linear-gradient(135deg,#06b6d4,#2563eb)"),flex:1,justifyContent:"center"}}
                  onClick={()=>{if(unsubRef.current)unsubRef.current();clearInterval(timerRef.current);setPhase("lobby");setRoomCode("");setRoomData(null);setPoints(0);}}>
                  <RotateCcw size={18}/> Play Again
                </button>
                <button style={{...S.ghost,flex:1,justifyContent:"center"}} onClick={leave}><LogOut size={18}/> Back to Games</button>
              </div>
            </motion.div>
          );
        })()}

      </div>
    </div>
  );
}
