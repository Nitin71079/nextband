import React, { useEffect } from "react";

/**
 * Safe Google AdSense Container Component
 * Renders ad container only when a valid publisher ID is configured.
 * Prevents inserting fake ca-pub IDs which cause console errors and policy flags.
 */
export default function AdContainer({ client = "", slot = "", format = "auto", responsive = "true", style = {} }) {
  const pubId = client || import.meta.env?.VITE_ADSENSE_CLIENT || "";

  useEffect(() => {
    if (pubId && !pubId.includes("XXXX")) {
      try {
        if (window.adsbygoogle && Array.isArray(window.adsbygoogle)) {
          window.adsbygoogle.push({});
        }
      } catch (e) {
        // Ignore ad initialization errors if adblocker is active
      }
    }
  }, [pubId]);

  if (!pubId || pubId.includes("XXXX")) {
    return null; // Safe fallback when no real AdSense Publisher ID is attached yet
  }

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
        data-ad-client={pubId}
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive={responsive}
      />
    </div>
  );
}
