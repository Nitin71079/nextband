import React from "react";

/**
 * DescribeImageVisual Component
 * Renders professional SVG graphs and charts for PTE Describe Image tasks
 * Supported visual types: bar_chart, line_graph, pie_chart, process_diagram, table_data, map_visual
 */
export default function DescribeImageVisual({ imageType = "bar_chart", title = "Academic Visual Data", data = {} }) {
  const chartTitle = title || "Academic Data Analysis";
  
  // 1. BAR CHART SVG RENDERER
  if (imageType === "bar_chart" || imageType === "bar") {
    const categories = data.categories || ["Category A", "Category B", "Category C", "Category D", "Category E"];
    const values = data.values || [45, 72, 38, 85, 60];
    const maxValue = Math.max(...values, 100);

    return (
      <div style={{ background: "#0f172a", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 16, padding: 24, textAlign: "center" }}>
        <h4 style={{ fontSize: 16, fontWeight: 800, color: "#38bdf8", marginBottom: 20 }}>{chartTitle}</h4>
        <svg viewBox="0 0 500 260" style={{ width: "100%", maxHeight: 260 }}>
          {/* Y Axis Grid lines */}
          <line x1="50" y1="20" x2="470" y2="20" stroke="#334155" strokeDasharray="4" />
          <line x1="50" y1="70" x2="470" y2="70" stroke="#334155" strokeDasharray="4" />
          <line x1="50" y1="120" x2="470" y2="120" stroke="#334155" strokeDasharray="4" />
          <line x1="50" y1="170" x2="470" y2="170" stroke="#334155" strokeDasharray="4" />
          <line x1="50" y1="220" x2="470" y2="220" stroke="#64748b" strokeWidth="2" />
          
          {/* Bars */}
          {categories.map((cat, idx) => {
            const val = values[idx] || 30;
            const barHeight = (val / maxValue) * 180;
            const xPos = 70 + idx * 80;
            const yPos = 220 - barHeight;
            const colors = ["#7c3aed", "#38bdf8", "#4ade80", "#facc15", "#f43f5e"];
            const fillColor = colors[idx % colors.length];

            return (
              <g key={idx}>
                <rect x={xPos} y={yPos} width="45" height={barHeight} fill={fillColor} rx="6" />
                <text x={xPos + 22.5} y={yPos - 8} fill="#ffffff" fontSize="11" fontWeight="700" textAnchor="middle">{val}%</text>
                <text x={xPos + 22.5} y="240" fill="#94a3b8" fontSize="11" fontWeight="600" textAnchor="middle">{cat}</text>
              </g>
            );
          })}
        </svg>
      </div>
    );
  }

  // 2. LINE GRAPH SVG RENDERER
  if (imageType === "line_graph" || imageType === "line") {
    const years = data.years || ["2015", "2017", "2019", "2021", "2023", "2025"];
    const points = data.points || [20, 35, 50, 42, 68, 85];
    const maxVal = Math.max(...points, 100);

    const pathD = points.map((pt, idx) => {
      const x = 60 + idx * 75;
      const y = 220 - (pt / maxVal) * 180;
      return `${idx === 0 ? "M" : "L"} ${x} ${y}`;
    }).join(" ");

    return (
      <div style={{ background: "#0f172a", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 16, padding: 24, textAlign: "center" }}>
        <h4 style={{ fontSize: 16, fontWeight: 800, color: "#38bdf8", marginBottom: 20 }}>{chartTitle}</h4>
        <svg viewBox="0 0 500 260" style={{ width: "100%", maxHeight: 260 }}>
          <line x1="50" y1="220" x2="470" y2="220" stroke="#64748b" strokeWidth="2" />
          <path d={pathD} fill="none" stroke="#38bdf8" strokeWidth="4" />
          {points.map((pt, idx) => {
            const x = 60 + idx * 75;
            const y = 220 - (pt / maxVal) * 180;
            return (
              <g key={idx}>
                <circle cx={x} cy={y} r="6" fill="#7c3aed" stroke="#ffffff" strokeWidth="2" />
                <text x={x} y={y - 12} fill="#ffffff" fontSize="11" fontWeight="700" textAnchor="middle">{pt}</text>
                <text x={x} y="240" fill="#94a3b8" fontSize="11" fontWeight="600" textAnchor="middle">{years[idx] || `T${idx}`}</text>
              </g>
            );
          })}
        </svg>
      </div>
    );
  }

  // 3. PIE CHART SVG RENDERER
  if (imageType === "pie_chart" || imageType === "pie") {
    const slices = data.slices || [
      { label: "Renewables", pct: 35, color: "#4ade80" },
      { label: "Natural Gas", pct: 30, color: "#38bdf8" },
      { label: "Coal", pct: 20, color: "#f43f5e" },
      { label: "Nuclear", pct: 15, color: "#facc15" }
    ];

    return (
      <div style={{ background: "#0f172a", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 16, padding: 24, textAlign: "center" }}>
        <h4 style={{ fontSize: 16, fontWeight: 800, color: "#38bdf8", marginBottom: 20 }}>{chartTitle}</h4>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 32, flexWrap: "wrap" }}>
          <svg viewBox="0 0 200 200" style={{ width: 180, height: 180 }}>
            <circle cx="100" cy="100" r="80" fill="none" stroke="#7c3aed" strokeWidth="35" strokeDasharray="180 320" />
            <circle cx="100" cy="100" r="80" fill="none" stroke="#38bdf8" strokeWidth="35" strokeDasharray="150 350" strokeDashoffset="-180" />
            <circle cx="100" cy="100" r="80" fill="none" stroke="#4ade80" strokeWidth="35" strokeDasharray="100 400" strokeDashoffset="-330" />
            <circle cx="100" cy="100" r="80" fill="none" stroke="#facc15" strokeWidth="35" strokeDasharray="72 430" strokeDashoffset="-430" />
          </svg>
          <div style={{ textAlign: "left" }}>
            {slices.map((sl, idx) => (
              <div key={idx} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
                <span style={{ width: 14, height: 14, borderRadius: 4, background: sl.color }} />
                <span style={{ fontSize: 13, color: "#ffffff", fontWeight: 700 }}>{sl.label}: {sl.pct}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // 4. PROCESS DIAGRAM / FLOWCHART / DEFAULT RENDERER
  const steps = data.steps || ["Stage 1: Collection", "Stage 2: Filtration", "Stage 3: Chemical Synthesis", "Stage 4: Quality Inspection", "Stage 5: Distribution"];
  return (
    <div style={{ background: "#0f172a", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 16, padding: 24, textAlign: "center" }}>
      <h4 style={{ fontSize: 16, fontWeight: 800, color: "#38bdf8", marginBottom: 20 }}>{chartTitle}</h4>
      <div style={{ display: "flex", flexDirection: "column", gap: 12, maxWidth: 420, margin: "0 auto" }}>
        {steps.map((st, idx) => (
          <div key={idx} style={{ background: "rgba(30,41,59,0.9)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 12, padding: "12px 20px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <span style={{ fontSize: 13, fontWeight: 800, color: "#c084fc" }}>Step {idx + 1}</span>
            <span style={{ fontSize: 14, fontWeight: 700, color: "#ffffff" }}>{st}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
