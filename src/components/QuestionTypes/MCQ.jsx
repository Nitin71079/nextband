export default function MCQ({ question, value, onChange }) {
  const options = Array.isArray(question?.options) ? question.options : [];

  return (
    <div className="ielts-radio-group">
      {options.map((option, i) => {
        const letter = String.fromCharCode(65 + i); // A, B, C, D
        const hasPrefix = /^[A-Z][.\)]\s*/i.test(String(option).trim());
        const displayLabel = hasPrefix ? option : `${letter}. ${option}`;
        const selected = value === option || value === displayLabel || (hasPrefix && value === String(option).replace(/^[A-Z][.\)]\s*/i, "").trim());

        return (
          <label
            key={i}
            className={`ielts-radio-option${selected ? " selected" : ""}`}
          >
            <input
              type="radio"
              checked={selected}
              onChange={() => onChange(question.id, option)}
            />
            <span className="ielts-radio-label">
              {displayLabel}
            </span>
          </label>
        );
      })}
    </div>
  );
}
