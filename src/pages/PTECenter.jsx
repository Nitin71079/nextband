import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles, BrainCircuit, Headphones, BookOpen, Mic, PenTool,
  ArrowRight, CheckCircle2, Calculator, Play, Layers, Clock, ShieldCheck,
  HelpCircle, Search, Filter, ChevronLeft, ChevronRight, Award, Zap, Users, MessageSquare, TrendingUp, Star
} from "lucide-react";
import { pteTests } from "../data/pte/pteTests";
import { pteToIelts, pteToCEFR } from "../utils/pteScoreCalculator";
import FloatingDanglerPill from "../components/FloatingDanglerPill";

export default function PTECenter() {
  const navigate = useNavigate();
  const [selectedScore, setSelectedScore] = useState(65);
  
  // Search & Pagination State
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  const ieltsEquiv = pteToIelts(selectedScore);
  const cefrEquiv = pteToCEFR(selectedScore);

  const filteredTests = useMemo(() => {
    return pteTests.filter((test) => {
      const query = searchQuery.toLowerCase().trim();
      return !query || test.title.toLowerCase().includes(query) || test.format.toLowerCase().includes(query);
    });
  }, [searchQuery]);

  const totalPages = Math.max(1, Math.ceil(filteredTests.length / itemsPerPage));
  const pagedTests = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredTests.slice(start, start + itemsPerPage);
  }, [filteredTests, currentPage]);

  const skills = [
    {
      title: "🎙️ Speaking",
      time: "76–84 min",
      items: "8 Task Types (Read Aloud, Repeat Sentence, Describe Image, Retell Lecture, Answer Short Question, Summarize Discussion, Respond Situation)",
      adaptive: "⚡ Automated Scoring",
      color: "#10b981",
      tasks: [
        "Read Aloud (6 items)",
        "Repeat Sentence (10 items)",
        "Describe Image (5 items)",
        "Retell Lecture (2 items)",
        "Summarize Group Discussion (2 items - NEW 2026 Task)",
        "Respond to a Situation (2 items - NEW 2026 Task)"
      ]
    },
    {
      title: "✍️ Writing",
      time: "Integrated in Part 1",
      items: "2 Task Types (Summarize Written Text, Write Essay)",
      adaptive: "⚡ Automated Scoring",
      color: "#f59e0b",
      tasks: [
        "Summarize Written Text (2 items - 10 min each, 5-75 words ONE sentence)",
        "Write Essay (1 item - 20 min, 200-300 words)"
      ]
    },
    {
      title: "📖 Reading",
      time: "23–30 min",
      items: "15 Task Instances (5 Task Types)",
      adaptive: "✅ Linear Fixed Form",
      color: "#38bdf8",
      tasks: [
        "Fill in the Blanks — Dropdown (5 items)",
        "Multiple Choice — Multiple Answers (2 items - Negative Scoring)",
        "Reorder Paragraph (2 items - Sequence Partial Credit)",
        "Fill in the Blanks — Drag and Drop (4 items)",
        "Multiple Choice — Single Answer (2 items)"
      ]
    },
    {
      title: "🎧 Listening",
      time: "31–39 min",
      items: "15 Task Instances (8 Task Types)",
      adaptive: "✅ Linear Fixed Form",
      color: "#c084fc",
      tasks: [
        "Summarize Spoken Text (1 item - 10 min, 50-70 words)",
        "Multiple Choice — Multiple Answers (2 items - Negative Scoring)",
        "Fill in the Blanks — Type In (2 items)",
        "Highlight Correct Summary (2 items)",
        "Select Missing Word (1 item - Beep ending)",
        "Highlight Incorrect Words (2 items - Negative Scoring)",
        "Write from Dictation (3 items)"
      ]
    }
  ];

  return (
    <div style={{ minHeight: "100vh", background: "radial-gradient(circle at 50% 0%, #1e1b4b 0%, #0f172a 70%)", color: "#ffffff", fontFamily: "Inter, sans-serif", padding: "40px 24px 80px" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        
        {/* ── HERO BANNER ── */}
        <div style={{ marginBottom: "48px", position: "relative" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1.2fr 0.8fr", gap: 32, alignItems: "center", marginBottom: 36 }}>
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <span style={{ background: "rgba(139,92,246,0.2)", color: "#c084fc", border: "1px solid rgba(192,132,252,0.3)", padding: "6px 20px", borderRadius: "999px", fontSize: "13px", fontWeight: "800", letterSpacing: "0.5px", boxShadow: "0 0 20px rgba(168,85,247,0.2)", display: "inline-flex", alignItems: "center", gap: "8px" }}>
                <Sparkles size={15} color="#c084fc" /> OFFICIAL 2026 PTE ACADEMIC &amp; UKVI SUITE (10 – 90 SCALE)
              </span>

              <h1 style={{ fontSize: "clamp(2.2rem, 4.5vw, 3.6rem)", fontWeight: 900, margin: "20px 0 16px", letterSpacing: "-1.5px", background: "linear-gradient(135deg, #ffffff 30%, #c084fc 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                PTE Academic 2026 Practice &amp; AI Engine
              </h1>
              <p style={{ color: "#94a3b8", fontSize: "1.15rem", margin: "0 0 28px", lineHeight: "1.6" }}>
                Master the official 2026 Pearson PTE Academic exam featuring <strong>65 scored task instances</strong> per test—including the 2 new tasks: <strong>Summarize Group Discussion</strong> and <strong>Respond to a Situation</strong>, with instant <strong>Groq AI Llama 3.3</strong> rubric scoring.
              </p>
            </motion.div>

            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 }} style={{ textAlign: "center", position: "relative", display: "inline-block" }}>
              <FloatingDanglerPill
                icon={TrendingUp}
                value="89+ Score"
                label="Target Overall Score"
                variant="light"
                iconBg="rgba(192, 132, 252, 0.15)"
                iconColor="#9333ea"
                floatDelay={0}
                style={{ position: "absolute", top: -10, right: -15 }}
              />

              <FloatingDanglerPill
                icon={Star}
                value="98%"
                label="Candidate Pass Rate"
                variant="light"
                iconBg="rgba(56, 189, 248, 0.15)"
                iconColor="#0284c7"
                floatDelay={1.5}
                style={{ position: "absolute", bottom: 20, left: -15 }}
              />

              <img
                src="/src/assets/images/pte_hero_banner.png"
                alt="3D PTE Academic Prep Banner"
                style={{ width: "100%", maxWidth: 400, borderRadius: 24, filter: "drop-shadow(0 15px 35px rgba(192, 132, 252, 0.4))", border: "1px solid rgba(255,255,255,0.15)" }}
              />
            </motion.div>
          </div>

          {/* Quick Metrics Bar */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 14, maxWidth: "900px", margin: "0 auto 36px" }}>
            {[
              { label: "Scored Tasks per Mock", val: "65 Tasks", color: "#38bdf8", icon: Layers },
              { label: "PTE Score Scale", val: "10 – 90 Scale", color: "#c084fc", icon: Award },
              { label: "New 2026 Tasks", val: "Group Discussion & Situation", color: "#facc15", icon: Users },
              { label: "AI Scoring Engine", val: "Groq Llama 3.3", color: "#4ade80", icon: Zap },
            ].map((stat, idx) => {
              const IconComp = stat.icon;
              return (
                <div key={idx} style={{ background: "rgba(30,41,59,0.7)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 16, padding: "14px 18px", display: "flex", alignItems: "center", gap: 12, backdropFilter: "blur(10px)" }}>
                  <div style={{ width: 40, height: 40, borderRadius: 12, background: `rgba(${stat.color === "#38bdf8" ? "56,189,248" : stat.color === "#c084fc" ? "192,132,252" : stat.color === "#facc15" ? "250,204,21" : "74,222,128"}, 0.15)`, display: "flex", alignItems: "center", justifyContent: "center", color: stat.color }}>
                    <IconComp size={20} />
                  </div>
                  <div style={{ textAlign: "left" }}>
                    <div style={{ fontSize: 11, color: "#94a3b8", fontWeight: 700, textTransform: "uppercase" }}>{stat.label}</div>
                    <div style={{ fontSize: 15, fontWeight: 900, color: "#ffffff", marginTop: 2 }}>{stat.val}</div>
                  </div>
                </div>
              );
            })}
          </div>

          <div style={{ display: "flex", justifyContent: "center", gap: 16, flexWrap: "wrap" }}>
            <button
              onClick={() => {
                const randomId = Math.floor(Math.random() * pteTests.length) + 1;
                navigate(`/pte/test/pte-full-${randomId}`);
              }}
              style={{
                background: "linear-gradient(135deg, #7c3aed, #2563eb)",
                color: "#ffffff",
                border: "none",
                borderRadius: "16px",
                padding: "16px 32px",
                fontSize: "16px",
                fontWeight: "800",
                cursor: "pointer",
                display: "inline-flex",
                alignItems: "center",
                gap: "12px",
                boxShadow: "0 12px 30px rgba(124, 58, 237, 0.4)",
              }}
            >
              <Play size={20} fill="#ffffff" /> 🎲 Launch Random PTE Simulation Mock (1–5)
            </button>
            <a
              href="#score-converter"
              style={{
                background: "rgba(255,255,255,0.08)",
                color: "#ffffff",
                border: "1px solid rgba(255,255,255,0.2)",
                borderRadius: "16px",
                padding: "16px 28px",
                fontSize: "15px",
                fontWeight: "700",
                textDecoration: "none",
                display: "inline-flex",
                alignItems: "center",
                gap: "10px",
              }}
            >
              <Calculator size={18} /> Score Converter (10 – 90)
            </a>
          </div>
        </div>

        {/* ── 4 COMMUNICATIVE SKILLS SUMMARY GRID ── */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "20px", marginBottom: "56px" }}>
          {skills.map((sec) => (
            <div key={sec.title} style={{ background: "rgba(30,41,59,0.75)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: "24px", padding: "24px", backdropFilter: "blur(12px)", boxShadow: "0 10px 30px rgba(0,0,0,0.2)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                <span style={{ fontSize: 12, fontWeight: 800, color: sec.color, background: `rgba(255,255,255,0.06)`, padding: "3px 10px", borderRadius: 6 }}>{sec.adaptive}</span>
                <span style={{ fontSize: 12, color: "#94a3b8", fontWeight: 700 }}>{sec.time}</span>
              </div>
              <h3 style={{ fontSize: 18, fontWeight: 900, margin: "0 0 8px 0", color: "#ffffff" }}>{sec.title}</h3>
              <div style={{ fontSize: 13, color: "#cbd5e1", marginBottom: 14, fontWeight: 600 }}>{sec.items}</div>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, fontSize: 13, color: "#94a3b8", display: "flex", flexDirection: "column", gap: 8 }}>
                {sec.tasks.map((t, idx) => (
                  <li key={idx} style={{ display: "flex", alignItems: "flex-start", gap: 8, lineHeight: 1.4 }}>
                    <CheckCircle2 size={15} color={sec.color} style={{ marginTop: 2, flexShrink: 0 }} />
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* ── MOCK EXAMS EXPLORER ── */}
        <div style={{ background: "rgba(30,41,59,0.8)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 28, padding: 32, marginBottom: 48, boxShadow: "0 12px 40px rgba(0,0,0,0.3)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16, marginBottom: 24 }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <Layers size={24} color="#c084fc" />
                <h2 style={{ fontSize: 24, fontWeight: 900, margin: 0, color: "#ffffff" }}>
                  Official PTE Academic 2026 Simulation Mocks
                </h2>
              </div>
              <p style={{ fontSize: 14, color: "#94a3b8", margin: "4px 0 0 0" }}>
                Showing {filteredTests.length} full simulation tests (65 scored task instances each)
              </p>
            </div>

            {/* Search Bar */}
            <div style={{ position: "relative", minWidth: 280, flex: 1, maxWidth: 400 }}>
              <Search size={18} color="#94a3b8" style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)" }} />
              <input
                type="text"
                placeholder="Search PTE mock tests..."
                value={searchQuery}
                onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
                style={{ width: "100%", background: "#0f172a", border: "1px solid rgba(255,255,255,0.15)", borderRadius: 14, padding: "12px 14px 12px 42px", color: "#ffffff", fontSize: 14, outline: "none" }}
              />
            </div>
          </div>

          {/* Test Cards Grid */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 20, marginBottom: 32 }}>
            {pagedTests.map((t, idx) => {
              const testNum = (currentPage - 1) * itemsPerPage + idx + 1;
              return (
                <motion.div
                  key={t.id}
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.2 }}
                  style={{ background: "rgba(15,23,42,0.85)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 22, padding: 24, display: "flex", flexDirection: "column", justifyContent: "space-between", boxShadow: "0 8px 25px rgba(0,0,0,0.25)" }}
                >
                  <div>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                      <span style={{ background: "rgba(124,58,237,0.2)", color: "#c084fc", border: "1px solid rgba(192,132,252,0.3)", padding: "4px 12px", borderRadius: 8, fontSize: 12, fontWeight: 900 }}>
                        PTE MOCK #{testNum}
                      </span>
                      <span style={{ fontSize: 12, color: "#94a3b8", display: "inline-flex", alignItems: "center", gap: 4, fontWeight: 700 }}>
                        <Clock size={13} /> ~2 Hours (65 Tasks)
                      </span>
                    </div>

                    <h3 style={{ fontSize: 18, fontWeight: 800, color: "#ffffff", margin: "0 0 6px 0" }}>{t.title}</h3>
                    <p style={{ fontSize: 13, color: "#cbd5e1", margin: "0 0 16px 0", lineHeight: 1.5 }}>
                      Full 2026 Enhanced Blueprint · Speaking, Writing, Reading &amp; Listening + Groq AI Llama 3.3 Evaluation
                    </p>
                  </div>

                  <button
                    onClick={() => navigate(`/pte/test/${t.id}`)}
                    style={{ width: "100%", background: "linear-gradient(135deg, #7c3aed, #2563eb)", color: "#ffffff", border: "none", borderRadius: 14, padding: "12px", fontWeight: 800, fontSize: 14, cursor: "pointer", display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 8, boxShadow: "0 4px 14px rgba(124,58,237,0.35)" }}
                  >
                    <Play size={16} fill="#ffffff" /> Launch PTE Academic Simulation #{testNum}
                  </button>
                </motion.div>
              );
            })}
          </div>

          {/* ── PAGINATION CONTROLS ── */}
          {totalPages > 1 && (
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12, borderTop: "1px solid rgba(255,255,255,0.1)", paddingTop: 24, marginTop: 24 }}>
              <div style={{ fontSize: 13, color: "#94a3b8", fontWeight: 700 }}>
                Page <strong style={{ color: "#c084fc" }}>{currentPage}</strong> of <strong style={{ color: "#ffffff" }}>{totalPages}</strong> ({filteredTests.length} Total Tests Available)
              </div>

              <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                <button
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                  style={{
                    background: currentPage === 1 ? "rgba(255,255,255,0.04)" : "rgba(124,58,237,0.2)",
                    color: currentPage === 1 ? "#64748b" : "#c084fc",
                    border: currentPage === 1 ? "1px solid rgba(255,255,255,0.08)" : "1px solid rgba(192,132,252,0.4)",
                    borderRadius: 12,
                    padding: "8px 16px",
                    fontWeight: 800,
                    fontSize: 13,
                    cursor: currentPage === 1 ? "not-allowed" : "pointer",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 6
                  }}
                >
                  <ChevronLeft size={16} /> Previous
                </button>

                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  let pageNum = currentPage;
                  if (currentPage <= 3) pageNum = i + 1;
                  else if (currentPage >= totalPages - 2) pageNum = totalPages - 4 + i;
                  else pageNum = currentPage - 2 + i;
                  if (pageNum < 1 || pageNum > totalPages) return null;

                  return (
                    <button
                      key={pageNum}
                      onClick={() => setCurrentPage(pageNum)}
                      style={{
                        background: currentPage === pageNum ? "#7c3aed" : "rgba(255,255,255,0.06)",
                        color: "#ffffff",
                        border: currentPage === pageNum ? "1px solid #c084fc" : "1px solid rgba(255,255,255,0.1)",
                        borderRadius: 10,
                        width: 36,
                        height: 36,
                        fontWeight: 800,
                        fontSize: 13,
                        cursor: "pointer"
                      }}
                    >
                      {pageNum}
                    </button>
                  );
                })}

                <button
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                  style={{
                    background: currentPage === totalPages ? "rgba(255,255,255,0.04)" : "rgba(124,58,237,0.2)",
                    color: currentPage === totalPages ? "#64748b" : "#c084fc",
                    border: currentPage === totalPages ? "1px solid rgba(255,255,255,0.08)" : "1px solid rgba(192,132,252,0.4)",
                    borderRadius: 12,
                    padding: "8px 16px",
                    fontWeight: 800,
                    fontSize: 13,
                    cursor: currentPage === totalPages ? "not-allowed" : "pointer",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 6
                  }}
                >
                  Next <ChevronRight size={16} />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* ── SCORE CONVERTER TOOL ── */}
        <div id="score-converter" style={{ background: "rgba(30,41,59,0.85)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 28, padding: 36, marginBottom: 48, boxShadow: "0 12px 40px rgba(0,0,0,0.3)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 24 }}>
            <div style={{ width: 48, height: 48, borderRadius: 14, background: "rgba(139,92,246,0.2)", display: "flex", alignItems: "center", justifyContent: "center", color: "#c084fc" }}>
              <Calculator size={24} />
            </div>
            <div>
              <h2 style={{ fontSize: 22, fontWeight: 900, margin: 0 }}>Official PTE Score Converter (10 – 90 Scale)</h2>
              <p style={{ fontSize: 14, color: "#94a3b8", margin: 0 }}>Map PTE Academic scores to IELTS Band (4.0–9.0), CEFR levels, and Australian/UK Visa targets</p>
            </div>
          </div>

          <div style={{ marginBottom: 28 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
              <span style={{ fontSize: 15, fontWeight: 800, color: "#cbd5e1" }}>Select PTE Academic Score:</span>
              <span style={{ fontSize: 32, fontWeight: 900, color: "#c084fc" }}>{selectedScore} / 90</span>
            </div>
            <input
              type="range"
              min="10"
              max="90"
              step="1"
              value={selectedScore}
              onChange={(e) => setSelectedScore(parseInt(e.target.value, 10))}
              style={{ width: "100%", accentColor: "#7c3aed", height: 10, cursor: "pointer" }}
            />
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 20 }}>
            <div style={{ background: "rgba(15,23,42,0.7)", padding: 20, borderRadius: 18, border: "1px solid rgba(255,255,255,0.08)" }}>
              <div style={{ fontSize: 12, color: "#94a3b8", textTransform: "uppercase", fontWeight: 800 }}>CEFR Level</div>
              <div style={{ fontSize: 22, fontWeight: 900, color: "#38bdf8", marginTop: 6 }}>{cefrEquiv}</div>
            </div>
            <div style={{ background: "rgba(15,23,42,0.7)", padding: 20, borderRadius: 18, border: "1px solid rgba(255,255,255,0.08)" }}>
              <div style={{ fontSize: 12, color: "#94a3b8", textTransform: "uppercase", fontWeight: 800 }}>IELTS Equivalent</div>
              <div style={{ fontSize: 22, fontWeight: 900, color: "#4ade80", marginTop: 6 }}>Band {ieltsEquiv}</div>
            </div>
            <div style={{ background: "rgba(15,23,42,0.7)", padding: 20, borderRadius: 18, border: "1px solid rgba(255,255,255,0.08)" }}>
              <div style={{ fontSize: 12, color: "#94a3b8", textTransform: "uppercase", fontWeight: 800 }}>Visa &amp; Admission Eligibility</div>
              <div style={{ fontSize: 18, fontWeight: 800, color: "#facc15", marginTop: 6 }}>
                {selectedScore >= 79 ? "Superior English (20 Australian PR Points) & Top Ivy League / Oxbridge" : selectedScore >= 65 ? "Proficient English (10 Australian PR Points) & Global Universities" : selectedScore >= 58 ? "Competent English & UK Student Visa Threshold" : "Pathway & Foundation Admission"}
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
