import { useEffect } from 'react';

/**
 * useGlobalTilt — Native 3D spatial tilt effect (no external libs).
 * Attaches to all elements matching the selector.
 */
export function useGlobalTilt(selector = '.tilt-card', options = {}) {
  useEffect(() => {
    const { maxTilt = 10, scale = 1.02 } = options;
    const elements = document.querySelectorAll(selector);

    const handleMouseMove = (e) => {
      if (window.matchMedia("(hover: none)").matches) return;

      const el = e.currentTarget;
      const rect = el.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      let percentX = (e.clientX - centerX) / (rect.width / 2);
      let percentY = (e.clientY - centerY) / (rect.height / 2);
      
      percentX = Math.max(-1, Math.min(1, percentX));
      percentY = Math.max(-1, Math.min(1, percentY));

      const rotateX = percentY * -maxTilt;
      const rotateY = percentX * maxTilt;

      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;

      el.style.setProperty('--mouse-x', `${mouseX}px`);
      el.style.setProperty('--mouse-y', `${mouseY}px`);
      
      el.style.transition = 'transform 0.1s ease-out';
      el.style.transform = `perspective(1000px) scale(${scale}) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    };

    const handleMouseLeave = (e) => {
      const el = e.currentTarget;
      el.style.transition = '';
      el.style.transform = `perspective(1000px) scale(1) rotateX(0deg) rotateY(0deg)`;
      el.style.setProperty('--mouse-x', `-1000px`); // hide glare
      el.style.setProperty('--mouse-y', `-1000px`);
    };

    elements.forEach(el => {
      el.addEventListener('mousemove', handleMouseMove);
      el.addEventListener('mouseleave', handleMouseLeave);
    });

    return () => {
      elements.forEach(el => {
        el.removeEventListener('mousemove', handleMouseMove);
        el.removeEventListener('mouseleave', handleMouseLeave);
        el.style.transform = '';
      });
    };
  }, [selector, options]);
}

/**
 * useGlobalMagnetic — Pulls elements slightly towards the cursor.
 */
export function useGlobalMagnetic(selector = '.magnetic-btn', strength = 20) {
  useEffect(() => {
    const elements = document.querySelectorAll(selector);

    const handleMouseMove = (e) => {
      if (window.matchMedia("(hover: none)").matches) return;

      const el = e.currentTarget;
      const rect = el.getBoundingClientRect();
      const hX = rect.left + rect.width / 2;
      const hY = rect.top + rect.height / 2;
      
      const dx = e.clientX - hX;
      const dy = e.clientY - hY;
      
      const dampening = 3;
      const maxRadius = 10;

      const rawTx = (dx / rect.width) * strength;
      const rawTy = (dy / rect.height) * strength;
      
      const tx = Math.max(-maxRadius, Math.min(maxRadius, rawTx / dampening));
      const ty = Math.max(-maxRadius, Math.min(maxRadius, rawTy / dampening));
      
      el.style.transition = 'transform 0.1s ease-out';
      el.style.transform = `translate(${tx}px, ${ty}px)`;
    };

    const handleMouseLeave = (e) => {
      const el = e.currentTarget;
      el.style.transition = '';
      el.style.transform = 'translate(0px, 0px)';
    };

    elements.forEach(el => {
      el.addEventListener('mousemove', handleMouseMove);
      el.addEventListener('mouseleave', handleMouseLeave);
    });

    return () => {
      elements.forEach(el => {
        el.removeEventListener('mousemove', handleMouseMove);
        el.removeEventListener('mouseleave', handleMouseLeave);
        el.style.transform = '';
      });
    };
  }, [selector, strength]);
}

/**
 * useScrollReveal — IntersectionObserver based scroll animations.
 * Finds all elements with .reveal-up or .reveal-in and adds .reveal-active when in view.
 */
export function useScrollReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('reveal-active');
          // Animate once per page load to keep it clean
          observer.unobserve(entry.target);
        }
      });
    }, {
      rootMargin: '0px 0px -100px 0px', // Trigger slightly before full view
      threshold: 0.1
    });

    // We use a small timeout to allow React to render the DOM first
    setTimeout(() => {
      const elements = document.querySelectorAll('.reveal-up, .reveal-in');
      elements.forEach(el => observer.observe(el));
    }, 100);

    return () => observer.disconnect();
  }, []);
}
