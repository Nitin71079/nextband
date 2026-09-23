import React from "react";

const OFFICIAL_DS_OPTIONS = [
  "A. Statement (1) ALONE is sufficient, but statement (2) alone is not sufficient.",
  "B. Statement (2) ALONE is sufficient, but statement (1) alone is not sufficient.",
  "C. BOTH statements TOGETHER are sufficient, but NEITHER statement ALONE is sufficient.",
  "D. EACH statement ALONE is sufficient.",
  "E. Statements (1) and (2) TOGETHER are NOT sufficient."
];

export default function GMATDataSufficiency({ question, selectedOption, onSelectOption }) {
  if (!question) return null;

  const displayOptions = question.options?.length === 5 ? question.options : OFFICIAL_DS_OPTIONS;

  return (
    <div style={{ background: "#0f172a", border: "1px solid #334155", borderRadius: "12px", padding: "24px" }}>
      {/* Problem Stem */}
      <div style={{ fontSize: "16px", fontWeight: 700, color: "#ffffff", lineHeight: "1.6", marginBottom: "16px" }}>
        {question.questionText}
      </div>

      {/* Statements (1) & (2) */}
      <div style={{ background: "#1e293b", border: "1px solid #334155", borderRadius: "8px", padding: "16px", marginBottom: "24px" }}>
        {question.statement1 && (
          <div style={{ fontSize: "15px", color: "#38bdf8", fontWeight: 600, marginBottom: "10px" }}>
            (1) {question.statement1}
          </div>
        )}
        {question.statement2 && (
          <div style={{ fontSize: "15px", color: "#38bdf8", fontWeight: 600 }}>
            (2) {question.statement2}
          </div>
        )}
      </div>

      {/* Official 5 DS Choices */}
      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        {displayOptions.map((opt, idx) => {
          const isSelected = selectedOption === opt || (selectedOption && selectedOption.startsWith(opt.substring(0, 2)));
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
                name={`ds_${question.id}`}
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
  );
}
