import React from "react";

export default function GMATReadingComprehension({ question, selectedOption, onSelectOption }) {
  if (!question) return null;

  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", minHeight: "450px" }}>
      {/* Passage Left Pane */}
      <div
        style={{
          background: "#1e293b",
          border: "1px solid #334155",
          borderRadius: "12px",
          padding: "20px",
          overflowY: "auto",
          maxHeight: "550px"
        }}
      >
        <div style={{ fontSize: "12px", fontWeight: 800, color: "#38bdf8", textTransform: "uppercase", marginBottom: "12px", letterSpacing: "0.5px" }}>
          Reading Comprehension Passage
        </div>
        <div style={{ fontSize: "14px", color: "#e2e8f0", lineHeight: "1.7", whiteSpace: "pre-line" }}>
          {question.passageText || question.passage || "Passage content..."}
        </div>
      </div>

      {/* Question Right Pane */}
      <div style={{ background: "#0f172a", border: "1px solid #334155", borderRadius: "12px", padding: "20px", overflowY: "auto", maxHeight: "550px" }}>
        <div style={{ fontSize: "15px", fontWeight: 700, color: "#ffffff", lineHeight: "1.6", marginBottom: "20px" }}>
          {question.questionText}
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {question.options?.map((opt, idx) => {
            const isSelected = selectedOption === opt;
            return (
              <label
                key={idx}
                onClick={() => onSelectOption(opt)}
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "12px",
                  background: isSelected ? "rgba(2, 132, 199, 0.2)" : "#1e293b",
                  border: isSelected ? "2px solid #0284c7" : "1px solid #334155",
                  borderRadius: "8px",
                  padding: "12px 14px",
                  cursor: "pointer"
                }}
              >
                <input
                  type="radio"
                  name={`rc_${question.id}`}
                  checked={isSelected}
                  onChange={() => onSelectOption(opt)}
                  style={{ marginTop: "3px", width: "18px", height: "18px", accentColor: "#0284c7" }}
                />
                <span style={{ color: isSelected ? "#ffffff" : "#cbd5e1", fontSize: "14px", lineHeight: "1.5" }}>
                  {opt}
                </span>
              </label>
            );
          })}
        </div>
      </div>
    </div>
  );
}
