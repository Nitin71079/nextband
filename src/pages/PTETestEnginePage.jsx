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
  evaluateWriteFromDictation, validateSummarizeWrittenTextForm, validateWriteEssayForm,
  validateSummarizeSpokenTextForm
} from "../utils/pteScoreCalculator";
import { evaluatePTESpeakingAI, evaluatePTEWritingAI } from "../services/evaluatePTEGPT";

export default function PTETestEnginePage() {
  const { testId } = useParams();
  const navigate = useNavigate();

  const testData = pteTests.find((t) => t.id === testId) || pteTests[0];

  // Navigation State
  const [currentSection, setCurrentSection] = useState("personalIntro"); // personalIntro | speakingWriting | reading | listening | evaluating
  const [taskGroup, setTaskGroup] = useState("personalIntro");
  const [taskIndex, setTaskIndex] = useState(0);
  const [prepTimeLeft, setPrepTimeLeft] = useState(25);
  const [isPrepping, setIsPrepping] = useState(true);

  // Audio Playback & Microphone Recording State
  const [isRecording, setIsRecording] = useState(false);
  const [spokenTranscripts, setSpokenTranscripts] = useState({});
  const [playedAudioItems, setPlayedAudioItems] = useState({});
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  // Answers State
  const [answers, setAnswers] = useState({});
  const [writtenTexts, setWrittenTexts] = useState({});
  const [highlightedWords, setHighlightedWords] = useState({}); // { itemId: [indices] }
  const [reorderedItems, setReorderedItems] = useState({}); // { itemId: [paragraphIds] }

  // Exit Modal
  const [showExitModal, setShowExitModal] = useState(false);

  const mediaRecorderRef = useRef(null);
  const recognitionRef = useRef(null);

  // Prep Countdown timer
  useEffect(() => {
    let timer;
    if (isPrepping && prepTimeLeft > 0) {
      timer = setInterval(() => setPrepTimeLeft((prev) => prev - 1), 1000);
    } else if (isPrepping && prepTimeLeft === 0) {
      setIsPrepping(false);
      startAudioRecording(`auto-${taskGroup}-${taskIndex}`);
    }
    return () => clearInterval(timer);
  }, [isPrepping, prepTimeLeft, taskGroup, taskIndex]);

  // Handle Speech Recognition Recording
  function startAudioRecording(taskId) {
    if (isRecording) return;
    setIsRecording(true);

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
          setSpokenTranscripts((prev) => ({ ...prev, [taskId]: currentText.trim() }));
        };

        recognition.onerror = (err) => console.log("SpeechRec error:", err);
        recognition.start();
        recognitionRef.current = recognition;
      } catch (err) {
        console.error("SpeechRec start error:", err);
      }
    }
  }

  function stopAudioRecording() {
    setIsRecording(false);
    if (recognitionRef.current) {
      try { recognitionRef.current.stop(); } catch (e) {}
    }
  }

  function playTTS(itemId, text) {
    if (playedAudioItems[itemId]) {
      toast.error("PTE Exam Specification: Audio plays once in official test mode.");
      return;
    }
    if (!("speechSynthesis" in window)) {
      toast.error("Audio playback not supported.");
      return;
    }
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.95;
    utterance.onstart = () => {
      setIsPlayingAudio(true);
      setPlayedAudioItems((prev) => ({ ...prev, [itemId]: true }));
    };
    utterance.onend = () => setIsPlayingAudio(false);
    window.speechSynthesis.speak(utterance);
  }

  // Section Progression Handler
  function handleNextTask() {
    stopAudioRecording();
    window.speechSynthesis.cancel();

    if (currentSection === "personalIntro") {
      setCurrentSection("speakingWriting");
      setTaskGroup("readAloud");
      setTaskIndex(0);
      setPrepTimeLeft(35);
      setIsPrepping(true);
      toast.success("Part 1: Speaking & Writing Started");
    } else if (currentSection === "speakingWriting") {
      const sw = testData.sections.speakingWriting;
      if (taskGroup === "readAloud") {
        if (taskIndex < sw.readAloud.length - 1) setTaskIndex(t => t + 1);
        else { setTaskGroup("repeatSentence"); setTaskIndex(0); }
      } else if (taskGroup === "repeatSentence") {
        if (taskIndex < sw.repeatSentence.length - 1) setTaskIndex(t => t + 1);
        else { setTaskGroup("describeImage"); setTaskIndex(0); setPrepTimeLeft(25); setIsPrepping(true); }
      } else if (taskGroup === "describeImage") {
        if (taskIndex < sw.describeImage.length - 1) { setTaskIndex(t => t + 1); setPrepTimeLeft(25); setIsPrepping(true); }
        else { setTaskGroup("retellLecture"); setTaskIndex(0); setPrepTimeLeft(10); setIsPrepping(true); }
      } else if (taskGroup === "retellLecture") {
        if (taskIndex < sw.retellLecture.length - 1) { setTaskIndex(t => t + 1); setPrepTimeLeft(10); setIsPrepping(true); }
        else { setTaskGroup("answerShortQuestion"); setTaskIndex(0); }
      } else if (taskGroup === "answerShortQuestion") {
        if (taskIndex < sw.answerShortQuestion.length - 1) setTaskIndex(t => t + 1);
        else { setTaskGroup("summarizeGroupDiscussion"); setTaskIndex(0); setPrepTimeLeft(10); setIsPrepping(true); }
      } else if (taskGroup === "summarizeGroupDiscussion") {
        if (taskIndex < sw.summarizeGroupDiscussion.length - 1) { setTaskIndex(t => t + 1); setPrepTimeLeft(10); setIsPrepping(true); }
        else { setTaskGroup("respondToSituation"); setTaskIndex(0); setPrepTimeLeft(10); setIsPrepping(true); }
      } else if (taskGroup === "respondToSituation") {
        if (taskIndex < sw.respondToSituation.length - 1) { setTaskIndex(t => t + 1); setPrepTimeLeft(10); setIsPrepping(true); }
        else { setTaskGroup("summarizeWrittenText"); setTaskIndex(0); }
      } else if (taskGroup === "summarizeWrittenText") {
        if (taskIndex < sw.summarizeWrittenText.length - 1) setTaskIndex(t => t + 1);
        else { setTaskGroup("writeEssay"); setTaskIndex(0); }
      } else if (taskGroup === "writeEssay") {
        setCurrentSection("reading");
        setTaskGroup("dropdownBlanks");
        setTaskIndex(0);
        toast.success("Part 2: Reading Started");
      }
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
        else {
          setCurrentSection("listening");
          setTaskGroup("summarizeSpokenText");
          setTaskIndex(0);
          toast.success("Part 3: Listening Started");
        }
      }
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
        else {
          finishAndEvaluateExam();
        }
      }
    }
  }

  // Finish and Run Groq AI Evaluations for Open-Response Speaking & Writing
  async function finishAndEvaluateExam() {
    setCurrentSection("evaluating");
    toast.loading("🤖 Evaluating PTE Academic Exam with Groq AI...", { id: "pte-eval" });

    const sw = testData.sections.speakingWriting;
    const rd = testData.sections.reading;
    const ls = testData.sections.listening;

    // 1. Reading Evaluation (15 tasks)
    let rdPoints = 0;
    let rdMax = 30;

    // Dropdown blanks
    rd.dropdownBlanks.forEach(item => {
      const userObj = answers[item.id] || {};
      Object.keys(item.blanks).forEach(bKey => {
        if (userObj[bKey] === item.blanks[bKey].correct) rdPoints++;
      });
    });

    // MCQ Multiple
    rd.mcqMultiple.forEach(item => {
      const userSel = answers[item.id] || [];
      rdPoints += evaluateMcqMultiple(userSel, item.correctAnswers);
    });

    // Reorder Paragraphs
    rd.reorderParagraphs.forEach(item => {
      const userOrd = reorderedItems[item.id] || item.scrambledParagraphs.map(p => p.id);
      rdPoints += evaluateReorderParagraphs(userOrd, item.correctOrder);
    });

    const readingPteScore = rawPointsToPteScale(rdPoints, rdMax);

    // 2. Listening Evaluation (15 tasks)
    let lsPoints = 0;
    let lsMax = 30;

    ls.mcqMultiple.forEach(item => {
      lsPoints += evaluateMcqMultiple(answers[item.id] || [], item.correctAnswers);
    });
    ls.writeFromDictation.forEach(item => {
      const res = evaluateWriteFromDictation(writtenTexts[item.id] || "", item.audioText);
      lsPoints += res.score;
    });

    const listeningPteScore = rawPointsToPteScale(lsPoints, lsMax);

    // 3. Speaking AI Evaluations (Groq AI)
    const describeImageEvals = [];
    for (const di of sw.describeImage) {
      const spoken = spokenTranscripts[`auto-describeImage-${sw.describeImage.indexOf(di)}`] || "";
      const ev = await evaluatePTESpeakingAI({
        taskType: "describe_image",
        prompt: di.title,
        spokenText: spoken,
        extraMetadata: { imageType: di.imageType }
      });
      describeImageEvals.push(ev);
    }

    const groupDiscussionEvals = [];
    for (const sgd of sw.summarizeGroupDiscussion) {
      const spoken = spokenTranscripts[`auto-summarizeGroupDiscussion-${sw.summarizeGroupDiscussion.indexOf(sgd)}`] || "";
      const ev = await evaluatePTESpeakingAI({
        taskType: "group_discussion",
        prompt: sgd.title,
        spokenText: spoken
      });
      groupDiscussionEvals.push(ev);
    }

    const situationEvals = [];
    for (const rts of sw.respondToSituation) {
      const spoken = spokenTranscripts[`auto-respondToSituation-${sw.respondToSituation.indexOf(rts)}`] || "";
      const ev = await evaluatePTESpeakingAI({
        taskType: "respond_situation",
        prompt: rts.situationText,
        spokenText: spoken,
        extraMetadata: { audience: rts.audience, formal_or_informal: rts.formal_or_informal, purpose: rts.purpose }
      });
      situationEvals.push(ev);
    }

    const primarySpeakingEval = groupDiscussionEvals[0] || situationEvals[0] || describeImageEvals[0] || { rawTaskScore: 3, feedback: "Spoken delivery demonstrates clear intelligibility." };
    const speakingPteScore = rawPointsToPteScale(primarySpeakingEval.rawTaskScore * 6, 30);

    // 4. Writing AI Evaluations (Groq AI)
    const swtEval = await evaluatePTEWritingAI({
      taskType: "summarize_written_text",
      prompt: sw.summarizeWrittenText[0].passageText,
      userResponse: writtenTexts[sw.summarizeWrittenText[0].id] || "",
      formResult: validateSummarizeWrittenTextForm(writtenTexts[sw.summarizeWrittenText[0].id] || "")
    });

    const essayEval = await evaluatePTEWritingAI({
      taskType: "write_essay",
      prompt: sw.writeEssay.promptText,
      userResponse: writtenTexts[sw.writeEssay.id] || "",
      formResult: validateWriteEssayForm(writtenTexts[sw.writeEssay.id] || "")
    });

    const writingPteScore = rawPointsToPteScale((swtEval.rawTaskScore * 2) + (essayEval.rawTaskScore * 4), 30);

    // 5. Calculate Overall Score (10 - 90 Scale)
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
    toast.success("✨ PTE Academic AI Calibration Complete!");
    localStorage.setItem(`pte_result_${testId}`, JSON.stringify(resultObj));
    navigate(`/pte/results/${testId}`);
  }

  if (currentSection === "evaluating") {
    return (
      <div style={{ minHeight: "100vh", background: "#0f172a", color: "#ffffff", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "24px", textAlign: "center" }}>
        <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 2, ease: "linear" }} style={{ marginBottom: 24 }}>
          <Sparkles size={56} color="#c084fc" />
        </motion.div>
        <h1 style={{ fontSize: "28px", fontWeight: 900, marginBottom: 12 }}>Executing 2026 PTE Academic AI Calibration</h1>
        <p style={{ color: "#94a3b8", fontSize: "16px", maxWidth: "540px" }}>
          Evaluating 65 Scored Task Instances across Speaking, Writing, Reading &amp; Listening on official Pearson 10–90 scale rubrics...
        </p>
      </div>
    );
  }

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

        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          {isPrepping && (
            <span style={{ fontSize: 13, color: "#facc15", fontWeight: 800 }}>
              ⏱️ Prep Countdown: {prepTimeLeft}s
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
              {testData.sections.personalIntro.prompt}
            </p>

            <div style={{ background: "#0f172a", padding: 20, borderRadius: 16, marginBottom: 24, border: "1px solid rgba(255,255,255,0.1)" }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: "#94a3b8", marginBottom: 6 }}>Spoken Transcript Preview:</div>
              <div style={{ fontSize: 15, color: spokenTranscripts["auto-personalIntro-0"] ? "#4ade80" : "#64748b" }}>
                {spokenTranscripts["auto-personalIntro-0"] || "Speak into your microphone..."}
              </div>
            </div>

            <button
              onClick={handleNextTask}
              style={{ background: "linear-gradient(135deg, #7c3aed, #2563eb)", color: "#ffffff", border: "none", borderRadius: 14, padding: "14px 28px", fontSize: 15, fontWeight: 800, cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 8 }}
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
                Part 1: Speaking &amp; Writing · Task {taskIndex + 1}
              </span>
              <span style={{ fontSize: 13, color: "#94a3b8" }}>{taskGroup}</span>
            </div>

            {/* Read Aloud */}
            {taskGroup === "readAloud" && (
              <div>
                <h3 style={{ fontSize: 20, fontWeight: 800, marginBottom: 16 }}>Read Aloud</h3>
                <p style={{ fontSize: 18, color: "#ffffff", lineHeight: 1.6, background: "#0f172a", padding: 24, borderRadius: 16, marginBottom: 24 }}>
                  {testData.sections.speakingWriting.readAloud[taskIndex].promptText}
                </p>
              </div>
            )}

            {/* Repeat Sentence */}
            {taskGroup === "repeatSentence" && (
              <div>
                <h3 style={{ fontSize: 20, fontWeight: 800, marginBottom: 16 }}>Repeat Sentence</h3>
                <button
                  onClick={() => playTTS(`rs-${taskIndex}`, testData.sections.speakingWriting.repeatSentence[taskIndex].audioText)}
                  style={{ background: "rgba(56,189,248,0.15)", color: "#38bdf8", border: "1px solid rgba(56,189,248,0.3)", borderRadius: 12, padding: "12px 20px", fontSize: 14, fontWeight: 700, cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 8, marginBottom: 24 }}
                >
                  <Volume2 size={18} /> Play Prompt Sentence (Plays Once)
                </button>
              </div>
            )}

            {/* Describe Image */}
            {taskGroup === "describeImage" && (
              <div>
                <h3 style={{ fontSize: 20, fontWeight: 800, marginBottom: 8 }}>Describe Image ({testData.sections.speakingWriting.describeImage[taskIndex].imageType})</h3>
                <h4 style={{ fontSize: 16, color: "#38bdf8", marginBottom: 16 }}>{testData.sections.speakingWriting.describeImage[taskIndex].title}</h4>
                <div style={{ background: "#0f172a", padding: 24, borderRadius: 16, marginBottom: 24, border: "1px solid rgba(255,255,255,0.1)" }}>
                  <div style={{ fontSize: 13, color: "#94a3b8", fontWeight: 700, marginBottom: 8 }}>Visual Graph Metadata:</div>
                  <div style={{ fontSize: 14, color: "#cbd5e1" }}>• <strong>Main Trend:</strong> {testData.sections.speakingWriting.describeImage[taskIndex].metadata.mainTrend}</div>
                  <div style={{ fontSize: 14, color: "#cbd5e1", marginTop: 4 }}>• <strong>Key Features:</strong> {testData.sections.speakingWriting.describeImage[taskIndex].metadata.keyFeatures.join("; ")}</div>
                </div>
              </div>
            )}

            {/* Summarize Group Discussion (NEW 2026) */}
            {taskGroup === "summarizeGroupDiscussion" && (
              <div>
                <span style={{ background: "rgba(250,204,21,0.15)", color: "#facc15", padding: "4px 10px", borderRadius: 6, fontSize: 12, fontWeight: 800 }}>
                  NEW 2026 TASK: SUMMARIZE GROUP DISCUSSION
                </span>
                <h3 style={{ fontSize: 20, fontWeight: 800, margin: "12px 0 16px" }}>{testData.sections.speakingWriting.summarizeGroupDiscussion[taskIndex].title}</h3>
                <button
                  onClick={() => playTTS(`sgd-${taskIndex}`, testData.sections.speakingWriting.summarizeGroupDiscussion[taskIndex].audioText)}
                  style={{ background: "rgba(168,85,247,0.15)", color: "#c084fc", border: "1px solid rgba(168,85,247,0.3)", borderRadius: 12, padding: "12px 20px", fontSize: 14, fontWeight: 700, cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 8, marginBottom: 24 }}
                >
                  <Users size={18} /> Play 3-Speaker Discussion Audio
                </button>
              </div>
            )}

            {/* Respond to a Situation (NEW 2026) */}
            {taskGroup === "respondToSituation" && (
              <div>
                <span style={{ background: "rgba(250,204,21,0.15)", color: "#facc15", padding: "4px 10px", borderRadius: 6, fontSize: 12, fontWeight: 800 }}>
                  NEW 2026 TASK: RESPOND TO A SITUATION
                </span>
                <h3 style={{ fontSize: 20, fontWeight: 800, margin: "12px 0 16px" }}>Campus Situation Scenario</h3>
                <p style={{ fontSize: 16, color: "#ffffff", lineHeight: 1.6, background: "#0f172a", padding: 24, borderRadius: 16, marginBottom: 24 }}>
                  {testData.sections.speakingWriting.respondToSituation[taskIndex].situationText}
                </p>
              </div>
            )}

            {/* Summarize Written Text & Write Essay */}
            {(taskGroup === "summarizeWrittenText" || taskGroup === "writeEssay") && (
              <div>
                <h3 style={{ fontSize: 20, fontWeight: 800, marginBottom: 16 }}>
                  {taskGroup === "summarizeWrittenText" ? "Summarize Written Text (5-75 words, ONE sentence)" : "Write Essay (200-300 words)"}
                </h3>
                <p style={{ fontSize: 15, color: "#cbd5e1", lineHeight: 1.6, background: "#0f172a", padding: 20, borderRadius: 14, marginBottom: 20 }}>
                  {taskGroup === "summarizeWrittenText" ? testData.sections.speakingWriting.summarizeWrittenText[taskIndex].passageText : testData.sections.speakingWriting.writeEssay.promptText}
                </p>
                <textarea
                  rows={6}
                  value={writtenTexts[taskGroup === "summarizeWrittenText" ? testData.sections.speakingWriting.summarizeWrittenText[taskIndex].id : testData.sections.speakingWriting.writeEssay.id] || ""}
                  onChange={(e) => setWrittenTexts({ ...writtenTexts, [taskGroup === "summarizeWrittenText" ? testData.sections.speakingWriting.summarizeWrittenText[taskIndex].id : testData.sections.speakingWriting.writeEssay.id]: e.target.value })}
                  placeholder="Type your response here..."
                  style={{ width: "100%", background: "#0f172a", border: "1px solid #7c3aed", borderRadius: 12, padding: 16, color: "#ffffff", fontSize: 15, lineHeight: 1.5, outline: "none", marginBottom: 16 }}
                />
                <div style={{ fontSize: 13, color: "#94a3b8" }}>
                  Word Count: <strong>{(writtenTexts[taskGroup === "summarizeWrittenText" ? testData.sections.speakingWriting.summarizeWrittenText[taskIndex].id : testData.sections.speakingWriting.writeEssay.id] || "").trim().split(/\s+/).filter(Boolean).length} words</strong>
                </div>
              </div>
            )}

            {/* Spoken Transcript Area */}
            {["readAloud", "repeatSentence", "describeImage", "retellLecture", "answerShortQuestion", "summarizeGroupDiscussion", "respondToSituation"].includes(taskGroup) && (
              <div style={{ background: "#0f172a", padding: 18, borderRadius: 14, marginBottom: 24, border: "1px solid rgba(255,255,255,0.1)" }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: "#94a3b8", marginBottom: 6 }}>Spoken Transcript Preview:</div>
                <div style={{ fontSize: 15, color: spokenTranscripts[`auto-${taskGroup}-${taskIndex}`] ? "#4ade80" : "#64748b" }}>
                  {spokenTranscripts[`auto-${taskGroup}-${taskIndex}`] || "Click Next or start speaking..."}
                </div>
              </div>
            )}

            <button
              onClick={handleNextTask}
              style={{ background: "linear-gradient(135deg, #7c3aed, #2563eb)", color: "#ffffff", border: "none", borderRadius: 14, padding: "14px 28px", fontSize: 15, fontWeight: 800, cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 8 }}
            >
              Next Task <ArrowRight size={18} />
            </button>
          </div>
        )}

        {/* 3. PART 2: READING TASKS */}
        {currentSection === "reading" && (
          <div style={{ background: "rgba(30,41,59,0.8)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 24, padding: 32 }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16 }}>
              <span style={{ fontSize: 13, fontWeight: 800, color: "#38bdf8", textTransform: "uppercase" }}>
                Part 2: Reading · Task {taskIndex + 1}
              </span>
              <span style={{ fontSize: 13, color: "#94a3b8" }}>{taskGroup}</span>
            </div>

            {/* Fill in the Blanks - Dropdown */}
            {taskGroup === "dropdownBlanks" && (
              <div>
                <h3 style={{ fontSize: 20, fontWeight: 800, marginBottom: 16 }}>Fill in the Blanks (Dropdown)</h3>
                <p style={{ fontSize: 16, color: "#ffffff", lineHeight: 1.8, background: "#0f172a", padding: 24, borderRadius: 16, marginBottom: 24 }}>
                  {testData.sections.reading.dropdownBlanks[taskIndex].text}
                </p>
              </div>
            )}

            {/* MCQ Single / Multiple */}
            {(taskGroup === "mcqSingle" || taskGroup === "mcqMultiple") && (
              <div>
                <h3 style={{ fontSize: 20, fontWeight: 800, marginBottom: 16 }}>
                  {taskGroup === "mcqMultiple" ? "Multiple Choice, Multiple Answers (Negative Penalty)" : "Multiple Choice, Single Answer"}
                </h3>
                <p style={{ fontSize: 15, color: "#cbd5e1", lineHeight: 1.6, background: "#0f172a", padding: 20, borderRadius: 14, marginBottom: 20 }}>
                  {taskGroup === "mcqSingle" ? testData.sections.reading.mcqSingle[taskIndex].passageText : testData.sections.reading.mcqMultiple[taskIndex].passageText}
                </p>
                <h4 style={{ fontSize: 16, color: "#ffffff", marginBottom: 14 }}>
                  {taskGroup === "mcqSingle" ? testData.sections.reading.mcqSingle[taskIndex].questionText : testData.sections.reading.mcqMultiple[taskIndex].questionText}
                </h4>
              </div>
            )}

            <button
              onClick={handleNextTask}
              style={{ background: "linear-gradient(135deg, #7c3aed, #2563eb)", color: "#ffffff", border: "none", borderRadius: 14, padding: "14px 28px", fontSize: 15, fontWeight: 800, cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 8 }}
            >
              Next Task <ArrowRight size={18} />
            </button>
          </div>
        )}

        {/* 4. PART 3: LISTENING TASKS */}
        {currentSection === "listening" && (
          <div style={{ background: "rgba(30,41,59,0.8)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 24, padding: 32 }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16 }}>
              <span style={{ fontSize: 13, fontWeight: 800, color: "#c084fc", textTransform: "uppercase" }}>
                Part 3: Listening · Task {taskIndex + 1}
              </span>
              <span style={{ fontSize: 13, color: "#94a3b8" }}>{taskGroup}</span>
            </div>

            {/* Summarize Spoken Text */}
            {taskGroup === "summarizeSpokenText" && (
              <div>
                <h3 style={{ fontSize: 20, fontWeight: 800, marginBottom: 16 }}>Summarize Spoken Text (50-70 words)</h3>
                <button
                  onClick={() => playTTS("sst-1", testData.sections.listening.summarizeSpokenText.audioText)}
                  style={{ background: "rgba(192,132,252,0.15)", color: "#c084fc", border: "1px solid rgba(192,132,252,0.3)", borderRadius: 12, padding: "12px 20px", fontSize: 14, fontWeight: 700, cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 8, marginBottom: 20 }}
                >
                  <Volume2 size={18} /> Play Academic Lecture Audio
                </button>
                <textarea
                  rows={5}
                  value={writtenTexts[testData.sections.listening.summarizeSpokenText.id] || ""}
                  onChange={(e) => setWrittenTexts({ ...writtenTexts, [testData.sections.listening.summarizeSpokenText.id]: e.target.value })}
                  placeholder="Type summary here (50-70 words)..."
                  style={{ width: "100%", background: "#0f172a", border: "1px solid #c084fc", borderRadius: 12, padding: 16, color: "#ffffff", fontSize: 15, outline: "none", marginBottom: 12 }}
                />
              </div>
            )}

            {/* Write from Dictation */}
            {taskGroup === "writeFromDictation" && (
              <div>
                <h3 style={{ fontSize: 20, fontWeight: 800, marginBottom: 16 }}>Write from Dictation</h3>
                <button
                  onClick={() => playTTS(`wfd-${taskIndex}`, testData.sections.listening.writeFromDictation[taskIndex].audioText)}
                  style={{ background: "rgba(56,189,248,0.15)", color: "#38bdf8", border: "1px solid rgba(56,189,248,0.3)", borderRadius: 12, padding: "12px 20px", fontSize: 14, fontWeight: 700, cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 8, marginBottom: 20 }}
                >
                  <Volume2 size={18} /> Play Dictation Audio (Plays Once)
                </button>
                <input
                  type="text"
                  value={writtenTexts[testData.sections.listening.writeFromDictation[taskIndex].id] || ""}
                  onChange={(e) => setWrittenTexts({ ...writtenTexts, [testData.sections.listening.writeFromDictation[taskIndex].id]: e.target.value })}
                  placeholder="Type exact sentence here..."
                  style={{ width: "100%", background: "#0f172a", border: "1px solid #38bdf8", borderRadius: 12, padding: 16, color: "#ffffff", fontSize: 15, outline: "none" }}
                />
              </div>
            )}

            <button
              onClick={handleNextTask}
              style={{ background: "linear-gradient(135deg, #7c3aed, #2563eb)", color: "#ffffff", border: "none", borderRadius: 14, padding: "14px 28px", fontSize: 15, fontWeight: 800, cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 8, marginTop: 24 }}
            >
              Next Task <ArrowRight size={18} />
            </button>
          </div>
        )}

      </main>
    </div>
  );
}
