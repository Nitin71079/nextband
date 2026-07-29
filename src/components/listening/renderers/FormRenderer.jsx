import React from "react";
import "../../../styles/listening/FormRenderer.css";

export default function FormRenderer({ section, answers, updateAnswer }) {
  const first = section.form[0].id;
  const last  = section.form[section.form.length - 1].id;

  return (
    <div className="ielts-paper">
      <div className="question-header">
        <h2>Questions {first}–{last}</h2>
        <p>{section.instruction}</p>
        <strong>✎ Write NO MORE THAN TWO WORDS AND/OR A NUMBER for each answer.</strong>
      </div>

      <div className="ielts-form-card">
        <div className="form-title">{section.formTitle}</div>

        {section.form.map((field) => (
          <div
            key={field.id}
            id={`question-${field.id}`}
            className="ielts-form-row"
          >
            <span className="question-number">{field.id}.</span>
            <span className="field-label">{field.label}</span>
            <div className="answer-line">
              {field.prefix && <span className="prefix">{field.prefix}</span>}
              <input
                type="text"
                value={answers[field.id] || ""}
                onChange={(e) => updateAnswer(field.id, e.target.value)}
                placeholder="Type answer…"
                autoComplete="off"
              />
              {field.suffix && <span className="suffix">{field.suffix}</span>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
