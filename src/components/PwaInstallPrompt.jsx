import { useState, useEffect, useRef } from "react";
import { Download, X, Share, PlusSquare, Sparkles, MoreVertical } from "lucide-react";
import "./PwaInstallPrompt.css";

const DISPLAY_DURATION_MS = 30000; // 30 seconds
const REPEAT_INTERVAL_MS = 120000; // 2 minutes (120 seconds)

export default function PwaInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showPrompt, setShowPrompt] = useState(false);
  const [isIos, setIsIos] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [showGuide, setShowGuide] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);

  const displayTimerRef = useRef(null);
  const repeatIntervalRef = useRef(null);

  useEffect(() => {
    const checkStandalone = () => {
      return (
        window.matchMedia("(display-mode: standalone)").matches ||
        window.navigator.standalone === true
      );
    };

    if (checkStandalone()) {
      setIsInstalled(true);
      return;
    }

    const ua = window.navigator.userAgent;
    const isIosDevice = /iphone|ipad|ipod/i.test(ua) && !window.MSStream;
    const isMobileDevice = /android|iphone|ipad|ipod/i.test(ua);

    setIsIos(isIosDevice);
    setIsMobile(isMobileDevice);

    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    const handleAppInstalled = () => {
      setIsInstalled(true);
      setShowPrompt(false);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    window.addEventListener("appinstalled", handleAppInstalled);

    const triggerPromptFor30s = () => {
      if (checkStandalone()) return;

      setShowPrompt(true);

      if (displayTimerRef.current) clearTimeout(displayTimerRef.current);

      displayTimerRef.current = setTimeout(() => {
        setShowPrompt(false);
      }, DISPLAY_DURATION_MS);
    };

    const initialTimer = setTimeout(() => {
      triggerPromptFor30s();
    }, 2000);

    repeatIntervalRef.current = setInterval(() => {
      triggerPromptFor30s();
    }, REPEAT_INTERVAL_MS);

    return () => {
      clearTimeout(initialTimer);
      if (displayTimerRef.current) clearTimeout(displayTimerRef.current);
      if (repeatIntervalRef.current) clearInterval(repeatIntervalRef.current);
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
      window.removeEventListener("appinstalled", handleAppInstalled);
    };
  }, []);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      try {
        deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;
        if (outcome === "accepted") {
          setIsInstalled(true);
          setShowPrompt(false);
        }
      } catch (err) {
        console.error("Install prompt error:", err);
      }
      setDeferredPrompt(null);
    } else {
      // Toggle visual guide if native prompt event hasn't fired
      setShowGuide((prev) => !prev);
    }
  };

  const handleDismiss = () => {
    setShowPrompt(false);
    if (displayTimerRef.current) clearTimeout(displayTimerRef.current);
  };

  if (isInstalled || !showPrompt) return null;

  return (
    <div className="pwa-prompt-container">
      <div className="pwa-prompt-card">
        {/* 30-second Countdown Progress Bar */}
        <div className="pwa-progress-bar" key={Date.now()} />

        {/* Icon & App Information */}
        <div className="pwa-prompt-left">
          <div className="pwa-prompt-icon-wrapper">
            <img src="/icon-192.png" alt="Knarrow App Icon" className="pwa-prompt-icon" />
          </div>

          <div className="pwa-prompt-text">
            <div className="pwa-prompt-badge">
              <Sparkles size={12} /> Add to Home Screen
            </div>
            <h4 className="pwa-prompt-title">Install Knarrow App</h4>
            <p className="pwa-prompt-desc">
              1-tap launch, offline IELTS practice &amp; full CBT mock environment.
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="pwa-prompt-right">
          <button className="pwa-install-btn" onClick={handleInstallClick}>
            {isIos ? <Share size={16} /> : <Download size={16} />}
            {deferredPrompt ? "Install App Now" : "How to Install"}
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
                  <span>Tap <strong>Share</strong> <Share size={13} style={{ verticalAlign: "middle", color: "#38bdf8" }} /> at the bottom of Safari</span>
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
                  <span>Tap the <strong>3 dots (⋮)</strong> <MoreVertical size={13} style={{ verticalAlign: "middle", color: "#38bdf8" }} /> in the top right corner of Chrome</span>
                </div>
                <div className="pwa-ios-step">
                  <span className="pwa-ios-step-num">2</span>
                  <span>Select <strong>"Add to Home screen"</strong> or <strong>"Install app"</strong></span>
                </div>
              </>
            ) : (
              <>
                <div className="pwa-ios-step">
                  <span className="pwa-ios-step-num">1</span>
                  <span>Look at the <strong>Top Right</strong> of your browser address bar</span>
                </div>
                <div className="pwa-ios-step">
                  <span className="pwa-ios-step-num">2</span>
                  <span>Click the <strong>Install Icon</strong> <Download size={13} style={{ verticalAlign: "middle", color: "#38bdf8" }} /> or <strong>3 dots (⋮) → Install Knarrow</strong></span>
                </div>
              </>
            )}
          </div>
        )}

      </div>
    </div>
  );
}
