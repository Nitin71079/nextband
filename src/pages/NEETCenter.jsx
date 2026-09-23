import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import {
  Sparkles, Play, Search, Clock, Award, BookOpen, Stethoscope, CheckCircle2, Lock
} from "lucide-react";
import { ALL_NEET_MOCKS } from "../data/neet/neetMockDatabase";

export default function NEETCenter() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [filterDifficulty, setFilterDifficulty] = useState("all");

  const filteredTests = useMemo(() => {
    return ALL_NEET_MOCKS.filter((test) => {
      const q = searchQuery.toLowerCase().trim();
      const matchesQuery = !q || test.title.toLowerCase().includes(q) || `mock ${test.mockNumber}`.includes(q);
      const matchesDiff = filterDifficulty === "all" || test.difficulty.toLowerCase().includes(filterDifficulty.toLowerCase());
      return matchesQuery && matchesDiff;
    });
  }, [searchQuery, filterDifficulty]);

  return (
    <div style={{ minHeight: "100vh", background: "radial-gradient(circle at 50% 0%, #064e3b 0%, #060b13 70%)", color: "#ffffff", fontFamily: "Inter, sans-serif", padding: "40px 24px 80px" }}>
      <div style={{ maxWidth: "1240px", margin: "0 auto" }}>
        
        {/* HERO BANNER */}
        <div style={{ marginBottom: 44 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
            <span style={{ background: "rgba(16,185,129,0.2)", color: "#10b981", border: "1px solid rgba(16,185,129,0.3)", padding: "6px 18px", borderRadius: 999, fontSize: 13, fontWeight: 900 }}>
              <Sparkles size={15} style={{ display: "inline", marginRight: 6 }} /> 100 COMPLETE FULL-LENGTH NEET-UG MOCK EXAMS (18,000 QUESTIONS)
            </span>
          </div>

          <h1 style={{ fontSize: "clamp(2.2rem, 4.5vw, 3.6rem)", fontWeight: 900, margin: "16px 0", background: "linear-gradient(135deg, #ffffff 30%, #34d399 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            NEET-UG Medical Examination Platform
          </h1>
          <p style={{ color: "#94a3b8", fontSize: "1.15rem", maxWidth: 840, lineHeight: 1.6 }}>
            Master the official NTA NEET-UG examination with <strong>Physics, Chemistry, Botany, and Zoology</strong> subject distribution, 200-minute CBT timer, +4/-1 marking, and All India Rank (AIR) estimation.
          </p>

          <div style={{ display: "flex", gap: 14, marginTop: 24, flexWrap: "wrap" }}>
            <button
              onClick={() => navigate(`/neet/instructions/neet-mock-001`)}
              style={{ background: "linear-gradient(135deg, #059669, #10b981)", color: "#ffffff", border: "none", borderRadius: 16, padding: "16px 32px", fontSize: 16, fontWeight: 900, cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 12, boxShadow: "0 10px 30px rgba(16,185,129,0.4)" }}
            >
              <Play size={20} fill="#ffffff" /> Launch NEET Mock 001
            </button>

            <button
              onClick={() => navigate("/neet/notes")}
              style={{ background: "rgba(255,255,255,0.08)", color: "#cbd5e1", border: "1px solid rgba(255,255,255,0.15)", borderRadius: 16, padding: "16px 28px", fontSize: 15, fontWeight: 800, cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 10 }}
            >
              <BookOpen size={18} /> NCERT Study Notes
            </button>
          </div>
        </div>

        {/* QUICK STATS BAR */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 16, marginBottom: 40 }}>
          <div style={statCardStyle}>
            <Stethoscope size={22} color="#10b981" />
            <div>
              <div style={{ fontSize: 12, color: "#94a3b8", fontWeight: 700 }}>Total NEET Mocks</div>
              <div style={{ fontSize: 20, fontWeight: 900, color: "#ffffff" }}>100 Full Mocks</div>
            </div>
          </div>

          <div style={statCardStyle}>
            <Award size={22} color="#3b82f6" />
            <div>
              <div style={{ fontSize: 12, color: "#94a3b8", fontWeight: 700 }}>Total Questions</div>
              <div style={{ fontSize: 20, fontWeight: 900, color: "#ffffff" }}>18,000 Questions</div>
            </div>
          </div>

          <div style={statCardStyle}>
            <Clock size={22} color="#ec4899" />
            <div>
              <div style={{ fontSize: 12, color: "#94a3b8", fontWeight: 700 }}>Duration per Test</div>
              <div style={{ fontSize: 20, fontWeight: 900, color: "#ffffff" }}>200 Minutes</div>
            </div>
          </div>

          <div style={statCardStyle}>
            <CheckCircle2 size={22} color="#f59e0b" />
            <div>
              <div style={{ fontSize: 12, color: "#94a3b8", fontWeight: 700 }}>Max Score</div>
              <div style={{ fontSize: 20, fontWeight: 900, color: "#ffffff" }}>720 Marks</div>
            </div>
          </div>
        </div>

        {/* TEST EXPLORER */}
        <div style={{ background: "rgba(13,21,39,0.85)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 28, padding: 32 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 28, flexWrap: "wrap", gap: 16 }}>
            <div>
              <h2 style={{ fontSize: 22, fontWeight: 900, color: "#ffffff", margin: 0 }}>
                100 Full-Length NEET-UG Mock Exams
              </h2>
              <div style={{ fontSize: 13, color: "#94a3b8", marginTop: 4 }}>Showing {filteredTests.length} mock tests</div>
            </div>

            <div style={{ display: "flex", gap: 12, flexWrap: "wrap", alignItems: "center" }}>
              {/* Difficulty Filters */}
              <div style={{ display: "flex", gap: 6, background: "rgba(255,255,255,0.06)", padding: 4, borderRadius: 12 }}>
                {["all", "easy", "standard", "challenging"].map((diff) => (
                  <button
                    key={diff}
                    onClick={() => setFilterDifficulty(diff)}
                    style={{
                      background: filterDifficulty === diff ? "#10b981" : "transparent",
                      color: filterDifficulty === diff ? "#ffffff" : "#94a3b8",
                      border: "none",
                      borderRadius: 8,
                      padding: "6px 12px",
                      fontSize: 12,
                      fontWeight: 800,
                      cursor: "pointer",
                      textTransform: "capitalize"
                    }}
                  >
                    {diff}
                  </button>
                ))}
              </div>

              {/* Search Box */}
              <div style={{ position: "relative", width: 240 }}>
                <Search size={16} color="#94a3b8" style={{ position: "absolute", left: 14, top: 12 }} />
                <input
                  type="text"
                  placeholder="Search NEET mock..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={{ width: "100%", background: "#0f172a", border: "1px solid rgba(255,255,255,0.15)", borderRadius: 12, padding: "10px 14px 10px 40px", color: "#ffffff", fontSize: 13 }}
                />
              </div>
            </div>
          </div>

          {/* Mocks Grid */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))", gap: 20 }}>
            {filteredTests.map((t) => (
              <div key={t.id} style={{ background: "rgba(15,23,42,0.85)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 22, padding: 24, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12, alignItems: "center" }}>
                    <span style={{ background: "rgba(16,185,129,0.2)", color: "#10b981", padding: "4px 12px", borderRadius: 8, fontSize: 12, fontWeight: 900 }}>
                      NEET Mock #{String(t.mockNumber).padStart(3, '0')}
                    </span>
                    <span style={{ fontSize: 11, color: t.isPremium ? "#facc15" : "#4ade80", fontWeight: 800, display: "flex", alignItems: "center", gap: 4 }}>
                      {t.isPremium ? <><Lock size={12} /> Premium</> : "Free Access"}
                    </span>
                  </div>

                  <h3 style={{ fontSize: 18, fontWeight: 900, color: "#ffffff", marginBottom: 6 }}>{t.title}</h3>
                  <div style={{ fontSize: 12, color: "#94a3b8", marginBottom: 16 }}>
                    Difficulty: <strong style={{ color: "#ffffff" }}>{t.difficulty}</strong> · 180 Qs (Phy, Chem, Bot, Zoo)
                  </div>
                </div>

                <div style={{ display: "flex", gap: 10, marginTop: 16 }}>
                  <button
                    onClick={() => navigate(`/neet/instructions/${t.id}`)}
                    style={{ flex: 1, background: "linear-gradient(135deg, #059669, #10b981)", color: "#ffffff", border: "none", borderRadius: 12, padding: "12px", fontWeight: 800, fontSize: 14, cursor: "pointer", display: "inline-flex", justifyContent: "center", alignItems: "center", gap: 8 }}
                  >
                    <Play size={16} fill="#ffffff" /> Start Exam
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

const statCardStyle = {
  background: "rgba(13,21,39,0.85)",
  border: "1px solid rgba(255,255,255,0.1)",
  borderRadius: 18,
  padding: "18px 24px",
  display: "flex",
  alignItems: "center",
  gap: 16
};
