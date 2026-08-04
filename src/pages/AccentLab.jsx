import { useState } from "react";
import {
  Mic,
  Volume2,
  Play,
  Square,
  Sparkles,
  Award,
  Zap,
  CheckCircle2,
  Globe,
  RotateCcw,
  Sliders,
  Radio,
  FileAudio
} from "lucide-react";
import toast from "react-hot-toast";

import "../styles/dashboard/dashboard.css";

const SAMPLE_SENTENCES = [
  "The international committee unanimously approved the educational reform initiative.",
  "Fluency and coherence require clear pronunciation without awkward hesitations.",
  "Technological advancements have significantly transformed global communication patterns."
];

export default function AccentLab() {
  const [selectedAccent, setSelectedAccent] = useState("UK"); // "UK", "US", "AUS"
  const [selectedSentence, setSelectedSentence] = useState(SAMPLE_SENTENCES[0]);
  const [isRecording, setIsRecording] = useState(false);
  const [hasRecorded, setHasRecorded] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);

  const handleStartRecording = () => {
    setIsRecording(true);
    setHasRecorded(false);
    setAnalysisResult(null);

    // Simulate 4s audio recording
    setTimeout(() => {
      setIsRecording(false);
      setHasRecorded(true);
      handleAnalyzeAudio();
    }, 4000);
  };

  const handleAnalyzeAudio = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      setIsAnalyzing(false);
      setAnalysisResult({
        overallPronunciation: "8.5 Band",
        intelligibility: "94%",
        accentNeutrality: "90%",
        phonemeDetails: [
          { sound: "/θ/ (th)", accuracy: "92%", note: "Excellent friction control in 'the' & 'authoritative'" },
          { sound: "/r/ (rhoticity)", accuracy: "88%", note: "Natural UK non-rhotic vowel elongation" },
          { sound: "Word Stress", accuracy: "95%", note: "Correct primary stress on 'in-ter-NA-tion-al'" }
        ]
      });
      toast.success("✨ Accent & Pronunciation Evaluation Complete!");
    }, 1800);
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
            <Mic size={14} />
            <span>Knarrow Accent Lab & Phoneme AI Analyzer</span>
          </div>

          <h1 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 900, color: "var(--text, #0f172a)", margin: 0, marginBottom: 12 }}>
            IELTS Accent & Pronunciation Studio
          </h1>

          <p style={{ fontSize: 15, color: "var(--text-muted, #64748b)", margin: 0, maxWidth: 680, lineHeight: 1.6 }}>
            Master clear intonation, word stress, and phoneme accuracy for IELTS Speaking. Record your speech sample and compare with British, North American, and Australian standards.
          </p>
        </div>
      </section>

      {/* ACCENT SELECTION & RECORDING STUDIO */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
        gap: 24,
      }}>
        
        {/* LEFT: RECORDING CONTROLS */}
        <div style={{
          background: "var(--surface, #ffffff)",
          border: "1px solid var(--border, #e2e8f0)",
          borderRadius: 28,
          padding: 32,
          boxShadow: "0 10px 30px rgba(15,23,42,.04)",
          display: "flex",
          flexDirection: "column",
          gap: 24,
        }}>
          <div>
            <label style={{ fontSize: 12, fontWeight: 800, textTransform: "uppercase", color: "var(--text-muted, #64748b)", display: "block", marginBottom: 10 }}>
              1. Choose Target Reference Accent
            </label>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10 }}>
              {[
                { id: "UK", flag: "🇬🇧", label: "British RP" },
                { id: "US", flag: "🇺🇸", label: "American" },
                { id: "AUS", flag: "🇦🇺", label: "Australian" },
              ].map((acc) => (
                <button
                  key={acc.id}
                  onClick={() => setSelectedAccent(acc.id)}
                  style={{
                    padding: 12,
                    borderRadius: 16,
                    border: selectedAccent === acc.id ? "2px solid #2563eb" : "1px solid var(--border, #e2e8f0)",
                    background: selectedAccent === acc.id ? "rgba(37,99,235,.06)" : "var(--surface-2, #f8fafc)",
                    color: selectedAccent === acc.id ? "#2563eb" : "var(--text, #0f172a)",
                    fontWeight: 800,
                    fontSize: 13,
                    cursor: "pointer",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 4,
                  }}
                >
                  <span style={{ fontSize: 20 }}>{acc.flag}</span>
                  <span>{acc.label}</span>
                </button>
              ))}
            </div>
          </div>

          <div>
            <label style={{ fontSize: 12, fontWeight: 800, textTransform: "uppercase", color: "var(--text-muted, #64748b)", display: "block", marginBottom: 10 }}>
              2. Read Sentence Out Loud
            </label>
            <div style={{
              background: "var(--surface-2, #f8fafc)",
              border: "1px solid var(--border, #e2e8f0)",
              borderRadius: 18,
              padding: 18,
              fontSize: 15,
              fontWeight: 700,
              color: "var(--text, #0f172a)",
              lineHeight: 1.5,
            }}>
              "{selectedSentence}"
            </div>
          </div>

          {/* Record Button & Waveform */}
          <div style={{ textAlign: "center", paddingTop: 10 }}>
            {isRecording ? (
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
                <div style={{
                  width: 80, height: 80, borderRadius: "50%", background: "#ef4444", color: "white",
                  display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 0 30px rgba(239,68,68,.4)"
                }} className="animate-pulse">
                  <Square size={32} />
                </div>
                <div style={{ fontSize: 14, fontWeight: 800, color: "#ef4444" }}>Recording Speech (4s)...</div>
              </div>
            ) : (
              <button
                onClick={handleStartRecording}
                disabled={isAnalyzing}
                style={{
                  padding: "16px 36px",
                  borderRadius: 20,
                  background: "linear-gradient(135deg, #2563eb, #3b82f6)",
                  color: "white",
                  border: "none",
                  fontWeight: 900,
                  fontSize: 15,
                  cursor: "pointer",
                  boxShadow: "0 12px 30px rgba(37,99,235,.25)",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 10,
                }}
              >
                <Mic size={20} /> Record Voice Sample
              </button>
            )}
          </div>
        </div>

        {/* RIGHT: AI DIAGNOSTICS & EVALUATION */}
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
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
              <Sparkles size={22} style={{ color: "#2563eb" }} />
              <h3 style={{ fontSize: 18, fontWeight: 900, color: "var(--text, #0f172a)", margin: 0 }}>
                Pronunciation Diagnostics
              </h3>
            </div>

            {isAnalyzing ? (
              <div style={{ padding: "40px 0", textAlign: "center" }}>
                <Sparkles size={32} className="animate-spin" style={{ color: "#2563eb", margin: "0 auto 12px" }} />
                <div style={{ fontSize: 14, fontWeight: 800, color: "var(--text, #0f172a)" }}>Analyzing Phoneme Clarity & Intonation...</div>
              </div>
            ) : analysisResult ? (
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                <div style={{
                  display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10, textAlign: "center",
                  background: "var(--surface-2, #f8fafc)", padding: 16, borderRadius: 18, border: "1px solid var(--border, #e2e8f0)"
                }}>
                  <div>
                    <div style={{ fontSize: 11, color: "var(--text-muted, #64748b)" }}>Estimated Score</div>
                    <div style={{ fontSize: 18, fontWeight: 900, color: "#2563eb", marginTop: 2 }}>{analysisResult.overallPronunciation}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: 11, color: "var(--text-muted, #64748b)" }}>Clarity</div>
                    <div style={{ fontSize: 18, fontWeight: 900, color: "#16a34a", marginTop: 2 }}>{analysisResult.intelligibility}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: 11, color: "var(--text-muted, #64748b)" }}>Match</div>
                    <div style={{ fontSize: 18, fontWeight: 900, color: "#0284c7", marginTop: 2 }}>{analysisResult.accentNeutrality}</div>
                  </div>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  {analysisResult.phonemeDetails.map((det, i) => (
                    <div key={i} style={{
                      padding: 12, borderRadius: 14, background: "var(--surface-2, #f8fafc)", border: "1px solid var(--border, #e2e8f0)", fontSize: 13
                    }}>
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 2 }}>
                        <strong style={{ color: "var(--text, #0f172a)" }}>{det.sound}</strong>
                        <span style={{ color: "#16a34a", fontWeight: 800 }}>{det.accuracy}</span>
                      </div>
                      <div style={{ fontSize: 12, color: "var(--text-muted, #64748b)" }}>{det.note}</div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div style={{ padding: "40px 0", textAlign: "center", color: "var(--text-muted, #64748b)", fontSize: 14 }}>
                Click <strong>Record Voice Sample</strong> to receive instant AI phoneme & accent analysis.
              </div>
            )}
          </div>

          <div style={{
            padding: 16, borderRadius: 18, background: "#eff6ff", border: "1px solid #bfdbfe", color: "#1e40af", fontSize: 13
          }}>
            💡 <strong>IELTS Speaking Tip:</strong> IELTS examiners do not penalize regional accents, but expect clear pronunciation, natural rhythm, and correct word stress.
          </div>
        </div>

      </div>

    </div>
  );
}