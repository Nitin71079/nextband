export default function TextInput({ question, value, onChange, placeholder = "Type your answer…" }) {
  const options = Array.isArray(question?.options) ? question.options : [];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
      {options.length > 0 && (
        <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "4px" }}>
          {options.map((opt, idx) => {
            const isSelected = value === opt;
            return (
              <button
                key={idx}
                type="button"
                onClick={() => onChange(question.id, opt)}
                style={{
                  padding: "6px 12px",
                  borderRadius: "8px",
                  fontSize: "13px",
                  fontWeight: "600",
                  border: isSelected ? "2px solid #58cc02" : "1px solid #cbd5e1",
                  background: isSelected ? "rgba(88, 204, 2, 0.12)" : "#f8fafc",
                  color: isSelected ? "#46a302" : "#334155",
                  cursor: "pointer",
                  transition: "all 0.15s ease",
                }}
              >
                {opt}
              </button>
            );
          })}
        </div>
      )}
      <input
        type="text"
        value={value || ""}
        onChange={(e) => onChange(question.id, e.target.value)}
        placeholder={placeholder}
        className={`ielts-text-input${value ? " has-value" : ""}`}
      />
    </div>
  );
}
