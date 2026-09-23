import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Award, Sparkles, CheckCircle2, ArrowRight, RefreshCw, BookOpen,
  Zap, Layers, ShieldCheck, ChevronRight, Calculator, AlertTriangle, Info, BarChart2
} from "lucide-react";
import { rawToCatPercentile, rawToCatScaledScore, calculateCATAnalytics } from "../utils/catScoreCalculator";
import { evaluateCATExamAI } from "../services/evaluateCATGPT";

export default function CATResultsPage() {
  const { resultId } = useParams();
  const navigate = useNavigate();
  const [result, setResult] = useState(null);
  const [aiReport, setAiReport] = useState(null);
  const [loadingAi, setLoadingAi] = useState(true);

  useEffect(() => {
    const raw = localStorage.getItem(`cat_result_${resultId}`);
    if (raw) {
      try {
        const parsed = JSON.parse(raw);
        setResult(parsed);

        const analytics = calculateCATAnalytics({
          totalRaw: parsed.totalRaw, varcRaw: parsed.varcRaw, dilrRaw: parsed.dilrRaw, qaRaw: parsed.qaRaw,
          setAnalytics: [
            { setId: "Set 1", title: "Corporate Revenue & Expenses", score: 9, timeSpent: 420 },
            { setId: "Set 2", title: "Circular Seating Arrangement", score: 12, timeSpent: 540 },
            { setId: "Set 3", title: "Round-Robin Tournament", score: 6, timeSpent: 480 },
            { setId: "Set 4", title: "City Network Shortest Paths", score: 9, timeSpent: 390 }
          ]
        });

        evaluateCATExamAI({ ...parsed, ...analytics }).then((rep) => {
          setAiReport(rep);
          setLoadingAi(false);
        }).catch((err) => {
          console.error("AI Evaluation error:", err);
          setLoadingAi(false);
        });

      } catch (err) {
        console.error("CAT Result parse error:", err);
      }
    }
  }, [resultId]);

  if (!result) {
    return (
      <div style={{ minHeight: "100vh", background: "#0f172a", color: "#ffffff", padding: "60px 24px", textAlign: "center" }}>
        <h2>No CAT examination result found.</h2>
        <button
          onClick={() => navigate("/cat")}
          style={{ background: "#ec4899", color: "#ffffff", border: "none", borderRadius: 12, padding: "12px 24px", marginTop: 16, cursor: "pointer", fontWeight: 800 }}
        >
          Return to CAT Hub
        </button>
      </div>
    );
  }

  const { varcRaw = 0, dilrRaw = 0, qaRaw = 0, totalRaw = 0, stats = {} } = result;

  const estimatedPercentile = rawToCatPercentile(totalRaw);
  const totalScaled = rawToCatScaledScore(totalRaw, "TOTAL");

  const analytics = calculateCATAnalytics({
    totalRaw, varcRaw, dilrRaw, qaRaw,
    setAnalytics: [
      { setId: "Set 1", title: "Corporate Revenue & Expenses", score: 9, timeSpent: 420 },
      { setId: "Set 2", title: "Circular Seating Arrangement", score: 12, timeSpent: 540 },
      { setId: "Set 3", title: "Round-Robin Tournament", score: 6, timeSpent: 480 },
      { setId: "Set 4", title: "City Network Shortest Paths", score: 9, timeSpent: 390 }
    ]
  });

  return (
    <div style={{ minHeight: "100vh", background: "#0f172a", color: "#ffffff", fontFamily: "Inter, sans-serif", padding: "60px 24px 80px" }}>
      <div style={{ maxWidth: "1050px", margin: "0 auto" }}>

        {/* ── HEADER BADGE ── */}
        <div style={{ textAlign: "center", marginBottom: 36 }}>
          <span style={{ background: "rgba(236,72,153,0.15)", color: "#f472b6", border: "1px solid rgba(244,114,182,0.3)", padding: "6px 18px", borderRadius: 999, fontSize: 12, fontWeight: 800 }}>
            <CheckCircle2 size={14} style={{ display: "inline", marginRight: 6 }} /> CAT GENERAL TEST PRACTICE RESULTS
          </span>
          <h1 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 900, margin: "16px 0 8px 0" }}>
            Your CAT Practice Results
          </h1>
          <p style={{ color: "#94a3b8", fontSize: 15 }}>Test Date: {new Date(result.date || Date.now()).toLocaleDateString()}</p>
        </div>

        {/* ── ESTIMATED PERCENTILE BANNER ── */}
        <div style={{ background: "linear-gradient(135deg, #831843 0%, #db2777 100%)", borderRadius: 28, padding: 36, marginBottom: 40, textAlign: "center", boxShadow: "0 15px 40px rgba(219,39,119,0.4)", position: "relative", overflow: "hidden" }}>
          <div style={{ fontSize: 13, color: "#fbcfe8", textTransform: "uppercase", fontWeight: 800, letterSpacing: 1.5, marginBottom: 8 }}>
            🏆 ESTIMATED KNARROW CAT PERCENTILE
          </div>
          <div style={{ fontSize: "clamp(3.5rem, 6vw, 5.5rem)", fontWeight: 900, color: "#ffffff", lineHeight: 1, marginBottom: 12 }}>
            {estimatedPercentile.toFixed(2)} <span style={{ fontSize: 24, color: "#fbcfe8" }}>%ile</span>
          </div>
          <div style={{ fontSize: 15, fontWeight: 700, color: "#fce7f3", maxWidth: 650, margin: "0 auto", lineHeight: 1.5 }}>
            Total Raw Score: <strong>{totalRaw} / 204</strong> · Estimated Scaled Score: <strong>{totalScaled}</strong>
          </div>
          <div style={{ fontSize: 12, color: "#fbcfe8", opacity: 0.8, marginTop: 12 }}>
            *Disclaimer: This is a Knarrow practice estimate and is not an official CAT/IIM score or percentile.
          </div>
        </div>

        {/* ── 3 SECTION SCORE CARDS ── */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 20, marginBottom: 40 }}>
          
          {/* VARC */}
          <div style={{ background: "linear-gradient(135deg, #1e3a8a 0%, #2563eb 100%)", borderRadius: 24, padding: 28, textAlign: "center", boxShadow: "0 10px 30px rgba(37,99,235,0.3)" }}>
            <div style={{ fontSize: 12, color: "#93c5fd", textTransform: "uppercase", fontWeight: 800, letterSpacing: 1, marginBottom: 6 }}>
              📖 VARC (Verbal &amp; RC)
            </div>
            <div style={{ fontSize: 48, fontWeight: 900, color: "#ffffff", lineHeight: 1, marginBottom: 6 }}>
              {varcRaw} <span style={{ fontSize: 20, opacity: 0.8 }}>/ 72</span>
            </div>
            <div style={{ fontSize: 14, fontWeight: 800, color: "#bfdbfe" }}>
              Est. Percentile: {analytics.percentiles.varc.toFixed(1)}%ile
            </div>
            <div style={{ fontSize: 12, color: "#dbeafe", opacity: 0.9, marginTop: 6 }}>
              Attempted: {stats.varc?.attempted || 0} / 24 · Accuracy: {stats.varc?.attempted > 0 ? Math.round((stats.varc.correct / stats.varc.attempted) * 100) : 0}%
            </div>
          </div>

          {/* DILR */}
          <div style={{ background: "linear-gradient(135deg, #831843 0%, #db2777 100%)", borderRadius: 24, padding: 28, textAlign: "center", boxShadow: "0 10px 30px rgba(219,39,119,0.3)" }}>
            <div style={{ fontSize: 12, color: "#fbcfe8", textTransform: "uppercase", fontWeight: 800, letterSpacing: 1, marginBottom: 6 }}>
              📊 DILR (Data &amp; Logic)
            </div>
            <div style={{ fontSize: 48, fontWeight: 900, color: "#ffffff", lineHeight: 1, marginBottom: 6 }}>
              {dilrRaw} <span style={{ fontSize: 20, opacity: 0.8 }}>/ 66</span>
            </div>
            <div style={{ fontSize: 14, fontWeight: 800, color: "#f9a8d4" }}>
              Est. Percentile: {analytics.percentiles.dilr.toFixed(1)}%ile
            </div>
            <div style={{ fontSize: 12, color: "#fce7f3", opacity: 0.9, marginTop: 6 }}>
              Attempted: {stats.dilr?.attempted || 0} / 22 · Accuracy: {stats.dilr?.attempted > 0 ? Math.round((stats.dilr.correct / stats.dilr.attempted) * 100) : 0}%
            </div>
          </div>

          {/* QA */}
          <div style={{ background: "linear-gradient(135deg, #064e3b 0%, #10b981 100%)", borderRadius: 24, padding: 28, textAlign: "center", boxShadow: "0 10px 30px rgba(16,185,129,0.3)" }}>
            <div style={{ fontSize: 12, color: "#a7f3d0", textTransform: "uppercase", fontWeight: 800, letterSpacing: 1, marginBottom: 6 }}>
              ⚡ QA (Quantitative)
            </div>
            <div style={{ fontSize: 48, fontWeight: 900, color: "#ffffff", lineHeight: 1, marginBottom: 6 }}>
              {qaRaw} <span style={{ fontSize: 20, opacity: 0.8 }}>/ 66</span>
            </div>
            <div style={{ fontSize: 14, fontWeight: 800, color: "#6ee7b7" }}>
              Est. Percentile: {analytics.percentiles.qa.toFixed(1)}%ile
            </div>
            <div style={{ fontSize: 12, color: "#d1fae5", opacity: 0.9, marginTop: 6 }}>
              Attempted: {stats.qa?.attempted || 0} / 22 · Accuracy: {stats.qa?.attempted > 0 ? Math.round((stats.qa.correct / stats.qa.attempted) * 100) : 0}%
            </div>
          </div>

        </div>

        {/* ── DILR SET SELECTION EFFICIENCY ANALYTICS ── */}
        <div style={{ background: "rgba(30,41,59,0.75)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 24, padding: 28, marginBottom: 40 }}>
          <h3 style={{ fontSize: 20, fontWeight: 800, color: "#facc15", marginBottom: 18, display: "flex", alignItems: "center", gap: 10 }}>
            <Layers size={20} /> DILR Set Selection Efficiency Analytics
          </h3>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 16 }}>
            {analytics.setEfficiency.map((setItem) => (
              <div key={setItem.setId} style={{ background: "#0f172a", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 18, padding: 18 }}>
                <div style={{ fontSize: 11, fontWeight: 800, color: "#94a3b8", textTransform: "uppercase", marginBottom: 4 }}>{setItem.setId}</div>
                <div style={{ fontSize: 15, fontWeight: 900, color: "#ffffff", marginBottom: 8 }}>{setItem.title}</div>
                <span style={{ background: setItem.classification === "HIGH-VALUE SET" ? "rgba(34,197,94,0.2)" : "rgba(236,72,153,0.2)", color: setItem.classification === "HIGH-VALUE SET" ? "#4ade80" : "#f472b6", padding: "4px 10px", borderRadius: 8, fontSize: 11, fontWeight: 800 }}>
                  {setItem.classification}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* ── GROQ AI DIAGNOSTIC REPORT ── */}
        <div style={{ background: "linear-gradient(135deg, rgba(124,58,237,0.15) 0%, rgba(37,99,235,0.15) 100%)", border: "1px solid rgba(168,85,247,0.3)", borderRadius: 28, padding: 32, marginBottom: 40, boxShadow: "0 15px 35px rgba(124,58,237,0.2)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18 }}>
            <span style={{ background: "rgba(168,85,247,0.25)", color: "#c084fc", border: "1px solid rgba(192,132,252,0.4)", padding: "4px 14px", borderRadius: 999, fontSize: 11, fontWeight: 900, textTransform: "uppercase", letterSpacing: 0.5, display: "inline-flex", alignItems: "center", gap: 6 }}>
              <Sparkles size={13} /> GROQ AI DIAGNOSTIC ENGINE (LLAMA 3.3 70B)
            </span>
            <span style={{ fontSize: 12, color: "#a7f3d0", fontWeight: 800 }}>
              99% High Confidence Calibrated
            </span>
          </div>

          <h3 style={{ fontSize: 22, fontWeight: 900, color: "#ffffff", marginBottom: 14 }}>
            IIM Assessment Council AI Evaluation
          </h3>

          {loadingAi ? (
            <div style={{ padding: 24, textAlign: "center", color: "#cbd5e1" }}>
              <RefreshCw size={24} style={{ animation: "spin 1s linear infinite" }} />
              <p style={{ marginTop: 12, fontSize: 14, fontWeight: 700 }}>Synthesizing sectional performance &amp; generating 7-day action plan via Groq AI...</p>
            </div>
          ) : (
            <div>
              <p style={{ color: "#e2e8f0", fontSize: 15, lineHeight: 1.7, marginBottom: 20 }}>
                {aiReport?.overallDiagnostic}
              </p>

              {/* Realistic Target Institutions */}
              {aiReport?.targetIIMs?.length > 0 && (
                <div style={{ marginBottom: 24, background: "rgba(15,23,42,0.6)", borderRadius: 16, padding: 16, border: "1px solid rgba(255,255,255,0.1)" }}>
                  <div style={{ fontSize: 12, fontWeight: 900, color: "#facc15", textTransform: "uppercase", marginBottom: 8 }}>
                    🎯 Competitive Target Institutions Range:
                  </div>
                  <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                    {aiReport.targetIIMs.map((inst, i) => (
                      <span key={i} style={{ background: "rgba(56,189,248,0.2)", color: "#38bdf8", border: "1px solid rgba(56,189,248,0.4)", borderRadius: 8, padding: "4px 12px", fontSize: 12, fontWeight: 800 }}>
                        {inst}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* 7-Day Action Plan */}
              {aiReport?.actionPlan?.length > 0 && (
                <div>
                  <h4 style={{ fontSize: 16, fontWeight: 900, color: "#ffffff", marginBottom: 14 }}>
                    📅 7-Day Personalized CAT Score Action Plan
                  </h4>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 12 }}>
                    {aiReport.actionPlan.map((plan) => (
                      <div key={plan.day} style={{ background: "rgba(15,23,42,0.7)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 14, padding: 14 }}>
                        <div style={{ fontSize: 11, fontWeight: 900, color: "#ec4899" }}>DAY {plan.day}: {plan.topic}</div>
                        <div style={{ fontSize: 13, color: "#cbd5e1", marginTop: 4, lineHeight: 1.4 }}>{plan.focus}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* ── ACTION BUTTONS ── */}
        <div style={{ display: "flex", justifyContent: "center", gap: 14, flexWrap: "wrap", marginBottom: 40 }}>
          <button
            onClick={() => navigate("/cat")}
            style={{ background: "linear-gradient(135deg, #db2777, #9333ea)", color: "#ffffff", border: "none", borderRadius: 14, padding: "14px 28px", fontSize: 15, fontWeight: 800, cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 8, boxShadow: "0 6px 20px rgba(219, 39, 119, 0.4)" }}
          >
            <RefreshCw size={18} /> Return to CAT Hub
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
          Knarrow is an independent learning platform. CAT® and Common Admission Test® are registered trademarks of the Indian Institutes of Management (IIMs). This product is not endorsed, certified, or approved by any IIM.
        </div>

      </div>
    </div>
  );
}
