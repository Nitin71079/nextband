import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Sparkles, BrainCircuit, Headphones, BookOpen, Mic, PenTool,
  ArrowRight, CheckCircle2, Calculator, Play, Layers, Clock, ShieldCheck, HelpCircle
} from "lucide-react";
import { toeflTests } from "../data/toefl/toeflTests";
import { toeflToIelts, toeflToCEFR, toeflToOldScale } from "../utils/toeflScoreCalculator";

export default function TOEFLCenter() {
  const navigate = useNavigate();
  const [selectedScore, setSelectedScore] = useState(5.0);

  const ieltsEquiv = toeflToIelts(selectedScore);
  const cefrEquiv = toeflToCEFR(selectedScore);
  const oldScaleEquiv = toeflToOldScale(selectedScore);

  const sections = [
    {
      title: "📖 Reading Section",
      time: "Up to 30 min",
      items: "Up to 50 items",
      adaptive: "✅ Two-Stage Adaptive",
      color: "#3b82f6",
      tasks: [
        "Complete the Words (Vocabulary, spelling, morphology ~30 items)",
        "Read in Daily Life (Campus notices, emails, signs, schedules)",
        "Read an Academic Passage (Concise texts up to 200 words)"
      ]
    },
    {
      title: "🎧 Listening Section",
      time: "Up to 29 min",
      items: "Up to 47 items",
      adaptive: "✅ Two-Stage Adaptive",
      color: "#8b5cf6",
      tasks: [
        "Listen and Choose a Response (Short spoken statements)",
        "Listen to a Conversation (Student + Professor / Campus staff)",
        "Listen to an Announcement (Campus administrative news)",
        "Listen to an Academic Talk (Lectures up to 250 words)"
      ]
    },
    {
      title: "✍️ Writing Section",
      time: "23 min",
      items: "12 items",
      adaptive: "❌ Linear (Non-Adaptive)",
      color: "#f59e0b",
      tasks: [
        "Build a Sentence (10 items - syntax & word ordering)",
        "Write an Email (1 item - realistic campus communication)",
        "Write for an Academic Discussion (1 item - online forum post)"
      ]
    },
    {
      title: "🎙️ Speaking Section",
      time: "8 min",
      items: "11 tasks",
      adaptive: "❌ Linear (Non-Adaptive)",
      color: "#10b981",
      tasks: [
        "Listen and Repeat (7 tasks - sentence repetition & prosody)",
        "Take an Interview (4 tasks - simulated interview responses)"
      ]
    }
  ];

  return (
    <div style={{ minHeight: "100vh", background: "#0f172a", color: "#ffffff", fontFamily: "Inter, sans-serif", padding: "60px 24px 80px" }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>

        {/* ── HERO BANNER ── */}
        <div style={{ textAlign: "center", marginBottom: "48px" }}>
          <span style={{ background: "rgba(139,92,246,0.15)", color: "#c084fc", border: "1px solid rgba(192,132,252,0.3)", padding: "6px 18px", borderRadius: "999px", fontSize: "12px", fontWeight: "800", letterSpacing: "0.5px" }}>
            <Sparkles size={14} style={{ display: "inline", marginRight: "6px" }} /> OFFICIAL 2026 TOEFL iBT SUITE (1.0 – 6.0 Scale)
          </span>

          <h1 style={{ fontSize: "clamp(2rem, 4vw, 3.2rem)", fontWeight: 900, margin: "16px 0", letterSpacing: "-1px" }}>
            TOEFL iBT 2026 Adaptive Practice &amp; AI Engine
          </h1>
          <p style={{ color: "#94a3b8", fontSize: "1.1rem", maxWidth: "680px", margin: "0 auto 28px", lineHeight: "1.6" }}>
            Master the current multistage adaptive TOEFL iBT exam—featuring <strong>Complete the Words</strong>, <strong>Read in Daily Life</strong>, <strong>Build a Sentence</strong>, <strong>Listen &amp; Repeat</strong>, and instant AI Writing &amp; Speaking evaluations.
          </p>

          <div style={{ display: "flex", justifyContent: "center", gap: 14, flexWrap: "wrap" }}>
            <button
              onClick={() => navigate("/toefl/test/toefl-full-1")}
              style={{
                background: "linear-gradient(135deg, #7c3aed, #2563eb)",
                color: "#ffffff",
                border: "none",
                borderRadius: "14px",
                padding: "14px 28px",
                fontSize: "15px",
                fontWeight: "800",
                cursor: "pointer",
                display: "inline-flex",
                alignItems: "center",
                gap: "10px",
                boxShadow: "0 10px 25px rgba(124, 58, 237, 0.4)",
              }}
            >
              <Play size={18} fill="#ffffff" /> Start 2026 TOEFL iBT Mock Test 1
            </button>
            <a
              href="#score-converter"
              style={{
                background: "rgba(255,255,255,0.08)",
                color: "#ffffff",
                border: "1px solid rgba(255,255,255,0.2)",
                borderRadius: "14px",
                padding: "14px 24px",
                fontSize: "15px",
                fontWeight: "700",
                textDecoration: "none",
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <Calculator size={17} /> 1.0 – 6.0 Score Converter
            </a>
          </div>
        </div>

        {/* ── 4 SECTIONS SUMMARY GRID ── */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "20px", marginBottom: "48px" }}>
          {sections.map((sec) => (
            <div key={sec.title} style={{ background: "rgba(30,41,59,0.7)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "20px", padding: "24px", backdropFilter: "blur(10px)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                <span style={{ fontSize: 13, fontWeight: 800, color: sec.color }}>{sec.adaptive}</span>
                <span style={{ fontSize: 12, color: "#94a3b8" }}>{sec.time}</span>
              </div>
              <h3 style={{ fontSize: 18, fontWeight: 800, margin: "0 0 8px 0" }}>{sec.title}</h3>
              <div style={{ fontSize: 13, color: "#cbd5e1", marginBottom: 14, fontWeight: 600 }}>{sec.items}</div>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, fontSize: 13, color: "#94a3b8", display: "flex", flexDirection: "column", gap: 6 }}>
                {sec.tasks.map((t, idx) => (
                  <li key={idx} style={{ display: "flex", alignItems: "flex-start", gap: 6 }}>
                    <CheckCircle2 size={14} color={sec.color} style={{ marginTop: 3, flexShrink: 0 }} />
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* ── SCORE CONVERTER TOOL ── */}
        <div id="score-converter" style={{ background: "rgba(30,41,59,0.8)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: "24px", padding: "32px", marginBottom: "48px", boxShadow: "0 10px 30px rgba(0,0,0,0.3)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
            <div style={{ width: 42, height: 42, borderRadius: 12, background: "rgba(139,92,246,0.2)", display: "flex", alignItems: "center", justifyContent: "center", color: "#c084fc" }}>
              <Calculator size={22} />
            </div>
            <div>
              <h2 style={{ fontSize: 20, fontWeight: 800, margin: 0 }}>Official 2026 TOEFL iBT Score Converter</h2>
              <p style={{ fontSize: 13, color: "#94a3b8", margin: 0 }}>Map TOEFL 1.0 – 6.0 Band scores to IELTS (0–9), CEFR levels, and legacy 0–120 score reports</p>
            </div>
          </div>

          <div style={{ marginBottom: 24 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
              <span style={{ fontSize: 14, fontWeight: 700, color: "#cbd5e1" }}>Select TOEFL Band Score:</span>
              <span style={{ fontSize: 28, fontWeight: 900, color: "#c084fc" }}>{selectedScore.toFixed(1)} / 6.0</span>
            </div>
            <input
              type="range"
              min="1.0"
              max="6.0"
              step="0.5"
              value={selectedScore}
              onChange={(e) => setSelectedScore(parseFloat(e.target.value))}
              style={{ width: "100%", accentColor: "#7c3aed", height: 8, cursor: "pointer" }}
            />
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16 }}>
            <div style={{ background: "rgba(15,23,42,0.6)", padding: 18, borderRadius: 16, border: "1px solid rgba(255,255,255,0.08)" }}>
              <div style={{ fontSize: 12, color: "#94a3b8", textTransform: "uppercase", fontWeight: 700 }}>CEFR Level</div>
              <div style={{ fontSize: 18, fontWeight: 800, color: "#38bdf8", marginTop: 4 }}>{cefrEquiv}</div>
            </div>
            <div style={{ background: "rgba(15,23,42,0.6)", padding: 18, borderRadius: 16, border: "1px solid rgba(255,255,255,0.08)" }}>
              <div style={{ fontSize: 12, color: "#94a3b8", textTransform: "uppercase", fontWeight: 700 }}>IELTS Equivalent</div>
              <div style={{ fontSize: 18, fontWeight: 800, color: "#4ade80", marginTop: 4 }}>Band {ieltsEquiv}</div>
            </div>
            <div style={{ background: "rgba(15,23,42,0.6)", padding: 18, borderRadius: 16, border: "1px solid rgba(255,255,255,0.08)" }}>
              <div style={{ fontSize: 12, color: "#94a3b8", textTransform: "uppercase", fontWeight: 700 }}>Comparable 0–120 Scale</div>
              <div style={{ fontSize: 18, fontWeight: 800, color: "#facc15", marginTop: 4 }}>{oldScaleEquiv} / 120</div>
            </div>
          </div>
        </div>

        {/* ── 2026 FORMAT SPECIFICATIONS vs OLD FORMAT ── */}
        <div style={{ background: "rgba(30,41,59,0.5)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 24, padding: 32 }}>
          <h2 style={{ fontSize: 20, fontWeight: 800, marginBottom: 16 }}>Key Differences: 2026 Format vs Old Format</h2>
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", fontSize: 14 }}>
              <thead>
                <tr style={{ borderBottom: "2px solid rgba(255,255,255,0.1)", color: "#94a3b8" }}>
                  <th style={{ padding: 12 }}>Feature</th>
                  <th style={{ padding: 12 }}>Old TOEFL Format</th>
                  <th style={{ padding: 12, color: "#c084fc" }}>Current 2026 TOEFL iBT</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                  <td style={{ padding: 12, fontWeight: 700 }}>Scoring Scale</td>
                  <td style={{ padding: 12, color: "#94a3b8" }}>0 – 120 total</td>
                  <td style={{ padding: 12, color: "#4ade80", fontWeight: 700 }}>1.0 – 6.0 Scale (0.5 steps)</td>
                </tr>
                <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                  <td style={{ padding: 12, fontWeight: 700 }}>Reading &amp; Listening</td>
                  <td style={{ padding: 12, color: "#94a3b8" }}>Fixed 700-word passages</td>
                  <td style={{ padding: 12, color: "#4ade80", fontWeight: 700 }}>Two-Stage Multistage Adaptive</td>
                </tr>
                <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                  <td style={{ padding: 12, fontWeight: 700 }}>Reading Content</td>
                  <td style={{ padding: 12, color: "#94a3b8" }}>Academic passages only</td>
                  <td style={{ padding: 12, color: "#4ade80", fontWeight: 700 }}>Complete Words + Daily Life + Academic</td>
                </tr>
                <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                  <td style={{ padding: 12, fontWeight: 700 }}>Writing Section</td>
                  <td style={{ padding: 12, color: "#94a3b8" }}>Integrated + Academic Discussion</td>
                  <td style={{ padding: 12, color: "#4ade80", fontWeight: 700 }}>Build Sentence (10) + Email (1) + Discussion (1)</td>
                </tr>
                <tr>
                  <td style={{ padding: 12, fontWeight: 700 }}>Speaking Section</td>
                  <td style={{ padding: 12, color: "#94a3b8" }}>4 integrated speaking tasks</td>
                  <td style={{ padding: 12, color: "#4ade80", fontWeight: 700 }}>Listen &amp; Repeat (7) + Interview (4)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}
