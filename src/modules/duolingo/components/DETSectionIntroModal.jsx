import React from "react";
import { X, Clock } from "lucide-react";

export default function DETSectionIntroModal({
  isOpen = true,
  sectionNumber = 1,
  totalSections = 7,
  title = "Read and Select",
  numQuestions = "15 to 18",
  timePerQuestion = "0:05",
  timeHeader = "0:06",
  onContinue,
  onClose,
}) {
  if (!isOpen) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "rgba(100, 116, 139, 0.4)",
        backdropFilter: "blur(4px)",
        zIndex: 99999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
        fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      }}
    >
      <div
        style={{
          background: "#ffffff",
          borderRadius: "20px",
          width: "100%",
          maxWidth: "760px",
          padding: "24px 32px 32px 32px",
          boxShadow: "0 20px 50px rgba(0, 0, 0, 0.12)",
          position: "relative",
          display: "flex",
          flexDirection: "column",
          minHeight: "420px",
        }}
      >
        {/* Top Header Bar */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "32px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              fontSize: "15px",
              fontWeight: "700",
              color: "#334155",
            }}
          >
            <Clock size={18} />
            <span>{timeHeader}</span>
          </div>

          <button
            onClick={onClose}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "#94a3b8",
              padding: "4px",
            }}
          >
            <X size={22} />
          </button>
        </div>

        {/* Center Content */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center" }}>
          
          {/* Segmented Progress Bar with Section Tooltip */}
          <div style={{ position: "relative", marginBottom: "28px" }}>
            {/* Tooltip Badge */}
            <div
              style={{
                position: "absolute",
                top: "-36px",
                left: `${((sectionNumber - 0.5) / totalSections) * 100}%`,
                transform: "translateX(-50%)",
                background: "#1cb0f6",
                color: "#ffffff",
                fontSize: "11px",
                fontWeight: "800",
                padding: "3px 10px",
                borderRadius: "6px",
                letterSpacing: "0.5px",
                textTransform: "uppercase",
                whiteSpace: "nowrap",
              }}
            >
              SECTION {sectionNumber}
              {/* Pointer triangle */}
              <div
                style={{
                  position: "absolute",
                  bottom: "-5px",
                  left: "50%",
                  transform: "translateX(-50%)",
                  width: 0,
                  height: 0,
                  borderLeft: "5px solid transparent",
                  borderRight: "5px solid transparent",
                  borderTop: "5px solid #1cb0f6",
                }}
              />
            </div>

            {/* Progress Track */}
            <div style={{ display: "flex", gap: "4px", width: "260px", background: "#e2e8f0", padding: "3px", borderRadius: "999px" }}>
              {Array.from({ length: totalSections }).map((_, i) => (
                <div
                  key={i}
                  style={{
                    flex: 1,
                    height: "10px",
                    borderRadius: "999px",
                    background: i < sectionNumber ? "#1cb0f6" : "#e2e8f0",
                    transition: "all 0.3s ease",
                  }}
                />
              ))}
            </div>
          </div>

          {/* Section Title */}
          <h2 style={{ fontSize: "26px", fontWeight: "800", color: "#1e293b", margin: "0 0 24px 0" }}>
            {title}
          </h2>

          {/* 2-Column Info Card */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              border: "1px solid #e2e8f0",
              borderRadius: "14px",
              width: "100%",
              maxWidth: "420px",
              padding: "16px",
              marginBottom: "32px",
              background: "#ffffff",
            }}
          >
            <div style={{ borderRight: "1px solid #e2e8f0", paddingRight: "12px" }}>
              <div style={{ fontSize: "10px", fontWeight: "800", color: "#64748b", textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: "4px" }}>
                NUMBER OF QUESTIONS
              </div>
              <div style={{ fontSize: "16px", fontWeight: "800", color: "#1cb0f6" }}>
                {numQuestions}
              </div>
            </div>

            <div style={{ paddingLeft: "12px" }}>
              <div style={{ fontSize: "10px", fontWeight: "800", color: "#64748b", textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: "4px" }}>
                TIME PER QUESTION
              </div>
              <div style={{ fontSize: "16px", fontWeight: "800", color: "#1cb0f6" }}>
                {timePerQuestion}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar with CONTINUE button */}
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <button
            onClick={onContinue}
            style={{
              background: "#1cb0f6",
              color: "#ffffff",
              border: "none",
              borderRadius: "12px",
              padding: "12px 36px",
              fontSize: "14px",
              fontWeight: "800",
              letterSpacing: "0.5px",
              cursor: "pointer",
              boxShadow: "0 4px 0 #0284c7",
              transition: "all 0.15s ease",
            }}
            onMouseDown={e => e.currentTarget.style.transform = "translateY(2px)"}
            onMouseUp={e => e.currentTarget.style.transform = "translateY(0)"}
          >
            CONTINUE
          </button>
        </div>
      </div>
    </div>
  );
}
