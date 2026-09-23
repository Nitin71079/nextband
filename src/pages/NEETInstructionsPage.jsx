import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ShieldCheck, Clock, FileText, ChevronRight, User, Stethoscope } from "lucide-react";
import { getNEETMockById } from "../data/neet/neetTests";

export default function NEETInstructionsPage() {
  const { testId } = useParams();
  const navigate = useNavigate();

  const mockObj = getNEETMockById(testId);
  const [agreed, setAgreed] = useState(false);

  const handleStart = () => {
    if (!agreed) {
      alert("Please read and accept the instructions before starting the NEET-UG examination.");
      return;
    }
    navigate(`/neet/test/${mockObj.id}`);
  };

  return (
    <div style={{ minHeight: "100vh", background: "#060b13", color: "#ffffff", fontFamily: "Inter, sans-serif", padding: "40px 24px" }}>
      <div style={{ maxWidth: 1020, margin: "0 auto", background: "#0d1527", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 24, padding: 36, boxShadow: "0 20px 60px rgba(0,0,0,0.6)" }}>

        {/* Top Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid rgba(255,255,255,0.1)", paddingBottom: 24, marginBottom: 28, flexWrap: "wrap", gap: 16 }}>
          <div>
            <span style={{ background: "rgba(16,185,129,0.2)", color: "#10b981", border: "1px solid rgba(16,185,129,0.3)", padding: "4px 12px", borderRadius: 8, fontSize: 12, fontWeight: 900 }}>
              OFFICIAL NTA NEET-UG CBT INSTRUCTIONAL SYSTEM
            </span>
            <h1 style={{ fontSize: 26, fontWeight: 900, color: "#ffffff", marginTop: 8, marginBottom: 4 }}>
              {mockObj.title}
            </h1>
            <div style={{ fontSize: 13, color: "#94a3b8" }}>
              Exam Blueprint: <strong style={{ color: "#10b981" }}>NTA NEET-UG Medical Entrance Standard</strong>
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 14, background: "rgba(30,41,59,0.8)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 16, padding: "12px 20px" }}>
            <div style={{ width: 44, height: 44, borderRadius: "50%", background: "linear-gradient(135deg, #059669, #10b981)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Stethoscope size={22} color="#ffffff" />
            </div>
            <div>
              <div style={{ fontSize: 14, fontWeight: 900, color: "#ffffff" }}>Candidate Medical Terminal</div>
              <div style={{ fontSize: 11, color: "#4ade80", fontWeight: 800 }}>System Verified · Ready</div>
            </div>
          </div>
        </div>

        {/* Exam Specs Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16, marginBottom: 32 }}>
          <div style={specCardStyle}>
            <Clock size={20} color="#10b981" />
            <div>
              <div style={{ fontSize: 11, color: "#94a3b8", fontWeight: 700 }}>Total Duration</div>
              <div style={{ fontSize: 16, fontWeight: 900, color: "#ffffff" }}>200 Minutes (3h 20m)</div>
            </div>
          </div>

          <div style={specCardStyle}>
            <FileText size={20} color="#3b82f6" />
            <div>
              <div style={{ fontSize: 11, color: "#94a3b8", fontWeight: 700 }}>Total Questions</div>
              <div style={{ fontSize: 16, fontWeight: 900, color: "#ffffff" }}>180 Questions</div>
            </div>
          </div>

          <div style={specCardStyle}>
            <ShieldCheck size={20} color="#ec4899" />
            <div>
              <div style={{ fontSize: 11, color: "#94a3b8", fontWeight: 700 }}>Maximum Marks</div>
              <div style={{ fontSize: 16, fontWeight: 900, color: "#ffffff" }}>720 Marks</div>
            </div>
          </div>

          <div style={specCardStyle}>
            <Stethoscope size={20} color="#f59e0b" />
            <div>
              <div style={{ fontSize: 11, color: "#94a3b8", fontWeight: 700 }}>NCERT Alignment</div>
              <div style={{ fontSize: 16, fontWeight: 900, color: "#ffffff" }}>Class XI & XII</div>
            </div>
          </div>
        </div>

        {/* Subject Breakdown Grid */}
        <div style={{ background: "rgba(15,23,42,0.6)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 18, padding: 24, marginBottom: 28 }}>
          <h2 style={{ fontSize: 17, fontWeight: 900, color: "#ffffff", marginBottom: 16 }}>
            NEET-UG Four Subject Distribution
          </h2>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(210px, 1fr))", gap: 14 }}>
            <div style={secBoxStyle}>
              <div style={{ fontSize: 11, color: "#3b82f6", fontWeight: 800 }}>SUBJECT 1</div>
              <div style={{ fontSize: 15, fontWeight: 900, color: "#ffffff" }}>Physics</div>
              <div style={{ fontSize: 12, color: "#94a3b8", marginTop: 4 }}>45 Questions (180 Marks)</div>
            </div>

            <div style={secBoxStyle}>
              <div style={{ fontSize: 11, color: "#10b981", fontWeight: 800 }}>SUBJECT 2</div>
              <div style={{ fontSize: 15, fontWeight: 900, color: "#ffffff" }}>Chemistry</div>
              <div style={{ fontSize: 12, color: "#94a3b8", marginTop: 4 }}>45 Questions (180 Marks)</div>
            </div>

            <div style={secBoxStyle}>
              <div style={{ fontSize: 11, color: "#059669", fontWeight: 800 }}>SUBJECT 3</div>
              <div style={{ fontSize: 15, fontWeight: 900, color: "#ffffff" }}>Botany</div>
              <div style={{ fontSize: 12, color: "#94a3b8", marginTop: 4 }}>45 Questions (180 Marks)</div>
            </div>

            <div style={secBoxStyle}>
              <div style={{ fontSize: 11, color: "#ec4899", fontWeight: 800 }}>SUBJECT 4</div>
              <div style={{ fontSize: 15, fontWeight: 900, color: "#ffffff" }}>Zoology</div>
              <div style={{ fontSize: 12, color: "#94a3b8", marginTop: 4 }}>45 Questions (180 Marks)</div>
            </div>
          </div>
        </div>

        {/* Detailed Rules & Marking Scheme */}
        <div style={{ background: "rgba(15,23,42,0.6)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 18, padding: 24, marginBottom: 28 }}>
          <h2 style={{ fontSize: 17, fontWeight: 900, color: "#ffffff", marginBottom: 16 }}>
            Marking Rules &amp; Question Palette Legend
          </h2>

          <ul style={{ paddingLeft: 20, color: "#cbd5e1", fontSize: 14, lineHeight: 1.7, display: "flex", flexDirection: "column", gap: 10 }}>
            <li><strong>Correct Response:</strong> Earns <strong>+4.0 Marks</strong>.</li>
            <li><strong>Incorrect Response:</strong> Incurs a negative penalty of <strong>-1.0 Mark</strong>.</li>
            <li><strong>Unattempted Questions:</strong> 0 Marks deducted.</li>
            <li><strong>Subject Navigation:</strong> Candidates may navigate freely across Physics, Chemistry, Botany, and Zoology tabs. Selected responses remain saved when switching tabs.</li>
            <li><strong>5-State Palette:</strong>
              <span style={{ display: "inline-flex", gap: 8, flexWrap: "wrap", marginLeft: 8, marginTop: 4 }}>
                <span style={pillStyle("#334155")}>Not Visited</span>
                <span style={pillStyle("#ef4444")}>Not Answered</span>
                <span style={pillStyle("#22c55e")}>Answered</span>
                <span style={pillStyle("#8b5cf6")}>Marked for Review</span>
                <span style={pillStyle("#06b6d4")}>Answered &amp; Marked</span>
              </span>
            </li>
          </ul>
        </div>

        {/* Declaration & Action Bar */}
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.1)", paddingTop: 24, display: "flex", flexDirection: "column", gap: 20 }}>
          <label style={{ display: "flex", alignItems: "flex-start", gap: 12, cursor: "pointer", fontSize: 13, color: "#cbd5e1", lineHeight: 1.5 }}>
            <input
              type="checkbox"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
              style={{ width: 18, height: 18, marginTop: 2, accentColor: "#10b981" }}
            />
            <span>
              I have read and understood all official NTA NEET-UG examination instructions, duration (200 minutes), and marking rules (+4/-1). I declare that I am ready to begin the examination.
            </span>
          </label>

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 14 }}>
            <button
              onClick={() => navigate("/neet")}
              style={{ background: "rgba(255,255,255,0.08)", color: "#cbd5e1", border: "1px solid rgba(255,255,255,0.15)", borderRadius: 12, padding: "12px 24px", fontSize: 14, fontWeight: 800, cursor: "pointer" }}
            >
              Return to NEET Hub
            </button>

            <button
              onClick={handleStart}
              style={{
                background: agreed ? "linear-gradient(135deg, #059669, #10b981)" : "rgba(255,255,255,0.1)",
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
                boxShadow: agreed ? "0 10px 30px rgba(16,185,129,0.4)" : "none"
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
  padding: 16
};

const pillStyle = (bg) => ({
  background: bg,
  color: "#ffffff",
  padding: "2px 8px",
  borderRadius: 6,
  fontSize: 11,
  fontWeight: 700
});
