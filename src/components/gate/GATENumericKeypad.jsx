import React from "react";
import { Delete, XCircle } from "lucide-react";

/**
 * GATENumericKeypad Component
 * Native Virtual On-Screen Numeric Keypad for GATE NAT and JEE/NEET Numerical Questions.
 * Supports integers, decimals, negative signs, backspace, and clear operations.
 */
export default function GATENumericKeypad({ value = "", onChange }) {
  const handleKeyClick = (key) => {
    let str = String(value || "");

    if (key === "CLEAR") {
      onChange("");
    } else if (key === "BACK") {
      onChange(str.slice(0, -1));
    } else if (key === "-") {
      if (str.startsWith("-")) {
        onChange(str.slice(1));
      } else {
        onChange("-" + str);
      }
    } else if (key === ".") {
      if (!str.includes(".")) {
        onChange(str + ".");
      }
    } else {
      onChange(str + key);
    }
  };

  return (
    <div style={{ background: "#0f172a", border: "2px solid #38bdf8", borderRadius: 20, padding: 20, maxWidth: 320, fontFamily: "Inter, sans-serif" }}>
      <div style={{ fontSize: 11, fontWeight: 900, color: "#38bdf8", textTransform: "uppercase", marginBottom: 8 }}>
        VIRTUAL NUMERIC KEYPAD (NAT / NVQ INPUT)
      </div>

      <input
        type="text"
        readOnly
        value={value}
        placeholder="Click keypad buttons below..."
        style={{
          width: "100%",
          background: "#020617",
          border: "1px solid rgba(255,255,255,0.2)",
          borderRadius: 12,
          padding: "12px 16px",
          color: "#4ade80",
          fontSize: 20,
          fontWeight: 900,
          textAlign: "right",
          marginBottom: 14,
          outline: "none",
          fontFamily: "monospace"
        }}
      />

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10 }}>
        {["7", "8", "9", "4", "5", "6", "1", "2", "3", "-", "0", "."].map((k) => (
          <button
            key={k}
            onClick={() => handleKeyClick(k)}
            style={{
              background: "rgba(255,255,255,0.08)",
              color: "#ffffff",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: 12,
              padding: "14px 0",
              fontSize: 16,
              fontWeight: 800,
              cursor: "pointer"
            }}
          >
            {k}
          </button>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginTop: 10 }}>
        <button
          onClick={() => handleKeyClick("BACK")}
          style={{ background: "rgba(245,158,11,0.2)", color: "#facc15", border: "1px solid rgba(245,158,11,0.4)", borderRadius: 12, padding: "12px 0", fontSize: 13, fontWeight: 800, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}
        >
          <Delete size={16} /> Backspace
        </button>
        <button
          onClick={() => handleKeyClick("CLEAR")}
          style={{ background: "rgba(239,68,68,0.2)", color: "#f87171", border: "1px solid rgba(239,68,68,0.4)", borderRadius: 12, padding: "12px 0", fontSize: 13, fontWeight: 800, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}
        >
          <XCircle size={16} /> Clear All
        </button>
      </div>
    </div>
  );
}
