import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    // If there is an intentional hash anchor on the page (e.g. #pricing, #faq), scroll to it
    if (hash) {
      const element = document.getElementById(hash.replace("#", ""));
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
        return;
      }
    }

    // 1. Reset window / document scroll position instantly
    try {
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    } catch {
      window.scrollTo(0, 0);
    }

    // 2. Reset internal scroll containers (exam containers, panels, modals)
    const resetContainers = () => {
      const scrollables = document.querySelectorAll(
        "[style*='overflow'], .overflow-y-auto, .overflow-auto, " +
        ".ielts-passage-panel, .ielts-questions-panel, " +
        ".mock-reading-passage, .mock-reading-questions, " +
        ".listening-panel, .exam-scroll-container, .gre-exam-container"
      );
      scrollables.forEach((el) => {
        el.scrollTop = 0;
      });
    };

    resetContainers();
    const t = setTimeout(resetContainers, 50);
    return () => clearTimeout(t);
  }, [pathname, hash]);

  return null;
}

