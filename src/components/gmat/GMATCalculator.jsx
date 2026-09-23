import React, { useState } from "react";
import { X, Delete } from "lucide-react";

export default function GMATCalculator({ onClose }) {
  const [display, setDisplay] = useState("0");
  const [memory, setMemory] = useState(0);
  const [waitingForOperand, setWaitingForOperand] = useState(false);
  const [pendingOperator, setPendingOperator] = useState(null);

  const handleDigit = (digit) => {
    if (waitingForOperand) {
      setDisplay(String(digit));
      setWaitingForOperand(false);
    } else {
      setDisplay(display === "0" ? String(digit) : display + digit);
    }
  };

  const handleDecimal = () => {
    if (waitingForOperand) {
      setDisplay("0.");
      setWaitingForOperand(false);
    } else if (!display.includes(".")) {
      setDisplay(display + ".");
    }
  };

  const handleClear = () => {
    setDisplay("0");
    setPendingOperator(null);
    setMemory(0);
    setWaitingForOperand(false);
  };

  const handleBackspace = () => {
    if (waitingForOperand) return;
    if (display.length > 1) {
      setDisplay(display.slice(0, -1));
    } else {
      setDisplay("0");
    }
  };

  const handleToggleSign = () => {
    const val = parseFloat(display);
    if (!isNaN(val)) {
      setDisplay(String(-val));
    }
  };

  const handleSqrt = () => {
    const val = parseFloat(display);
    if (val >= 0) {
      setDisplay(String(Math.sqrt(val)));
      setWaitingForOperand(true);
    } else {
      setDisplay("Error");
      setWaitingForOperand(true);
    }
  };

  const handleOperator = (nextOperator) => {
    const inputValue = parseFloat(display);

    if (pendingOperator && waitingForOperand) {
      setPendingOperator(nextOperator);
      return;
    }

    if (memory === 0) {
      setMemory(inputValue);
    } else if (pendingOperator) {
      const currentValue = memory || 0;
      let newValue = currentValue;

      switch (pendingOperator) {
        case "+":
          newValue = currentValue + inputValue;
          break;
        case "-":
          newValue = currentValue - inputValue;
          break;
        case "*":
          newValue = currentValue * inputValue;
          break;
        case "/":
          newValue = inputValue !== 0 ? currentValue / inputValue : "Error";
          break;
        default:
          break;
      }

      setMemory(typeof newValue === "number" ? newValue : 0);
      setDisplay(String(newValue));
    }

    setWaitingForOperand(true);
    setPendingOperator(nextOperator);
  };

  const handleEqual = () => {
    if (!pendingOperator) return;
    handleOperator(pendingOperator);
    setPendingOperator(null);
  };

  return (
    <div
      style={{
        position: "fixed",
        top: "100px",
        right: "30px",
        zIndex: 9999,
        width: "260px",
        background: "#1e293b",
        border: "2px solid #0284c7",
        borderRadius: "12px",
        boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
        padding: "16px",
        fontFamily: "Inter, monospace",
        color: "#ffffff"
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
        <span style={{ fontSize: "13px", fontWeight: 800, color: "#38bdf8", letterSpacing: "0.5px" }}>
          DATA INSIGHTS CALCULATOR
        </span>
        <button
          onClick={onClose}
          style={{ background: "none", border: "none", color: "#94a3b8", cursor: "pointer", padding: 2 }}
        >
          <X size={18} />
        </button>
      </div>

      <div
        style={{
          background: "#0f172a",
          border: "1px solid #334155",
          borderRadius: "8px",
          padding: "10px 12px",
          fontSize: "20px",
          fontWeight: 700,
          textAlign: "right",
          color: "#00ffcc",
          minHeight: "44px",
          marginBottom: "14px",
          overflowX: "auto"
        }}
      >
        {display}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "8px" }}>
        <button onClick={handleClear} style={btnStyle("#ef4444", "#ffffff")}>C</button>
        <button onClick={handleSqrt} style={btnStyle("#334155")}>√</button>
        <button onClick={handleToggleSign} style={btnStyle("#334155")}>±</button>
        <button onClick={handleBackspace} style={btnStyle("#334155")}><Delete size={14} /></button>

        <button onClick={() => handleDigit(7)} style={btnStyle("#1e293b")}>7</button>
        <button onClick={() => handleDigit(8)} style={btnStyle("#1e293b")}>8</button>
        <button onClick={() => handleDigit(9)} style={btnStyle("#1e293b")}>9</button>
        <button onClick={() => handleOperator("/")} style={btnStyle("#0284c7")}>÷</button>

        <button onClick={() => handleDigit(4)} style={btnStyle("#1e293b")}>4</button>
        <button onClick={() => handleDigit(5)} style={btnStyle("#1e293b")}>5</button>
        <button onClick={() => handleDigit(6)} style={btnStyle("#1e293b")}>6</button>
        <button onClick={() => handleOperator("*")} style={btnStyle("#0284c7")}>×</button>

        <button onClick={() => handleDigit(1)} style={btnStyle("#1e293b")}>1</button>
        <button onClick={() => handleDigit(2)} style={btnStyle("#1e293b")}>2</button>
        <button onClick={() => handleDigit(3)} style={btnStyle("#1e293b")}>3</button>
        <button onClick={() => handleOperator("-")} style={btnStyle("#0284c7")}>-</button>

        <button onClick={() => handleDigit(0)} style={btnStyle("#1e293b")}>0</button>
        <button onClick={handleDecimal} style={btnStyle("#1e293b")}>.</button>
        <button onClick={handleEqual} style={{ ...btnStyle("#10b981", "#ffffff"), gridColumn: "span 2" }}>=</button>
      </div>
    </div>
  );
}

function btnStyle(bg, col = "#ffffff") {
  return {
    background: bg,
    color: col,
    border: "1px solid rgba(255,255,255,0.1)",
    borderRadius: "6px",
    padding: "10px 0",
    fontSize: "14px",
    fontWeight: 700,
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  };
}
