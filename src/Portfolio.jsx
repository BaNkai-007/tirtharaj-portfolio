import React, { useState, useEffect } from 'react';
import data from './data/portfolio.json';
import CustomCursor from './components/CustomCursor';
import { useGlobalTilt, useGlobalMagnetic, useScrollReveal } from './hooks/usePhysics';

const { person, projects, skills, achievements, training, certifications, education } = data;

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, {
      rootMargin: '-20% 0px -60% 0px'
    });

    ['hero', 'stack', 'work', 'achievements', 'contact', 'protocols', 'training', 'certifications', 'education', ...projects.map(p => `project-${p.id}`)].forEach(id => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  useGlobalTilt('.tilt-card', { maxTilt: 5, scale: 1.02 });
  useGlobalMagnetic('.magnetic-btn', 20);
  useScrollReveal();

  return (
    <>
      <CustomCursor />
      <div className="bg-surface text-on-surface min-h-screen">
        {/* TopAppBar — Premium Glassmorphic Nav */}
        <header className="fixed top-0 left-0 w-full z-50 py-4 px-6 pointer-events-none">
          <div className="max-w-6xl mx-auto pointer-events-auto">
            <div className="relative flex justify-center items-center h-14 px-6 rounded-full bg-[#0b1326]/70 backdrop-blur-xl border border-white/[0.06] shadow-[0_8px_32px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.05)]">
              {/* Subtle top-edge glow */}
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary-container/30 to-transparent rounded-full"></div>

              {/* Nav Links — scrolling row on mobile, centered on desktop */}
              <nav className="flex items-center gap-2 overflow-x-auto hide-scrollbar snap-x snap-mandatory">
                {[
                  { id: 'work', label: 'Work' },
                  { id: 'stack', label: 'Engine' },
                  { id: 'protocols', label: 'Skills' },
                  { id: 'training', label: 'Training' },
                  { id: 'education', label: 'Education' },
                  { id: 'contact', label: 'Contact' }
                ].map(({ id, label }) => {
                  const isActive = activeSection === id || (id === 'work' && (activeSection === 'hero' || activeSection.startsWith('project-')));
                  return (
                    <a
                      key={id}
                      className={`magnetic-btn relative px-4 py-2 rounded-full text-xs uppercase tracking-[0.15em] font-label transition-all duration-300 ${
                        isActive
                          ? 'text-primary-container bg-primary-container/10'
                          : 'text-outline/70 hover:text-on-surface hover:bg-white/[0.04]'
                      }`}
                      href={`#${id}`}
                    >
                      {label}
                      {isActive && (
                        <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-primary-container animate-pulse"></span>
                      )}
                    </a>
                  );
                })}
              </nav>
              {/* Nav edge fade gradients for mobile scrolling affordance */}
              <div className="absolute left-0 top-0 w-8 h-full bg-gradient-to-r from-[#0b1326] to-transparent rounded-l-full pointer-events-none md:hidden"></div>
              <div className="absolute right-0 top-0 w-8 h-full bg-gradient-to-l from-[#0b1326] to-transparent rounded-r-full pointer-events-none md:hidden"></div>
            </div>
          </div>
        </header>

        {/* SideNavBar Shared Component (Hidden on small screens) */}
        <aside className="hidden xl:flex fixed left-0 top-0 h-full w-72 flex-col pt-24 pb-8 bg-surface z-40 border-r border-outline-variant/15 overflow-hidden">
          {/* Subtle radial glow at top */}
          <div className="absolute top-0 left-0 w-full h-40 bg-[radial-gradient(ellipse_at_top_left,_rgba(0,229,255,0.06),_transparent_70%)] pointer-events-none"></div>

          <div className="relative px-8 mb-12">
            <div className="font-headline text-xl italic text-primary-container">Project Archive</div>
            <div className="h-px w-12 bg-gradient-to-r from-primary-container/50 to-transparent mt-3 mb-2"></div>
            <div className="font-label uppercase tracking-[0.3em] text-[9px] text-outline">Technical Case Studies</div>
          </div>

          <nav className="flex flex-col flex-1 relative">
            {projects.map((proj, i) => {
              const icons = ['monitoring', 'picture_as_pdf', 'auto_awesome'];
              const labels = ['01', '02', '03'];
              const isActive = activeSection === `project-${proj.id}`;
              return (
                <a
                  key={proj.id}
                  className={`group flex items-center gap-4 pl-6 pr-4 py-5 transition-all duration-300 relative ${
                    isActive
                      ? 'bg-surface-container text-primary-container'
                      : 'text-outline hover:bg-surface-container-low/50 hover:text-primary'
                  }`}
                  href={`#project-${proj.id}`}
                >
                  {/* Active glow indicator */}
                  {isActive && (
                    <div className="absolute left-0 top-0 h-full w-[3px] bg-gradient-to-b from-primary-container via-primary to-primary-container/30"></div>
                  )}
                  <span className="font-label text-[9px] text-outline/50 tracking-widest min-w-[18px]">{labels[i]}</span>
                  <span className="material-symbols-outlined text-lg">{icons[i]}</span>
                  <span className="font-label uppercase tracking-widest text-[10px] leading-tight">{proj.title}</span>
                </a>
              );
            })}
          </nav>

          {/* Bottom status bar */}
          <div className="px-8 mt-auto">
            <div className="h-px w-full bg-gradient-to-r from-transparent via-outline-variant/20 to-transparent mb-6"></div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></div>
                <span className="font-label text-[8px] uppercase tracking-[0.3em] text-outline/50">Online</span>
              </div>
              <span className="font-label text-[8px] uppercase tracking-[0.2em] text-outline/30">v2.0</span>
            </div>
          </div>
        </aside>

        <main className="xl:ml-72">
          {/* Section 1: Hero */}
          <section className="relative min-h-screen flex flex-col justify-center px-8 md:px-24 overflow-hidden bg-surface" id="hero">
            <div className="absolute right-0 top-0 w-1/2 h-full opacity-20 pointer-events-none">
              <div className="w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary-container via-surface to-surface"></div>
              <img alt="Abstract 3D Shape" className="absolute inset-0 w-full h-full object-cover mix-blend-overlay" src="https://lh3.googleusercontent.com/aida-public/AB6AXuALNquarX2lULPT4O898ywds6vXX4RKetNjIv66zGcs2C-001U6Yv9FwsjHLu3Fvnz2lDWmNta3B8ofWII4asQ4S2zENSJO2pb1v9emM5-RUGTyCYgMlDedFjnEAchX1YmH3bQ5JCkFH5U0Q_Chjh0xjvZBikab6WmPr27E-4B90cb9bITpw4Ziu0kplC58EtanDHt9dmNbDvS3obLz8TX1GHulvZfodsPjx3p7AFUyik5rfbkUvwaI0bymyy_W3eFSkg1Ahg-O8bw"/>
            </div>
            
            <div className="relative z-10 max-w-4xl">
              <h2 className="font-body text-primary-container uppercase tracking-[0.4em] text-sm mb-6 reveal-up delay-100">{person.role}</h2>
              <h1 className="font-headline text-7xl md:text-9xl italic leading-none mb-8 tracking-tighter text-on-surface reveal-up delay-200">
                {person.name.split(' ')[0]} <span className="text-outline">&</span> <br/>
                <span className="text-primary-container">{person.name.split(' ').slice(1).join(' ')}.</span>
              </h1>
              <p className="font-body text-xl md:text-2xl text-outline max-w-xl leading-relaxed mb-12 reveal-up delay-300">
                Crafting high-fidelity digital experiences where architectural precision meets engineering mastery.
              </p>
              
              <div className="flex gap-4 sm:gap-8 items-center flex-wrap reveal-up delay-400">
                <button 
                  onClick={() => document.getElementById('work')?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
                  className="magnetic-btn bg-primary-container text-on-primary px-8 sm:px-10 py-5 font-bold uppercase tracking-widest text-xs sm:text-sm hover:shadow-[0_0_20px_rgba(0,229,255,0.4)] transition-all"
                >
                  Explore Works
                </button>
                {person.resume && (
                  <a href={person.resume} download="Tirtharaj_Dutta_Roy_Resume.pdf" className="magnetic-btn border border-outline-variant/30 text-on-surface px-8 sm:px-10 py-5 font-bold uppercase tracking-widest text-xs sm:text-sm hover:border-primary-container hover:text-primary-container hover:bg-primary-container/5 flex items-center gap-3 transition-all">
                    Download Resume <span className="material-symbols-outlined text-sm">download</span>
                  </a>
                )}
                <div className="h-[1px] w-12 sm:w-24 bg-outline-variant/50 hidden lg:block"></div>
                <span className="font-label text-[10px] sm:text-xs uppercase tracking-widest text-outline hidden sm:block">Scroll downward</span>
              </div>
            </div>

            <div className="absolute bottom-12 right-12 text-right hidden md:block">
              <div className="font-label text-[10px] text-outline uppercase tracking-[0.5em] mb-2">Coordination System</div>
              <div className="font-body text-primary text-sm tracking-widest">22.5726° N, 88.3639° E</div>
            </div>
          </section>

          {/* Section 2: Case Studies / Projects */}
          <section className="py-32 px-8 md:px-24 bg-surface" id="work">
            <div className="mb-24 reveal-up">
              <h3 className="font-headline text-6xl italic text-on-surface mb-4">The Project Archive</h3>
              <div className="h-1 w-24 bg-primary-container mb-8"></div>
            </div>

            <div className="space-y-32">
              {projects.map((project, idx) => {
                const isEven = idx % 2 !== 0; // Flip layout
                const projectLabels = {
                  dropout_predictor: 'System Architecture 01',
                  pdf_converter: 'Utility System 02',
                  poem_generator: 'NLP Protocol 03'
                };

                return (
                  <div key={project.id} id={`project-${project.id}`} className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start reveal-up">
                    {/* Interactive Visual Block */}
                    <div className={`tilt-card lg:col-span-7 relative group overflow-hidden ${isEven ? 'lg:order-2 order-1' : ''}`} style={{ background: '#0a0212', border: '1px solid rgba(255,255,255,0.1)', aspectRatio: '16/10' }}>
                      {project.id === 'dropout_predictor' && (
                        <svg viewBox="0 0 400 250" className="w-full h-full" style={{ display: 'block' }}>
                          {/* Cartesian Grid */}
                          {Array.from({ length: 20 }).map((_, i) => <line key={`vg${i}`} x1={i * 20} y1="0" x2={i * 20} y2="250" stroke="rgba(255,255,255,0.04)" strokeWidth="0.5" />)}
                          {Array.from({ length: 13 }).map((_, i) => <line key={`hg${i}`} x1="0" y1={i * 20} x2="400" y2={i * 20} stroke="rgba(255,255,255,0.04)" strokeWidth="0.5" />)}
                          {/* Axis lines */}
                          <line x1="40" y1="20" x2="40" y2="220" stroke="rgba(255,255,255,0.15)" strokeWidth="0.5" />
                          <line x1="40" y1="220" x2="380" y2="220" stroke="rgba(255,255,255,0.15)" strokeWidth="0.5" />
                          {/* Axis labels */}
                          <text x="10" y="125" fill="rgba(255,255,255,0.3)" fontSize="8" fontFamily="monospace" transform="rotate(-90 10 125)">P(dropout)</text>
                          <text x="200" y="242" fill="rgba(255,255,255,0.3)" fontSize="8" fontFamily="monospace" textAnchor="middle">feature_space</text>
                          {/* Probability curve (Gaussian-like) */}
                          <path d="M40,200 C80,195 120,180 160,120 C200,60 220,40 240,38 C260,40 280,60 320,150 C340,180 360,195 380,200" fill="none" stroke="#00e5ff" strokeWidth="1.5" opacity="0.8">
                            <animate attributeName="d" dur="6s" repeatCount="indefinite" values="M40,200 C80,195 120,180 160,120 C200,60 220,40 240,38 C260,40 280,60 320,150 C340,180 360,195 380,200;M40,200 C80,190 120,170 160,110 C200,55 230,35 250,33 C270,35 290,70 320,155 C345,185 365,198 380,200;M40,200 C80,195 120,180 160,120 C200,60 220,40 240,38 C260,40 280,60 320,150 C340,180 360,195 380,200" />
                          </path>
                          {/* Shaded area under curve */}
                          <path d="M40,200 C80,195 120,180 160,120 C200,60 220,40 240,38 C260,40 280,60 320,150 C340,180 360,195 380,200 L380,220 L40,220 Z" fill="url(#curveGrad)" opacity="0.15">
                            <animate attributeName="d" dur="6s" repeatCount="indefinite" values="M40,200 C80,195 120,180 160,120 C200,60 220,40 240,38 C260,40 280,60 320,150 C340,180 360,195 380,200 L380,220 L40,220 Z;M40,200 C80,190 120,170 160,110 C200,55 230,35 250,33 C270,35 290,70 320,155 C345,185 365,198 380,200 L380,220 L40,220 Z;M40,200 C80,195 120,180 160,120 C200,60 220,40 240,38 C260,40 280,60 320,150 C340,180 360,195 380,200 L380,220 L40,220 Z" />
                          </path>
                          <defs>
                            <linearGradient id="curveGrad" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="0%" stopColor="#00e5ff" />
                              <stop offset="100%" stopColor="#00e5ff" stopOpacity="0" />
                            </linearGradient>
                          </defs>
                          {/* Data point nodes */}
                          <circle cx="160" cy="120" r="3" fill="#00e5ff" opacity="0.9"><animate attributeName="cy" dur="6s" repeatCount="indefinite" values="120;110;120" /></circle>
                          <circle cx="240" cy="38" r="4" fill="#00e5ff" opacity="1"><animate attributeName="cy" dur="6s" repeatCount="indefinite" values="38;33;38" /></circle>
                          <circle cx="320" cy="150" r="3" fill="#00e5ff" opacity="0.9"><animate attributeName="cy" dur="6s" repeatCount="indefinite" values="150;155;150" /></circle>
                          {/* Node labels */}
                          <text x="240" y="28" fill="#00e5ff" fontSize="7" fontFamily="monospace" textAnchor="middle" opacity="0.7">μ = 0.95</text>
                          <text x="160" y="138" fill="rgba(255,255,255,0.5)" fontSize="6" fontFamily="monospace">recall_peak</text>
                          {/* Floating metric */}
                          <rect x="290" y="55" width="80" height="30" rx="2" fill="rgba(0,229,255,0.08)" stroke="rgba(0,229,255,0.3)" strokeWidth="0.5" />
                          <text x="330" y="68" fill="#00e5ff" fontSize="7" fontFamily="monospace" textAnchor="middle">SMOTE</text>
                          <text x="330" y="79" fill="rgba(255,255,255,0.5)" fontSize="6" fontFamily="monospace" textAnchor="middle">12% → balanced</text>
                        </svg>
                      )}
                      {project.id === 'pdf_converter' && (
                        <svg viewBox="0 0 400 250" className="w-full h-full" style={{ display: 'block' }}>
                          {/* Grid pattern */}
                          {Array.from({ length: 20 }).map((_, i) => <line key={`vg${i}`} x1={i * 20} y1="0" x2={i * 20} y2="250" stroke="rgba(255,255,255,0.03)" strokeWidth="0.5" />)}
                          {Array.from({ length: 13 }).map((_, i) => <line key={`hg${i}`} x1="0" y1={i * 20} x2="400" y2={i * 20} stroke="rgba(255,255,255,0.03)" strokeWidth="0.5" />)}
                          {/* Flow arrow line */}
                          <line x1="50" y1="125" x2="350" y2="125" stroke="rgba(255,255,255,0.08)" strokeWidth="1" strokeDasharray="4,4" />
                          {/* Source image icons (left side, staggered) */}
                          {[0,1,2,3,4].map(i => (
                            <g key={`img${i}`} opacity={0.4 + i * 0.12}>
                              <rect x={40 + i * 15} y={80 + i * 6} width="28" height="36" rx="1.5" fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="0.8">
                                <animate attributeName="x" dur={`${3 + i * 0.5}s`} repeatCount="indefinite" values={`${40 + i * 15};${45 + i * 15};${40 + i * 15}`} />
                              </rect>
                              <line x1={46 + i * 15} y1={90 + i * 6} x2={62 + i * 15} y2={90 + i * 6} stroke="rgba(255,255,255,0.15)" strokeWidth="0.5" />
                              <line x1={46 + i * 15} y1={95 + i * 6} x2={58 + i * 15} y2={95 + i * 6} stroke="rgba(255,255,255,0.1)" strokeWidth="0.5" />
                            </g>
                          ))}
                          {/* Process arrow */}
                          <polygon points="195,118 210,125 195,132" fill="rgba(0,229,255,0.4)"><animate attributeName="opacity" dur="2s" repeatCount="indefinite" values="0.3;0.8;0.3" /></polygon>
                          <text x="200" y="110" fill="rgba(255,255,255,0.3)" fontSize="6" fontFamily="monospace" textAnchor="middle">BATCH_PROCESS</text>
                          {/* Central stacking animation */}
                          {[0,1,2].map(i => (
                            <rect key={`stack${i}`} x={225 + i * 4} y={95 + i * 5} width="35" height="45" rx="2" fill="none" stroke={i === 2 ? '#00e5ff' : 'rgba(255,255,255,0.2)'} strokeWidth={i === 2 ? 1 : 0.5}>
                              <animate attributeName="opacity" dur="3s" repeatCount="indefinite" values={i === 2 ? '0.7;1;0.7' : '0.3;0.5;0.3'} />
                            </rect>
                          ))}
                          {/* Output PDF icon (right side, glowing) */}
                          <g>
                            <rect x="310" y="90" width="50" height="65" rx="3" fill="rgba(0,229,255,0.06)" stroke="#00e5ff" strokeWidth="1">
                              <animate attributeName="opacity" dur="3s" repeatCount="indefinite" values="0.7;1;0.7" />
                            </rect>
                            {/* PDF fold corner */}
                            <path d="M348,90 L360,90 L360,102 L348,102 Z" fill="rgba(0,229,255,0.1)" stroke="#00e5ff" strokeWidth="0.5" />
                            <text x="335" y="120" fill="#00e5ff" fontSize="10" fontFamily="monospace" fontWeight="bold" textAnchor="middle">PDF</text>
                            <text x="335" y="135" fill="rgba(255,255,255,0.4)" fontSize="6" fontFamily="monospace" textAnchor="middle">50+ images</text>
                            <text x="335" y="145" fill="rgba(255,255,255,0.3)" fontSize="5" fontFamily="monospace" textAnchor="middle">0 API calls</text>
                          </g>
                          {/* Floating status label */}
                          <rect x="130" y="180" width="140" height="22" rx="2" fill="rgba(0,229,255,0.05)" stroke="rgba(0,229,255,0.2)" strokeWidth="0.5" />
                          <text x="200" y="194" fill="rgba(0,229,255,0.7)" fontSize="7" fontFamily="monospace" textAnchor="middle">LOCAL_PIPELINE: ACTIVE</text>
                        </svg>
                      )}
                      {project.id === 'poem_generator' && (
                        <svg viewBox="0 0 400 250" className="w-full h-full" style={{ display: 'block' }}>
                          {/* Semantic nodes */}
                          <circle cx="80" cy="80" r="20" fill="none" stroke="rgba(0,229,255,0.3)" strokeWidth="0.8"><animate attributeName="r" dur="5s" repeatCount="indefinite" values="20;22;20" /></circle>
                          <text x="80" y="83" fill="#00e5ff" fontSize="7" fontFamily="monospace" textAnchor="middle" opacity="0.9">EMOTION</text>

                          <circle cx="300" cy="60" r="18" fill="none" stroke="rgba(0,229,255,0.25)" strokeWidth="0.8"><animate attributeName="r" dur="4s" repeatCount="indefinite" values="18;20;18" /></circle>
                          <text x="300" y="63" fill="rgba(255,255,255,0.7)" fontSize="7" fontFamily="monospace" textAnchor="middle">CONTEXT</text>

                          <circle cx="200" cy="180" r="22" fill="none" stroke="rgba(0,229,255,0.4)" strokeWidth="1"><animate attributeName="r" dur="6s" repeatCount="indefinite" values="22;25;22" /></circle>
                          <text x="200" y="178" fill="#00e5ff" fontSize="8" fontFamily="monospace" textAnchor="middle" fontWeight="bold">GEN</text>
                          <text x="200" y="188" fill="rgba(0,229,255,0.6)" fontSize="5" fontFamily="monospace" textAnchor="middle">output</text>

                          <circle cx="340" cy="180" r="14" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="0.5"><animate attributeName="r" dur="4.5s" repeatCount="indefinite" values="14;16;14" /></circle>
                          <text x="340" y="182" fill="rgba(255,255,255,0.4)" fontSize="6" fontFamily="monospace" textAnchor="middle">LANG</text>

                          <circle cx="60" cy="190" r="12" fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="0.5" />
                          <text x="60" y="192" fill="rgba(255,255,255,0.3)" fontSize="5" fontFamily="monospace" textAnchor="middle">TONE</text>

                          {/* Connection lines */}
                          <line x1="100" y1="85" x2="282" y2="65" stroke="#00e5ff" strokeWidth="0.4" strokeDasharray="3,3" opacity="0.4"><animate attributeName="opacity" dur="4s" repeatCount="indefinite" values="0.3;0.6;0.3" /></line>
                          <line x1="90" y1="98" x2="185" y2="162" stroke="#00e5ff" strokeWidth="0.5" opacity="0.5"><animate attributeName="opacity" dur="3s" repeatCount="indefinite" values="0.3;0.7;0.3" /></line>
                          <line x1="290" y1="75" x2="215" y2="162" stroke="#00e5ff" strokeWidth="0.4" strokeDasharray="2,2" opacity="0.4"><animate attributeName="opacity" dur="5s" repeatCount="indefinite" values="0.2;0.5;0.2" /></line>
                          <line x1="326" y1="172" x2="222" y2="178" stroke="rgba(255,255,255,0.15)" strokeWidth="0.3" />
                          <line x1="72" y1="185" x2="178" y2="180" stroke="rgba(255,255,255,0.1)" strokeWidth="0.3" />

                          {/* Data flow particles */}
                          <circle r="1.5" fill="#00e5ff" opacity="0.8">
                            <animateMotion dur="3s" repeatCount="indefinite" path="M90,98 Q140,130 185,162" />
                          </circle>
                          <circle r="1" fill="#00e5ff" opacity="0.6">
                            <animateMotion dur="4s" repeatCount="indefinite" path="M290,75 Q250,120 215,162" />
                          </circle>

                          {/* Floating text threads */}
                          <text x="150" y="40" fill="rgba(255,255,255,0.15)" fontSize="5" fontFamily="monospace">sentiment_vector[]</text>
                          <text x="250" y="230" fill="rgba(255,255,255,0.12)" fontSize="5" fontFamily="monospace">prompt_chain.resolve()</text>
                          <text x="30" y="140" fill="rgba(0,229,255,0.2)" fontSize="5" fontFamily="monospace">affect:0.87</text>

                          {/* API latency badge */}
                          <rect x="155" y="210" width="90" height="18" rx="2" fill="rgba(0,229,255,0.05)" stroke="rgba(0,229,255,0.2)" strokeWidth="0.5" />
                          <text x="200" y="222" fill="rgba(0,229,255,0.7)" fontSize="6" fontFamily="monospace" textAnchor="middle">60 FPS @ 3-4s API</text>
                        </svg>
                      )}
                      <div className="absolute inset-0 bg-primary-container/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
                    </div>
                    {/* Text Block */}
                    <div className={`lg:col-span-5 pt-4 ${isEven ? 'lg:order-1 order-2' : ''}`}>
                      <span className="font-label text-xs font-bold uppercase tracking-[0.3em] text-outline mb-4 block">{projectLabels[project.id] || `Project 0${idx + 1}`}</span>
                      <h4 className="font-headline text-5xl mb-6 text-primary">{project.title}</h4>
                      <p className="font-body text-on-surface/80 leading-relaxed mb-8">
                        {project.impact}
                      </p>
                      <div className="flex flex-wrap gap-3 mb-10">
                        {project.stack?.map(tech => (
                          <div key={tech} className="flex items-center gap-2 bg-surface-container-highest px-4 py-2 hover:bg-surface-bright transition-colors">
                            <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                            <span className="font-label text-[10px] font-medium uppercase tracking-widest">{tech}</span>
                          </div>
                        ))}
                      </div>
                      <a href={project.link || '#'} target="_blank" rel="noreferrer" className="magnetic-btn inline-flex font-body text-primary-container font-bold uppercase tracking-[0.2em] text-xs items-center gap-4 group hover:gap-6 transition-all">
                        View Source Code <span className="material-symbols-outlined text-sm">code</span>
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Section 3: Technical Stack Dashboard */}
          <section className="py-32 px-8 md:px-24 bg-surface-container-low" id="stack">
            <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8 reveal-up">
              <div>
                <h3 className="font-headline text-5xl italic text-primary mb-4">Technical Engine</h3>
                <p className="font-body text-outline max-w-md">A curated inventory of the technologies powering my architectural approach to development.</p>
              </div>
              <div className="text-right hidden sm:block">
                <span className="font-label text-6xl font-bold text-surface-container-highest tracking-tighter">02 // STACK</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-outline-variant/10 border-y border-outline-variant/20">
              {/* Category 1: Foundations */}
              <div className="tilt-card bg-surface p-12 hover:bg-surface-container transition-colors duration-500 border-x border-outline-variant/5 reveal-up delay-100">
                <div className="flex items-center gap-3 mb-8">
                  <span className="material-symbols-outlined text-primary">terminal</span>
                  <h4 className="font-body font-bold uppercase tracking-widest text-sm">Foundations</h4>
                </div>
                <ul className="space-y-4">
                  {skills.languages.map(lang => (
                    <li key={lang} className="flex justify-between items-center group">
                      <span className="font-body text-on-surface group-hover:text-primary transition-colors">{lang}</span>
                      <span className="font-label text-[10px] text-outline border border-outline-variant/20 px-2 py-1">CORE</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Category 2: Infrastructure */}
              <div className="tilt-card bg-surface p-12 hover:bg-surface-container transition-colors duration-500 border-x border-outline-variant/5 reveal-up delay-200">
                <div className="flex items-center gap-3 mb-8">
                  <span className="material-symbols-outlined text-primary">cloud</span>
                  <h4 className="font-body font-bold uppercase tracking-widest text-sm">Infrastructure</h4>
                </div>
                <ul className="space-y-4">
                  {skills.tools.map(tool => (
                    <li key={tool} className="flex justify-between items-center group">
                      <span className="font-body text-on-surface group-hover:text-primary transition-colors">{tool}</span>
                      <span className="font-label text-[10px] text-outline border border-outline-variant/20 px-2 py-1">OPS</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Category 3: Interface */}
              <div className="tilt-card bg-surface p-12 hover:bg-surface-container transition-colors duration-500 border-x border-outline-variant/5 reveal-up delay-300">
                <div className="flex items-center gap-3 mb-8">
                  <span className="material-symbols-outlined text-primary">view_quilt</span>
                  <h4 className="font-body font-bold uppercase tracking-widest text-sm">Interface</h4>
                </div>
                <ul className="space-y-4">
                  {skills.frameworks.map(fw => (
                    <li key={fw} className="flex justify-between items-center group">
                      <span className="font-body text-on-surface group-hover:text-primary transition-colors">{fw}</span>
                      <span className="font-label text-[10px] text-outline border border-outline-variant/20 px-2 py-1">ARCH</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          {/* Section 3.5: Corporate Soft Skills */}
          <section className="py-32 px-8 md:px-24 bg-surface" id="protocols">
            <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8 reveal-up">
              <div>
                <h3 className="font-headline text-5xl italic text-on-surface mb-4">Operational Protocols</h3>
                <p className="font-body text-outline max-w-md">The non-negotiable human-layer competencies that drive execution in high-stakes corporate environments.</p>
              </div>
              <div className="text-right hidden sm:block">
                <span className="font-label text-6xl font-bold text-surface-container-highest tracking-tighter">03 // SKILLS</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-px bg-outline-variant/10">
              {[
                { icon: 'forum', title: 'Technical Translation', desc: 'Bridging the gap between engineering complexity and stakeholder clarity.' },
                { icon: 'hub', title: 'Systems Thinking', desc: 'Decomposing large-scale problems into modular, solvable architectures.' },
                { icon: 'groups', title: 'Cross-Functional Collaboration', desc: 'Aligning design, product, and engineering toward a unified objective.' },
                { icon: 'speed', title: 'Agile Adaptability', desc: 'Thriving in fast-iteration cycles with shifting priorities and constraints.' },
                { icon: 'psychology', title: 'Critical Problem Solving', desc: 'Applying first-principles reasoning under pressure to resolve blockers.' },
              ].map((skill, i) => (
                <div key={skill.title} className="tilt-card bg-surface-container-low p-10 hover:bg-surface-container transition-colors duration-500 border border-outline-variant/10 group flex flex-col">
                  <div className="flex items-center gap-3 mb-6">
                    <span className="material-symbols-outlined text-primary text-2xl">{skill.icon}</span>
                    <span className="font-label text-[10px] text-outline border border-outline-variant/20 px-2 py-0.5">0{i + 1}</span>
                  </div>
                  <h4 className="font-body font-bold uppercase tracking-widest text-xs text-on-surface mb-3 group-hover:text-primary transition-colors">{skill.title}</h4>
                  <p className="font-body text-outline text-sm leading-relaxed mt-auto">{skill.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Section 4: Accreditations */}
          <section className="py-32 px-8 bg-surface-container-lowest" id="achievements">
            <div className="max-w-7xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-16 items-center reveal-up">
                <div className="md:col-span-4">
                  <h3 className="font-headline text-5xl italic text-on-surface mb-6">Accreditations</h3>
                  <p className="font-body text-outline">Recognitions for architectural excellence in code and competitive development environments.</p>
                </div>
                <div className="md:col-span-8 space-y-px bg-outline-variant/10">
                  {achievements?.map((ach, i) => {
                    const Wrapper = ach.image ? 'a' : 'div';
                    const wrapperProps = ach.image ? { href: ach.image, target: '_blank', rel: 'noreferrer' } : {};
                    return (
                      <Wrapper key={ach.title} {...wrapperProps} className={`bg-surface p-10 flex flex-col md:flex-row md:items-center justify-between gap-6 group transition-colors ${ach.image ? 'hover:bg-surface-container cursor-pointer block' : 'hover:bg-surface-container'}`}>
                        <div>
                          <h5 className="font-headline text-2xl text-primary mb-1 group-hover:text-primary-container transition-colors">{ach.title}</h5>
                          <p className="font-body text-outline text-sm uppercase tracking-widest">{ach.distinction}</p>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className="material-symbols-outlined text-4xl text-outline-variant group-hover:text-primary transition-colors">
                            {i === 0 ? 'trophy' : (i === 1 ? 'workspace_premium' : 'token')}
                          </span>
                          {ach.image && (
                            <span className="material-symbols-outlined text-outline/40 group-hover:text-primary transition-colors">open_in_new</span>
                          )}
                        </div>
                      </Wrapper>
                    );
                  })}
                </div>
              </div>
            </div>
          </section>

          {/* Section 5: Training & Certifications */}
          <section className="py-24 px-8 md:px-24 bg-surface-container-low" id="training">
            <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8 reveal-up">
              <div>
                <h3 className="font-headline text-5xl italic text-primary mb-4">Training & Certifications</h3>
                <p className="font-body text-outline max-w-md">Continuous learning protocols — structured courses and verified credentials that sharpen my engineering edge.</p>
              </div>
              <div className="text-right hidden sm:block">
                <span className="font-label text-6xl font-bold text-surface-container-highest tracking-tighter">05 // CERTS</span>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              {/* Training Column */}
              <div>
                <div className="flex items-center gap-3 mb-8">
                  <span className="material-symbols-outlined text-primary">school</span>
                  <h4 className="font-body font-bold uppercase tracking-widest text-sm">Training Programs</h4>
                </div>
                <div className="space-y-px bg-outline-variant/10">
                  {training?.map(t => {
                    const Wrapper = t.image ? 'a' : 'div';
                    const wrapperProps = t.image ? { href: t.image, target: '_blank', rel: 'noreferrer' } : {};
                    return (
                      <Wrapper key={t.title} {...wrapperProps} className="tilt-card bg-surface p-8 hover:bg-surface-container transition-colors duration-500 group block cursor-pointer">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                          <div>
                            <h5 className="font-body font-semibold text-on-surface group-hover:text-primary transition-colors">{t.title}</h5>
                            <p className="font-label text-[10px] uppercase tracking-widest text-outline mt-1">{t.provider}</p>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className="font-label text-[10px] text-outline border border-outline-variant/20 px-3 py-1 whitespace-nowrap">{t.period}</span>
                            {t.image && <span className="material-symbols-outlined text-sm text-outline/40 group-hover:text-primary transition-colors">open_in_new</span>}
                          </div>
                        </div>
                      </Wrapper>
                    );
                  })}
                </div>
              </div>

              {/* Certifications Column */}
              <div>
                <div className="flex items-center gap-3 mb-8">
                  <span className="material-symbols-outlined text-primary">verified</span>
                  <h4 className="font-body font-bold uppercase tracking-widest text-sm">Certifications</h4>
                </div>
                <div className="space-y-px bg-outline-variant/10" id="certifications">
                  {certifications?.map(c => (
                    <a key={c.title} href={c.image} target="_blank" rel="noreferrer" className="tilt-card bg-surface p-8 hover:bg-surface-container transition-colors duration-500 group block cursor-pointer">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <div>
                          <h5 className="font-body font-semibold text-on-surface group-hover:text-primary transition-colors">{c.title}</h5>
                          <p className="font-label text-[10px] uppercase tracking-widest text-outline mt-1">{c.provider}</p>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="font-label text-[10px] text-outline border border-outline-variant/20 px-3 py-1 whitespace-nowrap">{c.date}</span>
                          <span className="material-symbols-outlined text-sm text-outline/40 group-hover:text-primary transition-colors">open_in_new</span>
                        </div>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Section 6: Education */}
          <section className="py-24 px-8 md:px-24 bg-surface" id="education">
            <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8 reveal-up">
              <div>
                <h3 className="font-headline text-5xl italic text-on-surface mb-4">Education</h3>
                <p className="font-body text-outline max-w-md">The academic foundations that shaped my engineering discipline and analytical thinking.</p>
              </div>
              <div className="text-right hidden sm:block">
                <span className="font-label text-6xl font-bold text-surface-container-highest tracking-tighter">06 // EDU</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-outline-variant/10">
              {education?.map((edu, i) => (
                <div key={edu.institution} className="tilt-card bg-surface-container-low p-10 hover:bg-surface-container transition-colors duration-500 group border border-outline-variant/10 flex flex-col">
                  <div className="flex items-center gap-3 mb-6">
                    <span className="material-symbols-outlined text-primary text-2xl">
                      {i === 0 ? 'apartment' : 'domain'}
                    </span>
                    <span className="font-label text-[10px] text-outline border border-outline-variant/20 px-2 py-0.5">{edu.period}</span>
                  </div>
                  <h4 className="font-body font-bold text-on-surface mb-2 group-hover:text-primary transition-colors">{edu.institution}</h4>
                  <p className="font-headline text-sm italic text-primary-container mb-3">{edu.degree}</p>
                  <p className="font-label text-[10px] uppercase tracking-widest text-outline mt-auto">{edu.location}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Section 7: Hire Me / Contact */}
          <section className="relative py-20 px-8 overflow-hidden" id="contact">
            <div className="absolute inset-0 z-0 pointer-events-none">
              <div className="w-full h-full bg-[conic-gradient(from_0deg_at_50%_50%,_#0b1326,_#171f33,_#0b1326)]"></div>
            </div>
            <div className="relative z-10 max-w-4xl mx-auto text-center reveal-up">
              <h3 className="font-label text-xs font-bold uppercase tracking-[0.5em] text-primary mb-8 delay-100 reveal-in">System Availability: HIGH</h3>
              <h4 className="font-headline text-6xl md:text-8xl italic text-on-surface mb-8 leading-tight delay-200 reveal-up">
                Let's Build the <span className="text-primary-container">Next Monolith.</span>
              </h4>
              <p className="font-body text-xl text-outline mb-10 max-w-2xl mx-auto leading-relaxed">
                Open for high-impact collaborations, technical consulting, and architectural inquiries.
              </p>
              <a className="magnetic-btn border border-primary-container inline-block bg-primary-container text-on-primary px-16 py-5 font-bold uppercase tracking-[0.3em] text-sm hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(0,229,255,0.2)] transition-transform" href={`mailto:${person.contact.email}`}>
                Initialize Connection
              </a>
            </div>
          </section>

          {/* Footer Shared Component */}
          <footer className="relative w-full bg-[#060e20] border-t border-outline-variant/15 overflow-hidden">
            {/* Top tier — branding & tagline */}
            <div className="max-w-7xl mx-auto px-12 pt-10 pb-6">
              <div className="flex flex-col md:flex-row justify-between items-start gap-12">
                <div>
                  <h4 className="font-headline text-2xl italic text-on-surface mb-2">{person.name}</h4>
                  <p className="font-body text-outline text-sm max-w-sm leading-relaxed">Engineering high-fidelity digital systems with architectural precision and creative ambition.</p>
                </div>
                <div className="flex flex-col items-start md:items-end gap-6">
                  <span className="font-label text-[10px] uppercase tracking-[0.3em] text-outline">Connect</span>
                  <div className="flex gap-8">
                    {Object.entries(person.contact).map(([platform, url]) => (
                      <a
                        key={platform}
                        className="magnetic-btn group flex flex-col items-center gap-2"
                        href={platform === 'email' ? `mailto:${url}` : url}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <span className="material-symbols-outlined text-xl text-outline group-hover:text-primary transition-colors duration-300">
                          {platform === 'email' ? 'mail' : platform === 'linkedin' ? 'link' : 'code'}
                        </span>
                        <span className="font-label text-[9px] uppercase tracking-[0.2em] text-outline group-hover:text-primary-container transition-colors duration-300">{platform}</span>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            {/* Glowing separator */}
            <div className="max-w-7xl mx-auto px-12">
              <div className="h-px w-full bg-gradient-to-r from-transparent via-primary-container/40 to-transparent"></div>
            </div>
            {/* Bottom tier — copyright */}
            <div className="max-w-7xl mx-auto px-12 py-8 flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="font-label text-[9px] uppercase tracking-[0.3em] text-outline/60">
                © {new Date().getFullYear()} {person.name}. Built for Precision.
              </div>
              <div className="font-label text-[9px] uppercase tracking-[0.3em] text-outline/40">
                Crafted with intent — Kolkata, India
              </div>
            </div>
          </footer>
        </main>


      </div>
    </>
  );
}
