import "./QuestionPalette.css";
import "../../../styles/listening/QuestionPalette.css";

export default function QuestionPalette({
  sections = [],
  answers = {},
  flagged = [],
  currentQuestion = null,
  onSelectQuestion,
}) {

  const questions = [];

  sections.forEach((section) => {

    // -------- Section 1 --------
    if (section.form) {
      section.form.forEach((item) => {
        questions.push({
          id: item.id,
        });
      });
    }

    // -------- Sections 2–4 --------
    section.groups?.forEach((group) => {

      // MCQ / Matching / Map
      if (group.questions) {
        group.questions.forEach((question) => {
          questions.push({
            id: question.id,
          });
        });
      }

      // Notes
      if (group.notes) {
        group.notes.forEach((item) => {
          if (item.type === "blank") {
            questions.push({
              id: item.id,
            });
          }
        });
      }

      // Table
      if (group.rows) {
        group.rows.forEach((row) => {

          // New row format
          if (Array.isArray(row)) {

            row.forEach((cell) => {
              if (cell.id) {
                questions.push({
                  id: cell.id,
                });
              }
            });

          }

          // Old row format
          else if (row.question) {

            questions.push({
              id: row.question.id,
            });

          }

        });
      }

      // Flowchart
      if (group.steps) {
        group.steps.forEach((step) => {
          if (step.type === "blank") {
            questions.push({
              id: step.id,
            });
          }
        });
      }

    });

  });

  questions.sort((a, b) => a.id - b.id);

  return (

    <div className="question-palette">

      <h3>Questions</h3>

      <div className="palette-grid">

        {questions.map((question) => {

          const answered =
            answers[question.id] !== undefined &&
            answers[question.id] !== "";

          const isFlagged =
            flagged.includes(question.id);

          const isCurrent =
            currentQuestion === question.id;

          let className = "palette-number";

          if (answered) className += " answered";

          if (isFlagged) className += " flagged";

          if (isCurrent) className += " current";
console.log("Section 4 groups:", sections[3]?.groups);

console.log("Group count:", sections[3]?.groups?.length);

console.log(
  sections[3]?.groups?.map(group => ({
    id: group.id,
    type: group.type
  }))
);
          return (

            <button
              key={question.id}
              className={className}
              onClick={() =>
                onSelectQuestion(question.id)
              }
              title={`Question ${question.id}`}
            >
              {question.id}
            </button>

          );

        })}

      </div>

      <div className="palette-legend">

        <div>
          <span className="legend-box current"></span>
          Current
        </div>

        <div>
          <span className="legend-box answered"></span>
          Answered
        </div>

        <div>
          <span className="legend-box flagged"></span>
          Flagged
        </div>

      </div>

    </div>

  );

}