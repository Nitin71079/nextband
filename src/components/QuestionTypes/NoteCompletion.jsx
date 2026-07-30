export default function NoteCompletion({ question, value, onChange }) {
  return (
    <input
      type="text"
      value={value || ""}
      onChange={(e) => onChange(question.id, e.target.value)}
      placeholder="Type the missing word(s)…"
      className={`ielts-text-input${value ? " has-value" : ""}`}
    />
  );
}
