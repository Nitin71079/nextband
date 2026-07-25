import React from "react";
import "../../../styles/listening/NotesRenderer.css";
export default function NotesRenderer({
  group,
  answers,
  updateAnswer,
}) {
  return (
    <div className="notes-renderer">

      <h3>{group.title}</h3>

      <p className="instruction">
        {group.instruction}
      </p>

      <div className="notes-card">

        <h2>{group.notesTitle}</h2>

        {group.notes.map((item, index) => {

          if (item.type === "heading") {

            return (
              <h4
                key={index}
                className="notes-heading"
              >
                {item.text}
              </h4>
            );

          }

          if (item.type === "text") {

            return (
              <p
                key={index}
                className="notes-text"
              >
                {item.text}
              </p>
            );

          }

          if (item.type === "blank") {

            return (
              <div
  id={`question-${item.id}`}
  key={item.id}
  className="notes-blank"
>

                <span className="blank-number">
                  {item.id}.
                </span>

                <input
                  type="text"
                  value={
                    answers[item.id] || ""
                  }
                  onChange={(e) =>
                    updateAnswer(
                      item.id,
                      e.target.value
                    )
                  }
                  placeholder="Answer"
                />

                {item.suffix && (
                  <span className="suffix">
                    {item.suffix}
                  </span>
                )}

              </div>
            );

          }

          return null;

        })}

      </div>

    </div>
  );
}