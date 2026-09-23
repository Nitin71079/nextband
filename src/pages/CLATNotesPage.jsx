import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { BookOpen, ChevronLeft, ArrowRight, CheckCircle2, AlertCircle, FileText, Layers, Play, Sparkles } from "lucide-react";

const CLAT_REVISION_NOTES = {
  legal: [
    {
      subject: "Law of Torts",
      chapters: [
        {
          title: "Strict & Absolute Liability",
          topics: [
            {
              name: "Rule in Rylands v. Fletcher",
              notes: `
### Key Legal Concept:
1. **Strict Liability:** Applies when a person brings and keeps on their land anything likely to do mischief if it escapes.
2. **Essential Elements:**
   - Bringing/Accumulating a non-natural user of land.
   - Escape of the dangerous substance onto another's premises.
   - Damage caused as a direct consequence of the escape.
3. **Exceptions:**
   - Act of God (Vis Major)
   - Plaintiff's own fault / Consent of Plaintiff (Volenti non fit injuria)
   - Statutory authority

### Absolute Liability (MC Mehta v. Union of India):
- Created by Supreme Court of India in 1987.
- Applies to **hazardous or inherently dangerous industries**.
- **No exceptions allowed** (Act of God or sabotage is NOT a defense).
- Quantum of compensation is linked to the financial capacity of the enterprise.
              `
            }
          ]
        }
      ]
    }
  ],
  gk: [
    {
      subject: "Current Affairs & GK Briefs",
      chapters: [
        {
          title: "Legal & Constitutional Affairs 2025-2026",
          topics: [
            {
              name: "Key Supreme Court Landmark Rulings",
              notes: `
### Key Developments:
1. **Right to Privacy & AI Governance:** Supreme Court guidelines establishing data protection as an intrinsic subset of Right to Life under Article 21.
2. **Constitutional Bench on Election Commission:** Mandating transparent appointments to safeguard democratic institutions.
3. **Environmental Jurisprudence:** Expanding the Right to be free from adverse impacts of climate change as a fundamental right.
              `
            }
          ]
        }
      ]
    }
  ]
};

export default function CLATNotesPage() {
  const navigate = useNavigate();
  const [selectedSec, setSelectedSec] = useState("legal");
  const [selectedTopicIdx, setSelectedTopicIdx] = useState(0);

  const secNotes = useMemo(() => {
    return CLAT_REVISION_NOTES[selectedSec] || CLAT_REVISION_NOTES.legal;
  }, [selectedSec]);

  const allTopics = useMemo(() => {
    const list = [];
    secNotes.forEach((subj) => {
      subj.chapters.forEach((chap) => {
        chap.topics.forEach((t) => {
          list.push({ subject: subj.subject, chapter: chap.title, ...t });
        });
      });
    });
    return list;
  }, [secNotes]);

  const currentTopic = allTopics[selectedTopicIdx] || allTopics[0];

  return (
    <div style={{ minHeight: "100vh", background: "radial-gradient(circle at 50% 0%, #78350f 0%, #0f172a 70%)", color: "#ffffff", fontFamily: "Inter, sans-serif", padding: "40px 24px 80px" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>

        {/* Top Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 28 }}>
          <button
            onClick={() => navigate("/clat")}
            style={{ background: "rgba(255,255,255,0.08)", color: "#cbd5e1", border: "1px solid rgba(255,255,255,0.15)", borderRadius: 12, padding: "8px 16px", fontSize: 13, fontWeight: 800, cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 6 }}
          >
            <ChevronLeft size={16} /> Return to CLAT Hub
          </button>

          <span style={{ background: "rgba(251,191,36,0.2)", color: "#fbbf24", border: "1px solid rgba(251,191,36,0.3)", padding: "4px 14px", borderRadius: 999, fontSize: 12, fontWeight: 900 }}>
            CLAT REVISION &amp; CURRENT AFFAIRS REPOSITORY
          </span>
        </div>

        {/* Section Switcher */}
        <div style={{ display: "flex", gap: 10, marginBottom: 28 }}>
          {[
            { id: "legal", label: "Legal Reasoning Notes" },
            { id: "gk", label: "Current Affairs & GK Briefs" }
          ].map((sec) => (
            <button
              key={sec.id}
              onClick={() => {
                setSelectedSec(sec.id);
                setSelectedTopicIdx(0);
              }}
              style={{
                background: selectedSec === sec.id ? "linear-gradient(135deg, #d97706, #b45309)" : "rgba(255,255,255,0.06)",
                color: "#ffffff",
                border: selectedSec === sec.id ? "1px solid #fbbf24" : "1px solid rgba(255,255,255,0.1)",
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
                      background: isSelected ? "rgba(251,191,36,0.18)" : "rgba(255,255,255,0.04)",
                      border: isSelected ? "1px solid #fbbf24" : "1px solid rgba(255,255,255,0.08)",
                      borderRadius: 12,
                      padding: 12,
                      cursor: "pointer"
                    }}
                  >
                    <div style={{ fontSize: 11, color: "#fbbf24", fontWeight: 800 }}>{t.subject}</div>
                    <div style={{ fontSize: 13, fontWeight: isSelected ? 800 : 500, color: isSelected ? "#ffffff" : "#cbd5e1", marginTop: 2 }}>{t.name}</div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Notes Viewer */}
          <div style={{ background: "rgba(15,23,42,0.85)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 20, padding: 32 }}>
            <div style={{ marginBottom: 20, borderBottom: "1px solid rgba(255,255,255,0.1)", paddingBottom: 16 }}>
              <span style={{ background: "rgba(251,191,36,0.2)", color: "#fbbf24", padding: "4px 10px", borderRadius: 8, fontSize: 11, fontWeight: 900 }}>
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
                <div style={{ fontSize: 12, color: "#94a3b8" }}>Ready to test this topic?</div>
                <div style={{ fontSize: 14, fontWeight: 800, color: "#ffffff" }}>Attempt questions in CLAT Mock 001</div>
              </div>

              <button
                onClick={() => navigate("/clat")}
                style={{ background: "linear-gradient(135deg, #d97706, #b45309)", color: "#ffffff", border: "none", borderRadius: 12, padding: "12px 24px", fontWeight: 900, fontSize: 13, cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 8 }}
              >
                Launch CLAT Mock <Play size={16} fill="#ffffff" />
              </button>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
