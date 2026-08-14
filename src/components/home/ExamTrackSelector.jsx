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
    <section style={{ padding: "80px 24px", background: "var(--bg, #0f172a)", color: "var(--text, #ffffff)" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        
        {/* Section Header */}
        <div style={{ textAlign: "center", marginBottom: "56px" }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              background: "rgba(37, 99, 235, 0.15)",
              color: "#60a5fa",
              border: "1px solid rgba(96, 165, 250, 0.3)",
              padding: "6px 16px",
              borderRadius: "999px",
              fontSize: "13px",
              fontWeight: "800",
              textTransform: "uppercase",
              letterSpacing: "0.5px",
              marginBottom: "16px",
            }}
          >
            <Sparkles size={16} /> Choose Your Target Exam Track
          </div>

          <h2 style={{ fontSize: "clamp(2rem, 3.5vw, 2.8rem)", fontWeight: 900, margin: "0 0 16px 0", letterSpacing: "-0.5px" }}>
            One Platform. <span style={{ background: "linear-gradient(135deg, #60a5fa, #a78bfa)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>All Major Global Exams.</span>
          </h2>
          
          <p style={{ color: "#94a3b8", fontSize: "1.1rem", maxWidth: "680px", margin: "0 auto", lineHeight: "1.6" }}>
            Select your exam below to enter its specialized prep ecosystem—complete with AI scoring, study planners, CBT test simulators, and games.
          </p>
        </div>

        {/* Exam Cards Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "24px" }}>
          {EXAM_TRACKS.map((track) => {
            const Icon = track.icon;
            const isSelected = activeTrack === track.id;

            return (
              <motion.div
                key={track.id}
                whileHover={{ y: -8, transition: { duration: 0.2 } }}
                style={{
                  background: isSelected ? track.activeBg : "rgba(30, 41, 59, 0.7)",
                  border: isSelected ? `2px solid ${track.color}` : "1px solid rgba(255, 255, 255, 0.1)",
                  borderRadius: "24px",
                  padding: "32px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  boxShadow: isSelected ? `0 20px 40px ${track.color}35` : "0 10px 30px rgba(0, 0, 0, 0.2)",
                  position: "relative",
                  backdropFilter: "blur(10px)",
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
