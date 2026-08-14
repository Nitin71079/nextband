import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Sparkles, Award, Clock, ArrowRight, Play, BookOpen, Headphones,
  PenLine, Mic, ShieldCheck, CheckCircle2, Zap, HelpCircle, Layers,
  Compass, Calculator
} from "lucide-react";
import { detTests } from "../data/det/detTests";
import { detToIelts, detToCEFR } from "../utils/detScoreCalculator";
import { useAuth } from "../context/AuthContext";

export default function DETCenter() {
  const navigate = useNavigate();
  const { premium } = useAuth();
  const [selectedScore, setSelectedScore] = useState(125); // default DET score slider

  const ieltsVal = detToIelts(selectedScore);
  const cefrVal = detToCEFR(selectedScore);

  const subscores = [
    { name: "Literacy", icon: BookOpen, desc: "Ability to read and write fluently", color: "#3b82f6" },
    { name: "Comprehension", icon: Headphones, desc: "Ability to read and listen effectively", color: "#8b5cf6" },
    { name: "Conversation", icon: Mic, desc: "Ability to listen and speak naturally", color: "#22c55e" },
    { name: "Production", icon: PenLine, desc: "Ability to write and express complex ideas", color: "#f59e0b" },
  ];

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg)", fontFamily: "Inter, sans-serif", color: "var(--text)" }}>
      {/* ── HERO BANNER ── */}
      <div style={{
        background: "linear-gradient(135deg, #10b981 0%, #059669 40%, #047857 100%)",
        padding: "70px 24px 80px",
        color: "#ffffff",
        position: "relative",
        overflow: "hidden",
      }}>
        {/* Glow backdrop circles */}
        <div style={{ position: "absolute", top: -80, right: -80, width: 350, height: 350, borderRadius: "50%", background: "rgba(255,255,255,0.12)", filter: "blur(60px)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: -60, left: -60, width: 300, height: 300, borderRadius: "50%", background: "rgba(255,255,255,0.08)", filter: "blur(50px)", pointerEvents: "none" }} />

        <div style={{ maxWidth: 1100, margin: "0 auto", position: "relative", zIndex: 1 }}>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "6px 16px", borderRadius: 999, background: "rgba(255,255,255,0.2)", backdropFilter: "blur(8px)", fontSize: 13, fontWeight: 800, marginBottom: 16 }}>
              <Sparkles size={15} /> DUOLINGO ENGLISH TEST (DET) SUITE
            </div>

            <h1 style={{ fontSize: "clamp(2rem, 4vw, 3.2rem)", fontWeight: 900, margin: "0 0 16px 0", letterSpacing: "-1px" }}>
              Duolingo English Test Practice &amp; AI Mocks
            </h1>

            <p style={{ fontSize: "1.1rem", opacity: 0.95, maxWidth: 680, margin: "0 0 32px 0", lineHeight: 1.6 }}>
              Master the computer-adaptive DET exam with authentic 11 question types, instant missing-letter scoring, real/fake word banks, dictation drills, and AI writing &amp; speaking evaluations.
            </p>

            {/* Quick Action Buttons */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: 14 }}>
              <button
                onClick={() => navigate("/mock/det/1")}
                style={{
                  background: "#ffffff",
                  color: "#047857",
                  border: "none",
                  borderRadius: 14,
                  padding: "14px 28px",
                  fontSize: 15,
                  fontWeight: 800,
                  cursor: "pointer",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 10,
                  boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
                  transition: "transform 0.15s ease",
                }}
                onMouseEnter={e => e.currentTarget.style.transform = "scale(1.03)"}
                onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
              >
                <Play size={18} fill="#047857" /> Start Full DET Mock Test 1
              </button>

              <a
                href="#score-converter"
                style={{
                  background: "rgba(255,255,255,0.15)",
                  color: "#ffffff",
                  border: "1px solid rgba(255,255,255,0.3)",
                  borderRadius: 14,
                  padding: "14px 24px",
                  fontSize: 15,
                  fontWeight: 700,
                  textDecoration: "none",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                }}
              >
                <Calculator size={17} /> DET Score Converter
              </a>
            </div>
          </motion.div>
        </div>
      </div>

      {/* ── MAIN CONTENT CONTAINER ── */}
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "48px 24px 80px" }}>

        {/* ── 4 SUBSCORES GRID ── */}
        <div style={{ marginBottom: 48 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
            <div style={{ width: 38, height: 38, borderRadius: 12, background: "rgba(16, 185, 129, 0.12)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Layers size={20} color="#10b981" />
            </div>
            <div>
              <h2 style={{ fontSize: 20, fontWeight: 800, margin: 0 }}>4 DET Subscores Analyzed</h2>
              <p style={{ fontSize: 13, color: "var(--text-secondary)", margin: 0 }}>Understand how your performance maps across subskill dimensions</p>
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 18 }}>
            {subscores.map(sub => {
              const Icon = sub.icon;
              return (
                <div
                  key={sub.name}
                  style={{
                    background: "var(--card)",
                    border: "1px solid var(--border)",
                    borderRadius: 20,
                    padding: 22,
                    boxShadow: "0 4px 20px rgba(0,0,0,0.04)",
                  }}
                >
                  <div style={{ width: 44, height: 44, borderRadius: 14, background: `${sub.color}15`, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 14 }}>
                    <Icon size={22} color={sub.color} />
                  </div>
                  <div style={{ fontSize: 17, fontWeight: 800, marginBottom: 6 }}>{sub.name}</div>
                  <div style={{ fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.5 }}>{sub.desc}</div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ── SCORE CONVERTER TOOL ── */}
        <div id="score-converter" style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 24, padding: 32, marginBottom: 48, boxShadow: "0 8px 30px rgba(0,0,0,0.05)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
            <div style={{ width: 42, height: 42, borderRadius: 12, background: "rgba(37,99,235,0.12)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Calculator size={22} color="#2563eb" />
            </div>
            <div>
              <h2 style={{ fontSize: 20, fontWeight: 800, margin: 0 }}>DET Score to IELTS / CEFR Concordance Converter</h2>
              <p style={{ fontSize: 13, color: "var(--text-secondary)", margin: 0 }}>Official concordance mapping between Duolingo English Test (10–160) and IELTS Band Scores</p>
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 28, alignItems: "center" }}>
            {/* Slider Column */}
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 10 }}>
                <span style={{ fontSize: 13, fontWeight: 700, color: "var(--text-secondary)", textTransform: "uppercase" }}>DET Score</span>
                <span style={{ fontSize: 32, fontWeight: 900, color: "#10b981" }}>{selectedScore} <span style={{ fontSize: 14, fontWeight: 600, color: "var(--text-secondary)" }}>/ 160</span></span>
              </div>

              <input
                type="range"
                min="10"
                max="160"
                step="5"
                value={selectedScore}
                onChange={e => setSelectedScore(Number(e.target.value))}
                style={{ width: "100%", accentColor: "#10b981", cursor: "pointer", height: 8 }}
              />

              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: "var(--text-secondary)", marginTop: 8 }}>
                <span>10 (Beginner)</span>
                <span>100 (B2 Competent)</span>
                <span>160 (C2 Proficient)</span>
              </div>
            </div>

            {/* Result Cards */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 14 }}>
              <div style={{ background: "rgba(37,99,235,0.06)", border: "1px solid rgba(37,99,235,0.2)", padding: 18, borderRadius: 16, textAlign: "center" }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: "#2563eb", textTransform: "uppercase", marginBottom: 4 }}>IELTS Equivalent</div>
                <div style={{ fontSize: 30, fontWeight: 900, color: "#1e40af" }}>Band {ieltsVal}</div>
              </div>

              <div style={{ background: "rgba(139,92,246,0.06)", border: "1px solid rgba(139,92,246,0.2)", padding: 18, borderRadius: 16, textAlign: "center" }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: "#8b5cf6", textTransform: "uppercase", marginBottom: 4 }}>CEFR Level</div>
                <div style={{ fontSize: 18, fontWeight: 900, color: "#6b21a8", marginTop: 6 }}>{cefrVal}</div>
              </div>
            </div>
          </div>
        </div>

        {/* ── FULL DET MOCKS LIST ── */}
        <div>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
            <div>
              <h2 style={{ fontSize: 22, fontWeight: 800, margin: 0 }}>Available Full DET Adaptive Mocks</h2>
              <p style={{ fontSize: 13, color: "var(--text-secondary)", margin: 0 }}>Timed 1-hour computer simulations matching official Duolingo testing algorithms</p>
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
            {detTests.map(test => (
              <div
                key={test.id}
                style={{
                  background: "var(--card)",
                  border: "1px solid var(--border)",
                  borderRadius: 20,
                  padding: 24,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  flexWrap: "wrap",
                  gap: 16,
                  boxShadow: "0 4px 18px rgba(0,0,0,0.03)",
                }}
              >
                <div style={{ flex: 1, minWidth: 280 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
                    <span style={{ fontSize: 12, fontWeight: 800, padding: "4px 12px", borderRadius: 999, background: "rgba(16,185,129,0.12)", color: "#10b981" }}>
                      DET MOCK {test.id}
                    </span>
                    <span style={{ fontSize: 12, fontWeight: 700, color: "var(--text-secondary)", display: "flex", alignItems: "center", gap: 4 }}>
                      <Clock size={13} /> {test.durationMinutes} min
                    </span>
                    <span style={{ fontSize: 12, fontWeight: 700, color: test.difficulty === "Hard" ? "#ef4444" : "#f59e0b" }}>
                      ● {test.difficulty}
                    </span>
                  </div>

                  <h3 style={{ fontSize: 18, fontWeight: 800, margin: "0 0 6px 0" }}>{test.title}</h3>
                  <p style={{ fontSize: 13, color: "var(--text-secondary)", margin: 0, lineHeight: 1.5 }}>{test.description}</p>
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                  <div style={{ textAlign: "right" }}>
                    <div style={{ fontSize: 11, color: "var(--text-secondary)", fontWeight: 600 }}>Target Score</div>
                    <div style={{ fontSize: 18, fontWeight: 900, color: "#10b981" }}>{test.targetScore}+ DET</div>
                  </div>

                  <button
                    onClick={() => navigate(`/mock/det/${test.id}`)}
                    style={{
                      background: "linear-gradient(135deg, #10b981, #059669)",
                      color: "#ffffff",
                      border: "none",
                      borderRadius: 14,
                      padding: "12px 24px",
                      fontSize: 14,
                      fontWeight: 800,
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                      boxShadow: "0 4px 14px rgba(16,185,129,0.3)",
                    }}
                  >
                    Take Test <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
