import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import {
  Sparkles, Play, Search, CheckCircle2, ShieldCheck, BookOpen, Layers, Award, BarChart2
} from "lucide-react";
import { jeeTests } from "../data/jee/jeeTests";

export default function JEECenter() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredTests = useMemo(() => {
    return jeeTests.filter((test) => {
      const q = searchQuery.toLowerCase().trim();
      return !q || test.title.toLowerCase().includes(q) || test.id.includes(q);
    });
  }, [searchQuery]);

  // Read attempt stats from localStorage
  const userStats = useMemo(() => {
    let completedCount = 0;
    let totalScoreSum = 0;
    let maxScore = 0;

    jeeTests.forEach((t) => {
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith("jee_result_")) {
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
    <div style={{ minHeight: "100vh", background: "radial-gradient(circle at 50% 0%, #1e1b4b 0%, #0f172a 70%)", color: "#ffffff", fontFamily: "Inter, sans-serif", padding: "40px 24px 80px" }}>
      <div style={{ maxWidth: "1240px", margin: "0 auto" }}>

        {/* HERO BANNER */}
        <div style={{ marginBottom: 40 }}>
          <div style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 12 }}>
            <span style={{ background: "rgba(129,140,248,0.2)", color: "#818cf8", border: "1px solid rgba(129,140,248,0.3)", padding: "6px 18px", borderRadius: 999, fontSize: 13, fontWeight: 900 }}>
              <Sparkles size={14} style={{ display: "inline", marginRight: 6 }} /> OFFICIAL NTA JEE MAIN PAPER 1 MOCK HUB
            </span>
            <button
              onClick={() => navigate("/jee/notes")}
              style={{ background: "rgba(168,85,247,0.2)", color: "#c084fc", border: "1px solid rgba(168,85,247,0.4)", borderRadius: 999, padding: "6px 18px", fontSize: 13, fontWeight: 800, cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 6 }}
            >
              <BookOpen size={14} /> Formulas &amp; Revision Notes
            </button>
          </div>

          <h1 style={{ fontSize: "clamp(2.2rem, 4.5vw, 3.6rem)", fontWeight: 900, margin: "16px 0", background: "linear-gradient(135deg, #ffffff 30%, #818cf8 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            100 Complete Full-Length JEE Main Mock Exams
          </h1>
          <p style={{ color: "#94a3b8", fontSize: "1.1rem", maxWidth: 840, lineHeight: 1.6 }}>
            Master NTA JEE Main Paper 1 (B.E. / B.Tech.) with 100 genuinely distinct full-length mock exams (Physics, Chemistry, Math), Section A (MCQs) &amp; Section B (Numerical NVQs), on-screen keypads, and NTA percentile rank analytics.
          </p>

          {/* Quick Stats Grid */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16, marginTop: 24 }}>
            <div style={statCard}>
              <div style={{ fontSize: 11, color: "#94a3b8", fontWeight: 700 }}>Mocks Completed</div>
              <div style={{ fontSize: 24, fontWeight: 900, color: "#818cf8" }}>{userStats.completedCount} / 100</div>
            </div>
            <div style={statCard}>
              <div style={{ fontSize: 11, color: "#94a3b8", fontWeight: 700 }}>Highest Score</div>
              <div style={{ fontSize: 24, fontWeight: 900, color: "#22c55e" }}>{userStats.maxScore} <span style={{ fontSize: 14, color: "#94a3b8" }}>/ 300</span></div>
            </div>
            <div style={statCard}>
              <div style={{ fontSize: 11, color: "#94a3b8", fontWeight: 700 }}>Average Score</div>
              <div style={{ fontSize: 24, fontWeight: 900, color: "#c084fc" }}>{userStats.avgScore} <span style={{ fontSize: 14, color: "#94a3b8" }}>/ 300</span></div>
            </div>
          </div>
        </div>

        {/* MOCKS EXPLORER */}
        <div style={{ background: "rgba(30,41,59,0.85)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 28, padding: 32 }}>

          {/* Search Header */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 28, flexWrap: "wrap", gap: 16 }}>
            <h2 style={{ fontSize: 20, fontWeight: 900, color: "#ffffff", margin: 0 }}>
              JEE Main Full-Length Mock Exams Library (JEE Mock 001 - 100)
            </h2>

            <div style={{ position: "relative", minWidth: 280 }}>
              <Search size={18} color="#94a3b8" style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)" }} />
              <input
                type="text"
                placeholder="Search JEE Mock 001 - 100..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{ width: "100%", background: "#0f172a", border: "1px solid rgba(255,255,255,0.15)", borderRadius: 14, padding: "12px 14px 12px 42px", color: "#ffffff", fontSize: 14, outline: "none" }}
              />
            </div>
          </div>

          {/* 100 Mocks Cards Grid */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))", gap: 20 }}>
            {filteredTests.map((t) => (
              <div key={t.id} style={{ background: "rgba(15,23,42,0.85)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 22, padding: 24, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>

                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                    <span style={{ background: "rgba(129,140,248,0.18)", color: "#818cf8", border: "1px solid rgba(129,140,248,0.3)", padding: "4px 12px", borderRadius: 8, fontSize: 12, fontWeight: 900 }}>
                      NTA JEE MAIN · {t.shortTitle}
                    </span>
                    <span style={{ fontSize: 11, background: "rgba(168,85,247,0.2)", color: "#c084fc", padding: "2px 8px", borderRadius: 6, fontWeight: 800 }}>
                      {t.difficulty || "Standard"}
                    </span>
                  </div>

                  <h3 style={{ fontSize: 17, fontWeight: 900, color: "#ffffff", marginBottom: 8, lineHeight: 1.4 }}>
                    {t.title}
                  </h3>
                  <p style={{ fontSize: 13, color: "#94a3b8", marginBottom: 18, lineHeight: 1.5 }}>
                    75 Questions (25 Phy, 25 Chem, 25 Math) · 300 Marks · 180 Mins. Section A (MCQs) &amp; Section B (NVQs). Marking (+4, -1).
                  </p>
                </div>

                <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: 16, display: "flex", gap: 10 }}>
                  <button
                    onClick={() => navigate(`/jee/instructions/${t.id}`)}
                    style={{ flex: 1, background: "linear-gradient(135deg, #4f46e5, #9333ea)", color: "#ffffff", border: "none", borderRadius: 12, padding: "12px", fontWeight: 900, fontSize: 14, cursor: "pointer", display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 8 }}
                  >
                    <Play size={16} fill="#ffffff" /> Start JEE CBT
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

const statCard = {
  background: "rgba(15,23,42,0.8)",
  border: "1px solid rgba(255,255,255,0.1)",
  borderRadius: 16,
  padding: "16px 20px"
};
