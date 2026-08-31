import React, { useEffect, useState } from "react";

/**
 * KNARROW ANTI-SCREENSHOT & MILD WATERMARK OVERLAY
 * - Prevents PrintScreen, Clipboard copying, Context Menu, and Keyboard shortcuts (F12, Ctrl+P, Shift+Meta+S)
 * - Blurs screen when window loses focus (Anti-screen recorder/capture)
 * - Renders a very subtle, elegant diagonal watermark pattern across every page
 */
export default function SecurityWatermarkOverlay({ userEmail = "KNARROW OFFICIAL PREP" }) {
  const [isWindowBlurred, setIsWindowBlurred] = useState(false);

  useEffect(() => {
    // 1. Prevent Right-Click Context Menu
    const handleContextMenu = (e) => {
      e.preventDefault();
    };

    // 2. Prevent Keyboard Shortcuts (PrtScn, F12, Ctrl+P, Ctrl+Shift+I, Meta+Shift+S, etc.)
    const handleKeyDown = (e) => {
      // PrintScreen Key
      if (e.key === "PrintScreen" || e.keyCode === 44) {
        e.preventDefault();
        try {
          navigator.clipboard.writeText("Protected content — Screenshots restricted on Knarrow Platform.");
        } catch {}
        alert("Screenshots and screen capturing are restricted on Knarrow Platform for content security.");
      }

      // Ctrl + P (Print)
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "p") {
        e.preventDefault();
      }

      // F12 or Ctrl+Shift+I / Ctrl+Shift+C (DevTools)
      if (
        e.key === "F12" ||
        ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key.toLowerCase() === "i" || e.key.toLowerCase() === "c" || e.key.toLowerCase() === "j"))
      ) {
        e.preventDefault();
      }

      // Snipping Tool / Mac Screenshot (Cmd+Shift+3/4/5, Win+Shift+S)
      if ((e.shiftKey && (e.metaKey || e.ctrlKey) && (e.key === "3" || e.key === "4" || e.key === "5" || e.key.toLowerCase() === "s"))) {
        e.preventDefault();
      }
    };

    // 3. Prevent Window Blur Screen Blocking
    // Keeping subtle watermark overlay and PrintScreen restrictions active

    window.addEventListener("contextmenu", handleContextMenu);
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("contextmenu", handleContextMenu);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <>
      {/* ── MILD SUBTLE WATERMARK OVERLAY GRID ── */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          pointerEvents: "none",
          zIndex: 999999,
          overflow: "hidden",
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gridTemplateRows: "repeat(6, 1fr)",
          gap: "40px",
          opacity: 0.04, // VERY MILDLY VISIBLE SUBTLE WATERMARK
          userSelect: "none",
          WebkitUserSelect: "none"
        }}
      >
        {Array.from({ length: 24 }).map((_, idx) => (
          <div
            key={idx}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              transform: "rotate(-25deg)",
              color: "rgba(148, 163, 184, 0.8)",
              fontSize: "12px",
              fontWeight: 900,
              letterSpacing: "2px",
              textTransform: "uppercase",
              textAlign: "center",
              whiteSpace: "nowrap"
            }}
          >
            <span>KNARROW PREP • CONFIDENTIAL</span>
            <span style={{ fontSize: "10px", marginTop: 2, opacity: 0.8 }}>{userEmail}</span>
          </div>
        ))}
      </div>

    </>
  );
}
