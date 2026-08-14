import { useState } from "react";
import { ArrowRight, CheckCircle2 } from "lucide-react";

export default function InteractiveReadingRenderer({ item, onSubmit, submitting }) {
  const [activeQIndex, setActiveQIndex] = useState(0);
  const [answers, setAnswers] = useState({});

  if (!item || !item.questions || item.questions.length === 0) return null;

  const currentQ = item.questions[activeQIndex];

  const handleSelectOption = (opt) => {
    setAnswers((prev) => ({ ...prev, [currentQ.id]: opt }));
  };

  const handleNextQuestion = () => {
    if (activeQIndex < item.questions.length - 1) {
      setActiveQIndex((i) => i + 1);
    } else {
      // Calculate overall accuracy across questions
      let correct = 0;
      item.questions.forEach((q) => {
        if (answers[q.id] === q.answer) correct += 1;
      });
      const accuracy = correct / item.questions.length;
      onSubmit(answers, accuracy);
    }
  };

  return (
    <div className="det-test-card" style={{ maxWidth: "960px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
        <span className="det-hero-badge">Interactive Reading</span>
        <span style={{ fontSize: "14px", fontWeight: "700", color: "var(--det-text-muted)" }}>
          Question {activeQIndex + 1} of {item.questions.length}
        </span>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px" }}>
        {/* Left Passage Column */}
        <div
          style={{
            padding: "24px",
            background: "var(--det-surface-2)",
            borderRadius: "16px",
            fontSize: "15px",
            lineHeight: "1.7",
            maxHeight: "400px",
            overflowY: "auto",
            border: "1px solid var(--det-border)",
          }}
        >
          <h4 style={{ margin: "0 0 12px 0", fontSize: "16px", fontWeight: "800" }}>{item.title}</h4>
          <p style={{ margin: 0 }}>{item.passage}</p>
        </div>

        {/* Right Question Column */}
        <div>
          <h3 style={{ fontSize: "18px", fontWeight: "800", marginBottom: "16px", color: "var(--det-text)" }}>
            {currentQ.prompt}
          </h3>

          <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginBottom: "24px" }}>
            {currentQ.options?.map((opt, idx) => {
              const selected = answers[currentQ.id] === opt;
              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleSelectOption(opt)}
                  style={{
                    padding: "14px 18px",
                    borderRadius: "14px",
                    fontWeight: "600",
                    fontSize: "15px",
                    textAlign: "left",
                    border: selected ? "2px solid var(--det-primary)" : "1px solid var(--det-border)",
                    background: selected ? "rgba(88, 204, 2, 0.1)" : "var(--det-surface)",
                    color: selected ? "var(--det-primary)" : "var(--det-text)",
                    cursor: "pointer",
                  }}
                >
                  {opt}
                </button>
              );
            })}
          </div>

          <button
            className="det-btn-primary"
            style={{ width: "100%", justifyContent: "center", padding: "14px" }}
            onClick={handleNextQuestion}
            disabled={submitting || !answers[currentQ.id]}
          >
            {activeQIndex < item.questions.length - 1 ? "Next Question →" : "Submit Interactive Reading →"}
          </button>
        </div>
      </div>
    </div>
  );
}
