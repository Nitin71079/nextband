import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // 1. Reset the window / document scroll
    try {
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    } catch {
      window.scrollTo(0, 0);
    }

    // 2. Reset every overflow scroll container in the page.
    //    Some pages (e.g. exam panels, modals) use their own
    //    scrollable divs that window.scrollTo can't reach.
    const resetContainers = () => {
      const scrollables = document.querySelectorAll(
        "[style*='overflow'], .overflow-y-auto, .overflow-auto, " +
        ".ielts-passage-panel, .ielts-questions-panel, " +
        ".mock-reading-passage, .mock-reading-questions, " +
        ".listening-panel, .exam-scroll-container"
      );
      scrollables.forEach((el) => {
        el.scrollTop = 0;
      });
    };

    // Run immediately and also after a short tick so lazy-loaded
    // pages have had time to mount their containers.
    resetContainers();
    const t = setTimeout(resetContainers, 50);
    return () => clearTimeout(t);
  }, [pathname]);

  return null;
}
