import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Award, Sparkles, CheckCircle2, ArrowRight, RefreshCw, BookOpen,
  Zap, Layers, ShieldCheck, ChevronRight, Calculator, AlertTriangle, Info, BarChart2, TrendingUp, Star
} from "lucide-react";
import { calculateGMATPercentile } from "../utils/gmatScoreCalculator";
import { evaluateGMATExamAI } from "../services/evaluateGMATGPT";
import FloatingDanglerPill from "../components/FloatingDanglerPill";

export default function GMATResultsPage() {
  const { resultId } = useParams();
  const navigate = useNavigate();

  const [result, setResult] = useState(null);
  const [aiReport, setAiReport] = useState(null);
  const [loadingAi, setLoadingAi] = useState(true);

  useEffect(() => {
    const raw = localStorage.getItem(`gmat_result_${resultId}`);
    if (raw) {
      try {
        const parsed = JSON.parse(raw);
        setResult(parsed);

        evaluateGMATExamAI({
          totalScore: parsed.totalScore,
          quantScore: parsed.quantScore,
          verbalScore: parsed.verbalScore,
          diScore: parsed.diScore,
          sectionOrder: parsed.sectionOrder
        }).then((rep) => {
          setAiReport(rep);
          setLoadingAi(false);
        }).catch((err) => {
          console.error("GMAT AI evaluation error:", err);
          setLoadingAi(false);
        });
      } catch (err) {
        console.error("GMAT Result parse error:", err);
      }
    }
  }, [resultId]);

  if (!result) {
    return (
      <div style={{ minHeight: "100vh", background: "#0f172a", color: "#ffffff", padding: "60px 24px", textAlign: "center" }}>
        <h2>No GMAT examination result found.</h2>
        <button
          onClick={() => navigate("/gmat")}
          style={{ background: "#0284c7", color: "#ffffff", border: "none", borderRadius: 12, padding: "12px 24px", marginTop: 16, cursor: "pointer", fontWeight: 800 }}
        >
          Return to GMAT Hub
        </button>
      </div>
    );
  }

  const { totalScore = 205, quantScore = 60, verbalScore = 60, diScore = 60, sectionOrder = ["quant", "verbal", "di"] } = result;
  const percentile = calculateGMATPercentile(totalScore);

  return (
    <div style={{ minHeight: "100vh", background: "#0f172a", color: "#ffffff", fontFamily: "Inter, sans-serif", padding: "60px 24px 80px" }}>
      <div style={{ maxWidth: "1050px", margin: "0 auto" }}>

        {/* ── HEADER BADGE ── */}
        <div style={{ textAlign: "center", marginBottom: 36 }}>
          <span style={{ background: "rgba(56,189,248,0.15)", color: "#38bdf8", border: "1px solid rgba(56,189,248,0.3)", padding: "6px 18px", borderRadius: 999, fontSize: 12, fontWeight: 800 }}>
            <CheckCircle2 size={14} style={{ display: "inline", marginRight: 6 }} /> OFFICIAL GMAT EXAM 2026 SCORE REPORT &amp; DIAGNOSTIC
          </span>
          <h1 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 900, margin: "16px 0 8px 0" }}>
            Your GMAT Examination Results
          </h1>
          <p style={{ color: "#94a3b8", fontSize: 15 }}>Test Date: {new Date(result.date || Date.now()).toLocaleDateString()}</p>
        </div>

        {/* ── PREDICTED TOTAL SCORE BANNER (205-805 SCALE) ── */}
        <div style={{ background: "linear-gradient(135deg, #0284c7 0%, #7c3aed 100%)", borderRadius: 28, padding: 36, marginBottom: 40, textAlign: "center", boxShadow: "0 15px 40px rgba(2,132,199,0.4)", position: "relative", overflow: "hidden" }}>
          
          {/* Decorative Floating Glass Danglers */}
          <FloatingDanglerPill
            icon={TrendingUp}
            value="+15 Pts"
            label="Predicted Growth"
            variant="light"
            iconBg="rgba(56, 189, 248, 0.15)"
            iconColor="#0284c7"
            floatDelay={0}
            style={{ position: "absolute", top: 20, right: 30 }}
          />

          <FloatingDanglerPill
            icon={Star}
            value="98%"
            label="Candidate Pass Rate"
            variant="light"
            iconBg="rgba(192, 132, 252, 0.15)"
            iconColor="#9333ea"
            floatDelay={1.5}
            style={{ position: "absolute", bottom: 20, left: 30 }}
          />

          <div style={{ fontSize: 13, color: "#bae6fd", textTransform: "uppercase", fontWeight: 800, letterSpacing: 1.5, marginBottom: 8 }}>
            🏆 PREDICTED TOTAL GMAT SCORE (205–805 SCALE)
          </div>
          <div style={{ fontSize: "clamp(3.5rem, 6vw, 5.5rem)", fontWeight: 900, color: "#ffffff", lineHeight: 1, marginBottom: 12 }}>
            {totalScore} <span style={{ fontSize: 24, color: "#bae6fd" }}>/ 805</span>
          </div>
          <div style={{ fontSize: 15, fontWeight: 700, color: "#e0f2fe", maxWidth: 650, margin: "0 auto", lineHeight: 1.5 }}>
            Estimated Percentile: <strong>{percentile}th Percentile</strong> · Section Order: {sectionOrder.map((s) => s.toUpperCase()).join(" → ")}
          </div>
          <div style={{ fontSize: 12, color: "#bae6fd", opacity: 0.8, marginTop: 12 }}>
            *Disclaimer: Knarrow practice scores are predicted estimates based on GMAC IRT-aligned scales and are not official GMAC reports.
          </div>
        </div>

        {/* ── 3 SECTION SCORE CARDS (60-90 SCALE) ── */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 20, marginBottom: 40 }}>
          
          {/* QUANTITATIVE REASONING */}
          <div style={{ background: "linear-gradient(135deg, #064e3b 0%, #10b981 100%)", borderRadius: 24, padding: 28, textAlign: "center", boxShadow: "0 10px 30px rgba(16,185,129,0.3)" }}>
            <div style={{ fontSize: 11, color: "#a7f3d0", textTransform: "uppercase", fontWeight: 800, letterSpacing: 1, marginBottom: 6 }}>
              ⚡ QUANTITATIVE REASONING
            </div>
            <div style={{ fontSize: 48, fontWeight: 900, color: "#ffffff", lineHeight: 1, marginBottom: 8 }}>
              {quantScore} <span style={{ fontSize: 18, opacity: 0.8 }}>/ 90</span>
            </div>
            <div style={{ fontSize: 12, color: "#d1fae5" }}>21 Problem Solving Questions (45 mins)</div>
          </div>

          {/* VERBAL REASONING */}
          <div style={{ background: "linear-gradient(135deg, #1e3a8a 0%, #2563eb 100%)", borderRadius: 24, padding: 28, textAlign: "center", boxShadow: "0 10px 30px rgba(37,99,235,0.3)" }}>
            <div style={{ fontSize: 11, color: "#93c5fd", textTransform: "uppercase", fontWeight: 800, letterSpacing: 1, marginBottom: 6 }}>
              📖 VERBAL REASONING
            </div>
            <div style={{ fontSize: 48, fontWeight: 900, color: "#ffffff", lineHeight: 1, marginBottom: 8 }}>
              {verbalScore} <span style={{ fontSize: 18, opacity: 0.8 }}>/ 90</span>
            </div>
            <div style={{ fontSize: 12, color: "#dbeafe" }}>23 Questions (RC &amp; Critical Reasoning)</div>
          </div>

          {/* DATA INSIGHTS */}
          <div style={{ background: "linear-gradient(135deg, #6b21a8 0%, #9333ea 100%)", borderRadius: 24, padding: 28, textAlign: "center", boxShadow: "0 10px 30px rgba(147,51,234,0.3)" }}>
            <div style={{ fontSize: 11, color: "#e9d5ff", textTransform: "uppercase", fontWeight: 800, letterSpacing: 1, marginBottom: 6 }}>
              📊 DATA INSIGHTS
            </div>
            <div style={{ fontSize: 48, fontWeight: 900, color: "#ffffff", lineHeight: 1, marginBottom: 8 }}>
              {diScore} <span style={{ fontSize: 18, opacity: 0.8 }}>/ 90</span>
            </div>
            <div style={{ fontSize: 12, color: "#f3e8ff" }}>20 Questions (DS, Multi-Source, Tables)</div>
          </div>

        </div>

        {/* ── GROQ AI DIAGNOSTIC REPORT ── */}
        <div style={{ background: "linear-gradient(135deg, rgba(2,132,199,0.15) 0%, rgba(124,58,237,0.15) 100%)", border: "1px solid rgba(56,189,248,0.3)", borderRadius: 28, padding: 32, marginBottom: 40 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18 }}>
            <span style={{ background: "rgba(56,189,248,0.25)", color: "#38bdf8", border: "1px solid rgba(56,189,248,0.4)", padding: "4px 14px", borderRadius: 999, fontSize: 11, fontWeight: 900, textTransform: "uppercase" }}>
              <Sparkles size={13} style={{ display: "inline", marginRight: 4 }} /> GROQ AI GMAT DIAGNOSTIC REPORT
            </span>
          </div>

          {loadingAi ? (
            <div style={{ textAlign: "center", padding: 24, color: "#cbd5e1" }}>
              <RefreshCw size={24} style={{ animation: "spin 1s linear infinite" }} />
              <p style={{ marginTop: 12, fontSize: 14, fontWeight: 700 }}>Generating AI CAT Diagnostic via Groq Llama 3.3...</p>
            </div>
          ) : (
            <div>
              <p style={{ color: "#e2e8f0", fontSize: 15, lineHeight: 1.7, marginBottom: 20 }}>
                {aiReport?.diagnosticSummary}
              </p>

              <h4 style={{ fontSize: 16, fontWeight: 900, color: "#ffffff", marginBottom: 12 }}>7-Day Targeted GMAT Action Plan</h4>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {(aiReport?.actionPlan || []).map((item, idx) => (
                  <div key={idx} style={{ background: "rgba(15,23,42,0.6)", borderRadius: 14, padding: 14, border: "1px solid rgba(255,255,255,0.08)", display: "flex", alignItems: "center", gap: 14 }}>
                    <div style={{ width: 32, height: 32, borderRadius: 10, background: "rgba(56,189,248,0.2)", color: "#38bdf8", fontWeight: 900, fontSize: 13, display: "flex", alignItems: "center", justifyContent: "center" }}>
                      D{item.day || idx + 1}
                    </div>
                    <div>
                      <div style={{ fontSize: 14, fontWeight: 800, color: "#ffffff" }}>{item.topic}</div>
                      <div style={{ fontSize: 13, color: "#cbd5e1", marginTop: 2 }}>{item.focus}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* ── ACTION BUTTONS ── */}
        <div style={{ display: "flex", justifyContent: "center", gap: 14, flexWrap: "wrap", marginBottom: 40 }}>
          <button
            onClick={() => navigate("/gmat")}
            style={{ background: "linear-gradient(135deg, #0284c7, #7c3aed)", color: "#ffffff", border: "none", borderRadius: 14, padding: "14px 28px", fontSize: 15, fontWeight: 800, cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 8, boxShadow: "0 6px 20px rgba(2, 132, 199, 0.4)" }}
          >
            <RefreshCw size={18} /> Return to GMAT Hub
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
          Knarrow is an independent learning platform. GMAT® is a registered trademark of the Graduate Management Admission Council (GMAC). This product is not endorsed, certified, or approved by GMAC.
        </div>

      </div>
    </div>
  );
}
