import React, { useState } from "react";
import { Clock, Image as ImageIcon, Send, Mic } from "lucide-react";
import AudioRecorder from "../../../../components/AudioRecorder";

export default function DescribeImageRenderer({ item, onSubmit, submitting }) {
  const [description, setDescription] = useState("");
  const isSpeakingTask = item?.mode === "speaking" || item?.type?.includes("speaking");

  if (!item) return null;

  const handleSubmitText = (e) => {
    e?.preventDefault();
    if (onSubmit) {
      onSubmit(description, description.trim().split(/\s+/).length >= 10 ? 0.9 : 0.7);
    }
  };

  const handleAudioComplete = (blob) => {
    if (onSubmit) {
      onSubmit(blob, 0.9);
    }
  };

  return (
    <div
      style={{
        background: "var(--card, #ffffff)",
        border: "1px solid var(--border, #e2e8f0)",
        borderRadius: "24px",
        padding: "32px",
        maxWidth: "840px",
        margin: "0 auto",
        boxShadow: "0 10px 30px rgba(0, 0, 0, 0.05)",
        fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      }}
    >
      {/* Header Tag */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "20px" }}>
        <span
          style={{
            background: "rgba(37, 99, 235, 0.1)",
            color: "#2563eb",
            padding: "4px 12px",
            borderRadius: "999px",
            fontSize: "12px",
            fontWeight: "800",
            letterSpacing: "0.5px",
            textTransform: "uppercase",
          }}
        >
          {isSpeakingTask ? "Speak About the Image" : "Write About the Image"}
        </span>

        <span style={{ fontSize: "13px", fontWeight: "700", color: "var(--text-secondary, #64748b)", display: "inline-flex", alignItems: "center", gap: "6px" }}>
          <Clock size={16} /> Time limit: {item.timeLimit || 60}s
        </span>
      </div>

      <h3 style={{ fontSize: "20px", fontWeight: "800", color: "var(--text, #1e293b)", marginBottom: "24px", lineHeight: "1.4" }}>
        {item.prompt || (isSpeakingTask ? "Speak about the image below for 90 seconds." : "Write a description of the image below for 1 minute.")}
      </h3>

      {/* Grid: Image on left, Input/Recorder on right */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "24px", alignItems: "start" }}>
        {/* Image Box */}
        <div style={{ borderRadius: "20px", overflow: "hidden", border: "1px solid var(--border, #e2e8f0)", background: "#f8fafc" }}>
          {item.imageUrl ? (
            <img src={item.imageUrl} alt={item.imageAlt || "DET Image Prompt"} style={{ width: "100%", height: "260px", objectFit: "cover", display: "block" }} />
          ) : (
            <div style={{ height: "260px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", color: "#94a3b8" }}>
              <ImageIcon size={48} />
              <span style={{ fontSize: "13px", fontWeight: "600", marginTop: "8px" }}>Image Prompt Preview</span>
            </div>
          )}
        </div>

        {/* Input area */}
        <div>
          {isSpeakingTask ? (
            <div style={{ background: "var(--surface, #f8fafc)", padding: "24px", borderRadius: "20px", border: "1px solid var(--border, #e2e8f0)", textAlign: "center" }}>
              <p style={{ fontSize: "14px", fontWeight: "700", color: "var(--text-secondary, #64748b)", marginBottom: "16px" }}>
                Record your spoken description clearly into your microphone:
              </p>
              <AudioRecorder onRecordingComplete={handleAudioComplete} />
            </div>
          ) : (
            <form onSubmit={handleSubmitText}>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Write 1 or more complete sentences describing what you see in the image..."
                rows={7}
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

              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: "12px", color: "var(--text-secondary, #64748b)", fontWeight: "600" }}>
                  Words: {description.trim().split(/\s+/).filter(Boolean).length}
                </span>

                <button
                  type="submit"
                  disabled={submitting}
                  style={{
                    background: "linear-gradient(135deg, #2563eb, #1d4ed8)",
                    color: "#ffffff",
                    border: "none",
                    borderRadius: "12px",
                    padding: "12px 24px",
                    fontSize: "14px",
                    fontWeight: "800",
                    cursor: submitting ? "not-allowed" : "pointer",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "8px",
                  }}
                >
                  <Send size={15} /> Submit Description
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
