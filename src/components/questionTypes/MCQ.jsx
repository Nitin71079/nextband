export default function MCQ({
  question,
  value,
  onChange,
}) {
  return (
    <>
      {question.options.map((option) => (
        <label
          key={option}
          style={{
            display: "block",
            marginBottom: "8px",
          }}
        >
          <input
            type="radio"
            checked={value === option}
            onChange={() =>
              onChange(question.id, option)
            }
          />
          {" "}
          {option}
        </label>
      ))}
    </>
  );
}