import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { evaluateDETWriting } from "../../services/detAIService";

export default function WritingSampleRenderer({ item, onSubmit, submitting }) {
  const [textInput, setTextInput] = useState("");
  const [evaluating, setEvaluating] = useState(false);

  if (!item) return null;

  const wordCount = textInput.trim() ? textInput.trim().split(/\s+/).length : 0;

  const handleSubmit = async () => {
    setEvaluating(true);
    const aiRes = await evaluateDETWriting(item.prompt, textInput);
    setEvaluating(false);
    const accuracy = aiRes.score / 160;

    onSubmit({ textResponse: textInput, aiEvaluation: aiRes }, accuracy);
  };

  return (
    <div className="det-test-card">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
        <span className="det-hero-badge">Writing Sample (Extended)</span>
        <span style={{ fontSize: "14px", color: "var(--det-text-muted)", fontWeight: "700" }}>
          Word count: {wordCount}
        </span>
      </div>

      <h3 style={{ fontSize: "20px", fontWeight: "800", marginBottom: "16px", color: "var(--det-text)" }}>
        {item.prompt}
      </h3>

      <textarea
        className="det-input-field"
        style={{ minHeight: "240px", resize: "vertical", fontFamily: "inherit", fontSize: "16px" }}
        placeholder="Write your extended response here (at least 150 words)..."
        value={textInput}
        onChange={(e) => setTextInput(e.target.value)}
      />

      <button
        className="det-btn-primary"
        style={{ marginTop: "24px", width: "100%", justifyContent: "center", padding: "16px" }}
        onClick={handleSubmit}
        disabled={submitting || evaluating || wordCount < 10}
      >
        {evaluating ? "Evaluating Essay with AI..." : <>Submit Writing Sample <ArrowRight size={18} /></>}
      </button>
    </div>
  );
}
