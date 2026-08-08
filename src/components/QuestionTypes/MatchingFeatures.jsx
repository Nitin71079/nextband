export default function MatchingFeatures({ question, value, onChange }) {
  const options = Array.isArray(question?.options) ? question.options : [];

  return (
    <select
      value={value || ""}
      onChange={(e) => onChange(question.id, e.target.value)}
      className={`ielts-select${value ? " has-value" : ""}`}
    >
      <option value="">— Select the matching feature —</option>
      {options.map((option, i) => (
        <option key={i} value={option}>{option}</option>
      ))}
    </select>
  );
}
