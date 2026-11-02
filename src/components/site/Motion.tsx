"use client";

import { useEffect } from "react";

/** Adds the .js flag and reveals [data-reveal] elements once as they enter. Content stays visible without script. */
export function Motion() {
  useEffect(() => {
    const root = document.documentElement;
    root.classList.add("js");
    if (!("IntersectionObserver" in window)) {
      document.querySelectorAll("[data-reveal]").forEach((el) => el.classList.add("is-in"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add("is-in");
            io.unobserve(e.target);
          }
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.05 },
    );
    const watch = () => document.querySelectorAll("[data-reveal]:not(.is-in)").forEach((el) => io.observe(el));
    watch();
    const mo = new MutationObserver(watch);
    mo.observe(document.body, { childList: true, subtree: true });
    // A jump (anchor link, fast scroll, find-in-page) can skip observer callbacks:
    // anything already above the bottom of the screen is shown.
    let frame = 0;
    const sweep = () => {
      frame = 0;
      const limit = window.innerHeight * 0.95;
      document.querySelectorAll("[data-reveal]:not(.is-in)").forEach((el) => {
        if (el.getBoundingClientRect().top < limit) el.classList.add("is-in");
      });
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(sweep);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    sweep();
    return () => {
      io.disconnect();
      mo.disconnect();
      window.removeEventListener("scroll", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);
  return null;
}
