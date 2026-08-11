import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Sparkles, BrainCircuit, Award, BookOpen, PenTool, ArrowRight, CheckCircle2, Zap } from "lucide-react";

export default function GRECenter() {
  const navigate = useNavigate();

  return (
    <div style={{ minHeight: "100vh", background: "#0f172a", color: "#ffffff", fontFamily: "Inter, sans-serif", padding: "60px 24px 80px" }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "48px" }}>
          <span style={{ background: "rgba(245,158,11,0.15)", color: "#fbbf24", border: "1px solid rgba(251,191,36,0.3)", padding: "6px 16px", borderRadius: "999px", fontSize: "12px", fontWeight: "800", letterSpacing: "0.5px" }}>
            <Sparkles size={14} style={{ display: "inline", marginRight: "6px" }} /> GRE GENERAL TEST (130-170 QUANT &amp; VERBAL)
          </span>

          <h1 style={{ fontSize: "clamp(2rem, 4vw, 3.2rem)", fontWeight: 900, margin: "16px 0", letterSpacing: "-1px" }}>
            GRE General Test Prep &amp; Quantitative Engine
          </h1>
          <p style={{ color: "#94a3b8", fontSize: "1.1rem", maxWidth: "650px", margin: "0 auto", lineHeight: "1.6" }}>
            Quantitative Reasoning, Verbal Reasoning, and Analytical Writing essay practice tailored for top-tier graduate school admissions.
          </p>
        </div>

        {/* 3 Core Sections */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "24px", marginBottom: "48px" }}>
          {[
            { title: "Quantitative Reasoning", icon: Zap, desc: "Algebra, Geometry, Data Analysis & Problem Solving", color: "#3b82f6" },
            { title: "Verbal Reasoning", icon: BookOpen, desc: "Text Completion, Sentence Equivalence & Reading Comp", color: "#f59e0b" },
            { title: "Analytical Writing", icon: PenTool, desc: "Analyze an Issue essay evaluation with Groq AI feedback", color: "#ec4899" },
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
        <div style={{ background: "linear-gradient(135deg, #78350f, #d97706)", borderRadius: "24px", padding: "40px", textAlign: "center", boxShadow: "0 10px 30px rgba(217,119,6,0.3)" }}>
          <h2 style={{ fontSize: "24px", fontWeight: 800, margin: "0 0 12px 0" }}>Section-Adaptive GRE Practice Tests</h2>
          <p style={{ color: "#fef3c7", fontSize: "15px", maxWidth: "560px", margin: "0 auto 24px", lineHeight: "1.6" }}>
            Test your speed and accuracy under official timed conditions with automated score reports for Quant &amp; Verbal.
          </p>
          <button onClick={() => navigate("/planner")} style={{ background: "#ffffff", color: "#92400e", border: "none", borderRadius: "14px", padding: "14px 28px", fontWeight: "800", fontSize: "15px", cursor: "pointer", display: "inline-flex", alignItems: "center", gap: "8px" }}>
            Generate GRE Study Plan <ArrowRight size={18} />
          </button>
        </div>

      </div>
    </div>
  );
}
