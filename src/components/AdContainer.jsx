import React, { useEffect } from "react";

/**
 * Safe Google AdSense Container Component
 * Ensures ads comply with AdSense guidelines:
 * - Never placed inside test answer blocks
 * - Never placed near checkout/payment buttons
 * - Clearly isolated with layout boundaries
 */
export default function AdContainer({ client = "ca-pub-XXXXXXXXXXXXXXXX", slot = "", format = "auto", responsive = "true", style = {} }) {
  useEffect(() => {
    try {
      if (window.adsbygoogle && Array.isArray(window.adsbygoogle)) {
        window.adsbygoogle.push({});
      }
    } catch (e) {
      // Ignore ad initialization errors if adblocker is active
    }
  }, []);

  return (
    <div
      className="knarrow-ad-wrapper"
      style={{
        margin: "24px auto",
        maxWidth: "100%",
        textAlign: "center",
        overflow: "hidden",
        clear: "both",
        ...style
      }}
    >
      <div
        style={{
          fontSize: "10px",
          color: "var(--text-secondary, #94a3b8)",
          textTransform: "uppercase",
          letterSpacing: "1px",
          marginBottom: "6px"
        }}
      >
        Advertisement
      </div>
      <ins
        className="adsbygoogle"
        style={{ display: "block", minHeight: "90px", ...style }}
        data-ad-client={client}
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive={responsive}
      />
    </div>
  );
}
