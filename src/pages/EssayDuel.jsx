import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  PenSquare, Trophy, Users, Copy, Check, ArrowRight,
  LogOut, RotateCcw, Clock, Swords, Brain, Loader2,
} from "lucide-react";
import { db } from "../firebase";
import { useAuth } from "../context/AuthContext";
import {
  doc, setDoc, onSnapshot, updateDoc, getDoc, serverTimestamp,
} from "firebase/firestore";
import { createBots, botEssayResult, botDifficulty, wait } from "../utils/gameBots";

const genCode = () => Math.random().toString(36).slice(2, 8).toUpperCase();
const shuffle = (arr) => [...arr].sort(() => Math.random() - 0.5);

/* ── IELTS Writing Task 2 Topics ── */
const TOPICS = [
  {
    question: "Some people believe that unpaid community service should be a compulsory part of high school programmes. To what extent do you agree or disagree?",
    type: "Opinion",
  },
  {
    question: "In many countries, the number of animals and plants is declining. Why do you think this is happening? What measures can be taken to solve this problem?",
    type: "Problem/Solution",
  },
  {
    question: "Some people think that the best way to increase road safety is to increase the minimum legal age for driving cars. To what extent do you agree or disagree?",
    type: "Opinion",
  },
  {
    question: "Some people believe that studying at university is the best route to a successful career, while others believe that it is better to get a job straight after school. Discuss both views and give your opinion.",
    type: "Discussion",
  },
  {
    question: "Many people believe that social networking sites have had a huge negative impact on both individuals and society. To what extent do you agree?",
    type: "Opinion",
  },
  {
    question: "In some countries, owning a home rather than renting one is very important for people. Why might this be the case? Do you think this is a positive or negative situation?",
    type: "Cause/Effect + Opinion",
  },
  {
    question: "Some people think that parents should teach children how to be good members of society. Others believe that schools are the place to learn this. Discuss both views and give your own opinion.",
    type: "Discussion",
  },
  {
    question: "Environmental damage is a problem in most countries. What factors damage the environment and who should take responsibility?",
    type: "Problem/Solution",
  },
  {
    question: "In many countries, people are now living longer than ever before. Some people say an ageing population creates problems for governments. Others believe there are benefits if society has more elderly people. Discuss both views and give your opinion.",
    type: "Discussion",
  },
  {
    question: "Some people believe that technology has made man more social. To what extent do you agree or disagree with this opinion?",
    type: "Opinion",
  },
  {
    question: "The increase in the production of consumer goods results in damage to the natural environment. What are the causes of this and what can be done to solve this problem?",
    type: "Problem/Solution",
  },
  {
    question: "Many people prefer to watch foreign films rather than locally produced films. Why could this be? Should governments give more financial support to local film industries?",
    type: "Cause + Opinion",
  },
  {
    question: "Some people think that success is the best measure of intelligence, while others think intelligence can be measured in other ways. Discuss both views and give your opinion.",
    type: "Discussion",
  },
  {
    question: "In some cultures, children are often told that they can achieve anything if they try hard enough. What are the advantages and disadvantages of giving children this message?",
    type: "Advantages/Disadvantages",
  },
  {
    question: "Some people say that advertising encourages us to buy things we do not really need. Others say that advertisements tell us about new products that may improve our lives. Which viewpoint do you agree with?",
    type: "Discussion",
  },
];

const TIME_LIMIT_MINUTES = 30;
const MIN_WORDS = 150; // below this shows warning

