import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { BookOpen, ChevronLeft, ArrowRight, CheckCircle2, AlertCircle, FileText, Layers, Play, Sparkles } from "lucide-react";

const JEE_REVISION_NOTES = {
  physics: [
    {
      subject: "Physics",
      chapters: [
        {
          title: "Kinematics & Rotational Motion",
          topics: [
            {
              name: "Projectile & Moment of Inertia Formulas",
              notes: `
### Key Equations:
1. **Projectile Motion:**
   - Time of Flight: $T = \\frac{2 u \\sin \\theta}{g}$
   - Maximum Height: $H_{max} = \\frac{u^2 \\sin^2 \\theta}{2g}$
   - Horizontal Range: $R = \\frac{u^2 \\sin 2\\theta}{g}$
2. **Moment of Inertia ($I$):**
   - Solid Sphere about diameter: $I = \\frac{2}{5} M R^2$
   - Hollow Sphere: $I = \\frac{2}{3} M R^2$
   - Uniform Disc about central axis: $I = \\frac{1}{2} M R^2$
   - Uniform Ring: $I = M R^2$

### Parallel & Perpendicular Axis Theorems:
- **Parallel Axis:** $I = I_{cm} + M d^2$
- **Perpendicular Axis (2D Lamina):** $I_z = I_x + I_y$
              `
            }
          ]
        }
      ]
    }
  ],
  chemistry: [
    {
      subject: "Chemistry",
      chapters: [
        {
          title: "Physical & Inorganic Chemistry",
          topics: [
            {
              name: "Nernst Equation & Coordination Compounds",
              notes: `
### Electrochemistry:
- **Nernst Equation at 298 K:**
  $$E_{cell} = E^\\circ_{cell} - \\frac{0.0591}{n} \\log_{10} Q$$
- **Gibbs Free Energy & Cell EMF:**
  $$\\Delta G^\\circ = -n F E^\\circ_{cell}$$

### Coordination Compounds & CFT:
- Crystal Field Splitting Energy (CFSE) in Octahedral fields:
  $$\\Delta_o = -0.4 \\times n_{t2g} + 0.6 \\times n_{eg}$$
              `
            }
          ]
        }
      ]
    }
  ],
  math: [
    {
      subject: "Mathematics",
      chapters: [
        {
          title: "Calculus & Algebra",
          topics: [
            {
              name: "Standard Integrals & Matrix Properties",
              notes: `
### Calculus Integration Standard Forms:
1. $\\int \\frac{dx}{x^2 + a^2} = \\frac{1}{a} \\tan^{-1}\\left(\\frac{x}{a}\\right) + C$
2. $\\int \\frac{dx}{\\sqrt{a^2 - x^2}} = \\sin^{-1}\\left(\\frac{x}{a}\\right) + C$
3. $\\int e^{ax} \\sin(bx) dx = \\frac{e^{ax}}{a^2 + b^2} (a \\sin bx - b \\cos bx) + C$

### Matrices & Determinants:
- $\\det(A \\cdot B) = \\det(A) \\cdot \\det(B)$
- $\\det(k A_{n \\times n}) = k^n \\det(A)$
- $A \\cdot \\text{adj}(A) = \\det(A) \\cdot I_n$
              `
            }
          ]
        }
      ]
    }
  ]
};

