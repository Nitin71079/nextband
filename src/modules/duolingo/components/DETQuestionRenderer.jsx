import { useState } from "react";
import { Mic, Volume2, Send, CheckCircle } from "lucide-react";

export default function DETQuestionRenderer({ item, onSubmitResponse, submitting }) {
  const [textInput, setTextInput] = useState("");
  const [selectedWords, setSelectedWords] = useState(new Set());
  const [isRecording, setIsRecording] = useState(false);

  if (!item) return <div>No DET item loaded.</div>;

  const handleSubmit = (val) => {
    if (onSubmitResponse) {
      onSubmitResponse(item.id, val);
    }
  };

  switch (item.type) {
    case "read-and-complete":
      return (
        <div className="det-test-card">
          <span className="det-hero-badge">Read and Complete</span>
          <h3 style={{ marginTop: "12px", fontSize: "20px", fontWeight: "800" }}>{item.prompt}</h3>
          <div
            style={{
              padding: "24px",
              background: "var(--det-surface-2)",
              borderRadius: "16px",
              fontSize: "18px",
              lineHeight: "1.8",
              margin: "20px 0",
            }}
          >
            {item.passage}
          </div>
          <input
            type="text"
            className="det-input-field"
            placeholder="Type your completed passage or words..."
            value={textInput}
            onChange={(e) => setTextInput(e.target.value)}
          />
          <button
            className="det-btn-primary"
            style={{ marginTop: "24px", width: "100%", justifyContent: "center" }}
            onClick={() => handleSubmit(textInput)}
            disabled={submitting || !textInput.trim()}
          >
            Submit Answer →
          </button>
        </div>
      );

    case "read-and-select":
      return (
        <div className="det-test-card">
          <span className="det-hero-badge">Read and Select</span>
          <h3 style={{ marginTop: "12px", fontSize: "20px", fontWeight: "800" }}>{item.prompt}</h3>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))",
              gap: "14px",
              margin: "24px 0",
            }}
          >
            {item.words?.map((w, idx) => {
              const selected = selectedWords.has(w.text);
              return (
                <button
                  key={idx}
                  onClick={() => {
                    const next = new Set(selectedWords);
                    if (selected) next.delete(w.text);
                    else next.add(w.text);
                    setSelectedWords(next);
                  }}
                  style={{
                    padding: "14px 18px",
                    borderRadius: "14px",
                    fontWeight: "700",
                    fontSize: "16px",
                    border: selected ? "2px solid var(--det-primary)" : "1px solid var(--det-border)",
                    background: selected ? "rgba(88, 204, 2, 0.1)" : "var(--det-surface-2)",
                    color: selected ? "var(--det-primary)" : "var(--det-text)",
                    cursor: "pointer",
                  }}
                >
                  {w.text}
                </button>
              );
            })}
          </div>
          <button
            className="det-btn-primary"
            style={{ width: "100%", justifyContent: "center" }}
            onClick={() => handleSubmit(Array.from(selectedWords))}
            disabled={submitting}
          >
            Submit Words →
          </button>
        </div>
      );

    case "listen-and-type":
      return (
        <div className="det-test-card" style={{ textAlign: "center" }}>
          <span className="det-hero-badge">Listen and Type</span>
          <h3 style={{ marginTop: "12px", fontSize: "20px", fontWeight: "800" }}>{item.prompt}</h3>
          <button
            style={{
              width: "72px",
              height: "72px",
              borderRadius: "50%",
              background: "var(--det-primary)",
              color: "white",
              border: "none",
              cursor: "pointer",
              margin: "24px auto",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            onClick={() => {
              const syn = new SpeechSynthesisUtterance(item.audioText);
              window.speechSynthesis.speak(syn);
            }}
          >
            <Volume2 size={32} />
          </button>
          <input
            type="text"
            className="det-input-field"
            placeholder="Type the statement you heard..."
            value={textInput}
            onChange={(e) => setTextInput(e.target.value)}
          />
          <button
            className="det-btn-primary"
            style={{ marginTop: "24px", width: "100%", justifyContent: "center" }}
            onClick={() => handleSubmit(textInput)}
            disabled={submitting || !textInput.trim()}
          >
            Submit Dictation →
          </button>
        </div>
      );

    case "interactive-writing":
    case "writing-sample":
      return (
        <div className="det-test-card">
          <span className="det-hero-badge">Writing Task</span>
          <h3 style={{ marginTop: "12px", fontSize: "20px", fontWeight: "800" }}>{item.prompt}</h3>
          <textarea
            className="det-input-field"
            style={{ minHeight: "180px", resize: "vertical", fontFamily: "inherit" }}
            placeholder="Type your response here..."
            value={textInput}
            onChange={(e) => setTextInput(e.target.value)}
          />
          <div style={{ marginTop: "8px", fontSize: "14px", color: "var(--det-text-muted)" }}>
            Word count: {textInput.trim() ? textInput.trim().split(/\s+/).length : 0}
          </div>
          <button
            className="det-btn-primary"
            style={{ marginTop: "24px", width: "100%", justifyContent: "center" }}
            onClick={() => handleSubmit(textInput)}
            disabled={submitting || !textInput.trim()}
          >
            Submit Writing →
          </button>
        </div>
      );

    case "read-aloud":
    case "interactive-speaking":
    case "speaking-sample":
      return (
        <div className="det-test-card" style={{ textAlign: "center" }}>
          <span className="det-hero-badge">Speaking Task</span>
          <h3 style={{ marginTop: "12px", fontSize: "20px", fontWeight: "800" }}>{item.prompt || item.sentence}</h3>
          {item.sentence && (
            <p style={{ fontSize: "18px", fontStyle: "italic", margin: "20px 0" }}>"{item.sentence}"</p>
          )}
          <button
            style={{
              padding: "16px 32px",
              borderRadius: "20px",
              background: isRecording ? "#ef4444" : "var(--det-primary)",
              color: "white",
              border: "none",
              fontWeight: "800",
              fontSize: "16px",
              cursor: "pointer",
              margin: "24px auto",
              display: "inline-flex",
              alignItems: "center",
              gap: "10px",
            }}
            onClick={() => setIsRecording(!isRecording)}
          >
            <Mic size={22} /> {isRecording ? "Recording... (Click to Stop)" : "Start Recording"}
          </button>
          <br />
          <button
            className="det-btn-primary"
            style={{ marginTop: "16px", width: "100%", justifyContent: "center" }}
            onClick={() => handleSubmit("Recorded Audio Answer Sample")}
            disabled={submitting}
          >
            Submit Recording →
          </button>
        </div>
      );

    default:
      return (
        <div className="det-test-card">
          <h3>{item.prompt}</h3>
          <input
            type="text"
            className="det-input-field"
            value={textInput}
            onChange={(e) => setTextInput(e.target.value)}
          />
          <button className="det-btn-primary" style={{ marginTop: "20px" }} onClick={() => handleSubmit(textInput)}>
            Submit →
          </button>
        </div>
      );
  }
}
