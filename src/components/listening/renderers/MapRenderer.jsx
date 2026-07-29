import React from "react";
import "../../../styles/listening/MapRenderer.css";

export default function MapRenderer({ group, answers, updateAnswer, toggleFlag, flagged }) {
  return (
    <div className="map-renderer">
      <h3>{group.title}</h3>
      <p className="instruction">{group.instruction}</p>

      <div className="map-container">
        {/* Map image */}
        <div className="map-image-container">
          <img src={group.image} alt="Listening Map" className="listening-map" />
        </div>

        {/* Sidebar: options + questions */}
        <div className="map-sidebar">
          <div className="map-options">
            <h4>Options</h4>
            {group.options.map((option) => (
              <div key={option.letter} className="map-option">
                <strong>{option.letter}</strong>
                <span>{option.text}</span>
              </div>
            ))}
          </div>

          <div className="map-questions">
            <h4>Questions</h4>
            {group.questions.map((question) => (
              <div
                id={`question-${question.id}`}
                key={question.id}
                className="map-question"
              >
                <div className="map-question-header">
                  <label>{question.id}. {question.label}</label>
                  <button
                    className={`flag-btn ${flagged.includes(question.id) ? "flagged" : ""}`}
                    onClick={() => toggleFlag(question.id)}
                    title="Flag"
                  >
                    🚩
                  </button>
                </div>
                <select
                  value={answers[question.id] || ""}
                  onChange={(e) => updateAnswer(question.id, e.target.value)}
                >
                  <option value="">Select letter</option>
                  {group.options.map((option) => (
                    <option key={option.letter} value={option.letter}>
                      {option.letter} — {option.text}
                    </option>
                  ))}
                </select>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
