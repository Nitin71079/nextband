export default function MatchingFeatures({ question, value, onChange }) {
  return (
    <select
      value={value || ""}
      onChange={(e) => onChange(question.id, e.target.value)}
      className={`ielts-select${value ? " has-value" : ""}`}
    >
      <option value="">— Select the matching feature —</option>
      {question.options.map((option) => (
        <option key={option} value={option}>{option}</option>
      ))}
    </select>
  );
}
