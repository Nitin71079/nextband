export default function DiagramLabel({ question, value, onChange }) {
  const labels = question.labels || [{ id: question.id, label: "Answer" }];

  // Single label — simple text input
  if (labels.length === 1) {
    return (
      <input
        type="text"
        value={value || ""}
        onChange={(e) => onChange(question.id, e.target.value)}
        placeholder="Label the diagram…"
        className={`ielts-text-input${value ? " has-value" : ""}`}
      />
    );
  }

  // Multi-label (edge case: the parent will call onChange per top-level question.id)
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
      {question.image && (
        <div style={{ marginBottom: "12px" }}>
          <img
            src={question.image}
            alt="Diagram"
            style={{ maxWidth: "100%", borderRadius: "8px", border: "1px solid #e2e8f0" }}
          />
        </div>
      )}
      {labels.map((label) => (
        <div key={label.id} style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <span style={{ fontWeight: 700, color: "#64748b", fontSize: "13px", minWidth: "80px" }}>
            {label.label || `Label ${label.id}`}
          </span>
          <input
            type="text"
            value={value || ""}
            onChange={(e) => onChange(question.id, e.target.value)}
            placeholder="Type label…"
            className={`ielts-text-input${value ? " has-value" : ""}`}
          />
        </div>
      ))}
    </div>
  );
}
