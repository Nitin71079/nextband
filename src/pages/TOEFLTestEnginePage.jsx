import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Clock, Volume2, VolumeX, ArrowRight, ArrowLeft, Play, Pause,
  Mic, Square, CheckCircle2, AlertCircle, RefreshCw, Sparkles,
  BookOpen, Headphones, PenTool, Layers
} from "lucide-react";
import toast from "react-hot-toast";
import { toeflTests } from "../data/toefl/toeflTests";
import {
  evaluateCompleteTheWords,
  evaluateBuildASentence,
  rawToBandScore,
  calculateToeflOverallScore
} from "../utils/toeflScoreCalculator";
import { evaluateTOEFLWritingAI, evaluateTOEFLSpeakingAI } from "../services/evaluateTOEFLGPT";

export default function TOEFLTestEnginePage() {
  const { testId } = useParams();
  const navigate = useNavigate();

  const testData = toeflTests.find((t) => t.id === testId) || toeflTests[0];

  // Exam Stage Flow: "reading" -> "listening" -> "writing" -> "speaking" -> "evaluating"
  const [currentSection, setCurrentSection] = useState("reading");
  const [readingStage, setReadingStage] = useState("router"); // "router" | "stage2"
  const [listeningStage, setListeningStage] = useState("router");

  // Timer state (seconds)
  const [timeLeft, setTimeLeft] = useState(30 * 60);
  const [hideTime, setHideTime] = useState(false);

  // 📖 Reading State
  const [cwUserInputs, setCwUserInputs] = useState({}); // { itemId: ["ded", "wed"] }
  const [mcqUserAnswers, setMcqUserAnswers] = useState({}); // { qId: optionIndex }
  const [readingModuleItems, setReadingModuleItems] = useState(testData.sections.reading.routerModule);
  const [readingItemIndex, setReadingItemIndex] = useState(0);
  const [readingRouterScore, setReadingRouterScore] = useState(null);

  // 🎧 Listening State
  const [listeningModuleItems, setListeningModuleItems] = useState(testData.sections.listening.routerModule);
  const [listeningItemIndex, setListeningItemIndex] = useState(0);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [listeningAnswers, setListeningAnswers] = useState({});
  const [listeningRouterScore, setListeningRouterScore] = useState(null);

  // ✍️ Writing State
  const [writingSubTask, setWritingSubTask] = useState("bs"); // "bs" (build sentence) | "email" | "discussion"
  const [bsIndex, setBsIndex] = useState(0);
  const [bsUserSentences, setBsUserSentences] = useState({}); // { itemIndex: [words] }
  const [emailText, setEmailText] = useState("");
  const [discussionText, setDiscussionText] = useState("");

  // 🎙️ Speaking State
  const [speakingSubTask, setSpeakingSubTask] = useState("repeat"); // "repeat" | "interview"
  const [repeatIndex, setRepeatIndex] = useState(0);
  const [interviewIndex, setInterviewIndex] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [spokenTranscripts, setSpokenTranscripts] = useState({}); // { taskId: text }
  const mediaRecorderRef = useRef(null);

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

  // Speak audio text using Web Speech API synthesis
  function playAudioPrompt(text) {
    if (!("speechSynthesis" in window)) {
      toast.error("Audio playback not supported in this browser.");
      return;
    }
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.95;
    utterance.pitch = 1.0;
    utterance.onstart = () => setIsPlayingAudio(true);
    utterance.onend = () => setIsPlayingAudio(false);
    utterance.onerror = () => setIsPlayingAudio(false);
    window.speechSynthesis.speak(utterance);
  }

  // MediaRecorder handlers for Speaking tasks
  function startAudioRecording(taskId) {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      toast.error("Microphone access is not supported.");
      return;
    }
    navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
      mediaRecorderRef.current = new MediaRecorder(stream);
      mediaRecorderRef.current.start();
      setIsRecording(true);
      toast.success("🎤 Recording audio response...");

      mediaRecorderRef.current.ondataavailable = (e) => {
        // Mock transcript generator for simulation
        const mockResponse = "The campus library and facilities provide excellent study environments for students.";
        setSpokenTranscripts((prev) => ({ ...prev, [taskId]: mockResponse }));
      };
    }).catch((err) => {
      toast.error("Microphone permission denied.");
    });
  }

  function stopAudioRecording() {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      toast.success("✓ Recording saved.");
    }
  }

  // ---------------------------------------------------------------------------
  // SECTION TRANSITION LOGIC
  // ---------------------------------------------------------------------------
  function handleNextSection() {
    window.speechSynthesis.cancel();
    if (currentSection === "reading") {
      if (readingStage === "router") {
        // Calculate Router score & adapt to Upper or Lower module
        let correctCount = 0;
        readingModuleItems.forEach((item) => {
          if (item.type === "complete_words") {
            const res = evaluateCompleteTheWords(cwUserInputs[item.id] || [], item.missingParts);
            correctCount += res.correct;
          } else if (item.questions) {
            item.questions.forEach((q) => {
              if (mcqUserAnswers[q.id] === q.correctAnswer) correctCount++;
            });
          }
        });
        setReadingRouterScore(correctCount);
        // Adaptive threshold: >= 4 correct -> Upper Module, else Lower Module
        if (correctCount >= 4) {
          setReadingModuleItems(testData.sections.reading.upperModule);
          toast.success("🧠 Reading Router Performance Strong! Loading Upper Difficulty Module.");
        } else {
          setReadingModuleItems(testData.sections.reading.lowerModule);
          toast.info("📘 Loading Stage 2 Reading Module.");
        }
        setReadingStage("stage2");
        setReadingItemIndex(0);
      } else {
        // Move to Listening
        setCurrentSection("listening");
        setTimeLeft(29 * 60);
        toast.success("🎧 Moving to Listening Section.");
      }
    } else if (currentSection === "listening") {
      if (listeningStage === "router") {
        let correctCount = 0;
        listeningModuleItems.forEach((item) => {
          if (item.questions) {
            item.questions.forEach((q) => {
              if (listeningAnswers[q.id] === q.correctAnswer) correctCount++;
            });
          } else if (item.correctAnswer !== undefined) {
            if (listeningAnswers[item.id] === item.correctAnswer) correctCount++;
          }
        });
        setListeningRouterScore(correctCount);
        if (correctCount >= 2) {
          setListeningModuleItems(testData.sections.listening.upperModule);
          toast.success("🧠 Listening Router Strong! Loading Upper Module.");
        } else {
          setListeningModuleItems(testData.sections.listening.lowerModule);
          toast.info("🎧 Loading Stage 2 Listening Module.");
        }
        setListeningStage("stage2");
        setListeningItemIndex(0);
      } else {
        // Move to Writing
        setCurrentSection("writing");
        setTimeLeft(23 * 60);
        toast.success("✍️ Moving to Writing Section.");
      }
    } else if (currentSection === "writing") {
      // Move to Speaking
      setCurrentSection("speaking");
      setTimeLeft(8 * 60);
      toast.success("🎙️ Moving to Speaking Section.");
    } else if (currentSection === "speaking") {
      // Complete Exam & Run AI Evaluations
      finishAndEvaluateExam();
    }
  }

  // ---------------------------------------------------------------------------
  // FINAL SCORE EVALUATION
  // ---------------------------------------------------------------------------
  async function finishAndEvaluateExam() {
    setCurrentSection("evaluating");
    setIsEvaluating(true);

    // 1. Reading Score Calculation (1.0 - 6.0)
    let rTotal = 0;
    let rCorrect = 0;
    testData.sections.reading.routerModule.forEach((item) => {
      if (item.type === "complete_words") {
        const res = evaluateCompleteTheWords(cwUserInputs[item.id] || [], item.missingParts);
        rTotal += res.total;
        rCorrect += res.correct;
      } else if (item.questions) {
        item.questions.forEach((q) => {
          rTotal++;
          if (mcqUserAnswers[q.id] === q.correctAnswer) rCorrect++;
        });
      }
    });
    const readingBand = rawToBandScore(rCorrect, rTotal);

    // 2. Listening Score Calculation (1.0 - 6.0)
    let lTotal = 0;
    let lCorrect = 0;
    testData.sections.listening.routerModule.forEach((item) => {
      if (item.questions) {
        item.questions.forEach((q) => {
          lTotal++;
          if (listeningAnswers[q.id] === q.correctAnswer) lCorrect++;
        });
      } else if (item.correctAnswer !== undefined) {
        lTotal++;
        if (listeningAnswers[item.id] === item.correctAnswer) lCorrect++;
      }
    });
    const listeningBand = rawToBandScore(lCorrect, lTotal);

    // 3. Writing Score Calculation (Build a Sentence + AI Email + AI Discussion)
    let bsCorrect = 0;
    testData.sections.writing.buildSentenceItems.forEach((item, idx) => {
      const userArr = bsUserSentences[idx] || [];
      if (evaluateBuildASentence(userArr.join(" "), item.targetSentence)) {
        bsCorrect++;
      }
    });

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

    const bsBand = rawToBandScore(bsCorrect, 10);
    const writingBand = Math.round(((bsBand + emailEval.bandScore + discEval.bandScore) / 3) * 2) / 2;

    // 4. Speaking Score Calculation (AI Evaluation for Interview)
    const intTask = testData.sections.speaking.interviewTasks[0];
    const spokenTranscript = spokenTranscripts[intTask.id] || "The university environment helps students develop time management and academic skills.";

    const speakingEval = await evaluateTOEFLSpeakingAI({
      taskType: "interview",
      prompt: intTask.questionText,
      spokenText: spokenTranscript,
      durationSeconds: 45,
    });
    const speakingBand = speakingEval.bandScore;

    // Overall Score Calculation
    const overallScore = calculateToeflOverallScore(readingBand, listeningBand, writingBand, speakingBand);

    const resultObj = {
      testId,
      date: new Date().toISOString(),
      overallScore,
      readingBand,
      listeningBand,
      writingBand,
      speakingBand,
      writingFeedback: { email: emailEval, discussion: discEval },
      speakingFeedback: speakingEval,
    };

    localStorage.setItem(`toefl_result_${testId}`, JSON.stringify(resultObj));
    setIsEvaluating(false);
    navigate(`/toefl/results/${testId}`);
  }

  // Render loading screen during final evaluation
  if (currentSection === "evaluating" || isEvaluating) {
    return (
      <div style={{ minHeight: "100vh", background: "#0f172a", color: "#ffffff", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "24px", textAlign: "center" }}>
        <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 2, ease: "linear" }} style={{ marginBottom: 24 }}>
          <Sparkles size={56} color="#c084fc" />
        </motion.div>
        <h1 style={{ fontSize: "28px", fontWeight: 900, marginBottom: 12 }}>Evaluating Your 2026 TOEFL iBT Exam</h1>
        <p style={{ color: "#94a3b8", fontSize: "16px", maxWidth: "500px" }}>
          Running Groq AI Scoring Engine on Writing tasks &amp; Speaking responses...
        </p>
      </div>
    );
  }

  const currentReadingItem = readingModuleItems[readingItemIndex] || readingModuleItems[0];
  const currentListeningItem = listeningModuleItems[listeningItemIndex] || listeningModuleItems[0];

  return (
    <div style={{ minHeight: "100vh", background: "#0f172a", color: "#ffffff", fontFamily: "Inter, sans-serif", display: "flex", flexDirection: "column" }}>

      {/* ── TOP EXAM TOOLBAR ── */}
      <div style={{ background: "#1e293b", borderBottom: "1px solid rgba(255,255,255,0.1)", padding: "12px 24px", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{ fontSize: "16px", fontWeight: 900, color: "#c084fc", letterSpacing: "0.5px" }}>
            TOEFL iBT 2026
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
                }}
              >
                {sec}
              </span>
            ))}
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <button
            onClick={() => setHideTime(!hideTime)}
            style={{ background: "rgba(255,255,255,0.08)", color: "#cbd5e1", border: "none", borderRadius: 8, padding: "6px 12px", fontSize: 12, fontWeight: 700, cursor: "pointer" }}
          >
            {hideTime ? "Show Time" : "Hide Time"}
          </button>
          {!hideTime && (
            <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 16, fontWeight: 800, color: "#facc15" }}>
              <Clock size={18} /> {formatTime(timeLeft)}
            </div>
          )}
          <button
            onClick={handleNextSection}
            style={{ background: "#2563eb", color: "#ffffff", border: "none", borderRadius: 10, padding: "8px 18px", fontSize: 13, fontWeight: 800, cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 6 }}
          >
            Next Section <ArrowRight size={16} />
          </button>
        </div>
      </div>

      {/* ── EXAM WORKSPACE ── */}
      <div style={{ flex: 1, padding: "24px", maxWidth: "1100px", margin: "0 auto", width: "100%" }}>

        {/* 📖 READING SECTION VIEW */}
        {currentSection === "reading" && currentReadingItem && (
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
              <span style={{ fontSize: 13, color: "#38bdf8", fontWeight: 800 }}>
                Stage: {readingStage === "router" ? "Stage 1 (Router Module)" : "Stage 2 (Adaptive Module)"}
              </span>
              <span style={{ fontSize: 13, color: "#94a3b8" }}>
                Item {readingItemIndex + 1} of {readingModuleItems.length}
              </span>
            </div>

            {/* Task Type A: Complete the Words */}
            {currentReadingItem.type === "complete_words" && (
              <div style={{ background: "rgba(30,41,59,0.7)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 20, padding: 28 }}>
                <h3 style={{ fontSize: 18, fontWeight: 800, color: "#c084fc", marginBottom: 12 }}>
                  Task 1: Complete the Words
                </h3>
                <p style={{ color: "#94a3b8", fontSize: 14, marginBottom: 20 }}>
                  {currentReadingItem.instruction}
                </p>

                <div style={{ background: "#0f172a", padding: 24, borderRadius: 16, border: "1px solid rgba(255,255,255,0.08)", fontSize: 16, lineHeight: 1.8, color: "#e2e8f0", marginBottom: 24 }}>
                  {currentReadingItem.passageText}
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                  <div style={{ fontSize: 14, fontWeight: 700, color: "#cbd5e1" }}>Type the missing word endings:</div>
                  {currentReadingItem.missingParts.map((part, idx) => {
                    const currentArr = cwUserInputs[currentReadingItem.id] || [];
                    return (
                      <div key={idx} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                        <span style={{ fontSize: 14, color: "#94a3b8" }}>Fragment #{idx + 1}:</span>
                        <input
                          type="text"
                          placeholder={currentReadingItem.hints[idx]}
                          value={currentArr[idx] || ""}
                          onChange={(e) => {
                            const val = e.target.value;
                            const newArr = [...currentArr];
                            newArr[idx] = val;
                            setCwUserInputs({ ...cwUserInputs, [currentReadingItem.id]: newArr });
                          }}
                          style={{ background: "#1e293b", border: "1px solid #3b82f6", borderRadius: 10, padding: "10px 16px", color: "#ffffff", fontSize: 15, fontWeight: 700, width: 220, outline: "none" }}
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Task Type B & C: Read in Daily Life / Read Academic Passage */}
            {(currentReadingItem.type === "read_daily_life" || currentReadingItem.type === "read_academic") && (
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
                {/* Passage Column */}
                <div style={{ background: "rgba(30,41,59,0.7)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 20, padding: 24 }}>
                  {currentReadingItem.stimulusFormat && (
                    <span style={{ background: "rgba(56,189,248,0.15)", color: "#38bdf8", padding: "4px 12px", borderRadius: 8, fontSize: 12, fontWeight: 800 }}>
                      {currentReadingItem.stimulusFormat}
                    </span>
                  )}
                  <h3 style={{ fontSize: 18, fontWeight: 800, margin: "12px 0 14px 0", color: "#ffffff" }}>
                    {currentReadingItem.passageTitle || "Reading Stimulus"}
                  </h3>
                  <div style={{ fontSize: 14, lineHeight: 1.7, color: "#cbd5e1", whiteSpace: "pre-line" }}>
                    {currentReadingItem.passageText}
                  </div>
                </div>

                {/* Question Column */}
                <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                  {currentReadingItem.questions?.map((q) => (
                    <div key={q.id} style={{ background: "rgba(30,41,59,0.7)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 20, padding: 20 }}>
                      <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 14, color: "#ffffff" }}>
                        {q.questionText}
                      </div>
                      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                        {q.options.map((opt, oIdx) => {
                          const isSelected = mcqUserAnswers[q.id] === oIdx;
                          return (
                            <button
                              key={oIdx}
                              onClick={() => setMcqUserAnswers({ ...mcqUserAnswers, [q.id]: oIdx })}
                              style={{
                                textAlign: "left",
                                background: isSelected ? "rgba(124,58,237,0.25)" : "#0f172a",
                                border: isSelected ? "2px solid #a855f7" : "1px solid rgba(255,255,255,0.08)",
                                borderRadius: 12,
                                padding: "12px 16px",
                                color: "#ffffff",
                                fontSize: 14,
                                cursor: "pointer",
                                transition: "all 0.15s ease",
                              }}
                            >
                              {opt}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Reading Pagination */}
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
                  {readingStage === "router" ? "Complete Stage 1 →" : "Finish Reading Section →"}
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
                Task: {currentListeningItem.type.replace(/_/g, " ").toUpperCase()}
              </span>
              <span style={{ fontSize: 13, color: "#94a3b8" }}>
                Item {listeningItemIndex + 1} of {listeningModuleItems.length}
              </span>
            </div>

            {/* Audio Control Bar */}
            <div style={{ background: "#0f172a", borderRadius: 16, padding: 20, marginBottom: 24, display: "flex", alignItems: "center", gap: 16 }}>
              <button
                onClick={() => playAudioPrompt(currentListeningItem.audioText)}
                disabled={isPlayingAudio}
                style={{ background: "#8b5cf6", color: "#ffffff", border: "none", borderRadius: "50%", width: 50, height: 50, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}
              >
                <Volume2 size={24} />
              </button>
              <div>
                <div style={{ fontSize: 15, fontWeight: 800, color: "#ffffff" }}>
                  {isPlayingAudio ? "Playing Spoken Audio..." : "Click Play to Listen"}
                </div>
                <div style={{ fontSize: 12, color: "#94a3b8" }}>Audio is played once during official test</div>
              </div>
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
                  {listeningStage === "router" ? "Complete Listening Stage 1 →" : "Finish Listening Section →"}
                </button>
              )}
            </div>
          </div>
        )}

        {/* ✍️ WRITING SECTION VIEW */}
        {currentSection === "writing" && (
          <div>
            {/* Writing Subtask Tabs */}
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
                Write an Email (1 Task)
              </button>
              <button
                onClick={() => setWritingSubTask("discussion")}
                style={{ background: writingSubTask === "discussion" ? "#f59e0b" : "rgba(255,255,255,0.06)", color: "#ffffff", border: "none", borderRadius: 10, padding: "10px 18px", fontSize: 13, fontWeight: 800, cursor: "pointer" }}
              >
                Academic Discussion (1 Task)
              </button>
            </div>

            {/* Task 1: Build a Sentence */}
            {writingSubTask === "bs" && (() => {
              const currentBs = testData.sections.writing.buildSentenceItems[bsIndex];
              const chosenWords = bsUserSentences[bsIndex] || [];
              return (
                <div style={{ background: "rgba(30,41,59,0.7)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 20, padding: 28 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 14 }}>
                    <span style={{ fontSize: 13, color: "#f59e0b", fontWeight: 800 }}>Sentence #{bsIndex + 1} of 10 ({currentBs.difficulty})</span>
                  </div>
                  <h3 style={{ fontSize: 18, fontWeight: 800, marginBottom: 16 }}>Arrange the scrambled phrases to construct a correct sentence:</h3>

                  {/* Constructed Sentence Box */}
                  <div style={{ background: "#0f172a", border: "2px dashed #f59e0b", borderRadius: 16, padding: 20, minHeight: 60, marginBottom: 20, display: "flex", flexWrap: "wrap", gap: 10, alignItems: "center" }}>
                    {chosenWords.length === 0 ? (
                      <span style={{ color: "#64748b", fontSize: 14 }}>Click the word chips below in correct order...</span>
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

                  {/* Word Chips */}
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

            {/* Task 2: Write an Email */}
            {writingSubTask === "email" && (() => {
              const emailTask = testData.sections.writing.emailTask;
              const wordCount = emailText.trim() ? emailText.trim().split(/\s+/).length : 0;
              return (
                <div style={{ background: "rgba(30,41,59,0.7)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 20, padding: 28 }}>
                  <h3 style={{ fontSize: 18, fontWeight: 800, color: "#f59e0b", marginBottom: 12 }}>Task 2: Write an Email</h3>
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

            {/* Task 3: Write for Academic Discussion */}
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
                    <span style={{ fontSize: 13, color: wordCount >= 80 ? "#4ade80" : "#94a3b8" }}>
                      Word Count: {wordCount} (Suggested: 80+ words)
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
                Listen &amp; Repeat (7 Tasks)
              </button>
              <button
                onClick={() => setSpeakingSubTask("interview")}
                style={{ background: speakingSubTask === "interview" ? "#10b981" : "rgba(255,255,255,0.06)", color: "#ffffff", border: "none", borderRadius: 10, padding: "10px 18px", fontSize: 13, fontWeight: 800, cursor: "pointer" }}
              >
                Take an Interview (4 Tasks)
              </button>
            </div>

            {/* Task 1: Listen & Repeat */}
            {speakingSubTask === "repeat" && (() => {
              const currentRep = testData.sections.speaking.repeatTasks[repeatIndex];
              return (
                <div style={{ background: "rgba(30,41,59,0.7)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 20, padding: 28, textAlign: "center" }}>
                  <span style={{ background: "rgba(16,185,129,0.15)", color: "#10b981", padding: "4px 12px", borderRadius: 8, fontSize: 12, fontWeight: 800 }}>
                    Sentence #{repeatIndex + 1} of 7 ({currentRep.level})
                  </span>

                  <h3 style={{ fontSize: 22, fontWeight: 800, margin: "20px 0 14px 0" }}>Listen to the sentence and repeat it accurately:</h3>

                  <button
                    onClick={() => playAudioPrompt(currentRep.audioText)}
                    style={{ background: "#10b981", color: "#ffffff", border: "none", borderRadius: "50%", width: 60, height: 60, display: "inline-flex", alignItems: "center", justifyContent: "center", cursor: "pointer", marginBottom: 20 }}
                  >
                    <Volume2 size={28} />
                  </button>

                  <div style={{ background: "#0f172a", padding: 20, borderRadius: 14, fontSize: 18, fontWeight: 700, color: "#38bdf8", maxWidth: 600, margin: "0 auto 24px" }}>
                    "{currentRep.audioText}"
                  </div>

                  <div style={{ marginBottom: 24 }}>
                    {!isRecording ? (
                      <button
                        onClick={() => startAudioRecording(currentRep.id)}
                        style={{ background: "#ef4444", color: "#ffffff", border: "none", borderRadius: 12, padding: "14px 28px", fontSize: 15, fontWeight: 800, cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 8 }}
                      >
                        <Mic size={18} /> Start Recording ({currentRep.recordWindowSec}s)
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

            {/* Task 2: Take an Interview */}
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
                      onClick={() => playAudioPrompt(currentInt.questionText)}
                      style={{ background: "rgba(56,189,248,0.15)", color: "#38bdf8", border: "1px solid rgba(56,189,248,0.3)", borderRadius: 10, padding: "10px 18px", fontSize: 13, fontWeight: 700, cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 6 }}
                    >
                      <Volume2 size={16} /> Listen to Question
                    </button>
                  </div>

                  <div style={{ background: "#0f172a", padding: 20, borderRadius: 14, marginBottom: 24 }}>
                    <div style={{ fontSize: 14, fontWeight: 700, color: "#cbd5e1", marginBottom: 8 }}>Spoken Response Transcript:</div>
                    <div style={{ fontSize: 15, color: spokenTranscripts[currentInt.id] ? "#4ade80" : "#64748b" }}>
                      {spokenTranscripts[currentInt.id] || "No recording captured yet."}
                    </div>
                  </div>

                  <div style={{ marginBottom: 24, textAlign: "center" }}>
                    {!isRecording ? (
                      <button
                        onClick={() => startAudioRecording(currentInt.id)}
                        style={{ background: "#ef4444", color: "#ffffff", border: "none", borderRadius: 12, padding: "14px 28px", fontSize: 15, fontWeight: 800, cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 8 }}
                      >
                        <Mic size={18} /> Record Answer (45s)
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
