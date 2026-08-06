import React, { useEffect, useState } from 'react';

export interface ActionItem {
  text: string;
  onClick: () => void;
  variant?: 'default' | 'outline';
}

export interface StatItem {
  value: string;
  label: string;
  icon: React.ReactNode;
}

export interface HeroSectionProps {
  title: React.ReactNode;
  subtitle: string;
  actions: ActionItem[];
  stats?: StatItem[];
  images: string[];
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  title,
  subtitle,
  actions,
  stats,
  images
}) => {
  const centerIndex = (images.length - 1) / 2;

  // Animation stages:
  // 'offscreen' — stack below viewport, all UI hidden
  // 'rised'     — stack rises as one unit to center. Top/bottom still hidden.
  // 'expanded'  — images fan out, top reveals with clip wipe, bottom rises from below screen
  const [stage, setStage] = useState<'offscreen' | 'rised' | 'expanded'>('offscreen');

  useEffect(() => {
    const t1 = setTimeout(() => setStage('rised'), 100);     // stack starts rising
    const t2 = setTimeout(() => setStage('expanded'), 1250); // fan out + UI reveals
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  const isExpanded = stage === 'expanded';

  // ── Card stack wrapper: moves as ONE unit so only 1 card visible during rise ──
  const stackWrapperStyle: React.CSSProperties = {
    transform: stage === 'offscreen' ? 'translateY(200vh)' : 'translateY(0)',
    transition: stage === 'rised'
      ? 'transform 1.05s cubic-bezier(0.22, 1, 0.36, 1)'
      : 'none',
    position: 'relative',
    width: '100%',
    height: '100%',
  };

  // ── Top section: clip-path box reveal (text wipes out from behind a mask div) ──
  // clipPath goes from inset(0 0 100% 0) → inset(0 0 0% 0) = reveals downward from top
  const topRevealStyle: React.CSSProperties = {
    overflow: 'hidden',         // the mask box
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '16px',
  };

  const topInnerStyle: React.CSSProperties = {
    transform: isExpanded ? 'translateY(0)' : 'translateY(-110%)',
    opacity: isExpanded ? 1 : 0,
    transition: isExpanded
      ? 'transform 0.75s cubic-bezier(0.22, 1, 0.36, 1) 0s, opacity 0.5s ease 0s'
      : 'none',
  };

  // ── Bottom section: rises from below screen (same as image stack) ──
  const bottomRiseStyle: React.CSSProperties = {
    transform: isExpanded ? 'translateY(0)' : 'translateY(200vh)',
    transition: isExpanded
      ? 'transform 1.0s cubic-bezier(0.22, 1, 0.36, 1) 0.05s'
      : 'none',
  };

  return (
    <section
      className="hero-stack-container relative pt-20 pb-16 md:pt-28 md:pb-24 bg-[#FAF7F5] text-center min-h-[calc(100vh-80px)] md:min-h-screen flex flex-col justify-center md:justify-between gap-4 md:gap-0 items-center"
      style={{ overflow: 'hidden' }}
    >
      <style dangerouslySetInnerHTML={{ __html: `
        .hero-stack-container {
          --stack-height: 220px;
          --stack-width: 140px;
          --stack-card-height: 180px;
          --stack-left-offset: 70px;
          --stack-top: 20px;
          --offset-multiplier: 65px;
          --offset-y: 8px;
          --rotate-deg: 3.5deg;
          --stack-margin: 12px;
        }
        @media (min-width: 768px) {
          .hero-stack-container {
            --stack-height: 350px;
            --stack-width: 220px;
            --stack-card-height: 275px;
            --stack-left-offset: 110px;
            --stack-top: 37.5px;
            --offset-multiplier: 185px;
            --offset-y: 14px;
            --rotate-deg: 3.5deg;
            --stack-margin: 48px;
          }
        }
      `}} />
      {/* Decorative background glows — appear with top section */}
      <div
        style={{
          position: 'absolute',
          top: '-100px',
          right: '-100px',
          width: '500px',
          height: '300px',
          background: 'radial-gradient(circle, rgba(201,44,21,0.06), transparent)',
          filter: 'blur(40px)',
          pointerEvents: 'none',
          borderRadius: '50%',
          zIndex: 0,
          opacity: isExpanded ? 1 : 0,
          transition: isExpanded ? 'opacity 1.2s ease 0.3s' : 'none',
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: '100px',
          left: '-100px',
          width: '500px',
          height: '300px',
          background: 'radial-gradient(circle, rgba(201,44,21,0.06), transparent)',
          filter: 'blur(40px)',
          pointerEvents: 'none',
          borderRadius: '50%',
          zIndex: 0,
          opacity: isExpanded ? 1 : 0,
          transition: isExpanded ? 'opacity 1.2s ease 0.3s' : 'none',
        }}
      />

      {/* ── TOP SECTION: Badge + Title ──
          Reveals with a clip/box wipe: content slides up from behind an overflow:hidden mask.
          Triggered only when stage = 'expanded' (after stack has risen). */}
      <div className="max-w-4xl mx-auto px-6 relative z-10" style={topRevealStyle}>
        <div style={topInnerStyle}>
          {/* Badge */}
          <span className="text-[#C92C15] text-xs font-bold uppercase tracking-[0.25em] bg-[#C92C15]/5 px-3.5 py-1.5 rounded-full inline-block">
            Our Portfolio
          </span>
        </div>
        <div style={{ ...topInnerStyle, transitionDelay: isExpanded ? '0.1s, 0.1s' : '0s' }}>
          {/* Heading */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-light text-[#1B1B1B] tracking-tight leading-tight max-w-3xl mx-auto">
            {title}
          </h1>
        </div>
      </div>

      {/* ── IMAGE STACK ──
          Section overflow:hidden clips viewport bottom.
          Wrapper rises as ONE unit — all cards travel together as a single pile.
          Fan-out applied per-card only after 'expanded' stage. */}
      {images && images.length > 0 && (
        <div
          style={{
            position: 'relative',
            width: '100%',
            height: 'var(--stack-height)',
            overflow: 'visible',
            zIndex: 10,
            marginTop: 'var(--stack-margin)',
            marginBottom: 'var(--stack-margin)',
          }}
        >
          <div style={stackWrapperStyle}>
            {images.map((img, i) => {
              const offset = i - centerIndex;
              const distanceFromCenter = Math.abs(i - Math.floor(centerIndex));

              const fanStyle: React.CSSProperties = isExpanded
                ? {
                    transform: `translateX(calc(${offset} * var(--offset-multiplier))) translateY(calc(${(offset * offset * 0.6).toFixed(2)} * var(--offset-y))) rotate(calc(${offset} * var(--rotate-deg)))`,
                    transition: `transform 0.85s cubic-bezier(0.22, 1, 0.36, 1) ${distanceFromCenter * 0.06}s`,
                  }
                : {
                    transform: 'translateX(0) translateY(0) rotate(0deg)',
                    transition: 'none',
                  };

              return (
                <div
                  key={i}
                  style={{
                    position: 'absolute',
                    top: 'var(--stack-top)',
                    left: 'calc(50% - var(--stack-left-offset))',
                    width: 'var(--stack-width)',
                    height: 'var(--stack-card-height)',
                    zIndex: 10 - distanceFromCenter,
                    borderRadius: '24px',
                    overflow: 'hidden',
                    boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)',
                    border: '1px solid rgba(0,0,0,0.05)',
                    cursor: 'pointer',
                    ...fanStyle,
                  }}
                >
                  <img
                    src={img}
                    alt={`Portfolio Item ${i + 1}`}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      objectPosition: 'center',
                      display: 'block',
                      backgroundColor: '#e5e7eb',
                    }}
                    loading="eager"
                  />
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ── BOTTOM SECTION: Subtitle + Button + Stats ──
          Rises from below the screen — same motion as image stack.
          Triggered only when stage = 'expanded'. */}
      <div
        className="max-w-3xl mx-auto px-6 relative z-10 flex flex-col items-center space-y-6 mt-6"
        style={bottomRiseStyle}
      >
        {/* Subtitle */}
        <p className="text-sm md:text-base text-[#6F6F6F] font-light max-w-xl mx-auto leading-relaxed">
          {subtitle}
        </p>

        {/* Actions */}
        {actions && actions.length > 0 && (
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 pt-2">
            {actions.map((action, idx) => (
              <button
                key={idx}
                onClick={action.onClick}
                className="w-full sm:w-auto px-8 py-3.5 text-xs sm:text-sm font-semibold uppercase tracking-wider transition-all duration-300 rounded-xl cursor-pointer bg-[#C92C15] text-white hover:bg-[#D43B13] shadow-md hover:scale-[1.02] active:scale-[0.98]"
              >
                {action.text}
              </button>
            ))}
          </div>
        )}

        {/* Stats */}
        {stats && stats.length > 0 && (
          <div className="grid grid-cols-3 gap-4 md:gap-8 max-w-2xl mx-auto pt-8 border-t border-black/5">
            {stats.map((stat, idx) => (
              <div key={idx} className="flex flex-col items-center text-center space-y-2">
                <div className="h-10 w-10 bg-[#C92C15]/5 border border-[#C92C15]/10 rounded-xl flex items-center justify-center text-[#C92C15] mb-1">
                  {stat.icon}
                </div>
                <span className="text-xl md:text-3xl font-extrabold text-[#1B1B1B] tracking-tight">{stat.value}</span>
                <span className="text-[10px] md:text-xs text-[#6F6F6F] font-medium uppercase tracking-wider">{stat.label}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default HeroSection;
