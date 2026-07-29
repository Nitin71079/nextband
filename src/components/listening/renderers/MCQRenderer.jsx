import "../../../styles/listening/MCQRenderer.css";

export default function MCQRenderer({ group, answers, updateAnswer, toggleFlag, flagged }) {
  return (
    <div className="mcq-renderer">
      <div className="mcq-header">
        <h2>{group.title}</h2>
        <p>{group.instruction}</p>
      </div>

      {group.questions.map((question, index) => (
        <div
          key={`${group.id}-${question.id}-${index}`}
          id={`question-${question.id}`}
          className="mcq-card"
        >
          <div className="mcq-card-header">
            <h3>
              <span className="question-id">{question.id}.</span>
              {question.question}
            </h3>
            <button
              className={`flag-btn ${flagged.includes(question.id) ? "flagged" : ""}`}
              onClick={() => toggleFlag(question.id)}
              title={flagged.includes(question.id) ? "Remove flag" : "Flag question"}
            >
              🚩
            </button>
          </div>

          <div className="mcq-options">
            {question.options.map((option) => {
              const selected = answers[question.id] === option.letter;
              return (
                <label
                  key={`${question.id}-${option.letter}`}
                  className={`mcq-option ${selected ? "selected" : ""}`}
                >
                  <input
                    type="radio"
                    name={`q-${question.id}`}
                    value={option.letter}
                    checked={selected}
                    onChange={(e) => updateAnswer(question.id, e.target.value)}
                  />
                  <span className="letter">{option.letter}</span>
                  <span className="text">{option.text}</span>
                </label>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
