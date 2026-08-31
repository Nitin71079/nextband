import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Clock, X, Sparkles, AlertCircle, Maximize, Minimize } from "lucide-react";

export default function DETHeader({ title = "DET Practice", timeLimit = 60, onTimeUp }) {
  const navigate = useNavigate();
  const [timeLeft, setTimeLeft] = useState(timeLimit);
  const [showExitModal, setShowExitModal] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  function toggleFullscreen() {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().then(() => setIsFullscreen(true)).catch(() => {});
    } else {
      document.exitFullscreen().then(() => setIsFullscreen(false)).catch(() => {});
    }
  }

  useEffect(() => {
    setTimeLeft(timeLimit);
  }, [timeLimit]);

  useEffect(() => {
    if (timeLeft <= 0) {
      if (onTimeUp) onTimeUp();
      return;
    }
    const timer = setInterval(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft, onTimeUp]);

  const mins = Math.floor(timeLeft / 60);
  const secs = timeLeft % 60;
  const timeStr = `${mins}:${secs < 10 ? "0" : ""}${secs}`;

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "16px 24px",
        background: "var(--det-surface)",
        borderBottom: "1px solid var(--det-border)",
        boxShadow: "0 2px 10px rgba(0,0,0,0.02)",
        position: "relative",
      }}
    >
      {/* ── SAFETY EXIT CONFIRMATION MODAL ── */}
      {showExitModal && (
        <div style={{ position: "fixed", inset: 0, zIndex: 9999, background: "rgba(15,23,42,0.85)", backdropFilter: "blur(8px)", display: "flex", alignItems: "center", justifyContent: "center", padding: "20px" }}>
          <div style={{ background: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "24px", padding: "32px", maxWidth: "460px", width: "100%", boxShadow: "0 20px 50px rgba(0,0,0,0.25)", textAlign: "center" }}>
            <div style={{ width: 56, height: 56, borderRadius: "50%", background: "#fef2f2", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px", color: "#ef4444" }}>
              <AlertCircle size={32} />
            </div>
            <h2 style={{ fontSize: "22px", fontWeight: 800, margin: "0 0 12px 0", color: "#0f172a" }}>
              Exit Duolingo English Test?
            </h2>
            <p style={{ fontSize: "14px", color: "#64748b", margin: "0 0 24px 0", lineHeight: 1.6 }}>
              Are you sure you want to leave the test? Your responses so far will not be saved.
            </p>
            <div style={{ display: "flex", gap: 12 }}>
              <button
                onClick={() => setShowExitModal(false)}
                style={{ flex: 1, background: "#f1f5f9", color: "#334155", border: "1px solid #cbd5e1", borderRadius: 12, padding: "12px", fontWeight: 800, fontSize: 14, cursor: "pointer" }}
              >
                Resume Test
              </button>
              <button
                onClick={() => navigate("/duolingo")}
                style={{ flex: 1, background: "#58cc02", color: "#ffffff", border: "none", borderRadius: 12, padding: "12px", fontWeight: 800, fontSize: 14, cursor: "pointer", boxShadow: "0 4px 14px rgba(88,204,2,0.4)" }}
              >
                Exit to DET Hub
              </button>
            </div>
          </div>
        </div>
      )}

      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        <div
          style={{
            width: "36px",
            height: "36px",
            borderRadius: "12px",
            background: "#58cc02",
            color: "white",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: "900",
            fontSize: "18px",
          }}
        >
          D
        </div>
        <div>
          <h2 style={{ fontSize: "16px", fontWeight: "800", margin: 0, color: "var(--det-text)" }}>
            {title}
          </h2>
          <span style={{ fontSize: "12px", color: "var(--det-text-muted)", fontWeight: "600" }}>
            Duolingo Official Adaptive Test Simulation
          </span>
        </div>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "6px",
            background: "var(--det-surface-2)",
            padding: "8px 16px",
            borderRadius: "12px",
            border: "1px solid var(--det-border)",
            fontWeight: "700",
            fontSize: "14px",
            color: timeLeft < 30 ? "#ef4444" : "var(--det-text)",
          }}
        >
          <Clock size={16} /> {timeStr}
        </div>

        <button
          onClick={toggleFullscreen}
          title="Toggle Fullscreen Mode"
          style={{
            background: "var(--det-surface-2)",
            border: "1px solid var(--det-border)",
            color: "var(--det-text)",
            cursor: "pointer",
            padding: "8px 12px",
            borderRadius: "12px",
            display: "flex",
            alignItems: "center",
            gap: "6px",
            fontSize: "13px",
            fontWeight: "700",
          }}
        >
          {isFullscreen ? <Minimize size={16} /> : <Maximize size={16} />}
          <span>{isFullscreen ? "Exit Fullscreen" : "Fullscreen"}</span>
        </button>

        <button
          onClick={() => setShowExitModal(true)}
          style={{
            background: "#fef2f2",
            border: "1px solid #fecaca",
            color: "#ef4444",
            cursor: "pointer",
            padding: "8px 14px",
            borderRadius: "12px",
            display: "flex",
            alignItems: "center",
            gap: "6px",
            fontWeight: "800",
            fontSize: "13px",
          }}
          title="Exit Practice"
        >
          <X size={18} /> Exit
        </button>
      </div>
    </div>
  );
}
