export default function MatchingSentenceEndings({ question, value, onChange }) {
  return (
    <select
      value={value || ""}
      onChange={(e) => onChange(question.id, e.target.value)}
      className={`ielts-select${value ? " has-value" : ""}`}
    >
      <option value="">— Choose the correct ending —</option>
      {question.options.map((option) => (
        <option key={option} value={option}>{option}</option>
      ))}
    </select>
  );
}
