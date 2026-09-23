import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Sparkles, Zap, BookOpen, PenTool, ArrowRight, CheckCircle2,
  Calculator, Play, Layers, Clock, Award, Search, ChevronLeft, ChevronRight, ShieldCheck, TrendingUp, Star
} from "lucide-react";
import { catTests } from "../data/cat/catTests";
import { rawToCatPercentile, rawToCatScaledScore } from "../utils/catScoreCalculator";
import FloatingDanglerPill from "../components/FloatingDanglerPill";

export default function CATCenter() {
  const navigate = useNavigate();
  const [rawScoreInput, setRawScoreInput] = useState(65);

  // Search & Pagination State
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  const estimatedPercentile = rawToCatPercentile(rawScoreInput);
  const estimatedScaled = rawToCatScaledScore(rawScoreInput, "TOTAL");

  const filteredTests = useMemo(() => {
    return catTests.filter((test) => {
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
      title: "📖 VARC (Verbal & Reading Comp)",
      score: "72 Raw Marks",
      timing: "Section 1 (24 Qs / 40 min)",
      color: "#3b82f6",
      topics: [
        "Reading Comprehension (4 Passages, 16 Qs)",
        "Para Summary (3 MCQ Items)",
        "Para Jumbles (3 TITA Items)",
        "Odd Sentence Out (2 MCQ Items)"
      ]
    },
    {
      title: "📊 DILR (Data & Logical Reasoning)",
      score: "66 Raw Marks",
      timing: "Section 2 (22 Qs / 40 min)",
      color: "#ec4899",
      topics: [
        "Data Interpretation Sets (Tables & Charts, 10 Qs)",
        "Logical Reasoning Sets (Arrangements & Games, 12 Qs)",
        "Set-Based Scenario Architecture",
        "TITA & MCQ Format Combination"
      ]
    },
    {
      title: "⚡ QA (Quantitative Ability)",
      score: "66 Raw Marks",
      timing: "Section 3 (22 Qs / 40 min)",
      color: "#10b981",
      topics: [
        "Arithmetic (Percentages, Profit/Loss, TSD, Work)",
        "Algebra (Equations, Quadratics, Logs, Series)",
        "Geometry & Mensuration (Triangles, Circles)",
        "Number System & Modern Mathematics"
      ]
    }
  ];

  return (
    <div style={{ minHeight: "100vh", background: "radial-gradient(circle at 50% 0%, #831843 0%, #0f172a 70%)", color: "#ffffff", fontFamily: "Inter, sans-serif", padding: "40px 24px 80px" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>

        {/* ── HERO BANNER ── */}
        <div style={{ marginBottom: "48px", position: "relative" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1.2fr 0.8fr", gap: 32, alignItems: "center", marginBottom: 36 }}>
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <span style={{ background: "rgba(236,72,153,0.2)", color: "#f472b6", border: "1px solid rgba(244,114,182,0.3)", padding: "6px 20px", borderRadius: "999px", fontSize: "13px", fontWeight: "800", letterSpacing: "0.5px", boxShadow: "0 0 20px rgba(236,72,153,0.2)", display: "inline-flex", alignItems: "center", gap: "8px" }}>
                <Sparkles size={15} color="#f472b6" /> KNARROW CAT 100-MOCK PRACTICE SUITE (VARC + DILR + QA)
              </span>

              <h1 style={{ fontSize: "clamp(2.2rem, 4.5vw, 3.6rem)", fontWeight: 900, margin: "20px 0 16px", letterSpacing: "-1.5px", background: "linear-gradient(135deg, #ffffff 30%, #f472b6 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                CAT 2026 Examination &amp; AI Engine
              </h1>
              <p style={{ color: "#94a3b8", fontSize: "1.15rem", margin: "0 0 28px", lineHeight: "1.6" }}>
                Master the official computer-based CAT exam (2h total duration) featuring <strong>68 questions</strong> (24 VARC + 22 DILR + 22 QA), 40-minute strict section locking, on-screen CAT calculator, MCQ (+3/-1) and TITA (+3/0) scoring.
              </p>
            </motion.div>

            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 }} style={{ textAlign: "center", position: "relative", display: "inline-block" }}>
              <FloatingDanglerPill
                icon={TrendingUp}
                value="99.9 %ile"
                label="Predicted CAT Rank"
                variant="light"
                iconBg="rgba(236, 72, 153, 0.15)"
                iconColor="#db2777"
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
                src="/src/assets/images/dashboard_ai_hero.png"
                alt="3D CAT Prep Banner"
                style={{ width: "100%", maxWidth: 400, borderRadius: 24, filter: "drop-shadow(0 15px 35px rgba(219, 39, 119, 0.4))", border: "1px solid rgba(255,255,255,0.15)" }}
              />
            </motion.div>
          </div>

          {/* Quick Metrics Bar */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 14, maxWidth: "900px", margin: "0 auto 36px" }}>
            {[
              { label: "Full Practice Mocks", val: "100 Full Tests", color: "#f472b6", icon: Layers },
              { label: "Questions per Mock", val: "68 Questions", color: "#38bdf8", icon: Award },
              { label: "Marking Scheme", val: "+3 / -1 MCQ, +3 / 0 TITA", color: "#4ade80", icon: Zap },
              { label: "Section Timers", val: "40m VARC / DILR / QA", color: "#facc15", icon: Clock },
            ].map((stat, idx) => {
              const IconComp = stat.icon;
              return (
                <div key={idx} style={{ background: "rgba(30,41,59,0.7)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 16, padding: "14px 18px", display: "flex", alignItems: "center", gap: 12, backdropFilter: "blur(10px)" }}>
                  <div style={{ width: 40, height: 40, borderRadius: 12, background: `rgba(${stat.color === "#f472b6" ? "244,114,182" : stat.color === "#38bdf8" ? "56,189,248" : stat.color === "#4ade80" ? "74,222,128" : "250,204,21"}, 0.15)`, display: "flex", alignItems: "center", justifyContent: "center", color: stat.color }}>
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
                const randomId = Math.floor(Math.random() * catTests.length) + 1;
                navigate(`/cat/test/cat-full-${randomId}`);
              }}
              style={{
                background: "linear-gradient(135deg, #db2777, #9333ea)",
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
                boxShadow: "0 12px 30px rgba(219, 39, 119, 0.4)",
              }}
            >
              <Play size={20} fill="#ffffff" /> 🎲 Launch Random CAT Simulation Mock (1–100)
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
              <Calculator size={18} /> Percentile Estimator
            </a>
          </div>
        </div>

        {/* ── 3 CORE CAT SECTIONS OVERVIEW ── */}
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
                <Layers size={24} color="#f472b6" />
                <h2 style={{ fontSize: 24, fontWeight: 900, margin: 0, color: "#ffffff" }}>
                  Official CAT 2026 Simulation Mocks
                </h2>
              </div>
              <p style={{ fontSize: 14, color: "#94a3b8", margin: "4px 0 0 0" }}>
                Showing {filteredTests.length} full simulation tests (68 questions each)
              </p>
            </div>

            {/* Search Bar */}
            <div style={{ position: "relative", minWidth: 280, flex: 1, maxWidth: 400 }}>
              <Search size={18} color="#94a3b8" style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)" }} />
              <input
                type="text"
                placeholder="Search CAT mock tests..."
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
                      <span style={{ background: "rgba(236,72,153,0.2)", color: "#f472b6", border: "1px solid rgba(244,114,182,0.3)", padding: "4px 12px", borderRadius: 8, fontSize: 12, fontWeight: 900 }}>
                        CAT MOCK #{testNum}
                      </span>
                      <span style={{ fontSize: 12, color: "#94a3b8", display: "inline-flex", alignItems: "center", gap: 4, fontWeight: 700 }}>
                        <Clock size={13} /> 2 Hours (68 Qs)
                      </span>
                    </div>

                    <h3 style={{ fontSize: 18, fontWeight: 800, color: "#ffffff", margin: "0 0 6px 0" }}>{t.title}</h3>
                    <p style={{ fontSize: 13, color: "#cbd5e1", margin: "0 0 16px 0", lineHeight: 1.5 }}>
                      VARC (24 Qs) · DILR (22 Qs) · QA (22 Qs) · On-Screen CAT Calculator · TITA &amp; MCQ Marking
                    </p>
                  </div>

                  <button
                    onClick={() => navigate(`/cat/test/${t.id}`)}
                    style={{ width: "100%", background: "linear-gradient(135deg, #db2777, #9333ea)", color: "#ffffff", border: "none", borderRadius: 14, padding: "12px", fontWeight: 800, fontSize: 14, cursor: "pointer", display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 8, boxShadow: "0 4px 14px rgba(219,39,119,0.35)" }}
                  >
                    <Play size={16} fill="#ffffff" /> Launch CAT Simulation #{testNum}
                  </button>
                </motion.div>
              );
            })}
          </div>

          {/* ── PAGINATION CONTROLS ── */}
          {totalPages > 1 && (
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12, borderTop: "1px solid rgba(255,255,255,0.1)", paddingTop: 24, marginTop: 24 }}>
              <div style={{ fontSize: 13, color: "#94a3b8", fontWeight: 700 }}>
                Page <strong style={{ color: "#f472b6" }}>{currentPage}</strong> of <strong style={{ color: "#ffffff" }}>{totalPages}</strong> ({filteredTests.length} Total Tests Available)
              </div>

              <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                <button
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                  style={{
                    background: currentPage === 1 ? "rgba(255,255,255,0.04)" : "rgba(236,72,153,0.2)",
                    color: currentPage === 1 ? "#64748b" : "#f472b6",
                    border: currentPage === 1 ? "1px solid rgba(255,255,255,0.08)" : "1px solid rgba(244,114,182,0.4)",
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
                      background: currentPage === pageNum ? "linear-gradient(135deg, #db2777, #9333ea)" : "rgba(255,255,255,0.06)",
                      color: "#ffffff",
                      border: currentPage === pageNum ? "1px solid #f472b6" : "1px solid rgba(255,255,255,0.1)",
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
                    background: currentPage === totalPages ? "rgba(255,255,255,0.04)" : "rgba(236,72,153,0.2)",
                    color: currentPage === totalPages ? "#64748b" : "#f472b6",
                    border: currentPage === totalPages ? "1px solid rgba(255,255,255,0.08)" : "1px solid rgba(244,114,182,0.4)",
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

        {/* ── PERCENTILE CONVERTER WIDGET ── */}
        <div id="score-converter" style={{ background: "rgba(30,41,59,0.75)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 28, padding: 36 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
            <Calculator size={24} color="#f472b6" />
            <h2 style={{ fontSize: 22, fontWeight: 900, margin: 0, color: "#ffffff" }}>
              CAT Raw Score to Percentile Predictor
            </h2>
          </div>

          <p style={{ color: "#94a3b8", fontSize: 14, marginBottom: 24 }}>
            Drag the slider to project your estimated percentile rank based on total raw marks scored across VARC, DILR, and QA.
          </p>

          <div style={{ display: "grid", gridTemplateColumns: "1.2fr 0.8fr", gap: 32, alignItems: "center" }}>
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8, fontSize: 14, fontWeight: 800 }}>
                <span>Total Raw Score: <strong style={{ color: "#f472b6" }}>{rawScoreInput} / 204</strong></span>
              </div>
              <input
                type="range"
                min="0"
                max="150"
                value={rawScoreInput}
                onChange={(e) => setRawScoreInput(Number(e.target.value))}
                style={{ width: "100%", accentColor: "#ec4899", cursor: "pointer" }}
              />
            </div>

            <div style={{ background: "#0f172a", border: "1px solid rgba(255,255,255,0.15)", borderRadius: 20, padding: 24, textAlign: "center" }}>
              <div style={{ fontSize: 12, color: "#94a3b8", fontWeight: 800, textTransform: "uppercase" }}>ESTIMATED CAT PERCENTILE</div>
              <div style={{ fontSize: 44, fontWeight: 900, color: "#f472b6", margin: "6px 0" }}>
                {estimatedPercentile.toFixed(2)} %ile
              </div>
              <div style={{ fontSize: 13, color: "#cbd5e1" }}>
                Estimated Scaled Score: <strong>{estimatedScaled}</strong>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
