export default function MatchingInformation({
  question,
  value,
  onChange,
}) {
  return (
    <div>

      <p
        style={{
          marginBottom: 15,
          fontWeight: 600,
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
          border: "1px solid #cbd5e1",
          fontSize: 16,
        }}
      >
        <option value="">
          Select Paragraph
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

      <p
        style={{
          marginTop: 10,
          color: "#64748b",
          fontSize: 13,
        }}
      >
        Select the paragraph that contains
        the required information.
      </p>

    </div>
  );
}