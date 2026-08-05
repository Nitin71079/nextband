import { useState, useEffect } from "react";
import { Download, X, Share, PlusSquare, Smartphone } from "lucide-react";
import "./PwaInstallPrompt.css";

export default function PwaInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showPrompt, setShowPrompt] = useState(false);
  const [isIos, setIsIos] = useState(false);
  const [showIosGuide, setShowIosGuide] = useState(false);

  useEffect(() => {
    // Check if already installed in standalone mode
    const isStandalone =
      window.matchMedia("(display-mode: standalone)").matches ||
      window.navigator.standalone === true;

    if (isStandalone) return;

    // Check if user dismissed recently
    const dismissedAt = localStorage.getItem("knarrow_pwa_dismissed");
    if (dismissedAt) {
      const daysSinceDismissed = (Date.now() - parseInt(dismissedAt, 10)) / (1000 * 60 * 60 * 24);
      if (daysSinceDismissed < 7) return;
    }

    // Detect iOS
    const ua = window.navigator.userAgent;
    const isIosDevice = /iphone|ipad|ipod/i.test(ua) && !window.MSStream;
    setIsIos(isIosDevice);

    if (isIosDevice) {
      // Show iOS banner after 3 seconds on iOS devices
      const timer = setTimeout(() => setShowPrompt(true), 3000);
      return () => clearTimeout(timer);
    }

    // Listen for Chrome/Android/Desktop install prompt
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowPrompt(true);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;

    if (outcome === "accepted") {
      setShowPrompt(false);
    }
    setDeferredPrompt(null);
  };

  const handleDismiss = () => {
    setShowPrompt(false);
    localStorage.setItem("knarrow_pwa_dismissed", Date.now().toString());
  };

  if (!showPrompt) return null;

  return (
    <div className="pwa-prompt-container">
      <div className="pwa-prompt-card">

        {/* Icon & App Meta */}
        <div className="pwa-prompt-left">
          <div className="pwa-prompt-icon-wrapper">
            <img src="/icon-192.png" alt="Knarrow Icon" className="pwa-prompt-icon" />
          </div>

          <div className="pwa-prompt-text">
            <div className="pwa-prompt-badge">
              <Smartphone size={12} /> Mobile &amp; Desktop App
            </div>
            <h4 className="pwa-prompt-title">Install Knarrow</h4>
            <p className="pwa-prompt-desc">
              Get instant access to AI IELTS practice, CBT mocks, and fast performance.
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="pwa-prompt-right">
          {!isIos ? (
            <button className="pwa-install-btn" onClick={handleInstallClick}>
              <Download size={16} /> Install App
            </button>
          ) : (
            <button className="pwa-install-btn" onClick={() => setShowIosGuide(!showIosGuide)}>
              <Share size={16} /> Add to Home Screen
            </button>
          )}

          <button className="pwa-dismiss-btn" onClick={handleDismiss} aria-label="Dismiss app install banner">
            <X size={18} />
          </button>
        </div>

        {/* iOS Step-by-step guidance modal/tooltip */}
        {isIos && showIosGuide && (
          <div className="pwa-ios-guide">
            <div className="pwa-ios-step">
              <span className="pwa-ios-step-num">1</span>
              <span>Tap the <strong>Share</strong> button <Share size={14} style={{ verticalAlign: "middle" }} /> at the bottom of Safari.</span>
            </div>
            <div className="pwa-ios-step">
              <span className="pwa-ios-step-num">2</span>
              <span>Scroll down and select <strong>Add to Home Screen</strong> <PlusSquare size={14} style={{ verticalAlign: "middle" }} />.</span>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
