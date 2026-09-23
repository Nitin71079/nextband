import React from "react";

export default function GMATProblemSolving({ question, selectedOption, onSelectOption }) {
  if (!question) return null;

  return (
    <div style={{ background: "#0f172a", border: "1px solid #334155", borderRadius: "12px", padding: "24px" }}>
      <div style={{ fontSize: "16px", fontWeight: 600, color: "#f8fafc", lineHeight: "1.6", marginBottom: "24px" }}>
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
                alignItems: "center",
                gap: "12px",
                background: isSelected ? "rgba(2, 132, 199, 0.2)" : "#1e293b",
                border: isSelected ? "2px solid #0284c7" : "1px solid #334155",
                borderRadius: "8px",
                padding: "14px 16px",
                cursor: "pointer",
                transition: "all 0.15s ease"
              }}
            >
              <input
                type="radio"
                name={`ps_${question.id}`}
                checked={isSelected}
                onChange={() => onSelectOption(opt)}
                style={{ width: "18px", height: "18px", accentColor: "#0284c7" }}
              />
              <span style={{ color: isSelected ? "#ffffff" : "#cbd5e1", fontSize: "15px", fontWeight: isSelected ? 700 : 500 }}>
                {opt}
              </span>
            </label>
          );
        })}
      </div>
    </div>
  );
}
