import { useState, useEffect, useRef } from "react";
import { Download, X, Share, PlusSquare, Sparkles, MoreVertical } from "lucide-react";
import "./PwaInstallPrompt.css";

const DISPLAY_DURATION_MS = 30000; // 30 seconds

export default function PwaInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showPrompt, setShowPrompt] = useState(false);
  const [isIos, setIsIos] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [showGuide, setShowGuide] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);

  const displayTimerRef = useRef(null);

  useEffect(() => {
    const checkStandalone = () => {
      const isStandalone = (
        window.matchMedia("(display-mode: standalone)").matches ||
        window.matchMedia("(display-mode: window-controls-overlay)").matches ||
        window.navigator.standalone === true ||
        localStorage.getItem("knarrow_pwa_installed") === "true"
      );

      if (
        window.matchMedia("(display-mode: standalone)").matches ||
        window.navigator.standalone === true
      ) {
        localStorage.setItem("knarrow_pwa_installed", "true");
      }

      return isStandalone;
    };

    if (checkStandalone()) {
      setIsInstalled(true);
      setShowPrompt(false);
    }

    const ua = window.navigator.userAgent;
    const isIosDevice = /iphone|ipad|ipod/i.test(ua) && !window.MSStream;
    const isMobileDevice = /android|iphone|ipad|ipod/i.test(ua);

    setIsIos(isIosDevice);
    setIsMobile(isMobileDevice);

    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      window.deferredPwaPrompt = e;
    };

    const handleAppInstalled = () => {
      localStorage.setItem("knarrow_pwa_installed", "true");
      setIsInstalled(true);
      setShowPrompt(false);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    window.addEventListener("appinstalled", handleAppInstalled);

    // Global trigger function accessible from anywhere in the app
    window.triggerPwaInstall = async () => {
      const activePrompt = deferredPrompt || window.deferredPwaPrompt;
      if (activePrompt) {
        try {
          activePrompt.prompt();
          const { outcome } = await activePrompt.userChoice;
          if (outcome === "accepted") {
            localStorage.setItem("knarrow_pwa_installed", "true");
            setIsInstalled(true);
            setShowPrompt(false);
          }
        } catch (err) {
          console.error("PWA Install error:", err);
        }
      } else {
        setShowPrompt(true);
        setShowGuide(true);
      }
    };

    // Auto-show prompt banner after 3 seconds if not dismissed
    if (!checkStandalone() && localStorage.getItem("knarrow_pwa_dismissed") !== "true") {
      const t = setTimeout(() => {
        setShowPrompt(true);
      }, 3000);
      return () => clearTimeout(t);
    }

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
      window.removeEventListener("appinstalled", handleAppInstalled);
    };
  }, [deferredPrompt]);

  const handleInstallClick = async () => {
    const activePrompt = deferredPrompt || window.deferredPwaPrompt;
    if (activePrompt) {
      try {
        activePrompt.prompt();
        const { outcome } = await activePrompt.userChoice;
        if (outcome === "accepted") {
          localStorage.setItem("knarrow_pwa_installed", "true");
          setIsInstalled(true);
          setShowPrompt(false);
        }
      } catch (err) {
        console.error("Install prompt error:", err);
      }
    } else {
      setShowGuide((prev) => !prev);
    }
  };

  const handleDismiss = () => {
    localStorage.setItem("knarrow_pwa_dismissed", "true");
    setShowPrompt(false);
  };

  if (isInstalled || !showPrompt) return null;

  return (
    <div className="pwa-prompt-container">
      <div className="pwa-prompt-card">
        {/* Icon & App Information */}
        <div className="pwa-prompt-left">
          <div className="pwa-prompt-icon-wrapper">
            <img src="/icon-192.png" alt="Knarrow App Icon" className="pwa-prompt-icon" />
          </div>

          <div className="pwa-prompt-text">
            <div className="pwa-prompt-badge">
              <Sparkles size={12} /> Fast 1-Tap Access
            </div>
            <h4 className="pwa-prompt-title">Install Knarrow App</h4>
            <p className="pwa-prompt-desc">
              Instant launch, offline practice &amp; real-time test alerts.
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="pwa-prompt-right">
          <button className="pwa-install-btn" onClick={handleInstallClick}>
            {isIos ? <Share size={16} /> : <Download size={16} />}
            {deferredPrompt || window.deferredPwaPrompt ? "Install 1-Click" : "How to Install"}
          </button>

          <button className="pwa-dismiss-btn" onClick={handleDismiss} aria-label="Close app install banner">
            <X size={18} />
          </button>
        </div>

        {/* Interactive Visual Guide */}
        {(showGuide || isIos) && (
          <div className="pwa-ios-guide">
            {isIos ? (
              <>
                <div className="pwa-ios-step">
                  <span className="pwa-ios-step-num">1</span>
                  <span>Tap <strong>Share</strong> <Share size={13} style={{ verticalAlign: "middle", color: "#38bdf8" }} /> in Safari</span>
                </div>
                <div className="pwa-ios-step">
                  <span className="pwa-ios-step-num">2</span>
                  <span>Tap <strong>Add to Home Screen</strong> <PlusSquare size={13} style={{ verticalAlign: "middle", color: "#38bdf8" }} /></span>
                </div>
              </>
            ) : isMobile ? (
              <>
                <div className="pwa-ios-step">
                  <span className="pwa-ios-step-num">1</span>
                  <span>Tap <strong>3 dots (⋮)</strong> <MoreVertical size={13} style={{ verticalAlign: "middle", color: "#38bdf8" }} /> in Chrome</span>
                </div>
                <div className="pwa-ios-step">
                  <span className="pwa-ios-step-num">2</span>
                  <span>Select <strong>"Add to Home screen"</strong></span>
                </div>
              </>
            ) : (
              <>
                <div className="pwa-ios-step">
                  <span className="pwa-ios-step-num">1</span>
                  <span>Look at your browser address bar</span>
                </div>
                <div className="pwa-ios-step">
                  <span className="pwa-ios-step-num">2</span>
                  <span>Click <strong>Install Icon</strong> <Download size={13} style={{ verticalAlign: "middle", color: "#38bdf8" }} /> or <strong>3 dots (⋮) → Install Knarrow</strong></span>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
