const options = [
  "True",
  "False",
  "Not Given",
];

export default function TFNG({
  question,
  value,
  onChange,
}) {
  return (
    <>
      {options.map((option) => (
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