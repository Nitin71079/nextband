import { useEffect, useRef } from "react";
import { useLocation, useNavigationType } from "react-router-dom";

// Global in-memory cache of route scroll positions
const scrollPositions = new Map();

export default function ScrollToTop() {
  const location = useLocation();
  const navType = useNavigationType(); // 'POP' (back/forward), 'PUSH', or 'REPLACE'
  const prevPathRef = useRef(location.pathname);

  // Continuously record scroll position of the active page
  useEffect(() => {
    const handleScroll = () => {
      if (location.pathname) {
        scrollPositions.set(location.pathname, window.scrollY || document.documentElement.scrollTop || 0);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [location.pathname]);

  // Handle scroll behavior on route change
  useEffect(() => {
    const currentPath = location.pathname;
    const savedPos = scrollPositions.get(currentPath);

    // Save position of previous path before switching
    if (prevPathRef.current && prevPathRef.current !== currentPath) {
      const currentY = window.scrollY || document.documentElement.scrollTop || 0;
      scrollPositions.set(prevPathRef.current, currentY);
    }
    prevPathRef.current = currentPath;

    // Disable browser's automatic default scroll restoration to avoid jump-to-bottom bugs
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    const restoreOrReset = () => {
      // If returning to a page with a saved scroll position (e.g. Back/Forward or back to Dashboard)
      if (savedPos !== undefined && (navType === "POP" || currentPath === "/dashboard")) {
        window.scrollTo({ top: savedPos, left: 0, behavior: "instant" });
        document.documentElement.scrollTop = savedPos;
        document.body.scrollTop = savedPos;
      } else {
        // Fresh navigation: reset smoothly to top
        window.scrollTo({ top: 0, left: 0, behavior: "instant" });
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;

        // Reset scrollable containers if any
        const scrollables = document.querySelectorAll(
          "[style*='overflow'], .overflow-y-auto, .overflow-auto, " +
          ".ielts-passage-panel, .ielts-questions-panel, " +
          ".mock-reading-passage, .mock-reading-questions, " +
          ".listening-panel, .exam-scroll-container"
        );
        scrollables.forEach((el) => {
          el.scrollTop = 0;
        });
      }
    };

    restoreOrReset();
    const t = setTimeout(restoreOrReset, 40);
    return () => clearTimeout(t);
  }, [location.pathname, navType]);

  return null;
}