export default function JEENotesPage() {
  const navigate = useNavigate();
  const [selectedSub, setSelectedSub] = useState("physics");
  const [selectedTopicIdx, setSelectedTopicIdx] = useState(0);

  const subNotes = useMemo(() => {
    return JEE_REVISION_NOTES[selectedSub] || JEE_REVISION_NOTES.physics;
  }, [selectedSub]);

  const allTopics = useMemo(() => {
    const list = [];
    subNotes.forEach((subj) => {
      subj.chapters.forEach((chap) => {
        chap.topics.forEach((t) => {
          list.push({ subject: subj.subject, chapter: chap.title, ...t });
        });
      });
    });
    return list;
  }, [subNotes]);

  const currentTopic = allTopics[selectedTopicIdx] || allTopics[0];

  return (
    <div style={{ minHeight: "100vh", background: "radial-gradient(circle at 50% 0%, #1e1b4b 0%, #0f172a 70%)", color: "#ffffff", fontFamily: "Inter, sans-serif", padding: "40px 24px 80px" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>

        {/* Top Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 28 }}>
          <button
            onClick={() => navigate("/jee")}
            style={{ background: "rgba(255,255,255,0.08)", color: "#cbd5e1", border: "1px solid rgba(255,255,255,0.15)", borderRadius: 12, padding: "8px 16px", fontSize: 13, fontWeight: 800, cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 6 }}
          >
            <ChevronLeft size={16} /> Return to JEE Hub
          </button>

          <span style={{ background: "rgba(129,140,248,0.2)", color: "#818cf8", border: "1px solid rgba(129,140,248,0.4)", padding: "4px 14px", borderRadius: 999, fontSize: 12, fontWeight: 900 }}>
            OFFICIAL JEE MAIN FORMULAS &amp; REVISION NOTES
          </span>
        </div>

        {/* Subject Switcher */}
        <div style={{ display: "flex", gap: 10, marginBottom: 28 }}>
          {[
            { id: "physics", label: "Physics Formulas" },
            { id: "chemistry", label: "Chemistry Concepts" },
            { id: "math", label: "Mathematics Formulas" }
          ].map((sec) => (
            <button
              key={sec.id}
              onClick={() => {
                setSelectedSub(sec.id);
                setSelectedTopicIdx(0);
              }}
              style={{
                background: selectedSub === sec.id ? "linear-gradient(135deg, #4f46e5, #9333ea)" : "rgba(255,255,255,0.06)",
                color: "#ffffff",
                border: selectedSub === sec.id ? "1px solid #818cf8" : "1px solid rgba(255,255,255,0.1)",
                borderRadius: 14,
                padding: "10px 22px",
                fontSize: 14,
                fontWeight: 800,
                cursor: "pointer"
              }}
            >
              {sec.label}
            </button>
          ))}
        </div>

        {/* Main Content Layout */}
        <div style={{ display: "grid", gridTemplateColumns: "300px 1fr", gap: 24 }}>

          {/* Left Topic Sidebar */}
          <div style={{ background: "rgba(15,23,42,0.85)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 20, padding: 20 }}>
            <h3 style={{ fontSize: 14, fontWeight: 900, color: "#ffffff", marginBottom: 14, textTransform: "uppercase", letterSpacing: 0.5 }}>
              Topics List ({allTopics.length})
            </h3>

            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {allTopics.map((t, idx) => {
                const isSelected = idx === selectedTopicIdx;
                return (
                  <div
                    key={idx}
                    onClick={() => setSelectedTopicIdx(idx)}
                    style={{
                      background: isSelected ? "rgba(129,140,248,0.18)" : "rgba(255,255,255,0.04)",
                      border: isSelected ? "1px solid #818cf8" : "1px solid rgba(255,255,255,0.08)",
                      borderRadius: 12,
                      padding: 12,
                      cursor: "pointer"
                    }}
                  >
                    <div style={{ fontSize: 11, color: "#818cf8", fontWeight: 800 }}>{t.subject}</div>
                    <div style={{ fontSize: 13, fontWeight: isSelected ? 800 : 500, color: isSelected ? "#ffffff" : "#cbd5e1", marginTop: 2 }}>{t.name}</div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Notes Viewer */}
          <div style={{ background: "rgba(15,23,42,0.85)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 20, padding: 32 }}>
            <div style={{ marginBottom: 20, borderBottom: "1px solid rgba(255,255,255,0.1)", paddingBottom: 16 }}>
              <span style={{ background: "rgba(129,140,248,0.2)", color: "#818cf8", padding: "4px 10px", borderRadius: 8, fontSize: 11, fontWeight: 900 }}>
                {currentTopic?.subject} · {currentTopic?.chapter}
              </span>
              <h2 style={{ fontSize: 24, fontWeight: 900, color: "#ffffff", marginTop: 8 }}>
                {currentTopic?.name}
              </h2>
            </div>

            <div style={{ color: "#cbd5e1", fontSize: 15, lineHeight: 1.75, whiteSpace: "pre-wrap" }}>
              {currentTopic?.notes}
            </div>

            {/* Action Bar */}
            <div style={{ borderTop: "1px solid rgba(255,255,255,0.1)", paddingTop: 24, marginTop: 32, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <div style={{ fontSize: 12, color: "#94a3b8" }}>Ready to test this chapter?</div>
                <div style={{ fontSize: 14, fontWeight: 800, color: "#ffffff" }}>Attempt questions in JEE Main Mock 001</div>
              </div>

              <button
                onClick={() => navigate("/jee")}
                style={{ background: "linear-gradient(135deg, #4f46e5, #9333ea)", color: "#ffffff", border: "none", borderRadius: 12, padding: "12px 24px", fontWeight: 900, fontSize: 13, cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 8 }}
              >
                Launch JEE Mock <Play size={16} fill="#ffffff" />
              </button>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
