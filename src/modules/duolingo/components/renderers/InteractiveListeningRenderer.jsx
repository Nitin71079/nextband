import React, { useState, useRef } from "react";
import { Volume2, Clock, ArrowRight, CheckCircle2, MessageSquare, FileText } from "lucide-react";
import toast from "react-hot-toast";

export default function InteractiveListeningRenderer({ item, onSubmit, submitting }) {
  const [stage, setStage] = useState(0); // 0: Listen Scenario, 1: Comprehension, 2: Interactive Conversation, 3: Summary
  const [compAnswers, setCompAnswers] = useState({});
  const [turnAnswers, setTurnAnswers] = useState({});
  const [summaryText, setSummaryText] = useState("");
  const audioRef = useRef(null);

  if (!item) return null;

  const ilData = item.interactiveListening || {
    scenarioAudioText: item.scenarioAudioText || item.scenarioText || "Hi, I wanted to discuss our lab schedule for next week. We need to reserve the spectroscopy machine before Tuesday.",
    comprehensionQ1: {
      prompt: "What machine needs to be reserved?",
      options: ["Spectroscopy machine", "Microscope", "Thermal cycler"],
      answer: "Spectroscopy machine"
    },
    comprehensionQ2: {
      prompt: "Why does the student need to reserve the machine?",
      options: [
        "To complete a chemistry lab experiment before Tuesday",
        "To attend a laboratory lecture",
        "To repair the equipment",
        "To prepare a campus presentation"
      ],
      answer: "To complete a chemistry lab experiment before Tuesday"
    },
    conversationTurns: [
      {
        partnerPrompt: "Professor: \"The spectroscopy machine is available tomorrow afternoon. Would you like me to reserve it for your lab group?\"",
        options: [
          "Yes, please. Tomorrow afternoon would work well for us.",
          "I used the microscope last semester.",
          "The experiment was published last year.",
          "I don't think spectroscopy is a type of machine."
        ],
        correctIndex: 0
      },
      {
        partnerPrompt: "Professor: \"Great! I've booked it for 2:00 PM. Please ensure your group completes safety checks first.\"",
        options: [
          "Thank you, we will complete the safety checklist before starting.",
          "We decided to skip the lab session today.",
          "The library closes at midnight.",
          "I will buy a new machine online."
        ],
        correctIndex: 0
      }
    ],
    summaryPrompt: "Summarize the conversation you just heard."
  };

  function playAudio(text) {
    if (item.audioUrl) {
      if (audioRef.current) {
        audioRef.current.currentTime = 0;
        audioRef.current.play().catch(() => playSpeechFallback(text));
      } else {
        const audio = new Audio(item.audioUrl);
        audioRef.current = audio;
        audio.play().catch(() => playSpeechFallback(text));
      }
    } else {
      playSpeechFallback(text);
    }
  }

  function playSpeechFallback(text) {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(text);
      u.rate = 0.95;
      window.speechSynthesis.speak(u);
    } else {
      toast.error("Audio playback not available");
    }
  }

  const handleNextStage = () => {
    if (stage < 3) {
      setStage(prev => prev + 1);
    } else {
      if (onSubmit) {
        onSubmit({ compAnswers, turnAnswers, summaryText }, 0.9);
      }
    }
  };

  return (
    <div
      style={{
        background: "var(--card, #ffffff)",
        border: "1px solid var(--border, #e2e8f0)",
        borderRadius: "24px",
        padding: "32px",
        maxWidth: "880px",
        margin: "0 auto",
        boxShadow: "0 10px 30px rgba(0, 0, 0, 0.05)",
        fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      }}
    >
      {/* ── HEADER BADGE & PROGRESS ── */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "24px", flexWrap: "wrap", gap: 12 }}>
        <span
          style={{
            background: "#8b5cf6",
            color: "#ffffff",
            padding: "6px 16px",
            borderRadius: "999px",
            fontSize: "13px",
            fontWeight: "900",
            letterSpacing: "0.5px",
          }}
        >
          INTERACTIVE LISTENING
        </span>

        <div style={{ display: "flex", gap: 6 }}>
          {["Scenario", "Comprehension", "Conversation", "Summary"].map((name, idx) => (
            <span
              key={name}
              style={{
                fontSize: "11px",
                fontWeight: "800",
                padding: "4px 10px",
                borderRadius: "999px",
                background: idx === stage ? "#8b5cf6" : idx < stage ? "rgba(139, 92, 246, 0.2)" : "var(--det-surface-2, #f1f5f9)",
                color: idx === stage ? "#ffffff" : idx < stage ? "#8b5cf6" : "var(--det-text-muted, #94a3b8)",
              }}
            >
              {name}
            </span>
          ))}
        </div>
      </div>

      {/* ── STAGE 0: LISTEN TO SCENARIO AUDIO ── */}
      {stage === 0 && (
        <div style={{ textAlign: "center", padding: "40px 20px" }}>
          <h3 style={{ fontSize: "22px", fontWeight: "800", color: "var(--text, #1e293b)", marginBottom: "12px" }}>
            Listen to the scenario and answer the questions.
          </h3>
          <p style={{ color: "var(--text-secondary, #64748b)", fontSize: "14px", marginBottom: "32px" }}>
            Press play to listen to the scenario audio recording carefully before answering questions.
          </p>

          <button
            onClick={() => playAudio(ilData.scenarioAudioText)}
            style={{
              background: "linear-gradient(135deg, #8b5cf6, #7c3aed)",
              color: "#ffffff",
              border: "none",
              borderRadius: "999px",
              padding: "16px 36px",
              fontSize: "16px",
              fontWeight: "800",
              cursor: "pointer",
              display: "inline-flex",
              alignItems: "center",
              gap: "10px",
              boxShadow: "0 6px 20px rgba(139, 92, 246, 0.35)",
            }}
          >
            <Volume2 size={22} /> 🔊 Play Campus Audio Scenario
          </button>
        </div>
      )}

      {/* ── STAGE 1: COMPREHENSION QUESTIONS (QUESTIONS 1 & 2) ── */}
      {stage === 1 && (
        <div>
          <div style={{ fontSize: 13, fontWeight: 900, color: "#8b5cf6", letterSpacing: "1px", textTransform: "uppercase", marginBottom: 6 }}>
            COMPREHENSION
          </div>
          <h3 style={{ fontSize: "20px", fontWeight: "800", color: "var(--text, #1e293b)", marginBottom: "20px" }}>
            Answer the comprehension questions about the scenario.
          </h3>

          {/* Question 1 */}
          <div style={{ background: "var(--surface, #f8fafc)", padding: "20px", borderRadius: "18px", border: "1px solid var(--border, #e2e8f0)", marginBottom: "20px" }}>
            <div style={{ fontSize: "15px", fontWeight: "800", color: "var(--text, #1e293b)", marginBottom: "14px" }}>
              1. {ilData.comprehensionQ1.prompt}
            </div>
            {ilData.comprehensionQ1.options.map((opt, oIdx) => {
              const isSel = compAnswers[1] === oIdx;
              return (
                <button
                  key={oIdx}
                  onClick={() => setCompAnswers(prev => ({ ...prev, 1: oIdx }))}
                  style={{
                    width: "100%",
                    textAlign: "left",
                    padding: "12px 16px",
                    borderRadius: "12px",
                    border: isSel ? "2px solid #8b5cf6" : "1px solid var(--border, #cbd5e1)",
                    background: isSel ? "rgba(139, 92, 246, 0.12)" : "#ffffff",
                    color: isSel ? "#7c3aed" : "var(--text, #334155)",
                    fontWeight: "600",
                    fontSize: "14px",
                    marginBottom: "8px",
                    cursor: "pointer",
                  }}
                >
                  {opt}
                </button>
              );
            })}
          </div>

          {/* Question 2 */}
          <div style={{ background: "var(--surface, #f8fafc)", padding: "20px", borderRadius: "18px", border: "1px solid var(--border, #e2e8f0)", marginBottom: "16px" }}>
            <div style={{ fontSize: "15px", fontWeight: "800", color: "var(--text, #1e293b)", marginBottom: "14px" }}>
              2. {ilData.comprehensionQ2.prompt}
            </div>
            {ilData.comprehensionQ2.options.map((opt, oIdx) => {
              const isSel = compAnswers[2] === oIdx;
              return (
                <button
                  key={oIdx}
                  onClick={() => setCompAnswers(prev => ({ ...prev, 2: oIdx }))}
                  style={{
                    width: "100%",
                    textAlign: "left",
                    padding: "12px 16px",
                    borderRadius: "12px",
                    border: isSel ? "2px solid #8b5cf6" : "1px solid var(--border, #cbd5e1)",
                    background: isSel ? "rgba(139, 92, 246, 0.12)" : "#ffffff",
                    color: isSel ? "#7c3aed" : "var(--text, #334155)",
                    fontWeight: "600",
                    fontSize: "14px",
                    marginBottom: "8px",
                    cursor: "pointer",
                  }}
                >
                  {opt}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* ── STAGE 2: INTERACTIVE CONVERSATION (TURN-BY-TURN) ── */}
      {stage === 2 && (
        <div>
          <div style={{ fontSize: 13, fontWeight: 900, color: "#8b5cf6", letterSpacing: "1px", textTransform: "uppercase", marginBottom: 6 }}>
            INTERACTIVE CONVERSATION
          </div>
          <h3 style={{ fontSize: "19px", fontWeight: "800", color: "var(--text, #1e293b)", marginBottom: "18px" }}>
            Listen to each line and choose the best response.
          </h3>

          {ilData.conversationTurns.map((turn, tIdx) => (
            <div key={tIdx} style={{ background: "var(--surface, #f8fafc)", padding: "20px", borderRadius: "18px", border: "1px solid var(--border, #e2e8f0)", marginBottom: "20px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12, background: "rgba(139, 92, 246, 0.1)", padding: "10px 16px", borderRadius: 12, color: "#7c3aed", fontWeight: 800, fontSize: 14 }}>
                <MessageSquare size={18} /> {turn.partnerPrompt}
              </div>

              <div style={{ fontSize: 13, fontWeight: 700, color: "var(--text-secondary, #64748b)", marginBottom: 10 }}>
                Choose the best response:
              </div>

              {turn.options.map((opt, oIdx) => {
                const isSel = turnAnswers[tIdx] === oIdx;
                return (
                  <button
                    key={oIdx}
                    onClick={() => setTurnAnswers(prev => ({ ...prev, [tIdx]: oIdx }))}
                    style={{
                      width: "100%",
                      textAlign: "left",
                      padding: "12px 16px",
                      borderRadius: "12px",
                      border: isSel ? "2px solid #8b5cf6" : "1px solid var(--border, #cbd5e1)",
                      background: isSel ? "rgba(139, 92, 246, 0.12)" : "#ffffff",
                      color: isSel ? "#7c3aed" : "var(--text, #334155)",
                      fontWeight: "600",
                      fontSize: "14px",
                      marginBottom: "8px",
                      cursor: "pointer",
                    }}
                  >
                    {opt}
                  </button>
                );
              })}
            </div>
          ))}
        </div>
      )}

      {/* ── STAGE 3: CONVERSATION SUMMARY ── */}
      {stage === 3 && (
        <div>
          <div style={{ fontSize: 13, fontWeight: 900, color: "#8b5cf6", letterSpacing: "1px", textTransform: "uppercase", marginBottom: 6 }}>
            SUMMARY
          </div>
          <h3 style={{ fontSize: "20px", fontWeight: "800", color: "var(--text, #1e293b)", marginBottom: "8px" }}>
            Summarize the conversation you heard.
          </h3>
          <p style={{ color: "var(--text-secondary, #64748b)", fontSize: "14px", marginBottom: "20px" }}>
            Write a clear, concise summary of the key points discussed in the conversation.
          </p>

          <textarea
            value={summaryText}
            onChange={e => setSummaryText(e.target.value)}
            placeholder="Write a summary of the conversation you heard..."
            rows={6}
            style={{
              width: "100%",
              borderRadius: "16px",
              border: "2px solid #8b5cf6",
              padding: "16px",
              fontSize: "15px",
              background: "var(--bg, #ffffff)",
              color: "var(--text, #0f172a)",
              outline: "none",
              resize: "vertical",
              boxSizing: "border-box",
              fontFamily: "inherit",
              marginBottom: "16px",
            }}
          />
        </div>
      )}

      {/* ── FOOTER NAVIGATION BUTTON ── */}
      <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "28px" }}>
        <button
          onClick={handleNextStage}
          disabled={submitting || (stage === 1 && (!compAnswers[1] || !compAnswers[2])) || (stage === 2 && turnAnswers[0] === undefined)}
          style={{
            background: "linear-gradient(135deg, #8b5cf6, #6d28d9)",
            color: "#ffffff",
            border: "none",
            borderRadius: "14px",
            padding: "14px 32px",
            fontSize: "15px",
            fontWeight: "800",
            cursor: submitting ? "not-allowed" : "pointer",
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            boxShadow: "0 4px 14px rgba(139, 92, 246, 0.35)",
          }}
        >
          {stage === 3 ? "Submit Interactive Listening ✨" : "Continue to Next Stage"} <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
}
