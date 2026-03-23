import { useEffect, useRef, useState } from 'react';
import './CustomCursor.css';

export default function CustomCursor() {
  const cursorDot = useRef(null);
  const cursorRing = useRef(null);
  const requestRef = useRef();
  
  // Store exact mouse pos
  const mouse = useRef({ x: 0, y: 0 });
  // Store delayed pos for ring
  const ringPos = useRef({ x: 0, y: 0 });
  
  const [isHovering, setIsHovering] = useState(false);
  const [isHidden, setIsHidden] = useState(false);

  useEffect(() => {
    const onMouseMove = (e) => {
      mouse.current = { x: e.clientX, y: e.clientY };
      setIsHidden(false);

      if (cursorDot.current) {
        cursorDot.current.style.transform = `translate3d(${mouse.current.x}px, ${mouse.current.y}px, 0)`;
      }
    };

    const animateRing = () => {
      // Linear interpolation for smooth trailing effect
      ringPos.current.x += (mouse.current.x - ringPos.current.x) * 0.15;
      ringPos.current.y += (mouse.current.y - ringPos.current.y) * 0.15;

      if (cursorRing.current) {
        cursorRing.current.style.transform = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0)`;
      }
      requestRef.current = requestAnimationFrame(animateRing);
    };

    const onMouseLeave = () => setIsHidden(true);
    const onMouseEnter = () => setIsHidden(false);

    // Add listeners for hover states on interactive elements
    const handleInteractables = () => {
      const interactables = document.querySelectorAll('a, button, .project-card, .skill-card');
      
      const setHover = () => setIsHovering(true);
      const removeHover = () => setIsHovering(false);

      interactables.forEach(el => {
        el.addEventListener('mouseenter', setHover);
        el.addEventListener('mouseleave', removeHover);
      });

      return () => {
        interactables.forEach(el => {
          el.removeEventListener('mouseenter', setHover);
          el.removeEventListener('mouseleave', removeHover);
        });
      };
    };

    let cleanupHover = handleInteractables();

    // Re-bind when DOM changes (simple mutation observer)
    const observer = new MutationObserver(() => {
      if (cleanupHover) cleanupHover();
      cleanupHover = handleInteractables();
    });
    observer.observe(document.body, { childList: true, subtree: true });

    window.addEventListener('mousemove', onMouseMove);
    document.body.addEventListener('mouseleave', onMouseLeave);
    document.body.addEventListener('mouseenter', onMouseEnter);
    
    requestRef.current = requestAnimationFrame(animateRing);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.body.removeEventListener('mouseleave', onMouseLeave);
      document.body.removeEventListener('mouseenter', onMouseEnter);
      if (cleanupHover) cleanupHover();
      observer.disconnect();
      cancelAnimationFrame(requestRef.current);
    };
  }, []);

  // Hide entirely on touch devices
  if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) {
    return null;
  }

  return (
    <div className={`cursor-wrapper ${isHidden ? 'is-hidden' : ''} ${isHovering ? 'is-hovering' : ''}`}>
      <div ref={cursorRing} className="cursor-ring" />
      <div ref={cursorDot} className="cursor-dot" />
    </div>
  );
}
