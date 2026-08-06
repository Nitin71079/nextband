import React, { useState, useEffect, useRef } from "react";
import { useVirtualExaminer } from "../hooks/useVirtualExaminer";
import { Mic, MicOff, Volume2, Play, SkipForward, Clock, Sparkles, CheckCircle2, FileEdit } from "lucide-react";
import toast from "react-hot-toast";

export default function InteractiveSpeakingEngine({ test, onFinishTest }) {
  const { speak, stop, isSpeaking } = useVirtualExaminer();

  // Test Phase: "IDLE" | "PART1" | "PART2_PREP" | "PART2_SPEAKING" | "PART3" | "FINISHED"
  const [phase, setPhase] = useState("IDLE");
  const [part1Index, setPart1Index] = useState(0);
  const [part3Index, setPart3Index] = useState(0);

  // Status: "EXAMINER_SPEAKING" | "USER_SPEAKING" | "PREPARING"
  const [status, setStatus] = useState("IDLE");

  // Timers
  const [timer, setTimer] = useState(0);
  const [prepNotes, setPrepNotes] = useState("");

  // Transcripts storage
  const [transcripts, setTranscripts] = useState({
    part1: [],
    part2: "",
    part3: [],
  });

  const [currentInput, setCurrentInput] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const recognitionRef = useRef(null);

  // Initialize Speech Recognition if supported
  useEffect(() => {
    if (typeof window === "undefined") return;
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

    if (SpeechRecognition) {
      const rec = new SpeechRecognition();
      rec.continuous = true;
      rec.interimResults = true;
      rec.lang = "en-US";

      rec.onresult = (event) => {
        let currentText = "";
        for (let i = event.resultIndex; i < event.results.length; i++) {
          currentText += event.results[i][0].transcript + " ";
        }
        setCurrentInput((prev) => (prev ? `${prev} ${currentText.trim()}` : currentText.trim()));
      };

      rec.onerror = (e) => {
        console.warn("Speech recognition error:", e.error);
      };

      recognitionRef.current = rec;
    }

    return () => {
      stop();
      if (recognitionRef.current) {
        try { recognitionRef.current.stop(); } catch {}
      }
    };
  }, []);

  // Always reset state on mount or test change
  useEffect(() => {
    stop();
    setPhase("IDLE");
    setStatus("IDLE");
    setTimer(0);
    setPrepNotes("");
    setPart1Index(0);
    setPart3Index(0);
    setTranscripts({ part1: [], part2: "", part3: [] });
    setCurrentInput("");
  }, [test?.id]);

  // Timer Countdown Effect
  useEffect(() => {
    if (timer <= 0) return;

    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          handleTimerExpire();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [timer, phase, status]);

  // Handle timer expiration
  const handleTimerExpire = () => {
    if (phase === "PART1" && status === "USER_SPEAKING") {
      savePart1CurrentAnswer();
    } else if (phase === "PART2_PREP") {
      startPart2Speaking();
    } else if (phase === "PART2_SPEAKING" && status === "USER_SPEAKING") {
      savePart2Answer();
    } else if (phase === "PART3" && status === "USER_SPEAKING") {
      savePart3CurrentAnswer();
    }
  };

  // -------------------------------------------------------------
  // START INTERACTIVE TEST
  // -------------------------------------------------------------
  const startFullTest = () => {
    setPhase("PART1");
    setPart1Index(0);
    setTranscripts({ part1: [], part2: "", part3: [] });
    setCurrentInput("");
    speakPart1Question(0);
  };

  // -------------------------------------------------------------
  // PART 1 HANDLERS
  // -------------------------------------------------------------
  const speakPart1Question = (idx) => {
    const qText = test.part1.questions[idx];
    if (!qText) {
      startPart2Intro();
      return;
    }

    setStatus("EXAMINER_SPEAKING");
    setCurrentInput("");
    stopRecording();

    const introMsg = idx === 0 
      ? `Welcome to IELTS Speaking Test ${test.id}. Let us begin with Part 1. ${qText}`
      : qText;

    speak(introMsg, () => {
      setStatus("USER_SPEAKING");
      setTimer(35); // 35 seconds per Part 1 question
      startRecording();
    });
  };

  const savePart1CurrentAnswer = () => {
    stopRecording();

    const textToSave = currentInput.trim() || "(No response recorded)";
    setTranscripts((prev) => ({
      ...prev,
      part1: [...prev.part1, { question: test.part1.questions[part1Index], answer: textToSave }],
    }));

    if (part1Index + 1 < test.part1.questions.length) {
      const nextIdx = part1Index + 1;
      setPart1Index(nextIdx);
      speakPart1Question(nextIdx);
    } else {
      startPart2Intro();
    }
  };

  // -------------------------------------------------------------
  // PART 2 HANDLERS (Cue Card: 1m Prep + 2m Speech)
  // -------------------------------------------------------------
  const startPart2Intro = () => {
    setPhase("PART2_PREP");
    setStatus("EXAMINER_SPEAKING");
    setCurrentInput("");
    stopRecording();

    const cueMsg = `Thank you. Now moving to Part 2. Here is your Cue Card. You have 1 minute to prepare your notes before speaking for up to 2 minutes. Your prep time starts now.`;

    speak(cueMsg, () => {
      setStatus("PREPARING");
      setTimer(60); // 60 seconds preparation timer
    });
  };

  const startPart2Speaking = () => {
    setPhase("PART2_SPEAKING");
    setStatus("EXAMINER_SPEAKING");
    stopRecording();

    const prepEndMsg = `Your 1 minute preparation time is up. Please begin speaking now. You have 2 minutes.`;

    speak(prepEndMsg, () => {
      setStatus("USER_SPEAKING");
      setTimer(120); // 120 seconds (2 minutes) speech timer
      startRecording();
    });
  };

  const savePart2Answer = () => {
    stopRecording();

    const textToSave = currentInput.trim() || "(No response recorded)";
    setTranscripts((prev) => ({
      ...prev,
      part2: textToSave,
    }));

    startPart3Intro();
  };

  // -------------------------------------------------------------
  // PART 3 HANDLERS
  // -------------------------------------------------------------
  const startPart3Intro = () => {
    setPhase("PART3");
    setPart3Index(0);
    speakPart3Question(0);
  };

  const speakPart3Question = (idx) => {
    const qText = test.part3.questions[idx];
    if (!qText) {
      finishInteractiveTest();
      return;
    }

    setStatus("EXAMINER_SPEAKING");
    setCurrentInput("");
    stopRecording();

    const introMsg = idx === 0 
      ? `Now we move on to Part 3, the discussion section. Here is your first question: ${qText}`
      : qText;

    speak(introMsg, () => {
      setStatus("USER_SPEAKING");
      setTimer(45); // 45 seconds per Part 3 question
      startRecording();
    });
  };

  const savePart3CurrentAnswer = () => {
    stopRecording();

    const textToSave = currentInput.trim() || "(No response recorded)";
    setTranscripts((prev) => ({
      ...prev,
      part3: [...prev.part3, { question: test.part3.questions[part3Index], answer: textToSave }],
    }));

    if (part3Index + 1 < test.part3.questions.length) {
      const nextIdx = part3Index + 1;
      setPart3Index(nextIdx);
      speakPart3Question(nextIdx);
    } else {
      finishInteractiveTest();
    }
  };

  // -------------------------------------------------------------
  // FINISH TEST & COMPILE TRANSCRIPT
  // -------------------------------------------------------------
  const finishInteractiveTest = () => {
    stop();
    stopRecording();
    setPhase("FINISHED");
    setStatus("IDLE");

    const endingMsg = "That is the end of the IELTS Speaking Test. Thank you. Generating your AI evaluation report now.";
    speak(endingMsg);

    // Format full candidate transcript
    let compiled = `IELTS Speaking Test ${test.id} Full Candidate Transcript:\n\n`;

    compiled += `=== PART 1: INTRODUCTION & INTERVIEW ===\n`;
    transcripts.part1.forEach((item, idx) => {
      compiled += `Q${idx + 1}: ${item.question}\nAnswer: ${item.answer}\n\n`;
    });

    compiled += `=== PART 2: CUE CARD (LONG TURN) ===\n`;
    compiled += `Cue Card Topic: ${test.part2.cueCard}\nCandidate Notes: ${prepNotes}\nCandidate Speech: ${transcripts.part2 || currentInput}\n\n`;

    compiled += `=== PART 3: DISCUSSION ===\n`;
    transcripts.part3.forEach((item, idx) => {
      compiled += `Q${idx + 1}: ${item.question}\nAnswer: ${item.answer}\n\n`;
    });

    if (onFinishTest) {
      onFinishTest(compiled);
    }
  };

  // Recording controls
  const startRecording = () => {
    setIsRecording(true);
    if (recognitionRef.current) {
      try { recognitionRef.current.start(); } catch {}
    }
  };

  const stopRecording = () => {
    setIsRecording(false);
    if (recognitionRef.current) {
      try { recognitionRef.current.stop(); } catch {}
    }
  };

  const formatTimer = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  return (
    <div style={{ background: "#ffffff", borderRadius: "24px", padding: "30px", boxShadow: "0 12px 35px rgba(15,23,42,0.08)", border: "1px solid #e2e8f0" }}>
      
      {/* 🟢 HEADER STEPPER */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "25px", borderBottom: "2px solid #f1f5f9", paddingBottom: "20px" }}>
        <div>
          <h2 style={{ fontSize: "24px", fontWeight: "800", color: "#0f172a", margin: 0, display: "flex", alignItems: "center", gap: "10px" }}>
            <Sparkles style={{ color: "#0d9488" }} /> Interactive Virtual AI Examiner Simulator
          </h2>
          <p style={{ color: "#64748b", margin: "4px 0 0 0", fontSize: "14px" }}>
            Real-time voice narration, timed sections, and automated speech recognition.
          </p>
        </div>

        {/* Phase Badges */}
        <div style={{ display: "flex", gap: "10px" }}>
          <span style={{ padding: "6px 14px", borderRadius: "12px", fontSize: "13px", fontWeight: "700", background: phase === "PART1" ? "#0d9488" : "#f1f5f9", color: phase === "PART1" ? "#ffffff" : "#64748b" }}>
            Part 1: Interview
          </span>
          <span style={{ padding: "6px 14px", borderRadius: "12px", fontSize: "13px", fontWeight: "700", background: phase.includes("PART2") ? "#0d9488" : "#f1f5f9", color: phase.includes("PART2") ? "#ffffff" : "#64748b" }}>
            Part 2: Cue Card
          </span>
          <span style={{ padding: "6px 14px", borderRadius: "12px", fontSize: "13px", fontWeight: "700", background: phase === "PART3" ? "#0d9488" : "#f1f5f9", color: phase === "PART3" ? "#ffffff" : "#64748b" }}>
            Part 3: Discussion
          </span>
        </div>
      </div>

      {/* 🎬 IDLE START CARD */}
      {phase === "IDLE" && (
        <div style={{ textAlign: "center", padding: "40px 20px" }}>
          <div style={{ width: "90px", height: "90px", borderRadius: "50%", background: "linear-gradient(135deg,#0f766e,#0d9488)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px", color: "white", boxShadow: "0 10px 25px rgba(13,148,136,0.3)" }}>
            <Volume2 size={42} />
          </div>
          <h3 style={{ fontSize: "28px", fontWeight: "900", color: "#0f172a", marginBottom: "12px" }}>
            Ready to begin IELTS Speaking Test?
          </h3>
          <p style={{ maxWidth: "550px", margin: "0 auto 30px", color: "#475569", fontSize: "15px", lineHeight: "1.6" }}>
            The AI Examiner will read out each question aloud. You will have allocated time limits for each response (35s for Part 1, 1m prep + 2m speech for Part 2, and 45s for Part 3).
          </p>
          <button
            onClick={startFullTest}
            style={{ padding: "16px 42px", borderRadius: "16px", background: "linear-gradient(135deg,#0f766e,#0d9488)", color: "#ffffff", border: "none", fontSize: "18px", fontWeight: "800", cursor: "pointer", boxShadow: "0 10px 25px rgba(13,148,136,0.35)", display: "inline-flex", alignItems: "center", gap: "10px" }}
          >
            <Play size={20} /> Start Interactive AI Test Now
          </button>
        </div>
      )}

      {/* 🗣️ ACTIVE EXAMINER SIMULATOR CARD */}
      {phase !== "IDLE" && phase !== "FINISHED" && (
        <div>
          {/* AI Examiner Avatar & Status Bar */}
          <div style={{ background: "linear-gradient(135deg, #0f172a, #1e293b)", borderRadius: "20px", padding: "24px", color: "#ffffff", marginBottom: "25px", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "20px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
              <div style={{ position: "relative" }}>
                <div style={{ width: "64px", height: "64px", borderRadius: "50%", background: "#0d9488", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "28px" }}>
                  👩‍💼
                </div>
                {isSpeaking && (
                  <span style={{ position: "absolute", bottom: 0, right: 0, width: "16px", height: "16px", background: "#14b8a6", borderRadius: "50%", border: "2px solid #0f172a", animation: "pulse 1.5s infinite" }} />
                )}
              </div>
              <div>
                <h4 style={{ margin: 0, fontSize: "18px", fontWeight: "800", color: "#ffffff" }}>
                  Dr. Sarah Jenkins <span style={{ fontSize: "12px", opacity: 0.7, fontWeight: "400" }}>(AI Examiner)</span>
                </h4>
                <div style={{ fontSize: "14px", color: status === "EXAMINER_SPEAKING" ? "#38bdf8" : status === "USER_SPEAKING" ? "#2dd4bf" : "#fbbf24", fontWeight: "700", marginTop: "4px" }}>
                  {status === "EXAMINER_SPEAKING" && "🗣️ Examiner is reading question aloud..."}
                  {status === "USER_SPEAKING" && "🎙️ Candidate's Turn to Speak (Recording...)"}
                  {status === "PREPARING" && "⏱️ 1-Minute Note Preparation Time"}
                </div>
              </div>
            </div>

            {/* Live Countdown & Controls */}
            <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
              {timer > 0 && (
                <div style={{ background: "rgba(255,255,255,0.1)", padding: "10px 20px", borderRadius: "14px", textAlign: "center", border: "1px solid rgba(255,255,255,0.15)" }}>
                  <div style={{ fontSize: "11px", textTransform: "uppercase", letterSpacing: "1px", opacity: 0.8 }}>Time Left</div>
                  <div style={{ fontSize: "24px", fontWeight: "900", color: status === "USER_SPEAKING" ? "#2dd4bf" : "#ffffff" }}>
                    {formatTimer(timer)}
                  </div>
                </div>
              )}

              {status === "USER_SPEAKING" && (
                <button
                  onClick={handleTimerExpire}
                  style={{ background: "#0d9488", color: "white", border: "none", padding: "12px 22px", borderRadius: "12px", fontWeight: "800", cursor: "pointer", display: "flex", alignItems: "center", gap: "8px" }}
                >
                  <SkipForward size={16} /> Done Speaking
                </button>
              )}
            </div>
          </div>

          {/* 📋 CURRENT QUESTION / PROMPT DISPLAY */}
          <div style={{ background: "#f8fafc", borderRadius: "18px", padding: "24px", border: "1px solid #e2e8f0", marginBottom: "25px" }}>
            {phase === "PART1" && (
              <div>
                <span style={{ fontSize: "12px", fontWeight: "800", color: "#0d9488", textTransform: "uppercase" }}>
                  Part 1 • Question {part1Index + 1} of {test.part1.questions.length}
                </span>
                <h3 style={{ fontSize: "22px", fontWeight: "800", color: "#0f172a", marginTop: "8px" }}>
                  "{test.part1.questions[part1Index]}"
                </h3>
              </div>
            )}

            {phase === "PART2_PREP" && (
              <div>
                <span style={{ fontSize: "12px", fontWeight: "800", color: "#d97706", textTransform: "uppercase" }}>
                  Part 2 • Cue Card Note Preparation (60s)
                </span>
                <div style={{ whiteSpace: "pre-wrap", fontSize: "16px", fontWeight: "600", color: "#1e293b", marginTop: "12px" }}>
                  {test.part2.cueCard}
                </div>
                <div style={{ marginTop: "20px" }}>
                  <label style={{ fontSize: "13px", fontWeight: "700", color: "#475569", display: "flex", alignItems: "center", gap: "6px", marginBottom: "8px" }}>
                    <FileEdit size={16} /> Optional Preparation Notes:
                  </label>
                  <textarea
                    value={prepNotes}
                    onChange={(e) => setPrepNotes(e.target.value)}
                    placeholder="Type quick bullet points or notes here during your 1 minute preparation time..."
                    style={{ width: "100%", height: "90px", padding: "12px", borderRadius: "12px", border: "1px solid #cbd5e1" }}
                  />
                </div>
              </div>
            )}

            {phase === "PART2_SPEAKING" && (
              <div>
                <span style={{ fontSize: "12px", fontWeight: "800", color: "#0d9488", textTransform: "uppercase" }}>
                  Part 2 • Individual Long Turn Speech (Up to 2 Minutes)
                </span>
                <div style={{ whiteSpace: "pre-wrap", fontSize: "15px", color: "#334155", marginTop: "8px", background: "#ffffff", padding: "16px", borderRadius: "12px", border: "1px solid #e2e8f0" }}>
                  {test.part2.cueCard}
                </div>
              </div>
            )}

            {phase === "PART3" && (
              <div>
                <span style={{ fontSize: "12px", fontWeight: "800", color: "#2563eb", textTransform: "uppercase" }}>
                  Part 3 • Discussion Question {part3Index + 1} of {test.part3.questions.length}
                </span>
                <h3 style={{ fontSize: "22px", fontWeight: "800", color: "#0f172a", marginTop: "8px" }}>
                  "{test.part3.questions[part3Index]}"
                </h3>
              </div>
            )}
          </div>

          {/* 🎙️ LIVE RESPONSE INPUT / TRANSCRIPT AREA */}
          <div style={{ background: "#ffffff", borderRadius: "18px", padding: "20px", border: "1px solid #cbd5e1" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
              <label style={{ fontWeight: "700", fontSize: "14px", color: "#334155", display: "flex", alignItems: "center", gap: "6px" }}>
                <Mic size={16} style={{ color: isRecording ? "#ef4444" : "#64748b" }} /> 
                Live Speech Transcript / Response Input:
              </label>
              {isRecording && (
                <span style={{ fontSize: "12px", fontWeight: "800", color: "#ef4444", animation: "pulse 1s infinite" }}>
                  ● Recording Candidate Voice...
                </span>
              )}
            </div>

            <textarea
              value={currentInput}
              onChange={(e) => setCurrentInput(e.target.value)}
              disabled={status === "EXAMINER_SPEAKING"}
              placeholder={status === "EXAMINER_SPEAKING" ? "Listening to examiner question..." : "Speak into your microphone (or type your response)..."}
              style={{ width: "100%", height: "120px", padding: "14px", borderRadius: "14px", border: "1px solid #e2e8f0", fontSize: "15px", lineHeight: "1.5" }}
            />
          </div>
        </div>
      )}

      {/* 🏁 TEST FINISHED SUMMARY */}
      {phase === "FINISHED" && (
        <div style={{ textAlign: "center", padding: "30px 20px" }}>
          <div style={{ width: "80px", height: "80px", borderRadius: "50%", background: "#ccfbf1", color: "#0d9488", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px" }}>
            <CheckCircle2 size={48} />
          </div>
          <h3 style={{ fontSize: "26px", fontWeight: "900", color: "#0f172a" }}>
            Interactive Speaking Test Complete!
          </h3>
          <p style={{ color: "#475569", marginBottom: "20px" }}>
            All 3 sections have been recorded. Evaluating your fluency, vocabulary, and grammar band scores...
          </p>
        </div>
      )}

    </div>
  );
}
