export default function TextInput({ question, value, onChange, placeholder = "Type your answer…" }) {
  return (
    <input
      type="text"
      value={value || ""}
      onChange={(e) => onChange(question.id, e.target.value)}
      placeholder={placeholder}
      className={`ielts-text-input${value ? " has-value" : ""}`}
    />
  );
}
