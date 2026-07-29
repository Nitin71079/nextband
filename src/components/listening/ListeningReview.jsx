import "./ListeningReview.css";

function collectQuestions(sections) {
  const questions = [];
  sections.forEach((section) => {
    if (section.form) {
      section.form.forEach((q) => questions.push(q));
    }
    if (section.groups) {
      section.groups.forEach((group) => {
        if (group.questions) group.questions.forEach((q) => questions.push(q));
        if (group.notes)
          group.notes.forEach((n) => {
            if (n.type === "blank") questions.push(n);
          });
        if (group.rows)
          group.rows.forEach((row) =>
            row.forEach((cell) => {
              if (cell.id !== undefined && cell.type === undefined) questions.push(cell);
            })
          );
        if (group.steps)
          group.steps.forEach((s) => {
            if (s.type === "blank") questions.push(s);
          });
      });
    }
  });
  return questions;
}

export default function ListeningReview({
  sections,
  answers,
  flagged,
  onReturn,
  onSubmit,
  goToQuestion,
}) {
  const questions = collectQuestions(sections);
  const answered  = questions.filter((q) => answers[q.id]).length;
  const remaining = questions.length - answered;

  return (
    <div className="review-overlay">
      <div className="review-card">
        <h1>Review Your Answers</h1>
        <p>Check your answers carefully before submitting. You can click any number to go back.</p>

        {/* Stats */}
        <div className="review-stats">
          <div>
            <h2>{questions.length}</h2>
            <span>Total</span>
          </div>
          <div>
            <h2 style={{ color: "var(--l-success)" }}>{answered}</h2>
            <span>Answered</span>
          </div>
          <div>
            <h2 style={{ color: remaining > 0 ? "var(--l-danger)" : "var(--l-success)" }}>
              {remaining}
            </h2>
            <span>Remaining</span>
          </div>
          <div>
            <h2 style={{ color: flagged.length > 0 ? "var(--l-warning)" : "inherit" }}>
              {flagged.length}
            </h2>
            <span>Flagged</span>
          </div>
        </div>

        {/* Legend */}
        <div className="review-legend">
          <div className="legend-item">
            <span className="legend-dot answered" />
            Answered
          </div>
          <div className="legend-item">
            <span className="legend-dot flagged" />
            Flagged
          </div>
          <div className="legend-item">
            <span className="legend-dot unanswered" />
            Unanswered
          </div>
        </div>

        {/* Number grid */}
        <p className="review-grid-label">All Questions</p>
        <div className="review-grid">
          {questions.map((question) => (
            <button
              key={question.id}
              onClick={() => {
                onReturn();
                goToQuestion(question.id);
              }}
              className={[
                "review-number",
                answers[question.id] ? "answered" : "",
                flagged.includes(question.id) ? "flagged" : "",
              ]
                .join(" ")
                .trim()}
              title={`Question ${question.id}`}
            >
              {question.id}
            </button>
          ))}
        </div>

        {/* Actions */}
        <div className="review-actions">
          <button className="secondary-btn" onClick={onReturn}>
            ← Return to Test
          </button>
          <button className="primary-btn" onClick={onSubmit}>
            Submit Test →
          </button>
        </div>
      </div>
    </div>
  );
}
