import React, { useEffect, useRef, useState } from 'react';
import { FadeUp } from './ui/FadeUp';

interface AnimatedCounterProps {
  value: number;
  suffix?: string;
  duration?: number;
  decimals?: number;
}

const AnimatedCounter: React.FC<AnimatedCounterProps> = ({ value, suffix = '', duration = 1500, decimals = 0 }) => {
  const [count, setCount] = useState(0);
  const elementRef = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          let startTime: number | null = null;

          const animate = (timestamp: number) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);
            setCount(progress * value);

            if (progress < 1) {
              requestAnimationFrame(animate);
            }
          };

          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.1 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, [value, duration]);

  const displayValue = decimals > 0 ? count.toFixed(decimals) : Math.floor(count);

  return (
    <span ref={elementRef} className="tabular-nums">
      {displayValue}
      {suffix}
    </span>
  );
};

const MarketGridMobile = () => {
  return (
    <div className="grid grid-cols-2 gap-3 text-left">
      {/* Card 1 */}
      <div className="bg-white p-4 rounded-2xl border border-black/5 flex flex-col justify-between min-h-[130px] shadow-sm">
        <div className="flex items-baseline select-none">
          <span className="text-3xl font-extrabold text-[#1B1B1B]">
            <AnimatedCounter value={30} />
          </span>
          <span className="text-violet-500 text-sm font-bold ml-1">Yrs+</span>
        </div>
        <div className="text-[10px] uppercase tracking-wider text-[#1B1B1B] font-bold leading-tight mt-2">
          Construction Excellence
        </div>
      </div>
      
      {/* Card 2 */}
      <div className="bg-white p-4 rounded-2xl border border-black/5 flex flex-col justify-between min-h-[130px] shadow-sm">
        <div className="flex items-baseline select-none">
          <span className="text-3xl font-extrabold text-[#1B1B1B]">
            <AnimatedCounter value={100} />
          </span>
          <span className="text-cyan-500 text-sm font-bold ml-0.5">+</span>
        </div>
        <div className="text-[10px] uppercase tracking-wider text-[#1B1B1B] font-bold leading-tight mt-2">
          Completed Projects
        </div>
      </div>

      {/* Card 3 */}
      <div className="bg-white p-4 rounded-2xl border border-black/5 flex flex-col justify-between min-h-[130px] shadow-sm">
        <div className="flex items-baseline select-none">
          <span className="text-violet-500 text-sm font-bold mr-0.5">+</span>
          <span className="text-3xl font-extrabold text-[#1B1B1B]">
            <AnimatedCounter value={100} />
          </span>
          <span className="text-violet-500 text-sm font-bold ml-0.5">%</span>
        </div>
        <div className="text-[10px] uppercase tracking-wider text-[#1B1B1B] font-bold leading-tight mt-2">
          Client Satisfaction
        </div>
      </div>

      {/* Card 4 */}
      <div className="bg-white p-4 rounded-2xl border border-black/5 flex flex-col justify-between min-h-[130px] shadow-sm">
        <div className="flex items-baseline select-none">
          <span className="text-3xl font-extrabold text-[#1B1B1B]">
            <AnimatedCounter value={1.5} decimals={1} />
          </span>
          <span className="text-cyan-500 text-sm font-bold ml-1">M+ Sq. Ft.</span>
        </div>
        <div className="text-[10px] uppercase tracking-wider text-[#1B1B1B] font-bold leading-tight mt-2">
          Delivered Space
        </div>
      </div>
    </div>
  );
};


