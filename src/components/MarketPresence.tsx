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

export const MarketPresence: React.FC = () => {
  const stats = [
    {
      targetValue: 30,
      valueSuffix: '+',
      unit: 'Years',
      decimals: 0
    },
    {
      targetValue: 100,
      valueSuffix: '+',
      unit: 'Projects',
      decimals: 0
    },
    {
      targetValue: 1.5,
      valueSuffix: ' Million+',
      unit: 'Sq. Ft. Delivered',
      decimals: 1
    },
    {
      targetValue: 100,
      valueSuffix: '%',
      unit: 'Focus',
      decimals: 0
    }
  ];

  return (
    <section id="market-presence" className="py-24 bg-[#FAF7F5] text-[#2A2A2A] relative overflow-hidden border-t border-black/5">
      {/* Background radial gradient decoration */}
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-[#C92C15]/5 rounded-full blur-3xl pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 relative z-10">
        
        {/* Header Block */}
        <div className="text-center max-w-2xl mx-auto mb-20 space-y-3">
          <div>
            <FadeUp delay={0.1} className="mb-3 block">
              <span className="text-[#C92C15] text-xs font-bold tracking-[0.2em] uppercase">Market Credibility</span>
            </FadeUp>
            <FadeUp delay={0.2}>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight text-[#1B1B1B]">
                Market Presence &amp; Impact
              </h2>
            </FadeUp>
          </div>
          <FadeUp delay={0.3}>
            <p className="text-[#6F6F6F] font-light text-base md:text-lg">
              We provide services in Rajasthan
            </p>
          </FadeUp>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, idx) => {
            return (
              <FadeUp
                key={idx}
                delay={idx * 0.1}
                y={30}
                className="bg-white px-6 py-12 rounded-3xl border border-black/5 flex flex-col items-center justify-center text-center group hover:border-[#C92C15]/20 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative"
              >
                {/* Vertical Stack: Number & Unit */}
                <div className="flex items-baseline justify-center select-none">
                  <span className="text-5xl md:text-6xl font-extrabold tracking-tighter text-[#1B1B1B] group-hover:text-[#C92C15] transition-colors duration-300">
                    <AnimatedCounter value={stat.targetValue} decimals={stat.decimals} />
                  </span>
                  <span className="text-xl md:text-2xl font-bold ml-0.5 text-[#C92C15] select-none">
                    {stat.valueSuffix}
                  </span>
                </div>
                <div className="text-xs uppercase tracking-[0.25em] text-[#8C8C8C] font-semibold mt-4">
                  {stat.unit}
                </div>
              </FadeUp>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default MarketPresence;
