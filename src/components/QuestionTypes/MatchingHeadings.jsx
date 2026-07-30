export default function MatchingHeadings({ question, value, onChange }) {
  return (
    <select
      value={value || ""}
      onChange={(e) => onChange(question.id, e.target.value)}
      className={`ielts-select${value ? " has-value" : ""}`}
    >
      <option value="">— Select a heading —</option>
      {question.options.map((option, i) => (
        <option key={option} value={option}>
          {String.fromCharCode(105 + i)}. {option}
        </option>
      ))}
    </select>
  );
}
