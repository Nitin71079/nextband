import React from "react";
import "../../../styles/listening/MatchingRenderer.css";

export default function MatchingRenderer({ group, answers, updateAnswer }) {
  return (
    <div className="matching-renderer">
      <h3>{group.title}</h3>
      <p className="instruction">{group.instruction}</p>

      <div className="matching-layout">
        {/* Options panel */}
        <div className="matching-options">
          <h4>Options</h4>
          {group.options.map((option) => (
            <div key={option.letter} className="matching-option">
              <strong>{option.letter}</strong>
              <span>{option.text}</span>
            </div>
          ))}
        </div>

        {/* Questions panel */}
        <div className="matching-questions">
          {group.questions.map((question) => (
            <div
              id={`question-${question.id}`}
              key={question.id}
              className="matching-question"
            >
              <div className="matching-item">
                <strong>{question.id}.</strong>
                <span>{question.item}</span>
              </div>
              <select
                value={answers[question.id] || ""}
                onChange={(e) => updateAnswer(question.id, e.target.value)}
              >
                <option value="">Select</option>
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
  );
}
