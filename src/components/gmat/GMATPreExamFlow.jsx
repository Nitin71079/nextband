import React, { useState } from "react";
import { Play, ArrowRight, ShieldCheck, Clock, CheckCircle2, Award, Calculator, Edit3, HelpCircle } from "lucide-react";

export const SECTION_ORDER_PERMUTATIONS = [
  { id: 1, name: "Quantitative → Verbal → Data Insights", keys: ["quant", "verbal", "di"] },
  { id: 2, name: "Quantitative → Data Insights → Verbal", keys: ["quant", "di", "verbal"] },
  { id: 3, name: "Verbal → Quantitative → Data Insights", keys: ["verbal", "quant", "di"] },
  { id: 4, name: "Verbal → Data Insights → Quantitative", keys: ["verbal", "di", "quant"] },
  { id: 5, name: "Data Insights → Quantitative → Verbal", keys: ["di", "quant", "verbal"] },
  { id: 6, name: "Data Insights → Verbal → Quantitative", keys: ["di", "verbal", "quant"] }
];

export default function GMATPreExamFlow({ onStartExam }) {
  const [step, setStep] = useState(1); // 1: Overview, 2: Select Section Order, 3: Instructions
  const [selectedPermutation, setSelectedPermutation] = useState(SECTION_ORDER_PERMUTATIONS[0]);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#090d16",
        color: "#ffffff",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "40px 20px",
        fontFamily: "Inter, sans-serif"
      }}
    >
      <div
        style={{
          maxWidth: "800px",
          width: "100%",
          background: "#0f172a",
          border: "1px solid #334155",
          borderRadius: "20px",
          padding: "36px",
          boxShadow: "0 20px 50px rgba(0,0,0,0.6)"
        }}
      >
        {/* Step Indicator */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "30px", borderBottom: "1px solid #1e293b", paddingBottom: "16px" }}>
          <div>
            <div style={{ fontSize: "12px", color: "#38bdf8", fontWeight: 800, textTransform: "uppercase", letterSpacing: "1px" }}>
              Knarrow GMAT Computer-Based Testing
            </div>
            <h1 style={{ fontSize: "24px", fontWeight: 900, color: "#ffffff", margin: "4px 0 0 0" }}>
              Official GMAT Focus Practice Simulator
            </h1>
          </div>

          <div style={{ display: "flex", gap: "8px" }}>
            {[1, 2, 3].map((sNum) => (
              <div
                key={sNum}
                style={{
                  width: "32px",
                  height: "32px",
                  borderRadius: "50%",
                  background: step >= sNum ? "#0284c7" : "#1e293b",
                  color: "#ffffff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: 800,
                  fontSize: "14px",
                  border: step === sNum ? "2px solid #38bdf8" : "none"
                }}
              >
                {sNum}
              </div>
            ))}
          </div>
        </div>

        {/* STEP 1: EXAM OVERVIEW */}
        {step === 1 && (
          <div>
            <h2 style={{ fontSize: "20px", fontWeight: 800, color: "#f8fafc", marginBottom: "16px" }}>
              Exam Overview & Specifications
            </h2>
            <p style={{ color: "#94a3b8", fontSize: "14px", lineHeight: "1.6", marginBottom: "24px" }}>
              This exam reproduces the official computer-based testing format for the GMAT Focus Edition. Please review the structure before proceeding:
            </p>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "16px", marginBottom: "28px" }}>
              <div style={cardStyle}>
                <div style={cardHeaderStyle}>⚡ Quantitative Reasoning</div>
                <div style={cardBodyStyle}>21 Questions · 45 Minutes<br /><span style={{ color: "#ef4444", fontSize: "12px" }}>No Calculator Allowed</span></div>
              </div>
              <div style={cardStyle}>
                <div style={cardHeaderStyle}>📖 Verbal Reasoning</div>
                <div style={cardBodyStyle}>23 Questions · 45 Minutes<br /><span style={{ color: "#94a3b8", fontSize: "12px" }}>RC & Critical Reasoning</span></div>
              </div>
              <div style={cardStyle}>
                <div style={cardHeaderStyle}>📊 Data Insights</div>
                <div style={cardBodyStyle}>20 Questions · 45 Minutes<br /><span style={{ color: "#10b981", fontSize: "12px" }}>On-Screen Calculator Allowed</span></div>
              </div>
            </div>

            <div style={{ background: "#1e293b", borderRadius: "12px", padding: "20px", marginBottom: "28px" }}>
              <div style={{ fontWeight: 700, color: "#38bdf8", marginBottom: "8px", display: "flex", alignItems: "center", gap: "8px" }}>
                <Edit3 size={18} /> Important GMAT Focus Features:
              </div>
              <ul style={{ color: "#cbd5e1", fontSize: "14px", paddingLeft: "20px", margin: 0, lineHeight: "1.7" }}>
                <li><strong>Section Order Choice:</strong> You can select the sequence in which you complete the 3 sections.</li>
                <li><strong>Question Review & Edit Stage:</strong> At the end of each section, you can review questions and change <strong>up to 3 answers per section</strong>.</li>
                <li><strong>Optional Break:</strong> A 10-minute break is offered after Section 1 or Section 2.</li>
                <li><strong>Adaptive Engine:</strong> Question difficulty adapts dynamically to your performance.</li>
              </ul>
            </div>

            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <button onClick={() => setStep(2)} style={primaryBtnStyle}>
                Next: Choose Section Order <ArrowRight size={18} />
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: SECTION ORDER SELECTION (6 PERMUTATIONS) */}
        {step === 2 && (
          <div>
            <h2 style={{ fontSize: "20px", fontWeight: 800, color: "#f8fafc", marginBottom: "8px" }}>
              Select Section Order
            </h2>
            <p style={{ color: "#94a3b8", fontSize: "14px", marginBottom: "24px" }}>
              Choose your preferred sequence for taking the 3 exam sections. This order cannot be altered once the exam starts.
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginBottom: "28px" }}>
              {SECTION_ORDER_PERMUTATIONS.map((perm) => {
                const isSelected = selectedPermutation.id === perm.id;
                return (
                  <label
                    key={perm.id}
                    onClick={() => setSelectedPermutation(perm)}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      background: isSelected ? "rgba(2, 132, 199, 0.2)" : "#1e293b",
                      border: isSelected ? "2px solid #0284c7" : "1px solid #334155",
                      borderRadius: "12px",
                      padding: "16px 20px",
                      cursor: "pointer",
                      transition: "all 0.15s ease"
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                      <input
                        type="radio"
                        name="gmat_perm"
                        checked={isSelected}
                        onChange={() => setSelectedPermutation(perm)}
                        style={{ width: "20px", height: "20px", accentColor: "#0284c7" }}
                      />
                      <span style={{ color: isSelected ? "#ffffff" : "#e2e8f0", fontSize: "15px", fontWeight: isSelected ? 800 : 600 }}>
                        {perm.name}
                      </span>
                    </div>

                    <span style={{ fontSize: "12px", color: isSelected ? "#38bdf8" : "#64748b", fontWeight: 700 }}>
                      Option {perm.id}
                    </span>
                  </label>
                );
              })}
            </div>

            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <button onClick={() => setStep(1)} style={secondaryBtnStyle}>
                Back
              </button>
              <button onClick={() => setStep(3)} style={primaryBtnStyle}>
                Confirm Order & View Instructions <ArrowRight size={18} />
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: EXAM INSTRUCTIONS */}
        {step === 3 && (
          <div>
            <h2 style={{ fontSize: "20px", fontWeight: 800, color: "#f8fafc", marginBottom: "12px" }}>
              Test-Taking Instructions
            </h2>

            <div style={{ background: "#1e293b", borderRadius: "12px", padding: "20px", marginBottom: "28px", color: "#cbd5e1", fontSize: "14px", lineHeight: "1.7" }}>
              <div style={{ fontWeight: 800, color: "#ffffff", marginBottom: "10px" }}>
                Selected Order: <span style={{ color: "#38bdf8" }}>{selectedPermutation.name}</span>
              </div>
              <p style={{ margin: "0 0 12px 0" }}>
                • Each section is timed independently at <strong>45 minutes</strong>.
              </p>
              <p style={{ margin: "0 0 12px 0" }}>
                • When a section timer expires, the section is automatically locked and all responses are saved.
              </p>
              <p style={{ margin: "0 0 12px 0" }}>
                • An on-screen calculator will be available ONLY during the <strong>Data Insights</strong> section.
              </p>
              <p style={{ margin: 0 }}>
                • Answers are synchronized automatically. Closing or refreshing the tab will restore your exam session.
              </p>
            </div>

            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <button onClick={() => setStep(2)} style={secondaryBtnStyle}>
                Back
              </button>
              <button onClick={() => onStartExam(selectedPermutation.keys)} style={{ ...primaryBtnStyle, background: "linear-gradient(135deg, #10b981, #0284c7)" }}>
                <Play size={18} fill="#ffffff" /> Begin Official GMAT Simulator
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

const cardStyle = {
  background: "#1e293b",
  border: "1px solid #334155",
  borderRadius: "12px",
  padding: "16px"
};

const cardHeaderStyle = {
  fontSize: "14px",
  fontWeight: 800,
  color: "#f8fafc",
  marginBottom: "6px"
};

const cardBodyStyle = {
  fontSize: "13px",
  color: "#cbd5e1"
};

const primaryBtnStyle = {
  background: "#0284c7",
  color: "#ffffff",
  border: "none",
  borderRadius: "10px",
  padding: "12px 24px",
  fontWeight: 800,
  fontSize: "14px",
  cursor: "pointer",
  display: "inline-flex",
  alignItems: "center",
  gap: "8px"
};

const secondaryBtnStyle = {
  background: "transparent",
  color: "#94a3b8",
  border: "1px solid #334155",
  borderRadius: "10px",
  padding: "12px 20px",
  fontWeight: 700,
  fontSize: "14px",
  cursor: "pointer"
};
