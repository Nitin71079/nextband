import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BookOpen, ChevronLeft, Search, CheckCircle, Zap, FileText, ArrowRight } from "lucide-react";
import { NEET_CONFIG } from "../config/neetConfig";

export default function NEETNotesPage() {
  const navigate = useNavigate();
  const [activeSubject, setActiveSubject] = useState("physics");
  const [searchQuery, setSearchQuery] = useState("");

  const currentSubjectObj = NEET_CONFIG.subjects.find(s => s.id === activeSubject) || NEET_CONFIG.subjects[0];

  const filteredChapters = currentSubjectObj.chapters.filter(c =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.ncertUnit.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div style={{ minHeight: "100vh", background: "#060b13", color: "#ffffff", fontFamily: "Inter, sans-serif", padding: "40px 24px" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>

        {/* Back Button */}
        <button
          onClick={() => navigate("/neet")}
          style={{ background: "rgba(255,255,255,0.08)", color: "#cbd5e1", border: "1px solid rgba(255,255,255,0.15)", borderRadius: 12, padding: "8px 18px", fontSize: 13, fontWeight: 800, cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 6, marginBottom: 24 }}
        >
          <ChevronLeft size={16} /> Return to NEET Hub
        </button>

        {/* Header Banner */}
        <div style={{ background: "linear-gradient(135deg, #0d1527 0%, #111827 100%)", border: "1px solid rgba(16,185,129,0.3)", borderRadius: 24, padding: 36, marginBottom: 32, boxShadow: "0 20px 50px rgba(0,0,0,0.5)" }}>
          <span style={{ background: "rgba(16,185,129,0.2)", color: "#10b981", border: "1px solid rgba(16,185,129,0.3)", padding: "4px 12px", borderRadius: 8, fontSize: 12, fontWeight: 900 }}>
            NCERT CLASS XI &amp; XII REVISION NOTES
          </span>
          <h1 style={{ fontSize: 30, fontWeight: 900, color: "#ffffff", marginTop: 8, marginBottom: 6 }}>
            NEET-UG High-Yield NCERT Study Notes
          </h1>
          <p style={{ fontSize: 14, color: "#94a3b8", maxWidth: 700, margin: 0 }}>
            Structured chapter summaries, key equations, reaction mechanisms, and high-frequency biological facts aligned with NTA NEET-UG specifications.
          </p>
        </div>

        {/* Navigation Tabs & Search */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid rgba(255,255,255,0.1)", paddingBottom: 16, marginBottom: 28, flexWrap: "wrap", gap: 16 }}>
          {/* Subject Switcher */}
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {NEET_CONFIG.subjects.map(sec => (
              <button
                key={sec.id}
                onClick={() => setActiveSubject(sec.id)}
                style={{
                  background: activeSubject === sec.id ? sec.color : "rgba(255,255,255,0.08)",
                  color: "#ffffff",
                  border: activeSubject === sec.id ? `1px solid ${sec.color}` : "1px solid rgba(255,255,255,0.1)",
                  borderRadius: 999,
                  padding: "8px 20px",
                  fontSize: 13,
                  fontWeight: 900,
                  cursor: "pointer",
                  boxShadow: activeSubject === sec.id ? `0 4px 16px ${sec.color}40` : "none"
                }}
              >
                {sec.name}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div style={{ position: "relative", width: 260 }}>
            <Search size={16} color="#94a3b8" style={{ position: "absolute", left: 14, top: 12 }} />
            <input
              type="text"
              placeholder="Search NCERT chapters..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              style={{ width: "100%", background: "#0d1527", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 12, padding: "10px 14px 10px 40px", color: "#ffffff", fontSize: 13 }}
            />
          </div>
        </div>

        {/* Chapter Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 20 }}>
          {filteredChapters.map((ch) => (
            <div key={ch.id} style={{ background: "#0d1527", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 20, padding: 24, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
              <div>
                <span style={{ background: "rgba(16,185,129,0.15)", color: "#10b981", padding: "4px 10px", borderRadius: 8, fontSize: 11, fontWeight: 800 }}>
                  {ch.ncertUnit}
                </span>
                <h3 style={{ fontSize: 18, fontWeight: 900, color: "#ffffff", marginTop: 12, marginBottom: 8 }}>
                  {ch.name}
                </h3>
                <p style={{ fontSize: 13, color: "#94a3b8", lineHeight: 1.6 }}>
                  High-yield NCERT concepts, definitions, formulas, and high-frequency NEET exam highlights.
                </p>
              </div>

              <div style={{ marginTop: 20, paddingTop: 16, borderTop: "1px solid rgba(255,255,255,0.08)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: 12, color: "#4ade80", fontWeight: 700 }}>✓ Verified NCERT 2026</span>
                <button
                  onClick={() => navigate("/neet")}
                  style={{ background: "rgba(16,185,129,0.2)", color: "#10b981", border: "1px solid rgba(16,185,129,0.3)", borderRadius: 10, padding: "6px 14px", fontSize: 12, fontWeight: 800, cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 6 }}
                >
                  Practice Questions <ArrowRight size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