/* ── Styles ── */
const S = {
  page:  { minHeight: "100vh", background: "radial-gradient(circle at 20% 10%, rgba(245,158,11,.10), transparent 40%), radial-gradient(circle at 80% 85%, rgba(37,99,235,.10), transparent 40%), #0a0f1e", fontFamily: "Inter,sans-serif", padding: "80px 24px 60px", color: "#f1f5f9" },
  wrap:  { maxWidth: 900, margin: "0 auto", position: "relative", zIndex: 1 },
  card:  (extra) => ({ background: "rgba(255,255,255,.05)", border: "1px solid rgba(255,255,255,.09)", borderRadius: 24, padding: "32px 36px", ...extra }),
  badge: (c) => ({ display: "inline-flex", alignItems: "center", gap: 8, padding: "8px 18px", borderRadius: 999, background: `${c}18`, border: `1px solid ${c}35`, color: c, fontSize: 11, fontWeight: 800, letterSpacing: 2, textTransform: "uppercase", marginBottom: 20 }),
  h1:    { fontSize: "clamp(30px,5vw,52px)", fontWeight: 900, letterSpacing: -2, margin: "0 0 14px", lineHeight: 1.05 },
  h2:    { fontSize: 22, fontWeight: 800, margin: "0 0 10px" },
  p:     { color: "#94a3b8", lineHeight: 1.8, margin: "0 0 20px", fontSize: 16 },
  btn:   (bg, extra) => ({ display: "inline-flex", alignItems: "center", gap: 10, padding: "14px 26px", borderRadius: 14, background: bg, color: "#fff", fontWeight: 800, fontSize: 15, border: "none", cursor: "pointer", transition: "transform .15s,box-shadow .15s", ...extra }),
  ghost: { display: "inline-flex", alignItems: "center", gap: 8, padding: "12px 20px", borderRadius: 14, background: "rgba(255,255,255,.05)", border: "1px solid rgba(255,255,255,.10)", color: "#f1f5f9", fontWeight: 700, fontSize: 14, cursor: "pointer" },
  input: { width: "100%", padding: "14px 18px", borderRadius: 14, background: "rgba(255,255,255,.06)", border: "1px solid rgba(255,255,255,.10)", color: "#f1f5f9", fontSize: 16, fontWeight: 700, outline: "none", letterSpacing: 3 },
  textarea: { width: "100%", padding: "18px 20px", borderRadius: 18, background: "rgba(255,255,255,.04)", border: "1px solid rgba(255,255,255,.10)", color: "#f1f5f9", fontSize: 16, lineHeight: 1.9, outline: "none", resize: "vertical", fontFamily: "Inter,sans-serif", minHeight: 340, boxSizing: "border-box" },
};

