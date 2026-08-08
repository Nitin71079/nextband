export default function MatchingHeadings({ question, value, onChange }) {
  const options = Array.isArray(question?.options) ? question.options : [];

  return (
    <select
      value={value || ""}
      onChange={(e) => onChange(question.id, e.target.value)}
      className={`ielts-select${value ? " has-value" : ""}`}
    >
      <option value="">— Select a heading —</option>
      {options.map((option, i) => {
        const hasPrefix = /^i|v|x+[.\)]\s*/i.test(String(option).trim());
        const label = hasPrefix ? option : `${String.fromCharCode(105 + i)}. ${option}`;
        return (
          <option key={i} value={option}>
            {label}
          </option>
        );
      })}
    </select>
  );
}
