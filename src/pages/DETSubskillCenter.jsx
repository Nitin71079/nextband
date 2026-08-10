import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  BookOpen, Headphones, PenLine, Mic, Sparkles, CheckCircle2, XCircle,
  Volume2, Play, ArrowRight, RefreshCw, Layers, Award
} from "lucide-react";
import toast from "react-hot-toast";
import { evaluateDETGPT } from "../services/evaluateDETGPT";

const READ_SELECT_WORDS = [
  { word: "Eloquent", isReal: true },
  { word: "Flabbergast", isReal: true },
  { word: "Plimpt", isReal: false },
  { word: "Substantial", isReal: true },
  { word: "Vigorously", isReal: true },
  { word: "Crandal", isReal: false },
  { word: "Meticulous", isReal: true },
  { word: "Brevity", isReal: true },
  { word: "Sproot", isReal: false },
  { word: "Ambiguous", isReal: true },
];

export default function DETSubskillCenter() {
  const { type = "read-select" } = useParams();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState(type);
  const [selectedWords, setSelectedWords] = useState({});
  const [submittedRS, setSubmittedRS] = useState(false);

  // Writing studio state
  const [essayPrompt, setEssayPrompt] = useState("Some people believe that online learning is more effective than traditional classroom studying. Discuss your opinion with reasons.");
  const [essayText, setEssayText] = useState("");
  const [evaluating, setEvaluating] = useState(false);
  const [aiReport, setAiReport] = useState(null);

  function handleWordToggle(word) {
    if (submittedRS) return;
    setSelectedWords(prev => ({ ...prev, [word]: !prev[word] }));
  }

  function scoreReadSelect() {
    setSubmittedRS(true);
    let correct = 0;
    READ_SELECT_WORDS.forEach(w => {
      const isSel = Boolean(selectedWords[w.word]);
      if (isSel === w.isReal) correct++;
    });
    toast.success(`Score: ${correct} / ${READ_SELECT_WORDS.length} words correctly identified!`);
  }

  async function handleEvaluateEssay() {
    if (!essayText.trim()) {
      toast.error("Please write a response before evaluating.");
      return;
    }
    setEvaluating(true);
    try {
      const res = await evaluateDETGPT({
        taskType: "writing-sample",
        questionPrompt: essayPrompt,
        userResponse: essayText,
      });
      setAiReport(res);
      toast.success("AI DET evaluation completed!");
    } catch (e) {
      toast.error("Could not evaluate essay.");
    } finally {
      setEvaluating(false);
    }
  }

  const TABS = [
    { id: "read-select", label: "Read & Select Bank", icon: BookOpen },
    { id: "dictation", label: "Dictation Studio", icon: Headphones },
    { id: "writing-studio", label: "AI Writing & Speaking Studio", icon: PenLine },
  ];

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg)", color: "var(--text)", fontFamily: "Inter, sans-serif", padding: "60px 24px 80px" }}>
      <div style={{ maxWidth: 1000, margin: "0 auto" }}>

        {/* Hero Header */}
        <div style={{ marginBottom: 36 }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "5px 14px", borderRadius: 999, background: "rgba(16,185,129,0.12)", color: "#10b981", fontSize: 12, fontWeight: 800, marginBottom: 12 }}>
            <Sparkles size={14} /> DET SUBSKILL DRILL LAB
          </div>
          <h1 style={{ fontSize: 28, fontWeight: 900, margin: "0 0 8px 0" }}>Targeted Duolingo Skill Trainers</h1>
          <p style={{ color: "var(--text-secondary)", fontSize: 14, margin: 0 }}>Isolate and master individual DET task formats with instant feedback and AI scoring.</p>
        </div>

        {/* Tabs Bar */}
        <div style={{ display: "flex", gap: 10, background: "var(--card)", border: "1px solid var(--border)", borderRadius: 18, padding: 6, width: "fit-content", marginBottom: 32 }}>
          {TABS.map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  padding: "10px 20px",
                  borderRadius: 14,
                  border: "none",
                  background: isActive ? "#10b981" : "transparent",
                  color: isActive ? "#fff" : "var(--text-secondary)",
                  fontWeight: 700,
                  fontSize: 13,
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  transition: "all 0.15s ease",
                }}
              >
                <Icon size={16} /> {tab.label}
              </button>
            );
          })}
        </div>

        {/* ── TAB 1: READ AND SELECT BANK ── */}
        {activeTab === "read-select" && (
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 24, padding: 32 }}>
            <h3 style={{ fontSize: 20, fontWeight: 800, margin: "0 0 6px 0" }}>Read and Select — Real vs Pseudo Words</h3>
            <p style={{ color: "var(--text-secondary)", fontSize: 13, marginBottom: 24 }}>Select all valid English words in the grid below.</p>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: 14, marginBottom: 28 }}>
              {READ_SELECT_WORDS.map(w => {
                const isSel = Boolean(selectedWords[w.word]);
                let bg = isSel ? "rgba(16,185,129,0.12)" : "var(--surface)";
                let borderColor = isSel ? "#10b981" : "var(--border)";
                let color = isSel ? "#059669" : "var(--text)";

                if (submittedRS) {
                  if (w.isReal) {
                    bg = "rgba(34,197,94,0.15)";
                    borderColor = "#22c55e";
                    color = "#15803d";
                  } else if (isSel && !w.isReal) {
                    bg = "rgba(239,68,68,0.15)";
                    borderColor = "#ef4444";
                    color = "#b91c1c";
                  }
                }

                return (
                  <button
                    key={w.word}
                    onClick={() => handleWordToggle(w.word)}
                    style={{
                      padding: "16px",
                      borderRadius: 16,
                      border: `2px solid ${borderColor}`,
                      background: bg,
                      color,
                      fontWeight: 700,
                      fontSize: 16,
                      cursor: "pointer",
                      textAlign: "center",
                    }}
                  >
                    {w.word}
                    {submittedRS && w.isReal && <span style={{ display: "block", fontSize: 11, color: "#166534", marginTop: 4 }}>✓ Real Word</span>}
                    {submittedRS && !w.isReal && <span style={{ display: "block", fontSize: 11, color: "#991b1b", marginTop: 4 }}>✗ Fake Word</span>}
                  </button>
                );
              })}
            </div>

            <div style={{ display: "flex", gap: 12 }}>
              <button
                onClick={scoreReadSelect}
                style={{ background: "#10b981", color: "#fff", border: "none", borderRadius: 14, padding: "12px 24px", fontWeight: 800, fontSize: 14, cursor: "pointer" }}
              >
                Submit &amp; Check Accuracy
              </button>
              <button
                onClick={() => { setSelectedWords({}); setSubmittedRS(false); }}
                style={{ background: "var(--surface)", border: "1px solid var(--border)", color: "var(--text)", borderRadius: 14, padding: "12px 20px", fontWeight: 700, fontSize: 14, cursor: "pointer" }}
              >
                Reset Grid
              </button>
            </div>
          </motion.div>
        )}

        {/* ── TAB 2: DICTATION STUDIO ── */}
        {activeTab === "dictation" && (
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 24, padding: 32 }}>
            <h3 style={{ fontSize: 20, fontWeight: 800, margin: "0 0 6px 0" }}>Dictation &amp; Audio Transcription Lab</h3>
            <p style={{ color: "var(--text-secondary)", fontSize: 13, marginBottom: 24 }}>Listen to audio sentences and transcribe them with high phonetic accuracy.</p>
            <div style={{ padding: 24, borderRadius: 16, background: "var(--surface)", border: "1px solid var(--border)", textAlign: "center" }}>
              <p style={{ color: "var(--text-secondary)", fontSize: 14 }}>More dictation audio sets are integrated dynamically in the DET Mock Exam Engine.</p>
              <button onClick={() => navigate("/mock/det/1")} style={{ background: "#10b981", color: "#fff", border: "none", borderRadius: 14, padding: "12px 24px", fontWeight: 800, fontSize: 14, cursor: "pointer" }}>
                Launch DET Full Mock Test 1
              </button>
            </div>
          </motion.div>
        )}

        {/* ── TAB 3: AI WRITING & SPEAKING STUDIO ── */}
        {activeTab === "writing-studio" && (
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 24, padding: 32 }}>
            <h3 style={{ fontSize: 20, fontWeight: 800, margin: "0 0 6px 0" }}>AI DET Writing Evaluator</h3>
            <p style={{ color: "var(--text-secondary)", fontSize: 13, marginBottom: 20 }}>Instant GPT-4o analysis on DET opinion &amp; image prompts (10-160 scale).</p>

            <div style={{ background: "var(--surface)", padding: 16, borderRadius: 14, border: "1px solid var(--border)", fontWeight: 700, fontSize: 14, marginBottom: 16 }}>
              Prompt: {essayPrompt}
            </div>

            <textarea
              value={essayText}
              onChange={e => setEssayText(e.target.value)}
              placeholder="Write your DET response here (50-150 words)..."
              rows={6}
              style={{ width: "100%", borderRadius: 16, border: "1px solid var(--border)", padding: 16, fontSize: 14, background: "var(--bg)", color: "var(--text)", outline: "none", resize: "vertical", boxSizing: "border-box", marginBottom: 16 }}
            />

            <button
              onClick={handleEvaluateEssay}
              disabled={evaluating}
              style={{ background: "linear-gradient(135deg, #10b981, #059669)", color: "#fff", border: "none", borderRadius: 14, padding: "14px 28px", fontWeight: 800, fontSize: 15, cursor: evaluating ? "not-allowed" : "pointer" }}
            >
              {evaluating ? "Evaluating DET Criteria..." : "Evaluate Response with AI ✨"}
            </button>

            {aiReport && (
              <div style={{ marginTop: 28, background: "rgba(16,185,129,0.06)", border: "1px solid rgba(16,185,129,0.2)", borderRadius: 20, padding: 24 }}>
                <div style={{ fontSize: 28, fontWeight: 900, color: "#10b981" }}>Estimated DET Score: {aiReport.score} / 160</div>
                <div style={{ marginTop: 14, fontSize: 13, lineHeight: 1.6, color: "var(--text)" }}>
                  <div><strong>Lexical Sophistication:</strong> {aiReport.feedback?.lexicalSophistication}</div>
                  <div style={{ marginTop: 6 }}><strong>Grammatical Complexity:</strong> {aiReport.feedback?.grammaticalComplexity}</div>
                  <div style={{ marginTop: 6 }}><strong>Recommendation:</strong> {aiReport.feedback?.recommendation}</div>
                </div>
              </div>
            )}
          </motion.div>
        )}

      </div>
    </div>
  );
}