export default function EssayDuel() {
  const { user, name } = useAuth();
  const navigate = useNavigate();
  const displayName = name || user?.email?.split("@")[0] || "Player";

  /* ── phase: lobby | waiting | writing | evaluating | results ── */
  const [phase, setPhase]         = useState("lobby");
  const [roomCode, setRoomCode]   = useState("");
  const [joinCode, setJoinCode]   = useState("");
  const [roomData, setRoomData]   = useState(null);
  const [error, setError]         = useState("");
  const [copied, setCopied]       = useState(false);

  /* writing phase */
  const [essay, setEssay]           = useState("");
  const [timeLeft, setTimeLeft]     = useState(TIME_LIMIT_MINUTES * 60);
  const [submitted, setSubmitted]   = useState(false);
  const [myResult, setMyResult]     = useState(null);
  const [evaluating, setEvaluating] = useState(false);

  const unsubRef  = useRef(null);
  const timerRef  = useRef(null);
  const essayRef  = useRef(""); // keep ref in sync to use in timer callback

  useEffect(() => { essayRef.current = essay; }, [essay]);

  const wordCount  = essay.trim() ? essay.trim().split(/\s+/).length : 0;
  const isHost     = roomData?.host === user?.uid;
  const players    = roomData?.players || [];
  const canStart   = isHost && players.length === 2;
  const myPlayer   = players.find(p => p.uid === user?.uid);
  const opponent   = players.find(p => p.uid !== user?.uid);

  /* ── subscribe ── */
  function subscribeRoom(code) {
    if (unsubRef.current) unsubRef.current();
    unsubRef.current = onSnapshot(doc(db, "essayDuelRooms", code), (snap) => {
      if (!snap.exists()) return;
      const d = snap.data();
      setRoomData(d);
      if (d.status === "writing" && phase !== "writing" && phase !== "evaluating" && phase !== "results") {
        setPhase("writing");
        setTimeLeft(TIME_LIMIT_MINUTES * 60);
        startTimer(TIME_LIMIT_MINUTES * 60);
      }
      if (d.status === "results") {
        clearInterval(timerRef.current);
        setPhase("results");
      }
    });
  }

  useEffect(() => () => {
    if (unsubRef.current) unsubRef.current();
    clearInterval(timerRef.current);
  }, []);

  function startTimer(seconds) {
    clearInterval(timerRef.current);
    let t = seconds;
    timerRef.current = setInterval(() => {
      t--;
      setTimeLeft(t);
      if (t <= 0) {
        clearInterval(timerRef.current);
        if (!submitted) autoSubmit();
      }
    }, 1000);
  }

  function autoSubmit() {
    submitEssay(essayRef.current || "(No essay submitted)");
  }

  function fmtTime(s) {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${String(m).padStart(2,"0")}:${String(sec).padStart(2,"0")}`;
  }

  /* ── Create ── */
  async function createRoom() {
    setError("");
    const code = genCode();
    const topic = shuffle(TOPICS)[0];
    // Seed one bot as opponent so the game is always playable solo
    const [bot] = createBots(1, [displayName]);
    const botPlayer = { uid: bot.uid, name: bot.name, isBot: true, essay: "", result: null, submitted: false };
    await setDoc(doc(db, "essayDuelRooms", code), {
      code, maxPlayers: 2,
      players: [
        { uid: user.uid, name: displayName, isBot: false, essay: "", result: null, submitted: false },
        botPlayer,
      ],
      host: user.uid, status: "waiting",
      topic, createdAt: serverTimestamp(),
    });
    setRoomCode(code);
    setPhase("waiting");
    subscribeRoom(code);
  }

  /* ── Join ── */
  async function joinRoom() {
    setError("");
    const code = joinCode.toUpperCase().trim();
    if (!code) { setError("Enter a room code"); return; }
    const snap = await getDoc(doc(db, "essayDuelRooms", code));
    if (!snap.exists()) { setError("Room not found"); return; }
    const d = snap.data();
    if (d.players.find(p => p.uid === user.uid)) { setRoomCode(code); setPhase("waiting"); subscribeRoom(code); return; }
    // Replace a bot slot if all human slots are taken
    const botIdx = d.players.findIndex(p => p.isBot);
    const humanCount = d.players.filter(p => !p.isBot).length;
    if (humanCount >= 2) { setError("Room is full — only 2 players allowed"); return; }
    const newPlayer = { uid: user.uid, name: displayName, isBot: false, essay: "", result: null, submitted: false };
    let newPlayers;
    if (botIdx !== -1) {
      newPlayers = d.players.map((p, i) => i === botIdx ? newPlayer : p);
    } else {
      newPlayers = [...d.players, newPlayer];
    }
    await updateDoc(doc(db, "essayDuelRooms", code), { players: newPlayers });
    setRoomCode(code);
    setPhase("waiting");
    subscribeRoom(code);
  }

  /* ── Start ── */
  async function startGame() {
    await updateDoc(doc(db, "essayDuelRooms", roomCode), { status: "writing", startedAt: serverTimestamp() });
  }

  /* ── Submit essay ── */
  async function submitEssay(text) {
    if (submitted) return;
    setSubmitted(true);
    setEvaluating(true);
    clearInterval(timerRef.current);
    const essayText = text || essay;

    let result = null;
    try {
      const res = await fetch("/api/ai/evaluate-writing", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ essay: essayText, taskType: "task2" }),
      });
      const data = await res.json();
      result = {
        band:        data.overallBand || 6.5,
        taskAchievement: data.taskAchievement || 6.5,
        coherence:   data.coherenceAndCohesion || 6.5,
        lexical:     data.lexicalResource || 6.5,
        grammar:     data.grammaticalRange || 6.5,
        feedback:    data.feedback || data.improvements?.[0] || "Good effort.",
        wordCount:   essayText.trim().split(/\s+/).length,
      };
    } catch {
      result = { band: 6.5, taskAchievement: 6.5, coherence: 6.5, lexical: 6.5, grammar: 6.5, feedback: "Evaluation unavailable.", wordCount: essayText.trim().split(/\s+/).length };
    }

    setMyResult(result);
    setEvaluating(false);

    // Save result to Firestore
    const snap = await getDoc(doc(db, "essayDuelRooms", roomCode));
    if (!snap.exists()) return;
    const d = snap.data();
    const updatedPlayers = d.players.map(p =>
      p.uid === user.uid ? { ...p, essay: essayText, result, submitted: true } : p
    );
    await updateDoc(doc(db, "essayDuelRooms", roomCode), { players: updatedPlayers });

    // Check if both submitted → move to results
    const bothDone = updatedPlayers.every(p => p.submitted);
    if (bothDone) {
      await updateDoc(doc(db, "essayDuelRooms", roomCode), { status: "results" });
    }
  }

  function copyCode() { navigator.clipboard.writeText(roomCode); setCopied(true); setTimeout(() => setCopied(false), 2000); }
  function leave() { if (unsubRef.current) unsubRef.current(); clearInterval(timerRef.current); navigate("/games"); }

  /* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
     RENDER
  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
  return (
    <div style={S.page}>
      <div style={{ position:"fixed", inset:0, backgroundImage:"linear-gradient(rgba(255,255,255,.025) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.025) 1px,transparent 1px)", backgroundSize:"40px 40px", pointerEvents:"none", zIndex:0 }}/>
      <div style={S.wrap}>

        {/* ══ LOBBY ══ */}
        {phase === "lobby" && (
          <motion.div initial={{opacity:0,y:24}} animate={{opacity:1,y:0}}>
            <div style={{textAlign:"center", marginBottom:48}}>
              <div style={S.badge("#f59e0b")}><PenSquare size={13}/> WRITING GAMES</div>
              <h1 style={S.h1}>✍️ Essay <span style={{background:"linear-gradient(90deg,#f59e0b,#ef4444)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent"}}>Duel</span></h1>
              <p style={{...S.p, maxWidth:520, margin:"0 auto 32px"}}>2 players. Same IELTS Task 2 topic. 30 minutes. AI scores both essays. Highest band wins. No rematch excuses — only better writing.</p>
            </div>

            {/* How it works */}
            <div style={{...S.card({marginBottom:24})}}>
              <h2 style={S.h2}>How It Works</h2>
              <div style={{display:"grid", gridTemplateColumns:"repeat(2,1fr)", gap:16}}>
                {[
                  {step:"01", title:"Create or join a room", desc:"Share the 6-digit code with your opponent.", color:"#f59e0b"},
                  {step:"02", title:"Get the same topic", desc:"Both players receive an identical IELTS Task 2 question.", color:"#ef4444"},
                  {step:"03", title:"Write for 30 minutes", desc:"Clock starts when host begins. Auto-submits at 0:00.", color:"#8b5cf6"},
                  {step:"04", title:"AI evaluates & declares winner", desc:"Scores on Task Achievement, Coherence, Lexical Resource and Grammar.", color:"#22c55e"},
                ].map(s=>(
                  <div key={s.step} style={{padding:"18px 20px", borderRadius:18, background:"rgba(255,255,255,.03)", border:"1px solid rgba(255,255,255,.06)"}}>
                    <div style={{fontSize:11,fontWeight:800,color:s.color,letterSpacing:2,marginBottom:8}}>STEP {s.step}</div>
                    <div style={{fontWeight:800,fontSize:15,marginBottom:6}}>{s.title}</div>
                    <div style={{color:"#64748b",fontSize:13,lineHeight:1.6}}>{s.desc}</div>
                  </div>
                ))}
              </div>
            </div>

            <div style={{...S.card({marginBottom:20})}}>
              <h2 style={S.h2}>Create a Room</h2>
              <p style={{...S.p,marginBottom:16}}>You'll be the host. You pick when to start.</p>
              <button style={{...S.btn("linear-gradient(135deg,#f59e0b,#ef4444)"), width:"100%", justifyContent:"center"}} onClick={createRoom}>
                <Swords size={18}/> Create Room
              </button>
            </div>

            <div style={{...S.card({textAlign:"center"})}}>
              <div style={{color:"#64748b",fontWeight:700,marginBottom:20,fontSize:13,letterSpacing:1}}>— OR JOIN A ROOM —</div>
              <div style={{display:"flex",gap:12}}>
                <input style={S.input} value={joinCode} onChange={e=>setJoinCode(e.target.value.toUpperCase())} placeholder="ENTER CODE" maxLength={6} onKeyDown={e=>e.key==="Enter"&&joinRoom()}/>
                <button style={{...S.btn("#2563eb"), whiteSpace:"nowrap"}} onClick={joinRoom}><ArrowRight size={18}/> Join</button>
              </div>
              {error&&<div style={{color:"#f87171",marginTop:12,fontWeight:600}}>{error}</div>}
            </div>
          </motion.div>
        )}

        {/* ══ WAITING ══ */}
        {phase === "waiting" && (
          <motion.div initial={{opacity:0,y:24}} animate={{opacity:1,y:0}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:32}}>
              <div>
                <div style={S.badge("#f59e0b")}><Users size={13}/> LOBBY</div>
                <h1 style={{...S.h1,fontSize:36}}>✍️ Essay Duel</h1>
              </div>
              <button style={S.ghost} onClick={leave}><LogOut size={16}/> Leave</button>
            </div>

            {/* Room code */}
            <div style={{...S.card({borderTop:"3px solid #f59e0b"}), textAlign:"center", marginBottom:24}}>
              <div style={{color:"#94a3b8",fontSize:13,fontWeight:700,marginBottom:12}}>ROOM CODE — SEND TO YOUR OPPONENT</div>
              <div style={{display:"flex",alignItems:"center",justifyContent:"center",gap:16}}>
                <div style={{fontSize:48,fontWeight:900,letterSpacing:10,color:"#f1f5f9",background:"rgba(245,158,11,.12)",padding:"16px 32px",borderRadius:18,border:"2px solid rgba(245,158,11,.3)"}}>{roomCode}</div>
                <button style={S.ghost} onClick={copyCode}>{copied?<Check size={16} color="#22c55e"/>:<Copy size={16}/>}{copied?"Copied!":"Copy"}</button>
              </div>
              <div style={{color:"#64748b",fontSize:13,marginTop:12}}>{players.length} / 2 players joined</div>
            </div>

            {/* Players */}
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16,marginBottom:24}}>
              {[0,1].map(i=>{
                const p=players[i];
                return(
                  <div key={i} style={{...S.card({}), textAlign:"center"}}>
                    {p ? (
                      <>
                        <div style={{width:56,height:56,borderRadius:"50%",background:"linear-gradient(135deg,#f59e0b,#ef4444)",display:"flex",alignItems:"center",justifyContent:"center",fontWeight:800,fontSize:22,margin:"0 auto 12px"}}>{p.name.charAt(0).toUpperCase()}</div>
                        <div style={{fontWeight:800,fontSize:15}}>{p.name}</div>
                        {p.uid===roomData?.host&&<div style={{fontSize:11,color:"#f59e0b",fontWeight:700,marginTop:4}}>HOST</div>}
                      </>
                    ):(
                      <div style={{color:"#64748b",fontSize:13}}>
                        <motion.div animate={{opacity:[1,0.3,1]}} transition={{duration:1.2,repeat:Infinity}}>⏳ Waiting...</motion.div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Topic preview */}
            {roomData?.topic && (
              <div style={{...S.card({borderLeft:"4px solid #f59e0b",marginBottom:24})}}>
                <div style={{color:"#fbbf24",fontWeight:800,fontSize:12,letterSpacing:2,marginBottom:10}}>TODAY'S TOPIC — {roomData.topic.type.toUpperCase()}</div>
                <div style={{fontStyle:"italic",color:"#94a3b8",fontSize:15,lineHeight:1.7}}>{roomData.topic.question}</div>
              </div>
            )}

            {isHost?(canStart?
              <button style={{...S.btn("linear-gradient(135deg,#22c55e,#16a34a)"),width:"100%",justifyContent:"center",fontSize:18}} onClick={startGame}><Swords size={20}/> Start Duel!</button>
              :<div style={{textAlign:"center",color:"#64748b",fontWeight:700,padding:24}}><motion.div animate={{opacity:[1,0.5,1]}} transition={{duration:1.5,repeat:Infinity}}>⏳ Waiting for opponent to join...</motion.div></div>
            ):(
              <div style={{textAlign:"center",color:"#64748b",fontWeight:700,padding:24}}><motion.div animate={{opacity:[1,0.5,1]}} transition={{duration:1.5,repeat:Infinity}}>⏳ Waiting for host to start...</motion.div></div>
            )}
          </motion.div>
        )}

        {/* ══ WRITING ══ */}
        {phase === "writing" && (
          <motion.div initial={{opacity:0}} animate={{opacity:1}}>
            {/* Sticky header bar */}
            <div style={{position:"sticky",top:0,zIndex:10,background:"rgba(10,15,30,.92)",backdropFilter:"blur(20px)",borderBottom:"1px solid rgba(255,255,255,.07)",padding:"12px 0",marginBottom:24}}>
              <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",maxWidth:900,margin:"0 auto",padding:"0 24px"}}>
                <div style={{display:"flex",alignItems:"center",gap:16}}>
                  <div style={S.badge("#f59e0b")}>Essay Duel — Writing</div>
                  {/* opponent status */}
                  {opponent&&(
                    <div style={{fontSize:13,color:"#64748b",fontWeight:600}}>
                      {opponent.submitted?<span style={{color:"#22c55e"}}>✅ {opponent.name} submitted</span>:<span>✍ {opponent.name} writing...</span>}
                    </div>
                  )}
                </div>
                <div style={{display:"flex",alignItems:"center",gap:16}}>
                  <div style={{display:"flex",alignItems:"center",gap:8,fontWeight:800,fontSize:18,color:timeLeft<=300?"#f87171":timeLeft<=600?"#fbbf24":"#f1f5f9"}}>
                    <Clock size={18}/>{fmtTime(timeLeft)}
                  </div>
                  <div style={{fontSize:13,color:"#64748b",fontWeight:600}}>{wordCount} words</div>
                </div>
              </div>
            </div>

            {/* Topic */}
            <div style={{...S.card({borderLeft:"4px solid #f59e0b",marginBottom:20})}}>
              <div style={{color:"#fbbf24",fontWeight:800,fontSize:12,letterSpacing:2,marginBottom:10}}>WRITING TASK 2 — {roomData?.topic?.type?.toUpperCase()}</div>
              <div style={{fontSize:17,fontWeight:700,lineHeight:1.7,color:"#f1f5f9"}}>{roomData?.topic?.question}</div>
              <div style={{color:"#64748b",fontSize:13,marginTop:12}}>Write at least 250 words. You have {TIME_LIMIT_MINUTES} minutes.</div>
            </div>

            {/* Essay textarea */}
            {!submitted ? (
              <>
                <textarea
                  style={S.textarea}
                  placeholder="Begin writing your essay here. Address all parts of the question, organise your ideas clearly, and aim for at least 250 words..."
                  value={essay}
                  onChange={e=>setEssay(e.target.value)}
                  autoFocus
                />
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginTop:14}}>
                  <div style={{fontSize:13,color:wordCount<MIN_WORDS?"#f87171":wordCount<250?"#fbbf24":"#22c55e",fontWeight:700}}>
                    {wordCount < MIN_WORDS ? `⚠ ${wordCount} words — aim for 250+` : wordCount < 250 ? `${wordCount} words — almost there` : `✅ ${wordCount} words`}
                  </div>
                  <button
                    style={{...S.btn("linear-gradient(135deg,#f59e0b,#ef4444)"), opacity: wordCount<50?0.5:1}}
                    disabled={wordCount<50}
                    onClick={()=>submitEssay(essay)}>
                    <PenSquare size={18}/> Submit Essay
                  </button>
                </div>
              </>
            ) : (
              <div style={{...S.card({textAlign:"center",padding:"48px"})}}>
                {evaluating ? (
                  <>
                    <motion.div animate={{rotate:360}} transition={{duration:2,repeat:Infinity,ease:"linear"}} style={{display:"inline-block",marginBottom:20}}>
                      <Brain size={52} color="#f59e0b"/>
                    </motion.div>
                    <h2 style={{...S.h2,marginBottom:12}}>AI is evaluating your essay...</h2>
                    <p style={{...S.p,maxWidth:400,margin:"0 auto"}}>Scoring Task Achievement, Coherence, Lexical Resource and Grammar. This takes about 20 seconds.</p>
                    <div style={{display:"flex",justifyContent:"center",gap:8,marginTop:24}}>
                      {[0,1,2].map(i=>(
                        <motion.div key={i} animate={{y:[0,-12,0]}} transition={{duration:.6,repeat:Infinity,delay:i*.2}}
                          style={{width:10,height:10,borderRadius:"50%",background:"#f59e0b"}}/>
                      ))}
                    </div>
                  </>
                ) : (
                  <>
                    <div style={{fontSize:48,marginBottom:16}}>✅</div>
                    <h2 style={{...S.h2,marginBottom:8}}>Essay submitted!</h2>
                    <p style={{...S.p,maxWidth:400,margin:"0 auto"}}>{opponent?.submitted ? "Both essays submitted — calculating results..." : `Waiting for ${opponent?.name || "opponent"} to finish...`}</p>
                    <motion.div animate={{opacity:[1,0.4,1]}} transition={{duration:1.5,repeat:Infinity}} style={{marginTop:16,color:"#64748b",fontWeight:700}}>
                      {opponent?.submitted ? "⚡ Loading results..." : "⏳ Waiting..."}
                    </motion.div>
                  </>
                )}
              </div>
            )}
          </motion.div>
        )}

        {/* ══ RESULTS ══ */}
        {phase === "results" && roomData && (() => {
          const p1 = roomData.players[0];
          const p2 = roomData.players[1];
          const r1 = p1?.result;
          const r2 = p2?.result;
          const b1 = r1?.band || 0;
          const b2 = r2?.band || 0;
          const winner = b1 > b2 ? p1 : b2 > b1 ? p2 : null;
          const isMe = (p) => p?.uid === user?.uid;
          const myP = roomData.players.find(p => p.uid === user?.uid);
          const theirP = roomData.players.find(p => p.uid !== user?.uid);
          const myR = myP?.result;
          const theirR = theirP?.result;

          const ScoreRow = ({label, me, them, color}) => (
            <div style={{display:"grid",gridTemplateColumns:"1fr auto 1fr",gap:12,alignItems:"center",padding:"10px 0",borderBottom:"1px solid rgba(255,255,255,.05)"}}>
              <div style={{fontWeight:900,fontSize:18,color:me>them?"#22c55e":me<them?"#f87171":"#f1f5f9",textAlign:"right"}}>{me?.toFixed(1)||"--"}</div>
              <div style={{fontSize:12,color:"#64748b",fontWeight:700,textAlign:"center",minWidth:140}}>{label}</div>
              <div style={{fontWeight:900,fontSize:18,color:them>me?"#22c55e":them<me?"#f87171":"#f1f5f9"}}>{them?.toFixed(1)||"--"}</div>
            </div>
          );

          return (
            <motion.div initial={{opacity:0,y:24}} animate={{opacity:1,y:0}}>
              {/* Winner banner */}
              <div style={{...S.card({textAlign:"center",marginBottom:28,borderTop:`4px solid ${winner?(isMe(winner)?"#22c55e":"#ef4444"):"#f59e0b"}`})}}>
                <div style={{fontSize:56,marginBottom:12}}>{winner?(isMe(winner)?"🏆":"💔"):"🤝"}</div>
                <h1 style={{...S.h1,fontSize:38,marginBottom:8}}>
                  {winner ? (isMe(winner) ? "You Win!" : `${winner.name} Wins!`) : "It's a Draw!"}
                </h1>
                <p style={{...S.p,margin:0,maxWidth:400,margin:"0 auto"}}>
                  {winner ? (isMe(winner) ? "Your essay scored higher. Well done!" : "Better luck next time — keep practising!") : "Both essays scored the same band. Impressive!"}
                </p>
              </div>

              {/* Score comparison */}
              <div style={{...S.card({marginBottom:24})}}>
                {/* Header */}
                <div style={{display:"grid",gridTemplateColumns:"1fr auto 1fr",gap:12,marginBottom:20,alignItems:"center"}}>
                  <div style={{textAlign:"right"}}>
                    <div style={{fontWeight:800,fontSize:16}}>{myP?.name}</div>
                    <div style={{fontSize:12,color:"#64748b"}}>You</div>
                  </div>
                  <div style={{textAlign:"center",padding:"8px 16px",borderRadius:999,background:"rgba(255,255,255,.05)",border:"1px solid rgba(255,255,255,.08)"}}>
                    <Swords size={18} color="#64748b"/>
                  </div>
                  <div>
                    <div style={{fontWeight:800,fontSize:16}}>{theirP?.name || "Opponent"}</div>
                    <div style={{fontSize:12,color:"#64748b"}}>Opponent</div>
                  </div>
                </div>

                {/* Overall band — big */}
                <div style={{display:"grid",gridTemplateColumns:"1fr auto 1fr",gap:12,alignItems:"center",marginBottom:20,padding:"16px 0",borderBottom:"2px solid rgba(255,255,255,.08)",borderTop:"1px solid rgba(255,255,255,.08)"}}>
                  <div style={{textAlign:"right",fontSize:52,fontWeight:900,color:myR?.band>theirR?.band?"#22c55e":myR?.band<theirR?.band?"#f87171":"#f1f5f9"}}>{myR?.band?.toFixed(1)||"--"}</div>
                  <div style={{textAlign:"center",fontSize:12,color:"#64748b",fontWeight:700}}>OVERALL BAND</div>
                  <div style={{fontSize:52,fontWeight:900,color:theirR?.band>myR?.band?"#22c55e":theirR?.band<myR?.band?"#f87171":"#f1f5f9"}}>{theirR?.band?.toFixed(1)||"--"}</div>
                </div>

                <ScoreRow label="Task Achievement" me={myR?.taskAchievement} them={theirR?.taskAchievement}/>
                <ScoreRow label="Coherence & Cohesion" me={myR?.coherence} them={theirR?.coherence}/>
                <ScoreRow label="Lexical Resource" me={myR?.lexical} them={theirR?.lexical}/>
                <ScoreRow label="Grammatical Range" me={myR?.grammar} them={theirR?.grammar}/>

                <div style={{display:"grid",gridTemplateColumns:"1fr auto 1fr",gap:12,marginTop:10,padding:"10px 0",alignItems:"center"}}>
                  <div style={{textAlign:"right",fontSize:13,color:"#64748b"}}>{myR?.wordCount||0} words</div>
                  <div style={{fontSize:12,color:"#64748b",fontWeight:700,textAlign:"center"}}>WORD COUNT</div>
                  <div style={{fontSize:13,color:"#64748b"}}>{theirR?.wordCount||0} words</div>
                </div>
              </div>

              {/* AI feedback on your essay */}
              {myR?.feedback && (
                <div style={{...S.card({borderLeft:"4px solid #f59e0b",marginBottom:24})}}>
                  <div style={{color:"#fbbf24",fontWeight:800,fontSize:12,letterSpacing:2,marginBottom:12}}>AI FEEDBACK ON YOUR ESSAY</div>
                  <div style={{color:"#cbd5e1",fontSize:15,lineHeight:1.8}}>{myR.feedback}</div>
                </div>
              )}

              <div style={{display:"flex",gap:14}}>
                <button style={{...S.btn("linear-gradient(135deg,#f59e0b,#ef4444)"),flex:1,justifyContent:"center"}}
                  onClick={()=>{if(unsubRef.current)unsubRef.current();clearInterval(timerRef.current);setPhase("lobby");setRoomCode("");setRoomData(null);setEssay("");setSubmitted(false);setMyResult(null);}}>
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
