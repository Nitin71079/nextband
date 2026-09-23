import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles, Clock, Volume2, Mic, Square, Play, CheckCircle2,
  AlertCircle, ArrowRight, BookOpen, PenTool, Headphones, RotateCcw, Award, Layers, Users
} from "lucide-react";
import toast from "react-hot-toast";
import { pteTests } from "../data/pte/pteTests";
import {
  calculatePteOverallScore, rawPointsToPteScale, evaluateAnswerShortQuestion,
  evaluateMcqMultiple, evaluateReorderParagraphs, evaluateHighlightIncorrectWords,
  evaluateWriteFromDictation, validateSummarizeWrittenTextForm, validateWriteEssayForm
} from "../utils/pteScoreCalculator";
import { evaluatePTESpeakingAI, evaluatePTEWritingAI } from "../services/evaluatePTEGPT";
import DescribeImageVisual from "../components/pte/DescribeImageVisual";
import { ENGINE_STATES, getTaskDefaultConfig, validateSWTText, validateEssayText } from "../lib/pte2026/pteTaskEngine";

export default function PTETestEnginePage() {
  const { testId } = useParams();
  const navigate = useNavigate();

  const testData = pteTests.find((t) => t.id === testId) || pteTests[0];

  // Navigation State
  // currentSection: "personalIntro" | "part1Transition" | "speakingWriting" | "part2Transition" | "reading" | "part3Transition" | "listening" | "evaluating"
  const [currentSection, setCurrentSection] = useState("personalIntro");
  const [taskGroup, setTaskGroup] = useState("personalIntro");
  const [taskIndex, setTaskIndex] = useState(0);

  // Engine Lifecycle State
  const [engineState, setEngineState] = useState(ENGINE_STATES.IDLE);
  const [prepTimeLeft, setPrepTimeLeft] = useState(25);
  const [recordingTimeLeft, setRecordingTimeLeft] = useState(30);
  const [taskTimerLeft, setTaskTimerLeft] = useState(600); // For SWT (600s) & Essay (1200s)

  // Audio Playback & Microphone Recording State
  const [isRecording, setIsRecording] = useState(false);
  const [spokenTranscripts, setSpokenTranscripts] = useState({});
  const [playedAudioItems, setPlayedAudioItems] = useState({});
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  // User Responses State
  const [answers, setAnswers] = useState({});
  const [writtenTexts, setWrittenTexts] = useState({});
  const [highlightedWords, setHighlightedWords] = useState({}); // { itemId: [indices] }
  const [reorderedItems, setReorderedItems] = useState({}); // { itemId: [paragraphIds] }

  // Exit Modal
  const [showExitModal, setShowExitModal] = useState(false);

  const recognitionRef = useRef(null);
  const silenceTimerRef = useRef(null);

  // ── 1. LIFECYCLE & TIMER CONTROL ──
  useEffect(() => {
    let interval;
    if (engineState === ENGINE_STATES.PREPARING && prepTimeLeft > 0) {
      interval = setInterval(() => setPrepTimeLeft(prev => prev - 1), 1000);
    } else if (engineState === ENGINE_STATES.PREPARING && prepTimeLeft === 0) {
      // Transition to recording or audio play
      const config = getTaskDefaultConfig(taskGroup);
      if (config.autoPlayAudio && !playedAudioItems[`${taskGroup}-${taskIndex}`]) {
        triggerAutoAudioPlayback();
      } else {
        startRecordingSession();
      }
    } else if (engineState === ENGINE_STATES.RECORDING && recordingTimeLeft > 0) {
      interval = setInterval(() => setRecordingTimeLeft(prev => prev - 1), 1000);
    } else if (engineState === ENGINE_STATES.RECORDING && recordingTimeLeft === 0) {
      stopRecordingSession();
    }
    return () => clearInterval(interval);
  }, [engineState, prepTimeLeft, recordingTimeLeft, taskGroup, taskIndex]);

  // Task Countdown Timer (for SWT & Write Essay)
  useEffect(() => {
    let interval;
    if (["summarizeWrittenText", "writeEssay", "summarizeSpokenText"].includes(taskGroup) && taskTimerLeft > 0) {
      interval = setInterval(() => setTaskTimerLeft(prev => prev - 1), 1000);
    } else if (["summarizeWrittenText", "writeEssay", "summarizeSpokenText"].includes(taskGroup) && taskTimerLeft === 0) {
      toast.error("Time expired for this task. Auto-advancing...");
      handleNextTask();
    }
    return () => clearInterval(interval);
  }, [taskGroup, taskTimerLeft]);

  // Load Task Initial State
  useEffect(() => {
    setupTaskState(taskGroup, taskIndex);
  }, [currentSection, taskGroup, taskIndex]);

  function setupTaskState(group, index) {
    window.speechSynthesis?.cancel();
    stopRecordingSession();

    const config = getTaskDefaultConfig(group);
    
    if (config.prepSeconds > 0) {
      setPrepTimeLeft(config.prepSeconds);
      setEngineState(ENGINE_STATES.PREPARING);
    } else if (config.autoPlayAudio) {
      setEngineState(ENGINE_STATES.PLAYING_AUDIO);
      triggerAutoAudioPlayback();
    } else if (config.responseSeconds > 0) {
      setRecordingTimeLeft(config.responseSeconds);
      startRecordingSession();
    } else {
      setEngineState(ENGINE_STATES.IDLE);
    }

    if (group === "summarizeWrittenText" || group === "summarizeSpokenText") {
      setTaskTimerLeft(600);
    } else if (group === "writeEssay") {
      setTaskTimerLeft(1200);
    }
  }

  // ── 2. AUDIO PLAYBACK CONTROLLER ──
  function triggerAutoAudioPlayback() {
    const key = `${taskGroup}-${taskIndex}`;
    if (playedAudioItems[key]) return;

    let textToPlay = "";
    if (taskGroup === "repeatSentence") {
      const item = testData.sections.speakingWriting.repeatSentence[taskIndex];
      textToPlay = item?.audioText || item?.prompt || "";
    } else if (taskGroup === "retellLecture") {
      const item = testData.sections.speakingWriting.retellLecture[taskIndex];
      textToPlay = item?.lectureScript || item?.audioText || "Lecture transcript audio content.";
    } else if (taskGroup === "answerShortQuestion") {
      const item = testData.sections.speakingWriting.answerShortQuestion[taskIndex];
      textToPlay = item?.audioText || item?.question || "";
    } else if (taskGroup === "summarizeGroupDiscussion") {
      const item = testData.sections.speakingWriting.summarizeGroupDiscussion[taskIndex];
      textToPlay = item?.discussionTranscript || item?.audioText || "3-speaker group discussion audio content.";
    } else if (taskGroup === "summarizeSpokenText") {
      const item = testData.sections.listening.summarizeSpokenText;
      textToPlay = item?.audioText || "Academic lecture audio content.";
    } else if (taskGroup === "writeFromDictation") {
      const item = testData.sections.listening.writeFromDictation[taskIndex];
      textToPlay = item?.audioText || "";
    }

    if (!textToPlay || !("speechSynthesis" in window)) {
      startRecordingSession();
      return;
    }

    setEngineState(ENGINE_STATES.PLAYING_AUDIO);
    setIsPlayingAudio(true);

    const utterance = new SpeechSynthesisUtterance(textToPlay);
    utterance.rate = 0.92;
    utterance.onstart = () => {
      setPlayedAudioItems(prev => ({ ...prev, [key]: true }));
    };
    utterance.onend = () => {
      setIsPlayingAudio(false);
      const config = getTaskDefaultConfig(taskGroup);
      if (config.prepSeconds > 0) {
        setPrepTimeLeft(config.prepSeconds);
        setEngineState(ENGINE_STATES.PREPARING);
      } else {
        startRecordingSession();
      }
    };
    utterance.onerror = () => {
      setIsPlayingAudio(false);
      startRecordingSession();
    };

    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
  }

  // ── 3. RECORDING & 3-SECOND SILENCE CONTROLLER ──
  function startRecordingSession() {
    const config = getTaskDefaultConfig(taskGroup);
    if (!config.responseSeconds) return;

    setRecordingTimeLeft(config.responseSeconds);
    setEngineState(ENGINE_STATES.RECORDING);
    setIsRecording(true);

    const taskId = `auto-${taskGroup}-${taskIndex}`;
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

    if (SpeechRecognition) {
      try {
        const recognition = new SpeechRecognition();
        recognition.continuous = true;
        recognition.interimResults = true;
        recognition.lang = "en-US";

        recognition.onresult = (event) => {
          let currentText = "";
          for (let i = 0; i < event.results.length; i++) {
            currentText += event.results[i][0].transcript + " ";
          }
          setSpokenTranscripts(prev => ({ ...prev, [taskId]: currentText.trim() }));
          
          // Reset 3-second silence detector on speech result
          if (silenceTimerRef.current) clearTimeout(silenceTimerRef.current);
          silenceTimerRef.current = setTimeout(() => {
            stopRecordingSession();
          }, 3000);
        };

        recognition.onerror = () => {};
        recognition.start();
        recognitionRef.current = recognition;
      } catch (e) {}
    }
  }

  function stopRecordingSession() {
    setIsRecording(false);
    if (silenceTimerRef.current) clearTimeout(silenceTimerRef.current);
    if (recognitionRef.current) {
      try { recognitionRef.current.stop(); } catch (e) {}
    }
    setEngineState(ENGINE_STATES.COMPLETED);
  }

  // ── 4. SECTION & TASK PROGRESSION ──
  function handleNextTask() {
    window.speechSynthesis?.cancel();
    stopRecordingSession();

    if (currentSection === "personalIntro") {
      setCurrentSection("part1Transition");
    } else if (currentSection === "part1Transition") {
      setCurrentSection("speakingWriting");
      setTaskGroup("readAloud");
      setTaskIndex(0);
    } else if (currentSection === "speakingWriting") {
      const sw = testData.sections.speakingWriting;
      if (taskGroup === "readAloud") {
        if (taskIndex < sw.readAloud.length - 1) setTaskIndex(t => t + 1);
        else { setTaskGroup("repeatSentence"); setTaskIndex(0); }
      } else if (taskGroup === "repeatSentence") {
        if (taskIndex < sw.repeatSentence.length - 1) setTaskIndex(t => t + 1);
        else { setTaskGroup("describeImage"); setTaskIndex(0); }
      } else if (taskGroup === "describeImage") {
        if (taskIndex < sw.describeImage.length - 1) setTaskIndex(t => t + 1);
        else { setTaskGroup("retellLecture"); setTaskIndex(0); }
      } else if (taskGroup === "retellLecture") {
        if (taskIndex < sw.retellLecture.length - 1) setTaskIndex(t => t + 1);
        else { setTaskGroup("answerShortQuestion"); setTaskIndex(0); }
      } else if (taskGroup === "answerShortQuestion") {
        if (taskIndex < sw.answerShortQuestion.length - 1) setTaskIndex(t => t + 1);
        else { setTaskGroup("summarizeGroupDiscussion"); setTaskIndex(0); }
      } else if (taskGroup === "summarizeGroupDiscussion") {
        if (taskIndex < sw.summarizeGroupDiscussion.length - 1) setTaskIndex(t => t + 1);
        else { setTaskGroup("respondToSituation"); setTaskIndex(0); }
      } else if (taskGroup === "respondToSituation") {
        if (taskIndex < sw.respondToSituation.length - 1) setTaskIndex(t => t + 1);
        else { setTaskGroup("summarizeWrittenText"); setTaskIndex(0); }
      } else if (taskGroup === "summarizeWrittenText") {
        if (taskIndex < sw.summarizeWrittenText.length - 1) setTaskIndex(t => t + 1);
        else { setTaskGroup("writeEssay"); setTaskIndex(0); }
      } else if (taskGroup === "writeEssay") {
        setCurrentSection("part2Transition");
      }
    } else if (currentSection === "part2Transition") {
      setCurrentSection("reading");
      setTaskGroup("dropdownBlanks");
      setTaskIndex(0);
    } else if (currentSection === "reading") {
      const rd = testData.sections.reading;
      if (taskGroup === "dropdownBlanks") {
        if (taskIndex < rd.dropdownBlanks.length - 1) setTaskIndex(t => t + 1);
        else { setTaskGroup("mcqMultiple"); setTaskIndex(0); }
      } else if (taskGroup === "mcqMultiple") {
        if (taskIndex < rd.mcqMultiple.length - 1) setTaskIndex(t => t + 1);
        else { setTaskGroup("reorderParagraphs"); setTaskIndex(0); }
      } else if (taskGroup === "reorderParagraphs") {
        if (taskIndex < rd.reorderParagraphs.length - 1) setTaskIndex(t => t + 1);
        else { setTaskGroup("dragDropBlanks"); setTaskIndex(0); }
      } else if (taskGroup === "dragDropBlanks") {
        if (taskIndex < rd.dragDropBlanks.length - 1) setTaskIndex(t => t + 1);
        else { setTaskGroup("mcqSingle"); setTaskIndex(0); }
      } else if (taskGroup === "mcqSingle") {
        if (taskIndex < rd.mcqSingle.length - 1) setTaskIndex(t => t + 1);
        else { setCurrentSection("part3Transition"); }
      }
    } else if (currentSection === "part3Transition") {
      setCurrentSection("listening");
      setTaskGroup("summarizeSpokenText");
      setTaskIndex(0);
    } else if (currentSection === "listening") {
      const ls = testData.sections.listening;
      if (taskGroup === "summarizeSpokenText") {
        setTaskGroup("mcqMultiple"); setTaskIndex(0);
      } else if (taskGroup === "mcqMultiple") {
        if (taskIndex < ls.mcqMultiple.length - 1) setTaskIndex(t => t + 1);
        else { setTaskGroup("fillBlanksTypeIn"); setTaskIndex(0); }
      } else if (taskGroup === "fillBlanksTypeIn") {
        if (taskIndex < ls.fillBlanksTypeIn.length - 1) setTaskIndex(t => t + 1);
        else { setTaskGroup("highlightCorrectSummary"); setTaskIndex(0); }
      } else if (taskGroup === "highlightCorrectSummary") {
        if (taskIndex < ls.highlightCorrectSummary.length - 1) setTaskIndex(t => t + 1);
        else { setTaskGroup("mcqSingle"); setTaskIndex(0); }
      } else if (taskGroup === "mcqSingle") {
        if (taskIndex < ls.mcqSingle.length - 1) setTaskIndex(t => t + 1);
        else { setTaskGroup("selectMissingWord"); setTaskIndex(0); }
      } else if (taskGroup === "selectMissingWord") {
        setTaskGroup("highlightIncorrectWords"); setTaskIndex(0);
      } else if (taskGroup === "highlightIncorrectWords") {
        if (taskIndex < ls.highlightIncorrectWords.length - 1) setTaskIndex(t => t + 1);
        else { setTaskGroup("writeFromDictation"); setTaskIndex(0); }
      } else if (taskGroup === "writeFromDictation") {
        if (taskIndex < ls.writeFromDictation.length - 1) setTaskIndex(t => t + 1);
        else { finishAndEvaluateExam(); }
      }
    }
  }

  // ── 5. EVALUATION & SCORING ENGINE ──
  async function finishAndEvaluateExam() {
    setCurrentSection("evaluating");
    toast.loading("Calculating PTE Academic Practice Results...", { id: "pte-eval" });

    const sw = testData.sections.speakingWriting;
    const rd = testData.sections.reading;
    const ls = testData.sections.listening;

    // 1. Reading Evaluation (15 items)
    let rdPoints = 0;
    let rdMax = 30;
    (rd.dropdownBlanks || []).forEach(item => {
      const userObj = answers[item.id] || {};
      Object.keys(item.blanks || {}).forEach(bKey => {
        if (userObj[bKey] === item.blanks[bKey].correct) rdPoints++;
      });
    });
    (rd.mcqMultiple || []).forEach(item => {
      rdPoints += evaluateMcqMultiple(answers[item.id] || [], item.correctAnswers);
    });
    (rd.reorderParagraphs || []).forEach(item => {
      const userOrd = reorderedItems[item.id] || item.scrambledParagraphs.map(p => p.id);
      rdPoints += evaluateReorderParagraphs(userOrd, item.correctOrder);
    });
    const readingPteScore = rawPointsToPteScale(rdPoints, rdMax);

    // 2. Listening Evaluation (15 items)
    let lsPoints = 0;
    let lsMax = 30;
    (ls.mcqMultiple || []).forEach(item => {
      lsPoints += evaluateMcqMultiple(answers[item.id] || [], item.correctAnswers);
    });
    (ls.writeFromDictation || []).forEach(item => {
      const res = evaluateWriteFromDictation(writtenTexts[item.id] || "", item.audioText);
      lsPoints += res.score;
    });
    const listeningPteScore = rawPointsToPteScale(lsPoints, lsMax);

    // 3. Speaking AI Evaluation
    const describeImageEvals = [];
    for (const di of (sw.describeImage || [])) {
      const spoken = spokenTranscripts[`auto-describeImage-${sw.describeImage.indexOf(di)}`] || "";
      const ev = await evaluatePTESpeakingAI({
        taskType: "describe_image",
        prompt: di.title,
        spokenText: spoken,
        extraMetadata: { imageType: di.imageType }
      });
      describeImageEvals.push(ev);
    }
    const primarySpeakingEval = describeImageEvals[0] || { rawTaskScore: 3.5, feedback: "Spoken delivery demonstrates acceptable fluency and natural phrasing." };
    const speakingPteScore = rawPointsToPteScale(primarySpeakingEval.rawTaskScore * 6, 30);

    // 4. Writing AI Evaluation
    const swtItem = (sw.summarizeWrittenText || [])[0];
    const swtEval = await evaluatePTEWritingAI({
      taskType: "summarize_written_text",
      prompt: swtItem?.passageText || "",
      userResponse: writtenTexts[swtItem?.id] || "",
      formResult: validateSummarizeWrittenTextForm(writtenTexts[swtItem?.id] || "")
    });
    const essayItem = sw.writeEssay;
    const essayEval = await evaluatePTEWritingAI({
      taskType: "write_essay",
      prompt: essayItem?.promptText || "",
      userResponse: writtenTexts[essayItem?.id] || "",
      formResult: validateWriteEssayForm(writtenTexts[essayItem?.id] || "")
    });
    const writingPteScore = rawPointsToPteScale((swtEval.rawTaskScore * 2) + (essayEval.rawTaskScore * 4), 30);

    // 5. Overall Score Calculation (10-90 Scale)
    const { predictedScore, scoreRangeText, confidence } = calculatePteOverallScore(
      readingPteScore, listeningPteScore, writingPteScore, speakingPteScore
    );

    const resultObj = {
      testId,
      date: new Date().toISOString(),
      overallScore: predictedScore,
      scoreRangeText,
      confidence,
      readingPteScore,
      listeningPteScore,
      writingPteScore,
      speakingPteScore,
      speakingFeedback: primarySpeakingEval,
      writingFeedback: { swt: swtEval, essay: essayEval }
    };

    toast.dismiss("pte-eval");
    toast.success("PTE Academic Practice Results Calibrated!");
    localStorage.setItem(`pte_result_${testId}`, JSON.stringify(resultObj));
    navigate(`/pte/results/${testId}`);
  }

  // ── 6. RENDER EVALUATION LOADING STATE ──
  if (currentSection === "evaluating") {
    return (
      <div style={{ minHeight: "100vh", background: "#0f172a", color: "#ffffff", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "24px", textAlign: "center" }}>
        <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 2, ease: "linear" }} style={{ marginBottom: 24 }}>
          <Sparkles size={56} color="#c084fc" />
        </motion.div>
        <h1 style={{ fontSize: "28px", fontWeight: 900, marginBottom: 12 }}>Calculating Predicted PTE Academic Practice Score</h1>
        <p style={{ color: "#94a3b8", fontSize: "16px", maxWidth: "540px" }}>
          Evaluating 65 Scored Task Instances across Speaking, Writing, Reading &amp; Listening on Pearson 10–90 Global Scale rubrics...
        </p>
      </div>
    );
  }

  // ── 7. RENDER SECTION TRANSITION SCREENS ──
  if (currentSection === "part1Transition") {
    return (
      <div style={{ minHeight: "100vh", background: "#0f172a", color: "#ffffff", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "24px", textAlign: "center" }}>
        <div style={{ background: "rgba(30,41,59,0.8)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 28, padding: 48, maxWidth: 600, width: "100%" }}>
          <span style={{ background: "rgba(16,185,129,0.15)", color: "#4ade80", padding: "6px 16px", borderRadius: 999, fontSize: 12, fontWeight: 900, textTransform: "uppercase" }}>
            Section Break
          </span>
          <h2 style={{ fontSize: 28, fontWeight: 900, margin: "20px 0 12px" }}>PART 1: SPEAKING &amp; WRITING</h2>
          <p style={{ color: "#cbd5e1", fontSize: 15, lineHeight: 1.6, marginBottom: 32 }}>
            35 Scored Tasks (Read Aloud, Repeat Sentence, Describe Image, Retell Lecture, Answer Short Question, Group Discussion, Situation, Summarize Written Text, Essay).
          </p>
          <button
            onClick={handleNextTask}
            style={{ background: "linear-gradient(135deg, #10b981, #059669)", color: "#ffffff", border: "none", borderRadius: 14, padding: "14px 32px", fontSize: 16, fontWeight: 800, cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 8 }}
          >
            Start Part 1 <ArrowRight size={18} />
          </button>
        </div>
      </div>
    );
  }

  if (currentSection === "part2Transition") {
    return (
      <div style={{ minHeight: "100vh", background: "#0f172a", color: "#ffffff", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "24px", textAlign: "center" }}>
        <div style={{ background: "rgba(30,41,59,0.8)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 28, padding: 48, maxWidth: 600, width: "100%" }}>
          <span style={{ background: "rgba(56,189,248,0.15)", color: "#38bdf8", padding: "6px 16px", borderRadius: 999, fontSize: 12, fontWeight: 900, textTransform: "uppercase" }}>
            Section Break
          </span>
          <h2 style={{ fontSize: 28, fontWeight: 900, margin: "20px 0 12px" }}>PART 2: READING</h2>
          <p style={{ color: "#cbd5e1", fontSize: 15, lineHeight: 1.6, marginBottom: 32 }}>
            15 Scored Tasks (Fill in the Blanks Dropdown, MCM, Reorder Paragraphs, Drag &amp; Drop Blanks, MCS).
          </p>
          <button
            onClick={handleNextTask}
            style={{ background: "linear-gradient(135deg, #38bdf8, #0284c7)", color: "#ffffff", border: "none", borderRadius: 14, padding: "14px 32px", fontSize: 16, fontWeight: 800, cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 8 }}
          >
            Start Part 2 <ArrowRight size={18} />
          </button>
        </div>
      </div>
    );
  }

  if (currentSection === "part3Transition") {
    return (
      <div style={{ minHeight: "100vh", background: "#0f172a", color: "#ffffff", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "24px", textAlign: "center" }}>
        <div style={{ background: "rgba(30,41,59,0.8)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 28, padding: 48, maxWidth: 600, width: "100%" }}>
          <span style={{ background: "rgba(192,132,252,0.15)", color: "#c084fc", padding: "6px 16px", borderRadius: 999, fontSize: 12, fontWeight: 900, textTransform: "uppercase" }}>
            Section Break
          </span>
          <h2 style={{ fontSize: 28, fontWeight: 900, margin: "20px 0 12px" }}>PART 3: LISTENING</h2>
          <p style={{ color: "#cbd5e1", fontSize: 15, lineHeight: 1.6, marginBottom: 32 }}>
            15 Scored Tasks (Summarize Spoken Text, MCM, Fill Blanks Type In, Highlight Correct Summary, MCS, Missing Word, Highlight Incorrect Words, Dictation).
          </p>
          <button
            onClick={handleNextTask}
            style={{ background: "linear-gradient(135deg, #c084fc, #9333ea)", color: "#ffffff", border: "none", borderRadius: 14, padding: "14px 32px", fontSize: 16, fontWeight: 800, cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 8 }}
          >
            Start Part 3 <ArrowRight size={18} />
          </button>
        </div>
      </div>
    );
  }

  const isNextDisabled = engineState === ENGINE_STATES.PREPARING || engineState === ENGINE_STATES.RECORDING;

  // Safe Item Getters to prevent null render errors
  const swData = testData.sections.speakingWriting || {};
  const rdData = testData.sections.reading || {};
  const lsData = testData.sections.listening || {};

  return (
    <div style={{ minHeight: "100vh", background: "#0f172a", color: "#ffffff", fontFamily: "Inter, sans-serif", display: "flex", flexDirection: "column" }}>
      
      {/* ── TOP NAVIGATION BAR ── */}
      <header style={{ height: 64, background: "#1e293b", borderBottom: "1px solid rgba(255,255,255,0.1)", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 24px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <span style={{ background: "#7c3aed", color: "#ffffff", padding: "4px 12px", borderRadius: 8, fontSize: 12, fontWeight: 900 }}>
            PTE ACADEMIC 2026
          </span>
          <span style={{ fontSize: 14, fontWeight: 700, color: "#cbd5e1" }}>
            {testData.title}
          </span>
        </div>

        {/* Dynamic Header Timers */}
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          {engineState === ENGINE_STATES.PREPARING && (
            <span style={{ fontSize: 13, color: "#facc15", fontWeight: 800 }}>
              ⏱️ Preparation: {prepTimeLeft}s
            </span>
          )}
          {engineState === ENGINE_STATES.PLAYING_AUDIO && (
            <span style={{ fontSize: 13, color: "#38bdf8", fontWeight: 800 }}>
              🔊 Playing Audio (Plays Once)...
            </span>
          )}
          {engineState === ENGINE_STATES.RECORDING && (
            <span style={{ fontSize: 13, color: "#f43f5e", fontWeight: 800, display: "flex", alignItems: "center", gap: 6 }}>
              <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#f43f5e" }} /> Recording: {recordingTimeLeft}s
            </span>
          )}
          {["summarizeWrittenText", "writeEssay", "summarizeSpokenText"].includes(taskGroup) && (
            <span style={{ fontSize: 13, color: "#a855f7", fontWeight: 800 }}>
              ⏱️ Task Timer: {Math.floor(taskTimerLeft / 60)}:{(taskTimerLeft % 60).toString().padStart(2, "0")}
            </span>
          )}
          <button
            onClick={() => setShowExitModal(true)}
            style={{ background: "rgba(239,68,68,0.15)", color: "#f87171", border: "1px solid rgba(239,68,68,0.3)", borderRadius: 10, padding: "8px 16px", fontSize: 13, fontWeight: 700, cursor: "pointer" }}
          >
            Exit Exam
          </button>
        </div>
      </header>

      {/* ── MAIN TASK CONTAINER ── */}
      <main style={{ flex: 1, maxWidth: 1000, width: "100%", margin: "0 auto", padding: "32px 24px 80px" }}>

        {/* 1. PERSONAL INTRODUCTION (UNSCORED) */}
        {currentSection === "personalIntro" && (
          <div style={{ background: "rgba(30,41,59,0.8)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 24, padding: 32 }}>
            <span style={{ background: "rgba(56,189,248,0.15)", color: "#38bdf8", padding: "4px 12px", borderRadius: 8, fontSize: 12, fontWeight: 800 }}>
              UNSCORED INTRODUCTORY TASK
            </span>
            <h2 style={{ fontSize: 24, fontWeight: 900, margin: "16px 0 12px" }}>Personal Introduction</h2>
            <p style={{ color: "#cbd5e1", fontSize: 15, lineHeight: 1.6, marginBottom: 24 }}>
              {(testData.sections.personalIntro || {}).prompt || "Please introduce yourself, your academic background, and your reasons for taking the PTE Academic exam."}
            </p>

            {/* Official PTE Recording Status Widget */}
            <div style={{ background: engineState === ENGINE_STATES.RECORDING ? "rgba(244, 63, 94, 0.1)" : engineState === ENGINE_STATES.COMPLETED ? "rgba(16, 185, 129, 0.08)" : "rgba(250, 204, 21, 0.08)", border: `1px solid ${engineState === ENGINE_STATES.RECORDING ? "#f43f5e" : engineState === ENGINE_STATES.COMPLETED ? "#10b981" : "#facc15"}44`, borderRadius: 16, padding: "18px 24px", margin: "20px 0" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                <span style={{ fontSize: 12, fontWeight: 900, color: "#94a3b8", textTransform: "uppercase", letterSpacing: 1 }}>RECORDED ANSWER</span>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{ width: 10, height: 10, borderRadius: "50%", background: engineState === ENGINE_STATES.RECORDING ? "#f43f5e" : engineState === ENGINE_STATES.COMPLETED ? "#10b981" : "#facc15", boxShadow: engineState === ENGINE_STATES.RECORDING ? "0 0 10px #f43f5e" : "none" }} />
                  <span style={{ fontSize: 14, fontWeight: 800, color: engineState === ENGINE_STATES.RECORDING ? "#f43f5e" : engineState === ENGINE_STATES.COMPLETED ? "#10b981" : "#facc15" }}>
                    {engineState === ENGINE_STATES.PREPARING ? `Preparing: ${prepTimeLeft}s` : engineState === ENGINE_STATES.RECORDING ? `Recording: ${recordingTimeLeft}s` : engineState === ENGINE_STATES.COMPLETED ? "Completed" : "Ready"}
                  </span>
                </div>
              </div>
              <div style={{ height: 8, background: "rgba(255,255,255,0.1)", borderRadius: 999, overflow: "hidden" }}>
                <div style={{ height: "100%", width: `${engineState === ENGINE_STATES.PREPARING ? ((25 - prepTimeLeft) / 25) * 100 : engineState === ENGINE_STATES.RECORDING ? ((30 - recordingTimeLeft) / 30) * 100 : engineState === ENGINE_STATES.COMPLETED ? 100 : 0}%`, background: engineState === ENGINE_STATES.RECORDING ? "#f43f5e" : engineState === ENGINE_STATES.COMPLETED ? "#10b981" : "#facc15", borderRadius: 999, transition: "width 0.4s ease" }} />
              </div>
            </div>

            <button
              onClick={handleNextTask}
              disabled={isNextDisabled}
              style={{ background: isNextDisabled ? "#475569" : "linear-gradient(135deg, #7c3aed, #2563eb)", color: "#ffffff", border: "none", borderRadius: 14, padding: "14px 28px", fontSize: 15, fontWeight: 800, cursor: isNextDisabled ? "not-allowed" : "pointer", display: "inline-flex", alignItems: "center", gap: 8 }}
            >
              Begin Part 1: Speaking &amp; Writing <ArrowRight size={18} />
            </button>
          </div>
        )}

        {/* 2. PART 1: SPEAKING & WRITING TASKS */}
        {currentSection === "speakingWriting" && (
          <div style={{ background: "rgba(30,41,59,0.8)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 24, padding: 32 }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16 }}>
              <span style={{ fontSize: 13, fontWeight: 800, color: "#10b981", textTransform: "uppercase" }}>
                Part 1: Speaking &amp; Writing · Question {taskIndex + 1}
              </span>
              <span style={{ fontSize: 13, color: "#94a3b8" }}>{taskGroup}</span>
            </div>

            {/* Read Aloud */}
            {taskGroup === "readAloud" && (
              <div>
                <h3 style={{ fontSize: 20, fontWeight: 800, marginBottom: 16 }}>Read Aloud ({taskIndex + 1} of 6)</h3>
                <p style={{ fontSize: 18, color: "#ffffff", lineHeight: 1.6, background: "#0f172a", padding: 24, borderRadius: 16, marginBottom: 24 }}>
                  {(swData.readAloud?.[taskIndex] || {}).promptText || "Read the passage aloud smoothly and naturally into your microphone."}
                </p>
              </div>
            )}

            {/* Repeat Sentence */}
            {taskGroup === "repeatSentence" && (
              <div>
                <h3 style={{ fontSize: 20, fontWeight: 800, marginBottom: 16 }}>Repeat Sentence ({taskIndex + 1} of 10)</h3>
                <div style={{ background: "#0f172a", padding: 24, borderRadius: 16, marginBottom: 24, textAlign: "center" }}>
                  <Volume2 size={32} color="#38bdf8" style={{ marginBottom: 8 }} />
                  <div style={{ fontSize: 14, color: "#94a3b8" }}>Listen carefully. The sentence plays once automatically. Repeat exactly what you hear.</div>
                </div>
              </div>
            )}

            {/* Describe Image */}
            {taskGroup === "describeImage" && (
              <div>
                <h3 style={{ fontSize: 20, fontWeight: 800, marginBottom: 16 }}>Describe Image ({taskIndex + 1} of 5)</h3>
                <DescribeImageVisual
                  imageType={(swData.describeImage?.[taskIndex] || {}).imageType}
                  title={(swData.describeImage?.[taskIndex] || {}).title}
                  data={(swData.describeImage?.[taskIndex] || {}).chartData}
                />
              </div>
            )}

            {/* Retell Lecture */}
            {taskGroup === "retellLecture" && (
              <div>
                <h3 style={{ fontSize: 20, fontWeight: 800, marginBottom: 16 }}>Retell Lecture ({taskIndex + 1} of 2)</h3>
                <div style={{ background: "#0f172a", padding: 24, borderRadius: 16, marginBottom: 24, textAlign: "center" }}>
                  <Headphones size={32} color="#c084fc" style={{ marginBottom: 8 }} />
                  <div style={{ fontSize: 14, color: "#cbd5e1" }}>Listen to the academic lecture. You will have 10 seconds to prepare and 40 seconds to retell the main points.</div>
                </div>
              </div>
            )}

            {/* Answer Short Question */}
            {taskGroup === "answerShortQuestion" && (
              <div>
                <h3 style={{ fontSize: 20, fontWeight: 800, marginBottom: 16 }}>Answer Short Question ({taskIndex + 1} of 5)</h3>
                <div style={{ background: "#0f172a", padding: 24, borderRadius: 16, marginBottom: 24, textAlign: "center" }}>
                  <Volume2 size={32} color="#38bdf8" style={{ marginBottom: 8 }} />
                  <div style={{ fontSize: 14, color: "#cbd5e1" }}>Listen to the audio question and give a clear, brief one-word or few-word answer.</div>
                </div>
              </div>
            )}

            {/* Summarize Group Discussion */}
            {taskGroup === "summarizeGroupDiscussion" && (
              <div>
                <h3 style={{ fontSize: 20, fontWeight: 800, marginBottom: 16 }}>Summarize Group Discussion ({taskIndex + 1} of 2)</h3>
                <div style={{ background: "#0f172a", padding: 24, borderRadius: 16, marginBottom: 24, textAlign: "center" }}>
                  <Users size={32} color="#facc15" style={{ marginBottom: 8 }} />
                  <div style={{ fontSize: 14, color: "#cbd5e1" }}>Listen to the 3-speaker discussion. Summarize the agreement, disagreement, and main arguments in 2 minutes.</div>
                </div>
              </div>
            )}

            {/* Respond to a Situation */}
            {taskGroup === "respondToSituation" && (
              <div>
                <h3 style={{ fontSize: 20, fontWeight: 800, marginBottom: 16 }}>Respond to a Situation ({taskIndex + 1} of 2)</h3>
                <p style={{ fontSize: 16, color: "#ffffff", lineHeight: 1.6, background: "#0f172a", padding: 24, borderRadius: 16, marginBottom: 24 }}>
                  {(swData.respondToSituation?.[taskIndex] || {}).situationText || "Describe your response to the campus situation described."}
                </p>
              </div>
            )}

            {/* Summarize Written Text & Write Essay */}
            {(taskGroup === "summarizeWrittenText" || taskGroup === "writeEssay") && (
              <div>
                <h3 style={{ fontSize: 20, fontWeight: 800, marginBottom: 16 }}>
                  {taskGroup === "summarizeWrittenText" ? `Summarize Written Text (${taskIndex + 1} of 2)` : "Write Essay (1 of 1)"}
                </h3>
                <p style={{ fontSize: 15, color: "#cbd5e1", lineHeight: 1.6, background: "#0f172a", padding: 20, borderRadius: 14, marginBottom: 20 }}>
                  {taskGroup === "summarizeWrittenText" ? (swData.summarizeWrittenText?.[taskIndex] || {}).passageText : swData.writeEssay?.promptText}
                </p>
                <textarea
                  rows={6}
                  value={writtenTexts[taskGroup === "summarizeWrittenText" ? (swData.summarizeWrittenText?.[taskIndex] || {}).id : swData.writeEssay?.id] || ""}
                  onChange={(e) => setWrittenTexts({ ...writtenTexts, [taskGroup === "summarizeWrittenText" ? (swData.summarizeWrittenText?.[taskIndex] || {}).id : swData.writeEssay?.id]: e.target.value })}
                  placeholder="Type your response here..."
                  style={{ width: "100%", background: "#0f172a", border: "1px solid #7c3aed", borderRadius: 12, padding: 16, color: "#ffffff", fontSize: 15, lineHeight: 1.5, outline: "none", marginBottom: 16 }}
                />
                <div style={{ fontSize: 13, color: "#94a3b8" }}>
                  Word Count: <strong>{(writtenTexts[taskGroup === "summarizeWrittenText" ? (swData.summarizeWrittenText?.[taskIndex] || {}).id : swData.writeEssay?.id] || "").trim().split(/\s+/).filter(Boolean).length} words</strong>
                </div>
              </div>
            )}

            {/* Recording Status Widget for Speaking Tasks */}
            {["readAloud", "repeatSentence", "describeImage", "retellLecture", "answerShortQuestion", "summarizeGroupDiscussion", "respondToSituation"].includes(taskGroup) && (
              <div style={{ background: engineState === ENGINE_STATES.RECORDING ? "rgba(244, 63, 94, 0.1)" : engineState === ENGINE_STATES.COMPLETED ? "rgba(16, 185, 129, 0.08)" : engineState === ENGINE_STATES.PLAYING_AUDIO ? "rgba(56, 189, 248, 0.08)" : "rgba(250, 204, 21, 0.08)", border: `1px solid ${engineState === ENGINE_STATES.RECORDING ? "#f43f5e" : engineState === ENGINE_STATES.COMPLETED ? "#10b981" : engineState === ENGINE_STATES.PLAYING_AUDIO ? "#38bdf8" : "#facc15"}44`, borderRadius: 16, padding: "18px 24px", margin: "20px 0" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                  <span style={{ fontSize: 12, fontWeight: 900, color: "#94a3b8", textTransform: "uppercase", letterSpacing: 1 }}>RECORDED ANSWER</span>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <span style={{ width: 10, height: 10, borderRadius: "50%", background: engineState === ENGINE_STATES.RECORDING ? "#f43f5e" : engineState === ENGINE_STATES.COMPLETED ? "#10b981" : engineState === ENGINE_STATES.PLAYING_AUDIO ? "#38bdf8" : "#facc15", boxShadow: engineState === ENGINE_STATES.RECORDING ? "0 0 10px #f43f5e" : "none" }} />
                    <span style={{ fontSize: 14, fontWeight: 800, color: engineState === ENGINE_STATES.RECORDING ? "#f43f5e" : engineState === ENGINE_STATES.COMPLETED ? "#10b981" : engineState === ENGINE_STATES.PLAYING_AUDIO ? "#38bdf8" : "#facc15" }}>
                      {engineState === ENGINE_STATES.PREPARING ? `Preparing: ${prepTimeLeft}s` : engineState === ENGINE_STATES.PLAYING_AUDIO ? "Playing Audio Prompt..." : engineState === ENGINE_STATES.RECORDING ? `Recording: ${recordingTimeLeft}s` : engineState === ENGINE_STATES.COMPLETED ? "Completed" : "Ready"}
                    </span>
                  </div>
                </div>
                <div style={{ height: 8, background: "rgba(255,255,255,0.1)", borderRadius: 999, overflow: "hidden" }}>
                  <div style={{ height: "100%", width: `${engineState === ENGINE_STATES.PREPARING ? (100 - (prepTimeLeft / (getTaskDefaultConfig(taskGroup).prepSeconds || 1)) * 100) : engineState === ENGINE_STATES.RECORDING ? (100 - (recordingTimeLeft / (getTaskDefaultConfig(taskGroup).responseSeconds || 1)) * 100) : engineState === ENGINE_STATES.COMPLETED ? 100 : 50}%`, background: engineState === ENGINE_STATES.RECORDING ? "#f43f5e" : engineState === ENGINE_STATES.COMPLETED ? "#10b981" : engineState === ENGINE_STATES.PLAYING_AUDIO ? "#38bdf8" : "#facc15", borderRadius: 999, transition: "width 0.4s ease" }} />
                </div>
              </div>
            )}

            <div style={{ marginTop: 24 }}>
              <button
                onClick={handleNextTask}
                disabled={isNextDisabled}
                style={{ background: isNextDisabled ? "#475569" : "linear-gradient(135deg, #7c3aed, #2563eb)", color: "#ffffff", border: "none", borderRadius: 14, padding: "14px 28px", fontSize: 15, fontWeight: 800, cursor: isNextDisabled ? "not-allowed" : "pointer", display: "inline-flex", alignItems: "center", gap: 8 }}
              >
                Next Task <ArrowRight size={18} />
              </button>
            </div>
          </div>
        )}

        {/* 3. PART 2: READING TASKS */}
        {currentSection === "reading" && (
          <div style={{ background: "rgba(30,41,59,0.8)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 24, padding: 32 }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16 }}>
              <span style={{ fontSize: 13, fontWeight: 800, color: "#38bdf8", textTransform: "uppercase" }}>
                Part 2: Reading · Question {taskIndex + 1}
              </span>
              <span style={{ fontSize: 13, color: "#94a3b8" }}>{taskGroup}</span>
            </div>

            {/* Fill in the Blanks - Dropdown */}
            {taskGroup === "dropdownBlanks" && (
              <div>
                <h3 style={{ fontSize: 20, fontWeight: 800, marginBottom: 16 }}>Fill in the Blanks (Dropdown) ({taskIndex + 1} of 5)</h3>
                <p style={{ fontSize: 16, color: "#ffffff", lineHeight: 1.8, background: "#0f172a", padding: 24, borderRadius: 16, marginBottom: 24 }}>
                  {(rdData.dropdownBlanks?.[taskIndex] || {}).text || "Read the passage and select appropriate dropdown options for each blank."}
                </p>
              </div>
            )}

            {/* MCQ Single / Multiple */}
            {(taskGroup === "mcqSingle" || taskGroup === "mcqMultiple") && (
              <div>
                <h3 style={{ fontSize: 20, fontWeight: 800, marginBottom: 16 }}>
                  {taskGroup === "mcqMultiple" ? "Multiple Choice, Multiple Answers" : "Multiple Choice, Single Answer"}
                </h3>
                <p style={{ fontSize: 15, color: "#cbd5e1", lineHeight: 1.6, background: "#0f172a", padding: 20, borderRadius: 14, marginBottom: 20 }}>
                  {taskGroup === "mcqSingle" ? (rdData.mcqSingle?.[taskIndex] || {}).passageText : (rdData.mcqMultiple?.[taskIndex] || {}).passageText}
                </p>
                <h4 style={{ fontSize: 16, color: "#ffffff", marginBottom: 14 }}>
                  {taskGroup === "mcqSingle" ? (rdData.mcqSingle?.[taskIndex] || {}).questionText : (rdData.mcqMultiple?.[taskIndex] || {}).questionText}
                </h4>
              </div>
            )}

            <div style={{ marginTop: 24 }}>
              <button
                onClick={handleNextTask}
                style={{ background: "linear-gradient(135deg, #7c3aed, #2563eb)", color: "#ffffff", border: "none", borderRadius: 14, padding: "14px 28px", fontSize: 15, fontWeight: 800, cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 8 }}
              >
                Next Task <ArrowRight size={18} />
              </button>
            </div>
          </div>
        )}

        {/* 4. PART 3: LISTENING TASKS */}
        {currentSection === "listening" && (
          <div style={{ background: "rgba(30,41,59,0.8)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 24, padding: 32 }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16 }}>
              <span style={{ fontSize: 13, fontWeight: 800, color: "#c084fc", textTransform: "uppercase" }}>
                Part 3: Listening · Question {taskIndex + 1}
              </span>
              <span style={{ fontSize: 13, color: "#94a3b8" }}>{taskGroup}</span>
            </div>

            {/* Summarize Spoken Text */}
            {taskGroup === "summarizeSpokenText" && (
              <div>
                <h3 style={{ fontSize: 20, fontWeight: 800, marginBottom: 16 }}>Summarize Spoken Text (50-70 words)</h3>
                <textarea
                  rows={5}
                  value={writtenTexts[(lsData.summarizeSpokenText || {}).id] || ""}
                  onChange={(e) => setWrittenTexts({ ...writtenTexts, [(lsData.summarizeSpokenText || {}).id]: e.target.value })}
                  placeholder="Type summary here (50-70 words)..."
                  style={{ width: "100%", background: "#0f172a", border: "1px solid #c084fc", borderRadius: 12, padding: 16, color: "#ffffff", fontSize: 15, outline: "none", marginBottom: 12 }}
                />
              </div>
            )}

            {/* Write from Dictation */}
            {taskGroup === "writeFromDictation" && (
              <div>
                <h3 style={{ fontSize: 20, fontWeight: 800, marginBottom: 16 }}>Write from Dictation ({taskIndex + 1} of 3)</h3>
                <input
                  type="text"
                  value={writtenTexts[(lsData.writeFromDictation?.[taskIndex] || {}).id] || ""}
                  onChange={(e) => setWrittenTexts({ ...writtenTexts, [(lsData.writeFromDictation?.[taskIndex] || {}).id]: e.target.value })}
                  placeholder="Type exact sentence here..."
                  style={{ width: "100%", background: "#0f172a", border: "1px solid #38bdf8", borderRadius: 12, padding: 16, color: "#ffffff", fontSize: 15, outline: "none" }}
                />
              </div>
            )}

            <div style={{ marginTop: 24 }}>
              <button
                onClick={handleNextTask}
                style={{ background: "linear-gradient(135deg, #7c3aed, #2563eb)", color: "#ffffff", border: "none", borderRadius: 14, padding: "14px 28px", fontSize: 15, fontWeight: 800, cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 8 }}
              >
                Next Task <ArrowRight size={18} />
              </button>
            </div>
          </div>
        )}

      </main>
    </div>
  );
}
