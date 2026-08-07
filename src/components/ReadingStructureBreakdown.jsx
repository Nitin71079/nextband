import { useState } from "react";
import { BookOpen, Clock, FileText, BarChart2, Layers, CheckCircle2, ChevronDown, ChevronUp } from "lucide-react";

export default function ReadingStructureBreakdown({ initialOpen = false }) {
  const [isOpen, setIsOpen] = useState(initialOpen);
  const [activeTab, setActiveTab] = useState("all"); // "all" | "academic" | "general"

  return (
    <div
      className="card"
      style={{
        marginBottom: "35px",
        background: "var(--surface)",
        border: "1px solid var(--border)",
        borderRadius: "24px",
        padding: "28px",
        boxShadow: "var(--shadow)",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          cursor: "pointer",
          userSelect: "none",
        }}
        onClick={() => setIsOpen(!isOpen)}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
          <div
            style={{
              width: "48px",
              height: "48px",
              borderRadius: "16px",
              background: "linear-gradient(135deg, #2563eb, #06b6d4)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
              fontSize: "22px",
            }}
          >
            📊
          </div>
          <div>
            <h2 style={{ fontSize: "22px", fontWeight: "800", margin: 0, color: "var(--text)" }}>
              IELTS Reading Test Breakdown & Format
            </h2>
            <p style={{ margin: "4px 0 0", color: "var(--text-secondary)", fontSize: "14px" }}>
              Standard structure, word counts, difficulty progression, and question distribution for Academic & General Training.
            </p>
          </div>
        </div>

        <button
          className="secondary-btn"
          style={{
            padding: "10px 18px",
            fontSize: "14px",
            borderRadius: "12px",
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
          }}
          onClick={(e) => {
            e.stopPropagation();
            setIsOpen(!isOpen);
          }}
        >
          {isOpen ? (
            <>
              Hide Breakdown <ChevronUp size={16} />
            </>
          ) : (
            <>
              View Breakdown <ChevronDown size={16} />
            </>
          )}
        </button>
      </div>

      {isOpen && (
        <div style={{ marginTop: "28px", paddingTop: "24px", borderTop: "1px solid var(--border)" }}>
          {/* Subheader Intro */}
          <div
            style={{
              padding: "16px 20px",
              background: "var(--surface-2)",
              borderRadius: "16px",
              marginBottom: "24px",
              borderLeft: "4px solid #2563eb",
            }}
          >
            <p style={{ margin: 0, fontSize: "15px", lineHeight: "1.7", color: "var(--text)" }}>
              Here's a breakdown of the <strong>IELTS Academic</strong> and <strong>IELTS General Training Reading</strong> tests, including the typical word count and standard structure.
            </p>
          </div>

          {/* Module Switcher Tabs */}
          <div
            style={{
              display: "flex",
              gap: "10px",
              marginBottom: "24px",
              flexWrap: "wrap",
            }}
          >
            <button
              style={{
                padding: "10px 20px",
                borderRadius: "12px",
                fontWeight: "700",
                fontSize: "14px",
                background: activeTab === "all" ? "#2563eb" : "var(--surface-2)",
                color: activeTab === "all" ? "white" : "var(--text-secondary)",
                border: "1px solid " + (activeTab === "all" ? "#2563eb" : "var(--border)"),
                cursor: "pointer",
              }}
              onClick={() => setActiveTab("all")}
            >
              🔄 Overview Comparison
            </button>
            <button
              style={{
                padding: "10px 20px",
                borderRadius: "12px",
                fontWeight: "700",
                fontSize: "14px",
                background: activeTab === "academic" ? "#2563eb" : "var(--surface-2)",
                color: activeTab === "academic" ? "white" : "var(--text-secondary)",
                border: "1px solid " + (activeTab === "academic" ? "#2563eb" : "var(--border)"),
                cursor: "pointer",
              }}
              onClick={() => setActiveTab("academic")}
            >
              📘 IELTS Academic Reading
            </button>
            <button
              style={{
                padding: "10px 20px",
                borderRadius: "12px",
                fontWeight: "700",
                fontSize: "14px",
                background: activeTab === "general" ? "#7c3aed" : "var(--surface-2)",
                color: activeTab === "general" ? "white" : "var(--text-secondary)",
                border: "1px solid " + (activeTab === "general" ? "#7c3aed" : "var(--border)"),
                cursor: "pointer",
              }}
              onClick={() => setActiveTab("general")}
            >
              📗 IELTS General Training Reading
            </button>
          </div>

          {/* Overview Comparison Table */}
          {(activeTab === "all" || activeTab === "academic" || activeTab === "general") && (
            <div style={{ overflowX: "auto", marginBottom: "32px" }}>
              <table
                style={{
                  width: "100%",
                  borderCollapse: "separate",
                  borderSpacing: 0,
                  borderRadius: "16px",
                  overflow: "hidden",
                  border: "1px solid var(--border)",
                  fontSize: "14px",
                }}
              >
                <thead>
                  <tr style={{ background: "var(--surface-2)" }}>
                    <th style={{ padding: "14px 18px", textAlign: "left", color: "var(--text)" }}>Feature</th>
                    <th style={{ padding: "14px 18px", textAlign: "left", color: "#2563eb", fontWeight: "800" }}>
                      IELTS Academic Reading
                    </th>
                    <th style={{ padding: "14px 18px", textAlign: "left", color: "#7c3aed", fontWeight: "800" }}>
                      IELTS General Training Reading
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr style={{ borderTop: "1px solid var(--border)" }}>
                    <td style={{ padding: "14px 18px", fontWeight: "700", color: "var(--text)" }}>Duration</td>
                    <td style={{ padding: "14px 18px", color: "var(--text-secondary)" }}>60 minutes</td>
                    <td style={{ padding: "14px 18px", color: "var(--text-secondary)" }}>60 minutes</td>
                  </tr>
                  <tr style={{ borderTop: "1px solid var(--border)", background: "rgba(0,0,0,0.02)" }}>
                    <td style={{ padding: "14px 18px", fontWeight: "700", color: "var(--text)" }}>Questions</td>
                    <td style={{ padding: "14px 18px", color: "var(--text-secondary)" }}>40</td>
                    <td style={{ padding: "14px 18px", color: "var(--text-secondary)" }}>40</td>
                  </tr>
                  <tr style={{ borderTop: "1px solid var(--border)" }}>
                    <td style={{ padding: "14px 18px", fontWeight: "700", color: "var(--text)" }}>Passages / Sections</td>
                    <td style={{ padding: "14px 18px", color: "var(--text-secondary)" }}>3 long passages</td>
                    <td style={{ padding: "14px 18px", color: "var(--text-secondary)" }}>
                      3 sections (multiple shorter + longer texts)
                    </td>
                  </tr>
                  <tr style={{ borderTop: "1px solid var(--border)", background: "rgba(0,0,0,0.02)" }}>
                    <td style={{ padding: "14px 18px", fontWeight: "700", color: "var(--text)" }}>Total Word Count</td>
                    <td style={{ padding: "14px 18px", color: "var(--text-secondary)", fontWeight: "700" }}>
                      2,150–2,750 words
                    </td>
                    <td style={{ padding: "14px 18px", color: "var(--text-secondary)", fontWeight: "700" }}>
                      2,400–2,900 words
                    </td>
                  </tr>
                  <tr style={{ borderTop: "1px solid var(--border)" }}>
                    <td style={{ padding: "14px 18px", fontWeight: "700", color: "var(--text)" }}>Difficulty</td>
                    <td style={{ padding: "14px 18px", color: "var(--text-secondary)" }}>
                      Increases from Passage 1 → 3
                    </td>
                    <td style={{ padding: "14px 18px", color: "var(--text-secondary)" }}>
                      Increases from Section 1 → 3
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}

          {/* Academic Outline */}
          {(activeTab === "all" || activeTab === "academic") && (
            <div style={{ marginBottom: "36px" }}>
              <h3
                style={{
                  fontSize: "20px",
                  fontWeight: "800",
                  color: "#2563eb",
                  marginBottom: "16px",
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                }}
              >
                📘 IELTS Academic Reading — Standard Outline
              </h3>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                  gap: "18px",
                }}
              >
                {/* Passage 1 */}
                <div
                  style={{
                    background: "var(--surface-2)",
                    padding: "20px",
                    borderRadius: "18px",
                    border: "1px solid var(--border)",
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px" }}>
                    <h4 style={{ margin: 0, fontSize: "17px", fontWeight: "800", color: "var(--text)" }}>Passage 1</h4>
                    <span className="badge" style={{ background: "rgba(34,197,94,0.15)", color: "#16a34a" }}>
                      Easy (700–900 words)
                    </span>
                  </div>
                  <p style={{ fontSize: "14px", color: "var(--text-secondary)", marginBottom: "12px", lineHeight: "1.6" }}>
                    <strong>Topic:</strong> General academic topic with easier vocabulary (Facts, Descriptions, Processes).
                  </p>
                  <div style={{ fontSize: "13px", color: "var(--text-muted)" }}>
                    <strong>Question Types:</strong>
                    <ul style={{ paddingLeft: "20px", marginTop: "6px", lineHeight: "1.7" }}>
                      <li>True / False / Not Given</li>
                      <li>Matching Headings</li>
                      <li>Sentence Completion</li>
                      <li>Diagram Labeling</li>
                    </ul>
                  </div>
                </div>

                {/* Passage 2 */}
                <div
                  style={{
                    background: "var(--surface-2)",
                    padding: "20px",
                    borderRadius: "18px",
                    border: "1px solid var(--border)",
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px" }}>
                    <h4 style={{ margin: 0, fontSize: "17px", fontWeight: "800", color: "var(--text)" }}>Passage 2</h4>
                    <span className="badge" style={{ background: "rgba(245,158,11,0.15)", color: "#d97706" }}>
                      Medium (700–900 words)
                    </span>
                  </div>
                  <p style={{ fontSize: "14px", color: "var(--text-secondary)", marginBottom: "12px", lineHeight: "1.6" }}>
                    <strong>Topic:</strong> Detailed academic article (Scientific, Social, History, Business).
                  </p>
                  <div style={{ fontSize: "13px", color: "var(--text-muted)" }}>
                    <strong>Common Questions:</strong>
                    <ul style={{ paddingLeft: "20px", marginTop: "6px", lineHeight: "1.7" }}>
                      <li>Matching Information</li>
                      <li>Summary Completion</li>
                      <li>Multiple Choice</li>
                      <li>Matching Features</li>
                    </ul>
                  </div>
                </div>

                {/* Passage 3 */}
                <div
                  style={{
                    background: "var(--surface-2)",
                    padding: "20px",
                    borderRadius: "18px",
                    border: "1px solid var(--border)",
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px" }}>
                    <h4 style={{ margin: 0, fontSize: "17px", fontWeight: "800", color: "var(--text)" }}>Passage 3</h4>
                    <span className="badge" style={{ background: "rgba(239,68,68,0.15)", color: "#dc2626" }}>
                      Hardest (750–950 words)
                    </span>
                  </div>
                  <p style={{ fontSize: "14px", color: "var(--text-secondary)", marginBottom: "12px", lineHeight: "1.6" }}>
                    <strong>Topic:</strong> Complex academic discussion, research, opinion, multiple viewpoints.
                  </p>
                  <div style={{ fontSize: "13px", color: "var(--text-muted)" }}>
                    <strong>Common Questions:</strong>
                    <ul style={{ paddingLeft: "20px", marginTop: "6px", lineHeight: "1.7" }}>
                      <li>Yes / No / Not Given</li>
                      <li>Matching Headings</li>
                      <li>Summary Completion</li>
                      <li>Multiple Choice & Sentence Endings</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div style={{ marginTop: "14px", fontSize: "13px", color: "var(--text-muted)", fontWeight: "600" }}>
                Total Academic Reading: 3 passages · 2,150–2,750 words · 40 questions
              </div>
            </div>
          )}

          {/* General Training Outline */}
          {(activeTab === "all" || activeTab === "general") && (
            <div style={{ marginBottom: "36px" }}>
              <h3
                style={{
                  fontSize: "20px",
                  fontWeight: "800",
                  color: "#7c3aed",
                  marginBottom: "16px",
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                }}
              >
                📗 IELTS General Training Reading — Standard Outline
              </h3>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                  gap: "18px",
                }}
              >
                {/* Section 1 */}
                <div
                  style={{
                    background: "var(--surface-2)",
                    padding: "20px",
                    borderRadius: "18px",
                    border: "1px solid var(--border)",
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px" }}>
                    <h4 style={{ margin: 0, fontSize: "17px", fontWeight: "800", color: "var(--text)" }}>Section 1</h4>
                    <span className="badge" style={{ background: "rgba(34,197,94,0.15)", color: "#16a34a" }}>
                      Easy (600–800 words)
                    </span>
                  </div>
                  <p style={{ fontSize: "14px", color: "var(--text-secondary)", marginBottom: "12px", lineHeight: "1.6" }}>
                    <strong>Contains:</strong> 2–3 short texts (Notices, Advertisements, Timetables, Instructions, Signs).
                  </p>
                  <div style={{ fontSize: "13px", color: "var(--text-muted)" }}>
                    <strong>Questions:</strong>
                    <ul style={{ paddingLeft: "20px", marginTop: "6px", lineHeight: "1.7" }}>
                      <li>Matching</li>
                      <li>Multiple Choice</li>
                      <li>Sentence Completion</li>
                    </ul>
                  </div>
                </div>

                {/* Section 2 */}
                <div
                  style={{
                    background: "var(--surface-2)",
                    padding: "20px",
                    borderRadius: "18px",
                    border: "1px solid var(--border)",
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px" }}>
                    <h4 style={{ margin: 0, fontSize: "17px", fontWeight: "800", color: "var(--text)" }}>Section 2</h4>
                    <span className="badge" style={{ background: "rgba(245,158,11,0.15)", color: "#d97706" }}>
                      Medium (700–900 words)
                    </span>
                  </div>
                  <p style={{ fontSize: "14px", color: "var(--text-secondary)", marginBottom: "12px", lineHeight: "1.6" }}>
                    <strong>Contains:</strong> 2 workplace-related texts (Company policies, Training manuals, Job descriptions, Workplace notices).
                  </p>
                  <div style={{ fontSize: "13px", color: "var(--text-muted)" }}>
                    <strong>Questions:</strong>
                    <ul style={{ paddingLeft: "20px", marginTop: "6px", lineHeight: "1.7" }}>
                      <li>Matching</li>
                      <li>Short Answer</li>
                      <li>True / False / Not Given</li>
                    </ul>
                  </div>
                </div>

                {/* Section 3 */}
                <div
                  style={{
                    background: "var(--surface-2)",
                    padding: "20px",
                    borderRadius: "18px",
                    border: "1px solid var(--border)",
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px" }}>
                    <h4 style={{ margin: 0, fontSize: "17px", fontWeight: "800", color: "var(--text)" }}>Section 3</h4>
                    <span className="badge" style={{ background: "rgba(239,68,68,0.15)", color: "#dc2626" }}>
                      Hardest (1,000–1,200 words)
                    </span>
                  </div>
                  <p style={{ fontSize: "14px", color: "var(--text-secondary)", marginBottom: "12px", lineHeight: "1.6" }}>
                    <strong>Contains:</strong> 1 long article (Magazine article, Newspaper feature, Guide, Informative text).
                  </p>
                  <div style={{ fontSize: "13px", color: "var(--text-muted)" }}>
                    <strong>Questions:</strong>
                    <ul style={{ paddingLeft: "20px", marginTop: "6px", lineHeight: "1.7" }}>
                      <li>Matching Headings</li>
                      <li>Summary Completion</li>
                      <li>Multiple Choice & Sentence Completion</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div style={{ marginTop: "14px", fontSize: "13px", color: "var(--text-muted)", fontWeight: "600" }}>
                Total General Reading: 3 sections · 2,400–2,900 words · 40 questions
              </div>
            </div>
          )}

          {/* Question Distribution & Question Types */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "20px",
              marginTop: "28px",
            }}
          >
            {/* Standard Question Distribution */}
            <div
              style={{
                background: "var(--surface-2)",
                padding: "22px",
                borderRadius: "18px",
                border: "1px solid var(--border)",
              }}
            >
              <h4 style={{ fontSize: "16px", fontWeight: "800", color: "var(--text)", marginBottom: "12px" }}>
                🎯 Standard Question Distribution (40 Questions)
              </h4>
              <ul style={{ paddingLeft: "20px", margin: 0, lineHeight: "1.8", color: "var(--text-secondary)", fontSize: "14px" }}>
                <li><strong>Passage / Section 1:</strong> 13–14 questions</li>
                <li><strong>Passage / Section 2:</strong> 13–14 questions</li>
                <li><strong>Passage / Section 3:</strong> 12–14 questions</li>
                <li><strong>Total:</strong> Exactly 40 questions</li>
              </ul>
            </div>

            {/* Common Question Types List */}
            <div
              style={{
                background: "var(--surface-2)",
                padding: "22px",
                borderRadius: "18px",
                border: "1px solid var(--border)",
              }}
            >
              <h4 style={{ fontSize: "16px", fontWeight: "800", color: "var(--text)", marginBottom: "12px" }}>
                📝 Common IELTS Reading Question Types
              </h4>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "6px 12px",
                  fontSize: "13px",
                  color: "var(--text-secondary)",
                }}
              >
                <div>• Multiple Choice</div>
                <div>• True / False / Not Given</div>
                <div>• Yes / No / Not Given</div>
                <div>• Matching Headings</div>
                <div>• Matching Information</div>
                <div>• Matching Features</div>
                <div>• Matching Sentence Endings</div>
                <div>• Sentence Completion</div>
                <div>• Summary Completion</div>
                <div>• Table Completion</div>
                <div>• Flow-chart Completion</div>
                <div>• Diagram Label Completion</div>
                <div>• Note Completion</div>
                <div>• Short Answer Questions</div>
              </div>
            </div>
          </div>

          {/* Difficulty Progression Footer Note */}
          <div
            style={{
              marginTop: "24px",
              padding: "16px 20px",
              background: "rgba(37, 99, 235, 0.08)",
              border: "1px solid rgba(37, 99, 235, 0.2)",
              borderRadius: "14px",
              fontSize: "13px",
              lineHeight: "1.7",
              color: "var(--text-secondary)",
            }}
          >
            <strong>Difficulty Progression:</strong> Academic progresses from <em>Passage 1 (Easy) → Passage 2 (Moderate) → Passage 3 (Difficult)</em>. General Training progresses from <em>Section 1 (Everyday notices - Easy) → Section 2 (Workplace texts - Medium) → Section 3 (Long informative article - Hard)</em>. These ranges closely match official IELTS specifications for realistic reading practice.
          </div>
        </div>
      )}
    </div>
  );
}
