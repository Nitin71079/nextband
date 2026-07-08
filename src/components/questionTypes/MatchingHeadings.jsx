export default function MatchingHeadings({
  question,
  value,
  onChange,
}) {
  return (
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
        padding: "10px",
      }}
    >
      <option value="">
        Select Heading
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
  );
}