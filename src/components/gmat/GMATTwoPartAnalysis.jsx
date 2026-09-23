import React from "react";

export default function GMATTwoPartAnalysis({ question, selectedOption, onSelectOption }) {
  if (!question) return null;

  // Selected option is stored as an object { partA: "...", partB: "..." } or string
  const currentSelections = typeof selectedOption === "object" && selectedOption !== null ? selectedOption : { partA: "", partB: "" };

  const colALabel = question.partALabel || question.colALabel || "Part 1";
  const colBLabel = question.partBLabel || question.colBLabel || "Part 2";
  const choices = question.choices || question.options || [];

  const handleSelect = (columnKey, choiceVal) => {
    const updated = {
      ...currentSelections,
      [columnKey]: choiceVal
    };
    onSelectOption(updated);
  };

  return (
    <div style={{ background: "#0f172a", border: "1px solid #334155", borderRadius: "12px", padding: "24px" }}>
      {/* Question Prompt */}
      <div style={{ fontSize: "15px", fontWeight: 700, color: "#ffffff", lineHeight: "1.6", marginBottom: "20px" }}>
        {question.questionText}
      </div>

      {/* Two-Part Selection Table */}
      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", color: "#e2e8f0", fontSize: "14px" }}>
          <thead>
            <tr style={{ background: "#1e293b", borderBottom: "2px solid #334155" }}>
              <th style={{ padding: "12px 16px", textAlign: "center", width: "100px", color: "#38bdf8", fontWeight: 800 }}>{colALabel}</th>
              <th style={{ padding: "12px 16px", textAlign: "center", width: "100px", color: "#38bdf8", fontWeight: 800 }}>{colBLabel}</th>
              <th style={{ padding: "12px 16px", textAlign: "left", color: "#f8fafc", fontWeight: 700 }}>Options / Values</th>
            </tr>
          </thead>
          <tbody>
            {choices.map((choice, idx) => {
              const choiceText = typeof choice === "object" ? choice.text : choice;
              const isSelectedA = currentSelections.partA === choiceText;
              const isSelectedB = currentSelections.partB === choiceText;

              return (
                <tr
                  key={idx}
                  style={{
                    borderBottom: "1px solid #334155",
                    background: idx % 2 === 0 ? "rgba(30, 41, 59, 0.4)" : "transparent"
                  }}
                >
                  <td style={{ padding: "12px 16px", textAlign: "center" }}>
                    <input
                      type="radio"
                      name={`tpa_partA_${question.id}`}
                      checked={isSelectedA}
                      onChange={() => handleSelect("partA", choiceText)}
                      style={{ width: "18px", height: "18px", accentColor: "#0284c7", cursor: "pointer" }}
                    />
                  </td>
                  <td style={{ padding: "12px 16px", textAlign: "center" }}>
                    <input
                      type="radio"
                      name={`tpa_partB_${question.id}`}
                      checked={isSelectedB}
                      onChange={() => handleSelect("partB", choiceText)}
                      style={{ width: "18px", height: "18px", accentColor: "#9333ea", cursor: "pointer" }}
                    />
                  </td>
                  <td style={{ padding: "12px 16px", color: (isSelectedA || isSelectedB) ? "#ffffff" : "#cbd5e1", fontWeight: (isSelectedA || isSelectedB) ? 700 : 400 }}>
                    {choiceText}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
