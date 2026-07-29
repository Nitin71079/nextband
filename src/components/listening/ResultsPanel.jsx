import "../../styles/listening/ResultsPanel.css";
import { calculateListeningBand } from "../../utils/listeningBandCalculator";

export default function ResultsPanel({ test, answers }) {
  /* ── Collect all scoreable questions ── */
  const allQuestions = [];

  test.sections.forEach((section) => {
    if (section.form) {
      section.form.forEach((q) => allQuestions.push({ ...q, _source: "form" }));
    }
    if (section.groups) {
      section.groups.forEach((group) => {
        if (group.questions) {
          group.questions.forEach((q) => allQuestions.push({ ...q, _source: group.type }));
        }
        if (group.notes) {
          group.notes
            .filter((n) => n.type === "blank")
            .forEach((n) => allQuestions.push({ ...n, answer: group.answers?.[n.id] ?? n.answer, _source: "notes" }));
        }
        if (group.rows) {
          group.rows.forEach((row) => {
            row.forEach((cell) => {
              if (cell.id !== undefined && cell.type === undefined) {
                allQuestions.push({ ...cell, answer: group.answers?.[cell.id] ?? cell.answer, _source: "table" });
              }
            });
          });
        }
        if (group.steps) {
          group.steps
            .filter((s) => s.type === "blank")
            .forEach((s) => allQuestions.push({ ...s, answer: group.answers?.[s.id] ?? s.answer, _source: "flowchart" }));
        }
      });
    }
  });

  /* ── Score ── */
  let correct = 0;
  allQuestions.forEach((q) => {
    const user = String(answers[q.id] || "").trim().toLowerCase();
    const ans  = String(q.answer || "").trim().toLowerCase();
    if (user === ans) correct++;
  });

  const wrong = allQuestions.length - correct;
  const band  = calculateListeningBand(correct);
  const pct   = Math.round((correct / allQuestions.length) * 100);

  return (
    <div className="results-page">
      <div className="results-inner">

        {/* ── Header ── */}
        <div className="results-header">
          <h1>Test Complete</h1>
          <p>{test.title}</p>
        </div>

        {/* ── Score Hero ── */}
        <div className="score-card">
          <div className="score-big">{correct}/{allQuestions.length}</div>
          <div className="score-band">Estimated Band {band}</div>
          <div className="score-label">{pct}% correct</div>
        </div>

        {/* ── Stats row ── */}
        <div className="results-stats">
          <div className="results-stat correct">
            <h3>{correct}</h3>
            <span>Correct</span>
          </div>
          <div className="results-stat wrong">
            <h3>{wrong}</h3>
            <span>Incorrect</span>
          </div>
          <div className="results-stat">
            <h3>{allQuestions.length}</h3>
            <span>Total</span>
          </div>
        </div>

        {/* ── Per-question review ── */}
        <p className="answer-review-heading">Answer Review</p>
        <div className="answer-review">
          {allQuestions.map((q) => {
            const user      = answers[q.id] || "";
            const isCorrect = user.trim().toLowerCase() === String(q.answer || "").trim().toLowerCase();
            return (
              <div key={q.id} className={`answer-card ${isCorrect ? "correct" : "wrong"}`}>
                <div className="answer-card-top">
                  <h4>Question {q.id}</h4>
                  <span className={`answer-badge ${isCorrect ? "correct" : "wrong"}`}>
                    {isCorrect ? "✓ Correct" : "✗ Incorrect"}
                  </span>
                </div>
                <div className="answer-row">
                  <div className="answer-item">
                    Your answer
                    <span>{user || "Not answered"}</span>
                  </div>
                  <div className="answer-item">
                    Correct answer
                    <span>{q.answer}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <button
          className="results-back-btn"
          onClick={() => window.history.back()}
        >
          ← Back to Tests
        </button>
      </div>
    </div>
  );
}
