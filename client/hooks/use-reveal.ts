import { useEffect } from "react";

export function useReveal() {
  useEffect(() => {
    let io: IntersectionObserver | null = null;
    let mutationObserver: MutationObserver | null = null;

    const setupObserver = () => {
      if (!("IntersectionObserver" in window)) {
        // Fallback for browsers without IntersectionObserver
        const els = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
        els.forEach((el) => el.classList.add("reveal-in"));
        return;
      }

      // Professional IntersectionObserver configuration
      io = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              // Add reveal-in class to trigger animation
              entry.target.classList.add("reveal-in");
              // Stop observing once revealed for performance
              io?.unobserve(entry.target);
            }
          });
        },
        {
          // Trigger animation when element enters viewport
          rootMargin: "0px 0px -10% 0px",
          threshold: 0.05,
        }
      );

      // Observe all current elements with data-reveal
      const els = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
      els.forEach((el) => {
        if (!el.classList.contains("reveal-in")) {
          io?.observe(el);
        }
      });
    };

    // Setup observer immediately
    setupObserver();

    // Watch for dynamically added elements
    mutationObserver = new MutationObserver(() => {
      const els = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
      els.forEach((el) => {
        if (!el.classList.contains("reveal-in") && io) {
          io.observe(el);
        }
      });
    });

    mutationObserver.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: false,
      characterData: false,
    });

    return () => {
      io?.disconnect();
      mutationObserver?.disconnect();
    };
  }, []);
}
