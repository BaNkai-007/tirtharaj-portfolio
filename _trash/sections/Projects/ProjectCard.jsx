import { useRef, useCallback } from 'react';
import './ProjectCard.css';

const LABELS = {
  dropout_predictor: 'SYSTEM ARCHITECTURE 01',
  pdf_converter: 'UTILITY SYSTEM 02',
  poem_generator: 'NLP PROTOCOL 03'
};

const MLArchitectureCanvas = () => (
  <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
    <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
      <path d="M 10 0 L 0 0 0 10" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" />
    </pattern>
    <rect width="100" height="100" fill="url(#grid)" />
    
    <circle cx="20" cy="80" r="1.5" fill="#00e5ff" className="transition-transform duration-100 ease-out" style={{ transform: 'translate(calc(var(--mx) * -4px), calc(var(--my) * -4px))' }} />
    <circle cx="50" cy="50" r="2" fill="#00e5ff" className="transition-transform duration-100 ease-out" style={{ transform: 'translate(calc(var(--mx) * 5px), calc(var(--my) * 5px))' }} />
    <circle cx="80" cy="20" r="1.5" fill="#00e5ff" className="transition-transform duration-100 ease-out" style={{ transform: 'translate(calc(var(--mx) * -2px), calc(var(--my) * -2px))' }} />

    <path 
      d="M0,100 C20,90 40,80 50,50 C60,20 80,10 100,0" 
      fill="none" 
      stroke="#00e5ff" 
      strokeWidth="0.5"
      className="transition-transform duration-100 ease-out opacity-80"
      style={{
        transform: 'scaleY(calc(1 + var(--my) * 0.15)) translateY(calc(var(--mx) * 4px))',
        transformOrigin: 'bottom center'
      }}
    />
  </svg>
);

const UtilitySystemCanvas = () => (
  <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
    <g className="transition-transform duration-100 ease-out" style={{ transform: 'translate(calc(var(--mx) * 6px), calc(var(--my) * 6px)) rotate(calc(var(--mx) * 5deg))', transformOrigin: 'center' }}>
      <rect x="35" y="35" width="20" height="25" rx="1" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="0.5" className="opacity-40" />
      <rect x="40" y="40" width="20" height="25" rx="1" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="0.5" className="opacity-60" />
      <rect x="45" y="45" width="20" height="25" rx="1" fill="none" stroke="#00e5ff" strokeWidth="1" className="opacity-100" />
      <text x="50" y="58" fill="#00e5ff" fontSize="5" fontFamily="monospace" fontWeight="bold">PDF</text>
    </g>
    <line x1="0" y1="80" x2="100" y2="80" stroke="rgba(255,255,255,0.1)" strokeWidth="0.5" />
    <line x1="0" y1="85" x2="100" y2="85" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" />
  </svg>
);

const NLPProtocolCanvas = () => (
  <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
    <g className="transition-transform duration-100 ease-out" style={{ transform: 'translate(calc(var(--mx) * -5px), calc(var(--my) * -5px))' }}>
      <circle cx="25" cy="45" r="1" fill="#00e5ff" />
      <circle cx="75" cy="35" r="1.5" fill="#00e5ff" />
      <circle cx="50" cy="75" r="1" fill="#00e5ff" />
      <circle cx="60" cy="20" r="0.8" fill="rgba(255,255,255,0.5)" />
      
      <line x1="25" y1="45" x2="75" y2="35" stroke="#00e5ff" strokeWidth="0.2" strokeDasharray="1,1.5" className="opacity-50" />
      <line x1="25" y1="45" x2="50" y2="75" stroke="#00e5ff" strokeWidth="0.2" className="opacity-30" />
      <line x1="75" y1="35" x2="50" y2="75" stroke="#00e5ff" strokeWidth="0.3" className="opacity-60" />
      <line x1="75" y1="35" x2="60" y2="20" stroke="rgba(255,255,255,0.3)" strokeWidth="0.2" />
      
      <text x="15" y="42" fill="rgba(255,255,255,0.6)" fontSize="3.5" fontFamily="monospace">AFFECT_IN</text>
      <text x="80" y="33" fill="rgba(255,255,255,0.8)" fontSize="3.5" fontFamily="monospace">SEMANTICS</text>
      <text x="53" y="80" fill="#00e5ff" fontSize="4.5" fontFamily="monospace">GEN_OUT</text>
    </g>
  </svg>
);

