import React, { useRef, useEffect } from 'react';

export default function About() {
  const visualRef = useRef(null);

  useEffect(() => {
    const el = visualRef.current;
    if (!el) return;

    const handleMouseMove = (e) => {
      if (window.matchMedia("(hover: none)").matches) return;
      const rect = el.getBoundingClientRect();
      
      // Calculate normalized position -1 to 1
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = ((e.clientY - rect.top) / rect.height) * 2 - 1;
      
      // Dampening effect
      el.style.setProperty('--mx', x * 0.5);
      el.style.setProperty('--my', y * 0.5);
    };

    const handleMouseLeave = () => {
      if (window.matchMedia("(hover: none)").matches) return;
      el.style.setProperty('--mx', 0);
      el.style.setProperty('--my', 0);
    };

    // Set initial values
    el.style.setProperty('--mx', 0);
    el.style.setProperty('--my', 0);

    el.addEventListener('mousemove', handleMouseMove);
    el.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      el.removeEventListener('mousemove', handleMouseMove);
      el.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  // Generate node positions for the data network
  const nodes = Array.from({ length: 15 }).map((_, i) => {
    return {
      id: i,
      x: 10 + Math.random() * 80, // percentage
      y: 10 + Math.random() * 80, // percentage
      r: 1.5 + Math.random() * 2 // radius
    };
  });

  return (
    <section className="py-32 px-8 md:px-24 bg-surface" id="about">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
        
        {/* Left Column: Operator Identity */}
        <div className="reveal-up">
          <div className="flex items-center gap-4 mb-8">
            <span className="font-label text-xs font-bold uppercase tracking-[0.3em] text-outline">Section 01.5</span>
            <div className="h-px w-16 bg-gradient-to-r from-primary-container to-transparent"></div>
          </div>
          
          <h3 className="font-headline text-5xl md:text-6xl italic text-on-surface mb-8">
            Operator <span className="text-primary-container">Identity.</span>
          </h3>
          
          <div className="font-body text-lg text-outline/80 leading-relaxed mb-10 space-y-6">
            <p>
              I am a software architect and data engineer specializing in high-performance computational systems. My expertise bridges the gap between low-level memory management and high-level predictive modeling.
            </p>
            <p>
              Leveraging <span className="text-primary font-bold">C++</span> for core engine optimization, <span className="text-primary font-bold">Python</span> for algorithmic orchestration, and <span className="text-primary font-bold">Scikit-learn</span> for machine learning pipelines, I build resilient architectures resilient enough to handle complex enterprise loads.
            </p>
          </div>

          {/* Milestone Badges */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="magnetic-btn flex items-center gap-4 py-4 px-6 border border-outline-variant/15 bg-surface-container-lowest hover:bg-surface-container hover:border-primary-container/30 transition-colors group">
              <span className="material-symbols-outlined text-primary text-2xl group-hover:-translate-y-1 transition-transform">emoji_events</span>
              <div>
                <p className="font-body font-bold text-on-surface text-sm uppercase tracking-wider">Binary Blitz</p>
                <p className="font-label text-[10px] text-outline tracking-[0.2em] uppercase mt-1">Finalist</p>
              </div>
            </div>

            <div className="magnetic-btn flex items-center gap-4 py-4 px-6 border border-outline-variant/15 bg-surface-container-lowest hover:bg-surface-container hover:border-primary-container/30 transition-colors group">
              <span className="material-symbols-outlined text-primary text-2xl group-hover:-translate-y-1 transition-transform">psychology</span>
              <div>
                <p className="font-body font-bold text-on-surface text-sm uppercase tracking-wider">SIH 2024</p>
                <p className="font-label text-[10px] text-outline tracking-[0.2em] uppercase mt-1">Qualifier</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Kinetic Visual */}
        <div className="reveal-up delay-200">
          <div 
            ref={visualRef}
            className="group relative w-full aspect-square md:aspect-[4/3] bg-[#060a14] rounded-sm overflow-hidden border border-outline-variant/20 flex items-center justify-center transition-all duration-700 ease-out"
            style={{
              boxShadow: 'inset 0 0 60px rgba(0,229,255,0.03)',
            }}
          >
            {/* Ambient background glow */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(0,229,255,0.08),_transparent_60%)] opacity-50"></div>
            
            {/* Base grid */}
            <svg className="absolute inset-0 w-full h-full opacity-20 pointer-events-none" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="network-grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="0.5"/>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#network-grid)" />
            </svg>

            {/* Interactive Kinetic SVG Canvas */}
            <svg 
              className="relative w-[90%] h-[90%] z-10 transition-transform duration-200 ease-out lg:group-hover:scale-105"
              viewBox="0 0 100 100" 
              preserveAspectRatio="xMidYMid meet"
              style={{
                // Transform uses math based on CSS vars updated by MouseMove.
                // Mobile media query graceful degradation is handled by App.css defaults, 
                // but we encode safety bounds via calc() 
                transform: 'rotateX(calc(var(--my) * -20deg)) rotateY(calc(var(--mx) * 20deg)) translateZ(20px)',
                transformStyle: 'preserve-3d'
              }}
            >
              {/* Connectors (Edges) */}
              {nodes.map((node, i) => {
                // Connect to next 2 nodes to form a mesh
                const connections = [];
                if (i + 1 < nodes.length) connections.push(nodes[i + 1]);
                if (i + 3 < nodes.length) connections.push(nodes[i + 3]);
                
                return connections.map(target => (
                  <line 
                    key={`line-${i}-${target.id}`}
                    x1={node.x} y1={node.y} 
                    x2={target.x} y2={target.y}
                    stroke="rgba(0,229,255,0.15)" strokeWidth="0.2"
                  >
                    {/* Add slow stroke-dasharray animation for data flowing effect */}
                    <animate attributeName="stroke-opacity" values="0.1;0.4;0.1" dur={`${3 + Math.random()*2}s`} repeatCount="indefinite" />
                  </line>
                ));
              })}

              {/* Nodes (Vertices) */}
              {nodes.map((node, i) => (
                <g key={`node-${i}`} style={{ transform: `translateZ(${Math.random() * 10}px)` }}>
                  <circle cx={node.x} cy={node.y} r={node.r} fill="#00e5ff" className="opacity-80">
                    <animate attributeName="r" values={`${node.r};${node.r + 0.5};${node.r}`} dur={`${2 + Math.random()*2}s`} repeatCount="indefinite" />
                  </circle>
                  <circle cx={node.x} cy={node.y} r={node.r + 3} fill="none" stroke="#00e5ff" strokeWidth="0.2" className="opacity-30">
                    <animate attributeName="r" values={`${node.r + 2};${node.r + 6};${node.r + 2}`} dur={`${1.5 + Math.random()*3}s`} repeatCount="indefinite" />
                    <animate attributeName="opacity" values="0.5;0;0.5" dur={`${1.5 + Math.random()*3}s`} repeatCount="indefinite" />
                  </circle>
                </g>
              ))}

              {/* Core central intelligence node */}
              <g style={{ transform: 'translateZ(15px)' }}>
                <circle cx="50" cy="50" r="8" fill="rgba(0,229,255,0.1)" stroke="#00e5ff" strokeWidth="0.5" />
                <circle cx="50" cy="50" r="2" fill="#00e5ff" />
                <path d="M50 42 A 8 8 0 0 1 58 50" fill="none" stroke="#00e5ff" strokeWidth="1">
                  <animateTransform attributeName="transform" type="rotate" from="0 50 50" to="360 50 50" dur="4s" repeatCount="indefinite"/>
                </path>
                <path d="M50 58 A 8 8 0 0 1 42 50" fill="none" stroke="#00e5ff" strokeWidth="1">
                  <animateTransform attributeName="transform" type="rotate" from="0 50 50" to="-360 50 50" dur="4s" repeatCount="indefinite"/>
                </path>
                <text x="50" y="65" fill="#00e5ff" fontSize="3" fontFamily="monospace" textAnchor="middle" className="uppercase tracking-widest opacity-60">
                  <animate attributeName="opacity" values="0.3;0.8;0.3" dur="2s" repeatCount="indefinite" />
                  Neural_Link_Active
                </text>
              </g>

            </svg>
            
            {/* Interactive boundary marker */}
            <div className="absolute top-4 left-4 font-label text-[8px] tracking-[0.3em] uppercase text-outline/40">Kinetic Matrix</div>
            <div className="absolute bottom-4 right-4 flex items-center gap-2">
               <div className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse"></div>
               <div className="font-label text-[8px] tracking-[0.3em] uppercase text-outline/50">Sys: Normal</div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
