import React, { useState, useRef, useEffect } from "react";
import { X, Clock } from "lucide-react";

export default function FillInTheBlanksRenderer({
  sentenceBefore = "The number of website error reports we are receiving is ",
  targetWord = "alarming",
  sentenceAfter = ", so we must fix them right away.",
  timeRemaining = "0:02",
  onSubmit,
  onClose,
}) {
  const wordLength = targetWord.length;
  const [letters, setLetters] = useState(Array(wordLength).fill(""));
  const inputRefs = useRef([]);

  useEffect(() => {
    // Focus first input on mount
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  const handleChange = (index, value) => {
    if (!value) {
      const newLetters = [...letters];
      newLetters[index] = "";
      setLetters(newLetters);
      return;
    }

    const char = value.slice(-1).toLowerCase();
    const newLetters = [...letters];
    newLetters[index] = char;
    setLetters(newLetters);

    // Auto-advance to next input slot
    if (index < wordLength - 1 && inputRefs.current[index + 1]) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !letters[index] && index > 0 && inputRefs.current[index - 1]) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleSubmit = (e) => {
    e?.preventDefault();
    const entered = letters.join("");
    if (onSubmit) {
      onSubmit(entered, entered.toLowerCase() === targetWord.toLowerCase());
    }
  };

  return (
    <div
      style={{
        background: "#ffffff",
        borderRadius: "20px",
        border: "1px solid #e2e8f0",
        maxWidth: "780px",
        margin: "0 auto",
        padding: "24px 32px 32px 32px",
        boxShadow: "0 10px 30px rgba(0, 0, 0, 0.05)",
        fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
        minHeight: "420px",
        display: "flex",
        flexDirection: "column",
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

      {/* Main Question Content */}
      <div style={{ flex: 1, textAlign: "center" }}>
        <h2
          style={{
            fontSize: "22px",
            fontWeight: "800",
            color: "#1e293b",
            marginBottom: "48px",
          }}
        >
          Complete the sentence with the correct word
        </h2>

        {/* Sentence text with individual letter slot boxes */}
        <div
          style={{
            fontSize: "17px",
            color: "#334155",
            fontWeight: "600",
            lineHeight: "2.4",
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "center",
            gap: "4px",
            padding: "0 20px",
          }}
        >
          <span>{sentenceBefore}</span>

          {/* Letter slot inputs */}
          <span style={{ display: "inline-flex", gap: "3px", margin: "0 4px" }}>
            {Array.from({ length: wordLength }).map((_, idx) => (
              <input
                key={idx}
                ref={(el) => (inputRefs.current[idx] = el)}
                type="text"
                value={letters[idx] || ""}
                onChange={(e) => handleChange(idx, e.target.value)}
                onKeyDown={(e) => handleKeyDown(idx, e)}
                style={{
                  width: "24px",
                  height: "30px",
                  borderRadius: "6px",
                  border: "1px solid #cbd5e1",
                  background: "#f8fafc",
                  color: "#1e293b",
                  fontWeight: "800",
                  fontSize: "16px",
                  textAlign: "center",
                  outline: "none",
                  boxShadow: "inset 0 1px 2px rgba(0,0,0,0.04)",
                  fontFamily: "inherit",
                }}
              />
            ))}
          </span>

          <span>{sentenceAfter}</span>
        </div>
      </div>

      {/* Bottom Right SUBMIT Button */}
      <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "40px" }}>
        <button
          onClick={handleSubmit}
          style={{
            background: "#1cb0f6",
            color: "#ffffff",
            border: "none",
            borderRadius: "12px",
            padding: "12px 36px",
            fontSize: "14px",
            fontWeight: "800",
            letterSpacing: "0.5px",
            cursor: "pointer",
            boxShadow: "0 4px 0 #0284c7",
            transition: "all 0.15s ease",
          }}
          onMouseDown={e => e.currentTarget.style.transform = "translateY(2px)"}
          onMouseUp={e => e.currentTarget.style.transform = "translateY(0)"}
        >
          SUBMIT
        </button>
      </div>
    </div>
  );
}
