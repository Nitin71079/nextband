import React, { useState, useEffect } from "react";
import { Coffee, Play, Clock } from "lucide-react";

export default function GMATBreakScreen({ onEndBreak, nextSectionTitle = "Next Section" }) {
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          onEndBreak();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [onEndBreak]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const formattedTime = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 99999,
        background: "#090d16",
        color: "#ffffff",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px",
        fontFamily: "Inter, sans-serif"
      }}
    >
      <div
        style={{
          maxWidth: "600px",
          width: "100%",
          background: "#0f172a",
          border: "1px solid #334155",
          borderRadius: "24px",
          padding: "40px",
          textAlign: "center",
          boxShadow: "0 20px 50px rgba(0,0,0,0.7)"
        }}
      >
        <div style={{ width: "64px", height: "64px", borderRadius: "50%", background: "rgba(56, 189, 248, 0.15)", color: "#38bdf8", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px" }}>
          <Coffee size={32} />
        </div>

        <div style={{ fontSize: "12px", color: "#38bdf8", fontWeight: 800, textTransform: "uppercase", letterSpacing: "1px", marginBottom: "8px" }}>
          OPTIONAL 10-MINUTE BREAK
        </div>

        <h1 style={{ fontSize: "28px", fontWeight: 900, margin: "0 0 12px 0", color: "#ffffff" }}>
          Take a Break
        </h1>

        <p style={{ color: "#94a3b8", fontSize: "14px", lineHeight: "1.6", marginBottom: "32px" }}>
          You have completed a section. Take time to relax before beginning <strong>{nextSectionTitle}</strong>.
        </p>

        <div
          style={{
            background: "#1e293b",
            border: "2px solid #0284c7",
            borderRadius: "16px",
            padding: "20px",
            fontSize: "48px",
            fontWeight: 900,
            color: "#00ffcc",
            fontFamily: "monospace",
            maxWidth: "240px",
            margin: "0 auto 32px",
            letterSpacing: "2px"
          }}
        >
          {formattedTime}
        </div>

        <button
          onClick={onEndBreak}
          style={{
            background: "linear-gradient(135deg, #0284c7, #10b981)",
            color: "#ffffff",
            border: "none",
            borderRadius: "14px",
            padding: "16px 36px",
            fontWeight: 800,
            fontSize: "16px",
            cursor: "pointer",
            display: "inline-flex",
            alignItems: "center",
            gap: "10px",
            boxShadow: "0 8px 25px rgba(2, 132, 199, 0.4)"
          }}
        >
          <Play size={20} fill="#ffffff" /> Resume Exam Early
        </button>
      </div>
    </div>
  );
}
