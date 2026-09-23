import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Sparkles, Zap, BookOpen, PenTool, ArrowRight, CheckCircle2,
  Headphones, Mic, Play, Layers, Clock, Award, Calculator
} from "lucide-react";
import listeningTests from "../data/listening/tests";

export default function IELTSCenter() {
  const navigate = useNavigate();

  const startRandomizedListening = () => {
    if (!listeningTests || listeningTests.length === 0) return;
    const selected = listeningTests[Math.floor(Math.random() * listeningTests.length)];
    navigate(`/mock/listening/${selected.id}`);
  };

  // Band Calculator State
  const [rawScore, setRawScore] = useState(30);

  // Convert raw 0-40 score to IELTS Band (Listening/Reading Academic scale)
  const calculatedBand = useMemo(() => {
    const score = Number(rawScore);
    if (score >= 39) return "9.0";
    if (score >= 37) return "8.5";
    if (score >= 35) return "8.0";
    if (score >= 33) return "7.5";
    if (score >= 30) return "7.0";
    if (score >= 27) return "6.5";
    if (score >= 23) return "6.0";
    if (score >= 19) return "5.5";
    if (score >= 15) return "5.0";
    if (score >= 13) return "4.5";
    if (score >= 10) return "4.0";
    return "3.5";
  }, [rawScore]);

  const cefrLevel = useMemo(() => {
    const band = parseFloat(calculatedBand);
    if (band >= 8.5) return "C2 (Mastery)";
    if (band >= 7.0) return "C1 (Effective Operational Proficiency)";
    if (band >= 5.5) return "B2 (Vantage / Upper Intermediate)";
    if (band >= 4.0) return "B1 (Threshold / Intermediate)";
    return "A2 (Waystage)";
  }, [calculatedBand]);

  const coreSkills = [
    {
      title: "📖 Reading Module",
      desc: "3 Full Passages (700–900 words each), 40 Questions total across Multiple Choice, True/False/Not Given, Matching Headings, Summary Completion.",
      path: "/reading",
      mockPath: "/mock-reading",
      color: "#3b82f6",
      icon: BookOpen,
      specs: "60 Minutes | 40 Questions"
    },
    {
      title: "🎧 Listening Module",
      desc: "Listening content is precious and randomized to simulate authentic exam conditions.",
      path: "/listening",
      mockPath: "/mock/listening",
      isListening: true,
      color: "#06b6d4",
      icon: Headphones,
      specs: "30 Minutes + 10m Transfer | Randomized"
    },
    {
      title: "✍️ Writing Module",
      desc: "Task 1 (150 words min: Graph/Chart/Process report) & Task 2 (250 words min: Opinion Essay) evaluated by Groq AI on 4 IELTS Rubrics.",
      path: "/writing",
      mockPath: "/mock-writing",
      color: "#8b5cf6",
      icon: PenTool,
      specs: "60 Minutes | Task 1 & 2"
    },
    {
      title: "🗣️ Speaking Module",
      desc: "3-Part Simulated Examiner Interview (Part 1 Introduction, Part 2 Cue Card, Part 3 Discussion) with AI Voice Analysis.",
      path: "/speaking",
      mockPath: "/mock-speaking",
      color: "#10b981",
      icon: Mic,
      specs: "11–14 Mins | 3 Parts"
    }
  ];

  return (
    <div style={{
      minHeight: "100vh",
      background: "var(--bg)",
      color: "var(--text)",
      fontFamily: "Inter, sans-serif",
      padding: "40px 24px 80px",
      transition: "background 0.3s, color 0.3s"
    }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>

        {/* ── HERO BANNER ── */}
        <div style={{ marginBottom: "48px", position: "relative" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1.2fr 0.8fr", gap: 32, alignItems: "center", marginBottom: 36 }}>
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <span style={{
                background: "rgba(37,99,235,0.15)",
                color: "var(--primary)",
                border: "1px solid rgba(37,99,235,0.3)",
                padding: "6px 20px",
                borderRadius: "999px",
                fontSize: "13px",
                fontWeight: "800",
                letterSpacing: "0.5px",
                boxShadow: "0 0 20px rgba(37,99,235,0.15)",
                display: "inline-flex",
                alignItems: "center",
                gap: "8px"
              }}>
                <Sparkles size={15} /> OFFICIAL IELTS 2026 ACADEMIC &amp; GENERAL SIMULATION SUITE
              </span>

              <h1 style={{
                fontSize: "clamp(2.2rem, 4.5vw, 3.6rem)",
                fontWeight: 900,
                margin: "20px 0 16px",
                letterSpacing: "-1.5px",
                background: "linear-gradient(135deg, var(--text) 30%, var(--primary) 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent"
              }}>
                IELTS Hub
              </h1>
              <p style={{ color: "var(--text-secondary)", fontSize: "1.15rem", margin: "0 0 28px", lineHeight: "1.6" }}>
                Master all 4 IELTS Skills with <strong>Randomized Academic &amp; General Full Mocks</strong>, <strong>AI Task 1 &amp; Task 2 Evaluator</strong>, <strong>Voice Speaking Interviewer</strong>, and <strong>Live Band 0–9.0 Score Converter</strong>.
              </p>

              {/* Quick Navigation Action Buttons */}
              <div style={{ display: "flex", flexWrap: "wrap", gap: 14 }}>
                <button
                  onClick={() => navigate("/reading")}
                  className="glossy-btn"
                  style={{ background: "linear-gradient(135deg, #2563eb, #1d4ed8)", padding: "14px 24px", borderRadius: 16, border: "none", color: "#ffffff", fontWeight: 800, fontSize: 14, cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 8, boxShadow: "0 10px 25px rgba(37,99,235,0.3)" }}
                >
                  <BookOpen size={17} /> Practice Reading
                </button>
                <button
                  onClick={() => navigate("/listening")}
                  className="glossy-btn"
                  style={{ background: "linear-gradient(135deg, #06b6d4, #0891b2)", padding: "14px 24px", borderRadius: 16, border: "none", color: "#ffffff", fontWeight: 800, fontSize: 14, cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 8, boxShadow: "0 10px 25px rgba(6,182,212,0.3)" }}
                >
                  <Headphones size={17} /> Practice Listening
                </button>
                <button
                  onClick={() => navigate("/writing")}
                  className="glossy-btn"
                  style={{ background: "linear-gradient(135deg, #8b5cf6, #7c3aed)", padding: "14px 24px", borderRadius: 16, border: "none", color: "#ffffff", fontWeight: 800, fontSize: 14, cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 8, boxShadow: "0 10px 25px rgba(139,92,246,0.3)" }}
                >
                  <PenTool size={17} /> Practice Writing
                </button>
                <button
                  onClick={() => navigate("/speaking")}
                  className="glossy-btn"
                  style={{ background: "linear-gradient(135deg, #10b981, #059669)", padding: "14px 24px", borderRadius: 16, border: "none", color: "#ffffff", fontWeight: 800, fontSize: 14, cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 8, boxShadow: "0 10px 25px rgba(16,185,129,0.3)" }}
                >
                  <Mic size={17} /> Practice Speaking
                </button>
              </div>
            </motion.div>

            {/* Decorative Card */}
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 }} style={{ textAlign: "center", position: "relative" }}>
              <div className="glossy-card" style={{ padding: 32, textAlign: "left" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
                  <Award size={24} color="#3b82f6" />
                  <div>
                    <div style={{ fontSize: 13, color: "var(--text-secondary)", fontWeight: 700, textTransform: "uppercase" }}>Target IELTS Scale</div>
                    <div style={{ fontSize: 24, fontWeight: 900, color: "var(--text)" }}>Band 0 – 9.0</div>
                  </div>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                  <div style={{ background: "rgba(37,99,235,0.08)", border: "1px solid rgba(37,99,235,0.2)", borderRadius: 16, padding: "14px 16px" }}>
                    <div style={{ fontSize: 12, color: "var(--text-secondary)", fontWeight: 700 }}>Academic Goal</div>
                    <div style={{ fontSize: 18, fontWeight: 900, color: "var(--primary)", marginTop: 4 }}>Band 7.5+</div>
                  </div>
                  <div style={{ background: "rgba(16,185,129,0.08)", border: "1px solid rgba(16,185,129,0.2)", borderRadius: 16, padding: "14px 16px" }}>
                    <div style={{ fontSize: 12, color: "var(--text-secondary)", fontWeight: 700 }}>General Goal</div>
                    <div style={{ fontSize: 18, fontWeight: 900, color: "#10b981", marginTop: 4 }}>CLB 9 / Band 8</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* ── 4 CORE SKILLS MODULE CARDS ── */}
          <div style={{ marginBottom: 48 }}>
            <h2 style={{ fontSize: 22, fontWeight: 800, marginBottom: 20, display: "flex", alignItems: "center", gap: 10 }}>
              <Zap size={20} color="var(--primary)" /> 4 Core IELTS Practice Modules
            </h2>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 20 }}>
              {coreSkills.map((sk) => {
                const Icon = sk.icon;
                return (
                  <motion.div
                    key={sk.title}
                    whileHover={{ y: -6 }}
                    className="glossy-card"
                    style={{ padding: 24, display: "flex", flexDirection: "column", justifyContent: "space-between" }}
                  >
                    <div>
                      <div style={{ width: 46, height: 46, borderRadius: 14, background: `${sk.color}18`, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 16 }}>
                        <Icon size={22} color={sk.color} />
                      </div>
                      <h3 style={{ fontSize: 18, fontWeight: 800, marginBottom: 8, color: "var(--text)" }}>{sk.title}</h3>
                      <p style={{ fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.6, marginBottom: 16 }}>{sk.desc}</p>
                    </div>

                    <div>
                      <div style={{ fontSize: 12, fontWeight: 700, color: sk.color, marginBottom: 14, background: `${sk.color}10`, padding: "4px 12px", borderRadius: 999, display: "inline-block" }}>
                        {sk.specs}
                      </div>

                      <div style={{ display: "flex", gap: 10 }}>
                        <button
                          onClick={() => navigate(sk.path)}
                          style={{ flex: 1, padding: "10px 14px", borderRadius: 12, border: "1px solid var(--border)", background: "var(--card)", color: "var(--text)", fontWeight: 700, fontSize: 13, cursor: "pointer" }}
                        >
                          Practice
                        </button>
                        <button
                          onClick={() => sk.isListening ? startRandomizedListening() : navigate(sk.mockPath)}
                          style={{ flex: 1, padding: "10px 14px", borderRadius: 12, border: "none", background: sk.color, color: "#ffffff", fontWeight: 700, fontSize: 13, cursor: "pointer" }}
                        >
                          Full Mock
                        </button>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* ── BAND CALCULATOR WIDGET ── */}
          <div className="glossy-card" style={{ padding: 28, marginBottom: 48 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
              <Calculator size={22} color="var(--primary)" />
              <div>
                <h3 style={{ fontSize: 18, fontWeight: 800, margin: 0 }}>Interactive IELTS Raw Marks to Band Calculator</h3>
                <p style={{ fontSize: 13, color: "var(--text-secondary)", margin: "2px 0 0" }}>Calculate official Reading/Listening band score estimates (0-40 marks)</p>
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1.2fr", gap: 24, alignItems: "center" }}>
              <div>
                <label style={{ fontSize: 13, fontWeight: 700, color: "var(--text-secondary)", display: "block", marginBottom: 8 }}>
                  Raw Correct Questions (0 – 40): <strong style={{ color: "var(--text)" }}>{rawScore} / 40</strong>
                </label>
                <input
                  type="range"
                  min="0"
                  max="40"
                  value={rawScore}
                  onChange={(e) => setRawScore(e.target.value)}
                  style={{ width: "100%", accentColor: "var(--primary)", cursor: "pointer" }}
                />
              </div>

              <div style={{ display: "flex", gap: 16, background: "rgba(37,99,235,0.06)", border: "1px solid rgba(37,99,235,0.2)", borderRadius: 18, padding: 18 }}>
                <div>
                  <div style={{ fontSize: 11, fontWeight: 700, color: "var(--text-secondary)", textTransform: "uppercase" }}>Estimated Band</div>
                  <div style={{ fontSize: 32, fontWeight: 900, color: "var(--primary)" }}>Band {calculatedBand}</div>
                </div>
                <div style={{ borderLeft: "1px solid var(--border)", paddingLeft: 16 }}>
                  <div style={{ fontSize: 11, fontWeight: 700, color: "var(--text-secondary)", textTransform: "uppercase" }}>CEFR Equivalent</div>
                  <div style={{ fontSize: 14, fontWeight: 800, color: "#10b981", marginTop: 6 }}>{cefrLevel}</div>
                </div>
              </div>
            </div>
          </div>

          {/* ── FULL MOCK EXAMINATION SELECTION (ACADEMIC & GENERAL TRAINING) ── */}
          <div>
            <h2 style={{ fontSize: 22, fontWeight: 800, marginBottom: 20, display: "flex", alignItems: "center", gap: 10 }}>
              <Sparkles size={20} color="var(--primary)" /> IELTS Full Simulation Mock Engines
            </h2>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 24 }}>
              {/* Academic Mock Card */}
              <motion.div
                whileHover={{ y: -6 }}
                className="glossy-card"
                style={{ padding: 28, display: "flex", flexDirection: "column", justifyContent: "space-between", borderLeft: "4px solid #2563eb" }}
              >
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                    <span style={{ fontSize: 12, fontWeight: 800, padding: "5px 14px", borderRadius: 999, background: "rgba(37,99,235,0.12)", color: "#2563eb", border: "1px solid rgba(37,99,235,0.3)" }}>
                      Academic Track
                    </span>
                    <span style={{ fontSize: 13, fontWeight: 700, color: "var(--text-secondary)" }}>2 Hrs 45 Mins</span>
                  </div>

                  <h3 style={{ fontSize: 20, fontWeight: 800, marginBottom: 10, color: "var(--text)" }}>
                    🎓 IELTS Academic Full Mock
                  </h3>

                  <p style={{ fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.7, marginBottom: 20 }}>
                    Generates a complete Academic examination pulling a <strong>random Academic Reading test</strong> (3 passages / 40 Qs), a <strong>random Listening test</strong> (4 audio sections / 40 Qs), a <strong>random Academic Writing test</strong> (Task 1 Report + Task 2 Essay), and a <strong>random Speaking interview</strong>.
                  </p>

                  <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 24 }}>
                    <span style={{ fontSize: 11, fontWeight: 700, padding: "4px 10px", borderRadius: 8, background: "rgba(37,99,235,0.08)", color: "#2563eb" }}>Academic Reading</span>
                    <span style={{ fontSize: 11, fontWeight: 700, padding: "4px 10px", borderRadius: 8, background: "rgba(37,99,235,0.08)", color: "#2563eb" }}>Task 1 Report</span>
                    <span style={{ fontSize: 11, fontWeight: 700, padding: "4px 10px", borderRadius: 8, background: "rgba(37,99,235,0.08)", color: "#2563eb" }}>AI Evaluation</span>
                  </div>
                </div>

                <button
                  onClick={() => navigate("/mock/academic")}
                  className="glossy-btn"
                  style={{ width: "100%", justifyContent: "center", padding: "14px 20px", borderRadius: 14, fontSize: 14, background: "linear-gradient(135deg, #2563eb, #1d4ed8)" }}
                >
                  Start Academic Mock Test <ArrowRight size={16} />
                </button>
              </motion.div>

              {/* General Training Mock Card */}
              <motion.div
                whileHover={{ y: -6 }}
                className="glossy-card"
                style={{ padding: 28, display: "flex", flexDirection: "column", justifyContent: "space-between", borderLeft: "4px solid #10b981" }}
              >
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                    <span style={{ fontSize: 12, fontWeight: 800, padding: "5px 14px", borderRadius: 999, background: "rgba(16,185,129,0.12)", color: "#10b981", border: "1px solid rgba(16,185,129,0.3)" }}>
                      General Training Track
                    </span>
                    <span style={{ fontSize: 13, fontWeight: 700, color: "var(--text-secondary)" }}>2 Hrs 45 Mins</span>
                  </div>

                  <h3 style={{ fontSize: 20, fontWeight: 800, marginBottom: 10, color: "var(--text)" }}>
                    💼 IELTS General Training Full Mock
                  </h3>

                  <p style={{ fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.7, marginBottom: 20 }}>
                    Generates a complete General Training examination pulling a <strong>random General Reading test</strong> (everyday/workplace texts), a <strong>random Listening test</strong> (4 audio sections / 40 Qs), a <strong>random General Writing test</strong> (Task 1 Letter + Task 2 Essay), and a <strong>random Speaking interview</strong>.
                  </p>

                  <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 24 }}>
                    <span style={{ fontSize: 11, fontWeight: 700, padding: "4px 10px", borderRadius: 8, background: "rgba(16,185,129,0.08)", color: "#10b981" }}>General Reading</span>
                    <span style={{ fontSize: 11, fontWeight: 700, padding: "4px 10px", borderRadius: 8, background: "rgba(16,185,129,0.08)", color: "#10b981" }}>Task 1 Letter</span>
                    <span style={{ fontSize: 11, fontWeight: 700, padding: "4px 10px", borderRadius: 8, background: "rgba(16,185,129,0.08)", color: "#10b981" }}>AI Evaluation</span>
                  </div>
                </div>

                <button
                  onClick={() => navigate("/mock/general")}
                  className="glossy-btn glossy-btn-emerald"
                  style={{ width: "100%", justifyContent: "center", padding: "14px 20px", borderRadius: 14, fontSize: 14 }}
                >
                  Start General Training Mock Test <ArrowRight size={16} />
                </button>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
