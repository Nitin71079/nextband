import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Sparkles, Zap, BookOpen, PenTool, ArrowRight, CheckCircle2,
  Calculator, Play, Layers, Clock, Award, Search, ChevronLeft, ChevronRight, ShieldCheck, TrendingUp, Star
} from "lucide-react";
import { greTests } from "../data/gre/greTests";
import { getQuantPercentile, getVerbalPercentile } from "../utils/greScoreCalculator";
import ExamTrackHeaderSwitcher from "../components/ExamTrackHeaderSwitcher";
import FloatingDanglerPill from "../components/FloatingDanglerPill";

export default function GRECenter() {
  const navigate = useNavigate();
  const [quantScore, setQuantScore] = useState(165);
  const [verbalScore, setVerbalScore] = useState(160);

  // Search & Pagination State
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  const quantPct = getQuantPercentile(quantScore);
  const verbalPct = getVerbalPercentile(verbalScore);

  const filteredTests = useMemo(() => {
    return greTests.filter((test) => {
      const query = searchQuery.toLowerCase().trim();
      return !query || test.title.toLowerCase().includes(query);
    });
  }, [searchQuery]);

  const totalPages = Math.max(1, Math.ceil(filteredTests.length / itemsPerPage));
  const pagedTests = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredTests.slice(start, start + itemsPerPage);
  }, [filteredTests, currentPage]);

  const sections = [
    {
      title: "⚡ Quantitative Reasoning",
      score: "130 – 170 Scale",
      timing: "2 Sections (12 Q / 21 min & 15 Q / 26 min)",
      color: "#38bdf8",
      topics: [
        "Quantitative Comparison (Quantity A vs Quantity B)",
        "Multiple Choice — Select One Answer",
        "Multiple Choice — Select One or More Answers",
        "Numeric Entry (Fractions & Decimals)",
        "Data Interpretation Sets (Tables, Bar & Line Graphs)"
      ]
    },
    {
      title: "📖 Verbal Reasoning",
      score: "130 – 170 Scale",
      timing: "2 Sections (12 Q / 18 min & 15 Q / 23 min)",
      color: "#f59e0b",
      topics: [
        "Text Completion (1, 2, and 3 Blanks - All-or-Nothing Rule)",
        "Sentence Equivalence (Must Select 2 Choices)",
        "Reading Comprehension (Single, Multiple & Select-in-Passage)"
      ]
    },
    {
      title: "✍️ Analytical Writing",
      score: "0 – 6.0 Scale (0.5 Increments)",
      timing: "1 Task (30 Minutes)",
      color: "#ec4899",
      topics: [
        "Analyze an Issue Essay (30 min)",
        "Groq AI Llama 3.3 Essay Reader Evaluation",
        "Critical Thinking, Argument Support & Coherence",
        "Note: No Analyze an Argument task in current 2026 format"
      ]
    }
  ];

  return (
    <div style={{ minHeight: "100vh", background: "radial-gradient(circle at 50% 0%, #78350f 0%, #0f172a 70%)", color: "#ffffff", fontFamily: "Inter, sans-serif", padding: "40px 24px 80px" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>

        {/* ── EXAM TRACK SWITCHER ── */}
        <ExamTrackHeaderSwitcher />

        {/* ── HERO BANNER ── */}
        <div style={{ marginBottom: "48px", position: "relative" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1.2fr 0.8fr", gap: 32, alignItems: "center", marginBottom: 36 }}>
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <span style={{ background: "rgba(245,158,11,0.2)", color: "#facc15", border: "1px solid rgba(250,204,21,0.3)", padding: "6px 20px", borderRadius: "999px", fontSize: "13px", fontWeight: "800", letterSpacing: "0.5px", boxShadow: "0 0 20px rgba(245,158,11,0.2)", display: "inline-flex", alignItems: "center", gap: "8px" }}>
                <Sparkles size={15} color="#facc15" /> OFFICIAL GRE GENERAL TEST 2026 (130 - 170 SCALED SUITE)
              </span>

              <h1 style={{ fontSize: "clamp(2.2rem, 4.5vw, 3.6rem)", fontWeight: 900, margin: "20px 0 16px", letterSpacing: "-1.5px", background: "linear-gradient(135deg, #ffffff 30%, #facc15 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                GRE General Test 2026 Practice &amp; AI Engine
              </h1>
              <p style={{ color: "#94a3b8", fontSize: "1.15rem", margin: "0 0 28px", lineHeight: "1.6" }}>
                Master the official computer-adaptive GRE General Test (~1h 58m) featuring <strong>55 questions + 1 Analytical Writing essay</strong>, section-level adaptive routing, on-screen Quant calculator, and instant <strong>Groq AI Llama 3.3</strong> essay grading.
              </p>
            </motion.div>

            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 }} style={{ textAlign: "center", position: "relative", display: "inline-block" }}>
              <FloatingDanglerPill
                icon={TrendingUp}
                value="330+ Score"
                label="Target Scaled Score"
                variant="light"
                iconBg="rgba(245, 158, 11, 0.15)"
                iconColor="#d97706"
                floatDelay={0}
                style={{ position: "absolute", top: -10, right: -15 }}
              />

              <FloatingDanglerPill
                icon={Star}
                value="99.2 %ile"
                label="Quant Percentile Rank"
                variant="light"
                iconBg="rgba(56, 189, 248, 0.15)"
                iconColor="#0284c7"
                floatDelay={1.5}
                style={{ position: "absolute", bottom: 20, left: -15 }}
              />

              <img
                src="/src/assets/images/gre_hero_banner.png"
                alt="3D GRE General Prep Banner"
                style={{ width: "100%", maxWidth: 400, borderRadius: 24, filter: "drop-shadow(0 15px 35px rgba(245, 158, 11, 0.4))", border: "1px solid rgba(255,255,255,0.15)" }}
              />
            </motion.div>
          </div>

          {/* Quick Metrics Bar */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 14, maxWidth: "900px", margin: "0 auto 36px" }}>
            {[
              { label: "Scored Tasks per Mock", val: "55 Qs + 1 Essay", color: "#facc15", icon: Layers },
              { label: "Quant & Verbal Scale", val: "130 – 170 Scale", color: "#38bdf8", icon: Award },
              { label: "Adaptive Model", val: "Section-Level Adaptive", color: "#4ade80", icon: Zap },
              { label: "AI Essay Reader", val: "Groq Llama 3.3 (0–6)", color: "#ec4899", icon: PenTool },
            ].map((stat, idx) => {
              const IconComp = stat.icon;
              return (
                <div key={idx} style={{ background: "rgba(30,41,59,0.7)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 16, padding: "14px 18px", display: "flex", alignItems: "center", gap: 12, backdropFilter: "blur(10px)" }}>
                  <div style={{ width: 40, height: 40, borderRadius: 12, background: `rgba(${stat.color === "#facc15" ? "250,204,21" : stat.color === "#38bdf8" ? "56,189,248" : stat.color === "#4ade80" ? "74,222,128" : "236,72,153"}, 0.15)`, display: "flex", alignItems: "center", justifyContent: "center", color: stat.color }}>
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
                const randomId = Math.floor(Math.random() * greTests.length) + 1;
                navigate(`/gre/test/gre-full-${randomId}`);
              }}
              style={{
                background: "linear-gradient(135deg, #d97706, #b45309)",
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
                boxShadow: "0 12px 30px rgba(217, 119, 6, 0.4)",
              }}
            >
              <Play size={20} fill="#ffffff" /> 🎲 Launch Random GRE Simulation Mock (1–100)
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
              <Calculator size={18} /> Percentile Converter
            </a>
          </div>
        </div>

        {/* ── 3 CORE GRE SECTIONS OVERVIEW ── */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 20, marginBottom: 56 }}>
          {sections.map((sec) => (
            <div key={sec.title} style={{ background: "rgba(30,41,59,0.75)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 24, padding: 26, backdropFilter: "blur(12px)", boxShadow: "0 10px 30px rgba(0,0,0,0.2)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                <span style={{ fontSize: 12, fontWeight: 900, color: sec.color, background: "rgba(255,255,255,0.06)", padding: "4px 10px", borderRadius: 8 }}>{sec.score}</span>
              </div>
              <h3 style={{ fontSize: 20, fontWeight: 900, margin: "0 0 6px 0", color: "#ffffff" }}>{sec.title}</h3>
              <div style={{ fontSize: 13, color: "#cbd5e1", marginBottom: 14, fontWeight: 600 }}>{sec.timing}</div>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, fontSize: 13, color: "#94a3b8", display: "flex", flexDirection: "column", gap: 8 }}>
                {sec.topics.map((t, idx) => (
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
                <Layers size={24} color="#facc15" />
                <h2 style={{ fontSize: 24, fontWeight: 900, margin: 0, color: "#ffffff" }}>
                  Official GRE General 2026 Simulation Mocks
                </h2>
              </div>
              <p style={{ fontSize: 14, color: "#94a3b8", margin: "4px 0 0 0" }}>
                Showing {filteredTests.length} full simulation tests (55 questions + 1 essay each)
              </p>
            </div>

            {/* Search Bar */}
            <div style={{ position: "relative", minWidth: 280, flex: 1, maxWidth: 400 }}>
              <Search size={18} color="#94a3b8" style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)" }} />
              <input
                type="text"
                placeholder="Search GRE mock tests..."
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
                      <span style={{ background: "rgba(245,158,11,0.2)", color: "#facc15", border: "1px solid rgba(250,204,21,0.3)", padding: "4px 12px", borderRadius: 8, fontSize: 12, fontWeight: 900 }}>
                        GRE MOCK #{testNum}
                      </span>
                      <span style={{ fontSize: 12, color: "#94a3b8", display: "inline-flex", alignItems: "center", gap: 4, fontWeight: 700 }}>
                        <Clock size={13} /> ~1h 58m (55 Qs + 1 Essay)
                      </span>
                    </div>

                    <h3 style={{ fontSize: 18, fontWeight: 800, color: "#ffffff", margin: "0 0 6px 0" }}>{t.title}</h3>
                    <p style={{ fontSize: 13, color: "#cbd5e1", margin: "0 0 16px 0", lineHeight: 1.5 }}>
                      Section-Adaptive Quant &amp; Verbal · On-Screen Calculator · Groq AI Llama 3.3 Essay Evaluation
                    </p>
                  </div>

                  <button
                    onClick={() => navigate(`/gre/test/${t.id}`)}
                    style={{ width: "100%", background: "linear-gradient(135deg, #d97706, #b45309)", color: "#ffffff", border: "none", borderRadius: 14, padding: "12px", fontWeight: 800, fontSize: 14, cursor: "pointer", display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 8, boxShadow: "0 4px 14px rgba(217,119,6,0.35)" }}
                  >
                    <Play size={16} fill="#ffffff" /> Launch GRE General Simulation #{testNum}
                  </button>
                </motion.div>
              );
            })}
          </div>

          {/* ── PAGINATION CONTROLS ── */}
          {totalPages > 1 && (
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12, borderTop: "1px solid rgba(255,255,255,0.1)", paddingTop: 24, marginTop: 24 }}>
              <div style={{ fontSize: 13, color: "#94a3b8", fontWeight: 700 }}>
                Page <strong style={{ color: "#facc15" }}>{currentPage}</strong> of <strong style={{ color: "#ffffff" }}>{totalPages}</strong> ({filteredTests.length} Total Tests Available)
              </div>

              <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                <button
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                  style={{
                    background: currentPage === 1 ? "rgba(255,255,255,0.04)" : "rgba(245,158,11,0.2)",
                    color: currentPage === 1 ? "#64748b" : "#facc15",
                    border: currentPage === 1 ? "1px solid rgba(255,255,255,0.08)" : "1px solid rgba(245,158,11,0.4)",
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

                {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                  <button
                    key={pageNum}
                    onClick={() => setCurrentPage(pageNum)}
                    style={{
                      background: currentPage === pageNum ? "linear-gradient(135deg, #d97706, #b45309)" : "rgba(255,255,255,0.06)",
                      color: "#ffffff",
                      border: currentPage === pageNum ? "1px solid #facc15" : "1px solid rgba(255,255,255,0.1)",
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
                ))}

                <button
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                  style={{
                    background: currentPage === totalPages ? "rgba(255,255,255,0.04)" : "rgba(245,158,11,0.2)",
                    color: currentPage === totalPages ? "#64748b" : "#facc15",
                    border: currentPage === totalPages ? "1px solid rgba(255,255,255,0.08)" : "1px solid rgba(245,158,11,0.4)",
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

        {/* ── SCORE & PERCENTILE CONVERTER TOOL ── */}
        <div id="score-converter" style={{ background: "rgba(30,41,59,0.85)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 28, padding: 36, marginBottom: 48, boxShadow: "0 12px 40px rgba(0,0,0,0.3)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 24 }}>
            <div style={{ width: 48, height: 48, borderRadius: 14, background: "rgba(245,158,11,0.2)", display: "flex", alignItems: "center", justifyContent: "center", color: "#facc15" }}>
              <Calculator size={24} />
            </div>
            <div>
              <h2 style={{ fontSize: 22, fontWeight: 900, margin: 0 }}>Official GRE Score &amp; Percentile Converter</h2>
              <p style={{ fontSize: 14, color: "#94a3b8", margin: 0 }}>Map Quantitative &amp; Verbal scores (130–170) to official ETS percentile ranks</p>
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32, marginBottom: 28 }}>
            {/* Quant Slider */}
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                <span style={{ fontSize: 14, fontWeight: 800, color: "#cbd5e1" }}>Quantitative Score:</span>
                <span style={{ fontSize: 24, fontWeight: 900, color: "#38bdf8" }}>{quantScore} / 170</span>
              </div>
              <input
                type="range" min="130" max="170" step="1" value={quantScore}
                onChange={(e) => setQuantScore(parseInt(e.target.value, 10))}
                style={{ width: "100%", accentColor: "#38bdf8", height: 8, cursor: "pointer" }}
              />
              <div style={{ fontSize: 13, color: "#94a3b8", marginTop: 6, fontWeight: 700 }}>
                Quant Percentile: <strong style={{ color: "#38bdf8" }}>{quantPct}th Percentile</strong>
              </div>
            </div>

            {/* Verbal Slider */}
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                <span style={{ fontSize: 14, fontWeight: 800, color: "#cbd5e1" }}>Verbal Score:</span>
                <span style={{ fontSize: 24, fontWeight: 900, color: "#facc15" }}>{verbalScore} / 170</span>
              </div>
              <input
                type="range" min="130" max="170" step="1" value={verbalScore}
                onChange={(e) => setVerbalScore(parseInt(e.target.value, 10))}
                style={{ width: "100%", accentColor: "#facc15", height: 8, cursor: "pointer" }}
              />
              <div style={{ fontSize: 13, color: "#94a3b8", marginTop: 6, fontWeight: 700 }}>
                Verbal Percentile: <strong style={{ color: "#facc15" }}>{verbalPct}th Percentile</strong>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
