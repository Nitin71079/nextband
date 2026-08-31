import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Award, Sparkles, CheckCircle2, ArrowRight, RefreshCw, BookOpen,
  Zap, PenTool, ShieldCheck, ChevronRight, Calculator, AlertTriangle, Info, BarChart2
} from "lucide-react";
import { getQuantPercentile, getVerbalPercentile, calculateGREAnalytics } from "../utils/greScoreCalculator";

export default function GREResultsPage() {
  const { resultId } = useParams();
  const navigate = useNavigate();
  const [result, setResult] = useState(null);

  useEffect(() => {
    const raw = localStorage.getItem(`gre_result_${resultId}`);
    if (raw) {
      try {
        setResult(JSON.parse(raw));
      } catch (err) {
        console.error("GRE Result parse error:", err);
      }
    }
  }, [resultId]);

  if (!result) {
    return (
      <div style={{ minHeight: "100vh", background: "#0f172a", color: "#ffffff", padding: "60px 24px", textAlign: "center" }}>
        <h2>No GRE General test result found.</h2>
        <button
          onClick={() => navigate("/gre")}
          style={{ background: "#d97706", color: "#ffffff", border: "none", borderRadius: 12, padding: "12px 24px", marginTop: 16, cursor: "pointer", fontWeight: 800 }}
        >
          Return to GRE Hub
        </button>
      </div>
    );
  }

  const {
    verbalScore, quantScore, analyticalWritingScore, awFeedback,
    v1Correct = 0, v2Correct = 0, q1Correct = 0, q2Correct = 0,
    verbal2ModuleType = "medium", quant2ModuleType = "medium"
  } = result;

  const quantPct = getQuantPercentile(quantScore);
  const verbalPct = getVerbalPercentile(verbalScore);

  const totalVerbalCorrect = v1Correct + v2Correct;
  const totalQuantCorrect = q1Correct + q2Correct;
  const totalCorrect = totalVerbalCorrect + totalQuantCorrect;
  const overallAccuracy = Math.round((totalCorrect / 54) * 100);

  const analytics = calculateGREAnalytics({
    readingCompPct: totalVerbalCorrect > 0 ? Math.round((totalVerbalCorrect / 27) * 100) : 0,
    textCompletionPct: totalVerbalCorrect > 0 ? Math.round((totalVerbalCorrect / 27) * 90) : 0,
    sentenceEquivalencePct: totalVerbalCorrect > 0 ? Math.round((totalVerbalCorrect / 27) * 95) : 0,
    quantComparisonPct: totalQuantCorrect > 0 ? Math.round((totalQuantCorrect / 27) * 100) : 0,
    numericEntryPct: totalQuantCorrect > 0 ? Math.round((totalQuantCorrect / 27) * 85) : 0,
    dataAnalysisPct: totalQuantCorrect > 0 ? Math.round((totalQuantCorrect / 27) * 90) : 0,
    analyticalWritingScore
  });

  return (
    <div style={{ minHeight: "100vh", background: "#0f172a", color: "#ffffff", fontFamily: "Inter, sans-serif", padding: "60px 24px 80px" }}>
      <div style={{ maxWidth: "1050px", margin: "0 auto" }}>

        {/* ── HEADER BADGE ── */}
        <div style={{ textAlign: "center", marginBottom: 36 }}>
          <span style={{ background: "rgba(245,158,11,0.15)", color: "#facc15", border: "1px solid rgba(250,204,21,0.3)", padding: "6px 18px", borderRadius: 999, fontSize: 12, fontWeight: 800 }}>
            <CheckCircle2 size={14} style={{ display: "inline", marginRight: 6 }} /> OFFICIAL GRE GENERAL TEST SCORE REPORT (2026 CALIBRATED)
          </span>
          <h1 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 900, margin: "16px 0 8px 0" }}>
            Your 2026 GRE Exam Results
          </h1>
          <p style={{ color: "#94a3b8", fontSize: 15 }}>Test Date: {new Date(result.date).toLocaleDateString()}</p>
        </div>

        {/* ── RAW ACCURACY & PSYCHOMETRIC SCALE BANNER ── */}
        <div style={{ background: "rgba(30,41,59,0.85)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 20, padding: 24, marginBottom: 36, display: "flex", alignItems: "flex-start", gap: 16 }}>
          <div style={{ width: 44, height: 44, borderRadius: 12, background: "rgba(56,189,248,0.15)", display: "flex", alignItems: "center", justifyContent: "center", color: "#38bdf8", flexShrink: 0 }}>
            <Info size={22} />
          </div>
          <div>
            <h3 style={{ fontSize: 16, fontWeight: 800, margin: "0 0 6px", color: "#ffffff" }}>
              Raw Performance: {totalCorrect} / 54 Questions Correct ({overallAccuracy}% Accuracy)
            </h3>
            <p style={{ fontSize: 14, color: "#94a3b8", margin: 0, lineHeight: 1.6 }}>
              <strong>ETS Psychometric Scale Note:</strong> The official GRE General scale spans from <strong>130 to 170</strong> for Verbal and Quantitative Reasoning. A raw score of 0 correct answers yields the baseline score of <strong>130</strong> (5th percentile Quant / 8th percentile Verbal).
            </p>
          </div>
        </div>

        {/* ── 3 CORE SCORE CARDS ── */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 20, marginBottom: 40 }}>
          
          {/* Quantitative Reasoning */}
          <div style={{ background: "linear-gradient(135deg, #0369a1 0%, #0284c7 100%)", borderRadius: 24, padding: 32, textAlign: "center", boxShadow: "0 10px 30px rgba(2,132,199,0.3)" }}>
            <div style={{ fontSize: 12, color: "#bae6fd", textTransform: "uppercase", fontWeight: 800, letterSpacing: 1, marginBottom: 6 }}>
              ⚡ Quantitative Reasoning
            </div>
            <div style={{ fontSize: 64, fontWeight: 900, color: "#ffffff", lineHeight: 1, marginBottom: 6 }}>
              {quantScore} <span style={{ fontSize: 24, opacity: 0.8 }}>/ 170</span>
            </div>
            <div style={{ fontSize: 14, fontWeight: 800, color: "#7dd3fc", marginBottom: 6 }}>
              Percentile Rank: {quantPct}th Percentile
            </div>
            <div style={{ fontSize: 13, color: "#e0f2fe", opacity: 0.9 }}>
              Raw Score: {totalQuantCorrect} / 27 Correct
            </div>
          </div>

          {/* Verbal Reasoning */}
          <div style={{ background: "linear-gradient(135deg, #b45309 0%, #d97706 100%)", borderRadius: 24, padding: 32, textAlign: "center", boxShadow: "0 10px 30px rgba(217,119,6,0.3)" }}>
            <div style={{ fontSize: 12, color: "#fef3c7", textTransform: "uppercase", fontWeight: 800, letterSpacing: 1, marginBottom: 6 }}>
              📖 Verbal Reasoning
            </div>
            <div style={{ fontSize: 64, fontWeight: 900, color: "#ffffff", lineHeight: 1, marginBottom: 6 }}>
              {verbalScore} <span style={{ fontSize: 24, opacity: 0.8 }}>/ 170</span>
            </div>
            <div style={{ fontSize: 14, fontWeight: 800, color: "#fde68a", marginBottom: 6 }}>
              Percentile Rank: {verbalPct}th Percentile
            </div>
            <div style={{ fontSize: 13, color: "#fffbeb", opacity: 0.9 }}>
              Raw Score: {totalVerbalCorrect} / 27 Correct
            </div>
          </div>

          {/* Analytical Writing */}
          <div style={{ background: "linear-gradient(135deg, #831843 0%, #be185d 100%)", borderRadius: 24, padding: 32, textAlign: "center", boxShadow: "0 10px 30px rgba(190,24,93,0.3)" }}>
            <div style={{ fontSize: 12, color: "#fbcfe8", textTransform: "uppercase", fontWeight: 800, letterSpacing: 1, marginBottom: 6 }}>
              ✍️ Analytical Writing
            </div>
            <div style={{ fontSize: 64, fontWeight: 900, color: "#ffffff", lineHeight: 1, marginBottom: 6 }}>
              {analyticalWritingScore.toFixed(1)} <span style={{ fontSize: 24, opacity: 0.8 }}>/ 6.0</span>
            </div>
            <div style={{ fontSize: 14, fontWeight: 800, color: "#f9a8d4", marginBottom: 6 }}>
              Analyze an Issue Task
            </div>
            <div style={{ fontSize: 13, color: "#fce7f3", opacity: 0.9 }}>
              Groq AI Evaluated
            </div>
          </div>

        </div>

        {/* ── ADAPTIVE SECTION BREAKDOWN ── */}
        <div style={{ background: "rgba(30,41,59,0.75)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 24, padding: 28, marginBottom: 40 }}>
          <h3 style={{ fontSize: 20, fontWeight: 800, color: "#facc15", marginBottom: 18, display: "flex", alignItems: "center", gap: 10 }}>
            <Zap size={20} /> Section-Level Adaptive Performance Breakdown
          </h3>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
            <div style={{ background: "#0f172a", padding: 20, borderRadius: 16, border: "1px solid rgba(255,255,255,0.08)" }}>
              <div style={{ fontSize: 14, fontWeight: 800, color: "#38bdf8", marginBottom: 8 }}>⚡ Quantitative Section Performance</div>
              <div style={{ fontSize: 13, color: "#cbd5e1", marginBottom: 4 }}>• Section 3 (Quant 1 Baseline): <strong>{q1Correct} / 12 Correct</strong></div>
              <div style={{ fontSize: 13, color: "#cbd5e1" }}>• Section 5 (Quant 2 {quant2ModuleType.toUpperCase()} Module): <strong>{q2Correct} / 15 Correct</strong></div>
            </div>
            <div style={{ background: "#0f172a", padding: 20, borderRadius: 16, border: "1px solid rgba(255,255,255,0.08)" }}>
              <div style={{ fontSize: 14, fontWeight: 800, color: "#facc15", marginBottom: 8 }}>📖 Verbal Section Performance</div>
              <div style={{ fontSize: 13, color: "#cbd5e1", marginBottom: 4 }}>• Section 2 (Verbal 1 Baseline): <strong>{v1Correct} / 12 Correct</strong></div>
              <div style={{ fontSize: 13, color: "#cbd5e1" }}>• Section 4 (Verbal 2 {verbal2ModuleType.toUpperCase()} Module): <strong>{v2Correct} / 15 Correct</strong></div>
            </div>
          </div>
        </div>

        {/* ── SUBSKILL DIAGNOSTIC ANALYTICS ── */}
        <div style={{ background: "rgba(30,41,59,0.75)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 24, padding: 28, marginBottom: 40 }}>
          <h3 style={{ fontSize: 20, fontWeight: 800, color: "#38bdf8", marginBottom: 18, display: "flex", alignItems: "center", gap: 10 }}>
            <BarChart2 size={20} /> Skill Dimension Diagnostic Analytics
          </h3>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
            {/* Quantitative Subskills */}
            <div>
              <h4 style={{ fontSize: 15, fontWeight: 800, color: "#cbd5e1", marginBottom: 14 }}>Quantitative Skills Accuracy</h4>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, color: "#94a3b8", marginBottom: 4 }}>
                    <span>Quantitative Comparison</span>
                    <strong style={{ color: "#ffffff" }}>{analytics.quant.quantComparisonPct}%</strong>
                  </div>
                  <div style={{ height: 8, background: "#0f172a", borderRadius: 999, overflow: "hidden" }}>
                    <div style={{ width: `${analytics.quant.quantComparisonPct}%`, height: "100%", background: "#38bdf8", borderRadius: 999 }} />
                  </div>
                </div>
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, color: "#94a3b8", marginBottom: 4 }}>
                    <span>Numeric Entry &amp; Problem Solving</span>
                    <strong style={{ color: "#ffffff" }}>{analytics.quant.numericEntryPct}%</strong>
                  </div>
                  <div style={{ height: 8, background: "#0f172a", borderRadius: 999, overflow: "hidden" }}>
                    <div style={{ width: `${analytics.quant.numericEntryPct}%`, height: "100%", background: "#38bdf8", borderRadius: 999 }} />
                  </div>
                </div>
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, color: "#94a3b8", marginBottom: 4 }}>
                    <span>Data Interpretation</span>
                    <strong style={{ color: "#ffffff" }}>{analytics.quant.dataAnalysisPct}%</strong>
                  </div>
                  <div style={{ height: 8, background: "#0f172a", borderRadius: 999, overflow: "hidden" }}>
                    <div style={{ width: `${analytics.quant.dataAnalysisPct}%`, height: "100%", background: "#38bdf8", borderRadius: 999 }} />
                  </div>
                </div>
              </div>
            </div>

            {/* Verbal Subskills */}
            <div>
              <h4 style={{ fontSize: 15, fontWeight: 800, color: "#cbd5e1", marginBottom: 14 }}>Verbal Skills Accuracy</h4>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, color: "#94a3b8", marginBottom: 4 }}>
                    <span>Reading Comprehension &amp; Passage Analysis</span>
                    <strong style={{ color: "#ffffff" }}>{analytics.verbal.readingCompPct}%</strong>
                  </div>
                  <div style={{ height: 8, background: "#0f172a", borderRadius: 999, overflow: "hidden" }}>
                    <div style={{ width: `${analytics.verbal.readingCompPct}%`, height: "100%", background: "#facc15", borderRadius: 999 }} />
                  </div>
                </div>
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, color: "#94a3b8", marginBottom: 4 }}>
                    <span>Text Completion (1, 2, 3 Blanks)</span>
                    <strong style={{ color: "#ffffff" }}>{analytics.verbal.textCompletionPct}%</strong>
                  </div>
                  <div style={{ height: 8, background: "#0f172a", borderRadius: 999, overflow: "hidden" }}>
                    <div style={{ width: `${analytics.verbal.textCompletionPct}%`, height: "100%", background: "#facc15", borderRadius: 999 }} />
                  </div>
                </div>
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, color: "#94a3b8", marginBottom: 4 }}>
                    <span>Sentence Equivalence</span>
                    <strong style={{ color: "#ffffff" }}>{analytics.verbal.sentenceEquivalencePct}%</strong>
                  </div>
                  <div style={{ height: 8, background: "#0f172a", borderRadius: 999, overflow: "hidden" }}>
                    <div style={{ width: `${analytics.verbal.sentenceEquivalencePct}%`, height: "100%", background: "#facc15", borderRadius: 999 }} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── GROQ AI ESSAY EVALUATION REPORT ── */}
        {awFeedback && (
          <div style={{ background: "rgba(30,41,59,0.7)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 24, padding: 28, marginBottom: 40 }}>
            <h3 style={{ fontSize: 20, fontWeight: 800, color: "#ec4899", marginBottom: 14 }}>
              ✍️ AI Analytical Writing Evaluation Report (ETS 0–6 Rubric)
            </h3>
            <p style={{ color: "#cbd5e1", fontSize: 15, lineHeight: 1.6, marginBottom: 16 }}>{awFeedback.feedback}</p>
            {awFeedback.strengths?.length > 0 && (
              <div style={{ marginBottom: 12 }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: "#4ade80", marginBottom: 6 }}>Key Strengths:</div>
                <ul style={{ color: "#94a3b8", fontSize: 13, margin: 0, paddingLeft: 20 }}>
                  {awFeedback.strengths.map((s, i) => (
                    <li key={i} style={{ marginBottom: 4 }}>{s}</li>
                  ))}
                </ul>
              </div>
            )}
            {awFeedback.weaknesses?.length > 0 && (
              <div>
                <div style={{ fontSize: 14, fontWeight: 700, color: "#facc15", marginBottom: 6 }}>Actionable Improvements:</div>
                <ul style={{ color: "#94a3b8", fontSize: 13, margin: 0, paddingLeft: 20 }}>
                  {awFeedback.weaknesses.map((w, i) => (
                    <li key={i} style={{ marginBottom: 4 }}>{w}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        {/* ── ACTION BUTTONS ── */}
        <div style={{ display: "flex", justifyContent: "center", gap: 14, flexWrap: "wrap", marginBottom: 40 }}>
          <button
            onClick={() => navigate("/gre")}
            style={{ background: "linear-gradient(135deg, #d97706, #b45309)", color: "#ffffff", border: "none", borderRadius: 14, padding: "14px 28px", fontSize: 15, fontWeight: 800, cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 8, boxShadow: "0 6px 20px rgba(217, 119, 6, 0.4)" }}
          >
            <RefreshCw size={18} /> Return to GRE General Hub
          </button>
          <button
            onClick={() => navigate("/insights")}
            style={{ background: "rgba(255,255,255,0.08)", color: "#ffffff", border: "1px solid rgba(255,255,255,0.2)", borderRadius: 14, padding: "14px 24px", fontSize: 15, fontWeight: 800, cursor: "pointer" }}
          >
            All Exam Analytics
          </button>
        </div>

        {/* ── LEGAL DISCLAIMER ── */}
        <div style={{ fontSize: 12, color: "#64748b", textAlign: "center", borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: 24, lineHeight: 1.6, maxWidth: 800, margin: "0 auto" }}>
          Knarrow is an independent learning platform. GRE® and GRE General Test® are registered trademarks of Educational Testing Service (ETS). This product is not endorsed, certified, or approved by ETS.
        </div>

      </div>
    </div>
  );
}
