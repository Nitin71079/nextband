import React, { useState } from "react";
import { Volume2, Clock, CheckCircle2, MessageSquare, ArrowRight, PenTool } from "lucide-react";
import toast from "react-hot-toast";

export default function InteractiveListeningRenderer({ item, onSubmit, submitting }) {
  const [stage, setStage] = useState(0); // 0: Listen, 1: Questions, 2: Complete Passage, 3: Conversation, 4: Summary
  const [answers, setAnswers] = useState({});
  const [summaryText, setSummaryText] = useState("");

  if (!item) return null;

  function playAudio(text) {
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
    if (stage < 4) {
      setStage(prev => prev + 1);
    } else {
      if (onSubmit) {
        onSubmit({ answers, summaryText }, 0.9);
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
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "24px" }}>
        <span
          style={{
            background: "rgba(139, 92, 246, 0.1)",
            color: "#8b5cf6",
            padding: "4px 14px",
            borderRadius: "999px",
            fontSize: "12px",
            fontWeight: "800",
            letterSpacing: "0.5px",
            textTransform: "uppercase",
          }}
        >
          Interactive Listening — Stage {stage + 1} of 5
        </span>

        <span style={{ fontSize: "13px", fontWeight: "700", color: "var(--text-secondary, #64748b)", display: "inline-flex", alignItems: "center", gap: "6px" }}>
          <Clock size={16} /> Total Time: {item.timeLimit || 420}s
        </span>
      </div>

      {/* STAGE 0: LISTEN TO SCENARIO */}
      {stage === 0 && (
        <div style={{ textAlign: "center", padding: "40px 20px" }}>
          <h3 style={{ fontSize: "22px", fontWeight: "800", color: "var(--text, #1e293b)", marginBottom: "16px" }}>
            Listen to the Scenario
          </h3>
          <p style={{ color: "var(--text-secondary, #64748b)", fontSize: "14px", marginBottom: "32px" }}>
            Press play to listen to the scenario audio recording carefully before answering questions.
          </p>

          <button
            onClick={() => playAudio(item.scenarioAudioText || item.scenarioText || "Scenario audio playing...")}
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
              boxShadow: "0 4px 14px rgba(139, 92, 246, 0.35)",
            }}
          >
            <Volume2 size={22} /> Listen to Scenario Audio
          </button>
        </div>
      )}

      {/* STAGE 1: ANSWER QUESTIONS */}
      {stage === 1 && (
        <div>
          <h3 style={{ fontSize: "20px", fontWeight: "800", color: "var(--text, #1e293b)", marginBottom: "20px" }}>
            Answer Questions About the Scenario
          </h3>

          {(item.questions || [
            { id: "q1", prompt: "What schedule do you and your peer work?", options: ["We both work morning lab shifts", "We work evening shifts", "We study online"] },
            { id: "q2", prompt: "What primary project are you collaborating on?", options: ["Biology research setup", "Chemistry literature review", "Computer science app"] },
          ]).map((q, idx) => (
            <div key={q.id || idx} style={{ background: "var(--surface, #f8fafc)", padding: "18px", borderRadius: "16px", border: "1px solid var(--border, #e2e8f0)", marginBottom: "16px" }}>
              <div style={{ fontSize: "14px", fontWeight: "700", color: "var(--text, #1e293b)", marginBottom: "12px" }}>
                {idx + 1}. {q.prompt}
              </div>
              {q.options?.map((opt, oIdx) => {
                const isSel = answers[q.id] === oIdx;
                return (
                  <button
                    key={oIdx}
                    onClick={() => setAnswers(prev => ({ ...prev, [q.id]: oIdx }))}
                    style={{
                      width: "100%",
                      textAlign: "left",
                      padding: "10px 14px",
                      borderRadius: "10px",
                      border: isSel ? "2px solid #8b5cf6" : "1px solid var(--border, #cbd5e1)",
                      background: isSel ? "rgba(139, 92, 246, 0.1)" : "#ffffff",
                      color: isSel ? "#7c3aed" : "var(--text, #334155)",
                      fontWeight: "600",
                      fontSize: "13px",
                      marginBottom: "6px",
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

      {/* STAGE 2: COMPLETE THE PASSAGE */}
      {stage === 2 && (
        <div>
          <h3 style={{ fontSize: "20px", fontWeight: "800", color: "var(--text, #1e293b)", marginBottom: "16px" }}>
            Complete the Passage Summary
          </h3>
          <p style={{ color: "var(--text-secondary, #64748b)", fontSize: "13px", marginBottom: "20px" }}>
            Select the correct words to complete the summary of the conversation.
          </p>
          <div style={{ padding: "20px", background: "var(--surface, #f8fafc)", borderRadius: "16px", border: "1px solid var(--border, #e2e8f0)", lineHeight: "1.8", fontSize: "14px" }}>
            {item.passageSummary || "Over the past two decades, technological developments have given way to broad changes in communications and information technology."}
          </div>
        </div>
      )}

      {/* STAGE 3: RESPOND TO CONVERSATION */}
      {stage === 3 && (
        <div>
          <h3 style={{ fontSize: "20px", fontWeight: "800", color: "var(--text, #1e293b)", marginBottom: "20px" }}>
            Participate in Simulated Conversation
          </h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginBottom: "24px" }}>
            <div style={{ background: "rgba(37,99,235,0.08)", padding: "14px 18px", borderRadius: "16px 16px 16px 4px", maxWidth: "80%", color: "#1e3a8a", fontSize: "14px", fontWeight: "600" }}>
              Peer: "It's going well! I'm really enjoying the lab research setup."
            </div>
            <div style={{ background: "#f0fdf4", border: "1.5px solid #22c55e", padding: "14px 18px", borderRadius: "16px 16px 4px 16px", marginLeft: "auto", maxWidth: "80%", color: "#14532d", fontSize: "14px", fontWeight: "700" }}>
              ✓ You: "Yeah, me too. I didn't realize how much preparation went into setting up experiments before."
            </div>
          </div>
        </div>
      )}

      {/* STAGE 4: WRITE SUMMARY */}
      {stage === 4 && (
        <div>
          <h3 style={{ fontSize: "20px", fontWeight: "800", color: "var(--text, #1e293b)", marginBottom: "8px" }}>
            Write a Summary of the Conversation
          </h3>
          <p style={{ color: "var(--text-secondary, #64748b)", fontSize: "13px", marginBottom: "20px" }}>
            Summarize the key points discussed in the conversation you just completed.
          </p>

          <textarea
            value={summaryText}
            onChange={e => setSummaryText(e.target.value)}
            placeholder="Write a concise summary of the conversation..."
            rows={6}
            style={{
              width: "100%",
              borderRadius: "16px",
              border: "1px solid var(--border, #cbd5e1)",
              padding: "16px",
              fontSize: "14px",
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

      {/* Footer Navigation Button */}
      <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "28px" }}>
        <button
          onClick={handleNextStage}
          disabled={submitting}
          style={{
            background: "linear-gradient(135deg, #8b5cf6, #6d28d9)",
            color: "#ffffff",
            border: "none",
            borderRadius: "14px",
            padding: "12px 28px",
            fontSize: "14px",
            fontWeight: "800",
            cursor: submitting ? "not-allowed" : "pointer",
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            boxShadow: "0 4px 14px rgba(139, 92, 246, 0.3)",
          }}
        >
          {stage === 4 ? "Submit Interactive Listening ✨" : "Continue to Next Stage"} <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
}
