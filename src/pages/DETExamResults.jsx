import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Award, Sparkles, Clock, ArrowRight, BookOpen, Headphones, PenLine, Mic,
  ChevronRight, RefreshCw, BarChart3, ShieldCheck
} from "lucide-react";
import { getResults } from "../services/resultService";
import { detToIelts, detToCEFR } from "../utils/detScoreCalculator";

export default function DETExamResults() {
  const { resultId } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [resultData, setResultData] = useState(null);

  useEffect(() => {
    async function loadResult() {
      try {
        const allResults = await getResults();
        const detResults = allResults.filter(r => r.module === "DET" || r.type === "DET Mock Exam");
        const found = resultId ? detResults.find(r => r.id === resultId) : detResults[0];

        if (found) {
          setResultData(found);
        }
      } catch (e) {
        console.error("Error loading DET exam result:", e);
      } finally {
        setLoading(false);
      }
    }
    loadResult();
  }, [resultId]);

  if (loading) {
    return (
      <div style={{ minHeight: "100vh", background: "var(--bg)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--text-secondary)" }}>
        <RefreshCw size={32} style={{ animation: "spin 1s linear infinite", marginBottom: 12 }} />
      </div>
    );
  }

  if (!resultData) {
    return (
      <div style={{ minHeight: "100vh", background: "var(--bg)", display: "flex", alignItems: "center", justifyContent: "center", padding: 24, textAlign: "center", color: "var(--text)" }}>
        <div>
          <h2 style={{ fontSize: 22, fontWeight: 800 }}>No Recent DET Exam Result Found</h2>
          <p style={{ color: "var(--text-secondary)", marginTop: 6, marginBottom: 20 }}>Complete a DET full mock test to generate your official diagnostic report.</p>
          <button onClick={() => navigate("/det")} style={{ background: "#10b981", color: "#fff", border: "none", borderRadius: 14, padding: "12px 24px", fontWeight: 800, cursor: "pointer" }}>
            Go to DET Center
          </button>
        </div>
      </div>
    );
  }

  const score = resultData.score || resultData.band || 115;
  const subscores = resultData.subscores || { literacy: 115, comprehension: 120, conversation: 110, production: 110 };
  const ieltsVal = detToIelts(score);
  const cefrVal = detToCEFR(score);

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg)", color: "var(--text)", fontFamily: "Inter, sans-serif", padding: "60px 24px 80px" }}>
      <div style={{ maxWidth: 880, margin: "0 auto" }}>

        {/* Header Hero */}
        <div style={{ background: "linear-gradient(135deg, #10b981 0%, #047857 100%)", borderRadius: 28, padding: 36, color: "#fff", marginBottom: 32, boxShadow: "0 20px 50px rgba(16,185,129,0.25)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, fontWeight: 800, textTransform: "uppercase", opacity: 0.9 }}>
            <Sparkles size={16} /> DET AI DIAGNOSTIC REPORT
          </div>

          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 20, marginTop: 16 }}>
            <div>
              <div style={{ fontSize: 64, fontWeight: 900, lineHeight: 1 }}>{score} <span style={{ fontSize: 22, fontWeight: 600, opacity: 0.8 }}>/ 160</span></div>
              <div style={{ fontSize: 16, fontWeight: 700, marginTop: 8, opacity: 0.95 }}>Overall Duolingo Score</div>
            </div>

            <div style={{ display: "flex", gap: 16 }}>
              <div style={{ background: "rgba(255,255,255,0.18)", backdropFilter: "blur(10px)", padding: "16px 22px", borderRadius: 18, textAlign: "center" }}>
                <div style={{ fontSize: 11, fontWeight: 700, opacity: 0.8, textTransform: "uppercase" }}>IELTS EQUIVALENT</div>
                <div style={{ fontSize: 24, fontWeight: 900, marginTop: 2 }}>Band {ieltsVal}</div>
              </div>

              <div style={{ background: "rgba(255,255,255,0.18)", backdropFilter: "blur(10px)", padding: "16px 22px", borderRadius: 18, textAlign: "center" }}>
                <div style={{ fontSize: 11, fontWeight: 700, opacity: 0.8, textTransform: "uppercase" }}>CEFR LEVEL</div>
                <div style={{ fontSize: 18, fontWeight: 900, marginTop: 4 }}>{cefrVal}</div>
              </div>
            </div>
          </div>
        </div>

        {/* 4 Subscore Cards */}
        <h3 style={{ fontSize: 18, fontWeight: 800, marginBottom: 16 }}>Detailed Subscore Analysis</h3>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16, marginBottom: 40 }}>
          {Object.entries(subscores).map(([key, val]) => (
            <div key={key} style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 20, padding: 20 }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: "var(--text-secondary)", textTransform: "capitalize" }}>{key}</div>
              <div style={{ fontSize: 32, fontWeight: 900, color: "#10b981", marginTop: 4 }}>{val} <span style={{ fontSize: 13, color: "var(--text-secondary)" }}>/ 160</span></div>
              <div style={{ width: "100%", background: "var(--surface)", height: 6, borderRadius: 999, marginTop: 12, overflow: "hidden" }}>
                <div style={{ width: `${(val / 160) * 100}%`, height: "100%", background: "#10b981" }} />
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Buttons */}
        <div style={{ display: "flex", gap: 14 }}>
          <button onClick={() => navigate("/det")} style={{ flex: 1, background: "var(--card)", border: "1px solid var(--border)", borderRadius: 16, padding: "14px", fontWeight: 700, cursor: "pointer", color: "var(--text)" }}>
            Back to DET Center
          </button>
          <button onClick={() => navigate("/mock/det/1")} style={{ flex: 1, background: "linear-gradient(135deg, #10b981, #059669)", color: "#fff", border: "none", borderRadius: 16, padding: "14px", fontWeight: 800, cursor: "pointer" }}>
            Take Another DET Mock Exam
          </button>
        </div>

      </div>
    </div>
  );
}
