export default function QuestionPalette({
  questions = [],
  answers = {},
  flaggedQuestions = [],
  currentQuestion = null,
  onQuestionClick,
}) {
  return (
    <div className="ielts-palette-wrap">
      <div className="ielts-palette-title">Question Navigator</div>

      <div className="ielts-palette-grid">
        {questions.map((q) => {
          const answered = answers[q.id] !== undefined && answers[q.id] !== "";
          const flagged = flaggedQuestions.includes(q.id);
          const current = currentQuestion === q.id;

          let cls = "ielts-palette-btn";
          if (answered) cls += " answered";
          if (flagged)  cls += " flagged";
          if (current)  cls += " current";

          return (
            <button
              key={q.id}
              className={cls}
              onClick={() => onQuestionClick?.(q.id)}
              title={`Question ${q.id}${answered ? " — Answered" : ""}${flagged ? " — Flagged" : ""}`}
            >
              {q.id}
            </button>
          );
        })}
      </div>

      <div className="ielts-palette-legend">
        <div className="ielts-legend-item">
          <span className="ielts-legend-dot answered" />
          Answered
        </div>
        <div className="ielts-legend-item">
          <span className="ielts-legend-dot flagged" />
          Flagged
        </div>
        <div className="ielts-legend-item">
          <span className="ielts-legend-dot empty" />
          Not answered
        </div>
      </div>
    </div>
  );
}
