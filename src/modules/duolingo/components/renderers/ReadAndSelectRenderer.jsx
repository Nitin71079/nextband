import { useState } from "react";
import { ArrowRight, Check } from "lucide-react";

export default function ReadAndSelectRenderer({ item, onSubmit, submitting }) {
  const [selectedWords, setSelectedWords] = useState(new Set());

  if (!item || !item.words) return null;

  const toggleWord = (wordText) => {
    const next = new Set(selectedWords);
    if (next.has(wordText)) next.delete(wordText);
    else next.add(wordText);
    setSelectedWords(next);
  };

  const calculateAccuracy = () => {
    let tp = 0;
    let fp = 0;
    let fn = 0;

    item.words.forEach((w) => {
      const isSelected = selectedWords.has(w.text);
      if (w.isReal && isSelected) tp += 1;
      if (!w.isReal && isSelected) fp += 1;
      if (w.isReal && !isSelected) fn += 1;
    });

    const precision = tp + fp > 0 ? tp / (tp + fp) : 0;
    const recall = tp + fn > 0 ? tp / (tp + fn) : 0;
    const f1 = precision + recall > 0 ? (2 * precision * recall) / (precision + recall) : 0;
    return f1;
  };

  const handleSubmit = () => {
    const accuracy = calculateAccuracy();
    onSubmit(Array.from(selectedWords), accuracy);
  };

  return (
    <div className="det-test-card">
      <span className="det-hero-badge">Read and Select</span>
      <h3 style={{ marginTop: "12px", fontSize: "20px", fontWeight: "800", color: "var(--det-text)" }}>
        {item.prompt || "Select the real English words in the list below."}
      </h3>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))",
          gap: "14px",
          margin: "28px 0",
        }}
      >
        {item.words.map((w, idx) => {
          const selected = selectedWords.has(w.text);
          return (
            <button
              key={idx}
              type="button"
              onClick={() => toggleWord(w.text)}
              style={{
                padding: "16px",
                borderRadius: "16px",
                fontWeight: "700",
                fontSize: "17px",
                border: selected ? "2px solid #58cc02" : "1px solid var(--det-border)",
                background: selected ? "rgba(88, 204, 2, 0.12)" : "var(--det-surface-2)",
                color: selected ? "#58cc02" : "var(--det-text)",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                transition: "all 0.15s ease",
              }}
            >
              <span>{w.text}</span>
              {selected && <Check size={18} />}
            </button>
          );
        })}
      </div>

      <button
        className="det-btn-primary"
        style={{ width: "100%", justifyContent: "center", padding: "16px" }}
        onClick={handleSubmit}
        disabled={submitting}
      >
        Submit Selected Words <ArrowRight size={18} />
      </button>
    </div>
  );
}
