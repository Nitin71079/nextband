import { useState, useEffect } from "react";
import { ArrowRight } from "lucide-react";

export default function ReadAndCompleteRenderer({ item, onSubmit, submitting }) {
  // Parse passage into tokens with blanks
  // Format: "Urban plan[ning] is a techni[cal] and politi[cal] process conce[rned] with..."
  const [inputs, setInputs] = useState({});

  useEffect(() => {
    setInputs({});
  }, [item]);

  if (!item) return null;

  const handleInputChange = (blankKey, val) => {
    setInputs((prev) => ({ ...prev, [blankKey]: val }));
  };

  const calculateAccuracy = () => {
    if (!item.answers) return 0.8;
    let correct = 0;
    let total = Object.keys(item.answers).length;
    Object.keys(item.answers).forEach((key) => {
      const expected = item.answers[key].toLowerCase().trim();
      const actual = (inputs[key] || "").toLowerCase().trim();
      if (expected === actual) correct += 1;
    });
    return total > 0 ? correct / total : 0.8;
  };

  const handleSubmit = () => {
    const accuracy = calculateAccuracy();
    onSubmit(inputs, accuracy);
  };

  return (
    <div className="det-test-card">
      <span className="det-hero-badge">Read and Complete</span>
      <h3 style={{ marginTop: "12px", fontSize: "20px", fontWeight: "800", color: "var(--det-text)" }}>
        {item.prompt || "Type the missing letters to complete the text below."}
      </h3>

      <div
        style={{
          padding: "28px",
          background: "var(--det-surface-2)",
          borderRadius: "20px",
          fontSize: "19px",
          lineHeight: "2.2",
          margin: "24px 0",
          border: "1px solid var(--det-border)",
        }}
      >
        {item.tokens ? (
          item.tokens.map((token, idx) => {
            if (token.type === "text") {
              return <span key={idx}>{token.value}</span>;
            }
            const key = `blank_${idx}`;
            return (
              <span key={idx} style={{ display: "inline-flex", alignItems: "center", margin: "0 4px" }}>
                <span style={{ fontWeight: "700" }}>{token.prefix}</span>
                <input
                  type="text"
                  maxLength={token.missingLength}
                  style={{
                    width: `${Math.max(token.missingLength * 16, 40)}px`,
                    padding: "4px 8px",
                    borderRadius: "8px",
                    border: "2px solid var(--det-primary)",
                    background: "var(--det-surface)",
                    color: "var(--det-text)",
                    fontWeight: "800",
                    fontSize: "18px",
                    textAlign: "center",
                    outline: "none",
                  }}
                  value={inputs[key] || ""}
                  onChange={(e) => handleInputChange(key, e.target.value)}
                />
              </span>
            );
          })
        ) : (
          <p>{item.passage}</p>
        )}
      </div>

      <button
        className="det-btn-primary"
        style={{ width: "100%", justifyContent: "center", padding: "16px" }}
        onClick={handleSubmit}
        disabled={submitting}
      >
        Submit Completed Text <ArrowRight size={18} />
      </button>
    </div>
  );
}
