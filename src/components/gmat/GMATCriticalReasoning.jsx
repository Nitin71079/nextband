import React from "react";

export default function GMATCriticalReasoning({ question, selectedOption, onSelectOption }) {
  if (!question) return null;

  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "20px" }}>
      {/* Passage / Argument box */}
      {question.passageText && (
        <div style={{ background: "#1e293b", border: "1px solid #334155", borderRadius: "10px", padding: "18px", color: "#e2e8f0", fontSize: "14px", lineHeight: "1.6", fontStyle: "italic" }}>
          <strong>Argument / Passage:</strong>
          <p style={{ marginTop: "8px", margin: 0, fontStyle: "normal", color: "#f1f5f9" }}>
            {question.passageText}
          </p>
        </div>
      )}

      {/* Question Text */}
      <div style={{ background: "#0f172a", border: "1px solid #334155", borderRadius: "12px", padding: "24px" }}>
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
                  padding: "14px 16px",
                  cursor: "pointer"
                }}
              >
                <input
                  type="radio"
                  name={`cr_${question.id}`}
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
