import { useState, useEffect, useRef } from "react";
import { Download, X, Share, PlusSquare, Sparkles } from "lucide-react";
import "./PwaInstallPrompt.css";

const DISPLAY_DURATION_MS = 30000; // 30 seconds
const REPEAT_INTERVAL_MS = 120000; // 2 minutes (120 seconds)

export default function PwaInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showPrompt, setShowPrompt] = useState(false);
  const [isIos, setIsIos] = useState(false);
  const [showIosGuide, setShowIosGuide] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);

  const displayTimerRef = useRef(null);
  const repeatIntervalRef = useRef(null);

  useEffect(() => {
    // Check if app is already running in standalone (installed) mode
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

    // Detect iOS
    const ua = window.navigator.userAgent;
    const isIosDevice = /iphone|ipad|ipod/i.test(ua) && !window.MSStream;
    setIsIos(isIosDevice);

    // Save prompt event for Android / Chrome / Edge
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

    // Trigger function to show prompt for exactly 30 seconds
    const triggerPromptFor30s = () => {
      if (checkStandalone()) return;

      setShowPrompt(true);

      if (displayTimerRef.current) clearTimeout(displayTimerRef.current);

      // Auto-dismiss after 30 seconds
      displayTimerRef.current = setTimeout(() => {
        setShowPrompt(false);
      }, DISPLAY_DURATION_MS);
    };

    // Initial pop-up after 2 seconds
    const initialTimer = setTimeout(() => {
      triggerPromptFor30s();
    }, 2000);

    // Repeat pop-up every 2 minutes
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
    if (!deferredPrompt) {
      // Fallback instruction if browser prompt event hasn't fired yet
      alert("To add Knarrow to your Home Screen: open your browser menu (⋮) and tap 'Add to Home screen' or 'Install app'.");
      return;
    }

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
          {!isIos ? (
            <button className="pwa-install-btn" onClick={handleInstallClick}>
              <Download size={16} /> Install App Now
            </button>
          ) : (
            <button className="pwa-install-btn" onClick={() => setShowIosGuide(!showIosGuide)}>
              <Share size={16} /> Add to Home Screen
            </button>
          )}

          <button className="pwa-dismiss-btn" onClick={handleDismiss} aria-label="Close app install banner">
            <X size={18} />
          </button>
        </div>

        {/* iOS Step-by-Step Guidance */}
        {isIos && (
          <div className="pwa-ios-guide">
            <div className="pwa-ios-step">
              <span className="pwa-ios-step-num">1</span>
              <span>Tap <strong>Share</strong> <Share size={13} style={{ verticalAlign: "middle" }} /> at the bottom of Safari</span>
            </div>
            <div className="pwa-ios-step">
              <span className="pwa-ios-step-num">2</span>
              <span>Tap <strong>Add to Home Screen</strong> <PlusSquare size={13} style={{ verticalAlign: "middle" }} /></span>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