export const MarketPresence: React.FC = () => {

  return (
    <section 
      id="market-presence" 
      className="py-12 md:py-24 bg-[#FAF7F5] text-[#2A2A2A] relative overflow-hidden border-t border-black/5"
    >
      {/* Background radial gradient decoration */}
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-[#C92C15]/5 rounded-full blur-3xl pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 relative z-10">
        
        {/* Header Block */}
        <div className="text-left max-w-4xl mb-10 md:mb-16">
          <FadeUp delay={0.1} className="mb-3 block">
            <span className="text-[#C92C15] text-xs font-bold tracking-[0.2em] uppercase">Market Credibility</span>
          </FadeUp>
          <FadeUp delay={0.2}>
            <h2 className="text-2xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#1B1B1B] leading-tight md:leading-none">
              Our Record<br />of Excellence
            </h2>
          </FadeUp>
        </div>

        {/* DESKTOP ONLY BENTO GRID */}
        <div className="hidden md:grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Card 1: Years of Construction Excellence (col-span-2) */}
          <FadeUp 
            delay={0.1} 
            y={30} 
            className="md:col-span-2 bg-white/90 backdrop-blur-md p-8 md:p-10 rounded-[32px] border border-black/5 flex flex-col justify-start text-left group hover:border-[#C92C15]/20 hover:shadow-xl transition-all duration-300 relative overflow-hidden min-h-[260px]"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/30 via-transparent to-transparent pointer-events-none" />
            <div className="relative z-10 flex flex-col h-full space-y-6">
              <div className="flex items-baseline select-none">
                <span className="text-5xl md:text-7xl font-extrabold tracking-tighter text-[#1B1B1B] group-hover:text-[#C92C15] transition-colors duration-300">
                  <AnimatedCounter value={30} />
                </span>
                <span className="text-violet-500 text-3xl md:text-4xl font-bold ml-2">Yrs+</span>
              </div>
              <div className="space-y-2">
                <div className="text-xs uppercase tracking-[0.18em] text-[#1B1B1B] font-bold min-h-[2.5rem] flex items-center">
                  Years of Construction Excellence
                </div>
                <p className="text-sm font-light text-[#6F6F6F] max-w-xl leading-relaxed">
                  Over three decades of architectural precision, solid engineering, and reliable construction across Rajasthan.
                </p>
              </div>
            </div>
          </FadeUp>

          {/* Card 2: Completed Projects (col-span-1) */}
          <FadeUp 
            delay={0.2} 
            y={30} 
            className="md:col-span-1 bg-white/90 backdrop-blur-md p-8 md:p-10 rounded-[32px] border border-black/5 flex flex-col justify-start text-left group hover:border-[#C92C15]/20 hover:shadow-xl transition-all duration-300 relative overflow-hidden min-h-[260px]"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-50/20 via-transparent to-transparent pointer-events-none" />
            <div className="relative z-10 flex flex-col h-full space-y-6">
              <div className="flex items-baseline select-none">
                <span className="text-5xl md:text-7xl font-extrabold tracking-tighter text-[#1B1B1B] group-hover:text-[#C92C15] transition-colors duration-300">
                  <AnimatedCounter value={100} />
                </span>
                <span className="text-cyan-500 text-3xl md:text-4xl font-bold ml-1">+</span>
              </div>
              <div className="space-y-2">
                <div className="text-xs uppercase tracking-[0.18em] text-[#1B1B1B] font-bold min-h-[2.5rem] flex items-center">
                  Completed Projects
                </div>
                <p className="text-sm font-light text-[#6F6F6F] leading-relaxed">
                  Premium residential villas, commercial structures, and custom buildings completed to highest engineering standards.
                </p>
              </div>
            </div>
          </FadeUp>

          {/* Card 3: Client Satisfaction (col-span-1) */}
          <FadeUp 
            delay={0.3} 
            y={30} 
            className="md:col-span-1 bg-white/90 backdrop-blur-md p-8 md:p-10 rounded-[32px] border border-black/5 flex flex-col justify-start text-left group hover:border-[#C92C15]/20 hover:shadow-xl transition-all duration-300 relative overflow-hidden min-h-[260px]"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/20 via-transparent to-transparent pointer-events-none" />
            <div className="relative z-10 flex flex-col h-full space-y-6">
              <div className="flex items-baseline select-none">
                <span className="text-violet-500 text-3xl md:text-4xl font-bold mr-1">+</span>
                <span className="text-5xl md:text-7xl font-extrabold tracking-tighter text-[#1B1B1B] group-hover:text-[#C92C15] transition-colors duration-300">
                  <AnimatedCounter value={100} />
                </span>
                <span className="text-violet-500 text-3xl md:text-4xl font-bold ml-1">%</span>
              </div>
              <div className="space-y-2">
                <div className="text-xs uppercase tracking-[0.18em] text-[#1B1B1B] font-bold min-h-[2.5rem] flex items-center">
                  Client Satisfaction
                </div>
                <p className="text-sm font-light text-[#6F6F6F] leading-relaxed">
                  Committed to transparency, timely milestone delivery, and zero hidden costs for every single project.
                </p>
              </div>
            </div>
          </FadeUp>

          {/* Card 4: Delivered Space (col-span-2) */}
          <FadeUp 
            delay={0.4} 
            y={30} 
            className="md:col-span-2 bg-white/90 backdrop-blur-md p-8 md:p-10 rounded-[32px] border border-black/5 flex flex-col justify-start text-left group hover:border-[#C92C15]/20 hover:shadow-xl transition-all duration-300 relative overflow-hidden min-h-[260px]"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-50/30 via-transparent to-transparent pointer-events-none" />
            <div className="relative z-10 flex flex-col h-full space-y-6">
              <div className="flex items-baseline select-none">
                <span className="text-5xl md:text-7xl font-extrabold tracking-tighter text-[#1B1B1B] group-hover:text-[#C92C15] transition-colors duration-300">
                  <AnimatedCounter value={1.5} decimals={1} />
                </span>
                <span className="text-cyan-500 text-3xl md:text-4xl font-bold ml-2">Million+ Sq. Ft.</span>
              </div>
              <div className="space-y-2">
                <div className="text-xs uppercase tracking-[0.18em] text-[#1B1B1B] font-bold min-h-[2.5rem] flex items-center">
                  Delivered Space
                </div>
                <p className="text-sm font-light text-[#6F6F6F] max-w-xl leading-relaxed">
                  Crafting expansive premium spaces including luxury homes, commercial towers, and state-of-the-art structural developments.
                </p>
              </div>
            </div>
          </FadeUp>

        </div>

        {/* MOBILE ONLY STATS */}
        <div className="block md:hidden">
          <MarketGridMobile />
        </div>

      </div>
    </section>
  );
};

export default MarketPresence;
