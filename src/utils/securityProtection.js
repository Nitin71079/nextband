import toast from "react-hot-toast";

/**
 * Global Anti-Screenshot, Anti-Screen Recording, Anti-DevTools, and Anti-Copy Protection
 */
export function initSecurityProtection() {
  if (typeof window === "undefined") return;

  // 1. Prevent Right-Click Context Menu
  window.addEventListener("contextmenu", (e) => {
    e.preventDefault();
    return false;
  });

  // 2. Prevent Keyboard Shortcuts for DevTools, Saving, Printing, and Screenshots
  window.addEventListener("keydown", (e) => {
    const key = e.key ? e.key.toLowerCase() : "";
    const code = e.code ? e.code.toLowerCase() : "";

    // F12 key
    if (key === "f12" || code === "f12") {
      e.preventDefault();
      e.stopPropagation();
      return false;
    }

    // Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+Shift+C (DevTools)
    if (e.ctrlKey && e.shiftKey && (key === "i" || key === "j" || key === "c")) {
      e.preventDefault();
      e.stopPropagation();
      return false;
    }

    // Cmd+Option+I, Cmd+Option+J, Cmd+Option+C (Mac DevTools)
    if (e.metaKey && e.altKey && (key === "i" || key === "j" || key === "c")) {
      e.preventDefault();
      e.stopPropagation();
      return false;
    }

    // Ctrl+U / Cmd+U (View Source)
    if ((e.ctrlKey || e.metaKey) && key === "u") {
      e.preventDefault();
      e.stopPropagation();
      return false;
    }

    // Ctrl+S / Cmd+S (Save Page)
    if ((e.ctrlKey || e.metaKey) && key === "s") {
      e.preventDefault();
      e.stopPropagation();
      return false;
    }

    // Ctrl+P / Cmd+P (Print Page)
    if ((e.ctrlKey || e.metaKey) && key === "p") {
      e.preventDefault();
      e.stopPropagation();
      toast.error("Printing and saving exam content is restricted.", { id: "no-print" });
      return false;
    }

    // PrintScreen key
    if (key === "printscreen" || code === "printscreen" || e.keyCode === 44) {
      e.preventDefault();
      e.stopPropagation();
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(""); // clear clipboard
      }
      toast.error("Screenshots are restricted on Knarrow to protect test content.", { id: "no-screenshot" });
      return false;
    }
  }, true);

  // 3. Clear Clipboard on Copy attempt outside editable fields
  window.addEventListener("copy", (e) => {
    const activeEl = document.activeElement;
    const isEditable = activeEl && (
      activeEl.tagName === "INPUT" ||
      activeEl.tagName === "TEXTAREA" ||
      activeEl.isContentEditable
    );

    if (!isEditable) {
      e.preventDefault();
      if (e.clipboardData) {
        e.clipboardData.setData("text/plain", "");
      }
      toast.error("Content copying is disabled.", { id: "no-copy" });
    }
  });

  // 4. Inject global anti-selection & anti-drag CSS
  if (!document.getElementById("knarrow-security-styles")) {
    const style = document.createElement("style");
    style.id = "knarrow-security-styles";
    style.innerHTML = `
      body, html {
        -webkit-user-select: none !important;
        -moz-user-select: none !important;
        -ms-user-select: none !important;
        user-select: none !important;
        -webkit-touch-callout: none !important;
      }

      input, textarea, [contenteditable="true"] {
        -webkit-user-select: text !important;
        -moz-user-select: text !important;
        -ms-user-select: text !important;
        user-select: text !important;
      }

      img, video, audio {
        -webkit-user-drag: none !important;
        user-drag: none !important;
      }

      @media print {
        body {
          display: none !important;
        }
      }
    `;
    document.head.appendChild(style);
  }
}
