import React from 'react';
import { FadeUp } from './ui/FadeUp';
import { TrendingUp, Landmark, Shield } from 'lucide-react';

export const InvestmentThroughConstruction: React.FC = () => {
  const pillars = [
    {
      icon: TrendingUp,
      title: 'Value Appreciation',
      desc: 'Smart floor plans, top-quality materials, and prime locations ensure your property gains value over time.'
    },
    {
      icon: Landmark,
      title: 'Growth Corridors',
      desc: "We build in Jaipur's fastest-growing areas, placing your home or business in high-demand neighborhoods."
    },
    {
      icon: Shield,
      title: 'Structural Safety & Longevity',
      desc: 'Using rust-free steel and strict safety standards, we build structures that require low maintenance and last for generations.'
    }
  ];

  return (
    <section id="investment-construction" className="py-24 md:py-32 bg-white text-[#2A2A2A] relative overflow-hidden border-t border-black/5">
      {/* Background grid pattern overlay */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none z-0">
        <div className="w-full h-full bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:50px_50px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 relative z-10">
        
        {/* Header Block */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-end mb-20">
          <div className="lg:col-span-8 text-left space-y-4">
            <FadeUp delay={0.1}>
              <span className="text-[#C92C15] text-xs font-bold tracking-[0.2em] uppercase">Wealth Multiplication</span>
            </FadeUp>
            <FadeUp delay={0.2}>
              <h2 className="text-3xl md:text-5xl lg:text-6xl font-light tracking-tight text-[#1B1B1B] leading-tight">
                Investment Through<br />
                <span className="text-[#C92C15] font-normal italic">Construction Excellence.</span>
              </h2>
            </FadeUp>
          </div>
          <div className="lg:col-span-4 text-left">
            <FadeUp delay={0.3}>
              <p className="text-[#6F6F6F] font-light text-sm md:text-base leading-relaxed">
                We bridge the gap between building contractor and strategic developer. Every structural column and floor layout is an exercise in asset value creation.
              </p>
            </FadeUp>
          </div>
        </div>

        {/* Value Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <FadeUp
                key={idx}
                delay={idx * 0.15}
                y={30}
                className="bg-[#FAF7F5] hover:bg-white p-8 rounded-3xl border border-black/5 flex flex-col justify-between text-left group hover:border-[#C92C15]/30 transition-all duration-300 shadow-md"
              >
                <div>
                  <div className="h-12 w-12 bg-[#C92C15]/5 border border-[#C92C15]/10 rounded-xl flex items-center justify-center text-[#C92C15] mb-8 group-hover:scale-110 transition-transform duration-300">
                    <Icon className="h-5.5 w-5.5" />
                  </div>
                  <h3 className="text-lg font-semibold text-[#1B1B1B] mb-4 group-hover:text-[#C92C15] transition-colors duration-300">
                    {pillar.title}
                  </h3>
                  <p className="text-sm text-[#6F6F6F] font-light leading-relaxed">
                    {pillar.desc}
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

export default InvestmentThroughConstruction;
