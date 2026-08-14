import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Clock, ArrowRight, CheckCircle2, Play, Volume2, Mic, PenLine, BookOpen,
  Headphones, Sparkles, RefreshCw, AlertCircle, Award, BarChart3, ChevronRight, X
} from "lucide-react";
import toast from "react-hot-toast";
import { detTests } from "../data/det/detTests";
import { calculateDETScore } from "../utils/detScoreCalculator";
import { saveResult } from "../services/resultService";
import { evaluateDETGPT } from "../services/evaluateDETGPT";
import { DETAdaptiveEngine } from "../utils/detAdaptiveEngine";
import { useAuth } from "../context/AuthContext";
import AudioRecorder from "../components/AudioRecorder";

export default function MockDET() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const test = detTests.find(t => String(t.id) === String(id)) || detTests[0];

  const [phase, setPhase] = useState("intro"); // intro | exam | evaluating | report
  const [qIndex, setQIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(60);
  const [audioReplays, setAudioReplays] = useState({});
  const [detReport, setDetReport] = useState(null);

  const currentQ = test.questions[qIndex];

  // Initialize timer whenever question changes
  useEffect(() => {
    if (phase === "exam" && currentQ) {
      setTimeLeft(currentQ.timeLimitSeconds || 60);
    }
  }, [qIndex, phase, currentQ]);

  // Countdown timer effect
  useEffect(() => {
    if (phase !== "exam") return;
    if (timeLeft <= 0) {
      handleNextQuestion();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [phase, timeLeft, qIndex]);

  // Play audio helper via Web Speech API Synthesis
  function playAudioText(text) {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.95;
      utterance.lang = "en-US";
      window.speechSynthesis.speak(utterance);
    } else {
      toast.error("Audio playback not supported in this browser.");
    }
  }

  function handleAnswerChange(qId, val) {
    setAnswers(prev => ({ ...prev, [qId]: val }));
  }

  function handleNextQuestion() {
    if (qIndex < test.questions.length - 1) {
      setQIndex(prev => prev + 1);
    } else {
      finishExam();
    }
  }

  // Scoring & Evaluation
  async function finishExam() {
    setPhase("evaluating");

    let totalRCWords = 0;
    let correctRCWords = 0;

    let totalRSWords = 0;
    let correctRSWords = 0;

    let totalLSWords = 0;
    let correctLSWords = 0;

    let totalDictationWords = 0;
    let correctDictationWords = 0;

    let interactiveReadingPoints = 0;
    let maxIRPoints = 0;

    test.questions.forEach(q => {
      const uAns = answers[q.id];

      // 1. Read and Complete
      if (q.type === "read-and-complete" && q.passage) {
        q.passage.filter(p => p.blank).forEach((item, idx) => {
          totalRCWords++;
          const entered = uAns?.[idx] || "";
          if (entered.trim().toLowerCase() === item.missing.toLowerCase()) {
            correctRCWords++;
          }
        });
      }

      // 2. Read and Select
      if (q.type === "read-and-select" && q.words) {
        q.words.forEach(w => {
          totalRSWords++;
          const isSelected = Boolean(uAns?.[w.word]);
          if (isSelected === w.isReal) {
            correctRSWords++;
          }
        });
      }

      // 3. Listen and Select
      if (q.type === "listen-and-select" && q.words) {
        q.words.forEach(w => {
          totalLSWords++;
          const isSelected = Boolean(uAns?.[w.word]);
          if (isSelected === w.isReal) {
            correctLSWords++;
          }
        });
      }

      // 4. Listen and Type
      if (q.type === "listen-and-type" && q.correctSentence) {
        const userTyped = (uAns || "").trim().toLowerCase().split(/\s+/);
        const targetWords = q.correctSentence.trim().toLowerCase().split(/\s+/);
        targetWords.forEach(w => {
          totalDictationWords++;
          if (userTyped.includes(w.replace(/[.,!?]/g, ""))) {
            correctDictationWords++;
          }
        });
      }

      // 8. Interactive Reading
      if (q.type === "interactive-reading" && q.tasks) {
        q.tasks.forEach((task, tIdx) => {
          maxIRPoints++;
          const tAns = uAns?.[tIdx];
          if (tAns !== undefined && tAns === task.answer) {
            interactiveReadingPoints++;
          }
        });
      }
    });

    const readCompletePct = totalRCWords > 0 ? Math.round((correctRCWords / totalRCWords) * 100) : 75;
    const readSelectPct = totalRSWords > 0 ? Math.round((correctRSWords / totalRSWords) * 100) : 75;
    const listenSelectPct = totalLSWords > 0 ? Math.round((correctLSWords / totalLSWords) * 100) : 75;
    const listenTypePct = totalDictationWords > 0 ? Math.round((correctDictationWords / totalDictationWords) * 100) : 75;
    const irPct = maxIRPoints > 0 ? Math.round((interactiveReadingPoints / maxIRPoints) * 100) : 80;

    // AI Evaluation for Writing Sample if submitted
    const writingQ = test.questions.find(q => q.type === "writing-sample");
    let aiWritingScore = 85;
    if (writingQ && answers[writingQ.id]) {
      try {
        const evalRes = await evaluateDETGPT({
          taskType: "writing-sample",
          questionPrompt: writingQ.question,
          userResponse: answers[writingQ.id],
        });
        aiWritingScore = evalRes.score || 85;
      } catch (e) {
        console.warn("AI writing evaluation error:", e);
      }
    }

    const reportData = calculateDETScore({
      readCompleteScore: readCompletePct,
      readSelectScore: readSelectPct,
      listenSelectScore: listenSelectPct,
      listenTypeScore: listenTypePct,
      interactiveReadingScore: irPct,
      readAloudScore: 85,
      writeImageScore: aiWritingScore,
      speakImageScore: 82,
      writingSampleScore: aiWritingScore,
      speakingSampleScore: 85,
    });

    setDetReport(reportData);

    // Save result to Firestore / Storage
    try {
      await saveResult({
        userId: user?.uid || "guest",
        type: "DET Mock Exam",
        module: "DET",
        testId: test.id,
        score: reportData.overall,
        band: reportData.overall,
        rawScore: reportData.overall,
        subscores: reportData.subscores,
        ieltsEquivalent: reportData.ieltsEquivalent,
        completedAt: new Date().toISOString(),
      });
    } catch (e) {
      console.error("Error saving DET result:", e);
    }

    setTimeout(() => {
      setPhase("report");
    }, 1200);
  }

  // Format time mm:ss
  function fmtTimeSecs(s) {
    const mins = Math.floor(s / 60);
    const secs = s % 60;
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  }

  /* ─────────────────────────────────────────────────────────────
     RENDER INTRO SCREEN
  ───────────────────────────────────────────────────────────── */
  if (phase === "intro") {
    return (
      <div style={{ minHeight: "100vh", background: "var(--bg)", display: "flex", alignItems: "center", justifyContent: "center", padding: 24, fontFamily: "Inter, sans-serif" }}>
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 28, padding: 40, maxWidth: 640, width: "100%", boxShadow: "0 20px 60px rgba(0,0,0,0.08)" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "6px 14px", borderRadius: 999, background: "rgba(16,185,129,0.12)", color: "#10b981", fontSize: 13, fontWeight: 800, marginBottom: 16 }}>
            <Sparkles size={15} /> DET ADAPTIVE EXAM SIMULATION
          </div>

          <h1 style={{ fontSize: 26, fontWeight: 900, margin: "0 0 10px 0" }}>{test.title}</h1>
          <p style={{ color: "var(--text-secondary)", fontSize: 14, margin: "0 0 24px 0", lineHeight: 1.6 }}>{test.description}</p>

          <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 18, padding: 20, marginBottom: 28, display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12, textAlign: "center" }}>
            <div>
              <div style={{ fontSize: 11, color: "var(--text-secondary)", fontWeight: 700 }}>TASKS</div>
              <div style={{ fontSize: 20, fontWeight: 900, color: "var(--text)", marginTop: 4 }}>{test.questions.length} Items</div>
            </div>
            <div>
              <div style={{ fontSize: 11, color: "var(--text-secondary)", fontWeight: 700 }}>DURATION</div>
              <div style={{ fontSize: 20, fontWeight: 900, color: "#10b981", marginTop: 4 }}>~{test.durationMinutes} Mins</div>
            </div>
            <div>
              <div style={{ fontSize: 11, color: "var(--text-secondary)", fontWeight: 700 }}>SCALE</div>
              <div style={{ fontSize: 20, fontWeight: 900, color: "#2563eb", marginTop: 4 }}>10–160 DET</div>
            </div>
          </div>

          <button
            onClick={() => { setPhase("exam"); setQIndex(0); }}
            style={{ width: "100%", background: "linear-gradient(135deg, #10b981, #059669)", color: "#fff", border: "none", borderRadius: 16, padding: "16px", fontSize: 16, fontWeight: 800, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 10, boxShadow: "0 4px 18px rgba(16,185,129,0.35)" }}
          >
            Start Duolingo Exam <ArrowRight size={18} />
          </button>
        </motion.div>
      </div>
    );
  }

  /* ─────────────────────────────────────────────────────────────
     RENDER EVALUATING SCREEN
  ───────────────────────────────────────────────────────────── */
  if (phase === "evaluating") {
    return (
      <div style={{ minHeight: "100vh", background: "var(--bg)", display: "flex", alignItems: "center", justifyContent: "center", padding: 24, textAlign: "center" }}>
        <div>
          <RefreshCw size={44} style={{ animation: "spin 1s linear infinite", color: "#10b981", marginBottom: 16 }} />
          <h2 style={{ fontSize: 22, fontWeight: 800 }}>Analyzing DET Performance…</h2>
          <p style={{ color: "var(--text-secondary)", fontSize: 14 }}>Calculating Literacy, Comprehension, Conversation &amp; Production subscores</p>
          <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
        </div>
      </div>
    );
  }

  /* ─────────────────────────────────────────────────────────────
     RENDER SCORE REPORT SCREEN
  ───────────────────────────────────────────────────────────── */
  if (phase === "report" && detReport) {
    const { overall, subscores, ieltsEquivalent, cefrLevel } = detReport;
    return (
      <div style={{ minHeight: "100vh", background: "var(--bg)", padding: "60px 24px 80px", fontFamily: "Inter, sans-serif" }}>
        <div style={{ maxWidth: 880, margin: "0 auto" }}>

          <div style={{ background: "linear-gradient(135deg, #10b981, #047857)", borderRadius: 28, padding: 36, color: "#fff", marginBottom: 32, boxShadow: "0 20px 50px rgba(16,185,129,0.25)" }}>
            <div style={{ fontSize: 13, fontWeight: 800, textTransform: "uppercase", letterSpacing: 1, opacity: 0.9 }}>OFFICIAL DET ESTIMATED RESULT</div>

            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 20, marginTop: 16 }}>
              <div>
                <div style={{ fontSize: 64, fontWeight: 900, lineHeight: 1 }}>{overall} <span style={{ fontSize: 22, fontWeight: 600, opacity: 0.8 }}>/ 160</span></div>
                <div style={{ fontSize: 16, fontWeight: 700, marginTop: 8, opacity: 0.95 }}>Overall Duolingo English Test Score</div>
              </div>

              <div style={{ display: "flex", gap: 16 }}>
                <div style={{ background: "rgba(255,255,255,0.18)", backdropFilter: "blur(10px)", padding: "16px 22px", borderRadius: 18, textAlign: "center" }}>
                  <div style={{ fontSize: 11, fontWeight: 700, opacity: 0.8, textTransform: "uppercase" }}>IELTS EQUIVALENT</div>
                  <div style={{ fontSize: 24, fontWeight: 900, marginTop: 2 }}>Band {ieltsEquivalent}</div>
                </div>

                <div style={{ background: "rgba(255,255,255,0.18)", backdropFilter: "blur(10px)", padding: "16px 22px", borderRadius: 18, textAlign: "center" }}>
                  <div style={{ fontSize: 11, fontWeight: 700, opacity: 0.8, textTransform: "uppercase" }}>CEFR LEVEL</div>
                  <div style={{ fontSize: 18, fontWeight: 900, marginTop: 4 }}>{cefrLevel}</div>
                </div>
              </div>
            </div>
          </div>

          {/* 4 Subscore Cards */}
          <h3 style={{ fontSize: 18, fontWeight: 800, marginBottom: 16 }}>DET Subscores Breakdown</h3>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16, marginBottom: 40 }}>
            {Object.entries(subscores).map(([key, val]) => (
              <div key={key} style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 20, padding: 20 }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: "var(--text-secondary)", textTransform: "capitalize" }}>{key}</div>
                <div style={{ fontSize: 32, fontWeight: 900, color: "#10b981", marginTop: 4 }}>{val} <span style={{ fontSize: 13, color: "var(--text-secondary)" }}>/ 160</span></div>
                <div style={{ width: "100%", background: "var(--surface)", height: 6, borderRadius: 999, marginTop: 12, overflow: "hidden" }}>
                  <div style={{ width: `${(val / 160) * 100}%`, height: "100%", background: "#10b981" }} />
                </div>
              </div>
            ))}
          </div>

          <div style={{ display: "flex", gap: 14 }}>
            <button onClick={() => navigate("/det")} style={{ flex: 1, background: "var(--card)", border: "1px solid var(--border)", borderRadius: 16, padding: "14px", fontWeight: 700, cursor: "pointer", color: "var(--text)" }}>
              Back to DET Center
            </button>
            <button onClick={() => { setPhase("intro"); setQIndex(0); setAnswers({}); }} style={{ flex: 1, background: "linear-gradient(135deg, #10b981, #059669)", color: "#fff", border: "none", borderRadius: 16, padding: "14px", fontWeight: 800, cursor: "pointer" }}>
              Retake DET Practice Test
            </button>
          </div>

        </div>
      </div>
    );
  }

  /* ─────────────────────────────────────────────────────────────
     RENDER QUESTION EXAM SCREEN
  ───────────────────────────────────────────────────────────── */
  const uAnswer = answers[currentQ.id];

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg)", fontFamily: "Inter, sans-serif", display: "flex", flexDirection: "column" }}>
      {/* Top Exam Navigation Bar */}
      <div style={{ background: "var(--card)", borderBottom: "1px solid var(--border)", padding: "16px 28px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <span style={{ fontSize: 12, fontWeight: 800, padding: "4px 12px", borderRadius: 999, background: "rgba(16,185,129,0.12)", color: "#10b981" }}>
            TASK {qIndex + 1} OF {test.questions.length}
          </span>
          <span style={{ fontSize: 14, fontWeight: 700, color: "var(--text)" }}>{currentQ.title}</span>
        </div>

        {/* Timer Bar */}
        <div style={{ display: "flex", alignItems: "center", gap: 8, background: timeLeft <= 15 ? "rgba(239,68,68,0.1)" : "var(--surface)", border: `1px solid ${timeLeft <= 15 ? "#ef4444" : "var(--border)"}`, padding: "6px 16px", borderRadius: 999 }}>
          <Clock size={16} color={timeLeft <= 15 ? "#ef4444" : "#10b981"} />
          <span style={{ fontSize: 15, fontWeight: 900, color: timeLeft <= 15 ? "#ef4444" : "var(--text)" }}>{fmtTimeSecs(timeLeft)}</span>
        </div>
      </div>

      {/* Main Question Body */}
      <div style={{ flex: 1, maxWidth: 900, width: "100%", margin: "0 auto", padding: "40px 24px 60px", display: "flex", flexDirection: "column" }}>
        <div style={{ fontSize: 15, fontWeight: 700, color: "var(--text-secondary)", marginBottom: 20 }}>
          {currentQ.instructions}
        </div>

        {/* ── QUESTION TYPE 1: READ AND COMPLETE ── */}
        {currentQ.type === "read-and-complete" && (
          <div style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 24, padding: 32, lineHeight: 2.2, fontSize: 18, fontWeight: 600 }}>
            {currentQ.passage.map((item, i) => {
              if (!item.blank) return <span key={i}>{item.text}</span>;

              const blankAnswers = uAnswer || {};
              const currentInputVal = blankAnswers[i] || "";

              return (
                <span key={i} style={{ display: "inline-flex", alignItems: "baseline", margin: "0 2px" }}>
                  <span style={{ color: "var(--text)", fontWeight: 700 }}>{item.text}</span>
                  <input
                    type="text"
                    maxLength={item.missing.length}
                    value={currentInputVal}
                    onChange={e => {
                      const updated = { ...blankAnswers, [i]: e.target.value };
                      handleAnswerChange(currentQ.id, updated);
                    }}
                    style={{
                      width: `${Math.max(2, item.missing.length * 14)}px`,
                      padding: "2px 6px",
                      borderRadius: 6,
                      border: "2px solid #10b981",
                      background: "rgba(16,185,129,0.08)",
                      color: "#10b981",
                      fontWeight: 800,
                      fontSize: 18,
                      textAlign: "center",
                      outline: "none",
                      fontFamily: "inherit",
                    }}
                  />
                </span>
              );
            })}
          </div>
        )}

        {/* ── QUESTION TYPE 2: READ AND SELECT ── */}
        {currentQ.type === "read-and-select" && (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: 14 }}>
            {currentQ.words.map((item, idx) => {
              const selectedMap = uAnswer || {};
              const isSelected = Boolean(selectedMap[item.word]);

              return (
                <button
                  key={idx}
                  onClick={() => {
                    handleAnswerChange(currentQ.id, { ...selectedMap, [item.word]: !isSelected });
                  }}
                  style={{
                    padding: "16px 20px",
                    borderRadius: 16,
                    border: isSelected ? "2px solid #10b981" : "1px solid var(--border)",
                    background: isSelected ? "rgba(16,185,129,0.12)" : "var(--card)",
                    color: isSelected ? "#059669" : "var(--text)",
                    fontWeight: 700,
                    fontSize: 16,
                    cursor: "pointer",
                    transition: "all 0.15s ease",
                    textAlign: "center",
                  }}
                >
                  {item.word}
                </button>
              );
            })}
          </div>
        )}

        {/* ── QUESTION TYPE 3: LISTEN AND SELECT ── */}
        {currentQ.type === "listen-and-select" && (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 16 }}>
            {currentQ.words.map((item, idx) => {
              const selectedMap = uAnswer || {};
              const isSelected = Boolean(selectedMap[item.word]);

              return (
                <div
                  key={idx}
                  style={{
                    background: isSelected ? "rgba(16,185,129,0.12)" : "var(--card)",
                    border: isSelected ? "2px solid #10b981" : "1px solid var(--border)",
                    borderRadius: 18,
                    padding: 16,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <button
                    onClick={() => playAudioText(item.audioText || item.word)}
                    style={{ background: "rgba(37,99,235,0.12)", border: "none", borderRadius: "50%", width: 40, height: 40, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "#2563eb" }}
                  >
                    <Volume2 size={20} />
                  </button>

                  <button
                    onClick={() => handleAnswerChange(currentQ.id, { ...selectedMap, [item.word]: !isSelected })}
                    style={{ background: "none", border: "none", fontWeight: 800, fontSize: 15, color: isSelected ? "#059669" : "var(--text)", cursor: "pointer" }}
                  >
                    {isSelected ? "✓ Real Word" : "Select Word"}
                  </button>
                </div>
              );
            })}
          </div>
        )}

        {/* ── QUESTION TYPE 4: LISTEN AND TYPE ── */}
        {currentQ.type === "listen-and-type" && (
          <div style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 24, padding: 32, textAlign: "center" }}>
            <button
              onClick={() => {
                const currentCount = audioReplays[currentQ.id] || 0;
                if (currentCount >= (currentQ.maxReplays || 3)) {
                  toast.error("Replay limit reached (3 max)");
                  return;
                }
                setAudioReplays(prev => ({ ...prev, [currentQ.id]: currentCount + 1 }));
                playAudioText(currentQ.audioText);
              }}
              style={{ background: "linear-gradient(135deg, #2563eb, #1d4ed8)", color: "#fff", border: "none", borderRadius: 999, padding: "16px 32px", fontSize: 16, fontWeight: 800, cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 10, marginBottom: 16 }}
            >
              <Volume2 size={22} /> Listen Audio ({3 - (audioReplays[currentQ.id] || 0)} plays left)
            </button>

            <textarea
              value={uAnswer || ""}
              onChange={e => handleAnswerChange(currentQ.id, e.target.value)}
              placeholder="Type the exact sentence you heard..."
              rows={3}
              style={{ width: "100%", borderRadius: 16, border: "1px solid var(--border)", padding: 16, fontSize: 16, outline: "none", background: "var(--surface)", color: "var(--text)", resize: "vertical", boxSizing: "border-box" }}
            />
          </div>
        )}

        {/* ── QUESTION TYPE 5: READ ALOUD ── */}
        {currentQ.type === "read-aloud" && (
          <div style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 24, padding: 32, textAlign: "center" }}>
            <div style={{ fontSize: 22, fontWeight: 800, color: "var(--text)", marginBottom: 28, lineHeight: 1.5 }}>
              "{currentQ.sentence}"
            </div>

            <AudioRecorder
              onRecordingComplete={(blob) => handleAnswerChange(currentQ.id, blob)}
            />
          </div>
        )}

        {/* ── QUESTION TYPE 6: WRITE ABOUT IMAGE ── */}
        {currentQ.type === "write-about-image" && (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 24, alignItems: "start" }}>
            <img src={currentQ.imageUrl} alt={currentQ.imageAlt} style={{ width: "100%", borderRadius: 20, border: "1px solid var(--border)", objectFit: "cover", maxHeight: 320 }} />

            <div>
              <textarea
                value={uAnswer || ""}
                onChange={e => handleAnswerChange(currentQ.id, e.target.value)}
                placeholder="Write 1 or more sentences describing what you see in the image..."
                rows={6}
                style={{ width: "100%", borderRadius: 18, border: "1px solid var(--border)", padding: 16, fontSize: 15, outline: "none", background: "var(--card)", color: "var(--text)", resize: "vertical", boxSizing: "border-box" }}
              />
            </div>
          </div>
        )}

        {/* ── QUESTION TYPE 7: SPEAK ABOUT IMAGE ── */}
        {currentQ.type === "speak-about-image" && (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 24, alignItems: "center" }}>
            <img src={currentQ.imageUrl} alt={currentQ.imageAlt} style={{ width: "100%", borderRadius: 20, border: "1px solid var(--border)", objectFit: "cover", maxHeight: 320 }} />

            <div style={{ textAlign: "center" }}>
              <AudioRecorder onRecordingComplete={(blob) => handleAnswerChange(currentQ.id, blob)} />
            </div>
          </div>
        )}

        {/* ── QUESTION TYPE 8: INTERACTIVE READING ── */}
        {currentQ.type === "interactive-reading" && (
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
            <div style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 20, padding: 24, maxHeight: 440, overflowY: "auto" }}>
              <h4 style={{ fontSize: 16, fontWeight: 800, margin: "0 0 12px 0" }}>{currentQ.passageTitle}</h4>
              <p style={{ fontSize: 14, color: "var(--text-secondary)", lineHeight: 1.7, margin: 0 }}>{currentQ.fullPassage}</p>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {currentQ.tasks?.map((task, tIdx) => (
                <div key={tIdx} style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 16, padding: 18 }}>
                  <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 10 }}>{tIdx + 1}. {task.question}</div>
                  {task.options?.map((opt, oIdx) => {
                    const taskAnsMap = uAnswer || {};
                    const isSel = taskAnsMap[tIdx] === oIdx;
                    return (
                      <button
                        key={oIdx}
                        onClick={() => handleAnswerChange(currentQ.id, { ...taskAnsMap, [tIdx]: oIdx })}
                        style={{ width: "100%", textAlign: "left", padding: "10px 14px", borderRadius: 10, border: isSel ? "2px solid #10b981" : "1px solid var(--border)", background: isSel ? "rgba(16,185,129,0.12)" : "var(--card)", color: isSel ? "#059669" : "var(--text)", fontWeight: 600, fontSize: 13, marginBottom: 6, cursor: "pointer" }}
                      >
                        {opt}
                      </button>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── QUESTION TYPE 10: WRITING SAMPLE ── */}
        {currentQ.type === "writing-sample" && (
          <div style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 24, padding: 28 }}>
            <div style={{ fontSize: 17, fontWeight: 800, color: "var(--text)", marginBottom: 16, lineHeight: 1.5 }}>
              {currentQ.question}
            </div>

            <textarea
              value={uAnswer || ""}
              onChange={e => handleAnswerChange(currentQ.id, e.target.value)}
              placeholder="Write your response here (min 50 words recommended)..."
              rows={10}
              style={{ width: "100%", borderRadius: 16, border: "1px solid var(--border)", padding: 16, fontSize: 15, outline: "none", background: "var(--surface)", color: "var(--text)", resize: "vertical", boxSizing: "border-box" }}
            />

            <div style={{ marginTop: 10, fontSize: 12, color: "var(--text-secondary)", textAlign: "right", fontWeight: 700 }}>
              Word Count: {(uAnswer || "").trim().split(/\s+/).filter(Boolean).length} words
            </div>
          </div>
        )}

        {/* ── QUESTION TYPE 11: SPEAKING SAMPLE ── */}
        {currentQ.type === "speaking-sample" && (
          <div style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 24, padding: 32, textAlign: "center" }}>
            <div style={{ fontSize: 15, fontWeight: 700, color: "var(--text-secondary)", marginBottom: 16 }}>Choose 1 topic to present:</div>
            {currentQ.options?.map((opt, i) => (
              <div key={i} style={{ padding: "12px 18px", borderRadius: 14, background: "var(--surface)", border: "1px solid var(--border)", fontSize: 15, fontWeight: 700, color: "var(--text)", marginBottom: 10, textAlign: "left" }}>
                {opt}
              </div>
            ))}

            <div style={{ marginTop: 24 }}>
              <AudioRecorder onRecordingComplete={(blob) => handleAnswerChange(currentQ.id, blob)} />
            </div>
          </div>
        )}

        {/* Next Question Bar */}
        <div style={{ marginTop: "auto", paddingTop: 32, display: "flex", justifyContent: "flex-end" }}>
          <button
            onClick={handleNextQuestion}
            style={{ background: "linear-gradient(135deg, #10b981, #059669)", color: "#fff", border: "none", borderRadius: 14, padding: "14px 32px", fontSize: 15, fontWeight: 800, cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 8, boxShadow: "0 4px 16px rgba(16,185,129,0.3)" }}
          >
            {qIndex === test.questions.length - 1 ? "Submit & View DET Score ✨" : "Next Question"} <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
