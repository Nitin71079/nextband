import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Sparkles, Zap, BookOpen, PenTool, ArrowRight, CheckCircle2,
  Calculator, Play, Layers, Clock, Award, Search, ChevronLeft, ChevronRight, ShieldCheck, TrendingUp, Star
} from "lucide-react";
import { actTests } from "../data/act/actTests";
import { calculateACTComposite } from "../utils/actScoreCalculator";
import FloatingDanglerPill from "../components/FloatingDanglerPill";

export default function ACTCenter() {
  const navigate = useNavigate();

  // Search, Pagination & Mode State
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedMode, setSelectedMode] = useState("complete"); // 'core', 'science', 'writing', 'complete'
  const itemsPerPage = 12;

  const filteredTests = useMemo(() => {
    return actTests.filter((test) => {
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
      title: "📖 English Section",
      score: "1–36 Scale",
      timing: "50 Questions (35 mins)",
      color: "#3b82f6",
      topics: [
        "Production of Writing (38–43%)",
        "Knowledge of Language (18–23%)",
        "Conventions of Standard English (38–43%)",
        "Passage Revision & Editing Decisions"
      ]
    },
    {
      title: "⚡ Mathematics Section",
      score: "1–36 Scale",
      timing: "45 Questions (50 mins)",
      color: "#10b981",
      topics: [
        "Number & Quantity, Algebra, Functions",
        "Geometry & Trigonometric Relationships",
        "Statistics, Probability & Data Modeling",
        "On-Screen Calculator Approved"
      ]
    },
    {
      title: "📚 Reading Section",
      score: "1–36 Scale",
      timing: "36 Questions (40 mins)",
      color: "#9333ea",
      topics: [
        "Key Ideas & Details (44–52%)",
        "Craft & Structure (26–33%)",
        "Integration of Knowledge & Ideas (19–26%)",
        "Prose Passages & Visual Data Charts"
      ]
    },
    {
      title: "🧪 Science Section (Optional)",
      score: "1–36 Scale",
      timing: "40 Questions (40 mins)",
      color: "#db2777",
      topics: [
        "Data Representation (Tables & Graphs)",
        "Research Summaries (Experiments & Variables)",
        "Conflicting Viewpoints (Hypotheses Analysis)",
        "NO CALCULATOR PERMITTED"
      ]
    }
  ];

  return (
    <div style={{ minHeight: "100vh", background: "radial-gradient(circle at 50% 0%, #0369a1 0%, #0f172a 70%)", color: "#ffffff", fontFamily: "Inter, sans-serif", padding: "40px 24px 80px" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>

        {/* ── HERO BANNER ── */}
        <div style={{ marginBottom: "48px", position: "relative" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1.2fr 0.8fr", gap: 32, alignItems: "center", marginBottom: 36 }}>
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <span style={{ background: "rgba(56,189,248,0.2)", color: "#38bdf8", border: "1px solid rgba(56,189,248,0.3)", padding: "6px 20px", borderRadius: "999px", fontSize: "13px", fontWeight: "800", letterSpacing: "0.5px", boxShadow: "0 0 20px rgba(56,189,248,0.2)", display: "inline-flex", alignItems: "center", gap: "8px" }}>
                <Sparkles size={15} color="#38bdf8" /> OFFICIAL ACT 2026 100-MOCK SUITE (1–36 SCALE)
              </span>

              <h1 style={{ fontSize: "clamp(2.2rem, 4.5vw, 3.6rem)", fontWeight: 900, margin: "20px 0 16px", letterSpacing: "-1.5px", background: "linear-gradient(135deg, #ffffff 30%, #38bdf8 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                ACT 2026 Examination &amp; AI Engine
              </h1>
              <p style={{ color: "#94a3b8", fontSize: "1.15rem", margin: "0 0 28px", lineHeight: "1.6" }}>
                Master all <strong>100 Full ACT Practice Tests</strong> built to official 2026 specifications—featuring <strong>English</strong> (50 Qs / 35m), <strong>Math</strong> (45 Qs / 50m), <strong>Reading</strong> (36 Qs / 40m), <strong>Optional Science</strong> (40 Qs / 40m), <strong>Optional Writing</strong> (1 Essay / 40m), and <strong>Groq AI Llama 3.3</strong> essay grading.
              </p>
            </motion.div>

            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 }} style={{ textAlign: "center", position: "relative", display: "inline-block" }}>
              
              {/* Decorative Floating Glass Danglers */}
              <FloatingDanglerPill
                icon={TrendingUp}
                value="+15 Pts"
                label="Predicted Growth"
                variant="light"
                iconBg="rgba(56, 189, 248, 0.15)"
                iconColor="#0284c7"
                floatDelay={0}
                style={{ position: "absolute", top: -10, right: -15 }}
              />

              <FloatingDanglerPill
                icon={Star}
                value="98%"
                label="Candidate Pass Rate"
                variant="light"
                iconBg="rgba(192, 132, 252, 0.15)"
                iconColor="#9333ea"
                floatDelay={1.5}
                style={{ position: "absolute", bottom: 20, left: -15 }}
              />

              <img
                src="/src/assets/images/dashboard_ai_hero.png"
                alt="3D ACT Prep Banner"
                style={{ width: "100%", maxWidth: 400, borderRadius: 24, filter: "drop-shadow(0 15px 35px rgba(2, 132, 199, 0.4))", border: "1px solid rgba(255,255,255,0.15)" }}
              />
            </motion.div>
          </div>

          {/* Quick Metrics Bar */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 14, maxWidth: "900px", margin: "0 auto 36px" }}>
            {[
              { label: "Full Practice Mocks", val: "100 Full Tests", color: "#38bdf8", icon: Layers },
              { label: "Core Scale Range", val: "1 – 36 Scale", color: "#c084fc", icon: Award },
              { label: "Optional Science", val: "40 Qs (No Calc)", color: "#facc15", icon: Clock },
              { label: "AI Essay Reader", val: "Groq Llama 3.3 (2–12)", color: "#4ade80", icon: PenTool },
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
                const randomId = Math.floor(Math.random() * actTests.length) + 1;
                navigate(`/act/test/act-full-${randomId}?mode=${selectedMode}`);
              }}
              style={{
                background: "linear-gradient(135deg, #0284c7, #7c3aed)",
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
                boxShadow: "0 12px 30px rgba(2, 132, 199, 0.4)",
              }}
            >
              <Play size={20} fill="#ffffff" /> 🎲 Launch Random ACT Simulation Mock (1–100)
            </button>
          </div>
        </div>

        {/* ── 4 SECTIONAL OVERVIEW ── */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 20, marginBottom: 56 }}>
          {sections.map((sec) => (
            <div key={sec.title} style={{ background: "rgba(30,41,59,0.75)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 24, padding: 24, backdropFilter: "blur(12px)", boxShadow: "0 10px 30px rgba(0,0,0,0.2)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                <span style={{ fontSize: 12, fontWeight: 900, color: sec.color, background: "rgba(255,255,255,0.06)", padding: "4px 10px", borderRadius: 8 }}>{sec.score}</span>
              </div>
              <h3 style={{ fontSize: 18, fontWeight: 900, margin: "0 0 6px 0", color: "#ffffff" }}>{sec.title}</h3>
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

        {/* ── MOCK EXAMS EXPLORER & MODE SELECTOR ── */}
        <div style={{ background: "rgba(30,41,59,0.8)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 28, padding: 32, marginBottom: 48, boxShadow: "0 12px 40px rgba(0,0,0,0.3)" }}>
          
          {/* Mode Selector Tabs */}
          <div style={{ display: "flex", gap: 10, marginBottom: 24, flexWrap: "wrap" }}>
            {[
              { id: "complete", title: "Complete ACT (Eng+Math+Read+Sci+Write)" },
              { id: "core", title: "Core ACT (Eng+Math+Read)" },
              { id: "science", title: "ACT + Science (Eng+Math+Read+Sci)" },
              { id: "writing", title: "ACT + Writing (Eng+Math+Read+Write)" }
            ].map((m) => (
              <button
                key={m.id}
                onClick={() => setSelectedMode(m.id)}
                style={{
                  background: selectedMode === m.id ? "linear-gradient(135deg, #0284c7, #7c3aed)" : "rgba(255,255,255,0.06)",
                  color: "#ffffff",
                  border: selectedMode === m.id ? "1px solid #38bdf8" : "1px solid rgba(255,255,255,0.1)",
                  borderRadius: 12,
                  padding: "10px 18px",
                  fontSize: 13,
                  fontWeight: 800,
                  cursor: "pointer"
                }}
              >
                {m.title}
              </button>
            ))}
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16, marginBottom: 24 }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <Layers size={24} color="#38bdf8" />
                <h2 style={{ fontSize: 24, fontWeight: 900, margin: 0, color: "#ffffff" }}>
                  Official ACT 2026 Simulation Mocks
                </h2>
              </div>
              <p style={{ fontSize: 14, color: "#94a3b8", margin: "4px 0 0 0" }}>
                Showing {filteredTests.length} full simulation tests
              </p>
            </div>

            {/* Search Bar */}
            <div style={{ position: "relative", minWidth: 280, flex: 1, maxWidth: 400 }}>
              <Search size={18} color="#94a3b8" style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)" }} />
              <input
                type="text"
                placeholder="Search ACT mock tests..."
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
                      <span style={{ background: "rgba(56,189,248,0.2)", color: "#38bdf8", border: "1px solid rgba(56,189,248,0.3)", padding: "4px 12px", borderRadius: 8, fontSize: 12, fontWeight: 900 }}>
                        ACT MOCK #{testNum}
                      </span>
                      <span style={{ fontSize: 12, color: "#94a3b8", display: "inline-flex", alignItems: "center", gap: 4, fontWeight: 700 }}>
                        <Clock size={13} /> {selectedMode === "core" ? "2h 05m" : selectedMode === "complete" ? "3h 25m" : "2h 45m"}
                      </span>
                    </div>

                    <h3 style={{ fontSize: 18, fontWeight: 800, color: "#ffffff", margin: "0 0 6px 0" }}>{t.title}</h3>
                    <p style={{ fontSize: 13, color: "#cbd5e1", margin: "0 0 16px 0", lineHeight: 1.5 }}>
                      English (50 Qs) · Math (45 Qs) · Reading (36 Qs) {selectedMode.includes("science") || selectedMode === "complete" ? "· Science (40 Qs)" : ""} {selectedMode.includes("writing") || selectedMode === "complete" ? "· Writing Essay" : ""}
                    </p>
                  </div>

                  <button
                    onClick={() => navigate(`/act/test/${t.id}?mode=${selectedMode}`)}
                    style={{ width: "100%", background: "linear-gradient(135deg, #0284c7, #7c3aed)", color: "#ffffff", border: "none", borderRadius: 14, padding: "12px", fontWeight: 800, fontSize: 14, cursor: "pointer", display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 8, boxShadow: "0 4px 14px rgba(2,132,199,0.35)" }}
                  >
                    <Play size={16} fill="#ffffff" /> Launch ACT Simulation #{testNum}
                  </button>
                </motion.div>
              );
            })}
          </div>

          {/* ── PAGINATION CONTROLS ── */}
          {totalPages > 1 && (
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12, borderTop: "1px solid rgba(255,255,255,0.1)", paddingTop: 24, marginTop: 24 }}>
              <div style={{ fontSize: 13, color: "#94a3b8", fontWeight: 700 }}>
                Page <strong style={{ color: "#38bdf8" }}>{currentPage}</strong> of <strong style={{ color: "#ffffff" }}>{totalPages}</strong> ({filteredTests.length} Total Tests Available)
              </div>

              <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                <button
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                  style={{
                    background: currentPage === 1 ? "rgba(255,255,255,0.04)" : "rgba(56,189,248,0.2)",
                    color: currentPage === 1 ? "#64748b" : "#38bdf8",
                    border: currentPage === 1 ? "1px solid rgba(255,255,255,0.08)" : "1px solid rgba(56,189,248,0.4)",
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
                      background: currentPage === pageNum ? "linear-gradient(135deg, #0284c7, #7c3aed)" : "rgba(255,255,255,0.06)",
                      color: "#ffffff",
                      border: currentPage === pageNum ? "1px solid #38bdf8" : "1px solid rgba(255,255,255,0.1)",
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
                    background: currentPage === totalPages ? "rgba(255,255,255,0.04)" : "rgba(56,189,248,0.2)",
                    color: currentPage === totalPages ? "#64748b" : "#38bdf8",
                    border: currentPage === totalPages ? "1px solid rgba(255,255,255,0.08)" : "1px solid rgba(56,189,248,0.4)",
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

      </div>
    </div>
  );
}
