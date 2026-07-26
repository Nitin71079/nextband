export default function TextInput({
  question,
  value,
  onChange,
  placeholder,
}) {
  return (
    <input
      type="text"
      value={value || ""}
      onChange={(e) =>
        onChange(
          question.id,
          e.target.value
        )
      }
      placeholder={placeholder}
      style={{
        width: "100%",
        padding: "10px",
        borderRadius: "8px",
        border: "1px solid #cbd5e1",
      }}
    />
  );
}