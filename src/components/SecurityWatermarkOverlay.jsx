import React, { useEffect } from "react";
import { useAuth } from "../context/AuthContext";

/**
 * SECURITY & WATERMARK OVERLAY
 * Renders subtle user email/IP watermark across pages without blocking interaction.
 * Restricts PrintScreen and clipboard copying without screen-blur shielding.
 */
export default function SecurityWatermarkOverlay() {
  const { user } = useAuth();
  const displayId = user?.email ? user.email.toLowerCase() : "knarrow.in · ielts student access";

  useEffect(() => {
    // Disable PrintScreen key capture
    const handleKeyDown = (e) => {
      if (e.key === "PrintScreen" || e.keyCode === 44) {
        e.preventDefault();
        try {
          navigator.clipboard.writeText("");
        } catch (err) {}
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Generate pattern of mild watermarks
  const watermarkItems = Array.from({ length: 24 });

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        pointerEvents: "none",
        zIndex: 99999,
        overflow: "hidden",
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        gridTemplateRows: "repeat(6, 1fr)",
        opacity: 0.18,
        userSelect: "none"
      }}
    >
      {watermarkItems.map((_, i) => (
        <div
          key={i}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transform: "rotate(-25deg)",
            fontSize: "12px",
            fontWeight: 800,
            color: "rgba(148, 163, 184, 0.8)",
            letterSpacing: "1px",
            textTransform: "lowercase",
            fontFamily: "Inter, sans-serif"
          }}
        >
          {displayId}
        </div>
      ))}
    </div>
  );
}
