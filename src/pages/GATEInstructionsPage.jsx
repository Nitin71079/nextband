import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ShieldCheck, Clock, Calculator, AlertTriangle, FileText, CheckCircle2, ChevronRight, User } from "lucide-react";
import { getGATEMockById } from "../data/gate/gateTests";
import { getGATEConfig } from "../config/gateConfig";

export default function GATEInstructionsPage() {
  const { testId } = useParams();
  const navigate = useNavigate();

  const mockObj = getGATEMockById(testId);
  const config = getGATEConfig(mockObj.testVersion || "GATE_2026");

  const [agreed, setAgreed] = useState(false);

  const handleStart = () => {
    if (!agreed) {
      alert("Please read and accept the instructions before starting the examination.");
      return;
    }
    navigate(`/gate/test/${mockObj.id}`);
  };

  return (
    <div style={{ minHeight: "100vh", background: "#090d16", color: "#ffffff", fontFamily: "Inter, sans-serif", padding: "40px 24px" }}>
      <div style={{ maxWidth: 1000, margin: "0 auto", background: "#0f172a", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 24, padding: 36, boxShadow: "0 20px 60px rgba(0,0,0,0.6)" }}>

        {/* Top Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid rgba(255,255,255,0.1)", pb: 24, paddingBottom: 24, marginBottom: 28, flexWrap: "wrap", gap: 16 }}>
          <div>
            <span style={{ background: "rgba(56,189,248,0.2)", color: "#38bdf8", border: "1px solid rgba(56,189,248,0.3)", padding: "4px 12px", borderRadius: 8, fontSize: 12, fontWeight: 900 }}>
              OFFICIAL GATE CBT INSTRUCTIONAL SYSTEM
            </span>
            <h1 style={{ fontSize: 26, fontWeight: 900, color: "#ffffff", marginTop: 8, marginBottom: 4 }}>
              {mockObj.title}
            </h1>
            <div style={{ fontSize: 13, color: "#94a3b8" }}>
              Paper Code: <strong style={{ color: "#38bdf8" }}>{mockObj.branchCode}</strong> ({mockObj.branchTitle || "Engineering"})
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 14, background: "rgba(30,41,59,0.8)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 16, padding: "12px 20px" }}>
            <div style={{ width: 44, height: 44, borderRadius: "50%", background: "linear-gradient(135deg, #0284c7, #7c3aed)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <User size={22} color="#ffffff" />
            </div>
            <div>
              <div style={{ fontSize: 14, fontWeight: 900, color: "#ffffff" }}>Candidate Examination Terminal</div>
              <div style={{ fontSize: 11, color: "#4ade80", fontWeight: 800 }}>System Verified · Ready</div>
            </div>
          </div>
        </div>

        {/* Exam Quick Specs Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16, marginBottom: 32 }}>
          <div style={specCardStyle}>
            <Clock size={20} color="#38bdf8" />
            <div>
              <div style={{ fontSize: 11, color: "#94a3b8", fontWeight: 700 }}>Total Duration</div>
              <div style={{ fontSize: 16, fontWeight: 900, color: "#ffffff" }}>180 Minutes (3 Hrs)</div>
            </div>
          </div>

          <div style={specCardStyle}>
            <FileText size={20} color="#a855f7" />
            <div>
              <div style={{ fontSize: 11, color: "#94a3b8", fontWeight: 700 }}>Total Questions</div>
              <div style={{ fontSize: 16, fontWeight: 900, color: "#ffffff" }}>65 Questions</div>
            </div>
          </div>

          <div style={specCardStyle}>
            <ShieldCheck size={20} color="#22c55e" />
            <div>
              <div style={{ fontSize: 11, color: "#94a3b8", fontWeight: 700 }}>Maximum Marks</div>
              <div style={{ fontSize: 16, fontWeight: 900, color: "#ffffff" }}>100 Marks</div>
            </div>
          </div>

          <div style={specCardStyle}>
            <Calculator size={20} color="#f59e0b" />
            <div>
              <div style={{ fontSize: 11, color: "#94a3b8", fontWeight: 700 }}>Scientific Calculator</div>
              <div style={{ fontSize: 16, fontWeight: 900, color: "#ffffff" }}>On-Screen Provided</div>
            </div>
          </div>
        </div>

        {/* Detailed Guidelines Section */}
        <div style={{ background: "rgba(15,23,42,0.6)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 18, padding: 24, marginBottom: 28 }}>
          <h2 style={{ fontSize: 17, fontWeight: 900, color: "#ffffff", marginBottom: 16, display: "flex", alignItems: "center", gap: 8 }}>
            <FileText size={18} color="#38bdf8" /> General Instructions &amp; Examination Regulations
          </h2>

          <ol style={{ paddingLeft: 20, color: "#cbd5e1", fontSize: 14, lineHeight: 1.7, display: "flex", flexDirection: "column", gap: 10 }}>
            <li>
              <strong>Exam Structure:</strong> The question paper consists of 2 sections: <strong>General Aptitude (GA)</strong> (10 questions, 15 marks) and <strong>Engineering Mathematics &amp; Core Subject</strong> (55 questions, 85 marks).
            </li>
            <li>
              <strong>Question Formats:</strong>
              <ul style={{ paddingLeft: 18, marginTop: 4 }}>
                <li><strong>Multiple Choice Questions (MCQ):</strong> 4 options provided with exactly 1 correct answer.</li>
                <li><strong>Multiple Select Questions (MSQ):</strong> 4 options provided; 1 or more options may be correct. No partial credit. Zero negative marking.</li>
                <li><strong>Numerical Answer Type (NAT):</strong> Numerical answer to be entered using the on-screen numeric keypad. Zero negative marking.</li>
              </ul>
            </li>
            <li>
              <strong>Marking &amp; Negative Deductions:</strong>
              <ul style={{ paddingLeft: 18, marginTop: 4 }}>
                <li>1-Mark MCQ: Correct answer = <strong>+1</strong>, Incorrect answer = <strong>-0.33</strong> (1/3 penalty).</li>
                <li>2-Mark MCQ: Correct answer = <strong>+2</strong>, Incorrect answer = <strong>-0.67</strong> (2/3 penalty).</li>
                <li>MSQ &amp; NAT: No negative marking for wrong answers.</li>
              </ul>
            </li>
            <li>
              <strong>Virtual Scientific Calculator:</strong> An on-screen scientific calculator is available at the top right toolbar. Physical calculators are strictly prohibited.
            </li>
          </ol>
        </div>

        {/* Official GATE Palette Status Legend */}
        <div style={{ background: "rgba(15,23,42,0.6)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 18, padding: 24, marginBottom: 32 }}>
          <h2 style={{ fontSize: 17, fontWeight: 900, color: "#ffffff", marginBottom: 16 }}>
            Official GATE 5-State Question Palette Legend
          </h2>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 14 }}>
            <div style={legendBoxStyle}>
              <div style={{ width: 28, height: 28, borderRadius: 6, background: "rgba(255,255,255,0.15)", border: "1px solid rgba(255,255,255,0.3)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, color: "#fff", fontSize: 12 }}>1</div>
              <div>
                <div style={{ fontWeight: 800, fontSize: 13, color: "#ffffff" }}>Not Visited</div>
                <div style={{ fontSize: 11, color: "#94a3b8" }}>You have not visited the question yet.</div>
              </div>
            </div>

            <div style={legendBoxStyle}>
              <div style={{ width: 28, height: 28, borderRadius: 6, background: "#ef4444", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, color: "#fff", fontSize: 12 }}>2</div>
              <div>
                <div style={{ fontWeight: 800, fontSize: 13, color: "#ffffff" }}>Not Answered</div>
                <div style={{ fontSize: 11, color: "#94a3b8" }}>Visited but did not answer.</div>
              </div>
            </div>

            <div style={legendBoxStyle}>
              <div style={{ width: 28, height: 28, borderRadius: 6, background: "#22c55e", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, color: "#fff", fontSize: 12 }}>3</div>
              <div>
                <div style={{ fontWeight: 800, fontSize: 13, color: "#ffffff" }}>Answered</div>
                <div style={{ fontSize: 11, color: "#94a3b8" }}>Question answered &amp; saved.</div>
              </div>
            </div>

            <div style={legendBoxStyle}>
              <div style={{ width: 28, height: 28, borderRadius: "50%", background: "#a855f7", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, color: "#fff", fontSize: 12 }}>4</div>
              <div>
                <div style={{ fontWeight: 800, fontSize: 13, color: "#ffffff" }}>Marked for Review</div>
                <div style={{ fontSize: 11, color: "#94a3b8" }}>Marked for review without answering.</div>
              </div>
            </div>

            <div style={legendBoxStyle}>
              <div style={{ width: 28, height: 28, borderRadius: "50%", background: "#7e22ce", position: "relative", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, color: "#fff", fontSize: 12 }}>
                5
                <span style={{ position: "absolute", bottom: -2, right: -2, width: 10, height: 10, borderRadius: "50%", background: "#22c55e", border: "1px solid #0f172a" }} />
              </div>
              <div>
                <div style={{ fontWeight: 800, fontSize: 13, color: "#ffffff" }}>Answered &amp; Marked</div>
                <div style={{ fontSize: 11, color: "#94a3b8" }}>Answered &amp; marked for review (evaluated).</div>
              </div>
            </div>
          </div>
        </div>

        {/* Declaration & Action Footer */}
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.1)", paddingTop: 24, display: "flex", flexDirection: "column", gap: 20 }}>
          <label style={{ display: "flex", alignItems: "flex-start", gap: 12, cursor: "pointer", fontSize: 13, color: "#cbd5e1", lineHeight: 1.5 }}>
            <input
              type="checkbox"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
              style={{ width: 18, height: 18, marginTop: 2, accentColor: "#0284c7" }}
            />
            <span>
              I have read and understood all the official GATE examination instructions and regulations. I declare that I am using a clean browser terminal and am ready to begin.
            </span>
          </label>

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 14 }}>
            <button
              onClick={() => navigate("/gate")}
              style={{ background: "rgba(255,255,255,0.08)", color: "#cbd5e1", border: "1px solid rgba(255,255,255,0.15)", borderRadius: 12, padding: "12px 24px", fontSize: 14, fontWeight: 800, cursor: "pointer" }}
            >
              Return to GATE Center
            </button>

            <button
              onClick={handleStart}
              style={{
                background: agreed ? "linear-gradient(135deg, #0284c7, #7c3aed)" : "rgba(255,255,255,0.1)",
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
                boxShadow: agreed ? "0 10px 30px rgba(2,132,199,0.4)" : "none"
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

const legendBoxStyle = {
  background: "rgba(30,41,59,0.6)",
  border: "1px solid rgba(255,255,255,0.08)",
  borderRadius: 12,
  padding: 12,
  display: "flex",
  alignItems: "center",
  gap: 12
};
