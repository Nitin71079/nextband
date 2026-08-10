import React, { useState, useEffect } from "react";
import { X, Clock, Check } from "lucide-react";

export default function SingleWordReadAndSelectRenderer({
  word = "handen",
  isReal = false,
  timeRemaining = "0:03",
  onSelectAnswer,
  onClose,
}) {
  const [selected, setSelected] = useState(null); // true for Yes, false for No

  const handleChoice = (choice) => {
    setSelected(choice);
    if (onSelectAnswer) {
      onSelectAnswer(choice);
    }
  };

  return (
    <div
      style={{
        background: "#ffffff",
        borderRadius: "20px",
        border: "1px solid #e2e8f0",
        maxWidth: "760px",
        margin: "0 auto",
        padding: "24px 32px 40px 32px",
        boxShadow: "0 10px 30px rgba(0, 0, 0, 0.05)",
        fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      }}
    >
      {/* Top Header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "40px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "6px",
            fontSize: "14px",
            fontWeight: "700",
            color: "#475569",
          }}
        >
          <Clock size={18} />
          <span>{timeRemaining} for this question</span>
        </div>

        <button
          onClick={onClose}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            color: "#94a3b8",
            padding: "4px",
          }}
        >
          <X size={22} />
        </button>
      </div>

      {/* Main Question Body */}
      <div style={{ textAlign: "center", padding: "20px 0 40px 0" }}>
        <h2
          style={{
            fontSize: "22px",
            fontWeight: "800",
            color: "#1e293b",
            marginBottom: "36px",
          }}
        >
          Is this a real English word?
        </h2>

        {/* Large Word Display */}
        <div
          style={{
            fontSize: "36px",
            fontWeight: "700",
            color: "#1e293b",
            marginBottom: "48px",
            letterSpacing: "0.5px",
          }}
        >
          {word}
        </div>

        {/* Yes / No Selection Buttons */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "16px",
            maxWidth: "320px",
            margin: "0 auto",
          }}
        >
          {/* YES Button */}
          <button
            onClick={() => handleChoice(true)}
            style={{
              flex: 1,
              padding: "20px 16px",
              borderRadius: "16px",
              border: selected === true ? "2px solid #1cb0f6" : "1px solid #cbd5e1",
              background: selected === true ? "#f0f9ff" : "#ffffff",
              cursor: "pointer",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "8px",
              boxShadow: "0 2px 8px rgba(0, 0, 0, 0.04)",
              transition: "all 0.15s ease",
            }}
          >
            <div
              style={{
                width: "28px",
                height: "28px",
                borderRadius: "50%",
                background: selected === true ? "#1cb0f6" : "transparent",
                color: selected === true ? "#ffffff" : "#1cb0f6",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Check size={20} strokeWidth={3} />
            </div>
            <span style={{ fontSize: "14px", fontWeight: "800", color: "#1e293b" }}>Yes</span>
          </button>

          {/* NO Button */}
          <button
            onClick={() => handleChoice(false)}
            style={{
              flex: 1,
              padding: "20px 16px",
              borderRadius: "16px",
              border: selected === false ? "2px solid #1cb0f6" : "1px solid #cbd5e1",
              background: selected === false ? "#f0f9ff" : "#ffffff",
              cursor: "pointer",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "8px",
              boxShadow: "0 2px 8px rgba(0, 0, 0, 0.04)",
              transition: "all 0.15s ease",
            }}
          >
            <div
              style={{
                width: "28px",
                height: "28px",
                borderRadius: "50%",
                background: selected === false ? "#1cb0f6" : "transparent",
                color: selected === false ? "#ffffff" : "#1cb0f6",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <X size={20} strokeWidth={3} />
            </div>
            <span style={{ fontSize: "14px", fontWeight: "800", color: "#1e293b" }}>No</span>
          </button>
        </div>
      </div>
    </div>
  );
}
