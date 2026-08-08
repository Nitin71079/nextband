import { useState, useEffect } from "react";
import { Mic, Square, ArrowRight } from "lucide-react";
import { evaluateDETSpeaking } from "../../services/detAIService";

export default function SpeakingSampleRenderer({ item, onSubmit, submitting }) {
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [recognition, setRecognition] = useState(null);
  const [evaluating, setEvaluating] = useState(false);

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

  const handleSubmit = async () => {
    setIsRecording(false);
    if (recognition) recognition.stop();

    setEvaluating(true);
    const aiRes = await evaluateDETSpeaking(item.prompt, transcript || "Extended candidate speaking sample transcript");
    setEvaluating(false);

    const accuracy = aiRes.score / 160;
    onSubmit({ transcript, aiEvaluation: aiRes }, accuracy);
  };

  return (
    <div className="det-test-card" style={{ textAlign: "center" }}>
      <span className="det-hero-badge">Speaking Sample (Extended)</span>
      <h3 style={{ marginTop: "12px", fontSize: "20px", fontWeight: "800", color: "var(--det-text)" }}>
        {item.prompt}
      </h3>

      {transcript && (
        <div
          style={{
            padding: "16px",
            background: "var(--det-surface-2)",
            borderRadius: "14px",
            fontSize: "15px",
            margin: "20px 0",
            fontStyle: "italic",
            border: "1px solid var(--det-border)",
          }}
        >
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
          margin: "24px auto",
          display: "inline-flex",
          alignItems: "center",
          gap: "10px",
        }}
      >
        {isRecording ? <Square size={20} /> : <Mic size={20} />}
        {isRecording ? "Stop Recording" : "Start Recording"}
      </button>

      <br />

      <button
        className="det-btn-primary"
        style={{ marginTop: "16px", width: "100%", justifyContent: "center", padding: "16px" }}
        onClick={handleSubmit}
        disabled={submitting || evaluating}
      >
        {evaluating ? "Evaluating Speech with AI..." : <>Submit Speaking Sample <ArrowRight size={18} /></>}
      </button>
    </div>
  );
}
