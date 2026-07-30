export default function MCQ({ question, value, onChange }) {
  return (
    <div className="ielts-radio-group">
      {question.options.map((option, i) => {
        const letter = String.fromCharCode(65 + i); // A, B, C, D
        const selected = value === option;
        return (
          <label
            key={option}
            className={`ielts-radio-option${selected ? " selected" : ""}`}
          >
            <input
              type="radio"
              checked={selected}
              onChange={() => onChange(question.id, option)}
            />
            <span className="ielts-radio-label">
              <strong style={{ marginRight: "6px", color: "#64748b" }}>{letter}.</strong>
              {option}
            </span>
          </label>
        );
      })}
    </div>
  );
}
