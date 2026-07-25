import React from "react";
import "../../../styles/listening/FlowChartRenderer.css";

export default function FlowChartRenderer({
  group,
  answers,
  updateAnswer,
  toggleFlag,
  flagged,
}) {
  return (
    <div className="flowchart-renderer">
      <h3>{group.title}</h3>

      <p>{group.instruction}</p>

      {group.steps.map((step, index) => (
        <React.Fragment
          key={step.id ?? `text-${index}`}
        >
          {step.type === "text" ? (
            <div className="flow-step">
              <div className="flow-box">
                {step.text}
              </div>
            </div>
          ) : (
            <div
              id={`question-${step.id}`}
              className="flow-step"
            >
              <div className="flow-box">
                <input
                  type="text"
                  value={answers[step.id] || ""}
                  onChange={(e) =>
                    updateAnswer(
                      step.id,
                      e.target.value
                    )
                  }
                />

                <span className="flow-suffix">
                  {step.suffix}
                </span>

                <button
                  className="flag-btn"
                  onClick={() =>
                    toggleFlag(step.id)
                  }
                >
                  {flagged.includes(step.id)
                    ? "🚩"
                    : "⚑"}
                </button>
              </div>
            </div>
          )}

          {index !== group.steps.length - 1 && (
            <div className="flow-arrow">
              ↓
            </div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
}