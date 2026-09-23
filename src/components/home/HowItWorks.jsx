import React from "react";
import { motion } from "framer-motion";
import { Target, BrainCircuit, Sparkles, Award, ArrowRight, Zap, CheckCircle2 } from "lucide-react";

export default function HowItWorks() {
  const steps = [
    {
      step: "01",
      icon: Target,
      title: "Select Target Exam & Score Goal",
      desc: "Choose from 8 major global exams (IELTS, DET, TOEFL, PTE, GRE, CAT, ACT, SAT, GMAT) and set your target admissions score.",
      color: "#38bdf8",
    },
    {
      step: "02",
      icon: BrainCircuit,
      title: "Take Adaptive IRT Diagnostic Mock",
      desc: "Simulate real computer-based testing with item-level difficulty adaptation, item information functions, and instant Groq AI Llama 3.3 scoring.",
      color: "#c084fc",
    },
    {
      step: "03",
      icon: Zap,
      title: "Follow AI 7-Day Action Plan & Arcade Drills",
      desc: "Target your exact weak areas with voice spectrogram pronunciation analysis, time-sink heatmaps, and 9 multiplayer arcade games.",
      color: "#f59e0b",
    },
    {
      step: "04",
      icon: Award,
      title: "Achieve Target Score & Official Certificate",
      desc: "Gain the confidence to achieve your dream score for admissions into Harvard, Oxford, MIT, Stanford, and top global universities.",
      color: "#22c55e",
    },
  ];

  return (
    <section style={{ padding: "90px 24px", background: "radial-gradient(circle at 50% 100%, #0369a1 0%, #060d1f 70%)", color: "#ffffff", position: "relative" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        
        <div style={{ textAlign: "center", marginBottom: 60 }}>
          <span style={{ background: "rgba(56,189,248,0.15)", color: "#38bdf8", border: "1px solid rgba(56,189,248,0.3)", padding: "6px 18px", borderRadius: 999, fontSize: 12, fontWeight: 900, letterSpacing: 1, textTransform: "uppercase" }}>
            <Sparkles size={14} /> SIMPLE 4-STEP PATHWAY
          </span>
          <h2 style={{ fontSize: "clamp(2.2rem, 4vw, 3.2rem)", fontWeight: 900, margin: "16px 0 12px 0", letterSpacing: "-1px" }}>
            How Knarrow AI Accelerates Your Exam Success
          </h2>
          <p style={{ color: "#cbd5e1", fontSize: "1.15rem", maxWidth: 700, margin: "0 auto", lineHeight: 1.6 }}>
            From initial IRT diagnostic baseline to target score achievement in 4 structured steps.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 24 }}>
          {steps.map((s, idx) => {
            const Icon = s.icon;
            return (
              <motion.div
                key={s.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -8 }}
                style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 24, padding: 32, backdropFilter: "blur(16px)", position: "relative" }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
                  <span style={{ fontSize: 28, fontWeight: 900, color: s.color, opacity: 0.8 }}>{s.step}</span>
                  <div style={{ width: 44, height: 44, borderRadius: 14, background: `${s.color}20`, border: `1px solid ${s.color}40`, display: "flex", alignItems: "center", justifyContent: "center", color: s.color }}>
                    <Icon size={22} />
                  </div>
                </div>
                <h3 style={{ fontSize: 18, fontWeight: 900, color: "#ffffff", margin: "0 0 10px 0" }}>{s.title}</h3>
                <p style={{ fontSize: 13, color: "#cbd5e1", margin: 0, lineHeight: 1.6 }}>{s.desc}</p>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
