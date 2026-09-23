import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import {
  Sparkles, Play, Search, CheckCircle2, ShieldCheck, Calculator, Bookmark, FileText, Layers, Award, BarChart2, BookOpen
} from "lucide-react";
import { gateTests } from "../data/gate/gateTests";
import { GATE_CONFIGS } from "../config/gateConfig";

export default function GATECenter() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedBranch, setSelectedBranch] = useState("ALL");

  const branches = GATE_CONFIGS.GATE_2026.branches;

  const filteredTests = useMemo(() => {
    return gateTests.filter((test) => {
      const q = searchQuery.toLowerCase().trim();
      const matchQuery = !q || test.title.toLowerCase().includes(q) || test.branchCode.toLowerCase().includes(q) || test.id.includes(q);
      const matchBranch = selectedBranch === "ALL" || test.branchCode === selectedBranch;
      return matchQuery && matchBranch;
    });
  }, [searchQuery, selectedBranch]);

  // Read mock attempt stats from localStorage
  const userStats = useMemo(() => {
    let completedCount = 0;
    let totalScoreSum = 0;
    let maxScore = 0;

    gateTests.forEach((t) => {
      // Find results in localStorage
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith("gate_result_")) {
          try {
            const data = JSON.parse(localStorage.getItem(key));
            if (data && data.testId === t.id) {
              completedCount++;
              const score = data.evaluation?.finalTotalMarks || 0;
              totalScoreSum += score;
              if (score > maxScore) maxScore = score;
              break;
            }
          } catch (e) {}
        }
      }
    });

    const avgScore = completedCount > 0 ? (totalScoreSum / completedCount).toFixed(1) : 0;
    return { completedCount, maxScore, avgScore };
  }, []);

  return (
    <div style={{ minHeight: "100vh", background: "radial-gradient(circle at 50% 0%, #0369a1 0%, #0f172a 70%)", color: "#ffffff", fontFamily: "Inter, sans-serif", padding: "40px 24px 80px" }}>
      <div style={{ maxWidth: "1240px", margin: "0 auto" }}>

        {/* HERO BANNER */}
        <div style={{ marginBottom: 40 }}>
          <div style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 12 }}>
            <span style={{ background: "rgba(56,189,248,0.2)", color: "#38bdf8", border: "1px solid rgba(56,189,248,0.3)", padding: "6px 18px", borderRadius: 999, fontSize: 13, fontWeight: 900 }}>
              <Sparkles size={14} style={{ display: "inline", marginRight: 6 }} /> OFFICIAL GATE 2026/2027 CBT MOCK HUB
            </span>
            <button
              onClick={() => navigate("/gate/notes")}
              style={{ background: "rgba(168,85,247,0.2)", color: "#c084fc", border: "1px solid rgba(168,85,247,0.4)", borderRadius: 999, padding: "6px 18px", fontSize: 13, fontWeight: 800, cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 6 }}
            >
              <BookOpen size={14} /> GATE Revision Notes
            </button>
          </div>

          <h1 style={{ fontSize: "clamp(2.2rem, 4.5vw, 3.6rem)", fontWeight: 900, margin: "16px 0", background: "linear-gradient(135deg, #ffffff 30%, #38bdf8 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            100 Complete Full-Length GATE Mock Exams
          </h1>
          <p style={{ color: "#94a3b8", fontSize: "1.1rem", maxWidth: 840, lineHeight: 1.6 }}>
            Master GATE across <strong>CS, DA, EC, EE, ME, and CE</strong> papers with authentic tri-format question engines (MCQ, MSQ, NAT), official TCS iON scientific calculators, 5-state question palettes, and step-by-step solutions.
          </p>

          {/* Quick Stats Grid */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16, marginTop: 24 }}>
            <div style={statCard}>
              <div style={{ fontSize: 11, color: "#94a3b8", fontWeight: 700 }}>Mocks Completed</div>
              <div style={{ fontSize: 24, fontWeight: 900, color: "#38bdf8" }}>{userStats.completedCount} / 100</div>
            </div>
            <div style={statCard}>
              <div style={{ fontSize: 11, color: "#94a3b8", fontWeight: 700 }}>Highest Score</div>
              <div style={{ fontSize: 24, fontWeight: 900, color: "#22c55e" }}>{userStats.maxScore} <span style={{ fontSize: 14, color: "#94a3b8" }}>/ 100</span></div>
            </div>
            <div style={statCard}>
              <div style={{ fontSize: 11, color: "#94a3b8", fontWeight: 700 }}>Average Score</div>
              <div style={{ fontSize: 24, fontWeight: 900, color: "#facc15" }}>{userStats.avgScore} <span style={{ fontSize: 14, color: "#94a3b8" }}>/ 100</span></div>
            </div>
          </div>
        </div>

        {/* BRANCH SELECTOR & TEST EXPLORER */}
        <div style={{ background: "rgba(30,41,59,0.85)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 28, padding: 32 }}>

          {/* Paper Filters & Search */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 28, flexWrap: "wrap", gap: 16 }}>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              <button
                onClick={() => setSelectedBranch("ALL")}
                style={{
                  background: selectedBranch === "ALL" ? "linear-gradient(135deg, #0284c7, #7c3aed)" : "rgba(255,255,255,0.06)",
                  color: "#ffffff",
                  border: selectedBranch === "ALL" ? "1px solid #38bdf8" : "1px solid rgba(255,255,255,0.1)",
                  borderRadius: 12,
                  padding: "10px 18px",
                  fontSize: 13,
                  fontWeight: 800,
                  cursor: "pointer"
                }}
              >
                All Papers (100 Mocks)
              </button>
              {branches.map((b) => (
                <button
                  key={b.code}
                  onClick={() => setSelectedBranch(b.code)}
                  style={{
                    background: selectedBranch === b.code ? "linear-gradient(135deg, #0284c7, #7c3aed)" : "rgba(255,255,255,0.06)",
                    color: "#ffffff",
                    border: selectedBranch === b.code ? "1px solid #38bdf8" : "1px solid rgba(255,255,255,0.1)",
                    borderRadius: 12,
                    padding: "10px 18px",
                    fontSize: 13,
                    fontWeight: 800,
                    cursor: "pointer"
                  }}
                >
                  GATE {b.code}
                </button>
              ))}
            </div>

            <div style={{ position: "relative", minWidth: 280 }}>
              <Search size={18} color="#94a3b8" style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)" }} />
              <input
                type="text"
                placeholder="Search GATE Mock 001 - 100..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{ width: "100%", background: "#0f172a", border: "1px solid rgba(255,255,255,0.15)", borderRadius: 14, padding: "12px 14px 12px 42px", color: "#ffffff", fontSize: 14, outline: "none" }}
              />
            </div>
          </div>

          {/* 100 Mocks Cards Grid */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))", gap: 20 }}>
            {filteredTests.map((t) => {
              const branchMeta = branches.find((b) => b.code === t.branchCode) || { color: "#38bdf8" };
              return (
                <div key={t.id} style={{ background: "rgba(15,23,42,0.85)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 22, padding: 24, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>

                  <div>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                      <span style={{ background: "rgba(56,189,248,0.18)", color: branchMeta.color, border: `1px solid ${branchMeta.color}40`, padding: "4px 12px", borderRadius: 8, fontSize: 12, fontWeight: 900 }}>
                        GATE {t.branchCode} · {t.shortTitle}
                      </span>
                      <span style={{ fontSize: 11, background: "rgba(245,158,11,0.2)", color: "#facc15", padding: "2px 8px", borderRadius: 6, fontWeight: 800 }}>
                        {t.difficulty || "Standard"}
                      </span>
                    </div>

                    <h3 style={{ fontSize: 17, fontWeight: 900, color: "#ffffff", marginBottom: 8, lineHeight: 1.4 }}>
                      {t.title}
                    </h3>
                    <p style={{ fontSize: 13, color: "#94a3b8", marginBottom: 18, lineHeight: 1.5 }}>
                      65 Questions (10 GA + 55 Core) · 100 Marks · 180 Minutes duration. Tri-format (MCQ, MSQ, NAT).
                    </p>
                  </div>

                  <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: 16, display: "flex", gap: 10 }}>
                    <button
                      onClick={() => navigate(`/gate/instructions/${t.id}`)}
                      style={{ flex: 1, background: "linear-gradient(135deg, #0284c7, #7c3aed)", color: "#ffffff", border: "none", borderRadius: 12, padding: "12px", fontWeight: 900, fontSize: 14, cursor: "pointer", display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 8 }}
                    >
                      <Play size={16} fill="#ffffff" /> Start GATE CBT
                    </button>
                  </div>

                </div>
              );
            })}
          </div>

        </div>

      </div>
    </div>
  );
}

const statCard = {
  background: "rgba(15,23,42,0.8)",
  border: "1px solid rgba(255,255,255,0.1)",
  borderRadius: 16,
  padding: "16px 20px"
};
