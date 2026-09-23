import React from "react";

export default function GMATGraphicsInterpretation({ question, selectedOption, onSelectOption }) {
  if (!question) return null;

  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "20px" }}>
      {/* Chart / Graph Image or Description Area */}
      <div style={{ background: "#1e293b", border: "1px solid #334155", borderRadius: "12px", padding: "20px" }}>
        <div style={{ fontSize: "12px", fontWeight: 800, color: "#38bdf8", textTransform: "uppercase", marginBottom: "12px", letterSpacing: "0.5px" }}>
          Graphics Interpretation Visual Data
        </div>

        {question.chartUrl || question.imageUrl ? (
          <img
            src={question.chartUrl || question.imageUrl}
            alt="Graphics Data"
            style={{ width: "100%", maxHeight: "300px", objectFit: "contain", borderRadius: "8px", border: "1px solid #334155" }}
          />
        ) : (
          <div style={{ background: "#0f172a", border: "1px dashed #475569", borderRadius: "8px", padding: "24px", textAlign: "center", color: "#94a3b8" }}>
            <div style={{ fontWeight: 700, color: "#e2e8f0", marginBottom: "6px" }}>{question.chartTitle || "Scatterplot / Bar Chart Visualization"}</div>
            <div style={{ fontSize: "13px" }}>{question.chartDescription || "Visual graphic depicting values across categories and trends over time."}</div>
          </div>
        )}
      </div>

      {/* Question & Dropdown / Option Selection */}
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
                  alignItems: "center",
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
                  name={`gi_${question.id}`}
                  checked={isSelected}
                  onChange={() => onSelectOption(opt)}
                  style={{ width: "18px", height: "18px", accentColor: "#0284c7" }}
                />
                <span style={{ color: isSelected ? "#ffffff" : "#cbd5e1", fontSize: "14px", fontWeight: isSelected ? 700 : 500 }}>
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
