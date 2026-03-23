import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import './KineticHeadline.css';

export default function KineticHeadline({ text }) {
  const containerRef = useRef(null);

  // Stitch splits at first space: "TIRTHARAJ" on line 1, "DUTTA ROY" on line 2 with gradient
  const firstSpace = text.indexOf(' ');
  const firstName = firstSpace > -1 ? text.slice(0, firstSpace) : text;
  const surname = firstSpace > -1 ? text.slice(firstSpace + 1) : '';

  const buildChars = (str) =>
    str.split('').map((char, i) => ({
      char: char === ' ' ? '\u00A0' : char,
      key: `${char}-${i}`,
      isSpace: char === ' ',
    }));

  const firstChars = buildChars(firstName);
  const surnameChars = buildChars(surname);

  useEffect(() => {
    const spans = containerRef.current.querySelectorAll('.kinetic-char');
    if (!spans.length) return;

    gsap.fromTo(
      spans,
      {
        y: 80,
        opacity: 0,
        rotateX: -90,
        scale: 0.6,
      },
      {
        y: 0,
        opacity: 1,
        rotateX: 0,
        scale: 1,
        duration: 1.2,
        stagger: 0.05,
        ease: 'elastic.out(1, 0.5)',
        delay: 0.3,
      }
    );
  }, [text]);

  return (
    <h1
      className="kinetic-headline"
      ref={containerRef}
      aria-label={text}
    >
      {/* First name — plain on-surface colour */}
      {firstChars.map(({ char, key, isSpace }) => (
        <span
          key={key}
          className={`kinetic-char${isSpace ? ' kinetic-char--space' : ''}`}
          aria-hidden="true"
        >
          {char}
        </span>
      ))}

      {/* Line break — Stitch uses <br/> between name parts */}
      {surname && <br />}

      {/* Surname — gradient text (Stitch primary→secondary→primary) */}
      {surname && (
        <span className="kinetic-headline__gradient">
          {surnameChars.map(({ char, key, isSpace }) => (
            <span
              key={`s-${key}`}
              className={`kinetic-char${isSpace ? ' kinetic-char--space' : ''}`}
              aria-hidden="true"
            >
              {char}
            </span>
          ))}
        </span>
      )}
    </h1>
  );
}
