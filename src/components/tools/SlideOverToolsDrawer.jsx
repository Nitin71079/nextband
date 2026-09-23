import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calculator, Edit3, BookOpen, X, Wrench, Sparkles, Trash2 } from "lucide-react";

export default function SlideOverToolsDrawer() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("calc"); // "calc" | "scratchpad" | "formulas"

  return (
    <>
      {/* Floating Trigger Button on Top-Right */}
      <button
        onClick={() => setIsOpen(true)}
        style={{
          position: "fixed",
          top: 90,
          right: 24,
          zIndex: 9999,
          background: "linear-gradient(135deg, #0284c7, #7c3aed)",
          color: "#ffffff",
          border: "1px solid rgba(255,255,255,0.3)",
          borderRadius: 999,
          padding: "10px 18px",
          fontWeight: 900,
          fontSize: 13,
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          gap: 8,
          boxShadow: "0 8px 25px rgba(2,132,199,0.4)",
          backdropFilter: "blur(10px)"
        }}
      >
        <Wrench size={16} /> Exam Tools &amp; Calc
      </button>

      {/* Slide-over Drawer Backdrop & Panel */}
      <AnimatePresence>
        {isOpen && (
          <div style={{ position: "fixed", inset: 0, zIndex: 99999, display: "flex", justifyContent: "flex-end", background: "rgba(8,12,20,0.6)", backdropFilter: "blur(6px)" }}>
            
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              style={{ width: "100%", maxWidth: 460, background: "#0f172a", borderLeft: "2px solid #38bdf8", height: "100vh", display: "flex", flexDirection: "column", boxShadow: "-10px 0 40px rgba(0,0,0,0.6)" }}
            >
              {/* Header */}
              <div style={{ padding: "20px 24px", borderBottom: "1px solid rgba(255,255,255,0.12)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <Wrench size={20} color="#38bdf8" />
                  <h3 style={{ fontSize: 18, fontWeight: 900, color: "#ffffff", margin: 0 }}>Universal Exam Tool Dock</h3>
                </div>
                <button onClick={() => setIsOpen(false)} style={{ background: "rgba(255,255,255,0.08)", color: "#94a3b8", border: "none", borderRadius: 10, padding: 8, cursor: "pointer" }}>
                  <X size={18} />
                </button>
              </div>

              {/* Tab Navigation */}
              <div style={{ display: "flex", padding: "12px 24px", gap: 8, borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
                {[
                  { id: "calc", label: "Calculator", icon: Calculator },
                  { id: "scratchpad", label: "Scratchpad", icon: Edit3 },
                  { id: "formulas", label: "Formulas", icon: BookOpen },
                ].map((tab) => {
                  const Icon = tab.icon;
                  const isActive = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      style={{
                        flex: 1,
                        background: isActive ? "rgba(56,189,248,0.2)" : "rgba(255,255,255,0.04)",
                        color: isActive ? "#38bdf8" : "#cbd5e1",
                        border: isActive ? "1px solid #38bdf8" : "1px solid rgba(255,255,255,0.08)",
                        borderRadius: 12,
                        padding: "8px 12px",
                        fontSize: 12,
                        fontWeight: 800,
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: 6
                      }}
                    >
                      <Icon size={14} /> {tab.label}
                    </button>
                  );
                })}
              </div>

              {/* Tab Content */}
              <div style={{ flex: 1, padding: 24, overflowY: "auto" }}>
                {activeTab === "calc" && (
                  <div>
                    <h4 style={{ fontSize: 15, fontWeight: 800, color: "#ffffff", marginBottom: 12 }}>Desmos Graphing &amp; Scientific Calculator</h4>
                    <iframe
                      src="https://www.desmos.com/testing/cb-sat/graphing"
                      style={{ width: "100%", height: 420, border: "1px solid rgba(255,255,255,0.15)", borderRadius: 16 }}
                      title="Desmos Calculator"
                    />
                  </div>
                )}

                {activeTab === "scratchpad" && (
                  <div>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                      <h4 style={{ fontSize: 15, fontWeight: 800, color: "#ffffff", margin: 0 }}>Scratchpad Canvas</h4>
                      <span style={{ fontSize: 12, color: "#94a3b8" }}>Type or draw rough math notes</span>
                    </div>
                    <textarea
                      placeholder="Jot down formulas, equation steps, or rough notes here during your exam session..."
                      style={{ width: "100%", height: 380, background: "rgba(15,23,42,0.9)", color: "#38bdf8", border: "1px solid rgba(56,189,248,0.3)", borderRadius: 16, padding: 16, fontSize: 14, fontFamily: "monospace", outline: "none", resize: "none" }}
                    />
                  </div>
                )}

                {activeTab === "formulas" && (
                  <div style={{ color: "#cbd5e1", fontSize: 13, display: "flex", flexDirection: "column", gap: 16 }}>
                    <h4 style={{ fontSize: 15, fontWeight: 800, color: "#ffffff", margin: 0 }}>Official SAT / GRE / GMAT Formula Sheet</h4>
                    
                    <div style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 14, padding: 16 }}>
                      <strong style={{ color: "#38bdf8" }}>Geometry &amp; Triangles:</strong>
                      <ul style={{ paddingLeft: 20, margin: "8px 0 0 0" }}>
                        <li>Area of Circle: A = πr²</li>
                        <li>Circumference: C = 2πr</li>
                        <li>Pythagorean Theorem: a² + b² = c²</li>
                        <li>Special Triangles: 30°-60°-90° (x : x√3 : 2x)</li>
                      </ul>
                    </div>

                    <div style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 14, padding: 16 }}>
                      <strong style={{ color: "#38bdf8" }}>Algebra &amp; Statistics:</strong>
                      <ul style={{ paddingLeft: 20, margin: "8px 0 0 0" }}>
                        <li>Quadratic Formula: x = (-b ± √(b² - 4ac)) / 2a</li>
                        <li>Standard Deviation: σ = √(Σ(x - μ)² / N)</li>
                        <li>Compound Interest: A = P(1 + r/n)^(nt)</li>
                      </ul>
                    </div>
                  </div>
                )}
              </div>

            </motion.div>

          </div>
        )}
      </AnimatePresence>
    </>
  );
}
