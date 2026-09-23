import React, { useState } from "react";
import { BookOpen, X, Calculator, Atom, FileText, Check, Copy } from "lucide-react";

/**
 * ACTFormulaSheetDrawer Component
 * Official Digital ACT Reference Formula Sheet & Scratchpad Drawer.
 * Provides instant access to official Math formulas, Science constants, and rough scratchpad space.
 */
export default function ACTFormulaSheetDrawer({ isOpen, onClose, scratchText, setScratchText }) {
  const [activeTab, setActiveTab] = useState("math"); // 'math', 'science', 'scratchpad'
  const [copiedKey, setCopiedKey] = useState(null);

  if (!isOpen) return null;

  const copyFormula = (text, key) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 1500);
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(3, 7, 18, 0.75)",
        backdropFilter: "blur(6px)",
        zIndex: 9995,
        display: "flex",
        justifyContent: "flex-end"
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 580,
          height: "100%",
          background: "#0f172a",
          borderLeft: "2px solid #38bdf8",
          boxShadow: "-10px 0 40px rgba(0,0,0,0.8)",
          display: "flex",
          flexDirection: "column",
          color: "#ffffff",
          fontFamily: "Inter, sans-serif"
        }}
      >
        {/* Header Bar */}
        <div
          style={{
            padding: "20px 24px",
            borderBottom: "1px solid rgba(255,255,255,0.12)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            background: "#020617"
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <BookOpen size={20} color="#38bdf8" />
            <h2 style={{ fontSize: 17, fontWeight: 900, margin: 0, color: "#ffffff" }}>
              ACT Official Reference &amp; Utilities
            </h2>
          </div>
          <button
            onClick={onClose}
            style={{
              background: "rgba(255,255,255,0.08)",
              color: "#cbd5e1",
              border: "1px solid rgba(255,255,255,0.15)",
              borderRadius: 10,
              padding: 6,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div style={{ display: "flex", background: "#0f172a", borderBottom: "1px solid rgba(255,255,255,0.1)", padding: "8px 16px", gap: 8 }}>
          {[
            { id: "math", title: "Math Formulas", icon: Calculator, color: "#38bdf8" },
            { id: "science", title: "Science Reference", icon: Atom, color: "#db2777" },
            { id: "scratchpad", title: "Digital Scratchpad", icon: FileText, color: "#facc15" }
          ].map((tab) => {
            const IconComp = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  flex: 1,
                  background: isActive ? "rgba(56,189,248,0.15)" : "transparent",
                  color: isActive ? tab.color : "#94a3b8",
                  border: isActive ? `1px solid ${tab.color}` : "1px solid transparent",
                  borderRadius: 12,
                  padding: "10px 8px",
                  fontSize: 12,
                  fontWeight: 800,
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 6,
                  transition: "all 0.2s ease"
                }}
              >
                <IconComp size={15} /> {tab.title}
              </button>
            );
          })}
        </div>

        {/* Content Area */}
        <div style={{ flex: 1, overflowY: "auto", padding: 24 }}>
          {activeTab === "math" && (
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              <div style={{ background: "rgba(56,189,248,0.1)", border: "1px solid rgba(56,189,248,0.3)", borderRadius: 14, padding: 14, fontSize: 12, color: "#cbd5e1" }}>
                💡 <strong>Official ACT Math Note:</strong> Formulas are provided for reference. Memory of core identities (Pythagorean theorem, slope, quadratic formula) speeds up completion!
              </div>

              {/* Geometry */}
              <div>
                <h4 style={{ fontSize: 14, fontWeight: 900, color: "#38bdf8", marginBottom: 10, textTransform: "uppercase" }}>
                  1. Geometry &amp; Trigonometry
                </h4>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                  {[
                    { label: "Pythagorean Theorem", formula: "a² + b² = c²" },
                    { label: "Distance Formula", formula: "d = √[(x₂ - x₁)² + (y₂ - y₁)²]" },
                    { label: "Midpoint Formula", formula: "M = ((x₁+x₂)/2, (y₁+y₂)/2)" },
                    { label: "Circle Area & Circumference", formula: "A = πr²,  C = 2πr" },
                    { label: "Triangle Area", formula: "A = ½ · b · h" },
                    { label: "Trapezoid Area", formula: "A = ½(b₁ + b₂)h" },
                    { label: "Cylinder Volume", formula: "V = πr²h" },
                    { label: "Sphere Volume", formula: "V = ⁴⁄₃ πr³" },
                    { label: "SOH CAH TOA", formula: "sin θ = O/H, cos θ = A/H, tan θ = O/A" },
                    { label: "Pythagorean Identity", formula: "sin²θ + cos²θ = 1" },
                    { label: "Law of Sines", formula: "a / sin A = b / sin B = c / sin C" },
                    { label: "Law of Cosines", formula: "c² = a² + b² - 2ab cos C" }
                  ].map((item, idx) => (
                    <div
                      key={idx}
                      style={{ background: "rgba(30,41,59,0.7)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 12, padding: 12 }}
                    >
                      <div style={{ fontSize: 11, color: "#94a3b8", fontWeight: 700 }}>{item.label}</div>
                      <div style={{ fontSize: 13, fontWeight: 900, color: "#ffffff", marginTop: 4, fontFamily: "monospace" }}>
                        {item.formula}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Algebra & Functions */}
              <div>
                <h4 style={{ fontSize: 14, fontWeight: 900, color: "#c084fc", marginBottom: 10, textTransform: "uppercase" }}>
                  2. Algebra &amp; Functions
                </h4>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                  {[
                    { label: "Quadratic Formula", formula: "x = (-b ± √(b² - 4ac)) / 2a" },
                    { label: "Slope of a Line", formula: "m = (y₂ - y₁) / (x₂ - x₁)" },
                    { label: "Slope-Intercept Form", formula: "y = mx + b" },
                    { label: "Logarithm Product Rule", formula: "log_b(xy) = log_b(x) + log_b(y)" },
                    { label: "Arithmetic Sequence", formula: "a_n = a₁ + (n - 1)d" },
                    { label: "Geometric Sequence", formula: "a_n = a₁ · r^(n-1)" }
                  ].map((item, idx) => (
                    <div
                      key={idx}
                      style={{ background: "rgba(30,41,59,0.7)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 12, padding: 12 }}
                    >
                      <div style={{ fontSize: 11, color: "#94a3b8", fontWeight: 700 }}>{item.label}</div>
                      <div style={{ fontSize: 13, fontWeight: 900, color: "#ffffff", marginTop: 4, fontFamily: "monospace" }}>
                        {item.formula}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === "science" && (
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              <div style={{ background: "rgba(219,39,119,0.1)", border: "1px solid rgba(219,39,119,0.3)", borderRadius: 14, padding: 14, fontSize: 12, color: "#cbd5e1" }}>
                🧪 <strong>ACT Science Framework:</strong> Tests data reasoning across Biology, Chemistry, Physics, and Earth/Space Sciences.
              </div>

              {/* Constants & Equations */}
              <div>
                <h4 style={{ fontSize: 14, fontWeight: 900, color: "#f472b6", marginBottom: 10, textTransform: "uppercase" }}>
                  1. Fundamental Equations &amp; Constants
                </h4>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                  {[
                    { label: "Ideal Gas Law", formula: "PV = nRT" },
                    { label: "Density", formula: "ρ = mass / volume" },
                    { label: "Speed & Velocity", formula: "v = distance / time" },
                    { label: "Newton's Second Law", formula: "Force (F) = m · a" },
                    { label: "Work & Kinetic Energy", formula: "W = F·d,  KE = ½mv²" },
                    { label: "pH Scale Formula", formula: "pH = -log[H+]" },
                    { label: "Temperature Kelvin", formula: "K = °C + 273.15" },
                    { label: "Genetics Base Pairs", formula: "DNA: A-T, C-G | RNA: A-U, C-G" }
                  ].map((item, idx) => (
                    <div
                      key={idx}
                      style={{ background: "rgba(30,41,59,0.7)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 12, padding: 12 }}
                    >
                      <div style={{ fontSize: 11, color: "#94a3b8", fontWeight: 700 }}>{item.label}</div>
                      <div style={{ fontSize: 13, fontWeight: 900, color: "#ffffff", marginTop: 4, fontFamily: "monospace" }}>
                        {item.formula}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Scientific Method Checklist */}
              <div>
                <h4 style={{ fontSize: 14, fontWeight: 900, color: "#4ade80", marginBottom: 10, textTransform: "uppercase" }}>
                  2. Scientific Method Variables
                </h4>
                <div style={{ background: "rgba(30,41,59,0.7)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 14, padding: 16 }}>
                  <ul style={{ margin: 0, paddingLeft: 18, color: "#cbd5e1", fontSize: 13, lineHeight: 1.7 }}>
                    <li><strong>Independent Variable (X-Axis):</strong> The variable manipulated or changed by the experimenter.</li>
                    <li><strong>Dependent Variable (Y-Axis):</strong> The variable measured to observe the effect.</li>
                    <li><strong>Control Group:</strong> Baseline setup used for standard comparison without experimental treatment.</li>
                    <li><strong>Direct Relationship:</strong> As X increases, Y increases.</li>
                    <li><strong>Inverse Relationship:</strong> As X increases, Y decreases.</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {activeTab === "scratchpad" && (
            <div style={{ height: "100%", display: "flex", flexDirection: "column" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                <span style={{ fontSize: 12, fontWeight: 800, color: "#facc15" }}>DIGITAL SCRATCH SPACE</span>
                <button
                  onClick={() => setScratchText("")}
                  style={{ background: "rgba(239, 68, 68, 0.15)", color: "#f87171", border: "1px solid rgba(239, 68, 68, 0.3)", borderRadius: 8, padding: "4px 10px", fontSize: 11, fontWeight: 800, cursor: "pointer" }}
                >
                  Clear Notes
                </button>
              </div>

              <textarea
                value={scratchText}
                onChange={(e) => setScratchText(e.target.value)}
                placeholder="Type your rough math equations, passage annotations, or eliminate option notes here..."
                style={{
                  width: "100%",
                  height: 380,
                  background: "#020617",
                  border: "2px solid #facc15",
                  borderRadius: 16,
                  padding: 16,
                  color: "#ffffff",
                  fontSize: 14,
                  lineHeight: 1.6,
                  outline: "none",
                  resize: "none",
                  fontFamily: "monospace"
                }}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