export default function ProjectCard({ project }) {
  const { title, category, variant, stack, impact, link } = project;
  const cardRef = useRef(null);

  const variantAccent = {
    ml: '#c69aff',
    generative: '#c69aff',
    utility: '#d390f7',
  };

  const accent = variantAccent[variant] || variantAccent.ml;

  const handleMouseMove = useCallback((e) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const MAX_ROTATION = 10;

    let normX = (e.clientX - (rect.left + rect.width / 2)) / (rect.width / 2);
    let normY = (e.clientY - (rect.top + rect.height / 2)) / (rect.height / 2);
    
    // Clamp to strictly between -1 and 1
    normX = Math.max(-1, Math.min(1, normX));
    normY = Math.max(-1, Math.min(1, normY));
    
    card.style.setProperty('--mx', normX.toFixed(3));
    card.style.setProperty('--my', normY.toFixed(3));
    
    card.style.transition = 'transform 0.1s ease-out';
    card.style.transform = `rotateX(${-normY * MAX_ROTATION}deg) rotateY(${normX * MAX_ROTATION}deg) translateY(0)`;
  }, []);

  const handleMouseLeave = useCallback(() => {
    const card = cardRef.current;
    if (!card) return;
    card.style.setProperty('--mx', 0);
    card.style.setProperty('--my', 0);
    card.style.transition = '';
    card.style.transform = '';
  }, []);

  return (
    <article
      className={`stitch-card stitch-card--${variant} group`}
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Gradient overlay */}
      <div className="stitch-card__gradient" />

      {/* Dynamic Visual Canvas */}
      <div className="card__visual-canvas">
        {project.id === 'dropout_predictor' && <MLArchitectureCanvas />}
        {project.id === 'pdf_converter' && <UtilitySystemCanvas />}
        {project.id === 'poem_generator' && <NLPProtocolCanvas />}
      </div>

      {/* Bottom-anchored text block */}
      <div className="stitch-card__info">
        <div className="stitch-card__badges">
          <span
            className="stitch-card__badge"
            style={{
              background: `${accent}33`,
              color: accent,
              borderColor: `${accent}4D`,
            }}
          >
            {LABELS[project.id] || category}
          </span>
        </div>
        <h3 className="stitch-card__title">{title}</h3>
        <p className="stitch-card__subtitle">
          {impact.split('.')[0]}
        </p>
      </div>

      {/* Deep-dive reveal overlay */}
      <div
        className="stitch-card__reveal"
        style={{
          background: `${accent}0D`,
          borderColor: `${accent}33`,
        }}
      >
        <div className="stitch-card__reveal-body">
          <h4
            className="stitch-card__reveal-heading"
            style={{ color: accent }}
          >
            Technical Deep Dive
          </h4>
          <div className="stitch-card__reveal-stack">
            <div>
              <p className="stitch-card__meta-label">Stack</p>
              <p className="stitch-card__meta-value stitch-card__meta-value--bold">
                {stack.join(', ')}
              </p>
            </div>
            <div>
              <p className="stitch-card__meta-label">Impact Metric</p>
              <p className="stitch-card__meta-value">{impact}</p>
            </div>
          </div>
        </div>
        {link && (
          <a
            className="stitch-card__cta"
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: accent }}
          >
            Analyze Source
            <span className="stitch-card__cta-icon">↗</span>
          </a>
        )}
      </div>
    </article>
  );
}
