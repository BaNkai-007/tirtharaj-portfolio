import { useEffect, useRef } from 'react';

/**
 * useScrollReveal — adds `.is-visible` to every child matching `selector`
 * when it enters the viewport.
 *
 * @param {string} selector - CSS selector for elements to reveal
 * @param {{ threshold?: number, rootMargin?: string }} options
 */
export function useScrollReveal(selector = '.reveal-on-scroll', options = {}) {
  const observerRef = useRef(null);

  useEffect(() => {
    const { threshold = 0.15, rootMargin = '0px 0px -40px 0px' } = options;

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            // Once revealed, stop watching
            observerRef.current.unobserve(entry.target);
          }
        });
      },
      { threshold, rootMargin }
    );

    const elements = document.querySelectorAll(selector);
    elements.forEach((el) => observerRef.current.observe(el));

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [selector]);
}

/**
 * useScrollSpy — tracks which section is currently in view and returns its ID.
 *
 * @param {string[]} sectionIds - array of section IDs (without #)
 * @param {React.Dispatch<React.SetStateAction<string>>} setActiveId - state setter
 */
export function useScrollSpy(sectionIds, setActiveId) {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        // Lower thresholds to catch smaller sections, bias trigger line above middle
        threshold: [0.1, 0.5, 0.9],
        rootMargin: '-10% 0px -40% 0px',
      }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    // Fallback: handle absolute top and absolute bottom of page
    const handleScroll = () => {
      if (window.scrollY === 0 && sectionIds.length > 0) {
        setActiveId(sectionIds[0]);
      } else if (
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 10 &&
        sectionIds.length > 0
      ) {
        setActiveId(sectionIds[sectionIds.length - 1]);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
    };
  }, [sectionIds, setActiveId]);
}
