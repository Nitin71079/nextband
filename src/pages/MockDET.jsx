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
import InteractiveReadingRenderer from "../modules/duolingo/components/renderers/InteractiveReadingRenderer";
import InteractiveListeningRenderer from "../modules/duolingo/components/renderers/InteractiveListeningRenderer";

export default function MockDET() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const rawNum = String(id || "1").replace(/\D/g, "");
  const numericId = parseInt(rawNum, 10);
  const testIndex = !isNaN(numericId) && numericId > 0 ? (numericId - 1) % detTests.length : 0;
  const test = detTests[testIndex];

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

    let totalRCWords = 0, correctRCWords = 0;
    let totalRSWords = 0, correctRSWords = 0;
    let totalDictationWords = 0, correctDictationWords = 0;
    let maxIRPoints = 0, interactiveReadingPoints = 0;
    let maxILPoints = 0, interactiveListeningPoints = 0;

    test.questions.forEach(q => {
      const uAns = answers[q.id];

      // 1. Read and Complete
      if (q.type === "read-and-complete" && q.passage) {
        q.passage.filter(p => p.blank).forEach((item, idx) => {
          totalRCWords++;
          const entered = uAns?.[idx] || "";
          if (entered.trim().toLowerCase() === (item.missing || "").toLowerCase()) {
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

      // 3. Dictation / Listen and Type
      if ((q.type === "dictation" || q.type === "listen-and-type") && (q.correctSentence || q.audioText)) {
        const targetText = q.correctSentence || q.audioText;
        const userTyped = (uAns || "").trim().toLowerCase().split(/\s+/);
        const targetWords = targetText.trim().toLowerCase().split(/\s+/);
        targetWords.forEach(w => {
          totalDictationWords++;
          if (userTyped.includes(w.replace(/[.,!?]/g, ""))) {
            correctDictationWords++;
          }
        });
      }

      // 4. Interactive Reading (4 steps)
      if (q.type === "interactive-reading") {
        maxIRPoints += 4;
        if (uAns && typeof uAns === "object") {
          const irData = q.interactiveReading;
          if (irData) {
            const step1Correct = irData.step1MissingSentence?.correctIndex ?? 0;
            const step2Correct = irData.step2Comprehension?.correctIndex ?? 0;
            const step3Correct = irData.step3MainIdea?.correctIndex ?? 0;
            const step4Correct = irData.step4BestTitle?.correctIndex ?? 0;

            if (uAns[0] === step1Correct) interactiveReadingPoints++;
            if (uAns[1] === step2Correct) interactiveReadingPoints++;
            if (uAns[2] === step3Correct) interactiveReadingPoints++;
            if (uAns[3] === step4Correct) interactiveReadingPoints++;
          } else {
            interactiveReadingPoints += Object.keys(uAns).length;
          }
        }
      }

      // 5. Interactive Listening (4 stages)
      if (q.type === "interactive-listening") {
        maxILPoints += 3;
        if (uAns && typeof uAns === "object") {
          const ilData = q.interactiveListening;
          if (ilData) {
            const q1Answer = ilData.comprehensionQ1?.answer;
            const q1Options = ilData.comprehensionQ1?.options || [];
            const q1CorrectIndex = q1Answer ? q1Options.indexOf(q1Answer) : 0;

            const q2Answer = ilData.comprehensionQ2?.answer;
            const q2Options = ilData.comprehensionQ2?.options || [];
            const q2CorrectIndex = q2Answer ? q2Options.indexOf(q2Answer) : 0;

            const userQ1 = uAns.compAnswers?.[1];
            const userQ2 = uAns.compAnswers?.[2];
            const userTurn1 = uAns.turnAnswers?.[0];

            if (userQ1 === (q1CorrectIndex >= 0 ? q1CorrectIndex : 0)) interactiveListeningPoints++;
            if (userQ2 === (q2CorrectIndex >= 0 ? q2CorrectIndex : 0)) interactiveListeningPoints++;
            if (userTurn1 === 0) interactiveListeningPoints++;
          } else {
            interactiveListeningPoints += 2;
          }
        }
      }
    });

    const readCompletePct = totalRCWords > 0 ? Math.round((correctRCWords / totalRCWords) * 100) : 0;
    const readSelectPct = totalRSWords > 0 ? Math.round((correctRSWords / totalRSWords) * 100) : 0;
    const listenTypePct = totalDictationWords > 0 ? Math.round((correctDictationWords / totalDictationWords) * 100) : 0;
    const irPct = maxIRPoints > 0 ? Math.round((interactiveReadingPoints / maxIRPoints) * 100) : 0;
    const ilPct = maxILPoints > 0 ? Math.round((interactiveListeningPoints / maxILPoints) * 100) : 0;

    // Read Aloud task answer check
    const readAloudQ = test.questions.find(q => q.type === "read-aloud");
    const readAloudScore = readAloudQ && answers[readAloudQ.id] ? 100 : 0;

    // Groq AI Evaluation for Writing & Speaking production tasks
    const writingQ = test.questions.find(q => q.type === "writing-sample" || q.type === "interactive-writing" || q.type === "describe-image" || q.type === "write-about-image");
    const speakingQ = test.questions.find(q => q.type === "speaking-sample" || q.type === "interactive-speaking" || q.type === "speak-about-image");

    let aiWritingScore = 10;
    let aiSpeakingScore = 10;

    const userWritingAns = writingQ ? answers[writingQ.id] : null;
    if (userWritingAns && typeof userWritingAns === "string" && userWritingAns.trim().length >= 10) {
      try {
        const evalRes = await evaluateDETGPT({
          taskType: writingQ.type,
          questionPrompt: writingQ.prompt || writingQ.question,
          userResponse: userWritingAns,
        });
        aiWritingScore = evalRes.score || 70;
      } catch (e) {
        console.warn("Groq AI DET writing evaluation error:", e);
        aiWritingScore = 70;
      }
    }

    const userSpeakingAns = speakingQ ? answers[speakingQ.id] : null;
    if (userSpeakingAns) {
      try {
        const evalRes = await evaluateDETGPT({
          taskType: speakingQ.type,
          questionPrompt: speakingQ.prompt || speakingQ.question,
          userResponse: typeof userSpeakingAns === "string" ? userSpeakingAns : "Audio response submitted",
        });
        aiSpeakingScore = evalRes.score || 70;
      } catch (e) {
        console.warn("Groq AI DET speaking evaluation error:", e);
        aiSpeakingScore = 70;
      }
    }

    const reportData = calculateDETScore({
      readCompleteScore: readCompletePct,
      readSelectScore: readSelectPct,
      listenSelectScore: readSelectPct,
      listenTypeScore: listenTypePct,
      interactiveReadingScore: irPct,
      interactiveListeningScore: ilPct,
      readAloudScore: readAloudScore,
      writeImageScore: aiWritingScore,
      speakImageScore: aiSpeakingScore,
      writingSampleScore: aiWritingScore,
      speakingSampleScore: aiSpeakingScore,
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
                  <div style={{ fontSize: 11, fontWeight: 700, opacity: 0.8, textTransform: "uppercase" }}>DET SCORE TIER</div>
                  <div style={{ fontSize: 20, fontWeight: 900, marginTop: 4 }}>{overall >= 120 ? "Advanced Academic" : "Intermediate"}</div>
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
        {currentQ.type === "read-and-complete" && (() => {
          let passageTokens = currentQ.passage;
          if (!passageTokens || !Array.isArray(passageTokens) || passageTokens.length === 0) {
            const rawText = currentQ.cTestText || currentQ.passageText || "Scientific research shows that regular physical activity significantly enhances cognitive function. Exercise promotes blood flow to the brain, stimulating neural growth.";
            passageTokens = [];
            const words = rawText.split(/(\s+)/);
            let wordCount = 0;
            for (let i = 0; i < words.length; i++) {
              const token = words[i];
              if (/^\s+$/.test(token) || !/[a-zA-Z]/.test(token)) {
                passageTokens.push({ text: token, blank: false });
                continue;
              }
              wordCount++;
              const match = token.match(/^([a-zA-Z]+)(.*)$/);
              if (!match) {
                passageTokens.push({ text: token, blank: false });
                continue;
              }
              const cleanWord = match[1];
              const trailingPunct = match[2];
              if (wordCount > 3 && wordCount % 2 === 0 && cleanWord.length >= 3) {
                const halfLen = Math.floor(cleanWord.length / 2);
                const prefix = cleanWord.slice(0, halfLen);
                const missing = cleanWord.slice(halfLen);
                passageTokens.push({
                  text: prefix,
                  missing: missing,
                  blank: true,
                  fullWord: cleanWord,
                  suffix: trailingPunct
                });
              } else {
                passageTokens.push({ text: token, blank: false });
              }
            }
          }

          return (
            <div style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 24, padding: 32, lineHeight: 2.2, fontSize: 18, fontWeight: 600 }}>
              {passageTokens.map((item, i) => {
                if (!item.blank) return <span key={i}>{item.text}</span>;

                const blankAnswers = uAnswer || {};
                const currentInputVal = blankAnswers[i] || "";

                return (
                  <span key={i} style={{ display: "inline-flex", alignItems: "center", verticalAlign: "middle", margin: "0 1px" }}>
                    <span style={{ color: "var(--text)", fontWeight: 700 }}>{item.text}</span>
                    <input
                      type="text"
                      maxLength={item.missing ? item.missing.length : 4}
                      value={currentInputVal}
                      onChange={e => {
                        const updated = { ...blankAnswers, [i]: e.target.value };
                        handleAnswerChange(currentQ.id, updated);
                      }}
                      style={{
                        height: "32px",
                        width: `${Math.max(34, (item.missing ? item.missing.length : 3) * 15 + 10)}px`,
                        padding: "0 4px",
                        margin: "0 2px",
                        borderRadius: "6px",
                        border: "2px solid #10b981",
                        background: "#ffffff",
                        color: "#059669",
                        fontWeight: 800,
                        fontSize: "16px",
                        textAlign: "center",
                        outline: "none",
                        boxSizing: "border-box",
                        display: "inline-block",
                        verticalAlign: "middle"
                      }}
                    />
                    {item.suffix && <span style={{ color: "var(--text)", fontWeight: 700 }}>{item.suffix}</span>}
                  </span>
                );
              })}
            </div>
          );
        })()}

        {/* ── QUESTION TYPE 2: SINGLE WORD READ AND SELECT ── */}
        {currentQ.type === "single-word-read-select" && (
          <div style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 24, padding: 40, textAlign: "center" }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: "var(--text-secondary)", marginBottom: 16 }}>Is this a real English word?</div>
            <div style={{ fontSize: 36, fontWeight: 900, color: "#10b981", letterSpacing: "1px", marginBottom: 32 }}>
              {currentQ.word || "meticulous"}
            </div>
            <div style={{ display: "flex", justifyContent: "center", gap: 20 }}>
              <button
                onClick={() => handleAnswerChange(currentQ.id, true)}
                style={{ background: uAnswer === true ? "#10b981" : "rgba(16,185,129,0.12)", color: uAnswer === true ? "#fff" : "#10b981", border: "2px solid #10b981", borderRadius: 16, padding: "14px 36px", fontSize: 16, fontWeight: 800, cursor: "pointer" }}
              >
                ✓ YES (Real Word)
              </button>
              <button
                onClick={() => handleAnswerChange(currentQ.id, false)}
                style={{ background: uAnswer === false ? "#ef4444" : "rgba(239,68,68,0.12)", color: uAnswer === false ? "#fff" : "#ef4444", border: "2px solid #ef4444", borderRadius: 16, padding: "14px 36px", fontSize: 16, fontWeight: 800, cursor: "pointer" }}
              >
                ✕ NO (Fake Word)
              </button>
            </div>
          </div>
        )}

        {/* ── QUESTION TYPE 3: FILL IN THE BLANKS ── */}
        {currentQ.type === "fill-in-the-blanks" && (
          <div style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 24, padding: 32, fontSize: 18, lineHeight: 1.8, textAlign: "center" }}>
            <span>{currentQ.sentenceBefore}</span>
            <input
              type="text"
              value={uAnswer || ""}
              onChange={e => handleAnswerChange(currentQ.id, e.target.value)}
              placeholder="type missing word..."
              style={{ margin: "0 8px", padding: "6px 14px", borderRadius: 8, border: "2px solid #10b981", background: "rgba(16,185,129,0.08)", color: "#10b981", fontWeight: 800, fontSize: 18, outline: "none", textAlign: "center" }}
            />
            <span>{currentQ.sentenceAfter}</span>
          </div>
        )}

        {/* ── QUESTION TYPE 4: READ AND SELECT ── */}
        {currentQ.type === "read-and-select" && (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: 14 }}>
            {(currentQ.words || []).map((item, idx) => {
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

        {/* ── QUESTION TYPE 5: DICTATION ── */}
        {(currentQ.type === "dictation" || currentQ.type === "listen-and-type") && (() => {
          const currentCount = audioReplays[currentQ.id] || 0;
          const replaysLeft = Math.max(0, 2 - currentCount);
          return (
            <div style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 24, padding: 36, textAlign: "center" }}>
              <div style={{ fontSize: 13, fontWeight: 900, textTransform: "uppercase", letterSpacing: "1px", color: "#10b981", marginBottom: 8 }}>
                DICTATION
              </div>
              <h3 style={{ fontSize: 18, fontWeight: 800, color: "var(--text)", margin: "0 0 24px 0" }}>
                Listen carefully and type exactly what you hear.
              </h3>

              <div style={{ marginBottom: 28 }}>
                <button
                  disabled={replaysLeft <= 0}
                  onClick={() => {
                    if (replaysLeft <= 0) {
                      toast.error("Replay limit reached (2 max)");
                      return;
                    }
                    setAudioReplays(prev => ({ ...prev, [currentQ.id]: (prev[currentQ.id] || 0) + 1 }));
                    playAudioText(currentQ.audioText || currentQ.correctSentence || "Scientific research suggests that regular exercise improves cognitive performance.");
                  }}
                  style={{
                    background: replaysLeft > 0 ? "linear-gradient(135deg, #10b981, #059669)" : "var(--border)",
                    color: "#fff",
                    border: "none",
                    borderRadius: 999,
                    padding: "16px 36px",
                    fontSize: 16,
                    fontWeight: 800,
                    cursor: replaysLeft > 0 ? "pointer" : "not-allowed",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 10,
                    boxShadow: replaysLeft > 0 ? "0 6px 20px rgba(16,185,129,0.3)" : "none"
                  }}
                >
                  <Volume2 size={22} /> {currentCount === 0 ? "🔊 Play Audio" : replaysLeft > 0 ? "🔊 Replay Audio" : "Replay Limit Reached"}
                </button>
                <div style={{ marginTop: 10, fontSize: 13, color: "var(--text-secondary)", fontWeight: 700 }}>
                  Replay: {replaysLeft} remaining
                </div>
              </div>

              <textarea
                value={uAnswer || ""}
                onChange={e => handleAnswerChange(currentQ.id, e.target.value)}
                placeholder="Type the exact sentence you heard..."
                rows={3}
                style={{ width: "100%", borderRadius: 16, border: "2px solid #10b981", padding: 16, fontSize: 16, outline: "none", background: "var(--surface)", color: "var(--text)", resize: "vertical", boxSizing: "border-box" }}
              />
            </div>
          );
        })()}

        {/* ── QUESTION TYPE 6: READ ALOUD ── */}
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

        {/* ── QUESTION TYPE 7: DESCRIBE / WRITE ABOUT IMAGE ── */}
        {(currentQ.type === "describe-image" || currentQ.type === "write-about-image") && (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 24, alignItems: "start" }}>
            <img
              src={currentQ.imageUrl || "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80"}
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80";
              }}
              alt={currentQ.imageAlt || "DET Image"}
              style={{ width: "100%", borderRadius: 20, border: "1px solid var(--border)", objectFit: "cover", maxHeight: 320 }}
            />

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

        {/* ── QUESTION TYPE 8: SPEAK ABOUT IMAGE ── */}
        {currentQ.type === "speak-about-image" && (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 24, alignItems: "center" }}>
            <img
              src={currentQ.imageUrl || "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80"}
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80";
              }}
              alt={currentQ.imageAlt || "DET Image"}
              style={{ width: "100%", borderRadius: 20, border: "1px solid var(--border)", objectFit: "cover", maxHeight: 320 }}
            />

            <div style={{ textAlign: "center" }}>
              <AudioRecorder onRecordingComplete={(blob) => handleAnswerChange(currentQ.id, blob)} />
            </div>
          </div>
        )}

        {/* ── QUESTION TYPE 9: INTERACTIVE READING ── */}
        {currentQ.type === "interactive-reading" && (
          <InteractiveReadingRenderer
            item={currentQ}
            onSubmit={(ansMap, acc) => {
              handleAnswerChange(currentQ.id, ansMap);
              handleNextQuestion();
            }}
          />
        )}

        {/* ── QUESTION TYPE 10: INTERACTIVE LISTENING ── */}
        {currentQ.type === "interactive-listening" && (
          <InteractiveListeningRenderer
            item={currentQ}
            onSubmit={(ansData, acc) => {
              handleAnswerChange(currentQ.id, ansData);
              handleNextQuestion();
            }}
          />
        )}

        {/* ── QUESTION TYPE 11: INTERACTIVE WRITING ── */}
        {currentQ.type === "interactive-writing" && (
          <div style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 24, padding: 28 }}>
            <div style={{ fontSize: 17, fontWeight: 800, color: "var(--text)", marginBottom: 16, lineHeight: 1.5 }}>
              {currentQ.prompt || currentQ.question}
            </div>

            <textarea
              value={uAnswer || ""}
              onChange={e => handleAnswerChange(currentQ.id, e.target.value)}
              placeholder="Write your interactive writing response here..."
              rows={8}
              style={{ width: "100%", borderRadius: 16, border: "1px solid var(--border)", padding: 16, fontSize: 15, outline: "none", background: "var(--surface)", color: "var(--text)", resize: "vertical", boxSizing: "border-box" }}
            />

            <div style={{ marginTop: 10, fontSize: 12, color: "var(--text-secondary)", textAlign: "right", fontWeight: 700 }}>
              Word Count: {(uAnswer || "").trim().split(/\s+/).filter(Boolean).length} words
            </div>
          </div>
        )}

        {/* ── QUESTION TYPE 12: INTERACTIVE SPEAKING ── */}
        {currentQ.type === "interactive-speaking" && (
          <div style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 24, padding: 32, textAlign: "center" }}>
            <div style={{ fontSize: 18, fontWeight: 800, color: "var(--text)", marginBottom: 24, lineHeight: 1.5 }}>
              "{currentQ.prompt || currentQ.question}"
            </div>

            <AudioRecorder onRecordingComplete={(blob) => handleAnswerChange(currentQ.id, blob)} />
          </div>
        )}

        {/* ── QUESTION TYPE 13: WRITING SAMPLE ── */}
        {currentQ.type === "writing-sample" && (
          <div style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 24, padding: 28 }}>
            <div style={{ fontSize: 17, fontWeight: 800, color: "var(--text)", marginBottom: 16, lineHeight: 1.5 }}>
              {currentQ.prompt || currentQ.question}
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

        {/* ── QUESTION TYPE 14: SPEAKING SAMPLE ── */}
        {currentQ.type === "speaking-sample" && (
          <div style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 24, padding: 32, textAlign: "center" }}>
            <div style={{ fontSize: 15, fontWeight: 700, color: "var(--text-secondary)", marginBottom: 16 }}>Topic to present:</div>
            <div style={{ padding: "14px 20px", borderRadius: 16, background: "var(--surface)", border: "1px solid var(--border)", fontSize: 16, fontWeight: 800, color: "var(--text)", marginBottom: 20, textAlign: "center" }}>
              {currentQ.prompt || currentQ.question}
            </div>

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
