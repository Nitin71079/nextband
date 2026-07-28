import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Force scroll to top on every route change.
    // We set scrollTop directly AND call window.scrollTo to cover
    // all browsers and both window-based and element-based scroll containers.
    try {
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    } catch {
      // Fallback for older browsers
      window.scrollTo(0, 0);
    }
  }, [pathname]);

  return null;
}
