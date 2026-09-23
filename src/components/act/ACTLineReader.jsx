import React, { useState, useEffect, useRef } from "react";
import { Move, ChevronUp, ChevronDown, Maximize2, Minimize2, EyeOff, X } from "lucide-react";

/**
 * ACTLineReader component
 * Native digital ACT Line Reader / Screen Masking accessibility tool.
 * Provides a draggable focus band that darkens areas above and below to assist with line-by-line reading.
 */
export default function ACTLineReader({ isOpen, onClose }) {
  const [topPos, setTopPos] = useState(250);
  const [windowHeight, setWindowHeight] = useState(70);
  const [isDragging, setIsDragging] = useState(false);
  const dragStartY = useRef(0);
  const initialTopY = useRef(250);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!isDragging) return;
      const deltaY = e.clientY - dragStartY.current;
      const newPos = Math.max(100, Math.min(window.innerHeight - 150, initialTopY.current + deltaY));
      setTopPos(newPos);
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging]);

  if (!isOpen) return null;

  const startDrag = (e) => {
    setIsDragging(true);
    dragStartY.current = e.clientY;
    initialTopY.current = topPos;
  };

  const moveUp = () => setTopPos((prev) => Math.max(100, prev - 40));
  const moveDown = () => setTopPos((prev) => Math.min(window.innerHeight - 150, prev + 40));
  const expandHeight = () => setWindowHeight((prev) => Math.min(160, prev + 20));
  const shrinkHeight = () => setWindowHeight((prev) => Math.max(40, prev - 20));

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 9990, pointerEvents: "none" }}>
      {/* Top Masking Layer */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: `${topPos}px`,
          background: "rgba(3, 7, 18, 0.72)",
          backdropFilter: "blur(2px)",
          transition: isDragging ? "none" : "height 0.15s ease",
          pointerEvents: "auto"
        }}
      />

      {/* Focus Line Reader Band */}
      <div
        style={{
          position: "absolute",
          top: `${topPos}px`,
          left: 0,
          right: 0,
          height: `${windowHeight}px`,
          borderTop: "3px solid #38bdf8",
          borderBottom: "3px solid #38bdf8",
          boxShadow: "0 0 25px rgba(56, 189, 248, 0.4)",
          background: "transparent",
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
          paddingRight: 24,
          transition: isDragging ? "none" : "top 0.15s ease, height 0.15s ease",
          pointerEvents: "auto",
          cursor: isDragging ? "grabbing" : "grab"
        }}
        onMouseDown={startDrag}
      >
        {/* Floating Tool Controls inside the Focus Band */}
        <div
          onMouseDown={(e) => e.stopPropagation()}
          style={{
            background: "#0f172a",
            border: "1px solid rgba(56, 189, 248, 0.4)",
            borderRadius: 999,
            padding: "4px 12px",
            display: "flex",
            alignItems: "center",
            gap: 8,
            boxShadow: "0 4px 15px rgba(0,0,0,0.5)",
            userSelect: "none"
          }}
        >
          <div
            onMouseDown={startDrag}
            style={{ display: "flex", alignItems: "center", gap: 4, color: "#38bdf8", fontSize: 11, fontWeight: 900, cursor: "grab", marginRight: 4 }}
          >
            <Move size={14} /> LINE READER
          </div>

          <button
            onClick={moveUp}
            title="Move Focus Up"
            style={{ background: "rgba(255,255,255,0.08)", color: "#ffffff", border: "none", borderRadius: "50%", width: 26, height: 26, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}
          >
            <ChevronUp size={14} />
          </button>

          <button
            onClick={moveDown}
            title="Move Focus Down"
            style={{ background: "rgba(255,255,255,0.08)", color: "#ffffff", border: "none", borderRadius: "50%", width: 26, height: 26, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}
          >
            <ChevronDown size={14} />
          </button>

          <button
            onClick={expandHeight}
            title="Increase Height"
            style={{ background: "rgba(255,255,255,0.08)", color: "#ffffff", border: "none", borderRadius: "50%", width: 26, height: 26, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}
          >
            <Maximize2 size={12} />
          </button>

          <button
            onClick={shrinkHeight}
            title="Decrease Height"
            style={{ background: "rgba(255,255,255,0.08)", color: "#ffffff", border: "none", borderRadius: "50%", width: 26, height: 26, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}
          >
            <Minimize2 size={12} />
          </button>

          <button
            onClick={onClose}
            title="Turn Off Line Reader"
            style={{ background: "rgba(239,68,68,0.2)", color: "#f87171", border: "1px solid rgba(239,68,68,0.4)", borderRadius: "50%", width: 26, height: 26, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", marginLeft: 4 }}
          >
            <X size={14} />
          </button>
        </div>
      </div>

      {/* Bottom Masking Layer */}
      <div
        style={{
          position: "absolute",
          top: `${topPos + windowHeight}px`,
          left: 0,
          right: 0,
          bottom: 0,
          background: "rgba(3, 7, 18, 0.72)",
          backdropFilter: "blur(2px)",
          transition: isDragging ? "none" : "top 0.15s ease",
          pointerEvents: "auto"
        }}
      />
    </div>
  );
}
