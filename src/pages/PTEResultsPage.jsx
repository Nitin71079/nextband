import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Award, Sparkles, CheckCircle2, ArrowRight, RefreshCw, BookOpen,
  Headphones, PenTool, Mic, ShieldCheck, ChevronRight, FileText,
  Calendar, Layers, Zap, AlertTriangle
} from "lucide-react";
import { pteToIelts, pteToCEFR, calculatePTEAnalytics } from "../utils/pteScoreCalculator";

export default function PTEResultsPage() {
  const { resultId } = useParams();
  const navigate = useNavigate();
  const [result, setResult] = useState(null);

  useEffect(() => {
    const raw = localStorage.getItem(`pte_result_${resultId}`);
    if (raw) {
      try {
        setResult(JSON.parse(raw));
      } catch (err) {
        console.error("PTE Result parse error:", err);
      }
    }
  }, [resultId]);

  if (!result) {
    return (
      <div style={{ minHeight: "100vh", background: "#0f172a", color: "#ffffff", padding: "60px 24px", textAlign: "center" }}>
        <h2>No PTE Academic test result found.</h2>
        <button
          onClick={() => navigate("/pte")}
          style={{ background: "#7c3aed", color: "#ffffff", border: "none", borderRadius: 12, padding: "12px 24px", marginTop: 16, cursor: "pointer", fontWeight: 800 }}
        >
          Return to PTE Hub
        </button>
      </div>
    );
  }

  const { overallScore, scoreRangeText, confidence, readingPteScore, listeningPteScore, writingPteScore, speakingPteScore, writingFeedback, speakingFeedback } = result;

  const ieltsEquiv = pteToIelts(overallScore);
  const cefrEquiv = pteToCEFR(overallScore);

  const analytics = calculatePTEAnalytics(result);

  return (
    <div style={{ minHeight: "100vh", background: "#0f172a", color: "#ffffff", fontFamily: "Inter, sans-serif", padding: "60px 24px 80px" }}>
      <div style={{ maxWidth: "1050px", margin: "0 auto" }}>

        {/* ── HEADER BADGE ── */}
        <div style={{ textAlign: "center", marginBottom: 36 }}>
          <span style={{ background: "rgba(16,185,129,0.15)", color: "#4ade80", border: "1px solid rgba(74,222,128,0.3)", padding: "6px 18px", borderRadius: 999, fontSize: 12, fontWeight: 800 }}>
            <CheckCircle2 size={14} style={{ display: "inline", marginRight: 6 }} /> PTE ACADEMIC PRACTICE RESULTS (10 – 90 SCALE)
          </span>
          <h1 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 900, margin: "16px 0 8px 0" }}>
            Your 2026 PTE Academic Practice Results
          </h1>
          <p style={{ color: "#94a3b8", fontSize: 15 }}>Test Date: {new Date(result.date).toLocaleDateString()}</p>
        </div>

        {/* ── OVERALL PREDICTED SCORE CARD ── */}
        <div style={{ background: "linear-gradient(135deg, #4c1d95 0%, #7c3aed 50%, #2563eb 100%)", borderRadius: 28, padding: "40px", textAlign: "center", marginBottom: 40, boxShadow: "0 15px 40px rgba(124,58,237,0.3)" }}>
          <div style={{ fontSize: 13, color: "#e9d5ff", textTransform: "uppercase", fontWeight: 800, letterSpacing: 1, marginBottom: 8 }}>
            Predicted PTE Academic Score
          </div>
          <div style={{ fontSize: "72px", fontWeight: 900, color: "#ffffff", lineHeight: 1, marginBottom: 8 }}>
            {overallScore} <span style={{ fontSize: 32, opacity: 0.8 }}>/ 90</span>
          </div>

          <div style={{ fontSize: 15, fontWeight: 800, color: "#facc15", marginBottom: 20 }}>
            Estimated Range: {scoreRangeText} ({confidence})
          </div>

          <div style={{ display: "flex", justifyContent: "center", gap: 32, flexWrap: "wrap", borderTop: "1px solid rgba(255,255,255,0.2)", paddingTop: 20 }}>
            <div>
              <div style={{ fontSize: 12, color: "#e9d5ff" }}>CEFR Level</div>
              <div style={{ fontSize: 18, fontWeight: 800, color: "#ffffff" }}>{cefrEquiv}</div>
            </div>
            <div>
              <div style={{ fontSize: 12, color: "#e9d5ff" }}>IELTS Equivalent</div>
              <div style={{ fontSize: 18, fontWeight: 800, color: "#facc15" }}>Band {ieltsEquiv}</div>
            </div>
          </div>
        </div>

        {/* ── 4 COMMUNICATIVE SKILL SCORES ── */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 18, marginBottom: 40 }}>
          {[
            { title: "🎙️ Speaking", score: speakingPteScore, color: "#10b981" },
            { title: "✍️ Writing", score: writingPteScore, color: "#f59e0b" },
            { title: "📖 Reading", score: readingPteScore, color: "#38bdf8" },
            { title: "🎧 Listening", score: listeningPteScore, color: "#c084fc" },
          ].map((s) => (
            <div key={s.title} style={{ background: "rgba(30,41,59,0.7)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 20, padding: 22, textAlign: "center" }}>
              <div style={{ fontSize: 15, fontWeight: 800, color: "#cbd5e1", marginBottom: 8 }}>{s.title}</div>
              <div style={{ fontSize: 36, fontWeight: 900, color: s.color }}>{s.score}</div>
              <div style={{ fontSize: 12, color: "#94a3b8" }}>out of 90</div>
            </div>
          ))}
        </div>

        {/* ── GROQ AI EVALUATION REPORTS ── */}
        <div style={{ display: "flex", flexDirection: "column", gap: 24, marginBottom: 40 }}>
          {speakingFeedback && (
            <div style={{ background: "rgba(30,41,59,0.7)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 24, padding: 28 }}>
              <h3 style={{ fontSize: 20, fontWeight: 800, color: "#10b981", marginBottom: 14 }}>🎙️ AI Speaking Evaluation Report (Pearson 0–5 Rubric)</h3>
              <p style={{ color: "#cbd5e1", fontSize: 14, lineHeight: 1.6, marginBottom: 14 }}>{speakingFeedback.feedback}</p>
              {speakingFeedback.suggestions?.length > 0 && (
                <div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: "#ffffff", marginBottom: 6 }}>Actionable Improvements:</div>
                  <ul style={{ color: "#94a3b8", fontSize: 13, margin: 0, paddingLeft: 20 }}>
                    {speakingFeedback.suggestions.map((s, idx) => (
                      <li key={idx} style={{ marginBottom: 4 }}>{s}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}

          {writingFeedback && (
            <div style={{ background: "rgba(30,41,59,0.7)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 24, padding: 28 }}>
              <h3 style={{ fontSize: 20, fontWeight: 800, color: "#f59e0b", marginBottom: 14 }}>✍️ AI Writing Evaluation Report (Pearson 0–5 Rubric)</h3>
              {writingFeedback.essay && (
                <div style={{ marginBottom: 16 }}>
                  <div style={{ fontSize: 15, fontWeight: 700, color: "#ffffff", marginBottom: 6 }}>
                    Write Essay:
                  </div>
                  <p style={{ color: "#cbd5e1", fontSize: 14, lineHeight: 1.6, margin: 0 }}>{writingFeedback.essay.feedback}</p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* ── ACTION BUTTONS ── */}
        <div style={{ display: "flex", justifyContent: "center", gap: 14, flexWrap: "wrap", marginBottom: 40 }}>
          <button
            onClick={() => navigate("/pte")}
            style={{ background: "linear-gradient(135deg, #7c3aed, #2563eb)", color: "#ffffff", border: "none", borderRadius: 14, padding: "14px 28px", fontSize: 15, fontWeight: 800, cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 8, boxShadow: "0 6px 20px rgba(124, 58, 237, 0.4)" }}
          >
            <RefreshCw size={18} /> Return to PTE Academic Hub
          </button>
          <button
            onClick={() => navigate("/dashboard")}
            style={{ background: "rgba(255,255,255,0.08)", color: "#ffffff", border: "1px solid rgba(255,255,255,0.2)", borderRadius: 14, padding: "14px 24px", fontSize: 15, fontWeight: 800, cursor: "pointer" }}
          >
            All Exam Analytics
          </button>
        </div>

        {/* ── LEGAL DISCLAIMER ── */}
        <div style={{ fontSize: 12, color: "#64748b", textAlign: "center", borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: 24, lineHeight: 1.6, maxWidth: 800, margin: "0 auto" }}>
          Knarrow practice estimate — not an official Pearson score. Knarrow is an independent learning platform. PTE Academic™ and PTE Academic UKVI™ are registered trademarks of Pearson PLC. This product is not endorsed, certified, or approved by Pearson.
        </div>

      </div>
    </div>
  );
}
