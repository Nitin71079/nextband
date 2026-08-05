import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { trackUserTelemetry } from "../services/telemetryService";

export function useTelemetryTracker() {
  const location = useLocation();
  const { user, name } = useAuth();
  
  const currentPathRef = useRef(location.pathname);
  const activeSecondsRef = useRef(0);
  const timerRef = useRef(null);
  const flushIntervalRef = useRef(null);

  const getUserId = () => {
    if (user?.uid) return user.uid;
    
    // Fallback persistent guest session ID
    let guestId = localStorage.getItem("knarrow_guest_uid");
    if (!guestId) {
      guestId = "guest_" + Math.random().toString(36).substring(2, 10);
      localStorage.setItem("knarrow_guest_uid", guestId);
    }
    return guestId;
  };

  const getEmail = () => user?.email || "Guest User";
  const getDisplayName = () => name || user?.displayName || user?.email?.split("@")[0] || "Guest Candidate";

  // Flush accumulated seconds and visits to Firestore
  const flushTelemetry = (seconds, visits = 0) => {
    if (seconds <= 0 && visits <= 0) return;

    trackUserTelemetry({
      userId: getUserId(),
      email: getEmail(),
      displayName: getDisplayName(),
      path: currentPathRef.current,
      secondsToAdd: seconds,
      visitsToAdd: visits,
    });
  };

  // Track active page time (only when tab is visible)
  useEffect(() => {
    timerRef.current = setInterval(() => {
      if (document.visibilityState === "visible") {
        activeSecondsRef.current += 1;
      }
    }, 1000);

    // Flush every 15 seconds so data is continuously updated in real-time
    flushIntervalRef.current = setInterval(() => {
      if (activeSecondsRef.current > 0) {
        const secsToFlush = activeSecondsRef.current;
        activeSecondsRef.current = 0;
        flushTelemetry(secsToFlush, 0);
      }
    }, 15000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (flushIntervalRef.current) clearInterval(flushIntervalRef.current);
    };
  }, []);

  // Track route change
  useEffect(() => {
    // Flush previous path duration & record new path visit
    if (activeSecondsRef.current > 0) {
      flushTelemetry(activeSecondsRef.current, 0);
      activeSecondsRef.current = 0;
    }

    currentPathRef.current = location.pathname;
    
    // Log initial page visit
    flushTelemetry(0, 1);

  }, [location.pathname, user?.uid]);

  // Flush on tab unload
  useEffect(() => {
    const handleUnload = () => {
      if (activeSecondsRef.current > 0) {
        flushTelemetry(activeSecondsRef.current, 0);
        activeSecondsRef.current = 0;
      }
    };

    window.addEventListener("beforeunload", handleUnload);
    return () => window.removeEventListener("beforeunload", handleUnload);
  }, []);
}
