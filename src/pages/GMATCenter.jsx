import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Sparkles, Zap, BookOpen, ArrowRight, CheckCircle2,
  Calculator, Play, Layers, Clock, Award, Search, ChevronLeft, ChevronRight, ShieldCheck, TrendingUp, Star, Lock
} from "lucide-react";
import { gmatTests } from "../data/gmat/gmatTests";
import { isMockUnlocked } from "../utils/planAccess";

export default function GMATCenter() {
  const navigate = useNavigate();

  // Search & Pagination State
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [activeTab, setActiveTab] = useState("all"); // 'all' | 'simulations' | 'practice_modes'
  const itemsPerPage = 12;

  const filteredTests = useMemo(() => {
    return gmatTests.filter((test) => {
      const query = searchQuery.toLowerCase().trim();
      return !query || test.title.toLowerCase().includes(query);
    });
  }, [searchQuery]);

  const totalPages = Math.max(1, Math.ceil(filteredTests.length / itemsPerPage));
  const pagedTests = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredTests.slice(start, start + itemsPerPage);
  }, [filteredTests, currentPage]);

  const practiceModes = [
    { title: "⚡ Full GMAT CBT Simulation", qCount: "64 Qs", time: "135 Mins", route: "/gmat/test/gmat-adaptive-1", color: "#38bdf8" },
    { title: "🔢 Quantitative Practice", qCount: "21 Qs", time: "45 Mins", route: "/gmat/test/gmat-adaptive-1", color: "#10b981" },
    { title: "📖 Verbal Practice", qCount: "23 Qs", time: "45 Mins", route: "/gmat/test/gmat-adaptive-1", color: "#3b82f6" },
    { title: "📊 Data Insights Practice", qCount: "20 Qs", time: "45 Mins", route: "/gmat/test/gmat-adaptive-1", color: "#9333ea" },
    { title: "📐 Problem Solving Practice", qCount: "21 Qs", time: "45 Mins", route: "/gmat/test/gmat-adaptive-1", color: "#facc15" },
    { title: "🧠 Critical Reasoning Practice", qCount: "12 Qs", time: "25 Mins", route: "/gmat/test/gmat-adaptive-1", color: "#ec4899" },
    { title: "📚 Reading Comprehension Practice", qCount: "11 Qs", time: "20 Mins", route: "/gmat/test/gmat-adaptive-1", color: "#06b6d4" },
    { title: "⚖️ Data Sufficiency Practice", qCount: "8 Qs", time: "16 Mins", route: "/gmat/test/gmat-adaptive-1", color: "#84cc16" },
    { title: "📑 Multi-Source Reasoning Practice", qCount: "4 Qs", time: "10 Mins", route: "/gmat/test/gmat-adaptive-1", color: "#a855f7" },
    { title: "📋 Table Analysis Practice", qCount: "4 Qs", time: "8 Mins", route: "/gmat/test/gmat-adaptive-1", color: "#f97316" },
    { title: "📈 Graphics Interpretation Practice", qCount: "4 Qs", time: "8 Mins", route: "/gmat/test/gmat-adaptive-1", color: "#14b8a6" },
    { title: "🔀 Two-Part Analysis Practice", qCount: "4 Qs", time: "8 Mins", route: "/gmat/test/gmat-adaptive-1", color: "#e11d48" },
    { title: "⏱️ Timed Section Speed Mode", qCount: "20 Qs", time: "40 Mins", route: "/gmat/test/gmat-adaptive-1", color: "#eab308" },
    { title: "🔄 Adaptive IRT Engine Practice", qCount: "CAT Mode", time: "Dynamic", route: "/gmat/test/gmat-adaptive-1", color: "#6366f1" }
  ];

  return (
    <div style={{ minHeight: "100vh", background: "radial-gradient(circle at 50% 0%, #0369a1 0%, #0f172a 70%)", color: "#ffffff", fontFamily: "Inter, sans-serif", padding: "40px 24px 80px" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>

        {/* ── HERO BANNER ── */}
        <div style={{ marginBottom: "48px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1.2fr 0.8fr", gap: 32, alignItems: "center", marginBottom: 36 }}>
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <span style={{ background: "rgba(56,189,248,0.2)", color: "#38bdf8", border: "1px solid rgba(56,189,248,0.3)", padding: "6px 20px", borderRadius: "999px", fontSize: "13px", fontWeight: "800", letterSpacing: "0.5px", boxShadow: "0 0 20px rgba(56,189,248,0.2)", display: "inline-flex", alignItems: "center", gap: "8px" }}>
                <Sparkles size={15} color="#38bdf8" /> OFFICIAL GMAT FOCUS SIMULATOR (205–805 SCALE)
              </span>

              <h1 style={{ fontSize: "clamp(2.2rem, 4.5vw, 3.6rem)", fontWeight: 900, margin: "20px 0 16px", letterSpacing: "-1.5px", background: "linear-gradient(135deg, #ffffff 30%, #38bdf8 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                GMAT Focus Computer-Adaptive Hub
              </h1>
              <p style={{ color: "#94a3b8", fontSize: "1.15rem", margin: "0 0 28px", lineHeight: "1.6" }}>
                Practice all <strong>100 Full GMAT Computer-Adaptive Forms</strong> featuring <strong>Quantitative Reasoning</strong> (21 Qs / 45m), <strong>Verbal Reasoning</strong> (23 Qs / 45m), <strong>Data Insights</strong> (20 Qs / 45m), <strong>Section Order Selection</strong>, and <strong>Question Review & Edit</strong>.
              </p>
            </motion.div>

            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 }} style={{ textAlign: "center" }}>
              <img
                src="/src/assets/images/dashboard_ai_hero.png"
                alt="3D GMAT Prep Banner"
                style={{ width: "100%", maxWidth: 360, borderRadius: 24, filter: "drop-shadow(0 15px 35px rgba(2, 132, 199, 0.4))", border: "1px solid rgba(255,255,255,0.15)" }}
              />
            </motion.div>
          </div>

          <div style={{ display: "flex", justifyContent: "center", gap: 16 }}>
            <button
              onClick={() => {
                const randomId = Math.floor(Math.random() * gmatTests.length) + 1;
                navigate(`/gmat/test/gmat-adaptive-${randomId}`);
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
                boxShadow: "0 12px 30px rgba(2, 132, 199, 0.4)"
              }}
            >
              <Play size={20} fill="#ffffff" /> Launch Random GMAT CAT Simulation (1–100)
            </button>
          </div>
        </div>

        {/* ── 14 PRACTICE MODES GRID ── */}
        <div style={{ marginBottom: "56px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "20px" }}>
            <Zap size={22} color="#facc15" />
            <h2 style={{ fontSize: "22px", fontWeight: 900, margin: 0, color: "#ffffff" }}>
              GMAT Practice & Training Modes
            </h2>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: 16 }}>
            {practiceModes.map((pm, idx) => (
              <div
                key={idx}
                onClick={() => navigate(pm.route)}
                style={{
                  background: "rgba(30,41,59,0.75)",
                  border: "1px solid rgba(255,255,255,0.12)",
                  borderRadius: 18,
                  padding: 20,
                  cursor: "pointer",
                  transition: "all 0.2s ease"
                }}
              >
                <div style={{ fontSize: 16, fontWeight: 800, color: pm.color, marginBottom: 6 }}>{pm.title}</div>
                <div style={{ fontSize: 13, color: "#94a3b8" }}>{pm.qCount} · {pm.time}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ── MOCK EXAMS EXPLORER ── */}
        <div style={{ background: "rgba(30,41,59,0.8)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 28, padding: 32, boxShadow: "0 12px 40px rgba(0,0,0,0.3)" }}>
          
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16, marginBottom: 24 }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <Layers size={24} color="#38bdf8" />
                <h2 style={{ fontSize: 24, fontWeight: 900, margin: 0, color: "#ffffff" }}>
                  Official GMAT Focus CAT Mock Suite
                </h2>
              </div>
              <p style={{ fontSize: 14, color: "#94a3b8", margin: "4px 0 0 0" }}>
                Showing {filteredTests.length} full computer-adaptive forms
              </p>
            </div>

            {/* Search Bar */}
            <div style={{ position: "relative", minWidth: 280, flex: 1, maxWidth: 400 }}>
              <Search size={18} color="#94a3b8" style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)" }} />
              <input
                type="text"
                placeholder="Search GMAT mock tests..."
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
              const unlocked = isMockUnlocked("GMAT", testNum);

              return (
                <div
                  key={t.id}
                  style={{
                    background: !unlocked ? "rgba(30,41,59,0.7)" : "rgba(15,23,42,0.85)",
                    border: !unlocked ? "1px solid rgba(250,204,21,0.3)" : "1px solid rgba(255,255,255,0.12)",
                    borderRadius: 22,
                    padding: 24,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between"
                  }}
                >
                  <div>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                      <span style={{ background: !unlocked ? "rgba(250,204,21,0.2)" : "rgba(56,189,248,0.2)", color: !unlocked ? "#facc15" : "#38bdf8", border: !unlocked ? "1px solid rgba(250,204,21,0.4)" : "1px solid rgba(56,189,248,0.3)", padding: "4px 12px", borderRadius: 8, fontSize: 12, fontWeight: 900 }}>
                        {!unlocked ? `🔒 GMAT CAT #${testNum} (LOCKED)` : `GMAT CAT #${testNum}`}
                      </span>
                      <span style={{ fontSize: 12, color: "#94a3b8", display: "inline-flex", alignItems: "center", gap: 4, fontWeight: 700 }}>
                        <Clock size={13} /> 2h 15m
                      </span>
                    </div>

                    <h3 style={{ fontSize: 18, fontWeight: 800, color: "#ffffff", margin: "0 0 6px 0" }}>{t.title}</h3>
                    <p style={{ fontSize: 13, color: "#cbd5e1", margin: "0 0 16px 0", lineHeight: 1.5 }}>
                      Quant (21 Qs) · Verbal (23 Qs) · Data Insights (20 Qs) · Adaptive Scoring
                    </p>
                  </div>

                  <button
                    onClick={() => {
                      if (!unlocked) {
                        navigate("/pricing");
                      } else {
                        navigate(`/gmat/test/${t.id}`);
                      }
                    }}
                    style={{
                      width: "100%",
                      background: !unlocked ? "linear-gradient(135deg, #d97706, #78350f)" : "linear-gradient(135deg, #0284c7, #7c3aed)",
                      color: "#ffffff",
                      border: "none",
                      borderRadius: 14,
                      padding: "12px",
                      fontWeight: 800,
                      fontSize: 14,
                      cursor: "pointer",
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 8
                    }}
                  >
                    {!unlocked ? <><Lock size={16} /> Unlock Mock #{testNum}</> : <><Play size={16} fill="#ffffff" /> Launch GMAT CAT #{testNum}</>}
                  </button>
                </div>
              );
            })}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "1px solid rgba(255,255,255,0.1)", paddingTop: 24 }}>
              <div style={{ fontSize: 13, color: "#94a3b8", fontWeight: 700 }}>
                Page <strong style={{ color: "#38bdf8" }}>{currentPage}</strong> of <strong style={{ color: "#ffffff" }}>{totalPages}</strong>
              </div>

              <div style={{ display: "flex", gap: 8 }}>
                <button
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                  style={{ background: "rgba(56,189,248,0.2)", color: "#38bdf8", border: "1px solid rgba(56,189,248,0.4)", borderRadius: 10, padding: "8px 16px", cursor: "pointer", fontWeight: 800, fontSize: 13 }}
                >
                  Previous
                </button>
                <button
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                  style={{ background: "rgba(56,189,248,0.2)", color: "#38bdf8", border: "1px solid rgba(56,189,248,0.4)", borderRadius: 10, padding: "8px 16px", cursor: "pointer", fontWeight: 800, fontSize: 13 }}
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
