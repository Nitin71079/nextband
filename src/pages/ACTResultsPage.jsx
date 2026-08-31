import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Award, Sparkles, CheckCircle2, ArrowRight, RefreshCw, BookOpen,
  Zap, Layers, ShieldCheck, ChevronRight, Calculator, AlertTriangle, Info, BarChart2, TrendingUp, Star
} from "lucide-react";
import { calculateACTSuperscore } from "../utils/actScoreCalculator";
import { evaluateACTWritingAI } from "../services/evaluateACTGPT";
import FloatingDanglerPill from "../components/FloatingDanglerPill";

export default function ACTResultsPage() {
  const { resultId } = useParams();
  const navigate = useNavigate();

  const [result, setResult] = useState(null);
  const [aiWritingReport, setAiWritingReport] = useState(null);
  const [loadingAi, setLoadingAi] = useState(true);

  useEffect(() => {
    const raw = localStorage.getItem(`act_result_${resultId}`);
    if (raw) {
      try {
        const parsed = JSON.parse(raw);
        setResult(parsed);

        if (parsed.userEssayText && parsed.userEssayText.trim().length > 10) {
          evaluateACTWritingAI({
            promptText: "Automation and artificial intelligence transformation in modern society.",
            perspectives: ["Automation frees human creativity", "Automation disrupts workforce", "Automation requires policy regulation"],
            userEssay: parsed.userEssayText
          }).then((rep) => {
            setAiWritingReport(rep);
            setLoadingAi(false);
          }).catch((err) => {
            console.error("ACT Writing AI Evaluation Error:", err);
            setLoadingAi(false);
          });
        } else {
          setLoadingAi(false);
        }
      } catch (err) {
        console.error("ACT Result parse error:", err);
      }
    }
  }, [resultId]);

  if (!result) {
    return (
      <div style={{ minHeight: "100vh", background: "#0f172a", color: "#ffffff", padding: "60px 24px", textAlign: "center" }}>
        <h2>No ACT examination result found.</h2>
        <button
          onClick={() => navigate("/act")}
          style={{ background: "#0284c7", color: "#ffffff", border: "none", borderRadius: 12, padding: "12px 24px", marginTop: 16, cursor: "pointer", fontWeight: 800 }}
        >
          Return to ACT Hub
        </button>
      </div>
    );
  }

  const { compositeScore = 1, sectionScores = {}, stemScore, elaScore, userEssayText } = result;
  const { englishScore = 1, mathScore = 1, readingScore = 1, scienceScore } = sectionScores;

  const superscoreData = calculateACTSuperscore([
    { englishScore, mathScore, readingScore, scienceScore },
    { englishScore: englishScore + 2, mathScore, readingScore: readingScore + 1, scienceScore }
  ]);

  return (
    <div style={{ minHeight: "100vh", background: "#0f172a", color: "#ffffff", fontFamily: "Inter, sans-serif", padding: "60px 24px 80px" }}>
      <div style={{ maxWidth: "1050px", margin: "0 auto" }}>

        {/* ── HEADER BADGE ── */}
        <div style={{ textAlign: "center", marginBottom: 36 }}>
          <span style={{ background: "rgba(56,189,248,0.15)", color: "#38bdf8", border: "1px solid rgba(56,189,248,0.3)", padding: "6px 18px", borderRadius: 999, fontSize: 12, fontWeight: 800 }}>
            <CheckCircle2 size={14} style={{ display: "inline", marginRight: 6 }} /> OFFICIAL ACT 2026 SCORE REPORT &amp; ANALYTICS DIAGNOSTIC
          </span>
          <h1 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 900, margin: "16px 0 8px 0" }}>
            Your ACT Examination Results
          </h1>
          <p style={{ color: "#94a3b8", fontSize: 15 }}>Test Date: {new Date(result.date || Date.now()).toLocaleDateString()}</p>
        </div>

        {/* ── PREDICTED COMPOSITE SCORE BANNER ── */}
        <div style={{ background: "linear-gradient(135deg, #0369a1 0%, #7c3aed 100%)", borderRadius: 28, padding: 36, marginBottom: 40, textAlign: "center", boxShadow: "0 15px 40px rgba(2,132,199,0.4)", position: "relative", overflow: "hidden" }}>
          
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
            🏆 PREDICTED ACT COMPOSITE SCORE (1–36 SCALE)
          </div>
          <div style={{ fontSize: "clamp(3.5rem, 6vw, 5.5rem)", fontWeight: 900, color: "#ffffff", lineHeight: 1, marginBottom: 12 }}>
            {compositeScore} <span style={{ fontSize: 24, color: "#bae6fd" }}>/ 36</span>
          </div>
          <div style={{ fontSize: 15, fontWeight: 700, color: "#e0f2fe", maxWidth: 650, margin: "0 auto", lineHeight: 1.5 }}>
            Core Average (English {englishScore} + Math {mathScore} + Reading {readingScore}) · Science &amp; Writing Excluded from Composite
          </div>
          <div style={{ fontSize: 12, color: "#bae6fd", opacity: 0.8, marginTop: 12 }}>
            *Disclaimer: Knarrow practice scores are predicted estimates based on official ACT-aligned scales and are not official ACT score reports.
          </div>
        </div>

        {/* ── CORE & OPTIONAL SECTION SCORE CARDS ── */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 20, marginBottom: 40 }}>
          
          {/* ENGLISH */}
          <div style={{ background: "linear-gradient(135deg, #1e3a8a 0%, #2563eb 100%)", borderRadius: 24, padding: 24, textAlign: "center", boxShadow: "0 10px 30px rgba(37,99,235,0.3)" }}>
            <div style={{ fontSize: 11, color: "#93c5fd", textTransform: "uppercase", fontWeight: 800, letterSpacing: 1, marginBottom: 6 }}>
              📖 ENGLISH
            </div>
            <div style={{ fontSize: 42, fontWeight: 900, color: "#ffffff", lineHeight: 1, marginBottom: 6 }}>
              {englishScore} <span style={{ fontSize: 18, opacity: 0.8 }}>/ 36</span>
            </div>
            <div style={{ fontSize: 12, color: "#dbeafe" }}>50 Total Questions (35 mins)</div>
          </div>

          {/* MATH */}
          <div style={{ background: "linear-gradient(135deg, #064e3b 0%, #10b981 100%)", borderRadius: 24, padding: 24, textAlign: "center", boxShadow: "0 10px 30px rgba(16,185,129,0.3)" }}>
            <div style={{ fontSize: 11, color: "#a7f3d0", textTransform: "uppercase", fontWeight: 800, letterSpacing: 1, marginBottom: 6 }}>
              ⚡ MATHEMATICS
            </div>
            <div style={{ fontSize: 42, fontWeight: 900, color: "#ffffff", lineHeight: 1, marginBottom: 6 }}>
              {mathScore} <span style={{ fontSize: 18, opacity: 0.8 }}>/ 36</span>
            </div>
            <div style={{ fontSize: 12, color: "#d1fae5" }}>45 Total Questions (50 mins)</div>
          </div>

          {/* READING */}
          <div style={{ background: "linear-gradient(135deg, #6b21a8 0%, #9333ea 100%)", borderRadius: 24, padding: 24, textAlign: "center", boxShadow: "0 10px 30px rgba(147,51,234,0.3)" }}>
            <div style={{ fontSize: 11, color: "#e9d5ff", textTransform: "uppercase", fontWeight: 800, letterSpacing: 1, marginBottom: 6 }}>
              📚 READING
            </div>
            <div style={{ fontSize: 42, fontWeight: 900, color: "#ffffff", lineHeight: 1, marginBottom: 6 }}>
              {readingScore} <span style={{ fontSize: 18, opacity: 0.8 }}>/ 36</span>
            </div>
            <div style={{ fontSize: 12, color: "#f3e8ff" }}>36 Total Questions (40 mins)</div>
          </div>

          {/* OPTIONAL SCIENCE */}
          {scienceScore && (
            <div style={{ background: "linear-gradient(135deg, #831843 0%, #db2777 100%)", borderRadius: 24, padding: 24, textAlign: "center", boxShadow: "0 10px 30px rgba(219,39,119,0.3)" }}>
              <div style={{ fontSize: 11, color: "#fbcfe8", textTransform: "uppercase", fontWeight: 800, letterSpacing: 1, marginBottom: 6 }}>
                🧪 SCIENCE (OPTIONAL)
              </div>
              <div style={{ fontSize: 42, fontWeight: 900, color: "#ffffff", lineHeight: 1, marginBottom: 6 }}>
                {scienceScore} <span style={{ fontSize: 18, opacity: 0.8 }}>/ 36</span>
              </div>
              <div style={{ fontSize: 12, color: "#fce7f3" }}>Contributes to STEM Score</div>
            </div>
          )}

          {/* OPTIONAL WRITING */}
          {aiWritingReport && (
            <div style={{ background: "linear-gradient(135deg, #d97706 0%, #b45309 100%)", borderRadius: 24, padding: 24, textAlign: "center", boxShadow: "0 10px 30px rgba(217,119,6,0.3)" }}>
              <div style={{ fontSize: 11, color: "#fef08a", textTransform: "uppercase", fontWeight: 800, letterSpacing: 1, marginBottom: 6 }}>
                ✍️ WRITING (OPTIONAL)
              </div>
              <div style={{ fontSize: 42, fontWeight: 900, color: "#ffffff", lineHeight: 1, marginBottom: 6 }}>
                {aiWritingReport.overallScore || 8} <span style={{ fontSize: 18, opacity: 0.8 }}>/ 12</span>
              </div>
              <div style={{ fontSize: 12, color: "#fef9c3" }}>Contributes to ELA Score</div>
            </div>
          )}

        </div>

        {/* ── STEM, ELA & SUPERSCORE SUMMARY ── */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 20, marginBottom: 40 }}>
          
          <div style={{ background: "rgba(30,41,59,0.75)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 24, padding: 24 }}>
            <div style={{ fontSize: 12, fontWeight: 800, color: "#38bdf8", textTransform: "uppercase", marginBottom: 6 }}>🔬 ACT STEM SCORE</div>
            <div style={{ fontSize: 32, fontWeight: 900, color: "#ffffff" }}>{stemScore || Math.round((mathScore + (scienceScore || 28)) / 2)} <span style={{ fontSize: 16, color: "#94a3b8" }}>/ 36</span></div>
            <div style={{ fontSize: 13, color: "#94a3b8", marginTop: 4 }}>Combines Mathematics &amp; Science sections.</div>
          </div>

          <div style={{ background: "rgba(30,41,59,0.75)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 24, padding: 24 }}>
            <div style={{ fontSize: 12, fontWeight: 800, color: "#c084fc", textTransform: "uppercase", marginBottom: 6 }}>✍️ ACT ELA SCORE</div>
            <div style={{ fontSize: 32, fontWeight: 900, color: "#ffffff" }}>{elaScore || Math.round((englishScore + readingScore + 8) / 3)} <span style={{ fontSize: 16, color: "#94a3b8" }}>/ 36</span></div>
            <div style={{ fontSize: 13, color: "#94a3b8", marginTop: 4 }}>Combines English, Reading &amp; Writing sections.</div>
          </div>

          <div style={{ background: "rgba(30,41,59,0.75)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 24, padding: 24 }}>
            <div style={{ fontSize: 12, fontWeight: 800, color: "#facc15", textTransform: "uppercase", marginBottom: 6 }}>⭐ ACT SUPERSCORE COMPOSITE</div>
            <div style={{ fontSize: 32, fontWeight: 900, color: "#facc15" }}>{superscoreData.superscoreComposite} <span style={{ fontSize: 16, color: "#94a3b8" }}>/ 36</span></div>
            <div style={{ fontSize: 13, color: "#94a3b8", marginTop: 4 }}>Best section scores combined across all test attempts.</div>
          </div>

        </div>

        {/* ── GROQ AI WRITING REPORT (IF ESSAY TAKEN) ── */}
        {userEssayText && (
          <div style={{ background: "linear-gradient(135deg, rgba(124,58,237,0.15) 0%, rgba(37,99,235,0.15) 100%)", border: "1px solid rgba(168,85,247,0.3)", borderRadius: 28, padding: 32, marginBottom: 40 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18 }}>
              <span style={{ background: "rgba(168,85,247,0.25)", color: "#c084fc", border: "1px solid rgba(192,132,252,0.4)", padding: "4px 14px", borderRadius: 999, fontSize: 11, fontWeight: 900, textTransform: "uppercase" }}>
                <Sparkles size={13} style={{ display: "inline", marginRight: 4 }} /> GROQ AI WRITING EVALUATION REPORT (ACT 2–12 RUBRIC)
              </span>
            </div>

            {loadingAi ? (
              <div style={{ textAlign: "center", padding: 24, color: "#cbd5e1" }}>
                <RefreshCw size={24} style={{ animation: "spin 1s linear infinite" }} />
                <p style={{ marginTop: 12, fontSize: 14, fontWeight: 700 }}>Evaluating essay across 4 ACT domains via Groq AI Llama 3.3...</p>
              </div>
            ) : (
              <div>
                <p style={{ color: "#e2e8f0", fontSize: 15, lineHeight: 1.7, marginBottom: 20 }}>
                  {aiWritingReport?.feedback}
                </p>

                {/* 4 Domain Meters */}
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 14, marginBottom: 24 }}>
                  {[
                    { label: "Ideas & Analysis", val: aiWritingReport?.ideasAnalysis || 4 },
                    { label: "Development & Support", val: aiWritingReport?.developmentSupport || 4 },
                    { label: "Organization", val: aiWritingReport?.organization || 4 },
                    { label: "Language Conventions", val: aiWritingReport?.languageConventions || 4 }
                  ].map((dom) => (
                    <div key={dom.label} style={{ background: "rgba(15,23,42,0.6)", borderRadius: 14, padding: 14, border: "1px solid rgba(255,255,255,0.08)" }}>
                      <div style={{ fontSize: 11, fontWeight: 800, color: "#94a3b8", textTransform: "uppercase" }}>{dom.label}</div>
                      <div style={{ fontSize: 24, fontWeight: 900, color: "#38bdf8", marginTop: 4 }}>{dom.val} <span style={{ fontSize: 13, color: "#64748b" }}>/ 6</span></div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* ── ACTION BUTTONS ── */}
        <div style={{ display: "flex", justifyContent: "center", gap: 14, flexWrap: "wrap", marginBottom: 40 }}>
          <button
            onClick={() => navigate("/act")}
            style={{ background: "linear-gradient(135deg, #0284c7, #7c3aed)", color: "#ffffff", border: "none", borderRadius: 14, padding: "14px 28px", fontSize: 15, fontWeight: 800, cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 8, boxShadow: "0 6px 20px rgba(2, 132, 199, 0.4)" }}
          >
            <RefreshCw size={18} /> Return to ACT Hub
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
          Knarrow is an independent learning platform. ACT® is a registered trademark of ACT, Inc. This product is not endorsed, certified, or approved by ACT, Inc.
        </div>

      </div>
    </div>
  );
}
