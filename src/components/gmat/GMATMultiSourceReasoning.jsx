import React, { useState } from "react";
import { FileText, Layers, Mail, BarChart2, Table } from "lucide-react";

/**
 * GMATMultiSourceReasoning Component
 * Native GMAC Data Insights Multi-Source Reasoning (MSR) tabbed stimulus container.
 * Allows candidates to toggle between 2-3 source tabs (e.g. Email 1, Data Table, Memo) while answering.
 */
export default function GMATMultiSourceReasoning({ tabs = [], children }) {
  const [activeTabIdx, setActiveTabIdx] = useState(0);

  if (!tabs || tabs.length === 0) {
    return <div>{children}</div>;
  }

  const currentTab = tabs[activeTabIdx] || tabs[0];

  const getTabIcon = (type) => {
    if (type === "email" || type === "mail") return Mail;
    if (type === "table") return Table;
    if (type === "chart" || type === "graph") return BarChart2;
    return FileText;
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16, fontFamily: "Inter, sans-serif" }}>
      
      {/* Tab Header Bar */}
      <div style={{ display: "flex", gap: 8, background: "#0f172a", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 16, padding: 6 }}>
        {tabs.map((tab, idx) => {
          const IconComp = getTabIcon(tab.type);
          const isActive = activeTabIdx === idx;
          return (
            <button
              key={tab.id || idx}
              onClick={() => setActiveTabIdx(idx)}
              style={{
                flex: 1,
                background: isActive ? "linear-gradient(135deg, #0284c7, #7c3aed)" : "transparent",
                color: isActive ? "#ffffff" : "#94a3b8",
                border: isActive ? "1px solid #38bdf8" : "1px solid transparent",
                borderRadius: 12,
                padding: "10px 14px",
                fontSize: 12,
                fontWeight: 800,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
                transition: "all 0.15s ease"
              }}
            >
              <IconComp size={15} />
              <span>{tab.title || `Source ${idx + 1}`}</span>
            </button>
          );
        })}
      </div>

      {/* Active Tab Content Viewer */}
      <div style={{ background: "rgba(30,41,59,0.75)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 20, padding: 24, minHeight: 200, maxHeight: 320, overflowY: "auto" }}>
        <div style={{ fontSize: 11, fontWeight: 900, color: "#38bdf8", textTransform: "uppercase", marginBottom: 12 }}>
          MULTI-SOURCE REASONING: {currentTab.title}
        </div>

        {currentTab.text && (
          <div style={{ color: "#e2e8f0", fontSize: 14, lineHeight: 1.7, whiteSpace: "pre-line" }}>
            {currentTab.text}
          </div>
        )}

        {currentTab.tableData && (
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13, color: "#cbd5e1", marginTop: 12 }}>
            <thead>
              <tr style={{ background: "#0f172a" }}>
                {(currentTab.tableData.headers || []).map((h, i) => (
                  <th key={i} style={{ border: "1px solid rgba(255,255,255,0.1)", padding: 8, textAlign: "left", fontWeight: 800 }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {(currentTab.tableData.rows || []).map((row, rIdx) => (
                <tr key={rIdx}>
                  {row.map((c, cIdx) => (
                    <td key={cIdx} style={{ border: "1px solid rgba(255,255,255,0.06)", padding: 8 }}>{c}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Accompanying Question / Input */}
      <div>{children}</div>
    </div>
  );
}
