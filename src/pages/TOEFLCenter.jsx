import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Sparkles, BrainCircuit, Headphones, BookOpen, Mic, PenTool, ArrowRight, CheckCircle2 } from "lucide-react";

export default function TOEFLCenter() {
  const navigate = useNavigate();

  return (
    <div style={{ minHeight: "100vh", background: "#0f172a", color: "#ffffff", fontFamily: "Inter, sans-serif", padding: "60px 24px 80px" }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "48px" }}>
          <span style={{ background: "rgba(139,92,246,0.15)", color: "#c084fc", border: "1px solid rgba(192,132,252,0.3)", padding: "6px 16px", borderRadius: "999px", fontSize: "12px", fontWeight: "800", letterSpacing: "0.5px" }}>
            <Sparkles size={14} style={{ display: "inline", marginRight: "6px" }} /> TOEFL iBT PREP SUITE (0-120)
          </span>

          <h1 style={{ fontSize: "clamp(2rem, 4vw, 3.2rem)", fontWeight: 900, margin: "16px 0", letterSpacing: "-1px" }}>
            TOEFL iBT Academic Practice &amp; AI Engine
          </h1>
          <p style={{ color: "#94a3b8", fontSize: "1.1rem", maxWidth: "650px", margin: "0 auto", lineHeight: "1.6" }}>
            Master Reading, Listening, Speaking, and Writing integrated tasks with official ETS-style scoring rubrics and instant Groq AI feedback.
          </p>
        </div>

        {/* 4 Sections Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "20px", marginBottom: "48px" }}>
          {[
            { title: "TOEFL Reading", icon: BookOpen, desc: "Academic passages & factual inference questions", color: "#3b82f6" },
            { title: "TOEFL Listening", icon: Headphones, desc: "Campus lectures & conversation transcripts", color: "#8b5cf6" },
            { title: "TOEFL Speaking", icon: Mic, desc: "Integrated oral responses evaluated by AI", color: "#10b981" },
            { title: "TOEFL Writing", icon: PenTool, desc: "Integrated & Academic Discussion essays", color: "#f59e0b" },
          ].map((sec) => {
            const Icon = sec.icon;
            return (
              <div key={sec.title} style={{ background: "rgba(30,41,59,0.7)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "20px", padding: "24px", backdropFilter: "blur(10px)" }}>
                <div style={{ width: 44, height: 44, borderRadius: 12, background: `${sec.color}20`, display: "flex", alignItems: "center", justifyContent: "center", color: sec.color, marginBottom: 16 }}>
                  <Icon size={22} />
                </div>
                <h3 style={{ fontSize: 18, fontWeight: 800, margin: "0 0 6px 0" }}>{sec.title}</h3>
                <p style={{ fontSize: 13, color: "#94a3b8", margin: 0, lineHeight: 1.5 }}>{sec.desc}</p>
              </div>
            );
          })}
        </div>

        {/* Action Callout */}
        <div style={{ background: "linear-gradient(135deg, #4c1d95, #7c3aed)", borderRadius: "24px", padding: "40px", textAlign: "center", boxShadow: "0 10px 30px rgba(124,58,237,0.3)" }}>
          <h2 style={{ fontSize: "24px", fontWeight: 800, margin: "0 0 12px 0" }}>Full TOEFL iBT Mock Exams Included</h2>
          <p style={{ color: "#e9d5ff", fontSize: "15px", maxWidth: "560px", margin: "0 auto 24px", lineHeight: "1.6" }}>
            Experience 100% realistic timed exam conditions with automated score predictions across all 4 skill dimensions.
          </p>
          <button onClick={() => navigate("/planner")} style={{ background: "#ffffff", color: "#5b21b6", border: "none", borderRadius: "14px", padding: "14px 28px", fontWeight: "800", fontSize: "15px", cursor: "pointer", display: "inline-flex", alignItems: "center", gap: "8px" }}>
            Generate TOEFL Study Plan <ArrowRight size={18} />
          </button>
        </div>

      </div>
    </div>
  );
}
