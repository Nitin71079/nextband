import { useState, useEffect } from "react";
import { Mic, Square, ArrowRight } from "lucide-react";
import { evaluateDETSpeaking } from "../../services/detAIService";

export default function InteractiveSpeakingRenderer({ item, onSubmit, submitting }) {
  const [stage, setStage] = useState(1);
  const [isRecording, setIsRecording] = useState(false);
  const [transcript1, setTranscript1] = useState("");
  const [transcript2, setTranscript2] = useState("");
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
        if (stage === 1) setTranscript1(current);
        else setTranscript2(current);
      };

      setRecognition(rec);
    }
  }, [stage]);

  const toggleRecording = () => {
    if (isRecording) {
      setIsRecording(false);
      if (recognition) recognition.stop();
    } else {
      setIsRecording(true);
      if (recognition) recognition.start();
    }
  };

  const handleNextStage = async () => {
    if (stage === 1 && item.followUpPrompt) {
      setIsRecording(false);
      if (recognition) recognition.stop();
      setStage(2);
    } else {
      setIsRecording(false);
      if (recognition) recognition.stop();

      setEvaluating(true);
      const res1 = await evaluateDETSpeaking(item.prompt, transcript1 || "Candidate spoken response 1");
      const res2 = item.followUpPrompt
        ? await evaluateDETSpeaking(item.followUpPrompt, transcript2 || "Candidate spoken response 2")
        : null;
      setEvaluating(false);

      const avgScore = res2 ? Math.round((res1.score + res2.score) / 2) : res1.score;
      const normAccuracy = avgScore / 160;

      onSubmit(
        { transcript1, transcript2, aiEvaluation: { res1, res2 } },
        normAccuracy
      );
    }
  };

  const currentTranscript = stage === 1 ? transcript1 : transcript2;

  return (
    <div className="det-test-card" style={{ textAlign: "center" }}>
      <span className="det-hero-badge">Interactive Speaking — Stage {stage} of 2</span>
      <h3 style={{ marginTop: "12px", fontSize: "20px", fontWeight: "800", color: "var(--det-text)" }}>
        {stage === 1 ? item.prompt : item.followUpPrompt}
      </h3>

      {currentTranscript && (
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
          Spoken: "{currentTranscript}"
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
        onClick={handleNextStage}
        disabled={submitting || evaluating}
      >
        {evaluating ? (
          "Evaluating Speaking with AI..."
        ) : stage === 1 && item.followUpPrompt ? (
          <>Continue to Follow-up Speaking <ArrowRight size={18} /></>
        ) : (
          <>Submit Interactive Speaking <ArrowRight size={18} /></>
        )}
      </button>
    </div>
  );
}
