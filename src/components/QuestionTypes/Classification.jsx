export default function Classification({
  question,
  value,
  onChange,
}) {
  return (
    <div>

      <p
        style={{
          fontWeight: 600,
          marginBottom: 15,
        }}
      >
        {question.question}
      </p>

      <select
        value={value || ""}
        onChange={(e) =>
          onChange(
            question.id,
            e.target.value
          )
        }
        style={{
          width: "100%",
          padding: 12,
          borderRadius: 10,
          border: "1px solid #CBD5E1",
        }}
      >

        <option value="">
          Select
        </option>

        {question.options.map((option) => (
          <option
            key={option}
            value={option}
          >
            {option}
          </option>
        ))}

      </select>

      <small
        style={{
          display: "block",
          marginTop: 10,
          color: "#64748b",
        }}
      >
        Choose the correct category.
      </small>

    </div>
  );
}