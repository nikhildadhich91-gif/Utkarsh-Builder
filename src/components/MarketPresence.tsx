import React, { useEffect, useRef, useState } from 'react';
import { FadeUp } from './ui/FadeUp';
import { Award, CheckCircle, Grid, MapPin } from 'lucide-react';

interface AnimatedCounterProps {
  value: number;
  suffix?: string;
  duration?: number;
}

const AnimatedCounter: React.FC<AnimatedCounterProps> = ({ value, suffix = '', duration = 1500 }) => {
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
            setCount(Math.floor(progress * value));

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

  return (
    <span ref={elementRef} className="tabular-nums">
      {count}
      {suffix}
    </span>
  );
};

export const MarketPresence: React.FC = () => {
  const stats = [
    {
      icon: Award,
      targetValue: 30,
      suffix: '+ Years',
      label: 'Decades of Trust',
      desc: 'Building value, engineering safety, and delivering legacies in Jaipur since 1995.'
    },
    {
      icon: CheckCircle,
      targetValue: 100,
      suffix: '+ Projects',
      label: 'Delivered Assets',
      desc: 'Successfully completed residential layouts, turnkey homes, and corporate centers.'
    },
    {
      icon: Grid,
      targetValue: 4,
      suffix: ' Key Assets',
      label: 'Multiple Classes',
      desc: 'Specialized divisions for Residential, Commercial, Mixed-Use, and Interior works.'
    },
    {
      icon: MapPin,
      targetValue: 100,
      suffix: '% Focus',
      label: 'Jaipur Expertise',
      desc: 'Deep local knowledge of municipal JDA laws, building codes, and optimal sub-locations.'
    }
  ];

  return (
    <section id="market-presence" className="py-24 bg-[#FAF7F5] text-[#2A2A2A] relative overflow-hidden border-t border-black/5">
      {/* Background radial gradient decoration */}
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-[#C92C15]/5 rounded-full blur-3xl pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 relative z-10">
        
        {/* Header Block */}
        <div className="text-center max-w-2xl mx-auto mb-20">
          <FadeUp delay={0.1} className="mb-3 block">
            <span className="text-[#C92C15] text-xs font-bold tracking-[0.2em] uppercase">Market Credibility</span>
          </FadeUp>
          <FadeUp delay={0.2}>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight text-[#1B1B1B]">
              Market Presence &amp; Impact
            </h2>
          </FadeUp>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <FadeUp
                key={idx}
                delay={idx * 0.1}
                y={30}
                className="bg-white hover:bg-[#FAF7F5] p-8 rounded-3xl border border-black/5 flex flex-col justify-between text-left group hover:border-[#C92C15]/20 transition-all duration-300"
              >
                <div>
                  {/* Top Row: Counter and Icon */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="text-3xl sm:text-4xl md:text-5xl font-light text-[#1B1B1B] tracking-tight leading-none">
                      <AnimatedCounter value={stat.targetValue} suffix={stat.suffix} />
                    </div>
                    <div className="h-10 w-10 bg-[#C92C15]/5 rounded-lg flex items-center justify-center text-[#C92C15] shrink-0">
                      <Icon className="h-5 w-5" />
                    </div>
                  </div>
                  <h4 className="text-xs uppercase tracking-wider text-[#C92C15] font-bold mb-3">
                    {stat.label}
                  </h4>
                  <p className="text-xs text-[#6F6F6F] font-light leading-relaxed">
                    {stat.desc}
                  </p>
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
