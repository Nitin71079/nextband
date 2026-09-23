import React, { useState, useMemo } from "react";
import { ArrowUpDown, ArrowUp, ArrowDown, Table, CheckCircle2 } from "lucide-react";

/**
 * GMATTableAnalysis Component
 * Native GMAC Data Insights Interactive Sortable Table Analysis renderer.
 * Allows candidates to click header columns to sort table data dynamically (alphabetically or numerically)
 * and evaluate accompanying Yes/No or True/False statement matrices.
 */
export default function GMATTableAnalysis({
  headers = [],
  rows = [],
  statements = [],
  userAnswers = {},
  onSelectStatementAnswer
}) {
  const [sortColumnIdx, setSortColumnIdx] = useState(0);
  const [sortDirection, setSortDirection] = useState("asc"); // 'asc' or 'desc'

  const handleHeaderClick = (colIdx) => {
    if (sortColumnIdx === colIdx) {
      setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortColumnIdx(colIdx);
      setSortDirection("asc");
    }
  };

  const sortedRows = useMemo(() => {
    if (!rows || rows.length === 0) return [];
    const copy = [...rows];

    copy.sort((a, b) => {
      const valA = a[sortColumnIdx] !== undefined ? String(a[sortColumnIdx]).trim() : "";
      const valB = b[sortColumnIdx] !== undefined ? String(b[sortColumnIdx]).trim() : "";

      // Parse numerical values (handles $, %, commas, integers, decimals)
      const numA = parseFloat(valA.replace(/[^0-9.-]+/g, ""));
      const numB = parseFloat(valB.replace(/[^0-9.-]+/g, ""));

      const isNumA = !isNaN(numA) && !isNaN(valA);
      const isNumB = !isNaN(numB) && !isNaN(valB);

      let cmp = 0;
      if (isNumA && isNumB) {
        cmp = numA - numB;
      } else {
        cmp = valA.localeCompare(valB, undefined, { numeric: true, sensitivity: "base" });
      }

      return sortDirection === "asc" ? cmp : -cmp;
    });

    return copy;
  }, [rows, sortColumnIdx, sortDirection]);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24, fontFamily: "Inter, sans-serif" }}>
      
      {/* Table Sorting Control Banner */}
      <div style={{ background: "rgba(30,41,59,0.75)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 18, padding: 20, overflowX: "auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
          <div style={{ fontSize: 12, fontWeight: 900, color: "#38bdf8", textTransform: "uppercase", display: "flex", alignItems: "center", gap: 6 }}>
            <Table size={16} /> INTERACTIVE DATA TABLE (CLICK HEADERS TO SORT)
          </div>
          <div style={{ fontSize: 11, color: "#94a3b8", fontWeight: 700 }}>
            Sorted by: <strong style={{ color: "#ffffff" }}>{headers[sortColumnIdx] || "Column 1"}</strong> ({sortDirection.toUpperCase()})
          </div>
        </div>

        {/* Data Table */}
        <table style={{ width: "100%", borderCollapse: "separate", borderSpacing: 0, fontSize: 13, color: "#cbd5e1" }}>
          <thead>
            <tr>
              {headers.map((headerText, colIdx) => {
                const isSorted = sortColumnIdx === colIdx;
                return (
                  <th
                    key={colIdx}
                    onClick={() => handleHeaderClick(colIdx)}
                    style={{
                      background: isSorted ? "rgba(56,189,248,0.2)" : "#0f172a",
                      color: isSorted ? "#38bdf8" : "#ffffff",
                      border: "1px solid rgba(255,255,255,0.12)",
                      padding: "10px 14px",
                      textAlign: "left",
                      cursor: "pointer",
                      userSelect: "none",
                      fontWeight: 800,
                      transition: "all 0.15s ease"
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8 }}>
                      <span>{headerText}</span>
                      {isSorted ? (
                        sortDirection === "asc" ? <ArrowUp size={14} /> : <ArrowDown size={14} />
                      ) : (
                        <ArrowUpDown size={12} opacity={0.4} />
                      )}
                    </div>
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {sortedRows.map((row, rowIdx) => (
              <tr key={rowIdx} style={{ background: rowIdx % 2 === 0 ? "rgba(15,23,42,0.6)" : "rgba(30,41,59,0.4)" }}>
                {row.map((cellVal, cellIdx) => (
                  <td key={cellIdx} style={{ border: "1px solid rgba(255,255,255,0.06)", padding: "10px 14px" }}>
                    {cellVal}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Statement Matrix Evaluation Grid */}
      {statements.length > 0 && (
        <div style={{ background: "rgba(30,41,59,0.75)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 18, padding: 20 }}>
          <div style={{ fontSize: 12, fontWeight: 900, color: "#facc15", textTransform: "uppercase", marginBottom: 16 }}>
            STATEMENT EVALUATION MATRIX (SELECT YES / NO FOR EACH)
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {statements.map((stmt, sIdx) => {
              const selectedVal = userAnswers[stmt.id];
              return (
                <div
                  key={stmt.id || sIdx}
                  style={{
                    background: "rgba(15,23,42,0.8)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: 14,
                    padding: 16,
                    display: "grid",
                    gridTemplateColumns: "1fr 140px",
                    gap: 16,
                    alignItems: "center"
                  }}
                >
                  <div style={{ fontSize: 14, color: "#ffffff", fontWeight: 500, lineHeight: 1.5 }}>
                    {stmt.statementText}
                  </div>

                  <div style={{ display: "flex", gap: 10 }}>
                    {["YES", "NO"].map((opt) => {
                      const isSelected = selectedVal === opt;
                      return (
                        <button
                          key={opt}
                          onClick={() => onSelectStatementAnswer(stmt.id, opt)}
                          style={{
                            flex: 1,
                            background: isSelected ? (opt === "YES" ? "#22c55e" : "#ef4444") : "rgba(255,255,255,0.08)",
                            color: "#ffffff",
                            border: isSelected ? "none" : "1px solid rgba(255,255,255,0.15)",
                            borderRadius: 10,
                            padding: "8px 0",
                            fontSize: 12,
                            fontWeight: 900,
                            cursor: "pointer",
                            transition: "all 0.15s ease"
                          }}
                        >
                          {opt}
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

    </div>
  );
}
