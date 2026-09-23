import React, { useState } from "react";
import { Calculator, X, Delete, RotateCcw } from "lucide-react";

/**
 * GATEScientificCalculator Component
 * Authentic TCS iON GATE Scientific Calculator.
 * Features trigonometric, inverse trig, hyperbolic, logarithmic, power, root, memory, and angle mode operations.
 */
export default function GATEScientificCalculator({ isOpen, onClose }) {
  const [display, setDisplay] = useState("");
  const [isRad, setIsRad] = useState(false);
  const [memory, setMemory] = useState(0);
  const [history, setHistory] = useState("");

  if (!isOpen) return null;

  const append = (val) => {
    setDisplay((prev) => (prev === "Error" ? val : prev + val));
  };

  const clearDisplay = () => {
    setDisplay("");
    setHistory("");
  };

  const backspace = () => {
    setDisplay((prev) => (prev === "Error" ? "" : prev.slice(0, -1)));
  };

  const toggleSign = () => {
    if (!display || display === "Error") return;
    if (display.startsWith("-")) {
      setDisplay(display.slice(1));
    } else {
      setDisplay("-" + display);
    }
  };

  const calculateResult = () => {
    if (!display) return;
    try {
      setHistory(display);
      let expr = display
        .replace(/π/g, "Math.PI")
        .replace(/e/g, "Math.E")
        .replace(/asin\(/g, isRad ? "Math.asin(" : "(180/Math.PI)*Math.asin(")
        .replace(/acos\(/g, isRad ? "Math.acos(" : "(180/Math.PI)*Math.acos(")
        .replace(/atan\(/g, isRad ? "Math.atan(" : "(180/Math.PI)*Math.atan(")
        .replace(/sinh\(/g, "Math.sinh(")
        .replace(/cosh\(/g, "Math.cosh(")
        .replace(/tanh\(/g, "Math.tanh(")
        .replace(/sin\(/g, isRad ? "Math.sin(" : "Math.sin(Math.PI/180*")
        .replace(/cos\(/g, isRad ? "Math.cos(" : "Math.cos(Math.PI/180*")
        .replace(/tan\(/g, isRad ? "Math.tan(" : "Math.tan(Math.PI/180*")
        .replace(/sqrt\(/g, "Math.sqrt(")
        .replace(/cbrt\(/g, "Math.cbrt(")
        .replace(/ln\(/g, "Math.log(")
        .replace(/log\(/g, "Math.log10(")
        .replace(/\^/g, "**");

      const res = new Function(`"use strict"; return (${expr})`)();
      if (typeof res === "number" && !isNaN(res)) {
        // Format to max 8 decimal places if needed
        const formatted = Number.isInteger(res) ? String(res) : parseFloat(res.toFixed(8)).toString();
        setDisplay(formatted);
      } else {
        setDisplay("Error");
      }
    } catch (err) {
      setDisplay("Error");
    }
  };

  const applyFunc = (type) => {
    if (type === "sin") append("sin(");
    else if (type === "cos") append("cos(");
    else if (type === "tan") append("tan(");
    else if (type === "asin") append("asin(");
    else if (type === "acos") append("acos(");
    else if (type === "atan") append("atan(");
    else if (type === "sinh") append("sinh(");
    else if (type === "cosh") append("cosh(");
    else if (type === "tanh") append("tanh(");
    else if (type === "log") append("log(");
    else if (type === "ln") append("ln(");
    else if (type === "sqrt") append("sqrt(");
    else if (type === "cbrt") append("cbrt(");
    else if (type === "sq") append("^2");
    else if (type === "cube") append("^3");
    else if (type === "pow") append("^");
    else if (type === "recip") append("1/(");
    else if (type === "exp") append("*10^");
  };

  // Memory operations
  const handleMemory = (op) => {
    const val = parseFloat(display) || 0;
    if (op === "MC") setMemory(0);
    else if (op === "MR") setDisplay(String(memory));
    else if (op === "MS") setMemory(val);
    else if (op === "M+") setMemory((prev) => prev + val);
    else if (op === "M-") setMemory((prev) => prev - val);
  };

  return (
    <div
      style={{
        position: "fixed",
        top: 80,
        right: 20,
        width: 400,
        background: "#0f172a",
        border: "2px solid #0284c7",
        borderRadius: 16,
        boxShadow: "0 20px 50px rgba(0,0,0,0.85)",
        zIndex: 99999,
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        fontFamily: "monospace"
      }}
    >
      {/* Header Bar */}
      <div style={{ background: "#020617", padding: "10px 16px", display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid rgba(255,255,255,0.12)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <Calculator size={16} color="#38bdf8" />
          <span style={{ fontSize: 13, fontWeight: 900, color: "#ffffff", letterSpacing: 0.5 }}>OFFICIAL GATE SCIENTIFIC CALCULATOR</span>
        </div>
        <X size={16} cursor="pointer" color="#94a3b8" onClick={onClose} />
      </div>

      {/* Screen & Controls */}
      <div style={{ padding: 14, background: "#090d16" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
          <button
            onClick={() => setIsRad((prev) => !prev)}
            style={{ background: isRad ? "rgba(56,189,248,0.2)" : "rgba(245,158,11,0.2)", color: isRad ? "#38bdf8" : "#facc15", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 6, padding: "2px 8px", fontSize: 11, fontWeight: 800, cursor: "pointer" }}
          >
            {isRad ? "RAD" : "DEG"}
          </button>
          <span style={{ fontSize: 11, color: "#64748b" }}>{history}</span>
          <span style={{ fontSize: 11, color: "#38bdf8", fontWeight: 800 }}>M = {memory}</span>
        </div>

        <div style={{ background: "#020617", border: "1px solid rgba(255,255,255,0.2)", borderRadius: 10, padding: "8px 12px", fontSize: 22, fontWeight: 900, color: "#4ade80", textAlign: "right", minHeight: 46, overflowX: "auto" }}>
          {display || "0"}
        </div>
      </div>

      {/* Calculator Buttons Grid */}
      <div style={{ padding: 12, display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 5 }}>
        {/* Row 1: Memory */}
        <button onClick={() => handleMemory("MC")} style={btnMem}>MC</button>
        <button onClick={() => handleMemory("MR")} style={btnMem}>MR</button>
        <button onClick={() => handleMemory("MS")} style={btnMem}>MS</button>
        <button onClick={() => handleMemory("M+")} style={btnMem}>M+</button>
        <button onClick={() => handleMemory("M-")} style={btnMem}>M-</button>

        {/* Row 2: Trig */}
        <button onClick={() => applyFunc("sin")} style={btnSci}>sin</button>
        <button onClick={() => applyFunc("cos")} style={btnSci}>cos</button>
        <button onClick={() => applyFunc("tan")} style={btnSci}>tan</button>
        <button onClick={() => applyFunc("asin")} style={btnSci}>sin⁻¹</button>
        <button onClick={() => applyFunc("acos")} style={btnSci}>cos⁻¹</button>

        {/* Row 3: Hyperbolic & Inverse */}
        <button onClick={() => applyFunc("atan")} style={btnSci}>tan⁻¹</button>
        <button onClick={() => applyFunc("sinh")} style={btnSci}>sinh</button>
        <button onClick={() => applyFunc("cosh")} style={btnSci}>cosh</button>
        <button onClick={() => applyFunc("tanh")} style={btnSci}>tanh</button>
        <button onClick={() => applyFunc("log")} style={btnSci}>log₁₀</button>

        {/* Row 4: Power & Root */}
        <button onClick={() => applyFunc("ln")} style={btnSci}>ln</button>
        <button onClick={() => applyFunc("sqrt")} style={btnSci}>√x</button>
        <button onClick={() => applyFunc("cbrt")} style={btnSci}>∛x</button>
        <button onClick={() => applyFunc("sq")} style={btnSci}>x²</button>
        <button onClick={() => applyFunc("cube")} style={btnSci}>x³</button>

        {/* Row 5: Functions & Clear */}
        <button onClick={() => applyFunc("pow")} style={btnSci}>x^y</button>
        <button onClick={() => applyFunc("recip")} style={btnSci}>1/x</button>
        <button onClick={() => append("(")} style={btnOp}>(</button>
        <button onClick={() => append(")")} style={btnOp}>)</button>
        <button onClick={clearDisplay} style={{ ...btnSci, background: "#ef4444", color: "#ffffff" }}>C</button>

        {/* Row 6: Numbers & Ops */}
        <button onClick={() => append("7")} style={btnNum}>7</button>
        <button onClick={() => append("8")} style={btnNum}>8</button>
        <button onClick={() => append("9")} style={btnNum}>9</button>
        <button onClick={() => append("/")} style={btnOp}>÷</button>
        <button onClick={backspace} style={btnSci}><Delete size={14} /></button>

        <button onClick={() => append("4")} style={btnNum}>4</button>
        <button onClick={() => append("5")} style={btnNum}>5</button>
        <button onClick={() => append("6")} style={btnNum}>6</button>
        <button onClick={() => append("*")} style={btnOp}>×</button>
        <button onClick={toggleSign} style={btnSci}>±</button>

        <button onClick={() => append("1")} style={btnNum}>1</button>
        <button onClick={() => append("2")} style={btnNum}>2</button>
        <button onClick={() => append("3")} style={btnNum}>3</button>
        <button onClick={() => append("-")} style={btnOp}>-</button>
        <button onClick={() => append("π")} style={btnSci}>π</button>

        <button onClick={() => append("0")} style={btnNum}>0</button>
        <button onClick={() => append(".")} style={btnNum}>.</button>
        <button onClick={() => append("e")} style={btnSci}>e</button>
        <button onClick={() => append("+")} style={btnOp}>+</button>
        <button onClick={calculateResult} style={{ ...btnNum, background: "#22c55e", color: "#ffffff", fontWeight: 900 }}>=</button>
      </div>
    </div>
  );
}

const btnNum = { background: "rgba(255,255,255,0.1)", color: "#ffffff", border: "none", borderRadius: 6, padding: "8px 0", fontSize: 13, fontWeight: 800, cursor: "pointer" };
const btnSci = { background: "rgba(56,189,248,0.15)", color: "#38bdf8", border: "none", borderRadius: 6, padding: "8px 0", fontSize: 11, fontWeight: 900, cursor: "pointer" };
const btnOp = { background: "rgba(245,158,11,0.2)", color: "#facc15", border: "none", borderRadius: 6, padding: "8px 0", fontSize: 13, fontWeight: 900, cursor: "pointer" };
const btnMem = { background: "rgba(168,85,247,0.2)", color: "#c084fc", border: "none", borderRadius: 6, padding: "6px 0", fontSize: 10, fontWeight: 900, cursor: "pointer" };
