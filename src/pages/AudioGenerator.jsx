import { useState } from "react";
import {
  Volume2,
  Play,
  Square,
  Sliders,
  Sparkles,
  Download,
  FileAudio,
  Globe,
  Zap,
  CheckCircle2,
  RotateCcw
} from "lucide-react";
import toast from "react-hot-toast";

import "../styles/dashboard/dashboard.css";

const VOICES = [
  { id: "en-GB-Wavenet-B", name: "Oliver (British RP • Male)", gender: "Male", accent: "🇬🇧 British" },
  { id: "en-GB-Wavenet-A", name: "Charlotte (British RP • Female)", gender: "Female", accent: "🇬🇧 British" },
  { id: "en-US-Wavenet-D", name: "James (American • Male)", gender: "Male", accent: "🇺🇸 American" },
  { id: "en-US-Wavenet-F", name: "Emma (American • Female)", gender: "Female", accent: "🇺🇸 American" },
  { id: "en-AU-Wavenet-B", name: "Liam (Australian • Male)", gender: "Male", accent: "🇦🇺 Australian" },
];

export default function AudioGenerator() {
  const [textInput, setTextInput] = useState(
    "In Section 3 of the IELTS Listening exam, candidates listen to a conversation between university students discussing a research project."
  );
  const [selectedVoice, setSelectedVoice] = useState(VOICES[0].id);
  const [playbackSpeed, setPlaybackSpeed] = useState(1.0);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleGenerateAudio = () => {
    if (!textInput.trim()) {
      toast.error("Please enter text script!");
      return;
    }

    setIsGenerating(true);

    setTimeout(() => {
      setIsGenerating(false);
      setIsPlaying(true);
      toast.success("✨ Audio Generated & Playing!");

      setTimeout(() => setIsPlaying(false), 5000);
    }, 1200);
  };

  return (
    <div className="dashboard-page" style={{ paddingBottom: 60 }}>
      
      {/* HERO */}
      <section className="dashboard-hero">
        <div style={{ position: "relative", zIndex: 2 }}>
          <div style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            padding: "6px 16px",
            borderRadius: 999,
            background: "rgba(37, 99, 235, 0.08)",
            border: "1px solid rgba(37, 99, 235, 0.2)",
            color: "#2563eb",
            fontSize: 12,
            fontWeight: 800,
            textTransform: "uppercase",
            letterSpacing: 0.5,
            marginBottom: 16,
          }}>
            <FileAudio size={14} />
            <span>Knarrow AI Voice & Audio Generator</span>
          </div>

          <h1 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 900, color: "var(--text, #0f172a)", margin: 0, marginBottom: 12 }}>
            IELTS Audio Generator & Voice Studio
          </h1>

          <p style={{ fontSize: 15, color: "var(--text-muted, #64748b)", margin: 0, maxWidth: 680, lineHeight: 1.6 }}>
            Generate natural British, American, and Australian IELTS listening prompts or essay audio dictations with customizable speed controls.
          </p>
        </div>
      </section>

      {/* WORKSPACE GRID */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
        gap: 24,
      }}>
        
        {/* SCRIPT INPUT & CONTROLS */}
        <div style={{
          background: "var(--surface, #ffffff)",
          border: "1px solid var(--border, #e2e8f0)",
          borderRadius: 28,
          padding: 32,
          boxShadow: "0 10px 30px rgba(15,23,42,.04)",
          display: "flex",
          flexDirection: "column",
          gap: 20,
        }}>
          <div>
            <label style={{ fontSize: 13, fontWeight: 800, color: "var(--text, #0f172a)", display: "block", marginBottom: 8 }}>
              Text Script / Dictation Prompt
            </label>
            <textarea
              rows={5}
              value={textInput}
              onChange={(e) => setTextInput(e.target.value)}
              placeholder="Paste listening scripts or essays here..."
              style={{
                width: "100%",
                background: "var(--surface-2, #f8fafc)",
                border: "1px solid var(--border, #e2e8f0)",
                borderRadius: 18,
                padding: 16,
                fontSize: 14,
                color: "var(--text, #0f172a)",
                outline: "none",
                resize: "vertical",
                lineHeight: 1.6,
              }}
            />
          </div>

          {/* Voice Selector */}
          <div>
            <label style={{ fontSize: 13, fontWeight: 800, color: "var(--text, #0f172a)", display: "block", marginBottom: 8 }}>
              Select AI Voice & Accent
            </label>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {VOICES.map((v) => (
                <button
                  key={v.id}
                  onClick={() => setSelectedVoice(v.id)}
                  style={{
                    padding: "12px 16px",
                    borderRadius: 14,
                    border: selectedVoice === v.id ? "2px solid #2563eb" : "1px solid var(--border, #e2e8f0)",
                    background: selectedVoice === v.id ? "rgba(37,99,235,.06)" : "var(--surface-2, #f8fafc)",
                    color: selectedVoice === v.id ? "#2563eb" : "var(--text, #0f172a)",
                    fontWeight: 800,
                    fontSize: 13,
                    textAlign: "left",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <span>{v.name}</span>
                  <span style={{ fontSize: 11, fontWeight: 700, color: "var(--text-muted, #64748b)" }}>{v.accent}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Speed control */}
          <div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
              <label style={{ fontSize: 13, fontWeight: 800, color: "var(--text, #0f172a)" }}>Playback Speed</label>
              <span style={{ fontSize: 13, fontWeight: 900, color: "#2563eb" }}>{playbackSpeed}x</span>
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              {[0.8, 1.0, 1.25, 1.5].map((spd) => (
                <button
                  key={spd}
                  onClick={() => setPlaybackSpeed(spd)}
                  style={{
                    flex: 1,
                    padding: 8,
                    borderRadius: 12,
                    border: playbackSpeed === spd ? "2px solid #2563eb" : "1px solid var(--border, #e2e8f0)",
                    background: playbackSpeed === spd ? "#2563eb" : "var(--surface-2, #f8fafc)",
                    color: playbackSpeed === spd ? "white" : "var(--text, #0f172a)",
                    fontWeight: 800,
                    fontSize: 12,
                    cursor: "pointer",
                  }}
                >
                  {spd}x
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={handleGenerateAudio}
            disabled={isGenerating}
            style={{
              padding: "15px",
              borderRadius: 18,
              background: "linear-gradient(135deg, #2563eb, #3b82f6)",
              color: "white",
              border: "none",
              fontWeight: 900,
              fontSize: 14,
              cursor: "pointer",
              boxShadow: "0 10px 25px rgba(37,99,235,.25)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
              marginTop: 10,
            }}
          >
            {isGenerating ? <Sparkles size={18} className="animate-spin" /> : <Volume2 size={18} />}
            {isGenerating ? "Generating Audio..." : "Generate AI Audio Dictation"}
          </button>
        </div>

        {/* AUDIO PLAYER & PREVIEW */}
        <div style={{
          background: "var(--surface, #ffffff)",
          border: "1px solid var(--border, #e2e8f0)",
          borderRadius: 28,
          padding: 32,
          boxShadow: "0 10px 30px rgba(15,23,42,.04)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          gap: 20,
        }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
              <FileAudio size={22} style={{ color: "#2563eb" }} />
              <h3 style={{ fontSize: 18, fontWeight: 900, color: "var(--text, #0f172a)", margin: 0 }}>
                Audio Player Preview
              </h3>
            </div>

            {isPlaying ? (
              <div style={{
                background: "linear-gradient(135deg, #1e40af, #2563eb)",
                borderRadius: 22,
                padding: 24,
                color: "white",
                textAlign: "center",
                boxShadow: "0 12px 30px rgba(37,99,235,.3)",
              }}>
                <Volume2 size={36} className="animate-bounce" style={{ margin: "0 auto 12px" }} />
                <div style={{ fontSize: 16, fontWeight: 900 }}>Playing Audio Dictation ({playbackSpeed}x)</div>
                <div style={{ fontSize: 12, opacity: 0.9, marginTop: 4 }}>Voice: {VOICES.find(v => v.id === selectedVoice)?.name}</div>
              </div>
            ) : (
              <div style={{
                background: "var(--surface-2, #f8fafc)",
                border: "1px dashed var(--border, #e2e8f0)",
                borderRadius: 22,
                padding: 40,
                textAlign: "center",
                color: "var(--text-muted, #64748b)",
                fontSize: 14,
              }}>
                <Volume2 size={36} style={{ color: "#94a3b8", marginBottom: 10 }} />
                <div>Click <strong>Generate AI Audio Dictation</strong> to create audio.</div>
              </div>
            )}
          </div>

          <div style={{
            padding: 16, borderRadius: 18, background: "#eff6ff", border: "1px solid #bfdbfe", color: "#1e40af", fontSize: 13
          }}>
            💡 <strong>Exam Application:</strong> Practice Listening Section 1-4 with authentic accent variety before test day.
          </div>
        </div>

      </div>

    </div>
  );
}
