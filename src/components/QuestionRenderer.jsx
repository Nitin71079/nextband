export default function QuestionRenderer({
  question,
  value,
  onChange,
}) {
  if (
    question.type ===
    "multiple-choice"
  ) {
    return (
      <>
        {question.options.map(
          (option) => (
            <label
              key={option}
              style={{
                display:
                  "block",
                marginBottom:
                  "8px",
              }}
            >
              <input
                type="radio"
                checked={
                  value ===
                  option
                }
                onChange={() =>
                  onChange(
                    question.id,
                    option
                  )
                }
              />
              {" "}
              {option}
            </label>
          )
        )}
      </>
    );
  }

  if (
    question.type ===
    "true-false-not-given"
  ) {
    return (
      <>
        {[
          "True",
          "False",
          "Not Given",
        ].map((option) => (
          <label
            key={option}
            style={{
              display:
                "block",
              marginBottom:
                "8px",
            }}
          >
            <input
              type="radio"
              checked={
                value ===
                option
              }
              onChange={() =>
                onChange(
                  question.id,
                  option
                )
              }
            />
            {" "}
            {option}
          </label>
        ))}
      </>
    );
  }

  if (
    question.type ===
    "sentence-completion"
  ) {
    return (
      <input
        type="text"
        value={
          value || ""
        }
        onChange={(e) =>
          onChange(
            question.id,
            e.target.value
          )
        }
        placeholder="Type answer"
        style={{
          width: "100%",
          padding: "10px",
          borderRadius:
            "8px",
          border:
            "1px solid #cbd5e1",
        }}
      />
    );
  }

  if (
    question.type ===
    "matching-headings"
  ) {
    return (
      <select
        value={
          value || ""
        }
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
    );
  }

  if (
    question.type ===
    "short-answer"
  ) {
    return (
      <input
        type="text"
        value={
          value || ""
        }
        onChange={(e) =>
          onChange(
            question.id,
            e.target.value
          )
        }
        placeholder="Short answer"
        style={{
          width: "100%",
          padding: "10px",
          borderRadius:
            "8px",
          border:
            "1px solid #cbd5e1",
        }}
      />
    );
  }

if (
  question.type ===
  "summary-completion"
) {
  return (
    <input
      type="text"
      value={
        value || ""
      }
      onChange={(e) =>
        onChange(
          question.id,
          e.target.value
        )
      }
      placeholder="Complete summary"
      style={{
        width: "100%",
        padding: "10px",
        borderRadius:
          "8px",
        border:
          "1px solid #cbd5e1",
      }}
    />
  );
}
  return null;
}