import React from "react";
import "../../../styles/listening/FlowChartRenderer.css";

export default function FlowChartRenderer({ group, answers, updateAnswer, toggleFlag, flagged }) {
  return (
    <div className="flowchart-renderer">
      <h3>{group.title}</h3>
      <p>{group.instruction}</p>

      {group.flowchartTitle && (
        <div className="flow-title">{group.flowchartTitle}</div>
      )}

      {group.steps.map((step, index) => (
        <React.Fragment key={step.id ?? `text-${index}`}>
          {step.type === "text" ? (
            <div className="flow-step">
              <div className="flow-box">
                <span className="flow-step-text">{step.text}</span>
              </div>
            </div>
          ) : (
            <div id={`question-${step.id}`} className="flow-step blank-step">
              <div className="flow-box">
                <span className="flow-step-number">{step.id}.</span>
                <input
                  type="text"
                  value={answers[step.id] || ""}
                  onChange={(e) => updateAnswer(step.id, e.target.value)}
                  placeholder="Type answer…"
                />
                <span className="flow-suffix">{step.suffix}</span>
                <button
                  className={`flag-btn ${flagged.includes(step.id) ? "flagged" : ""}`}
                  onClick={() => toggleFlag(step.id)}
                  title="Flag"
                >
                  🚩
                </button>
              </div>
            </div>
          )}

          {index !== group.steps.length - 1 && (
            <div className="flow-arrow">↓</div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
}
