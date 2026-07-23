"use client";

import { useEffect, useRef, RefObject } from "react";

interface UseScrollRevealOptions {
  threshold?: number;
  rootMargin?: string;
  animation?: string;
  stagger?: boolean;
}

export function useScrollReveal<T extends HTMLElement = HTMLDivElement>(
  options: UseScrollRevealOptions = {}
): RefObject<T> {
  const {
    threshold = 0.1,
    rootMargin = "0px 0px -50px 0px",
    animation = "animate-fade-in-up",
    stagger = true,
  } = options;

  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const target = entry.target as HTMLElement;
            target.classList.remove("scroll-hidden");
            target.classList.add(animation);

            if (stagger) {
              const children = target.querySelectorAll("[data-scroll-child]");
              children.forEach((child, i) => {
                const childEl = child as HTMLElement;
                childEl.style.animationDelay = `${(i + 1) * 100}ms`;
                childEl.classList.remove("scroll-hidden");
                childEl.classList.add(animation);
              });
            }

            observer.unobserve(target);
          }
        });
      },
      { threshold, rootMargin }
    );

    observer.observe(el);

    return () => observer.disconnect();
  }, [threshold, rootMargin, animation, stagger]);

  return ref;
}
