import React from "react";
import { Info } from "lucide-react";

export default function ExamNonAffiliationDisclaimer({ examName, organizationName }) {
  return (
    <div style={{
      background: "rgba(255, 255, 255, 0.03)",
      border: "1px solid rgba(255, 255, 255, 0.08)",
      borderRadius: "14px",
      padding: "16px 20px",
      margin: "24px 0",
      display: "flex",
      alignItems: "flex-start",
      gap: "12px",
      fontSize: "0.85rem",
      color: "var(--text-secondary, #94a3b8)",
      lineHeight: 1.6
    }}>
      <Info size={18} style={{ color: "#3b82f6", flexShrink: 0, marginTop: "2px" }} />
      <div>
        <strong>Disclaimer:</strong> Knarrow is an independent educational technology and exam preparation platform. Knarrow is not affiliated with, endorsed by, authorized by, or associated with {organizationName || "official test governing bodies"} or any official exam administrators. {examName ? `${examName} and related trademarks` : "All trademarks and registered trademarks"} belong solely to their respective copyright holders.
      </div>
    </div>
  );
}
