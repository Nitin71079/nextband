import { useState } from "react";
import { ArrowRight, Sparkles } from "lucide-react";
import { evaluateDETWriting } from "../../services/detAIService";

export default function InteractiveWritingRenderer({ item, onSubmit, submitting }) {
  const [stage, setStage] = useState(1);
  const [text1, setText1] = useState("");
  const [text2, setText2] = useState("");
  const [evaluating, setEvaluating] = useState(false);

  if (!item) return null;

  const handleNextStage = async () => {
    if (stage === 1 && item.followUpPrompt) {
      setStage(2);
    } else {
      setEvaluating(true);
      const res1 = await evaluateDETWriting(item.prompt, text1);
      const res2 = item.followUpPrompt ? await evaluateDETWriting(item.followUpPrompt, text2) : null;
      setEvaluating(false);

      const avgScore = res2 ? Math.round((res1.score + res2.score) / 2) : res1.score;
      const normAccuracy = avgScore / 160;

      onSubmit(
        { response1: text1, response2: text2, aiEvaluation: { res1, res2 } },
        normAccuracy
      );
    }
  };

  const currentText = stage === 1 ? text1 : text2;
  const wordCount = currentText.trim() ? currentText.trim().split(/\s+/).length : 0;

  return (
    <div className="det-test-card">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
        <span className="det-hero-badge">Interactive Writing — Stage {stage} of 2</span>
        <span style={{ fontSize: "14px", color: "var(--det-text-muted)", fontWeight: "700" }}>
          Word count: {wordCount}
        </span>
      </div>

      <h3 style={{ fontSize: "20px", fontWeight: "800", marginBottom: "16px", color: "var(--det-text)" }}>
        {stage === 1 ? item.prompt : item.followUpPrompt}
      </h3>

      <textarea
        className="det-input-field"
        style={{ minHeight: "220px", resize: "vertical", fontFamily: "inherit", fontSize: "16px" }}
        placeholder={stage === 1 ? "Write your initial response here..." : "Write your follow-up response here..."}
        value={currentText}
        onChange={(e) => (stage === 1 ? setText1(e.target.value) : setText2(e.target.value))}
      />

      <button
        className="det-btn-primary"
        style={{ marginTop: "24px", width: "100%", justifyContent: "center", padding: "16px" }}
        onClick={handleNextStage}
        disabled={submitting || evaluating || wordCount < 10}
      >
        {evaluating ? (
          "Evaluating with AI..."
        ) : stage === 1 && item.followUpPrompt ? (
          <>Continue to Follow-up Question <ArrowRight size={18} /></>
        ) : (
          <>Submit Interactive Writing <ArrowRight size={18} /></>
        )}
      </button>
    </div>
  );
}
