import { useState, useEffect } from "react";
import { Mic, ArrowRight, Square } from "lucide-react";

export default function ReadAloudRenderer({ item, onSubmit, submitting }) {
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [recognition, setRecognition] = useState(null);

  useEffect(() => {
    if ("webkitSpeechRecognition" in window || "SpeechRecognition" in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const rec = new SpeechRecognition();
      rec.continuous = true;
      rec.interimResults = true;
      rec.lang = "en-US";

      rec.onresult = (event) => {
        let current = "";
        for (let i = event.resultIndex; i < event.results.length; i++) {
          current += event.results[i][0].transcript;
        }
        setTranscript(current);
      };

      setRecognition(rec);
    }
  }, []);

  const toggleRecording = () => {
    if (isRecording) {
      setIsRecording(false);
      if (recognition) recognition.stop();
    } else {
      setIsRecording(true);
      setTranscript("");
      if (recognition) recognition.start();
    }
  };

  const calculateAccuracy = () => {
    const expected = (item.sentence || item.prompt || "").toLowerCase().replace(/[^\w\s]/g, "").split(/\s+/);
    const actual = transcript.toLowerCase().replace(/[^\w\s]/g, "").split(/\s+/);
    if (expected.length === 0) return 0.85;

    let matches = 0;
    expected.forEach((w) => {
      if (actual.includes(w)) matches += 1;
    });
    return Math.max(0.6, matches / expected.length);
  };

  const handleSubmit = () => {
    const acc = calculateAccuracy();
    onSubmit(transcript || "Recorded spoken sentence", acc);
  };

  return (
    <div className="det-test-card" style={{ textAlign: "center" }}>
      <span className="det-hero-badge">Read Aloud</span>
      <h3 style={{ marginTop: "12px", fontSize: "20px", fontWeight: "800", color: "var(--det-text)" }}>
        {item.prompt || "Record yourself reading the sentence below out loud."}
      </h3>

      <div
        style={{
          padding: "24px",
          background: "var(--det-surface-2)",
          borderRadius: "16px",
          fontSize: "22px",
          fontWeight: "700",
          margin: "24px 0",
          border: "1px solid var(--det-border)",
          color: "var(--det-primary)",
        }}
      >
        "{item.sentence || item.prompt}"
      </div>

      {transcript && (
        <div style={{ fontSize: "14px", color: "var(--det-text-muted)", marginBottom: "16px", fontStyle: "italic" }}>
          Spoken: "{transcript}"
        </div>
      )}

      <button
        type="button"
        onClick={toggleRecording}
        style={{
          padding: "16px 32px",
          borderRadius: "20px",
          background: isRecording ? "#ef4444" : "var(--det-primary)",
          color: "white",
          border: "none",
          fontWeight: "800",
          fontSize: "16px",
          cursor: "pointer",
          margin: "12px auto 24px",
          display: "inline-flex",
          alignItems: "center",
          gap: "10px",
        }}
      >
        {isRecording ? <Square size={20} /> : <Mic size={20} />}
        {isRecording ? "Stop Recording" : "Start Recording"}
      </button>

      <button
        className="det-btn-primary"
        style={{ width: "100%", justifyContent: "center", padding: "16px" }}
        onClick={handleSubmit}
        disabled={submitting}
      >
        Submit Recording <ArrowRight size={18} />
      </button>
    </div>
  );
}
