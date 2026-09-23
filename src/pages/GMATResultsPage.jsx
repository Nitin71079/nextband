import React, { useState, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Award, Clock, CheckCircle2, XCircle, ChevronLeft, Sparkles, AlertTriangle, BookOpen, Layers, BarChart2, ShieldAlert
} from "lucide-react";
import { GMAC_PERCENTILE_TABLE, calculateGMATPercentile } from "../utils/gmatScoreCalculator";
import GMATQuestionRenderer from "../components/gmat/GMATQuestionRenderer";

export default function GMATResultsPage() {
  const { resultId } = useParams();
  const navigate = useNavigate();

  // Load Saved Result Payload
  const resultData = useMemo(() => {
    try {
      const raw = localStorage.getItem(`knarrow_gmat_res_${resultId}`);
      if (raw) return JSON.parse(raw);
    } catch (err) {
      console.warn("Failed to load result payload:", err);
    }
    // Fallback Mock Data
    return {
      title: "GMAT Focus Computer-Adaptive Simulation",
      totalScore: 685,
      quantScore: 82,
      verbalScore: 83,
      diScore: 80,
      percentile: 95,
      date: new Date().toISOString(),
      sectionOrder: ["quant", "verbal", "di"],
      answerChangeCount: { quant: 1, verbal: 2, di: 0 },
      userAnswers: {},
      flaggedQuestions: {}
    };
  }, [resultId]);

  const [activeTab, setActiveTab] = useState("overview"); // 'overview' | 'breakdown' | 'review'

  const totalScore = resultData.totalScore || 685;
  const percentile = resultData.percentile || calculateGMATPercentile(totalScore);

  return (
    <div style={{ minHeight: "100vh", background: "#090d16", color: "#ffffff", fontFamily: "Inter, sans-serif", padding: "40px 24px" }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        
        {/* Header Bar */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "32px" }}>
          <button
            onClick={() => navigate("/gmat")}
            style={{
              background: "#1e293b",
              color: "#38bdf8",
              border: "1px solid #334155",
              borderRadius: "10px",
              padding: "10px 18px",
              fontSize: "14px",
              fontWeight: 700,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "8px"
            }}
          >
            <ChevronLeft size={18} /> Return to GMAT Hub
          </button>

          <span style={{ fontSize: "13px", color: "#94a3b8", fontWeight: 700 }}>
            Completed on {new Date(resultData.date || Date.now()).toLocaleDateString()}
          </span>
        </div>

        {/* ── SCORE BANNER ── */}
        <div style={{ background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)", border: "2px solid #0284c7", borderRadius: "24px", padding: "36px", marginBottom: "36px", boxShadow: "0 20px 40px rgba(0,0,0,0.5)" }}>
          
          <div style={{ display: "flex", alignItems: "center", gap: "8px", background: "rgba(56, 189, 248, 0.15)", color: "#38bdf8", padding: "6px 16px", borderRadius: "999px", fontSize: "13px", fontWeight: 800, width: "fit-content", marginBottom: "20px" }}>
            <Sparkles size={16} /> OFFICIAL GMAT FOCUS EDITION ESTIMATOR
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: "32px", alignItems: "center" }}>
            {/* Total Score Box */}
            <div style={{ background: "#0f172a", border: "1px solid #334155", borderRadius: "20px", padding: "28px", textAlign: "center" }}>
              <div style={{ fontSize: "13px", color: "#94a3b8", fontWeight: 800, textTransform: "uppercase", letterSpacing: "1px", marginBottom: "8px" }}>
                Knarrow Estimated GMAT Score
              </div>

              <div style={{ fontSize: "64px", fontWeight: 900, color: "#ffffff", lineHeight: 1, margin: "8px 0" }}>
                {totalScore}
              </div>

              <div style={{ fontSize: "14px", fontWeight: 800, color: "#10b981", marginTop: "8px" }}>
                {percentile}th Percentile Rank
              </div>

              <div style={{ fontSize: "11px", color: "#64748b", marginTop: "12px", fontStyle: "italic" }}>
                Scale: 205–805 (10-pt increments)
              </div>
            </div>

            {/* 3 Section Scores */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px" }}>
              <div style={secScoreBoxStyle}>
                <div style={{ fontSize: "12px", color: "#94a3b8", fontWeight: 700 }}>Quantitative</div>
                <div style={{ fontSize: "28px", fontWeight: 900, color: "#10b981", margin: "6px 0" }}>
                  {resultData.quantScore || 80}
                </div>
                <div style={{ fontSize: "11px", color: "#64748b" }}>60–90 Scale</div>
              </div>

              <div style={secScoreBoxStyle}>
                <div style={{ fontSize: "12px", color: "#94a3b8", fontWeight: 700 }}>Verbal</div>
                <div style={{ fontSize: "28px", fontWeight: 900, color: "#38bdf8", margin: "6px 0" }}>
                  {resultData.verbalScore || 80}
                </div>
                <div style={{ fontSize: "11px", color: "#64748b" }}>60–90 Scale</div>
              </div>

              <div style={secScoreBoxStyle}>
                <div style={{ fontSize: "12px", color: "#94a3b8", fontWeight: 700 }}>Data Insights</div>
                <div style={{ fontSize: "28px", fontWeight: 900, color: "#9333ea", margin: "6px 0" }}>
                  {resultData.diScore || 80}
                </div>
                <div style={{ fontSize: "11px", color: "#64748b" }}>60–90 Scale</div>
              </div>
            </div>
          </div>

          {/* Legal Notice Disclaimer */}
          <div style={{ borderTop: "1px solid #334155", marginTop: "24px", paddingTop: "16px", fontSize: "12px", color: "#64748b", display: "flex", alignItems: "center", gap: "8px" }}>
            <ShieldAlert size={16} color="#64748b" />
            Disclaimer: Knarrow GMAT scores are estimated performance metrics computed using IRT algorithms and are not official GMAC score reports.
          </div>
        </div>

        {/* ── SECTION PERFORMANCE BREAKDOWN ── */}
        <div style={{ background: "#0f172a", border: "1px solid #334155", borderRadius: "20px", padding: "28px", marginBottom: "36px" }}>
          <h2 style={{ fontSize: "20px", fontWeight: 800, color: "#ffffff", marginBottom: "20px" }}>
            Section & Review Activity Performance
          </h2>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "20px" }}>
            <div style={statCardStyle}>
              <div style={{ fontSize: "13px", color: "#94a3b8", fontWeight: 700 }}>Section Sequence</div>
              <div style={{ fontSize: "16px", fontWeight: 800, color: "#ffffff", marginTop: "6px" }}>
                {(resultData.sectionOrder || ["quant", "verbal", "di"]).join(" → ").toUpperCase()}
              </div>
            </div>

            <div style={statCardStyle}>
              <div style={{ fontSize: "13px", color: "#94a3b8", fontWeight: 700 }}>Answer Changes Used</div>
              <div style={{ fontSize: "16px", fontWeight: 800, color: "#38bdf8", marginTop: "6px" }}>
                Quant: {resultData.answerChangeCount?.quant || 0}/3 · Verbal: {resultData.answerChangeCount?.verbal || 0}/3 · DI: {resultData.answerChangeCount?.di || 0}/3
              </div>
            </div>

            <div style={statCardStyle}>
              <div style={{ fontSize: "13px", color: "#94a3b8", fontWeight: 700 }}>Target Business School Range</div>
              <div style={{ fontSize: "16px", fontWeight: 800, color: "#10b981", marginTop: "6px" }}>
                {totalScore >= 685 ? "Top 10 Global MBA Programs" : totalScore >= 605 ? "Top 50 Global MBA Programs" : "Competitive MBA Range"}
              </div>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div style={{ display: "flex", justifyContent: "center", gap: "16px" }}>
          <button
            onClick={() => navigate("/gmat")}
            style={{
              background: "linear-gradient(135deg, #0284c7, #7c3aed)",
              color: "#ffffff",
              border: "none",
              borderRadius: "14px",
              padding: "16px 36px",
              fontSize: "16px",
              fontWeight: 800,
              cursor: "pointer",
              boxShadow: "0 10px 30px rgba(2, 132, 199, 0.4)"
            }}
          >
            Launch Another GMAT Practice Mock
          </button>
        </div>

      </div>
    </div>
  );
}

const secScoreBoxStyle = {
  background: "#0f172a",
  border: "1px solid #334155",
  borderRadius: "16px",
  padding: "20px",
  textAlign: "center"
};

const statCardStyle = {
  background: "#1e293b",
  border: "1px solid #334155",
  borderRadius: "14px",
  padding: "18px"
};
