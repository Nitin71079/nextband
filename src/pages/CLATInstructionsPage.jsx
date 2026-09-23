import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ShieldCheck, Clock, FileText, CheckCircle2, ChevronRight, User, BookOpen } from "lucide-react";
import { getCLATMockById } from "../data/clat/clatTests";
import { getCLATConfig } from "../config/clatConfig";

export default function CLATInstructionsPage() {
  const { testId } = useParams();
  const navigate = useNavigate();

  const mockObj = getCLATMockById(testId);
  const config = getCLATConfig(mockObj.formatVersion || "CLAT_2026");

  const [agreed, setAgreed] = useState(false);

  const handleStart = () => {
    if (!agreed) {
      alert("Please read and accept the instructions before starting the examination.");
      return;
    }
    navigate(`/clat/test/${mockObj.id}`);
  };

  return (
    <div style={{ minHeight: "100vh", background: "#090d16", color: "#ffffff", fontFamily: "Inter, sans-serif", padding: "40px 24px" }}>
      <div style={{ maxWidth: 1000, margin: "0 auto", background: "#0f172a", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 24, padding: 36, boxShadow: "0 20px 60px rgba(0,0,0,0.6)" }}>

        {/* Top Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid rgba(255,255,255,0.1)", paddingBottom: 24, marginBottom: 28, flexWrap: "wrap", gap: 16 }}>
          <div>
            <span style={{ background: "rgba(251,191,36,0.2)", color: "#fbbf24", border: "1px solid rgba(251,191,36,0.3)", padding: "4px 12px", borderRadius: 8, fontSize: 12, fontWeight: 900 }}>
              CONSORTIUM OF NLUs CLAT-UG INSTRUCTIONAL SYSTEM
            </span>
            <h1 style={{ fontSize: 26, fontWeight: 900, color: "#ffffff", marginTop: 8, marginBottom: 4 }}>
              {mockObj.title}
            </h1>
            <div style={{ fontSize: 13, color: "#94a3b8" }}>
              Exam Pattern: <strong style={{ color: "#fbbf24" }}>CLAT 2026/2027 Official Standard</strong>
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 14, background: "rgba(30,41,59,0.8)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 16, padding: "12px 20px" }}>
            <div style={{ width: 44, height: 44, borderRadius: "50%", background: "linear-gradient(135deg, #d97706, #b45309)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <User size={22} color="#ffffff" />
            </div>
            <div>
              <div style={{ fontSize: 14, fontWeight: 900, color: "#ffffff" }}>Candidate Examination Terminal</div>
              <div style={{ fontSize: 11, color: "#4ade80", fontWeight: 800 }}>System Verified · Ready</div>
            </div>
          </div>
        </div>

        {/* Exam Specs Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16, marginBottom: 32 }}>
          <div style={specCardStyle}>
            <Clock size={20} color="#fbbf24" />
            <div>
              <div style={{ fontSize: 11, color: "#94a3b8", fontWeight: 700 }}>Total Duration</div>
              <div style={{ fontSize: 16, fontWeight: 900, color: "#ffffff" }}>120 Minutes (2 Hrs)</div>
            </div>
          </div>

          <div style={specCardStyle}>
            <FileText size={20} color="#a855f7" />
            <div>
              <div style={{ fontSize: 11, color: "#94a3b8", fontWeight: 700 }}>Total Questions</div>
              <div style={{ fontSize: 16, fontWeight: 900, color: "#ffffff" }}>120 Questions</div>
            </div>
          </div>

          <div style={specCardStyle}>
            <ShieldCheck size={20} color="#22c55e" />
            <div>
              <div style={{ fontSize: 11, color: "#94a3b8", fontWeight: 700 }}>Maximum Marks</div>
              <div style={{ fontSize: 16, fontWeight: 900, color: "#ffffff" }}>120 Marks</div>
            </div>
          </div>

          <div style={specCardStyle}>
            <BookOpen size={20} color="#38bdf8" />
            <div>
              <div style={{ fontSize: 11, color: "#94a3b8", fontWeight: 700 }}>Question Format</div>
              <div style={{ fontSize: 16, fontWeight: 900, color: "#ffffff" }}>100% Passage-Based</div>
            </div>
          </div>
        </div>

        {/* Section Breakdown Grid */}
        <div style={{ background: "rgba(15,23,42,0.6)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 18, padding: 24, marginBottom: 28 }}>
          <h2 style={{ fontSize: 17, fontWeight: 900, color: "#ffffff", marginBottom: 16 }}>
            CLAT-UG 5 Official Sections &amp; Distribution
          </h2>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 12 }}>
            <div style={secBoxStyle}>
              <div style={{ fontSize: 11, color: "#fbbf24", fontWeight: 800 }}>SECTION 1</div>
              <div style={{ fontSize: 14, fontWeight: 900, color: "#ffffff" }}>English Language</div>
              <div style={{ fontSize: 12, color: "#94a3b8", marginTop: 4 }}>24 Qs · 24 Marks</div>
            </div>

            <div style={secBoxStyle}>
              <div style={{ fontSize: 11, color: "#fbbf24", fontWeight: 800 }}>SECTION 2</div>
              <div style={{ fontSize: 14, fontWeight: 900, color: "#ffffff" }}>Current Affairs / GK</div>
              <div style={{ fontSize: 12, color: "#94a3b8", marginTop: 4 }}>30 Qs · 30 Marks</div>
            </div>

            <div style={secBoxStyle}>
              <div style={{ fontSize: 11, color: "#fbbf24", fontWeight: 800 }}>SECTION 3</div>
              <div style={{ fontSize: 14, fontWeight: 900, color: "#ffffff" }}>Legal Reasoning</div>
              <div style={{ fontSize: 12, color: "#94a3b8", marginTop: 4 }}>30 Qs · 30 Marks</div>
            </div>

            <div style={secBoxStyle}>
              <div style={{ fontSize: 11, color: "#fbbf24", fontWeight: 800 }}>SECTION 4</div>
              <div style={{ fontSize: 14, fontWeight: 900, color: "#ffffff" }}>Logical Reasoning</div>
              <div style={{ fontSize: 12, color: "#94a3b8", marginTop: 4 }}>24 Qs · 24 Marks</div>
            </div>

            <div style={secBoxStyle}>
              <div style={{ fontSize: 11, color: "#fbbf24", fontWeight: 800 }}>SECTION 5</div>
              <div style={{ fontSize: 14, fontWeight: 900, color: "#ffffff" }}>Quant Techniques</div>
              <div style={{ fontSize: 12, color: "#94a3b8", marginTop: 4 }}>12 Qs · 12 Marks</div>
            </div>
          </div>
        </div>

        {/* Detailed Rules & Marking Scheme */}
        <div style={{ background: "rgba(15,23,42,0.6)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 18, padding: 24, marginBottom: 28 }}>
          <h2 style={{ fontSize: 17, fontWeight: 900, color: "#ffffff", marginBottom: 16 }}>
            Marking Scheme &amp; Examination Regulations
          </h2>

          <ul style={{ paddingLeft: 20, color: "#cbd5e1", fontSize: 14, lineHeight: 1.7, display: "flex", flexDirection: "column", gap: 10 }}>
            <li><strong>Correct Answer:</strong> Each correct answer carries <strong>+1.0 Mark</strong>.</li>
            <li><strong>Incorrect Answer:</strong> Each wrong answer attracts a negative penalty of <strong>-0.25 Mark</strong>.</li>
            <li><strong>Unanswered Questions:</strong> 0 Marks deducted for unattempted questions.</li>
            <li><strong>Split-Screen Interface:</strong> On desktop terminals, reading passages (~450 words) are displayed on the left panel while questions and answer options are on the right panel.</li>
          </ul>
        </div>

        {/* Declaration & Action Bar */}
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.1)", paddingTop: 24, display: "flex", flexDirection: "column", gap: 20 }}>
          <label style={{ display: "flex", alignItems: "flex-start", gap: 12, cursor: "pointer", fontSize: 13, color: "#cbd5e1", lineHeight: 1.5 }}>
            <input
              type="checkbox"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
              style={{ width: 18, height: 18, marginTop: 2, accentColor: "#d97706" }}
            />
            <span>
              I have read and understood all the official CLAT-UG examination instructions. I declare that I am ready to begin the 120-minute examination terminal.
            </span>
          </label>

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 14 }}>
            <button
              onClick={() => navigate("/clat")}
              style={{ background: "rgba(255,255,255,0.08)", color: "#cbd5e1", border: "1px solid rgba(255,255,255,0.15)", borderRadius: 12, padding: "12px 24px", fontSize: 14, fontWeight: 800, cursor: "pointer" }}
            >
              Return to CLAT Hub
            </button>

            <button
              onClick={handleStart}
              style={{
                background: agreed ? "linear-gradient(135deg, #d97706, #b45309)" : "rgba(255,255,255,0.1)",
                color: agreed ? "#ffffff" : "#64748b",
                border: "none",
                borderRadius: 14,
                padding: "16px 36px",
                fontSize: 16,
                fontWeight: 900,
                cursor: agreed ? "pointer" : "not-allowed",
                display: "inline-flex",
                alignItems: "center",
                gap: 10,
                boxShadow: agreed ? "0 10px 30px rgba(217,119,6,0.4)" : "none"
              }}
            >
              I AM READY TO BEGIN <ChevronRight size={18} />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}

const specCardStyle = {
  background: "rgba(30,41,59,0.7)",
  border: "1px solid rgba(255,255,255,0.1)",
  borderRadius: 14,
  padding: "16px 20px",
  display: "flex",
  alignItems: "center",
  gap: 14
};

const secBoxStyle = {
  background: "#0f172a",
  border: "1px solid rgba(255,255,255,0.1)",
  borderRadius: 12,
  padding: 14
};
