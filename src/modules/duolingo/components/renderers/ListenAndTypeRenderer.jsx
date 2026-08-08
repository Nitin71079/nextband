import { useState } from "react";
import { Volume2, ArrowRight, RotateCcw } from "lucide-react";

export default function ListenAndTypeRenderer({ item, onSubmit, submitting }) {
  const [textInput, setTextInput] = useState("");
  const [replaysLeft, setReplaysLeft] = useState(item.maxReplays || 2);

  if (!item) return null;

  const playAudio = () => {
    if (replaysLeft <= 0) return;
    setReplaysLeft((r) => r - 1);
    const syn = new SpeechSynthesisUtterance(item.audioText || "The library is open.");
    syn.rate = 0.9;
    window.speechSynthesis.speak(syn);
  };

  const calculateAccuracy = () => {
    const expected = (item.audioText || "").toLowerCase().replace(/[^\w\s]/g, "").split(/\s+/);
    const actual = textInput.toLowerCase().replace(/[^\w\s]/g, "").split(/\s+/);

    if (expected.length === 0) return 0.8;
    let matches = 0;
    expected.forEach((w) => {
      if (actual.includes(w)) matches += 1;
    });
    return matches / expected.length;
  };

  const handleSubmit = () => {
    const acc = calculateAccuracy();
    onSubmit(textInput, acc);
  };

  return (
    <div className="det-test-card" style={{ textAlign: "center" }}>
      <span className="det-hero-badge">Listen and Type</span>
      <h3 style={{ marginTop: "12px", fontSize: "20px", fontWeight: "800", color: "var(--det-text)" }}>
        {item.prompt || "Type the statement that you hear."}
      </h3>

      <div style={{ margin: "32px 0" }}>
        <button
          type="button"
          onClick={playAudio}
          disabled={replaysLeft <= 0}
          style={{
            width: "80px",
            height: "80px",
            borderRadius: "50%",
            background: replaysLeft > 0 ? "var(--det-primary)" : "var(--det-border)",
            color: "white",
            border: "none",
            cursor: replaysLeft > 0 ? "pointer" : "not-allowed",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: replaysLeft > 0 ? "0 6px 20px rgba(88, 204, 2, 0.3)" : "none",
          }}
        >
          <Volume2 size={36} />
        </button>
        <div style={{ marginTop: "12px", fontSize: "14px", color: "var(--det-text-muted)", fontWeight: "700" }}>
          {replaysLeft} replay{replaysLeft !== 1 ? "s" : ""} remaining
        </div>
      </div>

      <input
        type="text"
        className="det-input-field"
        placeholder="Type the statement you heard..."
        value={textInput}
        onChange={(e) => setTextInput(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && textInput.trim()) handleSubmit();
        }}
      />

      <button
        className="det-btn-primary"
        style={{ marginTop: "24px", width: "100%", justifyContent: "center", padding: "16px" }}
        onClick={handleSubmit}
        disabled={submitting || !textInput.trim()}
      >
        Submit Dictation <ArrowRight size={18} />
      </button>
    </div>
  );
}
