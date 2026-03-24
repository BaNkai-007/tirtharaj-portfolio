import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

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
    let ctx;
    
    // We use a small timeout to allow React to render the DOM first
    const timer = setTimeout(() => {
      ctx = gsap.context(() => {
        
        // 1. Reveal Up Animation (Fade In & Slide Up)
        const revealUps = gsap.utils.toArray('.reveal-up');
        revealUps.forEach(el => {
          // Parse manual delay classes
          const delayClass = Array.from(el.classList).find(c => c.startsWith('delay-'));
          const delayStr = delayClass ? delayClass.split('-')[1] : '0';
          const delay = parseInt(delayStr, 10) / 1000 || 0;

          // Set initial hidden state so there's no layout flashing
          gsap.set(el, { y: 40, opacity: 0 });

          gsap.to(el, {
            y: 0,
            opacity: 1,
            duration: 0.8,
            delay: delay,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 85%', // Animate when top of element reaches 85% from top of viewport
              toggleActions: 'play none none none',
            }
          });
        });

        // 2. Reveal In Animation (Fade In Only)
        const revealIns = gsap.utils.toArray('.reveal-in');
        revealIns.forEach(el => {
          const delayClass = Array.from(el.classList).find(c => c.startsWith('delay-'));
          const delayStr = delayClass ? delayClass.split('-')[1] : '0';
          const delay = parseInt(delayStr, 10) / 1000 || 0;

          gsap.set(el, { opacity: 0 });

          gsap.to(el, {
            opacity: 1,
            duration: 1,
            delay: delay,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 85%',
              toggleActions: 'play none none none',
            }
          });
        });

      });
    }, 100);

    return () => {
      clearTimeout(timer);
      if (ctx) ctx.revert();
    };
  }, []);
}
