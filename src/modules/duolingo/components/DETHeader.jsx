import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Clock, X, Sparkles } from "lucide-react";

export default function DETHeader({ title = "DET Practice", timeLimit = 60, onTimeUp }) {
  const navigate = useNavigate();
  const [timeLeft, setTimeLeft] = useState(timeLimit);

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
      }}
    >
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
            Knarrow Practice Estimate
          </span>
        </div>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
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
          onClick={() => navigate("/duolingo")}
          style={{
            background: "transparent",
            border: "none",
            color: "var(--det-text-muted)",
            cursor: "pointer",
            padding: "8px",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          title="Exit Practice"
        >
          <X size={20} />
        </button>
      </div>
    </div>
  );
}
