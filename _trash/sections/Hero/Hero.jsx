import data from '../../data/portfolio.json';
import KineticHeadline from './KineticHeadline';
import './Hero.css';

const { person } = data;

export default function Hero() {
  return (
    <div className="hero">
      {/* Status badge — exact Stitch DOM */}
      <div className="hero__status-badge">
        <span className="hero__status-ping">
          <span className="hero__ping-ring" />
          <span className="hero__ping-dot" />
        </span>
        <span className="hero__status-text">System Status: Neural Active</span>
      </div>

      {/* H1 — Kinetic name, second word gets gradient */}
      <KineticHeadline text={person.name} />

      {/* Description paragraph — keyword highlighted */}
      <p className="hero__description">
        Computer Science Engineer specializing in{' '}
        <span className="hero__highlight">Neural Architectures</span>, ML
        Optimization, and full-stack software development.
      </p>

      {/* CTA Button row — exact Stitch structure */}
      <div className="hero__actions">
        <a
          className="hero__cta hero__cta--primary"
          href={`mailto:${person.contact.email}`}
        >
          Execute Journey
          <span className="hero__cta-arrow">→</span>
        </a>
        <a
          className="hero__cta hero__cta--secondary"
          href={`https://github.com/${person.contact.github}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          View Matrix
        </a>
      </div>

      {/* Orbital background decoration — Stitch concentric circles */}
      <div className="hero__orbital" aria-hidden="true">
        <div className="hero__ring hero__ring--outer">
          <div className="hero__ring hero__ring--mid">
            <div className="hero__ring hero__ring--inner" />
          </div>
        </div>
      </div>
    </div>
  );
}
