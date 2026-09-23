import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Clock, Volume2, VolumeX, ArrowRight, ArrowLeft, Play, Pause,
  Mic, Square, CheckCircle2, AlertCircle, RefreshCw, Sparkles,
  BookOpen, Headphones, PenTool, Layers, User, Award, Check, LogOut, Maximize, Minimize
} from "lucide-react";
import toast from "react-hot-toast";
import { toeflTests } from "../data/toefl/toeflTests";
import {
  evaluateCompleteTheWords,
  evaluateBuildASentence,
  estimateAbilityTheta,
  rawTaskPointsToBand,
  calculateToeflOverallScore
} from "../utils/toeflScoreCalculator";
import { evaluateTOEFLWritingAI, evaluateTOEFLSpeakingAI } from "../services/evaluateTOEFLGPT";

export default function TOEFLTestEnginePage() {
  const { testId } = useParams();
  const navigate = useNavigate();

  const rawNum = String(testId || "1").replace(/\D/g, "");
  const numericId = parseInt(rawNum, 10);
  const testIndex = !isNaN(numericId) && numericId > 0 ? (numericId - 1) % toeflTests.length : 0;
  const testData = toeflTests.find((t) => t.id === testId || t.id === `toefl-full-${numericId}`) || toeflTests[testIndex];

  // Exam Section Flow: "reading" -> "listening" -> "writing" -> "speaking" -> "evaluating"
  const [currentSection, setCurrentSection] = useState("reading");
  const [readingStage, setReadingStage] = useState("router"); // "router" | "stage2"
  const [listeningStage, setListeningStage] = useState("router");

  // Timer state (seconds) - Official 1h 56m TOEFL iBT Breakdown (Reading 35m, Listening 36m, Writing 29m, Speaking 16m)
  const [timeLeft, setTimeLeft] = useState(35 * 60);
  const [hideTime, setHideTime] = useState(false);
  const [showExitModal, setShowExitModal] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  function toggleFullscreen() {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().then(() => setIsFullscreen(true)).catch(() => {});
    } else {
      document.exitFullscreen().then(() => setIsFullscreen(false)).catch(() => {});
    }
  }

  // 📖 Reading State
  const [cwUserInputs, setCwUserInputs] = useState({});
  const [mcqUserAnswers, setMcqUserAnswers] = useState({});
  const [readingModuleItems, setReadingModuleItems] = useState(testData.sections.reading.routerModule);
  const [readingItemIndex, setReadingItemIndex] = useState(0);

  // 🎧 Listening State
  const [listeningModuleItems, setListeningModuleItems] = useState(testData.sections.listening.routerModule);
  const [listeningItemIndex, setListeningItemIndex] = useState(0);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [playedAudioItems, setPlayedAudioItems] = useState({}); // Enforce single audio play in exam mode
  const [listeningAnswers, setListeningAnswers] = useState({});

  // ✍️ Writing State
  const [writingSubTask, setWritingSubTask] = useState("bs"); // "bs" | "email" | "discussion"
  const [bsIndex, setBsIndex] = useState(0);
  const [bsUserSentences, setBsUserSentences] = useState({});
  const [emailText, setEmailText] = useState("");
  const [discussionText, setDiscussionText] = useState("");

  // 🎙️ Speaking State
  const [speakingSubTask, setSpeakingSubTask] = useState("repeat"); // "repeat" | "interview"
  const [repeatIndex, setRepeatIndex] = useState(0);
  const [interviewIndex, setInterviewIndex] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [spokenTranscripts, setSpokenTranscripts] = useState({});
  const mediaRecorderRef = useRef(null);
  const recognitionRef = useRef(null);

  // Evaluation & Results State
  const [isEvaluating, setIsEvaluating] = useState(false);

  // Timer countdown effect
  useEffect(() => {
    if (currentSection === "evaluating") return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleNextSection();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [currentSection]);

  function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  }

  // Speak audio prompt (played ONCE in exam simulation)
  function playAudioPrompt(itemId, text) {
    if (playedAudioItems[itemId]) {
      toast.error("ETS Specification: Audio is played once during the official exam.");
      return;
    }
    if (!("speechSynthesis" in window)) {
      toast.error("Audio playback not supported in this browser.");
      return;
    }
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.95;
    utterance.pitch = 1.0;
    utterance.onstart = () => {
      setIsPlayingAudio(true);
      setPlayedAudioItems((prev) => ({ ...prev, [itemId]: true }));
    };
    utterance.onend = () => setIsPlayingAudio(false);
    utterance.onerror = () => setIsPlayingAudio(false);
    window.speechSynthesis.speak(utterance);
  }

  // Microphone Audio Recording & Real-time Speech Recognition for Speaking Tasks
  function startAudioRecording(taskId) {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      toast.error("Microphone access is not supported.");
      return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      try {
        if (recognitionRef.current) {
          try { recognitionRef.current.stop(); } catch (e) {}
        }
        const recognition = new SpeechRecognition();
        recognition.continuous = true;
        recognition.interimResults = true;
        recognition.lang = "en-US";

        let currentBaseText = spokenTranscripts[taskId] || "";

        recognition.onresult = (event) => {
          let accumulated = "";
          for (let i = 0; i < event.results.length; i++) {
            accumulated += event.results[i][0].transcript + " ";
          }
          const liveText = accumulated.trim();
          if (liveText) {
            setSpokenTranscripts((prev) => ({ ...prev, [taskId]: liveText }));
          }
        };

        recognition.onerror = (err) => {
          console.warn("Speech recognition notice:", err.error);
        };

        recognition.start();
        recognitionRef.current = recognition;
      } catch (err) {
        console.warn("Speech recognition initialization fallback:", err);
      }
    }

    navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
      mediaRecorderRef.current = new MediaRecorder(stream);
      mediaRecorderRef.current.start();
      setIsRecording(true);
      toast.success("🎙️ Recording active! Speak clearly into your microphone.");

      mediaRecorderRef.current.ondataavailable = (e) => {
        // Keeps audio stream alive during recording
      };
    }).catch((err) => {
      toast.error("Microphone permission denied.");
    });
  }

  function stopAudioRecording() {
    if (recognitionRef.current) {
      try { recognitionRef.current.stop(); } catch (e) {}
      recognitionRef.current = null;
    }
    if (mediaRecorderRef.current && isRecording) {
      try { mediaRecorderRef.current.stop(); } catch (e) {}
      setIsRecording(false);
      toast.success("✓ Spoken response saved!");
    }
  }

  // Section & Adaptive Router Transitions
  function handleNextSection() {
    window.speechSynthesis.cancel();
    if (currentSection === "reading") {
      if (readingStage === "router") {
        let correctCount = 0;
        let totalCount = 0;
        readingModuleItems.forEach((item) => {
          if (item.type === "complete_words") {
            const res = evaluateCompleteTheWords(cwUserInputs[item.id] || [], item.missingParts);
            correctCount += res.correct;
            totalCount += res.total;
          } else if (item.questions) {
            item.questions.forEach((q) => {
              totalCount++;
              if (mcqUserAnswers[q.id] === q.correctAnswer) correctCount++;
            });
          }
        });

        const { theta, selectUpperModule } = estimateAbilityTheta(correctCount, totalCount);

        if (selectUpperModule) {
          setReadingModuleItems(testData.sections.reading.upperModule);
          toast.success(`🧠 Reading Router Theta Ability = ${theta}. Routing to Upper Stage 2 Module.`);
        } else {
          setReadingModuleItems(testData.sections.reading.lowerModule);
          toast(`📘 Reading Router Theta Ability = ${theta}. Routing to Stage 2 Module.`);
        }
        setReadingStage("stage2");
        setReadingItemIndex(0);
      } else {
        setCurrentSection("listening");
        setTimeLeft(36 * 60);
        toast.success("🎧 Moving to Listening Section (36 Mins).");
      }
    } else if (currentSection === "listening") {
      if (listeningStage === "router") {
        let correctCount = 0;
        let totalCount = 0;
        listeningModuleItems.forEach((item) => {
          if (item.questions) {
            item.questions.forEach((q) => {
              totalCount++;
              if (listeningAnswers[q.id] === q.correctAnswer) correctCount++;
            });
          } else if (item.correctAnswer !== undefined) {
            totalCount++;
            if (listeningAnswers[item.id] === item.correctAnswer) correctCount++;
          }
        });

        const { theta, selectUpperModule } = estimateAbilityTheta(correctCount, totalCount);

        if (selectUpperModule) {
          setListeningModuleItems(testData.sections.listening.upperModule);
          toast.success(`🧠 Listening Router Theta Ability = ${theta}. Routing to Upper Stage 2 Module.`);
        } else {
          setListeningModuleItems(testData.sections.listening.lowerModule);
          toast(`🎧 Routing to Stage 2 Listening Module.`);
        }
        setListeningStage("stage2");
        setListeningItemIndex(0);
      } else {
        setCurrentSection("writing");
        setTimeLeft(29 * 60);
        toast.success("✍️ Moving to Writing Section (29 Mins).");
      }
    } else if (currentSection === "writing") {
      setCurrentSection("speaking");
      setTimeLeft(16 * 60);
      toast.success("🎙️ Moving to Speaking Section (16 Mins).");
    } else if (currentSection === "speaking") {
      finishAndEvaluateExam();
    }
  }

  // Complete Exam & Run Groq AI Evaluations for Writing & Speaking
  async function finishAndEvaluateExam() {
    setCurrentSection("evaluating");
    setIsEvaluating(true);

    // 1. Reading Raw & Band Score (Stage 1 Router + Stage 2 Adaptive Module)
    let cwCorrect = 0, cwTotal = 0;
    let dlCorrect = 0, dlTotal = 0;
    let acadCorrect = 0, acadTotal = 0;

    const allReadingItems = [...(testData.sections.reading.routerModule || []), ...readingModuleItems];
    allReadingItems.forEach((item) => {
      if (item.type === "complete_words") {
        const res = evaluateCompleteTheWords(cwUserInputs[item.id] || [], item.missingParts);
        cwTotal += res.total;
        cwCorrect += res.correct;
      } else if (item.type === "read_daily_life") {
        if (item.questions) {
          item.questions.forEach((q) => {
            dlTotal++;
            if (mcqUserAnswers[q.id] === q.correctAnswer) dlCorrect++;
          });
        }
      } else if (item.type === "read_academic") {
        if (item.questions) {
          item.questions.forEach((q) => {
            acadTotal++;
            if (mcqUserAnswers[q.id] === q.correctAnswer) acadCorrect++;
          });
        }
      }
    });

    const rTotalCorrect = cwCorrect + dlCorrect + acadCorrect;
    const rTotalItems = cwTotal + dlTotal + acadTotal;
    const readingBand = rawTaskPointsToBand(rTotalCorrect, rTotalItems);

    const cwPct = cwTotal > 0 ? Math.round((cwCorrect / cwTotal) * 100) : 0;
    const dlPct = dlTotal > 0 ? Math.round((dlCorrect / dlTotal) * 100) : 0;
    const acadPct = acadTotal > 0 ? Math.round((acadCorrect / acadTotal) * 100) : 0;

    // 2. Listening Raw & Band Score (Stage 1 Router + Stage 2 Adaptive Module)
    let respCorrect = 0, respTotal = 0;
    let convCorrect = 0, convTotal = 0;
    let talkCorrect = 0, talkTotal = 0;

    const allListeningItems = [...(testData.sections.listening.routerModule || []), ...listeningModuleItems];
    allListeningItems.forEach((item) => {
      if (item.type === "listen_choose_response") {
        respTotal++;
        if (listeningAnswers[item.id] === item.correctAnswer) respCorrect++;
      } else if (item.type === "listen_conversation") {
        if (item.questions) {
          item.questions.forEach((q) => {
            convTotal++;
            if (listeningAnswers[q.id] === q.correctAnswer) convCorrect++;
          });
        }
      } else {
        if (item.questions) {
          item.questions.forEach((q) => {
            talkTotal++;
            if (listeningAnswers[q.id] === q.correctAnswer) talkCorrect++;
          });
        }
      }
    });

    const lTotalCorrect = respCorrect + convCorrect + talkCorrect;
    const lTotalItems = respTotal + convTotal + talkTotal;
    const listeningBand = rawTaskPointsToBand(lTotalCorrect, lTotalItems);

    const respPct = respTotal > 0 ? Math.round((respCorrect / respTotal) * 100) : 0;
    const convPct = convTotal > 0 ? Math.round((convCorrect / convTotal) * 100) : 0;
    const talkPct = talkTotal > 0 ? Math.round((talkCorrect / talkTotal) * 100) : 0;

    // 3. Writing Evaluation with Groq AI (Build a Sentence + Email + Discussion)
    let bsCorrect = 0;
    testData.sections.writing.buildSentenceItems.forEach((item, idx) => {
      const userArr = bsUserSentences[idx] || [];
      if (evaluateBuildASentence(userArr.join(" "), item.targetSentence)) {
        bsCorrect += 1;
      }
    });

    toast.loading("🤖 Evaluating Writing responses with Groq AI...", { id: "eval-toast" });

    const emailEval = await evaluateTOEFLWritingAI({
      taskType: "email",
      prompt: testData.sections.writing.emailTask.scenario,
      userResponse: emailText,
    });

    const discEval = await evaluateTOEFLWritingAI({
      taskType: "discussion",
      prompt: testData.sections.writing.discussionTask.professorPrompt,
      userResponse: discussionText,
    });

    // Max raw writing score: 10 BS + (5 Email * 2) + (5 Disc * 2) = 30 points max
    const rawWritingTotal = bsCorrect + (emailEval.rawTaskScore * 2) + (discEval.rawTaskScore * 2);
    const writingBand = rawTaskPointsToBand(rawWritingTotal, 30);

    // 4. Speaking Evaluation with Groq AI across all recorded speaking tasks
    toast.loading("🤖 Evaluating Spoken responses with Groq AI...", { id: "eval-toast" });

    let repeatCorrect = 0;
    testData.sections.speaking.repeatTasks.forEach((rTask) => {
      const userSpoken = (spokenTranscripts[rTask.id] || "").toLowerCase().trim();
      const target = (rTask.audioText || "").toLowerCase().trim();
      if (userSpoken && target) {
        const uWords = userSpoken.split(/\s+/);
        const tWords = target.split(/\s+/);
        const match = uWords.filter(w => tWords.includes(w)).length;
        if (match >= Math.floor(tWords.length * 0.6)) repeatCorrect += 5;
        else if (match >= Math.floor(tWords.length * 0.3)) repeatCorrect += 3;
      }
    });

    const interviewEvaluations = [];
    let sumSpeakingRaw = 0;

    for (const intTask of testData.sections.speaking.interviewTasks) {
      const spokenText = spokenTranscripts[intTask.id] || "";
      const evalRes = await evaluateTOEFLSpeakingAI({
        taskType: "interview",
        prompt: intTask.questionText,
        spokenText,
        durationSeconds: intTask.recordWindowSec || 45,
      });
      interviewEvaluations.push(evalRes);
      sumSpeakingRaw += evalRes.rawTaskScore;
    }

    const avgSpeakingRaw = interviewEvaluations.length > 0 ? (sumSpeakingRaw / interviewEvaluations.length) : 0;
    const rawSpeakingTotal = repeatCorrect + Math.round(avgSpeakingRaw * 4); // Max = 35 + 20 = 55 points
    const speakingBand = rawTaskPointsToBand(rawSpeakingTotal, 55);

    const primarySpeakingEval = interviewEvaluations.find(e => (e.feedback || "").length > 20) || interviewEvaluations[0] || {
      rawTaskScore: Math.round(avgSpeakingRaw),
      bandScore: speakingBand,
      feedback: "No speech detected. Please ensure your microphone is working and speak clearly during the recording window.",
      suggestions: ["Speak clearly into your microphone during the recording window."],
    };

    // Overall Score Calculation with Confidence Range
    const { predictedScore, scoreRangeText, confidence } = calculateToeflOverallScore(
      readingBand, listeningBand, writingBand, speakingBand
    );

    const resultObj = {
      testId,
      date: new Date().toISOString(),
      overallScore: predictedScore,
      scoreRangeText,
      confidence,
      readingBand,
      listeningBand,
      writingBand,
      speakingBand,
      // Dynamic Subskill Payload
      cwPct,
      dlPct,
      acadPct,
      respPct,
      convPct,
      annPct: Math.round((respPct + convPct) / 2),
      talkPct,
      bsScore: bsCorrect,
      listenRepeatScore: repeatCorrect,
      interviewRawScore: Math.round(avgSpeakingRaw),
      writingFeedback: { email: emailEval, discussion: discEval },
      speakingFeedback: primarySpeakingEval,
    };

    toast.dismiss("eval-toast");
    toast.success("✨ Groq AI Evaluation Completed!");
    localStorage.setItem(`toefl_result_${testId}`, JSON.stringify(resultObj));
    setIsEvaluating(false);
    navigate(`/toefl/results/${testId}`);
  }

  if (currentSection === "evaluating" || isEvaluating) {
    return (
      <div style={{ minHeight: "100vh", background: "#0f172a", color: "#ffffff", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "24px", textAlign: "center" }}>
        <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 2, ease: "linear" }} style={{ marginBottom: 24 }}>
          <Sparkles size={56} color="#c084fc" />
        </motion.div>
        <h1 style={{ fontSize: "28px", fontWeight: 900, marginBottom: 12 }}>Executing 2026 TOEFL AI Psychometric Calibration</h1>
        <p style={{ color: "#94a3b8", fontSize: "16px", maxWidth: "520px" }}>
          Evaluating ETS 0–5 Raw Task Rubrics on Writing &amp; Speaking responses...
        </p>
      </div>
    );
  }

  const currentReadingItem = readingModuleItems[readingItemIndex] || readingModuleItems[0];
  const currentListeningItem = listeningModuleItems[listeningItemIndex] || listeningModuleItems[0];

  return (
    <div style={{ minHeight: "100vh", background: "#0f172a", color: "#ffffff", fontFamily: "Inter, sans-serif", display: "flex", flexDirection: "column" }}>

      {/* ── SAFETY EXIT CONFIRMATION MODAL ── */}
      {showExitModal && (
        <div style={{ position: "fixed", inset: 0, zIndex: 9999, background: "rgba(15,23,42,0.85)", backdropFilter: "blur(8px)", display: "flex", alignItems: "center", justifyContent: "center", padding: "20px" }}>
          <div style={{ background: "#1e293b", border: "1px solid rgba(255,255,255,0.15)", borderRadius: "24px", padding: "32px", maxWidth: "480px", width: "100%", boxShadow: "0 20px 50px rgba(0,0,0,0.5)", textAlign: "center" }}>
            <div style={{ width: 56, height: 56, borderRadius: "50%", background: "rgba(239,68,68,0.15)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px", color: "#f87171" }}>
              <AlertCircle size={32} />
            </div>
            <h2 style={{ fontSize: "22px", fontWeight: 900, margin: "0 0 12px 0", color: "#ffffff" }}>
              Exit TOEFL iBT Simulation?
            </h2>
            <p style={{ fontSize: "14px", color: "#94a3b8", margin: "0 0 24px 0", lineHeight: 1.6 }}>
              Are you sure you want to leave the exam session? Your current section responses will be submitted as-is.
            </p>
            <div style={{ display: "flex", gap: 12 }}>
              <button
                onClick={() => setShowExitModal(false)}
                style={{ flex: 1, background: "rgba(255,255,255,0.08)", color: "#ffffff", border: "1px solid rgba(255,255,255,0.15)", borderRadius: 12, padding: "12px", fontWeight: 800, fontSize: 14, cursor: "pointer" }}
              >
                Resume Test
              </button>
              <button
                onClick={() => navigate("/toefl")}
                style={{ flex: 1, background: "#dc2626", color: "#ffffff", border: "none", borderRadius: 12, padding: "12px", fontWeight: 800, fontSize: 14, cursor: "pointer", boxShadow: "0 4px 14px rgba(220,38,38,0.4)" }}
              >
                Exit to TOEFL Hub
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── OFFICIAL ETS TOP EXAM TOOLBAR ── */}
      <div style={{ background: "#1e293b", borderBottom: "1px solid rgba(255,255,255,0.1)", padding: "12px 24px", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{ fontSize: "16px", fontWeight: 900, color: "#c084fc", letterSpacing: "0.5px", display: "flex", alignItems: "center", gap: 8 }}>
            <Sparkles size={18} color="#c084fc" />
            <span>🎓 IELTS Academic &amp; TOEFL iBT 2026 Test Engine</span>
          </div>
          <div style={{ display: "flex", gap: 6 }}>
            {["reading", "listening", "writing", "speaking"].map((sec) => (
              <span
                key={sec}
                style={{
                  padding: "4px 12px",
                  borderRadius: "999px",
                  fontSize: "12px",
                  fontWeight: 800,
                  textTransform: "capitalize",
                  background: currentSection === sec ? "#7c3aed" : "rgba(255,255,255,0.06)",
                  color: currentSection === sec ? "#ffffff" : "#94a3b8",
                  border: currentSection === sec ? "1px solid #a855f7" : "none",
                }}
              >
                {sec}
              </span>
            ))}
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <button
            onClick={() => setHideTime(!hideTime)}
            style={{ background: "rgba(255,255,255,0.08)", color: "#cbd5e1", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 8, padding: "6px 12px", fontSize: 12, fontWeight: 700, cursor: "pointer" }}
          >
            {hideTime ? "Show Time" : "Hide Time"}
          </button>

          {!hideTime && (
            <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 15, fontWeight: 800, color: "#facc15", background: "rgba(250,204,21,0.1)", padding: "6px 14px", borderRadius: 8, border: "1px solid rgba(250,204,21,0.2)" }}>
              <Clock size={16} /> {formatTime(timeLeft)}
            </div>
          )}

          <button
            onClick={toggleFullscreen}
            title="Toggle Fullscreen Exam Mode"
            style={{ background: "rgba(255,255,255,0.08)", color: "#ffffff", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 8, padding: "6px 12px", fontSize: 12, fontWeight: 700, cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 6 }}
          >
            {isFullscreen ? <Minimize size={15} /> : <Maximize size={15} />}
            <span>{isFullscreen ? "Exit Fullscreen" : "Fullscreen"}</span>
          </button>

          <button
            onClick={handleNextSection}
            style={{ background: "linear-gradient(135deg, #7c3aed, #2563eb)", color: "#ffffff", border: "none", borderRadius: 10, padding: "8px 18px", fontSize: 13, fontWeight: 800, cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 6, boxShadow: "0 4px 14px rgba(124,58,237,0.3)" }}
          >
            Next Section <ArrowRight size={16} />
          </button>

          <button
            onClick={() => setShowExitModal(true)}
            title="Exit Exam Session"
            style={{ background: "rgba(239,68,68,0.15)", color: "#f87171", border: "1px solid rgba(239,68,68,0.3)", borderRadius: 8, padding: "6px 12px", fontSize: 12, fontWeight: 800, cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 6 }}
          >
            <LogOut size={15} /> Exit
          </button>
        </div>
      </div>

      {/* ── EXAM WORKSPACE ── */}
      <div style={{ flex: 1, padding: "24px", maxWidth: "1100px", margin: "0 auto", width: "100%" }}>

        {/* 📖 READING SECTION VIEW */}
        {currentSection === "reading" && currentReadingItem && (
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{ background: "rgba(56,189,248,0.15)", color: "#38bdf8", border: "1px solid rgba(56,189,248,0.3)", padding: "4px 12px", borderRadius: 8, fontSize: 13, fontWeight: 800 }}>
                  Adaptive Reading
                </span>
                <span style={{ fontSize: 13, color: "#94a3b8", fontWeight: 700 }}>
                  {readingStage === "router"
                    ? "Module 1 — Router"
                    : (readingModuleItems === testData.sections.reading.upperModule ? "Module 2 — Upper" : "Module 2 — Lower")}
                </span>
              </div>
              <span style={{ fontSize: 13, color: "#94a3b8" }}>
                Item {readingItemIndex + 1} of {readingModuleItems.length}
              </span>
            </div>

            {/* Complete the Words (ETS 2026 MOC4 Authentic Layout) */}
            {currentReadingItem.type === "complete_words" && (
              <div style={{ background: "rgba(30,41,59,0.85)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 20, padding: 32, boxShadow: "0 10px 30px rgba(0,0,0,0.3)" }}>
                <div style={{ fontSize: 20, fontWeight: 900, color: "#ffffff", marginBottom: 8 }}>
                  Complete the Words
                </div>
                <p style={{ color: "#94a3b8", fontSize: 14, marginBottom: 24, lineHeight: 1.5 }}>
                  {currentReadingItem.instruction || "Fill in the missing letters in the paragraph below."}
                </p>

                {/* Inline Paragraph Slot Renderer matching Image 3 reference */}
                <div style={{ background: "#ffffff", padding: "28px 32px", borderRadius: 12, border: "1px solid #cbd5e1", fontSize: 17, lineHeight: 2.2, color: "#1e293b", fontFamily: "Georgia, serif", boxShadow: "inset 0 2px 6px rgba(0,0,0,0.05)", marginBottom: 28 }}>
                  {(() => {
                    const passageText = currentReadingItem.passageText;
                    const missingParts = currentReadingItem.missingParts || [];
                    const currentArr = cwUserInputs[currentReadingItem.id] || [];

                    // Match suffixes like expan___ or res___
                    const parts = passageText.split(/([a-zA-Z]+___+)/g);
                    let slotIdx = 0;

                    return parts.map((part, pIdx) => {
                      const match = part.match(/^([a-zA-Z]+)(___+)$/);
                      if (match) {
                        const currentSlot = slotIdx;
                        slotIdx++;
                        const prefix = match[1];
                        const expectedLen = missingParts[currentSlot] ? missingParts[currentSlot].length : 3;
                        const userVal = currentArr[currentSlot] || "";

                        return (
                          <span key={pIdx} style={{ display: "inline-flex", alignItems: "baseline", whiteSpace: "nowrap", margin: "0 2px" }}>
                            <span style={{ fontWeight: 600, color: "#0f172a" }}>{prefix}</span>
                            <input
                              type="text"
                              maxLength={expectedLen + 2}
                              value={userVal}
                              onChange={(e) => {
                                const val = e.target.value;
                                const newArr = [...currentArr];
                                newArr[currentSlot] = val;
                                setCwUserInputs({ ...cwUserInputs, [currentReadingItem.id]: newArr });
                              }}
                              style={{
                                width: `${Math.max(36, (expectedLen + 1) * 14)}px`,
                                height: "26px",
                                background: "#bfdbfe", // Light blueish filled square box matching Image 3 reference
                                color: "#0f172a",
                                fontWeight: 800,
                                fontSize: "15px",
                                textAlign: "center",
                                border: "1px dashed #2563eb",
                                borderRadius: "3px",
                                marginLeft: "1px",
                                marginRight: "2px",
                                outline: "none",
                                fontFamily: "Inter, sans-serif"
                              }}
                            />
                          </span>
                        );
                      }
                      return <span key={pIdx}>{part}</span>;
                    });
                  })()}
                </div>
              </div>
            )}

            {/* Read in Daily Life / Read Academic Passage (ETS 2026 MOC4 Authentic Dual Column matching Image 4 & 5) */}
            {(currentReadingItem.type === "read_daily_life" || currentReadingItem.type === "read_academic") && (
              <div>
                <div style={{ fontSize: 22, fontWeight: 900, color: "#ffffff", marginBottom: 16 }}>
                  {currentReadingItem.type === "read_daily_life"
                    ? "Read in Daily Life"
                    : "Read an Academic Passage"}
                  {currentReadingItem.stimulusFormat && (
                    <span style={{ fontSize: 14, color: "#38bdf8", marginLeft: 12, fontWeight: 600 }}>
                      ({currentReadingItem.stimulusFormat})
                    </span>
                  )}
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1.1fr 1fr", gap: 24, alignItems: "start" }}>
                  {/* Left Column Stimulus Card with Cyan/Emerald Border matching Image 4 & 5 */}
                  <div style={{ background: "rgba(15,23,42,0.9)", border: "2px solid #0891b2", borderRadius: 16, padding: 24, boxShadow: "0 8px 30px rgba(0,0,0,0.4)" }}>
                    {currentReadingItem.stimulusFormat === "Email" ? (
                      <div>
                        <div style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8, padding: "8px 14px", marginBottom: 14, fontSize: 13, color: "#cbd5e1", display: "flex", gap: 10 }}>
                          <span style={{ fontWeight: 800, color: "#38bdf8" }}>Subject:</span>
                          <span>{currentReadingItem.passageTitle || "Campus Notice"}</span>
                        </div>
                        <div style={{ fontSize: 14, lineHeight: 1.8, color: "#e2e8f0", whiteSpace: "pre-line" }}>
                          {currentReadingItem.passageText}
                        </div>
                      </div>
                    ) : (
                      <div>
                        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
                          <div style={{ width: 28, height: 28, borderRadius: "50%", background: "#0891b2", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14 }}>
                            📌
                          </div>
                          <span style={{ fontSize: 13, fontWeight: 800, color: "#38bdf8" }}>
                            {currentReadingItem.passageTitle || "Campus Announcement"}
                          </span>
                        </div>
                        <div style={{ fontSize: 15, lineHeight: 1.8, color: "#e2e8f0", whiteSpace: "pre-line" }}>
                          {currentReadingItem.passageText}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Right Column Question & Choices */}
                  <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                    {currentReadingItem.questions?.map((q) => (
                      <div key={q.id} style={{ background: "rgba(30,41,59,0.85)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 20, padding: 22 }}>
                        <div style={{ fontSize: 16, fontWeight: 800, marginBottom: 16, color: "#ffffff", lineHeight: 1.5 }}>
                          {q.questionText}
                        </div>
                        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                          {q.options.map((opt, oIdx) => {
                            const isSelected = mcqUserAnswers[q.id] === oIdx;
                            return (
                              <button
                                key={oIdx}
                                onClick={() => setMcqUserAnswers({ ...mcqUserAnswers, [q.id]: oIdx })}
                                style={{
                                  textAlign: "left",
                                  background: isSelected ? "rgba(124,58,237,0.3)" : "#0f172a",
                                  border: isSelected ? "2px solid #a855f7" : "1px solid rgba(255,255,255,0.1)",
                                  borderRadius: 12,
                                  padding: "14px 18px",
                                  color: "#ffffff",
                                  fontSize: 14,
                                  fontWeight: isSelected ? 700 : 500,
                                  cursor: "pointer",
                                  display: "flex",
                                  alignItems: "center",
                                  gap: 12,
                                  transition: "all 0.2s"
                                }}
                              >
                                <div style={{ width: 20, height: 20, borderRadius: "50%", border: isSelected ? "6px solid #a855f7" : "2px solid #64748b", background: isSelected ? "#ffffff" : "transparent", flexShrink: 0 }} />
                                <span>{opt}</span>
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            <div style={{ display: "flex", justifyContent: "space-between", marginTop: 24 }}>
              <button
                disabled={readingItemIndex === 0}
                onClick={() => setReadingItemIndex(readingItemIndex - 1)}
                style={{ background: "rgba(255,255,255,0.08)", color: "#ffffff", border: "none", borderRadius: 10, padding: "10px 20px", fontSize: 14, fontWeight: 700, cursor: readingItemIndex === 0 ? "not-allowed" : "pointer" }}
              >
                ← Previous
              </button>
              {readingItemIndex < readingModuleItems.length - 1 ? (
                <button
                  onClick={() => setReadingItemIndex(readingItemIndex + 1)}
                  style={{ background: "#7c3aed", color: "#ffffff", border: "none", borderRadius: 10, padding: "10px 24px", fontSize: 14, fontWeight: 800, cursor: "pointer" }}
                >
                  Next Item →
                </button>
              ) : (
                <button
                  onClick={handleNextSection}
                  style={{ background: "#2563eb", color: "#ffffff", border: "none", borderRadius: 10, padding: "10px 24px", fontSize: 14, fontWeight: 800, cursor: "pointer" }}
                >
                  {readingStage === "router" ? "Submit Router & Adapt →" : "Finish Reading Section →"}
                </button>
              )}
            </div>
          </div>
        )}

        {/* 🎧 LISTENING SECTION VIEW */}
        {currentSection === "listening" && currentListeningItem && (
          <div style={{ background: "rgba(30,41,59,0.7)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 20, padding: 28 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
              <span style={{ fontSize: 13, color: "#8b5cf6", fontWeight: 800 }}>
                Task: {
                  currentListeningItem.type === "listen_choose_response" ? "Listen and Choose a Response" :
                  currentListeningItem.type === "listen_conversation" ? "Listen to a Conversation" :
                  currentListeningItem.type === "listen_announcement" ? "Listen to an Announcement" :
                  currentListeningItem.type === "listen_academic_talk" ? "Listen to an Academic Talk" :
                  "Listening Task"
                }
              </span>
              <span style={{ fontSize: 13, color: "#94a3b8" }}>
                Item {listeningItemIndex + 1} of {listeningModuleItems.length}
              </span>
            </div>

            {/* VISUAL SPEAKER AVATAR CONTAINER */}
            <div style={{ background: "#0f172a", borderRadius: 20, padding: 24, marginBottom: 24, textAlign: "center", border: "1px solid rgba(255,255,255,0.08)" }}>
              <div style={{ width: 72, height: 72, borderRadius: "50%", background: "linear-gradient(135deg, #8b5cf6, #3b82f6)", display: "inline-flex", alignItems: "center", justifyContent: "center", color: "#ffffff", marginBottom: 14, boxShadow: "0 8px 20px rgba(139,92,246,0.3)" }}>
                <User size={36} />
              </div>
              <div style={{ fontSize: 16, fontWeight: 800, color: "#ffffff", marginBottom: 4 }}>
                Audio Prompt
              </div>
              <div style={{ fontSize: 13, color: "#94a3b8", marginBottom: 18 }}>
                {isPlayingAudio ? "🔊 Audio playing now..." : playedAudioItems[currentListeningItem.id] ? "✓ Audio played (Played once in exam mode)" : "Listen carefully and choose the best response."}
              </div>

              <button
                onClick={() => playAudioPrompt(currentListeningItem.id, currentListeningItem.audioText)}
                disabled={playedAudioItems[currentListeningItem.id] || isPlayingAudio}
                style={{
                  background: playedAudioItems[currentListeningItem.id] ? "rgba(255,255,255,0.1)" : "linear-gradient(135deg, #8b5cf6, #6d28d9)",
                  color: "#ffffff",
                  border: "none",
                  borderRadius: 14,
                  padding: "12px 24px",
                  fontSize: 14,
                  fontWeight: 800,
                  cursor: playedAudioItems[currentListeningItem.id] ? "not-allowed" : "pointer",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                }}
              >
                <Volume2 size={18} /> {playedAudioItems[currentListeningItem.id] ? "Audio Completed" : "Play Audio Prompt"}
              </button>
            </div>

            {/* Questions View */}
            {currentListeningItem.options ? (
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {currentListeningItem.options.map((opt, oIdx) => {
                  const isSelected = listeningAnswers[currentListeningItem.id] === oIdx;
                  return (
                    <button
                      key={oIdx}
                      onClick={() => setListeningAnswers({ ...listeningAnswers, [currentListeningItem.id]: oIdx })}
                      style={{
                        textAlign: "left",
                        background: isSelected ? "rgba(139,92,246,0.25)" : "#0f172a",
                        border: isSelected ? "2px solid #8b5cf6" : "1px solid rgba(255,255,255,0.08)",
                        borderRadius: 12,
                        padding: "14px 18px",
                        color: "#ffffff",
                        fontSize: 15,
                        cursor: "pointer",
                      }}
                    >
                      {opt}
                    </button>
                  );
                })}
              </div>
            ) : (
              currentListeningItem.questions?.map((q) => (
                <div key={q.id} style={{ marginBottom: 20 }}>
                  <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 12 }}>{q.questionText}</div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                    {q.options.map((opt, oIdx) => {
                      const isSelected = listeningAnswers[q.id] === oIdx;
                      return (
                        <button
                          key={oIdx}
                          onClick={() => setListeningAnswers({ ...listeningAnswers, [q.id]: oIdx })}
                          style={{
                            textAlign: "left",
                            background: isSelected ? "rgba(139,92,246,0.25)" : "#0f172a",
                            border: isSelected ? "2px solid #8b5cf6" : "1px solid rgba(255,255,255,0.08)",
                            borderRadius: 12,
                            padding: "14px 18px",
                            color: "#ffffff",
                            fontSize: 14,
                            cursor: "pointer",
                          }}
                        >
                          {opt}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))
            )}

            <div style={{ display: "flex", justifyContent: "space-between", marginTop: 28 }}>
              <button
                disabled={listeningItemIndex === 0}
                onClick={() => setListeningItemIndex(listeningItemIndex - 1)}
                style={{ background: "rgba(255,255,255,0.08)", color: "#ffffff", border: "none", borderRadius: 10, padding: "10px 20px", fontSize: 14, fontWeight: 700, cursor: listeningItemIndex === 0 ? "not-allowed" : "pointer" }}
              >
                ← Previous
              </button>
              {listeningItemIndex < listeningModuleItems.length - 1 ? (
                <button
                  onClick={() => setListeningItemIndex(listeningItemIndex + 1)}
                  style={{ background: "#8b5cf6", color: "#ffffff", border: "none", borderRadius: 10, padding: "10px 24px", fontSize: 14, fontWeight: 800, cursor: "pointer" }}
                >
                  Next Audio Item →
                </button>
              ) : (
                <button
                  onClick={handleNextSection}
                  style={{ background: "#2563eb", color: "#ffffff", border: "none", borderRadius: 10, padding: "10px 24px", fontSize: 14, fontWeight: 800, cursor: "pointer" }}
                >
                  {listeningStage === "router" ? "Submit Router & Adapt →" : "Finish Listening Section →"}
                </button>
              )}
            </div>
          </div>
        )}

        {/* ✍️ WRITING SECTION VIEW */}
        {currentSection === "writing" && (
          <div>
            <div style={{ display: "flex", gap: 10, marginBottom: 20 }}>
              <button
                onClick={() => setWritingSubTask("bs")}
                style={{ background: writingSubTask === "bs" ? "#f59e0b" : "rgba(255,255,255,0.06)", color: "#ffffff", border: "none", borderRadius: 10, padding: "10px 18px", fontSize: 13, fontWeight: 800, cursor: "pointer" }}
              >
                Build a Sentence (10 Items)
              </button>
              <button
                onClick={() => setWritingSubTask("email")}
                style={{ background: writingSubTask === "email" ? "#f59e0b" : "rgba(255,255,255,0.06)", color: "#ffffff", border: "none", borderRadius: 10, padding: "10px 18px", fontSize: 13, fontWeight: 800, cursor: "pointer" }}
              >
                Write an Email
              </button>
              <button
                onClick={() => setWritingSubTask("discussion")}
                style={{ background: writingSubTask === "discussion" ? "#f59e0b" : "rgba(255,255,255,0.06)", color: "#ffffff", border: "none", borderRadius: 10, padding: "10px 18px", fontSize: 13, fontWeight: 800, cursor: "pointer" }}
              >
                Write for an Academic Discussion
              </button>
            </div>

            {/* Build a Sentence */}
            {writingSubTask === "bs" && (() => {
              const currentBs = testData.sections.writing.buildSentenceItems[bsIndex];
              const chosenWords = bsUserSentences[bsIndex] || [];
              return (
                <div style={{ background: "rgba(30,41,59,0.7)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 20, padding: 28 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 14 }}>
                    <span style={{ fontSize: 13, color: "#f59e0b", fontWeight: 800 }}>Sentence #{bsIndex + 1} of 10 ({currentBs.difficulty})</span>
                  </div>
                  <h3 style={{ fontSize: 18, fontWeight: 800, marginBottom: 16 }}>Arrange the words and phrases to form a grammatically correct sentence:</h3>

                  <div style={{ background: "#0f172a", border: "2px dashed #f59e0b", borderRadius: 16, padding: 20, minHeight: 60, marginBottom: 20, display: "flex", flexWrap: "wrap", gap: 10, alignItems: "center" }}>
                    {chosenWords.length === 0 ? (
                      <span style={{ color: "#64748b", fontSize: 14 }}>Click word chips below...</span>
                    ) : (
                      chosenWords.map((w, idx) => (
                        <button
                          key={idx}
                          onClick={() => {
                            const newArr = chosenWords.filter((_, i) => i !== idx);
                            setBsUserSentences({ ...bsUserSentences, [bsIndex]: newArr });
                          }}
                          style={{ background: "#f59e0b", color: "#0f172a", border: "none", borderRadius: 8, padding: "8px 14px", fontWeight: 800, fontSize: 14, cursor: "pointer" }}
                        >
                          {w} ✕
                        </button>
                      ))
                    )}
                  </div>

                  <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginBottom: 24 }}>
                    {currentBs.scrambledWords.map((w, idx) => {
                      const isUsed = chosenWords.includes(w);
                      return (
                        <button
                          key={idx}
                          disabled={isUsed}
                          onClick={() => setBsUserSentences({ ...bsUserSentences, [bsIndex]: [...chosenWords, w] })}
                          style={{
                            background: isUsed ? "rgba(255,255,255,0.05)" : "#1e293b",
                            color: isUsed ? "#64748b" : "#ffffff",
                            border: "1px solid rgba(255,255,255,0.15)",
                            borderRadius: 10,
                            padding: "10px 16px",
                            fontSize: 14,
                            fontWeight: 700,
                            cursor: isUsed ? "not-allowed" : "pointer",
                          }}
                        >
                          {w}
                        </button>
                      );
                    })}
                  </div>

                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <button
                      disabled={bsIndex === 0}
                      onClick={() => setBsIndex(bsIndex - 1)}
                      style={{ background: "rgba(255,255,255,0.08)", color: "#ffffff", border: "none", borderRadius: 10, padding: "10px 20px", fontSize: 14, fontWeight: 700 }}
                    >
                      ← Previous Sentence
                    </button>
                    {bsIndex < 9 ? (
                      <button
                        onClick={() => setBsIndex(bsIndex + 1)}
                        style={{ background: "#f59e0b", color: "#0f172a", border: "none", borderRadius: 10, padding: "10px 24px", fontSize: 14, fontWeight: 800, cursor: "pointer" }}
                      >
                        Next Sentence →
                      </button>
                    ) : (
                      <button
                        onClick={() => setWritingSubTask("email")}
                        style={{ background: "#2563eb", color: "#ffffff", border: "none", borderRadius: 10, padding: "10px 24px", fontSize: 14, fontWeight: 800, cursor: "pointer" }}
                      >
                        Proceed to Write an Email →
                      </button>
                    )}
                  </div>
                </div>
              );
            })()}

            {/* Write an Email */}
            {writingSubTask === "email" && (() => {
              const emailTask = testData.sections.writing.emailTask;
              const wordCount = emailText.trim() ? emailText.trim().split(/\s+/).length : 0;
              return (
                <div style={{ background: "rgba(30,41,59,0.7)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 20, padding: 28 }}>
                  <h3 style={{ fontSize: 18, fontWeight: 800, color: "#f59e0b", marginBottom: 12 }}>Task 2: Write an Email</h3>
                  
                  <div style={{ background: "#0f172a", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 12, padding: "12px 18px", marginBottom: 14, fontSize: 13, color: "#cbd5e1", display: "flex", flexDirection: "column", gap: 6 }}>
                    <div><strong style={{ color: "#38bdf8" }}>To:</strong> Academic Recipient</div>
                    <div><strong style={{ color: "#38bdf8" }}>Subject:</strong> Campus Inquiry / Request</div>
                  </div>

                  <div style={{ background: "#0f172a", padding: 20, borderRadius: 14, marginBottom: 20, fontSize: 14, lineHeight: 1.7, color: "#cbd5e1" }}>
                    {emailTask.scenario}
                  </div>

                  <textarea
                    rows={8}
                    placeholder="Write your email response here..."
                    value={emailText}
                    onChange={(e) => setEmailText(e.target.value)}
                    style={{ width: "100%", background: "#0f172a", border: "1px solid #3b82f6", borderRadius: 14, padding: 18, color: "#ffffff", fontSize: 15, lineHeight: 1.6, outline: "none", marginBottom: 14 }}
                  />

                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontSize: 13, color: wordCount >= 50 ? "#4ade80" : "#94a3b8" }}>
                      Word Count: {wordCount} (Suggested: 50+ words)
                    </span>
                    <button
                      onClick={() => setWritingSubTask("discussion")}
                      style={{ background: "#2563eb", color: "#ffffff", border: "none", borderRadius: 10, padding: "10px 24px", fontSize: 14, fontWeight: 800, cursor: "pointer" }}
                    >
                      Proceed to Academic Discussion →
                    </button>
                  </div>
                </div>
              );
            })()}

            {/* Academic Discussion */}
            {writingSubTask === "discussion" && (() => {
              const discTask = testData.sections.writing.discussionTask;
              const wordCount = discussionText.trim() ? discussionText.trim().split(/\s+/).length : 0;
              return (
                <div style={{ background: "rgba(30,41,59,0.7)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 20, padding: 28 }}>
                  <h3 style={{ fontSize: 18, fontWeight: 800, color: "#f59e0b", marginBottom: 12 }}>Task 3: Write for an Academic Discussion</h3>
                  
                  <div style={{ background: "#0f172a", padding: 20, borderRadius: 14, marginBottom: 20, fontSize: 14, lineHeight: 1.7, color: "#cbd5e1", display: "flex", flexDirection: "column", gap: 12 }}>
                    <div><strong>{discTask.professorPrompt}</strong></div>
                    <div style={{ borderLeft: "3px solid #3b82f6", paddingLeft: 12 }}>{discTask.student1}</div>
                    <div style={{ borderLeft: "3px solid #8b5cf6", paddingLeft: 12 }}>{discTask.student2}</div>
                  </div>

                  <textarea
                    rows={8}
                    placeholder="Express your position with supporting reasons..."
                    value={discussionText}
                    onChange={(e) => setDiscussionText(e.target.value)}
                    style={{ width: "100%", background: "#0f172a", border: "1px solid #3b82f6", borderRadius: 14, padding: 18, color: "#ffffff", fontSize: 15, lineHeight: 1.6, outline: "none", marginBottom: 14 }}
                  />

                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontSize: 13, color: wordCount >= 100 ? "#4ade80" : "#facc15" }}>
                      Word Count: {wordCount} (An effective response will contain at least 100 words.)
                    </span>
                    <button
                      onClick={handleNextSection}
                      style={{ background: "#10b981", color: "#ffffff", border: "none", borderRadius: 10, padding: "10px 24px", fontSize: 14, fontWeight: 800, cursor: "pointer" }}
                    >
                      Finish Writing &amp; Start Speaking →
                    </button>
                  </div>
                </div>
              );
            })()}
          </div>
        )}

        {/* 🎙️ SPEAKING SECTION VIEW */}
        {currentSection === "speaking" && (
          <div>
            <div style={{ display: "flex", gap: 10, marginBottom: 20 }}>
              <button
                onClick={() => setSpeakingSubTask("repeat")}
                style={{ background: speakingSubTask === "repeat" ? "#10b981" : "rgba(255,255,255,0.06)", color: "#ffffff", border: "none", borderRadius: 10, padding: "10px 18px", fontSize: 13, fontWeight: 800, cursor: "pointer" }}
              >
                Listen and Repeat (7 Tasks)
              </button>
              <button
                onClick={() => setSpeakingSubTask("interview")}
                style={{ background: speakingSubTask === "interview" ? "#10b981" : "rgba(255,255,255,0.06)", color: "#ffffff", border: "none", borderRadius: 10, padding: "10px 18px", fontSize: 13, fontWeight: 800, cursor: "pointer" }}
              >
                Take an Interview (4 Tasks)
              </button>
            </div>

            {/* Listen & Repeat */}
            {speakingSubTask === "repeat" && (() => {
              const currentRep = testData.sections.speaking.repeatTasks[repeatIndex];
              return (
                <div style={{ background: "rgba(30,41,59,0.7)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 20, padding: 28, textAlign: "center" }}>
                  <span style={{ background: "rgba(16,185,129,0.15)", color: "#10b981", padding: "4px 12px", borderRadius: 8, fontSize: 12, fontWeight: 800 }}>
                    Question #{repeatIndex + 1} of 7
                  </span>

                  <h3 style={{ fontSize: 20, fontWeight: 800, margin: "20px 0 14px 0" }}>Listen carefully and repeat the sentence.</h3>

                  <button
                    onClick={() => playAudioPrompt(currentRep.id, currentRep.audioText)}
                    style={{ background: "#10b981", color: "#ffffff", border: "none", borderRadius: "50%", width: 60, height: 60, display: "inline-flex", alignItems: "center", justifyContent: "center", cursor: "pointer", marginBottom: 20 }}
                  >
                    <Volume2 size={28} />
                  </button>

                  <div style={{ background: "rgba(15,23,42,0.6)", padding: 16, borderRadius: 14, fontSize: 14, color: "#94a3b8", maxWidth: 600, margin: "0 auto 24px", border: "1px dashed rgba(255,255,255,0.15)" }}>
                    🎧 Sentence audio prompt is hidden during test mode. Click Play to listen, then record your spoken repetition.
                  </div>

                  <div style={{ marginBottom: 24 }}>
                    {!isRecording ? (
                      <button
                        onClick={() => startAudioRecording(currentRep.id)}
                        style={{ background: "#ef4444", color: "#ffffff", border: "none", borderRadius: 12, padding: "14px 28px", fontSize: 15, fontWeight: 800, cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 8 }}
                      >
                        <Mic size={18} /> Start Recording ({currentRep.recordWindowSec}s Window)
                      </button>
                    ) : (
                      <button
                        onClick={stopAudioRecording}
                        style={{ background: "#22c55e", color: "#ffffff", border: "none", borderRadius: 12, padding: "14px 28px", fontSize: 15, fontWeight: 800, cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 8 }}
                      >
                        <Square size={18} /> Stop Recording
                      </button>
                    )}
                  </div>

                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <button
                      disabled={repeatIndex === 0}
                      onClick={() => setRepeatIndex(repeatIndex - 1)}
                      style={{ background: "rgba(255,255,255,0.08)", color: "#ffffff", border: "none", borderRadius: 10, padding: "10px 20px", fontSize: 14, fontWeight: 700 }}
                    >
                      ← Previous
                    </button>
                    {repeatIndex < 6 ? (
                      <button
                        onClick={() => setRepeatIndex(repeatIndex + 1)}
                        style={{ background: "#10b981", color: "#ffffff", border: "none", borderRadius: 10, padding: "10px 24px", fontSize: 14, fontWeight: 800, cursor: "pointer" }}
                      >
                        Next Sentence →
                      </button>
                    ) : (
                      <button
                        onClick={() => setSpeakingSubTask("interview")}
                        style={{ background: "#2563eb", color: "#ffffff", border: "none", borderRadius: 10, padding: "10px 24px", fontSize: 14, fontWeight: 800, cursor: "pointer" }}
                      >
                        Proceed to Interview Tasks →
                      </button>
                    )}
                  </div>
                </div>
              );
            })()}

            {/* Take an Interview */}
            {speakingSubTask === "interview" && (() => {
              const currentInt = testData.sections.speaking.interviewTasks[interviewIndex];
              return (
                <div style={{ background: "rgba(30,41,59,0.7)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 20, padding: 28 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16 }}>
                    <span style={{ fontSize: 13, color: "#10b981", fontWeight: 800 }}>
                      Interview Question #{interviewIndex + 1} of 4
                    </span>
                    <span style={{ fontSize: 13, color: "#94a3b8" }}>Response Window: 45 Seconds</span>
                  </div>

                  <h3 style={{ fontSize: 20, fontWeight: 800, color: "#ffffff", marginBottom: 16 }}>
                    {currentInt.questionText}
                  </h3>

                  <div style={{ display: "flex", gap: 12, marginBottom: 24 }}>
                    <button
                      onClick={() => playAudioPrompt(currentInt.id, currentInt.questionText)}
                      style={{ background: "rgba(56,189,248,0.15)", color: "#38bdf8", border: "1px solid rgba(56,189,248,0.3)", borderRadius: 10, padding: "10px 18px", fontSize: 13, fontWeight: 700, cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 6 }}
                    >
                      <Volume2 size={16} /> Play Interviewer Question
                    </button>
                  </div>

                  <div style={{ background: "#0f172a", padding: "18px 24px", borderRadius: 16, marginBottom: 24, border: "1px solid rgba(255,255,255,0.1)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <Mic size={20} color={isRecording ? "#ef4444" : "#10b981"} />
                      <span style={{ fontSize: 14, fontWeight: 700, color: "#cbd5e1" }}>Spoken Response Recording</span>
                    </div>
                    <span style={{ fontSize: 13, color: isRecording ? "#facc15" : spokenTranscripts[currentInt.id] ? "#4ade80" : "#94a3b8", fontWeight: 700 }}>
                      {isRecording ? "● Recording Active (Speak clearly into your microphone)" : spokenTranscripts[currentInt.id] ? "✓ Response Captured" : "Ready to Record"}
                    </span>
                  </div>

                  <div style={{ marginBottom: 24, textAlign: "center" }}>
                    {!isRecording ? (
                      <button
                        onClick={() => startAudioRecording(currentInt.id)}
                        style={{ background: "#ef4444", color: "#ffffff", border: "none", borderRadius: 12, padding: "14px 28px", fontSize: 15, fontWeight: 800, cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 8 }}
                      >
                        <Mic size={18} /> Record Response (45s Window)
                      </button>
                    ) : (
                      <button
                        onClick={stopAudioRecording}
                        style={{ background: "#22c55e", color: "#ffffff", border: "none", borderRadius: 12, padding: "14px 28px", fontSize: 15, fontWeight: 800, cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 8 }}
                      >
                        <Square size={18} /> Stop Recording
                      </button>
                    )}
                  </div>

                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <button
                      disabled={interviewIndex === 0}
                      onClick={() => setInterviewIndex(interviewIndex - 1)}
                      style={{ background: "rgba(255,255,255,0.08)", color: "#ffffff", border: "none", borderRadius: 10, padding: "10px 20px", fontSize: 14, fontWeight: 700 }}
                    >
                      ← Previous Question
                    </button>
                    {interviewIndex < 3 ? (
                      <button
                        onClick={() => setInterviewIndex(interviewIndex + 1)}
                        style={{ background: "#10b981", color: "#ffffff", border: "none", borderRadius: 10, padding: "10px 24px", fontSize: 14, fontWeight: 800, cursor: "pointer" }}
                      >
                        Next Question →
                      </button>
                    ) : (
                      <button
                        onClick={finishAndEvaluateExam}
                        style={{ background: "linear-gradient(135deg, #7c3aed, #2563eb)", color: "#ffffff", border: "none", borderRadius: 10, padding: "12px 28px", fontSize: 15, fontWeight: 800, cursor: "pointer" }}
                      >
                        Submit &amp; Evaluate Entire Exam 🚀
                      </button>
                    )}
                  </div>
                </div>
              );
            })()}
          </div>
        )}

      </div>
    </div>
  );
}
