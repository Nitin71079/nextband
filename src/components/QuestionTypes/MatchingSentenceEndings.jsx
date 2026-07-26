export default function MatchingSentenceEndings({
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
          padding: "12px",
          borderRadius: "10px",
          border: "1px solid #CBD5E1",
          fontSize: "15px",
        }}
      >
        <option value="">
          Choose Ending
        </option>

        {question.options.map(
          (option) => (
            <option
              key={option}
              value={option}
            >
              {option}
            </option>
          )
        )}

      </select>

      <small
        style={{
          color: "#64748b",
          display: "block",
          marginTop: 10,
        }}
      >
        Select the sentence ending that
        best completes the statement.
      </small>

    </div>
  );
}