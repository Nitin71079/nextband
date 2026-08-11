import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Sparkles, BrainCircuit, Award, BookOpen, Layers, ArrowRight, CheckCircle2, Zap } from "lucide-react";

export default function CATCenter() {
  const navigate = useNavigate();

  return (
    <div style={{ minHeight: "100vh", background: "#0f172a", color: "#ffffff", fontFamily: "Inter, sans-serif", padding: "60px 24px 80px" }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "48px" }}>
          <span style={{ background: "rgba(236,72,153,0.15)", color: "#f472b6", border: "1px solid rgba(244,114,182,0.3)", padding: "6px 16px", borderRadius: "999px", fontSize: "12px", fontWeight: "800", letterSpacing: "0.5px" }}>
            <Sparkles size={14} style={{ display: "inline", marginRight: "6px" }} /> CAT MBA ENTRANCE SUITE (VARC, DILR, QUANT)
          </span>

          <h1 style={{ fontSize: "clamp(2rem, 4vw, 3.2rem)", fontWeight: 900, margin: "16px 0", letterSpacing: "-1px" }}>
            CAT Entrance Exam Mastery Platform
          </h1>
          <p style={{ color: "#94a3b8", fontSize: "1.1rem", maxWidth: "650px", margin: "0 auto", lineHeight: "1.6" }}>
            Comprehensive Verbal Ability, Data Interpretation, Logical Reasoning, and Quantitative Aptitude drills for top IIMs &amp; business schools.
          </p>
        </div>

        {/* 3 Core Sections */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "24px", marginBottom: "48px" }}>
          {[
            { title: "VARC (Verbal Ability & Reading Comp)", icon: BookOpen, desc: "RC passages, Para Jumbles & Summary completion", color: "#3b82f6" },
            { title: "DILR (Data Interpretation & Logical Reasoning)", icon: Layers, desc: "Complex Data Sets, Seating Arrangements & Puzzles", color: "#ec4899" },
            { title: "QA (Quantitative Aptitude)", icon: Zap, desc: "Arithmetic, Algebra, Geometry & Modern Mathematics", color: "#10b981" },
          ].map((sec) => {
            const Icon = sec.icon;
            return (
              <div key={sec.title} style={{ background: "rgba(30,41,59,0.7)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "24px", padding: "28px", backdropFilter: "blur(10px)" }}>
                <div style={{ width: 48, height: 48, borderRadius: 14, background: `${sec.color}20`, display: "flex", alignItems: "center", justifyContent: "center", color: sec.color, marginBottom: 18 }}>
                  <Icon size={24} />
                </div>
                <h3 style={{ fontSize: 20, fontWeight: 800, margin: "0 0 8px 0" }}>{sec.title}</h3>
                <p style={{ fontSize: 14, color: "#94a3b8", margin: 0, lineHeight: 1.6 }}>{sec.desc}</p>
              </div>
            );
          })}
        </div>

        {/* Action Callout */}
        <div style={{ background: "linear-gradient(135deg, #831843, #db2777)", borderRadius: "24px", padding: "40px", textAlign: "center", boxShadow: "0 10px 30px rgba(219,39,119,0.3)" }}>
          <h2 style={{ fontSize: "24px", fontWeight: 800, margin: "0 0 12px 0" }}>Timed CAT Speed &amp; Accuracy Solvers</h2>
          <p style={{ color: "#fbcfe8", fontSize: "15px", maxWidth: "560px", margin: "0 auto 24px", lineHeight: "1.6" }}>
            Boost your percentile with section-wise sectional tests and instant percentile prediction analytics.
          </p>
          <button onClick={() => navigate("/planner")} style={{ background: "#ffffff", color: "#9d174d", border: "none", borderRadius: "14px", padding: "14px 28px", fontWeight: "800", fontSize: "15px", cursor: "pointer", display: "inline-flex", alignItems: "center", gap: "8px" }}>
            Generate CAT Study Plan <ArrowRight size={18} />
          </button>
        </div>

      </div>
    </div>
  );
}
