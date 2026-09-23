import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Sparkles, BookOpen, Layers, Award, ArrowRight, BrainCircuit, CheckCircle2, ShieldCheck, Zap } from "lucide-react";
import { useExam } from "../../context/ExamContext";

export default function ExamTrackSelector() {
  const navigate = useNavigate();
  const { selectTrack, activeTrack } = useExam();

  const EXAM_TRACKS = [
    {
      id: "IELTS",
      title: "IELTS Academic & General",
      badge: "BAND 9.0 AI ENGINE",
      badgeColor: "#3b82f6",
      desc: "Full CBT exam-style interface, split-panel Reading, Audio Listening, and instant AI Writing/Speaking Band evaluation.",
      features: ["Listening, Reading, Writing, Speaking", "Official CBT Layout & Question Palette", "Groq AI Writing & Speaking Feedback"],
      cta: "Launch IELTS Prep",
      path: "/dashboard",
      color: "#2563eb",
      activeBg: "linear-gradient(135deg, #1e3a8a, #1d4ed8)",
      icon: BookOpen,
      isLive: true,
    },
    {
      id: "DET",
      title: "Duolingo English Test (DET)",
      badge: "COMPUTER ADAPTIVE (10-160)",
      badgeColor: "#10b981",
      desc: "Interactive DET adaptive engine covering all 14 task types, 12 full mock exams, and Literacy/Comprehension/Conversation/Production subscores.",
      features: ["All 14 Official DET Question Types", "Real/Fake Word Banks & Dictations", "Groq AI llama-3.3 Subscore Scoring"],
      cta: "Launch DET Prep",
      path: "/duolingo",
      color: "#10b981",
      activeBg: "linear-gradient(135deg, #065f46, #059669)",
      icon: Layers,
      isLive: true,
    },
    {
      id: "TOEFL",
      title: "TOEFL iBT Test Prep",
      badge: "0 - 120 SCORE SCALE",
      badgeColor: "#8b5cf6",
      desc: "Integrated Reading, Listening, Speaking and Writing tasks calibrated to official ETS university admissions standards.",
      features: ["Integrated Speaking & Writing Tasks", "Academic Audio Transcripts & Passages", "ETS Rubric AI Performance Feedback"],
      cta: "Explore TOEFL Hub",
      path: "/toefl",
      color: "#8b5cf6",
      activeBg: "linear-gradient(135deg, #4c1d95, #7c3aed)",
      isLive: true,
      icon: BrainCircuit,
    },
    {
      id: "PTE",
      title: "PTE Academic 2026",
      badge: "10 - 90 SCORE SCALE",
      badgeColor: "#c084fc",
      desc: "Full 2026 Pearson PTE Academic simulation featuring 65 scored task instances, including Group Discussion & Situation tasks.",
      features: ["All 20 Scored PTE Task Types", "2026 Group Discussion & Situation", "Groq AI Llama 3.3 Pearson Rubrics"],
      cta: "Explore PTE Hub",
      path: "/pte",
      color: "#c084fc",
      activeBg: "linear-gradient(135deg, #581c87, #9333ea)",
      isLive: true,
      icon: Award,
    },
    {
      id: "GRE",
      title: "GRE General Test",
      badge: "130 - 170 QUANT & VERBAL",
      badgeColor: "#f59e0b",
      desc: "Quantitative Reasoning, Verbal Reasoning, and Analytical Writing essay practice for top graduate school admissions.",
      features: ["Section-Level Adaptive Practice", "Math & Vocabulary Drills", "Analytical Writing Essay AI Evaluator"],
      cta: "Explore GRE Hub",
      path: "/gre",
      color: "#f59e0b",
      activeBg: "linear-gradient(135deg, #78350f, #d97706)",
      isLive: true,
      icon: Award,
    },
    {
      id: "CAT",
      title: "CAT MBA Entrance Exam",
      badge: "VARC, DILR & QUANT",
      badgeColor: "#ec4899",
      desc: "Verbal Ability, Data Interpretation, Logical Reasoning, and Quantitative Aptitude for top business school admissions.",
      features: ["Speed & Accuracy Timed Modules", "DI-LR Data Set Solvers", "Percentile Predictor Analytics"],
      cta: "Explore CAT Hub",
      path: "/cat",
      color: "#ec4899",
      activeBg: "linear-gradient(135deg, #831843, #db2777)",
      isLive: true,
      icon: Zap,
    },
  ];

  return (
    <section style={{ padding: "100px 24px", background: "radial-gradient(circle at 50% 0%, #0369a1 0%, #020617 70%)", color: "#ffffff", position: "relative", overflow: "hidden" }}>
      
      {/* Background Ambient Spotlights */}
      <div className="ambient-light-spot" style={{ top: "10%", left: "5%" }} />
      <div className="ambient-light-spot" style={{ bottom: "10%", right: "5%", background: "radial-gradient(circle, rgba(124,58,237,0.2) 0%, transparent 70%)" }} />

      <div style={{ maxWidth: "1200px", margin: "0 auto", position: "relative", zIndex: 2 }}>
        
        {/* Section Header */}
        <div style={{ textAlign: "center", marginBottom: "64px" }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              background: "rgba(56, 189, 248, 0.15)",
              color: "#38bdf8",
              border: "1px solid rgba(56, 189, 248, 0.3)",
              padding: "8px 20px",
              borderRadius: "999px",
              fontSize: "12px",
              fontWeight: "900",
              textTransform: "uppercase",
              letterSpacing: "1px",
              marginBottom: "20px",
              boxShadow: "0 4px 20px rgba(56, 189, 248, 0.2)"
            }}
          >
            <Sparkles size={16} /> Choose Your Target Exam Track
          </div>

          <h2 style={{ fontSize: "clamp(2.4rem, 4.5vw, 3.6rem)", fontWeight: 900, margin: "0 0 20px 0", letterSpacing: "-1px", lineHeight: 1.1 }}>
            One Master Platform. <br />
            <span style={{ background: "linear-gradient(135deg, #00f2fe 0%, #4facfe 50%, #c084fc 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              All 8 Major Global Exam Ecosystems.
            </span>
          </h2>
          
          <p style={{ color: "#cbd5e1", fontSize: "1.2rem", maxWidth: "720px", margin: "0 auto", lineHeight: "1.6" }}>
            Select your target exam below to unlock its 100-mock form bank, Groq AI Llama 3.3 diagnostic evaluators, CBT test engine, and multiplayer arcade games.
          </p>
        </div>

        {/* Exam Cards Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))", gap: "28px" }}>
          {EXAM_TRACKS.map((track) => {
            const Icon = track.icon;
            const isSelected = activeTrack === track.id;

            return (
              <motion.div
                key={track.id}
                whileHover={{ y: -10, scale: 1.02 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                style={{
                  background: isSelected ? track.activeBg : "linear-gradient(135deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)",
                  border: isSelected ? `2px solid ${track.color}` : "1px solid rgba(255, 255, 255, 0.15)",
                  borderRadius: "28px",
                  padding: "36px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  boxShadow: isSelected ? `0 20px 50px ${track.color}45, inset 0 1px 0 rgba(255,255,255,0.3)` : "0 12px 40px rgba(0, 0, 0, 0.35)",
                  position: "relative",
                  backdropFilter: "blur(20px)",
                  WebkitBackdropFilter: "blur(20px)",
                }}
              >
                <div>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "20px" }}>
                    <span
                      style={{
                        background: `${track.badgeColor}25`,
                        color: track.badgeColor,
                        border: `1px solid ${track.badgeColor}40`,
                        fontSize: "11px",
                        fontWeight: "800",
                        padding: "4px 12px",
                        borderRadius: "999px",
                        letterSpacing: "0.5px",
                      }}
                    >
                      {track.badge}
                    </span>

                    {isSelected && (
                      <span style={{ display: "flex", alignItems: "center", gap: "4px", fontSize: "12px", fontWeight: "800", color: "#10b981" }}>
                        <CheckCircle2 size={16} /> ACTIVE TRACK
                      </span>
                    )}
                  </div>

                  <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "12px" }}>
                    <div style={{ width: "42px", height: "42px", borderRadius: "12px", background: `${track.color}20`, display: "flex", alignItems: "center", justifyContent: "center", color: track.color }}>
                      <Icon size={24} />
                    </div>
                    <h3 style={{ fontSize: "22px", fontWeight: 900, color: "#ffffff", margin: 0 }}>
                      {track.title}
                    </h3>
                  </div>

                  <p style={{ color: "#cbd5e1", fontSize: "14px", lineHeight: "1.6", marginBottom: "24px" }}>
                    {track.desc}
                  </p>

                  {/* Bullet points */}
                  <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "32px" }}>
                    {track.features.map((feat, idx) => (
                      <div key={idx} style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "13px", color: "#94a3b8", fontWeight: "600" }}>
                        <ShieldCheck size={16} color={track.color} />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => selectTrack(track.id, navigate)}
                  style={{
                    background: track.color,
                    color: "#ffffff",
                    border: "none",
                    borderRadius: "14px",
                    padding: "14px 24px",
                    fontSize: "15px",
                    fontWeight: "800",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "10px",
                    width: "100%",
                    boxShadow: `0 8px 20px ${track.color}40`,
                    transition: "all 0.15s ease",
                  }}
                >
                  {track.cta} <ArrowRight size={18} />
                </button>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
