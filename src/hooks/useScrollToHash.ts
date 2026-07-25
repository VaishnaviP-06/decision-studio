import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * Smoothly scrolls to the element whose id matches the current URL hash.
 * Works both when the hash changes while already on the page, and when
 * arriving on the page from another route with a hash already present.
 */
export function useScrollToHash() {
  const location = useLocation();

  useEffect(() => {
    if (!location.hash) return;

    const id = location.hash.slice(1);

    // Wait a tick so the target section has mounted/laid out before scrolling.
    const raf = requestAnimationFrame(() => {
      const el = document.getElementById(id);
      el?.scrollIntoView({ behavior: "smooth", block: "start" });
    });

    return () => cancelAnimationFrame(raf);
  }, [location.pathname, location.hash]);
}
